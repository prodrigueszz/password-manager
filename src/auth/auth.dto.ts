import { z } from 'zod';
import { loginSchema } from './auth.schema';

export type LoginInputDTO = z.infer<typeof loginSchema>;
export type LoginOutputDTO = {
  isFound: boolean,
  token: string | null
}
