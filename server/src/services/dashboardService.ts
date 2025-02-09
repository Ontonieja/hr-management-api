import { Response } from "express";
import { RequestWithUser } from "../middlewares/isAuth";
import { ERROR_CODE } from "../constants/errorCodes";
import AppError from "../utils/AppError";
import db from "../../prisma/db";

interface ChartDataProps {
  month: string;
  employees: number;
}
export const getDashboardService = async (
  req: RequestWithUser,
  res: Response
) => {
  const { userId } = req;

  const { UNAUTHORIZED, USER_NOT_FOUND } = ERROR_CODE;

  if (!userId) throw new AppError(UNAUTHORIZED, "Unauthorized", 403);

  const company = await db.company.findUnique({ where: { userId } });

  if (!company) throw new AppError(USER_NOT_FOUND, "Company not found", 404);

  const { id: companyId } = company;

  const employees = await db.employee.findMany({
    where: { companyId },
    select: {
      firstName: true,
      lastName: true,
      position: true,
      status: true,
      payroll: true,
      Department: {
        select: {
          name: true,
        },
      },
      createdAt: true,
      resignedAt: true,
    },
  });

  // Dashboard Stat tiles
  const totalEmployees = employees.length;

  const totalResignedEmployees = employees.filter(
    (emp) => emp.status === "RESIGNED"
  ).length;

  const totalPayroll = employees.reduce(
    (sum, emp) => sum + (emp.status === "RESIGNED" ? 0 : emp.payroll),
    0
  );

  const retentionRate =
    totalEmployees &&
    (
      ((totalEmployees - totalResignedEmployees) / totalEmployees) *
      100
    ).toFixed(0);

  const monthFormatter = new Intl.DateTimeFormat("en-US", { month: "long" });

  // Dashboard bar chart
  const startDate = new Date();
  startDate.setMonth(startDate.getMonth() - 11);
  startDate.setDate(1);

  const barChartData: ChartDataProps[] = [];

  for (let i = 0; i < 12; i++) {
    const month = new Date(startDate);
    month.setMonth(month.getMonth() + i + 1);
    month.setDate(0);

    const employeesByMonth = employees.filter((emp) => {
      return (
        emp.createdAt <= month && (!emp.resignedAt || emp.resignedAt > month)
      );
    }).length;

    const formated = monthFormatter.format(month);

    barChartData.push({ month: formated, employees: employeesByMonth });
  }

  //Departments pie chart

  const departments = await db.department.findMany({
    where: { companyId },
    select: { name: true, _count: { select: { employees: true } } },
  });

  const pieChartDepartmentData = departments.map((dept) => ({
    name: dept.name,
    employees: dept._count.employees,
  }));

  res.status(200).json({
    message: "Dashboard data fetched successfully",
    totalEmployees,
    totalResignedEmployees,
    totalPayroll,
    retentionRate,
    barChartData,
    employees,
    pieChartDepartmentData,
  });
};
