import { DomainError } from '../entities/errors/domain.error';
import { 
    ItemNotFoundError,
    InvalidCategoryError,
    CreateItemError,
    UpdateItemError,
    DeleteItemError,
    EmptyFieldError,
    InvalidFieldError,
    NegativeValueError
} from '../entities/errors/item.errors';

export interface ErrorResponse {
    message: string;
    code: string;
    status: number;
}

export class ErrorPresenter {
    static toResponse(error: DomainError): ErrorResponse {

        if (error instanceof ItemNotFoundError) {
            return {
                message: error.message,
                code: 'ITEM_NOT_FOUND',
                status: 404
            };
        }

       
        if (error instanceof EmptyFieldError) {
            return {
                message: error.message,
                code: 'EMPTY_FIELD',
                status: 400
            };
        }

        if (error instanceof InvalidFieldError) {
            return {
                message: error.message,
                code: 'INVALID_FIELD',
                status: 400
            };
        }

        if (error instanceof NegativeValueError) {
            return {
                message: error.message,
                code: 'NEGATIVE_VALUE',
                status: 400
            };
        }

        if (error instanceof InvalidCategoryError) {
            return {
                message: error.message,
                code: 'INVALID_CATEGORY',
                status: 400
            };
        }

   
        if (error instanceof CreateItemError) {
            return {
                message: error.message,
                code: 'CREATE_FAILED',
                status: 400
            };
        }

        if (error instanceof UpdateItemError) {
            return {
                message: error.message,
                code: 'UPDATE_FAILED',
                status: 400
            };
        }

        if (error instanceof DeleteItemError) {
            return {
                message: error.message,
                code: 'DELETE_FAILED',
                status: 400
            };
        }

       
        if (error instanceof DomainError) {
            return {
                message: error.message,
                code: 'DOMAIN_ERROR',
                status: 400
            };
        }

        return {
            message: 'Internal server error',
            code: 'INTERNAL_ERROR',
            status: 500
        };
    }
}
