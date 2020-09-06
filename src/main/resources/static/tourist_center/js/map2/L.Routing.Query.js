L.Routing.Query = L.Routing.Reader.extend({

    initialize: function (layer, options) {
        L.Routing.Reader.prototype.initialize.call(this, options);
        this.layer = layer;
        this.url = this.url + "assistant/inputtips";
    },
    setParams: function (keywords, location) {
        this.params = {
            keywords: keywords,
            location: location,
            datatype: "poi",
            key: this.key
        }
    },
    callback: function (a, b, c) {
        var pointsArr = b.tips;
        for (var i in pointsArr) {

            var marker = this._pointReader(pointsArr[i].location)
            if (this.options.isShowQueryPopup) {
                marker.addTo(this.layer).bindPopup(pointsArr[i].name);
            } else {
                marker.addTo(this.layer);
            }

        }

        this.layer._map.fitBounds(this.layer.getBounds());
    }

})