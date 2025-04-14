import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import {
  ApiTags,
  ApiSecurity,
  ApiHeader,
  ApiResponse,
  ApiOperation,
} from '@nestjs/swagger';

@ApiTags('users')
@ApiSecurity('api-key')
@ApiSecurity('api-secret')
@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get('seed')
  @ApiOperation({ summary: 'Insertar usuarios de prueba' })
  @ApiHeader({ name: 'api-key', required: true })
  @ApiHeader({ name: 'api-secret', required: true })
  @ApiResponse({
    status: 201,
    description: 'Usuarios insertados correctamente.',
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado (API key inválida).',
  })
  async seed() {
    return this.service.createFake();
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  @ApiHeader({ name: 'api-key', required: true })
  @ApiHeader({ name: 'api-secret', required: true })
  @ApiResponse({ status: 200, description: 'Lista de usuarios.' })
  @ApiResponse({
    status: 401,
    description: 'No autorizado (API key inválida).',
  })
  async getAll() {
    return this.service.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo usuario' })
  @ApiHeader({ name: 'api-key', required: true })
  @ApiHeader({ name: 'api-secret', required: true })
  @ApiResponse({ status: 201, description: 'Usuario creado exitosamente.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos o repetidos.' })
  @ApiResponse({
    status: 401,
    description: 'No autorizado (API key inválida).',
  })
  async create(@Body() dto: CreateUserDto) {
    return this.service.create(dto);
  }
}
