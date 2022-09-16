"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const nestjs_prisma_1 = require("nestjs-prisma");
const app_module_1 = require("./modules/app/app.module");
const path_1 = require("path");
const cookieParser = require("cookie-parser");
const express = require("express");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api');
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Borra API')
        .setDescription('The Borra API description')
        .setVersion('1.0')
        .addBearerAuth({
        description: 'You need to paste a access token for the authenticated user.',
        type: 'http',
    }, 'idToken')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document);
    const prismaService = app.get(nestjs_prisma_1.PrismaService);
    prismaService.enableShutdownHooks(app);
    app.use(cookieParser());
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true, transform: true }));
    app.use('/uploads', express.static((0, path_1.join)(`./uploads`)));
    await app.listen(3001);
}
bootstrap();
//# sourceMappingURL=main.js.map