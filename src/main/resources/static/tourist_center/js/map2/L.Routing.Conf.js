'use strict';

(function (factory, window) {

    if (typeof define === "function" && define.amd) {
        define(["leaflet"], factory);

    } else if (typeof exports === "object") {
        module.exports = factory(require("leaflet"));
    }

    if (typeof window !== "undefined" && window.L) {
        L.Routing.Conf = factory(L);
    }
}(function (L) {
    L.Routing.Conf = {

        url: "https://restapi.amap.com/v3/",
        key: "31b00c8ce43bd19c0ed4a67a545a510e",
        dictionary: [
            ["沿", "through"],
            ["向前走", "go straight"],
            ["往前走", "go straight"],
            ["向东", "fece to east"],
            ["向西", "fece to west"],
            ["向南", "fece to south"],
            ["向北", "fece to north"],
            ["步行", "walk"],
            ["米", "meter"],
            ["左转", "turn left"],
            ["右转", "turn right"]
        ]
    };
    return L.Routing.Conf;
}, window));
