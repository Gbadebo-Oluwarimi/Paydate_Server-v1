export class CreateUserDto {
  username: string;
  password: string;
  email: string;
  companyName: string;
}

export class CreateClientDto {
  ClientName: String;
  ClientDescription: String;
  ClientContact: String;
  ClientAddress: String;
  ClientEmail: String;
}

export class UpdateClientDto {
  ClientName?: String;
  ClientDescription?: String;
  ClientContact?: String;
  ClientAddress?: String;
  ClientEmail?: String;
}
