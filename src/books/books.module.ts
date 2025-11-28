import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { APP_PIPE } from '@nestjs/core';
import { APP_FILTER } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose'; 
import { BookSchema, Book } from 'src/books/schemas/book.schema';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { ResponseInterceptor } from 'src/books/valid/interceptors/books.interceptors';
import { ValidationPipe } from 'src/books/valid/pipes/validation.pipe';
import { HttpExceptionFilter } from './valid/filters/http-exception.filter';

@Module({
  imports: [MongooseModule.forFeature([{ name: Book.name, schema: BookSchema}])],
  controllers: [BooksController],
  providers: [
    BooksService,
    { provide: APP_INTERCEPTOR, useClass: ResponseInterceptor },
    { provide: APP_PIPE, useClass: ValidationPipe },
    { provide: APP_FILTER, useClass: HttpExceptionFilter }
  ],
})
export class BooksModule {}