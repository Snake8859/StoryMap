/**
 * Http request
 *
 * 该方法提供 Get||Post||Jsonp 请求
 * this.Method offer Get||Post||Jsonp serval way to request
 * @L.Request
 * @stastic
 *
 * */
(function (window) {
    window._Callback = {};
})(window)

L.Request = {
    callbacks: new Date().getTime(),
    _serialize: function (params) {
        var data = '';
        //  params.f = params.f || 'json';

        for (var key in params) {
            if (params.hasOwnProperty(key)) {
                var param = params[key];
                var type = Object.prototype.toString.call(param);
                var value;

                if (data.length) {
                    data += '&';
                }

                if (type === '[object Array]') {
                    value = (Object.prototype.toString.call(param[0]) === '[object Object]') ? JSON.stringify(param) : param.join(',');
                } else if (type === '[object Object]') {
                    value = JSON.stringify(param);
                } else if (type === '[object Date]') {
                    value = param.valueOf();
                } else {
                    value = param;
                }

                data += encodeURIComponent(key) + '=' + encodeURIComponent(value);
            }
        }

        return data;
    },

    createRequest: function (callback, context, resultType) {
        resultType = resultType ? resultType : "JSON";
        var httpRequest = new XMLHttpRequest();

        httpRequest.onerror = function (e) {
            httpRequest.onreadystatechange = L.Util.falseFn;

            callback.call(context, {
                error: {
                    code: 500,
                    message: 'XMLHttpRequest error'
                }
            }, null);
        };

        httpRequest.onreadystatechange = function () {
            var response;
            var error;

            if (httpRequest.readyState === 4) {


                if (resultType == "JSON") {
                    try {
                        response = JSON.parse(httpRequest.responseText);
                    } catch (e) {
                        response = null;
                        error = {
                            code: 500,
                            message: 'Could not parse response as JSON. This could also be caused by a CORS or XMLHttpRequest error.'
                        };
                    }
                }
                else {
                    if (httpRequest.status === 200) {
                        response = httpRequest.responseText;
                    } else {
                        response = httpRequest.responseText;
                    }
                }

                if (!error && response.error) {
                    error = response.error;
                    response = null;
                }

                httpRequest.onerror = L.Util.falseFn;

                callback.call(context, error, response);
            }
        };

        return httpRequest;
    },
    /**
     * HTTP post
     *
     *  @method post
     *  @params {[String]} url url
     *  @params {[Object]} params 参数
     *  @params {[Function]} callback 回调
     *  @params {[Object]} context 环境
     *  @params {[String]} resultType 返回类型 当前支持JSON
     * */
    post: function (url, params, callback, context, resultType) {
        var httpRequest = this.createRequest(callback, context, resultType);
        httpRequest.open('POST', url);
        //httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        httpRequest.setRequestHeader('Access-Control-Allow-Headers', '*');
        httpRequest.setRequestHeader('Access-Control-Allow-Origin', '*');
        httpRequest.setRequestHeader('Content-Type', 'text/html; charset=utf-8');
        httpRequest.setRequestHeader('Accept-Language', 'zh-CN,zh;q=0.8,en;q=0.6');

        httpRequest.send(params);

        return httpRequest;

    },
    /**
     * HTTP get
     *  @method get
     *  @params {[String]} url url
     *  @params {[Object]} params 参数
     *  @params {[Function]} callback 回调
     *  @params {[Object]} context 环境
     * */
    get: function (url, params, callback, context) {
        var httpRequest = this.createRequest(callback, context),
            requestUrl = url;
        if (params)
            requestUrl += '?' + params;
        httpRequest.open('GET', requestUrl, true);
        httpRequest.setRequestHeader('Access-Control-Allow-Origin', '*');
        httpRequest.setRequestHeader('Content-Type', 'text/html; charset=utf-8');
        httpRequest.setRequestHeader('Accept-Language', 'zh-CN,zh;q=0.8,en;q=0.6');
        httpRequest.send(null);

        return httpRequest;
    },
    /**
     * HTTP get 获取text类型的数据
     *  @method getText
     *  @params {[String]} url url
     *  @params {[Object]} params 参数
     *  @params {[Function]} callback 回调
     *  @params {[Object]} context 环境
     * */
    getText: function (url, params, callback, context) {
        var httpRequest = this.createRequest(callback, context, "text"),
            requestUrl = url;
        if (params)
            requestUrl += '?' + params;
        httpRequest.open('GET', requestUrl, true);
        httpRequest.setRequestHeader('Access-Control-Allow-Origin', '*');
        httpRequest.setRequestHeader('Content-Type', 'text/html; charset=utf-8');
        httpRequest.setRequestHeader('Accept-Language', 'zh-CN,zh;q=0.8,en;q=0.6');
        httpRequest.send(null);

        return httpRequest;
    },
    /**
     * HTTP 无返回的JSONP
     *  @method noReturnJP
     *  @params {[String]} url url
     *  @params {[Object]} params 参数
     * */
    noReturnJP: function (url, params) {
        var script = L.DomUtil.create('script', null, document.body);
        script.type = 'text/javascript';
        script.src = url + '?' + this._serialize(params);
    },
    /**
     * HTTP JSONP
     *  @method JSONP
     *  @params {[String]} url url
     *  @params {[Object]} params 参数
     *  @params {[Function]} callback 回调
     *  @params {[Object]} context 环境
     * */
    JSONP: function (url, params, callback, context) {

        var callbackId = 'c' + new Date().getTime();

        params.callback = 'window._Callback.' + callbackId;

        var script = L.DomUtil.create('script', null, document.body);
        script.type = 'text/javascript';
        script.src = url + '?' + this._serialize(params);
        script.id = callbackId;


        window._Callback[callbackId] = function (response) {
            if (window._Callback[callbackId] !== true) {
                var error;
                var responseType = Object.prototype.toString.call(response);

                if (!(responseType === '[object Object]' || responseType === '[object Array]')) {
                    error = {
                        error: {
                            code: 500,
                            message: 'Expected array or object as JSONP response'
                        }
                    };
                    response = null;
                }

                if (!error && response.error) {
                    error = response;
                    response = null;
                }

                callback.call(context, error, response);
            }
        };

        this.callbacks++;

        return {
            id: callbackId,
            url: script.src,
            abort: function () {
                window._Callback._callback[callbackId]({
                    code: 0,
                    message: 'Request aborted.'
                });
            }
        };
    }
}

