import { Component, ViewChild} from '@angular/core';
import {TableHandlerService} from "./table-handler.service";
import {RowModel} from "./row.model";
import {MatPaginator} from '@angular/material/paginator';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent{

  title = 'Inicium-test-task';

  // Держим массив с записяси, которые нужно показать
  rows: RowModel[] = []

  // Опции пагинатора
  paginationArr = [4 , 5 , 10]

  // Пагинатор
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // Обертка вокруг логики размера страницы
  get tablePageSize(){
    if(this.paginator){
      return this.paginator.pageSize
    }
    return this.paginationArr[0]
  }

  set tablePageSize(x: number){
    if(this.paginator){
      this.paginator.pageSize = x;
      this.tableHandlerService.paginateRows(0, this.paginator.pageSize)
    }
  }

  // Пременная следящая, чтобы можно было изменять только одну строку
  editPhase = false;

  editPhaseSet(bol: boolean){
    this.editPhase = bol;
    // При выходе из фазы именения, сохранить таблицу
    if(!this.editPhase){
      this.tableHandlerService.save()
    }
  }

  ngAfterViewInit() {

    // Подписываемся на изменения состояния пагинатора, чтобы листать страница
    this.paginator.page.subscribe(x =>{
      // Запрашиваем пересбор записей, которые нужно показать
      this.tableHandlerService.paginateRows(x.pageIndex, x.pageSize);
    })
  }

  constructor(public tableHandlerService: TableHandlerService) {
    // Подписываемся на изменение пула записей, которые нужно показать
    this.tableHandlerService.rowsToShowOut?.subscribe(x =>{
      this.rows = x;
    })

    // Производим начальную пагинацию и сборку записей
    this.tableHandlerService.paginateRows(0, this.paginationArr[0])
  }


  // Вспомогательная функция для главного чекбокса
  masterToggle() {
    if (this.tableHandlerService.isAllSelected()) {
      this.tableHandlerService.clearSelection();
      return;
    }
    this.tableHandlerService.selectAll();
  }

}
