import { IsEmail, IsString } from 'class-validator';

/**
 * DTO para el inicio de sesión de un usuario, con validaciones para cada campo.
 */
export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
