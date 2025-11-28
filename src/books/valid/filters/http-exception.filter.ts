import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';

interface IErrorResponse {
  timestamp: string;
  status: string;
  data: any;
  code: number;
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const errorResponse: IErrorResponse = {
      timestamp: new Date().toISOString(),
      status: 'fail',
      data: exception.getResponse(),
      code: status,
    };

    response.status(status).json(errorResponse);
  }
}