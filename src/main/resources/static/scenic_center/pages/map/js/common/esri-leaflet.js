/* esri-leaflet - v2.3.0 - Wed Jul 17 2019 15:35:19 GMT-0500 (Central Daylight Time)
 * Copyright (c) 2019 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */
! function(t, e) {
	"object" == typeof exports && "undefined" != typeof module ? e(exports, require("leaflet")) : "function" == typeof define && define.amd ? define(["exports", "leaflet"], e) : e((t.L = t.L || {}, t.L.esri = {}), t.L)
}(this, function(t, e) {
	"use strict";
	var i = window.XMLHttpRequest && "withCredentials" in new window.XMLHttpRequest,
		s = "" === document.documentElement.style.pointerEvents,
		r = {
			cors: i,
			pointerEvents: s
		},
		n = {
			attributionWidthOffset: 55
		},
		o = 0;

	function a(t) {
		var e = "";
		for (var i in t.f = t.f || "json", t)
			if (t.hasOwnProperty(i)) {
				var s, r = t[i],
					n = Object.prototype.toString.call(r);
				e.length && (e += "&"), s = "[object Array]" === n ? "[object Object]" === Object.prototype.toString.call(r[0]) ? JSON.stringify(r) : r.join(",") : "[object Object]" === n ? JSON.stringify(r) : "[object Date]" === n ? r.valueOf() : r, e += encodeURIComponent(i) + "=" + encodeURIComponent(s)
			}
		return e
	}

	function u(t, i) {
		var s = new window.XMLHttpRequest;
		return s.onerror = function(r) {
			s.onreadystatechange = e.Util.falseFn, t.call(i, {
				error: {
					code: 500,
					message: "XMLHttpRequest error"
				}
			}, null)
		}, s.onreadystatechange = function() {
			var r, n;
			if (4 === s.readyState) {
				try {
					r = JSON.parse(s.responseText)
				} catch (t) {
					r = null, n = {
						code: 500,
						message: "Could not parse response as JSON. This could also be caused by a CORS or XMLHttpRequest error."
					}
				}!n && r.error && (n = r.error, r = null), s.onerror = e.Util.falseFn, t.call(i, n, r)
			}
		}, s.ontimeout = function() {
			this.onerror()
		}, s
	}

	function l(t, e, i, s) {
		var r = u(i, s);
		return r.open("POST", t), void 0 !== s && null !== s && void 0 !== s.options && (r.timeout = s.options.timeout), r.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8"), r.send(a(e)), r
	}

	function h(t, e, i, s) {
		var r = u(i, s);
		return r.open("GET", t + "?" + a(e), !0), void 0 !== s && null !== s && void 0 !== s.options && (r.timeout = s.options.timeout), r.send(null), r
	}

	function p(t, e, i, s) {
		var n = a(e),
			o = u(i, s),
			l = (t + "?" + n).length;
		if (l <= 2e3 && r.cors ? o.open("GET", t + "?" + n) : l > 2e3 && r.cors && (o.open("POST", t), o.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8")), void 0 !== s && null !== s && void 0 !== s.options && (o.timeout = s.options.timeout), l <= 2e3 && r.cors) o.send(null);
		else {
			if (!(l > 2e3 && r.cors)) return l <= 2e3 && !r.cors ? c(t, e, i, s) : void q("a request to " + t + " was longer then 2000 characters and this browser cannot make a cross-domain post request. Please use a proxy http://esri.github.io/esri-leaflet/api-reference/request.html");
			o.send(n)
		}
		return o
	}

	function c(t, i, s, r) {
		window._EsriLeafletCallbacks = window._EsriLeafletCallbacks || {};
		var n = "c" + o;
		i.callback = "window._EsriLeafletCallbacks." + n, window._EsriLeafletCallbacks[n] = function(t) {
			if (!0 !== window._EsriLeafletCallbacks[n]) {
				var e, i = Object.prototype.toString.call(t);
				"[object Object]" !== i && "[object Array]" !== i && (e = {
					error: {
						code: 500,
						message: "Expected array or object as JSONP response"
					}
				}, t = null), !e && t.error && (e = t, t = null), s.call(r, e, t), window._EsriLeafletCallbacks[n] = !0
			}
		};
		var u = e.DomUtil.create("script", null, document.body);
		return u.type = "text/javascript", u.src = t + "?" + a(i), u.id = n, u.onerror = function(t) {
			if (t && !0 !== window._EsriLeafletCallbacks[n]) {
				s.call(r, {
					error: {
						code: 500,
						message: "An unknown error occurred"
					}
				}), window._EsriLeafletCallbacks[n] = !0
			}
		}, e.DomUtil.addClass(u, "esri-leaflet-jsonp"), o++, {
			id: n,
			url: u.src,
			abort: function() {
				window._EsriLeafletCallbacks._callback[n]({
					code: 0,
					message: "Request aborted."
				})
			}
		}
	}
	var m = r.cors ? h : c;
	m.CORS = h, m.JSONP = c;
	var d = {
		request: p,
		get: m,
		post: l
	};

	function f(t) {
		return function(t, e) {
			for (var i = 0; i < t.length; i++)
				if (t[i] !== e[i]) return !1;
			return !0
		}(t[0], t[t.length - 1]) || t.push(t[0]), t
	}

	function y(t) {
		for (var e, i = 0, s = 0, r = t.length, n = t[s]; s < r - 1; s++) i += ((e = t[s + 1])[0] - n[0]) * (e[1] + n[1]), n = e;
		return i >= 0
	}

	function g(t, e, i, s) {
		var r = (s[0] - i[0]) * (t[1] - i[1]) - (s[1] - i[1]) * (t[0] - i[0]),
			n = (e[0] - t[0]) * (t[1] - i[1]) - (e[1] - t[1]) * (t[0] - i[0]),
			o = (s[1] - i[1]) * (e[0] - t[0]) - (s[0] - i[0]) * (e[1] - t[1]);
		if (0 !== o) {
			var a = r / o,
				u = n / o;
			if (a >= 0 && a <= 1 && u >= 0 && u <= 1) return !0
		}
		return !1
	}

	function v(t, e) {
		for (var i = 0; i < t.length - 1; i++)
			for (var s = 0; s < e.length - 1; s++)
				if (g(t[i], t[i + 1], e[s], e[s + 1])) return !0;
		return !1
	}

	function _(t, e) {
		var i = v(t, e),
			s = function(t, e) {
				for (var i = !1, s = -1, r = t.length, n = r - 1; ++s < r; n = s)(t[s][1] <= e[1] && e[1] < t[n][1] || t[n][1] <= e[1] && e[1] < t[s][1]) && e[0] < (t[n][0] - t[s][0]) * (e[1] - t[s][1]) / (t[n][1] - t[s][1]) + t[s][0] && (i = !i);
				return i
			}(t, e[0]);
		return !(i || !s)
	}

	function b(t) {
		var e = [],
			i = t.slice(0),
			s = f(i.shift().slice(0));
		if (s.length >= 4) {
			y(s) || s.reverse(), e.push(s);
			for (var r = 0; r < i.length; r++) {
				var n = f(i[r].slice(0));
				n.length >= 4 && (y(n) && n.reverse(), e.push(n))
			}
		}
		return e
	}

	function x(t) {
		var e = {};
		for (var i in t) t.hasOwnProperty(i) && (e[i] = t[i]);
		return e
	}

	function S(t, e) {
		var i = {};
		if (t.features) {
			i.type = "FeatureCollection", i.features = [];
			for (var s = 0; s < t.features.length; s++) i.features.push(S(t.features[s], e))
		}
		if ("number" == typeof t.x && "number" == typeof t.y && (i.type = "Point", i.coordinates = [t.x, t.y], "number" == typeof t.z && i.coordinates.push(t.z)), t.points && (i.type = "MultiPoint", i.coordinates = t.points.slice(0)), t.paths && (1 === t.paths.length ? (i.type = "LineString", i.coordinates = t.paths[0].slice(0)) : (i.type = "MultiLineString", i.coordinates = t.paths.slice(0))), t.rings && (i = function(t) {
				for (var e, i, s = [], r = [], n = 0; n < t.length; n++) {
					var o = f(t[n].slice(0));
					if (!(o.length < 4))
						if (y(o)) {
							var a = [o.slice().reverse()];
							s.push(a)
						} else r.push(o.slice().reverse())
				}
				for (var u = []; r.length;) {
					i = r.pop();
					var l = !1;
					for (e = s.length - 1; e >= 0; e--)
						if (_(s[e][0], i)) {
							s[e].push(i), l = !0;
							break
						}
					l || u.push(i)
				}
				for (; u.length;) {
					i = u.pop();
					var h = !1;
					for (e = s.length - 1; e >= 0; e--)
						if (v(s[e][0], i)) {
							s[e].push(i), h = !0;
							break
						}
					h || s.push([i.reverse()])
				}
				return 1 === s.length ? {
					type: "Polygon",
					coordinates: s[0]
				} : {
					type: "MultiPolygon",
					coordinates: s
				}
			}(t.rings.slice(0))), "number" == typeof t.xmin && "number" == typeof t.ymin && "number" == typeof t.xmax && "number" == typeof t.ymax && (i.type = "Polygon", i.coordinates = [
				[
					[t.xmax, t.ymax],
					[t.xmin, t.ymax],
					[t.xmin, t.ymin],
					[t.xmax, t.ymin],
					[t.xmax, t.ymax]
				]
			]), (t.geometry || t.attributes) && (i.type = "Feature", i.geometry = t.geometry ? S(t.geometry) : null, i.properties = t.attributes ? x(t.attributes) : null, t.attributes)) try {
			i.id = function(t, e) {
				for (var i = e ? [e, "OBJECTID", "FID"] : ["OBJECTID", "FID"], s = 0; s < i.length; s++) {
					var r = i[s];
					if (r in t && ("string" == typeof t[r] || "number" == typeof t[r])) return t[r]
				}
				throw Error("No valid id attribute found")
			}(t.attributes, e)
		} catch (t) {}
		return JSON.stringify(i.geometry) === JSON.stringify({}) && (i.geometry = null), t.spatialReference && t.spatialReference.wkid && 4326 !== t.spatialReference.wkid && console.warn("Object converted in non-standard crs - " + JSON.stringify(t.spatialReference)), i
	}

	function I(t, e) {
		e = e || "OBJECTID";
		var i, s = {
				wkid: 4326
			},
			r = {};
		switch (t.type) {
			case "Point":
				r.x = t.coordinates[0], r.y = t.coordinates[1], r.spatialReference = s;
				break;
			case "MultiPoint":
				r.points = t.coordinates.slice(0), r.spatialReference = s;
				break;
			case "LineString":
				r.paths = [t.coordinates.slice(0)], r.spatialReference = s;
				break;
			case "MultiLineString":
				r.paths = t.coordinates.slice(0), r.spatialReference = s;
				break;
			case "Polygon":
				r.rings = b(t.coordinates.slice(0)), r.spatialReference = s;
				break;
			case "MultiPolygon":
				r.rings = function(t) {
					for (var e = [], i = 0; i < t.length; i++)
						for (var s = b(t[i]), r = s.length - 1; r >= 0; r--) {
							var n = s[r].slice(0);
							e.push(n)
						}
					return e
				}(t.coordinates.slice(0)), r.spatialReference = s;
				break;
			case "Feature":
				t.geometry && (r.geometry = I(t.geometry, e)), r.attributes = t.properties ? x(t.properties) : {}, t.id && (r.attributes[e] = t.id);
				break;
			case "FeatureCollection":
				for (r = [], i = 0; i < t.features.length; i++) r.push(I(t.features[i], e));
				break;
			case "GeometryCollection":
				for (r = [], i = 0; i < t.geometries.length; i++) r.push(I(t.geometries[i], e))
		}
		return r
	}

	function A(t, e) {
		return I(t, e)
	}

	function T(t, e) {
		return S(t, e)
	}

	function w(t) {
		if ("NaN" !== t.xmin && "NaN" !== t.ymin && "NaN" !== t.xmax && "NaN" !== t.ymax) {
			var i = e.latLng(t.ymin, t.xmin),
				s = e.latLng(t.ymax, t.xmax);
			return e.latLngBounds(i, s)
		}
		return null
	}

	function R(t) {
		return {
			xmin: (t = e.latLngBounds(t)).getSouthWest().lng,
			ymin: t.getSouthWest().lat,
			xmax: t.getNorthEast().lng,
			ymax: t.getNorthEast().lat,
			spatialReference: {
				wkid: 4326
			}
		}
	}
	var O = /^(OBJECTID|FID|OID|ID)$/i;

	function P(t) {
		var e;
		if (t.objectIdFieldName) e = t.objectIdFieldName;
		else if (t.fields) {
			for (var i = 0; i <= t.fields.length - 1; i++)
				if ("esriFieldTypeOID" === t.fields[i].type) {
					e = t.fields[i].name;
					break
				}
			if (!e)
				for (i = 0; i <= t.fields.length - 1; i++)
					if (t.fields[i].name.match(O)) {
						e = t.fields[i].name;
						break
					}
		}
		return e
	}

	function C(t) {
		for (var e in t.attributes)
			if (e.match(O)) return e
	}

	function F(t, e) {
		var i, s = t.features || t.results,
			r = s.length;
		i = e || P(t);
		var n = {
			type: "FeatureCollection",
			features: []
		};
		if (r)
			for (var o = s.length - 1; o >= 0; o--) {
				var a = T(s[o], i || C(s[o]));
				n.features.push(a)
			}
		return n
	}

	function U(t) {
		return "/" !== (t = e.Util.trim(t))[t.length - 1] && (t += "/"), t
	}

	function k(t) {
		if (-1 !== t.url.indexOf("?")) {
			t.requestParams = t.requestParams || {};
			var e = t.url.substring(t.url.indexOf("?") + 1);
			t.url = t.url.split("?")[0], t.requestParams = JSON.parse('{"' + decodeURI(e).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
		}
		return t.url = U(t.url.split("?")[0]), t
	}

	function G(t) {
		return /^(?!.*utility\.arcgis\.com).*\.arcgis\.com.*FeatureServer/i.test(t)
	}

	function M(t) {
		var e;
		switch (t) {
			case "Point":
				e = "esriGeometryPoint";
				break;
			case "MultiPoint":
				e = "esriGeometryMultipoint";
				break;
			case "LineString":
			case "MultiLineString":
				e = "esriGeometryPolyline";
				break;
			case "Polygon":
			case "MultiPolygon":
				e = "esriGeometryPolygon"
		}
		return e
	}

	function q() {
		console && console.warn && console.warn.apply(console, arguments)
	}

	function D(t) {
		return t.getSize().x - n.attributionWidthOffset + "px"
	}

	function E(t) {
		if (t.attributionControl && !t.attributionControl._esriAttributionAdded) {
			t.attributionControl.setPrefix('<a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a> | Powered by <a href="https://www.esri.com">Esri</a>');
			var i = document.createElement("style");
			i.type = "text/css", i.innerHTML = ".esri-truncated-attribution:hover {white-space: normal;}", document.getElementsByTagName("head")[0].appendChild(i), e.DomUtil.addClass(t.attributionControl._container, "esri-truncated-attribution:hover");
			var s = document.createElement("style");
			s.type = "text/css", s.innerHTML = ".esri-truncated-attribution {vertical-align: -3px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;display: inline-block;transition: 0s white-space;transition-delay: 1s;max-width: " + D(t) + ";}", document.getElementsByTagName("head")[0].appendChild(s), e.DomUtil.addClass(t.attributionControl._container, "esri-truncated-attribution"), t.on("resize", function(e) {
				t.attributionControl._container.style.maxWidth = D(e.target)
			}), t.attributionControl._esriAttributionAdded = !0
		}
	}

	function z(t) {
		var i = {
			geometry: null,
			geometryType: null
		};
		return t instanceof e.LatLngBounds ? (i.geometry = R(t), i.geometryType = "esriGeometryEnvelope", i) : (t.getLatLng && (t = t.getLatLng()), t instanceof e.LatLng && (t = {
			type: "Point",
			coordinates: [t.lng, t.lat]
		}), t instanceof e.GeoJSON && (t = t.getLayers()[0].feature.geometry, i.geometry = A(t), i.geometryType = M(t.type)), t.toGeoJSON && (t = t.toGeoJSON()), "Feature" === t.type && (t = t.geometry), "Point" === t.type || "LineString" === t.type || "Polygon" === t.type || "MultiPolygon" === t.type ? (i.geometry = A(t), i.geometryType = M(t.type), i) : void q("invalid geometry passed to spatial query. Should be L.LatLng, L.LatLngBounds, L.Marker or a GeoJSON Point, Line, Polygon or MultiPolygon object"))
	}

	function B(t, i) {
		r.cors && p(t, {}, e.Util.bind(function(t, s) {
			if (!t) {
				i._esriAttributions = [];
				for (var r = 0; r < s.contributors.length; r++)
					for (var n = s.contributors[r], o = 0; o < n.coverageAreas.length; o++) {
						var a = n.coverageAreas[o],
							u = e.latLng(a.bbox[0], a.bbox[1]),
							l = e.latLng(a.bbox[2], a.bbox[3]);
						i._esriAttributions.push({
							attribution: n.attribution,
							score: a.score,
							bounds: e.latLngBounds(u, l),
							minZoom: a.zoomMin,
							maxZoom: a.zoomMax
						})
					}
				i._esriAttributions.sort(function(t, e) {
					return e.score - t.score
				}), N({
					target: i
				})
			}
		}, this))
	}

	function N(t) {
		var i = t.target,
			s = i._esriAttributions;
		if (i && i.attributionControl) {
			var r = i.attributionControl._container.querySelector(".esri-dynamic-attribution");
			if (r && s) {
				for (var n = "", o = i.getBounds(), a = e.latLngBounds(o.getSouthWest().wrap(), o.getNorthEast().wrap()), u = i.getZoom(), l = 0; l < s.length; l++) {
					var h = s[l],
						p = h.attribution;
					!n.match(p) && h.bounds.intersects(a) && u >= h.minZoom && u <= h.maxZoom && (n += ", " + p)
				}
				n = n.substr(2), r.innerHTML = n, r.style.maxWidth = D(i), i.fire("attributionupdated", {
					attribution: n
				})
			}
		}
	}
	var Z = {
			warn: q,
			cleanUrl: U,
			getUrlParams: k,
			isArcgisOnline: G,
			geojsonTypeToArcGIS: M,
			responseToFeatureCollection: F,
			geojsonToArcGIS: A,
			arcgisToGeoJSON: T,
			boundsToExtent: R,
			extentToBounds: w,
			calcAttributionWidth: D,
			setEsriAttribution: E,
			_setGeometry: z,
			_getAttributionData: B,
			_updateMapAttribution: N,
			_findIdAttributeFromFeature: C,
			_findIdAttributeFromResponse: P
		},
		j = e.Class.extend({
			options: {
				proxy: !1,
				useCors: i
			},
			generateSetter: function(t, i) {
				return e.Util.bind(function(e) {
					return this.params[t] = e, this
				}, i)
			},
			initialize: function(t) {
				if (t.request && t.options ? (this._service = t, e.Util.setOptions(this, t.options)) : (e.Util.setOptions(this, t), this.options.url = U(t.url)), this.params = e.Util.extend({}, this.params || {}), this.setters)
					for (var i in this.setters) {
						var s = this.setters[i];
						this[i] = this.generateSetter(s, this)
					}
			},
			token: function(t) {
				return this._service ? this._service.authenticate(t) : this.params.token = t, this
			},
			format: function(t) {
				return this.params.returnUnformattedValues = !t, this
			},
			request: function(t, i) {
				return this.options.requestParams && e.Util.extend(this.params, this.options.requestParams), this._service ? this._service.request(this.path, this.params, t, i) : this._request("request", this.path, this.params, t, i)
			},
			_request: function(t, e, i, s, r) {
				var n = this.options.proxy ? this.options.proxy + "?" + this.options.url + e : this.options.url + e;
				return "get" !== t && "request" !== t || this.options.useCors ? d[t](n, i, s, r) : d.get.JSONP(n, i, s, r)
			}
		});
	var W = j.extend({
		setters: {
			offset: "resultOffset",
			limit: "resultRecordCount",
			fields: "outFields",
			precision: "geometryPrecision",
			featureIds: "objectIds",
			returnGeometry: "returnGeometry",
			returnM: "returnM",
			transform: "datumTransformation",
			token: "token"
		},
		path: "query",
		params: {
			returnGeometry: !0,
			where: "1=1",
			outSr: 4326,
			outFields: "*"
		},
		within: function(t) {
			return this._setGeometryParams(t), this.params.spatialRel = "esriSpatialRelContains", this
		},
		intersects: function(t) {
			return this._setGeometryParams(t), this.params.spatialRel = "esriSpatialRelIntersects", this
		},
		contains: function(t) {
			return this._setGeometryParams(t), this.params.spatialRel = "esriSpatialRelWithin", this
		},
		crosses: function(t) {
			return this._setGeometryParams(t), this.params.spatialRel = "esriSpatialRelCrosses", this
		},
		touches: function(t) {
			return this._setGeometryParams(t), this.params.spatialRel = "esriSpatialRelTouches", this
		},
		overlaps: function(t) {
			return this._setGeometryParams(t), this.params.spatialRel = "esriSpatialRelOverlaps", this
		},
		bboxIntersects: function(t) {
			return this._setGeometryParams(t), this.params.spatialRel = "esriSpatialRelEnvelopeIntersects", this
		},
		indexIntersects: function(t) {
			return this._setGeometryParams(t), this.params.spatialRel = "esriSpatialRelIndexIntersects", this
		},
		nearby: function(t, i) {
			return t = e.latLng(t), this.params.geometry = [t.lng, t.lat], this.params.geometryType = "esriGeometryPoint", this.params.spatialRel = "esriSpatialRelIntersects", this.params.units = "esriSRUnit_Meter", this.params.distance = i, this.params.inSr = 4326, this
		},
		where: function(t) {
			return this.params.where = t, this
		},
		between: function(t, e) {
			return this.params.time = [t.valueOf(), e.valueOf()], this
		},
		simplify: function(t, e) {
			var i = Math.abs(t.getBounds().getWest() - t.getBounds().getEast());
			return this.params.maxAllowableOffset = i / t.getSize().y * e, this
		},
		orderBy: function(t, e) {
			return e = e || "ASC", this.params.orderByFields = this.params.orderByFields ? this.params.orderByFields + "," : "", this.params.orderByFields += [t, e].join(" "), this
		},
		run: function(t, e) {
			return this._cleanParams(), this.options.isModern || G(this.options.url) ? (this.params.f = "geojson", this.request(function(i, s) {
				this._trapSQLerrors(i), t.call(e, i, s, s)
			}, this)) : this.request(function(i, s) {
				this._trapSQLerrors(i), t.call(e, i, s && F(s), s)
			}, this)
		},
		count: function(t, e) {
			return this._cleanParams(), this.params.returnCountOnly = !0, this.request(function(e, i) {
				t.call(this, e, i && i.count, i)
			}, e)
		},
		ids: function(t, e) {
			return this._cleanParams(), this.params.returnIdsOnly = !0, this.request(function(e, i) {
				t.call(this, e, i && i.objectIds, i)
			}, e)
		},
		bounds: function(t, e) {
			return this._cleanParams(), this.params.returnExtentOnly = !0, this.request(function(i, s) {
				s && s.extent && w(s.extent) ? t.call(e, i, w(s.extent), s) : (i = {
					message: "Invalid Bounds"
				}, t.call(e, i, null, s))
			}, e)
		},
		distinct: function() {
			return this.params.returnGeometry = !1, this.params.returnDistinctValues = !0, this
		},
		pixelSize: function(t) {
			var i = e.point(t);
			return this.params.pixelSize = [i.x, i.y], this
		},
		layer: function(t) {
			return this.path = t + "/query", this
		},
		_trapSQLerrors: function(t) {
			t && "400" === t.code && q("one common syntax error in query requests is encasing string values in double quotes instead of single quotes")
		},
		_cleanParams: function() {
			delete this.params.returnIdsOnly, delete this.params.returnExtentOnly, delete this.params.returnCountOnly
		},
		_setGeometryParams: function(t) {
			this.params.inSr = 4326;
			var e = z(t);
			this.params.geometry = e.geometry, this.params.geometryType = e.geometryType
		}
	});

	function J(t) {
		return new W(t)
	}
	var Q = j.extend({
		setters: {
			contains: "contains",
			text: "searchText",
			fields: "searchFields",
			spatialReference: "sr",
			sr: "sr",
			layers: "layers",
			returnGeometry: "returnGeometry",
			maxAllowableOffset: "maxAllowableOffset",
			precision: "geometryPrecision",
			dynamicLayers: "dynamicLayers",
			returnZ: "returnZ",
			returnM: "returnM",
			gdbVersion: "gdbVersion",
			token: "token"
		},
		path: "find",
		params: {
			sr: 4326,
			contains: !0,
			returnGeometry: !0,
			returnZ: !0,
			returnM: !1
		},
		layerDefs: function(t, e) {
			return this.params.layerDefs = this.params.layerDefs ? this.params.layerDefs + ";" : "", this.params.layerDefs += [t, e].join(":"), this
		},
		simplify: function(t, e) {
			var i = Math.abs(t.getBounds().getWest() - t.getBounds().getEast());
			return this.params.maxAllowableOffset = i / t.getSize().y * e, this
		},
		run: function(t, e) {
			return this.request(function(i, s) {
				t.call(e, i, s && F(s), s)
			}, e)
		}
	});

	function V(t) {
		return new Q(t)
	}
	var H = j.extend({
		path: "identify",
		between: function(t, e) {
			return this.params.time = [t.valueOf(), e.valueOf()], this
		}
	});
	var K = H.extend({
		setters: {
			layers: "layers",
			precision: "geometryPrecision",
			tolerance: "tolerance",
			returnGeometry: "returnGeometry"
		},
		params: {
			sr: 4326,
			layers: "all",
			tolerance: 3,
			returnGeometry: !0
		},
		on: function(t) {
			var e = R(t.getBounds()),
				i = t.getSize();
			return this.params.imageDisplay = [i.x, i.y, 96], this.params.mapExtent = [e.xmin, e.ymin, e.xmax, e.ymax], this
		},
		at: function(t) {
			return 2 === t.length && (t = e.latLng(t)), this._setGeometryParams(t), this
		},
		layerDef: function(t, e) {
			return this.params.layerDefs = this.params.layerDefs ? this.params.layerDefs + ";" : "", this.params.layerDefs += [t, e].join(":"), this
		},
		simplify: function(t, e) {
			var i = Math.abs(t.getBounds().getWest() - t.getBounds().getEast());
			return this.params.maxAllowableOffset = i / t.getSize().y * e, this
		},
		run: function(t, e) {
			return this.request(function(i, s) {
				if (i) t.call(e, i, void 0, s);
				else {
					var r = F(s);
					s.results = s.results.reverse();
					for (var n = 0; n < r.features.length; n++) {
						r.features[n].layerId = s.results[n].layerId
					}
					t.call(e, void 0, r, s)
				}
			})
		},
		_setGeometryParams: function(t) {
			var e = z(t);
			this.params.geometry = e.geometry, this.params.geometryType = e.geometryType
		}
	});

	function X(t) {
		return new K(t)
	}
	var Y = H.extend({
		setters: {
			setMosaicRule: "mosaicRule",
			setRenderingRule: "renderingRule",
			setPixelSize: "pixelSize",
			returnCatalogItems: "returnCatalogItems",
			returnGeometry: "returnGeometry"
		},
		params: {
			returnGeometry: !1
		},
		at: function(t) {
			return t = e.latLng(t), this.params.geometry = JSON.stringify({
				x: t.lng,
				y: t.lat,
				spatialReference: {
					wkid: 4326
				}
			}), this.params.geometryType = "esriGeometryPoint", this
		},
		getMosaicRule: function() {
			return this.params.mosaicRule
		},
		getRenderingRule: function() {
			return this.params.renderingRule
		},
		getPixelSize: function() {
			return this.params.pixelSize
		},
		run: function(t, e) {
			return this.request(function(i, s) {
				t.call(e, i, s && this._responseToGeoJSON(s), s)
			}, this)
		},
		_responseToGeoJSON: function(t) {
			var e = t.location,
				i = t.catalogItems,
				s = t.catalogItemVisibilities,
				r = {
					pixel: {
						type: "Feature",
						geometry: {
							type: "Point",
							coordinates: [e.x, e.y]
						},
						crs: {
							type: "EPSG",
							properties: {
								code: e.spatialReference.wkid
							}
						},
						properties: {
							OBJECTID: t.objectId,
							name: t.name,
							value: t.value
						},
						id: t.objectId
					}
				};
			if (t.properties && t.properties.Values && (r.pixel.properties.values = t.properties.Values), i && i.features && (r.catalogItems = F(i), s && s.length === r.catalogItems.features.length))
				for (var n = s.length - 1; n >= 0; n--) r.catalogItems.features[n].properties.catalogItemVisibility = s[n];
			return r
		}
	});

	function $(t) {
		return new Y(t)
	}
	var tt = e.Evented.extend({
		options: {
			proxy: !1,
			useCors: i,
			timeout: 0
		},
		initialize: function(t) {
			t = t || {}, this._requestQueue = [], this._authenticating = !1, e.Util.setOptions(this, t), this.options.url = U(this.options.url)
		},
		get: function(t, e, i, s) {
			return this._request("get", t, e, i, s)
		},
		post: function(t, e, i, s) {
			return this._request("post", t, e, i, s)
		},
		request: function(t, e, i, s) {
			return this._request("request", t, e, i, s)
		},
		metadata: function(t, e) {
			return this._request("get", "", {}, t, e)
		},
		authenticate: function(t) {
			return this._authenticating = !1, this.options.token = t, this._runQueue(), this
		},
		getTimeout: function() {
			return this.options.timeout
		},
		setTimeout: function(t) {
			this.options.timeout = t
		},
		_request: function(t, i, s, r, n) {
			this.fire("requeststart", {
				url: this.options.url + i,
				params: s,
				method: t
			}, !0);
			var o = this._createServiceCallback(t, i, s, r, n);
			if (this.options.token && (s.token = this.options.token), this.options.requestParams && e.Util.extend(s, this.options.requestParams), !this._authenticating) {
				var a = this.options.proxy ? this.options.proxy + "?" + this.options.url + i : this.options.url + i;
				return "get" !== t && "request" !== t || this.options.useCors ? d[t](a, s, o, n) : d.get.JSONP(a, s, o, n)
			}
			this._requestQueue.push([t, i, s, r, n])
		},
		_createServiceCallback: function(t, i, s, r, n) {
			return e.Util.bind(function(o, a) {
				!o || 499 !== o.code && 498 !== o.code || (this._authenticating = !0, this._requestQueue.push([t, i, s, r, n]), this.fire("authenticationrequired", {
					authenticate: e.Util.bind(this.authenticate, this)
				}, !0), o.authenticate = e.Util.bind(this.authenticate, this)), r.call(n, o, a), o ? this.fire("requesterror", {
					url: this.options.url + i,
					params: s,
					message: o.message,
					code: o.code,
					method: t
				}, !0) : this.fire("requestsuccess", {
					url: this.options.url + i,
					params: s,
					response: a,
					method: t
				}, !0), this.fire("requestend", {
					url: this.options.url + i,
					params: s,
					method: t
				}, !0)
			}, this)
		},
		_runQueue: function() {
			for (var t = this._requestQueue.length - 1; t >= 0; t--) {
				var e = this._requestQueue[t];
				this[e.shift()].apply(this, e)
			}
			this._requestQueue = []
		}
	});
	var et = tt.extend({
		identify: function() {
			return X(this)
		},
		find: function() {
			return V(this)
		},
		query: function() {
			return J(this)
		}
	});

	function it(t) {
		return new et(t)
	}
	var st = tt.extend({
		query: function() {
			return J(this)
		},
		identify: function() {
			return $(this)
		}
	});

	function rt(t) {
		return new st(t)
	}
	var nt = tt.extend({
		options: {
			idAttribute: "OBJECTID"
		},
		query: function() {
			return J(this)
		},
		addFeature: function(t, e, i) {
			this.addFeatures(t, e, i)
		},
		addFeatures: function(t, e, i) {
			for (var s = t.features ? t.features : [t], r = s.length - 1; r >= 0; r--) delete s[r].id;
			return t = A(t), t = s.length > 1 ? t : [t], this.post("addFeatures", {
				features: t
			}, function(t, s) {
				var r = s && s.addResults ? s.addResults.length > 1 ? s.addResults : s.addResults[0] : void 0;
				e && e.call(i, t || s.addResults[0].error, r)
			}, i)
		},
		updateFeature: function(t, e, i) {
			this.updateFeatures(t, e, i)
		},
		updateFeatures: function(t, e, i) {
			var s = t.features ? t.features : [t];
			return t = A(t, this.options.idAttribute), t = s.length > 1 ? t : [t], this.post("updateFeatures", {
				features: t
			}, function(t, s) {
				var r = s && s.updateResults ? s.updateResults.length > 1 ? s.updateResults : s.updateResults[0] : void 0;
				e && e.call(i, t || s.updateResults[0].error, r)
			}, i)
		},
		deleteFeature: function(t, e, i) {
			this.deleteFeatures(t, e, i)
		},
		deleteFeatures: function(t, e, i) {
			return this.post("deleteFeatures", {
				objectIds: t
			}, function(t, s) {
				var r = s && s.deleteResults ? s.deleteResults.length > 1 ? s.deleteResults : s.deleteResults[0] : void 0;
				e && e.call(i, t || s.deleteResults[0].error, r)
			}, i)
		}
	});

	function ot(t) {
		return new nt(t)
	}
	var at = "https:" !== window.location.protocol ? "http:" : "https:",
	ut = e.TileLayer.extend({
			statics: {
				TILES: {
					Streets: {
						urlTemplate: at + "//{s}.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
						options: {
							minZoom: 1,
							maxZoom: 19,
							subdomains: ["server", "services"],
							attribution: "USGS, NOAA",
							attributionUrl: "https://static.arcgis.com/attribution/World_Street_Map"
						}
                    },
                    //自定义中国彩色中文含兴趣点版中国基础地图
                    chinacommunity:{
                        urlTemplate: "http://cache1.arcgisonline.cn/arcgis/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}",
						options: {
							minZoom: 1,
							maxZoom: 19,
						}
                    },
					//自定义中国灰色地图（ArcGIS Server切片服务，来自arcgisonline.cn）
					chinagray: {
						urlTemplate: "http://cache1.arcgisonline.cn/ArcGIS/rest/services/ChinaOnlineStreetGray/MapServer/tile/{z}/{y}/{x}",
						options: {
							minZoom: 1,
							maxZoom: 19,
						}
					},
					//自定义中国彩色地图（ArcGIS Server切片服务，来自arcgisonline.cn）
					chinacolor: {
						urlTemplate: "http://cache1.arcgisonline.cn/ArcGIS/rest/services/ChinaOnlineStreetColor/MapServer/tile/{z}/{y}/{x}",
						options: {
							minZoom: 1,
							maxZoom: 19
						}
					},	
					Topographic: {
						urlTemplate: at + "//{s}.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
						options: {
							minZoom: 1,
							maxZoom: 19,
							subdomains: ["server", "services"],
							attribution: "USGS, NOAA",
							attributionUrl: "https://static.arcgis.com/attribution/World_Topo_Map"
						}
					},
					Oceans: {
						urlTemplate: at + "//{s}.arcgisonline.com/arcgis/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}",
						options: {
							minZoom: 1,
							maxZoom: 16,
							subdomains: ["server", "services"],
							attribution: "USGS, NOAA",
							attributionUrl: "https://static.arcgis.com/attribution/Ocean_Basemap"
						}
					},
					OceansLabels: {
						urlTemplate: at + "//{s}.arcgisonline.com/arcgis/rest/services/Ocean/World_Ocean_Reference/MapServer/tile/{z}/{y}/{x}",
						options: {
							minZoom: 1,
							maxZoom: 16,
							subdomains: ["server", "services"],
							pane: s ? "esri-labels" : "tilePane",
							attribution: ""
						}
					},
					NationalGeographic: {
						urlTemplate: at + "//{s}.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}",
						options: {
							minZoom: 1,
							maxZoom: 16,
							subdomains: ["server", "services"],
							attribution: "National Geographic, DeLorme, HERE, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, increment P Corp."
						}
					},
					DarkGray: {
						urlTemplate: at + "//{s}.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}",
						options: {
							minZoom: 1,
							maxZoom: 16,
							subdomains: ["server", "services"],
							attribution: "HERE, DeLorme, MapmyIndia, &copy; OpenStreetMap contributors"
						}
					},
					DarkGrayLabels: {
						urlTemplate: at + "//{s}.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}",
						options: {
							minZoom: 1,
							maxZoom: 16,
							subdomains: ["server", "services"],
							pane: s ? "esri-labels" : "tilePane",
							attribution: ""
						}
					},
					Gray: {
						urlTemplate: at + "//{s}.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}",
						options: {
							minZoom: 1,
							maxZoom: 16,
							subdomains: ["server", "services"],
							attribution: "HERE, DeLorme, MapmyIndia, &copy; OpenStreetMap contributors"
						}
					},
					GrayLabels: {
						urlTemplate: at + "//{s}.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Reference/MapServer/tile/{z}/{y}/{x}",
						options: {
							minZoom: 1,
							maxZoom: 16,
							subdomains: ["server", "services"],
							pane: s ? "esri-labels" : "tilePane",
							attribution: ""
						}
					},
					Imagery: {
						urlTemplate: at + "//{s}.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
						options: {
							minZoom: 1,
							maxZoom: 22,
							maxNativeZoom: 22,
							downsampled: !1,
							subdomains: ["server", "services"],
							attribution: "DigitalGlobe, GeoEye, i-cubed, USDA, USGS, AEX, Getmapping, Aerogrid, IGN, IGP, swisstopo, and the GIS User Community",
							attributionUrl: "https://static.arcgis.com/attribution/World_Imagery"
						}
					},
					ImageryLabels: {
						urlTemplate: at + "//{s}.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}",
						options: {
							minZoom: 1,
							maxZoom: 19,
							subdomains: ["server", "services"],
							pane: s ? "esri-labels" : "tilePane",
							attribution: ""
						}
					},
					ImageryTransportation: {
						urlTemplate: at + "//{s}.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer/tile/{z}/{y}/{x}",
						options: {
							minZoom: 1,
							maxZoom: 19,
							subdomains: ["server", "services"],
							pane: s ? "esri-labels" : "tilePane",
							attribution: ""
						}
					},
					ShadedRelief: {
						urlTemplate: at + "//{s}.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}",
						options: {
							minZoom: 1,
							maxZoom: 13,
							subdomains: ["server", "services"],
							attribution: "USGS"
						}
					},
					ShadedReliefLabels: {
						urlTemplate: at + "//{s}.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places_Alternate/MapServer/tile/{z}/{y}/{x}",
						options: {
							minZoom: 1,
							maxZoom: 12,
							subdomains: ["server", "services"],
							pane: s ? "esri-labels" : "tilePane",
							attribution: ""
						}
					},
					Terrain: {
						urlTemplate: at + "//{s}.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}",
						options: {
							minZoom: 1,
							maxZoom: 13,
							subdomains: ["server", "services"],
							attribution: "USGS, NOAA"
						}
					},
					TerrainLabels: {
						urlTemplate: at + "//{s}.arcgisonline.com/ArcGIS/rest/services/Reference/World_Reference_Overlay/MapServer/tile/{z}/{y}/{x}",
						options: {
							minZoom: 1,
							maxZoom: 13,
							subdomains: ["server", "services"],
							pane: s ? "esri-labels" : "tilePane",
							attribution: ""
						}
					},
					USATopo: {
						urlTemplate: at + "//{s}.arcgisonline.com/ArcGIS/rest/services/USA_Topo_Maps/MapServer/tile/{z}/{y}/{x}",
						options: {
							minZoom: 1,
							maxZoom: 15,
							subdomains: ["server", "services"],
							attribution: "USGS, National Geographic Society, i-cubed"
						}
					},
					ImageryClarity: {
						urlTemplate: at + "//clarity.maptiles.arcgis.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
						options: {
							minZoom: 1,
							maxZoom: 19,
							attribution: "Esri, DigitalGlobe, GeoEye, Earthstar Geographics, CNES/Airbus DS, USDA, USGS, AeroGRID, IGN, and the GIS User Community"
						}
					},
					Physical: {
						urlTemplate: at + "//{s}.arcgisonline.com/arcgis/rest/services/World_Physical_Map/MapServer/tile/{z}/{y}/{x}",
						options: {
							minZoom: 1,
							maxZoom: 8,
							subdomains: ["server", "services"],
							attribution: "U.S. National Park Service"
						}
					},
					ImageryFirefly: {
						urlTemplate: at + "//fly.maptiles.arcgis.com/arcgis/rest/services/World_Imagery_Firefly/MapServer/tile/{z}/{y}/{x}",
						options: {
							minZoom: 1,
							maxZoom: 19,
							attribution: "Esri, DigitalGlobe, GeoEye, Earthstar Geographics, CNES/Airbus DS, USDA, USGS, AeroGRID, IGN, and the GIS User Community",
							attributionUrl: "https://static.arcgis.com/attribution/World_Imagery"
						}
					}
				}
			},
			initialize: function(t, i) {
				var s;
				if ("object" == typeof t && t.urlTemplate && t.options) s = t;
				else {
					if ("string" != typeof t || !ut.TILES[t]) throw new Error('L.esri.BasemapLayer: Invalid parameter. Use one of "Streets", "Topographic", "Oceans", "OceansLabels", "NationalGeographic", "Physical", "Gray", "GrayLabels", "DarkGray", "DarkGrayLabels", "Imagery", "ImageryLabels", "ImageryTransportation", "ImageryClarity", "ImageryFirefly", ShadedRelief", "ShadedReliefLabels", "Terrain", "TerrainLabels" or "USATopo"');
					s = ut.TILES[t]
				}
				var r = e.Util.extend(s.options, i);
				e.Util.setOptions(this, r), this.options.token && -1 === s.urlTemplate.indexOf("token=") && (s.urlTemplate += "?token=" + this.options.token), this.options.proxy && (s.urlTemplate = this.options.proxy + "?" + s.urlTemplate), e.TileLayer.prototype.initialize.call(this, s.urlTemplate, r)
			},
			onAdd: function(t) {
				E(t), "esri-labels" === this.options.pane && this._initPane(), this.options.attributionUrl && B((this.options.proxy ? this.options.proxy + "?" : "") + this.options.attributionUrl, t), t.on("moveend", N), -1 !== this._url.indexOf("World_Imagery") && t.on("zoomanim", lt, this), e.TileLayer.prototype.onAdd.call(this, t)
			},
			onRemove: function(t) {
				t.off("moveend", N), e.TileLayer.prototype.onRemove.call(this, t)
			},
			_initPane: function() {
				if (!this._map.getPane(this.options.pane)) {
					var t = this._map.createPane(this.options.pane);
					t.style.pointerEvents = "none", t.style.zIndex = 500
				}
			},
			getAttribution: function() {
				if (this.options.attribution) var t = '<span class="esri-dynamic-attribution">' + this.options.attribution + "</span>";
				return t
			}
		});

	function lt(t) {
		var i = t.target;
		if (i) {
			var s = i.getZoom(),
				r = t.zoom,
				n = i.wrapLatLng(t.center);
			if (r > s && r > 13 && !this.options.downsampled) {
				var o = i.project(n, r).divideBy(256).floor(),
					a = e.Util.template(this._url, e.Util.extend({
						s: this._getSubdomain(o),
						x: o.x,
						y: o.y,
						z: r
					}, this.options)).replace(/tile/, "tilemap") + "/8/8";
				L.esri.request(a, {}, function(t, e) {
					if (!t)
						for (var i = 0; i < e.data.length; i++) {
							if (!e.data[i]) {
								this.options.maxNativeZoom = r - 1, this.options.downsampled = !0;
								break
							}
							this.options.maxNativeZoom = 22
						}
				}, this)
			} else r < 13 && (this.options.downsampled = !1)
		}
	}
	var ht = e.TileLayer.extend({
		options: {
			zoomOffsetAllowance: .1,
			errorTileUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEABAMAAACuXLVVAAAAA1BMVEUzNDVszlHHAAAAAXRSTlMAQObYZgAAAAlwSFlzAAAAAAAAAAAB6mUWpAAAADZJREFUeJztwQEBAAAAgiD/r25IQAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA7waBAAABw08RwAAAAABJRU5ErkJggg=="
		},
		statics: {
			MercatorZoomLevels: {
				0: 156543.033928,
				1: 78271.5169639999,
				2: 39135.7584820001,
				3: 19567.8792409999,
				4: 9783.93962049996,
				5: 4891.96981024998,
				6: 2445.98490512499,
				7: 1222.99245256249,
				8: 611.49622628138,
				9: 305.748113140558,
				10: 152.874056570411,
				11: 76.4370282850732,
				12: 38.2185141425366,
				13: 19.1092570712683,
				14: 9.55462853563415,
				15: 4.77731426794937,
				16: 2.38865713397468,
				17: 1.19432856685505,
				18: .597164283559817,
				19: .298582141647617,
				20: .14929107082381,
				21: .07464553541191,
				22: .0373227677059525,
				23: .0186613838529763
			}
		},
		initialize: function(t) {
			t = k(t = e.Util.setOptions(this, t)), this.tileUrl = (t.proxy ? t.proxy + "?" : "") + t.url + "tile/{z}/{y}/{x}" + (t.requestParams && Object.keys(t.requestParams).length > 0 ? e.Util.getParamString(t.requestParams) : ""), -1 !== t.url.indexOf("{s}") && t.subdomains && (t.url = t.url.replace("{s}", t.subdomains[0])), this.service = it(t), this.service.addEventParent(this), new RegExp(/tiles.arcgis(online)?\.com/g).test(t.url) && (this.tileUrl = this.tileUrl.replace("://tiles", "://tiles{s}"), t.subdomains = ["1", "2", "3", "4"]), this.options.token && (this.tileUrl += "?token=" + this.options.token), e.TileLayer.prototype.initialize.call(this, this.tileUrl, t)
		},
		getTileUrl: function(t) {
			var i = this._getZoomForUrl();
			return e.Util.template(this.tileUrl, e.Util.extend({
				s: this._getSubdomain(t),
				x: t.x,
				y: t.y,
				z: this._lodMap && this._lodMap[i] ? this._lodMap[i] : i
			}, this.options))
		},
		createTile: function(t, i) {
			var s = document.createElement("img");
			return e.DomEvent.on(s, "load", e.Util.bind(this._tileOnLoad, this, i, s)), e.DomEvent.on(s, "error", e.Util.bind(this._tileOnError, this, i, s)), this.options.crossOrigin && (s.crossOrigin = ""), s.alt = "", !this._lodMap || this._lodMap && this._lodMap[this._getZoomForUrl()] ? s.src = this.getTileUrl(t) : this.once("lodmap", function() {
				s.src = this.getTileUrl(t)
			}, this), s
		},
		onAdd: function(t) {
			E(t), this._lodMap || this.metadata(function(i, s) {
				if (!i && s.spatialReference) {
					var r = s.spatialReference.latestWkid || s.spatialReference.wkid;
					if (!this.options.attribution && t.attributionControl && s.copyrightText && (this.options.attribution = s.copyrightText, t.attributionControl.addAttribution(this.getAttribution())), t.options.crs !== e.CRS.EPSG3857 || 102100 !== r && 3857 !== r) t.options.crs && t.options.crs.code && t.options.crs.code.indexOf(r) > -1 || q("L.esri.TiledMapLayer is using a non-mercator spatial reference. Support may be available through Proj4Leaflet http://esri.github.io/esri-leaflet/examples/non-mercator-projection.html");
					else {
						this._lodMap = {};
						for (var n = s.tileInfo.lods, o = ht.MercatorZoomLevels, a = 0; a < n.length; a++) {
							var u = n[a];
							for (var l in o) {
								var h = o[l];
								if (this._withinPercentage(u.resolution, h, this.options.zoomOffsetAllowance)) {
									this._lodMap[l] = u.level;
									break
								}
							}
						}
						this.fire("lodmap")
					}
				}
			}, this), e.TileLayer.prototype.onAdd.call(this, t)
		},
		metadata: function(t, e) {
			return this.service.metadata(t, e), this
		},
		identify: function() {
			return this.service.identify()
		},
		find: function() {
			return this.service.find()
		},
		query: function() {
			return this.service.query()
		},
		authenticate: function(t) {
			var e = "?token=" + t;
			return this.tileUrl = this.options.token ? this.tileUrl.replace(/\?token=(.+)/g, e) : this.tileUrl + e, this.options.token = t, this.service.authenticate(t), this
		},
		_withinPercentage: function(t, e, i) {
			return Math.abs(t / e - 1) < i
		}
	});
	var pt = e.ImageOverlay.extend({
			onAdd: function(t) {
				this._topLeft = t.getPixelBounds().min, e.ImageOverlay.prototype.onAdd.call(this, t)
			},
			_reset: function() {
				this._map.options.crs === e.CRS.EPSG3857 ? e.ImageOverlay.prototype._reset.call(this) : e.DomUtil.setPosition(this._image, this._topLeft.subtract(this._map.getPixelOrigin()))
			}
		}),
		ct = e.Layer.extend({
			options: {
				opacity: 1,
				position: "front",
				f: "image",
				useCors: i,
				attribution: null,
				interactive: !1,
				alt: ""
			},
			onAdd: function(t) {
				E(t), this.options.zIndex && (this.options.position = null), this._update = e.Util.throttle(this._update, this.options.updateInterval, this), t.on("moveend", this._update, this), this._currentImage && this._currentImage._bounds.equals(this._map.getBounds()) ? t.addLayer(this._currentImage) : this._currentImage && (this._map.removeLayer(this._currentImage), this._currentImage = null), this._update(), this._popup && (this._map.on("click", this._getPopupData, this), this._map.on("dblclick", this._resetPopupState, this)), this.metadata(function(e, i) {
					!e && !this.options.attribution && t.attributionControl && i.copyrightText && (this.options.attribution = i.copyrightText, t.attributionControl.addAttribution(this.getAttribution()))
				}, this)
			},
			onRemove: function(t) {
				this._currentImage && this._map.removeLayer(this._currentImage), this._popup && (this._map.off("click", this._getPopupData, this), this._map.off("dblclick", this._resetPopupState, this)), this._map.off("moveend", this._update, this)
			},
			bindPopup: function(t, i) {
				return this._shouldRenderPopup = !1, this._lastClick = !1, this._popup = e.popup(i), this._popupFunction = t, this._map && (this._map.on("click", this._getPopupData, this), this._map.on("dblclick", this._resetPopupState, this)), this
			},
			unbindPopup: function() {
				return this._map && (this._map.closePopup(this._popup), this._map.off("click", this._getPopupData, this), this._map.off("dblclick", this._resetPopupState, this)), this._popup = !1, this
			},
			bringToFront: function() {
				return this.options.position = "front", this._currentImage && (this._currentImage.bringToFront(), this._setAutoZIndex(Math.max)), this
			},
			bringToBack: function() {
				return this.options.position = "back", this._currentImage && (this._currentImage.bringToBack(), this._setAutoZIndex(Math.min)), this
			},
			setZIndex: function(t) {
				return this.options.zIndex = t, this._currentImage && this._currentImage.setZIndex(t), this
			},
			_setAutoZIndex: function(t) {
				if (this._currentImage) {
					for (var e, i = this._currentImage.getPane().children, s = -t(-1 / 0, 1 / 0), r = 0, n = i.length; r < n; r++) e = i[r].style.zIndex, i[r] !== this._currentImage._image && e && (s = t(s, +e));
					isFinite(s) && (this.options.zIndex = s + t(-1, 1), this.setZIndex(this.options.zIndex))
				}
			},
			getAttribution: function() {
				return this.options.attribution
			},
			getOpacity: function() {
				return this.options.opacity
			},
			setOpacity: function(t) {
				return this.options.opacity = t, this._currentImage && this._currentImage.setOpacity(t), this
			},
			getTimeRange: function() {
				return [this.options.from, this.options.to]
			},
			setTimeRange: function(t, e) {
				return this.options.from = t, this.options.to = e, this._update(), this
			},
			metadata: function(t, e) {
				return this.service.metadata(t, e), this
			},
			authenticate: function(t) {
				return this.service.authenticate(t), this
			},
			redraw: function() {
				this._update()
			},
			_renderImage: function(t, e, i) {
				if (this._map) {
					if (i && (t = "data:" + i + ";base64," + t), !t) return;
					var s = new pt(t, e, {
							opacity: 0,
							crossOrigin: this.options.useCors,
							alt: this.options.alt,
							pane: this.options.pane || this.getPane(),
							interactive: this.options.interactive
						}).addTo(this._map),
						r = function(t) {
							if (s.off("error", r, this), this._map) {
								var i = t.target,
									n = this._currentImage;
								i._bounds.equals(e) && i._bounds.equals(this._map.getBounds()) ? (this._currentImage = i, "front" === this.options.position ? this.bringToFront() : "back" === this.options.position && this.bringToBack(), this.options.zIndex && this.setZIndex(this.options.zIndex), this._map && this._currentImage._map ? this._currentImage.setOpacity(this.options.opacity) : this._currentImage._map.removeLayer(this._currentImage), n && this._map && this._map.removeLayer(n), n && n._map && n._map.removeLayer(n)) : this._map.removeLayer(i)
							}
							this.fire("load", {
								bounds: e
							})
						};
					s.once("error", function() {
						this._map.removeLayer(s), this.fire("error"), s.off("load", r, this)
					}, this), s.once("load", r, this)
				}
			},
			_update: function() {
				if (this._map) {
					var t = this._map.getZoom(),
						i = this._map.getBounds();
					if (!(this._animatingZoom || this._map._panTransition && this._map._panTransition._inProgress))
						if (t > this.options.maxZoom || t < this.options.minZoom) this._currentImage && (this._currentImage._map.removeLayer(this._currentImage), this._currentImage = null);
						else {
							var s = this._buildExportParams();
							e.Util.extend(s, this.options.requestParams), s ? (this._requestExport(s, i), this.fire("loading", {
								bounds: i
							})) : this._currentImage && (this._currentImage._map.removeLayer(this._currentImage), this._currentImage = null)
						}
				}
			},
			_renderPopup: function(t, i, s, r) {
				if (t = e.latLng(t), this._shouldRenderPopup && this._lastClick.equals(t)) {
					var n = this._popupFunction(i, s, r);
					n && this._popup.setLatLng(t).setContent(n).openOn(this._map)
				}
			},
			_resetPopupState: function(t) {
				this._shouldRenderPopup = !1, this._lastClick = t.latlng
			},
			_calculateBbox: function() {
				var t = this._map.getPixelBounds(),
					i = this._map.unproject(t.getBottomLeft()),
					s = this._map.unproject(t.getTopRight()),
					r = this._map.options.crs.project(s),
					n = this._map.options.crs.project(i),
					o = e.bounds(r, n);
				return [o.getBottomLeft().x, o.getBottomLeft().y, o.getTopRight().x, o.getTopRight().y].join(",")
			},
			_calculateImageSize: function() {
				var t = this._map.getPixelBounds(),
					e = this._map.getSize(),
					i = this._map.unproject(t.getBottomLeft()),
					s = this._map.unproject(t.getTopRight()),
					r = this._map.latLngToLayerPoint(s).y,
					n = this._map.latLngToLayerPoint(i).y;
				return (r > 0 || n < e.y) && (e.y = n - r), e.x + "," + e.y
			}
		}),
		mt = ct.extend({
			options: {
				updateInterval: 150,
				format: "jpgpng",
				transparent: !0,
				f: "image"
			},
			query: function() {
				return this.service.query()
			},
			identify: function() {
				return this.service.identify()
			},
			initialize: function(t) {
				t = k(t), this.service = rt(t), this.service.addEventParent(this), e.Util.setOptions(this, t)
			},
			setPixelType: function(t) {
				return this.options.pixelType = t, this._update(), this
			},
			getPixelType: function() {
				return this.options.pixelType
			},
			setBandIds: function(t) {
				return e.Util.isArray(t) ? this.options.bandIds = t.join(",") : this.options.bandIds = t.toString(), this._update(), this
			},
			getBandIds: function() {
				return this.options.bandIds
			},
			setNoData: function(t, i) {
				return e.Util.isArray(t) ? this.options.noData = t.join(",") : this.options.noData = t.toString(), i && (this.options.noDataInterpretation = i), this._update(), this
			},
			getNoData: function() {
				return this.options.noData
			},
			getNoDataInterpretation: function() {
				return this.options.noDataInterpretation
			},
			setRenderingRule: function(t) {
				this.options.renderingRule = t, this._update()
			},
			getRenderingRule: function() {
				return this.options.renderingRule
			},
			setMosaicRule: function(t) {
				this.options.mosaicRule = t, this._update()
			},
			getMosaicRule: function() {
				return this.options.mosaicRule
			},
			_getPopupData: function(t) {
				var i = e.Util.bind(function(i, s, r) {
						i || setTimeout(e.Util.bind(function() {
							this._renderPopup(t.latlng, i, s, r)
						}, this), 300)
					}, this),
					s = this.identify().at(t.latlng);
				this.options.mosaicRule && s.setMosaicRule(this.options.mosaicRule), s.run(i), this._shouldRenderPopup = !0, this._lastClick = t.latlng
			},
			_buildExportParams: function() {
				var t = parseInt(this._map.options.crs.code.split(":")[1], 10),
					e = {
						bbox: this._calculateBbox(),
						size: this._calculateImageSize(),
						format: this.options.format,
						transparent: this.options.transparent,
						bboxSR: t,
						imageSR: t
					};
				return this.options.from && this.options.to && (e.time = this.options.from.valueOf() + "," + this.options.to.valueOf()), this.options.pixelType && (e.pixelType = this.options.pixelType), this.options.interpolation && (e.interpolation = this.options.interpolation), this.options.compressionQuality && (e.compressionQuality = this.options.compressionQuality), this.options.bandIds && (e.bandIds = this.options.bandIds), (0 === this.options.noData || this.options.noData) && (e.noData = this.options.noData), this.options.noDataInterpretation && (e.noDataInterpretation = this.options.noDataInterpretation), this.service.options.token && (e.token = this.service.options.token), this.options.renderingRule && (e.renderingRule = JSON.stringify(this.options.renderingRule)), this.options.mosaicRule && (e.mosaicRule = JSON.stringify(this.options.mosaicRule)), e
			},
			_requestExport: function(t, i) {
				"json" === this.options.f ? this.service.request("exportImage", t, function(t, e) {
					t || (this.options.token && (e.href += "?token=" + this.options.token), this.options.proxy && (e.href = this.options.proxy + "?" + e.href), this._renderImage(e.href, i))
				}, this) : (t.f = "image", this._renderImage(this.options.url + "exportImage" + e.Util.getParamString(t), i))
			}
		});
	var dt = ct.extend({
		options: {
			updateInterval: 150,
			layers: !1,
			layerDefs: !1,
			timeOptions: !1,
			format: "png24",
			transparent: !0,
			f: "json"
		},
		initialize: function(t) {
			t = k(t), this.service = it(t), this.service.addEventParent(this), (t.proxy || t.token) && "json" !== t.f && (t.f = "json"), e.Util.setOptions(this, t)
		},
		getDynamicLayers: function() {
			return this.options.dynamicLayers
		},
		setDynamicLayers: function(t) {
			return this.options.dynamicLayers = t, this._update(), this
		},
		getLayers: function() {
			return this.options.layers
		},
		setLayers: function(t) {
			return this.options.layers = t, this._update(), this
		},
		getLayerDefs: function() {
			return this.options.layerDefs
		},
		setLayerDefs: function(t) {
			return this.options.layerDefs = t, this._update(), this
		},
		getTimeOptions: function() {
			return this.options.timeOptions
		},
		setTimeOptions: function(t) {
			return this.options.timeOptions = t, this._update(), this
		},
		query: function() {
			return this.service.query()
		},
		identify: function() {
			return this.service.identify()
		},
		find: function() {
			return this.service.find()
		},
		_getPopupData: function(t) {
			var i, s = e.Util.bind(function(i, s, r) {
				i || setTimeout(e.Util.bind(function() {
					this._renderPopup(t.latlng, i, s, r)
				}, this), 300)
			}, this);
			if ((i = this.options.popup ? this.options.popup.on(this._map).at(t.latlng) : this.identify().on(this._map).at(t.latlng)).params.maxAllowableOffset || i.simplify(this._map, .5), this.options.popup && this.options.popup.params && this.options.popup.params.layers || (this.options.layers ? i.layers("visible:" + this.options.layers.join(",")) : i.layers("visible")), this.options.layerDefs && "string" != typeof this.options.layerDefs && !i.params.layerDefs)
				for (var r in this.options.layerDefs) this.options.layerDefs.hasOwnProperty(r) && i.layerDef(r, this.options.layerDefs[r]);
			i.run(s), this._shouldRenderPopup = !0, this._lastClick = t.latlng
		},
		_buildExportParams: function() {
			var t = parseInt(this._map.options.crs.code.split(":")[1], 10),
				e = {
					bbox: this._calculateBbox(),
					size: this._calculateImageSize(),
					dpi: 96,
					format: this.options.format,
					transparent: this.options.transparent,
					bboxSR: t,
					imageSR: t
				};
			if (this.options.dynamicLayers && (e.dynamicLayers = this.options.dynamicLayers), this.options.layers) {
				if (0 === this.options.layers.length) return;
				e.layers = "show:" + this.options.layers.join(",")
			}
			return this.options.layerDefs && (e.layerDefs = "string" == typeof this.options.layerDefs ? this.options.layerDefs : JSON.stringify(this.options.layerDefs)), this.options.timeOptions && (e.timeOptions = JSON.stringify(this.options.timeOptions)), this.options.from && this.options.to && (e.time = this.options.from.valueOf() + "," + this.options.to.valueOf()), this.service.options.token && (e.token = this.service.options.token), this.options.proxy && (e.proxy = this.options.proxy), this.options.disableCache && (e._ts = Date.now()), e
		},
		_requestExport: function(t, i) {
			"json" === this.options.f ? this.service.request("export", t, function(t, e) {
				t || (this.options.token && (e.href += "?token=" + this.options.token), this.options.proxy && (e.href = this.options.proxy + "?" + e.href), e.href ? this._renderImage(e.href, i) : this._renderImage(e.imageData, i, e.contentType))
			}, this) : (t.f = "image", this._renderImage(this.options.url + "export" + e.Util.getParamString(t), i))
		}
	});
	var ft = e.Layer.extend({
		options: {
			cellSize: 512,
			updateInterval: 150
		},
		initialize: function(t) {
			t = e.setOptions(this, t), this._zooming = !1
		},
		onAdd: function(t) {
			this._map = t, this._update = e.Util.throttle(this._update, this.options.updateInterval, this), this._reset(), this._update()
		},
		onRemove: function() {
			this._map.removeEventListener(this.getEvents(), this), this._removeCells()
		},
		getEvents: function() {
			return {
				moveend: this._update,
				zoomstart: this._zoomstart,
				zoomend: this._reset
			}
		},
		addTo: function(t) {
			return t.addLayer(this), this
		},
		removeFrom: function(t) {
			return t.removeLayer(this), this
		},
		_zoomstart: function() {
			this._zooming = !0
		},
		_reset: function() {
			this._removeCells(), this._cells = {}, this._activeCells = {}, this._cellsToLoad = 0, this._cellsTotal = 0, this._cellNumBounds = this._getCellNumBounds(), this._resetWrap(), this._zooming = !1
		},
		_resetWrap: function() {
			var t = this._map,
				e = t.options.crs;
			if (!e.infinite) {
				var i = this._getCellSize();
				e.wrapLng && (this._wrapLng = [Math.floor(t.project([0, e.wrapLng[0]]).x / i), Math.ceil(t.project([0, e.wrapLng[1]]).x / i)]), e.wrapLat && (this._wrapLat = [Math.floor(t.project([e.wrapLat[0], 0]).y / i), Math.ceil(t.project([e.wrapLat[1], 0]).y / i)])
			}
		},
		_getCellSize: function() {
			return this.options.cellSize
		},
		_update: function() {
			if (this._map) {
				var t = this._map.getPixelBounds(),
					i = this._getCellSize(),
					s = e.bounds(t.min.divideBy(i).floor(), t.max.divideBy(i).floor());
				this._removeOtherCells(s), this._addCells(s), this.fire("cellsupdated")
			}
		},
		_addCells: function(t) {
			var i, s, r, n = [],
				o = t.getCenter(),
				a = this._map.getZoom();
			for (i = t.min.y; i <= t.max.y; i++)
				for (s = t.min.x; s <= t.max.x; s++)(r = e.point(s, i)).z = a, this._isValidCell(r) && n.push(r);
			var u = n.length;
			if (0 !== u)
				for (this._cellsToLoad += u, this._cellsTotal += u, n.sort(function(t, e) {
						return t.distanceTo(o) - e.distanceTo(o)
					}), s = 0; s < u; s++) this._addCell(n[s])
		},
		_isValidCell: function(t) {
			var i = this._map.options.crs;
			if (!i.infinite) {
				var s = this._cellNumBounds;
				if (!s) return !1;
				if (!i.wrapLng && (t.x < s.min.x || t.x > s.max.x) || !i.wrapLat && (t.y < s.min.y || t.y > s.max.y)) return !1
			}
			if (!this.options.bounds) return !0;
			var r = this._cellCoordsToBounds(t);
			return e.latLngBounds(this.options.bounds).intersects(r)
		},
		_cellCoordsToBounds: function(t) {
			var i = this._map,
				s = this.options.cellSize,
				r = t.multiplyBy(s),
				n = r.add([s, s]),
				o = i.wrapLatLng(i.unproject(r, t.z)),
				a = i.wrapLatLng(i.unproject(n, t.z));
			return e.latLngBounds(o, a)
		},
		_cellCoordsToKey: function(t) {
			return t.x + ":" + t.y
		},
		_keyToCellCoords: function(t) {
			var i = t.split(":"),
				s = parseInt(i[0], 10),
				r = parseInt(i[1], 10);
			return e.point(s, r)
		},
		_removeOtherCells: function(t) {
			for (var e in this._cells) t.contains(this._keyToCellCoords(e)) || this._removeCell(e)
		},
		_removeCell: function(t) {
			var e = this._activeCells[t];
			e && (delete this._activeCells[t], this.cellLeave && this.cellLeave(e.bounds, e.coords), this.fire("cellleave", {
				bounds: e.bounds,
				coords: e.coords
			}))
		},
		_removeCells: function() {
			for (var t in this._cells) {
				var e = this._cells[t].bounds,
					i = this._cells[t].coords;
				this.cellLeave && this.cellLeave(e, i), this.fire("cellleave", {
					bounds: e,
					coords: i
				})
			}
		},
		_addCell: function(t) {
			this._wrapCoords(t);
			var e = this._cellCoordsToKey(t),
				i = this._cells[e];
			i && !this._activeCells[e] && (this.cellEnter && this.cellEnter(i.bounds, t), this.fire("cellenter", {
				bounds: i.bounds,
				coords: t
			}), this._activeCells[e] = i), i || (i = {
				coords: t,
				bounds: this._cellCoordsToBounds(t)
			}, this._cells[e] = i, this._activeCells[e] = i, this.createCell && this.createCell(i.bounds, t), this.fire("cellcreate", {
				bounds: i.bounds,
				coords: t
			}))
		},
		_wrapCoords: function(t) {
			t.x = this._wrapLng ? e.Util.wrapNum(t.x, this._wrapLng) : t.x, t.y = this._wrapLat ? e.Util.wrapNum(t.y, this._wrapLat) : t.y
		},
		_getCellNumBounds: function() {
			var t = this._map.getPixelWorldBounds(),
				i = this._getCellSize();
			return t ? e.bounds(t.min.divideBy(i).floor(), t.max.divideBy(i).ceil().subtract([1, 1])) : null
		}
	});

	function yt(t) {
		this.values = [].concat(t || [])
	}
	yt.prototype.query = function(t) {
		var e = this.getIndex(t);
		return this.values[e]
	}, yt.prototype.getIndex = function(t) {
		this.dirty && this.sort();
		for (var e, i, s = 0, r = this.values.length - 1; s <= r;)
			if (e = (s + r) / 2 | 0, +(i = this.values[Math.round(e)]).value < +t) s = e + 1;
			else {
				if (!(+i.value > +t)) return e;
				r = e - 1
			}
		return Math.abs(~r)
	}, yt.prototype.between = function(t, e) {
		var i = this.getIndex(t),
			s = this.getIndex(e);
		if (0 === i && 0 === s) return [];
		for (; this.values[i - 1] && this.values[i - 1].value === t;) i--;
		for (; this.values[s + 1] && this.values[s + 1].value === e;) s++;
		return this.values[s] && this.values[s].value === e && this.values[s + 1] && s++, this.values.slice(i, s)
	}, yt.prototype.insert = function(t) {
		return this.values.splice(this.getIndex(t.value), 0, t), this
	}, yt.prototype.bulkAdd = function(t, e) {
		return this.values = this.values.concat([].concat(t || [])), e ? this.sort() : this.dirty = !0, this
	}, yt.prototype.sort = function() {
		return this.values.sort(function(t, e) {
			return +e.value - +t.value
		}).reverse(), this.dirty = !1, this
	};
	var gt = ft.extend({
			options: {
				attribution: null,
				where: "1=1",
				fields: ["*"],
				from: !1,
				to: !1,
				timeField: !1,
				timeFilterMode: "server",
				simplifyFactor: 0,
				precision: 6
			},
			initialize: function(t) {
				if (ft.prototype.initialize.call(this, t), t = k(t), t = e.Util.setOptions(this, t), this.service = ot(t), this.service.addEventParent(this), "*" !== this.options.fields[0]) {
					for (var i = !1, s = 0; s < this.options.fields.length; s++) this.options.fields[s].match(/^(OBJECTID|FID|OID|ID)$/i) && (i = !0);
					!1 === i && q("no known esriFieldTypeOID field detected in fields Array.  Please add an attribute field containing unique IDs to ensure the layer can be drawn correctly.")
				}
				this.options.timeField.start && this.options.timeField.end ? (this._startTimeIndex = new yt, this._endTimeIndex = new yt) : this.options.timeField && (this._timeIndex = new yt), this._cache = {}, this._currentSnapshot = [], this._activeRequests = 0
			},
			onAdd: function(t) {
				return E(t), this.service.metadata(function(e, i) {
					if (!e) {
						var s = i.supportedQueryFormats,
							r = !1;
						!1 === this.service.options.isModern && (r = !0), !r && s && -1 !== s.indexOf("geoJSON") && (this.service.options.isModern = !0), i.objectIdField && (this.service.options.idAttribute = i.objectIdField), !this.options.attribution && t.attributionControl && i.copyrightText && (this.options.attribution = i.copyrightText, t.attributionControl.addAttribution(this.getAttribution()))
					}
				}, this), t.on("zoomend", this._handleZoomChange, this), ft.prototype.onAdd.call(this, t)
			},
			onRemove: function(t) {
				return t.off("zoomend", this._handleZoomChange, this), ft.prototype.onRemove.call(this, t)
			},
			getAttribution: function() {
				return this.options.attribution
			},
			createCell: function(t, e) {
				this._visibleZoom() && this._requestFeatures(t, e)
			},
			_requestFeatures: function(t, i, s) {
				return this._activeRequests++, 1 === this._activeRequests && this.fire("loading", {
					bounds: t
				}, !0), this._buildQuery(t).run(function(r, n, o) {
					o && o.exceededTransferLimit && this.fire("drawlimitexceeded"), !r && n && n.features.length && e.Util.requestAnimFrame(e.Util.bind(function() {
						this._addFeatures(n.features, i), this._postProcessFeatures(t)
					}, this)), r || !n || n.features.length || this._postProcessFeatures(t), r && this._postProcessFeatures(t), s && s.call(this, r, n)
				}, this)
			},
			_postProcessFeatures: function(t) {
				this._activeRequests--, this._activeRequests <= 0 && this.fire("load", {
					bounds: t
				})
			},
			_cacheKey: function(t) {
				return t.z + ":" + t.x + ":" + t.y
			},
			_addFeatures: function(t, e) {
				var i = this._cacheKey(e);
				this._cache[i] = this._cache[i] || [];
				for (var s = t.length - 1; s >= 0; s--) {
					var r = t[s].id; - 1 === this._currentSnapshot.indexOf(r) && this._currentSnapshot.push(r), -1 === this._cache[i].indexOf(r) && this._cache[i].push(r)
				}
				this.options.timeField && this._buildTimeIndexes(t), this.createLayers(t)
			},
			_buildQuery: function(t) {
				var i = this.service.query().intersects(t).where(this.options.where).fields(this.options.fields).precision(this.options.precision);
				return this.options.requestParams && e.Util.extend(i.params, this.options.requestParams), this.options.simplifyFactor && i.simplify(this._map, this.options.simplifyFactor), "server" === this.options.timeFilterMode && this.options.from && this.options.to && i.between(this.options.from, this.options.to), i
			},
			setWhere: function(t, i, s) {
				this.options.where = t && t.length ? t : "1=1";
				for (var r = [], n = [], o = 0, a = null, u = e.Util.bind(function(t, u) {
						if (t && (a = t), u)
							for (var l = u.features.length - 1; l >= 0; l--) n.push(u.features[l].id);
						--o <= 0 && this._visibleZoom() && (this._currentSnapshot = n, e.Util.requestAnimFrame(e.Util.bind(function() {
							this.removeLayers(r), this.addLayers(n), i && i.call(s, a)
						}, this)))
					}, this), l = this._currentSnapshot.length - 1; l >= 0; l--) r.push(this._currentSnapshot[l]);
				for (var h in this._activeCells) {
					o++;
					var p = this._keyToCellCoords(h),
						c = this._cellCoordsToBounds(p);
					this._requestFeatures(c, h, u)
				}
				return this
			},
			getWhere: function() {
				return this.options.where
			},
			getTimeRange: function() {
				return [this.options.from, this.options.to]
			},
			setTimeRange: function(t, i, s, r) {
				var n = this.options.from,
					o = this.options.to,
					a = 0,
					u = null,
					l = e.Util.bind(function(e) {
						e && (u = e), this._filterExistingFeatures(n, o, t, i), a--, s && a <= 0 && s.call(r, u)
					}, this);
				if (this.options.from = t, this.options.to = i, this._filterExistingFeatures(n, o, t, i), "server" === this.options.timeFilterMode)
					for (var h in this._activeCells) {
						a++;
						var p = this._keyToCellCoords(h),
							c = this._cellCoordsToBounds(p);
						this._requestFeatures(c, h, l)
					}
				return this
			},
			refresh: function() {
				for (var t in this._activeCells) {
					var e = this._keyToCellCoords(t),
						i = this._cellCoordsToBounds(e);
					this._requestFeatures(i, t)
				}
				this.redraw && this.once("load", function() {
					this.eachFeature(function(t) {
						this._redraw(t.feature.id)
					}, this)
				}, this)
			},
			_filterExistingFeatures: function(t, i, s, r) {
				var n = t && i ? this._getFeaturesInTimeRange(t, i) : this._currentSnapshot,
					o = this._getFeaturesInTimeRange(s, r);
				if (o.indexOf)
					for (var a = 0; a < o.length; a++) {
						var u = n.indexOf(o[a]);
						u >= 0 && n.splice(u, 1)
					}
				e.Util.requestAnimFrame(e.Util.bind(function() {
					this.removeLayers(n), this.addLayers(o)
				}, this))
			},
			_getFeaturesInTimeRange: function(t, e) {
				var i, s = [];
				if (this.options.timeField.start && this.options.timeField.end) {
					var r = this._startTimeIndex.between(t, e),
						n = this._endTimeIndex.between(t, e);
					i = r.concat(n)
				} else {
					if (!this._timeIndex) return q("You must set timeField in the layer constructor in order to manipulate the start and end time filter."), [];
					i = this._timeIndex.between(t, e)
				}
				for (var o = i.length - 1; o >= 0; o--) s.push(i[o].id);
				return s
			},
			_buildTimeIndexes: function(t) {
				var e, i;
				if (this.options.timeField.start && this.options.timeField.end) {
					var s = [],
						r = [];
					for (e = t.length - 1; e >= 0; e--) i = t[e], s.push({
						id: i.id,
						value: new Date(i.properties[this.options.timeField.start])
					}), r.push({
						id: i.id,
						value: new Date(i.properties[this.options.timeField.end])
					});
					this._startTimeIndex.bulkAdd(s), this._endTimeIndex.bulkAdd(r)
				} else {
					var n = [];
					for (e = t.length - 1; e >= 0; e--) i = t[e], n.push({
						id: i.id,
						value: new Date(i.properties[this.options.timeField])
					});
					this._timeIndex.bulkAdd(n)
				}
			},
			_featureWithinTimeRange: function(t) {
				if (!this.options.from || !this.options.to) return !0;
				var e = +this.options.from.valueOf(),
					i = +this.options.to.valueOf();
				if ("string" == typeof this.options.timeField) {
					var s = +t.properties[this.options.timeField];
					return s >= e && s <= i
				}
				if (this.options.timeField.start && this.options.timeField.end) {
					var r = +t.properties[this.options.timeField.start],
						n = +t.properties[this.options.timeField.end];
					return r >= e && r <= i || n >= e && n <= i
				}
			},
			_visibleZoom: function() {
				if (!this._map) return !1;
				var t = this._map.getZoom();
				return !(t > this.options.maxZoom || t < this.options.minZoom)
			},
			_handleZoomChange: function() {
				if (this._visibleZoom())
					for (var t in this._activeCells) {
						var e = this._activeCells[t].coords,
							i = this._cacheKey(e);
						this._cache[i] && this.addLayers(this._cache[i])
					} else this.removeLayers(this._currentSnapshot), this._currentSnapshot = []
			},
			authenticate: function(t) {
				return this.service.authenticate(t), this
			},
			metadata: function(t, e) {
				return this.service.metadata(t, e), this
			},
			query: function() {
				return this.service.query()
			},
			_getMetadata: function(t) {
				this._metadata ? t(void 0, this._metadata) : this.metadata(e.Util.bind(function(e, i) {
					this._metadata = i, t(e, this._metadata)
				}, this))
			},
			addFeature: function(t, e, i) {
				this.addFeatures(t, e, i)
			},
			addFeatures: function(t, i, s) {
				this._getMetadata(e.Util.bind(function(r, n) {
					if (r) i && i.call(this, r, null);
					else {
						var o = t.features ? t.features : [t];
						this.service.addFeatures(t, e.Util.bind(function(t, e) {
							if (!t) {
								for (var r = o.length - 1; r >= 0; r--) o[r].properties[n.objectIdField] = o.length > 1 ? e[r].objectId : e.objectId, o[r].id = o.length > 1 ? e[r].objectId : e.objectId;
								this.createLayers(o)
							}
							i && i.call(s, t, e)
						}, this))
					}
				}, this))
			},
			updateFeature: function(t, e, i) {
				this.updateFeatures(t, e, i)
			},
			updateFeatures: function(t, e, i) {
				var s = t.features ? t.features : [t];
				this.service.updateFeatures(t, function(t, r) {
					if (!t) {
						for (var n = s.length - 1; n >= 0; n--) this.removeLayers([s[n].id], !0);
						this.createLayers(s)
					}
					e && e.call(i, t, r)
				}, this)
			},
			deleteFeature: function(t, e, i) {
				this.deleteFeatures(t, e, i)
			},
			deleteFeatures: function(t, e, i) {
				return this.service.deleteFeatures(t, function(t, s) {
					var r = s.length ? s : [s];
					if (!t && r.length > 0)
						for (var n = r.length - 1; n >= 0; n--) this.removeLayers([r[n].objectId], !0);
					e && e.call(i, t, s)
				}, this)
			}
		}),
		vt = gt.extend({
			options: {
				cacheLayers: !0
			},
			initialize: function(t) {
				gt.prototype.initialize.call(this, t), this._originalStyle = this.options.style, this._layers = {}
			},
			onRemove: function(t) {
				for (var e in this._layers) t.removeLayer(this._layers[e]), this.fire("removefeature", {
					feature: this._layers[e].feature,
					permanent: !1
				}, !0);
				return gt.prototype.onRemove.call(this, t)
			},
			createNewLayer: function(t) {
				var i = e.GeoJSON.geometryToLayer(t, this.options);
				return i && (i.defaultOptions = i.options), i
			},
			_updateLayer: function(t, i) {
				var s = [],
					r = this.options.coordsToLatLng || e.GeoJSON.coordsToLatLng;
				switch (i.properties && (t.feature.properties = i.properties), i.geometry.type) {
					case "Point":
						s = e.GeoJSON.coordsToLatLng(i.geometry.coordinates), t.setLatLng(s);
						break;
					case "LineString":
						s = e.GeoJSON.coordsToLatLngs(i.geometry.coordinates, 0, r), t.setLatLngs(s);
						break;
					case "MultiLineString":
					case "Polygon":
						s = e.GeoJSON.coordsToLatLngs(i.geometry.coordinates, 1, r), t.setLatLngs(s);
						break;
					case "MultiPolygon":
						s = e.GeoJSON.coordsToLatLngs(i.geometry.coordinates, 2, r), t.setLatLngs(s)
				}
			},
			createLayers: function(t) {
				for (var e = t.length - 1; e >= 0; e--) {
					var i, s = t[e],
						r = this._layers[s.id];
					!this._visibleZoom() || !r || this._map.hasLayer(r) || this.options.timeField && !this._featureWithinTimeRange(s) || (this._map.addLayer(r), this.fire("addfeature", {
						feature: r.feature
					}, !0)), r && this.options.simplifyFactor > 0 && (r.setLatLngs || r.setLatLng) && this._updateLayer(r, s), r || ((i = this.createNewLayer(s)) ? (i.feature = s, i.addEventParent(this), this.options.onEachFeature && this.options.onEachFeature(i.feature, i), this._layers[i.feature.id] = i, this.setFeatureStyle(i.feature.id, this.options.style), this.fire("createfeature", {
						feature: i.feature
					}, !0), this._visibleZoom() && (!this.options.timeField || this.options.timeField && this._featureWithinTimeRange(s)) && this._map.addLayer(i)) : q("invalid GeoJSON encountered"))
				}
			},
			addLayers: function(t) {
				for (var e = t.length - 1; e >= 0; e--) {
					var i = this._layers[t[e]];
					!i || this.options.timeField && !this._featureWithinTimeRange(i.feature) || this._map.addLayer(i)
				}
			},
			removeLayers: function(t, e) {
				for (var i = t.length - 1; i >= 0; i--) {
					var s = t[i],
						r = this._layers[s];
					r && (this.fire("removefeature", {
						feature: r.feature,
						permanent: e
					}, !0), this._map.removeLayer(r)), r && e && delete this._layers[s]
				}
			},
			cellEnter: function(t, i) {
				this._visibleZoom() && !this._zooming && this._map && e.Util.requestAnimFrame(e.Util.bind(function() {
					var t = this._cacheKey(i),
						e = this._cellCoordsToKey(i),
						s = this._cache[t];
					this._activeCells[e] && s && this.addLayers(s)
				}, this))
			},
			cellLeave: function(t, i) {
				this._zooming || e.Util.requestAnimFrame(e.Util.bind(function() {
					if (this._map) {
						var t = this._cacheKey(i),
							e = this._cellCoordsToKey(i),
							s = this._cache[t],
							r = this._map.getBounds();
						if (!this._activeCells[e] && s) {
							for (var n = !0, o = 0; o < s.length; o++) {
								var a = this._layers[s[o]];
								a && a.getBounds && r.intersects(a.getBounds()) && (n = !1)
							}
							n && this.removeLayers(s, !this.options.cacheLayers), !this.options.cacheLayers && n && (delete this._cache[t], delete this._cells[e], delete this._activeCells[e])
						}
					}
				}, this))
			},
			resetStyle: function() {
				return this.options.style = this._originalStyle, this.eachFeature(function(t) {
					this.resetFeatureStyle(t.feature.id)
				}, this), this
			},
			setStyle: function(t) {
				return this.options.style = t, this.eachFeature(function(e) {
					this.setFeatureStyle(e.feature.id, t)
				}, this), this
			},
			resetFeatureStyle: function(t) {
				var i = this._layers[t],
					s = this._originalStyle || e.Path.prototype.options;
				return i && (e.Util.extend(i.options, i.defaultOptions), this.setFeatureStyle(t, s)), this
			},
			setFeatureStyle: function(t, e) {
				var i = this._layers[t];
				return "function" == typeof e && (e = e(i.feature)), i.setStyle && i.setStyle(e), this
			},
			eachActiveFeature: function(t, e) {
				if (this._map) {
					var i = this._map.getBounds();
					for (var s in this._layers) - 1 !== this._currentSnapshot.indexOf(this._layers[s].feature.id) && ("function" == typeof this._layers[s].getLatLng && i.contains(this._layers[s].getLatLng()) ? t.call(e, this._layers[s]) : "function" == typeof this._layers[s].getBounds && i.intersects(this._layers[s].getBounds()) && t.call(e, this._layers[s]))
				}
				return this
			},
			eachFeature: function(t, e) {
				for (var i in this._layers) t.call(e, this._layers[i]);
				return this
			},
			getFeature: function(t) {
				return this._layers[t]
			},
			bringToBack: function() {
				this.eachFeature(function(t) {
					t.bringToBack && t.bringToBack()
				})
			},
			bringToFront: function() {
				this.eachFeature(function(t) {
					t.bringToFront && t.bringToFront()
				})
			},
			redraw: function(t) {
				return t && this._redraw(t), this
			},
			_redraw: function(t) {
				var i = this._layers[t],
					s = i.feature;
				if (i && i.setIcon && this.options.pointToLayer && this.options.pointToLayer) {
					var r = this.options.pointToLayer(s, e.latLng(s.geometry.coordinates[1], s.geometry.coordinates[0])).options.icon;
					i.setIcon(r)
				}
				if (i && i.setStyle && this.options.pointToLayer) {
					var n = this.options.pointToLayer(s, e.latLng(s.geometry.coordinates[1], s.geometry.coordinates[0])).options;
					this.setFeatureStyle(s.id, n)
				}
				i && i.setStyle && this.options.style && this.resetStyle(s.id)
			}
		});
	t.VERSION = "2.3.0", t.Support = r, t.options = n, t.Util = Z, t.get = m, t.post = l, t.request = p, t.Task = j, t.task = function(t) {
		return t = k(t), new j(t)
	}, t.Query = W, t.query = J, t.Find = Q, t.find = V, t.Identify = H, t.identify = function(t) {
		return new H(t)
	}, t.IdentifyFeatures = K, t.identifyFeatures = X, t.IdentifyImage = Y, t.identifyImage = $, t.Service = tt, t.service = function(t) {
		return t = k(t), new tt(t)
	}, t.MapService = et, t.mapService = it, t.ImageService = st, t.imageService = rt, t.FeatureLayerService = nt, t.featureLayerService = ot, t.BasemapLayer = ut, t.basemapLayer = function(t, e) {
		return new ut(t, e)
	}, t.TiledMapLayer = ht, t.tiledMapLayer = function(t, e) {
		return new ht(t, e)
	}, t.RasterLayer = ct, t.ImageMapLayer = mt, t.imageMapLayer = function(t, e) {
		return new mt(t, e)
	}, t.DynamicMapLayer = dt, t.dynamicMapLayer = function(t, e) {
		return new dt(t, e)
	}, t.FeatureManager = gt, t.FeatureLayer = vt, t.featureLayer = function(t) {
		return new vt(t)
	}, Object.defineProperty(t, "__esModule", {
		value: !0
	})
});
//# sourceMappingURL=esri-leaflet.js.map