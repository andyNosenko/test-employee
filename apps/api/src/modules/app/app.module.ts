import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PrismaModule } from "nestjs-prisma";
import { ScheduleModule } from "@nestjs/schedule";
import { EmployeeModule } from "../employee/employee.module";

@Module({
  imports: [
    ConfigModule.forRoot({}),
    PrismaModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    EmployeeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
