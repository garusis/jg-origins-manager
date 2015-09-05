"use strict";
var _ = require("lodash");

var RequestTargetProvider = function (configs) {
    var provider = this;
    if (!(provider instanceof RequestTargetProvider)) {
        provider = new RequestTargetProvider(configs);
        return _.last(provider.$get)();
    }

    var defaults = {
        defaultTarget: "origin"
    };
    if (window) {
        defaults.targets = {origin: window.location.origin};
    } else {
        defaults.targets = {origin: "http://localhost:80"};
    }

    var confs = null;
    this.setDefaultTarget = function (targetName) {
        if (!_.isString(confs.targets[targetName])) {
            throw new Error("The target name " + targetName + " has not been previously defined");
        }
        return confs.defaultTarget = targetName;
    };

    this.setTarget = function (name, url) {
        if (arguments.length === 1 && _.isObject(name)) {
            var targets = name;
            confs.targets = _.defaults({}, targets, confs.targets);
            return confs.targets;
        } else if (!_.isString(name) || !_.isString(url)) {
            throw new Error("Bad use for setTarget. Arguments must be nameTarget:String, url:String or targets:Object");
        }
        confs.targets[name] = url;
        return confs.targets;
    };

    this.config = function (configs) {
        confs = _.defaults({}, configs || {}, defaults);
    };
    this.config(configs);


    this.$get = [function () {
        return {
            getTarget: function (nameTarget) {
                return nameTarget ? confs.targets[nameTarget] : confs.targets[confs.defaultTarget];
            },
            setTarget: provider.setTarget.bind(provider),
            setDefaultTarget: provider.setDefaultTarget.bind(provider)
        };
    }];
};

var angular = require("angular");
var app;
try {
    app = angular.module("jg");
} catch (err) {
    app = angular.module("jg", []);
}
app.provider("requestTarget", RequestTargetProvider);
module.exports = RequestTargetProvider;