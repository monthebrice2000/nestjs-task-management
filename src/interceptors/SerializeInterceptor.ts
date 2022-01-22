import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}
  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<any> {
    return next.handle().pipe(
      map((data: any) => {
        return plainToClass(this.dto, data, {
          strategy: 'exposeAll',
        });
      }),
    );
  }
}
