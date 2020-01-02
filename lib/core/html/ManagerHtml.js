import ReactDOM from 'react-dom';
import React from 'react';

export default class ManagerHtml {
  constructor(core) {
    this.core = core;
    this.domElement = document.getElementById('bomber-html');
  }

  mount(ComponentMount) {
    ReactDOM.render(
      <ComponentMount core={this.core}/>,
      this.domElement,
    );
  }

  unmount() {
    ReactDOM.unmountComponentAtNode(this.domElement);
  }
}
