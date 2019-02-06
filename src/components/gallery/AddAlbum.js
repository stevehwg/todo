// add slugify title
// https://gist.github.com/mathewbyrne/1280286

import React, { Component } from 'react';
import { Input, Button } from 'react-materialize';
import { withFirebase, withFirestore } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Slugify } from '../../Utils.js';
import { Redirect } from 'react-router-dom';

class AddAlbum extends Component {
  state = {
    title: '',
    file: null,
    slug: '',
  }

  handleChange = (e) => {
    this.setState({
      title: e.target.value,
      slug: Slugify(e.target.value)
    })
  }

  handleFileChange = e => {
    // For a single file. Update handleSubmit also
    this.setState({file: e.target.files[0]})
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // console.log(this.state)
    const {firebase, firestore } = this.props;

    // Need to update to rename file

    // For a single file. Update handleFileChange
    firebase.uploadFile(this.state.slug, this.state.file)
    .then(res=>{
      // getting downloadURL and then add to firestore
      res.uploadTaskSnapshot.ref.getDownloadURL().then(url => {
        // adding the url to firestore where albumList is populated
        firestore.collection('albums').add({
            coverURL: url,
            title: this.state.title,
            slug: this.state.slug,
        })
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
      })
    })


  }

  render() {
    // console.log(this.props)

    const { auth } = this.props;
    const { isLoaded, isEmpty } = auth

    if (isLoaded && isEmpty) {
      return <Redirect to='/signin' />
    }

    return (
      <div className="center">
        <form onSubmit={this.handleSubmit} >
          <Input label="Album title" type="text" name="title" onChange={this.handleChange} required />
          <div className="col file-field">
            <div className="btn purple">
            <span>Cover</span>
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
)(AddAlbum);
