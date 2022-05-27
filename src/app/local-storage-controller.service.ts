import { Injectable } from '@angular/core';
import {RowModel} from "./row.model";
const dataJSON = require('../app/data/data.json');

@Injectable({
  providedIn: 'root'
})
export class LocalStorageControllerService {

  constructor() { }

  getTable(): RowModel[]{
    if (localStorage.getItem('table') != null){

      // @ts-ignore
      return JSON.parse(localStorage.getItem('table'));

    }else {
      return this.getTableFromFile()
    }
  }

  saveTable(rows: RowModel[]){
    localStorage.setItem('table', JSON.stringify(rows));
  }

  getTableFromFile(): RowModel[]{
   let data = JSON.parse(dataJSON).users

    let rows: RowModel[] = []

    for(let row of data){
      rows.push(new RowModel(row.name + ' ' + row.surname, row.email, row.phone))
    }

    return rows
  }
}
