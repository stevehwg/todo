import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Preloader } from 'react-materialize';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withFirestore } from 'react-redux-firebase';

class AlbumList extends Component {
  state = {
    qs:[],
  }
  componentDidMount() {
    // console.log(this.props)
    const { firestore } = this.props
    firestore.collection('albums').get().then(q => {
      this.setState({qs: q.docs})
    })
  }

  render() {
    const { qs }  = this.state;

    return (
      <div className="center">
        <div className="row">
          {qs.length === 0 ?
            <div className="row"><Preloader size='big'/></div>
            :
            qs.map(q => {
            // console.log(q.id, q.data().slug)
            return (
              <div key={q.id} className="col s12 m4">
                <div className="row">
                  <Link to={{
                    // can use id or title
                    // or slugify the title
                    pathname:`/album/${q.data().slug}?id=${q.id}`,
                    state: {id: q.id, slug: q.data().slug}
                  }}
                  >
                      {q.data().title}
                  </Link>
                </div>
                <div className="row">
                  <img src={q.data().coverURL} alt={q.data().title} className="responsive-img"/>
                </div>
              </div>
            )
          })}
          <Link to={{
            // can use id or title
            // or slugify the title
            pathname:`/album/add`,
          }}
          >
            Add a new album
          </Link>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    firebase: state.firebase
  }
}

export default compose(
  connect(mapStateToProps),
  withFirestore
)(AlbumList);
