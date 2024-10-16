import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { ErrorException } from '@shared/Exceptions/ErrorException';
import { GeneralErrorType } from '@shared/Exceptions/GeneralErrorType';
import { FastifyReply, FastifyRequest } from 'fastify';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter
{
    catch(exception: unknown, host: ArgumentsHost)
    {
        const ctx = host.switchToHttp();
        const reply = ctx.getResponse<FastifyReply>();
        const request = ctx.getRequest<FastifyRequest>();

        const { status, message, errorType, domainErrorType, metadata } = this.handleException(exception);

        const errorResponse = this.createErrorResponse(status, request.url, message, errorType, domainErrorType, metadata);

        this.logger.error(
            `Error occurred: ${message}`,
            { exception: exception instanceof Error ? exception.stack : undefined, ...errorResponse },
            'AllExceptionsFilter'
        );

        void reply.status(status).send(errorResponse);
    }

    private readonly errorStatusMap = {
        [GeneralErrorType.NOT_FOUND]: HttpStatus.NOT_FOUND,
        [GeneralErrorType.BAD_REQUEST]: HttpStatus.BAD_REQUEST,
        [GeneralErrorType.INVALID_INPUT]: HttpStatus.BAD_REQUEST,
        [GeneralErrorType.VALIDATION_ERROR]: HttpStatus.BAD_REQUEST,
        [GeneralErrorType.UNAUTHORIZED]: HttpStatus.UNAUTHORIZED,
        [GeneralErrorType.FORBIDDEN]: HttpStatus.FORBIDDEN,
        [GeneralErrorType.CONFLICT]: HttpStatus.CONFLICT,
        [GeneralErrorType.TIMEOUT]: HttpStatus.REQUEST_TIMEOUT,
        [GeneralErrorType.SERVICE_UNAVAILABLE]: HttpStatus.SERVICE_UNAVAILABLE
    };

    private getHttpStatus(errorType: GeneralErrorType): number
    {
        return this.errorStatusMap[errorType] || HttpStatus.INTERNAL_SERVER_ERROR;
    }

    private handleException(exception: unknown)
    {
        let status: HttpStatus;
        let message: string;
        let errorType: string;
        let domainErrorType: string | null = null;
        let metadata: Record<string, string> | null = null;

        if (exception instanceof ErrorException)
        {
            status = this.getHttpStatus(exception.type);
            message = exception.message;
            errorType = exception.type;
            domainErrorType = exception.domainErrorType;
            metadata = exception.metadata;
        }
        else if (exception instanceof HttpException)
        {
            status = exception.getStatus();
            message = exception.message;
            errorType = status === HttpStatus.INTERNAL_SERVER_ERROR ? 'InternalServerError' : 'HttpException';
        }
        else
        {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            message = 'Internal server error';
            errorType = 'UnknownError';
        }

        return { status, message, errorType, domainErrorType, metadata };
    }

    private createErrorResponse(status: HttpStatus, path: string, message: string, errorType: string, domainErrorType: string | null, metadata: Record<string, string> | null)
    {
        return {
            statusCode: status,
            timestamp: new Date().toISOString(),
            path,
            message,
            errorType,
            domainErrorType,
            metadata
        };
    }

    private readonly logger = new Logger(AllExceptionsFilter.name);
}
