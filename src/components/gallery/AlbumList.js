import React from 'react';
import { Link } from 'react-router-dom';
import { Preloader } from 'react-materialize';
// firebase storage
import { firestore } from '../../fbConfig'

class AlbumList extends React.Component {
  state = {
    qs:[],
  }
  componentDidMount() {
    firestore.collection('albums').get().then(q => {
      this.setState({qs: q.docs})
    })
  }

  render() {
    // console.log(this.state.qs)
    const qs = this.state.qs;

    return (
      <div className="center">
        <div className="row">
          {qs.length === 0 ?
            <div className="row"><Preloader size='big'/></div>
            :
            qs.map(q=>{
            // query to get cover

            // pass it down to albumView
            console.log(q.id, q.data().title)
            return (
              <div key={q.id} className="col s12 m4">
                <div className="row">
                  <Link to={{
                    // can use id or title
                    // or slugify the title
                    pathname:`/album/${q.data().title}`
                  }}
                  >
                      {q.data().title}
                  </Link>
                </div>
                <div className="row">
                  <img src={q.data().cover} alt={q.data().title} className="responsive-img"/>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default AlbumList;
