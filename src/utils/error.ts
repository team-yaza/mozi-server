import createHttpError from 'http-errors';

export const todoNotFound = new createHttpError.NotFound('Todo not found');

export const invalidUUID = new createHttpError.BadRequest('Invalid todo UUID');
