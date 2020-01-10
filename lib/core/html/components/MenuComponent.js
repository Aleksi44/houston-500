import React from 'react';
import Classement from './Classement';

export default class MenuComponent extends React.Component {
  handleGo = () => {
    const { core } = this.props;
    core.html.unmount();
    core.game.scene.start(core.options.startScene);
  };

  render() {
    const { core, ranking } = this.props;
    return (
      <div className="generic">
        <div className="w-center w-margin-20">
          <a onClick={this.handleGo}>
            <img className="play" src="assets/svg/play.svg" alt="play button"></img>
          </a>
        </div>
        {ranking && (
          <Classement core={core}/>
        )}
      </div>
    );
  }
}
