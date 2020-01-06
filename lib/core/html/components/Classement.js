import React from 'react';

export default class Classement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scores: [],
    };
  }

  async componentDidMount() {
    const scores = await this.props.core.api.classement();
    console.log(scores);
    this.setState({
      scores,
    });
  }

  render() {
    const { scores } = this.state;
    return (
      <div className="classement">
        {scores.map((score, index) => (
          <div key={index} className="score w-margin-10">
            <div className="w-margin-10">{index + 1}</div>
            <div className="w-margin-10">{score.username}</div>
            <div className="w-margin-10">{score.score}</div>
          </div>
        ))}
      </div>
    );
  }
}
