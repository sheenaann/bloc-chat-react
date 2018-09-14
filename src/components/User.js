import React, { Component } from 'react';

class User extends Component {
  constructor(props) {
    super(props);
}


handleSignIn() {
const provider = new this.props.firebase.auth.GoogleAuthProvider();
this.props.firebase.auth().signInWithPopup( provider );
}

handleSignOut(){
  this.props.firebase.auth().signOut();
}

componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged( user => {
        this.props.setUser(user);
      });
}

render () {
  return (
    <div className='auth'>
    <button className="sign-in" value="sign-in" onClick={() =>this.handleSignIn()}>Sign in with Google</button>
    <button className="sign-out" value="sign-out" onClick={() =>this.handleSignOut()}>Sign out</button>
    <p>Current user: {this.props.user === 'Guest' ? 'Guest' : this.props.user.displayName}</p>
    </div>
  )}
}

export default User;
