
var requirejs = require('requirejs');

var options = {
    appDir: "./src",
    baseUrl: "js",
    dir: "./build",
    modules: [
        {
            name: "main"
        }
    ]
};

console.log('optimizing...');
requirejs.optimize( options, function(response){
        console.log(response);
        console.log('optimized!!!');
    });