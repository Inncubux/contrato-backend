import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { UserRole } from '../entities/user.entity';

/**
 * DTO para la creación de un nuevo usuario, con validaciones para cada campo.
 */
export class CreateUserDto {
  @IsString()
  @MinLength(2)
  name: string;
  @IsString()
  @MinLength(2)
  lastname: string;
  @IsEmail()
  email: string;
  @IsString()
  @MinLength(6)
  password: string;
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;
}
