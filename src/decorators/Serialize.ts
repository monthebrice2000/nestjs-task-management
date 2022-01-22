import { UseInterceptors } from '@nestjs/common';
import { SerializeInterceptor } from '@interceptors/SerializeInterceptor';

export const Serialize = (dto: any) => {
  return UseInterceptors(new SerializeInterceptor(dto));
};
