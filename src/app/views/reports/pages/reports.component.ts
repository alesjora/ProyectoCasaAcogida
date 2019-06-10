import { Component, OnInit, ViewChild } from '@angular/core';
import { StoreService } from 'src/app/shared/services/store.service';
import { MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  public dataCards = [
    {
      imageUrl: '../../../assets/photos/grafico.png',
      title: 'Nº de registros por sexo',
      subtitle: 'Tipo: Gráfico de barras',
      content: `Informe en el que se muestra el número de registros por sexo pudiendo filtrar por año,
      por año y meses e incluso mostrar un histórico del número de registros globales.`,
      route: 'registrosPorSexo'
    },
    {
      imageUrl: '../../../assets/photos/tabla.png',
      title: 'Registros entre dos fechas',
      subtitle: 'Tipo: Tabla de datos',
      content: 'Informe en el que se muestra las personas que han entrado a la casa entre una fecha de entrada y una fecha de salida.',
      route: 'registrosEntreFechas'
    }
  ];
  @ViewChild(MatSort) sort: MatSort;

  constructor(private storeService: StoreService) {
    this.storeService.sendCurrentRoute('Informes');
    this.storeService.checkPermission('tecnico');
  }
  ngOnInit() {
  }

}
