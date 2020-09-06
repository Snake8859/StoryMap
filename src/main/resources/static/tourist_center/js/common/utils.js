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