import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
    rooms: [],
    newRoomName: '',
  };

  this.roomsRef = this.props.firebase.database().ref('rooms');
};

componentDidMount() {
  this.roomsRef.on('child_added', snapshot => {
    const room = snapshot.val();
    room.key = snapshot.key;
    this.setState ({
  rooms: this.state.rooms.concat( room )})
    });
}

  handleChange(e) {
    e.preventDefault();
    this.setState({newRoomName: e.target.value});
  }

 createRoom = (e) => {
       this.roomsRef.push({
       name: this.state.newRoomName
      });
     }

  render() {
    return(
      <div className='sidebar'>
      <div>
          {this.state.rooms.map( (room) =>
          <section key={room.key}>{room.name}</section>)}</div>
      <form onSubmit={this.createRoom}>
        <input type="text" value={this.state.newRoomName} onChange={(e) => this.setState({newRoomName: e.target.value})}/>
        <span>Room Name</span>
        <input type="submit" />
        </form>
      </div>
    )}
}


export default RoomList;
