/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = options => {
    const xhr = new XMLHttpRequest;

    try {
        if (options.method === "GET") {
            xhr.open(options.method, (options.url + '?mail=' + options.data.mail + '&password=' + options.data.password));
            xhr.setRequestHeader('Access-Control-Allow-Origin', 'http://localhost:8000');
            xhr.send();
        } else if (options.method !== "GET") {
            formData = new FormData;

            formData.append('mail', options.data.mail);
            formData.append('password', options.data.password);

            xhr.open(options.method, options.url);
            xhr.send(formData);
        }
    }
    catch (e) {
        console.log(e);
    }

    xhr.responseType = 'json';

    xhr.addEventListener("error", () => {
        console.log(xhr.response.error);
    })
    xhr.addEventListener("load", () => {
        console.log(xhr.response.success);
    })
};

// createRequest({
//     url: 'https://example.com',
//     method: 'GET',
//     data: {
//         mail: 'ivan@biz.pro',
//         password: 'obinobin'
//     }
// })