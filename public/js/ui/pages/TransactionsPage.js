/**
 * Класс TransactionsPage управляет
 * страницей отображения доходов и
 * расходов конкретного счёта
 * */
class TransactionsPage {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor(element) {
    if (!element) {
      throw new Error("Element is undefined");
    }
    this.element = element
    this.registerEvents()
  }

  /**
   * Вызывает метод render для отрисовки страницы
   * */
  update() {
    if (this.element.lastOptions) {
      this.render(this.element.lastOptions)
    } else {
      this.render()
    }
  }

  /**
   * Отслеживает нажатие на кнопку удаления транзакции
   * и удаления самого счёта. Внутри обработчика пользуйтесь
   * методами TransactionsPage.removeTransaction и
   * TransactionsPage.removeAccount соответственно
   * */
  registerEvents() {
    this.element.addEventListener("click", (e) => {
      if (e.target.classList.contains("remove-account")) {
        this.removeAccount()
      }
      if (e.target.classList.contains("transaction__remove") || e.target.classList.contains("fa-trash")) {
        let button = this.element.querySelector(".transaction__remove")
        this.removeTransaction(button.dataset.id)
      }
    })
  }

  /**
   * Удаляет счёт. Необходимо показать диаголовое окно (с помощью confirm())
   * Если пользователь согласен удалить счёт, вызовите
   * Account.remove, а также TransactionsPage.clear с
   * пустыми данными для того, чтобы очистить страницу.
   * По успешному удалению необходимо вызвать метод App.updateWidgets() и App.updateForms(),
   * либо обновляйте только виджет со счетами и формы создания дохода и расхода
   * для обновления приложения
   * */
  removeAccount() {
    if (this.element.lastOptions) {
      let confirmAccount = confirm("Вы действительно хотите удалить счёт?");
      if (confirmAccount) {
        Account.remove({ id: this.element.lastOptions.account_id }, ((err, response) => {
          if (response.success) {
            App.updateWidgets()
            App.updateForms()
          }
        }))
        this.clear();
      }
    }
  }
  /**
   * Удаляет транзакцию (доход или расход). Требует
   * подтверждеия действия (с помощью confirm()).
   * По удалению транзакции вызовите метод App.update(),
   * либо обновляйте текущую страницу (метод update) и виджет со счетами
   * */
  removeTransaction(id) {
    let confirmTrans = confirm("Вы действительно хотите удалить эту транзакцию?");
    if (confirmTrans) {
      Transaction.remove({id: id}, ((err, response) => {
        if (response.success) {
          App.update()
        }
      }))
    }
  }

  /**
   * С помощью Account.get() получает название счёта и отображает
   * его через TransactionsPage.renderTitle.
   * Получает список Transaction.list и полученные данные передаёт
   * в TransactionsPage.renderTransactions()
   * */
  render(options) {
    if (options) {
      this.clear();
      this.element.lastOptions = options
      Account.get(options.account_id, ((err, response) => {
        if (response.success) {
          this.renderTitle(response.data.name)
        }
      }))
      Transaction.list({ account_id: options.account_id }, ((err, response) => {
        if (response.success && response.data) {
          this.renderTransactions(response.data)
        }
      }))
    }
  }

  /**
   * Очищает страницу. Вызывает
   * TransactionsPage.renderTransactions() с пустым массивом.
   * Устанавливает заголовок: «Название счёта»
   * */
  clear() {
    this.renderTransactions({})
    this.renderTitle("Название счёта")
    this.element.lastOptions = ""
  }

  /**
   * Устанавливает заголовок в элемент .content-title
   * */
  renderTitle(name) {
    let title = document.querySelector(".content-title")
    title.textContent = name
  }

  /**
   * Форматирует дату в формате 2019-03-10 03:20:41 (строка)
   * в формат «10 марта 2019 г. в 03:20»
   * */
  formatDate(date) {
    // еще работаю над ним
    let newFormat = date
    return newFormat;
  }

  /**
   * Формирует HTML-код транзакции (дохода или расхода).
   * item - объект с информацией о транзакции
   * */
  getTransactionHTML(item) {
    let format = item.created_at.replace('T', ' ').slice(0, -5);
    this.formatDate(format);
    return `
      <div class="transaction transaction_${item.type} row">
    <div class="col-md-7 transaction__details">
      <div class="transaction__icon">
          <span class="fa fa-money fa-2x"></span>
      </div>
      <div class="transaction__info">
          <h4 class="transaction__title">Новый будильник</h4>
          <!-- дата -->
          <div class="transaction__date">${this.formatDate(format)}</div>
      </div>
    </div>
    <div class="col-md-3">
      <div class="transaction__summ">
      <!--  сумма -->
          ${item.sum} <span class="currency">₽</span>
      </div>
    </div>
    <div class="col-md-2 transaction__controls">
        <!-- в data-id нужно поместить id -->
        <button class="btn btn-danger transaction__remove" data-id=${item.id}>
            <i class="fa fa-trash"></i>  
        </button>
    </div>
</div>`
  }

  /**
   * Отрисовывает список транзакций на странице
   * используя getTransactionHTML
   * */
  renderTransactions(data) {
    let content = this.element.querySelector(".content")
    if (Object.keys(data).length) {
      data.forEach(e => {
        let html = this.getTransactionHTML(e)
        content.insertAdjacentHTML('beforeend', html);
      })
    } else {
      let arr = Array.from(content.children);
      arr.forEach(e => {
        e.remove();
      })
    }
  }
}