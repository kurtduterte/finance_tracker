import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as jwt from 'jsonwebtoken'
import type { FastifyRequest } from 'fastify'

export type AuthenticatedRequest = FastifyRequest & { user: { id: string } }

@Injectable()
export class SupabaseAuthGuard implements CanActivate {
  constructor(private readonly config: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<FastifyRequest>()
    const authHeader = request.headers.authorization

    if (!authHeader?.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing Authorization header')
    }

    const token = authHeader.slice(7)
    const secret = this.config.getOrThrow<string>('SUPABASE_JWT_SECRET')

    let payload: jwt.JwtPayload

    try {
      payload = jwt.verify(token, secret, { algorithms: ['HS256'] }) as jwt.JwtPayload
    } catch {
      throw new UnauthorizedException('Invalid token')
    }

    if (!payload.sub) {
      throw new UnauthorizedException('Token missing sub claim')
    }

    ;(request as AuthenticatedRequest).user = { id: payload.sub }
    return true
  }
}
