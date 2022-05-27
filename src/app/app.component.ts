import { Component } from '@angular/core';
import {TableHandlerService} from "./table-handler.service";
import {RowModel} from "./row.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Inicium-test-task';

  rows?: RowModel[]
  columns?: string[]

  constructor(public tableHandlerService: TableHandlerService) {
    this.rows = tableHandlerService.rows;
    this.columns = tableHandlerService.columns;
    console.log(this.rows)
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
