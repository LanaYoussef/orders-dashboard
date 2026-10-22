import { http } from "../../../shared/http.ts";
import type { User } from "../domain/User";
import type { UserRepository } from "../domain/UserRepository";
import type { UserDto } from "../application/dto/UserDto";
import { toUser } from "../application/mappers/useMapper";

export class HttpUserRepository implements UserRepository {
  async getAll(): Promise<User[]> {
    const data = (await http("GET", "/api/users")) as UserDto[];
    return data.map(toUser);
  }
}
