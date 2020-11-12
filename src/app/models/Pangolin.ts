export class Pangolin {
  public id: number;
  public name: string;
  public password: string;
  public pseudo: string;
  public breed: string;
  public weight: number;
  public pangolins: Pangolin[];

  constructor(
    name: string,
    pseudo: string,
    password: string,
    breed: string,
    weight: number,
  ) {
    this.name = name;
    this.pseudo = pseudo;
    this.password = password;
    this.breed = breed;
    this.weight = weight;
  }


}
