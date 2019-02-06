import React, { Component } from 'react';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import { Preloader } from 'react-materialize';

class AlbumView extends Component {
  // get the id from params or pass it down from AlbumList.
  state = {
    id: '',
    photos: []
  }

  componentDidMount() {
    // console.log(this.props)
    const { id } = this.props.location.state
    this.setState({id})
    // console.log(id)
    const { firestore } = this.props
    firestore.collection('albums').doc(id).collection('photos').get().then(res => {
      this.setState({photos: res.docs})
    })
  }

  render() {
    const { photos, id } = this.state;
    // console.log(photos, id)
    return(
      <div className="row">
        <div className="row">
          {
              photos.length === 0 ?
              <div className="row center">No Photos available<br /><Preloader size='big'/></div>
              :
              photos.map(photo => {
                // console.log(photo)
                return (
                  <div key={photo.id}>
                    <img src={photo.data().url} alt={photo.id} className="responsive-img"/>
                  </div>
                )
              })
          }
        </div>
        <div className="row">
          <Link to={{
            // can use id or title
            // or slugify the title
            pathname:`/photo/add/${id}`,
            state: {id: id}
          }}
          >
              Add Photos
          </Link>
        </div>
      </div>
    )
  }
}

export default firestoreConnect()(AlbumView);
