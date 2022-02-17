import { Model } from 'objection';
const BaseModel = require('./BaseModel');

export class Art extends BaseModel {
  static get tableName() {
    return 'arts';
  }

  // This object defines the relations to other models.
  static get relationMappings() {
    const Comment = require('./Comment');

    return {
      comments: {
        relation: Model.HasManyRelation,
        modelClass: Comment,
        join: {
          from: 'arts.id',
          to: 'comments.art_id',
        },
      },
    };
  }
}

module.exports = Art;
