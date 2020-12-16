import { Injectable } from "@nestjs/common";
import * as argon2 from "argon2";

@Injectable()
export class HashService {

  async hashPassword(password: string): Promise<string> {
    return await argon2.hash(password);
  }

  async verifyPassword(hashedPassword, password): Promise<boolean> {
    return await argon2.verify(hashedPassword, password);
  }
}