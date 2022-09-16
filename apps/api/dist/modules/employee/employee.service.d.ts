import { PrismaService } from 'nestjs-prisma';
export declare class EmployeeService {
    private _prisma;
    constructor(_prisma: PrismaService);
    getAll(filters: any): Promise<{
        result: (import(".prisma/client").Employee & {
            roles: {
                value: import(".prisma/client").Role;
            }[];
        })[];
        pagination: {
            pagesCount: number;
            limit: number;
        };
        currentPage: number;
    }>;
    getPagination(limit: number): Promise<{
        pagesCount: number;
        limit: number;
    }>;
    getOffset(page: number, limit: number): Promise<number>;
    getCurrentPage(offset: number, limit: number): Promise<number>;
}
