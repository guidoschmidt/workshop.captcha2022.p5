function F(d) {
  var s = d.default;
  if (typeof s == "function") {
    var e = function() {
      return s.apply(this, arguments);
    };
    e.prototype = s.prototype;
  } else
    e = {};
  return Object.defineProperty(e, "__esModule", { value: !0 }), Object.keys(d).forEach(function(n) {
    var p = Object.getOwnPropertyDescriptor(d, n);
    Object.defineProperty(e, n, p.get ? p : {
      enumerable: !0,
      get: function() {
        return d[n];
      }
    });
  }), e;
}
var v = { exports: {} };
/*!
 * Cross-Browser Split 1.1.1
 * Copyright 2007-2012 Steven Levithan <stevenlevithan.com>
 * Available under the MIT License
 * ECMAScript compliant, uniform cross-browser split method
 */
var U = function(s) {
  var e = String.prototype.split, n = /()??/.exec("")[1] === s, p;
  return p = function(t, i, l) {
    if (Object.prototype.toString.call(i) !== "[object RegExp]")
      return e.call(t, i, l);
    var r = [], c = (i.ignoreCase ? "i" : "") + (i.multiline ? "m" : "") + (i.extended ? "x" : "") + (i.sticky ? "y" : ""), x = 0, i = new RegExp(i.source, c + "g"), h, g, y, _;
    for (t += "", n || (h = new RegExp("^" + i.source + "$(?!\\s)", c)), l = l === s ? -1 >>> 0 : l >>> 0; (g = i.exec(t)) && (y = g.index + g[0].length, !(y > x && (r.push(t.slice(x, g.index)), !n && g.length > 1 && g[0].replace(h, function() {
      for (var w = 1; w < arguments.length - 2; w++)
        arguments[w] === s && (g[w] = s);
    }), g.length > 1 && g.index < t.length && Array.prototype.push.apply(r, g.slice(1)), _ = g[0].length, x = y, r.length >= l))); )
      i.lastIndex === g.index && i.lastIndex++;
    return x === t.length ? (_ || !i.test("")) && r.push("") : r.push(t.slice(x)), r.length > l ? r.slice(0, l) : r;
  }, p;
}(), q = [].indexOf, B = function(d, s) {
  if (q)
    return d.indexOf(s);
  for (var e = 0; e < d.length; ++e)
    if (d[e] === s)
      return e;
  return -1;
}, A = B, G = J;
function J(d) {
  var s = d.classList;
  if (s)
    return s;
  var e = {
    add: n,
    remove: p,
    contains: t,
    toggle: u,
    toString: l,
    length: 0,
    item: r
  };
  return e;
  function n(i) {
    var h = c();
    A(h, i) > -1 || (h.push(i), x(h));
  }
  function p(i) {
    var h = c(), g = A(h, i);
    g !== -1 && (h.splice(g, 1), x(h));
  }
  function t(i) {
    return A(c(), i) > -1;
  }
  function u(i) {
    return t(i) ? (p(i), !1) : (n(i), !0);
  }
  function l() {
    return d.className;
  }
  function r(i) {
    var h = c();
    return h[i] || null;
  }
  function c() {
    var i = d.className;
    return z(i.split(" "), H);
  }
  function x(i) {
    var h = i.length;
    d.className = i.join(" "), e.length = h;
    for (var g = 0; g < i.length; g++)
      e[g] = i[g];
    delete i[h];
  }
}
function z(d, s) {
  for (var e = [], n = 0; n < d.length; n++)
    s(d[n]) && e.push(d[n]);
  return e;
}
function H(d) {
  return !!d;
}
const K = {}, X = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: K
}, Symbol.toStringTag, { value: "Module" })), Y = /* @__PURE__ */ F(X);
var Z = U, Q = G, D = typeof window > "u" ? Y : window, N = D.document, k = D.Text;
function M() {
  var d = [];
  function s() {
    var e = [].slice.call(arguments), n = null;
    function p(t) {
      var u;
      function l(i) {
        var h = Z(i, /([\.#]?[^\s#.]+)/);
        /^\.|#/.test(h[1]) && (n = N.createElement("div")), W(h, function(g) {
          var y = g.substring(1, g.length);
          !g || (n ? g[0] === "." ? Q(n).add(y) : g[0] === "#" && n.setAttribute("id", y) : n = N.createElement(g));
        });
      }
      if (t != null) {
        if (typeof t == "string")
          n ? n.appendChild(u = N.createTextNode(t)) : l(t);
        else if (typeof t == "number" || typeof t == "boolean" || t instanceof Date || t instanceof RegExp)
          n.appendChild(u = N.createTextNode(t.toString()));
        else if (et(t))
          W(t, p);
        else if (R(t))
          n.appendChild(u = t);
        else if (t instanceof k)
          n.appendChild(u = t);
        else if (typeof t == "object")
          for (var r in t)
            if (typeof t[r] == "function")
              /^on\w+/.test(r) ? function(i, h) {
                n.addEventListener ? (n.addEventListener(i.substring(2), h[i], !1), d.push(function() {
                  n.removeEventListener(i.substring(2), h[i], !1);
                })) : (n.attachEvent(i, h[i]), d.push(function() {
                  n.detachEvent(i, h[i]);
                }));
              }(r, t) : (n[r] = t[r](), d.push(t[r](function(i) {
                n[r] = i;
              })));
            else if (r === "style")
              if (typeof t[r] == "string")
                n.style.cssText = t[r];
              else
                for (var c in t[r])
                  (function(i, h) {
                    if (typeof h == "function")
                      n.style.setProperty(i, h()), d.push(h(function(y) {
                        n.style.setProperty(i, y);
                      }));
                    else
                      var g = t[r][i].match(/(.*)\W+!important\W*$/);
                    g ? n.style.setProperty(i, g[1], "important") : n.style.setProperty(i, t[r][i]);
                  })(c, t[r][c]);
            else if (r === "attrs")
              for (var x in t[r])
                n.setAttribute(x, t[r][x]);
            else
              r.substr(0, 5) === "data-" ? n.setAttribute(r, t[r]) : n[r] = t[r];
        else if (typeof t == "function") {
          var x = t();
          n.appendChild(u = R(x) ? x : N.createTextNode(x)), d.push(t(function(h) {
            R(h) && u.parentElement ? (u.parentElement.replaceChild(h, u), u = h) : u.textContent = h;
          }));
        }
      }
      return u;
    }
    for (; e.length; )
      p(e.shift());
    return n;
  }
  return s.cleanup = function() {
    for (var e = 0; e < d.length; e++)
      d[e]();
    d.length = 0;
  }, s;
}
var tt = v.exports = M();
tt.context = M;
function R(d) {
  return d && d.nodeName && d.nodeType;
}
function W(d, s) {
  if (d.forEach)
    return d.forEach(s);
  for (var e = 0; e < d.length; e++)
    s(d[e], e);
}
function et(d) {
  return Object.prototype.toString.call(d) == "[object Array]";
}
var V = { exports: {} };
(function(d) {
  (function() {
    function s(o, a) {
      o(a()), a(o);
    }
    function e(o, a) {
      a(o()), o(a), a(o);
    }
    function n(o) {
      return o === void 0;
    }
    function p(o) {
      return typeof o != "function";
    }
    function t(o) {
      return typeof o == "function";
    }
    function u(o) {
      if (!t(o))
        throw new Error("transform expects an observable");
      return o;
    }
    function l(o, a) {
      for (var f in o)
        o[f](a);
    }
    function r(o, a) {
      delete o[o.indexOf(a)];
    }
    function c(o, a, f) {
      (o.on || o.addEventListener).call(o, a, f, !1);
    }
    function x(o, a, f) {
      (o.removeListener || o.removeEventListener || o.off).call(o, a, f, !1);
    }
    function i(o) {
      var a = o, f = [];
      return b.set = function(m) {
        l(f, a = m);
      }, b;
      function b(m) {
        return n(m) ? a : p(m) ? l(f, a = m) : (f.push(m), m(a), function() {
          r(f, m);
        });
      }
    }
    function h(o, a) {
      return function(f) {
        return n(f) ? o.get(a) : p(f) ? o.set(a, f) : (c(o, "change:" + a, f), f(o.get(a)), function() {
          x(o, "change:" + a, f);
        });
      };
    }
    function g(o, a, f) {
      return u(o), function(b) {
        return n(b) ? a(o()) : p(b) ? o((f || a)(b)) : o(function(m) {
          b(a(m));
        });
      };
    }
    function y(o) {
      return g(o, function(a) {
        return !a;
      });
    }
    function _(o, a, f, b) {
      function m() {
        b(t(f) ? f() : o[f]);
      }
      return c(o, a, m), m(), function() {
        x(o, a, m);
      };
    }
    function w(o, a, f) {
      return a = a || "value", f = f || "input", function(b) {
        return n(b) ? o[a] : p(b) ? o[a] = b : _(o, f, a, b);
      };
    }
    function $(o) {
      function a() {
        return o[o.selectedIndex].value;
      }
      function f(b) {
        for (var m = 0; m < o.options.length; m++)
          o.options[m].value == b && (o.selectedIndex = m);
      }
      return function(b) {
        return n(b) ? o.options[o.selectedIndex].value : p(b) ? f(b) : _(o, "change", a, b);
      };
    }
    function O(o, a, f) {
      var b = !1;
      return function(m) {
        function S() {
          b || m(b = !0);
        }
        function T() {
          b && m(b = !1);
        }
        return n(m) ? b : p(m) ? void 0 : (c(o, a, S), c(o, f || a, T), m(b), function() {
          x(o, a, S), x(o, f || a, T);
        });
      };
    }
    function L(o, a) {
      var f = o.map(function(S) {
        return S();
      }), b = !0, m = i();
      return o.forEach(function(S, T) {
        S(function(j) {
          f[T] = j, !b && m(a.apply(null, f));
        });
      }), m(a.apply(null, f)), b = !1, m(function() {
        a.apply(null, f);
      }), m;
    }
    function I(o, a, f) {
      return g(o, function(b) {
        return b ? a : f;
      }, function(b) {
        return b == a;
      });
    }
    function P() {
      var o, a = [];
      return function(f) {
        return n(f) ? o : p(f) ? o !== f ? l(a, o = f) : "" : (a.push(f), f(o), function() {
          r(a, f);
        });
      };
    }
    var C = i;
    C.bind1 = s, C.bind2 = e, C.value = i, C.not = y, C.property = h, C.input = C.attribute = w, C.select = $, C.compute = L, C.transform = g, C.boolean = I, C.toggle = O, C.hover = function(o) {
      return O(o, "mouseover", "mouseout");
    }, C.focus = function(o) {
      return O(o, "focus", "blur");
    }, C.signal = P, d.exports = C;
  })();
})(V);
const E = V.exports;
class nt {
  constructor() {
    this._rootContainer = v.exports("div#p5gui"), document.body.appendChild(this._rootContainer);
  }
  save() {
    const s = JSON.stringify(this._rootCtx);
    localStorage.setItem(`p5.gui/${this._name}`, s);
  }
  restore() {
    const s = (n, p) => {
      Object.keys(p).forEach((t) => {
        const u = n[t], l = p[t];
        typeof u == "object" ? s(u, l) : n[t] = l;
      });
    }, e = JSON.parse(
      localStorage.getItem(`p5.gui/${this._name}`)
    );
    e !== null && s(this._rootCtx, e);
  }
  hide() {
    this._rootContainer.classList.toggle("hidden");
  }
  clear() {
    this._rootContainer.innerHTML = "";
  }
  uuid() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(
      /[018]/g,
      (s) => (s ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> s / 4).toString(16)
    );
  }
  refresh() {
    this.clear(), this.build(this._name, this._rootCtx);
  }
  build(s, e, n) {
    n === void 0 && (this._name = s, this._rootCtx = e, this._rootCtxO = E(this._rootCtx), this._rootCtxO((r) => {
      this._rootCtx["@change"] && this._rootCtx["@change"]();
    }), this.addImportExportUi());
    const p = Object.getOwnPropertyNames(e), t = E();
    t(!0);
    const u = v.exports(
      "div.ui-group",
      {
        className: `group ${t() ? "visible" : ""}`
      },
      v.exports(
        "label.group-name",
        {
          onclick: (r) => {
            r.target.parentNode.classList.toggle("visible");
          }
        },
        `${s}`
      )
    );
    (n || this._rootContainer).appendChild(u);
    const l = v.exports("div.entries");
    u.appendChild(l), p.filter((r) => r[0] !== "@").forEach((r) => {
      const c = e[r], x = e[`@${r}.component`], i = e[`@${r}.min`], h = e[`@${r}.max`], g = e[`@${r}.step`];
      switch (Array.isArray(c) ? "array" : x || typeof c) {
        case "array":
          const _ = {};
          c.forEach((w, $) => _[`Element ${$}`] = w), this.build(r, _, l);
          break;
        case "object":
          this.build(r, c, l);
          break;
        case "function":
          this.addButton(l, r, c, e);
          break;
        case "string":
          this.addText(l, r, c, e);
          break;
        case "number":
          this.addNumber(l, r, c, e);
          break;
        case "slider":
          this.addSlider(l, r, c, e, i, h, g);
          break;
        case "color":
          this.addColor(l, r, c, e);
          break;
        case "potentiometer":
          this.addPotentiometer(l, r, c, e);
          break;
        case "boolean":
          this.addToggle(l, r, c, e);
          break;
      }
    });
  }
  container(s, e) {
    return v.exports(`div${[".ui-container", s].join("")}`, e);
  }
  addSlider(s, e, n, p, t, u, l) {
    const r = E();
    r(n), r((i) => {
      p[e] = r(), this._rootCtxO(p);
    });
    const c = (i) => {
      const h = i.target;
      r(h.value);
    }, x = this.container(".slider", [
      v.exports("label", this.camelCaseWithSpaces(e)),
      v.exports("input", {
        type: "range",
        value: r(),
        oninput: c,
        min: t,
        max: u,
        step: l
      }),
      v.exports("span.text-value", r)
    ]);
    s.appendChild(x);
  }
  addButton(s, e, n, p) {
    const t = this.container(
      ".button",
      v.exports(
        "button",
        { onclick: n.bind(p) },
        this.camelCaseWithSpaces(e)
      )
    );
    s.appendChild(t);
  }
  addToggle(s, e, n, p) {
    const t = E();
    t(n);
    const u = (r) => {
      r.target.classList.toggle("on"), t(!t()), p[e] = t();
    }, l = this.container(".toggle", [
      v.exports("label", { htmlFor: e }, this.camelCaseWithSpaces(e)),
      v.exports(
        "div.toggle",
        { onclick: u },
        v.exports(`div.state.${t() ? "on" : "off"}`)
      ),
      v.exports(`input#${e}`, { type: "checkbox", checked: n, onclick: u })
    ]);
    s.appendChild(l);
  }
  addText(s, e, n, p) {
    const t = E();
    t(n), t((l) => {
      p[e] = l, this._rootCtxO(p);
    });
    const u = this.container(s, ".text", [
      v.exports("label", this.camelCaseWithSpaces(e)),
      v.exports("input", { type: "text", value: n })
    ]);
    s.appendChild(u);
  }
  addNumber(s, e, n, p) {
    const t = E();
    t(n), t((c) => {
      p[e] = c, this._rootCtxO(p);
    });
    const u = (c, x) => {
      t(t() + x);
      const h = c.target.parentNode;
      h.querySelector("input").value = t();
    }, l = (c) => {
      const x = c.target;
      t(parseFloat(x.value)), p[e] = t();
    }, r = this.container(".number", [
      v.exports("label", this.camelCaseWithSpaces(e)),
      v.exports("div.number", [
        v.exports("button.button", { onclick: (c) => u(c, -1) }, "-"),
        v.exports("input.input", { type: "number", value: t(), onblur: l }),
        v.exports("button.button", { onclick: (c) => u(c, 1) }, "+")
      ])
    ]);
    s.appendChild(r);
  }
  addColor(s, e, n, p) {
    const t = this.uuid(), u = E();
    u(n), u((c) => {
      p[e] = u(), this._rootCtxO(p);
    });
    const l = (c) => {
      const x = c.target;
      u(x.value);
      const i = x.parentNode.querySelector(
        ".color-preview"
      );
      i.style.backgroundColor = u();
    }, r = this.container(".color", [
      v.exports("label", this.camelCaseWithSpaces(e)),
      v.exports(`input#${e}-${t}.input`, {
        type: "color",
        value: u(),
        oninput: l
      }),
      v.exports(
        "label.color-preview-wrapper",
        { htmlFor: `${e}-${t}` },
        v.exports("div.color-preview", { style: { "background-color": n } })
      ),
      v.exports("span.text-value", u)
    ]);
    s.appendChild(r);
  }
  addPotentiometer(s, e, n, p) {
    const t = E(), u = E();
    t(n), t((g) => {
      p[e] = t(), this._rootCtxO({ [e]: t() });
    }), u(!1);
    let l;
    const r = (g) => {
      if (!u())
        return;
      g.preventDefault();
      const _ = g.target.parentNode, { width: w, height: $, x: O, y: L } = _.getBoundingClientRect(), I = w * 0.5 - (g.clientX - O), P = $ * 0.5 - (g.clientY - L), C = [-I, P];
      if (Math.sqrt(C[0] * C[0] + C[1] * C[1]) < 5)
        return;
      const a = Math.round(
        (Math.atan2(C[0], C[1]) + Math.PI) * (180 / Math.PI) / 3.6
      );
      t(a), l ? l.style.transform = `rotate(${t() * 3.6}deg)` : l = _.querySelector(".knob");
    }, c = () => u(!0), x = () => u(!1), i = () => u(!1), h = this.container(".potentiometer", [
      v.exports("label", this.camelCaseWithSpaces(e)),
      v.exports(
        "div.knob-wrapper",
        { onpointermove: r, onpointerdown: c, onpointerup: x, onpointerleave: i },
        v.exports("div.knob", { style: { transform: `rotate(${t() * 3.6}deg)` } }, [
          v.exports("div.angle-indicator")
        ])
      ),
      v.exports("span.text-value", t)
    ]);
    s.appendChild(h);
  }
  addImportExportUi() {
    const s = v.exports(
      "button.export",
      { onclick: this.downloadConfiguration.bind(this) },
      "Export"
    ), e = (u, l) => {
      Object.keys(l).forEach((r) => {
        const c = u[r], x = l[r];
        typeof c == "object" ? e(c, x) : u[r] = x;
      });
    }, n = (u) => {
      const { files: l } = u.target, r = l[l.length - 1], c = new FileReader(r);
      c.onloadend = () => {
        const x = JSON.parse(c.result);
        console.group("[IMPORT]"), console.log("--- Previous:"), console.log(this._rootCtx), e(this._rootCtx, x), this.clear(), this.build(this._name, this._rootCtx), console.log("--- Imported:"), console.log(this._rootCtx), console.groupEnd();
      }, c.readAsText(r);
    }, p = v.exports("div.import", [
      v.exports(
        "label.button",
        { htmlFor: "import" },
        "Import",
        v.exports("input#import", { type: "file", onchange: n, accept: ".json" })
      )
    ]), t = v.exports("div.import-export", [p, s]);
    this._rootContainer.appendChild(t);
  }
  downloadConfiguration() {
    const s = JSON.stringify(this._rootCtx), e = encodeURIComponent(s), n = document.createElement("a");
    n.setAttribute("download", `${Date.now()}.json`), n.setAttribute("href", `data:text/json;charset=utf-8,${e}`), n.click();
  }
  static downloadCanvas(s) {
    var p;
    const e = document.querySelector(
      s || "canvas"
    ), n = document.createElement("a");
    n.setAttribute("download", `${Date.now()}`), n.setAttribute(
      "href",
      (p = e == null ? void 0 : e.toDataURL("image/png")) == null ? void 0 : p.replace("image/png", "image/octet-stream")
    ), n.click();
  }
  camelCaseWithSpaces(s) {
    return s.replace(/([a-z0-9])([A-Z])/g, "$1 $2");
  }
}
window.P5Gui = nt;
export {
  nt as P5Gui
};
