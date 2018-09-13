import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
    };

  this.messagesRef = this.props.firebase.database().ref('messages');
};

  componentDidMount() {
  this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState ({
        messages: this.state.messages.concat( message )});
  });
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
  </div>
);
}
}

export default MessageList;
