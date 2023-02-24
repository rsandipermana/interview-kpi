import { ValidationError } from 'class-validator';
import { HttpException, HttpStatus } from '@nestjs/common';

export function handleValidationError(validationErrors: ValidationError[]) {
  const errorMessages = validationErrors.map(
    (error) =>
      `${error.property} - ${Object.values(error.constraints).join(', ')}`,
  );
  throw new HttpException(
    {
      status: HttpStatus.BAD_REQUEST,
      error: errorMessages,
    },
    HttpStatus.BAD_REQUEST,
  );
}
