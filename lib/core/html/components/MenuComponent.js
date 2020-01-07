import React from 'react';
import Classement from './Classement';

export default class MenuComponent extends React.Component {
  handleGo = () => {
    const { core } = this.props;
    core.html.unmount();
    core.game.scene.start(core.options.startScene);
  };

  render() {
    const { core } = this.props;
    return (
      <div className="generic">
        <div className="w-center">
          <a onClick={this.handleGo} href="#" className="base-btn btn-lbn btn-size w-center">Jouer</a>
        </div>
        <Classement core={core}/>
      </div>
    );
  }
}
