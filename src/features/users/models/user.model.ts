import { IsEmail, IsNotEmpty, Length, Matches } from "class-validator";
import { PASSWORD } from "../user.utilis";

export class UserModel {

    @IsNotEmpty()
    @IsEmail()
    email: string;
    
    @IsNotEmpty()
    @Length(PASSWORD.MIN_LENGTH, PASSWORD.MAX_LENGTH)
    @Matches(PASSWORD.REGEX, { message: PASSWORD.REGEX_MESSAGE })
    password: string;

  }