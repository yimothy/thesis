import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import EventList from '../containers/event-list';
import Friends from '../containers/friends';
import Artists from '../containers/artists';
import Auth from '../modules/auth';
import UpcomingEvent from '../containers/upcoming-event';

class PostIndex extends Component {
  componentWillMount() {
    if (!Auth.isUserAuthenticated()) {
      hashHistory.push('/login');
    }
  }
  render() {
    const containerStyle = {
      margin: '0px -20px 0px -20px',
      position: 'relative',
    }
    const leftStyle = {
      width: '33%',
      minWidth: '300px',
      float: 'left',
      marginTop: '10px',
      margin: 'auto',
    };
    const rightStyle = {
      width: '65%',
      minWidth: '300px',
      float: 'left',
      overflow: 'scroll',
      position: 'relative',
      marginTop: '10px',
      marginLeft: '10px',
    };
    return (
      <div style={containerStyle}>
        <div style={leftStyle}>
          <UpcomingEvent style={{position: 'absolute'}} />
          <br />
          <Friends style={{position: 'absolute'}} />
          <br />
          <Artists style={{position: 'absolute'}} />
        </div>
        <div style={rightStyle}>
          <EventList />
        </div>
      </div>
    );
  }
}

export default PostIndex;
