import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { email: "user@example.com" },
    update: {},
    create: {
      email: "user@example.com",
      password: "securepassword",
      firstName: "John",
      lastName: "Doe",
      role: "ADMIN",
      company: {
        create: {
          name: "Tech Corp",
          industry: "TECHNOLOGY",
          address: "123 Tech Street",
          city: "Tech City",
          zipCode: "12345",
          country: "Techland",
          departments: {
            create: {
              id: 1,
              name: "Engineering",
              employees: {
                create: [
                  {
                    firstName: "Alice",
                    lastName: "Smith",
                    city: "Tech City",
                    street: "456 Tech Avenue",
                    zipCode: "12345",
                    position: "Software Engineer",
                    status: "ACTIVE",
                    payroll: 80000,
                    salary: {
                      create: [
                        {
                          amount: 80000,
                          date: new Date(),
                          status: "COMPLETED",
                          bonuses: 5000,
                          deductions: 2000,
                          totalPaid: 83000,
                        },
                      ],
                    },
                    company: { connect: { id: 1 } },
                  },
                  {
                    firstName: "Bob",
                    lastName: "Johnson",
                    city: "Tech City",
                    street: "789 Tech Boulevard",
                    zipCode: "12345",
                    position: "Product Manager",
                    status: "ACTIVE",
                    payroll: 90000,
                    salary: {
                      create: [
                        {
                          amount: 90000,
                          date: new Date(),
                          status: "COMPLETED",
                          bonuses: 7000,
                          deductions: 3000,
                          totalPaid: 94000,
                        },
                      ],
                    },
                    company: { connect: { id: 1 } },
                  },
                ],
              },
            },
          },
        },
      },
    },
  });

  console.log({ user });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
