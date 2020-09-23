/*
 Start ActivityMap Module

 The following module enables ActivityMap tracking in Adobe Analytics. ActivityMap
 allows you to view data overlays on your links and content to understand how
 users engage with your web site. If you do not intend to use ActivityMap, you
 can remove the following block of code from your AppMeasurement.js file.
 Additional documentation on how to configure ActivityMap is available at:
 https://marketing.adobe.com/resources/help/en_US/analytics/activitymap/getting-started-admins.html
*/
function AppMeasurement_Module_ActivityMap(h) {
  function p() {
    var a = f.pageYOffset + (f.innerHeight || 0);
    a && a > +g && (g = a);
  }
  function q() {
    if (e.scrollReachSelector) {
      var a = h.d.querySelector && h.d.querySelector(e.scrollReachSelector);
      a
        ? ((g = a.scrollTop || 0),
          a.addEventListener("scroll", function() {
            var d;
            (d = (a && a.scrollTop + a.clientHeight) || 0) > g && (g = d);
          }))
        : 0 < v-- && setTimeout(q, 1e3);
    }
  }
  function l(a, d) {
    var b, c, n;
    if (a && d && (b = e.c[d] || (e.c[d] = d.split(","))))
      for (n = 0; n < b.length && (c = b[n++]); )
        if (-1 < a.indexOf(c)) return null;
    return a;
  }
  function r(a, d, b, c, e) {
    var f, k;
    if (a.dataset && (k = a.dataset[d])) f = k;
    else if (a.getAttribute)
      if ((k = a.getAttribute("data-" + b))) f = k;
      else if ((k = a.getAttribute(b))) f = k;
    if (!f && h.useForcedLinkTracking && e) {
      var g;
      a = a.onclick ? "" + a.onclick : "";
      varValue = "";
      if (c && a && ((d = a.indexOf(c)), 0 <= d)) {
        for (d += c.length; d < a.length; )
          if (((b = a.charAt(d++)), 0 <= "'\"".indexOf(b))) {
            g = b;
            break;
          }
        for (k = !1; d < a.length && g; ) {
          b = a.charAt(d);
          if (!k && b === g) break;
          "\\" === b ? (k = !0) : ((varValue += b), (k = !1));
          d++;
        }
      }
      (g = varValue) && (h.w[c] = g);
    }
    return f || (e && h.w[c]);
  }
  function s(a, d, b) {
    var c;
    return (c = e[d](a, b)) && l(m(c), e[d + "Exclusions"]);
  }
  function t(a, d, b) {
    var c;
    if (
      a &&
      !(
        1 === (c = a.nodeType) &&
        (c = a.nodeName) &&
        (c = c.toUpperCase()) &&
        w[c]
      ) &&
      (1 === a.nodeType && (c = a.nodeValue) && (d[d.length] = c),
      b.a ||
        b.t ||
        b.s ||
        !a.getAttribute ||
        ((c = a.getAttribute("alt"))
          ? (b.a = c)
          : (c = a.getAttribute("title"))
          ? (b.t = c)
          : "IMG" == ("" + a.nodeName).toUpperCase() &&
            (c = a.getAttribute("src") || a.src) &&
            (b.s = c)),
      (c = a.childNodes) && c.length)
    )
      for (a = 0; a < c.length; a++) t(c[a], d, b);
  }
  function m(a) {
    if (null == a || void 0 == a) return a;
    try {
      return a
        .replace(
          RegExp(
            "^[\\s\\n\\f\\r\\t\t-\r \u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u205f\u3000\ufeff]+",
            "mg"
          ),
          ""
        )
        .replace(
          RegExp(
            "[\\s\\n\\f\\r\\t\t-\r \u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u205f\u3000\ufeff]+$",
            "mg"
          ),
          ""
        )
        .replace(
          RegExp(
            "[\\s\\n\\f\\r\\t\t-\r \u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u205f\u3000\ufeff]{1,}",
            "mg"
          ),
          " "
        )
        .substring(0, 254);
    } catch (d) {}
  }
  var e = this;
  e.s = h;
  var f = window;
  f.s_c_in || ((f.s_c_il = []), (f.s_c_in = 0));
  e._il = f.s_c_il;
  e._in = f.s_c_in;
  e._il[e._in] = e;
  f.s_c_in++;
  e._c = "s_m";
  var g = 0,
    u,
    v = 60;
  e.c = {};
  var w = { SCRIPT: 1, STYLE: 1, LINK: 1, CANVAS: 1 };
  e._g = function() {
    var a,
      d,
      b,
      c = h.contextData,
      e = h.linkObject;
    (a = h.pageName || h.pageURL) &&
      (d = s(e, "link", h.linkName)) &&
      (b = s(e, "region")) &&
      ((c["a.activitymap.page"] = a.substring(0, 255)),
      (c["a.activitymap.link"] = 128 < d.length ? d.substring(0, 128) : d),
      (c["a.activitymap.region"] = 127 < b.length ? b.substring(0, 127) : b),
      0 < g && (c["a.activitymap.xy"] = 10 * Math.floor(g / 10)),
      (c["a.activitymap.pageIDType"] = h.pageName ? 1 : 0));
  };
  e._d = function() {
    e.trackScrollReach &&
      !u &&
      (e.scrollReachSelector
        ? q()
        : (p(), f.addEventListener && f.addEventListener("scroll", p, !1)),
      (u = !0));
  };
  e.link = function(a, d) {
    var b;
    if (d) b = l(m(d), e.linkExclusions);
    else if (
      (b = a) &&
      !(b = r(a, "sObjectId", "s-object-id", "s_objectID", 1))
    ) {
      var c, f;
      (f = l(m(a.innerText || a.textContent), e.linkExclusions)) ||
        (t(a, (c = []), (b = { a: void 0, t: void 0, s: void 0 })),
        (f = l(m(c.join("")))) ||
          (f = l(m(b.a ? b.a : b.t ? b.t : b.s ? b.s : void 0))) ||
          !(c = (c = a.tagName) && c.toUpperCase ? c.toUpperCase() : "") ||
          ("INPUT" == c || ("SUBMIT" == c && a.value)
            ? (f = l(m(a.value)))
            : "IMAGE" == c && a.src && (f = l(m(a.src)))));
      b = f;
    }
    return b;
  };
  e.region = function(a) {
    for (var d, b = e.regionIDAttribute || "id"; a && (a = a.parentNode); ) {
      if ((d = r(a, b, b, b))) return d;
      if ("BODY" == a.nodeName) return "BODY";
    }
  };
}
/* End ActivityMap Module */
