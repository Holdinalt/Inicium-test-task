export class ValidationModel{

  // Класс для валидации

  static nameRegex = /^([А-Яа-я]\s?){1,255}$/;
  static emailRegex =/^[a-z\d._%+-]+@[a-z\d.-]+\.[a-z]{2,4}$/
  static phoneRegex = /^\+7\d{10}$/

  static validateName(name: string): boolean{

    return this.nameRegex.test(name)

  }

  static validateEmail(email: string): boolean{
    return this.emailRegex.test(email)
  }

  static validatePhone(phone: string): boolean{
    if(phone == ''){
      return true
    }

    return this.phoneRegex.test(phone)
  }


}
