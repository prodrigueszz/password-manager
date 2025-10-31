export class Secrets {
  constructor(
    private ownerId: string,
    private id: number,
    private site: string,
    private loginIdentifier: string,
    private password: string
  ){}
}