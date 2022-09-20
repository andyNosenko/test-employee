"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const roles_1 = require("./seed-data/roles");
const employee_1 = require("./seed-data/employee");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    for (let employee of employee_1.employees) {
        await prisma.employee.upsert({
            where: {
                id: employee.id,
            },
            create: employee,
            update: employee,
        });
    }
    for (let role of roles_1.roles) {
        await prisma.employeeRole.upsert({
            where: {
                id: role.id,
            },
            create: role,
            update: role,
        });
    }
}
main()
    .catch(e => {
    console.log(e);
    process.exit(1);
})
    .finally(() => {
    prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map