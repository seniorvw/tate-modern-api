import { Request, Response, NextFunction } from 'express';

const User = require('../models/User');

export async function getUsers(req: Request, res: Response, next: NextFunction): Promise<void | any> {
  try {
    const users = await User.query().whereNotDeleted();
    res.json(users);
  } catch (err) {
    next(err);
  }
}

export async function createUser(req: Request, res: Response, next: NextFunction) {
  try {
    const userDto = req.body;
    if (!userDto.name || !userDto.age || !userDto.location) {
      throw new Error('name, age, and location are required !');
    }
    const user = await User.query().insertAndFetch(userDto);
    res.json(user);
  } catch (err) {
    next(err);
  }
}
