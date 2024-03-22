import { Component } from '@angular/core';
import { Configuracion } from '../models/Configuracion';

@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrl: './juego.component.css',
})
export class JuegoComponent {
  public configuracion: Configuracion;
  public empezarJuego: boolean = false;
  public desactivado: boolean = false;
  public numAcertado: boolean = false;
  public intentosRestantes: number = 0;
  public numeroIntroducido: number = 0;
  public numerosIntroducidos: Array<number> = [];
  public mensaje: string = '';
  public mensajeCSS: string = '';

  constructor() {
    this.configuracion = new Configuracion();
  }

  /**
   * función que comprueba que los parámetros introducidos por el usuario en el formulario
   * son correctos y válidos.
   */
  validarConfiguracion(): void {
    this.numerosIntroducidos = [];
    this.mensaje = '';
    this.mensajeCSS = '';
    if (
      this.configuracion.nombre != '' &&
      this.configuracion.apellido != '' &&
      this.configuracion.rangoNum > 0 &&
      this.configuracion.intentos > 0
    ) {
      this.empezarJuego = true;
      this.desactivado = true;
      this.configuracion.numeroAleatorio();
      this.intentosRestantes = this.configuracion.intentos;
      console.log('Número a adivinar: ' + this.configuracion.numAleatorio);
    } else {
      window.alert(
        'Todos los campos tienen que estar rellenos, y no se admiten números igual o menor a 0'
      );
    }
  }

  /**
   * función que comprueba si el número introducido por el usuario está dentro del rango
   * espeficicado.
   * @returns boolean
   */
  validarNumero(): boolean {
    if (
      this.numeroIntroducido < 0 ||
      this.numeroIntroducido > this.configuracion.rangoNum ||
      this.numeroIntroducido == null
    ) {
      window.alert(
        'Números válidos entre el 0 y el ' + this.configuracion.rangoNum
      );
      return false;
    } else {
      //añdir el número al array de número introducidos
      this.numerosIntroducidos.push(this.numeroIntroducido);
      return true;
    }
  }

  /**
   * función que compara el número introducido por el usuario con el
   * número a adivinar. También controla los intentos restantes, ejecutando el fin del juego.
   */
  comprobarNumero(): void {
    // comprobar que el número introducido por el usuario es válido
    if (this.validarNumero()) {
      // comprobar si se ha acertado el número
      if (this.configuracion.numAleatorio === this.numeroIntroducido) {
        this.mensajeCSS = 'verde';
        this.mensaje = '¿Has Adivinado?: <b>SÍ</b>';
        this.numAcertado = true;
        this.desactivado = false; // bandera de fin de juego
      } else {
        this.mensajeCSS = 'rojo';
        this.mensaje = '¿Has Adivinado?: <b>NO</b>';
      }
      this.intentosRestantes--;
      if (this.intentosRestantes === 0) {
        this.desactivado = false; // bandera de fin de juego
      }
    }
  }
}
