import request from "supertest";
import { jest } from "@jest/globals";
import app from "../src/app";
import { prismaMock } from "../singleton";
import { ERROR_CODE } from "../src/constants/errorCodes";
import jwt from "jsonwebtoken";

const { UNAUTHORIZED, USER_NOT_FOUND } = ERROR_CODE;

jest.mock("jsonwebtoken");

describe("Dashboard Service", () => {
  let req: any;

  beforeEach(() => {
    req = {
      headers: {
        authorization: "Bearer valid_token",
      },
    };

    (jwt.verify as jest.Mock).mockImplementation((token, secret, callback) => {
      (callback as jwt.VerifyCallback)(null, {
        email: "test@gmail.com",
        userId: 1,
      });
    });
  });

  it("should return 404 if company is not found", async () => {
    prismaMock.company.findUnique.mockResolvedValue(null);

    const res = await request(app)
      .get("/api/v1/dashboard/get-stats")
      .set("authorization", req.headers.authorization)
      .expect(404);

    expect(res.body.message).toBe("Company not found");
    expect(res.body.errorCode).toBe(USER_NOT_FOUND);
  });

  it("should return dashboard data successfully", async () => {
    prismaMock.company.findUnique.mockResolvedValue({
      id: 1,
      userId: 1,
    });

    prismaMock.employee.findMany.mockResolvedValue([
      {
        firstName: "John",
        lastName: "Doe",
        position: "Developer",
        status: "ACTIVE",
        payroll: 5000,
        departmentId: 1,
        createdAt: new Date("2023-01-01"),
        resignedAt: null,
      },
    ]);

    prismaMock.department.findMany.mockResolvedValue([
      {
        name: "IT",
        _count: { employees: 1 },
      },
    ]);

    const res = await request(app)
      .get("/api/v1/dashboard/get-stats")
      .set("authorization", req.headers.authorization)
      .expect(200);

    expect(res.body.message).toBe("Dashboard data fetched successfully");
    expect(res.body.totalEmployees).toBe(1);
    expect(res.body.totalResignedEmployees).toBe(0);
    expect(res.body.totalPayroll).toBe(5000);
    expect(res.body.retentionRate).toBe("100.00");
    expect(res.body.barChartData).toHaveLength(12);
    expect(res.body.pieChartDepartmentData).toEqual([
      { name: "IT", employees: 1 },
    ]);
  });
});
