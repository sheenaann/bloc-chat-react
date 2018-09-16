import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';

// Initialize Firebase
 var config = {
   apiKey: "AIzaSyAWF59hRV9zQ9Z_oN0JgX4NokjXV19uNOU",
   authDomain: "bloc-chat-react-4e3de.firebaseapp.com",
   databaseURL: "https://bloc-chat-react-4e3de.firebaseio.com",
   projectId: "bloc-chat-react-4e3de",
   storageBucket: "bloc-chat-react-4e3de.appspot.com",
   messagingSenderId: "375208047448"
 };
 firebase.initializeApp(config);

 var provider = new firebase.auth.GoogleAuthProvider();

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      activeRoom: "",
      user: ''
    };
  }

  setRoom(room) {
    this.setState({
      activeRoom: room
    });
    console.log(this.state.activeRoom);
    }

  setUser(user) {
    if(user) {
      this.setState ({
        user: user
      });
    } else {
      this.setState({
        user: 'Guest'
      });
    }
  }

  render() {
    return (
      <div className="App">
        <RoomList firebase={firebase} setRoom={this.setRoom.bind(this)} activeRoom={this.state.activeRoom}  />
        <MessageList firebase={firebase} activeRoom={this.state.activeRoom} user={this.state.user}/>
         <User firebase={firebase} setUser={this.setUser.bind(this)} user={this.state.user} />
</div>
    );
  }
}

export default App;
