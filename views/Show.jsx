const React = require("react")

class Show extends React.Component {
  render() {
    const log = this.props.log
    return (
      <div>
          <a href="/logs">GO BACK TO ALL LOGS</a>
          <h1>{log.title} </h1><br/>
          <p>{log.entry}</p> <br />
          {log.shipIsBroken ? "SHIP IS BROKEN" : "SHIP IS NOT BROKEN"}
      </div>
    )
  }
}

module.exports = Show