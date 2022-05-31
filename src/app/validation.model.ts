export class ValidationModel{

  nameRegex = /([A-Яа-я]\s?){1,255}/;
  emailRegex =/^[a-z\d._%+-]+@[a-z\d.-]+\.[a-z]{2,4}$/
  phoneRegex = /^\+7\d{10}$/

  validateName(name: string): boolean{

    return this.nameRegex.test(name)

  }

  validateEmail(email: string): boolean{
    return this.emailRegex.test(email)
  }

  validationPhone(phone: string): boolean{
    if(phone == ''){
      return true
    }

    return this.phoneRegex.test(phone)
  }
}
