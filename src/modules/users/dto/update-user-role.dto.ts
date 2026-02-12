import { IsEnum } from 'class-validator';
import { UserRole } from '../entities/user.entity';

/**
 * DTO para actualizar el rol de un usuario, con validación para asegurar que el rol sea válido.
 */
export class UpdateUserRoleDto {
  @IsEnum(UserRole)
  role: UserRole;
}
