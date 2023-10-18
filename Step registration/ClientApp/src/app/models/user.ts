export class User {
  constructor(login: string, password: string, HasAgreedToPersonalDataProcessing: boolean, countryId: string, provinceId: string) {
    this.login = login;
    this.password = password;
    this.HasAgreedToPersonalDataProcessing = HasAgreedToPersonalDataProcessing;
    this.countryId = countryId;
    this.provinceId = provinceId;
  }

  login: string;
  password: string;
  HasAgreedToPersonalDataProcessing: boolean;
  countryId: string;
  provinceId: string;
}
