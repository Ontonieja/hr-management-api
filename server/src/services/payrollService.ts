import { Response } from "express";
import { RequestWithUser } from "../middlewares/isAuth";
import AppError from "../utils/AppError";
import { ERROR_CODE } from "../constants/errorCodes";
import db from "../../prisma/db";
import { startOfMonth, endOfMonth, parseISO } from "date-fns";

const {
  UNAUTHORIZED,
  COMPANY_NOT_FOUND,
  USER_NOT_FOUND,
  INVALID_REQUEST_BODY,
} = ERROR_CODE;
export const getPayrollStatsService = async (
  req: RequestWithUser,
  res: Response
) => {
  const { userId, companyId } = req;

  const month = req.query.month as string;

  const date = parseISO(month);
  const startDate = startOfMonth(date);
  const endDate = endOfMonth(date);

  if (!userId) throw new AppError(UNAUTHORIZED, "Unauthorized", 401);
  if (!companyId)
    throw new AppError(COMPANY_NOT_FOUND, "Company not found", 404);

  const employees = await db.employee.findMany({
    where: { companyId, status: "ACTIVE" },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      payroll: true,
      salary: {
        where: {
          date: {
            gte: startDate,
            lte: endDate,
          },
        },
        select: {
          id: true,
          bonuses: true,
          createdAt: true,
          date: true,
          deductions: true,
          status: true,
        },
        take: 1,
      },
    },
  });

  const employeesWithSingleSalary = employees.map((emp) => ({
    ...emp,
    salary: emp.salary[0],
  }));

  return res.status(200).json({
    message: "Payroll stats fetched successfully",
    employees: employeesWithSingleSalary,
  });
};

export const editPayrollService = async (
  req: RequestWithUser,
  res: Response
) => {
  const {
    userId,
    companyId,
    body: { salary, bonuses, deductions },
  } = req;

  const employeeId = parseInt(req.query.id as string);
  const salaryId = parseInt(req.query.salaryId as string);

  if (!userId) throw new AppError(UNAUTHORIZED, "Unauthorized", 401);

  if (!companyId)
    throw new AppError(COMPANY_NOT_FOUND, "Company not found", 404);

  if (!employeeId)
    throw new AppError(USER_NOT_FOUND, "Employee not provided", 404);

  if (!salaryId) throw new AppError(USER_NOT_FOUND, "Salary not found", 404);

  const updatedEmployee = await db.employee.update({
    where: { companyId, id: employeeId },
    data: {
      payroll: salary,
      salary: {
        update: {
          where: { id: salaryId },
          data: { bonuses, deductions },
        },
      },
    },
  });
  res
    .status(200)
    .json({ message: "Payroll edited successfully", updatedEmployee });
};

export const toggleStatusService = async (
  req: RequestWithUser,
  res: Response
) => {
  const salaryId = parseInt(req.query.salaryId as string);

  if (!salaryId) throw new AppError(USER_NOT_FOUND, "Salary not found", 404);

  const currentSalary = await db.salary.findUnique({
    where: { id: salaryId },
    select: { status: true },
  });

  if (!currentSalary)
    throw new AppError(USER_NOT_FOUND, "Salary not found", 404);

  const newStatus =
    currentSalary.status === "COMPLETED" ? "NEEDSETUP" : "COMPLETED";

  const updatedStatus = await db.salary.update({
    where: { id: salaryId },
    data: { status: newStatus },
  });

  return res.status(200).json({ message: "Status updated successfully" });
};

export const getSalaryHistoryService = async (
  req: RequestWithUser,
  res: Response
) => {
  const salaryId = parseInt(req.query.salaryId as string);

  if (!salaryId)
    throw new AppError(INVALID_REQUEST_BODY, "Salary Id not provided", 404);

  const salaries = await db.salary.findMany({
    where: { id: salaryId },
    orderBy: { date: "desc" },
  });

  console.log(salaries);

  if (!salaries) throw new AppError(USER_NOT_FOUND, "Salaries not found", 404);

  return res
    .status(200)
    .json({ message: "Payroll history fetched successfully", salaries });
};
