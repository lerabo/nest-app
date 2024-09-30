import { User } from '@prisma/client';

export class AuthEntity {
  token: string;

  user: Partial<User>;
}
