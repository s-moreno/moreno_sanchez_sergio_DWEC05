export class Configuracion {
  public nombre: String;
  public apellido: String;
  public rangoNum: number;
  public intentos: number;
  public numAleatorio: number;

  constructor() {
    this.nombre = '';
    this.apellido = '';
    this.rangoNum = 1;
    this.intentos = 1;
    this.numAleatorio = 0;
  }

  /**
   * función que genera un número aleatorio entre el 0 y un numero dado (rangoNum), ambos incluidos.
   */
  public numeroAleatorio(): void {
    this.numAleatorio = Math.round(Math.random() * this.rangoNum);
  }
}
