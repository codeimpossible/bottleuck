/**
* Events.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var formatDate_AddThisEvent = function(d) {
  return [
    d.getUTCDate(), '/', d.getUTCMonth() + 1, '/', d.getUTCFullYear(),
    ' ',
    d.getUTCHours(), ':', d.getUTCMinutes(), ':', d.getUTCSeconds()
  ].join('');
};

module.exports = {
  attributes: {
    title: 'STRING',
    description: 'STRING',
    starts_at: 'DATETIME',
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
      if(obj.starts_at) {
        obj.ends_at = new Date(obj.starts_at.getTime() + 18000000);
        obj.addThisEvent = {
          start: formatDate_AddThisEvent(obj.starts_at),
          end: formatDate_AddThisEvent(obj.ends_at)
        };
      }


      return obj;
    }
  }
};
