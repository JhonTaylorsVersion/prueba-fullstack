import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
  ) {}

  async createFake(): Promise<User[]> {
    const users = this.repo.create([
      { nombre: 'Jhon Cacuango', correo: 'jhon@ejemplo.com', edad: 23 },
      { nombre: 'Danielito', correo: 'dani@correo.com', edad: 24 },
    ]);
    return this.repo.save(users);
  }

  async create(data: CreateUserDto): Promise<User> {
    const user = this.repo.create(data);
    return this.repo.save(user);
  }

  findAll(): Promise<User[]> {
    return this.repo.find();
  }
}
