const winston = require('winston')
const convert = require('xml2js');
const rest = require('restler');
const constants = require('../utils/constants');

function feed(req, res) {

    const params = req.param('tags');

    let contents;
    let entry = [];
    rest.get( constants.BASE_URL + params).on('complete', function (result) {
        if (result instanceof Error) {
            winston.info(constants.ERROR, result.message);
            res.status(500).json(result.message);
        } else {
            convert.parseString(result, function (err, re) {
                contents = re.feed.entry;
            });
            winston.info(constants.SUCCESS_REQUEST);
            contents.forEach(entries => {
                entry.push(
                    {
                        'title': entries.title[0],
                        'img': entries.link[1].$.href
                    }
                )

            })
            res.status(200).json(entry);
        }
    });
}

module.exports = {
    feed
}
