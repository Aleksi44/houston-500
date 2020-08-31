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
    const currentScore = user.getCurrentScore();
    const ranking = currentScore > 0 ? await core.api.ranking(currentScore) : null;
    this.setState({
      scores,
      ranking: ranking ? ranking.ranking : null,
    });
  }

  handleSaveScore = async () => {
    const { core } = this.props;
    const { user } = core.models;
    if (user.username) {
      const scores = await core.api.score(
        user.username,
        user.getCurrentScore(),
      );
      this.setState({
        scores,
        ranking: null,
      });
    }
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
      <React.Fragment>
        <div className="ranking">
        <table>
          <thead>
          <tr>
            <th className="first">Rank</th>
            <th className="second">Username</th>
            <th className="third">
              <img className="star" src="assets/svg/star.svg" alt="star"></img>
            </th>
          </tr>
          </thead>
          <tbody>
          {scores.map((scoreClassement, index) => (
            <tr key={index}>
              <td className="first">{index + 1}</td>
              <td className="second">{scoreClassement.username}</td>
              <td className="third">{scoreClassement.score}</td>
            </tr>
          ))}
          </tbody>
        </table>
        </div>
        {ranking && (
          <div className="ranking-save w-margin-20">
              <table>
                <tbody>
                <tr>
                    <td className="first">{ranking}</td>
                    <td className="second">
                      <input
                        value={this.state.inputVal}
                        onChange={(e) => {
                          this.props.core.models.user.username = e.target.value;
                          this.setState({ inputVal: e.target.value });
                        }}
                        name="username"
                        placeholder="Username"
                      />
                    </td>
                    <td className="third">
                      {user.getCurrentScore()}
                    </td>
                  </tr>
                </tbody>
              </table>
            <div className="score w-margin-20 w-center">
              <a onClick={this.handleSaveScore} className="base-btn btn-lbn btn-size w-center">
                Save
              </a>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}
