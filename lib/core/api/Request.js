const API_URL = 'https://solar.stationspatiale.com/';

export default class Request {
  static json(url, data) {
    return new Promise(async (resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', API_URL + url, true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onreadystatechange = function api() {
        if (xhr.readyState === 4 && xhr.status === 200) {
          const json = JSON.parse(xhr.responseText);
          resolve(json);
        }
      };
      const dataJson = JSON.stringify(data);
      xhr.send(dataJson);
    });
  }

  static async classement() {
    return Request.json('play/classement', {});
  }

  static async score(username, score) {
    return Request.json('play/score', {
      username,
      score,
    });
  }
}
