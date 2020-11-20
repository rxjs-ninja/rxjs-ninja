"use strict";
exports.__esModule = true;
exports.load = void 0;
var utils_1 = require("typedoc/dist/lib/utils");
var events_1 = require("typedoc/dist/lib/output/events");
function load(host) {
    var app = host.application;
    app.options.addDeclaration({
        name: 'ghCname',
        help: 'CNAME Plugin: Github Pages CNAME',
        type: utils_1.ParameterType.String,
        defaultValue: ''
    });
    app.renderer.once(events_1.RendererEvent.END, function () {
        var cName = app.options.getValue('ghCname');
        var workingDir = process.cwd();
        var outDir = app.options.getValue('out') || './docs';
        utils_1.writeFile(outDir + "/CNAME", cName, false);
    });
}
exports.load = load;
