import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
/**
 * Controlador de autenticación que expone los endpoints para el registro y login de usuarios, delegando la lógica de negocio al AuthService.
 */
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  /**
   * Endpoint para registrar un nuevo usuario, que recibe un DTO con la información del usuario a registrar y devuelve un token JWT junto con la información del usuario registrado.
   */
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  /**
   * Endpoint para autenticar a un usuario, que recibe un DTO con las credenciales de login y devuelve un token JWT junto con la información del usuario autenticado.
   */
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
