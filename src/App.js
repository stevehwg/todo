import React, { Component } from 'react';
import Navbar from './components/navs/Navbar';
import Main from './components/navs/Main';
import SignUp from './components/auth/SignUp';
import SignIn from './components/auth/SignIn';
import ForgotPw from './components/auth/ForgotPw';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// Album
import AlbumList from './components/gallery/AlbumList';
import AlbumView from './components/gallery/AlbumView';
import AddAlbum from './components/gallery/AddAlbum';
import AddPhoto from './components/gallery/AddPhoto';

class App extends Component {
  render() {
    // console.log(this.props)
    const { firebase } = this.props
    return (
      <BrowserRouter>
        <div className="container App">
          <Navbar firebase={firebase} />
          <Switch>
            <Route exact path='/' component={Main} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/password_rest" component={ForgotPw} />
            <Route exact path="/album/add" component={AddAlbum} />
            <Route path="/photo/add/:id" component={AddPhoto} />
            <Route path="/album/:slug" component={AlbumView}/>
            <Route path="/albums" component={AlbumList}/>
        </Switch>
        </div>

      </BrowserRouter>
    );
  }
}

export default App;
