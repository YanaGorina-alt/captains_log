const React = require("react")

class Edit extends React.Component {
  render() {
    //grabbing the log givin to this page by the edit route on the server.
    const log = this.props.log
    return (
      <div>
        <form action={`/logs/${log._id}?_method=PUT`} method = "POST">
          Title: <input type="text" name="title" defaultValue={log.title} />
          Entry: <input type="text" name="entry" defaultValue={log.entry} />
          Is the Ship Broken: 
          {/* conditionally rendering the checkbox input to make it check by default or not. */}
          { 
            log.shipIsBroken? 
              <input type="checkbox" name="shipIsBroken" defaultChecked />
            : 
              <input type="checkbox" name="shipIsBroken"/> 
          }
          <input type="submit" value="Submit Changes" />      
        </form>
      </div>
    )
  }
}

module.exports = Edit