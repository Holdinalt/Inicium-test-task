import {Component, OnInit, ViewChild} from '@angular/core';
import {TableHandlerService} from "./table-handler.service";
import {RowModel} from "./row.model";
import { MatPaginator } from '@angular/material/paginator';
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

  editPhase = false;

  editPhaseSet(bol: boolean){
    this.editPhase = bol;
  }

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


  /** The label for the checkbox on the passed row */
  // checkboxLabel(row?: PeriodicElement): string {
  //   if (!row) {
  //     return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
  //   }
  //   return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  // }
}
