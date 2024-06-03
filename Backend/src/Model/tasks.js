const { Model } = require('objection');

class Tasks extends Model {
  static get tableName() {
    return 'tasks';
  }

  static get idColumn() {
    return 'id';
  }
}
module.exports=Tasks