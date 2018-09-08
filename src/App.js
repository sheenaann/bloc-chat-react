import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';

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

class App extends Component {
  render() {
    return (
      <div className="App">
<RoomList firebase={firebase} />
</div>
    );
  }
}

export default App;
