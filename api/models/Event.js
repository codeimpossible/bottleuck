/**
* Events.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  attributes: {
    title: 'STRING',
    description: 'STRING',
    owner: {
      model: 'user'
    },
    participants: {
      collection: 'participant',
      via: 'event'
    },

    toJSON: function() {
      var obj = this.toObject();

      // add some urls
      obj.html_url = '/event/' + obj.id

      return obj;
    }
  }
};
