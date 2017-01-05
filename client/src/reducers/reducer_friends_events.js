export default function (state = [], action) {
  switch (action.type) {
    case 'FRIENDS_EVENTS':
    console.log('THIS IS THE GET FRIENDS EVENTS REDUCER: ', action.payload);
      let userInfo = action.payload.data.userNames;
      let events = action.payload.data.events.length === 0 ? [] : action.payload.data.events;
      let currentDate = new Date();
      let futureEvents = events.sort((a, b) => {
        let aDate = new Date(a.date.slice(0,10));
        let bDate = new Date(b.date.slice(0,10));
        return aDate - bDate;
      })
      .filter((event) => {
        let eventDate = new Date(event.date.slice(0,10));
        return eventDate > currentDate;
      })
      return {
        events,
        futureEvents,
        userInfo,
      };
    default:
      return state;
  }
}
