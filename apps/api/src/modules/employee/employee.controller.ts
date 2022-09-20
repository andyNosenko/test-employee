import { Controller, Get, Query } from "@nestjs/common";
import { EmployeeService } from "./employee.service";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { GetAllEmployeesDto } from "./dto/get-all-employees.dto";

@Controller("employee")
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @ApiOperation({ summary: "Returns all filtered employees within database" })
  @ApiResponse({ status: 400, description: "Invalid request" })
  @ApiResponse({ status: 404, description: "Employee not found" })
  @Get("getAll")
  async getAll(@Query() filter: GetAllEmployeesDto) {
    return this.employeeService.getAll(filter);
  }
}
