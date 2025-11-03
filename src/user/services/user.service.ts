export interface UserService<InputDTO, OutputDTO> {
  execute(input: InputDTO): Promise<OutputDTO>;
}