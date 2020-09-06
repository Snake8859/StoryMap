/**
 * 获取url方法
 * @param  variable 
 */
function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) { return pair[1]; }
    }
    return ("");
}

/**
 * 校验对象内容是否为空
 * @param {*} obj 
 */
function checkObjProp(obj) {
    //获取对象的key
    keys = Object.keys(obj)
    //遍历keys
    for (i in keys) {
        //console.log(obj[keys[i]]);
        if (obj[keys[i]] == "") {
            return false;
        }
    }
    return true;
}

//异步查询
function searchByAjax(text, callResponse)
{
    var datas = []
    return axios.get("https://restapi.amap.com/v3/assistant/inputtips", {
        params: {
            key: "daa4e1759839a0efc584e06f2d9d106e",
            keywords: text,
            location: returnCitySN.cip,
            type:"110000|110100|110101|110102|110103|110104|110105|110106|110200|110201|110202|110203|110204|110205|110206|110207|110208|110209",
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