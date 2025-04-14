import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  nombre: string;

  @ApiProperty()
  correo: string;

  @ApiProperty()
  edad: number;

  @ApiProperty({ default: true })
  activo?: boolean;
}
