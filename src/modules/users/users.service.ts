import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { CreateUserDto } from './dto/create-user.dto';
import User, { UserRole } from './entities/user.entity';

/**
 * Servicio para la gestión de usuarios, incluyendo métodos para encontrar usuarios por ID o email, listar todos los usuarios y actualizar roles, con las correspondientes validaciones y manejo de excepciones.
 */
@Injectable()
export class UsersService {
  /**
   * Encuentra un usuario por su ID.
   * @param id del usuario a encontrar
   * @returns El usuario encontrado o null si no existe
   */
  async findOne(id: number) {
    return User.findByPk(id);
  }

  /**
   * Encuentra un usuario por su email.
   * @param email del usuario a encontrar
   * @returns El usuario encontrado o null si no existe
   */
  async findByEmail(email: string) {
    return User.findOne({ where: { email } });
  }

  /**
   * Enumera todos los usuarios registrados, excluyendo sus contraseñas y ordenándolos por fecha de creación de forma descendente.
   * @returns Una lista de usuarios sin sus contraseñas
   */
  async findAll() {
    return User.findAll({
      attributes: { exclude: ['password'] },
      order: [['createdAt', 'DESC']],
    });
  }

  /**
   * Actualiza el rol de un usuario específico, asegurándose de que el usuario exista y que no se intente cambiar el rol del propio usuario.
   * @param id del usuario cuyo rol se desea actualizar
   * @param updateUserRoleDto dto que contiene el nuevo rol a asignar
   * @param currentUserId id del usuario que realiza la solicitud, para evitar que un usuario cambie su propio rol
   * @returns El usuario actualizado sin su contraseña o lanza excepciones si el usuario no existe o si se intenta cambiar el rol del propio usuario
   */
  async updateRole(
    id: number,
    updateUserRoleDto: UpdateUserRoleDto,
    currentUserId: number,
  ) {
    const user = await User.findByPk(id);

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    if (user.id === currentUserId) {
      throw new ForbiddenException('No puedes cambiar tu propio rol');
    }
    await user.update({ role: updateUserRoleDto.role });
    return User.findByPk(id, { attributes: { exclude: ['password'] } });
  }

  async create(createUserDto: CreateUserDto) {
    const existingUser = await User.findOne({
      where: { email: createUserDto.email },
    });
    if (existingUser) {
      throw new ConflictException('El email ya está registrado');
    }

    const user = await User.create({
      email: createUserDto.email,
      password: createUserDto.password,
      name: createUserDto.name,
      lastname: createUserDto.lastname,
      role: createUserDto.role || UserRole.TRABAJADOR,
    });

    return User.findByPk(user.id, { attributes: { exclude: ['password'] } });
  }
}
