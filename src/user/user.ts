export class User {
  private constructor(
    private name: string,
    private email: string,
    private password: string,
    private id?: string
  ) {}

  public static build(
    name: string,
    email: string,
    password: string,
    id?: string
  ) {
    return new User(name, email, password, id);
  }

  getId(): string | undefined {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getEmail(): string {
    return this.email;
  }

  getPassword(): string {
    return this.password;
  }
}
