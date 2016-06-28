'use strict';
const Marko = require('marko');
require('marko/node-require').install();
module.exports = function(source, config){
    require('marko/hot-reload').enable();
    require('marko/compiler').defaultOptions.writeToDisk = false;

    source.on('loaded', function(){
        // console.log('M:loaded')

    });
    source.on('changed', function(x){
        //console.log('M:changed')
        if(x.event == 'change' && x.type == 'view'){
            console.log('M:changed',x.path)
            require('marko/hot-reload').handleFileModified(x.path);
        }

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
            // console.log('Marko:render',path);
            const template = Marko.load(path, str, {writeToDisk: false});
            return new Promise(function(resolve,reject){
                require('marko/hot-reload').handleFileModified(path);
                template.render(context, function(err, html){
                    if(err !== null) return reject(err);
                    resolve(html);
                });
            });
        }
    }

};
