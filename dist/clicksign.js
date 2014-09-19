// Generated by CoffeeScript 1.8.0
(function() {
  var HEIGHT, HOST, PROTOCOL, WIDTH, addEventListener, attach_element, configure, createElement, create_iframe, getElementById, host_for, origin, path_for, protocol_for, query_for, window;

  PROTOCOL = "https";

  HOST = "widget.clicksign.com";

  WIDTH = {
    MIN: 600,
    DEFAULT: 800
  };

  HEIGHT = {
    MIN: 500,
    DEFAULT: 600
  };

  window = this;

  getElementById = function(name) {
    return document.getElementById(name);
  };

  createElement = function(element) {
    return document.createElement(element);
  };

  addEventListener = function(callback) {
    if (window.addEventListener) {
      return window.addEventListener('message', callback);
    } else {
      return window.attachEvent('onmessage', callback);
    }
  };

  origin = location.origin || ("" + location.protocol + "//" + location.host);

  protocol_for = function(protocol) {
    return (protocol || PROTOCOL) + "://";
  };

  host_for = function(host) {
    return host || HOST;
  };

  path_for = function(key) {
    return "/documents/" + key;
  };

  query_for = function(signer) {
    var k, options, v;
    if (signer == null) {
      signer = {};
    }
    options = {
      origin: origin
    };
    for (k in signer) {
      v = signer[k];
      options[k] = v;
    }
    return ((function() {
      var _results;
      _results = [];
      for (k in options) {
        v = options[k];
        _results.push("" + k + "=" + (encodeURIComponent(v)));
      }
      return _results;
    })()).join("&");
  };

  create_iframe = function(source, width, height) {
    var iframe, min, normalize, normalize_height, normalize_width;
    min = function(m) {
      return function(v) {
        if (v < m) {
          return m;
        } else {
          return v;
        }
      };
    };
    normalize = function(m, d) {
      return function(v) {
        return min(m)(v || d);
      };
    };
    normalize_width = normalize(WIDTH.MIN, WIDTH.DEFAULT);
    normalize_height = normalize(HEIGHT.MIN, HEIGHT.DEFAULT);
    iframe = createElement("iframe");
    iframe.setAttribute('src', source);
    iframe.setAttribute('width', normalize_width(width));
    iframe.setAttribute('height', normalize_height(height));
    iframe.setAttribute('style', 'border: 1px solid #777; border-radius: 3px;');
    return iframe;
  };

  attach_element = function(container, element) {
    var target;
    target = getElementById(container);
    return target.appendChild(element);
  };

  configure = function(options) {
    var host, iframe, path, protocol, query, source;
    protocol = protocol_for(options.protocol);
    host = host_for(options.host);
    path = path_for(options.key);
    query = query_for(options.signer);
    source = protocol + host + path + query;
    iframe = create_iframe(source, options.width, options.height);
    attach_element(options.container, iframe);
    return addEventListener(options.callback || function() {});
  };

  this.clicksign || (this.clicksign = {
    configure: configure,
    vesion: 1
  });

}).call(this);
