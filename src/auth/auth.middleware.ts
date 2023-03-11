import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { userSchema } from './dto';
import { fromZodError } from 'zod-validation-error';

@Injectable()
export class UserRegistrationValidationMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      // Validate the request body against the schema
      const validatedData = await userSchema.parseAsync(req.body);

      // Only allow the properties that are specified in the schema to pass through
      req.body = {
        surname: validatedData.surname,
        name: validatedData.name,
        email: validatedData.email,
        password: validatedData.password,
        confirm_password: validatedData.confirm_password,
        avatar: validatedData.avatar,
      };
      next();
    } catch (error) {
      // If the request body is invalid, return a 400 Bad Request response
      const results = fromZodError(error);
      const errors = results.details.map((error) => {
        return {
          path: error.path.join('.'),
          message: error.message,
        };
      });
      res.status(400).json({
        success: false,
        statusCode: 400,
        message: '🚨 Validation Error Occurred In User Registration 🚨',
        error: errors,
      });
    }
  }
}
