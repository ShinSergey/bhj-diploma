/**
 * Класс Account наследуется от Entity.
 * Управляет счетами пользователя.
 * Имеет свойство URL со значением '/account'
 * */
class Account extends Entity {
  constructor() {
    this.URL = "/account";
  }
  /**
   * Получает информацию о счёте
   * */
  static get(id = '', callback) {
    let options = {
      url: this.URL + '/' + id,
      data,
      method: 'GET',
      callback
    }
    createRequest(options)
  }
}
