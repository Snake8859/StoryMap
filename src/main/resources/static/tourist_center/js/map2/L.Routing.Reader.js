L.Routing.Reader = L.Class.extend({
    includes: [L.Mixin.Events],
    initialize: function (options) {
        this.key = L.Routing.Conf.key;
        this.url = L.Routing.Conf.url;
        this.dictionary = L.Routing.Conf.dictionary;

        L.setOptions(this, options);
    },
    getRoute: function () {
        L.Request.JSONP(this.url, this.params, function (a, b, c) {
            this.callback(a, b, c);
            this.fire("ROUTEBACK", {a: a, b: b, c: c}, this);
        }, this);
    },
    getPOI: function () {
        this.getRoute();
    },
    _getIcon: function (style) {
        return new L.divIcon({
            className: 'none',
            html: "<p id='" + style + "'></p>",
            iconSize: [10, 10],
            // iconAnchor: [8, 20],
            popupAnchor: [0, 0],
        });
    },

    _pointReader: function (pointsString) {
        var lng = Number(pointsString.substr(0, pointsString.indexOf(",")));
        var lat = Number(pointsString.substr(pointsString.indexOf(",") + 1));
        var latlng = this._transform(lat, lng);
        var marker = new L.marker(latlng);
        marker.on('click', function (e) {
            this.fire("CLICK", e, this);
        }, this);
        return marker;

    },

    _lineReader: function (lineString) {

        var line = lineString.split(";");
        var lineArray = [];
        for (var i in line) {
            var lng = Number(line[i].substr(0, line[i].indexOf(",")));
            var lat = Number(line[i].substr(line[i].indexOf(",") + 1));
            var latlng = this._transform(lat, lng);

            lineArray.push(latlng)
        }
        if (this.options.color == "multi") {
            var polyline = L.polyline(lineArray, {
                color: this._getRandomColor(),
                weight: 5,
                opacity: 0.8
            });
        } else {
            var polyline = L.polyline(lineArray, {
                color: this.options.color,
                // color:this._getRandomColor(),
                weight: 8,
                opacity: 0.8
            });
        }
        polyline.on('click', function (e) {
            this.fire("CLICK", e, this);
            //this.clickCallback(e);
        }, this);

        return polyline;
    },
    _transform: function (lat, lng) {
        var gpsLatlng, latlng;
        switch (this.options.transform) {
            case "WGS84":
                gpsLatlng = L.ChinaProj.gcj_To_Gps84(lat, lng);
                latlng = new L.LatLng(gpsLatlng[0], gpsLatlng[1]);
                break;
            case "BD09":
                gpsLatlng = L.ChinaProj.gcj02_To_Bd09(lat, lng);
                latlng = new L.LatLng(gpsLatlng[0], gpsLatlng[1]);
                break;
            case "GCJ02":
                latlng = new L.LatLng(lat, lng);
                break;
        }
        return latlng;
    },
    _untransform: function (lat, lng) {
        var gcjLatlng, latlng;
        switch (this.options.transform) {
            case "WGS84":
                gcjLatlng = L.ChinaProj.gps84_To_Gcj02(lat, lng);
                latlng = new L.LatLng(gcjLatlng[0], gcjLatlng[1]);
                break;
            case "BD09":
                gcjLatlng = L.ChinaProj.bd09_To_Gcj02(lat, lng);
                latlng = new L.LatLng(gcjLatlng[0], gcjLatlng[1]);
                break;
            case "GCJ02":
                latlng = new L.LatLng(lat, lng);
                break;
        }
        return latlng;
    },

    _getRandomColor: function () {
        return "#" + ("00000" + ((Math.random() * 16777215 + 0.5) >> 0).toString(16)).slice(-6);
    },

    _SplitAndRound: function (a, n) {
        a = a * Math.pow(10, n);
        return (Math.round(a)) / (Math.pow(10, n));
    },
    _translate: function (text) {
        var result = text;
        for (var i in L.Routing.Conf.dictionary) {
            result = result.replace(L.Routing.Conf.dictionary[i][0], L.Routing.Conf.dictionary[i][1] + " ");
        }
        return result;
    }

});

