import {Body, Controller, Get, Post, Query} from '@nestjs/common';
import {EmployeeService} from './employee.service';
import {ApiOperation, ApiQuery, ApiResponse} from '@nestjs/swagger';
import {GetAllEmployeesDto} from './dto/get-all-employees.dto';
import {RoleEnum} from './enum/role.enum';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {
  }

  @ApiOperation({ summary: 'Returns all filtered employees within database' })
  // @ApiOkResponse({ type: [ViewEmailShortDto] })
  @ApiResponse({ status: 400, description: 'Invalid request' })
  @ApiResponse({ status: 404, description: 'Employee not found' })
  // @ApiQuery({ name: 'role', enum: RoleEnum })
  @Get('getAll')
  async getAll(@Query() filter: GetAllEmployeesDto) {
    return this.employeeService.getAll(filter);
  }

  // @ApiOperation({ summary: 'Returns all filtered employees by role  within database' })
  // // @ApiOkResponse({ type: [ViewEmailShortDto] })
  // @ApiResponse({ status: 400, description: 'Invalid request' })
  // @ApiResponse({ status: 404, description: 'Employee not found' })
  // @Get()
  // // async getAll(@Query() filter: GetAllEmployeesDto) {
  // async getEmployeesByRole() {
  //   // return this.employeeService.getAll(filter);
  //   return this.employeeService.getEmployeesByRole();
  // }
}
