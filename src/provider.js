var angular = require("angular");
var _ = require("lodash");
var app;
try {
    app = angular.module("jg");
} catch (err) {
    app = angular.module("jg", []);
}
app.provider("requestTarget", ["$location", function ($location) {
    var defaults = {
        defaultTarget: "origin",
        targets: {
            origin: _([$location.protocol(), $location.host(), $location.port()]).join(":")
        }
    };

    var provider = this;

    var confs = _.cloneDeep(defaults);
    this.setDefaultTarget = function (targetName) {
        if (!_.isString(confs.targets[targetName])) {
            throw new Error("The target name " + targetName + " has not been previously defined");
        }
        return confs.defaultTarget = targetName;
    };

    this.setTarget = function (name, url) {
        if (!_.isString(name) || !_.isString(url)) {
            throw new Error("Both arguments must be String");
        }
        return confs.targets[name] = url;
    };

    this.config = function (configs) {
        confs = _.defaults({}, configs, defaults);
    };

    this.$get = [function () {
        var service = {
            getTarget: function (nameTarget) {
                return nameTarget ? confs.targets[nameTarget] : confs.targets[confs.defaultTarget];
            },
            setTarget: provider.setTarget.bind(provider),
            setDefaultTarget: provider.setDefaultTarget.bind(provider)
        };
        return service;
    }];
}]);
module.exports = app;