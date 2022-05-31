// Модель в коорой хранятся записи
export class RowModel{
  // Стандартные значения
  // TODO Нужно переделать в undefined
  name = 'No Name'
  selected = false;
  email = 'example@mail.com'
  phone?: String

  constructor(_name?: string, _email?: string, _phone?: string) {

    if(_name){
      this.name = _name;
    }

    if(_email){
      this.email = _email
    }

    if(_phone){
      this.phone = _phone;
    }
  }
}
