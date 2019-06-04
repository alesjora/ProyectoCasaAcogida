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
      title: 'Informe registros por sexo',
      subtitle: 'Tipo gráfico',
      content: 'Informe en el que se muestra el número de registros por sexo pudiendo filtrar por año, por año y meses e incluso mostrar un histórico del número de registros globales.',
      route: 'registrosPorSexo'
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
