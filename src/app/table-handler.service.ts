import {Injectable} from '@angular/core';
import {RowModel} from "./row.model";
import {LocalStorageControllerService} from "./local-storage-controller.service";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TableHandlerService{

  private _rows: RowModel[] = []; // Все записи храняться здесь
  public selectedRowsNum = 0; // Количество выделенных строк
  public rowsToShow: RowModel[] = []; // Строки которые необходимо отобразить в таблице

  public rowsToShowOut?: BehaviorSubject<RowModel[]>; // Уведомление компонентов о изменении строк для показа

  constructor(private localStorageControllerService: LocalStorageControllerService) {
    this.setRows(localStorageControllerService.getTable()); // Получаем строки
    this.rowsToShowOut = new BehaviorSubject<RowModel[]>(this.rowsToShow); // Создаем нотификатор
  }


  public get rows(){
    return this._rows;
  }

  public set rows(rowsT: RowModel[]){
    this._rows = rowsT
    this.localStorageControllerService.saveTable(this.rows)
  }

  save(){
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
    // Сейвим изменения после удаления
    this.localStorageControllerService.saveTable(this.rows)
    // т.к. все выделенные удалены, обнуляем
    this.selectedRowsNum = 0;
    // Заного производим пагинацию
    this.paginateRows(page, pageSize)
  }

  addEmptyRow(page: number, pageSize: number){
    // Ищем индекс для вставки на страницу, где находимся в соответсвии с пагинацией
    let index = page * pageSize;
    // Вставляем шаблон страницы
    this.rows.splice(index, 0, new RowModel())
    // Савимся после инъекции
    this.localStorageControllerService.saveTable(this.rows)
    // Пересобираем строки для показа
    this.paginateRows(page, pageSize)
  }

  setRows(_rows: RowModel[]){
    this.rows = _rows;
  }

  // Вспомогательная функция для главного селекта
  isAllSelected(): boolean{
    // Очень часто юзаем эту функцию, поэтому храними переменную selectedRowsNum
    return this.selectedRowsNum === this.rows.length;
  }

  // Вспомогательная функция для главного селекта
  clearSelection(){
    for (let row of this.rows){
      row.selected = false;
    }
    this.selectedRowsNum = 0;
  }

  // Вспомогательная функция для главного селекта
  selectAll(){
    for (let row of this.rows){
      row.selected = true;
    }
    this.selectedRowsNum = this.rows.length;
  }

  // Переключатель выделености строки
  toggleRow(row: RowModel){

    if(row.selected){
      this.selectedRowsNum--;
      row.selected = false;
    }else {
      this.selectedRowsNum++;
      row.selected = true;
    }

  }

  // Функция создания пагинации
  paginateRows(page: number, maxRows: number){
    this.rowsToShow = [];

    // Выделяем строки, которые нужно показывать в соответствии с индексами
    for (let i = page * maxRows; i < (page + 1) * maxRows; i++){
      if(i < this.rows.length){
        this.rowsToShow.push(this.rows[i]);
      }
    }

    // Уведомляем о изменении
    this.notifyRowsToShow()
  }

  // Уведомление о изменении
  notifyRowsToShow(){
    this.rowsToShowOut?.next(this.rowsToShow)
  }
}
