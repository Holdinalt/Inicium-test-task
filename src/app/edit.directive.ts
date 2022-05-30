import {
  AfterViewInit,
  Directive,
  ElementRef, EventEmitter,
  Host,
  HostListener,
  Input,
  OnChanges,
  OnInit, Output,
  SimpleChanges
} from '@angular/core';
import {RowModel} from "./row.model";

@Directive({
  selector: '[appEdit]'
})
export class EditDirective implements AfterViewInit{

  @Input() row?: RowModel
  @Input() editPhase = false;
  @Output() editStart = new EventEmitter<boolean>();

  nameCell?: Element;
  emailCell?: Element;
  phoneCell?: Element;

  public set editing(bol: boolean){
    this.editStart.next(bol);
  }

  public get editing(){
    return this.editPhase
  }



  constructor(private elementRef: ElementRef){
  }

  ngAfterViewInit(): void {
    let elem: HTMLElement = this.elementRef.nativeElement as HTMLElement
    this.findScopeCells(elem)
  }


  @HostListener('mouseover') showEditIco(){
    let elem: HTMLElement = this.elementRef.nativeElement as HTMLElement

    if(!this.editing){

      if(!elem.children.namedItem("editIco")){

        this.hideEditIco()

        let childIco = document.createElement('img');
        childIco.src = 'assets/icons/edit-icon.png'
        childIco.setAttribute('name', 'editIco')
        childIco.setAttribute('id', 'editIco')

        childIco.addEventListener("click", () => this.startEdit(this.row, elem))

        elem.appendChild(childIco);
      }
    }
  }

  hideEditIco(){
    let elemEditIco = document.getElementById('editIco')

    if(elemEditIco){
      elemEditIco.remove();
    }
  }

  showEditUI() {

    let elem: HTMLElement = this.elementRef.nativeElement as HTMLElement

    let childSave = document.createElement('button');
    childSave.append('Сохранить');
    childSave.addEventListener("click", () => this.acceptEdits(this.row))
    childSave.setAttribute('id', 'editUISave')
    childSave.setAttribute('name', 'editUISave')

    let childCancel = document.createElement('button');
    childCancel.append('Отменить');
    // childSave.addEventListener("click", () => this.startEdit(this.row))
    childCancel.setAttribute('id', 'cancelUI')
    childCancel.setAttribute('name', 'cancelUI')

    elem.appendChild(childSave)
    elem.appendChild(childCancel)

  }


  hideEditUI(){

    let elemSave = document.getElementById('editUISave')
    let elemCancel = document.getElementById('cancelUI')

    if(elemSave){
      elemSave.remove();
    }

    if(elemCancel){
      elemCancel.remove();
    }

  }



  startEdit(_row: RowModel | undefined, elem: HTMLElement){

    this.hideEditIco();
    this.editing = true

    if(_row){

      if(this.nameCell){
        let nameSpan = this.nameCell.children[0]
        nameSpan.setAttribute('style', 'display: none')

        let input = document.createElement("input");
        input.setAttribute('class', 'name')
        input.setAttribute('name', 'nameInput')
        input.value = _row.name.toString()

        this.nameCell.appendChild(input)
      }

      if(this.emailCell){

        let emailSpan = this.emailCell.children[0]
        emailSpan.setAttribute('style', 'display: none')

        let input = document.createElement("input");
        input.setAttribute('class', 'email')
        input.setAttribute('name', 'emailInput')
        input.value = _row.email.toString()


        this.emailCell.appendChild(input)
      }

      if(this.phoneCell){

        let phoneSpan = this.phoneCell.children[0]
        phoneSpan.setAttribute('style', 'display: none')

        let input = document.createElement("input");
        input.setAttribute('class', 'phone')
        input.setAttribute('name', 'phoneInput')

        if(_row.phone){
          input.value = _row.phone.toString()
        }

        this.phoneCell.appendChild(input)
      }

    }

    this.showEditUI();

  }

  endEdit(){

      if(this.nameCell){
        let nameSpan = this.nameCell.children[0]
        nameSpan.setAttribute('style', '')

        let nameInput = this.nameCell?.children.namedItem('nameInput')
        if(nameInput){
          nameInput.remove();
        }
      }


      if(this.emailCell){
        let emailSpan = this.emailCell.children[0]
        emailSpan.setAttribute('style', '')

        let emailInput = this.emailCell?.children.namedItem('emailInput')
        if(emailInput){
          emailInput.remove()
        }
      }


      if(this.phoneCell){
        let phoneSpan = this.phoneCell.children[0]
        phoneSpan.setAttribute('style', '')

        let phoneInput = this.phoneCell?.children.namedItem('phoneInput')
        if(phoneInput){
          phoneInput.remove()
        }
      }


    this.hideEditUI();
    this.editing = false;

  }

  findScopeCells(elem: HTMLElement){

    for(let i = 0; i < elem.children.length; i++) {
      if (elem.children[i].tagName == "TD") {
        let child = elem.children[i].children[0]

        switch (child.className) {

          case 'name': {

            this.nameCell = child;
            break
          }

          case 'email': {

            this.emailCell = child
            break
          }

          case 'phone': {

            this.phoneCell = child;
            break
          }
        }
      }
    }
  }

  acceptEdits(row: RowModel | undefined){
    let nameInput = this.nameCell?.children.namedItem('nameInput');
    let phoneInput = this.phoneCell?.children.namedItem('phoneInput')
    let emailInput = this.emailCell?.children.namedItem('emailInput')

    if(nameInput){
      // @ts-ignore
      console.log(nameInput.value)
    }

    if(emailInput){
      // @ts-ignore
      console.log(emailInput.value)
    }

    if(phoneInput){
      // @ts-ignore
      console.log(phoneInput.value)
    }

    this.endEdit();
  }



}


