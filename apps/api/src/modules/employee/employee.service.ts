import {Injectable} from '@nestjs/common';
import {PrismaService} from 'nestjs-prisma';

@Injectable()
export class EmployeeService {
  constructor(
    private _prisma: PrismaService,
  ) {}

  async getAll(filters) {
    let operator;
    if (filters.name?.includes(',')) {
      operator = ','
    }
    if (filters.company?.includes(',')) {
      operator = ','
    }
    if (filters.project?.includes(',')) {
      operator = ','
    }
    if (filters.role?.includes(',')) {
      operator = ','
    }

    if (filters.name?.includes('-')) {
      operator = '-'
    }
    if (filters.company?.includes('-')) {
      operator = '-'
    }
    if (filters.project?.includes('-')) {
      operator = '-'
    }
    if (filters.role?.includes('-')) {
      operator = '-'
    }
    console.log(operator)
    if (operator === ',') {
      typeof filters.name === "string" ? filters.name = filters.name.split(','): null
      typeof filters.company === "string" ? filters.company = filters.company.split(','): null
      typeof filters.project === "string" ? filters.project = filters.project.split(','): null
      typeof filters.role === "string" ? filters.role = filters.role.split(','): null
    }
    if (operator === '-') {
      typeof filters.name === "string" ? filters.name = filters.name.split('-'): null
      typeof filters.company === "string" ? filters.company = filters.company.split('-'): null
      typeof filters.project === "string" ? filters.project = filters.project.split('-'): null
      typeof filters.role === "string" ? filters.role = filters.role.split('-'): null
    }
    const whereOptions = {
      ...(filters?.name ? { name: { equals: filters.name } } : {}),
      ...(operator === ',' ? { name: { in: filters.name } } : {}),
      ...(operator === '-' ? { name: { notIn: filters.name }} : {}),
      ...(filters?.name === 'empty' ? { name: null } : {}),
      ...(filters?.company ? { company: { equals: filters.company } } : {}),
      ...(operator === ',' ? { company: { in: filters.company } } : {}),
      ...(filters?.company === 'empty' ? { company: null } : {}),
      ...(filters?.project ? { project: { equals: filters.project } } : {}),
      ...(operator === ',' ? { project: { in: filters.project } } : {}),
      ...(operator === '-' ? { project: { notIn: filters.project } } : {}),
      ...(filters?.project === 'empty' ? { project: null } : {}),
      ...(filters?.role ? { roles: { some: {value: {equals: filters.role}} } } : {}),
      ...(operator === ',' ? { roles: { some: {value: {in: filters.role}} } } : {}),
      ...(operator === '-' ? { roles: { some: {value: {notIn: filters.role}} } } : {}),
      ...(filters?.role === 'empty' ? { roles: null } : {}),
    };

   const result = await this._prisma.employee.findMany({
      where: whereOptions,
      include: {
        roles: {
          select: {
            value: true
          }
        }
      },
        skip: filters?.offset ? filters.offset : undefined,
        take: filters?.limit ? filters.limit : undefined,
    });


    return {
      result,
      pagination: await this.getPagination(filters?.limit),
      currentPage: await this.getCurrentPage(filters?.offset, filters?.limit)
    }
  }

  async getPagination(
    limit: number,
  ): Promise<{ pagesCount: number; limit: number }> {
    const totalRecords = await this._prisma.employee.count();
    const pagesCount = Math.ceil(Number(totalRecords) / limit);

    return { pagesCount, limit };
  }

  async getOffset(page: number, limit: number): Promise<number> {
    return page > 0 ? (page - 1) * limit : 0;
  }

  async getCurrentPage(offset: number, limit: number): Promise<number> {
    return Math.ceil(++offset / limit);
  }
}
