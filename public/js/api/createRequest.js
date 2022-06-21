/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = options => {
    const xhr = new XMLHttpRequest;

    if (options.method === "GET") {
        let url = options.url + '?';
        let entries = Object.entries(options.data)
        entries.forEach(element => {
            if (url.slice(-1) !== '?') {
                url += '&' + element[0] + '=' + element[1];
            } else {
                url += element[0] + '=' + element[1];
            }
        })
        try {
            xhr.open(options.method, url);
            xhr.send();
        } catch (e) {
            xhr.response;
        }
    }
    else {
        let form = document.activeElement.parentElement.parentElement.querySelector(".form")
        let formData = new FormData(form);
        try {
            xhr.open(options.method, options.url);
            xhr.send(formData);
        } catch (e) {
            xhr.response;
        }
    }

    xhr.responseType = 'json';

    xhr.addEventListener("error", () => {
        options.callback
    })
    xhr.addEventListener("load", () => {
        options.callback
    })
};