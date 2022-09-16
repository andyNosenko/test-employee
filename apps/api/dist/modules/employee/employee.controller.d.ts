import { EmployeeService } from './employee.service';
import { GetAllEmployeesDto } from './dto/get-all-employees.dto';
export declare class EmployeeController {
    private readonly employeeService;
    constructor(employeeService: EmployeeService);
    getAll(filter: GetAllEmployeesDto): Promise<{
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
}
