/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = options => {
    const xhr = new XMLHttpRequest;
    let formData;
    let url = options.url
    
    if (options.method === "GET") {
        url = options.url + '?';
        if (options.data) {let entries = Object.entries(options.data);
        entries.forEach(element => {
            if (url.slice(-1) !== '?') {
                url += '&' + element[0] + '=' + element[1];
            } else {
                url += element[0] + '=' + element[1];
            }
        })
    }
    } else {
        formData = new FormData();
        if (options.data) {let entries = Object.entries(options.data);
        entries.forEach(element => {
            formData.append(element[0], element[1]);
        })
    }
    }

    try {
        xhr.open(options.method, url);
        xhr.send(formData);
    } catch (e) {
        console.log(e);
    }

    xhr.responseType = 'json';

    xhr.addEventListener("error", () => {
        options.callback(xhr.err);
    })
    xhr.addEventListener("load", () => {
        options.callback(null, xhr.response);
    })
};