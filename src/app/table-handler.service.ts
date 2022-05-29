import {Injectable} from '@angular/core';
import {RowModel} from "./row.model";
import {LocalStorageControllerService} from "./local-storage-controller.service";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TableHandlerService{

  private _rows: RowModel[] = [];
  // public columns = ['select', 'name', 'email', 'phone']
  public selectedRowsNum = 0;
  public rowsToShow: RowModel[] = [];

  public rowsToShowOut?: BehaviorSubject<RowModel[]>;

  constructor(private localStorageControllerService: LocalStorageControllerService) {
    this.setRows(localStorageControllerService.getTable());
    this.rowsToShowOut = new BehaviorSubject<RowModel[]>(this.rowsToShow);
  }


  public get rows(){
    return this._rows;
  }

  public set rows(rowsT: RowModel[]){
    this._rows = rowsT
    this.localStorageControllerService.saveTable(this.rows)
  }

  deleteSelected(page: number, pageSize: number): void{
    let newRows: RowModel[] = []

    for (let row of this.rows){

      if(!row.selected){
        newRows.push(row);
      }
    }

    this.rows = newRows;
    this.localStorageControllerService.saveTable(this.rows)
    this.selectedRowsNum = 0;
    this.paginateRows(page, pageSize)
    this.notifyRowsToShow()
    console.log(this.rows)
  }

  addEmptyRow(page: number, pageSize: number){
    let index = page * pageSize;
    this.rows.splice(index, 0, new RowModel())
    this.rows = this.rows
    this.paginateRows(page, pageSize)

    console.log(this.rows)
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

  paginateRows(page: number, maxRows: number){
    this.rowsToShow = [];

    for (let i = page * maxRows; i < (page + 1) * maxRows; i++){
      if(i < this.rows.length){
        this.rowsToShow.push(this.rows[i]);
      }
    }

    this.notifyRowsToShow()
  }

  notifyRowsToShow(){
    this.rowsToShowOut?.next(this.rowsToShow)
  }
}
