import {Component, OnInit, ViewChild} from '@angular/core';
import {TableHandlerService} from "./table-handler.service";
import {RowModel} from "./row.model";
import { MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource} from "@angular/material/table";

export class PaginationInterface{

  constructor(public maxRows = 0, public page = 0) {
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{

  title = 'Inicium-test-task';

  rows?: RowModel[]
  // columns?: string[]

  paginationArr = [4 , 5 , 10]

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    this.paginator.page.subscribe(x =>{
      this.tableHandlerService.paginateRows(x.pageIndex, x.pageSize);
    })


  }

  constructor(public tableHandlerService: TableHandlerService) {

    // this.columns = tableHandlerService.columns;
    this.tableHandlerService.rowsToShowOut?.subscribe(x =>{
      this.rows = x;
    })
    this.tableHandlerService.paginateRows(0, this.paginationArr[0])
  }



  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.tableHandlerService.isAllSelected()) {
      this.tableHandlerService.clearSelection();
      return;
    }
    this.tableHandlerService.selectAll();
  }

  showEditUI(event: Event){

    let child = document.createElement('div');
    child.append('lol');
    child.setAttribute('id', 'editUI')

    let elem: HTMLElement = event.target as HTMLElement
    if(elem.parentElement && elem.tagName === 'TD' && elem.parentElement.tagName === 'TR'){
      console.log(elem.tagName)
      elem = elem.parentElement;
      elem.appendChild(
        child
      )
    }
    // console.log(elem.parentElement)




  }

  hideEditUI(event: Event){


    let elem = document.getElementById('editUI')

    if(elem){
      elem.remove();
      elem = document.getElementById('editUI')
    }



    // let elem: HTMLElement = event.target as HTMLElement
    // if(elem.parentElement && elem.parentElement.className != 'table'){
    //   elem = elem.parentElement;
    //   elem.removeChild()
    // }

  }


  /** The label for the checkbox on the passed row */
  // checkboxLabel(row?: PeriodicElement): string {
  //   if (!row) {
  //     return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
  //   }
  //   return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  // }
}
