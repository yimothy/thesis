const express = require('express');
const userController = require('../user/userController');
const eventController = require('../event/eventController');

const router = new express.Router();

// user calls
router.post('/users/addfollow', userController.users.addfollow);
router.post('/users/unfollow', userController.users.unfollow);
router.post('/users/changepassword', userController.users.changepassword);
router.post('/users/deleteuser', userController.users.deleteUser);
router.get('/users/getall', userController.users.getAll);

// event calls
router.get('/events/getall', eventController.events.getAll);
router.post('/events/search', eventController.events.search);
router.post('/events/addevent', eventController.events.addEvent);
router.get('/events/showuserevents', eventController.events.showUserEvents);
router.get('/events/showlocalevents', eventController.events.showLocalEvents);
router.get('/events/showrelatedevents', eventController.events.showRelatedEvents);
router.post('/events/deleteevent', eventController.events.deleteEvent);

module.exports = router;
