'use strict';
const Marko = require('marko');
module.exports = function(source, config){
    let views = null;

    function loadViews(source) {
        // console.log("MARKO:loadView",source);
        views = {};

        for (let item of source.flattenDeep()) {
            views['@' + item.handle] = item.content;
            if (item.alias) {
                views['@' + item.alias] = item.content;
            }
        }
    }

    source.on('loaded', function(){
        // console.log('M:loaded')
        loadViews
    });
    source.on('changed', function(){
        // console.log('M:changed')
        loadViews
    });

    return {
        engine: Marko,
        render: function(path, str, context, meta){
            // console.log("MARKO:renderer","\npath:",path,'\nstr:', str, '\ncontext:', context,'\nmeta:', meta);
            /* path - readed .arko template file path
             * str - .marko template file content
             * context - data
             * meta - ?undefined?
             */
            if (!views) loadViews(source);

            //return Promise.resolve(Mustache.render(str, context, views));
            return Promise.resolve(Marko.load(path, str).renderSync(context));
        }
    }

};
