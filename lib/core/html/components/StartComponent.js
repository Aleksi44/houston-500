import React from 'react';

export default class StartComponent extends React.Component {
  handleGo = () => {
    const {core} = this.props;
    core.html.unmount();
    core.game.scene.start(core.options.startScene);
  };

  render() {
    return (
      <div className="generic">
        <div className="w-center">
          <a onClick={this.handleGo} href="#" className="base-btn btn-lbn btn-size w-center">Jouer</a>
        </div>
        <div className="w-pad-2 w-center">
          <a href="#" className="base-btn btn-lbn btn-size w-center">Classement</a>
        </div>
      </div>
    );
  }
}
