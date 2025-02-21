import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function generateMonthlyPayrolls() {
  const currentDate = new Date();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();

  const employees = await prisma.employee.findMany({
    where: {
      resignedAt: null,
    },
  });

  for (const employee of employees) {
    const existingPayroll = await prisma.salary.findFirst({
      where: {
        employeeId: employee.id,
        date: {
          gte: new Date(`${year}-${month}-01`),
          lt: new Date(`${year}-${month + 1}-01`),
        },
      },
    });

    if (!existingPayroll) {
      await prisma.salary.create({
        data: {
          employeeId: employee.id,
          amount: employee.payroll,
          date: new Date(),
          status: "NEEDSETUP",
          bonuses: 0,
          deductions: 0,
          totalPaid: employee.payroll,
        },
      });

      console.log(
        `Payroll utworzony dla pracownika ${employee.firstName} ${employee.lastName}`
      );
    } else {
      console.log(`Payroll dla ${employee.firstName} już istnieje`);
    }
  }
}
