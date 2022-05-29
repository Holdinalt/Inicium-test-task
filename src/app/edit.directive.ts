import {Directive, ElementRef, Host, HostListener, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {RowModel} from "./row.model";

@Directive({
  selector: '[appEdit]'
})
export class EditDirective{

  @Input() row?: RowModel

  constructor(private elementRef: ElementRef) {
  }
  @HostListener('mouseover') showEditUI(event: Event) {

    let elem: HTMLElement = this.elementRef.nativeElement as HTMLElement

    if (elem.tagName === 'TR' && !elem.children.namedItem("editUI")) {
      this.hideEditUI()
      // console.log(elem.tagName)

      let child = document.createElement('button');
      child.append('Изменить');
      child.addEventListener("click", () => this.startEdit(this.row))
      child.setAttribute('id', 'editUI')
      child.setAttribute('name', 'editUI')

      elem.appendChild(child)
    }


  }

  hideEditUI(){

    let elem = document.getElementById('editUI')

    if(elem){
      elem.remove();
    }

  }

  startEdit(_row: RowModel | undefined){

    if(_row){
      console.log(this.row)

      console.log("edit")
    }

  }




}
