import ReactDOM from 'react-dom';
import React from 'react';

export default class ManagerHtml {
  constructor(core) {
    this.core = core;
    this.domElement = document.getElementById('bomber-html');
  }

  mount(ComponentMount, args = null) {
    ReactDOM.render(
      <ComponentMount core={this.core} {...args} />,
      this.domElement,
    );
  }

  unmount() {
    ReactDOM.unmountComponentAtNode(this.domElement);
  }
}
