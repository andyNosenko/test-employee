import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";

@Injectable()
export class EmployeeService {
  constructor(private _prisma: PrismaService) {}

  async filter(
    filterArr: string[],
    paginationOpt: { offset?: number; limit?: number }
  ) {
    let operator;
    let whereOptions = undefined;
    let valArray = [];

    const objectFilter = Object.entries(filterArr);

    await Promise.all(
      objectFilter.map(async ([key, val]) => {
        if (val?.includes("|")) {
          operator = "|";
          valArray = val.split("|");

          whereOptions = {
            ...(whereOptions != undefined ? { ...whereOptions } : {}),
            ...(key === "name" && valArray ? { name: { in: valArray } } : {}),
            ...(key === "company" && valArray
              ? { company: { in: valArray } }
              : {}),
            ...(key === "project" && valArray
              ? { project: { in: valArray } }
              : {}),
            ...(key === "role"
              ? { roles: { some: { value: { in: valArray } } } }
              : {}),
          };
        }
        if (val?.includes("-")) {
          operator = "-";
          valArray = val.split("-");
          whereOptions = {
            ...(whereOptions != undefined ? { ...whereOptions } : {}),
            ...(key === "name" && operator === "-"
              ? { name: { notIn: valArray } }
              : {}),
            ...(key === "company" && operator === "-"
              ? { company: { notIn: valArray } }
              : {}),
            ...(key === "project" && operator === "-"
              ? { project: { notIn: valArray } }
              : {}),
            ...(key === "role" && operator === "-"
              ? { roles: { some: { value: { notIn: valArray } } } }
              : {}),
          };
        }

        if (!val?.includes(",") && !val?.includes("|") && !val?.includes("-")) {
          whereOptions = {
            ...(whereOptions != undefined ? { ...whereOptions } : {}),
            ...(key === "name" ? { name: { equals: val } } : {}),
            ...(key === "company" ? { company: { equals: val } } : {}),
            ...(key === "project" ? { project: { equals: val } } : {}),
            ...(key === "role"
              ? { roles: { some: { value: { equals: val } } } }
              : {}),
          };
        }

        if (val?.includes(",")) {
          operator = ",";
          valArray = val.split(",");

          whereOptions = {
            ...(whereOptions != undefined ? { ...whereOptions } : {}),
            ...(key === "name" && operator === ","
              ? { AND: valArray.map((item) => ({ name: item })) }
              : {}),
            ...(key === "company" && operator === ","
              ? { AND: valArray.map((item) => ({ company: item })) }
              : {}),
            ...(key === "project" && operator === ","
              ? { AND: valArray.map((item) => ({ project: item })) }
              : {}),
            ...(key === "role" && operator === ","
              ? {
                  roles: {
                    some: { AND: valArray.map((item) => ({ value: item })) },
                  },
                }
              : {}),
          };
        }
      })
    );

    return this._prisma.employee.findMany({
      where: whereOptions,
      include: {
        roles: {
          select: {
            value: true,
          },
        },
      },
      skip: paginationOpt?.offset ? paginationOpt.offset : undefined,
      take: paginationOpt?.limit ? paginationOpt.limit : undefined,
    });
  }

  async getAll(filters) {
    const prepareFilters = { ...filters };
    delete prepareFilters?.offset;
    delete prepareFilters?.limit;

    return {
      result: await this.filter(prepareFilters, {
        offset: filters?.offset,
        limit: filters?.limit,
      }),
      pagination: await this.getPagination(filters?.limit),
      currentPage: await this.getCurrentPage(filters?.offset, filters?.limit),
    };
  }

  async getPagination(
    limit: number
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
