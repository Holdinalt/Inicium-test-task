import {Component, ViewChild} from '@angular/core';
import {TableHandlerService} from "./table-handler.service";
import {RowModel} from "./row.model";
import { MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Inicium-test-task';

  rows?: RowModel[]
  columns?: string[]
  dataSource?: MatTableDataSource<RowModel>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.paginator.page.subscribe(x =>{
      console.log(x)
    })
    console.log(this.paginator.length)
    // if(this.dataSource){
    //   this.dataSource.paginator = this.paginator;
    // }
  }

  constructor(public tableHandlerService: TableHandlerService) {
    this.rows = tableHandlerService.rows;
    this.columns = tableHandlerService.columns;
    this.dataSource = new MatTableDataSource<RowModel>(this.rows);
    console.log('lol')

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
