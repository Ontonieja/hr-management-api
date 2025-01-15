import request from "supertest";
import { jest } from "@jest/globals";
import app from "../src/app";
import { prismaMock } from "../singleton";
import { ERROR_CODE } from "../src/constants/errorCodes";
import jwt from "jsonwebtoken";

const { UNAUTHORIZED, INVALID_REQUEST_BODY, NO_HEADERS } = ERROR_CODE;

jest.mock("jsonwebtoken");

describe("Company Service", () => {
  let req: any;

  beforeEach(() => {
    req = {
      headers: {
        authorization: "Bearer valid_token",
      },
      body: {
        companyName: "Test Company",
        industry: "Tech",
        address: "123 Test St",
        city: "Test City",
        zip: "12345",
        country: "Test Country",
      },
    };

    (jwt.verify as jest.Mock).mockImplementation((token, secret, callback) => {
      (callback as jwt.VerifyCallback)(null, {
        email: "test@gmail.com",
        userId: 1,
      });
    });
  });

  it("should return 401 if user is not authorized", async () => {
    req.headers.authorization = "";

    const res = await request(app)
      .post("/api/v1/company/create-company")
      .send(req.body)
      .expect(401);

    expect(res.body.message).toBe("No access token provided");
    expect(res.body.errorCode).toBe(NO_HEADERS);
  });

  it("should return 400 if required fields are missing", async () => {
    req.body.companyName = "";

    const res = await request(app)
      .post("/api/v1/company/create-company")
      .set("authorization", req.headers.authorization)
      .send(req.body)
      .expect(400);

    expect(res.body.message).toBe("Missing required fields");
    expect(res.body.errorCode).toBe(INVALID_REQUEST_BODY);
  });

  it("should create a company successfully", async () => {
    prismaMock.company.create.mockResolvedValue({
      id: 1,
      name: "Test Company",
      industry: "Tech",
      address: "123 Test St",
      city: "Test City",
      zipCode: "12345",
      country: "Test Country",
      ownerId: 1,
      members: [],
    });

    const res = await request(app)
      .post("/api/v1/company/create-company")
      .set("authorization", req.headers.authorization)
      .send(req.body)
      .expect(201);

    expect(res.body.message).toBe("Company created successfully");
  });
});
