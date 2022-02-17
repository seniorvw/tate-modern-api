import { Request, Response, NextFunction } from 'express';
const Art = require('../models/Art');
const Comment = require('../models/Comment');
const User = require('../models/User');

export async function getAllArts(req: Request, res: Response, next: NextFunction) {
  try {
    const arts = await Art.query().withGraphFetched('comments.[user]').whereNotDeleted();
    res.json(arts);
  } catch (err) {
    next(err);
  }
}

export async function getArtById(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const art = await Art.query().findById(id).withGraphFetched('comments.[user]').whereNotDeleted();
    res.json(art);
  } catch (err) {
    next(err);
  }
}

export async function createComment(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const comment = req.body;

    // check if user exists
    if (comment.user_id) {
      const user = await User.query().findById(comment.user_id).whereNotDeleted();
      if (!user) {
        throw new Error('user not found');
      }
    }
    // Each art entry can only have one comment by a non-user of that name
    else {
      const userComment = await Comment.query()
        .where('name', comment.name)
        .where('art_id', id)
        .whereNotDeleted()
        .first();

      if (userComment) {
        throw new Error('one non-user with same name allowed');
      }
    }

    const art = await Art.query().upsertGraphAndFetch({
      id: id,
      comments: [comment],
    });
    res.json(art);
  } catch (err) {
    err.status = 422;
    next(err);
  }
}
