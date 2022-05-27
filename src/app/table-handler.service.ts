import {Injectable} from '@angular/core';
import {RowModel} from "./row.model";
import {LocalStorageControllerService} from "./local-storage-controller.service";

@Injectable({
  providedIn: 'root'
})
export class TableHandlerService{

  private _rows: RowModel[] = [];
  public columns = ['select', 'name', 'email', 'phone']
  public selectedRowsNum = 0;

  constructor(private localStorageControllerService: LocalStorageControllerService) {
    this.setRows(localStorageControllerService.getTable());
  }


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
    this.localStorageControllerService.saveTable(this.rows)
    this.selectedRowsNum = 0;
  }

  setRows(_rows: RowModel[]){
    this.rows = _rows;
  }


  // Table selection

  isAllSelected(): boolean{
    return this.selectedRowsNum === this.rows.length;
  }

  clearSelection(){
    for (let row of this.rows){
      row.selected = false;
    }
    this.selectedRowsNum = 0;
  }

  selectAll(){
    for (let row of this.rows){
      row.selected = true;
    }
    this.selectedRowsNum = this.rows.length;
  }

  toggleRow(row: RowModel){
    if(row.selected){
      this.selectedRowsNum--;
      row.selected = false;
    }else {
      this.selectedRowsNum++;
      row.selected = true;
    }
  }

}
