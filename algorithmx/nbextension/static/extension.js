define(function() {
    "use strict";

    var d3Modules = {
        'd3-color': 1,
        'd3-drag': 1,
        'd3-dispatch': 1,
        'd3-drag': 1,
        'd3-ease': 1,
        'd3-interpolate': 1,
        'd3-path': 1,
        'd3-selection': 1,
        'd3-shape': 1,
        'd3-timer': 1,
        'd3-transition': 1,
        'd3-zoom': 1
    }

    var d3Paths = Object.keys(d3Modules).reduce(function (result, k) {
        result[k] = 'https://d3js.org/' + k + '.v' + d3Modules[k] + '.min'
        return result
    }, {});

    window['requirejs'].config({
        paths: Object.assign({
            webcola: 'https://unpkg.com/webcola@^3.0.0/WebCola/cola.min',
            algorithmx: 'https://unpkg.com/algorithmx@latest/dist/algorithmx.min'
        }, d3Paths),
        shim: {
            algorithmx: {
                deps: ['webcola'].concat(d3Modules),
                exports: 'algorithmx'
            }
        },
        map: {
            '*': {
                'algorithmx-jupyter': 'nbextensions/algorithmx-jupyter/index'
            }
        }
    });

    return {
        load_ipython_extension: function() {}
    };
});
