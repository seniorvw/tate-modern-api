import { Model } from 'objection';
const BaseModel = require('./BaseModel');
const User = require('./User');

export class Comment extends BaseModel {
  static get tableName() {
    return 'comments';
  }

  // This object defines the relations to other models.
  static get relationMappings() {
    return {
      user: {
        relation: Model.HasOneRelation,
        modelClass: User,
        join: {
          from: 'comments.user_id',
          to: 'users.id',
        },
      },
    };
  }
}

module.exports = Comment;
