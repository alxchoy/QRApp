import { Component } from '@angular/core';

// componentes - toast
import { ToastController, Platform } from 'ionic-angular';

// plugin barcode scanner para scannear un codigo de barras
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

// servicios
import { HistorialService } from '../../providers/historial/historial';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(private barcodeScanner: BarcodeScanner,
              private toastCtrl: ToastController,
              private platform:Platform,
              private _historialService:HistorialService) {}

  scan() {

    console.log("Realizando scan...")

    // Podemos generar data ficticia (dummy) para no tener la necesidad de iniciar la app en el dispositivo constantemente, evaluamos si cordova
    // está activo, si no, quiere decir que estamos probado desde la computadora y podemos emular las respuestas y/o data del móvil

    if ( !this.platform.is('cordova') ) {
      //this._historialService.agregarHistorial( "http://google.com" );
      this._historialService.agregarHistorial( "geo:-11.954229303877993,-77.04918140638426" );
      return;
    }

    // De esta manera se ejecuta el barcodeScanner
    this.barcodeScanner.scan().then( (barcodeData) => {
      // damos formato a la respuesta (lo encontramos en la documentación del api)
      console.log("Result: " + barcodeData.text);
      console.log("Format: " + barcodeData.format);
      console.log("Cancelled: " + barcodeData.cancelled);

      if (barcodeData.text != null) {
        this._historialService.agregarHistorial( barcodeData.text );
      }

    }, (err) => {
      this.mostrarError("Error: " + err, "middle");
    });
  }

  mostrarError(mensaje:string, position:string) {
    // De esta manera se ejecuta el toast
    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: 2500,
      position: position
    });
    toast.present();
  }

}
