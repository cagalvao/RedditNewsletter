'use strict'
import mongoose from 'mongoose';

mongoose.connect(
  process.env.MONGODBCONNSTR,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    console.log(err ? 'Error connecting to MongoDB: ' + err : 'Successfully connected to MongoDB');
  }
);

const User = mongoose.model('User', {
  login: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  favoriteChannels: {
    type: String,
    required: true
  },
  notify: {
    type: Boolean,
    required: true
  }
});

export async function getUser(login) {
  return await User.findOne({ login });
}

export async function getAll() {
  return await User.find();
}

export async function create({ login, name, email, favoriteChannels, notify }) {
  const newUser = new User({
    login,
    name,
    email,
    favoriteChannels,
    notify
  })

  return await newUser.save();
}

export async function update({ login, name, email, favoriteChannels, notify }) {
  const user = await getUser(login);

  if (name) {
    user.name = name;
  }

  if (email) {
    user.email = email;
  }

  if (favoriteChannels) {
    user.favoriteChannels = favoriteChannels;
  }

  if (notify) {
    user.notify = notify;
  }

  user.save();

  return user;
}

export async function notify(login, notify) {
  const user = await getUser(login);

  user.notify = notify;

  user.save();

  return user;
}

export async function remove(user) {
  await User.findByIdAndRemove(user.id).exec();
}

export async function addChannel(login, channel) {
  const user = await getUser(login);
  
  const favoriteChannels = [...user.favoriteChannels.split(' '), channel];

  user.favoriteChannels = favoriteChannels.join(' ');
  user.save();
  
  return user;
}

export async function removeChannel(login, channel) {
  const user = await getUser(login);
  
  let favoriteChannels = user.favoriteChannels.split(' ');
  favoriteChannels = favoriteChannels.filter(x => x !== channel);
  
  user.favoriteChannels = favoriteChannels.join(' ');
  user.save();
    
  return user;
}

export async function getNewsletter(login) {
  const redditService = require('./reddit');

  const newsletter = {};

  const user = await getUser(login);
  for (const channel of user.favoriteChannels.split(' ')) {
    newsletter[channel] = await redditService.getPosts(channel);
  };

  return newsletter;
}

export async function sendNewsletter(login) {
  const user = await getUser(login);
  if (user.notify) {
    const newsletter = await getNewsletter(login);

    const { buildHTML } = require('../utils/emailBuilder');

    const html = buildHTML(user, newsletter);

    const { sendEmail } = require('./email');

    sendEmail(user.email, 'Reddit Newsletter', html);
  }
}