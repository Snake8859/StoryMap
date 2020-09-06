var template = `
        <div id="app-map1">
            <div id="sidebar">
                <h1>{{scenic.name}}</h1>

                <p>{{scenic.address}}</p>

                <p><b>{{scenic.tel}}</b></p>

                <p>{{scenic.tag}}</p>

                <p>{{scenic.startLevel}}</p>

                <p class="lorem">{{scenic.introduction}}</p>

                <p class="lorem" v-for="(item,index) in scenic.pictureUrl">
                    <img :src="item">
                </p>
            </div>

            <div id="map"></div>
        </div>
`;

var sidebar; //侧边框
var map;    //地图
var geoJSONLayer = L.geoJSON(); //GeoJSON图层

var map1 = Vue.component('map1', {
    template: template,
    data: function () {
        return {
            //景区基本信息
            scenic: {
                name: "橘子洲景区",
                address: "长沙市岳麓区橘子洲头2号",
                tel: "0731-88614640",
                startLevel: "AAAAA",
                tag: "风景名胜;风景名胜;风景名胜",
                introduction: "营业时间：00:00-24:00 简介：橘子洲,是湘江中的一个冲击沙洲,自古就是长沙城的名胜之一。春天有江鸥在这里翱翔,夏、秋两季林木葱茏,冬天这里有著名的“江天暮雪”的景致。毛主席曾经赋诗赞到“独立寒秋,湘江北去,橘子洲……”。景区内还有历史文化陈列馆、潇湘名人会所、百米高喷、音乐喷泉等景观小品。景区内的柑橘文化园种植着数千株桔树,每当秋收时节,桔树上硕果累累;这里还是夏日长沙市民戏水游泳的良好场所,岛上建有天然游泳场。游览橘子洲景区,一般是步行,也可以乘坐景区内提供的电瓶车,20元/人(景区大门-主席像往返),景区大门内买票上车,电瓶车的大致服务时间:7:30-21:00。景区内有“景区游览图”立牌。景区内有饭店、酒吧等服务设施,价格稍贵于市区普通路段。在特定节日时,橘子洲烟火更是一场不可错过的视觉盛宴。",
                pictureUrl: [
                    "http://store.is.autonavi.com/showpic/9e1ac03df3c57fd367a313dee62adf61",
                    "http://store.is.autonavi.com/showpic/c6409a2d5cdb0942137b5ea9de5ce647",
                    "http://store.is.autonavi.com/showpic/8903fedcc22c2de9ecd6164d94d0d5a0"
                ]
            },
            flag: false
        }
    },
    methods: {
        //标记点
        makeMarker(e) {
            var that = this;
            //当前位置
            sidebar.hide();
            alert(e.latlng);
            //弹出景点编辑框
            var popup = L.popup({
                maxWidth: 1000,
                minWidth: 300
            })
            map.once("popupopen", function (e) {
                /**
                 * 1.创建标记点
                 * 2.点击标记点后，先根据标记点坐标 (x,y) 查询数据库中是否已存在该点
                 * 3.若存在，则flag 变为true，气泡框中显示的是景点信息
                 * 4.若不存在，则弹出编辑框，编辑该点的基本信息，编辑成功后，再刷新页面
                 * （刷新页面，主要是这个气泡框弹出和消失事件，重新加载，不然once只执行一次，会导致问题）
                 */
                //console.log(e)
                //console.log("执行:"+ that.flag)
                //查询数据库中该点是否有信息
                //....
                if (that.flag) {//若有，直接显示
                    popup.setContent("你好，我是景点信息");
                }
                else {//若无，弹出编辑框
                    popup.setContent("<div id='components-spot'><spot-window></spot-window></div>");
                    //加载js
                    //景点编辑框组件
                    var script = document.createElement("script");
                    script.id = "component-window-js"
                    script.type = "text/javascript";
                    script.src = "./component/spot_window.js";
                    document.body.appendChild(script);
                }
            });
            map.once("popupclose", function (e) {
                //console.log("执行:"+that.flag)
                if (that.flag) {//若有，不处理

                }
                else {//若无，删除js
                    var script = document.getElementById("component-window-js");
                    document.body.removeChild(script);
                }
            });
            L.marker(e.latlng).bindPopup(popup).addTo(map);
        },
        //缩放至中心
        centerMap(e) {
            map.panTo(e.latlng);
        },
        //放大
        zoomIn(e) {
            map.zoomIn();
        },
        //缩小
        zoomOut(e) {
            map.zoomOut();
        },
        //异步查询
        searchByAjax(text, callResponse)//callback for 3rd party ajax requests
        {
            var datas = []
            return axios.get("https://restapi.amap.com/v3/assistant/inputtips", {
                params: {
                    key: "daa4e1759839a0efc584e06f2d9d106e",
                    keywords: text,
                    location: returnCitySN.cip,
                    datatype: "poi"
                }
            })
                .then(function (res) {
                    //console.log(res);
                    res.data.tips.map(function (item) {
                        //console.log(item);
                        //构造数据格式
                        //[{"loc":[41.57573,13.002411],"title":"black"},{"loc":[41.807149,13.162994],"title":"blue"}]
                        var data = {};
                        if (item.location.length != 0) {
                            var location = item.location.split(",");
                            var loc = [];
                            loc[0] = parseFloat(location[1]);
                            loc[1] = parseFloat(location[0]);
                            //console.log(loc);
                            data.loc = loc;
                            if (item.district != '') {
                                data.title = item.name + "(" + item.district + ")";
                            } else {
                                data.title = item.name;
                            }
                            data.id = item.id;
                            data.adcode = item.adcode
                            datas.push(data);
                        }
                    })
                    //console.log(datas);
                    callResponse(datas);
                })
                .catch(function (err) {
                    console.log(err);
                })
        }
    },
    //挂载时加载
    mounted: function () {
        var that = this;
        //加载高德底图
        const GeoDeBaseMap = L.tileLayer.chinaProvider('GaoDe.Normal.Map', {
            maxZoom: 18,
            minZoom: 0
        });
        var normal = L.layerGroup([GeoDeBaseMap]);
        map = L.map("map", {
            center: [28.19777526841951, 113.00039291381837],
            zoom: 12,
            layers: [normal],
            //右键菜单
            contextmenu: true,
            contextmenuWidth: 140,
            contextmenuItems: [{
                text: '标记点',
                callback: that.makeMarker
            }, {
                text: '平移',
                callback: that.centerMap
            }, '-', {
                text: '放大',
                icon: 'images/zoom-in.png',
                callback: that.zoomIn
            }, {
                text: '缩小',
                icon: 'images/zoom-out.png',
                callback: that.zoomOut
            }]
        });
        //搜索插件
        map.addControl(new L.Control.Search({ sourceData: that.searchByAjax, text: 'Color...', markerLocation: true, zoom: 15 }));
        //侧边栏插件
        sidebar = L.control.sidebar('sidebar', {
            closeButton: true,
            position: 'right'
        });
        map.addControl(sidebar);
    }
})