/**
 * EventsController
 *
 * @description :: Server-side logic for managing Events
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	dashboard: function(req, res) {
		var query = Event.findOne(req.params.id).populate('owner');
		query.exec(function(err, match) {
			if(err) return res.serverError(err);
    	if(!match) return res.notFound('No record found with the specified `id`.');

			res.view({ event: match.toJSON() });
		});
	}
};
