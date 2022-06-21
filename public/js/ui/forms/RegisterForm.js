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
      // User.register(data) 
      if (User.register(data, ((err, response) => {
        if (response && response.user) {
          this.setCurrent(response.user);
        }}))) {  
        element.RegisterForm.reset()
        App.setState('user-logged')
      }
    App.getModal('register').close()
  }
}