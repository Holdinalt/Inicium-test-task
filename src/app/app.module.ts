import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {MatTableModule} from "@angular/material/table";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatPaginatorModule} from "@angular/material/paginator";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { EditDirective } from './edit.directive';
import {MatSelectModule} from "@angular/material/select";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    EditDirective
  ],
  imports: [
    BrowserModule,
    MatTableModule,
    MatCheckboxModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    MatSelectModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
