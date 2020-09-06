L.Routing.Bycar = L.Routing.Reader.extend({
    initialize: function (layer, options) {
        L.Routing.Reader.prototype.initialize.call(this, options);
        this.layer = layer;
        this.url = this.url + "direction/driving";
    },
    setParams: function (from, to) {
        this.params = {
            origin: from[1] + "," + from[0],
            destination: to[1] + "," + to[0],
            output: "json",
            key: this.key
        }


    },
    callback: function (a, b, c) {
        try {
            var steps = b.route.paths[0].steps;
            var distance = b.route.paths[0].distance;
            var duration = b.route.paths[0].duration;
            for (var i in steps) {
                var polyline = this._lineReader(steps[i].polyline).addTo(this.layer);
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

            this.layer._map.fitBounds(this.layer.getLayers()[0].getBounds());

            var time = (duration / 60) / 60
            console.log("Time:" + time + "hour");
            console.log("Distance:" + (distance / 1000) + "km");
        }
        catch (error) {
            console.log(error);
            alert("超出距离，不建议采用该出行方式")
        }
    } 
       
    

})