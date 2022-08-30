function j(g) {
  var s = g.default;
  if (typeof s == "function") {
    var t = function() {
      return s.apply(this, arguments);
    };
    t.prototype = s.prototype;
  } else
    t = {};
  return Object.defineProperty(t, "__esModule", { value: !0 }), Object.keys(g).forEach(function(e) {
    var l = Object.getOwnPropertyDescriptor(g, e);
    Object.defineProperty(t, e, l.get ? l : {
      enumerable: !0,
      get: function() {
        return g[e];
      }
    });
  }), t;
}
var v = { exports: {} };
/*!
 * Cross-Browser Split 1.1.1
 * Copyright 2007-2012 Steven Levithan <stevenlevithan.com>
 * Available under the MIT License
 * ECMAScript compliant, uniform cross-browser split method
 */
var U = function(s) {
  var t = String.prototype.split, e = /()??/.exec("")[1] === s, l;
  return l = function(n, i, u) {
    if (Object.prototype.toString.call(i) !== "[object RegExp]")
      return t.call(n, i, u);
    var r = [], f = (i.ignoreCase ? "i" : "") + (i.multiline ? "m" : "") + (i.extended ? "x" : "") + (i.sticky ? "y" : ""), d = 0, i = new RegExp(i.source, f + "g"), x, h, y, _;
    for (n += "", e || (x = new RegExp("^" + i.source + "$(?!\\s)", f)), u = u === s ? -1 >>> 0 : u >>> 0; (h = i.exec(n)) && (y = h.index + h[0].length, !(y > d && (r.push(n.slice(d, h.index)), !e && h.length > 1 && h[0].replace(x, function() {
      for (var w = 1; w < arguments.length - 2; w++)
        arguments[w] === s && (h[w] = s);
    }), h.length > 1 && h.index < n.length && Array.prototype.push.apply(r, h.slice(1)), _ = h[0].length, d = y, r.length >= u))); )
      i.lastIndex === h.index && i.lastIndex++;
    return d === n.length ? (_ || !i.test("")) && r.push("") : r.push(n.slice(d)), r.length > u ? r.slice(0, u) : r;
  }, l;
}(), q = [].indexOf, B = function(g, s) {
  if (q)
    return g.indexOf(s);
  for (var t = 0; t < g.length; ++t)
    if (g[t] === s)
      return t;
  return -1;
}, A = B, G = J;
function J(g) {
  var s = g.classList;
  if (s)
    return s;
  var t = {
    add: e,
    remove: l,
    contains: n,
    toggle: c,
    toString: u,
    length: 0,
    item: r
  };
  return t;
  function e(i) {
    var x = f();
    A(x, i) > -1 || (x.push(i), d(x));
  }
  function l(i) {
    var x = f(), h = A(x, i);
    h !== -1 && (x.splice(h, 1), d(x));
  }
  function n(i) {
    return A(f(), i) > -1;
  }
  function c(i) {
    return n(i) ? (l(i), !1) : (e(i), !0);
  }
  function u() {
    return g.className;
  }
  function r(i) {
    var x = f();
    return x[i] || null;
  }
  function f() {
    var i = g.className;
    return z(i.split(" "), H);
  }
  function d(i) {
    var x = i.length;
    g.className = i.join(" "), t.length = x;
    for (var h = 0; h < i.length; h++)
      t[h] = i[h];
    delete i[x];
  }
}
function z(g, s) {
  for (var t = [], e = 0; e < g.length; e++)
    s(g[e]) && t.push(g[e]);
  return t;
}
function H(g) {
  return !!g;
}
const K = {}, X = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: K
}, Symbol.toStringTag, { value: "Module" })), Y = /* @__PURE__ */ j(X);
var Z = U, Q = G, D = typeof window > "u" ? Y : window, N = D.document, k = D.Text;
function F() {
  var g = [];
  function s() {
    var t = [].slice.call(arguments), e = null;
    function l(n) {
      var c;
      function u(i) {
        var x = Z(i, /([\.#]?[^\s#.]+)/);
        /^\.|#/.test(x[1]) && (e = N.createElement("div")), W(x, function(h) {
          var y = h.substring(1, h.length);
          !h || (e ? h[0] === "." ? Q(e).add(y) : h[0] === "#" && e.setAttribute("id", y) : e = N.createElement(h));
        });
      }
      if (n != null) {
        if (typeof n == "string")
          e ? e.appendChild(c = N.createTextNode(n)) : u(n);
        else if (typeof n == "number" || typeof n == "boolean" || n instanceof Date || n instanceof RegExp)
          e.appendChild(c = N.createTextNode(n.toString()));
        else if (et(n))
          W(n, l);
        else if (R(n))
          e.appendChild(c = n);
        else if (n instanceof k)
          e.appendChild(c = n);
        else if (typeof n == "object")
          for (var r in n)
            if (typeof n[r] == "function")
              /^on\w+/.test(r) ? function(i, x) {
                e.addEventListener ? (e.addEventListener(i.substring(2), x[i], !1), g.push(function() {
                  e.removeEventListener(i.substring(2), x[i], !1);
                })) : (e.attachEvent(i, x[i]), g.push(function() {
                  e.detachEvent(i, x[i]);
                }));
              }(r, n) : (e[r] = n[r](), g.push(n[r](function(i) {
                e[r] = i;
              })));
            else if (r === "style")
              if (typeof n[r] == "string")
                e.style.cssText = n[r];
              else
                for (var f in n[r])
                  (function(i, x) {
                    if (typeof x == "function")
                      e.style.setProperty(i, x()), g.push(x(function(y) {
                        e.style.setProperty(i, y);
                      }));
                    else
                      var h = n[r][i].match(/(.*)\W+!important\W*$/);
                    h ? e.style.setProperty(i, h[1], "important") : e.style.setProperty(i, n[r][i]);
                  })(f, n[r][f]);
            else if (r === "attrs")
              for (var d in n[r])
                e.setAttribute(d, n[r][d]);
            else
              r.substr(0, 5) === "data-" ? e.setAttribute(r, n[r]) : e[r] = n[r];
        else if (typeof n == "function") {
          var d = n();
          e.appendChild(c = R(d) ? d : N.createTextNode(d)), g.push(n(function(x) {
            R(x) && c.parentElement ? (c.parentElement.replaceChild(x, c), c = x) : c.textContent = x;
          }));
        }
      }
      return c;
    }
    for (; t.length; )
      l(t.shift());
    return e;
  }
  return s.cleanup = function() {
    for (var t = 0; t < g.length; t++)
      g[t]();
    g.length = 0;
  }, s;
}
var tt = v.exports = F();
tt.context = F;
function R(g) {
  return g && g.nodeName && g.nodeType;
}
function W(g, s) {
  if (g.forEach)
    return g.forEach(s);
  for (var t = 0; t < g.length; t++)
    s(g[t], t);
}
function et(g) {
  return Object.prototype.toString.call(g) == "[object Array]";
}
var M = { exports: {} };
(function(g) {
  (function() {
    function s(o, a) {
      o(a()), a(o);
    }
    function t(o, a) {
      a(o()), o(a), a(o);
    }
    function e(o) {
      return o === void 0;
    }
    function l(o) {
      return typeof o != "function";
    }
    function n(o) {
      return typeof o == "function";
    }
    function c(o) {
      if (!n(o))
        throw new Error("transform expects an observable");
      return o;
    }
    function u(o, a) {
      for (var p in o)
        o[p](a);
    }
    function r(o, a) {
      delete o[o.indexOf(a)];
    }
    function f(o, a, p) {
      (o.on || o.addEventListener).call(o, a, p, !1);
    }
    function d(o, a, p) {
      (o.removeListener || o.removeEventListener || o.off).call(o, a, p, !1);
    }
    function i(o) {
      var a = o, p = [];
      return b.set = function(m) {
        u(p, a = m);
      }, b;
      function b(m) {
        return e(m) ? a : l(m) ? u(p, a = m) : (p.push(m), m(a), function() {
          r(p, m);
        });
      }
    }
    function x(o, a) {
      return function(p) {
        return e(p) ? o.get(a) : l(p) ? o.set(a, p) : (f(o, "change:" + a, p), p(o.get(a)), function() {
          d(o, "change:" + a, p);
        });
      };
    }
    function h(o, a, p) {
      return c(o), function(b) {
        return e(b) ? a(o()) : l(b) ? o((p || a)(b)) : o(function(m) {
          b(a(m));
        });
      };
    }
    function y(o) {
      return h(o, function(a) {
        return !a;
      });
    }
    function _(o, a, p, b) {
      function m() {
        b(n(p) ? p() : o[p]);
      }
      return f(o, a, m), m(), function() {
        d(o, a, m);
      };
    }
    function w(o, a, p) {
      return a = a || "value", p = p || "input", function(b) {
        return e(b) ? o[a] : l(b) ? o[a] = b : _(o, p, a, b);
      };
    }
    function $(o) {
      function a() {
        return o[o.selectedIndex].value;
      }
      function p(b) {
        for (var m = 0; m < o.options.length; m++)
          o.options[m].value == b && (o.selectedIndex = m);
      }
      return function(b) {
        return e(b) ? o.options[o.selectedIndex].value : l(b) ? p(b) : _(o, "change", a, b);
      };
    }
    function O(o, a, p) {
      var b = !1;
      return function(m) {
        function S() {
          b || m(b = !0);
        }
        function T() {
          b && m(b = !1);
        }
        return e(m) ? b : l(m) ? void 0 : (f(o, a, S), f(o, p || a, T), m(b), function() {
          d(o, a, S), d(o, p || a, T);
        });
      };
    }
    function L(o, a) {
      var p = o.map(function(S) {
        return S();
      }), b = !0, m = i();
      return o.forEach(function(S, T) {
        S(function(V) {
          p[T] = V, !b && m(a.apply(null, p));
        });
      }), m(a.apply(null, p)), b = !1, m(function() {
        a.apply(null, p);
      }), m;
    }
    function I(o, a, p) {
      return h(o, function(b) {
        return b ? a : p;
      }, function(b) {
        return b == a;
      });
    }
    function P() {
      var o, a = [];
      return function(p) {
        return e(p) ? o : l(p) ? o !== p ? u(a, o = p) : "" : (a.push(p), p(o), function() {
          r(a, p);
        });
      };
    }
    var C = i;
    C.bind1 = s, C.bind2 = t, C.value = i, C.not = y, C.property = x, C.input = C.attribute = w, C.select = $, C.compute = L, C.transform = h, C.boolean = I, C.toggle = O, C.hover = function(o) {
      return O(o, "mouseover", "mouseout");
    }, C.focus = function(o) {
      return O(o, "focus", "blur");
    }, C.signal = P, g.exports = C;
  })();
})(M);
const E = M.exports;
class nt {
  constructor() {
    this._rootContainer = v.exports("div#p5gui"), document.body.appendChild(this._rootContainer);
  }
  save() {
    const s = JSON.stringify(this._rootCtx);
    localStorage.setItem(`p5.gui/${this._name}`, s);
  }
  restore() {
    const s = (e, l) => {
      Object.keys(l).forEach((n) => {
        const c = e[n], u = l[n];
        typeof c == "object" ? s(c, u) : e[n] = u;
      });
    }, t = JSON.parse(
      localStorage.getItem(`p5.gui/${this._name}`)
    );
    t !== null && s(this._rootCtx, t);
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
  build(s, t, e) {
    e === void 0 && (this._name = s, this._rootCtx = t, this._rootCtxO = E(this._rootCtx), this._rootCtxO((r) => {
      this._rootCtx["@change"] && this._rootCtx["@change"]();
    }), this.addImportExportUi());
    const l = Object.getOwnPropertyNames(t), n = E();
    n(!0);
    const c = v.exports(
      "div.ui-group",
      {
        className: `group ${n() ? "visible" : ""}`
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
    (e || this._rootContainer).appendChild(c);
    const u = v.exports("div.entries");
    c.appendChild(u), l.filter((r) => r[0] !== "@").forEach((r) => {
      const f = t[r], d = t[`@${r}.component`], i = t[`@${r}.min`], x = t[`@${r}.max`], h = t[`@${r}.step`];
      switch (Array.isArray(f) ? "array" : d || typeof f) {
        case "array":
          const _ = {};
          f.forEach((w, $) => _[`Element ${$}`] = w), this.build(r, _, u);
          break;
        case "object":
          this.build(r, f, u);
          break;
        case "function":
          this.addButton(u, r, f, t);
          break;
        case "string":
          this.addText(u, r, f, t);
          break;
        case "number":
          this.addNumber(u, r, f, t, h);
          break;
        case "slider":
          this.addSlider(u, r, f, t, i, x, h);
          break;
        case "color":
          this.addColor(u, r, f, t);
          break;
        case "potentiometer":
          this.addPotentiometer(u, r, f, t);
          break;
        case "boolean":
          this.addToggle(u, r, f, t);
          break;
      }
    });
  }
  container(s, t) {
    return v.exports(`div${[".ui-container", s].join("")}`, t);
  }
  addSlider(s, t, e, l, n, c, u) {
    const r = E();
    r(e), r((i) => {
      this._rootCtxO(l);
    });
    const f = (i) => {
      const x = i.target;
      l[t] = r(), r(parseFloat(x.value));
    }, d = this.container(".slider", [
      v.exports("label", this.camelCaseWithSpaces(t)),
      v.exports("input", {
        type: "range",
        value: r(),
        oninput: f,
        min: n,
        max: c,
        step: u
      }),
      v.exports("span.text-value", r)
    ]);
    s.appendChild(d);
  }
  addButton(s, t, e, l) {
    const n = this.container(
      ".button",
      v.exports(
        "button",
        { onclick: e.bind(l) },
        this.camelCaseWithSpaces(t)
      )
    );
    s.appendChild(n);
  }
  addToggle(s, t, e, l) {
    const n = E();
    n(e);
    const c = (r) => {
      r.target.classList.toggle("on"), n(!n()), l[t] = n();
    }, u = this.container(".toggle", [
      v.exports("label", { htmlFor: t }, this.camelCaseWithSpaces(t)),
      v.exports(
        "div.toggle",
        { onclick: c },
        v.exports(`div.state.${n() ? "on" : "off"}`)
      ),
      v.exports(`input#${t}`, { type: "checkbox", checked: e, onclick: c })
    ]);
    s.appendChild(u);
  }
  addText(s, t, e, l) {
    const n = E();
    n(e), n((u) => {
      l[t] = u, this._rootCtxO(l);
    });
    const c = this.container(s, ".text", [
      v.exports("label", this.camelCaseWithSpaces(t)),
      v.exports("input", { type: "text", value: e })
    ]);
    s.appendChild(c);
  }
  addNumber(s, t, e, l, n) {
    const c = E();
    c(e), c((d) => {
      l[t] = d, this._rootCtxO(l);
    });
    const u = (d, i) => {
      c(c() + i);
      const h = d.target.parentNode;
      h.querySelector("input").value = c();
    }, r = (d) => {
      const i = d.target;
      c(parseFloat(i.value)), l[t] = c();
    }, f = this.container(".number", [
      v.exports("label", this.camelCaseWithSpaces(t)),
      v.exports("div.number", [
        v.exports("button.button", { onclick: (d) => u(d, -1) }, "-"),
        v.exports("input.input", { type: "number", value: c(), onblur: r, step: n }),
        v.exports("button.button", { onclick: (d) => u(d, 1) }, "+")
      ])
    ]);
    s.appendChild(f);
  }
  addColor(s, t, e, l) {
    const n = this.uuid(), c = E();
    c(e), c((f) => {
      l[t] = c(), this._rootCtxO(l);
    });
    const u = (f) => {
      const d = f.target;
      c(d.value);
      const i = d.parentNode.querySelector(
        ".color-preview"
      );
      i.style.backgroundColor = c();
    }, r = this.container(".color", [
      v.exports("label", this.camelCaseWithSpaces(t)),
      v.exports(`input#${t}-${n}.input`, {
        type: "color",
        value: c(),
        oninput: u
      }),
      v.exports(
        "label.color-preview-wrapper",
        { htmlFor: `${t}-${n}` },
        v.exports("div.color-preview", { style: { "background-color": e } })
      ),
      v.exports("span.text-value", c)
    ]);
    s.appendChild(r);
  }
  addPotentiometer(s, t, e, l) {
    const n = E(), c = E();
    n(e), n((h) => {
      l[t] = n(), this._rootCtxO({ [t]: n() });
    }), c(!1);
    let u;
    const r = (h) => {
      if (!c())
        return;
      h.preventDefault();
      const _ = h.target.parentNode, { width: w, height: $, x: O, y: L } = _.getBoundingClientRect(), I = w * 0.5 - (h.clientX - O), P = $ * 0.5 - (h.clientY - L), C = [-I, P];
      if (Math.sqrt(C[0] * C[0] + C[1] * C[1]) < 5)
        return;
      const a = Math.round(
        (Math.atan2(C[0], C[1]) + Math.PI) * (180 / Math.PI) / 3.6
      );
      n(a), u ? u.style.transform = `rotate(${n() * 3.6}deg)` : u = _.querySelector(".knob");
    }, f = () => c(!0), d = () => c(!1), i = () => c(!1), x = this.container(".potentiometer", [
      v.exports("label", this.camelCaseWithSpaces(t)),
      v.exports(
        "div.knob-wrapper",
        { onpointermove: r, onpointerdown: f, onpointerup: d, onpointerleave: i },
        v.exports("div.knob", { style: { transform: `rotate(${n() * 3.6}deg)` } }, [
          v.exports("div.angle-indicator")
        ])
      ),
      v.exports("span.text-value", n)
    ]);
    s.appendChild(x);
  }
  addImportExportUi() {
    const s = v.exports(
      "button.export",
      { onclick: this.downloadConfiguration.bind(this) },
      "Export"
    ), t = (c, u) => {
      Object.keys(u).forEach((r) => {
        const f = c[r], d = u[r];
        typeof f == "object" ? t(f, d) : c[r] = d;
      });
    }, e = (c) => {
      const { files: u } = c.target, r = u[u.length - 1], f = new FileReader(r);
      f.onloadend = () => {
        const d = JSON.parse(f.result);
        console.group("[IMPORT]"), console.log("--- Previous:"), console.log(this._rootCtx), t(this._rootCtx, d), this.clear(), this.build(this._name, this._rootCtx), console.log("--- Imported:"), console.log(this._rootCtx), console.groupEnd();
      }, f.readAsText(r);
    }, l = v.exports("div.import", [
      v.exports(
        "label.button",
        { htmlFor: "import" },
        "Import",
        v.exports("input#import", { type: "file", onchange: e, accept: ".json" })
      )
    ]), n = v.exports("div.import-export", [l, s]);
    this._rootContainer.appendChild(n);
  }
  downloadConfiguration() {
    const s = JSON.stringify(this._rootCtx), t = encodeURIComponent(s), e = document.createElement("a");
    e.setAttribute("download", `${Date.now()}.json`), e.setAttribute("href", `data:text/json;charset=utf-8,${t}`), e.click();
  }
  static downloadCanvas(s) {
    var l;
    const t = document.querySelector(
      s || "canvas"
    ), e = document.createElement("a");
    e.setAttribute("download", `${Date.now()}`), e.setAttribute(
      "href",
      (l = t == null ? void 0 : t.toDataURL("image/png")) == null ? void 0 : l.replace("image/png", "image/octet-stream")
    ), e.click();
  }
  camelCaseWithSpaces(s) {
    return s.replace(/([a-z0-9])([A-Z])/g, "$1 $2");
  }
}
window.P5Gui = nt;
export {
  nt as P5Gui
};
