import { Injectable } from '@angular/core';
import {RowModel} from "./row.model";
import {LocalStorageControllerService} from "./local-storage-controller.service";

@Injectable({
  providedIn: 'root'
})
export class TableHandlerService {

  _rows: RowModel[] = [];

  constructor(private localStorageControllerService: LocalStorageControllerService) {}

  public get rows(){
    return this._rows;
  }

  public set rows(rowsT: RowModel[]){
    this._rows = rowsT
    this.localStorageControllerService.saveTable(this.rows)
  }

  deleteSelected(): void{
    let newRows: RowModel[] = []

    for (let row of this.rows){

      if(!row.selected){
        newRows.push(row);
      }
    }

    this.rows = newRows;
  }

  setRows(_rows: RowModel[]){
    this.rows = _rows;
  }
}
