import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  nombre: string;

  @ApiProperty()
  @Column({ unique: true })
  correo: string;

  @ApiProperty()
  @Column()
  edad: number;

  @ApiProperty()
  @Column({ default: true })
  activo: boolean;
}
