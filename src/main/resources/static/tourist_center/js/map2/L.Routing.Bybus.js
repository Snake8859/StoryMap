L.Routing.Bybus = L.Routing.Reader.extend({
    initialize: function (layer, options) {
        L.Routing.Reader.prototype.initialize.call(this, options);
        this.layer = layer;
        this.url = this.url + "direction/transit/integrated";
    },
    setParams: function (from, to) {
        this.params = {
            origin: from[1] + "," + from[0],
            destination: to[1] + "," + to[0],
            city: "长沙",
            output: "json",
            key: this.key
        }
    },
    callback: function (a, b, c) {

        
            console.log("find:" + b.count + "way out");
            console.log("dinstance:" + (b.route.distance / 1000) + "km");
            console.log("money for taxi：" + b.route.taxi_cost + "yuan");
            console.log("this show option 1");

            var route = b.route.transits[0];

            console.log("need walk " + (route.walking_distance / 1000) + "km");
            console.log("need cost" + (route.duration / 60) / 60 + "hour");

            try {
            var walkingArr = [];
            for (var index in route.segments) {
                walkingArr.push(route.segments[index].walking);
                var steps = route.segments[index].walking.steps
                for (var i in steps) {
                    var polyline = this._lineReader(steps[i].polyline).addTo(this.layer);
                    polyline.setStyle({ dashArray: "20,20" });

                    var marker = new L.marker(polyline.getLatLngs()[0], { icon: this._getIcon('circle') });

                    var instrucation = "";
                    if (this.options.isTranslate) {
                        instrucation = this._translate(steps[i].instruction);
                    } else {
                        instrucation = steps[i].instruction;
                    }

                    if (this.options.isShowRoutePopup) {
                        marker.addTo(this.layer).bindPopup(instrucation);
                    } else {
                        marker.addTo(this.layer);
                    }

                }
            }

           
            var busArr = []
            for (var index in route.segments) {
                busArr.push(route.segments[index].bus.buslines);
                var busLines = route.segments[index].bus.buslines;
                for (var i in busLines) {
                    var busline = this._lineReader(busLines[i].polyline).addTo(this.layer);

                    var busMarker = new L.marker(busline.getLatLngs()[0], { icon: this._getIcon('circle') });

                    var instrucation = busLines[i].name;

                    for (var stop in busLines[i].via_stops) {
                        
                        var busStop = this._pointReader(busLines[i].via_stops[stop].location);
                        busStop.addTo(this.layer).bindPopup("Stop Name:" + busLines[i].via_stops[stop].name);
                        busStop.setIcon(this._getIcon('rect'));

                        // var busStop = this._pointReader(busLines.via_stops[stop].location);
                        // busStop.addTo(this.layer).bindPopup("Stop Name:" + busLines.via_stops[stop].name);
                        // busStop.setIcon(this._getIcon('rect'));
                    }

                    if (this.options.isShowRoutePopup) {
                        busMarker.addTo(this.layer).bindPopup(instrucation);

                    } else {
                        marbusMarkerker.addTo(this.layer);
                    }
                }
            }

            this.layer._map.fitBounds(this.layer.getLayers()[0].getBounds());
        } catch (error) {
            console.log(error);
            alert("超出距离，不建议采用该出行方式")
        }


    }

})