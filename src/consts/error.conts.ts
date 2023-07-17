import {
    ValidationArguments,
} from 'class-validator/types/validation/ValidationArguments';


export const NO_ACCESS     = 'No access';
export const NO_VALID_DATA = 'No valid data';

export const CV_NO_VALID_LENGTH = (argument: ValidationArguments) => {
    const [ min, max ] = argument.constraints;
    return `not valid length of '${ argument.value ?? '' }'. length must be between ${ min } and ${ max }.`;
};
export const CV_IS_NOT_STRING   = (argument: ValidationArguments) => {
    return `'${ argument.value ?? '' }' is not string.`;
};

export const CV_IS_NOT_EMAIL = (argument: ValidationArguments) => {
    return `'${ argument.value ?? '' }' is not valid email.`;
};