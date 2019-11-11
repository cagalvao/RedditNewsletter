'use strict'
const express = require('express');

const userRoutes = require('./routes');

export function getRouter () {
  const router = express.Router({ mergeParams: true });

  router.route('/users/:login').get(userRoutes.getUser);
  router.route('/users').get(userRoutes.getAll);
  router.route('/users').post(userRoutes.create);
  router.route('/users').put(userRoutes.update);
  router.route('/users/notify').patch(userRoutes.notify);
  router.route('/users/:login').delete(userRoutes.remove);
  router.route('/users/channels/add').patch(userRoutes.addChannel);
  router.route('/users/channels/remove').patch(userRoutes.removeChannel);
  router.route('/users/:login/newsletter').get(userRoutes.getNewsletter);
  router.route('/users/:login/sendnewsletter').post(userRoutes.sendNewsletter);

  return router;
}
