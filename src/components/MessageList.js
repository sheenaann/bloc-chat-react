import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      newMessage: ''
    };

  this.messagesRef = this.props.firebase.database().ref('messages');
};

  componentDidMount() {
  this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState ({
        messages: this.state.messages.concat( message )})
  });
}

handleNewMessage(e) {
  this.setState({newMessage: e.target.value});
}


createMessage(e) {
  e.preventDefault();
  if (!this.state.newMessage) { return }
  this.messagesRef.push({
  content: this.state.newMessage,
  sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
  roomID: this.props.activeRoom.key
  });
    this.setState({ newMessage: ''});
    }

render() {
return (
  <div>
      <table>
          <tbody>
              {this.state.messages.map( (message) =>
                  this.props.activeRoom == message.roomID && (
                  <tr key={message.key}>
                      <td>{message.sentAt}</td>
                      <td>{message.username}:</td>
                      <td>{message.content}</td>
                  </tr>
                  )
              )}
          </tbody>
      </table>
  <form onSubmit={(e) => this.createMessage(e)}>
  <input type="text" placeholder="Type your message here" value={this.state.newMessage} onChange={e => this.handleNewMessage(e)}></input>
  <input type="submit" value="send" />
  </form>
  </div>
);
}
}

export default MessageList;
