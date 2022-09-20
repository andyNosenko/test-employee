import { roles } from "./seed-data/roles";
import { employees } from "./seed-data/employees";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  for (let role of roles) {
    await prisma.employeeRole.upsert({
      where: {
        id: role.id,
      },
      create: role,
      update: role,
    });
  }

  for (let employee of employees) {
    await prisma.employee.upsert({
      where: {
        id: employee.id,
      },
      create: employee,
      update: employee,
    });
  }
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
