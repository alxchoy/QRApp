import { Injectable } from '@angular/core';

import { ScanData } from '../../models/scan-data.model';

import { InAppBrowser } from '@ionic-native/in-app-browser'; // para abrir el browser nativo del celular

import { ModalController } from 'ionic-angular';

import { MapaPage } from '../../pages/index.paginas';

// Usamos este servicio o provider para manejar el historial de visitas o lecturas de QR

@Injectable()
export class HistorialService {

  private _historial:ScanData[] = [];

  constructor(private iab: InAppBrowser, private modalCtrl: ModalController) {}

  agregarHistorial(texto:string) {
    let data = new ScanData(texto);

    this._historial.unshift(data); // colocamos la data al inicio del arreglo

    console.log(this._historial);

    this.abrirScan(0);
  }

  abrirScan(index:number) {
    let scanData = this._historial[index];
    console.log(scanData);

    switch(scanData.tipo) {
      case "http":
        this.iab.create(scanData.info, "_system"); // esta es la forma de abrir el browser del movil al scanear el codigo QR
      break

      case "mapa":
        this.modalCtrl.create( MapaPage, { coords: scanData.info } ).present();
      break

      default:
        console.error("Tipo no soportado");
    }
  }

  cargarHistorial() {
    return this._historial;
  }

}
