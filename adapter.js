'use strict';
const Marko = require('marko');
module.exports = function(source, config){

    let views = null;

    function loadViews(source) {
        views = {};
        for (let item of source.flattenDeep()) {
            views['@' + item.handle] = item.content;
            if (item.alias) {
                views['@' + item.alias] = item.content;
            }
        }
    }

    source.on('loaded', loadViews);
    source.on('changed', loadViews);

    return {
        engine: Marko,
        render: function(path, str, context, meta){
            if (!views === null) loadViews(source);
            debugger;
            //return Promise.resolve(Mustache.render(str, context, views));
            return Promise.resolve();
        }
    }

};
