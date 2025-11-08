export type UserProps = {
  name: string,
  email: string,
  password: string,
  id?: string
}

export class User {
  private constructor(private props: UserProps) {}

  public static build(  
    name: string,
    email: string,
    password: string,
    id: string
  ) {
    return new User({ name, email, password, id });
  }

  public static create(
    name: string,
    email: string,
    password: string
  ) {
    return new User({ name, email, password });
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
    return this.props.email;
  }
}
