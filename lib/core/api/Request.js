export default class Request {
  constructor(core) {
    this.core = core;
    this.API_URL = core.isDev ? 'http://127.0.0.1:4243/' : 'https://solar.stationspatiale.com/';
  }

  json(url, data) {
    return new Promise(async (resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', this.API_URL + url, true);
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

  async classement() {
    return this.json('play/classement', {});
  }

  async score(username, score) {
    return this.json('play/score', {
      username,
      score,
    });
  }

  async ranking(score) {
    return this.json('play/ranking', {
      score,
    });
  }
}
