import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
    rooms: [],
    newRoomName: '',
    updatedRoomName: '',
  };

  this.roomsRef = this.props.firebase.database().ref('rooms');
};

componentDidMount() {
  this.roomsRef.on('child_added', snapshot => {
    const room = snapshot.val();
    room.key = snapshot.key;

    this.setState ({ rooms: this.state.rooms.concat( room )})
    });

  this.roomsRef.on('child_removed', snapshot => {
    this.setState({ rooms: this.state.rooms.filter(room => room.key !== snapshot.key) })
  });

  this.roomsRef.on('child_changed', snapshot => {
    console.log(this.state.rooms);
  });
}

  handleChange(e) {
    e.preventDefault();
    this.setState({newRoomName: e.target.value});
  }

 createRoom = (e) => {
   e.preventDefault();
   if (!this.state.newRoomName){return}
       this.roomsRef.push({
       name: this.state.newRoomName
      });
      this.setState({ newRoomName: ''});
     }

  onDelete (room) {
    this.props.firebase.database().ref(`rooms/${room.key}`).remove()
    console.log(room);
  }

  handleNameChange(e) {
    this.setState({updatedRoomName: e.target.value});
  }

  onRename(room){
  this.props.firebase.database().ref(`rooms/${room.key}`).update({
    name: this.state.updatedRoomName
  });
}



  render() {
    return(
      <div className='sidebar'>
      <div>
          {this.state.rooms.map( (room) =>
          <section key={room.key} onClick={() => this.props.setRoom(room)}>{room.name}
            <button onClick={() => this.onDelete(room)}>Delete</button>
            <input type='text' placeholder="Rename Room" value={this.state.updatedRoomName} onChange={e => this.handleNameChange(e)}></input>
            <button onChange={e => this.handleNameChange(e)} onClick={() =>this.onRename(room)}>Submit</button>
         </section>)}</div>
      <form onSubmit={(e) => this.createRoom(e)}>
        <input type="text" placeholder="Room Name" value={this.state.newRoomName} onChange={e => this.handleChange(e)}/>
        <span>Room Name</span>
        <input type="submit" value="Create Room"/>
        <p>Current Room: {this.props.activeRoom.name ? this.props.activeRoom.name : "No room selected" }</p>
        </form>
      </div>
    )}

}


export default RoomList;
