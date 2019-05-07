import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';


const ELEMENT_DATA= [
  {FechaEntrada: '13/01/2019', FechaSalida: '10/12/2019'},
  {FechaEntrada: '30/05/2019', FechaSalida: '21/09/2019'},
  {FechaEntrada: '11/04/2019', FechaSalida: '10/07/2019'},
  {FechaEntrada: '20/03/2019', FechaSalida: '10/12/2019'},
  {FechaEntrada: '10/01/2019', FechaSalida: '22/01/2019'}
];
@Component({
  selector: 'app-table-sorting',
  templateUrl: './table-sorting.component.html',
  styleUrls: ['./table-sorting.component.scss']
})
export class TableSortingComponent implements OnInit {
  displayedColumns: string[] = ['FechaEntrada', 'FechaSalida'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }
}
