import { HttpStatus, ValidationPipe } from "@nestjs/common";

const MIN_LENGTH = 6;
const MAX_LENGTH = 20;
const REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/;
const REGEX_MESSAGE = 'Password must contain at least one lowercase letter, one uppercase letter, one number and one special character';

const VALIDATION_PIPE= new ValidationPipe({
    errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
})

export const PASSWORD={
    MIN_LENGTH,
    MAX_LENGTH,
    REGEX,
    REGEX_MESSAGE,
}

export const SETTINGS={
    VALIDATION_PIPE,
}
