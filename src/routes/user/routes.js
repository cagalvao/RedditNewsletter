'use strict'
const userService = require('../../services/user');

export async function getUser(req, res) {
  try {
    const { login } = req.params;
    const user = await userService.getUser(login);
  
    if (!user) {
      return res.sendStatus(404)
    }
    return res.json(user);
  } catch (err) {
    res.status(500);
    return res.send(err.message);
  }
}

export async function getAll(req, res) {
  try {
    const users = await userService.getAll();
  
    if (!users || users.length === 0) {
      return res.sendStatus(404)
    }
    return res.json(users);
  } catch (err) {
    res.status(500);
    return res.send(err.message);
  }
}

export async function create(req, res) {
  try {
    const newUser = await userService.create(req.body);
    return res.json(newUser);
  } catch (err) {
    res.status(500);
    return res.send(err.message);
  }
}

export async function update(req, res) {
  try {
    const user = await userService.update(req.body);
    if (!user) {
      return res.sendStatus(404);
    }
    return res.json(user);
  } catch (err) {
    res.status(500);
    return res.send(err.message);
  }
}

export async function notify(req, res) {
  try {
    const { login, notify } = req.body;

    const user = await userService.notify(login, notify);
    if (!user) {
      return res.sendStatus(404);
    }
    return res.json(user);
  } catch (err) {
    res.status(500);
    return res.send(err.message);
  }
}

export async function remove(req, res) {
  try {
    const { login } = req.params;
    const user = await userService.getUser(login);
    if (!user) {
      return res.sendStatus(404);
    }

    await userService.remove(user);
    return res.sendStatus(200);
  } catch (err) {
    res.status(500);
    return res.send(err.message);
  }
}

export async function addChannel(req, res) {
  try {
    const { login, channel } = req.body;

    const user = await userService.addChannel(login, channel);
    if (!user) {
      return res.sendStatus(404);
    }
    return res.json(user);
  } catch (err) {
    res.status(500);
    return res.send(err.message);
  }
}

export async function removeChannel(req, res) {
  try {
    const { login, channel } = req.body;

    const user = await userService.removeChannel(login, channel);
    if (!user) {
      return res.sendStatus(404);
    }
    return res.json(user);
  } catch (err) {
    res.status(500);
    return res.send(err.message);
  }
}

export async function getNewsletter(req, res) {
  try {
    const { login } = req.params;
    const newsletter = await userService.getNewsletter(login);

    if (!newsletter) {
      return res.sendStatus(404)
    }
    return res.json(newsletter);
  } catch (err) {
    res.status(500);
    return res.send(err.message);
  }
}

export async function sendNewsletter(req, res) {
  try {
    const { login } = req.params;

    await userService.sendNewsletter(login);
    
    return res.sendStatus(200);
  } catch (err) {
    res.status(500);
    return res.send(err.message);
  }
}