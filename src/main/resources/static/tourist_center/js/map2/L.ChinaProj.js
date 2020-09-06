/**
 * 各地图API坐标系统比较与转换;
 * WGS84坐标系：即地球坐标系，国际上通用的坐标系。设备一般包含GPS芯片或者北斗芯片获取的经纬度为WGS84地理坐标系,
 * 谷歌地图采用的是WGS84地理坐标系（中国范围除外）;
 * GCJ02坐标系：即火星坐标系，是由中国国家测绘局制订的地理信息系统的坐标系统。由WGS84坐标系经加密后的坐标系。
 * 谷歌中国地图和搜搜中国地图采用的是GCJ02地理坐标系; BD09坐标系：即百度坐标系，GCJ02坐标系经加密后的坐标系;
 * 搜狗坐标系、图吧坐标系等，估计也是在GCJ02基础上加密而成的。 chenhua
 */

(function (factory, window) {

    if (typeof define === "function" && define.amd) {
        define(["leaflet"], factory);

    } else if (typeof exports === "object") {
        module.exports = factory(require("leaflet"));
    }

    if (typeof window !== "undefined" && window.L) {
        window.L.ChinaProj = factory(L);
    }
}(function (L) {
    L.ChinaProj = {
        pi: Math.PI,
        a: 6378245.0,
        ee: 0.00669342162296594323,

        /**
         * 84 to 火星坐标系 (GCJ-02) World Geodetic System ==> Mars Geodetic System
         *
         * @param lat
         * @param lon
         * @return
         */
        gps84_To_Gcj02: function (lat, lon) {
            if (this.outOfChina(lat, lon)) {
                return [lat, lon];
            }
            var dLat = this.transformLat(lon - 105.0, lat - 35.0);
            var dLon = this.transformLon(lon - 105.0, lat - 35.0);
            var radLat = lat / 180.0 * this.pi;
            var magic = Math.sin(radLat);
            magic = 1 - this.ee * magic * magic;
            var sqrtMagic = Math.sqrt(magic);
            dLat = (dLat * 180.0) / ((this.a * (1 - this.ee)) / (magic * sqrtMagic) * this.pi);
            dLon = (dLon * 180.0) / (this.a / sqrtMagic * Math.cos(radLat) * this.pi);
            var mgLat = lat + dLat;
            var mgLon = lon + dLon;
            return [mgLat, mgLon];
        },

        /**
         * * 火星坐标系 (GCJ-02) to 84 * * @param lon * @param lat * @return
         * */
        gcj_To_Gps84: function (lat, lon) {
            var gps = this.transform(lat, lon);
            var lontitude = lon * 2 - gps[1];
            var latitude = lat * 2 - gps[0];
            return [latitude, lontitude];
        },

        /**
         * 火星坐标系 (GCJ-02) 与百度坐标系 (BD-09) 的转换算法 将 GCJ-02 坐标转换成 BD-09 坐标
         *
         * @param gg_lat
         * @param gg_lon
         */
        gcj02_To_Bd09: function (gg_lat, gg_lon) {
            var x = gg_lon, y = gg_lat;
            var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * this.pi);
            var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * this.pi);
            var bd_lon = z * Math.cos(theta) + 0.0065;
            var bd_lat = z * Math.sin(theta) + 0.006;
            return [bd_lat, bd_lon];
        },

        /**
         * * 火星坐标系 (GCJ-02) 与百度坐标系 (BD-09) 的转换算法 * * 将 BD-09 坐标转换成GCJ-02 坐标 * * @param
         * bd_lat * @param bd_lon * @return
         */

        bd09_To_Gcj02: function (bd_lat, bd_lon) {
            var x = bd_lon - 0.0065, y = bd_lat - 0.006;
            var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * this.pi);
            var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * this.pi);
            var gg_lon = z * Math.cos(theta);
            var gg_lat = z * Math.sin(theta);
            return [gg_lat, gg_lon];
        },

        /**
         * (BD-09)-->84
         * @param bd_lat
         * @param bd_lon
         * @return
         */
        bd09_To_Gps84: function (bd_lat, bd_lon) {

            var gcj02 = this.bd09_To_Gcj02(bd_lat, bd_lon);
            var map84 = this.gcj_To_Gps84(gcj02[0], gcj02[1]);
            return map84;

        },

        outOfChina: function (lat, lon) {
            if (lon < 72.004 || lon > 137.8347)
                return true;
            if (lat < 0.8293 || lat > 55.8271)
                return true;
            return false;
        },
        transform: function (lat, lon) {
            if (this.outOfChina(lat, lon)) {
                return [lat, lon];
            }
            var dLat = this.transformLat(lon - 105.0, lat - 35.0);
            var dLon = this.transformLon(lon - 105.0, lat - 35.0);
            var radLat = lat / 180.0 * this.pi;
            var magic = Math.sin(radLat);
            magic = 1 - this.ee * magic * magic;
            var sqrtMagic = Math.sqrt(magic);
            dLat = (dLat * 180.0) / ((this.a * (1 - this.ee)) / (magic * sqrtMagic) * this.pi);
            dLon = (dLon * 180.0) / (this.a / sqrtMagic * Math.cos(radLat) * this.pi);
            var mgLat = lat + dLat;
            var mgLon = lon + dLon;
            return [mgLat, mgLon];
        },

        transformLat: function (x, y) {
            var ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y
                + 0.2 * Math.sqrt(Math.abs(x));
            ret += (20.0 * Math.sin(6.0 * x * this.pi) + 20.0 * Math.sin(2.0 * x * this.pi)) * 2.0 / 3.0;
            ret += (20.0 * Math.sin(y * this.pi) + 40.0 * Math.sin(y / 3.0 * this.pi)) * 2.0 / 3.0;
            ret += (160.0 * Math.sin(y / 12.0 * this.pi) + 320 * Math.sin(y * this.pi / 30.0)) * 2.0 / 3.0;
            return ret;
        },
        transformLon: function (x, y) {
            var ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1
                * Math.sqrt(Math.abs(x));
            ret += (20.0 * Math.sin(6.0 * x * this.pi) + 20.0 * Math.sin(2.0 * x * this.pi)) * 2.0 / 3.0;
            ret += (20.0 * Math.sin(x * this.pi) + 40.0 * Math.sin(x / 3.0 * this.pi)) * 2.0 / 3.0;
            ret += (150.0 * Math.sin(x / 12.0 * this.pi) + 300.0 * Math.sin(x / 30.0
                    * this.pi)) * 2.0 / 3.0;
            return ret;
        }
    };
    return L.ChinaProj;
}, window));
