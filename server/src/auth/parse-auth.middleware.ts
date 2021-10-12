import {
  JwtExpiredException,
  JwtInvalidException,
} from './../customErrors/Jwt';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenExpiredError, JsonWebTokenError } from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import { JwtEmptyException, NotABearerException } from 'src/customErrors/Jwt';
import { RequestWithUser } from './requestWithUser';

@Injectable()
export class parseAuth implements NestMiddleware {
  constructor(private jwtService: JwtService) {}
  async use(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      if (!req.headers.authorization) {
        throw new NotABearerException();
      }
      const [Bearer, token] = req.headers.authorization.split(' ');
      if (Bearer != 'Bearer') {
        throw new NotABearerException();
      }
      if (!token) {
        throw new JwtEmptyException();
      }
      const userObj = await this.jwtService.verifyAsync(token, {
        secret: process.env.ACCESS_TOKEN_SECRET,
      });
      req.userObj = userObj;
      next();
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        return next(new JwtExpiredException());
      }
      if (error instanceof JsonWebTokenError) {
        return next(new JwtInvalidException());
      }
      console.log(error);
      next(error);
    }
  }
}
