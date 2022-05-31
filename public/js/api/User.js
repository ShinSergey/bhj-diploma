/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
class User {
  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  static setCurrent(user) {
    localStorage.setItem('user', JSON.stringify(user))
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
    localStorage.removeItem('user')
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    let getCurrent = localStorage.getItem('user')
    return getCurrent ? getCurrent : undefined
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch(callback) {
    let options = {
      callback
    }
    let request = createRequest(options)
    request.response ? setCurrent(request.response.user) : unsetCurrent()
  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login(data, callback) {
    let options = {
      url: this.URL + '/login',
      method: 'POST',
      responseType: 'json',
      data,
      callback
    }
    let request = createRequest(options)
    if (request.success) {
      User.setCurrent(request.user)
    } else if (request.error) {
      console.error(request.error)
    }
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register(data, callback) {
    let options = {
      url: this.URL + '/register',
      data,
      method: 'POST',
      callback
    }
    let request = createRequest(options)
    if (request.success) {
      User.setCurrent(request.user)
    } else if (request.error) {
      console.error(request.error.email)
      console.error(request.error.password)
    }
  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout(callback) {
    let options = {
      url: this.URL + '/logout',
      method: 'POST',
      callback
    }
    createRequest(options)
  }
}
