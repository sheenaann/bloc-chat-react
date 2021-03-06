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
  this.messagesRef.on('child_removed', snapshot => {
    this.setState({ messages: this.state.messages.filter(message => message.key !== snapshot.key) })
  });
}

handleNewMessage(e) {
  this.setState({newMessage: e.target.value});
}


createMessage(messageText) {
  if (!this.state.newMessage) { return }
  this.messagesRef.push({
  content: messageText,
username: this.props.user.displayName ? this.props.user.displayName : "Guest",
  sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
  roomID: this.props.activeRoom.key,
  });
    this.setState({ newMessage: ''});
    }

formatTime(time) {
    var date = new Date(time);
    var minutes = date.getMinutes();
    if(minutes < 10) {
      minutes = '0' + minutes;
    }
    if( this.hours >12 )
    { this.hours = this.hours - 12; }
    return (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear() + " " + (date.getHours() % 12)+ ":" + minutes;
  }

  deleteMessage(message) {
    this.props.firebase.database().ref(`messages/${message.key}`).remove()
    console.log(message);
  }

render() {
return (
  <div>
      <table>
          <tbody>
              {this.state.messages.map( (message) =>
                  this.props.activeRoom.key == message.roomID && (
                  <tr key={message.key}>
                      <td>{this.formatTime(message.sentAt)}</td>
                      <td>{message.username}:</td>
                      <td>{message.content}</td>
                      <td><button onClick={() => this.deleteMessage(message)}>Delete</button></td>
                  </tr>
                  )
              )}
          </tbody>
      </table>
  <form onSubmit={ (e) => { e.preventDefault(); this.createMessage(this.state.newMessage) }}>
  <input type="text" placeholder="Type your message here" value={this.state.newMessage} onChange={e => this.handleNewMessage(e)}></input>
  <button>Send</button>
  </form>
  </div>
);
}
}

export default MessageList;
