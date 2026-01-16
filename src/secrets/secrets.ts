export type SecretsProps = {
  id: string;
  site: string;
  loginIdentifier: string;
  ciphertext: string;
  iv: string;
  authTag: string;
  createdAt: Date;
  updatedAt: Date;
  ownerId: string;
};

export class Secret {
  constructor(private props: SecretsProps) {}

  public static build(
    id: string,
    site: string,
    loginIdentifier: string,
    ciphertext: string,
    iv: string,
    authTag: string,
    createdAt: Date,
    updatedAt: Date,
    ownerId: string
  ) {
    return new Secret({ 
      id, 
      site, 
      loginIdentifier, 
      ciphertext, 
      iv, 
      authTag,
      createdAt,
      updatedAt,
      ownerId 
    });
  }

  get id() {
    return this.props.id;
  }

  get site() {
    return this.props.site;
  }

  get loginIdentifier() {
    return this.props.loginIdentifier;
  }

  get ciphertext() {
    return this.props.ciphertext;
  }

  get iv() {
    return this.props.iv;
  }

  get authTag() {
    return this.props.authTag;
  }

  get ownerId() {
    return this.props.ownerId;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }
}
