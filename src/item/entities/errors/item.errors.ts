import { DomainError } from './domain.error';

export class ItemNotFoundError extends DomainError {
    constructor(id: string) {
        super(`Item with id "${id}" not found`);
    }
}

export class InvalidCategoryError extends DomainError {
    constructor(category: string, validCategories: string[]) {
        super(`Invalid category "${category}". Valid categories are: ${validCategories.join(', ')}`);
    }
}

export class CreateItemError extends DomainError {
    constructor(message: string) {
        super(`Failed to create item: ${message}`);
    }
}

export class UpdateItemError extends DomainError {
    constructor(id: string, message: string) {
        super(`Failed to update item ${id}: ${message}`);
    }
}

export class DeleteItemError extends DomainError {
    constructor(id: string, message: string) {
        super(`Failed to delete item ${id}: ${message}`);
    }
}

export class EmptyFieldError extends DomainError {
    constructor(field: string) {
        super(`${field} cannot be empty`);
    }
}

export class InvalidFieldError extends DomainError {
    constructor(field: string, reason: string) {
        super(`${field} is invalid: ${reason}`);
    }
}

export class NegativeValueError extends DomainError {
    constructor(field: string) {
        super(`${field} cannot be negative`);
    }
}