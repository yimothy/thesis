import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import FlatButton from 'material-ui/FlatButton';
import moment from 'moment';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import OtherFriends from './other-friends';

// import { selectEvent } from '../actions/index';
import { getUserEvents, removeEvent, addFollower, unfollow, getOtherFriends, getFriends } from '../actions/index';

class UserEvents extends Component {
  componentWillMount() {
    const user = { id: this.props.params.userId }
    this.props.getUserEvents(user);
    this.props.getOtherFriends(user);
    this.props.getFriends();

  }

  renderProfileBar() {
    let imageUrl = 'http://i.imgur.com/CMXchpq.jpg'
    const fontColor = '#FAFAFA';
    const barStyle = {
      height: '140px',
      width: '100%',
      backgroundImage: 'url(' + imageUrl + ')',
      backgroundSize: 'auto inherit',
      opacity: '.95',
      position: 'relative',
    }
    const nameStyle = {
      marginLeft: '10px',
      color: fontColor,
      position: 'absolute',
      bottom: '0',
    }
    const buttonStyle = {
      position: 'absolute',
      width: '30%',
      bottom: '0',
      color: fontColor,
      float: 'right',
    }

    if (!this.props.events.userInfo) {
      return (
        <div>Loading...</div>
      );
    }
    let userName = this.props.friends.filter((friend) => {
      return friend.id === Number(this.props.params.userId);
    })
    const id = this.props.params.userId;
    if(userName[0]) {
      return (
        <Card style={barStyle}>
          <div>
            <h1 style={nameStyle}>{userName[0].fullname}</h1>
            <div style={{float:'right'}}>
            <Link to={`journal/${id}`}>
              <FlatButton style={buttonStyle}>{`${userName[0].fullname.split(' ')[0]}'s Concert Journal`}</FlatButton>
            </Link>
              <FlatButton onClick={() => this.props.addFollower(this.props.params.userId)}>Follow</FlatButton>
              <FlatButton onClick={() => this.props.unfollow(this.props.params.userId)}>UnFollow</FlatButton>
            </div>
          </div>
        </Card>
      )
    }
  }

  renderUpcoming() {
    let imageDiv = {
      width: '35%',
      float: 'left',
      height: '248px',
    };
    let imageStyle = {
      width: '100%',
    };
    if(!this.props.events.futureEvents) {
      return (
        <div>Loading...</div>
      )
    }
    if(this.props.events.futureEvents.length > 0) {
      let event = this.props.events.futureEvents[0];
      const momentDate = moment(event.date).format('LLLL');
      const momentFromNow = moment(event.date).fromNow();
      const est = moment(event.date)._d;
      const artist = JSON.parse(event.artist_name).map((performer) => performer.name);
      const date = momentDate.toString() + ' ' + est.toString().slice(34);
      let image = null;
      if(event.image){
        image = JSON.parse(event.image)[3].url || null;
      };
      const venue = JSON.parse(event.venue)[0];
      let venueName = null;
      let venueStateOrCountry = null;
      if (venue.state) {
        venueName = venue.state.name;
        venueStateOrCountry = venue.state.stateCode;
      } else if (venue.country) {
        venueName = venue.country.name;
        venueStateOrCountry = venue.country.countryCode;
      }
      return (
        <Card key={event.id} className="list-group-item" zDepth={1}>
          <h4>Upcoming Event:</h4>
          <CardMedia
            overlay={ <CardTitle
            title={event.name}
            subtitle={venue.city.name + ', ' + momentFromNow.toString()}
            />}
          >
            <img src={image} style={imageStyle} />
          </CardMedia>
          <CardText>
            <span><strong>Listed acts: </strong>{artist.join(', ')}</span>
            <br />
            <span><strong>Venue: </strong>{venue.name}</span>
            <br />
            <span><strong>Event Start: </strong>{date}</span>
          </CardText>
        </Card>
      );
    }
  }

  renderList() {
    let imageDiv = {
      width: '35%',
      float: 'left',
      height: '248px',
    };
    let imageStyle = {
      width: '100%',
    };
    if(!this.props.events.futureEvents){
      return <div></div>;
    }
    if(this.props.events.futureEvents.length === 0) {
      return (
        <Card className="list-group-item" zDepth={1}>
          <CardText>
            <span>No upcoming events</span>
            <br />
          </CardText>
        </Card>
      )
    }
    if(this.props.events.futureEvents){
      return this.props.events.futureEvents.slice(1).map((event) => {
        const momentDate = moment(event.date).format('LLLL');
        const momentFromNow = moment(event.date).fromNow();
        const est = moment(event.date)._d;
        const artist = JSON.parse(event.artist_name).map((performer) => performer.name);
        const date = momentDate.toString() + ' ' + est.toString().slice(34);
        let image = null;
        if(event.image){
          image = JSON.parse(event.image)[3].url || null;
        };
        const venue = JSON.parse(event.venue)[0];
        let venueName = null;
        let venueStateOrCountry = null;
        if (venue.state) {
          venueName = venue.state.name;
          venueStateOrCountry = venue.state.stateCode;
        } else if (venue.country) {
          venueName = venue.country.name;
          venueStateOrCountry = venue.country.countryCode;
        }
        return (
          <Card key={event.id} className="list-group-item" zDepth={1}>
            <CardMedia
              overlay={ <CardTitle
                title={event.name}
                subtitle={venue.city.name + ', ' + momentFromNow.toString()}
                />}
                >
                <img src={image} style={imageStyle} />
              </CardMedia>
              <CardText>
                <span><strong>Listed acts: </strong>{artist.join(', ')}</span>
                <br />
                <span><strong>Venue: </strong>{venue.name}</span>
                <br />
                <span><strong>Event Start: </strong>{date}</span>
              </CardText>
            </Card>
          );
        });
    }
  }
  render() {
    const leftStyle = {
      width: '33%',
      float: 'left',
      marginTop: '10px',
    };
    const rightStyle = {
      width: '65%',
      float: 'right',
      marginBottom: '10px',
      marginTop: '10px',
    };
    return (
      <div>
        <div>{this.renderProfileBar()}</div>
        <div style={rightStyle}>
          <div>{this.renderUpcoming()}</div>
          <h4>Events List:</h4>
          <ul className="list-group">
            {this.renderList()}
          </ul>
        </div>
        <div style={leftStyle}>
          <OtherFriends {...this.props} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    events: state.userEvents,
    friends: state.getFriends,
    otherFriends: state.getOtherFriends,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ removeEvent, getUserEvents, addFollower, unfollow, getOtherFriends, getFriends }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(UserEvents);
