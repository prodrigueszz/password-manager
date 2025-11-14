export type SecretsProps = {
  id: string;
  site: string;
  login_identifier: string;
  password: string;
  owner_id: string;
};

export class Secret {
  constructor(private props: SecretsProps) {}

  public static build(
    id: string,
    site: string,
    login_identifier: string,
    password: string,
    owner_id: string
  ) {
    return new Secret({ id, site, login_identifier, password, owner_id });
  }

  get id() {
    return this.props.id;
  }

  get site() {
    return this.props.site;
  }

  get login_identifier() {
    return this.props.login_identifier;
  }

  get password() {
    return this.props.password;
  }

  get owner_id() {
    return this.props.owner_id;
  }
}
