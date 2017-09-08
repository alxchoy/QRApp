
export class ScanData {

  info:string; // es la url completa
  tipo:string; // me dirá el tipo de información que la persona scanea

  constructor( texto:string ) {
    this.tipo = "no definido";
    this.info = texto;

    if ( texto.startsWith("http") ) {
      this.tipo = "http";
    } else if ( texto.startsWith("geo") ) {
      this.tipo = "mapa";
    }
  }

}