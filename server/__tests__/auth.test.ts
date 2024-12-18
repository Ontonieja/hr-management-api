import request from "supertest";
import app from "../src/app";

import { prismaMock } from "../singleton";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { refreshToken } from "../src/controllers/auth";
import { access } from "fs";
import { before } from "node:test";
import { error } from "console";

jest.mock("../prisma/db");
jest.mock("bcrypt");
jest.mock("jsonwebtoken");

beforeAll(() => {
  process.env.JWT_SECRET = "secret";
});
let req: Partial<Request>;

describe("Register auth service", () => {
  beforeEach(() => {
    req = {
      body: {
        email: "test@gmail.com",
        password: "test12345",
        firstName: "Test",
        lastName: "Testing",
      },
    };
  });

  it("should return 400 if required fields are missing", async () => {
    const res = await request(app)
      .post("/auth/register")
      .send({ email: "test@gmail.com" })
      .expect(400);

    expect(res.body.message).toBe("Required");
  });

  it("should throw an error if user exists", async () => {
    prismaMock.user.findFirst.mockResolvedValue({
      email: "test@gmail.com",
    });

    const res = await request(app)
      .post("/auth/register")
      .send(req.body)
      .expect(400);

    expect(res.body.message).toBe("User already exists");
    expect(res.body.errorCode).toBe(301);
  });

  it("should succesfully create user", async () => {
    prismaMock.user.create.mockResolvedValue({
      email: "test@gmail.com",
      password: "test12345",
      firstName: "Test",
      lastName: "Testing",
    });

    (bcrypt.hashSync as jest.Mock).mockReturnValue("hashedPassword");
    const mockAccessToken = "mockAccesToken";
    const mockRefreshToken = "mockRefreshToken";

    (jwt.sign as jest.Mock)
      .mockReturnValueOnce(mockAccessToken)
      .mockReturnValueOnce(mockRefreshToken);

    const res = await request(app)
      .post("/auth/register")
      .send(req.body)
      .expect(201);

    expect(res.body).toMatchObject({
      message: "User created successfully",
      accessToken: mockAccessToken,
      refreshToken: mockRefreshToken,
    });
  });

  it("should handle errors during user creation", async () => {
    prismaMock.user.create.mockRejectedValue(new Error("Database error"));

    const res = await request(app)
      .post("/auth/register")
      .send(req.body)
      .expect(500);

    expect(res.body.message).toBe("Something went wrong");
  });
});

describe("Login auth service", () => {
  beforeEach(() => {
    req = {
      body: {
        email: "test@gmail.com",
        password: "test12345",
      },
    };
  });

  it("should return 400 if required fields are missing", async () => {
    const res = await request(app)
      .post("/auth/register")
      .send({ email: "test@gmail.com" })
      .expect(400);

    expect(res.body.message).toBe("Required");
  });

  it("should throw an error if user does not exist", async () => {
    prismaMock.user.findFirst.mockResolvedValue(null);

    const res = await request(app)
      .post("/auth/login")
      .send(req.body)
      .expect(400);

    expect(res.body).toMatchObject({
      message: "User does not exist",
      errorCode: 304,
    });
  });

  it("should login user and return access token and refresh token", async () => {
    prismaMock.user.findFirst.mockResolvedValue({
      email: "test@gmail.com",
      password: "test12345",
      firstName: "Test",
      lastName: "Testing",
    });

    (bcrypt.compare as jest.Mock).mockReturnValue(true);

    const mockAccessToken = "mockAccesToken";
    const mockRefreshToken = "mockRefreshToken";

    (jwt.sign as jest.Mock)
      .mockReturnValueOnce(mockAccessToken)
      .mockReturnValueOnce(mockRefreshToken);

    const res = await request(app)
      .post("/auth/login")
      .send(req.body)
      .expect(201);

    expect(res.body).toMatchObject({
      message: "User logged in successfully",
      accessToken: mockAccessToken,
      refreshToken: mockRefreshToken,
    });
  });

  it("should throw an error if password is not correct", async () => {
    prismaMock.user.findFirst.mockResolvedValue({
      email: "test@gmail.com",
      password: "test12455",
      firstName: "Test",
      lastName: "Testing",
    });

    (bcrypt.compare as jest.Mock).mockReturnValue(false);

    const res = await request(app)
      .post("/auth/login")
      .send(req.body)
      .expect(400);

    expect(res.body).toMatchObject({
      message: "Invalid Password",
      errorCode: 304,
    });
  });

  describe("refresh auth service", () => {
    let req: { headers: { [key: string]: string } };

    beforeEach(() => {
      req = {
        headers: {
          "x-refresh-token": "mockRefreshToken",
        },
      };
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should throw an error if refresh token is missing", async () => {
      req.headers["x-refresh-token"] = "";

      const res = await request(app).post("/auth/refresh").expect(400);

      expect(res.body).toMatchObject({
        message: "Headers must include refresh token",
        errorCode: 305,
      });
    });

    it("should verify refresh token and return access token", async () => {
      (jwt.verify as jest.Mock).mockImplementation(
        (token, secret, callback) => {
          callback(null, { email: "test@gmail.com", userId: 1 });
        },
      );

      (jwt.sign as jest.Mock).mockReturnValue("mockAccessToken");

      const res = await request(app)
        .post("/auth/refresh")
        .set("x-refresh-token", req.headers["x-refresh-token"])
        .expect(200);

      expect(res.body).toMatchObject({
        message: "Token refreshed successfully",
        accessToken: "mockAccessToken",
      });
    }); // Ustawienie dłuższego limitu czasu

    it("should return error if refresh token is invalid", async () => {
      (jwt.verify as jest.Mock).mockImplementation(
        (token, secret, callback) => {
          callback(new Error("Invalid refresh token"), null);
        },
      );

      const res = await request(app)
        .post("/auth/refresh")
        .set("x-refresh-token", req.headers["x-refresh-token"])
        .expect(401);

      expect(res.body).toMatchObject({
        message: "Invalid refresh token",
        errorCode: 306,
      });
    });
  });

  describe("isAuth middleware", () => {
    let req: { headers: { [key: string]: string } };
    beforeEach(() => {
      req = {
        headers: {
          authorization: "Bearer mockAccessToken",
        },
      };
    });
    it("should return error if no acces token is provided", async () => {
      req.headers.authorization = "";

      const res = await request(app).get("/auth/protected-route").expect(400);

      expect(res.body).toMatchObject({
        message: "No acces token provided",
        errorCode: 305,
      });
    });

    it("should verify token and pass request to next middleware", async () => {
      (jwt.verify as jest.Mock).mockImplementation(
        (token, secret, callback) => {
          callback(null, { email: "test@gmail.com", userId: 1 });
        },
      );

      const res = await request(app)
        .get("/auth/protected-route")
        .set("authorization", req.headers.authorization)
        .expect(200);
    });
  });
});