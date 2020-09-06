L.Routing = L.Class.extend({
    includes: [L.Mixin.Events],

    options: {
        // 3 options for transform ,depend on the map:
        // WGS84,BD09,GCJ02
        transform: "WGS84",
        //Line color, if color is "multi",the line will be colorful.
        // color: "RGBA(245, 224, 128, 1.0)",
        color: "blue",
        isShowRoutePopup: true,
        isShowQueryPopup: true,
        isZoom: true,
        //Is route describe translate.
        isTranslate: false
    },

    initialize: function (map, options) {

        this.map = map;
        this.routeLayer = new L.featureGroup();
        this.routeLayer.addTo(this.map);

        this.queryLayer = new L.featureGroup();
        this.queryLayer.addTo(this.map);

        //Default set
        L.setOptions(this, options);

        //initialize method ,avoid repeat statement this.
        this.Bywalk = new L.Routing.Bywalk(this.routeLayer, this.options);
        this.Bywalk.on("ROUTEBACK", function (e) {
            this.fire("WALKROUTEBACK", e, this);
        }, this)

        this.Bybus = new L.Routing.Bybus(this.routeLayer, this.options);
        this.Bybus.on("ROUTEBACK", function (e) {
            this.fire("BUSROUTEBACK", e, this);
        }, this)
        this.Bycar = new L.Routing.Bycar(this.routeLayer, this.options);
        this.Bycar.on("ROUTEBACK", function (e) {
            this.fire("CARROUTEBACK", e, this);
        }, this)

        this.query = new L.Routing.Query(this.queryLayer, this.options);
    },
    getRoute: function (how, from, to) {
        this.routeLayer.clearLayers();
        this[how].setParams(from, to);
        this[how].getRoute();
    },
    getPOI: function (keyword) {
        var center = this.map.getCenter();
        var gcjCenter = this.query._untransform(center.lat, center.lng)
        var centerStr = gcjCenter.lng + "," + gcjCenter.lat;
        this.query.setParams(keyword, centerStr);
        this.query.getPOI();

        this.query.on("CLICK", function (e) {
            console.log(e)
            this.fire("MARKCLICK");
        }, this)
    }

})

L.Routing.BYWALK = "Bywalk";
L.Routing.BYBUS = "Bybus";
L.Routing.BYCAR = "Bycar";