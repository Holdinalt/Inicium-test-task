import {
  AfterViewInit,
  Directive,
  ElementRef, EventEmitter,
  Host,
  HostListener,
  Input,
  OnChanges,
  OnInit, Output, Renderer2,
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

  @Input() nameCell?: Element;
  @Input() emailCell?: Element;
  @Input() phoneCell?: Element;
  @Input() editIconCell?: Element;

  public set editing(bol: boolean){
    this.editStart.next(bol);
  }

  public get editing(){
    return this.editPhase
  }



  constructor(private elementRef: ElementRef, private renderer: Renderer2){
  }

  ngAfterViewInit(): void {
    let elem: HTMLElement = this.elementRef.nativeElement as HTMLElement
  }


  @HostListener('mouseenter') showEditIco(){
    let elem = this.editIconCell;

    if(!this.editing && elem){

      if(!elem.children.namedItem("editIco")){

        this.hideEditIco()

        let childDiv = document.createElement('div');
        childDiv.setAttribute('class', 'edit-ico')
        childDiv.setAttribute('id', 'editIcoDiv')
        childDiv.style.display = 'flex';
        childDiv.style.alignItems = 'center';
        childDiv.style.cursor = 'pointer'
        childDiv.style.width = '321px'
        childDiv.style.justifyContent = 'flex-end'
        childDiv.style.background = 'linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, #EEEFEF 100%)'
        childDiv.style.height = '100%'
        childDiv.addEventListener("click", () => {
          this.startEdit(this.row)
        })

        let childIco = document.createElement('img');
        childIco.src = 'assets/icons/edit-icon.png'
        // this.startEdit(this.row)

        childDiv.appendChild(childIco);

        elem.appendChild(childDiv)
      }
    }
  }

  hideEditIco(){
    let elemEditIco = document.getElementById('editIcoDiv')

    if(elemEditIco){
      elemEditIco.remove();
    }
  }

  showEditUI() {

    let elem = this.editIconCell


    let childSave = document.createElement('button');
    childSave.append('Сохранить');
    childSave.addEventListener("click", () => this.acceptEdits(this.row))
    childSave.setAttribute('id', 'editUISave')
    childSave.setAttribute('name', 'editUISave')
    childSave.style.color = '#FFFFFF'
    childSave.style.cursor = 'pointer'
    childSave.style.border = 'none'
    childSave.style.background = '#0080FF'
    childSave.style.borderRadius = '8px'
    childSave.style.height = '36px'
    childSave.style.width = '89px'

    let childCancel = document.createElement('button');
    childCancel.append('Отменить');
    childCancel.addEventListener("click", () => this.cancelEdits())
    childCancel.setAttribute('id', 'cancelUI')
    childCancel.setAttribute('name', 'cancelUI')
    childCancel.style.background = '#FFFFFF'
    childCancel.style.border = '1px solid'
    childCancel.style.borderColor = '#979797'
    childCancel.style.color = '#979797'
    childCancel.style.borderRadius = '8px'
    childCancel.style.cursor = 'pointer'
    childCancel.style.height = '36px'
    childCancel.style.width = '89px'
    childCancel.style.marginLeft = '8px'

    if(elem){
      elem.appendChild(childSave)
      elem.appendChild(childCancel)
    }


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



  startEdit(_row: RowModel | undefined){

    this.hideEditIco();
    this.editing = true

    let inp = document.createElement('input')
    inp.style.border = 'none'
    inp.style.background = '#E6F2FF'
    inp.style.borderRadius = '8px'
    inp.style.height = '38px'
    inp.style.color = '#2E2E2E'
    inp.style.paddingLeft = '4px'

    if(_row){

      if(this.nameCell){
        let nameSpan = this.nameCell.children[0]

        nameSpan.setAttribute('style', 'display: none')

        let input = inp.cloneNode(true) as HTMLInputElement;
        input.setAttribute('class', 'name')
        input.setAttribute('name', 'nameInput')
        input.value = _row.name.toString()


        this.nameCell.appendChild(input)
      }

      if(this.emailCell){

        let emailSpan = this.emailCell.children[0]
        emailSpan.setAttribute('style', 'display: none')

        let input = inp.cloneNode(true) as HTMLInputElement;
        input.setAttribute('class', 'email')
        input.setAttribute('name', 'emailInput')
        input.value = _row.email.toString()


        this.emailCell.appendChild(input)
      }

      if(this.phoneCell){

        let phoneSpan = this.phoneCell.children[0]
        phoneSpan.setAttribute('style', 'display: none')

        let input = inp.cloneNode(true) as HTMLInputElement;
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


  acceptEdits(row: RowModel | undefined){
    let nameInput = this.nameCell?.children.namedItem('nameInput');
    let emailInput = this.emailCell?.children.namedItem('emailInput')
    let phoneInput = this.phoneCell?.children.namedItem('phoneInput')

    if(nameInput){
      // @ts-ignore
      this.row?.name = nameInput.value;
    }

    if(emailInput){
      // @ts-ignore
      this.row?.email = emailInput.value
    }

    if(phoneInput){
      // @ts-ignore
      this.row?.phone = phoneInput.value
    }

    console.log(this.row)

    this.endEdit();
  }

  cancelEdits(){
    this.endEdit();
  }



}


