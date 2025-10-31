import { v1 as uuidv1 } from "uuid";

export class User {
  private constructor(
    private id: string,
    private name: string,
    private email: string,
    private password: string
  ) {}

  public static create(name: string, email: string, password: string) {
    const newId = uuidv1();
    return new User(newId, name, email, password);
  }

  public static build(
    id: string,
    name: string,
    email: string,
    password: string
  ) {
    return new User(id, name, email, password);
  }

  getId(): string {
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
