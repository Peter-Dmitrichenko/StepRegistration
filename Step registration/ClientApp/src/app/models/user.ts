export class User {
  constructor(login: string, password: string, hasAgreedToPersonalDataProcessing: boolean, countryId: string, provinceId: string) {
    this.login = login;
    this.password = password;
    this.hasAgreedToPersonalDataProcessing = hasAgreedToPersonalDataProcessing;
    this.countryId = countryId;
    this.provinceId = provinceId;
  }

  login: string;
  password: string;
  hasAgreedToPersonalDataProcessing: boolean;
  countryId: string;
  provinceId: string;
}
