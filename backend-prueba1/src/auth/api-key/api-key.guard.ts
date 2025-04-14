import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();

    const apiKey = request.headers['api-key'];
    const apiSecret = request.headers['api-secret'];

    // Puedes mover esto a .env
    const validKey = process.env.API_KEY || 'root';
    const validSecret = process.env.API_SECRET || 'root';

    if (apiKey !== validKey || apiSecret !== validSecret) {
      throw new UnauthorizedException('API key or secret is invalid');
    }

    return true;
  }
}
