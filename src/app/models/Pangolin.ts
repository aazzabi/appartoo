export class Pangolin {
  public _id: number;
  public name: string;
  public password: string;
  public pseudo: string;
  public breed: string;
  public phone: string;
  public address: string;
  public weight: number;
  public pangolins: Pangolin[];

  constructor(
    name: string,
    pseudo: string,
    password: string,
    breed: string,
    weight: number,
    phone: string,
    address: string,
  ) {
    this.name = name;
    this.pseudo = pseudo;
    this.password = password;
    this.breed = breed;
    this.weight = weight;
    this.phone = phone;
    this.address = address;
  }

  toString() {
    return this.name;
  }
}
