/**
 * Класс RegisterForm управляет формой
 * регистрации
 * */
class RegisterForm extends AsyncForm {
  /**
   * Производит регистрацию с помощью User.register
   * После успешной регистрации устанавливает
   * состояние App.setState( 'user-logged' )
   * и закрывает окно, в котором находится форма
   * */
  onSubmit(data) {
    try {
      User.register(data) 
      if (User.register(data)) {  
        this.RegisterForm.reset()
        App.setState('user-logged')
      }
    } catch (e) {
      callback(e)
    }

    this.Modal.close()
  }
}