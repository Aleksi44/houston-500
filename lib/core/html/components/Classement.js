import React from 'react';

export default class Classement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scores: [],
      ranking: null,
      inputVal: this.props.core.models.user.username,
    };
  }

  async componentDidMount() {
    const { core } = this.props;
    const { user } = core.models;
    const scores = await core.api.classement();
    const ranking = user.score > 0 ? await core.api.ranking(user.score) : null;
    this.setState({
      scores,
      ranking: ranking ? ranking.ranking : null,
    });
  }

  handleSaveScore = async () => {
    const { core } = this.props;
    const { user } = core.models;
    const scores = await core.api.score(
      user.username,
      user.score,
    );
    this.setState({
      scores,
      ranking: null,
    });
  };

  setUserName = (username) => {
    const { core } = this.props;
    const { user } = core.models;
    user.username = username;
  };

  render() {
    const { core } = this.props;
    const { user } = core.models;
    const { scores, ranking } = this.state;
    return (
      <div className="classement">
        {ranking && (
          <React.Fragment>
          <div className="score w-margin-10">
            <div className="w-margin-10">{ranking}</div>
            <div className="w-margin-10">
              <input
                value={this.state.inputVal}
                onChange={(e) => {
                  this.props.core.models.user.username = e.target.value;
                  this.setState({ inputVal: e.target.value });
                }}
                name="username"
              />
            </div>
            <div className="w-margin-10">{user.score}</div>
          </div>
            <div className="score w-margin-10 w-center">
              <a onClick={this.handleSaveScore} className="base-btn btn-lbn btn-size w-center">
                Sauvegarder
              </a>
            </div>
          </React.Fragment>
        )}
        {scores.map((scoreClassement, index) => (
          <div key={index} className="score w-margin-10">
            <div className="w-margin-10">{index + 1}</div>
            <div className="w-margin-10">{scoreClassement.username}</div>
            <div className="w-margin-10">{scoreClassement.score}</div>
          </div>
        ))}
      </div>
    );
  }
}
