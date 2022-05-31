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
import {ValidationModel} from "./validation.model";

@Directive({
  selector: '[appEdit]'
})
export class EditDirective{

  // Передаем строку для последущего измененя
  @Input() row?: RowModel
  // Двухстороння привязка, чтобы обновременно изменять только одну строку
  @Input() editPhase = false;
  @Output() editStart = new EventEmitter<boolean>();

  // Ячейки которыми необходимо манипулировать для создания UI
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

  constructor(){
  }


  // Создания начального UI (карандишик справа)
  @HostListener('mouseenter') showEditIco(){
    // TODO Рудимент
    let elem = this.editIconCell;

    if(!this.editing && elem){

      // Запрещено повторно отображать UI на одной и той же записи
      if(!elem.children.namedItem("editIco")){

        // Скрытие UI при переходи на другую стркоу
        this.hideEditIco()

        // Создание элемента DOM (обертка карандишика)
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
        // При нажатии отображаем основной UI изменений
        childDiv.addEventListener("click", () => {
          this.startEdit(this.row)
        })

        // Создание элемента (карандашика)
        let childIco = document.createElement('img');
        childIco.src = 'assets/icons/edit-icon.svg'
        childIco.style.marginRight = '25px'

        // Вставка
        childDiv.appendChild(childIco);

        elem.appendChild(childDiv)
      }
    }
  }

  hideEditIco(){
    // Удаление начального UI(карандашика)
    let elemEditIco = document.getElementById('editIcoDiv')

    if(elemEditIco){
      elemEditIco.remove();
    }
  }

  // Введение кнопок UI для Подтверждения и Отмены
  showEditUI(): HTMLButtonElement {

    // TODO Рудимент
    let elem = this.editIconCell


    // Создание кнопки сохранения
    let childSave = document.createElement('button');
    childSave.append('Сохранить');
    // Подтверждение именений
    childSave.addEventListener("click", () => this.acceptEdits(this.row)) //ыы
    childSave.setAttribute('id', 'editUISave')
    childSave.setAttribute('name', 'editUISave')
    childSave.style.color = '#FFFFFF'
    childSave.style.cursor = 'pointer'
    childSave.style.border = 'none'
    childSave.style.background = '#0080FF'
    childSave.style.borderRadius = '8px'
    childSave.style.height = '36px'
    childSave.style.width = '89px'
    childSave.name = '0'

    // Создание кнопки отмены
    let childCancel = document.createElement('button');
    childCancel.append('Отменить');
    // Отмена изменений
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

    // Присоеденение к DOM
    if(elem){
      elem.appendChild(childSave)
      elem.appendChild(childCancel)
    }

    return childSave;

  }


  hideEditUI(){

    // Удаление кнопок основного UI для изменения
    let elemSave = document.getElementById('editUISave')
    let elemCancel = document.getElementById('cancelUI')

    if(elemSave){
      elemSave.remove();
    }

    if(elemCancel){
      elemCancel.remove();
    }

  }


  // Функция для отображние UI изменения записи
  startEdit(_row: RowModel | undefined){

    // Спрятать иконку стрта изменения (карандишика)
    this.hideEditIco();
    // Уведомеить компоненты и начале фазы изменений
    this.editing = true

    // Создание типового Input для изменения строки
    let inp = document.createElement('input')
    inp.style.border = 'none'
    inp.style.background = '#E6F2FF'
    inp.style.borderRadius = '8px'
    inp.style.height = '38px'
    inp.style.color = '#2E2E2E'
    inp.style.paddingLeft = '4px'

    // Создание инпутов под каждый столбец
    if(_row){

      // Получаем ссылку на кнопку сохранения
      let saveButton = this.showEditUI();

      if(this.nameCell){
        // Скрываем span с атрибутом записи (Имя)
        let nameSpan = this.nameCell.children[0]
        nameSpan.setAttribute('style', 'display: none')

        // Клонируем основной Input и декорируем
        let input = inp.cloneNode(true) as HTMLInputElement;
        input.setAttribute('class', 'name')
        input.setAttribute('name', 'nameInput')
        // Добавляем значение из записи
        input.value = _row.name.toString()
        // Добавляем валидацию
        input.addEventListener('change', () => this.nameValidator(input, saveButton));

        // Вставляем в DOM
        this.nameCell.appendChild(input)
      }

      if(this.emailCell){

        // Скрываем span с атрибутом записи (Имеил)
        let emailSpan = this.emailCell.children[0]
        emailSpan.setAttribute('style', 'display: none')

        // Клонируем основной Input и декорируем
        let input = inp.cloneNode(true) as HTMLInputElement;
        input.setAttribute('class', 'email')
        input.setAttribute('name', 'emailInput')
        // Добавляем значение из записи
        input.value = _row.email.toString()
        // Добавляем валидацию
        input.addEventListener('change', () => this.emailValidator(input, saveButton));

        // Вставляем в DOM
        this.emailCell.appendChild(input)
      }

      if(this.phoneCell){

        // Скрываем span с атрибутом записи (Телефон)
        let phoneSpan = this.phoneCell.children[0]
        phoneSpan.setAttribute('style', 'display: none')

        // Клонируем основной Input и декорируем
        let input = inp.cloneNode(true) as HTMLInputElement;
        input.setAttribute('class', 'phone')
        input.setAttribute('name', 'phoneInput')
        // Добавляем валидацию
        input.addEventListener('change', () => this.phoneValidator(input, saveButton));

        // Добавляем значение из записи
        if(_row.phone){
          input.value = _row.phone.toString()
        }

        // Вставляем в DOM
        this.phoneCell.appendChild(input)
      }

    }

  }

  // Функция окончания изменений
  endEdit(){


      if(this.nameCell){
        // Восстанавливаем значения столбцов
        let nameSpan = this.nameCell.children[0]
        nameSpan.setAttribute('style', '')

        // Удаление UI для изменения значения столбца
        let nameInput = this.nameCell?.children.namedItem('nameInput')
        if(nameInput){
          nameInput.remove();
        }
      }


      if(this.emailCell){
        // Восстанавливаем значения столбцов
        let emailSpan = this.emailCell.children[0]
        emailSpan.setAttribute('style', '')

        // Удаление UI для изменения значения столбца
        let emailInput = this.emailCell?.children.namedItem('emailInput')
        if(emailInput){
          emailInput.remove()
        }
      }


      if(this.phoneCell){
        // Восстанавливаем значения столбцов
        let phoneSpan = this.phoneCell.children[0]
        phoneSpan.setAttribute('style', '')

        // Удаление UI для изменения значения столбца
        let phoneInput = this.phoneCell?.children.namedItem('phoneInput')
        if(phoneInput){
          phoneInput.remove()
        }
      }

    // Прячем кнопки подтверждения и отмены
    this.hideEditUI();
    // Уведомляем компоненты озавершении изменений
    this.editing = false;

  }

  // Функция для подтверждения изменений
  acceptEdits(row: RowModel | undefined){ //ыы
    let nameInput = this.nameCell?.children.namedItem('nameInput') as HTMLInputElement;
    let emailInput = this.emailCell?.children.namedItem('emailInput') as HTMLInputElement
    let phoneInput = this.phoneCell?.children.namedItem('phoneInput') as HTMLInputElement

    // Загружаем изменения в запись из Input
    if(row){
      if(nameInput){

        row.name = nameInput.value;
      }

      if(emailInput){
        row.email = emailInput.value
      }

      if(phoneInput){
        row.phone = phoneInput.value
      }
    }

    // Заканчиваем изменения
    this.endEdit();
  }

  // Отмена изменений
  cancelEdits(){
    this.endEdit();
  }

  // Валидаторы
  nameValidator(input: HTMLInputElement, disButton: HTMLButtonElement){
    if(!ValidationModel.validateName(input.value)){
      this.validationError(input, disButton)
    }else{
      this.validationGood(input, disButton)
    }

  }

  phoneValidator(input: HTMLInputElement, disButton: HTMLButtonElement){
    if(!ValidationModel.validatePhone(input.value)){
      this.validationError(input, disButton)
    }else{
      this.validationGood(input, disButton)
    }
  }

  emailValidator(input: HTMLInputElement, disButton: HTMLButtonElement){
    if(!ValidationModel.validateEmail(input.value)){
      this.validationError(input, disButton)
    }else{
      this.validationGood(input, disButton)
    }
  }

  // Неверная валидация
  validationError(input: HTMLInputElement, disButton: HTMLButtonElement){
    disButton.disabled = true;
    // Сохраняем стйет в кнопке, чтобы следить за измененями модели
    // Стейт показывает количество ошибочно заполненных Input
    disButton.name = (Number.parseInt(disButton.name) + 1).toString();
    disButton.style.opacity = '0.4';
    input.style.background = '#FFE5E5'
  }

  validationGood(input: HTMLInputElement, disButton: HTMLButtonElement){

    input.style.background = '#E6F2FF'

    // Загружаем стейт
    let errors = Number.parseInt(disButton.name)
    // Смотрим, чтобы все Input были впорядке, чтобы включить кнопку
    if(errors <= 1){
      disButton.disabled = false
      disButton.style.opacity = '1';
    }

    if(errors > 0){
      disButton.name = (Number.parseInt(disButton.name) - 1).toString();
    }
  }

}


