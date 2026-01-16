import { Role } from "../generated/prisma/enums";

export type UserProps = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  masterKeySalt: string;
};

export class User {
  private constructor(private props: UserProps) {}

  public static build(
    id: string,
    name: string,
    email: string,
    password: string,
    role: Role,
    masterKeySalt: string
  ) {
    return new User({ id, name, email, password, role, masterKeySalt });
  }

  get id() {
    return this.props.id;
  }

  get name() {
    return this.props.name;
  }

  get email() {
    return this.props.email;
  }

  get password() {
    return this.props.password;
  }

  get role() {
    return this.props.role;
  }

  get masterKeySalt() {
    return this.props.masterKeySalt;
  }
}
