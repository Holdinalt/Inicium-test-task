import { Injectable } from '@angular/core';
import {RowModel} from "./row.model";
import dataJSON from '../app/data/data.json'

@Injectable({
  providedIn: 'root'
})
export class LocalStorageControllerService {

  constructor() { }

  // Если в локал сторедже нету таблицы, подгружаем из файла

  getTable(): RowModel[]{
    if (localStorage.getItem('table') != null){

      // @ts-ignore
      return JSON.parse(localStorage.getItem('table'));

    }else {
      return this.getTableFromFile()
    }
  }

  // Функция сохранения
  saveTable(rows: RowModel[]){
    localStorage.setItem('table', JSON.stringify(rows));
  }

  getTableFromFile(): RowModel[]{
   let data = dataJSON.users

    let rows: RowModel[] = []

    // В файле есть ИМЯ и ФАМИЛИЯ, а в таблице нет. Надо срастить их

    for(let row of data){
      rows.push(new RowModel(row.name + ' ' + row.surname, row.email, row.phone))
    }

    console.log(rows)
    return rows

  }
}
