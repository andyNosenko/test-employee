"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_prisma_1 = require("nestjs-prisma");
let EmployeeService = class EmployeeService {
    constructor(_prisma) {
        this._prisma = _prisma;
    }
    async getAll(filters) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        let operator;
        if ((_a = filters.name) === null || _a === void 0 ? void 0 : _a.includes(',')) {
            operator = ',';
        }
        if ((_b = filters.company) === null || _b === void 0 ? void 0 : _b.includes(',')) {
            operator = ',';
        }
        if ((_c = filters.project) === null || _c === void 0 ? void 0 : _c.includes(',')) {
            operator = ',';
        }
        if ((_d = filters.role) === null || _d === void 0 ? void 0 : _d.includes(',')) {
            operator = ',';
        }
        if ((_e = filters.name) === null || _e === void 0 ? void 0 : _e.includes('-')) {
            operator = '-';
        }
        if ((_f = filters.company) === null || _f === void 0 ? void 0 : _f.includes('-')) {
            operator = '-';
        }
        if ((_g = filters.project) === null || _g === void 0 ? void 0 : _g.includes('-')) {
            operator = '-';
        }
        if ((_h = filters.role) === null || _h === void 0 ? void 0 : _h.includes('-')) {
            operator = '-';
        }
        console.log(operator);
        if (operator === ',') {
            typeof filters.name === "string" ? filters.name = filters.name.split(',') : null;
            typeof filters.company === "string" ? filters.company = filters.company.split(',') : null;
            typeof filters.project === "string" ? filters.project = filters.project.split(',') : null;
            typeof filters.role === "string" ? filters.role = filters.role.split(',') : null;
        }
        if (operator === '-') {
            typeof filters.name === "string" ? filters.name = filters.name.split('-') : null;
            typeof filters.company === "string" ? filters.company = filters.company.split('-') : null;
            typeof filters.project === "string" ? filters.project = filters.project.split('-') : null;
            typeof filters.role === "string" ? filters.role = filters.role.split('-') : null;
        }
        const whereOptions = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, ((filters === null || filters === void 0 ? void 0 : filters.name) ? { name: { equals: filters.name } } : {})), (operator === ',' ? { name: { in: filters.name } } : {})), (operator === '-' ? { name: { notIn: filters.name } } : {})), ((filters === null || filters === void 0 ? void 0 : filters.name) === 'empty' ? { name: null } : {})), ((filters === null || filters === void 0 ? void 0 : filters.company) ? { company: { equals: filters.company } } : {})), (operator === ',' ? { company: { in: filters.company } } : {})), ((filters === null || filters === void 0 ? void 0 : filters.company) === 'empty' ? { company: null } : {})), ((filters === null || filters === void 0 ? void 0 : filters.project) ? { project: { equals: filters.project } } : {})), (operator === ',' ? { project: { in: filters.project } } : {})), (operator === '-' ? { project: { notIn: filters.project } } : {})), ((filters === null || filters === void 0 ? void 0 : filters.project) === 'empty' ? { project: null } : {})), ((filters === null || filters === void 0 ? void 0 : filters.role) ? { roles: { some: { value: { equals: filters.role } } } } : {})), (operator === ',' ? { roles: { some: { value: { in: filters.role } } } } : {})), (operator === '-' ? { roles: { some: { value: { notIn: filters.role } } } } : {})), ((filters === null || filters === void 0 ? void 0 : filters.role) === 'empty' ? { roles: null } : {}));
        const result = await this._prisma.employee.findMany({
            where: whereOptions,
            include: {
                roles: {
                    select: {
                        value: true
                    }
                }
            },
            skip: (filters === null || filters === void 0 ? void 0 : filters.offset) ? filters.offset : undefined,
            take: (filters === null || filters === void 0 ? void 0 : filters.limit) ? filters.limit : undefined,
        });
        return {
            result,
            pagination: await this.getPagination(filters === null || filters === void 0 ? void 0 : filters.limit),
            currentPage: await this.getCurrentPage(filters === null || filters === void 0 ? void 0 : filters.offset, filters === null || filters === void 0 ? void 0 : filters.limit)
        };
    }
    async getPagination(limit) {
        const totalRecords = await this._prisma.employee.count();
        const pagesCount = Math.ceil(Number(totalRecords) / limit);
        return { pagesCount, limit };
    }
    async getOffset(page, limit) {
        return page > 0 ? (page - 1) * limit : 0;
    }
    async getCurrentPage(offset, limit) {
        return Math.ceil(++offset / limit);
    }
};
EmployeeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nestjs_prisma_1.PrismaService])
], EmployeeService);
exports.EmployeeService = EmployeeService;
//# sourceMappingURL=employee.service.js.map