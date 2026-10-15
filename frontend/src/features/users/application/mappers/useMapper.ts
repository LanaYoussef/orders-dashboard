import type { User } from "../../domain/User";
import type { UserDto } from "../dto/UserDto";

export function toUser(dto: UserDto): User {
  return { ...dto };
}
