import {ValidationPipe} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {PrismaService} from 'nestjs-prisma';
import {AppModule} from './modules/app/app.module';
import {join} from 'path';
import * as cookieParser from 'cookie-parser';
import express = require('express');

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    // TODO Uncomment for listening exceptions globally
    // app.useGlobalFilters(new AllExceptionsFilter());
    app.setGlobalPrefix('api');
    const config = new DocumentBuilder()
        .setTitle('Employee API')
        .setDescription('The Employee API description')
        .setVersion('1.0')
        .addBearerAuth(
            {
                description: 'You need to paste a access token for the authenticated user.',
                type: 'http',
            },
            'idToken'
        )
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);

    // enable shutdown hook
    const prismaService: PrismaService = app.get(PrismaService);
    prismaService.enableShutdownHooks(app);

    app.use(cookieParser());
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    app.use('/uploads', express.static(join(`./uploads`)));

    await app.listen(3001);
}
bootstrap();
