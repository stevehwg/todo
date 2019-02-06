// add slugify title
// https://gist.github.com/mathewbyrne/1280286

import React, { Component } from 'react';
import { Button } from 'react-materialize';
import { withFirebase, withFirestore } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';

class AddPhoto extends Component {
  state = {
    files: null,
  }

  handleFileChange = e => {
    this.setState({files: e.target.files})
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // console.log(this.state)
    const { firebase, firestore } = this.props;
    const { id } = this.props.match.params;
    firestore.collection('albums').doc(id).get().then(data => {
      // getting dirpath to gs storage.
      const pathName = data.data().slug;
      const { files } = this.state;

      // for each file, change name and put it in the storage folder
      if (files.length > 0) {
        for (var i = 0; i < files.length; i++) {
          console.log(files[i]);
          var today = new Date()
          var y = today.getFullYear()
          var m = today.getMonth() + 1
          var d = today.getDate()
          var h = today.getHours()
          var mi = today.getMinutes()
          firebase.storage().ref().child(
            `${pathName}/${y}_${m}_${d}_${h}_${mi}_${files[i].name}`
          ).put(files[i]).then(res => {
            console.log(res)
            res.ref.getDownloadURL().then(url => {
              firestore.collection('albums').doc(id).collection('photos').add({url: url})
            })
          })
        }
      }
    })
  }

  componentDidMount() {
    console.log(this.props)
    const { id } = this.props.location.state
    this.setState({id})
  }

  render() {
    console.log(this.props)

    const { auth } = this.props;

    const { isLoaded, isEmpty } = auth

    if (isLoaded && isEmpty) {
      return <Redirect to='/signin' />
    }

    return (
      <div className="center">
        <form onSubmit={this.handleSubmit} >
          <div className="col file-field">
            <div className="btn purple">
            <span>Photos</span>
            <input type="file" name="file" onChange={this.handleFileChange} multiple />
            </div>
            <div className="file-path-wrapper">
              <input type="text" className="file-path" required />
            </div>
          </div>
          <Button className="blue" waves='light'>Submit</Button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  }
}

export default compose(
  connect(mapStateToProps),
  withFirebase,
  withFirestore,
)(AddPhoto);
