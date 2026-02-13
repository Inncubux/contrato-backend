import { LoginDto } from './dto/login.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import User, { UserRole } from '../users/entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
/**
 * Servicio de autenticación que maneja el registro y login de usuarios, utilizando bcrypt para el hashing de contraseñas y JWT para la generación de tokens de acceso.
 */
export class AuthService {
  constructor(private jwtService: JwtService) {}

  /**
   * Registra un nuevo usuario, asegurándose de que el email no esté ya registrado, hashando la contraseña y generando un token JWT para el usuario registrado.
   * @param registerDto DTO que contiene la información necesaria para registrar un nuevo usuario, incluyendo email, contraseña, nombre y apellido.
   * @returns Un objeto que contiene el token de acceso JWT y la información del usuario registrado, o lanza una excepción si el email ya está registrado.
   */
  async register(registerDto: RegisterDto) {
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    const user = await User.create({
      email: registerDto.email,
      password: hashedPassword,
      name: registerDto.name,
      lastname: registerDto.lastname,
      role: UserRole.TRABAJADOR,
    });

    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        lastname: user.lastname,
        role: user.role,
      },
    };
  }
  /**
   * Inicia sesión para un usuario existente, validando las credenciales proporcionadas y generando un token JWT si las credenciales son válidas.
   * @param loginDto DTO que contiene el email y la contraseña del usuario que intenta iniciar sesión.
   * @returns Un objeto que contiene el token de acceso JWT y la información del usuario, o lanza una excepción si las credenciales son inválidas.
   */
  async login(loginDto: LoginDto) {
    const user = await User.findOne({ where: { email: loginDto.email } });

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        lastname: user.lastname,
        role: user.role,
      },
    };
  }
}
