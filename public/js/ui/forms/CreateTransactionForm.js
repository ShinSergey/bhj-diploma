/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element)
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    Account.list({}, ((err, response) => {
      if (response.success) {
        let accountList = this.element.querySelector(".accounts-select")
        accountList.innerHTML = ""
        response.data.forEach(e => {
          accountList.insertAdjacentHTML("beforeend", `
          <option value="${e.id}">${e.name}</option>
          `)
          // let html = document.createElement(`option`)
          // accountList.appendChild(html)
          // html.value = e.id
          // html.text = e.name
        })
      }
    }))
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, ((err, response) => {
      if (response.success) {
        let accountList = this.element.querySelector(".accounts-select")
        this.element.reset()
        if (accountList.id === "income-accounts-list") {
          App.getModal('newIncome').close()
        } else (
          App.getModal('newExpense').close()
        )
        App.update()
      }
    }))
  }
}