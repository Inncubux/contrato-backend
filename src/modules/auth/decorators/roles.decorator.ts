import { SetMetadata } from '@nestjs/common';
import { ROLES_KEY } from '../guards/roles.guard';

/**
 * Decorador para especificar los roles permitidos para acceder a un controlador o método.
 * @param roles Lista de roles permitidos
 * @returns Un decorador de NestJS que establece los metadatos de roles
 */
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
