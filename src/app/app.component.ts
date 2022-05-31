import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {TableHandlerService} from "./table-handler.service";
import {RowModel} from "./row.model";
import {MatPaginator, MatPaginatorIntl} from '@angular/material/paginator';
import {MatTableDataSource} from "@angular/material/table";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{

  title = 'Inicium-test-task';

  rows: RowModel[] = []

  paginationArr = [4 , 5 , 10]

  @ViewChild(MatPaginator) paginator!: MatPaginator;

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

  // paginator = new MatPaginator(new MatPaginatorIntl())


  editPhase = false;

  editPhaseSet(bol: boolean){
    this.editPhase = bol;
    if(!this.editPhase){
      this.tableHandlerService.save()
    }
  }

  ngOnInit(): void {

  }

  ngAfterViewInit() {

    console.log(window.innerWidth)

    this.paginator.page.subscribe(x =>{
      this.tableHandlerService.paginateRows(x.pageIndex, x.pageSize);
    })

    // this.paginator.pageSize = this.paginationArr[0]
  }

  constructor(public tableHandlerService: TableHandlerService) {

    // this.columns = tableHandlerService.columns;
    this.tableHandlerService.rowsToShowOut?.subscribe(x =>{
      this.rows = x;
    })

    // this.paginator.pageSize = this.paginationArr[0];
    // this.paginator.length = this.tableHandlerService.rows.length

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


  /** The label for the checkbox on the passed row */
  // checkboxLabel(row?: PeriodicElement): string {
  //   if (!row) {
  //     return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
  //   }
  //   return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  // }
}
