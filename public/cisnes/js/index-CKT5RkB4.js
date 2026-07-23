var lh = e => {
    throw TypeError(e)
};
var Vl = (e, t, n) => t.has(e) || lh("Cannot " + n);
var M = (e, t, n) => (Vl(e, t, "read from private field"), n ? n.call(e) : t.get(e)),
    J = (e, t, n) => t.has(e) ? lh("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, n),
    G = (e, t, n, r) => (Vl(e, t, "write to private field"), r ? r.call(e, n) : t.set(e, n), n),
    Ne = (e, t, n) => (Vl(e, t, "access private method"), n);
var ms = (e, t, n, r) => ({
    set _(o) {
        G(e, t, o, n)
    },
    get _() {
        return M(e, t, r)
    }
});

function wx(e, t) {
    for (var n = 0; n < t.length; n++) {
        const r = t[n];
        if (typeof r != "string" && !Array.isArray(r)) {
            for (const o in r)
                if (o !== "default" && !(o in e)) {
                    const i = Object.getOwnPropertyDescriptor(r, o);
                    i && Object.defineProperty(e, o, i.get ? i : {
                        enumerable: !0,
                        get: () => r[o]
                    })
                }
        }
    }
    return Object.freeze(Object.defineProperty(e, Symbol.toStringTag, {
        value: "Module"
    }))
}(function() {
    const t = document.createElement("link").relList;
    if (t && t.supports && t.supports("modulepreload")) return;
    for (const o of document.querySelectorAll('link[rel="modulepreload"]')) r(o);
    new MutationObserver(o => {
        for (const i of o)
            if (i.type === "childList")
                for (const s of i.addedNodes) s.tagName === "LINK" && s.rel === "modulepreload" && r(s)
    }).observe(document, {
        childList: !0,
        subtree: !0
    });

    function n(o) {
        const i = {};
        return o.integrity && (i.integrity = o.integrity), o.referrerPolicy && (i.referrerPolicy = o.referrerPolicy), o.crossOrigin === "use-credentials" ? i.credentials = "include" : o.crossOrigin === "anonymous" ? i.credentials = "omit" : i.credentials = "same-origin", i
    }

    function r(o) {
        if (o.ep) return;
        o.ep = !0;
        const i = n(o);
        fetch(o.href, i)
    }
})();

function Rg(e) {
    return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e
}
var Ag = {
        exports: {}
    },
    Za = {},
    Mg = {
        exports: {}
    },
    X = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var es = Symbol.for("react.element"),
    xx = Symbol.for("react.portal"),
    Sx = Symbol.for("react.fragment"),
    Ex = Symbol.for("react.strict_mode"),
    Cx = Symbol.for("react.profiler"),
    Tx = Symbol.for("react.provider"),
    Px = Symbol.for("react.context"),
    bx = Symbol.for("react.forward_ref"),
    kx = Symbol.for("react.suspense"),
    Rx = Symbol.for("react.memo"),
    Ax = Symbol.for("react.lazy"),
    uh = Symbol.iterator;

function Mx(e) {
    return e === null || typeof e != "object" ? null : (e = uh && e[uh] || e["@@iterator"], typeof e == "function" ? e : null)
}
var Dg = {
        isMounted: function() {
            return !1
        },
        enqueueForceUpdate: function() {},
        enqueueReplaceState: function() {},
        enqueueSetState: function() {}
    },
    Lg = Object.assign,
    Ng = {};

function zo(e, t, n) {
    this.props = e, this.context = t, this.refs = Ng, this.updater = n || Dg
}
zo.prototype.isReactComponent = {};
zo.prototype.setState = function(e, t) {
    if (typeof e != "object" && typeof e != "function" && e != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, e, t, "setState")
};
zo.prototype.forceUpdate = function(e) {
    this.updater.enqueueForceUpdate(this, e, "forceUpdate")
};

function Og() {}
Og.prototype = zo.prototype;

function pd(e, t, n) {
    this.props = e, this.context = t, this.refs = Ng, this.updater = n || Dg
}
var md = pd.prototype = new Og;
md.constructor = pd;
Lg(md, zo.prototype);
md.isPureReactComponent = !0;
var ch = Array.isArray,
    Ig = Object.prototype.hasOwnProperty,
    gd = {
        current: null
    },
    _g = {
        key: !0,
        ref: !0,
        __self: !0,
        __source: !0
    };

function Vg(e, t, n) {
    var r, o = {},
        i = null,
        s = null;
    if (t != null)
        for (r in t.ref !== void 0 && (s = t.ref), t.key !== void 0 && (i = "" + t.key), t) Ig.call(t, r) && !_g.hasOwnProperty(r) && (o[r] = t[r]);
    var a = arguments.length - 2;
    if (a === 1) o.children = n;
    else if (1 < a) {
        for (var l = Array(a), u = 0; u < a; u++) l[u] = arguments[u + 2];
        o.children = l
    }
    if (e && e.defaultProps)
        for (r in a = e.defaultProps, a) o[r] === void 0 && (o[r] = a[r]);
    return {
        $$typeof: es,
        type: e,
        key: i,
        ref: s,
        props: o,
        _owner: gd.current
    }
}

function Dx(e, t) {
    return {
        $$typeof: es,
        type: e.type,
        key: t,
        ref: e.ref,
        props: e.props,
        _owner: e._owner
    }
}

function yd(e) {
    return typeof e == "object" && e !== null && e.$$typeof === es
}

function Lx(e) {
    var t = {
        "=": "=0",
        ":": "=2"
    };
    return "$" + e.replace(/[=:]/g, function(n) {
        return t[n]
    })
}
var dh = /\/+/g;

function jl(e, t) {
    return typeof e == "object" && e !== null && e.key != null ? Lx("" + e.key) : t.toString(36)
}

function Us(e, t, n, r, o) {
    var i = typeof e;
    (i === "undefined" || i === "boolean") && (e = null);
    var s = !1;
    if (e === null) s = !0;
    else switch (i) {
        case "string":
        case "number":
            s = !0;
            break;
        case "object":
            switch (e.$$typeof) {
                case es:
                case xx:
                    s = !0
            }
    }
    if (s) return s = e, o = o(s), e = r === "" ? "." + jl(s, 0) : r, ch(o) ? (n = "", e != null && (n = e.replace(dh, "$&/") + "/"), Us(o, t, n, "", function(u) {
        return u
    })) : o != null && (yd(o) && (o = Dx(o, n + (!o.key || s && s.key === o.key ? "" : ("" + o.key).replace(dh, "$&/") + "/") + e)), t.push(o)), 1;
    if (s = 0, r = r === "" ? "." : r + ":", ch(e))
        for (var a = 0; a < e.length; a++) {
            i = e[a];
            var l = r + jl(i, a);
            s += Us(i, t, n, l, o)
        } else if (l = Mx(e), typeof l == "function")
            for (e = l.call(e), a = 0; !(i = e.next()).done;) i = i.value, l = r + jl(i, a++), s += Us(i, t, n, l, o);
        else if (i === "object") throw t = String(e), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
    return s
}

function gs(e, t, n) {
    if (e == null) return e;
    var r = [],
        o = 0;
    return Us(e, r, "", "", function(i) {
        return t.call(n, i, o++)
    }), r
}

function Nx(e) {
    if (e._status === -1) {
        var t = e._result;
        t = t(), t.then(function(n) {
            (e._status === 0 || e._status === -1) && (e._status = 1, e._result = n)
        }, function(n) {
            (e._status === 0 || e._status === -1) && (e._status = 2, e._result = n)
        }), e._status === -1 && (e._status = 0, e._result = t)
    }
    if (e._status === 1) return e._result.default;
    throw e._result
}
var He = {
        current: null
    },
    Ws = {
        transition: null
    },
    Ox = {
        ReactCurrentDispatcher: He,
        ReactCurrentBatchConfig: Ws,
        ReactCurrentOwner: gd
    };

function jg() {
    throw Error("act(...) is not supported in production builds of React.")
}
X.Children = {
    map: gs,
    forEach: function(e, t, n) {
        gs(e, function() {
            t.apply(this, arguments)
        }, n)
    },
    count: function(e) {
        var t = 0;
        return gs(e, function() {
            t++
        }), t
    },
    toArray: function(e) {
        return gs(e, function(t) {
            return t
        }) || []
    },
    only: function(e) {
        if (!yd(e)) throw Error("React.Children.only expected to receive a single React element child.");
        return e
    }
};
X.Component = zo;
X.Fragment = Sx;
X.Profiler = Cx;
X.PureComponent = pd;
X.StrictMode = Ex;
X.Suspense = kx;
X.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Ox;
X.act = jg;
X.cloneElement = function(e, t, n) {
    if (e == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
    var r = Lg({}, e.props),
        o = e.key,
        i = e.ref,
        s = e._owner;
    if (t != null) {
        if (t.ref !== void 0 && (i = t.ref, s = gd.current), t.key !== void 0 && (o = "" + t.key), e.type && e.type.defaultProps) var a = e.type.defaultProps;
        for (l in t) Ig.call(t, l) && !_g.hasOwnProperty(l) && (r[l] = t[l] === void 0 && a !== void 0 ? a[l] : t[l])
    }
    var l = arguments.length - 2;
    if (l === 1) r.children = n;
    else if (1 < l) {
        a = Array(l);
        for (var u = 0; u < l; u++) a[u] = arguments[u + 2];
        r.children = a
    }
    return {
        $$typeof: es,
        type: e.type,
        key: o,
        ref: i,
        props: r,
        _owner: s
    }
};
X.createContext = function(e) {
    return e = {
        $$typeof: Px,
        _currentValue: e,
        _currentValue2: e,
        _threadCount: 0,
        Provider: null,
        Consumer: null,
        _defaultValue: null,
        _globalName: null
    }, e.Provider = {
        $$typeof: Tx,
        _context: e
    }, e.Consumer = e
};
X.createElement = Vg;
X.createFactory = function(e) {
    var t = Vg.bind(null, e);
    return t.type = e, t
};
X.createRef = function() {
    return {
        current: null
    }
};
X.forwardRef = function(e) {
    return {
        $$typeof: bx,
        render: e
    }
};
X.isValidElement = yd;
X.lazy = function(e) {
    return {
        $$typeof: Ax,
        _payload: {
            _status: -1,
            _result: e
        },
        _init: Nx
    }
};
X.memo = function(e, t) {
    return {
        $$typeof: Rx,
        type: e,
        compare: t === void 0 ? null : t
    }
};
X.startTransition = function(e) {
    var t = Ws.transition;
    Ws.transition = {};
    try {
        e()
    } finally {
        Ws.transition = t
    }
};
X.unstable_act = jg;
X.useCallback = function(e, t) {
    return He.current.useCallback(e, t)
};
X.useContext = function(e) {
    return He.current.useContext(e)
};
X.useDebugValue = function() {};
X.useDeferredValue = function(e) {
    return He.current.useDeferredValue(e)
};
X.useEffect = function(e, t) {
    return He.current.useEffect(e, t)
};
X.useId = function() {
    return He.current.useId()
};
X.useImperativeHandle = function(e, t, n) {
    return He.current.useImperativeHandle(e, t, n)
};
X.useInsertionEffect = function(e, t) {
    return He.current.useInsertionEffect(e, t)
};
X.useLayoutEffect = function(e, t) {
    return He.current.useLayoutEffect(e, t)
};
X.useMemo = function(e, t) {
    return He.current.useMemo(e, t)
};
X.useReducer = function(e, t, n) {
    return He.current.useReducer(e, t, n)
};
X.useRef = function(e) {
    return He.current.useRef(e)
};
X.useState = function(e) {
    return He.current.useState(e)
};
X.useSyncExternalStore = function(e, t, n) {
    return He.current.useSyncExternalStore(e, t, n)
};
X.useTransition = function() {
    return He.current.useTransition()
};
X.version = "18.3.1";
Mg.exports = X;
var x = Mg.exports;
const N = Rg(x),
    Fg = wx({
        __proto__: null,
        default: N
    }, [x]);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ix = x,
    _x = Symbol.for("react.element"),
    Vx = Symbol.for("react.fragment"),
    jx = Object.prototype.hasOwnProperty,
    Fx = Ix.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
    zx = {
        key: !0,
        ref: !0,
        __self: !0,
        __source: !0
    };

function zg(e, t, n) {
    var r, o = {},
        i = null,
        s = null;
    n !== void 0 && (i = "" + n), t.key !== void 0 && (i = "" + t.key), t.ref !== void 0 && (s = t.ref);
    for (r in t) jx.call(t, r) && !zx.hasOwnProperty(r) && (o[r] = t[r]);
    if (e && e.defaultProps)
        for (r in t = e.defaultProps, t) o[r] === void 0 && (o[r] = t[r]);
    return {
        $$typeof: _x,
        type: e,
        key: i,
        ref: s,
        props: o,
        _owner: Fx.current
    }
}
Za.Fragment = Vx;
Za.jsx = zg;
Za.jsxs = zg;
Ag.exports = Za;
var P = Ag.exports,
    $g = {
        exports: {}
    },
    lt = {},
    Bg = {
        exports: {}
    },
    Ug = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function(e) {
    function t(k, A) {
        var _ = k.length;
        k.push(A);
        e: for (; 0 < _;) {
            var B = _ - 1 >>> 1,
                $ = k[B];
            if (0 < o($, A)) k[B] = A, k[_] = $, _ = B;
            else break e
        }
    }

    function n(k) {
        return k.length === 0 ? null : k[0]
    }

    function r(k) {
        if (k.length === 0) return null;
        var A = k[0],
            _ = k.pop();
        if (_ !== A) {
            k[0] = _;
            e: for (var B = 0, $ = k.length, Y = $ >>> 1; B < Y;) {
                var q = 2 * (B + 1) - 1,
                    ve = k[q],
                    Le = q + 1,
                    ee = k[Le];
                if (0 > o(ve, _)) Le < $ && 0 > o(ee, ve) ? (k[B] = ee, k[Le] = _, B = Le) : (k[B] = ve, k[q] = _, B = q);
                else if (Le < $ && 0 > o(ee, _)) k[B] = ee, k[Le] = _, B = Le;
                else break e
            }
        }
        return A
    }

    function o(k, A) {
        var _ = k.sortIndex - A.sortIndex;
        return _ !== 0 ? _ : k.id - A.id
    }
    if (typeof performance == "object" && typeof performance.now == "function") {
        var i = performance;
        e.unstable_now = function() {
            return i.now()
        }
    } else {
        var s = Date,
            a = s.now();
        e.unstable_now = function() {
            return s.now() - a
        }
    }
    var l = [],
        u = [],
        c = 1,
        d = null,
        h = 3,
        f = !1,
        v = !1,
        g = !1,
        w = typeof setTimeout == "function" ? setTimeout : null,
        m = typeof clearTimeout == "function" ? clearTimeout : null,
        p = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);

    function y(k) {
        for (var A = n(u); A !== null;) {
            if (A.callback === null) r(u);
            else if (A.startTime <= k) r(u), A.sortIndex = A.expirationTime, t(l, A);
            else break;
            A = n(u)
        }
    }

    function S(k) {
        if (g = !1, y(k), !v)
            if (n(l) !== null) v = !0, z(E);
            else {
                var A = n(u);
                A !== null && H(S, A.startTime - k)
            }
    }

    function E(k, A) {
        v = !1, g && (g = !1, m(b), b = -1), f = !0;
        var _ = h;
        try {
            for (y(A), d = n(l); d !== null && (!(d.expirationTime > A) || k && !V());) {
                var B = d.callback;
                if (typeof B == "function") {
                    d.callback = null, h = d.priorityLevel;
                    var $ = B(d.expirationTime <= A);
                    A = e.unstable_now(), typeof $ == "function" ? d.callback = $ : d === n(l) && r(l), y(A)
                } else r(l);
                d = n(l)
            }
            if (d !== null) var Y = !0;
            else {
                var q = n(u);
                q !== null && H(S, q.startTime - A), Y = !1
            }
            return Y
        } finally {
            d = null, h = _, f = !1
        }
    }
    var C = !1,
        T = null,
        b = -1,
        D = 5,
        R = -1;

    function V() {
        return !(e.unstable_now() - R < D)
    }

    function I() {
        if (T !== null) {
            var k = e.unstable_now();
            R = k;
            var A = !0;
            try {
                A = T(!0, k)
            } finally {
                A ? U() : (C = !1, T = null)
            }
        } else C = !1
    }
    var U;
    if (typeof p == "function") U = function() {
        p(I)
    };
    else if (typeof MessageChannel < "u") {
        var O = new MessageChannel,
            W = O.port2;
        O.port1.onmessage = I, U = function() {
            W.postMessage(null)
        }
    } else U = function() {
        w(I, 0)
    };

    function z(k) {
        T = k, C || (C = !0, U())
    }

    function H(k, A) {
        b = w(function() {
            k(e.unstable_now())
        }, A)
    }
    e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(k) {
        k.callback = null
    }, e.unstable_continueExecution = function() {
        v || f || (v = !0, z(E))
    }, e.unstable_forceFrameRate = function(k) {
        0 > k || 125 < k ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : D = 0 < k ? Math.floor(1e3 / k) : 5
    }, e.unstable_getCurrentPriorityLevel = function() {
        return h
    }, e.unstable_getFirstCallbackNode = function() {
        return n(l)
    }, e.unstable_next = function(k) {
        switch (h) {
            case 1:
            case 2:
            case 3:
                var A = 3;
                break;
            default:
                A = h
        }
        var _ = h;
        h = A;
        try {
            return k()
        } finally {
            h = _
        }
    }, e.unstable_pauseExecution = function() {}, e.unstable_requestPaint = function() {}, e.unstable_runWithPriority = function(k, A) {
        switch (k) {
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
                break;
            default:
                k = 3
        }
        var _ = h;
        h = k;
        try {
            return A()
        } finally {
            h = _
        }
    }, e.unstable_scheduleCallback = function(k, A, _) {
        var B = e.unstable_now();
        switch (typeof _ == "object" && _ !== null ? (_ = _.delay, _ = typeof _ == "number" && 0 < _ ? B + _ : B) : _ = B, k) {
            case 1:
                var $ = -1;
                break;
            case 2:
                $ = 250;
                break;
            case 5:
                $ = 1073741823;
                break;
            case 4:
                $ = 1e4;
                break;
            default:
                $ = 5e3
        }
        return $ = _ + $, k = {
            id: c++,
            callback: A,
            priorityLevel: k,
            startTime: _,
            expirationTime: $,
            sortIndex: -1
        }, _ > B ? (k.sortIndex = _, t(u, k), n(l) === null && k === n(u) && (g ? (m(b), b = -1) : g = !0, H(S, _ - B))) : (k.sortIndex = $, t(l, k), v || f || (v = !0, z(E))), k
    }, e.unstable_shouldYield = V, e.unstable_wrapCallback = function(k) {
        var A = h;
        return function() {
            var _ = h;
            h = A;
            try {
                return k.apply(this, arguments)
            } finally {
                h = _
            }
        }
    }
})(Ug);
Bg.exports = Ug;
var $x = Bg.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Bx = x,
    at = $x;

function L(e) {
    for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
    return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
}
var Wg = new Set,
    ki = {};

function jr(e, t) {
    Ro(e, t), Ro(e + "Capture", t)
}

function Ro(e, t) {
    for (ki[e] = t, e = 0; e < t.length; e++) Wg.add(t[e])
}
var fn = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"),
    Nu = Object.prototype.hasOwnProperty,
    Ux = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
    fh = {},
    hh = {};

function Wx(e) {
    return Nu.call(hh, e) ? !0 : Nu.call(fh, e) ? !1 : Ux.test(e) ? hh[e] = !0 : (fh[e] = !0, !1)
}

function Hx(e, t, n, r) {
    if (n !== null && n.type === 0) return !1;
    switch (typeof t) {
        case "function":
        case "symbol":
            return !0;
        case "boolean":
            return r ? !1 : n !== null ? !n.acceptsBooleans : (e = e.toLowerCase().slice(0, 5), e !== "data-" && e !== "aria-");
        default:
            return !1
    }
}

function Kx(e, t, n, r) {
    if (t === null || typeof t > "u" || Hx(e, t, n, r)) return !0;
    if (r) return !1;
    if (n !== null) switch (n.type) {
        case 3:
            return !t;
        case 4:
            return t === !1;
        case 5:
            return isNaN(t);
        case 6:
            return isNaN(t) || 1 > t
    }
    return !1
}

function Ke(e, t, n, r, o, i, s) {
    this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = r, this.attributeNamespace = o, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = i, this.removeEmptyString = s
}
var De = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
    De[e] = new Ke(e, 0, !1, e, null, !1, !1)
});
[
    ["acceptCharset", "accept-charset"],
    ["className", "class"],
    ["htmlFor", "for"],
    ["httpEquiv", "http-equiv"]
].forEach(function(e) {
    var t = e[0];
    De[t] = new Ke(t, 1, !1, e[1], null, !1, !1)
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
    De[e] = new Ke(e, 2, !1, e.toLowerCase(), null, !1, !1)
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
    De[e] = new Ke(e, 2, !1, e, null, !1, !1)
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
    De[e] = new Ke(e, 3, !1, e.toLowerCase(), null, !1, !1)
});
["checked", "multiple", "muted", "selected"].forEach(function(e) {
    De[e] = new Ke(e, 3, !0, e, null, !1, !1)
});
["capture", "download"].forEach(function(e) {
    De[e] = new Ke(e, 4, !1, e, null, !1, !1)
});
["cols", "rows", "size", "span"].forEach(function(e) {
    De[e] = new Ke(e, 6, !1, e, null, !1, !1)
});
["rowSpan", "start"].forEach(function(e) {
    De[e] = new Ke(e, 5, !1, e.toLowerCase(), null, !1, !1)
});
var vd = /[\-:]([a-z])/g;

function wd(e) {
    return e[1].toUpperCase()
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
    var t = e.replace(vd, wd);
    De[t] = new Ke(t, 1, !1, e, null, !1, !1)
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
    var t = e.replace(vd, wd);
    De[t] = new Ke(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1)
});
["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
    var t = e.replace(vd, wd);
    De[t] = new Ke(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1)
});
["tabIndex", "crossOrigin"].forEach(function(e) {
    De[e] = new Ke(e, 1, !1, e.toLowerCase(), null, !1, !1)
});
De.xlinkHref = new Ke("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function(e) {
    De[e] = new Ke(e, 1, !1, e.toLowerCase(), null, !0, !0)
});

function xd(e, t, n, r) {
    var o = De.hasOwnProperty(t) ? De[t] : null;
    (o !== null ? o.type !== 0 : r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (Kx(t, n, o, r) && (n = null), r || o === null ? Wx(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : o.mustUseProperty ? e[o.propertyName] = n === null ? o.type === 3 ? !1 : "" : n : (t = o.attributeName, r = o.attributeNamespace, n === null ? e.removeAttribute(t) : (o = o.type, n = o === 3 || o === 4 && n === !0 ? "" : "" + n, r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))))
}
var vn = Bx.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
    ys = Symbol.for("react.element"),
    Yr = Symbol.for("react.portal"),
    Xr = Symbol.for("react.fragment"),
    Sd = Symbol.for("react.strict_mode"),
    Ou = Symbol.for("react.profiler"),
    Hg = Symbol.for("react.provider"),
    Kg = Symbol.for("react.context"),
    Ed = Symbol.for("react.forward_ref"),
    Iu = Symbol.for("react.suspense"),
    _u = Symbol.for("react.suspense_list"),
    Cd = Symbol.for("react.memo"),
    Dn = Symbol.for("react.lazy"),
    Gg = Symbol.for("react.offscreen"),
    ph = Symbol.iterator;

function qo(e) {
    return e === null || typeof e != "object" ? null : (e = ph && e[ph] || e["@@iterator"], typeof e == "function" ? e : null)
}
var pe = Object.assign,
    Fl;

function li(e) {
    if (Fl === void 0) try {
        throw Error()
    } catch (n) {
        var t = n.stack.trim().match(/\n( *(at )?)/);
        Fl = t && t[1] || ""
    }
    return `
` + Fl + e
}
var zl = !1;

function $l(e, t) {
    if (!e || zl) return "";
    zl = !0;
    var n = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
        if (t)
            if (t = function() {
                    throw Error()
                }, Object.defineProperty(t.prototype, "props", {
                    set: function() {
                        throw Error()
                    }
                }), typeof Reflect == "object" && Reflect.construct) {
                try {
                    Reflect.construct(t, [])
                } catch (u) {
                    var r = u
                }
                Reflect.construct(e, [], t)
            } else {
                try {
                    t.call()
                } catch (u) {
                    r = u
                }
                e.call(t.prototype)
            }
        else {
            try {
                throw Error()
            } catch (u) {
                r = u
            }
            e()
        }
    } catch (u) {
        if (u && r && typeof u.stack == "string") {
            for (var o = u.stack.split(`
`), i = r.stack.split(`
`), s = o.length - 1, a = i.length - 1; 1 <= s && 0 <= a && o[s] !== i[a];) a--;
            for (; 1 <= s && 0 <= a; s--, a--)
                if (o[s] !== i[a]) {
                    if (s !== 1 || a !== 1)
                        do
                            if (s--, a--, 0 > a || o[s] !== i[a]) {
                                var l = `
` + o[s].replace(" at new ", " at ");
                                return e.displayName && l.includes("<anonymous>") && (l = l.replace("<anonymous>", e.displayName)), l
                            } while (1 <= s && 0 <= a);
                    break
                }
        }
    } finally {
        zl = !1, Error.prepareStackTrace = n
    }
    return (e = e ? e.displayName || e.name : "") ? li(e) : ""
}

function Gx(e) {
    switch (e.tag) {
        case 5:
            return li(e.type);
        case 16:
            return li("Lazy");
        case 13:
            return li("Suspense");
        case 19:
            return li("SuspenseList");
        case 0:
        case 2:
        case 15:
            return e = $l(e.type, !1), e;
        case 11:
            return e = $l(e.type.render, !1), e;
        case 1:
            return e = $l(e.type, !0), e;
        default:
            return ""
    }
}

function Vu(e) {
    if (e == null) return null;
    if (typeof e == "function") return e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
        case Xr:
            return "Fragment";
        case Yr:
            return "Portal";
        case Ou:
            return "Profiler";
        case Sd:
            return "StrictMode";
        case Iu:
            return "Suspense";
        case _u:
            return "SuspenseList"
    }
    if (typeof e == "object") switch (e.$$typeof) {
        case Kg:
            return (e.displayName || "Context") + ".Consumer";
        case Hg:
            return (e._context.displayName || "Context") + ".Provider";
        case Ed:
            var t = e.render;
            return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case Cd:
            return t = e.displayName || null, t !== null ? t : Vu(e.type) || "Memo";
        case Dn:
            t = e._payload, e = e._init;
            try {
                return Vu(e(t))
            } catch {}
    }
    return null
}

function Qx(e) {
    var t = e.type;
    switch (e.tag) {
        case 24:
            return "Cache";
        case 9:
            return (t.displayName || "Context") + ".Consumer";
        case 10:
            return (t._context.displayName || "Context") + ".Provider";
        case 18:
            return "DehydratedFragment";
        case 11:
            return e = t.render, e = e.displayName || e.name || "", t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef");
        case 7:
            return "Fragment";
        case 5:
            return t;
        case 4:
            return "Portal";
        case 3:
            return "Root";
        case 6:
            return "Text";
        case 16:
            return Vu(t);
        case 8:
            return t === Sd ? "StrictMode" : "Mode";
        case 22:
            return "Offscreen";
        case 12:
            return "Profiler";
        case 21:
            return "Scope";
        case 13:
            return "Suspense";
        case 19:
            return "SuspenseList";
        case 25:
            return "TracingMarker";
        case 1:
        case 0:
        case 17:
        case 2:
        case 14:
        case 15:
            if (typeof t == "function") return t.displayName || t.name || null;
            if (typeof t == "string") return t
    }
    return null
}

function Zn(e) {
    switch (typeof e) {
        case "boolean":
        case "number":
        case "string":
        case "undefined":
            return e;
        case "object":
            return e;
        default:
            return ""
    }
}

function Qg(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio")
}

function Yx(e) {
    var t = Qg(e) ? "checked" : "value",
        n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
        r = "" + e[t];
    if (!e.hasOwnProperty(t) && typeof n < "u" && typeof n.get == "function" && typeof n.set == "function") {
        var o = n.get,
            i = n.set;
        return Object.defineProperty(e, t, {
            configurable: !0,
            get: function() {
                return o.call(this)
            },
            set: function(s) {
                r = "" + s, i.call(this, s)
            }
        }), Object.defineProperty(e, t, {
            enumerable: n.enumerable
        }), {
            getValue: function() {
                return r
            },
            setValue: function(s) {
                r = "" + s
            },
            stopTracking: function() {
                e._valueTracker = null, delete e[t]
            }
        }
    }
}

function vs(e) {
    e._valueTracker || (e._valueTracker = Yx(e))
}

function Yg(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var n = t.getValue(),
        r = "";
    return e && (r = Qg(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n ? (t.setValue(e), !0) : !1
}

function fa(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
        return e.activeElement || e.body
    } catch {
        return e.body
    }
}

function ju(e, t) {
    var n = t.checked;
    return pe({}, t, {
        defaultChecked: void 0,
        defaultValue: void 0,
        value: void 0,
        checked: n ?? e._wrapperState.initialChecked
    })
}

function mh(e, t) {
    var n = t.defaultValue == null ? "" : t.defaultValue,
        r = t.checked != null ? t.checked : t.defaultChecked;
    n = Zn(t.value != null ? t.value : n), e._wrapperState = {
        initialChecked: r,
        initialValue: n,
        controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null
    }
}

function Xg(e, t) {
    t = t.checked, t != null && xd(e, "checked", t, !1)
}

function Fu(e, t) {
    Xg(e, t);
    var n = Zn(t.value),
        r = t.type;
    if (n != null) r === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
    else if (r === "submit" || r === "reset") {
        e.removeAttribute("value");
        return
    }
    t.hasOwnProperty("value") ? zu(e, t.type, n) : t.hasOwnProperty("defaultValue") && zu(e, t.type, Zn(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked)
}

function gh(e, t, n) {
    if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
        var r = t.type;
        if (!(r !== "submit" && r !== "reset" || t.value !== void 0 && t.value !== null)) return;
        t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t
    }
    n = e.name, n !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, n !== "" && (e.name = n)
}

function zu(e, t, n) {
    (t !== "number" || fa(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n))
}
var ui = Array.isArray;

function co(e, t, n, r) {
    if (e = e.options, t) {
        t = {};
        for (var o = 0; o < n.length; o++) t["$" + n[o]] = !0;
        for (n = 0; n < e.length; n++) o = t.hasOwnProperty("$" + e[n].value), e[n].selected !== o && (e[n].selected = o), o && r && (e[n].defaultSelected = !0)
    } else {
        for (n = "" + Zn(n), t = null, o = 0; o < e.length; o++) {
            if (e[o].value === n) {
                e[o].selected = !0, r && (e[o].defaultSelected = !0);
                return
            }
            t !== null || e[o].disabled || (t = e[o])
        }
        t !== null && (t.selected = !0)
    }
}

function $u(e, t) {
    if (t.dangerouslySetInnerHTML != null) throw Error(L(91));
    return pe({}, t, {
        value: void 0,
        defaultValue: void 0,
        children: "" + e._wrapperState.initialValue
    })
}

function yh(e, t) {
    var n = t.value;
    if (n == null) {
        if (n = t.children, t = t.defaultValue, n != null) {
            if (t != null) throw Error(L(92));
            if (ui(n)) {
                if (1 < n.length) throw Error(L(93));
                n = n[0]
            }
            t = n
        }
        t == null && (t = ""), n = t
    }
    e._wrapperState = {
        initialValue: Zn(n)
    }
}

function qg(e, t) {
    var n = Zn(t.value),
        r = Zn(t.defaultValue);
    n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), r != null && (e.defaultValue = "" + r)
}

function vh(e) {
    var t = e.textContent;
    t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t)
}

function Zg(e) {
    switch (e) {
        case "svg":
            return "http://www.w3.org/2000/svg";
        case "math":
            return "http://www.w3.org/1998/Math/MathML";
        default:
            return "http://www.w3.org/1999/xhtml"
    }
}

function Bu(e, t) {
    return e == null || e === "http://www.w3.org/1999/xhtml" ? Zg(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e
}
var ws, Jg = function(e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, r, o) {
        MSApp.execUnsafeLocalFunction(function() {
            return e(t, n, r, o)
        })
    } : e
}(function(e, t) {
    if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
    else {
        for (ws = ws || document.createElement("div"), ws.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = ws.firstChild; e.firstChild;) e.removeChild(e.firstChild);
        for (; t.firstChild;) e.appendChild(t.firstChild)
    }
});

function Ri(e, t) {
    if (t) {
        var n = e.firstChild;
        if (n && n === e.lastChild && n.nodeType === 3) {
            n.nodeValue = t;
            return
        }
    }
    e.textContent = t
}
var hi = {
        animationIterationCount: !0,
        aspectRatio: !0,
        borderImageOutset: !0,
        borderImageSlice: !0,
        borderImageWidth: !0,
        boxFlex: !0,
        boxFlexGroup: !0,
        boxOrdinalGroup: !0,
        columnCount: !0,
        columns: !0,
        flex: !0,
        flexGrow: !0,
        flexPositive: !0,
        flexShrink: !0,
        flexNegative: !0,
        flexOrder: !0,
        gridArea: !0,
        gridRow: !0,
        gridRowEnd: !0,
        gridRowSpan: !0,
        gridRowStart: !0,
        gridColumn: !0,
        gridColumnEnd: !0,
        gridColumnSpan: !0,
        gridColumnStart: !0,
        fontWeight: !0,
        lineClamp: !0,
        lineHeight: !0,
        opacity: !0,
        order: !0,
        orphans: !0,
        tabSize: !0,
        widows: !0,
        zIndex: !0,
        zoom: !0,
        fillOpacity: !0,
        floodOpacity: !0,
        stopOpacity: !0,
        strokeDasharray: !0,
        strokeDashoffset: !0,
        strokeMiterlimit: !0,
        strokeOpacity: !0,
        strokeWidth: !0
    },
    Xx = ["Webkit", "ms", "Moz", "O"];
Object.keys(hi).forEach(function(e) {
    Xx.forEach(function(t) {
        t = t + e.charAt(0).toUpperCase() + e.substring(1), hi[t] = hi[e]
    })
});

function ey(e, t, n) {
    return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || hi.hasOwnProperty(e) && hi[e] ? ("" + t).trim() : t + "px"
}

function ty(e, t) {
    e = e.style;
    for (var n in t)
        if (t.hasOwnProperty(n)) {
            var r = n.indexOf("--") === 0,
                o = ey(n, t[n], r);
            n === "float" && (n = "cssFloat"), r ? e.setProperty(n, o) : e[n] = o
        }
}
var qx = pe({
    menuitem: !0
}, {
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0
});

function Uu(e, t) {
    if (t) {
        if (qx[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(L(137, e));
        if (t.dangerouslySetInnerHTML != null) {
            if (t.children != null) throw Error(L(60));
            if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(L(61))
        }
        if (t.style != null && typeof t.style != "object") throw Error(L(62))
    }
}

function Wu(e, t) {
    if (e.indexOf("-") === -1) return typeof t.is == "string";
    switch (e) {
        case "annotation-xml":
        case "color-profile":
        case "font-face":
        case "font-face-src":
        case "font-face-uri":
        case "font-face-format":
        case "font-face-name":
        case "missing-glyph":
            return !1;
        default:
            return !0
    }
}
var Hu = null;

function Td(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e
}
var Ku = null,
    fo = null,
    ho = null;

function wh(e) {
    if (e = rs(e)) {
        if (typeof Ku != "function") throw Error(L(280));
        var t = e.stateNode;
        t && (t = rl(t), Ku(e.stateNode, e.type, t))
    }
}

function ny(e) {
    fo ? ho ? ho.push(e) : ho = [e] : fo = e
}

function ry() {
    if (fo) {
        var e = fo,
            t = ho;
        if (ho = fo = null, wh(e), t)
            for (e = 0; e < t.length; e++) wh(t[e])
    }
}

function oy(e, t) {
    return e(t)
}

function iy() {}
var Bl = !1;

function sy(e, t, n) {
    if (Bl) return e(t, n);
    Bl = !0;
    try {
        return oy(e, t, n)
    } finally {
        Bl = !1, (fo !== null || ho !== null) && (iy(), ry())
    }
}

function Ai(e, t) {
    var n = e.stateNode;
    if (n === null) return null;
    var r = rl(n);
    if (r === null) return null;
    n = r[t];
    e: switch (t) {
        case "onClick":
        case "onClickCapture":
        case "onDoubleClick":
        case "onDoubleClickCapture":
        case "onMouseDown":
        case "onMouseDownCapture":
        case "onMouseMove":
        case "onMouseMoveCapture":
        case "onMouseUp":
        case "onMouseUpCapture":
        case "onMouseEnter":
            (r = !r.disabled) || (e = e.type, r = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !r;
            break e;
        default:
            e = !1
    }
    if (e) return null;
    if (n && typeof n != "function") throw Error(L(231, t, typeof n));
    return n
}
var Gu = !1;
if (fn) try {
    var Zo = {};
    Object.defineProperty(Zo, "passive", {
        get: function() {
            Gu = !0
        }
    }), window.addEventListener("test", Zo, Zo), window.removeEventListener("test", Zo, Zo)
} catch {
    Gu = !1
}

function Zx(e, t, n, r, o, i, s, a, l) {
    var u = Array.prototype.slice.call(arguments, 3);
    try {
        t.apply(n, u)
    } catch (c) {
        this.onError(c)
    }
}
var pi = !1,
    ha = null,
    pa = !1,
    Qu = null,
    Jx = {
        onError: function(e) {
            pi = !0, ha = e
        }
    };

function eS(e, t, n, r, o, i, s, a, l) {
    pi = !1, ha = null, Zx.apply(Jx, arguments)
}

function tS(e, t, n, r, o, i, s, a, l) {
    if (eS.apply(this, arguments), pi) {
        if (pi) {
            var u = ha;
            pi = !1, ha = null
        } else throw Error(L(198));
        pa || (pa = !0, Qu = u)
    }
}

function Fr(e) {
    var t = e,
        n = e;
    if (e.alternate)
        for (; t.return;) t = t.return;
    else {
        e = t;
        do t = e, t.flags & 4098 && (n = t.return), e = t.return; while (e)
    }
    return t.tag === 3 ? n : null
}

function ay(e) {
    if (e.tag === 13) {
        var t = e.memoizedState;
        if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated
    }
    return null
}

function xh(e) {
    if (Fr(e) !== e) throw Error(L(188))
}

function nS(e) {
    var t = e.alternate;
    if (!t) {
        if (t = Fr(e), t === null) throw Error(L(188));
        return t !== e ? null : e
    }
    for (var n = e, r = t;;) {
        var o = n.return;
        if (o === null) break;
        var i = o.alternate;
        if (i === null) {
            if (r = o.return, r !== null) {
                n = r;
                continue
            }
            break
        }
        if (o.child === i.child) {
            for (i = o.child; i;) {
                if (i === n) return xh(o), e;
                if (i === r) return xh(o), t;
                i = i.sibling
            }
            throw Error(L(188))
        }
        if (n.return !== r.return) n = o, r = i;
        else {
            for (var s = !1, a = o.child; a;) {
                if (a === n) {
                    s = !0, n = o, r = i;
                    break
                }
                if (a === r) {
                    s = !0, r = o, n = i;
                    break
                }
                a = a.sibling
            }
            if (!s) {
                for (a = i.child; a;) {
                    if (a === n) {
                        s = !0, n = i, r = o;
                        break
                    }
                    if (a === r) {
                        s = !0, r = i, n = o;
                        break
                    }
                    a = a.sibling
                }
                if (!s) throw Error(L(189))
            }
        }
        if (n.alternate !== r) throw Error(L(190))
    }
    if (n.tag !== 3) throw Error(L(188));
    return n.stateNode.current === n ? e : t
}

function ly(e) {
    return e = nS(e), e !== null ? uy(e) : null
}

function uy(e) {
    if (e.tag === 5 || e.tag === 6) return e;
    for (e = e.child; e !== null;) {
        var t = uy(e);
        if (t !== null) return t;
        e = e.sibling
    }
    return null
}
var cy = at.unstable_scheduleCallback,
    Sh = at.unstable_cancelCallback,
    rS = at.unstable_shouldYield,
    oS = at.unstable_requestPaint,
    ye = at.unstable_now,
    iS = at.unstable_getCurrentPriorityLevel,
    Pd = at.unstable_ImmediatePriority,
    dy = at.unstable_UserBlockingPriority,
    ma = at.unstable_NormalPriority,
    sS = at.unstable_LowPriority,
    fy = at.unstable_IdlePriority,
    Ja = null,
    Yt = null;

function aS(e) {
    if (Yt && typeof Yt.onCommitFiberRoot == "function") try {
        Yt.onCommitFiberRoot(Ja, e, void 0, (e.current.flags & 128) === 128)
    } catch {}
}
var Nt = Math.clz32 ? Math.clz32 : cS,
    lS = Math.log,
    uS = Math.LN2;

function cS(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (lS(e) / uS | 0) | 0
}
var xs = 64,
    Ss = 4194304;

function ci(e) {
    switch (e & -e) {
        case 1:
            return 1;
        case 2:
            return 2;
        case 4:
            return 4;
        case 8:
            return 8;
        case 16:
            return 16;
        case 32:
            return 32;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
            return e & 4194240;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
            return e & 130023424;
        case 134217728:
            return 134217728;
        case 268435456:
            return 268435456;
        case 536870912:
            return 536870912;
        case 1073741824:
            return 1073741824;
        default:
            return e
    }
}

function ga(e, t) {
    var n = e.pendingLanes;
    if (n === 0) return 0;
    var r = 0,
        o = e.suspendedLanes,
        i = e.pingedLanes,
        s = n & 268435455;
    if (s !== 0) {
        var a = s & ~o;
        a !== 0 ? r = ci(a) : (i &= s, i !== 0 && (r = ci(i)))
    } else s = n & ~o, s !== 0 ? r = ci(s) : i !== 0 && (r = ci(i));
    if (r === 0) return 0;
    if (t !== 0 && t !== r && !(t & o) && (o = r & -r, i = t & -t, o >= i || o === 16 && (i & 4194240) !== 0)) return t;
    if (r & 4 && (r |= n & 16), t = e.entangledLanes, t !== 0)
        for (e = e.entanglements, t &= r; 0 < t;) n = 31 - Nt(t), o = 1 << n, r |= e[n], t &= ~o;
    return r
}

function dS(e, t) {
    switch (e) {
        case 1:
        case 2:
        case 4:
            return t + 250;
        case 8:
        case 16:
        case 32:
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
            return t + 5e3;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
            return -1;
        case 134217728:
        case 268435456:
        case 536870912:
        case 1073741824:
            return -1;
        default:
            return -1
    }
}

function fS(e, t) {
    for (var n = e.suspendedLanes, r = e.pingedLanes, o = e.expirationTimes, i = e.pendingLanes; 0 < i;) {
        var s = 31 - Nt(i),
            a = 1 << s,
            l = o[s];
        l === -1 ? (!(a & n) || a & r) && (o[s] = dS(a, t)) : l <= t && (e.expiredLanes |= a), i &= ~a
    }
}

function Yu(e) {
    return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
}

function hy() {
    var e = xs;
    return xs <<= 1, !(xs & 4194240) && (xs = 64), e
}

function Ul(e) {
    for (var t = [], n = 0; 31 > n; n++) t.push(e);
    return t
}

function ts(e, t, n) {
    e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - Nt(t), e[t] = n
}

function hS(e, t) {
    var n = e.pendingLanes & ~t;
    e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
    var r = e.eventTimes;
    for (e = e.expirationTimes; 0 < n;) {
        var o = 31 - Nt(n),
            i = 1 << o;
        t[o] = 0, r[o] = -1, e[o] = -1, n &= ~i
    }
}

function bd(e, t) {
    var n = e.entangledLanes |= t;
    for (e = e.entanglements; n;) {
        var r = 31 - Nt(n),
            o = 1 << r;
        o & t | e[r] & t && (e[r] |= t), n &= ~o
    }
}
var te = 0;

function py(e) {
    return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1
}
var my, kd, gy, yy, vy, Xu = !1,
    Es = [],
    Wn = null,
    Hn = null,
    Kn = null,
    Mi = new Map,
    Di = new Map,
    Nn = [],
    pS = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");

function Eh(e, t) {
    switch (e) {
        case "focusin":
        case "focusout":
            Wn = null;
            break;
        case "dragenter":
        case "dragleave":
            Hn = null;
            break;
        case "mouseover":
        case "mouseout":
            Kn = null;
            break;
        case "pointerover":
        case "pointerout":
            Mi.delete(t.pointerId);
            break;
        case "gotpointercapture":
        case "lostpointercapture":
            Di.delete(t.pointerId)
    }
}

function Jo(e, t, n, r, o, i) {
    return e === null || e.nativeEvent !== i ? (e = {
        blockedOn: t,
        domEventName: n,
        eventSystemFlags: r,
        nativeEvent: i,
        targetContainers: [o]
    }, t !== null && (t = rs(t), t !== null && kd(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, o !== null && t.indexOf(o) === -1 && t.push(o), e)
}

function mS(e, t, n, r, o) {
    switch (t) {
        case "focusin":
            return Wn = Jo(Wn, e, t, n, r, o), !0;
        case "dragenter":
            return Hn = Jo(Hn, e, t, n, r, o), !0;
        case "mouseover":
            return Kn = Jo(Kn, e, t, n, r, o), !0;
        case "pointerover":
            var i = o.pointerId;
            return Mi.set(i, Jo(Mi.get(i) || null, e, t, n, r, o)), !0;
        case "gotpointercapture":
            return i = o.pointerId, Di.set(i, Jo(Di.get(i) || null, e, t, n, r, o)), !0
    }
    return !1
}

function wy(e) {
    var t = yr(e.target);
    if (t !== null) {
        var n = Fr(t);
        if (n !== null) {
            if (t = n.tag, t === 13) {
                if (t = ay(n), t !== null) {
                    e.blockedOn = t, vy(e.priority, function() {
                        gy(n)
                    });
                    return
                }
            } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
                e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
                return
            }
        }
    }
    e.blockedOn = null
}

function Hs(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length;) {
        var n = qu(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
        if (n === null) {
            n = e.nativeEvent;
            var r = new n.constructor(n.type, n);
            Hu = r, n.target.dispatchEvent(r), Hu = null
        } else return t = rs(n), t !== null && kd(t), e.blockedOn = n, !1;
        t.shift()
    }
    return !0
}

function Ch(e, t, n) {
    Hs(e) && n.delete(t)
}

function gS() {
    Xu = !1, Wn !== null && Hs(Wn) && (Wn = null), Hn !== null && Hs(Hn) && (Hn = null), Kn !== null && Hs(Kn) && (Kn = null), Mi.forEach(Ch), Di.forEach(Ch)
}

function ei(e, t) {
    e.blockedOn === t && (e.blockedOn = null, Xu || (Xu = !0, at.unstable_scheduleCallback(at.unstable_NormalPriority, gS)))
}

function Li(e) {
    function t(o) {
        return ei(o, e)
    }
    if (0 < Es.length) {
        ei(Es[0], e);
        for (var n = 1; n < Es.length; n++) {
            var r = Es[n];
            r.blockedOn === e && (r.blockedOn = null)
        }
    }
    for (Wn !== null && ei(Wn, e), Hn !== null && ei(Hn, e), Kn !== null && ei(Kn, e), Mi.forEach(t), Di.forEach(t), n = 0; n < Nn.length; n++) r = Nn[n], r.blockedOn === e && (r.blockedOn = null);
    for (; 0 < Nn.length && (n = Nn[0], n.blockedOn === null);) wy(n), n.blockedOn === null && Nn.shift()
}
var po = vn.ReactCurrentBatchConfig,
    ya = !0;

function yS(e, t, n, r) {
    var o = te,
        i = po.transition;
    po.transition = null;
    try {
        te = 1, Rd(e, t, n, r)
    } finally {
        te = o, po.transition = i
    }
}

function vS(e, t, n, r) {
    var o = te,
        i = po.transition;
    po.transition = null;
    try {
        te = 4, Rd(e, t, n, r)
    } finally {
        te = o, po.transition = i
    }
}

function Rd(e, t, n, r) {
    if (ya) {
        var o = qu(e, t, n, r);
        if (o === null) Jl(e, t, r, va, n), Eh(e, r);
        else if (mS(o, e, t, n, r)) r.stopPropagation();
        else if (Eh(e, r), t & 4 && -1 < pS.indexOf(e)) {
            for (; o !== null;) {
                var i = rs(o);
                if (i !== null && my(i), i = qu(e, t, n, r), i === null && Jl(e, t, r, va, n), i === o) break;
                o = i
            }
            o !== null && r.stopPropagation()
        } else Jl(e, t, r, null, n)
    }
}
var va = null;

function qu(e, t, n, r) {
    if (va = null, e = Td(r), e = yr(e), e !== null)
        if (t = Fr(e), t === null) e = null;
        else if (n = t.tag, n === 13) {
        if (e = ay(t), e !== null) return e;
        e = null
    } else if (n === 3) {
        if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
        e = null
    } else t !== e && (e = null);
    return va = e, null
}

function xy(e) {
    switch (e) {
        case "cancel":
        case "click":
        case "close":
        case "contextmenu":
        case "copy":
        case "cut":
        case "auxclick":
        case "dblclick":
        case "dragend":
        case "dragstart":
        case "drop":
        case "focusin":
        case "focusout":
        case "input":
        case "invalid":
        case "keydown":
        case "keypress":
        case "keyup":
        case "mousedown":
        case "mouseup":
        case "paste":
        case "pause":
        case "play":
        case "pointercancel":
        case "pointerdown":
        case "pointerup":
        case "ratechange":
        case "reset":
        case "resize":
        case "seeked":
        case "submit":
        case "touchcancel":
        case "touchend":
        case "touchstart":
        case "volumechange":
        case "change":
        case "selectionchange":
        case "textInput":
        case "compositionstart":
        case "compositionend":
        case "compositionupdate":
        case "beforeblur":
        case "afterblur":
        case "beforeinput":
        case "blur":
        case "fullscreenchange":
        case "focus":
        case "hashchange":
        case "popstate":
        case "select":
        case "selectstart":
            return 1;
        case "drag":
        case "dragenter":
        case "dragexit":
        case "dragleave":
        case "dragover":
        case "mousemove":
        case "mouseout":
        case "mouseover":
        case "pointermove":
        case "pointerout":
        case "pointerover":
        case "scroll":
        case "toggle":
        case "touchmove":
        case "wheel":
        case "mouseenter":
        case "mouseleave":
        case "pointerenter":
        case "pointerleave":
            return 4;
        case "message":
            switch (iS()) {
                case Pd:
                    return 1;
                case dy:
                    return 4;
                case ma:
                case sS:
                    return 16;
                case fy:
                    return 536870912;
                default:
                    return 16
            }
        default:
            return 16
    }
}
var zn = null,
    Ad = null,
    Ks = null;

function Sy() {
    if (Ks) return Ks;
    var e, t = Ad,
        n = t.length,
        r, o = "value" in zn ? zn.value : zn.textContent,
        i = o.length;
    for (e = 0; e < n && t[e] === o[e]; e++);
    var s = n - e;
    for (r = 1; r <= s && t[n - r] === o[i - r]; r++);
    return Ks = o.slice(e, 1 < r ? 1 - r : void 0)
}

function Gs(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0
}

function Cs() {
    return !0
}

function Th() {
    return !1
}

function ut(e) {
    function t(n, r, o, i, s) {
        this._reactName = n, this._targetInst = o, this.type = r, this.nativeEvent = i, this.target = s, this.currentTarget = null;
        for (var a in e) e.hasOwnProperty(a) && (n = e[a], this[a] = n ? n(i) : i[a]);
        return this.isDefaultPrevented = (i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === !1) ? Cs : Th, this.isPropagationStopped = Th, this
    }
    return pe(t.prototype, {
        preventDefault: function() {
            this.defaultPrevented = !0;
            var n = this.nativeEvent;
            n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = Cs)
        },
        stopPropagation: function() {
            var n = this.nativeEvent;
            n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = Cs)
        },
        persist: function() {},
        isPersistent: Cs
    }), t
}
var $o = {
        eventPhase: 0,
        bubbles: 0,
        cancelable: 0,
        timeStamp: function(e) {
            return e.timeStamp || Date.now()
        },
        defaultPrevented: 0,
        isTrusted: 0
    },
    Md = ut($o),
    ns = pe({}, $o, {
        view: 0,
        detail: 0
    }),
    wS = ut(ns),
    Wl, Hl, ti, el = pe({}, ns, {
        screenX: 0,
        screenY: 0,
        clientX: 0,
        clientY: 0,
        pageX: 0,
        pageY: 0,
        ctrlKey: 0,
        shiftKey: 0,
        altKey: 0,
        metaKey: 0,
        getModifierState: Dd,
        button: 0,
        buttons: 0,
        relatedTarget: function(e) {
            return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget
        },
        movementX: function(e) {
            return "movementX" in e ? e.movementX : (e !== ti && (ti && e.type === "mousemove" ? (Wl = e.screenX - ti.screenX, Hl = e.screenY - ti.screenY) : Hl = Wl = 0, ti = e), Wl)
        },
        movementY: function(e) {
            return "movementY" in e ? e.movementY : Hl
        }
    }),
    Ph = ut(el),
    xS = pe({}, el, {
        dataTransfer: 0
    }),
    SS = ut(xS),
    ES = pe({}, ns, {
        relatedTarget: 0
    }),
    Kl = ut(ES),
    CS = pe({}, $o, {
        animationName: 0,
        elapsedTime: 0,
        pseudoElement: 0
    }),
    TS = ut(CS),
    PS = pe({}, $o, {
        clipboardData: function(e) {
            return "clipboardData" in e ? e.clipboardData : window.clipboardData
        }
    }),
    bS = ut(PS),
    kS = pe({}, $o, {
        data: 0
    }),
    bh = ut(kS),
    RS = {
        Esc: "Escape",
        Spacebar: " ",
        Left: "ArrowLeft",
        Up: "ArrowUp",
        Right: "ArrowRight",
        Down: "ArrowDown",
        Del: "Delete",
        Win: "OS",
        Menu: "ContextMenu",
        Apps: "ContextMenu",
        Scroll: "ScrollLock",
        MozPrintableKey: "Unidentified"
    },
    AS = {
        8: "Backspace",
        9: "Tab",
        12: "Clear",
        13: "Enter",
        16: "Shift",
        17: "Control",
        18: "Alt",
        19: "Pause",
        20: "CapsLock",
        27: "Escape",
        32: " ",
        33: "PageUp",
        34: "PageDown",
        35: "End",
        36: "Home",
        37: "ArrowLeft",
        38: "ArrowUp",
        39: "ArrowRight",
        40: "ArrowDown",
        45: "Insert",
        46: "Delete",
        112: "F1",
        113: "F2",
        114: "F3",
        115: "F4",
        116: "F5",
        117: "F6",
        118: "F7",
        119: "F8",
        120: "F9",
        121: "F10",
        122: "F11",
        123: "F12",
        144: "NumLock",
        145: "ScrollLock",
        224: "Meta"
    },
    MS = {
        Alt: "altKey",
        Control: "ctrlKey",
        Meta: "metaKey",
        Shift: "shiftKey"
    };

function DS(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = MS[e]) ? !!t[e] : !1
}

function Dd() {
    return DS
}
var LS = pe({}, ns, {
        key: function(e) {
            if (e.key) {
                var t = RS[e.key] || e.key;
                if (t !== "Unidentified") return t
            }
            return e.type === "keypress" ? (e = Gs(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? AS[e.keyCode] || "Unidentified" : ""
        },
        code: 0,
        location: 0,
        ctrlKey: 0,
        shiftKey: 0,
        altKey: 0,
        metaKey: 0,
        repeat: 0,
        locale: 0,
        getModifierState: Dd,
        charCode: function(e) {
            return e.type === "keypress" ? Gs(e) : 0
        },
        keyCode: function(e) {
            return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0
        },
        which: function(e) {
            return e.type === "keypress" ? Gs(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0
        }
    }),
    NS = ut(LS),
    OS = pe({}, el, {
        pointerId: 0,
        width: 0,
        height: 0,
        pressure: 0,
        tangentialPressure: 0,
        tiltX: 0,
        tiltY: 0,
        twist: 0,
        pointerType: 0,
        isPrimary: 0
    }),
    kh = ut(OS),
    IS = pe({}, ns, {
        touches: 0,
        targetTouches: 0,
        changedTouches: 0,
        altKey: 0,
        metaKey: 0,
        ctrlKey: 0,
        shiftKey: 0,
        getModifierState: Dd
    }),
    _S = ut(IS),
    VS = pe({}, $o, {
        propertyName: 0,
        elapsedTime: 0,
        pseudoElement: 0
    }),
    jS = ut(VS),
    FS = pe({}, el, {
        deltaX: function(e) {
            return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0
        },
        deltaY: function(e) {
            return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0
        },
        deltaZ: 0,
        deltaMode: 0
    }),
    zS = ut(FS),
    $S = [9, 13, 27, 32],
    Ld = fn && "CompositionEvent" in window,
    mi = null;
fn && "documentMode" in document && (mi = document.documentMode);
var BS = fn && "TextEvent" in window && !mi,
    Ey = fn && (!Ld || mi && 8 < mi && 11 >= mi),
    Rh = " ",
    Ah = !1;

function Cy(e, t) {
    switch (e) {
        case "keyup":
            return $S.indexOf(t.keyCode) !== -1;
        case "keydown":
            return t.keyCode !== 229;
        case "keypress":
        case "mousedown":
        case "focusout":
            return !0;
        default:
            return !1
    }
}

function Ty(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null
}
var qr = !1;

function US(e, t) {
    switch (e) {
        case "compositionend":
            return Ty(t);
        case "keypress":
            return t.which !== 32 ? null : (Ah = !0, Rh);
        case "textInput":
            return e = t.data, e === Rh && Ah ? null : e;
        default:
            return null
    }
}

function WS(e, t) {
    if (qr) return e === "compositionend" || !Ld && Cy(e, t) ? (e = Sy(), Ks = Ad = zn = null, qr = !1, e) : null;
    switch (e) {
        case "paste":
            return null;
        case "keypress":
            if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
                if (t.char && 1 < t.char.length) return t.char;
                if (t.which) return String.fromCharCode(t.which)
            }
            return null;
        case "compositionend":
            return Ey && t.locale !== "ko" ? null : t.data;
        default:
            return null
    }
}
var HS = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0
};

function Mh(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!HS[e.type] : t === "textarea"
}

function Py(e, t, n, r) {
    ny(r), t = wa(t, "onChange"), 0 < t.length && (n = new Md("onChange", "change", null, n, r), e.push({
        event: n,
        listeners: t
    }))
}
var gi = null,
    Ni = null;

function KS(e) {
    _y(e, 0)
}

function tl(e) {
    var t = eo(e);
    if (Yg(t)) return e
}

function GS(e, t) {
    if (e === "change") return t
}
var by = !1;
if (fn) {
    var Gl;
    if (fn) {
        var Ql = "oninput" in document;
        if (!Ql) {
            var Dh = document.createElement("div");
            Dh.setAttribute("oninput", "return;"), Ql = typeof Dh.oninput == "function"
        }
        Gl = Ql
    } else Gl = !1;
    by = Gl && (!document.documentMode || 9 < document.documentMode)
}

function Lh() {
    gi && (gi.detachEvent("onpropertychange", ky), Ni = gi = null)
}

function ky(e) {
    if (e.propertyName === "value" && tl(Ni)) {
        var t = [];
        Py(t, Ni, e, Td(e)), sy(KS, t)
    }
}

function QS(e, t, n) {
    e === "focusin" ? (Lh(), gi = t, Ni = n, gi.attachEvent("onpropertychange", ky)) : e === "focusout" && Lh()
}

function YS(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown") return tl(Ni)
}

function XS(e, t) {
    if (e === "click") return tl(t)
}

function qS(e, t) {
    if (e === "input" || e === "change") return tl(t)
}

function ZS(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t
}
var _t = typeof Object.is == "function" ? Object.is : ZS;

function Oi(e, t) {
    if (_t(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
    var n = Object.keys(e),
        r = Object.keys(t);
    if (n.length !== r.length) return !1;
    for (r = 0; r < n.length; r++) {
        var o = n[r];
        if (!Nu.call(t, o) || !_t(e[o], t[o])) return !1
    }
    return !0
}

function Nh(e) {
    for (; e && e.firstChild;) e = e.firstChild;
    return e
}

function Oh(e, t) {
    var n = Nh(e);
    e = 0;
    for (var r; n;) {
        if (n.nodeType === 3) {
            if (r = e + n.textContent.length, e <= t && r >= t) return {
                node: n,
                offset: t - e
            };
            e = r
        }
        e: {
            for (; n;) {
                if (n.nextSibling) {
                    n = n.nextSibling;
                    break e
                }
                n = n.parentNode
            }
            n = void 0
        }
        n = Nh(n)
    }
}

function Ry(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Ry(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1
}

function Ay() {
    for (var e = window, t = fa(); t instanceof e.HTMLIFrameElement;) {
        try {
            var n = typeof t.contentWindow.location.href == "string"
        } catch {
            n = !1
        }
        if (n) e = t.contentWindow;
        else break;
        t = fa(e.document)
    }
    return t
}

function Nd(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true")
}

function JS(e) {
    var t = Ay(),
        n = e.focusedElem,
        r = e.selectionRange;
    if (t !== n && n && n.ownerDocument && Ry(n.ownerDocument.documentElement, n)) {
        if (r !== null && Nd(n)) {
            if (t = r.start, e = r.end, e === void 0 && (e = t), "selectionStart" in n) n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
            else if (e = (t = n.ownerDocument || document) && t.defaultView || window, e.getSelection) {
                e = e.getSelection();
                var o = n.textContent.length,
                    i = Math.min(r.start, o);
                r = r.end === void 0 ? i : Math.min(r.end, o), !e.extend && i > r && (o = r, r = i, i = o), o = Oh(n, i);
                var s = Oh(n, r);
                o && s && (e.rangeCount !== 1 || e.anchorNode !== o.node || e.anchorOffset !== o.offset || e.focusNode !== s.node || e.focusOffset !== s.offset) && (t = t.createRange(), t.setStart(o.node, o.offset), e.removeAllRanges(), i > r ? (e.addRange(t), e.extend(s.node, s.offset)) : (t.setEnd(s.node, s.offset), e.addRange(t)))
            }
        }
        for (t = [], e = n; e = e.parentNode;) e.nodeType === 1 && t.push({
            element: e,
            left: e.scrollLeft,
            top: e.scrollTop
        });
        for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++) e = t[n], e.element.scrollLeft = e.left, e.element.scrollTop = e.top
    }
}
var eE = fn && "documentMode" in document && 11 >= document.documentMode,
    Zr = null,
    Zu = null,
    yi = null,
    Ju = !1;

function Ih(e, t, n) {
    var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    Ju || Zr == null || Zr !== fa(r) || (r = Zr, "selectionStart" in r && Nd(r) ? r = {
        start: r.selectionStart,
        end: r.selectionEnd
    } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = {
        anchorNode: r.anchorNode,
        anchorOffset: r.anchorOffset,
        focusNode: r.focusNode,
        focusOffset: r.focusOffset
    }), yi && Oi(yi, r) || (yi = r, r = wa(Zu, "onSelect"), 0 < r.length && (t = new Md("onSelect", "select", null, t, n), e.push({
        event: t,
        listeners: r
    }), t.target = Zr)))
}

function Ts(e, t) {
    var n = {};
    return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n
}
var Jr = {
        animationend: Ts("Animation", "AnimationEnd"),
        animationiteration: Ts("Animation", "AnimationIteration"),
        animationstart: Ts("Animation", "AnimationStart"),
        transitionend: Ts("Transition", "TransitionEnd")
    },
    Yl = {},
    My = {};
fn && (My = document.createElement("div").style, "AnimationEvent" in window || (delete Jr.animationend.animation, delete Jr.animationiteration.animation, delete Jr.animationstart.animation), "TransitionEvent" in window || delete Jr.transitionend.transition);

function nl(e) {
    if (Yl[e]) return Yl[e];
    if (!Jr[e]) return e;
    var t = Jr[e],
        n;
    for (n in t)
        if (t.hasOwnProperty(n) && n in My) return Yl[e] = t[n];
    return e
}
var Dy = nl("animationend"),
    Ly = nl("animationiteration"),
    Ny = nl("animationstart"),
    Oy = nl("transitionend"),
    Iy = new Map,
    _h = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");

function sr(e, t) {
    Iy.set(e, t), jr(t, [e])
}
for (var Xl = 0; Xl < _h.length; Xl++) {
    var ql = _h[Xl],
        tE = ql.toLowerCase(),
        nE = ql[0].toUpperCase() + ql.slice(1);
    sr(tE, "on" + nE)
}
sr(Dy, "onAnimationEnd");
sr(Ly, "onAnimationIteration");
sr(Ny, "onAnimationStart");
sr("dblclick", "onDoubleClick");
sr("focusin", "onFocus");
sr("focusout", "onBlur");
sr(Oy, "onTransitionEnd");
Ro("onMouseEnter", ["mouseout", "mouseover"]);
Ro("onMouseLeave", ["mouseout", "mouseover"]);
Ro("onPointerEnter", ["pointerout", "pointerover"]);
Ro("onPointerLeave", ["pointerout", "pointerover"]);
jr("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
jr("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
jr("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
jr("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
jr("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
jr("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var di = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),
    rE = new Set("cancel close invalid load scroll toggle".split(" ").concat(di));

function Vh(e, t, n) {
    var r = e.type || "unknown-event";
    e.currentTarget = n, tS(r, t, void 0, e), e.currentTarget = null
}

function _y(e, t) {
    t = (t & 4) !== 0;
    for (var n = 0; n < e.length; n++) {
        var r = e[n],
            o = r.event;
        r = r.listeners;
        e: {
            var i = void 0;
            if (t)
                for (var s = r.length - 1; 0 <= s; s--) {
                    var a = r[s],
                        l = a.instance,
                        u = a.currentTarget;
                    if (a = a.listener, l !== i && o.isPropagationStopped()) break e;
                    Vh(o, a, u), i = l
                } else
                    for (s = 0; s < r.length; s++) {
                        if (a = r[s], l = a.instance, u = a.currentTarget, a = a.listener, l !== i && o.isPropagationStopped()) break e;
                        Vh(o, a, u), i = l
                    }
        }
    }
    if (pa) throw e = Qu, pa = !1, Qu = null, e
}

function se(e, t) {
    var n = t[oc];
    n === void 0 && (n = t[oc] = new Set);
    var r = e + "__bubble";
    n.has(r) || (Vy(t, e, 2, !1), n.add(r))
}

function Zl(e, t, n) {
    var r = 0;
    t && (r |= 4), Vy(n, e, r, t)
}
var Ps = "_reactListening" + Math.random().toString(36).slice(2);

function Ii(e) {
    if (!e[Ps]) {
        e[Ps] = !0, Wg.forEach(function(n) {
            n !== "selectionchange" && (rE.has(n) || Zl(n, !1, e), Zl(n, !0, e))
        });
        var t = e.nodeType === 9 ? e : e.ownerDocument;
        t === null || t[Ps] || (t[Ps] = !0, Zl("selectionchange", !1, t))
    }
}

function Vy(e, t, n, r) {
    switch (xy(t)) {
        case 1:
            var o = yS;
            break;
        case 4:
            o = vS;
            break;
        default:
            o = Rd
    }
    n = o.bind(null, t, n, e), o = void 0, !Gu || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (o = !0), r ? o !== void 0 ? e.addEventListener(t, n, {
        capture: !0,
        passive: o
    }) : e.addEventListener(t, n, !0) : o !== void 0 ? e.addEventListener(t, n, {
        passive: o
    }) : e.addEventListener(t, n, !1)
}

function Jl(e, t, n, r, o) {
    var i = r;
    if (!(t & 1) && !(t & 2) && r !== null) e: for (;;) {
        if (r === null) return;
        var s = r.tag;
        if (s === 3 || s === 4) {
            var a = r.stateNode.containerInfo;
            if (a === o || a.nodeType === 8 && a.parentNode === o) break;
            if (s === 4)
                for (s = r.return; s !== null;) {
                    var l = s.tag;
                    if ((l === 3 || l === 4) && (l = s.stateNode.containerInfo, l === o || l.nodeType === 8 && l.parentNode === o)) return;
                    s = s.return
                }
            for (; a !== null;) {
                if (s = yr(a), s === null) return;
                if (l = s.tag, l === 5 || l === 6) {
                    r = i = s;
                    continue e
                }
                a = a.parentNode
            }
        }
        r = r.return
    }
    sy(function() {
        var u = i,
            c = Td(n),
            d = [];
        e: {
            var h = Iy.get(e);
            if (h !== void 0) {
                var f = Md,
                    v = e;
                switch (e) {
                    case "keypress":
                        if (Gs(n) === 0) break e;
                    case "keydown":
                    case "keyup":
                        f = NS;
                        break;
                    case "focusin":
                        v = "focus", f = Kl;
                        break;
                    case "focusout":
                        v = "blur", f = Kl;
                        break;
                    case "beforeblur":
                    case "afterblur":
                        f = Kl;
                        break;
                    case "click":
                        if (n.button === 2) break e;
                    case "auxclick":
                    case "dblclick":
                    case "mousedown":
                    case "mousemove":
                    case "mouseup":
                    case "mouseout":
                    case "mouseover":
                    case "contextmenu":
                        f = Ph;
                        break;
                    case "drag":
                    case "dragend":
                    case "dragenter":
                    case "dragexit":
                    case "dragleave":
                    case "dragover":
                    case "dragstart":
                    case "drop":
                        f = SS;
                        break;
                    case "touchcancel":
                    case "touchend":
                    case "touchmove":
                    case "touchstart":
                        f = _S;
                        break;
                    case Dy:
                    case Ly:
                    case Ny:
                        f = TS;
                        break;
                    case Oy:
                        f = jS;
                        break;
                    case "scroll":
                        f = wS;
                        break;
                    case "wheel":
                        f = zS;
                        break;
                    case "copy":
                    case "cut":
                    case "paste":
                        f = bS;
                        break;
                    case "gotpointercapture":
                    case "lostpointercapture":
                    case "pointercancel":
                    case "pointerdown":
                    case "pointermove":
                    case "pointerout":
                    case "pointerover":
                    case "pointerup":
                        f = kh
                }
                var g = (t & 4) !== 0,
                    w = !g && e === "scroll",
                    m = g ? h !== null ? h + "Capture" : null : h;
                g = [];
                for (var p = u, y; p !== null;) {
                    y = p;
                    var S = y.stateNode;
                    if (y.tag === 5 && S !== null && (y = S, m !== null && (S = Ai(p, m), S != null && g.push(_i(p, S, y)))), w) break;
                    p = p.return
                }
                0 < g.length && (h = new f(h, v, null, n, c), d.push({
                    event: h,
                    listeners: g
                }))
            }
        }
        if (!(t & 7)) {
            e: {
                if (h = e === "mouseover" || e === "pointerover", f = e === "mouseout" || e === "pointerout", h && n !== Hu && (v = n.relatedTarget || n.fromElement) && (yr(v) || v[hn])) break e;
                if ((f || h) && (h = c.window === c ? c : (h = c.ownerDocument) ? h.defaultView || h.parentWindow : window, f ? (v = n.relatedTarget || n.toElement, f = u, v = v ? yr(v) : null, v !== null && (w = Fr(v), v !== w || v.tag !== 5 && v.tag !== 6) && (v = null)) : (f = null, v = u), f !== v)) {
                    if (g = Ph, S = "onMouseLeave", m = "onMouseEnter", p = "mouse", (e === "pointerout" || e === "pointerover") && (g = kh, S = "onPointerLeave", m = "onPointerEnter", p = "pointer"), w = f == null ? h : eo(f), y = v == null ? h : eo(v), h = new g(S, p + "leave", f, n, c), h.target = w, h.relatedTarget = y, S = null, yr(c) === u && (g = new g(m, p + "enter", v, n, c), g.target = y, g.relatedTarget = w, S = g), w = S, f && v) t: {
                        for (g = f, m = v, p = 0, y = g; y; y = Gr(y)) p++;
                        for (y = 0, S = m; S; S = Gr(S)) y++;
                        for (; 0 < p - y;) g = Gr(g),
                        p--;
                        for (; 0 < y - p;) m = Gr(m),
                        y--;
                        for (; p--;) {
                            if (g === m || m !== null && g === m.alternate) break t;
                            g = Gr(g), m = Gr(m)
                        }
                        g = null
                    }
                    else g = null;
                    f !== null && jh(d, h, f, g, !1), v !== null && w !== null && jh(d, w, v, g, !0)
                }
            }
            e: {
                if (h = u ? eo(u) : window, f = h.nodeName && h.nodeName.toLowerCase(), f === "select" || f === "input" && h.type === "file") var E = GS;
                else if (Mh(h))
                    if (by) E = qS;
                    else {
                        E = YS;
                        var C = QS
                    }
                else(f = h.nodeName) && f.toLowerCase() === "input" && (h.type === "checkbox" || h.type === "radio") && (E = XS);
                if (E && (E = E(e, u))) {
                    Py(d, E, n, c);
                    break e
                }
                C && C(e, h, u),
                e === "focusout" && (C = h._wrapperState) && C.controlled && h.type === "number" && zu(h, "number", h.value)
            }
            switch (C = u ? eo(u) : window, e) {
                case "focusin":
                    (Mh(C) || C.contentEditable === "true") && (Zr = C, Zu = u, yi = null);
                    break;
                case "focusout":
                    yi = Zu = Zr = null;
                    break;
                case "mousedown":
                    Ju = !0;
                    break;
                case "contextmenu":
                case "mouseup":
                case "dragend":
                    Ju = !1, Ih(d, n, c);
                    break;
                case "selectionchange":
                    if (eE) break;
                case "keydown":
                case "keyup":
                    Ih(d, n, c)
            }
            var T;
            if (Ld) e: {
                switch (e) {
                    case "compositionstart":
                        var b = "onCompositionStart";
                        break e;
                    case "compositionend":
                        b = "onCompositionEnd";
                        break e;
                    case "compositionupdate":
                        b = "onCompositionUpdate";
                        break e
                }
                b = void 0
            }
            else qr ? Cy(e, n) && (b = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (b = "onCompositionStart");b && (Ey && n.locale !== "ko" && (qr || b !== "onCompositionStart" ? b === "onCompositionEnd" && qr && (T = Sy()) : (zn = c, Ad = "value" in zn ? zn.value : zn.textContent, qr = !0)), C = wa(u, b), 0 < C.length && (b = new bh(b, e, null, n, c), d.push({
                event: b,
                listeners: C
            }), T ? b.data = T : (T = Ty(n), T !== null && (b.data = T)))),
            (T = BS ? US(e, n) : WS(e, n)) && (u = wa(u, "onBeforeInput"), 0 < u.length && (c = new bh("onBeforeInput", "beforeinput", null, n, c), d.push({
                event: c,
                listeners: u
            }), c.data = T))
        }
        _y(d, t)
    })
}

function _i(e, t, n) {
    return {
        instance: e,
        listener: t,
        currentTarget: n
    }
}

function wa(e, t) {
    for (var n = t + "Capture", r = []; e !== null;) {
        var o = e,
            i = o.stateNode;
        o.tag === 5 && i !== null && (o = i, i = Ai(e, n), i != null && r.unshift(_i(e, i, o)), i = Ai(e, t), i != null && r.push(_i(e, i, o))), e = e.return
    }
    return r
}

function Gr(e) {
    if (e === null) return null;
    do e = e.return; while (e && e.tag !== 5);
    return e || null
}

function jh(e, t, n, r, o) {
    for (var i = t._reactName, s = []; n !== null && n !== r;) {
        var a = n,
            l = a.alternate,
            u = a.stateNode;
        if (l !== null && l === r) break;
        a.tag === 5 && u !== null && (a = u, o ? (l = Ai(n, i), l != null && s.unshift(_i(n, l, a))) : o || (l = Ai(n, i), l != null && s.push(_i(n, l, a)))), n = n.return
    }
    s.length !== 0 && e.push({
        event: t,
        listeners: s
    })
}
var oE = /\r\n?/g,
    iE = /\u0000|\uFFFD/g;

function Fh(e) {
    return (typeof e == "string" ? e : "" + e).replace(oE, `
`).replace(iE, "")
}

function bs(e, t, n) {
    if (t = Fh(t), Fh(e) !== t && n) throw Error(L(425))
}

function xa() {}
var ec = null,
    tc = null;

function nc(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null
}
var rc = typeof setTimeout == "function" ? setTimeout : void 0,
    sE = typeof clearTimeout == "function" ? clearTimeout : void 0,
    zh = typeof Promise == "function" ? Promise : void 0,
    aE = typeof queueMicrotask == "function" ? queueMicrotask : typeof zh < "u" ? function(e) {
        return zh.resolve(null).then(e).catch(lE)
    } : rc;

function lE(e) {
    setTimeout(function() {
        throw e
    })
}

function eu(e, t) {
    var n = t,
        r = 0;
    do {
        var o = n.nextSibling;
        if (e.removeChild(n), o && o.nodeType === 8)
            if (n = o.data, n === "/$") {
                if (r === 0) {
                    e.removeChild(o), Li(t);
                    return
                }
                r--
            } else n !== "$" && n !== "$?" && n !== "$!" || r++;
        n = o
    } while (n);
    Li(t)
}

function Gn(e) {
    for (; e != null; e = e.nextSibling) {
        var t = e.nodeType;
        if (t === 1 || t === 3) break;
        if (t === 8) {
            if (t = e.data, t === "$" || t === "$!" || t === "$?") break;
            if (t === "/$") return null
        }
    }
    return e
}

function $h(e) {
    e = e.previousSibling;
    for (var t = 0; e;) {
        if (e.nodeType === 8) {
            var n = e.data;
            if (n === "$" || n === "$!" || n === "$?") {
                if (t === 0) return e;
                t--
            } else n === "/$" && t++
        }
        e = e.previousSibling
    }
    return null
}
var Bo = Math.random().toString(36).slice(2),
    Gt = "__reactFiber$" + Bo,
    Vi = "__reactProps$" + Bo,
    hn = "__reactContainer$" + Bo,
    oc = "__reactEvents$" + Bo,
    uE = "__reactListeners$" + Bo,
    cE = "__reactHandles$" + Bo;

function yr(e) {
    var t = e[Gt];
    if (t) return t;
    for (var n = e.parentNode; n;) {
        if (t = n[hn] || n[Gt]) {
            if (n = t.alternate, t.child !== null || n !== null && n.child !== null)
                for (e = $h(e); e !== null;) {
                    if (n = e[Gt]) return n;
                    e = $h(e)
                }
            return t
        }
        e = n, n = e.parentNode
    }
    return null
}

function rs(e) {
    return e = e[Gt] || e[hn], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e
}

function eo(e) {
    if (e.tag === 5 || e.tag === 6) return e.stateNode;
    throw Error(L(33))
}

function rl(e) {
    return e[Vi] || null
}
var ic = [],
    to = -1;

function ar(e) {
    return {
        current: e
    }
}

function le(e) {
    0 > to || (e.current = ic[to], ic[to] = null, to--)
}

function oe(e, t) {
    to++, ic[to] = e.current, e.current = t
}
var Jn = {},
    je = ar(Jn),
    Xe = ar(!1),
    Lr = Jn;

function Ao(e, t) {
    var n = e.type.contextTypes;
    if (!n) return Jn;
    var r = e.stateNode;
    if (r && r.__reactInternalMemoizedUnmaskedChildContext === t) return r.__reactInternalMemoizedMaskedChildContext;
    var o = {},
        i;
    for (i in n) o[i] = t[i];
    return r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = o), o
}

function qe(e) {
    return e = e.childContextTypes, e != null
}

function Sa() {
    le(Xe), le(je)
}

function Bh(e, t, n) {
    if (je.current !== Jn) throw Error(L(168));
    oe(je, t), oe(Xe, n)
}

function jy(e, t, n) {
    var r = e.stateNode;
    if (t = t.childContextTypes, typeof r.getChildContext != "function") return n;
    r = r.getChildContext();
    for (var o in r)
        if (!(o in t)) throw Error(L(108, Qx(e) || "Unknown", o));
    return pe({}, n, r)
}

function Ea(e) {
    return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || Jn, Lr = je.current, oe(je, e), oe(Xe, Xe.current), !0
}

function Uh(e, t, n) {
    var r = e.stateNode;
    if (!r) throw Error(L(169));
    n ? (e = jy(e, t, Lr), r.__reactInternalMemoizedMergedChildContext = e, le(Xe), le(je), oe(je, e)) : le(Xe), oe(Xe, n)
}
var an = null,
    ol = !1,
    tu = !1;

function Fy(e) {
    an === null ? an = [e] : an.push(e)
}

function dE(e) {
    ol = !0, Fy(e)
}

function lr() {
    if (!tu && an !== null) {
        tu = !0;
        var e = 0,
            t = te;
        try {
            var n = an;
            for (te = 1; e < n.length; e++) {
                var r = n[e];
                do r = r(!0); while (r !== null)
            }
            an = null, ol = !1
        } catch (o) {
            throw an !== null && (an = an.slice(e + 1)), cy(Pd, lr), o
        } finally {
            te = t, tu = !1
        }
    }
    return null
}
var no = [],
    ro = 0,
    Ca = null,
    Ta = 0,
    ft = [],
    ht = 0,
    Nr = null,
    un = 1,
    cn = "";

function pr(e, t) {
    no[ro++] = Ta, no[ro++] = Ca, Ca = e, Ta = t
}

function zy(e, t, n) {
    ft[ht++] = un, ft[ht++] = cn, ft[ht++] = Nr, Nr = e;
    var r = un;
    e = cn;
    var o = 32 - Nt(r) - 1;
    r &= ~(1 << o), n += 1;
    var i = 32 - Nt(t) + o;
    if (30 < i) {
        var s = o - o % 5;
        i = (r & (1 << s) - 1).toString(32), r >>= s, o -= s, un = 1 << 32 - Nt(t) + o | n << o | r, cn = i + e
    } else un = 1 << i | n << o | r, cn = e
}

function Od(e) {
    e.return !== null && (pr(e, 1), zy(e, 1, 0))
}

function Id(e) {
    for (; e === Ca;) Ca = no[--ro], no[ro] = null, Ta = no[--ro], no[ro] = null;
    for (; e === Nr;) Nr = ft[--ht], ft[ht] = null, cn = ft[--ht], ft[ht] = null, un = ft[--ht], ft[ht] = null
}
var it = null,
    ot = null,
    ce = !1,
    Lt = null;

function $y(e, t) {
    var n = pt(5, null, null, 0);
    n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n)
}

function Wh(e, t) {
    switch (e.tag) {
        case 5:
            var n = e.type;
            return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, it = e, ot = Gn(t.firstChild), !0) : !1;
        case 6:
            return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, it = e, ot = null, !0) : !1;
        case 13:
            return t = t.nodeType !== 8 ? null : t, t !== null ? (n = Nr !== null ? {
                id: un,
                overflow: cn
            } : null, e.memoizedState = {
                dehydrated: t,
                treeContext: n,
                retryLane: 1073741824
            }, n = pt(18, null, null, 0), n.stateNode = t, n.return = e, e.child = n, it = e, ot = null, !0) : !1;
        default:
            return !1
    }
}

function sc(e) {
    return (e.mode & 1) !== 0 && (e.flags & 128) === 0
}

function ac(e) {
    if (ce) {
        var t = ot;
        if (t) {
            var n = t;
            if (!Wh(e, t)) {
                if (sc(e)) throw Error(L(418));
                t = Gn(n.nextSibling);
                var r = it;
                t && Wh(e, t) ? $y(r, n) : (e.flags = e.flags & -4097 | 2, ce = !1, it = e)
            }
        } else {
            if (sc(e)) throw Error(L(418));
            e.flags = e.flags & -4097 | 2, ce = !1, it = e
        }
    }
}

function Hh(e) {
    for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13;) e = e.return;
    it = e
}

function ks(e) {
    if (e !== it) return !1;
    if (!ce) return Hh(e), ce = !0, !1;
    var t;
    if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !nc(e.type, e.memoizedProps)), t && (t = ot)) {
        if (sc(e)) throw By(), Error(L(418));
        for (; t;) $y(e, t), t = Gn(t.nextSibling)
    }
    if (Hh(e), e.tag === 13) {
        if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(L(317));
        e: {
            for (e = e.nextSibling, t = 0; e;) {
                if (e.nodeType === 8) {
                    var n = e.data;
                    if (n === "/$") {
                        if (t === 0) {
                            ot = Gn(e.nextSibling);
                            break e
                        }
                        t--
                    } else n !== "$" && n !== "$!" && n !== "$?" || t++
                }
                e = e.nextSibling
            }
            ot = null
        }
    } else ot = it ? Gn(e.stateNode.nextSibling) : null;
    return !0
}

function By() {
    for (var e = ot; e;) e = Gn(e.nextSibling)
}

function Mo() {
    ot = it = null, ce = !1
}

function _d(e) {
    Lt === null ? Lt = [e] : Lt.push(e)
}
var fE = vn.ReactCurrentBatchConfig;

function ni(e, t, n) {
    if (e = n.ref, e !== null && typeof e != "function" && typeof e != "object") {
        if (n._owner) {
            if (n = n._owner, n) {
                if (n.tag !== 1) throw Error(L(309));
                var r = n.stateNode
            }
            if (!r) throw Error(L(147, e));
            var o = r,
                i = "" + e;
            return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === i ? t.ref : (t = function(s) {
                var a = o.refs;
                s === null ? delete a[i] : a[i] = s
            }, t._stringRef = i, t)
        }
        if (typeof e != "string") throw Error(L(284));
        if (!n._owner) throw Error(L(290, e))
    }
    return e
}

function Rs(e, t) {
    throw e = Object.prototype.toString.call(t), Error(L(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e))
}

function Kh(e) {
    var t = e._init;
    return t(e._payload)
}

function Uy(e) {
    function t(m, p) {
        if (e) {
            var y = m.deletions;
            y === null ? (m.deletions = [p], m.flags |= 16) : y.push(p)
        }
    }

    function n(m, p) {
        if (!e) return null;
        for (; p !== null;) t(m, p), p = p.sibling;
        return null
    }

    function r(m, p) {
        for (m = new Map; p !== null;) p.key !== null ? m.set(p.key, p) : m.set(p.index, p), p = p.sibling;
        return m
    }

    function o(m, p) {
        return m = qn(m, p), m.index = 0, m.sibling = null, m
    }

    function i(m, p, y) {
        return m.index = y, e ? (y = m.alternate, y !== null ? (y = y.index, y < p ? (m.flags |= 2, p) : y) : (m.flags |= 2, p)) : (m.flags |= 1048576, p)
    }

    function s(m) {
        return e && m.alternate === null && (m.flags |= 2), m
    }

    function a(m, p, y, S) {
        return p === null || p.tag !== 6 ? (p = lu(y, m.mode, S), p.return = m, p) : (p = o(p, y), p.return = m, p)
    }

    function l(m, p, y, S) {
        var E = y.type;
        return E === Xr ? c(m, p, y.props.children, S, y.key) : p !== null && (p.elementType === E || typeof E == "object" && E !== null && E.$$typeof === Dn && Kh(E) === p.type) ? (S = o(p, y.props), S.ref = ni(m, p, y), S.return = m, S) : (S = ea(y.type, y.key, y.props, null, m.mode, S), S.ref = ni(m, p, y), S.return = m, S)
    }

    function u(m, p, y, S) {
        return p === null || p.tag !== 4 || p.stateNode.containerInfo !== y.containerInfo || p.stateNode.implementation !== y.implementation ? (p = uu(y, m.mode, S), p.return = m, p) : (p = o(p, y.children || []), p.return = m, p)
    }

    function c(m, p, y, S, E) {
        return p === null || p.tag !== 7 ? (p = Ar(y, m.mode, S, E), p.return = m, p) : (p = o(p, y), p.return = m, p)
    }

    function d(m, p, y) {
        if (typeof p == "string" && p !== "" || typeof p == "number") return p = lu("" + p, m.mode, y), p.return = m, p;
        if (typeof p == "object" && p !== null) {
            switch (p.$$typeof) {
                case ys:
                    return y = ea(p.type, p.key, p.props, null, m.mode, y), y.ref = ni(m, null, p), y.return = m, y;
                case Yr:
                    return p = uu(p, m.mode, y), p.return = m, p;
                case Dn:
                    var S = p._init;
                    return d(m, S(p._payload), y)
            }
            if (ui(p) || qo(p)) return p = Ar(p, m.mode, y, null), p.return = m, p;
            Rs(m, p)
        }
        return null
    }

    function h(m, p, y, S) {
        var E = p !== null ? p.key : null;
        if (typeof y == "string" && y !== "" || typeof y == "number") return E !== null ? null : a(m, p, "" + y, S);
        if (typeof y == "object" && y !== null) {
            switch (y.$$typeof) {
                case ys:
                    return y.key === E ? l(m, p, y, S) : null;
                case Yr:
                    return y.key === E ? u(m, p, y, S) : null;
                case Dn:
                    return E = y._init, h(m, p, E(y._payload), S)
            }
            if (ui(y) || qo(y)) return E !== null ? null : c(m, p, y, S, null);
            Rs(m, y)
        }
        return null
    }

    function f(m, p, y, S, E) {
        if (typeof S == "string" && S !== "" || typeof S == "number") return m = m.get(y) || null, a(p, m, "" + S, E);
        if (typeof S == "object" && S !== null) {
            switch (S.$$typeof) {
                case ys:
                    return m = m.get(S.key === null ? y : S.key) || null, l(p, m, S, E);
                case Yr:
                    return m = m.get(S.key === null ? y : S.key) || null, u(p, m, S, E);
                case Dn:
                    var C = S._init;
                    return f(m, p, y, C(S._payload), E)
            }
            if (ui(S) || qo(S)) return m = m.get(y) || null, c(p, m, S, E, null);
            Rs(p, S)
        }
        return null
    }

    function v(m, p, y, S) {
        for (var E = null, C = null, T = p, b = p = 0, D = null; T !== null && b < y.length; b++) {
            T.index > b ? (D = T, T = null) : D = T.sibling;
            var R = h(m, T, y[b], S);
            if (R === null) {
                T === null && (T = D);
                break
            }
            e && T && R.alternate === null && t(m, T), p = i(R, p, b), C === null ? E = R : C.sibling = R, C = R, T = D
        }
        if (b === y.length) return n(m, T), ce && pr(m, b), E;
        if (T === null) {
            for (; b < y.length; b++) T = d(m, y[b], S), T !== null && (p = i(T, p, b), C === null ? E = T : C.sibling = T, C = T);
            return ce && pr(m, b), E
        }
        for (T = r(m, T); b < y.length; b++) D = f(T, m, b, y[b], S), D !== null && (e && D.alternate !== null && T.delete(D.key === null ? b : D.key), p = i(D, p, b), C === null ? E = D : C.sibling = D, C = D);
        return e && T.forEach(function(V) {
            return t(m, V)
        }), ce && pr(m, b), E
    }

    function g(m, p, y, S) {
        var E = qo(y);
        if (typeof E != "function") throw Error(L(150));
        if (y = E.call(y), y == null) throw Error(L(151));
        for (var C = E = null, T = p, b = p = 0, D = null, R = y.next(); T !== null && !R.done; b++, R = y.next()) {
            T.index > b ? (D = T, T = null) : D = T.sibling;
            var V = h(m, T, R.value, S);
            if (V === null) {
                T === null && (T = D);
                break
            }
            e && T && V.alternate === null && t(m, T), p = i(V, p, b), C === null ? E = V : C.sibling = V, C = V, T = D
        }
        if (R.done) return n(m, T), ce && pr(m, b), E;
        if (T === null) {
            for (; !R.done; b++, R = y.next()) R = d(m, R.value, S), R !== null && (p = i(R, p, b), C === null ? E = R : C.sibling = R, C = R);
            return ce && pr(m, b), E
        }
        for (T = r(m, T); !R.done; b++, R = y.next()) R = f(T, m, b, R.value, S), R !== null && (e && R.alternate !== null && T.delete(R.key === null ? b : R.key), p = i(R, p, b), C === null ? E = R : C.sibling = R, C = R);
        return e && T.forEach(function(I) {
            return t(m, I)
        }), ce && pr(m, b), E
    }

    function w(m, p, y, S) {
        if (typeof y == "object" && y !== null && y.type === Xr && y.key === null && (y = y.props.children), typeof y == "object" && y !== null) {
            switch (y.$$typeof) {
                case ys:
                    e: {
                        for (var E = y.key, C = p; C !== null;) {
                            if (C.key === E) {
                                if (E = y.type, E === Xr) {
                                    if (C.tag === 7) {
                                        n(m, C.sibling), p = o(C, y.props.children), p.return = m, m = p;
                                        break e
                                    }
                                } else if (C.elementType === E || typeof E == "object" && E !== null && E.$$typeof === Dn && Kh(E) === C.type) {
                                    n(m, C.sibling), p = o(C, y.props), p.ref = ni(m, C, y), p.return = m, m = p;
                                    break e
                                }
                                n(m, C);
                                break
                            } else t(m, C);
                            C = C.sibling
                        }
                        y.type === Xr ? (p = Ar(y.props.children, m.mode, S, y.key), p.return = m, m = p) : (S = ea(y.type, y.key, y.props, null, m.mode, S), S.ref = ni(m, p, y), S.return = m, m = S)
                    }
                    return s(m);
                case Yr:
                    e: {
                        for (C = y.key; p !== null;) {
                            if (p.key === C)
                                if (p.tag === 4 && p.stateNode.containerInfo === y.containerInfo && p.stateNode.implementation === y.implementation) {
                                    n(m, p.sibling), p = o(p, y.children || []), p.return = m, m = p;
                                    break e
                                } else {
                                    n(m, p);
                                    break
                                }
                            else t(m, p);
                            p = p.sibling
                        }
                        p = uu(y, m.mode, S),
                        p.return = m,
                        m = p
                    }
                    return s(m);
                case Dn:
                    return C = y._init, w(m, p, C(y._payload), S)
            }
            if (ui(y)) return v(m, p, y, S);
            if (qo(y)) return g(m, p, y, S);
            Rs(m, y)
        }
        return typeof y == "string" && y !== "" || typeof y == "number" ? (y = "" + y, p !== null && p.tag === 6 ? (n(m, p.sibling), p = o(p, y), p.return = m, m = p) : (n(m, p), p = lu(y, m.mode, S), p.return = m, m = p), s(m)) : n(m, p)
    }
    return w
}
var Do = Uy(!0),
    Wy = Uy(!1),
    Pa = ar(null),
    ba = null,
    oo = null,
    Vd = null;

function jd() {
    Vd = oo = ba = null
}

function Fd(e) {
    var t = Pa.current;
    le(Pa), e._currentValue = t
}

function lc(e, t, n) {
    for (; e !== null;) {
        var r = e.alternate;
        if ((e.childLanes & t) !== t ? (e.childLanes |= t, r !== null && (r.childLanes |= t)) : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t), e === n) break;
        e = e.return
    }
}

function mo(e, t) {
    ba = e, Vd = oo = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & t && (Ye = !0), e.firstContext = null)
}

function vt(e) {
    var t = e._currentValue;
    if (Vd !== e)
        if (e = {
                context: e,
                memoizedValue: t,
                next: null
            }, oo === null) {
            if (ba === null) throw Error(L(308));
            oo = e, ba.dependencies = {
                lanes: 0,
                firstContext: e
            }
        } else oo = oo.next = e;
    return t
}
var vr = null;

function zd(e) {
    vr === null ? vr = [e] : vr.push(e)
}

function Hy(e, t, n, r) {
    var o = t.interleaved;
    return o === null ? (n.next = n, zd(t)) : (n.next = o.next, o.next = n), t.interleaved = n, pn(e, r)
}

function pn(e, t) {
    e.lanes |= t;
    var n = e.alternate;
    for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null;) e.childLanes |= t, n = e.alternate, n !== null && (n.childLanes |= t), n = e, e = e.return;
    return n.tag === 3 ? n.stateNode : null
}
var Ln = !1;

function $d(e) {
    e.updateQueue = {
        baseState: e.memoizedState,
        firstBaseUpdate: null,
        lastBaseUpdate: null,
        shared: {
            pending: null,
            interleaved: null,
            lanes: 0
        },
        effects: null
    }
}

function Ky(e, t) {
    e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
        baseState: e.baseState,
        firstBaseUpdate: e.firstBaseUpdate,
        lastBaseUpdate: e.lastBaseUpdate,
        shared: e.shared,
        effects: e.effects
    })
}

function dn(e, t) {
    return {
        eventTime: e,
        lane: t,
        tag: 0,
        payload: null,
        callback: null,
        next: null
    }
}

function Qn(e, t, n) {
    var r = e.updateQueue;
    if (r === null) return null;
    if (r = r.shared, Z & 2) {
        var o = r.pending;
        return o === null ? t.next = t : (t.next = o.next, o.next = t), r.pending = t, pn(e, n)
    }
    return o = r.interleaved, o === null ? (t.next = t, zd(r)) : (t.next = o.next, o.next = t), r.interleaved = t, pn(e, n)
}

function Qs(e, t, n) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194240) !== 0)) {
        var r = t.lanes;
        r &= e.pendingLanes, n |= r, t.lanes = n, bd(e, n)
    }
}

function Gh(e, t) {
    var n = e.updateQueue,
        r = e.alternate;
    if (r !== null && (r = r.updateQueue, n === r)) {
        var o = null,
            i = null;
        if (n = n.firstBaseUpdate, n !== null) {
            do {
                var s = {
                    eventTime: n.eventTime,
                    lane: n.lane,
                    tag: n.tag,
                    payload: n.payload,
                    callback: n.callback,
                    next: null
                };
                i === null ? o = i = s : i = i.next = s, n = n.next
            } while (n !== null);
            i === null ? o = i = t : i = i.next = t
        } else o = i = t;
        n = {
            baseState: r.baseState,
            firstBaseUpdate: o,
            lastBaseUpdate: i,
            shared: r.shared,
            effects: r.effects
        }, e.updateQueue = n;
        return
    }
    e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t
}

function ka(e, t, n, r) {
    var o = e.updateQueue;
    Ln = !1;
    var i = o.firstBaseUpdate,
        s = o.lastBaseUpdate,
        a = o.shared.pending;
    if (a !== null) {
        o.shared.pending = null;
        var l = a,
            u = l.next;
        l.next = null, s === null ? i = u : s.next = u, s = l;
        var c = e.alternate;
        c !== null && (c = c.updateQueue, a = c.lastBaseUpdate, a !== s && (a === null ? c.firstBaseUpdate = u : a.next = u, c.lastBaseUpdate = l))
    }
    if (i !== null) {
        var d = o.baseState;
        s = 0, c = u = l = null, a = i;
        do {
            var h = a.lane,
                f = a.eventTime;
            if ((r & h) === h) {
                c !== null && (c = c.next = {
                    eventTime: f,
                    lane: 0,
                    tag: a.tag,
                    payload: a.payload,
                    callback: a.callback,
                    next: null
                });
                e: {
                    var v = e,
                        g = a;
                    switch (h = t, f = n, g.tag) {
                        case 1:
                            if (v = g.payload, typeof v == "function") {
                                d = v.call(f, d, h);
                                break e
                            }
                            d = v;
                            break e;
                        case 3:
                            v.flags = v.flags & -65537 | 128;
                        case 0:
                            if (v = g.payload, h = typeof v == "function" ? v.call(f, d, h) : v, h == null) break e;
                            d = pe({}, d, h);
                            break e;
                        case 2:
                            Ln = !0
                    }
                }
                a.callback !== null && a.lane !== 0 && (e.flags |= 64, h = o.effects, h === null ? o.effects = [a] : h.push(a))
            } else f = {
                eventTime: f,
                lane: h,
                tag: a.tag,
                payload: a.payload,
                callback: a.callback,
                next: null
            }, c === null ? (u = c = f, l = d) : c = c.next = f, s |= h;
            if (a = a.next, a === null) {
                if (a = o.shared.pending, a === null) break;
                h = a, a = h.next, h.next = null, o.lastBaseUpdate = h, o.shared.pending = null
            }
        } while (!0);
        if (c === null && (l = d), o.baseState = l, o.firstBaseUpdate = u, o.lastBaseUpdate = c, t = o.shared.interleaved, t !== null) {
            o = t;
            do s |= o.lane, o = o.next; while (o !== t)
        } else i === null && (o.shared.lanes = 0);
        Ir |= s, e.lanes = s, e.memoizedState = d
    }
}

function Qh(e, t, n) {
    if (e = t.effects, t.effects = null, e !== null)
        for (t = 0; t < e.length; t++) {
            var r = e[t],
                o = r.callback;
            if (o !== null) {
                if (r.callback = null, r = n, typeof o != "function") throw Error(L(191, o));
                o.call(r)
            }
        }
}
var os = {},
    Xt = ar(os),
    ji = ar(os),
    Fi = ar(os);

function wr(e) {
    if (e === os) throw Error(L(174));
    return e
}

function Bd(e, t) {
    switch (oe(Fi, t), oe(ji, e), oe(Xt, os), e = t.nodeType, e) {
        case 9:
        case 11:
            t = (t = t.documentElement) ? t.namespaceURI : Bu(null, "");
            break;
        default:
            e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = Bu(t, e)
    }
    le(Xt), oe(Xt, t)
}

function Lo() {
    le(Xt), le(ji), le(Fi)
}

function Gy(e) {
    wr(Fi.current);
    var t = wr(Xt.current),
        n = Bu(t, e.type);
    t !== n && (oe(ji, e), oe(Xt, n))
}

function Ud(e) {
    ji.current === e && (le(Xt), le(ji))
}
var fe = ar(0);

function Ra(e) {
    for (var t = e; t !== null;) {
        if (t.tag === 13) {
            var n = t.memoizedState;
            if (n !== null && (n = n.dehydrated, n === null || n.data === "$?" || n.data === "$!")) return t
        } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
            if (t.flags & 128) return t
        } else if (t.child !== null) {
            t.child.return = t, t = t.child;
            continue
        }
        if (t === e) break;
        for (; t.sibling === null;) {
            if (t.return === null || t.return === e) return null;
            t = t.return
        }
        t.sibling.return = t.return, t = t.sibling
    }
    return null
}
var nu = [];

function Wd() {
    for (var e = 0; e < nu.length; e++) nu[e]._workInProgressVersionPrimary = null;
    nu.length = 0
}
var Ys = vn.ReactCurrentDispatcher,
    ru = vn.ReactCurrentBatchConfig,
    Or = 0,
    he = null,
    Ee = null,
    Pe = null,
    Aa = !1,
    vi = !1,
    zi = 0,
    hE = 0;

function Oe() {
    throw Error(L(321))
}

function Hd(e, t) {
    if (t === null) return !1;
    for (var n = 0; n < t.length && n < e.length; n++)
        if (!_t(e[n], t[n])) return !1;
    return !0
}

function Kd(e, t, n, r, o, i) {
    if (Or = i, he = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, Ys.current = e === null || e.memoizedState === null ? yE : vE, e = n(r, o), vi) {
        i = 0;
        do {
            if (vi = !1, zi = 0, 25 <= i) throw Error(L(301));
            i += 1, Pe = Ee = null, t.updateQueue = null, Ys.current = wE, e = n(r, o)
        } while (vi)
    }
    if (Ys.current = Ma, t = Ee !== null && Ee.next !== null, Or = 0, Pe = Ee = he = null, Aa = !1, t) throw Error(L(300));
    return e
}

function Gd() {
    var e = zi !== 0;
    return zi = 0, e
}

function $t() {
    var e = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null
    };
    return Pe === null ? he.memoizedState = Pe = e : Pe = Pe.next = e, Pe
}

function wt() {
    if (Ee === null) {
        var e = he.alternate;
        e = e !== null ? e.memoizedState : null
    } else e = Ee.next;
    var t = Pe === null ? he.memoizedState : Pe.next;
    if (t !== null) Pe = t, Ee = e;
    else {
        if (e === null) throw Error(L(310));
        Ee = e, e = {
            memoizedState: Ee.memoizedState,
            baseState: Ee.baseState,
            baseQueue: Ee.baseQueue,
            queue: Ee.queue,
            next: null
        }, Pe === null ? he.memoizedState = Pe = e : Pe = Pe.next = e
    }
    return Pe
}

function $i(e, t) {
    return typeof t == "function" ? t(e) : t
}

function ou(e) {
    var t = wt(),
        n = t.queue;
    if (n === null) throw Error(L(311));
    n.lastRenderedReducer = e;
    var r = Ee,
        o = r.baseQueue,
        i = n.pending;
    if (i !== null) {
        if (o !== null) {
            var s = o.next;
            o.next = i.next, i.next = s
        }
        r.baseQueue = o = i, n.pending = null
    }
    if (o !== null) {
        i = o.next, r = r.baseState;
        var a = s = null,
            l = null,
            u = i;
        do {
            var c = u.lane;
            if ((Or & c) === c) l !== null && (l = l.next = {
                lane: 0,
                action: u.action,
                hasEagerState: u.hasEagerState,
                eagerState: u.eagerState,
                next: null
            }), r = u.hasEagerState ? u.eagerState : e(r, u.action);
            else {
                var d = {
                    lane: c,
                    action: u.action,
                    hasEagerState: u.hasEagerState,
                    eagerState: u.eagerState,
                    next: null
                };
                l === null ? (a = l = d, s = r) : l = l.next = d, he.lanes |= c, Ir |= c
            }
            u = u.next
        } while (u !== null && u !== i);
        l === null ? s = r : l.next = a, _t(r, t.memoizedState) || (Ye = !0), t.memoizedState = r, t.baseState = s, t.baseQueue = l, n.lastRenderedState = r
    }
    if (e = n.interleaved, e !== null) {
        o = e;
        do i = o.lane, he.lanes |= i, Ir |= i, o = o.next; while (o !== e)
    } else o === null && (n.lanes = 0);
    return [t.memoizedState, n.dispatch]
}

function iu(e) {
    var t = wt(),
        n = t.queue;
    if (n === null) throw Error(L(311));
    n.lastRenderedReducer = e;
    var r = n.dispatch,
        o = n.pending,
        i = t.memoizedState;
    if (o !== null) {
        n.pending = null;
        var s = o = o.next;
        do i = e(i, s.action), s = s.next; while (s !== o);
        _t(i, t.memoizedState) || (Ye = !0), t.memoizedState = i, t.baseQueue === null && (t.baseState = i), n.lastRenderedState = i
    }
    return [i, r]
}

function Qy() {}

function Yy(e, t) {
    var n = he,
        r = wt(),
        o = t(),
        i = !_t(r.memoizedState, o);
    if (i && (r.memoizedState = o, Ye = !0), r = r.queue, Qd(Zy.bind(null, n, r, e), [e]), r.getSnapshot !== t || i || Pe !== null && Pe.memoizedState.tag & 1) {
        if (n.flags |= 2048, Bi(9, qy.bind(null, n, r, o, t), void 0, null), be === null) throw Error(L(349));
        Or & 30 || Xy(n, t, o)
    }
    return o
}

function Xy(e, t, n) {
    e.flags |= 16384, e = {
        getSnapshot: t,
        value: n
    }, t = he.updateQueue, t === null ? (t = {
        lastEffect: null,
        stores: null
    }, he.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e))
}

function qy(e, t, n, r) {
    t.value = n, t.getSnapshot = r, Jy(t) && ev(e)
}

function Zy(e, t, n) {
    return n(function() {
        Jy(t) && ev(e)
    })
}

function Jy(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
        var n = t();
        return !_t(e, n)
    } catch {
        return !0
    }
}

function ev(e) {
    var t = pn(e, 1);
    t !== null && Ot(t, e, 1, -1)
}

function Yh(e) {
    var t = $t();
    return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = {
        pending: null,
        interleaved: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: $i,
        lastRenderedState: e
    }, t.queue = e, e = e.dispatch = gE.bind(null, he, e), [t.memoizedState, e]
}

function Bi(e, t, n, r) {
    return e = {
        tag: e,
        create: t,
        destroy: n,
        deps: r,
        next: null
    }, t = he.updateQueue, t === null ? (t = {
        lastEffect: null,
        stores: null
    }, he.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e)), e
}

function tv() {
    return wt().memoizedState
}

function Xs(e, t, n, r) {
    var o = $t();
    he.flags |= e, o.memoizedState = Bi(1 | t, n, void 0, r === void 0 ? null : r)
}

function il(e, t, n, r) {
    var o = wt();
    r = r === void 0 ? null : r;
    var i = void 0;
    if (Ee !== null) {
        var s = Ee.memoizedState;
        if (i = s.destroy, r !== null && Hd(r, s.deps)) {
            o.memoizedState = Bi(t, n, i, r);
            return
        }
    }
    he.flags |= e, o.memoizedState = Bi(1 | t, n, i, r)
}

function Xh(e, t) {
    return Xs(8390656, 8, e, t)
}

function Qd(e, t) {
    return il(2048, 8, e, t)
}

function nv(e, t) {
    return il(4, 2, e, t)
}

function rv(e, t) {
    return il(4, 4, e, t)
}

function ov(e, t) {
    if (typeof t == "function") return e = e(), t(e),
        function() {
            t(null)
        };
    if (t != null) return e = e(), t.current = e,
        function() {
            t.current = null
        }
}

function iv(e, t, n) {
    return n = n != null ? n.concat([e]) : null, il(4, 4, ov.bind(null, t, e), n)
}

function Yd() {}

function sv(e, t) {
    var n = wt();
    t = t === void 0 ? null : t;
    var r = n.memoizedState;
    return r !== null && t !== null && Hd(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e)
}

function av(e, t) {
    var n = wt();
    t = t === void 0 ? null : t;
    var r = n.memoizedState;
    return r !== null && t !== null && Hd(t, r[1]) ? r[0] : (e = e(), n.memoizedState = [e, t], e)
}

function lv(e, t, n) {
    return Or & 21 ? (_t(n, t) || (n = hy(), he.lanes |= n, Ir |= n, e.baseState = !0), t) : (e.baseState && (e.baseState = !1, Ye = !0), e.memoizedState = n)
}

function pE(e, t) {
    var n = te;
    te = n !== 0 && 4 > n ? n : 4, e(!0);
    var r = ru.transition;
    ru.transition = {};
    try {
        e(!1), t()
    } finally {
        te = n, ru.transition = r
    }
}

function uv() {
    return wt().memoizedState
}

function mE(e, t, n) {
    var r = Xn(e);
    if (n = {
            lane: r,
            action: n,
            hasEagerState: !1,
            eagerState: null,
            next: null
        }, cv(e)) dv(t, n);
    else if (n = Hy(e, t, n, r), n !== null) {
        var o = We();
        Ot(n, e, r, o), fv(n, t, r)
    }
}

function gE(e, t, n) {
    var r = Xn(e),
        o = {
            lane: r,
            action: n,
            hasEagerState: !1,
            eagerState: null,
            next: null
        };
    if (cv(e)) dv(t, o);
    else {
        var i = e.alternate;
        if (e.lanes === 0 && (i === null || i.lanes === 0) && (i = t.lastRenderedReducer, i !== null)) try {
            var s = t.lastRenderedState,
                a = i(s, n);
            if (o.hasEagerState = !0, o.eagerState = a, _t(a, s)) {
                var l = t.interleaved;
                l === null ? (o.next = o, zd(t)) : (o.next = l.next, l.next = o), t.interleaved = o;
                return
            }
        } catch {} finally {}
        n = Hy(e, t, o, r), n !== null && (o = We(), Ot(n, e, r, o), fv(n, t, r))
    }
}

function cv(e) {
    var t = e.alternate;
    return e === he || t !== null && t === he
}

function dv(e, t) {
    vi = Aa = !0;
    var n = e.pending;
    n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t
}

function fv(e, t, n) {
    if (n & 4194240) {
        var r = t.lanes;
        r &= e.pendingLanes, n |= r, t.lanes = n, bd(e, n)
    }
}
var Ma = {
        readContext: vt,
        useCallback: Oe,
        useContext: Oe,
        useEffect: Oe,
        useImperativeHandle: Oe,
        useInsertionEffect: Oe,
        useLayoutEffect: Oe,
        useMemo: Oe,
        useReducer: Oe,
        useRef: Oe,
        useState: Oe,
        useDebugValue: Oe,
        useDeferredValue: Oe,
        useTransition: Oe,
        useMutableSource: Oe,
        useSyncExternalStore: Oe,
        useId: Oe,
        unstable_isNewReconciler: !1
    },
    yE = {
        readContext: vt,
        useCallback: function(e, t) {
            return $t().memoizedState = [e, t === void 0 ? null : t], e
        },
        useContext: vt,
        useEffect: Xh,
        useImperativeHandle: function(e, t, n) {
            return n = n != null ? n.concat([e]) : null, Xs(4194308, 4, ov.bind(null, t, e), n)
        },
        useLayoutEffect: function(e, t) {
            return Xs(4194308, 4, e, t)
        },
        useInsertionEffect: function(e, t) {
            return Xs(4, 2, e, t)
        },
        useMemo: function(e, t) {
            var n = $t();
            return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e
        },
        useReducer: function(e, t, n) {
            var r = $t();
            return t = n !== void 0 ? n(t) : t, r.memoizedState = r.baseState = t, e = {
                pending: null,
                interleaved: null,
                lanes: 0,
                dispatch: null,
                lastRenderedReducer: e,
                lastRenderedState: t
            }, r.queue = e, e = e.dispatch = mE.bind(null, he, e), [r.memoizedState, e]
        },
        useRef: function(e) {
            var t = $t();
            return e = {
                current: e
            }, t.memoizedState = e
        },
        useState: Yh,
        useDebugValue: Yd,
        useDeferredValue: function(e) {
            return $t().memoizedState = e
        },
        useTransition: function() {
            var e = Yh(!1),
                t = e[0];
            return e = pE.bind(null, e[1]), $t().memoizedState = e, [t, e]
        },
        useMutableSource: function() {},
        useSyncExternalStore: function(e, t, n) {
            var r = he,
                o = $t();
            if (ce) {
                if (n === void 0) throw Error(L(407));
                n = n()
            } else {
                if (n = t(), be === null) throw Error(L(349));
                Or & 30 || Xy(r, t, n)
            }
            o.memoizedState = n;
            var i = {
                value: n,
                getSnapshot: t
            };
            return o.queue = i, Xh(Zy.bind(null, r, i, e), [e]), r.flags |= 2048, Bi(9, qy.bind(null, r, i, n, t), void 0, null), n
        },
        useId: function() {
            var e = $t(),
                t = be.identifierPrefix;
            if (ce) {
                var n = cn,
                    r = un;
                n = (r & ~(1 << 32 - Nt(r) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = zi++, 0 < n && (t += "H" + n.toString(32)), t += ":"
            } else n = hE++, t = ":" + t + "r" + n.toString(32) + ":";
            return e.memoizedState = t
        },
        unstable_isNewReconciler: !1
    },
    vE = {
        readContext: vt,
        useCallback: sv,
        useContext: vt,
        useEffect: Qd,
        useImperativeHandle: iv,
        useInsertionEffect: nv,
        useLayoutEffect: rv,
        useMemo: av,
        useReducer: ou,
        useRef: tv,
        useState: function() {
            return ou($i)
        },
        useDebugValue: Yd,
        useDeferredValue: function(e) {
            var t = wt();
            return lv(t, Ee.memoizedState, e)
        },
        useTransition: function() {
            var e = ou($i)[0],
                t = wt().memoizedState;
            return [e, t]
        },
        useMutableSource: Qy,
        useSyncExternalStore: Yy,
        useId: uv,
        unstable_isNewReconciler: !1
    },
    wE = {
        readContext: vt,
        useCallback: sv,
        useContext: vt,
        useEffect: Qd,
        useImperativeHandle: iv,
        useInsertionEffect: nv,
        useLayoutEffect: rv,
        useMemo: av,
        useReducer: iu,
        useRef: tv,
        useState: function() {
            return iu($i)
        },
        useDebugValue: Yd,
        useDeferredValue: function(e) {
            var t = wt();
            return Ee === null ? t.memoizedState = e : lv(t, Ee.memoizedState, e)
        },
        useTransition: function() {
            var e = iu($i)[0],
                t = wt().memoizedState;
            return [e, t]
        },
        useMutableSource: Qy,
        useSyncExternalStore: Yy,
        useId: uv,
        unstable_isNewReconciler: !1
    };

function kt(e, t) {
    if (e && e.defaultProps) {
        t = pe({}, t), e = e.defaultProps;
        for (var n in e) t[n] === void 0 && (t[n] = e[n]);
        return t
    }
    return t
}

function uc(e, t, n, r) {
    t = e.memoizedState, n = n(r, t), n = n == null ? t : pe({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n)
}
var sl = {
    isMounted: function(e) {
        return (e = e._reactInternals) ? Fr(e) === e : !1
    },
    enqueueSetState: function(e, t, n) {
        e = e._reactInternals;
        var r = We(),
            o = Xn(e),
            i = dn(r, o);
        i.payload = t, n != null && (i.callback = n), t = Qn(e, i, o), t !== null && (Ot(t, e, o, r), Qs(t, e, o))
    },
    enqueueReplaceState: function(e, t, n) {
        e = e._reactInternals;
        var r = We(),
            o = Xn(e),
            i = dn(r, o);
        i.tag = 1, i.payload = t, n != null && (i.callback = n), t = Qn(e, i, o), t !== null && (Ot(t, e, o, r), Qs(t, e, o))
    },
    enqueueForceUpdate: function(e, t) {
        e = e._reactInternals;
        var n = We(),
            r = Xn(e),
            o = dn(n, r);
        o.tag = 2, t != null && (o.callback = t), t = Qn(e, o, r), t !== null && (Ot(t, e, r, n), Qs(t, e, r))
    }
};

function qh(e, t, n, r, o, i, s) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, i, s) : t.prototype && t.prototype.isPureReactComponent ? !Oi(n, r) || !Oi(o, i) : !0
}

function hv(e, t, n) {
    var r = !1,
        o = Jn,
        i = t.contextType;
    return typeof i == "object" && i !== null ? i = vt(i) : (o = qe(t) ? Lr : je.current, r = t.contextTypes, i = (r = r != null) ? Ao(e, o) : Jn), t = new t(n, i), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = sl, e.stateNode = t, t._reactInternals = e, r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = o, e.__reactInternalMemoizedMaskedChildContext = i), t
}

function Zh(e, t, n, r) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && sl.enqueueReplaceState(t, t.state, null)
}

function cc(e, t, n, r) {
    var o = e.stateNode;
    o.props = n, o.state = e.memoizedState, o.refs = {}, $d(e);
    var i = t.contextType;
    typeof i == "object" && i !== null ? o.context = vt(i) : (i = qe(t) ? Lr : je.current, o.context = Ao(e, i)), o.state = e.memoizedState, i = t.getDerivedStateFromProps, typeof i == "function" && (uc(e, t, i, n), o.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof o.getSnapshotBeforeUpdate == "function" || typeof o.UNSAFE_componentWillMount != "function" && typeof o.componentWillMount != "function" || (t = o.state, typeof o.componentWillMount == "function" && o.componentWillMount(), typeof o.UNSAFE_componentWillMount == "function" && o.UNSAFE_componentWillMount(), t !== o.state && sl.enqueueReplaceState(o, o.state, null), ka(e, n, o, r), o.state = e.memoizedState), typeof o.componentDidMount == "function" && (e.flags |= 4194308)
}

function No(e, t) {
    try {
        var n = "",
            r = t;
        do n += Gx(r), r = r.return; while (r);
        var o = n
    } catch (i) {
        o = `
Error generating stack: ` + i.message + `
` + i.stack
    }
    return {
        value: e,
        source: t,
        stack: o,
        digest: null
    }
}

function su(e, t, n) {
    return {
        value: e,
        source: null,
        stack: n ?? null,
        digest: t ?? null
    }
}

function dc(e, t) {
    try {
        console.error(t.value)
    } catch (n) {
        setTimeout(function() {
            throw n
        })
    }
}
var xE = typeof WeakMap == "function" ? WeakMap : Map;

function pv(e, t, n) {
    n = dn(-1, n), n.tag = 3, n.payload = {
        element: null
    };
    var r = t.value;
    return n.callback = function() {
        La || (La = !0, Sc = r), dc(e, t)
    }, n
}

function mv(e, t, n) {
    n = dn(-1, n), n.tag = 3;
    var r = e.type.getDerivedStateFromError;
    if (typeof r == "function") {
        var o = t.value;
        n.payload = function() {
            return r(o)
        }, n.callback = function() {
            dc(e, t)
        }
    }
    var i = e.stateNode;
    return i !== null && typeof i.componentDidCatch == "function" && (n.callback = function() {
        dc(e, t), typeof r != "function" && (Yn === null ? Yn = new Set([this]) : Yn.add(this));
        var s = t.stack;
        this.componentDidCatch(t.value, {
            componentStack: s !== null ? s : ""
        })
    }), n
}

function Jh(e, t, n) {
    var r = e.pingCache;
    if (r === null) {
        r = e.pingCache = new xE;
        var o = new Set;
        r.set(t, o)
    } else o = r.get(t), o === void 0 && (o = new Set, r.set(t, o));
    o.has(n) || (o.add(n), e = OE.bind(null, e, t, n), t.then(e, e))
}

function ep(e) {
    do {
        var t;
        if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t) return e;
        e = e.return
    } while (e !== null);
    return null
}

function tp(e, t, n, r, o) {
    return e.mode & 1 ? (e.flags |= 65536, e.lanes = o, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = dn(-1, 1), t.tag = 2, Qn(n, t, 1))), n.lanes |= 1), e)
}
var SE = vn.ReactCurrentOwner,
    Ye = !1;

function ze(e, t, n, r) {
    t.child = e === null ? Wy(t, null, n, r) : Do(t, e.child, n, r)
}

function np(e, t, n, r, o) {
    n = n.render;
    var i = t.ref;
    return mo(t, o), r = Kd(e, t, n, r, i, o), n = Gd(), e !== null && !Ye ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~o, mn(e, t, o)) : (ce && n && Od(t), t.flags |= 1, ze(e, t, r, o), t.child)
}

function rp(e, t, n, r, o) {
    if (e === null) {
        var i = n.type;
        return typeof i == "function" && !rf(i) && i.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = i, gv(e, t, i, r, o)) : (e = ea(n.type, null, r, t, t.mode, o), e.ref = t.ref, e.return = t, t.child = e)
    }
    if (i = e.child, !(e.lanes & o)) {
        var s = i.memoizedProps;
        if (n = n.compare, n = n !== null ? n : Oi, n(s, r) && e.ref === t.ref) return mn(e, t, o)
    }
    return t.flags |= 1, e = qn(i, r), e.ref = t.ref, e.return = t, t.child = e
}

function gv(e, t, n, r, o) {
    if (e !== null) {
        var i = e.memoizedProps;
        if (Oi(i, r) && e.ref === t.ref)
            if (Ye = !1, t.pendingProps = r = i, (e.lanes & o) !== 0) e.flags & 131072 && (Ye = !0);
            else return t.lanes = e.lanes, mn(e, t, o)
    }
    return fc(e, t, n, r, o)
}

function yv(e, t, n) {
    var r = t.pendingProps,
        o = r.children,
        i = e !== null ? e.memoizedState : null;
    if (r.mode === "hidden")
        if (!(t.mode & 1)) t.memoizedState = {
            baseLanes: 0,
            cachePool: null,
            transitions: null
        }, oe(so, nt), nt |= n;
        else {
            if (!(n & 1073741824)) return e = i !== null ? i.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = {
                baseLanes: e,
                cachePool: null,
                transitions: null
            }, t.updateQueue = null, oe(so, nt), nt |= e, null;
            t.memoizedState = {
                baseLanes: 0,
                cachePool: null,
                transitions: null
            }, r = i !== null ? i.baseLanes : n, oe(so, nt), nt |= r
        }
    else i !== null ? (r = i.baseLanes | n, t.memoizedState = null) : r = n, oe(so, nt), nt |= r;
    return ze(e, t, o, n), t.child
}

function vv(e, t) {
    var n = t.ref;
    (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152)
}

function fc(e, t, n, r, o) {
    var i = qe(n) ? Lr : je.current;
    return i = Ao(t, i), mo(t, o), n = Kd(e, t, n, r, i, o), r = Gd(), e !== null && !Ye ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~o, mn(e, t, o)) : (ce && r && Od(t), t.flags |= 1, ze(e, t, n, o), t.child)
}

function op(e, t, n, r, o) {
    if (qe(n)) {
        var i = !0;
        Ea(t)
    } else i = !1;
    if (mo(t, o), t.stateNode === null) qs(e, t), hv(t, n, r), cc(t, n, r, o), r = !0;
    else if (e === null) {
        var s = t.stateNode,
            a = t.memoizedProps;
        s.props = a;
        var l = s.context,
            u = n.contextType;
        typeof u == "object" && u !== null ? u = vt(u) : (u = qe(n) ? Lr : je.current, u = Ao(t, u));
        var c = n.getDerivedStateFromProps,
            d = typeof c == "function" || typeof s.getSnapshotBeforeUpdate == "function";
        d || typeof s.UNSAFE_componentWillReceiveProps != "function" && typeof s.componentWillReceiveProps != "function" || (a !== r || l !== u) && Zh(t, s, r, u), Ln = !1;
        var h = t.memoizedState;
        s.state = h, ka(t, r, s, o), l = t.memoizedState, a !== r || h !== l || Xe.current || Ln ? (typeof c == "function" && (uc(t, n, c, r), l = t.memoizedState), (a = Ln || qh(t, n, a, r, h, l, u)) ? (d || typeof s.UNSAFE_componentWillMount != "function" && typeof s.componentWillMount != "function" || (typeof s.componentWillMount == "function" && s.componentWillMount(), typeof s.UNSAFE_componentWillMount == "function" && s.UNSAFE_componentWillMount()), typeof s.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof s.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = l), s.props = r, s.state = l, s.context = u, r = a) : (typeof s.componentDidMount == "function" && (t.flags |= 4194308), r = !1)
    } else {
        s = t.stateNode, Ky(e, t), a = t.memoizedProps, u = t.type === t.elementType ? a : kt(t.type, a), s.props = u, d = t.pendingProps, h = s.context, l = n.contextType, typeof l == "object" && l !== null ? l = vt(l) : (l = qe(n) ? Lr : je.current, l = Ao(t, l));
        var f = n.getDerivedStateFromProps;
        (c = typeof f == "function" || typeof s.getSnapshotBeforeUpdate == "function") || typeof s.UNSAFE_componentWillReceiveProps != "function" && typeof s.componentWillReceiveProps != "function" || (a !== d || h !== l) && Zh(t, s, r, l), Ln = !1, h = t.memoizedState, s.state = h, ka(t, r, s, o);
        var v = t.memoizedState;
        a !== d || h !== v || Xe.current || Ln ? (typeof f == "function" && (uc(t, n, f, r), v = t.memoizedState), (u = Ln || qh(t, n, u, r, h, v, l) || !1) ? (c || typeof s.UNSAFE_componentWillUpdate != "function" && typeof s.componentWillUpdate != "function" || (typeof s.componentWillUpdate == "function" && s.componentWillUpdate(r, v, l), typeof s.UNSAFE_componentWillUpdate == "function" && s.UNSAFE_componentWillUpdate(r, v, l)), typeof s.componentDidUpdate == "function" && (t.flags |= 4), typeof s.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof s.componentDidUpdate != "function" || a === e.memoizedProps && h === e.memoizedState || (t.flags |= 4), typeof s.getSnapshotBeforeUpdate != "function" || a === e.memoizedProps && h === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = v), s.props = r, s.state = v, s.context = l, r = u) : (typeof s.componentDidUpdate != "function" || a === e.memoizedProps && h === e.memoizedState || (t.flags |= 4), typeof s.getSnapshotBeforeUpdate != "function" || a === e.memoizedProps && h === e.memoizedState || (t.flags |= 1024), r = !1)
    }
    return hc(e, t, n, r, i, o)
}

function hc(e, t, n, r, o, i) {
    vv(e, t);
    var s = (t.flags & 128) !== 0;
    if (!r && !s) return o && Uh(t, n, !1), mn(e, t, i);
    r = t.stateNode, SE.current = t;
    var a = s && typeof n.getDerivedStateFromError != "function" ? null : r.render();
    return t.flags |= 1, e !== null && s ? (t.child = Do(t, e.child, null, i), t.child = Do(t, null, a, i)) : ze(e, t, a, i), t.memoizedState = r.state, o && Uh(t, n, !0), t.child
}

function wv(e) {
    var t = e.stateNode;
    t.pendingContext ? Bh(e, t.pendingContext, t.pendingContext !== t.context) : t.context && Bh(e, t.context, !1), Bd(e, t.containerInfo)
}

function ip(e, t, n, r, o) {
    return Mo(), _d(o), t.flags |= 256, ze(e, t, n, r), t.child
}
var pc = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0
};

function mc(e) {
    return {
        baseLanes: e,
        cachePool: null,
        transitions: null
    }
}

function xv(e, t, n) {
    var r = t.pendingProps,
        o = fe.current,
        i = !1,
        s = (t.flags & 128) !== 0,
        a;
    if ((a = s) || (a = e !== null && e.memoizedState === null ? !1 : (o & 2) !== 0), a ? (i = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (o |= 1), oe(fe, o & 1), e === null) return ac(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1, null) : (s = r.children, e = r.fallback, i ? (r = t.mode, i = t.child, s = {
        mode: "hidden",
        children: s
    }, !(r & 1) && i !== null ? (i.childLanes = 0, i.pendingProps = s) : i = ul(s, r, 0, null), e = Ar(e, r, n, null), i.return = t, e.return = t, i.sibling = e, t.child = i, t.child.memoizedState = mc(n), t.memoizedState = pc, e) : Xd(t, s));
    if (o = e.memoizedState, o !== null && (a = o.dehydrated, a !== null)) return EE(e, t, s, r, a, o, n);
    if (i) {
        i = r.fallback, s = t.mode, o = e.child, a = o.sibling;
        var l = {
            mode: "hidden",
            children: r.children
        };
        return !(s & 1) && t.child !== o ? (r = t.child, r.childLanes = 0, r.pendingProps = l, t.deletions = null) : (r = qn(o, l), r.subtreeFlags = o.subtreeFlags & 14680064), a !== null ? i = qn(a, i) : (i = Ar(i, s, n, null), i.flags |= 2), i.return = t, r.return = t, r.sibling = i, t.child = r, r = i, i = t.child, s = e.child.memoizedState, s = s === null ? mc(n) : {
            baseLanes: s.baseLanes | n,
            cachePool: null,
            transitions: s.transitions
        }, i.memoizedState = s, i.childLanes = e.childLanes & ~n, t.memoizedState = pc, r
    }
    return i = e.child, e = i.sibling, r = qn(i, {
        mode: "visible",
        children: r.children
    }), !(t.mode & 1) && (r.lanes = n), r.return = t, r.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = r, t.memoizedState = null, r
}

function Xd(e, t) {
    return t = ul({
        mode: "visible",
        children: t
    }, e.mode, 0, null), t.return = e, e.child = t
}

function As(e, t, n, r) {
    return r !== null && _d(r), Do(t, e.child, null, n), e = Xd(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e
}

function EE(e, t, n, r, o, i, s) {
    if (n) return t.flags & 256 ? (t.flags &= -257, r = su(Error(L(422))), As(e, t, s, r)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (i = r.fallback, o = t.mode, r = ul({
        mode: "visible",
        children: r.children
    }, o, 0, null), i = Ar(i, o, s, null), i.flags |= 2, r.return = t, i.return = t, r.sibling = i, t.child = r, t.mode & 1 && Do(t, e.child, null, s), t.child.memoizedState = mc(s), t.memoizedState = pc, i);
    if (!(t.mode & 1)) return As(e, t, s, null);
    if (o.data === "$!") {
        if (r = o.nextSibling && o.nextSibling.dataset, r) var a = r.dgst;
        return r = a, i = Error(L(419)), r = su(i, r, void 0), As(e, t, s, r)
    }
    if (a = (s & e.childLanes) !== 0, Ye || a) {
        if (r = be, r !== null) {
            switch (s & -s) {
                case 4:
                    o = 2;
                    break;
                case 16:
                    o = 8;
                    break;
                case 64:
                case 128:
                case 256:
                case 512:
                case 1024:
                case 2048:
                case 4096:
                case 8192:
                case 16384:
                case 32768:
                case 65536:
                case 131072:
                case 262144:
                case 524288:
                case 1048576:
                case 2097152:
                case 4194304:
                case 8388608:
                case 16777216:
                case 33554432:
                case 67108864:
                    o = 32;
                    break;
                case 536870912:
                    o = 268435456;
                    break;
                default:
                    o = 0
            }
            o = o & (r.suspendedLanes | s) ? 0 : o, o !== 0 && o !== i.retryLane && (i.retryLane = o, pn(e, o), Ot(r, e, o, -1))
        }
        return nf(), r = su(Error(L(421))), As(e, t, s, r)
    }
    return o.data === "$?" ? (t.flags |= 128, t.child = e.child, t = IE.bind(null, e), o._reactRetry = t, null) : (e = i.treeContext, ot = Gn(o.nextSibling), it = t, ce = !0, Lt = null, e !== null && (ft[ht++] = un, ft[ht++] = cn, ft[ht++] = Nr, un = e.id, cn = e.overflow, Nr = t), t = Xd(t, r.children), t.flags |= 4096, t)
}

function sp(e, t, n) {
    e.lanes |= t;
    var r = e.alternate;
    r !== null && (r.lanes |= t), lc(e.return, t, n)
}

function au(e, t, n, r, o) {
    var i = e.memoizedState;
    i === null ? e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: r,
        tail: n,
        tailMode: o
    } : (i.isBackwards = t, i.rendering = null, i.renderingStartTime = 0, i.last = r, i.tail = n, i.tailMode = o)
}

function Sv(e, t, n) {
    var r = t.pendingProps,
        o = r.revealOrder,
        i = r.tail;
    if (ze(e, t, r.children, n), r = fe.current, r & 2) r = r & 1 | 2, t.flags |= 128;
    else {
        if (e !== null && e.flags & 128) e: for (e = t.child; e !== null;) {
            if (e.tag === 13) e.memoizedState !== null && sp(e, n, t);
            else if (e.tag === 19) sp(e, n, t);
            else if (e.child !== null) {
                e.child.return = e, e = e.child;
                continue
            }
            if (e === t) break e;
            for (; e.sibling === null;) {
                if (e.return === null || e.return === t) break e;
                e = e.return
            }
            e.sibling.return = e.return, e = e.sibling
        }
        r &= 1
    }
    if (oe(fe, r), !(t.mode & 1)) t.memoizedState = null;
    else switch (o) {
        case "forwards":
            for (n = t.child, o = null; n !== null;) e = n.alternate, e !== null && Ra(e) === null && (o = n), n = n.sibling;
            n = o, n === null ? (o = t.child, t.child = null) : (o = n.sibling, n.sibling = null), au(t, !1, o, n, i);
            break;
        case "backwards":
            for (n = null, o = t.child, t.child = null; o !== null;) {
                if (e = o.alternate, e !== null && Ra(e) === null) {
                    t.child = o;
                    break
                }
                e = o.sibling, o.sibling = n, n = o, o = e
            }
            au(t, !0, n, null, i);
            break;
        case "together":
            au(t, !1, null, null, void 0);
            break;
        default:
            t.memoizedState = null
    }
    return t.child
}

function qs(e, t) {
    !(t.mode & 1) && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2)
}

function mn(e, t, n) {
    if (e !== null && (t.dependencies = e.dependencies), Ir |= t.lanes, !(n & t.childLanes)) return null;
    if (e !== null && t.child !== e.child) throw Error(L(153));
    if (t.child !== null) {
        for (e = t.child, n = qn(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null;) e = e.sibling, n = n.sibling = qn(e, e.pendingProps), n.return = t;
        n.sibling = null
    }
    return t.child
}

function CE(e, t, n) {
    switch (t.tag) {
        case 3:
            wv(t), Mo();
            break;
        case 5:
            Gy(t);
            break;
        case 1:
            qe(t.type) && Ea(t);
            break;
        case 4:
            Bd(t, t.stateNode.containerInfo);
            break;
        case 10:
            var r = t.type._context,
                o = t.memoizedProps.value;
            oe(Pa, r._currentValue), r._currentValue = o;
            break;
        case 13:
            if (r = t.memoizedState, r !== null) return r.dehydrated !== null ? (oe(fe, fe.current & 1), t.flags |= 128, null) : n & t.child.childLanes ? xv(e, t, n) : (oe(fe, fe.current & 1), e = mn(e, t, n), e !== null ? e.sibling : null);
            oe(fe, fe.current & 1);
            break;
        case 19:
            if (r = (n & t.childLanes) !== 0, e.flags & 128) {
                if (r) return Sv(e, t, n);
                t.flags |= 128
            }
            if (o = t.memoizedState, o !== null && (o.rendering = null, o.tail = null, o.lastEffect = null), oe(fe, fe.current), r) break;
            return null;
        case 22:
        case 23:
            return t.lanes = 0, yv(e, t, n)
    }
    return mn(e, t, n)
}
var Ev, gc, Cv, Tv;
Ev = function(e, t) {
    for (var n = t.child; n !== null;) {
        if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
        else if (n.tag !== 4 && n.child !== null) {
            n.child.return = n, n = n.child;
            continue
        }
        if (n === t) break;
        for (; n.sibling === null;) {
            if (n.return === null || n.return === t) return;
            n = n.return
        }
        n.sibling.return = n.return, n = n.sibling
    }
};
gc = function() {};
Cv = function(e, t, n, r) {
    var o = e.memoizedProps;
    if (o !== r) {
        e = t.stateNode, wr(Xt.current);
        var i = null;
        switch (n) {
            case "input":
                o = ju(e, o), r = ju(e, r), i = [];
                break;
            case "select":
                o = pe({}, o, {
                    value: void 0
                }), r = pe({}, r, {
                    value: void 0
                }), i = [];
                break;
            case "textarea":
                o = $u(e, o), r = $u(e, r), i = [];
                break;
            default:
                typeof o.onClick != "function" && typeof r.onClick == "function" && (e.onclick = xa)
        }
        Uu(n, r);
        var s;
        n = null;
        for (u in o)
            if (!r.hasOwnProperty(u) && o.hasOwnProperty(u) && o[u] != null)
                if (u === "style") {
                    var a = o[u];
                    for (s in a) a.hasOwnProperty(s) && (n || (n = {}), n[s] = "")
                } else u !== "dangerouslySetInnerHTML" && u !== "children" && u !== "suppressContentEditableWarning" && u !== "suppressHydrationWarning" && u !== "autoFocus" && (ki.hasOwnProperty(u) ? i || (i = []) : (i = i || []).push(u, null));
        for (u in r) {
            var l = r[u];
            if (a = o != null ? o[u] : void 0, r.hasOwnProperty(u) && l !== a && (l != null || a != null))
                if (u === "style")
                    if (a) {
                        for (s in a) !a.hasOwnProperty(s) || l && l.hasOwnProperty(s) || (n || (n = {}), n[s] = "");
                        for (s in l) l.hasOwnProperty(s) && a[s] !== l[s] && (n || (n = {}), n[s] = l[s])
                    } else n || (i || (i = []), i.push(u, n)), n = l;
            else u === "dangerouslySetInnerHTML" ? (l = l ? l.__html : void 0, a = a ? a.__html : void 0, l != null && a !== l && (i = i || []).push(u, l)) : u === "children" ? typeof l != "string" && typeof l != "number" || (i = i || []).push(u, "" + l) : u !== "suppressContentEditableWarning" && u !== "suppressHydrationWarning" && (ki.hasOwnProperty(u) ? (l != null && u === "onScroll" && se("scroll", e), i || a === l || (i = [])) : (i = i || []).push(u, l))
        }
        n && (i = i || []).push("style", n);
        var u = i;
        (t.updateQueue = u) && (t.flags |= 4)
    }
};
Tv = function(e, t, n, r) {
    n !== r && (t.flags |= 4)
};

function ri(e, t) {
    if (!ce) switch (e.tailMode) {
        case "hidden":
            t = e.tail;
            for (var n = null; t !== null;) t.alternate !== null && (n = t), t = t.sibling;
            n === null ? e.tail = null : n.sibling = null;
            break;
        case "collapsed":
            n = e.tail;
            for (var r = null; n !== null;) n.alternate !== null && (r = n), n = n.sibling;
            r === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : r.sibling = null
    }
}

function Ie(e) {
    var t = e.alternate !== null && e.alternate.child === e.child,
        n = 0,
        r = 0;
    if (t)
        for (var o = e.child; o !== null;) n |= o.lanes | o.childLanes, r |= o.subtreeFlags & 14680064, r |= o.flags & 14680064, o.return = e, o = o.sibling;
    else
        for (o = e.child; o !== null;) n |= o.lanes | o.childLanes, r |= o.subtreeFlags, r |= o.flags, o.return = e, o = o.sibling;
    return e.subtreeFlags |= r, e.childLanes = n, t
}

function TE(e, t, n) {
    var r = t.pendingProps;
    switch (Id(t), t.tag) {
        case 2:
        case 16:
        case 15:
        case 0:
        case 11:
        case 7:
        case 8:
        case 12:
        case 9:
        case 14:
            return Ie(t), null;
        case 1:
            return qe(t.type) && Sa(), Ie(t), null;
        case 3:
            return r = t.stateNode, Lo(), le(Xe), le(je), Wd(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (ks(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, Lt !== null && (Tc(Lt), Lt = null))), gc(e, t), Ie(t), null;
        case 5:
            Ud(t);
            var o = wr(Fi.current);
            if (n = t.type, e !== null && t.stateNode != null) Cv(e, t, n, r, o), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
            else {
                if (!r) {
                    if (t.stateNode === null) throw Error(L(166));
                    return Ie(t), null
                }
                if (e = wr(Xt.current), ks(t)) {
                    r = t.stateNode, n = t.type;
                    var i = t.memoizedProps;
                    switch (r[Gt] = t, r[Vi] = i, e = (t.mode & 1) !== 0, n) {
                        case "dialog":
                            se("cancel", r), se("close", r);
                            break;
                        case "iframe":
                        case "object":
                        case "embed":
                            se("load", r);
                            break;
                        case "video":
                        case "audio":
                            for (o = 0; o < di.length; o++) se(di[o], r);
                            break;
                        case "source":
                            se("error", r);
                            break;
                        case "img":
                        case "image":
                        case "link":
                            se("error", r), se("load", r);
                            break;
                        case "details":
                            se("toggle", r);
                            break;
                        case "input":
                            mh(r, i), se("invalid", r);
                            break;
                        case "select":
                            r._wrapperState = {
                                wasMultiple: !!i.multiple
                            }, se("invalid", r);
                            break;
                        case "textarea":
                            yh(r, i), se("invalid", r)
                    }
                    Uu(n, i), o = null;
                    for (var s in i)
                        if (i.hasOwnProperty(s)) {
                            var a = i[s];
                            s === "children" ? typeof a == "string" ? r.textContent !== a && (i.suppressHydrationWarning !== !0 && bs(r.textContent, a, e), o = ["children", a]) : typeof a == "number" && r.textContent !== "" + a && (i.suppressHydrationWarning !== !0 && bs(r.textContent, a, e), o = ["children", "" + a]) : ki.hasOwnProperty(s) && a != null && s === "onScroll" && se("scroll", r)
                        } switch (n) {
                        case "input":
                            vs(r), gh(r, i, !0);
                            break;
                        case "textarea":
                            vs(r), vh(r);
                            break;
                        case "select":
                        case "option":
                            break;
                        default:
                            typeof i.onClick == "function" && (r.onclick = xa)
                    }
                    r = o, t.updateQueue = r, r !== null && (t.flags |= 4)
                } else {
                    s = o.nodeType === 9 ? o : o.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = Zg(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = s.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = s.createElement(n, {
                        is: r.is
                    }) : (e = s.createElement(n), n === "select" && (s = e, r.multiple ? s.multiple = !0 : r.size && (s.size = r.size))) : e = s.createElementNS(e, n), e[Gt] = t, e[Vi] = r, Ev(e, t, !1, !1), t.stateNode = e;
                    e: {
                        switch (s = Wu(n, r), n) {
                            case "dialog":
                                se("cancel", e), se("close", e), o = r;
                                break;
                            case "iframe":
                            case "object":
                            case "embed":
                                se("load", e), o = r;
                                break;
                            case "video":
                            case "audio":
                                for (o = 0; o < di.length; o++) se(di[o], e);
                                o = r;
                                break;
                            case "source":
                                se("error", e), o = r;
                                break;
                            case "img":
                            case "image":
                            case "link":
                                se("error", e), se("load", e), o = r;
                                break;
                            case "details":
                                se("toggle", e), o = r;
                                break;
                            case "input":
                                mh(e, r), o = ju(e, r), se("invalid", e);
                                break;
                            case "option":
                                o = r;
                                break;
                            case "select":
                                e._wrapperState = {
                                    wasMultiple: !!r.multiple
                                }, o = pe({}, r, {
                                    value: void 0
                                }), se("invalid", e);
                                break;
                            case "textarea":
                                yh(e, r), o = $u(e, r), se("invalid", e);
                                break;
                            default:
                                o = r
                        }
                        Uu(n, o),
                        a = o;
                        for (i in a)
                            if (a.hasOwnProperty(i)) {
                                var l = a[i];
                                i === "style" ? ty(e, l) : i === "dangerouslySetInnerHTML" ? (l = l ? l.__html : void 0, l != null && Jg(e, l)) : i === "children" ? typeof l == "string" ? (n !== "textarea" || l !== "") && Ri(e, l) : typeof l == "number" && Ri(e, "" + l) : i !== "suppressContentEditableWarning" && i !== "suppressHydrationWarning" && i !== "autoFocus" && (ki.hasOwnProperty(i) ? l != null && i === "onScroll" && se("scroll", e) : l != null && xd(e, i, l, s))
                            } switch (n) {
                            case "input":
                                vs(e), gh(e, r, !1);
                                break;
                            case "textarea":
                                vs(e), vh(e);
                                break;
                            case "option":
                                r.value != null && e.setAttribute("value", "" + Zn(r.value));
                                break;
                            case "select":
                                e.multiple = !!r.multiple, i = r.value, i != null ? co(e, !!r.multiple, i, !1) : r.defaultValue != null && co(e, !!r.multiple, r.defaultValue, !0);
                                break;
                            default:
                                typeof o.onClick == "function" && (e.onclick = xa)
                        }
                        switch (n) {
                            case "button":
                            case "input":
                            case "select":
                            case "textarea":
                                r = !!r.autoFocus;
                                break e;
                            case "img":
                                r = !0;
                                break e;
                            default:
                                r = !1
                        }
                    }
                    r && (t.flags |= 4)
                }
                t.ref !== null && (t.flags |= 512, t.flags |= 2097152)
            }
            return Ie(t), null;
        case 6:
            if (e && t.stateNode != null) Tv(e, t, e.memoizedProps, r);
            else {
                if (typeof r != "string" && t.stateNode === null) throw Error(L(166));
                if (n = wr(Fi.current), wr(Xt.current), ks(t)) {
                    if (r = t.stateNode, n = t.memoizedProps, r[Gt] = t, (i = r.nodeValue !== n) && (e = it, e !== null)) switch (e.tag) {
                        case 3:
                            bs(r.nodeValue, n, (e.mode & 1) !== 0);
                            break;
                        case 5:
                            e.memoizedProps.suppressHydrationWarning !== !0 && bs(r.nodeValue, n, (e.mode & 1) !== 0)
                    }
                    i && (t.flags |= 4)
                } else r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r), r[Gt] = t, t.stateNode = r
            }
            return Ie(t), null;
        case 13:
            if (le(fe), r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
                if (ce && ot !== null && t.mode & 1 && !(t.flags & 128)) By(), Mo(), t.flags |= 98560, i = !1;
                else if (i = ks(t), r !== null && r.dehydrated !== null) {
                    if (e === null) {
                        if (!i) throw Error(L(318));
                        if (i = t.memoizedState, i = i !== null ? i.dehydrated : null, !i) throw Error(L(317));
                        i[Gt] = t
                    } else Mo(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
                    Ie(t), i = !1
                } else Lt !== null && (Tc(Lt), Lt = null), i = !0;
                if (!i) return t.flags & 65536 ? t : null
            }
            return t.flags & 128 ? (t.lanes = n, t) : (r = r !== null, r !== (e !== null && e.memoizedState !== null) && r && (t.child.flags |= 8192, t.mode & 1 && (e === null || fe.current & 1 ? Te === 0 && (Te = 3) : nf())), t.updateQueue !== null && (t.flags |= 4), Ie(t), null);
        case 4:
            return Lo(), gc(e, t), e === null && Ii(t.stateNode.containerInfo), Ie(t), null;
        case 10:
            return Fd(t.type._context), Ie(t), null;
        case 17:
            return qe(t.type) && Sa(), Ie(t), null;
        case 19:
            if (le(fe), i = t.memoizedState, i === null) return Ie(t), null;
            if (r = (t.flags & 128) !== 0, s = i.rendering, s === null)
                if (r) ri(i, !1);
                else {
                    if (Te !== 0 || e !== null && e.flags & 128)
                        for (e = t.child; e !== null;) {
                            if (s = Ra(e), s !== null) {
                                for (t.flags |= 128, ri(i, !1), r = s.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), t.subtreeFlags = 0, r = n, n = t.child; n !== null;) i = n, e = r, i.flags &= 14680066, s = i.alternate, s === null ? (i.childLanes = 0, i.lanes = e, i.child = null, i.subtreeFlags = 0, i.memoizedProps = null, i.memoizedState = null, i.updateQueue = null, i.dependencies = null, i.stateNode = null) : (i.childLanes = s.childLanes, i.lanes = s.lanes, i.child = s.child, i.subtreeFlags = 0, i.deletions = null, i.memoizedProps = s.memoizedProps, i.memoizedState = s.memoizedState, i.updateQueue = s.updateQueue, i.type = s.type, e = s.dependencies, i.dependencies = e === null ? null : {
                                    lanes: e.lanes,
                                    firstContext: e.firstContext
                                }), n = n.sibling;
                                return oe(fe, fe.current & 1 | 2), t.child
                            }
                            e = e.sibling
                        }
                    i.tail !== null && ye() > Oo && (t.flags |= 128, r = !0, ri(i, !1), t.lanes = 4194304)
                }
            else {
                if (!r)
                    if (e = Ra(s), e !== null) {
                        if (t.flags |= 128, r = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), ri(i, !0), i.tail === null && i.tailMode === "hidden" && !s.alternate && !ce) return Ie(t), null
                    } else 2 * ye() - i.renderingStartTime > Oo && n !== 1073741824 && (t.flags |= 128, r = !0, ri(i, !1), t.lanes = 4194304);
                i.isBackwards ? (s.sibling = t.child, t.child = s) : (n = i.last, n !== null ? n.sibling = s : t.child = s, i.last = s)
            }
            return i.tail !== null ? (t = i.tail, i.rendering = t, i.tail = t.sibling, i.renderingStartTime = ye(), t.sibling = null, n = fe.current, oe(fe, r ? n & 1 | 2 : n & 1), t) : (Ie(t), null);
        case 22:
        case 23:
            return tf(), r = t.memoizedState !== null, e !== null && e.memoizedState !== null !== r && (t.flags |= 8192), r && t.mode & 1 ? nt & 1073741824 && (Ie(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Ie(t), null;
        case 24:
            return null;
        case 25:
            return null
    }
    throw Error(L(156, t.tag))
}

function PE(e, t) {
    switch (Id(t), t.tag) {
        case 1:
            return qe(t.type) && Sa(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
        case 3:
            return Lo(), le(Xe), le(je), Wd(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
        case 5:
            return Ud(t), null;
        case 13:
            if (le(fe), e = t.memoizedState, e !== null && e.dehydrated !== null) {
                if (t.alternate === null) throw Error(L(340));
                Mo()
            }
            return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
        case 19:
            return le(fe), null;
        case 4:
            return Lo(), null;
        case 10:
            return Fd(t.type._context), null;
        case 22:
        case 23:
            return tf(), null;
        case 24:
            return null;
        default:
            return null
    }
}
var Ms = !1,
    Ve = !1,
    bE = typeof WeakSet == "function" ? WeakSet : Set,
    j = null;

function io(e, t) {
    var n = e.ref;
    if (n !== null)
        if (typeof n == "function") try {
            n(null)
        } catch (r) {
            ge(e, t, r)
        } else n.current = null
}

function yc(e, t, n) {
    try {
        n()
    } catch (r) {
        ge(e, t, r)
    }
}
var ap = !1;

function kE(e, t) {
    if (ec = ya, e = Ay(), Nd(e)) {
        if ("selectionStart" in e) var n = {
            start: e.selectionStart,
            end: e.selectionEnd
        };
        else e: {
            n = (n = e.ownerDocument) && n.defaultView || window;
            var r = n.getSelection && n.getSelection();
            if (r && r.rangeCount !== 0) {
                n = r.anchorNode;
                var o = r.anchorOffset,
                    i = r.focusNode;
                r = r.focusOffset;
                try {
                    n.nodeType, i.nodeType
                } catch {
                    n = null;
                    break e
                }
                var s = 0,
                    a = -1,
                    l = -1,
                    u = 0,
                    c = 0,
                    d = e,
                    h = null;
                t: for (;;) {
                    for (var f; d !== n || o !== 0 && d.nodeType !== 3 || (a = s + o), d !== i || r !== 0 && d.nodeType !== 3 || (l = s + r), d.nodeType === 3 && (s += d.nodeValue.length), (f = d.firstChild) !== null;) h = d, d = f;
                    for (;;) {
                        if (d === e) break t;
                        if (h === n && ++u === o && (a = s), h === i && ++c === r && (l = s), (f = d.nextSibling) !== null) break;
                        d = h, h = d.parentNode
                    }
                    d = f
                }
                n = a === -1 || l === -1 ? null : {
                    start: a,
                    end: l
                }
            } else n = null
        }
        n = n || {
            start: 0,
            end: 0
        }
    } else n = null;
    for (tc = {
            focusedElem: e,
            selectionRange: n
        }, ya = !1, j = t; j !== null;)
        if (t = j, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, j = e;
        else
            for (; j !== null;) {
                t = j;
                try {
                    var v = t.alternate;
                    if (t.flags & 1024) switch (t.tag) {
                        case 0:
                        case 11:
                        case 15:
                            break;
                        case 1:
                            if (v !== null) {
                                var g = v.memoizedProps,
                                    w = v.memoizedState,
                                    m = t.stateNode,
                                    p = m.getSnapshotBeforeUpdate(t.elementType === t.type ? g : kt(t.type, g), w);
                                m.__reactInternalSnapshotBeforeUpdate = p
                            }
                            break;
                        case 3:
                            var y = t.stateNode.containerInfo;
                            y.nodeType === 1 ? y.textContent = "" : y.nodeType === 9 && y.documentElement && y.removeChild(y.documentElement);
                            break;
                        case 5:
                        case 6:
                        case 4:
                        case 17:
                            break;
                        default:
                            throw Error(L(163))
                    }
                } catch (S) {
                    ge(t, t.return, S)
                }
                if (e = t.sibling, e !== null) {
                    e.return = t.return, j = e;
                    break
                }
                j = t.return
            }
    return v = ap, ap = !1, v
}

function wi(e, t, n) {
    var r = t.updateQueue;
    if (r = r !== null ? r.lastEffect : null, r !== null) {
        var o = r = r.next;
        do {
            if ((o.tag & e) === e) {
                var i = o.destroy;
                o.destroy = void 0, i !== void 0 && yc(t, n, i)
            }
            o = o.next
        } while (o !== r)
    }
}

function al(e, t) {
    if (t = t.updateQueue, t = t !== null ? t.lastEffect : null, t !== null) {
        var n = t = t.next;
        do {
            if ((n.tag & e) === e) {
                var r = n.create;
                n.destroy = r()
            }
            n = n.next
        } while (n !== t)
    }
}

function vc(e) {
    var t = e.ref;
    if (t !== null) {
        var n = e.stateNode;
        switch (e.tag) {
            case 5:
                e = n;
                break;
            default:
                e = n
        }
        typeof t == "function" ? t(e) : t.current = e
    }
}

function Pv(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, Pv(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[Gt], delete t[Vi], delete t[oc], delete t[uE], delete t[cE])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null
}

function bv(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 4
}

function lp(e) {
    e: for (;;) {
        for (; e.sibling === null;) {
            if (e.return === null || bv(e.return)) return null;
            e = e.return
        }
        for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18;) {
            if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
            e.child.return = e, e = e.child
        }
        if (!(e.flags & 2)) return e.stateNode
    }
}

function wc(e, t, n) {
    var r = e.tag;
    if (r === 5 || r === 6) e = e.stateNode, t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode, t.insertBefore(e, n)) : (t = n, t.appendChild(e)), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = xa));
    else if (r !== 4 && (e = e.child, e !== null))
        for (wc(e, t, n), e = e.sibling; e !== null;) wc(e, t, n), e = e.sibling
}

function xc(e, t, n) {
    var r = e.tag;
    if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
    else if (r !== 4 && (e = e.child, e !== null))
        for (xc(e, t, n), e = e.sibling; e !== null;) xc(e, t, n), e = e.sibling
}
var ke = null,
    Dt = !1;

function Pn(e, t, n) {
    for (n = n.child; n !== null;) kv(e, t, n), n = n.sibling
}

function kv(e, t, n) {
    if (Yt && typeof Yt.onCommitFiberUnmount == "function") try {
        Yt.onCommitFiberUnmount(Ja, n)
    } catch {}
    switch (n.tag) {
        case 5:
            Ve || io(n, t);
        case 6:
            var r = ke,
                o = Dt;
            ke = null, Pn(e, t, n), ke = r, Dt = o, ke !== null && (Dt ? (e = ke, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : ke.removeChild(n.stateNode));
            break;
        case 18:
            ke !== null && (Dt ? (e = ke, n = n.stateNode, e.nodeType === 8 ? eu(e.parentNode, n) : e.nodeType === 1 && eu(e, n), Li(e)) : eu(ke, n.stateNode));
            break;
        case 4:
            r = ke, o = Dt, ke = n.stateNode.containerInfo, Dt = !0, Pn(e, t, n), ke = r, Dt = o;
            break;
        case 0:
        case 11:
        case 14:
        case 15:
            if (!Ve && (r = n.updateQueue, r !== null && (r = r.lastEffect, r !== null))) {
                o = r = r.next;
                do {
                    var i = o,
                        s = i.destroy;
                    i = i.tag, s !== void 0 && (i & 2 || i & 4) && yc(n, t, s), o = o.next
                } while (o !== r)
            }
            Pn(e, t, n);
            break;
        case 1:
            if (!Ve && (io(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function")) try {
                r.props = n.memoizedProps, r.state = n.memoizedState, r.componentWillUnmount()
            } catch (a) {
                ge(n, t, a)
            }
            Pn(e, t, n);
            break;
        case 21:
            Pn(e, t, n);
            break;
        case 22:
            n.mode & 1 ? (Ve = (r = Ve) || n.memoizedState !== null, Pn(e, t, n), Ve = r) : Pn(e, t, n);
            break;
        default:
            Pn(e, t, n)
    }
}

function up(e) {
    var t = e.updateQueue;
    if (t !== null) {
        e.updateQueue = null;
        var n = e.stateNode;
        n === null && (n = e.stateNode = new bE), t.forEach(function(r) {
            var o = _E.bind(null, e, r);
            n.has(r) || (n.add(r), r.then(o, o))
        })
    }
}

function Ct(e, t) {
    var n = t.deletions;
    if (n !== null)
        for (var r = 0; r < n.length; r++) {
            var o = n[r];
            try {
                var i = e,
                    s = t,
                    a = s;
                e: for (; a !== null;) {
                    switch (a.tag) {
                        case 5:
                            ke = a.stateNode, Dt = !1;
                            break e;
                        case 3:
                            ke = a.stateNode.containerInfo, Dt = !0;
                            break e;
                        case 4:
                            ke = a.stateNode.containerInfo, Dt = !0;
                            break e
                    }
                    a = a.return
                }
                if (ke === null) throw Error(L(160));
                kv(i, s, o), ke = null, Dt = !1;
                var l = o.alternate;
                l !== null && (l.return = null), o.return = null
            } catch (u) {
                ge(o, t, u)
            }
        }
    if (t.subtreeFlags & 12854)
        for (t = t.child; t !== null;) Rv(t, e), t = t.sibling
}

function Rv(e, t) {
    var n = e.alternate,
        r = e.flags;
    switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
            if (Ct(t, e), zt(e), r & 4) {
                try {
                    wi(3, e, e.return), al(3, e)
                } catch (g) {
                    ge(e, e.return, g)
                }
                try {
                    wi(5, e, e.return)
                } catch (g) {
                    ge(e, e.return, g)
                }
            }
            break;
        case 1:
            Ct(t, e), zt(e), r & 512 && n !== null && io(n, n.return);
            break;
        case 5:
            if (Ct(t, e), zt(e), r & 512 && n !== null && io(n, n.return), e.flags & 32) {
                var o = e.stateNode;
                try {
                    Ri(o, "")
                } catch (g) {
                    ge(e, e.return, g)
                }
            }
            if (r & 4 && (o = e.stateNode, o != null)) {
                var i = e.memoizedProps,
                    s = n !== null ? n.memoizedProps : i,
                    a = e.type,
                    l = e.updateQueue;
                if (e.updateQueue = null, l !== null) try {
                    a === "input" && i.type === "radio" && i.name != null && Xg(o, i), Wu(a, s);
                    var u = Wu(a, i);
                    for (s = 0; s < l.length; s += 2) {
                        var c = l[s],
                            d = l[s + 1];
                        c === "style" ? ty(o, d) : c === "dangerouslySetInnerHTML" ? Jg(o, d) : c === "children" ? Ri(o, d) : xd(o, c, d, u)
                    }
                    switch (a) {
                        case "input":
                            Fu(o, i);
                            break;
                        case "textarea":
                            qg(o, i);
                            break;
                        case "select":
                            var h = o._wrapperState.wasMultiple;
                            o._wrapperState.wasMultiple = !!i.multiple;
                            var f = i.value;
                            f != null ? co(o, !!i.multiple, f, !1) : h !== !!i.multiple && (i.defaultValue != null ? co(o, !!i.multiple, i.defaultValue, !0) : co(o, !!i.multiple, i.multiple ? [] : "", !1))
                    }
                    o[Vi] = i
                } catch (g) {
                    ge(e, e.return, g)
                }
            }
            break;
        case 6:
            if (Ct(t, e), zt(e), r & 4) {
                if (e.stateNode === null) throw Error(L(162));
                o = e.stateNode, i = e.memoizedProps;
                try {
                    o.nodeValue = i
                } catch (g) {
                    ge(e, e.return, g)
                }
            }
            break;
        case 3:
            if (Ct(t, e), zt(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
                Li(t.containerInfo)
            } catch (g) {
                ge(e, e.return, g)
            }
            break;
        case 4:
            Ct(t, e), zt(e);
            break;
        case 13:
            Ct(t, e), zt(e), o = e.child, o.flags & 8192 && (i = o.memoizedState !== null, o.stateNode.isHidden = i, !i || o.alternate !== null && o.alternate.memoizedState !== null || (Jd = ye())), r & 4 && up(e);
            break;
        case 22:
            if (c = n !== null && n.memoizedState !== null, e.mode & 1 ? (Ve = (u = Ve) || c, Ct(t, e), Ve = u) : Ct(t, e), zt(e), r & 8192) {
                if (u = e.memoizedState !== null, (e.stateNode.isHidden = u) && !c && e.mode & 1)
                    for (j = e, c = e.child; c !== null;) {
                        for (d = j = c; j !== null;) {
                            switch (h = j, f = h.child, h.tag) {
                                case 0:
                                case 11:
                                case 14:
                                case 15:
                                    wi(4, h, h.return);
                                    break;
                                case 1:
                                    io(h, h.return);
                                    var v = h.stateNode;
                                    if (typeof v.componentWillUnmount == "function") {
                                        r = h, n = h.return;
                                        try {
                                            t = r, v.props = t.memoizedProps, v.state = t.memoizedState, v.componentWillUnmount()
                                        } catch (g) {
                                            ge(r, n, g)
                                        }
                                    }
                                    break;
                                case 5:
                                    io(h, h.return);
                                    break;
                                case 22:
                                    if (h.memoizedState !== null) {
                                        dp(d);
                                        continue
                                    }
                            }
                            f !== null ? (f.return = h, j = f) : dp(d)
                        }
                        c = c.sibling
                    }
                e: for (c = null, d = e;;) {
                    if (d.tag === 5) {
                        if (c === null) {
                            c = d;
                            try {
                                o = d.stateNode, u ? (i = o.style, typeof i.setProperty == "function" ? i.setProperty("display", "none", "important") : i.display = "none") : (a = d.stateNode, l = d.memoizedProps.style, s = l != null && l.hasOwnProperty("display") ? l.display : null, a.style.display = ey("display", s))
                            } catch (g) {
                                ge(e, e.return, g)
                            }
                        }
                    } else if (d.tag === 6) {
                        if (c === null) try {
                            d.stateNode.nodeValue = u ? "" : d.memoizedProps
                        } catch (g) {
                            ge(e, e.return, g)
                        }
                    } else if ((d.tag !== 22 && d.tag !== 23 || d.memoizedState === null || d === e) && d.child !== null) {
                        d.child.return = d, d = d.child;
                        continue
                    }
                    if (d === e) break e;
                    for (; d.sibling === null;) {
                        if (d.return === null || d.return === e) break e;
                        c === d && (c = null), d = d.return
                    }
                    c === d && (c = null), d.sibling.return = d.return, d = d.sibling
                }
            }
            break;
        case 19:
            Ct(t, e), zt(e), r & 4 && up(e);
            break;
        case 21:
            break;
        default:
            Ct(t, e), zt(e)
    }
}

function zt(e) {
    var t = e.flags;
    if (t & 2) {
        try {
            e: {
                for (var n = e.return; n !== null;) {
                    if (bv(n)) {
                        var r = n;
                        break e
                    }
                    n = n.return
                }
                throw Error(L(160))
            }
            switch (r.tag) {
                case 5:
                    var o = r.stateNode;
                    r.flags & 32 && (Ri(o, ""), r.flags &= -33);
                    var i = lp(e);
                    xc(e, i, o);
                    break;
                case 3:
                case 4:
                    var s = r.stateNode.containerInfo,
                        a = lp(e);
                    wc(e, a, s);
                    break;
                default:
                    throw Error(L(161))
            }
        }
        catch (l) {
            ge(e, e.return, l)
        }
        e.flags &= -3
    }
    t & 4096 && (e.flags &= -4097)
}

function RE(e, t, n) {
    j = e, Av(e)
}

function Av(e, t, n) {
    for (var r = (e.mode & 1) !== 0; j !== null;) {
        var o = j,
            i = o.child;
        if (o.tag === 22 && r) {
            var s = o.memoizedState !== null || Ms;
            if (!s) {
                var a = o.alternate,
                    l = a !== null && a.memoizedState !== null || Ve;
                a = Ms;
                var u = Ve;
                if (Ms = s, (Ve = l) && !u)
                    for (j = o; j !== null;) s = j, l = s.child, s.tag === 22 && s.memoizedState !== null ? fp(o) : l !== null ? (l.return = s, j = l) : fp(o);
                for (; i !== null;) j = i, Av(i), i = i.sibling;
                j = o, Ms = a, Ve = u
            }
            cp(e)
        } else o.subtreeFlags & 8772 && i !== null ? (i.return = o, j = i) : cp(e)
    }
}

function cp(e) {
    for (; j !== null;) {
        var t = j;
        if (t.flags & 8772) {
            var n = t.alternate;
            try {
                if (t.flags & 8772) switch (t.tag) {
                    case 0:
                    case 11:
                    case 15:
                        Ve || al(5, t);
                        break;
                    case 1:
                        var r = t.stateNode;
                        if (t.flags & 4 && !Ve)
                            if (n === null) r.componentDidMount();
                            else {
                                var o = t.elementType === t.type ? n.memoizedProps : kt(t.type, n.memoizedProps);
                                r.componentDidUpdate(o, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate)
                            } var i = t.updateQueue;
                        i !== null && Qh(t, i, r);
                        break;
                    case 3:
                        var s = t.updateQueue;
                        if (s !== null) {
                            if (n = null, t.child !== null) switch (t.child.tag) {
                                case 5:
                                    n = t.child.stateNode;
                                    break;
                                case 1:
                                    n = t.child.stateNode
                            }
                            Qh(t, s, n)
                        }
                        break;
                    case 5:
                        var a = t.stateNode;
                        if (n === null && t.flags & 4) {
                            n = a;
                            var l = t.memoizedProps;
                            switch (t.type) {
                                case "button":
                                case "input":
                                case "select":
                                case "textarea":
                                    l.autoFocus && n.focus();
                                    break;
                                case "img":
                                    l.src && (n.src = l.src)
                            }
                        }
                        break;
                    case 6:
                        break;
                    case 4:
                        break;
                    case 12:
                        break;
                    case 13:
                        if (t.memoizedState === null) {
                            var u = t.alternate;
                            if (u !== null) {
                                var c = u.memoizedState;
                                if (c !== null) {
                                    var d = c.dehydrated;
                                    d !== null && Li(d)
                                }
                            }
                        }
                        break;
                    case 19:
                    case 17:
                    case 21:
                    case 22:
                    case 23:
                    case 25:
                        break;
                    default:
                        throw Error(L(163))
                }
                Ve || t.flags & 512 && vc(t)
            } catch (h) {
                ge(t, t.return, h)
            }
        }
        if (t === e) {
            j = null;
            break
        }
        if (n = t.sibling, n !== null) {
            n.return = t.return, j = n;
            break
        }
        j = t.return
    }
}

function dp(e) {
    for (; j !== null;) {
        var t = j;
        if (t === e) {
            j = null;
            break
        }
        var n = t.sibling;
        if (n !== null) {
            n.return = t.return, j = n;
            break
        }
        j = t.return
    }
}

function fp(e) {
    for (; j !== null;) {
        var t = j;
        try {
            switch (t.tag) {
                case 0:
                case 11:
                case 15:
                    var n = t.return;
                    try {
                        al(4, t)
                    } catch (l) {
                        ge(t, n, l)
                    }
                    break;
                case 1:
                    var r = t.stateNode;
                    if (typeof r.componentDidMount == "function") {
                        var o = t.return;
                        try {
                            r.componentDidMount()
                        } catch (l) {
                            ge(t, o, l)
                        }
                    }
                    var i = t.return;
                    try {
                        vc(t)
                    } catch (l) {
                        ge(t, i, l)
                    }
                    break;
                case 5:
                    var s = t.return;
                    try {
                        vc(t)
                    } catch (l) {
                        ge(t, s, l)
                    }
            }
        } catch (l) {
            ge(t, t.return, l)
        }
        if (t === e) {
            j = null;
            break
        }
        var a = t.sibling;
        if (a !== null) {
            a.return = t.return, j = a;
            break
        }
        j = t.return
    }
}
var AE = Math.ceil,
    Da = vn.ReactCurrentDispatcher,
    qd = vn.ReactCurrentOwner,
    gt = vn.ReactCurrentBatchConfig,
    Z = 0,
    be = null,
    xe = null,
    Me = 0,
    nt = 0,
    so = ar(0),
    Te = 0,
    Ui = null,
    Ir = 0,
    ll = 0,
    Zd = 0,
    xi = null,
    Qe = null,
    Jd = 0,
    Oo = 1 / 0,
    on = null,
    La = !1,
    Sc = null,
    Yn = null,
    Ds = !1,
    $n = null,
    Na = 0,
    Si = 0,
    Ec = null,
    Zs = -1,
    Js = 0;

function We() {
    return Z & 6 ? ye() : Zs !== -1 ? Zs : Zs = ye()
}

function Xn(e) {
    return e.mode & 1 ? Z & 2 && Me !== 0 ? Me & -Me : fE.transition !== null ? (Js === 0 && (Js = hy()), Js) : (e = te, e !== 0 || (e = window.event, e = e === void 0 ? 16 : xy(e.type)), e) : 1
}

function Ot(e, t, n, r) {
    if (50 < Si) throw Si = 0, Ec = null, Error(L(185));
    ts(e, n, r), (!(Z & 2) || e !== be) && (e === be && (!(Z & 2) && (ll |= n), Te === 4 && On(e, Me)), Ze(e, r), n === 1 && Z === 0 && !(t.mode & 1) && (Oo = ye() + 500, ol && lr()))
}

function Ze(e, t) {
    var n = e.callbackNode;
    fS(e, t);
    var r = ga(e, e === be ? Me : 0);
    if (r === 0) n !== null && Sh(n), e.callbackNode = null, e.callbackPriority = 0;
    else if (t = r & -r, e.callbackPriority !== t) {
        if (n != null && Sh(n), t === 1) e.tag === 0 ? dE(hp.bind(null, e)) : Fy(hp.bind(null, e)), aE(function() {
            !(Z & 6) && lr()
        }), n = null;
        else {
            switch (py(r)) {
                case 1:
                    n = Pd;
                    break;
                case 4:
                    n = dy;
                    break;
                case 16:
                    n = ma;
                    break;
                case 536870912:
                    n = fy;
                    break;
                default:
                    n = ma
            }
            n = Vv(n, Mv.bind(null, e))
        }
        e.callbackPriority = t, e.callbackNode = n
    }
}

function Mv(e, t) {
    if (Zs = -1, Js = 0, Z & 6) throw Error(L(327));
    var n = e.callbackNode;
    if (go() && e.callbackNode !== n) return null;
    var r = ga(e, e === be ? Me : 0);
    if (r === 0) return null;
    if (r & 30 || r & e.expiredLanes || t) t = Oa(e, r);
    else {
        t = r;
        var o = Z;
        Z |= 2;
        var i = Lv();
        (be !== e || Me !== t) && (on = null, Oo = ye() + 500, Rr(e, t));
        do try {
            LE();
            break
        } catch (a) {
            Dv(e, a)
        }
        while (!0);
        jd(), Da.current = i, Z = o, xe !== null ? t = 0 : (be = null, Me = 0, t = Te)
    }
    if (t !== 0) {
        if (t === 2 && (o = Yu(e), o !== 0 && (r = o, t = Cc(e, o))), t === 1) throw n = Ui, Rr(e, 0), On(e, r), Ze(e, ye()), n;
        if (t === 6) On(e, r);
        else {
            if (o = e.current.alternate, !(r & 30) && !ME(o) && (t = Oa(e, r), t === 2 && (i = Yu(e), i !== 0 && (r = i, t = Cc(e, i))), t === 1)) throw n = Ui, Rr(e, 0), On(e, r), Ze(e, ye()), n;
            switch (e.finishedWork = o, e.finishedLanes = r, t) {
                case 0:
                case 1:
                    throw Error(L(345));
                case 2:
                    mr(e, Qe, on);
                    break;
                case 3:
                    if (On(e, r), (r & 130023424) === r && (t = Jd + 500 - ye(), 10 < t)) {
                        if (ga(e, 0) !== 0) break;
                        if (o = e.suspendedLanes, (o & r) !== r) {
                            We(), e.pingedLanes |= e.suspendedLanes & o;
                            break
                        }
                        e.timeoutHandle = rc(mr.bind(null, e, Qe, on), t);
                        break
                    }
                    mr(e, Qe, on);
                    break;
                case 4:
                    if (On(e, r), (r & 4194240) === r) break;
                    for (t = e.eventTimes, o = -1; 0 < r;) {
                        var s = 31 - Nt(r);
                        i = 1 << s, s = t[s], s > o && (o = s), r &= ~i
                    }
                    if (r = o, r = ye() - r, r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * AE(r / 1960)) - r, 10 < r) {
                        e.timeoutHandle = rc(mr.bind(null, e, Qe, on), r);
                        break
                    }
                    mr(e, Qe, on);
                    break;
                case 5:
                    mr(e, Qe, on);
                    break;
                default:
                    throw Error(L(329))
            }
        }
    }
    return Ze(e, ye()), e.callbackNode === n ? Mv.bind(null, e) : null
}

function Cc(e, t) {
    var n = xi;
    return e.current.memoizedState.isDehydrated && (Rr(e, t).flags |= 256), e = Oa(e, t), e !== 2 && (t = Qe, Qe = n, t !== null && Tc(t)), e
}

function Tc(e) {
    Qe === null ? Qe = e : Qe.push.apply(Qe, e)
}

function ME(e) {
    for (var t = e;;) {
        if (t.flags & 16384) {
            var n = t.updateQueue;
            if (n !== null && (n = n.stores, n !== null))
                for (var r = 0; r < n.length; r++) {
                    var o = n[r],
                        i = o.getSnapshot;
                    o = o.value;
                    try {
                        if (!_t(i(), o)) return !1
                    } catch {
                        return !1
                    }
                }
        }
        if (n = t.child, t.subtreeFlags & 16384 && n !== null) n.return = t, t = n;
        else {
            if (t === e) break;
            for (; t.sibling === null;) {
                if (t.return === null || t.return === e) return !0;
                t = t.return
            }
            t.sibling.return = t.return, t = t.sibling
        }
    }
    return !0
}

function On(e, t) {
    for (t &= ~Zd, t &= ~ll, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t;) {
        var n = 31 - Nt(t),
            r = 1 << n;
        e[n] = -1, t &= ~r
    }
}

function hp(e) {
    if (Z & 6) throw Error(L(327));
    go();
    var t = ga(e, 0);
    if (!(t & 1)) return Ze(e, ye()), null;
    var n = Oa(e, t);
    if (e.tag !== 0 && n === 2) {
        var r = Yu(e);
        r !== 0 && (t = r, n = Cc(e, r))
    }
    if (n === 1) throw n = Ui, Rr(e, 0), On(e, t), Ze(e, ye()), n;
    if (n === 6) throw Error(L(345));
    return e.finishedWork = e.current.alternate, e.finishedLanes = t, mr(e, Qe, on), Ze(e, ye()), null
}

function ef(e, t) {
    var n = Z;
    Z |= 1;
    try {
        return e(t)
    } finally {
        Z = n, Z === 0 && (Oo = ye() + 500, ol && lr())
    }
}

function _r(e) {
    $n !== null && $n.tag === 0 && !(Z & 6) && go();
    var t = Z;
    Z |= 1;
    var n = gt.transition,
        r = te;
    try {
        if (gt.transition = null, te = 1, e) return e()
    } finally {
        te = r, gt.transition = n, Z = t, !(Z & 6) && lr()
    }
}

function tf() {
    nt = so.current, le(so)
}

function Rr(e, t) {
    e.finishedWork = null, e.finishedLanes = 0;
    var n = e.timeoutHandle;
    if (n !== -1 && (e.timeoutHandle = -1, sE(n)), xe !== null)
        for (n = xe.return; n !== null;) {
            var r = n;
            switch (Id(r), r.tag) {
                case 1:
                    r = r.type.childContextTypes, r != null && Sa();
                    break;
                case 3:
                    Lo(), le(Xe), le(je), Wd();
                    break;
                case 5:
                    Ud(r);
                    break;
                case 4:
                    Lo();
                    break;
                case 13:
                    le(fe);
                    break;
                case 19:
                    le(fe);
                    break;
                case 10:
                    Fd(r.type._context);
                    break;
                case 22:
                case 23:
                    tf()
            }
            n = n.return
        }
    if (be = e, xe = e = qn(e.current, null), Me = nt = t, Te = 0, Ui = null, Zd = ll = Ir = 0, Qe = xi = null, vr !== null) {
        for (t = 0; t < vr.length; t++)
            if (n = vr[t], r = n.interleaved, r !== null) {
                n.interleaved = null;
                var o = r.next,
                    i = n.pending;
                if (i !== null) {
                    var s = i.next;
                    i.next = o, r.next = s
                }
                n.pending = r
            } vr = null
    }
    return e
}

function Dv(e, t) {
    do {
        var n = xe;
        try {
            if (jd(), Ys.current = Ma, Aa) {
                for (var r = he.memoizedState; r !== null;) {
                    var o = r.queue;
                    o !== null && (o.pending = null), r = r.next
                }
                Aa = !1
            }
            if (Or = 0, Pe = Ee = he = null, vi = !1, zi = 0, qd.current = null, n === null || n.return === null) {
                Te = 1, Ui = t, xe = null;
                break
            }
            e: {
                var i = e,
                    s = n.return,
                    a = n,
                    l = t;
                if (t = Me, a.flags |= 32768, l !== null && typeof l == "object" && typeof l.then == "function") {
                    var u = l,
                        c = a,
                        d = c.tag;
                    if (!(c.mode & 1) && (d === 0 || d === 11 || d === 15)) {
                        var h = c.alternate;
                        h ? (c.updateQueue = h.updateQueue, c.memoizedState = h.memoizedState, c.lanes = h.lanes) : (c.updateQueue = null, c.memoizedState = null)
                    }
                    var f = ep(s);
                    if (f !== null) {
                        f.flags &= -257, tp(f, s, a, i, t), f.mode & 1 && Jh(i, u, t), t = f, l = u;
                        var v = t.updateQueue;
                        if (v === null) {
                            var g = new Set;
                            g.add(l), t.updateQueue = g
                        } else v.add(l);
                        break e
                    } else {
                        if (!(t & 1)) {
                            Jh(i, u, t), nf();
                            break e
                        }
                        l = Error(L(426))
                    }
                } else if (ce && a.mode & 1) {
                    var w = ep(s);
                    if (w !== null) {
                        !(w.flags & 65536) && (w.flags |= 256), tp(w, s, a, i, t), _d(No(l, a));
                        break e
                    }
                }
                i = l = No(l, a),
                Te !== 4 && (Te = 2),
                xi === null ? xi = [i] : xi.push(i),
                i = s;do {
                    switch (i.tag) {
                        case 3:
                            i.flags |= 65536, t &= -t, i.lanes |= t;
                            var m = pv(i, l, t);
                            Gh(i, m);
                            break e;
                        case 1:
                            a = l;
                            var p = i.type,
                                y = i.stateNode;
                            if (!(i.flags & 128) && (typeof p.getDerivedStateFromError == "function" || y !== null && typeof y.componentDidCatch == "function" && (Yn === null || !Yn.has(y)))) {
                                i.flags |= 65536, t &= -t, i.lanes |= t;
                                var S = mv(i, a, t);
                                Gh(i, S);
                                break e
                            }
                    }
                    i = i.return
                } while (i !== null)
            }
            Ov(n)
        } catch (E) {
            t = E, xe === n && n !== null && (xe = n = n.return);
            continue
        }
        break
    } while (!0)
}

function Lv() {
    var e = Da.current;
    return Da.current = Ma, e === null ? Ma : e
}

function nf() {
    (Te === 0 || Te === 3 || Te === 2) && (Te = 4), be === null || !(Ir & 268435455) && !(ll & 268435455) || On(be, Me)
}

function Oa(e, t) {
    var n = Z;
    Z |= 2;
    var r = Lv();
    (be !== e || Me !== t) && (on = null, Rr(e, t));
    do try {
        DE();
        break
    } catch (o) {
        Dv(e, o)
    }
    while (!0);
    if (jd(), Z = n, Da.current = r, xe !== null) throw Error(L(261));
    return be = null, Me = 0, Te
}

function DE() {
    for (; xe !== null;) Nv(xe)
}

function LE() {
    for (; xe !== null && !rS();) Nv(xe)
}

function Nv(e) {
    var t = _v(e.alternate, e, nt);
    e.memoizedProps = e.pendingProps, t === null ? Ov(e) : xe = t, qd.current = null
}

function Ov(e) {
    var t = e;
    do {
        var n = t.alternate;
        if (e = t.return, t.flags & 32768) {
            if (n = PE(n, t), n !== null) {
                n.flags &= 32767, xe = n;
                return
            }
            if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
            else {
                Te = 6, xe = null;
                return
            }
        } else if (n = TE(n, t, nt), n !== null) {
            xe = n;
            return
        }
        if (t = t.sibling, t !== null) {
            xe = t;
            return
        }
        xe = t = e
    } while (t !== null);
    Te === 0 && (Te = 5)
}

function mr(e, t, n) {
    var r = te,
        o = gt.transition;
    try {
        gt.transition = null, te = 1, NE(e, t, n, r)
    } finally {
        gt.transition = o, te = r
    }
    return null
}

function NE(e, t, n, r) {
    do go(); while ($n !== null);
    if (Z & 6) throw Error(L(327));
    n = e.finishedWork;
    var o = e.finishedLanes;
    if (n === null) return null;
    if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(L(177));
    e.callbackNode = null, e.callbackPriority = 0;
    var i = n.lanes | n.childLanes;
    if (hS(e, i), e === be && (xe = be = null, Me = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || Ds || (Ds = !0, Vv(ma, function() {
            return go(), null
        })), i = (n.flags & 15990) !== 0, n.subtreeFlags & 15990 || i) {
        i = gt.transition, gt.transition = null;
        var s = te;
        te = 1;
        var a = Z;
        Z |= 4, qd.current = null, kE(e, n), Rv(n, e), JS(tc), ya = !!ec, tc = ec = null, e.current = n, RE(n), oS(), Z = a, te = s, gt.transition = i
    } else e.current = n;
    if (Ds && (Ds = !1, $n = e, Na = o), i = e.pendingLanes, i === 0 && (Yn = null), aS(n.stateNode), Ze(e, ye()), t !== null)
        for (r = e.onRecoverableError, n = 0; n < t.length; n++) o = t[n], r(o.value, {
            componentStack: o.stack,
            digest: o.digest
        });
    if (La) throw La = !1, e = Sc, Sc = null, e;
    return Na & 1 && e.tag !== 0 && go(), i = e.pendingLanes, i & 1 ? e === Ec ? Si++ : (Si = 0, Ec = e) : Si = 0, lr(), null
}

function go() {
    if ($n !== null) {
        var e = py(Na),
            t = gt.transition,
            n = te;
        try {
            if (gt.transition = null, te = 16 > e ? 16 : e, $n === null) var r = !1;
            else {
                if (e = $n, $n = null, Na = 0, Z & 6) throw Error(L(331));
                var o = Z;
                for (Z |= 4, j = e.current; j !== null;) {
                    var i = j,
                        s = i.child;
                    if (j.flags & 16) {
                        var a = i.deletions;
                        if (a !== null) {
                            for (var l = 0; l < a.length; l++) {
                                var u = a[l];
                                for (j = u; j !== null;) {
                                    var c = j;
                                    switch (c.tag) {
                                        case 0:
                                        case 11:
                                        case 15:
                                            wi(8, c, i)
                                    }
                                    var d = c.child;
                                    if (d !== null) d.return = c, j = d;
                                    else
                                        for (; j !== null;) {
                                            c = j;
                                            var h = c.sibling,
                                                f = c.return;
                                            if (Pv(c), c === u) {
                                                j = null;
                                                break
                                            }
                                            if (h !== null) {
                                                h.return = f, j = h;
                                                break
                                            }
                                            j = f
                                        }
                                }
                            }
                            var v = i.alternate;
                            if (v !== null) {
                                var g = v.child;
                                if (g !== null) {
                                    v.child = null;
                                    do {
                                        var w = g.sibling;
                                        g.sibling = null, g = w
                                    } while (g !== null)
                                }
                            }
                            j = i
                        }
                    }
                    if (i.subtreeFlags & 2064 && s !== null) s.return = i, j = s;
                    else e: for (; j !== null;) {
                        if (i = j, i.flags & 2048) switch (i.tag) {
                            case 0:
                            case 11:
                            case 15:
                                wi(9, i, i.return)
                        }
                        var m = i.sibling;
                        if (m !== null) {
                            m.return = i.return, j = m;
                            break e
                        }
                        j = i.return
                    }
                }
                var p = e.current;
                for (j = p; j !== null;) {
                    s = j;
                    var y = s.child;
                    if (s.subtreeFlags & 2064 && y !== null) y.return = s, j = y;
                    else e: for (s = p; j !== null;) {
                        if (a = j, a.flags & 2048) try {
                            switch (a.tag) {
                                case 0:
                                case 11:
                                case 15:
                                    al(9, a)
                            }
                        } catch (E) {
                            ge(a, a.return, E)
                        }
                        if (a === s) {
                            j = null;
                            break e
                        }
                        var S = a.sibling;
                        if (S !== null) {
                            S.return = a.return, j = S;
                            break e
                        }
                        j = a.return
                    }
                }
                if (Z = o, lr(), Yt && typeof Yt.onPostCommitFiberRoot == "function") try {
                    Yt.onPostCommitFiberRoot(Ja, e)
                } catch {}
                r = !0
            }
            return r
        } finally {
            te = n, gt.transition = t
        }
    }
    return !1
}

function pp(e, t, n) {
    t = No(n, t), t = pv(e, t, 1), e = Qn(e, t, 1), t = We(), e !== null && (ts(e, 1, t), Ze(e, t))
}

function ge(e, t, n) {
    if (e.tag === 3) pp(e, e, n);
    else
        for (; t !== null;) {
            if (t.tag === 3) {
                pp(t, e, n);
                break
            } else if (t.tag === 1) {
                var r = t.stateNode;
                if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (Yn === null || !Yn.has(r))) {
                    e = No(n, e), e = mv(t, e, 1), t = Qn(t, e, 1), e = We(), t !== null && (ts(t, 1, e), Ze(t, e));
                    break
                }
            }
            t = t.return
        }
}

function OE(e, t, n) {
    var r = e.pingCache;
    r !== null && r.delete(t), t = We(), e.pingedLanes |= e.suspendedLanes & n, be === e && (Me & n) === n && (Te === 4 || Te === 3 && (Me & 130023424) === Me && 500 > ye() - Jd ? Rr(e, 0) : Zd |= n), Ze(e, t)
}

function Iv(e, t) {
    t === 0 && (e.mode & 1 ? (t = Ss, Ss <<= 1, !(Ss & 130023424) && (Ss = 4194304)) : t = 1);
    var n = We();
    e = pn(e, t), e !== null && (ts(e, t, n), Ze(e, n))
}

function IE(e) {
    var t = e.memoizedState,
        n = 0;
    t !== null && (n = t.retryLane), Iv(e, n)
}

function _E(e, t) {
    var n = 0;
    switch (e.tag) {
        case 13:
            var r = e.stateNode,
                o = e.memoizedState;
            o !== null && (n = o.retryLane);
            break;
        case 19:
            r = e.stateNode;
            break;
        default:
            throw Error(L(314))
    }
    r !== null && r.delete(t), Iv(e, n)
}
var _v;
_v = function(e, t, n) {
    if (e !== null)
        if (e.memoizedProps !== t.pendingProps || Xe.current) Ye = !0;
        else {
            if (!(e.lanes & n) && !(t.flags & 128)) return Ye = !1, CE(e, t, n);
            Ye = !!(e.flags & 131072)
        }
    else Ye = !1, ce && t.flags & 1048576 && zy(t, Ta, t.index);
    switch (t.lanes = 0, t.tag) {
        case 2:
            var r = t.type;
            qs(e, t), e = t.pendingProps;
            var o = Ao(t, je.current);
            mo(t, n), o = Kd(null, t, r, e, o, n);
            var i = Gd();
            return t.flags |= 1, typeof o == "object" && o !== null && typeof o.render == "function" && o.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, qe(r) ? (i = !0, Ea(t)) : i = !1, t.memoizedState = o.state !== null && o.state !== void 0 ? o.state : null, $d(t), o.updater = sl, t.stateNode = o, o._reactInternals = t, cc(t, r, e, n), t = hc(null, t, r, !0, i, n)) : (t.tag = 0, ce && i && Od(t), ze(null, t, o, n), t = t.child), t;
        case 16:
            r = t.elementType;
            e: {
                switch (qs(e, t), e = t.pendingProps, o = r._init, r = o(r._payload), t.type = r, o = t.tag = jE(r), e = kt(r, e), o) {
                    case 0:
                        t = fc(null, t, r, e, n);
                        break e;
                    case 1:
                        t = op(null, t, r, e, n);
                        break e;
                    case 11:
                        t = np(null, t, r, e, n);
                        break e;
                    case 14:
                        t = rp(null, t, r, kt(r.type, e), n);
                        break e
                }
                throw Error(L(306, r, ""))
            }
            return t;
        case 0:
            return r = t.type, o = t.pendingProps, o = t.elementType === r ? o : kt(r, o), fc(e, t, r, o, n);
        case 1:
            return r = t.type, o = t.pendingProps, o = t.elementType === r ? o : kt(r, o), op(e, t, r, o, n);
        case 3:
            e: {
                if (wv(t), e === null) throw Error(L(387));r = t.pendingProps,
                i = t.memoizedState,
                o = i.element,
                Ky(e, t),
                ka(t, r, null, n);
                var s = t.memoizedState;
                if (r = s.element, i.isDehydrated)
                    if (i = {
                            element: r,
                            isDehydrated: !1,
                            cache: s.cache,
                            pendingSuspenseBoundaries: s.pendingSuspenseBoundaries,
                            transitions: s.transitions
                        }, t.updateQueue.baseState = i, t.memoizedState = i, t.flags & 256) {
                        o = No(Error(L(423)), t), t = ip(e, t, r, n, o);
                        break e
                    } else if (r !== o) {
                    o = No(Error(L(424)), t), t = ip(e, t, r, n, o);
                    break e
                } else
                    for (ot = Gn(t.stateNode.containerInfo.firstChild), it = t, ce = !0, Lt = null, n = Wy(t, null, r, n), t.child = n; n;) n.flags = n.flags & -3 | 4096, n = n.sibling;
                else {
                    if (Mo(), r === o) {
                        t = mn(e, t, n);
                        break e
                    }
                    ze(e, t, r, n)
                }
                t = t.child
            }
            return t;
        case 5:
            return Gy(t), e === null && ac(t), r = t.type, o = t.pendingProps, i = e !== null ? e.memoizedProps : null, s = o.children, nc(r, o) ? s = null : i !== null && nc(r, i) && (t.flags |= 32), vv(e, t), ze(e, t, s, n), t.child;
        case 6:
            return e === null && ac(t), null;
        case 13:
            return xv(e, t, n);
        case 4:
            return Bd(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = Do(t, null, r, n) : ze(e, t, r, n), t.child;
        case 11:
            return r = t.type, o = t.pendingProps, o = t.elementType === r ? o : kt(r, o), np(e, t, r, o, n);
        case 7:
            return ze(e, t, t.pendingProps, n), t.child;
        case 8:
            return ze(e, t, t.pendingProps.children, n), t.child;
        case 12:
            return ze(e, t, t.pendingProps.children, n), t.child;
        case 10:
            e: {
                if (r = t.type._context, o = t.pendingProps, i = t.memoizedProps, s = o.value, oe(Pa, r._currentValue), r._currentValue = s, i !== null)
                    if (_t(i.value, s)) {
                        if (i.children === o.children && !Xe.current) {
                            t = mn(e, t, n);
                            break e
                        }
                    } else
                        for (i = t.child, i !== null && (i.return = t); i !== null;) {
                            var a = i.dependencies;
                            if (a !== null) {
                                s = i.child;
                                for (var l = a.firstContext; l !== null;) {
                                    if (l.context === r) {
                                        if (i.tag === 1) {
                                            l = dn(-1, n & -n), l.tag = 2;
                                            var u = i.updateQueue;
                                            if (u !== null) {
                                                u = u.shared;
                                                var c = u.pending;
                                                c === null ? l.next = l : (l.next = c.next, c.next = l), u.pending = l
                                            }
                                        }
                                        i.lanes |= n, l = i.alternate, l !== null && (l.lanes |= n), lc(i.return, n, t), a.lanes |= n;
                                        break
                                    }
                                    l = l.next
                                }
                            } else if (i.tag === 10) s = i.type === t.type ? null : i.child;
                            else if (i.tag === 18) {
                                if (s = i.return, s === null) throw Error(L(341));
                                s.lanes |= n, a = s.alternate, a !== null && (a.lanes |= n), lc(s, n, t), s = i.sibling
                            } else s = i.child;
                            if (s !== null) s.return = i;
                            else
                                for (s = i; s !== null;) {
                                    if (s === t) {
                                        s = null;
                                        break
                                    }
                                    if (i = s.sibling, i !== null) {
                                        i.return = s.return, s = i;
                                        break
                                    }
                                    s = s.return
                                }
                            i = s
                        }
                ze(e, t, o.children, n),
                t = t.child
            }
            return t;
        case 9:
            return o = t.type, r = t.pendingProps.children, mo(t, n), o = vt(o), r = r(o), t.flags |= 1, ze(e, t, r, n), t.child;
        case 14:
            return r = t.type, o = kt(r, t.pendingProps), o = kt(r.type, o), rp(e, t, r, o, n);
        case 15:
            return gv(e, t, t.type, t.pendingProps, n);
        case 17:
            return r = t.type, o = t.pendingProps, o = t.elementType === r ? o : kt(r, o), qs(e, t), t.tag = 1, qe(r) ? (e = !0, Ea(t)) : e = !1, mo(t, n), hv(t, r, o), cc(t, r, o, n), hc(null, t, r, !0, e, n);
        case 19:
            return Sv(e, t, n);
        case 22:
            return yv(e, t, n)
    }
    throw Error(L(156, t.tag))
};

function Vv(e, t) {
    return cy(e, t)
}

function VE(e, t, n, r) {
    this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null
}

function pt(e, t, n, r) {
    return new VE(e, t, n, r)
}

function rf(e) {
    return e = e.prototype, !(!e || !e.isReactComponent)
}

function jE(e) {
    if (typeof e == "function") return rf(e) ? 1 : 0;
    if (e != null) {
        if (e = e.$$typeof, e === Ed) return 11;
        if (e === Cd) return 14
    }
    return 2
}

function qn(e, t) {
    var n = e.alternate;
    return n === null ? (n = pt(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : {
        lanes: t.lanes,
        firstContext: t.firstContext
    }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n
}

function ea(e, t, n, r, o, i) {
    var s = 2;
    if (r = e, typeof e == "function") rf(e) && (s = 1);
    else if (typeof e == "string") s = 5;
    else e: switch (e) {
        case Xr:
            return Ar(n.children, o, i, t);
        case Sd:
            s = 8, o |= 8;
            break;
        case Ou:
            return e = pt(12, n, t, o | 2), e.elementType = Ou, e.lanes = i, e;
        case Iu:
            return e = pt(13, n, t, o), e.elementType = Iu, e.lanes = i, e;
        case _u:
            return e = pt(19, n, t, o), e.elementType = _u, e.lanes = i, e;
        case Gg:
            return ul(n, o, i, t);
        default:
            if (typeof e == "object" && e !== null) switch (e.$$typeof) {
                case Hg:
                    s = 10;
                    break e;
                case Kg:
                    s = 9;
                    break e;
                case Ed:
                    s = 11;
                    break e;
                case Cd:
                    s = 14;
                    break e;
                case Dn:
                    s = 16, r = null;
                    break e
            }
            throw Error(L(130, e == null ? e : typeof e, ""))
    }
    return t = pt(s, n, t, o), t.elementType = e, t.type = r, t.lanes = i, t
}

function Ar(e, t, n, r) {
    return e = pt(7, e, r, t), e.lanes = n, e
}

function ul(e, t, n, r) {
    return e = pt(22, e, r, t), e.elementType = Gg, e.lanes = n, e.stateNode = {
        isHidden: !1
    }, e
}

function lu(e, t, n) {
    return e = pt(6, e, null, t), e.lanes = n, e
}

function uu(e, t, n) {
    return t = pt(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        implementation: e.implementation
    }, t
}

function FE(e, t, n, r, o) {
    this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Ul(0), this.expirationTimes = Ul(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Ul(0), this.identifierPrefix = r, this.onRecoverableError = o, this.mutableSourceEagerHydrationData = null
}

function of(e, t, n, r, o, i, s, a, l) {
    return e = new FE(e, t, n, a, l), t === 1 ? (t = 1, i === !0 && (t |= 8)) : t = 0, i = pt(3, null, null, t), e.current = i, i.stateNode = e, i.memoizedState = {
        element: r,
        isDehydrated: n,
        cache: null,
        transitions: null,
        pendingSuspenseBoundaries: null
    }, $d(i), e
}

function zE(e, t, n) {
    var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
        $$typeof: Yr,
        key: r == null ? null : "" + r,
        children: e,
        containerInfo: t,
        implementation: n
    }
}

function jv(e) {
    if (!e) return Jn;
    e = e._reactInternals;
    e: {
        if (Fr(e) !== e || e.tag !== 1) throw Error(L(170));
        var t = e;do {
            switch (t.tag) {
                case 3:
                    t = t.stateNode.context;
                    break e;
                case 1:
                    if (qe(t.type)) {
                        t = t.stateNode.__reactInternalMemoizedMergedChildContext;
                        break e
                    }
            }
            t = t.return
        } while (t !== null);
        throw Error(L(171))
    }
    if (e.tag === 1) {
        var n = e.type;
        if (qe(n)) return jy(e, n, t)
    }
    return t
}

function Fv(e, t, n, r, o, i, s, a, l) {
    return e = of(n, r, !0, e, o, i, s, a, l), e.context = jv(null), n = e.current, r = We(), o = Xn(n), i = dn(r, o), i.callback = t ?? null, Qn(n, i, o), e.current.lanes = o, ts(e, o, r), Ze(e, r), e
}

function cl(e, t, n, r) {
    var o = t.current,
        i = We(),
        s = Xn(o);
    return n = jv(n), t.context === null ? t.context = n : t.pendingContext = n, t = dn(i, s), t.payload = {
        element: e
    }, r = r === void 0 ? null : r, r !== null && (t.callback = r), e = Qn(o, t, s), e !== null && (Ot(e, o, s, i), Qs(e, o, s)), s
}

function Ia(e) {
    if (e = e.current, !e.child) return null;
    switch (e.child.tag) {
        case 5:
            return e.child.stateNode;
        default:
            return e.child.stateNode
    }
}

function mp(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
        var n = e.retryLane;
        e.retryLane = n !== 0 && n < t ? n : t
    }
}

function sf(e, t) {
    mp(e, t), (e = e.alternate) && mp(e, t)
}

function $E() {
    return null
}
var zv = typeof reportError == "function" ? reportError : function(e) {
    console.error(e)
};

function af(e) {
    this._internalRoot = e
}
dl.prototype.render = af.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(L(409));
    cl(e, t, null, null)
};
dl.prototype.unmount = af.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
        this._internalRoot = null;
        var t = e.containerInfo;
        _r(function() {
            cl(null, e, null, null)
        }), t[hn] = null
    }
};

function dl(e) {
    this._internalRoot = e
}
dl.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
        var t = yy();
        e = {
            blockedOn: null,
            target: e,
            priority: t
        };
        for (var n = 0; n < Nn.length && t !== 0 && t < Nn[n].priority; n++);
        Nn.splice(n, 0, e), n === 0 && wy(e)
    }
};

function lf(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11)
}

function fl(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "))
}

function gp() {}

function BE(e, t, n, r, o) {
    if (o) {
        if (typeof r == "function") {
            var i = r;
            r = function() {
                var u = Ia(s);
                i.call(u)
            }
        }
        var s = Fv(t, r, e, 0, null, !1, !1, "", gp);
        return e._reactRootContainer = s, e[hn] = s.current, Ii(e.nodeType === 8 ? e.parentNode : e), _r(), s
    }
    for (; o = e.lastChild;) e.removeChild(o);
    if (typeof r == "function") {
        var a = r;
        r = function() {
            var u = Ia(l);
            a.call(u)
        }
    }
    var l = of(e, 0, !1, null, null, !1, !1, "", gp);
    return e._reactRootContainer = l, e[hn] = l.current, Ii(e.nodeType === 8 ? e.parentNode : e), _r(function() {
        cl(t, l, n, r)
    }), l
}

function hl(e, t, n, r, o) {
    var i = n._reactRootContainer;
    if (i) {
        var s = i;
        if (typeof o == "function") {
            var a = o;
            o = function() {
                var l = Ia(s);
                a.call(l)
            }
        }
        cl(t, s, e, o)
    } else s = BE(n, t, e, o, r);
    return Ia(s)
}
my = function(e) {
    switch (e.tag) {
        case 3:
            var t = e.stateNode;
            if (t.current.memoizedState.isDehydrated) {
                var n = ci(t.pendingLanes);
                n !== 0 && (bd(t, n | 1), Ze(t, ye()), !(Z & 6) && (Oo = ye() + 500, lr()))
            }
            break;
        case 13:
            _r(function() {
                var r = pn(e, 1);
                if (r !== null) {
                    var o = We();
                    Ot(r, e, 1, o)
                }
            }), sf(e, 1)
    }
};
kd = function(e) {
    if (e.tag === 13) {
        var t = pn(e, 134217728);
        if (t !== null) {
            var n = We();
            Ot(t, e, 134217728, n)
        }
        sf(e, 134217728)
    }
};
gy = function(e) {
    if (e.tag === 13) {
        var t = Xn(e),
            n = pn(e, t);
        if (n !== null) {
            var r = We();
            Ot(n, e, t, r)
        }
        sf(e, t)
    }
};
yy = function() {
    return te
};
vy = function(e, t) {
    var n = te;
    try {
        return te = e, t()
    } finally {
        te = n
    }
};
Ku = function(e, t, n) {
    switch (t) {
        case "input":
            if (Fu(e, n), t = n.name, n.type === "radio" && t != null) {
                for (n = e; n.parentNode;) n = n.parentNode;
                for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
                    var r = n[t];
                    if (r !== e && r.form === e.form) {
                        var o = rl(r);
                        if (!o) throw Error(L(90));
                        Yg(r), Fu(r, o)
                    }
                }
            }
            break;
        case "textarea":
            qg(e, n);
            break;
        case "select":
            t = n.value, t != null && co(e, !!n.multiple, t, !1)
    }
};
oy = ef;
iy = _r;
var UE = {
        usingClientEntryPoint: !1,
        Events: [rs, eo, rl, ny, ry, ef]
    },
    oi = {
        findFiberByHostInstance: yr,
        bundleType: 0,
        version: "18.3.1",
        rendererPackageName: "react-dom"
    },
    WE = {
        bundleType: oi.bundleType,
        version: oi.version,
        rendererPackageName: oi.rendererPackageName,
        rendererConfig: oi.rendererConfig,
        overrideHookState: null,
        overrideHookStateDeletePath: null,
        overrideHookStateRenamePath: null,
        overrideProps: null,
        overridePropsDeletePath: null,
        overridePropsRenamePath: null,
        setErrorHandler: null,
        setSuspenseHandler: null,
        scheduleUpdate: null,
        currentDispatcherRef: vn.ReactCurrentDispatcher,
        findHostInstanceByFiber: function(e) {
            return e = ly(e), e === null ? null : e.stateNode
        },
        findFiberByHostInstance: oi.findFiberByHostInstance || $E,
        findHostInstancesForRefresh: null,
        scheduleRefresh: null,
        scheduleRoot: null,
        setRefreshHandler: null,
        getCurrentFiber: null,
        reconcilerVersion: "18.3.1-next-f1338f8080-20240426"
    };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Ls = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Ls.isDisabled && Ls.supportsFiber) try {
        Ja = Ls.inject(WE), Yt = Ls
    } catch {}
}
lt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = UE;
lt.createPortal = function(e, t) {
    var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!lf(t)) throw Error(L(200));
    return zE(e, t, null, n)
};
lt.createRoot = function(e, t) {
    if (!lf(e)) throw Error(L(299));
    var n = !1,
        r = "",
        o = zv;
    return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (o = t.onRecoverableError)), t = of(e, 1, !1, null, null, n, !1, r, o), e[hn] = t.current, Ii(e.nodeType === 8 ? e.parentNode : e), new af(t)
};
lt.findDOMNode = function(e) {
    if (e == null) return null;
    if (e.nodeType === 1) return e;
    var t = e._reactInternals;
    if (t === void 0) throw typeof e.render == "function" ? Error(L(188)) : (e = Object.keys(e).join(","), Error(L(268, e)));
    return e = ly(t), e = e === null ? null : e.stateNode, e
};
lt.flushSync = function(e) {
    return _r(e)
};
lt.hydrate = function(e, t, n) {
    if (!fl(t)) throw Error(L(200));
    return hl(null, e, t, !0, n)
};
lt.hydrateRoot = function(e, t, n) {
    if (!lf(e)) throw Error(L(405));
    var r = n != null && n.hydratedSources || null,
        o = !1,
        i = "",
        s = zv;
    if (n != null && (n.unstable_strictMode === !0 && (o = !0), n.identifierPrefix !== void 0 && (i = n.identifierPrefix), n.onRecoverableError !== void 0 && (s = n.onRecoverableError)), t = Fv(t, null, e, 1, n ?? null, o, !1, i, s), e[hn] = t.current, Ii(e), r)
        for (e = 0; e < r.length; e++) n = r[e], o = n._getVersion, o = o(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, o] : t.mutableSourceEagerHydrationData.push(n, o);
    return new dl(t)
};
lt.render = function(e, t, n) {
    if (!fl(t)) throw Error(L(200));
    return hl(null, e, t, !1, n)
};
lt.unmountComponentAtNode = function(e) {
    if (!fl(e)) throw Error(L(40));
    return e._reactRootContainer ? (_r(function() {
        hl(null, null, e, !1, function() {
            e._reactRootContainer = null, e[hn] = null
        })
    }), !0) : !1
};
lt.unstable_batchedUpdates = ef;
lt.unstable_renderSubtreeIntoContainer = function(e, t, n, r) {
    if (!fl(n)) throw Error(L(200));
    if (e == null || e._reactInternals === void 0) throw Error(L(38));
    return hl(e, t, n, !1, r)
};
lt.version = "18.3.1-next-f1338f8080-20240426";

function $v() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE($v)
    } catch (e) {
        console.error(e)
    }
}
$v(), $g.exports = lt;
var is = $g.exports;
const Bv = Rg(is);
var Uv, yp = is;
Uv = yp.createRoot, yp.hydrateRoot;
const HE = 1,
    KE = 1e6;
let cu = 0;

function GE() {
    return cu = (cu + 1) % Number.MAX_SAFE_INTEGER, cu.toString()
}
const du = new Map,
    vp = e => {
        if (du.has(e)) return;
        const t = setTimeout(() => {
            du.delete(e), Ei({
                type: "REMOVE_TOAST",
                toastId: e
            })
        }, KE);
        du.set(e, t)
    },
    QE = (e, t) => {
        switch (t.type) {
            case "ADD_TOAST":
                return {
                    ...e, toasts: [t.toast, ...e.toasts].slice(0, HE)
                };
            case "UPDATE_TOAST":
                return {
                    ...e, toasts: e.toasts.map(n => n.id === t.toast.id ? {
                        ...n,
                        ...t.toast
                    } : n)
                };
            case "DISMISS_TOAST": {
                const {
                    toastId: n
                } = t;
                return n ? vp(n) : e.toasts.forEach(r => {
                    vp(r.id)
                }), {
                    ...e,
                    toasts: e.toasts.map(r => r.id === n || n === void 0 ? {
                        ...r,
                        open: !1
                    } : r)
                }
            }
            case "REMOVE_TOAST":
                return t.toastId === void 0 ? {
                    ...e,
                    toasts: []
                } : {
                    ...e,
                    toasts: e.toasts.filter(n => n.id !== t.toastId)
                }
        }
    },
    ta = [];
let na = {
    toasts: []
};

function Ei(e) {
    na = QE(na, e), ta.forEach(t => {
        t(na)
    })
}

function YE({
    ...e
}) {
    const t = GE(),
        n = o => Ei({
            type: "UPDATE_TOAST",
            toast: {
                ...o,
                id: t
            }
        }),
        r = () => Ei({
            type: "DISMISS_TOAST",
            toastId: t
        });
    return Ei({
        type: "ADD_TOAST",
        toast: {
            ...e,
            id: t,
            open: !0,
            onOpenChange: o => {
                o || r()
            }
        }
    }), {
        id: t,
        dismiss: r,
        update: n
    }
}

function XE() {
    const [e, t] = x.useState(na);
    return x.useEffect(() => (ta.push(t), () => {
        const n = ta.indexOf(t);
        n > -1 && ta.splice(n, 1)
    }), [e]), {
        ...e,
        toast: YE,
        dismiss: n => Ei({
            type: "DISMISS_TOAST",
            toastId: n
        })
    }
}

function Ce(e, t, {
    checkForDefaultPrevented: n = !0
} = {}) {
    return function(o) {
        if (e == null || e(o), n === !1 || !o.defaultPrevented) return t == null ? void 0 : t(o)
    }
}

function wp(e, t) {
    if (typeof e == "function") return e(t);
    e != null && (e.current = t)
}

function Wv(...e) {
    return t => {
        let n = !1;
        const r = e.map(o => {
            const i = wp(o, t);
            return !n && typeof i == "function" && (n = !0), i
        });
        if (n) return () => {
            for (let o = 0; o < r.length; o++) {
                const i = r[o];
                typeof i == "function" ? i() : wp(e[o], null)
            }
        }
    }
}

function Vt(...e) {
    return x.useCallback(Wv(...e), e)
}

function pl(e, t = []) {
    let n = [];

    function r(i, s) {
        const a = x.createContext(s),
            l = n.length;
        n = [...n, s];
        const u = d => {
            var m;
            const {
                scope: h,
                children: f,
                ...v
            } = d, g = ((m = h == null ? void 0 : h[e]) == null ? void 0 : m[l]) || a, w = x.useMemo(() => v, Object.values(v));
            return P.jsx(g.Provider, {
                value: w,
                children: f
            })
        };
        u.displayName = i + "Provider";

        function c(d, h) {
            var g;
            const f = ((g = h == null ? void 0 : h[e]) == null ? void 0 : g[l]) || a,
                v = x.useContext(f);
            if (v) return v;
            if (s !== void 0) return s;
            throw new Error(`\`${d}\` must be used within \`${i}\``)
        }
        return [u, c]
    }
    const o = () => {
        const i = n.map(s => x.createContext(s));
        return function(a) {
            const l = (a == null ? void 0 : a[e]) || i;
            return x.useMemo(() => ({
                [`__scope${e}`]: {
                    ...a,
                    [e]: l
                }
            }), [a, l])
        }
    };
    return o.scopeName = e, [r, qE(o, ...t)]
}

function qE(...e) {
    const t = e[0];
    if (e.length === 1) return t;
    const n = () => {
        const r = e.map(o => ({
            useScope: o(),
            scopeName: o.scopeName
        }));
        return function(i) {
            const s = r.reduce((a, {
                useScope: l,
                scopeName: u
            }) => {
                const d = l(i)[`__scope${u}`];
                return {
                    ...a,
                    ...d
                }
            }, {});
            return x.useMemo(() => ({
                [`__scope${t.scopeName}`]: s
            }), [s])
        }
    };
    return n.scopeName = t.scopeName, n
}

function Pc(e) {
    const t = ZE(e),
        n = x.forwardRef((r, o) => {
            const {
                children: i,
                ...s
            } = r, a = x.Children.toArray(i), l = a.find(eC);
            if (l) {
                const u = l.props.children,
                    c = a.map(d => d === l ? x.Children.count(u) > 1 ? x.Children.only(null) : x.isValidElement(u) ? u.props.children : null : d);
                return P.jsx(t, {
                    ...s,
                    ref: o,
                    children: x.isValidElement(u) ? x.cloneElement(u, void 0, c) : null
                })
            }
            return P.jsx(t, {
                ...s,
                ref: o,
                children: i
            })
        });
    return n.displayName = `${e}.Slot`, n
}

function ZE(e) {
    const t = x.forwardRef((n, r) => {
        const {
            children: o,
            ...i
        } = n;
        if (x.isValidElement(o)) {
            const s = nC(o),
                a = tC(i, o.props);
            return o.type !== x.Fragment && (a.ref = r ? Wv(r, s) : s), x.cloneElement(o, a)
        }
        return x.Children.count(o) > 1 ? x.Children.only(null) : null
    });
    return t.displayName = `${e}.SlotClone`, t
}
var Hv = Symbol("radix.slottable");

function JE(e) {
    const t = ({
        children: n
    }) => P.jsx(P.Fragment, {
        children: n
    });
    return t.displayName = `${e}.Slottable`, t.__radixId = Hv, t
}

function eC(e) {
    return x.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === Hv
}

function tC(e, t) {
    const n = {
        ...t
    };
    for (const r in t) {
        const o = e[r],
            i = t[r];
        /^on[A-Z]/.test(r) ? o && i ? n[r] = (...a) => {
            const l = i(...a);
            return o(...a), l
        } : o && (n[r] = o) : r === "style" ? n[r] = {
            ...o,
            ...i
        } : r === "className" && (n[r] = [o, i].filter(Boolean).join(" "))
    }
    return {
        ...e,
        ...n
    }
}

function nC(e) {
    var r, o;
    let t = (r = Object.getOwnPropertyDescriptor(e.props, "ref")) == null ? void 0 : r.get,
        n = t && "isReactWarning" in t && t.isReactWarning;
    return n ? e.ref : (t = (o = Object.getOwnPropertyDescriptor(e, "ref")) == null ? void 0 : o.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref)
}

function rC(e) {
    const t = e + "CollectionProvider",
        [n, r] = pl(t),
        [o, i] = n(t, {
            collectionRef: {
                current: null
            },
            itemMap: new Map
        }),
        s = g => {
            const {
                scope: w,
                children: m
            } = g, p = N.useRef(null), y = N.useRef(new Map).current;
            return P.jsx(o, {
                scope: w,
                itemMap: y,
                collectionRef: p,
                children: m
            })
        };
    s.displayName = t;
    const a = e + "CollectionSlot",
        l = Pc(a),
        u = N.forwardRef((g, w) => {
            const {
                scope: m,
                children: p
            } = g, y = i(a, m), S = Vt(w, y.collectionRef);
            return P.jsx(l, {
                ref: S,
                children: p
            })
        });
    u.displayName = a;
    const c = e + "CollectionItemSlot",
        d = "data-radix-collection-item",
        h = Pc(c),
        f = N.forwardRef((g, w) => {
            const {
                scope: m,
                children: p,
                ...y
            } = g, S = N.useRef(null), E = Vt(w, S), C = i(c, m);
            return N.useEffect(() => (C.itemMap.set(S, {
                ref: S,
                ...y
            }), () => void C.itemMap.delete(S))), P.jsx(h, {
                [d]: "",
                ref: E,
                children: p
            })
        });
    f.displayName = c;

    function v(g) {
        const w = i(e + "CollectionConsumer", g);
        return N.useCallback(() => {
            const p = w.collectionRef.current;
            if (!p) return [];
            const y = Array.from(p.querySelectorAll(`[${d}]`));
            return Array.from(w.itemMap.values()).sort((C, T) => y.indexOf(C.ref.current) - y.indexOf(T.ref.current))
        }, [w.collectionRef, w.itemMap])
    }
    return [{
        Provider: s,
        Slot: u,
        ItemSlot: f
    }, v, r]
}
var oC = ["a", "button", "div", "form", "h2", "h3", "img", "input", "label", "li", "nav", "ol", "p", "select", "span", "svg", "ul"],
    tt = oC.reduce((e, t) => {
        const n = Pc(`Primitive.${t}`),
            r = x.forwardRef((o, i) => {
                const {
                    asChild: s,
                    ...a
                } = o, l = s ? n : t;
                return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), P.jsx(l, {
                    ...a,
                    ref: i
                })
            });
        return r.displayName = `Primitive.${t}`, {
            ...e,
            [t]: r
        }
    }, {});

function Kv(e, t) {
    e && is.flushSync(() => e.dispatchEvent(t))
}

function er(e) {
    const t = x.useRef(e);
    return x.useEffect(() => {
        t.current = e
    }), x.useMemo(() => (...n) => {
        var r;
        return (r = t.current) == null ? void 0 : r.call(t, ...n)
    }, [])
}

function iC(e, t = globalThis == null ? void 0 : globalThis.document) {
    const n = er(e);
    x.useEffect(() => {
        const r = o => {
            o.key === "Escape" && n(o)
        };
        return t.addEventListener("keydown", r, {
            capture: !0
        }), () => t.removeEventListener("keydown", r, {
            capture: !0
        })
    }, [n, t])
}
var sC = "DismissableLayer",
    bc = "dismissableLayer.update",
    aC = "dismissableLayer.pointerDownOutside",
    lC = "dismissableLayer.focusOutside",
    xp, Gv = x.createContext({
        layers: new Set,
        layersWithOutsidePointerEventsDisabled: new Set,
        branches: new Set
    }),
    uf = x.forwardRef((e, t) => {
        const {
            disableOutsidePointerEvents: n = !1,
            onEscapeKeyDown: r,
            onPointerDownOutside: o,
            onFocusOutside: i,
            onInteractOutside: s,
            onDismiss: a,
            ...l
        } = e, u = x.useContext(Gv), [c, d] = x.useState(null), h = (c == null ? void 0 : c.ownerDocument) ?? (globalThis == null ? void 0 : globalThis.document), [, f] = x.useState({}), v = Vt(t, T => d(T)), g = Array.from(u.layers), [w] = [...u.layersWithOutsidePointerEventsDisabled].slice(-1), m = g.indexOf(w), p = c ? g.indexOf(c) : -1, y = u.layersWithOutsidePointerEventsDisabled.size > 0, S = p >= m, E = cC(T => {
            const b = T.target,
                D = [...u.branches].some(R => R.contains(b));
            !S || D || (o == null || o(T), s == null || s(T), T.defaultPrevented || a == null || a())
        }, h), C = dC(T => {
            const b = T.target;
            [...u.branches].some(R => R.contains(b)) || (i == null || i(T), s == null || s(T), T.defaultPrevented || a == null || a())
        }, h);
        return iC(T => {
            p === u.layers.size - 1 && (r == null || r(T), !T.defaultPrevented && a && (T.preventDefault(), a()))
        }, h), x.useEffect(() => {
            if (c) return n && (u.layersWithOutsidePointerEventsDisabled.size === 0 && (xp = h.body.style.pointerEvents, h.body.style.pointerEvents = "none"), u.layersWithOutsidePointerEventsDisabled.add(c)), u.layers.add(c), Sp(), () => {
                n && u.layersWithOutsidePointerEventsDisabled.size === 1 && (h.body.style.pointerEvents = xp)
            }
        }, [c, h, n, u]), x.useEffect(() => () => {
            c && (u.layers.delete(c), u.layersWithOutsidePointerEventsDisabled.delete(c), Sp())
        }, [c, u]), x.useEffect(() => {
            const T = () => f({});
            return document.addEventListener(bc, T), () => document.removeEventListener(bc, T)
        }, []), P.jsx(tt.div, {
            ...l,
            ref: v,
            style: {
                pointerEvents: y ? S ? "auto" : "none" : void 0,
                ...e.style
            },
            onFocusCapture: Ce(e.onFocusCapture, C.onFocusCapture),
            onBlurCapture: Ce(e.onBlurCapture, C.onBlurCapture),
            onPointerDownCapture: Ce(e.onPointerDownCapture, E.onPointerDownCapture)
        })
    });
uf.displayName = sC;
var uC = "DismissableLayerBranch",
    Qv = x.forwardRef((e, t) => {
        const n = x.useContext(Gv),
            r = x.useRef(null),
            o = Vt(t, r);
        return x.useEffect(() => {
            const i = r.current;
            if (i) return n.branches.add(i), () => {
                n.branches.delete(i)
            }
        }, [n.branches]), P.jsx(tt.div, {
            ...e,
            ref: o
        })
    });
Qv.displayName = uC;

function cC(e, t = globalThis == null ? void 0 : globalThis.document) {
    const n = er(e),
        r = x.useRef(!1),
        o = x.useRef(() => {});
    return x.useEffect(() => {
        const i = a => {
                if (a.target && !r.current) {
                    let l = function() {
                        Yv(aC, n, u, {
                            discrete: !0
                        })
                    };
                    const u = {
                        originalEvent: a
                    };
                    a.pointerType === "touch" ? (t.removeEventListener("click", o.current), o.current = l, t.addEventListener("click", o.current, {
                        once: !0
                    })) : l()
                } else t.removeEventListener("click", o.current);
                r.current = !1
            },
            s = window.setTimeout(() => {
                t.addEventListener("pointerdown", i)
            }, 0);
        return () => {
            window.clearTimeout(s), t.removeEventListener("pointerdown", i), t.removeEventListener("click", o.current)
        }
    }, [t, n]), {
        onPointerDownCapture: () => r.current = !0
    }
}

function dC(e, t = globalThis == null ? void 0 : globalThis.document) {
    const n = er(e),
        r = x.useRef(!1);
    return x.useEffect(() => {
        const o = i => {
            i.target && !r.current && Yv(lC, n, {
                originalEvent: i
            }, {
                discrete: !1
            })
        };
        return t.addEventListener("focusin", o), () => t.removeEventListener("focusin", o)
    }, [t, n]), {
        onFocusCapture: () => r.current = !0,
        onBlurCapture: () => r.current = !1
    }
}

function Sp() {
    const e = new CustomEvent(bc);
    document.dispatchEvent(e)
}

function Yv(e, t, n, {
    discrete: r
}) {
    const o = n.originalEvent.target,
        i = new CustomEvent(e, {
            bubbles: !1,
            cancelable: !0,
            detail: n
        });
    t && o.addEventListener(e, t, {
        once: !0
    }), r ? Kv(o, i) : o.dispatchEvent(i)
}
var fC = uf,
    hC = Qv,
    tr = globalThis != null && globalThis.document ? x.useLayoutEffect : () => {},
    pC = "Portal",
    Xv = x.forwardRef((e, t) => {
        var a;
        const {
            container: n,
            ...r
        } = e, [o, i] = x.useState(!1);
        tr(() => i(!0), []);
        const s = n || o && ((a = globalThis == null ? void 0 : globalThis.document) == null ? void 0 : a.body);
        return s ? Bv.createPortal(P.jsx(tt.div, {
            ...r,
            ref: t
        }), s) : null
    });
Xv.displayName = pC;

function mC(e, t) {
    return x.useReducer((n, r) => t[n][r] ?? n, e)
}
var cf = e => {
    const {
        present: t,
        children: n
    } = e, r = gC(t), o = typeof n == "function" ? n({
        present: r.isPresent
    }) : x.Children.only(n), i = Vt(r.ref, yC(o));
    return typeof n == "function" || r.isPresent ? x.cloneElement(o, {
        ref: i
    }) : null
};
cf.displayName = "Presence";

function gC(e) {
    const [t, n] = x.useState(), r = x.useRef(null), o = x.useRef(e), i = x.useRef("none"), s = e ? "mounted" : "unmounted", [a, l] = mC(s, {
        mounted: {
            UNMOUNT: "unmounted",
            ANIMATION_OUT: "unmountSuspended"
        },
        unmountSuspended: {
            MOUNT: "mounted",
            ANIMATION_END: "unmounted"
        },
        unmounted: {
            MOUNT: "mounted"
        }
    });
    return x.useEffect(() => {
        const u = Ns(r.current);
        i.current = a === "mounted" ? u : "none"
    }, [a]), tr(() => {
        const u = r.current,
            c = o.current;
        if (c !== e) {
            const h = i.current,
                f = Ns(u);
            e ? l("MOUNT") : f === "none" || (u == null ? void 0 : u.display) === "none" ? l("UNMOUNT") : l(c && h !== f ? "ANIMATION_OUT" : "UNMOUNT"), o.current = e
        }
    }, [e, l]), tr(() => {
        if (t) {
            let u;
            const c = t.ownerDocument.defaultView ?? window,
                d = f => {
                    const g = Ns(r.current).includes(f.animationName);
                    if (f.target === t && g && (l("ANIMATION_END"), !o.current)) {
                        const w = t.style.animationFillMode;
                        t.style.animationFillMode = "forwards", u = c.setTimeout(() => {
                            t.style.animationFillMode === "forwards" && (t.style.animationFillMode = w)
                        })
                    }
                },
                h = f => {
                    f.target === t && (i.current = Ns(r.current))
                };
            return t.addEventListener("animationstart", h), t.addEventListener("animationcancel", d), t.addEventListener("animationend", d), () => {
                c.clearTimeout(u), t.removeEventListener("animationstart", h), t.removeEventListener("animationcancel", d), t.removeEventListener("animationend", d)
            }
        } else l("ANIMATION_END")
    }, [t, l]), {
        isPresent: ["mounted", "unmountSuspended"].includes(a),
        ref: x.useCallback(u => {
            r.current = u ? getComputedStyle(u) : null, n(u)
        }, [])
    }
}

function Ns(e) {
    return (e == null ? void 0 : e.animationName) || "none"
}

function yC(e) {
    var r, o;
    let t = (r = Object.getOwnPropertyDescriptor(e.props, "ref")) == null ? void 0 : r.get,
        n = t && "isReactWarning" in t && t.isReactWarning;
    return n ? e.ref : (t = (o = Object.getOwnPropertyDescriptor(e, "ref")) == null ? void 0 : o.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref)
}
var vC = Fg[" useInsertionEffect ".trim().toString()] || tr;

function wC({
    prop: e,
    defaultProp: t,
    onChange: n = () => {},
    caller: r
}) {
    const [o, i, s] = xC({
        defaultProp: t,
        onChange: n
    }), a = e !== void 0, l = a ? e : o;
    {
        const c = x.useRef(e !== void 0);
        x.useEffect(() => {
            const d = c.current;
            d !== a && console.warn(`${r} is changing from ${d?"controlled":"uncontrolled"} to ${a?"controlled":"uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`), c.current = a
        }, [a, r])
    }
    const u = x.useCallback(c => {
        var d;
        if (a) {
            const h = SC(c) ? c(e) : c;
            h !== e && ((d = s.current) == null || d.call(s, h))
        } else i(c)
    }, [a, e, i, s]);
    return [l, u]
}

function xC({
    defaultProp: e,
    onChange: t
}) {
    const [n, r] = x.useState(e), o = x.useRef(n), i = x.useRef(t);
    return vC(() => {
        i.current = t
    }, [t]), x.useEffect(() => {
        var s;
        o.current !== n && ((s = i.current) == null || s.call(i, n), o.current = n)
    }, [n, o]), [n, r, i]
}

function SC(e) {
    return typeof e == "function"
}
var EC = Object.freeze({
        position: "absolute",
        border: 0,
        width: 1,
        height: 1,
        padding: 0,
        margin: -1,
        overflow: "hidden",
        clip: "rect(0, 0, 0, 0)",
        whiteSpace: "nowrap",
        wordWrap: "normal"
    }),
    CC = "VisuallyHidden",
    ml = x.forwardRef((e, t) => P.jsx(tt.span, {
        ...e,
        ref: t,
        style: {
            ...EC,
            ...e.style
        }
    }));
ml.displayName = CC;
var TC = ml,
    df = "ToastProvider",
    [ff, PC, bC] = rC("Toast"),
    [qv, tN] = pl("Toast", [bC]),
    [kC, gl] = qv(df),
    Zv = e => {
        const {
            __scopeToast: t,
            label: n = "Notification",
            duration: r = 5e3,
            swipeDirection: o = "right",
            swipeThreshold: i = 50,
            children: s
        } = e, [a, l] = x.useState(null), [u, c] = x.useState(0), d = x.useRef(!1), h = x.useRef(!1);
        return n.trim() || console.error(`Invalid prop \`label\` supplied to \`${df}\`. Expected non-empty \`string\`.`), P.jsx(ff.Provider, {
            scope: t,
            children: P.jsx(kC, {
                scope: t,
                label: n,
                duration: r,
                swipeDirection: o,
                swipeThreshold: i,
                toastCount: u,
                viewport: a,
                onViewportChange: l,
                onToastAdd: x.useCallback(() => c(f => f + 1), []),
                onToastRemove: x.useCallback(() => c(f => f - 1), []),
                isFocusedToastEscapeKeyDownRef: d,
                isClosePausedRef: h,
                children: s
            })
        })
    };
Zv.displayName = df;
var Jv = "ToastViewport",
    RC = ["F8"],
    kc = "toast.viewportPause",
    Rc = "toast.viewportResume",
    e0 = x.forwardRef((e, t) => {
        const {
            __scopeToast: n,
            hotkey: r = RC,
            label: o = "Notifications ({hotkey})",
            ...i
        } = e, s = gl(Jv, n), a = PC(n), l = x.useRef(null), u = x.useRef(null), c = x.useRef(null), d = x.useRef(null), h = Vt(t, d, s.onViewportChange), f = r.join("+").replace(/Key/g, "").replace(/Digit/g, ""), v = s.toastCount > 0;
        x.useEffect(() => {
            const w = m => {
                var y;
                r.length !== 0 && r.every(S => m[S] || m.code === S) && ((y = d.current) == null || y.focus())
            };
            return document.addEventListener("keydown", w), () => document.removeEventListener("keydown", w)
        }, [r]), x.useEffect(() => {
            const w = l.current,
                m = d.current;
            if (v && w && m) {
                const p = () => {
                        if (!s.isClosePausedRef.current) {
                            const C = new CustomEvent(kc);
                            m.dispatchEvent(C), s.isClosePausedRef.current = !0
                        }
                    },
                    y = () => {
                        if (s.isClosePausedRef.current) {
                            const C = new CustomEvent(Rc);
                            m.dispatchEvent(C), s.isClosePausedRef.current = !1
                        }
                    },
                    S = C => {
                        !w.contains(C.relatedTarget) && y()
                    },
                    E = () => {
                        w.contains(document.activeElement) || y()
                    };
                return w.addEventListener("focusin", p), w.addEventListener("focusout", S), w.addEventListener("pointermove", p), w.addEventListener("pointerleave", E), window.addEventListener("blur", p), window.addEventListener("focus", y), () => {
                    w.removeEventListener("focusin", p), w.removeEventListener("focusout", S), w.removeEventListener("pointermove", p), w.removeEventListener("pointerleave", E), window.removeEventListener("blur", p), window.removeEventListener("focus", y)
                }
            }
        }, [v, s.isClosePausedRef]);
        const g = x.useCallback(({
            tabbingDirection: w
        }) => {
            const p = a().map(y => {
                const S = y.ref.current,
                    E = [S, ...$C(S)];
                return w === "forwards" ? E : E.reverse()
            });
            return (w === "forwards" ? p.reverse() : p).flat()
        }, [a]);
        return x.useEffect(() => {
            const w = d.current;
            if (w) {
                const m = p => {
                    var E, C, T;
                    const y = p.altKey || p.ctrlKey || p.metaKey;
                    if (p.key === "Tab" && !y) {
                        const b = document.activeElement,
                            D = p.shiftKey;
                        if (p.target === w && D) {
                            (E = u.current) == null || E.focus();
                            return
                        }
                        const I = g({
                                tabbingDirection: D ? "backwards" : "forwards"
                            }),
                            U = I.findIndex(O => O === b);
                        fu(I.slice(U + 1)) ? p.preventDefault() : D ? (C = u.current) == null || C.focus() : (T = c.current) == null || T.focus()
                    }
                };
                return w.addEventListener("keydown", m), () => w.removeEventListener("keydown", m)
            }
        }, [a, g]), P.jsxs(hC, {
            ref: l,
            role: "region",
            "aria-label": o.replace("{hotkey}", f),
            tabIndex: -1,
            style: {
                pointerEvents: v ? void 0 : "none"
            },
            children: [v && P.jsx(Ac, {
                ref: u,
                onFocusFromOutsideViewport: () => {
                    const w = g({
                        tabbingDirection: "forwards"
                    });
                    fu(w)
                }
            }), P.jsx(ff.Slot, {
                scope: n,
                children: P.jsx(tt.ol, {
                    tabIndex: -1,
                    ...i,
                    ref: h
                })
            }), v && P.jsx(Ac, {
                ref: c,
                onFocusFromOutsideViewport: () => {
                    const w = g({
                        tabbingDirection: "backwards"
                    });
                    fu(w)
                }
            })]
        })
    });
e0.displayName = Jv;
var t0 = "ToastFocusProxy",
    Ac = x.forwardRef((e, t) => {
        const {
            __scopeToast: n,
            onFocusFromOutsideViewport: r,
            ...o
        } = e, i = gl(t0, n);
        return P.jsx(ml, {
            "aria-hidden": !0,
            tabIndex: 0,
            ...o,
            ref: t,
            style: {
                position: "fixed"
            },
            onFocus: s => {
                var u;
                const a = s.relatedTarget;
                !((u = i.viewport) != null && u.contains(a)) && r()
            }
        })
    });
Ac.displayName = t0;
var ss = "Toast",
    AC = "toast.swipeStart",
    MC = "toast.swipeMove",
    DC = "toast.swipeCancel",
    LC = "toast.swipeEnd",
    n0 = x.forwardRef((e, t) => {
        const {
            forceMount: n,
            open: r,
            defaultOpen: o,
            onOpenChange: i,
            ...s
        } = e, [a, l] = wC({
            prop: r,
            defaultProp: o ?? !0,
            onChange: i,
            caller: ss
        });
        return P.jsx(cf, {
            present: n || a,
            children: P.jsx(IC, {
                open: a,
                ...s,
                ref: t,
                onClose: () => l(!1),
                onPause: er(e.onPause),
                onResume: er(e.onResume),
                onSwipeStart: Ce(e.onSwipeStart, u => {
                    u.currentTarget.setAttribute("data-swipe", "start")
                }),
                onSwipeMove: Ce(e.onSwipeMove, u => {
                    const {
                        x: c,
                        y: d
                    } = u.detail.delta;
                    u.currentTarget.setAttribute("data-swipe", "move"), u.currentTarget.style.setProperty("--radix-toast-swipe-move-x", `${c}px`), u.currentTarget.style.setProperty("--radix-toast-swipe-move-y", `${d}px`)
                }),
                onSwipeCancel: Ce(e.onSwipeCancel, u => {
                    u.currentTarget.setAttribute("data-swipe", "cancel"), u.currentTarget.style.removeProperty("--radix-toast-swipe-move-x"), u.currentTarget.style.removeProperty("--radix-toast-swipe-move-y"), u.currentTarget.style.removeProperty("--radix-toast-swipe-end-x"), u.currentTarget.style.removeProperty("--radix-toast-swipe-end-y")
                }),
                onSwipeEnd: Ce(e.onSwipeEnd, u => {
                    const {
                        x: c,
                        y: d
                    } = u.detail.delta;
                    u.currentTarget.setAttribute("data-swipe", "end"), u.currentTarget.style.removeProperty("--radix-toast-swipe-move-x"), u.currentTarget.style.removeProperty("--radix-toast-swipe-move-y"), u.currentTarget.style.setProperty("--radix-toast-swipe-end-x", `${c}px`), u.currentTarget.style.setProperty("--radix-toast-swipe-end-y", `${d}px`), l(!1)
                })
            })
        })
    });
n0.displayName = ss;
var [NC, OC] = qv(ss, {
    onClose() {}
}), IC = x.forwardRef((e, t) => {
    const {
        __scopeToast: n,
        type: r = "foreground",
        duration: o,
        open: i,
        onClose: s,
        onEscapeKeyDown: a,
        onPause: l,
        onResume: u,
        onSwipeStart: c,
        onSwipeMove: d,
        onSwipeCancel: h,
        onSwipeEnd: f,
        ...v
    } = e, g = gl(ss, n), [w, m] = x.useState(null), p = Vt(t, O => m(O)), y = x.useRef(null), S = x.useRef(null), E = o || g.duration, C = x.useRef(0), T = x.useRef(E), b = x.useRef(0), {
        onToastAdd: D,
        onToastRemove: R
    } = g, V = er(() => {
        var W;
        (w == null ? void 0 : w.contains(document.activeElement)) && ((W = g.viewport) == null || W.focus()), s()
    }), I = x.useCallback(O => {
        !O || O === 1 / 0 || (window.clearTimeout(b.current), C.current = new Date().getTime(), b.current = window.setTimeout(V, O))
    }, [V]);
    x.useEffect(() => {
        const O = g.viewport;
        if (O) {
            const W = () => {
                    I(T.current), u == null || u()
                },
                z = () => {
                    const H = new Date().getTime() - C.current;
                    T.current = T.current - H, window.clearTimeout(b.current), l == null || l()
                };
            return O.addEventListener(kc, z), O.addEventListener(Rc, W), () => {
                O.removeEventListener(kc, z), O.removeEventListener(Rc, W)
            }
        }
    }, [g.viewport, E, l, u, I]), x.useEffect(() => {
        i && !g.isClosePausedRef.current && I(E)
    }, [i, E, g.isClosePausedRef, I]), x.useEffect(() => (D(), () => R()), [D, R]);
    const U = x.useMemo(() => w ? u0(w) : null, [w]);
    return g.viewport ? P.jsxs(P.Fragment, {
        children: [U && P.jsx(_C, {
            __scopeToast: n,
            role: "status",
            "aria-live": r === "foreground" ? "assertive" : "polite",
            "aria-atomic": !0,
            children: U
        }), P.jsx(NC, {
            scope: n,
            onClose: V,
            children: is.createPortal(P.jsx(ff.ItemSlot, {
                scope: n,
                children: P.jsx(fC, {
                    asChild: !0,
                    onEscapeKeyDown: Ce(a, () => {
                        g.isFocusedToastEscapeKeyDownRef.current || V(), g.isFocusedToastEscapeKeyDownRef.current = !1
                    }),
                    children: P.jsx(tt.li, {
                        role: "status",
                        "aria-live": "off",
                        "aria-atomic": !0,
                        tabIndex: 0,
                        "data-state": i ? "open" : "closed",
                        "data-swipe-direction": g.swipeDirection,
                        ...v,
                        ref: p,
                        style: {
                            userSelect: "none",
                            touchAction: "none",
                            ...e.style
                        },
                        onKeyDown: Ce(e.onKeyDown, O => {
                            O.key === "Escape" && (a == null || a(O.nativeEvent), O.nativeEvent.defaultPrevented || (g.isFocusedToastEscapeKeyDownRef.current = !0, V()))
                        }),
                        onPointerDown: Ce(e.onPointerDown, O => {
                            O.button === 0 && (y.current = {
                                x: O.clientX,
                                y: O.clientY
                            })
                        }),
                        onPointerMove: Ce(e.onPointerMove, O => {
                            if (!y.current) return;
                            const W = O.clientX - y.current.x,
                                z = O.clientY - y.current.y,
                                H = !!S.current,
                                k = ["left", "right"].includes(g.swipeDirection),
                                A = ["left", "up"].includes(g.swipeDirection) ? Math.min : Math.max,
                                _ = k ? A(0, W) : 0,
                                B = k ? 0 : A(0, z),
                                $ = O.pointerType === "touch" ? 10 : 2,
                                Y = {
                                    x: _,
                                    y: B
                                },
                                q = {
                                    originalEvent: O,
                                    delta: Y
                                };
                            H ? (S.current = Y, Os(MC, d, q, {
                                discrete: !1
                            })) : Ep(Y, g.swipeDirection, $) ? (S.current = Y, Os(AC, c, q, {
                                discrete: !1
                            }), O.target.setPointerCapture(O.pointerId)) : (Math.abs(W) > $ || Math.abs(z) > $) && (y.current = null)
                        }),
                        onPointerUp: Ce(e.onPointerUp, O => {
                            const W = S.current,
                                z = O.target;
                            if (z.hasPointerCapture(O.pointerId) && z.releasePointerCapture(O.pointerId), S.current = null, y.current = null, W) {
                                const H = O.currentTarget,
                                    k = {
                                        originalEvent: O,
                                        delta: W
                                    };
                                Ep(W, g.swipeDirection, g.swipeThreshold) ? Os(LC, f, k, {
                                    discrete: !0
                                }) : Os(DC, h, k, {
                                    discrete: !0
                                }), H.addEventListener("click", A => A.preventDefault(), {
                                    once: !0
                                })
                            }
                        })
                    })
                })
            }), g.viewport)
        })]
    }) : null
}), _C = e => {
    const {
        __scopeToast: t,
        children: n,
        ...r
    } = e, o = gl(ss, t), [i, s] = x.useState(!1), [a, l] = x.useState(!1);
    return FC(() => s(!0)), x.useEffect(() => {
        const u = window.setTimeout(() => l(!0), 1e3);
        return () => window.clearTimeout(u)
    }, []), a ? null : P.jsx(Xv, {
        asChild: !0,
        children: P.jsx(ml, {
            ...r,
            children: i && P.jsxs(P.Fragment, {
                children: [o.label, " ", n]
            })
        })
    })
}, VC = "ToastTitle", r0 = x.forwardRef((e, t) => {
    const {
        __scopeToast: n,
        ...r
    } = e;
    return P.jsx(tt.div, {
        ...r,
        ref: t
    })
});
r0.displayName = VC;
var jC = "ToastDescription",
    o0 = x.forwardRef((e, t) => {
        const {
            __scopeToast: n,
            ...r
        } = e;
        return P.jsx(tt.div, {
            ...r,
            ref: t
        })
    });
o0.displayName = jC;
var i0 = "ToastAction",
    s0 = x.forwardRef((e, t) => {
        const {
            altText: n,
            ...r
        } = e;
        return n.trim() ? P.jsx(l0, {
            altText: n,
            asChild: !0,
            children: P.jsx(hf, {
                ...r,
                ref: t
            })
        }) : (console.error(`Invalid prop \`altText\` supplied to \`${i0}\`. Expected non-empty \`string\`.`), null)
    });
s0.displayName = i0;
var a0 = "ToastClose",
    hf = x.forwardRef((e, t) => {
        const {
            __scopeToast: n,
            ...r
        } = e, o = OC(a0, n);
        return P.jsx(l0, {
            asChild: !0,
            children: P.jsx(tt.button, {
                type: "button",
                ...r,
                ref: t,
                onClick: Ce(e.onClick, o.onClose)
            })
        })
    });
hf.displayName = a0;
var l0 = x.forwardRef((e, t) => {
    const {
        __scopeToast: n,
        altText: r,
        ...o
    } = e;
    return P.jsx(tt.div, {
        "data-radix-toast-announce-exclude": "",
        "data-radix-toast-announce-alt": r || void 0,
        ...o,
        ref: t
    })
});

function u0(e) {
    const t = [];
    return Array.from(e.childNodes).forEach(r => {
        if (r.nodeType === r.TEXT_NODE && r.textContent && t.push(r.textContent), zC(r)) {
            const o = r.ariaHidden || r.hidden || r.style.display === "none",
                i = r.dataset.radixToastAnnounceExclude === "";
            if (!o)
                if (i) {
                    const s = r.dataset.radixToastAnnounceAlt;
                    s && t.push(s)
                } else t.push(...u0(r))
        }
    }), t
}

function Os(e, t, n, {
    discrete: r
}) {
    const o = n.originalEvent.currentTarget,
        i = new CustomEvent(e, {
            bubbles: !0,
            cancelable: !0,
            detail: n
        });
    t && o.addEventListener(e, t, {
        once: !0
    }), r ? Kv(o, i) : o.dispatchEvent(i)
}
var Ep = (e, t, n = 0) => {
    const r = Math.abs(e.x),
        o = Math.abs(e.y),
        i = r > o;
    return t === "left" || t === "right" ? i && r > n : !i && o > n
};

function FC(e = () => {}) {
    const t = er(e);
    tr(() => {
        let n = 0,
            r = 0;
        return n = window.requestAnimationFrame(() => r = window.requestAnimationFrame(t)), () => {
            window.cancelAnimationFrame(n), window.cancelAnimationFrame(r)
        }
    }, [t])
}

function zC(e) {
    return e.nodeType === e.ELEMENT_NODE
}

function $C(e) {
    const t = [],
        n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
            acceptNode: r => {
                const o = r.tagName === "INPUT" && r.type === "hidden";
                return r.disabled || r.hidden || o ? NodeFilter.FILTER_SKIP : r.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP
            }
        });
    for (; n.nextNode();) t.push(n.currentNode);
    return t
}

function fu(e) {
    const t = document.activeElement;
    return e.some(n => n === t ? !0 : (n.focus(), document.activeElement !== t))
}
var BC = Zv,
    c0 = e0,
    d0 = n0,
    f0 = r0,
    h0 = o0,
    p0 = s0,
    m0 = hf;

function g0(e) {
    var t, n, r = "";
    if (typeof e == "string" || typeof e == "number") r += e;
    else if (typeof e == "object")
        if (Array.isArray(e)) {
            var o = e.length;
            for (t = 0; t < o; t++) e[t] && (n = g0(e[t])) && (r && (r += " "), r += n)
        } else
            for (n in e) e[n] && (r && (r += " "), r += n);
    return r
}

function y0() {
    for (var e, t, n = 0, r = "", o = arguments.length; n < o; n++)(e = arguments[n]) && (t = g0(e)) && (r && (r += " "), r += t);
    return r
}
const Cp = e => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e,
    Tp = y0,
    UC = (e, t) => n => {
        var r;
        if ((t == null ? void 0 : t.variants) == null) return Tp(e, n == null ? void 0 : n.class, n == null ? void 0 : n.className);
        const {
            variants: o,
            defaultVariants: i
        } = t, s = Object.keys(o).map(u => {
            const c = n == null ? void 0 : n[u],
                d = i == null ? void 0 : i[u];
            if (c === null) return null;
            const h = Cp(c) || Cp(d);
            return o[u][h]
        }), a = n && Object.entries(n).reduce((u, c) => {
            let [d, h] = c;
            return h === void 0 || (u[d] = h), u
        }, {}), l = t == null || (r = t.compoundVariants) === null || r === void 0 ? void 0 : r.reduce((u, c) => {
            let {
                class: d,
                className: h,
                ...f
            } = c;
            return Object.entries(f).every(v => {
                let [g, w] = v;
                return Array.isArray(w) ? w.includes({
                    ...i,
                    ...a
                } [g]) : {
                    ...i,
                    ...a
                } [g] === w
            }) ? [...u, d, h] : u
        }, []);
        return Tp(e, s, l, n == null ? void 0 : n.class, n == null ? void 0 : n.className)
    };
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const WC = e => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(),
    v0 = (...e) => e.filter((t, n, r) => !!t && t.trim() !== "" && r.indexOf(t) === n).join(" ").trim();
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var HC = {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round"
};
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const KC = x.forwardRef(({
    color: e = "currentColor",
    size: t = 24,
    strokeWidth: n = 2,
    absoluteStrokeWidth: r,
    className: o = "",
    children: i,
    iconNode: s,
    ...a
}, l) => x.createElement("svg", {
    ref: l,
    ...HC,
    width: t,
    height: t,
    stroke: e,
    strokeWidth: r ? Number(n) * 24 / Number(t) : n,
    className: v0("lucide", o),
    ...a
}, [...s.map(([u, c]) => x.createElement(u, c)), ...Array.isArray(i) ? i : [i]]));
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const pf = (e, t) => {
    const n = x.forwardRef(({
        className: r,
        ...o
    }, i) => x.createElement(KC, {
        ref: i,
        iconNode: t,
        className: v0(`lucide-${WC(e)}`, r),
        ...o
    }));
    return n.displayName = `${e}`, n
};
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const GC = pf("Volume2", [
    ["path", {
        d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",
        key: "uqj9uw"
    }],
    ["path", {
        d: "M16 9a5 5 0 0 1 0 6",
        key: "1q6k2b"
    }],
    ["path", {
        d: "M19.364 18.364a9 9 0 0 0 0-12.728",
        key: "ijwkga"
    }]
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const QC = pf("VolumeX", [
    ["path", {
        d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",
        key: "uqj9uw"
    }],
    ["line", {
        x1: "22",
        x2: "16",
        y1: "9",
        y2: "15",
        key: "1ewh16"
    }],
    ["line", {
        x1: "16",
        x2: "22",
        y1: "9",
        y2: "15",
        key: "5ykzw1"
    }]
]);
/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const YC = pf("X", [
        ["path", {
            d: "M18 6 6 18",
            key: "1bl5f8"
        }],
        ["path", {
            d: "m6 6 12 12",
            key: "d8bk6v"
        }]
    ]),
    mf = "-",
    XC = e => {
        const t = ZC(e),
            {
                conflictingClassGroups: n,
                conflictingClassGroupModifiers: r
            } = e;
        return {
            getClassGroupId: s => {
                const a = s.split(mf);
                return a[0] === "" && a.length !== 1 && a.shift(), w0(a, t) || qC(s)
            },
            getConflictingClassGroupIds: (s, a) => {
                const l = n[s] || [];
                return a && r[s] ? [...l, ...r[s]] : l
            }
        }
    },
    w0 = (e, t) => {
        var s;
        if (e.length === 0) return t.classGroupId;
        const n = e[0],
            r = t.nextPart.get(n),
            o = r ? w0(e.slice(1), r) : void 0;
        if (o) return o;
        if (t.validators.length === 0) return;
        const i = e.join(mf);
        return (s = t.validators.find(({
            validator: a
        }) => a(i))) == null ? void 0 : s.classGroupId
    },
    Pp = /^\[(.+)\]$/,
    qC = e => {
        if (Pp.test(e)) {
            const t = Pp.exec(e)[1],
                n = t == null ? void 0 : t.substring(0, t.indexOf(":"));
            if (n) return "arbitrary.." + n
        }
    },
    ZC = e => {
        const {
            theme: t,
            prefix: n
        } = e, r = {
            nextPart: new Map,
            validators: []
        };
        return eT(Object.entries(e.classGroups), n).forEach(([i, s]) => {
            Mc(s, r, i, t)
        }), r
    },
    Mc = (e, t, n, r) => {
        e.forEach(o => {
            if (typeof o == "string") {
                const i = o === "" ? t : bp(t, o);
                i.classGroupId = n;
                return
            }
            if (typeof o == "function") {
                if (JC(o)) {
                    Mc(o(r), t, n, r);
                    return
                }
                t.validators.push({
                    validator: o,
                    classGroupId: n
                });
                return
            }
            Object.entries(o).forEach(([i, s]) => {
                Mc(s, bp(t, i), n, r)
            })
        })
    },
    bp = (e, t) => {
        let n = e;
        return t.split(mf).forEach(r => {
            n.nextPart.has(r) || n.nextPart.set(r, {
                nextPart: new Map,
                validators: []
            }), n = n.nextPart.get(r)
        }), n
    },
    JC = e => e.isThemeGetter,
    eT = (e, t) => t ? e.map(([n, r]) => {
        const o = r.map(i => typeof i == "string" ? t + i : typeof i == "object" ? Object.fromEntries(Object.entries(i).map(([s, a]) => [t + s, a])) : i);
        return [n, o]
    }) : e,
    tT = e => {
        if (e < 1) return {
            get: () => {},
            set: () => {}
        };
        let t = 0,
            n = new Map,
            r = new Map;
        const o = (i, s) => {
            n.set(i, s), t++, t > e && (t = 0, r = n, n = new Map)
        };
        return {
            get(i) {
                let s = n.get(i);
                if (s !== void 0) return s;
                if ((s = r.get(i)) !== void 0) return o(i, s), s
            },
            set(i, s) {
                n.has(i) ? n.set(i, s) : o(i, s)
            }
        }
    },
    x0 = "!",
    nT = e => {
        const {
            separator: t,
            experimentalParseClassName: n
        } = e, r = t.length === 1, o = t[0], i = t.length, s = a => {
            const l = [];
            let u = 0,
                c = 0,
                d;
            for (let w = 0; w < a.length; w++) {
                let m = a[w];
                if (u === 0) {
                    if (m === o && (r || a.slice(w, w + i) === t)) {
                        l.push(a.slice(c, w)), c = w + i;
                        continue
                    }
                    if (m === "/") {
                        d = w;
                        continue
                    }
                }
                m === "[" ? u++ : m === "]" && u--
            }
            const h = l.length === 0 ? a : a.substring(c),
                f = h.startsWith(x0),
                v = f ? h.substring(1) : h,
                g = d && d > c ? d - c : void 0;
            return {
                modifiers: l,
                hasImportantModifier: f,
                baseClassName: v,
                maybePostfixModifierPosition: g
            }
        };
        return n ? a => n({
            className: a,
            parseClassName: s
        }) : s
    },
    rT = e => {
        if (e.length <= 1) return e;
        const t = [];
        let n = [];
        return e.forEach(r => {
            r[0] === "[" ? (t.push(...n.sort(), r), n = []) : n.push(r)
        }), t.push(...n.sort()), t
    },
    oT = e => ({
        cache: tT(e.cacheSize),
        parseClassName: nT(e),
        ...XC(e)
    }),
    iT = /\s+/,
    sT = (e, t) => {
        const {
            parseClassName: n,
            getClassGroupId: r,
            getConflictingClassGroupIds: o
        } = t, i = [], s = e.trim().split(iT);
        let a = "";
        for (let l = s.length - 1; l >= 0; l -= 1) {
            const u = s[l],
                {
                    modifiers: c,
                    hasImportantModifier: d,
                    baseClassName: h,
                    maybePostfixModifierPosition: f
                } = n(u);
            let v = !!f,
                g = r(v ? h.substring(0, f) : h);
            if (!g) {
                if (!v) {
                    a = u + (a.length > 0 ? " " + a : a);
                    continue
                }
                if (g = r(h), !g) {
                    a = u + (a.length > 0 ? " " + a : a);
                    continue
                }
                v = !1
            }
            const w = rT(c).join(":"),
                m = d ? w + x0 : w,
                p = m + g;
            if (i.includes(p)) continue;
            i.push(p);
            const y = o(g, v);
            for (let S = 0; S < y.length; ++S) {
                const E = y[S];
                i.push(m + E)
            }
            a = u + (a.length > 0 ? " " + a : a)
        }
        return a
    };

function aT() {
    let e = 0,
        t, n, r = "";
    for (; e < arguments.length;)(t = arguments[e++]) && (n = S0(t)) && (r && (r += " "), r += n);
    return r
}
const S0 = e => {
    if (typeof e == "string") return e;
    let t, n = "";
    for (let r = 0; r < e.length; r++) e[r] && (t = S0(e[r])) && (n && (n += " "), n += t);
    return n
};

function lT(e, ...t) {
    let n, r, o, i = s;

    function s(l) {
        const u = t.reduce((c, d) => d(c), e());
        return n = oT(u), r = n.cache.get, o = n.cache.set, i = a, a(l)
    }

    function a(l) {
        const u = r(l);
        if (u) return u;
        const c = sT(l, n);
        return o(l, c), c
    }
    return function() {
        return i(aT.apply(null, arguments))
    }
}
const ie = e => {
        const t = n => n[e] || [];
        return t.isThemeGetter = !0, t
    },
    E0 = /^\[(?:([a-z-]+):)?(.+)\]$/i,
    uT = /^\d+\/\d+$/,
    cT = new Set(["px", "full", "screen"]),
    dT = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,
    fT = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,
    hT = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/,
    pT = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,
    mT = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,
    nn = e => yo(e) || cT.has(e) || uT.test(e),
    bn = e => Uo(e, "length", CT),
    yo = e => !!e && !Number.isNaN(Number(e)),
    hu = e => Uo(e, "number", yo),
    ii = e => !!e && Number.isInteger(Number(e)),
    gT = e => e.endsWith("%") && yo(e.slice(0, -1)),
    Q = e => E0.test(e),
    kn = e => dT.test(e),
    yT = new Set(["length", "size", "percentage"]),
    vT = e => Uo(e, yT, C0),
    wT = e => Uo(e, "position", C0),
    xT = new Set(["image", "url"]),
    ST = e => Uo(e, xT, PT),
    ET = e => Uo(e, "", TT),
    si = () => !0,
    Uo = (e, t, n) => {
        const r = E0.exec(e);
        return r ? r[1] ? typeof t == "string" ? r[1] === t : t.has(r[1]) : n(r[2]) : !1
    },
    CT = e => fT.test(e) && !hT.test(e),
    C0 = () => !1,
    TT = e => pT.test(e),
    PT = e => mT.test(e),
    bT = () => {
        const e = ie("colors"),
            t = ie("spacing"),
            n = ie("blur"),
            r = ie("brightness"),
            o = ie("borderColor"),
            i = ie("borderRadius"),
            s = ie("borderSpacing"),
            a = ie("borderWidth"),
            l = ie("contrast"),
            u = ie("grayscale"),
            c = ie("hueRotate"),
            d = ie("invert"),
            h = ie("gap"),
            f = ie("gradientColorStops"),
            v = ie("gradientColorStopPositions"),
            g = ie("inset"),
            w = ie("margin"),
            m = ie("opacity"),
            p = ie("padding"),
            y = ie("saturate"),
            S = ie("scale"),
            E = ie("sepia"),
            C = ie("skew"),
            T = ie("space"),
            b = ie("translate"),
            D = () => ["auto", "contain", "none"],
            R = () => ["auto", "hidden", "clip", "visible", "scroll"],
            V = () => ["auto", Q, t],
            I = () => [Q, t],
            U = () => ["", nn, bn],
            O = () => ["auto", yo, Q],
            W = () => ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"],
            z = () => ["solid", "dashed", "dotted", "double", "none"],
            H = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"],
            k = () => ["start", "end", "center", "between", "around", "evenly", "stretch"],
            A = () => ["", "0", Q],
            _ = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"],
            B = () => [yo, Q];
        return {
            cacheSize: 500,
            separator: ":",
            theme: {
                colors: [si],
                spacing: [nn, bn],
                blur: ["none", "", kn, Q],
                brightness: B(),
                borderColor: [e],
                borderRadius: ["none", "", "full", kn, Q],
                borderSpacing: I(),
                borderWidth: U(),
                contrast: B(),
                grayscale: A(),
                hueRotate: B(),
                invert: A(),
                gap: I(),
                gradientColorStops: [e],
                gradientColorStopPositions: [gT, bn],
                inset: V(),
                margin: V(),
                opacity: B(),
                padding: I(),
                saturate: B(),
                scale: B(),
                sepia: A(),
                skew: B(),
                space: I(),
                translate: I()
            },
            classGroups: {
                aspect: [{
                    aspect: ["auto", "square", "video", Q]
                }],
                container: ["container"],
                columns: [{
                    columns: [kn]
                }],
                "break-after": [{
                    "break-after": _()
                }],
                "break-before": [{
                    "break-before": _()
                }],
                "break-inside": [{
                    "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
                }],
                "box-decoration": [{
                    "box-decoration": ["slice", "clone"]
                }],
                box: [{
                    box: ["border", "content"]
                }],
                display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
                float: [{
                    float: ["right", "left", "none", "start", "end"]
                }],
                clear: [{
                    clear: ["left", "right", "both", "none", "start", "end"]
                }],
                isolation: ["isolate", "isolation-auto"],
                "object-fit": [{
                    object: ["contain", "cover", "fill", "none", "scale-down"]
                }],
                "object-position": [{
                    object: [...W(), Q]
                }],
                overflow: [{
                    overflow: R()
                }],
                "overflow-x": [{
                    "overflow-x": R()
                }],
                "overflow-y": [{
                    "overflow-y": R()
                }],
                overscroll: [{
                    overscroll: D()
                }],
                "overscroll-x": [{
                    "overscroll-x": D()
                }],
                "overscroll-y": [{
                    "overscroll-y": D()
                }],
                position: ["static", "fixed", "absolute", "relative", "sticky"],
                inset: [{
                    inset: [g]
                }],
                "inset-x": [{
                    "inset-x": [g]
                }],
                "inset-y": [{
                    "inset-y": [g]
                }],
                start: [{
                    start: [g]
                }],
                end: [{
                    end: [g]
                }],
                top: [{
                    top: [g]
                }],
                right: [{
                    right: [g]
                }],
                bottom: [{
                    bottom: [g]
                }],
                left: [{
                    left: [g]
                }],
                visibility: ["visible", "invisible", "collapse"],
                z: [{
                    z: ["auto", ii, Q]
                }],
                basis: [{
                    basis: V()
                }],
                "flex-direction": [{
                    flex: ["row", "row-reverse", "col", "col-reverse"]
                }],
                "flex-wrap": [{
                    flex: ["wrap", "wrap-reverse", "nowrap"]
                }],
                flex: [{
                    flex: ["1", "auto", "initial", "none", Q]
                }],
                grow: [{
                    grow: A()
                }],
                shrink: [{
                    shrink: A()
                }],
                order: [{
                    order: ["first", "last", "none", ii, Q]
                }],
                "grid-cols": [{
                    "grid-cols": [si]
                }],
                "col-start-end": [{
                    col: ["auto", {
                        span: ["full", ii, Q]
                    }, Q]
                }],
                "col-start": [{
                    "col-start": O()
                }],
                "col-end": [{
                    "col-end": O()
                }],
                "grid-rows": [{
                    "grid-rows": [si]
                }],
                "row-start-end": [{
                    row: ["auto", {
                        span: [ii, Q]
                    }, Q]
                }],
                "row-start": [{
                    "row-start": O()
                }],
                "row-end": [{
                    "row-end": O()
                }],
                "grid-flow": [{
                    "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
                }],
                "auto-cols": [{
                    "auto-cols": ["auto", "min", "max", "fr", Q]
                }],
                "auto-rows": [{
                    "auto-rows": ["auto", "min", "max", "fr", Q]
                }],
                gap: [{
                    gap: [h]
                }],
                "gap-x": [{
                    "gap-x": [h]
                }],
                "gap-y": [{
                    "gap-y": [h]
                }],
                "justify-content": [{
                    justify: ["normal", ...k()]
                }],
                "justify-items": [{
                    "justify-items": ["start", "end", "center", "stretch"]
                }],
                "justify-self": [{
                    "justify-self": ["auto", "start", "end", "center", "stretch"]
                }],
                "align-content": [{
                    content: ["normal", ...k(), "baseline"]
                }],
                "align-items": [{
                    items: ["start", "end", "center", "baseline", "stretch"]
                }],
                "align-self": [{
                    self: ["auto", "start", "end", "center", "stretch", "baseline"]
                }],
                "place-content": [{
                    "place-content": [...k(), "baseline"]
                }],
                "place-items": [{
                    "place-items": ["start", "end", "center", "baseline", "stretch"]
                }],
                "place-self": [{
                    "place-self": ["auto", "start", "end", "center", "stretch"]
                }],
                p: [{
                    p: [p]
                }],
                px: [{
                    px: [p]
                }],
                py: [{
                    py: [p]
                }],
                ps: [{
                    ps: [p]
                }],
                pe: [{
                    pe: [p]
                }],
                pt: [{
                    pt: [p]
                }],
                pr: [{
                    pr: [p]
                }],
                pb: [{
                    pb: [p]
                }],
                pl: [{
                    pl: [p]
                }],
                m: [{
                    m: [w]
                }],
                mx: [{
                    mx: [w]
                }],
                my: [{
                    my: [w]
                }],
                ms: [{
                    ms: [w]
                }],
                me: [{
                    me: [w]
                }],
                mt: [{
                    mt: [w]
                }],
                mr: [{
                    mr: [w]
                }],
                mb: [{
                    mb: [w]
                }],
                ml: [{
                    ml: [w]
                }],
                "space-x": [{
                    "space-x": [T]
                }],
                "space-x-reverse": ["space-x-reverse"],
                "space-y": [{
                    "space-y": [T]
                }],
                "space-y-reverse": ["space-y-reverse"],
                w: [{
                    w: ["auto", "min", "max", "fit", "svw", "lvw", "dvw", Q, t]
                }],
                "min-w": [{
                    "min-w": [Q, t, "min", "max", "fit"]
                }],
                "max-w": [{
                    "max-w": [Q, t, "none", "full", "min", "max", "fit", "prose", {
                        screen: [kn]
                    }, kn]
                }],
                h: [{
                    h: [Q, t, "auto", "min", "max", "fit", "svh", "lvh", "dvh"]
                }],
                "min-h": [{
                    "min-h": [Q, t, "min", "max", "fit", "svh", "lvh", "dvh"]
                }],
                "max-h": [{
                    "max-h": [Q, t, "min", "max", "fit", "svh", "lvh", "dvh"]
                }],
                size: [{
                    size: [Q, t, "auto", "min", "max", "fit"]
                }],
                "font-size": [{
                    text: ["base", kn, bn]
                }],
                "font-smoothing": ["antialiased", "subpixel-antialiased"],
                "font-style": ["italic", "not-italic"],
                "font-weight": [{
                    font: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black", hu]
                }],
                "font-family": [{
                    font: [si]
                }],
                "fvn-normal": ["normal-nums"],
                "fvn-ordinal": ["ordinal"],
                "fvn-slashed-zero": ["slashed-zero"],
                "fvn-figure": ["lining-nums", "oldstyle-nums"],
                "fvn-spacing": ["proportional-nums", "tabular-nums"],
                "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
                tracking: [{
                    tracking: ["tighter", "tight", "normal", "wide", "wider", "widest", Q]
                }],
                "line-clamp": [{
                    "line-clamp": ["none", yo, hu]
                }],
                leading: [{
                    leading: ["none", "tight", "snug", "normal", "relaxed", "loose", nn, Q]
                }],
                "list-image": [{
                    "list-image": ["none", Q]
                }],
                "list-style-type": [{
                    list: ["none", "disc", "decimal", Q]
                }],
                "list-style-position": [{
                    list: ["inside", "outside"]
                }],
                "placeholder-color": [{
                    placeholder: [e]
                }],
                "placeholder-opacity": [{
                    "placeholder-opacity": [m]
                }],
                "text-alignment": [{
                    text: ["left", "center", "right", "justify", "start", "end"]
                }],
                "text-color": [{
                    text: [e]
                }],
                "text-opacity": [{
                    "text-opacity": [m]
                }],
                "text-decoration": ["underline", "overline", "line-through", "no-underline"],
                "text-decoration-style": [{
                    decoration: [...z(), "wavy"]
                }],
                "text-decoration-thickness": [{
                    decoration: ["auto", "from-font", nn, bn]
                }],
                "underline-offset": [{
                    "underline-offset": ["auto", nn, Q]
                }],
                "text-decoration-color": [{
                    decoration: [e]
                }],
                "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
                "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
                "text-wrap": [{
                    text: ["wrap", "nowrap", "balance", "pretty"]
                }],
                indent: [{
                    indent: I()
                }],
                "vertical-align": [{
                    align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", Q]
                }],
                whitespace: [{
                    whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
                }],
                break: [{
                    break: ["normal", "words", "all", "keep"]
                }],
                hyphens: [{
                    hyphens: ["none", "manual", "auto"]
                }],
                content: [{
                    content: ["none", Q]
                }],
                "bg-attachment": [{
                    bg: ["fixed", "local", "scroll"]
                }],
                "bg-clip": [{
                    "bg-clip": ["border", "padding", "content", "text"]
                }],
                "bg-opacity": [{
                    "bg-opacity": [m]
                }],
                "bg-origin": [{
                    "bg-origin": ["border", "padding", "content"]
                }],
                "bg-position": [{
                    bg: [...W(), wT]
                }],
                "bg-repeat": [{
                    bg: ["no-repeat", {
                        repeat: ["", "x", "y", "round", "space"]
                    }]
                }],
                "bg-size": [{
                    bg: ["auto", "cover", "contain", vT]
                }],
                "bg-image": [{
                    bg: ["none", {
                        "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
                    }, ST]
                }],
                "bg-color": [{
                    bg: [e]
                }],
                "gradient-from-pos": [{
                    from: [v]
                }],
                "gradient-via-pos": [{
                    via: [v]
                }],
                "gradient-to-pos": [{
                    to: [v]
                }],
                "gradient-from": [{
                    from: [f]
                }],
                "gradient-via": [{
                    via: [f]
                }],
                "gradient-to": [{
                    to: [f]
                }],
                rounded: [{
                    rounded: [i]
                }],
                "rounded-s": [{
                    "rounded-s": [i]
                }],
                "rounded-e": [{
                    "rounded-e": [i]
                }],
                "rounded-t": [{
                    "rounded-t": [i]
                }],
                "rounded-r": [{
                    "rounded-r": [i]
                }],
                "rounded-b": [{
                    "rounded-b": [i]
                }],
                "rounded-l": [{
                    "rounded-l": [i]
                }],
                "rounded-ss": [{
                    "rounded-ss": [i]
                }],
                "rounded-se": [{
                    "rounded-se": [i]
                }],
                "rounded-ee": [{
                    "rounded-ee": [i]
                }],
                "rounded-es": [{
                    "rounded-es": [i]
                }],
                "rounded-tl": [{
                    "rounded-tl": [i]
                }],
                "rounded-tr": [{
                    "rounded-tr": [i]
                }],
                "rounded-br": [{
                    "rounded-br": [i]
                }],
                "rounded-bl": [{
                    "rounded-bl": [i]
                }],
                "border-w": [{
                    border: [a]
                }],
                "border-w-x": [{
                    "border-x": [a]
                }],
                "border-w-y": [{
                    "border-y": [a]
                }],
                "border-w-s": [{
                    "border-s": [a]
                }],
                "border-w-e": [{
                    "border-e": [a]
                }],
                "border-w-t": [{
                    "border-t": [a]
                }],
                "border-w-r": [{
                    "border-r": [a]
                }],
                "border-w-b": [{
                    "border-b": [a]
                }],
                "border-w-l": [{
                    "border-l": [a]
                }],
                "border-opacity": [{
                    "border-opacity": [m]
                }],
                "border-style": [{
                    border: [...z(), "hidden"]
                }],
                "divide-x": [{
                    "divide-x": [a]
                }],
                "divide-x-reverse": ["divide-x-reverse"],
                "divide-y": [{
                    "divide-y": [a]
                }],
                "divide-y-reverse": ["divide-y-reverse"],
                "divide-opacity": [{
                    "divide-opacity": [m]
                }],
                "divide-style": [{
                    divide: z()
                }],
                "border-color": [{
                    border: [o]
                }],
                "border-color-x": [{
                    "border-x": [o]
                }],
                "border-color-y": [{
                    "border-y": [o]
                }],
                "border-color-s": [{
                    "border-s": [o]
                }],
                "border-color-e": [{
                    "border-e": [o]
                }],
                "border-color-t": [{
                    "border-t": [o]
                }],
                "border-color-r": [{
                    "border-r": [o]
                }],
                "border-color-b": [{
                    "border-b": [o]
                }],
                "border-color-l": [{
                    "border-l": [o]
                }],
                "divide-color": [{
                    divide: [o]
                }],
                "outline-style": [{
                    outline: ["", ...z()]
                }],
                "outline-offset": [{
                    "outline-offset": [nn, Q]
                }],
                "outline-w": [{
                    outline: [nn, bn]
                }],
                "outline-color": [{
                    outline: [e]
                }],
                "ring-w": [{
                    ring: U()
                }],
                "ring-w-inset": ["ring-inset"],
                "ring-color": [{
                    ring: [e]
                }],
                "ring-opacity": [{
                    "ring-opacity": [m]
                }],
                "ring-offset-w": [{
                    "ring-offset": [nn, bn]
                }],
                "ring-offset-color": [{
                    "ring-offset": [e]
                }],
                shadow: [{
                    shadow: ["", "inner", "none", kn, ET]
                }],
                "shadow-color": [{
                    shadow: [si]
                }],
                opacity: [{
                    opacity: [m]
                }],
                "mix-blend": [{
                    "mix-blend": [...H(), "plus-lighter", "plus-darker"]
                }],
                "bg-blend": [{
                    "bg-blend": H()
                }],
                filter: [{
                    filter: ["", "none"]
                }],
                blur: [{
                    blur: [n]
                }],
                brightness: [{
                    brightness: [r]
                }],
                contrast: [{
                    contrast: [l]
                }],
                "drop-shadow": [{
                    "drop-shadow": ["", "none", kn, Q]
                }],
                grayscale: [{
                    grayscale: [u]
                }],
                "hue-rotate": [{
                    "hue-rotate": [c]
                }],
                invert: [{
                    invert: [d]
                }],
                saturate: [{
                    saturate: [y]
                }],
                sepia: [{
                    sepia: [E]
                }],
                "backdrop-filter": [{
                    "backdrop-filter": ["", "none"]
                }],
                "backdrop-blur": [{
                    "backdrop-blur": [n]
                }],
                "backdrop-brightness": [{
                    "backdrop-brightness": [r]
                }],
                "backdrop-contrast": [{
                    "backdrop-contrast": [l]
                }],
                "backdrop-grayscale": [{
                    "backdrop-grayscale": [u]
                }],
                "backdrop-hue-rotate": [{
                    "backdrop-hue-rotate": [c]
                }],
                "backdrop-invert": [{
                    "backdrop-invert": [d]
                }],
                "backdrop-opacity": [{
                    "backdrop-opacity": [m]
                }],
                "backdrop-saturate": [{
                    "backdrop-saturate": [y]
                }],
                "backdrop-sepia": [{
                    "backdrop-sepia": [E]
                }],
                "border-collapse": [{
                    border: ["collapse", "separate"]
                }],
                "border-spacing": [{
                    "border-spacing": [s]
                }],
                "border-spacing-x": [{
                    "border-spacing-x": [s]
                }],
                "border-spacing-y": [{
                    "border-spacing-y": [s]
                }],
                "table-layout": [{
                    table: ["auto", "fixed"]
                }],
                caption: [{
                    caption: ["top", "bottom"]
                }],
                transition: [{
                    transition: ["none", "all", "", "colors", "opacity", "shadow", "transform", Q]
                }],
                duration: [{
                    duration: B()
                }],
                ease: [{
                    ease: ["linear", "in", "out", "in-out", Q]
                }],
                delay: [{
                    delay: B()
                }],
                animate: [{
                    animate: ["none", "spin", "ping", "pulse", "bounce", Q]
                }],
                transform: [{
                    transform: ["", "gpu", "none"]
                }],
                scale: [{
                    scale: [S]
                }],
                "scale-x": [{
                    "scale-x": [S]
                }],
                "scale-y": [{
                    "scale-y": [S]
                }],
                rotate: [{
                    rotate: [ii, Q]
                }],
                "translate-x": [{
                    "translate-x": [b]
                }],
                "translate-y": [{
                    "translate-y": [b]
                }],
                "skew-x": [{
                    "skew-x": [C]
                }],
                "skew-y": [{
                    "skew-y": [C]
                }],
                "transform-origin": [{
                    origin: ["center", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left", Q]
                }],
                accent: [{
                    accent: ["auto", e]
                }],
                appearance: [{
                    appearance: ["none", "auto"]
                }],
                cursor: [{
                    cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", Q]
                }],
                "caret-color": [{
                    caret: [e]
                }],
                "pointer-events": [{
                    "pointer-events": ["none", "auto"]
                }],
                resize: [{
                    resize: ["none", "y", "x", ""]
                }],
                "scroll-behavior": [{
                    scroll: ["auto", "smooth"]
                }],
                "scroll-m": [{
                    "scroll-m": I()
                }],
                "scroll-mx": [{
                    "scroll-mx": I()
                }],
                "scroll-my": [{
                    "scroll-my": I()
                }],
                "scroll-ms": [{
                    "scroll-ms": I()
                }],
                "scroll-me": [{
                    "scroll-me": I()
                }],
                "scroll-mt": [{
                    "scroll-mt": I()
                }],
                "scroll-mr": [{
                    "scroll-mr": I()
                }],
                "scroll-mb": [{
                    "scroll-mb": I()
                }],
                "scroll-ml": [{
                    "scroll-ml": I()
                }],
                "scroll-p": [{
                    "scroll-p": I()
                }],
                "scroll-px": [{
                    "scroll-px": I()
                }],
                "scroll-py": [{
                    "scroll-py": I()
                }],
                "scroll-ps": [{
                    "scroll-ps": I()
                }],
                "scroll-pe": [{
                    "scroll-pe": I()
                }],
                "scroll-pt": [{
                    "scroll-pt": I()
                }],
                "scroll-pr": [{
                    "scroll-pr": I()
                }],
                "scroll-pb": [{
                    "scroll-pb": I()
                }],
                "scroll-pl": [{
                    "scroll-pl": I()
                }],
                "snap-align": [{
                    snap: ["start", "end", "center", "align-none"]
                }],
                "snap-stop": [{
                    snap: ["normal", "always"]
                }],
                "snap-type": [{
                    snap: ["none", "x", "y", "both"]
                }],
                "snap-strictness": [{
                    snap: ["mandatory", "proximity"]
                }],
                touch: [{
                    touch: ["auto", "none", "manipulation"]
                }],
                "touch-x": [{
                    "touch-pan": ["x", "left", "right"]
                }],
                "touch-y": [{
                    "touch-pan": ["y", "up", "down"]
                }],
                "touch-pz": ["touch-pinch-zoom"],
                select: [{
                    select: ["none", "text", "all", "auto"]
                }],
                "will-change": [{
                    "will-change": ["auto", "scroll", "contents", "transform", Q]
                }],
                fill: [{
                    fill: [e, "none"]
                }],
                "stroke-w": [{
                    stroke: [nn, bn, hu]
                }],
                stroke: [{
                    stroke: [e, "none"]
                }],
                sr: ["sr-only", "not-sr-only"],
                "forced-color-adjust": [{
                    "forced-color-adjust": ["auto", "none"]
                }]
            },
            conflictingClassGroups: {
                overflow: ["overflow-x", "overflow-y"],
                overscroll: ["overscroll-x", "overscroll-y"],
                inset: ["inset-x", "inset-y", "start", "end", "top", "right", "bottom", "left"],
                "inset-x": ["right", "left"],
                "inset-y": ["top", "bottom"],
                flex: ["basis", "grow", "shrink"],
                gap: ["gap-x", "gap-y"],
                p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
                px: ["pr", "pl"],
                py: ["pt", "pb"],
                m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
                mx: ["mr", "ml"],
                my: ["mt", "mb"],
                size: ["w", "h"],
                "font-size": ["leading"],
                "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
                "fvn-ordinal": ["fvn-normal"],
                "fvn-slashed-zero": ["fvn-normal"],
                "fvn-figure": ["fvn-normal"],
                "fvn-spacing": ["fvn-normal"],
                "fvn-fraction": ["fvn-normal"],
                "line-clamp": ["display", "overflow"],
                rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
                "rounded-s": ["rounded-ss", "rounded-es"],
                "rounded-e": ["rounded-se", "rounded-ee"],
                "rounded-t": ["rounded-tl", "rounded-tr"],
                "rounded-r": ["rounded-tr", "rounded-br"],
                "rounded-b": ["rounded-br", "rounded-bl"],
                "rounded-l": ["rounded-tl", "rounded-bl"],
                "border-spacing": ["border-spacing-x", "border-spacing-y"],
                "border-w": ["border-w-s", "border-w-e", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
                "border-w-x": ["border-w-r", "border-w-l"],
                "border-w-y": ["border-w-t", "border-w-b"],
                "border-color": ["border-color-s", "border-color-e", "border-color-t", "border-color-r", "border-color-b", "border-color-l"],
                "border-color-x": ["border-color-r", "border-color-l"],
                "border-color-y": ["border-color-t", "border-color-b"],
                "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
                "scroll-mx": ["scroll-mr", "scroll-ml"],
                "scroll-my": ["scroll-mt", "scroll-mb"],
                "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
                "scroll-px": ["scroll-pr", "scroll-pl"],
                "scroll-py": ["scroll-pt", "scroll-pb"],
                touch: ["touch-x", "touch-y", "touch-pz"],
                "touch-x": ["touch"],
                "touch-y": ["touch"],
                "touch-pz": ["touch"]
            },
            conflictingClassGroupModifiers: {
                "font-size": ["leading"]
            }
        }
    },
    kT = lT(bT);

function zr(...e) {
    return kT(y0(e))
}
const RT = BC,
    T0 = x.forwardRef(({
        className: e,
        ...t
    }, n) => P.jsx(c0, {
        ref: n,
        className: zr("fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]", e),
        ...t
    }));
T0.displayName = c0.displayName;
const AT = UC("group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full", {
        variants: {
            variant: {
                default: "border bg-background text-foreground",
                destructive: "destructive group border-destructive bg-destructive text-destructive-foreground"
            }
        },
        defaultVariants: {
            variant: "default"
        }
    }),
    P0 = x.forwardRef(({
        className: e,
        variant: t,
        ...n
    }, r) => P.jsx(d0, {
        ref: r,
        className: zr(AT({
            variant: t
        }), e),
        ...n
    }));
P0.displayName = d0.displayName;
const MT = x.forwardRef(({
    className: e,
    ...t
}, n) => P.jsx(p0, {
    ref: n,
    className: zr("inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors group-[.destructive]:border-muted/40 hover:bg-secondary group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 group-[.destructive]:focus:ring-destructive disabled:pointer-events-none disabled:opacity-50", e),
    ...t
}));
MT.displayName = p0.displayName;
const b0 = x.forwardRef(({
    className: e,
    ...t
}, n) => P.jsx(m0, {
    ref: n,
    className: zr("absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity group-hover:opacity-100 group-[.destructive]:text-red-300 hover:text-foreground group-[.destructive]:hover:text-red-50 focus:opacity-100 focus:outline-none focus:ring-2 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600", e),
    "toast-close": "",
    ...t,
    children: P.jsx(YC, {
        className: "h-4 w-4"
    })
}));
b0.displayName = m0.displayName;
const k0 = x.forwardRef(({
    className: e,
    ...t
}, n) => P.jsx(f0, {
    ref: n,
    className: zr("text-sm font-semibold", e),
    ...t
}));
k0.displayName = f0.displayName;
const R0 = x.forwardRef(({
    className: e,
    ...t
}, n) => P.jsx(h0, {
    ref: n,
    className: zr("text-sm opacity-90", e),
    ...t
}));
R0.displayName = h0.displayName;

function DT() {
    const {
        toasts: e
    } = XE();
    return P.jsxs(RT, {
        children: [e.map(function({
            id: t,
            title: n,
            description: r,
            action: o,
            ...i
        }) {
            return P.jsxs(P0, {
                ...i,
                children: [P.jsxs("div", {
                    className: "grid gap-1",
                    children: [n && P.jsx(k0, {
                        children: n
                    }), r && P.jsx(R0, {
                        children: r
                    })]
                }), o, P.jsx(b0, {})]
            }, t)
        }), P.jsx(T0, {})]
    })
}
var kp = ["light", "dark"],
    LT = "(prefers-color-scheme: dark)",
    NT = x.createContext(void 0),
    OT = {
        setTheme: e => {},
        themes: []
    },
    IT = () => {
        var e;
        return (e = x.useContext(NT)) != null ? e : OT
    };
x.memo(({
    forcedTheme: e,
    storageKey: t,
    attribute: n,
    enableSystem: r,
    enableColorScheme: o,
    defaultTheme: i,
    value: s,
    attrs: a,
    nonce: l
}) => {
    let u = i === "system",
        c = n === "class" ? `var d=document.documentElement,c=d.classList;${`c.remove(${a.map(v=>`'${v}'`).join(",")})`};` : `var d=document.documentElement,n='${n}',s='setAttribute';`,
        d = o ? kp.includes(i) && i ? `if(e==='light'||e==='dark'||!e)d.style.colorScheme=e||'${i}'` : "if(e==='light'||e==='dark')d.style.colorScheme=e" : "",
        h = (v, g = !1, w = !0) => {
            let m = s ? s[v] : v,
                p = g ? v + "|| ''" : `'${m}'`,
                y = "";
            return o && w && !g && kp.includes(v) && (y += `d.style.colorScheme = '${v}';`), n === "class" ? g || m ? y += `c.add(${p})` : y += "null" : m && (y += `d[s](n,${p})`), y
        },
        f = e ? `!function(){${c}${h(e)}}()` : r ? `!function(){try{${c}var e=localStorage.getItem('${t}');if('system'===e||(!e&&${u})){var t='${LT}',m=window.matchMedia(t);if(m.media!==t||m.matches){${h("dark")}}else{${h("light")}}}else if(e){${s?`var x=${JSON.stringify(s)};`:""}${h(s?"x[e]":"e",!0)}}${u?"":"else{"+h(i,!1,!1)+"}"}${d}}catch(e){}}()` : `!function(){try{${c}var e=localStorage.getItem('${t}');if(e){${s?`var x=${JSON.stringify(s)};`:""}${h(s?"x[e]":"e",!0)}}else{${h(i,!1,!1)};}${d}}catch(t){}}();`;
    return x.createElement("script", {
        nonce: l,
        dangerouslySetInnerHTML: {
            __html: f
        }
    })
});
var _T = e => {
        switch (e) {
            case "success":
                return FT;
            case "info":
                return $T;
            case "warning":
                return zT;
            case "error":
                return BT;
            default:
                return null
        }
    },
    VT = Array(12).fill(0),
    jT = ({
        visible: e,
        className: t
    }) => N.createElement("div", {
        className: ["sonner-loading-wrapper", t].filter(Boolean).join(" "),
        "data-visible": e
    }, N.createElement("div", {
        className: "sonner-spinner"
    }, VT.map((n, r) => N.createElement("div", {
        className: "sonner-loading-bar",
        key: `spinner-bar-${r}`
    })))),
    FT = N.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 20 20",
        fill: "currentColor",
        height: "20",
        width: "20"
    }, N.createElement("path", {
        fillRule: "evenodd",
        d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
        clipRule: "evenodd"
    })),
    zT = N.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 24 24",
        fill: "currentColor",
        height: "20",
        width: "20"
    }, N.createElement("path", {
        fillRule: "evenodd",
        d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z",
        clipRule: "evenodd"
    })),
    $T = N.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 20 20",
        fill: "currentColor",
        height: "20",
        width: "20"
    }, N.createElement("path", {
        fillRule: "evenodd",
        d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z",
        clipRule: "evenodd"
    })),
    BT = N.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 20 20",
        fill: "currentColor",
        height: "20",
        width: "20"
    }, N.createElement("path", {
        fillRule: "evenodd",
        d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z",
        clipRule: "evenodd"
    })),
    UT = N.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "12",
        height: "12",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "1.5",
        strokeLinecap: "round",
        strokeLinejoin: "round"
    }, N.createElement("line", {
        x1: "18",
        y1: "6",
        x2: "6",
        y2: "18"
    }), N.createElement("line", {
        x1: "6",
        y1: "6",
        x2: "18",
        y2: "18"
    })),
    WT = () => {
        let [e, t] = N.useState(document.hidden);
        return N.useEffect(() => {
            let n = () => {
                t(document.hidden)
            };
            return document.addEventListener("visibilitychange", n), () => window.removeEventListener("visibilitychange", n)
        }, []), e
    },
    Dc = 1,
    HT = class {
        constructor() {
            this.subscribe = e => (this.subscribers.push(e), () => {
                let t = this.subscribers.indexOf(e);
                this.subscribers.splice(t, 1)
            }), this.publish = e => {
                this.subscribers.forEach(t => t(e))
            }, this.addToast = e => {
                this.publish(e), this.toasts = [...this.toasts, e]
            }, this.create = e => {
                var t;
                let {
                    message: n,
                    ...r
                } = e, o = typeof(e == null ? void 0 : e.id) == "number" || ((t = e.id) == null ? void 0 : t.length) > 0 ? e.id : Dc++, i = this.toasts.find(a => a.id === o), s = e.dismissible === void 0 ? !0 : e.dismissible;
                return this.dismissedToasts.has(o) && this.dismissedToasts.delete(o), i ? this.toasts = this.toasts.map(a => a.id === o ? (this.publish({
                    ...a,
                    ...e,
                    id: o,
                    title: n
                }), {
                    ...a,
                    ...e,
                    id: o,
                    dismissible: s,
                    title: n
                }) : a) : this.addToast({
                    title: n,
                    ...r,
                    dismissible: s,
                    id: o
                }), o
            }, this.dismiss = e => (this.dismissedToasts.add(e), e || this.toasts.forEach(t => {
                this.subscribers.forEach(n => n({
                    id: t.id,
                    dismiss: !0
                }))
            }), this.subscribers.forEach(t => t({
                id: e,
                dismiss: !0
            })), e), this.message = (e, t) => this.create({
                ...t,
                message: e
            }), this.error = (e, t) => this.create({
                ...t,
                message: e,
                type: "error"
            }), this.success = (e, t) => this.create({
                ...t,
                type: "success",
                message: e
            }), this.info = (e, t) => this.create({
                ...t,
                type: "info",
                message: e
            }), this.warning = (e, t) => this.create({
                ...t,
                type: "warning",
                message: e
            }), this.loading = (e, t) => this.create({
                ...t,
                type: "loading",
                message: e
            }), this.promise = (e, t) => {
                if (!t) return;
                let n;
                t.loading !== void 0 && (n = this.create({
                    ...t,
                    promise: e,
                    type: "loading",
                    message: t.loading,
                    description: typeof t.description != "function" ? t.description : void 0
                }));
                let r = e instanceof Promise ? e : e(),
                    o = n !== void 0,
                    i, s = r.then(async l => {
                        if (i = ["resolve", l], N.isValidElement(l)) o = !1, this.create({
                            id: n,
                            type: "default",
                            message: l
                        });
                        else if (GT(l) && !l.ok) {
                            o = !1;
                            let u = typeof t.error == "function" ? await t.error(`HTTP error! status: ${l.status}`) : t.error,
                                c = typeof t.description == "function" ? await t.description(`HTTP error! status: ${l.status}`) : t.description;
                            this.create({
                                id: n,
                                type: "error",
                                message: u,
                                description: c
                            })
                        } else if (t.success !== void 0) {
                            o = !1;
                            let u = typeof t.success == "function" ? await t.success(l) : t.success,
                                c = typeof t.description == "function" ? await t.description(l) : t.description;
                            this.create({
                                id: n,
                                type: "success",
                                message: u,
                                description: c
                            })
                        }
                    }).catch(async l => {
                        if (i = ["reject", l], t.error !== void 0) {
                            o = !1;
                            let u = typeof t.error == "function" ? await t.error(l) : t.error,
                                c = typeof t.description == "function" ? await t.description(l) : t.description;
                            this.create({
                                id: n,
                                type: "error",
                                message: u,
                                description: c
                            })
                        }
                    }).finally(() => {
                        var l;
                        o && (this.dismiss(n), n = void 0), (l = t.finally) == null || l.call(t)
                    }),
                    a = () => new Promise((l, u) => s.then(() => i[0] === "reject" ? u(i[1]) : l(i[1])).catch(u));
                return typeof n != "string" && typeof n != "number" ? {
                    unwrap: a
                } : Object.assign(n, {
                    unwrap: a
                })
            }, this.custom = (e, t) => {
                let n = (t == null ? void 0 : t.id) || Dc++;
                return this.create({
                    jsx: e(n),
                    id: n,
                    ...t
                }), n
            }, this.getActiveToasts = () => this.toasts.filter(e => !this.dismissedToasts.has(e.id)), this.subscribers = [], this.toasts = [], this.dismissedToasts = new Set
        }
    },
    Ge = new HT,
    KT = (e, t) => {
        let n = (t == null ? void 0 : t.id) || Dc++;
        return Ge.addToast({
            title: e,
            ...t,
            id: n
        }), n
    },
    GT = e => e && typeof e == "object" && "ok" in e && typeof e.ok == "boolean" && "status" in e && typeof e.status == "number",
    QT = KT,
    YT = () => Ge.toasts,
    XT = () => Ge.getActiveToasts();
Object.assign(QT, {
    success: Ge.success,
    info: Ge.info,
    warning: Ge.warning,
    error: Ge.error,
    custom: Ge.custom,
    message: Ge.message,
    promise: Ge.promise,
    dismiss: Ge.dismiss,
    loading: Ge.loading
}, {
    getHistory: YT,
    getToasts: XT
});

function qT(e, {
    insertAt: t
} = {}) {
    if (typeof document > "u") return;
    let n = document.head || document.getElementsByTagName("head")[0],
        r = document.createElement("style");
    r.type = "text/css", t === "top" && n.firstChild ? n.insertBefore(r, n.firstChild) : n.appendChild(r), r.styleSheet ? r.styleSheet.cssText = e : r.appendChild(document.createTextNode(e))
}
qT(`:where(html[dir="ltr"]),:where([data-sonner-toaster][dir="ltr"]){--toast-icon-margin-start: -3px;--toast-icon-margin-end: 4px;--toast-svg-margin-start: -1px;--toast-svg-margin-end: 0px;--toast-button-margin-start: auto;--toast-button-margin-end: 0;--toast-close-button-start: 0;--toast-close-button-end: unset;--toast-close-button-transform: translate(-35%, -35%)}:where(html[dir="rtl"]),:where([data-sonner-toaster][dir="rtl"]){--toast-icon-margin-start: 4px;--toast-icon-margin-end: -3px;--toast-svg-margin-start: 0px;--toast-svg-margin-end: -1px;--toast-button-margin-start: 0;--toast-button-margin-end: auto;--toast-close-button-start: unset;--toast-close-button-end: 0;--toast-close-button-transform: translate(35%, -35%)}:where([data-sonner-toaster]){position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1: hsl(0, 0%, 99%);--gray2: hsl(0, 0%, 97.3%);--gray3: hsl(0, 0%, 95.1%);--gray4: hsl(0, 0%, 93%);--gray5: hsl(0, 0%, 90.9%);--gray6: hsl(0, 0%, 88.7%);--gray7: hsl(0, 0%, 85.8%);--gray8: hsl(0, 0%, 78%);--gray9: hsl(0, 0%, 56.1%);--gray10: hsl(0, 0%, 52.3%);--gray11: hsl(0, 0%, 43.5%);--gray12: hsl(0, 0%, 9%);--border-radius: 8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:none;z-index:999999999;transition:transform .4s ease}:where([data-sonner-toaster][data-lifted="true"]){transform:translateY(-10px)}@media (hover: none) and (pointer: coarse){:where([data-sonner-toaster][data-lifted="true"]){transform:none}}:where([data-sonner-toaster][data-x-position="right"]){right:var(--offset-right)}:where([data-sonner-toaster][data-x-position="left"]){left:var(--offset-left)}:where([data-sonner-toaster][data-x-position="center"]){left:50%;transform:translate(-50%)}:where([data-sonner-toaster][data-y-position="top"]){top:var(--offset-top)}:where([data-sonner-toaster][data-y-position="bottom"]){bottom:var(--offset-bottom)}:where([data-sonner-toast]){--y: translateY(100%);--lift-amount: calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);filter:blur(0);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:none;overflow-wrap:anywhere}:where([data-sonner-toast][data-styled="true"]){padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px #0000001a;width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}:where([data-sonner-toast]:focus-visible){box-shadow:0 4px 12px #0000001a,0 0 0 2px #0003}:where([data-sonner-toast][data-y-position="top"]){top:0;--y: translateY(-100%);--lift: 1;--lift-amount: calc(1 * var(--gap))}:where([data-sonner-toast][data-y-position="bottom"]){bottom:0;--y: translateY(100%);--lift: -1;--lift-amount: calc(var(--lift) * var(--gap))}:where([data-sonner-toast]) :where([data-description]){font-weight:400;line-height:1.4;color:inherit}:where([data-sonner-toast]) :where([data-title]){font-weight:500;line-height:1.5;color:inherit}:where([data-sonner-toast]) :where([data-icon]){display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}:where([data-sonner-toast][data-promise="true"]) :where([data-icon])>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}:where([data-sonner-toast]) :where([data-icon])>*{flex-shrink:0}:where([data-sonner-toast]) :where([data-icon]) svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}:where([data-sonner-toast]) :where([data-content]){display:flex;flex-direction:column;gap:2px}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;cursor:pointer;outline:none;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}:where([data-sonner-toast]) :where([data-button]):focus-visible{box-shadow:0 0 0 2px #0006}:where([data-sonner-toast]) :where([data-button]):first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}:where([data-sonner-toast]) :where([data-cancel]){color:var(--normal-text);background:rgba(0,0,0,.08)}:where([data-sonner-toast][data-theme="dark"]) :where([data-cancel]){background:rgba(255,255,255,.3)}:where([data-sonner-toast]) :where([data-close-button]){position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;color:var(--gray12);border:1px solid var(--gray4);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}[data-sonner-toast] [data-close-button]{background:var(--gray1)}:where([data-sonner-toast]) :where([data-close-button]):focus-visible{box-shadow:0 4px 12px #0000001a,0 0 0 2px #0003}:where([data-sonner-toast]) :where([data-disabled="true"]){cursor:not-allowed}:where([data-sonner-toast]):hover :where([data-close-button]):hover{background:var(--gray2);border-color:var(--gray5)}:where([data-sonner-toast][data-swiping="true"]):before{content:"";position:absolute;left:-50%;right:-50%;height:100%;z-index:-1}:where([data-sonner-toast][data-y-position="top"][data-swiping="true"]):before{bottom:50%;transform:scaleY(3) translateY(50%)}:where([data-sonner-toast][data-y-position="bottom"][data-swiping="true"]):before{top:50%;transform:scaleY(3) translateY(-50%)}:where([data-sonner-toast][data-swiping="false"][data-removed="true"]):before{content:"";position:absolute;inset:0;transform:scaleY(2)}:where([data-sonner-toast]):after{content:"";position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}:where([data-sonner-toast][data-mounted="true"]){--y: translateY(0);opacity:1}:where([data-sonner-toast][data-expanded="false"][data-front="false"]){--scale: var(--toasts-before) * .05 + 1;--y: translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}:where([data-sonner-toast])>*{transition:opacity .4s}:where([data-sonner-toast][data-expanded="false"][data-front="false"][data-styled="true"])>*{opacity:0}:where([data-sonner-toast][data-visible="false"]){opacity:0;pointer-events:none}:where([data-sonner-toast][data-mounted="true"][data-expanded="true"]){--y: translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}:where([data-sonner-toast][data-removed="true"][data-front="true"][data-swipe-out="false"]){--y: translateY(calc(var(--lift) * -100%));opacity:0}:where([data-sonner-toast][data-removed="true"][data-front="false"][data-swipe-out="false"][data-expanded="true"]){--y: translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}:where([data-sonner-toast][data-removed="true"][data-front="false"][data-swipe-out="false"][data-expanded="false"]){--y: translateY(40%);opacity:0;transition:transform .5s,opacity .2s}:where([data-sonner-toast][data-removed="true"][data-front="false"]):before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount-y, 0px)) translate(var(--swipe-amount-x, 0px));transition:none}[data-sonner-toast][data-swiped=true]{user-select:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation-duration:.2s;animation-timing-function:ease-out;animation-fill-mode:forwards}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=left]{animation-name:swipe-out-left}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=right]{animation-name:swipe-out-right}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=up]{animation-name:swipe-out-up}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=down]{animation-name:swipe-out-down}@keyframes swipe-out-left{0%{transform:var(--y) translate(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translate(calc(var(--swipe-amount-x) - 100%));opacity:0}}@keyframes swipe-out-right{0%{transform:var(--y) translate(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translate(calc(var(--swipe-amount-x) + 100%));opacity:0}}@keyframes swipe-out-up{0%{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) - 100%));opacity:0}}@keyframes swipe-out-down{0%{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) + 100%));opacity:0}}@media (max-width: 600px){[data-sonner-toaster]{position:fixed;right:var(--mobile-offset-right);left:var(--mobile-offset-left);width:100%}[data-sonner-toaster][dir=rtl]{left:calc(var(--mobile-offset-left) * -1)}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset-left) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset-left)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--mobile-offset-bottom)}[data-sonner-toaster][data-y-position=top]{top:var(--mobile-offset-top)}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset-left);right:var(--mobile-offset-right);transform:none}}[data-sonner-toaster][data-theme=light]{--normal-bg: #fff;--normal-border: var(--gray4);--normal-text: var(--gray12);--success-bg: hsl(143, 85%, 96%);--success-border: hsl(145, 92%, 91%);--success-text: hsl(140, 100%, 27%);--info-bg: hsl(208, 100%, 97%);--info-border: hsl(221, 91%, 91%);--info-text: hsl(210, 92%, 45%);--warning-bg: hsl(49, 100%, 97%);--warning-border: hsl(49, 91%, 91%);--warning-text: hsl(31, 92%, 45%);--error-bg: hsl(359, 100%, 97%);--error-border: hsl(359, 100%, 94%);--error-text: hsl(360, 100%, 45%)}[data-sonner-toaster][data-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg: #000;--normal-border: hsl(0, 0%, 20%);--normal-text: var(--gray1)}[data-sonner-toaster][data-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg: #fff;--normal-border: var(--gray3);--normal-text: var(--gray12)}[data-sonner-toaster][data-theme=dark]{--normal-bg: #000;--normal-bg-hover: hsl(0, 0%, 12%);--normal-border: hsl(0, 0%, 20%);--normal-border-hover: hsl(0, 0%, 25%);--normal-text: var(--gray1);--success-bg: hsl(150, 100%, 6%);--success-border: hsl(147, 100%, 12%);--success-text: hsl(150, 86%, 65%);--info-bg: hsl(215, 100%, 6%);--info-border: hsl(223, 100%, 12%);--info-text: hsl(216, 87%, 65%);--warning-bg: hsl(64, 100%, 6%);--warning-border: hsl(60, 100%, 12%);--warning-text: hsl(46, 87%, 65%);--error-bg: hsl(358, 76%, 10%);--error-border: hsl(357, 89%, 16%);--error-text: hsl(358, 100%, 81%)}[data-sonner-toaster][data-theme=dark] [data-sonner-toast] [data-close-button]{background:var(--normal-bg);border-color:var(--normal-border);color:var(--normal-text)}[data-sonner-toaster][data-theme=dark] [data-sonner-toast] [data-close-button]:hover{background:var(--normal-bg-hover);border-color:var(--normal-border-hover)}[data-rich-colors=true][data-sonner-toast][data-type=success],[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info],[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning],[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error],[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size: 16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:nth-child(1){animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}to{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}to{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}to{opacity:.15}}@media (prefers-reduced-motion){[data-sonner-toast],[data-sonner-toast]>*,.sonner-loading-bar{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}
`);

function Is(e) {
    return e.label !== void 0
}
var ZT = 3,
    JT = "32px",
    eP = "16px",
    Rp = 4e3,
    tP = 356,
    nP = 14,
    rP = 20,
    oP = 200;

function Tt(...e) {
    return e.filter(Boolean).join(" ")
}

function iP(e) {
    let [t, n] = e.split("-"), r = [];
    return t && r.push(t), n && r.push(n), r
}
var sP = e => {
    var t, n, r, o, i, s, a, l, u, c, d;
    let {
        invert: h,
        toast: f,
        unstyled: v,
        interacting: g,
        setHeights: w,
        visibleToasts: m,
        heights: p,
        index: y,
        toasts: S,
        expanded: E,
        removeToast: C,
        defaultRichColors: T,
        closeButton: b,
        style: D,
        cancelButtonStyle: R,
        actionButtonStyle: V,
        className: I = "",
        descriptionClassName: U = "",
        duration: O,
        position: W,
        gap: z,
        loadingIcon: H,
        expandByDefault: k,
        classNames: A,
        icons: _,
        closeButtonAriaLabel: B = "Close toast",
        pauseWhenPageIsHidden: $
    } = e, [Y, q] = N.useState(null), [ve, Le] = N.useState(null), [ee, $r] = N.useState(!1), [wn, cr] = N.useState(!1), [xn, Br] = N.useState(!1), [Sn, fs] = N.useState(!1), [Nl, hs] = N.useState(!1), [Ol, Yo] = N.useState(0), [Ur, nh] = N.useState(0), Xo = N.useRef(f.duration || O || Rp), rh = N.useRef(null), dr = N.useRef(null), cx = y === 0, dx = y + 1 <= m, ct = f.type, Wr = f.dismissible !== !1, fx = f.className || "", hx = f.descriptionClassName || "", ps = N.useMemo(() => p.findIndex(K => K.toastId === f.id) || 0, [p, f.id]), px = N.useMemo(() => {
        var K;
        return (K = f.closeButton) != null ? K : b
    }, [f.closeButton, b]), oh = N.useMemo(() => f.duration || O || Rp, [f.duration, O]), Il = N.useRef(0), Hr = N.useRef(0), ih = N.useRef(0), Kr = N.useRef(null), [mx, gx] = W.split("-"), sh = N.useMemo(() => p.reduce((K, ne, ue) => ue >= ps ? K : K + ne.height, 0), [p, ps]), ah = WT(), yx = f.invert || h, _l = ct === "loading";
    Hr.current = N.useMemo(() => ps * z + sh, [ps, sh]), N.useEffect(() => {
        Xo.current = oh
    }, [oh]), N.useEffect(() => {
        $r(!0)
    }, []), N.useEffect(() => {
        let K = dr.current;
        if (K) {
            let ne = K.getBoundingClientRect().height;
            return nh(ne), w(ue => [{
                toastId: f.id,
                height: ne,
                position: f.position
            }, ...ue]), () => w(ue => ue.filter(xt => xt.toastId !== f.id))
        }
    }, [w, f.id]), N.useLayoutEffect(() => {
        if (!ee) return;
        let K = dr.current,
            ne = K.style.height;
        K.style.height = "auto";
        let ue = K.getBoundingClientRect().height;
        K.style.height = ne, nh(ue), w(xt => xt.find(St => St.toastId === f.id) ? xt.map(St => St.toastId === f.id ? {
            ...St,
            height: ue
        } : St) : [{
            toastId: f.id,
            height: ue,
            position: f.position
        }, ...xt])
    }, [ee, f.title, f.description, w, f.id]);
    let En = N.useCallback(() => {
        cr(!0), Yo(Hr.current), w(K => K.filter(ne => ne.toastId !== f.id)), setTimeout(() => {
            C(f)
        }, oP)
    }, [f, C, w, Hr]);
    N.useEffect(() => {
        if (f.promise && ct === "loading" || f.duration === 1 / 0 || f.type === "loading") return;
        let K;
        return E || g || $ && ah ? (() => {
            if (ih.current < Il.current) {
                let ne = new Date().getTime() - Il.current;
                Xo.current = Xo.current - ne
            }
            ih.current = new Date().getTime()
        })() : Xo.current !== 1 / 0 && (Il.current = new Date().getTime(), K = setTimeout(() => {
            var ne;
            (ne = f.onAutoClose) == null || ne.call(f, f), En()
        }, Xo.current)), () => clearTimeout(K)
    }, [E, g, f, ct, $, ah, En]), N.useEffect(() => {
        f.delete && En()
    }, [En, f.delete]);

    function vx() {
        var K, ne, ue;
        return _ != null && _.loading ? N.createElement("div", {
            className: Tt(A == null ? void 0 : A.loader, (K = f == null ? void 0 : f.classNames) == null ? void 0 : K.loader, "sonner-loader"),
            "data-visible": ct === "loading"
        }, _.loading) : H ? N.createElement("div", {
            className: Tt(A == null ? void 0 : A.loader, (ne = f == null ? void 0 : f.classNames) == null ? void 0 : ne.loader, "sonner-loader"),
            "data-visible": ct === "loading"
        }, H) : N.createElement(jT, {
            className: Tt(A == null ? void 0 : A.loader, (ue = f == null ? void 0 : f.classNames) == null ? void 0 : ue.loader),
            visible: ct === "loading"
        })
    }
    return N.createElement("li", {
        tabIndex: 0,
        ref: dr,
        className: Tt(I, fx, A == null ? void 0 : A.toast, (t = f == null ? void 0 : f.classNames) == null ? void 0 : t.toast, A == null ? void 0 : A.default, A == null ? void 0 : A[ct], (n = f == null ? void 0 : f.classNames) == null ? void 0 : n[ct]),
        "data-sonner-toast": "",
        "data-rich-colors": (r = f.richColors) != null ? r : T,
        "data-styled": !(f.jsx || f.unstyled || v),
        "data-mounted": ee,
        "data-promise": !!f.promise,
        "data-swiped": Nl,
        "data-removed": wn,
        "data-visible": dx,
        "data-y-position": mx,
        "data-x-position": gx,
        "data-index": y,
        "data-front": cx,
        "data-swiping": xn,
        "data-dismissible": Wr,
        "data-type": ct,
        "data-invert": yx,
        "data-swipe-out": Sn,
        "data-swipe-direction": ve,
        "data-expanded": !!(E || k && ee),
        style: {
            "--index": y,
            "--toasts-before": y,
            "--z-index": S.length - y,
            "--offset": `${wn?Ol:Hr.current}px`,
            "--initial-height": k ? "auto" : `${Ur}px`,
            ...D,
            ...f.style
        },
        onDragEnd: () => {
            Br(!1), q(null), Kr.current = null
        },
        onPointerDown: K => {
            _l || !Wr || (rh.current = new Date, Yo(Hr.current), K.target.setPointerCapture(K.pointerId), K.target.tagName !== "BUTTON" && (Br(!0), Kr.current = {
                x: K.clientX,
                y: K.clientY
            }))
        },
        onPointerUp: () => {
            var K, ne, ue, xt;
            if (Sn || !Wr) return;
            Kr.current = null;
            let St = Number(((K = dr.current) == null ? void 0 : K.style.getPropertyValue("--swipe-amount-x").replace("px", "")) || 0),
                Cn = Number(((ne = dr.current) == null ? void 0 : ne.style.getPropertyValue("--swipe-amount-y").replace("px", "")) || 0),
                fr = new Date().getTime() - ((ue = rh.current) == null ? void 0 : ue.getTime()),
                Et = Y === "x" ? St : Cn,
                Tn = Math.abs(Et) / fr;
            if (Math.abs(Et) >= rP || Tn > .11) {
                Yo(Hr.current), (xt = f.onDismiss) == null || xt.call(f, f), Le(Y === "x" ? St > 0 ? "right" : "left" : Cn > 0 ? "down" : "up"), En(), fs(!0), hs(!1);
                return
            }
            Br(!1), q(null)
        },
        onPointerMove: K => {
            var ne, ue, xt, St;
            if (!Kr.current || !Wr || ((ne = window.getSelection()) == null ? void 0 : ne.toString().length) > 0) return;
            let Cn = K.clientY - Kr.current.y,
                fr = K.clientX - Kr.current.x,
                Et = (ue = e.swipeDirections) != null ? ue : iP(W);
            !Y && (Math.abs(fr) > 1 || Math.abs(Cn) > 1) && q(Math.abs(fr) > Math.abs(Cn) ? "x" : "y");
            let Tn = {
                x: 0,
                y: 0
            };
            Y === "y" ? (Et.includes("top") || Et.includes("bottom")) && (Et.includes("top") && Cn < 0 || Et.includes("bottom") && Cn > 0) && (Tn.y = Cn) : Y === "x" && (Et.includes("left") || Et.includes("right")) && (Et.includes("left") && fr < 0 || Et.includes("right") && fr > 0) && (Tn.x = fr), (Math.abs(Tn.x) > 0 || Math.abs(Tn.y) > 0) && hs(!0), (xt = dr.current) == null || xt.style.setProperty("--swipe-amount-x", `${Tn.x}px`), (St = dr.current) == null || St.style.setProperty("--swipe-amount-y", `${Tn.y}px`)
        }
    }, px && !f.jsx ? N.createElement("button", {
        "aria-label": B,
        "data-disabled": _l,
        "data-close-button": !0,
        onClick: _l || !Wr ? () => {} : () => {
            var K;
            En(), (K = f.onDismiss) == null || K.call(f, f)
        },
        className: Tt(A == null ? void 0 : A.closeButton, (o = f == null ? void 0 : f.classNames) == null ? void 0 : o.closeButton)
    }, (i = _ == null ? void 0 : _.close) != null ? i : UT) : null, f.jsx || x.isValidElement(f.title) ? f.jsx ? f.jsx : typeof f.title == "function" ? f.title() : f.title : N.createElement(N.Fragment, null, ct || f.icon || f.promise ? N.createElement("div", {
        "data-icon": "",
        className: Tt(A == null ? void 0 : A.icon, (s = f == null ? void 0 : f.classNames) == null ? void 0 : s.icon)
    }, f.promise || f.type === "loading" && !f.icon ? f.icon || vx() : null, f.type !== "loading" ? f.icon || (_ == null ? void 0 : _[ct]) || _T(ct) : null) : null, N.createElement("div", {
        "data-content": "",
        className: Tt(A == null ? void 0 : A.content, (a = f == null ? void 0 : f.classNames) == null ? void 0 : a.content)
    }, N.createElement("div", {
        "data-title": "",
        className: Tt(A == null ? void 0 : A.title, (l = f == null ? void 0 : f.classNames) == null ? void 0 : l.title)
    }, typeof f.title == "function" ? f.title() : f.title), f.description ? N.createElement("div", {
        "data-description": "",
        className: Tt(U, hx, A == null ? void 0 : A.description, (u = f == null ? void 0 : f.classNames) == null ? void 0 : u.description)
    }, typeof f.description == "function" ? f.description() : f.description) : null), x.isValidElement(f.cancel) ? f.cancel : f.cancel && Is(f.cancel) ? N.createElement("button", {
        "data-button": !0,
        "data-cancel": !0,
        style: f.cancelButtonStyle || R,
        onClick: K => {
            var ne, ue;
            Is(f.cancel) && Wr && ((ue = (ne = f.cancel).onClick) == null || ue.call(ne, K), En())
        },
        className: Tt(A == null ? void 0 : A.cancelButton, (c = f == null ? void 0 : f.classNames) == null ? void 0 : c.cancelButton)
    }, f.cancel.label) : null, x.isValidElement(f.action) ? f.action : f.action && Is(f.action) ? N.createElement("button", {
        "data-button": !0,
        "data-action": !0,
        style: f.actionButtonStyle || V,
        onClick: K => {
            var ne, ue;
            Is(f.action) && ((ue = (ne = f.action).onClick) == null || ue.call(ne, K), !K.defaultPrevented && En())
        },
        className: Tt(A == null ? void 0 : A.actionButton, (d = f == null ? void 0 : f.classNames) == null ? void 0 : d.actionButton)
    }, f.action.label) : null))
};

function Ap() {
    if (typeof window > "u" || typeof document > "u") return "ltr";
    let e = document.documentElement.getAttribute("dir");
    return e === "auto" || !e ? window.getComputedStyle(document.documentElement).direction : e
}

function aP(e, t) {
    let n = {};
    return [e, t].forEach((r, o) => {
        let i = o === 1,
            s = i ? "--mobile-offset" : "--offset",
            a = i ? eP : JT;

        function l(u) {
            ["top", "right", "bottom", "left"].forEach(c => {
                n[`${s}-${c}`] = typeof u == "number" ? `${u}px` : u
            })
        }
        typeof r == "number" || typeof r == "string" ? l(r) : typeof r == "object" ? ["top", "right", "bottom", "left"].forEach(u => {
            r[u] === void 0 ? n[`${s}-${u}`] = a : n[`${s}-${u}`] = typeof r[u] == "number" ? `${r[u]}px` : r[u]
        }) : l(a)
    }), n
}
var lP = x.forwardRef(function(e, t) {
    let {
        invert: n,
        position: r = "bottom-right",
        hotkey: o = ["altKey", "KeyT"],
        expand: i,
        closeButton: s,
        className: a,
        offset: l,
        mobileOffset: u,
        theme: c = "light",
        richColors: d,
        duration: h,
        style: f,
        visibleToasts: v = ZT,
        toastOptions: g,
        dir: w = Ap(),
        gap: m = nP,
        loadingIcon: p,
        icons: y,
        containerAriaLabel: S = "Notifications",
        pauseWhenPageIsHidden: E
    } = e, [C, T] = N.useState([]), b = N.useMemo(() => Array.from(new Set([r].concat(C.filter($ => $.position).map($ => $.position)))), [C, r]), [D, R] = N.useState([]), [V, I] = N.useState(!1), [U, O] = N.useState(!1), [W, z] = N.useState(c !== "system" ? c : typeof window < "u" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"), H = N.useRef(null), k = o.join("+").replace(/Key/g, "").replace(/Digit/g, ""), A = N.useRef(null), _ = N.useRef(!1), B = N.useCallback($ => {
        T(Y => {
            var q;
            return (q = Y.find(ve => ve.id === $.id)) != null && q.delete || Ge.dismiss($.id), Y.filter(({
                id: ve
            }) => ve !== $.id)
        })
    }, []);
    return N.useEffect(() => Ge.subscribe($ => {
        if ($.dismiss) {
            T(Y => Y.map(q => q.id === $.id ? {
                ...q,
                delete: !0
            } : q));
            return
        }
        setTimeout(() => {
            Bv.flushSync(() => {
                T(Y => {
                    let q = Y.findIndex(ve => ve.id === $.id);
                    return q !== -1 ? [...Y.slice(0, q), {
                        ...Y[q],
                        ...$
                    }, ...Y.slice(q + 1)] : [$, ...Y]
                })
            })
        })
    }), []), N.useEffect(() => {
        if (c !== "system") {
            z(c);
            return
        }
        if (c === "system" && (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? z("dark") : z("light")), typeof window > "u") return;
        let $ = window.matchMedia("(prefers-color-scheme: dark)");
        try {
            $.addEventListener("change", ({
                matches: Y
            }) => {
                z(Y ? "dark" : "light")
            })
        } catch {
            $.addListener(({
                matches: q
            }) => {
                try {
                    z(q ? "dark" : "light")
                } catch (ve) {
                    console.error(ve)
                }
            })
        }
    }, [c]), N.useEffect(() => {
        C.length <= 1 && I(!1)
    }, [C]), N.useEffect(() => {
        let $ = Y => {
            var q, ve;
            o.every(Le => Y[Le] || Y.code === Le) && (I(!0), (q = H.current) == null || q.focus()), Y.code === "Escape" && (document.activeElement === H.current || (ve = H.current) != null && ve.contains(document.activeElement)) && I(!1)
        };
        return document.addEventListener("keydown", $), () => document.removeEventListener("keydown", $)
    }, [o]), N.useEffect(() => {
        if (H.current) return () => {
            A.current && (A.current.focus({
                preventScroll: !0
            }), A.current = null, _.current = !1)
        }
    }, [H.current]), N.createElement("section", {
        ref: t,
        "aria-label": `${S} ${k}`,
        tabIndex: -1,
        "aria-live": "polite",
        "aria-relevant": "additions text",
        "aria-atomic": "false",
        suppressHydrationWarning: !0
    }, b.map(($, Y) => {
        var q;
        let [ve, Le] = $.split("-");
        return C.length ? N.createElement("ol", {
            key: $,
            dir: w === "auto" ? Ap() : w,
            tabIndex: -1,
            ref: H,
            className: a,
            "data-sonner-toaster": !0,
            "data-theme": W,
            "data-y-position": ve,
            "data-lifted": V && C.length > 1 && !i,
            "data-x-position": Le,
            style: {
                "--front-toast-height": `${((q=D[0])==null?void 0:q.height)||0}px`,
                "--width": `${tP}px`,
                "--gap": `${m}px`,
                ...f,
                ...aP(l, u)
            },
            onBlur: ee => {
                _.current && !ee.currentTarget.contains(ee.relatedTarget) && (_.current = !1, A.current && (A.current.focus({
                    preventScroll: !0
                }), A.current = null))
            },
            onFocus: ee => {
                ee.target instanceof HTMLElement && ee.target.dataset.dismissible === "false" || _.current || (_.current = !0, A.current = ee.relatedTarget)
            },
            onMouseEnter: () => I(!0),
            onMouseMove: () => I(!0),
            onMouseLeave: () => {
                U || I(!1)
            },
            onDragEnd: () => I(!1),
            onPointerDown: ee => {
                ee.target instanceof HTMLElement && ee.target.dataset.dismissible === "false" || O(!0)
            },
            onPointerUp: () => O(!1)
        }, C.filter(ee => !ee.position && Y === 0 || ee.position === $).map((ee, $r) => {
            var wn, cr;
            return N.createElement(sP, {
                key: ee.id,
                icons: y,
                index: $r,
                toast: ee,
                defaultRichColors: d,
                duration: (wn = g == null ? void 0 : g.duration) != null ? wn : h,
                className: g == null ? void 0 : g.className,
                descriptionClassName: g == null ? void 0 : g.descriptionClassName,
                invert: n,
                visibleToasts: v,
                closeButton: (cr = g == null ? void 0 : g.closeButton) != null ? cr : s,
                interacting: U,
                position: $,
                style: g == null ? void 0 : g.style,
                unstyled: g == null ? void 0 : g.unstyled,
                classNames: g == null ? void 0 : g.classNames,
                cancelButtonStyle: g == null ? void 0 : g.cancelButtonStyle,
                actionButtonStyle: g == null ? void 0 : g.actionButtonStyle,
                removeToast: B,
                toasts: C.filter(xn => xn.position == ee.position),
                heights: D.filter(xn => xn.position == ee.position),
                setHeights: R,
                expandByDefault: i,
                gap: m,
                loadingIcon: p,
                expanded: V,
                pauseWhenPageIsHidden: E,
                swipeDirections: e.swipeDirections
            })
        })) : null
    }))
});
const uP = ({
        ...e
    }) => {
        const {
            theme: t = "system"
        } = IT();
        return P.jsx(lP, {
            theme: t,
            className: "toaster group",
            toastOptions: {
                classNames: {
                    toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
                    description: "group-[.toast]:text-muted-foreground",
                    actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
                    cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
                }
            },
            ...e
        })
    },
    cP = ["top", "right", "bottom", "left"],
    nr = Math.min,
    rt = Math.max,
    _a = Math.round,
    _s = Math.floor,
    qt = e => ({
        x: e,
        y: e
    }),
    dP = {
        left: "right",
        right: "left",
        bottom: "top",
        top: "bottom"
    },
    fP = {
        start: "end",
        end: "start"
    };

function Lc(e, t, n) {
    return rt(e, nr(t, n))
}

function gn(e, t) {
    return typeof e == "function" ? e(t) : e
}

function yn(e) {
    return e.split("-")[0]
}

function Wo(e) {
    return e.split("-")[1]
}

function gf(e) {
    return e === "x" ? "y" : "x"
}

function yf(e) {
    return e === "y" ? "height" : "width"
}
const hP = new Set(["top", "bottom"]);

function Qt(e) {
    return hP.has(yn(e)) ? "y" : "x"
}

function vf(e) {
    return gf(Qt(e))
}

function pP(e, t, n) {
    n === void 0 && (n = !1);
    const r = Wo(e),
        o = vf(e),
        i = yf(o);
    let s = o === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
    return t.reference[i] > t.floating[i] && (s = Va(s)), [s, Va(s)]
}

function mP(e) {
    const t = Va(e);
    return [Nc(e), t, Nc(t)]
}

function Nc(e) {
    return e.replace(/start|end/g, t => fP[t])
}
const Mp = ["left", "right"],
    Dp = ["right", "left"],
    gP = ["top", "bottom"],
    yP = ["bottom", "top"];

function vP(e, t, n) {
    switch (e) {
        case "top":
        case "bottom":
            return n ? t ? Dp : Mp : t ? Mp : Dp;
        case "left":
        case "right":
            return t ? gP : yP;
        default:
            return []
    }
}

function wP(e, t, n, r) {
    const o = Wo(e);
    let i = vP(yn(e), n === "start", r);
    return o && (i = i.map(s => s + "-" + o), t && (i = i.concat(i.map(Nc)))), i
}

function Va(e) {
    return e.replace(/left|right|bottom|top/g, t => dP[t])
}

function xP(e) {
    return {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        ...e
    }
}

function A0(e) {
    return typeof e != "number" ? xP(e) : {
        top: e,
        right: e,
        bottom: e,
        left: e
    }
}

function ja(e) {
    const {
        x: t,
        y: n,
        width: r,
        height: o
    } = e;
    return {
        width: r,
        height: o,
        top: n,
        left: t,
        right: t + r,
        bottom: n + o,
        x: t,
        y: n
    }
}

function Lp(e, t, n) {
    let {
        reference: r,
        floating: o
    } = e;
    const i = Qt(t),
        s = vf(t),
        a = yf(s),
        l = yn(t),
        u = i === "y",
        c = r.x + r.width / 2 - o.width / 2,
        d = r.y + r.height / 2 - o.height / 2,
        h = r[a] / 2 - o[a] / 2;
    let f;
    switch (l) {
        case "top":
            f = {
                x: c,
                y: r.y - o.height
            };
            break;
        case "bottom":
            f = {
                x: c,
                y: r.y + r.height
            };
            break;
        case "right":
            f = {
                x: r.x + r.width,
                y: d
            };
            break;
        case "left":
            f = {
                x: r.x - o.width,
                y: d
            };
            break;
        default:
            f = {
                x: r.x,
                y: r.y
            }
    }
    switch (Wo(t)) {
        case "start":
            f[s] -= h * (n && u ? -1 : 1);
            break;
        case "end":
            f[s] += h * (n && u ? -1 : 1);
            break
    }
    return f
}
const SP = async (e, t, n) => {
    const {
        placement: r = "bottom",
        strategy: o = "absolute",
        middleware: i = [],
        platform: s
    } = n, a = i.filter(Boolean), l = await (s.isRTL == null ? void 0 : s.isRTL(t));
    let u = await s.getElementRects({
            reference: e,
            floating: t,
            strategy: o
        }),
        {
            x: c,
            y: d
        } = Lp(u, r, l),
        h = r,
        f = {},
        v = 0;
    for (let g = 0; g < a.length; g++) {
        const {
            name: w,
            fn: m
        } = a[g], {
            x: p,
            y,
            data: S,
            reset: E
        } = await m({
            x: c,
            y: d,
            initialPlacement: r,
            placement: h,
            strategy: o,
            middlewareData: f,
            rects: u,
            platform: s,
            elements: {
                reference: e,
                floating: t
            }
        });
        c = p ?? c, d = y ?? d, f = {
            ...f,
            [w]: {
                ...f[w],
                ...S
            }
        }, E && v <= 50 && (v++, typeof E == "object" && (E.placement && (h = E.placement), E.rects && (u = E.rects === !0 ? await s.getElementRects({
            reference: e,
            floating: t,
            strategy: o
        }) : E.rects), {
            x: c,
            y: d
        } = Lp(u, h, l)), g = -1)
    }
    return {
        x: c,
        y: d,
        placement: h,
        strategy: o,
        middlewareData: f
    }
};
async function Wi(e, t) {
    var n;
    t === void 0 && (t = {});
    const {
        x: r,
        y: o,
        platform: i,
        rects: s,
        elements: a,
        strategy: l
    } = e, {
        boundary: u = "clippingAncestors",
        rootBoundary: c = "viewport",
        elementContext: d = "floating",
        altBoundary: h = !1,
        padding: f = 0
    } = gn(t, e), v = A0(f), w = a[h ? d === "floating" ? "reference" : "floating" : d], m = ja(await i.getClippingRect({
        element: (n = await (i.isElement == null ? void 0 : i.isElement(w))) == null || n ? w : w.contextElement || await (i.getDocumentElement == null ? void 0 : i.getDocumentElement(a.floating)),
        boundary: u,
        rootBoundary: c,
        strategy: l
    })), p = d === "floating" ? {
        x: r,
        y: o,
        width: s.floating.width,
        height: s.floating.height
    } : s.reference, y = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(a.floating)), S = await (i.isElement == null ? void 0 : i.isElement(y)) ? await (i.getScale == null ? void 0 : i.getScale(y)) || {
        x: 1,
        y: 1
    } : {
        x: 1,
        y: 1
    }, E = ja(i.convertOffsetParentRelativeRectToViewportRelativeRect ? await i.convertOffsetParentRelativeRectToViewportRelativeRect({
        elements: a,
        rect: p,
        offsetParent: y,
        strategy: l
    }) : p);
    return {
        top: (m.top - E.top + v.top) / S.y,
        bottom: (E.bottom - m.bottom + v.bottom) / S.y,
        left: (m.left - E.left + v.left) / S.x,
        right: (E.right - m.right + v.right) / S.x
    }
}
const EP = e => ({
        name: "arrow",
        options: e,
        async fn(t) {
            const {
                x: n,
                y: r,
                placement: o,
                rects: i,
                platform: s,
                elements: a,
                middlewareData: l
            } = t, {
                element: u,
                padding: c = 0
            } = gn(e, t) || {};
            if (u == null) return {};
            const d = A0(c),
                h = {
                    x: n,
                    y: r
                },
                f = vf(o),
                v = yf(f),
                g = await s.getDimensions(u),
                w = f === "y",
                m = w ? "top" : "left",
                p = w ? "bottom" : "right",
                y = w ? "clientHeight" : "clientWidth",
                S = i.reference[v] + i.reference[f] - h[f] - i.floating[v],
                E = h[f] - i.reference[f],
                C = await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(u));
            let T = C ? C[y] : 0;
            (!T || !await (s.isElement == null ? void 0 : s.isElement(C))) && (T = a.floating[y] || i.floating[v]);
            const b = S / 2 - E / 2,
                D = T / 2 - g[v] / 2 - 1,
                R = nr(d[m], D),
                V = nr(d[p], D),
                I = R,
                U = T - g[v] - V,
                O = T / 2 - g[v] / 2 + b,
                W = Lc(I, O, U),
                z = !l.arrow && Wo(o) != null && O !== W && i.reference[v] / 2 - (O < I ? R : V) - g[v] / 2 < 0,
                H = z ? O < I ? O - I : O - U : 0;
            return {
                [f]: h[f] + H,
                data: {
                    [f]: W,
                    centerOffset: O - W - H,
                    ...z && {
                        alignmentOffset: H
                    }
                },
                reset: z
            }
        }
    }),
    CP = function(e) {
        return e === void 0 && (e = {}), {
            name: "flip",
            options: e,
            async fn(t) {
                var n, r;
                const {
                    placement: o,
                    middlewareData: i,
                    rects: s,
                    initialPlacement: a,
                    platform: l,
                    elements: u
                } = t, {
                    mainAxis: c = !0,
                    crossAxis: d = !0,
                    fallbackPlacements: h,
                    fallbackStrategy: f = "bestFit",
                    fallbackAxisSideDirection: v = "none",
                    flipAlignment: g = !0,
                    ...w
                } = gn(e, t);
                if ((n = i.arrow) != null && n.alignmentOffset) return {};
                const m = yn(o),
                    p = Qt(a),
                    y = yn(a) === a,
                    S = await (l.isRTL == null ? void 0 : l.isRTL(u.floating)),
                    E = h || (y || !g ? [Va(a)] : mP(a)),
                    C = v !== "none";
                !h && C && E.push(...wP(a, g, v, S));
                const T = [a, ...E],
                    b = await Wi(t, w),
                    D = [];
                let R = ((r = i.flip) == null ? void 0 : r.overflows) || [];
                if (c && D.push(b[m]), d) {
                    const O = pP(o, s, S);
                    D.push(b[O[0]], b[O[1]])
                }
                if (R = [...R, {
                        placement: o,
                        overflows: D
                    }], !D.every(O => O <= 0)) {
                    var V, I;
                    const O = (((V = i.flip) == null ? void 0 : V.index) || 0) + 1,
                        W = T[O];
                    if (W && (!(d === "alignment" ? p !== Qt(W) : !1) || R.every(k => k.overflows[0] > 0 && Qt(k.placement) === p))) return {
                        data: {
                            index: O,
                            overflows: R
                        },
                        reset: {
                            placement: W
                        }
                    };
                    let z = (I = R.filter(H => H.overflows[0] <= 0).sort((H, k) => H.overflows[1] - k.overflows[1])[0]) == null ? void 0 : I.placement;
                    if (!z) switch (f) {
                        case "bestFit": {
                            var U;
                            const H = (U = R.filter(k => {
                                if (C) {
                                    const A = Qt(k.placement);
                                    return A === p || A === "y"
                                }
                                return !0
                            }).map(k => [k.placement, k.overflows.filter(A => A > 0).reduce((A, _) => A + _, 0)]).sort((k, A) => k[1] - A[1])[0]) == null ? void 0 : U[0];
                            H && (z = H);
                            break
                        }
                        case "initialPlacement":
                            z = a;
                            break
                    }
                    if (o !== z) return {
                        reset: {
                            placement: z
                        }
                    }
                }
                return {}
            }
        }
    };

function Np(e, t) {
    return {
        top: e.top - t.height,
        right: e.right - t.width,
        bottom: e.bottom - t.height,
        left: e.left - t.width
    }
}

function Op(e) {
    return cP.some(t => e[t] >= 0)
}
const TP = function(e) {
        return e === void 0 && (e = {}), {
            name: "hide",
            options: e,
            async fn(t) {
                const {
                    rects: n
                } = t, {
                    strategy: r = "referenceHidden",
                    ...o
                } = gn(e, t);
                switch (r) {
                    case "referenceHidden": {
                        const i = await Wi(t, {
                                ...o,
                                elementContext: "reference"
                            }),
                            s = Np(i, n.reference);
                        return {
                            data: {
                                referenceHiddenOffsets: s,
                                referenceHidden: Op(s)
                            }
                        }
                    }
                    case "escaped": {
                        const i = await Wi(t, {
                                ...o,
                                altBoundary: !0
                            }),
                            s = Np(i, n.floating);
                        return {
                            data: {
                                escapedOffsets: s,
                                escaped: Op(s)
                            }
                        }
                    }
                    default:
                        return {}
                }
            }
        }
    },
    M0 = new Set(["left", "top"]);
async function PP(e, t) {
    const {
        placement: n,
        platform: r,
        elements: o
    } = e, i = await (r.isRTL == null ? void 0 : r.isRTL(o.floating)), s = yn(n), a = Wo(n), l = Qt(n) === "y", u = M0.has(s) ? -1 : 1, c = i && l ? -1 : 1, d = gn(t, e);
    let {
        mainAxis: h,
        crossAxis: f,
        alignmentAxis: v
    } = typeof d == "number" ? {
        mainAxis: d,
        crossAxis: 0,
        alignmentAxis: null
    } : {
        mainAxis: d.mainAxis || 0,
        crossAxis: d.crossAxis || 0,
        alignmentAxis: d.alignmentAxis
    };
    return a && typeof v == "number" && (f = a === "end" ? v * -1 : v), l ? {
        x: f * c,
        y: h * u
    } : {
        x: h * u,
        y: f * c
    }
}
const bP = function(e) {
        return e === void 0 && (e = 0), {
            name: "offset",
            options: e,
            async fn(t) {
                var n, r;
                const {
                    x: o,
                    y: i,
                    placement: s,
                    middlewareData: a
                } = t, l = await PP(t, e);
                return s === ((n = a.offset) == null ? void 0 : n.placement) && (r = a.arrow) != null && r.alignmentOffset ? {} : {
                    x: o + l.x,
                    y: i + l.y,
                    data: {
                        ...l,
                        placement: s
                    }
                }
            }
        }
    },
    kP = function(e) {
        return e === void 0 && (e = {}), {
            name: "shift",
            options: e,
            async fn(t) {
                const {
                    x: n,
                    y: r,
                    placement: o
                } = t, {
                    mainAxis: i = !0,
                    crossAxis: s = !1,
                    limiter: a = {
                        fn: w => {
                            let {
                                x: m,
                                y: p
                            } = w;
                            return {
                                x: m,
                                y: p
                            }
                        }
                    },
                    ...l
                } = gn(e, t), u = {
                    x: n,
                    y: r
                }, c = await Wi(t, l), d = Qt(yn(o)), h = gf(d);
                let f = u[h],
                    v = u[d];
                if (i) {
                    const w = h === "y" ? "top" : "left",
                        m = h === "y" ? "bottom" : "right",
                        p = f + c[w],
                        y = f - c[m];
                    f = Lc(p, f, y)
                }
                if (s) {
                    const w = d === "y" ? "top" : "left",
                        m = d === "y" ? "bottom" : "right",
                        p = v + c[w],
                        y = v - c[m];
                    v = Lc(p, v, y)
                }
                const g = a.fn({
                    ...t,
                    [h]: f,
                    [d]: v
                });
                return {
                    ...g,
                    data: {
                        x: g.x - n,
                        y: g.y - r,
                        enabled: {
                            [h]: i,
                            [d]: s
                        }
                    }
                }
            }
        }
    },
    RP = function(e) {
        return e === void 0 && (e = {}), {
            options: e,
            fn(t) {
                const {
                    x: n,
                    y: r,
                    placement: o,
                    rects: i,
                    middlewareData: s
                } = t, {
                    offset: a = 0,
                    mainAxis: l = !0,
                    crossAxis: u = !0
                } = gn(e, t), c = {
                    x: n,
                    y: r
                }, d = Qt(o), h = gf(d);
                let f = c[h],
                    v = c[d];
                const g = gn(a, t),
                    w = typeof g == "number" ? {
                        mainAxis: g,
                        crossAxis: 0
                    } : {
                        mainAxis: 0,
                        crossAxis: 0,
                        ...g
                    };
                if (l) {
                    const y = h === "y" ? "height" : "width",
                        S = i.reference[h] - i.floating[y] + w.mainAxis,
                        E = i.reference[h] + i.reference[y] - w.mainAxis;
                    f < S ? f = S : f > E && (f = E)
                }
                if (u) {
                    var m, p;
                    const y = h === "y" ? "width" : "height",
                        S = M0.has(yn(o)),
                        E = i.reference[d] - i.floating[y] + (S && ((m = s.offset) == null ? void 0 : m[d]) || 0) + (S ? 0 : w.crossAxis),
                        C = i.reference[d] + i.reference[y] + (S ? 0 : ((p = s.offset) == null ? void 0 : p[d]) || 0) - (S ? w.crossAxis : 0);
                    v < E ? v = E : v > C && (v = C)
                }
                return {
                    [h]: f,
                    [d]: v
                }
            }
        }
    },
    AP = function(e) {
        return e === void 0 && (e = {}), {
            name: "size",
            options: e,
            async fn(t) {
                var n, r;
                const {
                    placement: o,
                    rects: i,
                    platform: s,
                    elements: a
                } = t, {
                    apply: l = () => {},
                    ...u
                } = gn(e, t), c = await Wi(t, u), d = yn(o), h = Wo(o), f = Qt(o) === "y", {
                    width: v,
                    height: g
                } = i.floating;
                let w, m;
                d === "top" || d === "bottom" ? (w = d, m = h === (await (s.isRTL == null ? void 0 : s.isRTL(a.floating)) ? "start" : "end") ? "left" : "right") : (m = d, w = h === "end" ? "top" : "bottom");
                const p = g - c.top - c.bottom,
                    y = v - c.left - c.right,
                    S = nr(g - c[w], p),
                    E = nr(v - c[m], y),
                    C = !t.middlewareData.shift;
                let T = S,
                    b = E;
                if ((n = t.middlewareData.shift) != null && n.enabled.x && (b = y), (r = t.middlewareData.shift) != null && r.enabled.y && (T = p), C && !h) {
                    const R = rt(c.left, 0),
                        V = rt(c.right, 0),
                        I = rt(c.top, 0),
                        U = rt(c.bottom, 0);
                    f ? b = v - 2 * (R !== 0 || V !== 0 ? R + V : rt(c.left, c.right)) : T = g - 2 * (I !== 0 || U !== 0 ? I + U : rt(c.top, c.bottom))
                }
                await l({
                    ...t,
                    availableWidth: b,
                    availableHeight: T
                });
                const D = await s.getDimensions(a.floating);
                return v !== D.width || g !== D.height ? {
                    reset: {
                        rects: !0
                    }
                } : {}
            }
        }
    };

function yl() {
    return typeof window < "u"
}

function Ho(e) {
    return D0(e) ? (e.nodeName || "").toLowerCase() : "#document"
}

function st(e) {
    var t;
    return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window
}

function tn(e) {
    var t;
    return (t = (D0(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement
}

function D0(e) {
    return yl() ? e instanceof Node || e instanceof st(e).Node : !1
}

function jt(e) {
    return yl() ? e instanceof Element || e instanceof st(e).Element : !1
}

function Jt(e) {
    return yl() ? e instanceof HTMLElement || e instanceof st(e).HTMLElement : !1
}

function Ip(e) {
    return !yl() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof st(e).ShadowRoot
}
const MP = new Set(["inline", "contents"]);

function as(e) {
    const {
        overflow: t,
        overflowX: n,
        overflowY: r,
        display: o
    } = Ft(e);
    return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && !MP.has(o)
}
const DP = new Set(["table", "td", "th"]);

function LP(e) {
    return DP.has(Ho(e))
}
const NP = [":popover-open", ":modal"];

function vl(e) {
    return NP.some(t => {
        try {
            return e.matches(t)
        } catch {
            return !1
        }
    })
}
const OP = ["transform", "translate", "scale", "rotate", "perspective"],
    IP = ["transform", "translate", "scale", "rotate", "perspective", "filter"],
    _P = ["paint", "layout", "strict", "content"];

function wf(e) {
    const t = xf(),
        n = jt(e) ? Ft(e) : e;
    return OP.some(r => n[r] ? n[r] !== "none" : !1) || (n.containerType ? n.containerType !== "normal" : !1) || !t && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !t && (n.filter ? n.filter !== "none" : !1) || IP.some(r => (n.willChange || "").includes(r)) || _P.some(r => (n.contain || "").includes(r))
}

function VP(e) {
    let t = rr(e);
    for (; Jt(t) && !Io(t);) {
        if (wf(t)) return t;
        if (vl(t)) return null;
        t = rr(t)
    }
    return null
}

function xf() {
    return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none")
}
const jP = new Set(["html", "body", "#document"]);

function Io(e) {
    return jP.has(Ho(e))
}

function Ft(e) {
    return st(e).getComputedStyle(e)
}

function wl(e) {
    return jt(e) ? {
        scrollLeft: e.scrollLeft,
        scrollTop: e.scrollTop
    } : {
        scrollLeft: e.scrollX,
        scrollTop: e.scrollY
    }
}

function rr(e) {
    if (Ho(e) === "html") return e;
    const t = e.assignedSlot || e.parentNode || Ip(e) && e.host || tn(e);
    return Ip(t) ? t.host : t
}

function L0(e) {
    const t = rr(e);
    return Io(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : Jt(t) && as(t) ? t : L0(t)
}

function Hi(e, t, n) {
    var r;
    t === void 0 && (t = []), n === void 0 && (n = !0);
    const o = L0(e),
        i = o === ((r = e.ownerDocument) == null ? void 0 : r.body),
        s = st(o);
    if (i) {
        const a = Oc(s);
        return t.concat(s, s.visualViewport || [], as(o) ? o : [], a && n ? Hi(a) : [])
    }
    return t.concat(o, Hi(o, [], n))
}

function Oc(e) {
    return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null
}

function N0(e) {
    const t = Ft(e);
    let n = parseFloat(t.width) || 0,
        r = parseFloat(t.height) || 0;
    const o = Jt(e),
        i = o ? e.offsetWidth : n,
        s = o ? e.offsetHeight : r,
        a = _a(n) !== i || _a(r) !== s;
    return a && (n = i, r = s), {
        width: n,
        height: r,
        $: a
    }
}

function Sf(e) {
    return jt(e) ? e : e.contextElement
}

function vo(e) {
    const t = Sf(e);
    if (!Jt(t)) return qt(1);
    const n = t.getBoundingClientRect(),
        {
            width: r,
            height: o,
            $: i
        } = N0(t);
    let s = (i ? _a(n.width) : n.width) / r,
        a = (i ? _a(n.height) : n.height) / o;
    return (!s || !Number.isFinite(s)) && (s = 1), (!a || !Number.isFinite(a)) && (a = 1), {
        x: s,
        y: a
    }
}
const FP = qt(0);

function O0(e) {
    const t = st(e);
    return !xf() || !t.visualViewport ? FP : {
        x: t.visualViewport.offsetLeft,
        y: t.visualViewport.offsetTop
    }
}

function zP(e, t, n) {
    return t === void 0 && (t = !1), !n || t && n !== st(e) ? !1 : t
}

function Vr(e, t, n, r) {
    t === void 0 && (t = !1), n === void 0 && (n = !1);
    const o = e.getBoundingClientRect(),
        i = Sf(e);
    let s = qt(1);
    t && (r ? jt(r) && (s = vo(r)) : s = vo(e));
    const a = zP(i, n, r) ? O0(i) : qt(0);
    let l = (o.left + a.x) / s.x,
        u = (o.top + a.y) / s.y,
        c = o.width / s.x,
        d = o.height / s.y;
    if (i) {
        const h = st(i),
            f = r && jt(r) ? st(r) : r;
        let v = h,
            g = Oc(v);
        for (; g && r && f !== v;) {
            const w = vo(g),
                m = g.getBoundingClientRect(),
                p = Ft(g),
                y = m.left + (g.clientLeft + parseFloat(p.paddingLeft)) * w.x,
                S = m.top + (g.clientTop + parseFloat(p.paddingTop)) * w.y;
            l *= w.x, u *= w.y, c *= w.x, d *= w.y, l += y, u += S, v = st(g), g = Oc(v)
        }
    }
    return ja({
        width: c,
        height: d,
        x: l,
        y: u
    })
}

function Ef(e, t) {
    const n = wl(e).scrollLeft;
    return t ? t.left + n : Vr(tn(e)).left + n
}

function I0(e, t, n) {
    n === void 0 && (n = !1);
    const r = e.getBoundingClientRect(),
        o = r.left + t.scrollLeft - (n ? 0 : Ef(e, r)),
        i = r.top + t.scrollTop;
    return {
        x: o,
        y: i
    }
}

function $P(e) {
    let {
        elements: t,
        rect: n,
        offsetParent: r,
        strategy: o
    } = e;
    const i = o === "fixed",
        s = tn(r),
        a = t ? vl(t.floating) : !1;
    if (r === s || a && i) return n;
    let l = {
            scrollLeft: 0,
            scrollTop: 0
        },
        u = qt(1);
    const c = qt(0),
        d = Jt(r);
    if ((d || !d && !i) && ((Ho(r) !== "body" || as(s)) && (l = wl(r)), Jt(r))) {
        const f = Vr(r);
        u = vo(r), c.x = f.x + r.clientLeft, c.y = f.y + r.clientTop
    }
    const h = s && !d && !i ? I0(s, l, !0) : qt(0);
    return {
        width: n.width * u.x,
        height: n.height * u.y,
        x: n.x * u.x - l.scrollLeft * u.x + c.x + h.x,
        y: n.y * u.y - l.scrollTop * u.y + c.y + h.y
    }
}

function BP(e) {
    return Array.from(e.getClientRects())
}

function UP(e) {
    const t = tn(e),
        n = wl(e),
        r = e.ownerDocument.body,
        o = rt(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth),
        i = rt(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight);
    let s = -n.scrollLeft + Ef(e);
    const a = -n.scrollTop;
    return Ft(r).direction === "rtl" && (s += rt(t.clientWidth, r.clientWidth) - o), {
        width: o,
        height: i,
        x: s,
        y: a
    }
}

function WP(e, t) {
    const n = st(e),
        r = tn(e),
        o = n.visualViewport;
    let i = r.clientWidth,
        s = r.clientHeight,
        a = 0,
        l = 0;
    if (o) {
        i = o.width, s = o.height;
        const u = xf();
        (!u || u && t === "fixed") && (a = o.offsetLeft, l = o.offsetTop)
    }
    return {
        width: i,
        height: s,
        x: a,
        y: l
    }
}
const HP = new Set(["absolute", "fixed"]);

function KP(e, t) {
    const n = Vr(e, !0, t === "fixed"),
        r = n.top + e.clientTop,
        o = n.left + e.clientLeft,
        i = Jt(e) ? vo(e) : qt(1),
        s = e.clientWidth * i.x,
        a = e.clientHeight * i.y,
        l = o * i.x,
        u = r * i.y;
    return {
        width: s,
        height: a,
        x: l,
        y: u
    }
}

function _p(e, t, n) {
    let r;
    if (t === "viewport") r = WP(e, n);
    else if (t === "document") r = UP(tn(e));
    else if (jt(t)) r = KP(t, n);
    else {
        const o = O0(e);
        r = {
            x: t.x - o.x,
            y: t.y - o.y,
            width: t.width,
            height: t.height
        }
    }
    return ja(r)
}

function _0(e, t) {
    const n = rr(e);
    return n === t || !jt(n) || Io(n) ? !1 : Ft(n).position === "fixed" || _0(n, t)
}

function GP(e, t) {
    const n = t.get(e);
    if (n) return n;
    let r = Hi(e, [], !1).filter(a => jt(a) && Ho(a) !== "body"),
        o = null;
    const i = Ft(e).position === "fixed";
    let s = i ? rr(e) : e;
    for (; jt(s) && !Io(s);) {
        const a = Ft(s),
            l = wf(s);
        !l && a.position === "fixed" && (o = null), (i ? !l && !o : !l && a.position === "static" && !!o && HP.has(o.position) || as(s) && !l && _0(e, s)) ? r = r.filter(c => c !== s) : o = a, s = rr(s)
    }
    return t.set(e, r), r
}

function QP(e) {
    let {
        element: t,
        boundary: n,
        rootBoundary: r,
        strategy: o
    } = e;
    const s = [...n === "clippingAncestors" ? vl(t) ? [] : GP(t, this._c) : [].concat(n), r],
        a = s[0],
        l = s.reduce((u, c) => {
            const d = _p(t, c, o);
            return u.top = rt(d.top, u.top), u.right = nr(d.right, u.right), u.bottom = nr(d.bottom, u.bottom), u.left = rt(d.left, u.left), u
        }, _p(t, a, o));
    return {
        width: l.right - l.left,
        height: l.bottom - l.top,
        x: l.left,
        y: l.top
    }
}

function YP(e) {
    const {
        width: t,
        height: n
    } = N0(e);
    return {
        width: t,
        height: n
    }
}

function XP(e, t, n) {
    const r = Jt(t),
        o = tn(t),
        i = n === "fixed",
        s = Vr(e, !0, i, t);
    let a = {
        scrollLeft: 0,
        scrollTop: 0
    };
    const l = qt(0);

    function u() {
        l.x = Ef(o)
    }
    if (r || !r && !i)
        if ((Ho(t) !== "body" || as(o)) && (a = wl(t)), r) {
            const f = Vr(t, !0, i, t);
            l.x = f.x + t.clientLeft, l.y = f.y + t.clientTop
        } else o && u();
    i && !r && o && u();
    const c = o && !r && !i ? I0(o, a) : qt(0),
        d = s.left + a.scrollLeft - l.x - c.x,
        h = s.top + a.scrollTop - l.y - c.y;
    return {
        x: d,
        y: h,
        width: s.width,
        height: s.height
    }
}

function pu(e) {
    return Ft(e).position === "static"
}

function Vp(e, t) {
    if (!Jt(e) || Ft(e).position === "fixed") return null;
    if (t) return t(e);
    let n = e.offsetParent;
    return tn(e) === n && (n = n.ownerDocument.body), n
}

function V0(e, t) {
    const n = st(e);
    if (vl(e)) return n;
    if (!Jt(e)) {
        let o = rr(e);
        for (; o && !Io(o);) {
            if (jt(o) && !pu(o)) return o;
            o = rr(o)
        }
        return n
    }
    let r = Vp(e, t);
    for (; r && LP(r) && pu(r);) r = Vp(r, t);
    return r && Io(r) && pu(r) && !wf(r) ? n : r || VP(e) || n
}
const qP = async function(e) {
    const t = this.getOffsetParent || V0,
        n = this.getDimensions,
        r = await n(e.floating);
    return {
        reference: XP(e.reference, await t(e.floating), e.strategy),
        floating: {
            x: 0,
            y: 0,
            width: r.width,
            height: r.height
        }
    }
};

function ZP(e) {
    return Ft(e).direction === "rtl"
}
const JP = {
    convertOffsetParentRelativeRectToViewportRelativeRect: $P,
    getDocumentElement: tn,
    getClippingRect: QP,
    getOffsetParent: V0,
    getElementRects: qP,
    getClientRects: BP,
    getDimensions: YP,
    getScale: vo,
    isElement: jt,
    isRTL: ZP
};

function j0(e, t) {
    return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height
}

function eb(e, t) {
    let n = null,
        r;
    const o = tn(e);

    function i() {
        var a;
        clearTimeout(r), (a = n) == null || a.disconnect(), n = null
    }

    function s(a, l) {
        a === void 0 && (a = !1), l === void 0 && (l = 1), i();
        const u = e.getBoundingClientRect(),
            {
                left: c,
                top: d,
                width: h,
                height: f
            } = u;
        if (a || t(), !h || !f) return;
        const v = _s(d),
            g = _s(o.clientWidth - (c + h)),
            w = _s(o.clientHeight - (d + f)),
            m = _s(c),
            y = {
                rootMargin: -v + "px " + -g + "px " + -w + "px " + -m + "px",
                threshold: rt(0, nr(1, l)) || 1
            };
        let S = !0;

        function E(C) {
            const T = C[0].intersectionRatio;
            if (T !== l) {
                if (!S) return s();
                T ? s(!1, T) : r = setTimeout(() => {
                    s(!1, 1e-7)
                }, 1e3)
            }
            T === 1 && !j0(u, e.getBoundingClientRect()) && s(), S = !1
        }
        try {
            n = new IntersectionObserver(E, {
                ...y,
                root: o.ownerDocument
            })
        } catch {
            n = new IntersectionObserver(E, y)
        }
        n.observe(e)
    }
    return s(!0), i
}

function tb(e, t, n, r) {
    r === void 0 && (r = {});
    const {
        ancestorScroll: o = !0,
        ancestorResize: i = !0,
        elementResize: s = typeof ResizeObserver == "function",
        layoutShift: a = typeof IntersectionObserver == "function",
        animationFrame: l = !1
    } = r, u = Sf(e), c = o || i ? [...u ? Hi(u) : [], ...Hi(t)] : [];
    c.forEach(m => {
        o && m.addEventListener("scroll", n, {
            passive: !0
        }), i && m.addEventListener("resize", n)
    });
    const d = u && a ? eb(u, n) : null;
    let h = -1,
        f = null;
    s && (f = new ResizeObserver(m => {
        let [p] = m;
        p && p.target === u && f && (f.unobserve(t), cancelAnimationFrame(h), h = requestAnimationFrame(() => {
            var y;
            (y = f) == null || y.observe(t)
        })), n()
    }), u && !l && f.observe(u), f.observe(t));
    let v, g = l ? Vr(e) : null;
    l && w();

    function w() {
        const m = Vr(e);
        g && !j0(g, m) && n(), g = m, v = requestAnimationFrame(w)
    }
    return n(), () => {
        var m;
        c.forEach(p => {
            o && p.removeEventListener("scroll", n), i && p.removeEventListener("resize", n)
        }), d == null || d(), (m = f) == null || m.disconnect(), f = null, l && cancelAnimationFrame(v)
    }
}
const nb = bP,
    rb = kP,
    ob = CP,
    ib = AP,
    sb = TP,
    jp = EP,
    ab = RP,
    lb = (e, t, n) => {
        const r = new Map,
            o = {
                platform: JP,
                ...n
            },
            i = {
                ...o.platform,
                _c: r
            };
        return SP(e, t, {
            ...o,
            platform: i
        })
    };
var ub = typeof document < "u",
    cb = function() {},
    ra = ub ? x.useLayoutEffect : cb;

function Fa(e, t) {
    if (e === t) return !0;
    if (typeof e != typeof t) return !1;
    if (typeof e == "function" && e.toString() === t.toString()) return !0;
    let n, r, o;
    if (e && t && typeof e == "object") {
        if (Array.isArray(e)) {
            if (n = e.length, n !== t.length) return !1;
            for (r = n; r-- !== 0;)
                if (!Fa(e[r], t[r])) return !1;
            return !0
        }
        if (o = Object.keys(e), n = o.length, n !== Object.keys(t).length) return !1;
        for (r = n; r-- !== 0;)
            if (!{}.hasOwnProperty.call(t, o[r])) return !1;
        for (r = n; r-- !== 0;) {
            const i = o[r];
            if (!(i === "_owner" && e.$$typeof) && !Fa(e[i], t[i])) return !1
        }
        return !0
    }
    return e !== e && t !== t
}

function F0(e) {
    return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1
}

function Fp(e, t) {
    const n = F0(e);
    return Math.round(t * n) / n
}

function mu(e) {
    const t = x.useRef(e);
    return ra(() => {
        t.current = e
    }), t
}

function db(e) {
    e === void 0 && (e = {});
    const {
        placement: t = "bottom",
        strategy: n = "absolute",
        middleware: r = [],
        platform: o,
        elements: {
            reference: i,
            floating: s
        } = {},
        transform: a = !0,
        whileElementsMounted: l,
        open: u
    } = e, [c, d] = x.useState({
        x: 0,
        y: 0,
        strategy: n,
        placement: t,
        middlewareData: {},
        isPositioned: !1
    }), [h, f] = x.useState(r);
    Fa(h, r) || f(r);
    const [v, g] = x.useState(null), [w, m] = x.useState(null), p = x.useCallback(k => {
        k !== C.current && (C.current = k, g(k))
    }, []), y = x.useCallback(k => {
        k !== T.current && (T.current = k, m(k))
    }, []), S = i || v, E = s || w, C = x.useRef(null), T = x.useRef(null), b = x.useRef(c), D = l != null, R = mu(l), V = mu(o), I = mu(u), U = x.useCallback(() => {
        if (!C.current || !T.current) return;
        const k = {
            placement: t,
            strategy: n,
            middleware: h
        };
        V.current && (k.platform = V.current), lb(C.current, T.current, k).then(A => {
            const _ = {
                ...A,
                isPositioned: I.current !== !1
            };
            O.current && !Fa(b.current, _) && (b.current = _, is.flushSync(() => {
                d(_)
            }))
        })
    }, [h, t, n, V, I]);
    ra(() => {
        u === !1 && b.current.isPositioned && (b.current.isPositioned = !1, d(k => ({
            ...k,
            isPositioned: !1
        })))
    }, [u]);
    const O = x.useRef(!1);
    ra(() => (O.current = !0, () => {
        O.current = !1
    }), []), ra(() => {
        if (S && (C.current = S), E && (T.current = E), S && E) {
            if (R.current) return R.current(S, E, U);
            U()
        }
    }, [S, E, U, R, D]);
    const W = x.useMemo(() => ({
            reference: C,
            floating: T,
            setReference: p,
            setFloating: y
        }), [p, y]),
        z = x.useMemo(() => ({
            reference: S,
            floating: E
        }), [S, E]),
        H = x.useMemo(() => {
            const k = {
                position: n,
                left: 0,
                top: 0
            };
            if (!z.floating) return k;
            const A = Fp(z.floating, c.x),
                _ = Fp(z.floating, c.y);
            return a ? {
                ...k,
                transform: "translate(" + A + "px, " + _ + "px)",
                ...F0(z.floating) >= 1.5 && {
                    willChange: "transform"
                }
            } : {
                position: n,
                left: A,
                top: _
            }
        }, [n, a, z.floating, c.x, c.y]);
    return x.useMemo(() => ({
        ...c,
        update: U,
        refs: W,
        elements: z,
        floatingStyles: H
    }), [c, U, W, z, H])
}
const fb = e => {
        function t(n) {
            return {}.hasOwnProperty.call(n, "current")
        }
        return {
            name: "arrow",
            options: e,
            fn(n) {
                const {
                    element: r,
                    padding: o
                } = typeof e == "function" ? e(n) : e;
                return r && t(r) ? r.current != null ? jp({
                    element: r.current,
                    padding: o
                }).fn(n) : {} : r ? jp({
                    element: r,
                    padding: o
                }).fn(n) : {}
            }
        }
    },
    hb = (e, t) => ({
        ...nb(e),
        options: [e, t]
    }),
    pb = (e, t) => ({
        ...rb(e),
        options: [e, t]
    }),
    mb = (e, t) => ({
        ...ab(e),
        options: [e, t]
    }),
    gb = (e, t) => ({
        ...ob(e),
        options: [e, t]
    }),
    yb = (e, t) => ({
        ...ib(e),
        options: [e, t]
    }),
    vb = (e, t) => ({
        ...sb(e),
        options: [e, t]
    }),
    wb = (e, t) => ({
        ...fb(e),
        options: [e, t]
    });
var xb = "Arrow",
    z0 = x.forwardRef((e, t) => {
        const {
            children: n,
            width: r = 10,
            height: o = 5,
            ...i
        } = e;
        return P.jsx(tt.svg, {
            ...i,
            ref: t,
            width: r,
            height: o,
            viewBox: "0 0 30 10",
            preserveAspectRatio: "none",
            children: e.asChild ? n : P.jsx("polygon", {
                points: "0,0 30,0 15,10"
            })
        })
    });
z0.displayName = xb;
var Sb = z0;

function Eb(e) {
    const [t, n] = x.useState(void 0);
    return tr(() => {
        if (e) {
            n({
                width: e.offsetWidth,
                height: e.offsetHeight
            });
            const r = new ResizeObserver(o => {
                if (!Array.isArray(o) || !o.length) return;
                const i = o[0];
                let s, a;
                if ("borderBoxSize" in i) {
                    const l = i.borderBoxSize,
                        u = Array.isArray(l) ? l[0] : l;
                    s = u.inlineSize, a = u.blockSize
                } else s = e.offsetWidth, a = e.offsetHeight;
                n({
                    width: s,
                    height: a
                })
            });
            return r.observe(e, {
                box: "border-box"
            }), () => r.unobserve(e)
        } else n(void 0)
    }, [e]), t
}
var $0 = "Popper",
    [B0, U0] = pl($0),
    [nN, W0] = B0($0),
    H0 = "PopperAnchor",
    K0 = x.forwardRef((e, t) => {
        const {
            __scopePopper: n,
            virtualRef: r,
            ...o
        } = e, i = W0(H0, n), s = x.useRef(null), a = Vt(t, s);
        return x.useEffect(() => {
            i.onAnchorChange((r == null ? void 0 : r.current) || s.current)
        }), r ? null : P.jsx(tt.div, {
            ...o,
            ref: a
        })
    });
K0.displayName = H0;
var Cf = "PopperContent",
    [Cb, Tb] = B0(Cf),
    G0 = x.forwardRef((e, t) => {
        var ee, $r, wn, cr, xn, Br;
        const {
            __scopePopper: n,
            side: r = "bottom",
            sideOffset: o = 0,
            align: i = "center",
            alignOffset: s = 0,
            arrowPadding: a = 0,
            avoidCollisions: l = !0,
            collisionBoundary: u = [],
            collisionPadding: c = 0,
            sticky: d = "partial",
            hideWhenDetached: h = !1,
            updatePositionStrategy: f = "optimized",
            onPlaced: v,
            ...g
        } = e, w = W0(Cf, n), [m, p] = x.useState(null), y = Vt(t, Sn => p(Sn)), [S, E] = x.useState(null), C = Eb(S), T = (C == null ? void 0 : C.width) ?? 0, b = (C == null ? void 0 : C.height) ?? 0, D = r + (i !== "center" ? "-" + i : ""), R = typeof c == "number" ? c : {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            ...c
        }, V = Array.isArray(u) ? u : [u], I = V.length > 0, U = {
            padding: R,
            boundary: V.filter(bb),
            altBoundary: I
        }, {
            refs: O,
            floatingStyles: W,
            placement: z,
            isPositioned: H,
            middlewareData: k
        } = db({
            strategy: "fixed",
            placement: D,
            whileElementsMounted: (...Sn) => tb(...Sn, {
                animationFrame: f === "always"
            }),
            elements: {
                reference: w.anchor
            },
            middleware: [hb({
                mainAxis: o + b,
                alignmentAxis: s
            }), l && pb({
                mainAxis: !0,
                crossAxis: !1,
                limiter: d === "partial" ? mb() : void 0,
                ...U
            }), l && gb({
                ...U
            }), yb({
                ...U,
                apply: ({
                    elements: Sn,
                    rects: fs,
                    availableWidth: Nl,
                    availableHeight: hs
                }) => {
                    const {
                        width: Ol,
                        height: Yo
                    } = fs.reference, Ur = Sn.floating.style;
                    Ur.setProperty("--radix-popper-available-width", `${Nl}px`), Ur.setProperty("--radix-popper-available-height", `${hs}px`), Ur.setProperty("--radix-popper-anchor-width", `${Ol}px`), Ur.setProperty("--radix-popper-anchor-height", `${Yo}px`)
                }
            }), S && wb({
                element: S,
                padding: a
            }), kb({
                arrowWidth: T,
                arrowHeight: b
            }), h && vb({
                strategy: "referenceHidden",
                ...U
            })]
        }), [A, _] = X0(z), B = er(v);
        tr(() => {
            H && (B == null || B())
        }, [H, B]);
        const $ = (ee = k.arrow) == null ? void 0 : ee.x,
            Y = ($r = k.arrow) == null ? void 0 : $r.y,
            q = ((wn = k.arrow) == null ? void 0 : wn.centerOffset) !== 0,
            [ve, Le] = x.useState();
        return tr(() => {
            m && Le(window.getComputedStyle(m).zIndex)
        }, [m]), P.jsx("div", {
            ref: O.setFloating,
            "data-radix-popper-content-wrapper": "",
            style: {
                ...W,
                transform: H ? W.transform : "translate(0, -200%)",
                minWidth: "max-content",
                zIndex: ve,
                "--radix-popper-transform-origin": [(cr = k.transformOrigin) == null ? void 0 : cr.x, (xn = k.transformOrigin) == null ? void 0 : xn.y].join(" "),
                ...((Br = k.hide) == null ? void 0 : Br.referenceHidden) && {
                    visibility: "hidden",
                    pointerEvents: "none"
                }
            },
            dir: e.dir,
            children: P.jsx(Cb, {
                scope: n,
                placedSide: A,
                onArrowChange: E,
                arrowX: $,
                arrowY: Y,
                shouldHideArrow: q,
                children: P.jsx(tt.div, {
                    "data-side": A,
                    "data-align": _,
                    ...g,
                    ref: y,
                    style: {
                        ...g.style,
                        animation: H ? void 0 : "none"
                    }
                })
            })
        })
    });
G0.displayName = Cf;
var Q0 = "PopperArrow",
    Pb = {
        top: "bottom",
        right: "left",
        bottom: "top",
        left: "right"
    },
    Y0 = x.forwardRef(function(t, n) {
        const {
            __scopePopper: r,
            ...o
        } = t, i = Tb(Q0, r), s = Pb[i.placedSide];
        return P.jsx("span", {
            ref: i.onArrowChange,
            style: {
                position: "absolute",
                left: i.arrowX,
                top: i.arrowY,
                [s]: 0,
                transformOrigin: {
                    top: "",
                    right: "0 0",
                    bottom: "center 0",
                    left: "100% 0"
                } [i.placedSide],
                transform: {
                    top: "translateY(100%)",
                    right: "translateY(50%) rotate(90deg) translateX(-50%)",
                    bottom: "rotate(180deg)",
                    left: "translateY(50%) rotate(-90deg) translateX(50%)"
                } [i.placedSide],
                visibility: i.shouldHideArrow ? "hidden" : void 0
            },
            children: P.jsx(Sb, {
                ...o,
                ref: n,
                style: {
                    ...o.style,
                    display: "block"
                }
            })
        })
    });
Y0.displayName = Q0;

function bb(e) {
    return e !== null
}
var kb = e => ({
    name: "transformOrigin",
    options: e,
    fn(t) {
        var w, m, p;
        const {
            placement: n,
            rects: r,
            middlewareData: o
        } = t, s = ((w = o.arrow) == null ? void 0 : w.centerOffset) !== 0, a = s ? 0 : e.arrowWidth, l = s ? 0 : e.arrowHeight, [u, c] = X0(n), d = {
            start: "0%",
            center: "50%",
            end: "100%"
        } [c], h = (((m = o.arrow) == null ? void 0 : m.x) ?? 0) + a / 2, f = (((p = o.arrow) == null ? void 0 : p.y) ?? 0) + l / 2;
        let v = "",
            g = "";
        return u === "bottom" ? (v = s ? d : `${h}px`, g = `${-l}px`) : u === "top" ? (v = s ? d : `${h}px`, g = `${r.floating.height+l}px`) : u === "right" ? (v = `${-l}px`, g = s ? d : `${f}px`) : u === "left" && (v = `${r.floating.width+l}px`, g = s ? d : `${f}px`), {
            data: {
                x: v,
                y: g
            }
        }
    }
});

function X0(e) {
    const [t, n = "center"] = e.split("-");
    return [t, n]
}
var Rb = K0,
    Ab = G0,
    Mb = Y0,
    [xl, rN] = pl("Tooltip", [U0]),
    Tf = U0(),
    q0 = "TooltipProvider",
    Db = 700,
    zp = "tooltip.open",
    [Lb, Z0] = xl(q0),
    J0 = e => {
        const {
            __scopeTooltip: t,
            delayDuration: n = Db,
            skipDelayDuration: r = 300,
            disableHoverableContent: o = !1,
            children: i
        } = e, s = x.useRef(!0), a = x.useRef(!1), l = x.useRef(0);
        return x.useEffect(() => {
            const u = l.current;
            return () => window.clearTimeout(u)
        }, []), P.jsx(Lb, {
            scope: t,
            isOpenDelayedRef: s,
            delayDuration: n,
            onOpen: x.useCallback(() => {
                window.clearTimeout(l.current), s.current = !1
            }, []),
            onClose: x.useCallback(() => {
                window.clearTimeout(l.current), l.current = window.setTimeout(() => s.current = !0, r)
            }, [r]),
            isPointerInTransitRef: a,
            onPointerInTransitChange: x.useCallback(u => {
                a.current = u
            }, []),
            disableHoverableContent: o,
            children: i
        })
    };
J0.displayName = q0;
var ew = "Tooltip",
    [oN, Sl] = xl(ew),
    Ic = "TooltipTrigger",
    Nb = x.forwardRef((e, t) => {
        const {
            __scopeTooltip: n,
            ...r
        } = e, o = Sl(Ic, n), i = Z0(Ic, n), s = Tf(n), a = x.useRef(null), l = Vt(t, a, o.onTriggerChange), u = x.useRef(!1), c = x.useRef(!1), d = x.useCallback(() => u.current = !1, []);
        return x.useEffect(() => () => document.removeEventListener("pointerup", d), [d]), P.jsx(Rb, {
            asChild: !0,
            ...s,
            children: P.jsx(tt.button, {
                "aria-describedby": o.open ? o.contentId : void 0,
                "data-state": o.stateAttribute,
                ...r,
                ref: l,
                onPointerMove: Ce(e.onPointerMove, h => {
                    h.pointerType !== "touch" && !c.current && !i.isPointerInTransitRef.current && (o.onTriggerEnter(), c.current = !0)
                }),
                onPointerLeave: Ce(e.onPointerLeave, () => {
                    o.onTriggerLeave(), c.current = !1
                }),
                onPointerDown: Ce(e.onPointerDown, () => {
                    o.open && o.onClose(), u.current = !0, document.addEventListener("pointerup", d, {
                        once: !0
                    })
                }),
                onFocus: Ce(e.onFocus, () => {
                    u.current || o.onOpen()
                }),
                onBlur: Ce(e.onBlur, o.onClose),
                onClick: Ce(e.onClick, o.onClose)
            })
        })
    });
Nb.displayName = Ic;
var Ob = "TooltipPortal",
    [iN, Ib] = xl(Ob, {
        forceMount: void 0
    }),
    _o = "TooltipContent",
    tw = x.forwardRef((e, t) => {
        const n = Ib(_o, e.__scopeTooltip),
            {
                forceMount: r = n.forceMount,
                side: o = "top",
                ...i
            } = e,
            s = Sl(_o, e.__scopeTooltip);
        return P.jsx(cf, {
            present: r || s.open,
            children: s.disableHoverableContent ? P.jsx(nw, {
                side: o,
                ...i,
                ref: t
            }) : P.jsx(_b, {
                side: o,
                ...i,
                ref: t
            })
        })
    }),
    _b = x.forwardRef((e, t) => {
        const n = Sl(_o, e.__scopeTooltip),
            r = Z0(_o, e.__scopeTooltip),
            o = x.useRef(null),
            i = Vt(t, o),
            [s, a] = x.useState(null),
            {
                trigger: l,
                onClose: u
            } = n,
            c = o.current,
            {
                onPointerInTransitChange: d
            } = r,
            h = x.useCallback(() => {
                a(null), d(!1)
            }, [d]),
            f = x.useCallback((v, g) => {
                const w = v.currentTarget,
                    m = {
                        x: v.clientX,
                        y: v.clientY
                    },
                    p = $b(m, w.getBoundingClientRect()),
                    y = Bb(m, p),
                    S = Ub(g.getBoundingClientRect()),
                    E = Hb([...y, ...S]);
                a(E), d(!0)
            }, [d]);
        return x.useEffect(() => () => h(), [h]), x.useEffect(() => {
            if (l && c) {
                const v = w => f(w, c),
                    g = w => f(w, l);
                return l.addEventListener("pointerleave", v), c.addEventListener("pointerleave", g), () => {
                    l.removeEventListener("pointerleave", v), c.removeEventListener("pointerleave", g)
                }
            }
        }, [l, c, f, h]), x.useEffect(() => {
            if (s) {
                const v = g => {
                    const w = g.target,
                        m = {
                            x: g.clientX,
                            y: g.clientY
                        },
                        p = (l == null ? void 0 : l.contains(w)) || (c == null ? void 0 : c.contains(w)),
                        y = !Wb(m, s);
                    p ? h() : y && (h(), u())
                };
                return document.addEventListener("pointermove", v), () => document.removeEventListener("pointermove", v)
            }
        }, [l, c, s, u, h]), P.jsx(nw, {
            ...e,
            ref: i
        })
    }),
    [Vb, jb] = xl(ew, {
        isInside: !1
    }),
    Fb = JE("TooltipContent"),
    nw = x.forwardRef((e, t) => {
        const {
            __scopeTooltip: n,
            children: r,
            "aria-label": o,
            onEscapeKeyDown: i,
            onPointerDownOutside: s,
            ...a
        } = e, l = Sl(_o, n), u = Tf(n), {
            onClose: c
        } = l;
        return x.useEffect(() => (document.addEventListener(zp, c), () => document.removeEventListener(zp, c)), [c]), x.useEffect(() => {
            if (l.trigger) {
                const d = h => {
                    const f = h.target;
                    f != null && f.contains(l.trigger) && c()
                };
                return window.addEventListener("scroll", d, {
                    capture: !0
                }), () => window.removeEventListener("scroll", d, {
                    capture: !0
                })
            }
        }, [l.trigger, c]), P.jsx(uf, {
            asChild: !0,
            disableOutsidePointerEvents: !1,
            onEscapeKeyDown: i,
            onPointerDownOutside: s,
            onFocusOutside: d => d.preventDefault(),
            onDismiss: c,
            children: P.jsxs(Ab, {
                "data-state": l.stateAttribute,
                ...u,
                ...a,
                ref: t,
                style: {
                    ...a.style,
                    "--radix-tooltip-content-transform-origin": "var(--radix-popper-transform-origin)",
                    "--radix-tooltip-content-available-width": "var(--radix-popper-available-width)",
                    "--radix-tooltip-content-available-height": "var(--radix-popper-available-height)",
                    "--radix-tooltip-trigger-width": "var(--radix-popper-anchor-width)",
                    "--radix-tooltip-trigger-height": "var(--radix-popper-anchor-height)"
                },
                children: [P.jsx(Fb, {
                    children: r
                }), P.jsx(Vb, {
                    scope: n,
                    isInside: !0,
                    children: P.jsx(TC, {
                        id: l.contentId,
                        role: "tooltip",
                        children: o || r
                    })
                })]
            })
        })
    });
tw.displayName = _o;
var rw = "TooltipArrow",
    zb = x.forwardRef((e, t) => {
        const {
            __scopeTooltip: n,
            ...r
        } = e, o = Tf(n);
        return jb(rw, n).isInside ? null : P.jsx(Mb, {
            ...o,
            ...r,
            ref: t
        })
    });
zb.displayName = rw;

function $b(e, t) {
    const n = Math.abs(t.top - e.y),
        r = Math.abs(t.bottom - e.y),
        o = Math.abs(t.right - e.x),
        i = Math.abs(t.left - e.x);
    switch (Math.min(n, r, o, i)) {
        case i:
            return "left";
        case o:
            return "right";
        case n:
            return "top";
        case r:
            return "bottom";
        default:
            throw new Error("unreachable")
    }
}

function Bb(e, t, n = 5) {
    const r = [];
    switch (t) {
        case "top":
            r.push({
                x: e.x - n,
                y: e.y + n
            }, {
                x: e.x + n,
                y: e.y + n
            });
            break;
        case "bottom":
            r.push({
                x: e.x - n,
                y: e.y - n
            }, {
                x: e.x + n,
                y: e.y - n
            });
            break;
        case "left":
            r.push({
                x: e.x + n,
                y: e.y - n
            }, {
                x: e.x + n,
                y: e.y + n
            });
            break;
        case "right":
            r.push({
                x: e.x - n,
                y: e.y - n
            }, {
                x: e.x - n,
                y: e.y + n
            });
            break
    }
    return r
}

function Ub(e) {
    const {
        top: t,
        right: n,
        bottom: r,
        left: o
    } = e;
    return [{
        x: o,
        y: t
    }, {
        x: n,
        y: t
    }, {
        x: n,
        y: r
    }, {
        x: o,
        y: r
    }]
}

function Wb(e, t) {
    const {
        x: n,
        y: r
    } = e;
    let o = !1;
    for (let i = 0, s = t.length - 1; i < t.length; s = i++) {
        const a = t[i],
            l = t[s],
            u = a.x,
            c = a.y,
            d = l.x,
            h = l.y;
        c > r != h > r && n < (d - u) * (r - c) / (h - c) + u && (o = !o)
    }
    return o
}

function Hb(e) {
    const t = e.slice();
    return t.sort((n, r) => n.x < r.x ? -1 : n.x > r.x ? 1 : n.y < r.y ? -1 : n.y > r.y ? 1 : 0), Kb(t)
}

function Kb(e) {
    if (e.length <= 1) return e.slice();
    const t = [];
    for (let r = 0; r < e.length; r++) {
        const o = e[r];
        for (; t.length >= 2;) {
            const i = t[t.length - 1],
                s = t[t.length - 2];
            if ((i.x - s.x) * (o.y - s.y) >= (i.y - s.y) * (o.x - s.x)) t.pop();
            else break
        }
        t.push(o)
    }
    t.pop();
    const n = [];
    for (let r = e.length - 1; r >= 0; r--) {
        const o = e[r];
        for (; n.length >= 2;) {
            const i = n[n.length - 1],
                s = n[n.length - 2];
            if ((i.x - s.x) * (o.y - s.y) >= (i.y - s.y) * (o.x - s.x)) n.pop();
            else break
        }
        n.push(o)
    }
    return n.pop(), t.length === 1 && n.length === 1 && t[0].x === n[0].x && t[0].y === n[0].y ? t : t.concat(n)
}
var Gb = J0,
    ow = tw;
const Qb = Gb,
    Yb = x.forwardRef(({
        className: e,
        sideOffset: t = 4,
        ...n
    }, r) => P.jsx(ow, {
        ref: r,
        sideOffset: t,
        className: zr("z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", e),
        ...n
    }));
Yb.displayName = ow.displayName;
var El = class {
        constructor() {
            this.listeners = new Set, this.subscribe = this.subscribe.bind(this)
        }
        subscribe(e) {
            return this.listeners.add(e), this.onSubscribe(), () => {
                this.listeners.delete(e), this.onUnsubscribe()
            }
        }
        hasListeners() {
            return this.listeners.size > 0
        }
        onSubscribe() {}
        onUnsubscribe() {}
    },
    Cl = typeof window > "u" || "Deno" in globalThis;

function Rt() {}

function Xb(e, t) {
    return typeof e == "function" ? e(t) : e
}

function qb(e) {
    return typeof e == "number" && e >= 0 && e !== 1 / 0
}

function Zb(e, t) {
    return Math.max(e + (t || 0) - Date.now(), 0)
}

function _c(e, t) {
    return typeof e == "function" ? e(t) : e
}

function Jb(e, t) {
    return typeof e == "function" ? e(t) : e
}

function $p(e, t) {
    const {
        type: n = "all",
        exact: r,
        fetchStatus: o,
        predicate: i,
        queryKey: s,
        stale: a
    } = e;
    if (s) {
        if (r) {
            if (t.queryHash !== Pf(s, t.options)) return !1
        } else if (!Gi(t.queryKey, s)) return !1
    }
    if (n !== "all") {
        const l = t.isActive();
        if (n === "active" && !l || n === "inactive" && l) return !1
    }
    return !(typeof a == "boolean" && t.isStale() !== a || o && o !== t.state.fetchStatus || i && !i(t))
}

function Bp(e, t) {
    const {
        exact: n,
        status: r,
        predicate: o,
        mutationKey: i
    } = e;
    if (i) {
        if (!t.options.mutationKey) return !1;
        if (n) {
            if (Ki(t.options.mutationKey) !== Ki(i)) return !1
        } else if (!Gi(t.options.mutationKey, i)) return !1
    }
    return !(r && t.state.status !== r || o && !o(t))
}

function Pf(e, t) {
    return ((t == null ? void 0 : t.queryKeyHashFn) || Ki)(e)
}

function Ki(e) {
    return JSON.stringify(e, (t, n) => Vc(n) ? Object.keys(n).sort().reduce((r, o) => (r[o] = n[o], r), {}) : n)
}

function Gi(e, t) {
    return e === t ? !0 : typeof e != typeof t ? !1 : e && t && typeof e == "object" && typeof t == "object" ? Object.keys(t).every(n => Gi(e[n], t[n])) : !1
}

function iw(e, t) {
    if (e === t) return e;
    const n = Up(e) && Up(t);
    if (n || Vc(e) && Vc(t)) {
        const r = n ? e : Object.keys(e),
            o = r.length,
            i = n ? t : Object.keys(t),
            s = i.length,
            a = n ? [] : {},
            l = new Set(r);
        let u = 0;
        for (let c = 0; c < s; c++) {
            const d = n ? c : i[c];
            (!n && l.has(d) || n) && e[d] === void 0 && t[d] === void 0 ? (a[d] = void 0, u++) : (a[d] = iw(e[d], t[d]), a[d] === e[d] && e[d] !== void 0 && u++)
        }
        return o === s && u === o ? e : a
    }
    return t
}

function Up(e) {
    return Array.isArray(e) && e.length === Object.keys(e).length
}

function Vc(e) {
    if (!Wp(e)) return !1;
    const t = e.constructor;
    if (t === void 0) return !0;
    const n = t.prototype;
    return !(!Wp(n) || !n.hasOwnProperty("isPrototypeOf") || Object.getPrototypeOf(e) !== Object.prototype)
}

function Wp(e) {
    return Object.prototype.toString.call(e) === "[object Object]"
}

function ek(e) {
    return new Promise(t => {
        setTimeout(t, e)
    })
}

function tk(e, t, n) {
    return typeof n.structuralSharing == "function" ? n.structuralSharing(e, t) : n.structuralSharing !== !1 ? iw(e, t) : t
}

function nk(e, t, n = 0) {
    const r = [...e, t];
    return n && r.length > n ? r.slice(1) : r
}

function rk(e, t, n = 0) {
    const r = [t, ...e];
    return n && r.length > n ? r.slice(0, -1) : r
}
var bf = Symbol();

function sw(e, t) {
    return !e.queryFn && (t != null && t.initialPromise) ? () => t.initialPromise : !e.queryFn || e.queryFn === bf ? () => Promise.reject(new Error(`Missing queryFn: '${e.queryHash}'`)) : e.queryFn
}
var Er, In, xo, xg, ok = (xg = class extends El {
        constructor() {
            super();
            J(this, Er);
            J(this, In);
            J(this, xo);
            G(this, xo, t => {
                if (!Cl && window.addEventListener) {
                    const n = () => t();
                    return window.addEventListener("visibilitychange", n, !1), () => {
                        window.removeEventListener("visibilitychange", n)
                    }
                }
            })
        }
        onSubscribe() {
            M(this, In) || this.setEventListener(M(this, xo))
        }
        onUnsubscribe() {
            var t;
            this.hasListeners() || ((t = M(this, In)) == null || t.call(this), G(this, In, void 0))
        }
        setEventListener(t) {
            var n;
            G(this, xo, t), (n = M(this, In)) == null || n.call(this), G(this, In, t(r => {
                typeof r == "boolean" ? this.setFocused(r) : this.onFocus()
            }))
        }
        setFocused(t) {
            M(this, Er) !== t && (G(this, Er, t), this.onFocus())
        }
        onFocus() {
            const t = this.isFocused();
            this.listeners.forEach(n => {
                n(t)
            })
        }
        isFocused() {
            var t;
            return typeof M(this, Er) == "boolean" ? M(this, Er) : ((t = globalThis.document) == null ? void 0 : t.visibilityState) !== "hidden"
        }
    }, Er = new WeakMap, In = new WeakMap, xo = new WeakMap, xg),
    aw = new ok,
    So, _n, Eo, Sg, ik = (Sg = class extends El {
        constructor() {
            super();
            J(this, So, !0);
            J(this, _n);
            J(this, Eo);
            G(this, Eo, t => {
                if (!Cl && window.addEventListener) {
                    const n = () => t(!0),
                        r = () => t(!1);
                    return window.addEventListener("online", n, !1), window.addEventListener("offline", r, !1), () => {
                        window.removeEventListener("online", n), window.removeEventListener("offline", r)
                    }
                }
            })
        }
        onSubscribe() {
            M(this, _n) || this.setEventListener(M(this, Eo))
        }
        onUnsubscribe() {
            var t;
            this.hasListeners() || ((t = M(this, _n)) == null || t.call(this), G(this, _n, void 0))
        }
        setEventListener(t) {
            var n;
            G(this, Eo, t), (n = M(this, _n)) == null || n.call(this), G(this, _n, t(this.setOnline.bind(this)))
        }
        setOnline(t) {
            M(this, So) !== t && (G(this, So, t), this.listeners.forEach(r => {
                r(t)
            }))
        }
        isOnline() {
            return M(this, So)
        }
    }, So = new WeakMap, _n = new WeakMap, Eo = new WeakMap, Sg),
    za = new ik;

function sk() {
    let e, t;
    const n = new Promise((o, i) => {
        e = o, t = i
    });
    n.status = "pending", n.catch(() => {});

    function r(o) {
        Object.assign(n, o), delete n.resolve, delete n.reject
    }
    return n.resolve = o => {
        r({
            status: "fulfilled",
            value: o
        }), e(o)
    }, n.reject = o => {
        r({
            status: "rejected",
            reason: o
        }), t(o)
    }, n
}

function ak(e) {
    return Math.min(1e3 * 2 ** e, 3e4)
}

function lw(e) {
    return (e ?? "online") === "online" ? za.isOnline() : !0
}
var uw = class extends Error {
    constructor(e) {
        super("CancelledError"), this.revert = e == null ? void 0 : e.revert, this.silent = e == null ? void 0 : e.silent
    }
};

function gu(e) {
    return e instanceof uw
}

function cw(e) {
    let t = !1,
        n = 0,
        r = !1,
        o;
    const i = sk(),
        s = g => {
            var w;
            r || (h(new uw(g)), (w = e.abort) == null || w.call(e))
        },
        a = () => {
            t = !0
        },
        l = () => {
            t = !1
        },
        u = () => aw.isFocused() && (e.networkMode === "always" || za.isOnline()) && e.canRun(),
        c = () => lw(e.networkMode) && e.canRun(),
        d = g => {
            var w;
            r || (r = !0, (w = e.onSuccess) == null || w.call(e, g), o == null || o(), i.resolve(g))
        },
        h = g => {
            var w;
            r || (r = !0, (w = e.onError) == null || w.call(e, g), o == null || o(), i.reject(g))
        },
        f = () => new Promise(g => {
            var w;
            o = m => {
                (r || u()) && g(m)
            }, (w = e.onPause) == null || w.call(e)
        }).then(() => {
            var g;
            o = void 0, r || (g = e.onContinue) == null || g.call(e)
        }),
        v = () => {
            if (r) return;
            let g;
            const w = n === 0 ? e.initialPromise : void 0;
            try {
                g = w ?? e.fn()
            } catch (m) {
                g = Promise.reject(m)
            }
            Promise.resolve(g).then(d).catch(m => {
                var C;
                if (r) return;
                const p = e.retry ?? (Cl ? 0 : 3),
                    y = e.retryDelay ?? ak,
                    S = typeof y == "function" ? y(n, m) : y,
                    E = p === !0 || typeof p == "number" && n < p || typeof p == "function" && p(n, m);
                if (t || !E) {
                    h(m);
                    return
                }
                n++, (C = e.onFail) == null || C.call(e, n, m), ek(S).then(() => u() ? void 0 : f()).then(() => {
                    t ? h(m) : v()
                })
            })
        };
    return {
        promise: i,
        cancel: s,
        continue: () => (o == null || o(), i),
        cancelRetry: a,
        continueRetry: l,
        canStart: c,
        start: () => (c() ? v() : f().then(v), i)
    }
}
var lk = e => setTimeout(e, 0);

function uk() {
    let e = [],
        t = 0,
        n = a => {
            a()
        },
        r = a => {
            a()
        },
        o = lk;
    const i = a => {
            t ? e.push(a) : o(() => {
                n(a)
            })
        },
        s = () => {
            const a = e;
            e = [], a.length && o(() => {
                r(() => {
                    a.forEach(l => {
                        n(l)
                    })
                })
            })
        };
    return {
        batch: a => {
            let l;
            t++;
            try {
                l = a()
            } finally {
                t--, t || s()
            }
            return l
        },
        batchCalls: a => (...l) => {
            i(() => {
                a(...l)
            })
        },
        schedule: i,
        setNotifyFunction: a => {
            n = a
        },
        setBatchNotifyFunction: a => {
            r = a
        },
        setScheduler: a => {
            o = a
        }
    }
}
var $e = uk(),
    Cr, Eg, dw = (Eg = class {
        constructor() {
            J(this, Cr)
        }
        destroy() {
            this.clearGcTimeout()
        }
        scheduleGc() {
            this.clearGcTimeout(), qb(this.gcTime) && G(this, Cr, setTimeout(() => {
                this.optionalRemove()
            }, this.gcTime))
        }
        updateGcTime(e) {
            this.gcTime = Math.max(this.gcTime || 0, e ?? (Cl ? 1 / 0 : 5 * 60 * 1e3))
        }
        clearGcTimeout() {
            M(this, Cr) && (clearTimeout(M(this, Cr)), G(this, Cr, void 0))
        }
    }, Cr = new WeakMap, Eg),
    Co, Tr, dt, Pr, _e, Zi, br, At, rn, Cg, ck = (Cg = class extends dw {
        constructor(t) {
            super();
            J(this, At);
            J(this, Co);
            J(this, Tr);
            J(this, dt);
            J(this, Pr);
            J(this, _e);
            J(this, Zi);
            J(this, br);
            G(this, br, !1), G(this, Zi, t.defaultOptions), this.setOptions(t.options), this.observers = [], G(this, Pr, t.client), G(this, dt, M(this, Pr).getQueryCache()), this.queryKey = t.queryKey, this.queryHash = t.queryHash, G(this, Co, fk(this.options)), this.state = t.state ?? M(this, Co), this.scheduleGc()
        }
        get meta() {
            return this.options.meta
        }
        get promise() {
            var t;
            return (t = M(this, _e)) == null ? void 0 : t.promise
        }
        setOptions(t) {
            this.options = {
                ...M(this, Zi),
                ...t
            }, this.updateGcTime(this.options.gcTime)
        }
        optionalRemove() {
            !this.observers.length && this.state.fetchStatus === "idle" && M(this, dt).remove(this)
        }
        setData(t, n) {
            const r = tk(this.state.data, t, this.options);
            return Ne(this, At, rn).call(this, {
                data: r,
                type: "success",
                dataUpdatedAt: n == null ? void 0 : n.updatedAt,
                manual: n == null ? void 0 : n.manual
            }), r
        }
        setState(t, n) {
            Ne(this, At, rn).call(this, {
                type: "setState",
                state: t,
                setStateOptions: n
            })
        }
        cancel(t) {
            var r, o;
            const n = (r = M(this, _e)) == null ? void 0 : r.promise;
            return (o = M(this, _e)) == null || o.cancel(t), n ? n.then(Rt).catch(Rt) : Promise.resolve()
        }
        destroy() {
            super.destroy(), this.cancel({
                silent: !0
            })
        }
        reset() {
            this.destroy(), this.setState(M(this, Co))
        }
        isActive() {
            return this.observers.some(t => Jb(t.options.enabled, this) !== !1)
        }
        isDisabled() {
            return this.getObserversCount() > 0 ? !this.isActive() : this.options.queryFn === bf || this.state.dataUpdateCount + this.state.errorUpdateCount === 0
        }
        isStatic() {
            return this.getObserversCount() > 0 ? this.observers.some(t => _c(t.options.staleTime, this) === "static") : !1
        }
        isStale() {
            return this.getObserversCount() > 0 ? this.observers.some(t => t.getCurrentResult().isStale) : this.state.data === void 0 || this.state.isInvalidated
        }
        isStaleByTime(t = 0) {
            return this.state.data === void 0 ? !0 : t === "static" ? !1 : this.state.isInvalidated ? !0 : !Zb(this.state.dataUpdatedAt, t)
        }
        onFocus() {
            var n;
            const t = this.observers.find(r => r.shouldFetchOnWindowFocus());
            t == null || t.refetch({
                cancelRefetch: !1
            }), (n = M(this, _e)) == null || n.continue()
        }
        onOnline() {
            var n;
            const t = this.observers.find(r => r.shouldFetchOnReconnect());
            t == null || t.refetch({
                cancelRefetch: !1
            }), (n = M(this, _e)) == null || n.continue()
        }
        addObserver(t) {
            this.observers.includes(t) || (this.observers.push(t), this.clearGcTimeout(), M(this, dt).notify({
                type: "observerAdded",
                query: this,
                observer: t
            }))
        }
        removeObserver(t) {
            this.observers.includes(t) && (this.observers = this.observers.filter(n => n !== t), this.observers.length || (M(this, _e) && (M(this, br) ? M(this, _e).cancel({
                revert: !0
            }) : M(this, _e).cancelRetry()), this.scheduleGc()), M(this, dt).notify({
                type: "observerRemoved",
                query: this,
                observer: t
            }))
        }
        getObserversCount() {
            return this.observers.length
        }
        invalidate() {
            this.state.isInvalidated || Ne(this, At, rn).call(this, {
                type: "invalidate"
            })
        }
        fetch(t, n) {
            var u, c, d;
            if (this.state.fetchStatus !== "idle") {
                if (this.state.data !== void 0 && (n != null && n.cancelRefetch)) this.cancel({
                    silent: !0
                });
                else if (M(this, _e)) return M(this, _e).continueRetry(), M(this, _e).promise
            }
            if (t && this.setOptions(t), !this.options.queryFn) {
                const h = this.observers.find(f => f.options.queryFn);
                h && this.setOptions(h.options)
            }
            const r = new AbortController,
                o = h => {
                    Object.defineProperty(h, "signal", {
                        enumerable: !0,
                        get: () => (G(this, br, !0), r.signal)
                    })
                },
                i = () => {
                    const h = sw(this.options, n),
                        v = (() => {
                            const g = {
                                client: M(this, Pr),
                                queryKey: this.queryKey,
                                meta: this.meta
                            };
                            return o(g), g
                        })();
                    return G(this, br, !1), this.options.persister ? this.options.persister(h, v, this) : h(v)
                },
                a = (() => {
                    const h = {
                        fetchOptions: n,
                        options: this.options,
                        queryKey: this.queryKey,
                        client: M(this, Pr),
                        state: this.state,
                        fetchFn: i
                    };
                    return o(h), h
                })();
            (u = this.options.behavior) == null || u.onFetch(a, this), G(this, Tr, this.state), (this.state.fetchStatus === "idle" || this.state.fetchMeta !== ((c = a.fetchOptions) == null ? void 0 : c.meta)) && Ne(this, At, rn).call(this, {
                type: "fetch",
                meta: (d = a.fetchOptions) == null ? void 0 : d.meta
            });
            const l = h => {
                var f, v, g, w;
                gu(h) && h.silent || Ne(this, At, rn).call(this, {
                    type: "error",
                    error: h
                }), gu(h) || ((v = (f = M(this, dt).config).onError) == null || v.call(f, h, this), (w = (g = M(this, dt).config).onSettled) == null || w.call(g, this.state.data, h, this)), this.scheduleGc()
            };
            return G(this, _e, cw({
                initialPromise: n == null ? void 0 : n.initialPromise,
                fn: a.fetchFn,
                abort: r.abort.bind(r),
                onSuccess: h => {
                    var f, v, g, w;
                    if (h === void 0) {
                        l(new Error(`${this.queryHash} data is undefined`));
                        return
                    }
                    try {
                        this.setData(h)
                    } catch (m) {
                        l(m);
                        return
                    }(v = (f = M(this, dt).config).onSuccess) == null || v.call(f, h, this), (w = (g = M(this, dt).config).onSettled) == null || w.call(g, h, this.state.error, this), this.scheduleGc()
                },
                onError: l,
                onFail: (h, f) => {
                    Ne(this, At, rn).call(this, {
                        type: "failed",
                        failureCount: h,
                        error: f
                    })
                },
                onPause: () => {
                    Ne(this, At, rn).call(this, {
                        type: "pause"
                    })
                },
                onContinue: () => {
                    Ne(this, At, rn).call(this, {
                        type: "continue"
                    })
                },
                retry: a.options.retry,
                retryDelay: a.options.retryDelay,
                networkMode: a.options.networkMode,
                canRun: () => !0
            })), M(this, _e).start()
        }
    }, Co = new WeakMap, Tr = new WeakMap, dt = new WeakMap, Pr = new WeakMap, _e = new WeakMap, Zi = new WeakMap, br = new WeakMap, At = new WeakSet, rn = function(t) {
        const n = r => {
            switch (t.type) {
                case "failed":
                    return {
                        ...r, fetchFailureCount: t.failureCount, fetchFailureReason: t.error
                    };
                case "pause":
                    return {
                        ...r, fetchStatus: "paused"
                    };
                case "continue":
                    return {
                        ...r, fetchStatus: "fetching"
                    };
                case "fetch":
                    return {
                        ...r, ...dk(r.data, this.options), fetchMeta: t.meta ?? null
                    };
                case "success":
                    return G(this, Tr, void 0), {
                        ...r,
                        data: t.data,
                        dataUpdateCount: r.dataUpdateCount + 1,
                        dataUpdatedAt: t.dataUpdatedAt ?? Date.now(),
                        error: null,
                        isInvalidated: !1,
                        status: "success",
                        ...!t.manual && {
                            fetchStatus: "idle",
                            fetchFailureCount: 0,
                            fetchFailureReason: null
                        }
                    };
                case "error":
                    const o = t.error;
                    return gu(o) && o.revert && M(this, Tr) ? {
                        ...M(this, Tr),
                        fetchStatus: "idle"
                    } : {
                        ...r,
                        error: o,
                        errorUpdateCount: r.errorUpdateCount + 1,
                        errorUpdatedAt: Date.now(),
                        fetchFailureCount: r.fetchFailureCount + 1,
                        fetchFailureReason: o,
                        fetchStatus: "idle",
                        status: "error"
                    };
                case "invalidate":
                    return {
                        ...r, isInvalidated: !0
                    };
                case "setState":
                    return {
                        ...r, ...t.state
                    }
            }
        };
        this.state = n(this.state), $e.batch(() => {
            this.observers.forEach(r => {
                r.onQueryUpdate()
            }), M(this, dt).notify({
                query: this,
                type: "updated",
                action: t
            })
        })
    }, Cg);

function dk(e, t) {
    return {
        fetchFailureCount: 0,
        fetchFailureReason: null,
        fetchStatus: lw(t.networkMode) ? "fetching" : "paused",
        ...e === void 0 && {
            error: null,
            status: "pending"
        }
    }
}

function fk(e) {
    const t = typeof e.initialData == "function" ? e.initialData() : e.initialData,
        n = t !== void 0,
        r = n ? typeof e.initialDataUpdatedAt == "function" ? e.initialDataUpdatedAt() : e.initialDataUpdatedAt : 0;
    return {
        data: t,
        dataUpdateCount: 0,
        dataUpdatedAt: n ? r ?? Date.now() : 0,
        error: null,
        errorUpdateCount: 0,
        errorUpdatedAt: 0,
        fetchFailureCount: 0,
        fetchFailureReason: null,
        fetchMeta: null,
        isInvalidated: !1,
        status: n ? "success" : "pending",
        fetchStatus: "idle"
    }
}
var Ut, Tg, hk = (Tg = class extends El {
        constructor(t = {}) {
            super();
            J(this, Ut);
            this.config = t, G(this, Ut, new Map)
        }
        build(t, n, r) {
            const o = n.queryKey,
                i = n.queryHash ?? Pf(o, n);
            let s = this.get(i);
            return s || (s = new ck({
                client: t,
                queryKey: o,
                queryHash: i,
                options: t.defaultQueryOptions(n),
                state: r,
                defaultOptions: t.getQueryDefaults(o)
            }), this.add(s)), s
        }
        add(t) {
            M(this, Ut).has(t.queryHash) || (M(this, Ut).set(t.queryHash, t), this.notify({
                type: "added",
                query: t
            }))
        }
        remove(t) {
            const n = M(this, Ut).get(t.queryHash);
            n && (t.destroy(), n === t && M(this, Ut).delete(t.queryHash), this.notify({
                type: "removed",
                query: t
            }))
        }
        clear() {
            $e.batch(() => {
                this.getAll().forEach(t => {
                    this.remove(t)
                })
            })
        }
        get(t) {
            return M(this, Ut).get(t)
        }
        getAll() {
            return [...M(this, Ut).values()]
        }
        find(t) {
            const n = {
                exact: !0,
                ...t
            };
            return this.getAll().find(r => $p(n, r))
        }
        findAll(t = {}) {
            const n = this.getAll();
            return Object.keys(t).length > 0 ? n.filter(r => $p(t, r)) : n
        }
        notify(t) {
            $e.batch(() => {
                this.listeners.forEach(n => {
                    n(t)
                })
            })
        }
        onFocus() {
            $e.batch(() => {
                this.getAll().forEach(t => {
                    t.onFocus()
                })
            })
        }
        onOnline() {
            $e.batch(() => {
                this.getAll().forEach(t => {
                    t.onOnline()
                })
            })
        }
    }, Ut = new WeakMap, Tg),
    Wt, Fe, kr, Ht, Rn, Pg, pk = (Pg = class extends dw {
        constructor(t) {
            super();
            J(this, Ht);
            J(this, Wt);
            J(this, Fe);
            J(this, kr);
            this.mutationId = t.mutationId, G(this, Fe, t.mutationCache), G(this, Wt, []), this.state = t.state || mk(), this.setOptions(t.options), this.scheduleGc()
        }
        setOptions(t) {
            this.options = t, this.updateGcTime(this.options.gcTime)
        }
        get meta() {
            return this.options.meta
        }
        addObserver(t) {
            M(this, Wt).includes(t) || (M(this, Wt).push(t), this.clearGcTimeout(), M(this, Fe).notify({
                type: "observerAdded",
                mutation: this,
                observer: t
            }))
        }
        removeObserver(t) {
            G(this, Wt, M(this, Wt).filter(n => n !== t)), this.scheduleGc(), M(this, Fe).notify({
                type: "observerRemoved",
                mutation: this,
                observer: t
            })
        }
        optionalRemove() {
            M(this, Wt).length || (this.state.status === "pending" ? this.scheduleGc() : M(this, Fe).remove(this))
        }
        continue () {
            var t;
            return ((t = M(this, kr)) == null ? void 0 : t.continue()) ?? this.execute(this.state.variables)
        }
        async execute(t) {
            var i, s, a, l, u, c, d, h, f, v, g, w, m, p, y, S, E, C, T, b;
            const n = () => {
                Ne(this, Ht, Rn).call(this, {
                    type: "continue"
                })
            };
            G(this, kr, cw({
                fn: () => this.options.mutationFn ? this.options.mutationFn(t) : Promise.reject(new Error("No mutationFn found")),
                onFail: (D, R) => {
                    Ne(this, Ht, Rn).call(this, {
                        type: "failed",
                        failureCount: D,
                        error: R
                    })
                },
                onPause: () => {
                    Ne(this, Ht, Rn).call(this, {
                        type: "pause"
                    })
                },
                onContinue: n,
                retry: this.options.retry ?? 0,
                retryDelay: this.options.retryDelay,
                networkMode: this.options.networkMode,
                canRun: () => M(this, Fe).canRun(this)
            }));
            const r = this.state.status === "pending",
                o = !M(this, kr).canStart();
            try {
                if (r) n();
                else {
                    Ne(this, Ht, Rn).call(this, {
                        type: "pending",
                        variables: t,
                        isPaused: o
                    }), await ((s = (i = M(this, Fe).config).onMutate) == null ? void 0 : s.call(i, t, this));
                    const R = await ((l = (a = this.options).onMutate) == null ? void 0 : l.call(a, t));
                    R !== this.state.context && Ne(this, Ht, Rn).call(this, {
                        type: "pending",
                        context: R,
                        variables: t,
                        isPaused: o
                    })
                }
                const D = await M(this, kr).start();
                return await ((c = (u = M(this, Fe).config).onSuccess) == null ? void 0 : c.call(u, D, t, this.state.context, this)), await ((h = (d = this.options).onSuccess) == null ? void 0 : h.call(d, D, t, this.state.context)), await ((v = (f = M(this, Fe).config).onSettled) == null ? void 0 : v.call(f, D, null, this.state.variables, this.state.context, this)), await ((w = (g = this.options).onSettled) == null ? void 0 : w.call(g, D, null, t, this.state.context)), Ne(this, Ht, Rn).call(this, {
                    type: "success",
                    data: D
                }), D
            } catch (D) {
                try {
                    throw await ((p = (m = M(this, Fe).config).onError) == null ? void 0 : p.call(m, D, t, this.state.context, this)), await ((S = (y = this.options).onError) == null ? void 0 : S.call(y, D, t, this.state.context)), await ((C = (E = M(this, Fe).config).onSettled) == null ? void 0 : C.call(E, void 0, D, this.state.variables, this.state.context, this)), await ((b = (T = this.options).onSettled) == null ? void 0 : b.call(T, void 0, D, t, this.state.context)), D
                } finally {
                    Ne(this, Ht, Rn).call(this, {
                        type: "error",
                        error: D
                    })
                }
            } finally {
                M(this, Fe).runNext(this)
            }
        }
    }, Wt = new WeakMap, Fe = new WeakMap, kr = new WeakMap, Ht = new WeakSet, Rn = function(t) {
        const n = r => {
            switch (t.type) {
                case "failed":
                    return {
                        ...r, failureCount: t.failureCount, failureReason: t.error
                    };
                case "pause":
                    return {
                        ...r, isPaused: !0
                    };
                case "continue":
                    return {
                        ...r, isPaused: !1
                    };
                case "pending":
                    return {
                        ...r, context: t.context, data: void 0, failureCount: 0, failureReason: null, error: null, isPaused: t.isPaused, status: "pending", variables: t.variables, submittedAt: Date.now()
                    };
                case "success":
                    return {
                        ...r, data: t.data, failureCount: 0, failureReason: null, error: null, status: "success", isPaused: !1
                    };
                case "error":
                    return {
                        ...r, data: void 0, error: t.error, failureCount: r.failureCount + 1, failureReason: t.error, isPaused: !1, status: "error"
                    }
            }
        };
        this.state = n(this.state), $e.batch(() => {
            M(this, Wt).forEach(r => {
                r.onMutationUpdate(t)
            }), M(this, Fe).notify({
                mutation: this,
                type: "updated",
                action: t
            })
        })
    }, Pg);

function mk() {
    return {
        context: void 0,
        data: void 0,
        error: null,
        failureCount: 0,
        failureReason: null,
        isPaused: !1,
        status: "idle",
        variables: void 0,
        submittedAt: 0
    }
}
var ln, Mt, Ji, bg, gk = (bg = class extends El {
    constructor(t = {}) {
        super();
        J(this, ln);
        J(this, Mt);
        J(this, Ji);
        this.config = t, G(this, ln, new Set), G(this, Mt, new Map), G(this, Ji, 0)
    }
    build(t, n, r) {
        const o = new pk({
            mutationCache: this,
            mutationId: ++ms(this, Ji)._,
            options: t.defaultMutationOptions(n),
            state: r
        });
        return this.add(o), o
    }
    add(t) {
        M(this, ln).add(t);
        const n = Vs(t);
        if (typeof n == "string") {
            const r = M(this, Mt).get(n);
            r ? r.push(t) : M(this, Mt).set(n, [t])
        }
        this.notify({
            type: "added",
            mutation: t
        })
    }
    remove(t) {
        if (M(this, ln).delete(t)) {
            const n = Vs(t);
            if (typeof n == "string") {
                const r = M(this, Mt).get(n);
                if (r)
                    if (r.length > 1) {
                        const o = r.indexOf(t);
                        o !== -1 && r.splice(o, 1)
                    } else r[0] === t && M(this, Mt).delete(n)
            }
        }
        this.notify({
            type: "removed",
            mutation: t
        })
    }
    canRun(t) {
        const n = Vs(t);
        if (typeof n == "string") {
            const r = M(this, Mt).get(n),
                o = r == null ? void 0 : r.find(i => i.state.status === "pending");
            return !o || o === t
        } else return !0
    }
    runNext(t) {
        var r;
        const n = Vs(t);
        if (typeof n == "string") {
            const o = (r = M(this, Mt).get(n)) == null ? void 0 : r.find(i => i !== t && i.state.isPaused);
            return (o == null ? void 0 : o.continue()) ?? Promise.resolve()
        } else return Promise.resolve()
    }
    clear() {
        $e.batch(() => {
            M(this, ln).forEach(t => {
                this.notify({
                    type: "removed",
                    mutation: t
                })
            }), M(this, ln).clear(), M(this, Mt).clear()
        })
    }
    getAll() {
        return Array.from(M(this, ln))
    }
    find(t) {
        const n = {
            exact: !0,
            ...t
        };
        return this.getAll().find(r => Bp(n, r))
    }
    findAll(t = {}) {
        return this.getAll().filter(n => Bp(t, n))
    }
    notify(t) {
        $e.batch(() => {
            this.listeners.forEach(n => {
                n(t)
            })
        })
    }
    resumePausedMutations() {
        const t = this.getAll().filter(n => n.state.isPaused);
        return $e.batch(() => Promise.all(t.map(n => n.continue().catch(Rt))))
    }
}, ln = new WeakMap, Mt = new WeakMap, Ji = new WeakMap, bg);

function Vs(e) {
    var t;
    return (t = e.options.scope) == null ? void 0 : t.id
}

function Hp(e) {
    return {
        onFetch: (t, n) => {
            var c, d, h, f, v;
            const r = t.options,
                o = (h = (d = (c = t.fetchOptions) == null ? void 0 : c.meta) == null ? void 0 : d.fetchMore) == null ? void 0 : h.direction,
                i = ((f = t.state.data) == null ? void 0 : f.pages) || [],
                s = ((v = t.state.data) == null ? void 0 : v.pageParams) || [];
            let a = {
                    pages: [],
                    pageParams: []
                },
                l = 0;
            const u = async () => {
                let g = !1;
                const w = y => {
                        Object.defineProperty(y, "signal", {
                            enumerable: !0,
                            get: () => (t.signal.aborted ? g = !0 : t.signal.addEventListener("abort", () => {
                                g = !0
                            }), t.signal)
                        })
                    },
                    m = sw(t.options, t.fetchOptions),
                    p = async (y, S, E) => {
                        if (g) return Promise.reject();
                        if (S == null && y.pages.length) return Promise.resolve(y);
                        const T = (() => {
                                const V = {
                                    client: t.client,
                                    queryKey: t.queryKey,
                                    pageParam: S,
                                    direction: E ? "backward" : "forward",
                                    meta: t.options.meta
                                };
                                return w(V), V
                            })(),
                            b = await m(T),
                            {
                                maxPages: D
                            } = t.options,
                            R = E ? rk : nk;
                        return {
                            pages: R(y.pages, b, D),
                            pageParams: R(y.pageParams, S, D)
                        }
                    };
                if (o && i.length) {
                    const y = o === "backward",
                        S = y ? yk : Kp,
                        E = {
                            pages: i,
                            pageParams: s
                        },
                        C = S(r, E);
                    a = await p(E, C, y)
                } else {
                    const y = e ?? i.length;
                    do {
                        const S = l === 0 ? s[0] ?? r.initialPageParam : Kp(r, a);
                        if (l > 0 && S == null) break;
                        a = await p(a, S), l++
                    } while (l < y)
                }
                return a
            };
            t.options.persister ? t.fetchFn = () => {
                var g, w;
                return (w = (g = t.options).persister) == null ? void 0 : w.call(g, u, {
                    client: t.client,
                    queryKey: t.queryKey,
                    meta: t.options.meta,
                    signal: t.signal
                }, n)
            } : t.fetchFn = u
        }
    }
}

function Kp(e, {
    pages: t,
    pageParams: n
}) {
    const r = t.length - 1;
    return t.length > 0 ? e.getNextPageParam(t[r], t, n[r], n) : void 0
}

function yk(e, {
    pages: t,
    pageParams: n
}) {
    var r;
    return t.length > 0 ? (r = e.getPreviousPageParam) == null ? void 0 : r.call(e, t[0], t, n[0], n) : void 0
}
var me, Vn, jn, To, Po, Fn, bo, ko, kg, vk = (kg = class {
        constructor(e = {}) {
            J(this, me);
            J(this, Vn);
            J(this, jn);
            J(this, To);
            J(this, Po);
            J(this, Fn);
            J(this, bo);
            J(this, ko);
            G(this, me, e.queryCache || new hk), G(this, Vn, e.mutationCache || new gk), G(this, jn, e.defaultOptions || {}), G(this, To, new Map), G(this, Po, new Map), G(this, Fn, 0)
        }
        mount() {
            ms(this, Fn)._++, M(this, Fn) === 1 && (G(this, bo, aw.subscribe(async e => {
                e && (await this.resumePausedMutations(), M(this, me).onFocus())
            })), G(this, ko, za.subscribe(async e => {
                e && (await this.resumePausedMutations(), M(this, me).onOnline())
            })))
        }
        unmount() {
            var e, t;
            ms(this, Fn)._--, M(this, Fn) === 0 && ((e = M(this, bo)) == null || e.call(this), G(this, bo, void 0), (t = M(this, ko)) == null || t.call(this), G(this, ko, void 0))
        }
        isFetching(e) {
            return M(this, me).findAll({
                ...e,
                fetchStatus: "fetching"
            }).length
        }
        isMutating(e) {
            return M(this, Vn).findAll({
                ...e,
                status: "pending"
            }).length
        }
        getQueryData(e) {
            var n;
            const t = this.defaultQueryOptions({
                queryKey: e
            });
            return (n = M(this, me).get(t.queryHash)) == null ? void 0 : n.state.data
        }
        ensureQueryData(e) {
            const t = this.defaultQueryOptions(e),
                n = M(this, me).build(this, t),
                r = n.state.data;
            return r === void 0 ? this.fetchQuery(e) : (e.revalidateIfStale && n.isStaleByTime(_c(t.staleTime, n)) && this.prefetchQuery(t), Promise.resolve(r))
        }
        getQueriesData(e) {
            return M(this, me).findAll(e).map(({
                queryKey: t,
                state: n
            }) => {
                const r = n.data;
                return [t, r]
            })
        }
        setQueryData(e, t, n) {
            const r = this.defaultQueryOptions({
                    queryKey: e
                }),
                o = M(this, me).get(r.queryHash),
                i = o == null ? void 0 : o.state.data,
                s = Xb(t, i);
            if (s !== void 0) return M(this, me).build(this, r).setData(s, {
                ...n,
                manual: !0
            })
        }
        setQueriesData(e, t, n) {
            return $e.batch(() => M(this, me).findAll(e).map(({
                queryKey: r
            }) => [r, this.setQueryData(r, t, n)]))
        }
        getQueryState(e) {
            var n;
            const t = this.defaultQueryOptions({
                queryKey: e
            });
            return (n = M(this, me).get(t.queryHash)) == null ? void 0 : n.state
        }
        removeQueries(e) {
            const t = M(this, me);
            $e.batch(() => {
                t.findAll(e).forEach(n => {
                    t.remove(n)
                })
            })
        }
        resetQueries(e, t) {
            const n = M(this, me);
            return $e.batch(() => (n.findAll(e).forEach(r => {
                r.reset()
            }), this.refetchQueries({
                type: "active",
                ...e
            }, t)))
        }
        cancelQueries(e, t = {}) {
            const n = {
                    revert: !0,
                    ...t
                },
                r = $e.batch(() => M(this, me).findAll(e).map(o => o.cancel(n)));
            return Promise.all(r).then(Rt).catch(Rt)
        }
        invalidateQueries(e, t = {}) {
            return $e.batch(() => (M(this, me).findAll(e).forEach(n => {
                n.invalidate()
            }), (e == null ? void 0 : e.refetchType) === "none" ? Promise.resolve() : this.refetchQueries({
                ...e,
                type: (e == null ? void 0 : e.refetchType) ?? (e == null ? void 0 : e.type) ?? "active"
            }, t)))
        }
        refetchQueries(e, t = {}) {
            const n = {
                    ...t,
                    cancelRefetch: t.cancelRefetch ?? !0
                },
                r = $e.batch(() => M(this, me).findAll(e).filter(o => !o.isDisabled() && !o.isStatic()).map(o => {
                    let i = o.fetch(void 0, n);
                    return n.throwOnError || (i = i.catch(Rt)), o.state.fetchStatus === "paused" ? Promise.resolve() : i
                }));
            return Promise.all(r).then(Rt)
        }
        fetchQuery(e) {
            const t = this.defaultQueryOptions(e);
            t.retry === void 0 && (t.retry = !1);
            const n = M(this, me).build(this, t);
            return n.isStaleByTime(_c(t.staleTime, n)) ? n.fetch(t) : Promise.resolve(n.state.data)
        }
        prefetchQuery(e) {
            return this.fetchQuery(e).then(Rt).catch(Rt)
        }
        fetchInfiniteQuery(e) {
            return e.behavior = Hp(e.pages), this.fetchQuery(e)
        }
        prefetchInfiniteQuery(e) {
            return this.fetchInfiniteQuery(e).then(Rt).catch(Rt)
        }
        ensureInfiniteQueryData(e) {
            return e.behavior = Hp(e.pages), this.ensureQueryData(e)
        }
        resumePausedMutations() {
            return za.isOnline() ? M(this, Vn).resumePausedMutations() : Promise.resolve()
        }
        getQueryCache() {
            return M(this, me)
        }
        getMutationCache() {
            return M(this, Vn)
        }
        getDefaultOptions() {
            return M(this, jn)
        }
        setDefaultOptions(e) {
            G(this, jn, e)
        }
        setQueryDefaults(e, t) {
            M(this, To).set(Ki(e), {
                queryKey: e,
                defaultOptions: t
            })
        }
        getQueryDefaults(e) {
            const t = [...M(this, To).values()],
                n = {};
            return t.forEach(r => {
                Gi(e, r.queryKey) && Object.assign(n, r.defaultOptions)
            }), n
        }
        setMutationDefaults(e, t) {
            M(this, Po).set(Ki(e), {
                mutationKey: e,
                defaultOptions: t
            })
        }
        getMutationDefaults(e) {
            const t = [...M(this, Po).values()],
                n = {};
            return t.forEach(r => {
                Gi(e, r.mutationKey) && Object.assign(n, r.defaultOptions)
            }), n
        }
        defaultQueryOptions(e) {
            if (e._defaulted) return e;
            const t = {
                ...M(this, jn).queries,
                ...this.getQueryDefaults(e.queryKey),
                ...e,
                _defaulted: !0
            };
            return t.queryHash || (t.queryHash = Pf(t.queryKey, t)), t.refetchOnReconnect === void 0 && (t.refetchOnReconnect = t.networkMode !== "always"), t.throwOnError === void 0 && (t.throwOnError = !!t.suspense), !t.networkMode && t.persister && (t.networkMode = "offlineFirst"), t.queryFn === bf && (t.enabled = !1), t
        }
        defaultMutationOptions(e) {
            return e != null && e._defaulted ? e : {
                ...M(this, jn).mutations,
                ...(e == null ? void 0 : e.mutationKey) && this.getMutationDefaults(e.mutationKey),
                ...e,
                _defaulted: !0
            }
        }
        clear() {
            M(this, me).clear(), M(this, Vn).clear()
        }
    }, me = new WeakMap, Vn = new WeakMap, jn = new WeakMap, To = new WeakMap, Po = new WeakMap, Fn = new WeakMap, bo = new WeakMap, ko = new WeakMap, kg),
    wk = x.createContext(void 0),
    xk = ({
        client: e,
        children: t
    }) => (x.useEffect(() => (e.mount(), () => {
        e.unmount()
    }), [e]), P.jsx(wk.Provider, {
        value: e,
        children: t
    }));
/**
 * @remix-run/router v1.23.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function $a() {
    return $a = Object.assign ? Object.assign.bind() : function(e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
        }
        return e
    }, $a.apply(this, arguments)
}
var Bn;
(function(e) {
    e.Pop = "POP", e.Push = "PUSH", e.Replace = "REPLACE"
})(Bn || (Bn = {}));
const Gp = "popstate";

function Sk(e) {
    e === void 0 && (e = {});

    function t(r, o) {
        let {
            pathname: i,
            search: s,
            hash: a
        } = r.location;
        return jc("", {
            pathname: i,
            search: s,
            hash: a
        }, o.state && o.state.usr || null, o.state && o.state.key || "default")
    }

    function n(r, o) {
        return typeof o == "string" ? o : hw(o)
    }
    return Ck(t, n, null, e)
}

function et(e, t) {
    if (e === !1 || e === null || typeof e > "u") throw new Error(t)
}

function fw(e, t) {
    if (!e) {
        typeof console < "u" && console.warn(t);
        try {
            throw new Error(t)
        } catch {}
    }
}

function Ek() {
    return Math.random().toString(36).substr(2, 8)
}

function Qp(e, t) {
    return {
        usr: e.state,
        key: e.key,
        idx: t
    }
}

function jc(e, t, n, r) {
    return n === void 0 && (n = null), $a({
        pathname: typeof e == "string" ? e : e.pathname,
        search: "",
        hash: ""
    }, typeof t == "string" ? Tl(t) : t, {
        state: n,
        key: t && t.key || r || Ek()
    })
}

function hw(e) {
    let {
        pathname: t = "/",
        search: n = "",
        hash: r = ""
    } = e;
    return n && n !== "?" && (t += n.charAt(0) === "?" ? n : "?" + n), r && r !== "#" && (t += r.charAt(0) === "#" ? r : "#" + r), t
}

function Tl(e) {
    let t = {};
    if (e) {
        let n = e.indexOf("#");
        n >= 0 && (t.hash = e.substr(n), e = e.substr(0, n));
        let r = e.indexOf("?");
        r >= 0 && (t.search = e.substr(r), e = e.substr(0, r)), e && (t.pathname = e)
    }
    return t
}

function Ck(e, t, n, r) {
    r === void 0 && (r = {});
    let {
        window: o = document.defaultView,
        v5Compat: i = !1
    } = r, s = o.history, a = Bn.Pop, l = null, u = c();
    u == null && (u = 0, s.replaceState($a({}, s.state, {
        idx: u
    }), ""));

    function c() {
        return (s.state || {
            idx: null
        }).idx
    }

    function d() {
        a = Bn.Pop;
        let w = c(),
            m = w == null ? null : w - u;
        u = w, l && l({
            action: a,
            location: g.location,
            delta: m
        })
    }

    function h(w, m) {
        a = Bn.Push;
        let p = jc(g.location, w, m);
        u = c() + 1;
        let y = Qp(p, u),
            S = g.createHref(p);
        try {
            s.pushState(y, "", S)
        } catch (E) {
            if (E instanceof DOMException && E.name === "DataCloneError") throw E;
            o.location.assign(S)
        }
        i && l && l({
            action: a,
            location: g.location,
            delta: 1
        })
    }

    function f(w, m) {
        a = Bn.Replace;
        let p = jc(g.location, w, m);
        u = c();
        let y = Qp(p, u),
            S = g.createHref(p);
        s.replaceState(y, "", S), i && l && l({
            action: a,
            location: g.location,
            delta: 0
        })
    }

    function v(w) {
        let m = o.location.origin !== "null" ? o.location.origin : o.location.href,
            p = typeof w == "string" ? w : hw(w);
        return p = p.replace(/ $/, "%20"), et(m, "No window.location.(origin|href) available to create URL for href: " + p), new URL(p, m)
    }
    let g = {
        get action() {
            return a
        },
        get location() {
            return e(o, s)
        },
        listen(w) {
            if (l) throw new Error("A history only accepts one active listener");
            return o.addEventListener(Gp, d), l = w, () => {
                o.removeEventListener(Gp, d), l = null
            }
        },
        createHref(w) {
            return t(o, w)
        },
        createURL: v,
        encodeLocation(w) {
            let m = v(w);
            return {
                pathname: m.pathname,
                search: m.search,
                hash: m.hash
            }
        },
        push: h,
        replace: f,
        go(w) {
            return s.go(w)
        }
    };
    return g
}
var Yp;
(function(e) {
    e.data = "data", e.deferred = "deferred", e.redirect = "redirect", e.error = "error"
})(Yp || (Yp = {}));

function Tk(e, t, n) {
    return n === void 0 && (n = "/"), Pk(e, t, n, !1)
}

function Pk(e, t, n, r) {
    let o = typeof t == "string" ? Tl(t) : t,
        i = gw(o.pathname || "/", n);
    if (i == null) return null;
    let s = pw(e);
    bk(s);
    let a = null;
    for (let l = 0; a == null && l < s.length; ++l) {
        let u = Vk(i);
        a = Ik(s[l], u, r)
    }
    return a
}

function pw(e, t, n, r) {
    t === void 0 && (t = []), n === void 0 && (n = []), r === void 0 && (r = "");
    let o = (i, s, a) => {
        let l = {
            relativePath: a === void 0 ? i.path || "" : a,
            caseSensitive: i.caseSensitive === !0,
            childrenIndex: s,
            route: i
        };
        l.relativePath.startsWith("/") && (et(l.relativePath.startsWith(r), 'Absolute route path "' + l.relativePath + '" nested under path ' + ('"' + r + '" is not valid. An absolute child route path ') + "must start with the combined path of all its parent routes."), l.relativePath = l.relativePath.slice(r.length));
        let u = wo([r, l.relativePath]),
            c = n.concat(l);
        i.children && i.children.length > 0 && (et(i.index !== !0, "Index routes must not have child routes. Please remove " + ('all child routes from route path "' + u + '".')), pw(i.children, t, c, u)), !(i.path == null && !i.index) && t.push({
            path: u,
            score: Nk(u, i.index),
            routesMeta: c
        })
    };
    return e.forEach((i, s) => {
        var a;
        if (i.path === "" || !((a = i.path) != null && a.includes("?"))) o(i, s);
        else
            for (let l of mw(i.path)) o(i, s, l)
    }), t
}

function mw(e) {
    let t = e.split("/");
    if (t.length === 0) return [];
    let [n, ...r] = t, o = n.endsWith("?"), i = n.replace(/\?$/, "");
    if (r.length === 0) return o ? [i, ""] : [i];
    let s = mw(r.join("/")),
        a = [];
    return a.push(...s.map(l => l === "" ? i : [i, l].join("/"))), o && a.push(...s), a.map(l => e.startsWith("/") && l === "" ? "/" : l)
}

function bk(e) {
    e.sort((t, n) => t.score !== n.score ? n.score - t.score : Ok(t.routesMeta.map(r => r.childrenIndex), n.routesMeta.map(r => r.childrenIndex)))
}
const kk = /^:[\w-]+$/,
    Rk = 3,
    Ak = 2,
    Mk = 1,
    Dk = 10,
    Lk = -2,
    Xp = e => e === "*";

function Nk(e, t) {
    let n = e.split("/"),
        r = n.length;
    return n.some(Xp) && (r += Lk), t && (r += Ak), n.filter(o => !Xp(o)).reduce((o, i) => o + (kk.test(i) ? Rk : i === "" ? Mk : Dk), r)
}

function Ok(e, t) {
    return e.length === t.length && e.slice(0, -1).every((r, o) => r === t[o]) ? e[e.length - 1] - t[t.length - 1] : 0
}

function Ik(e, t, n) {
    let {
        routesMeta: r
    } = e, o = {}, i = "/", s = [];
    for (let a = 0; a < r.length; ++a) {
        let l = r[a],
            u = a === r.length - 1,
            c = i === "/" ? t : t.slice(i.length) || "/",
            d = qp({
                path: l.relativePath,
                caseSensitive: l.caseSensitive,
                end: u
            }, c),
            h = l.route;
        if (!d && u && n && !r[r.length - 1].route.index && (d = qp({
                path: l.relativePath,
                caseSensitive: l.caseSensitive,
                end: !1
            }, c)), !d) return null;
        Object.assign(o, d.params), s.push({
            params: o,
            pathname: wo([i, d.pathname]),
            pathnameBase: jk(wo([i, d.pathnameBase])),
            route: h
        }), d.pathnameBase !== "/" && (i = wo([i, d.pathnameBase]))
    }
    return s
}

function qp(e, t) {
    typeof e == "string" && (e = {
        path: e,
        caseSensitive: !1,
        end: !0
    });
    let [n, r] = _k(e.path, e.caseSensitive, e.end), o = t.match(n);
    if (!o) return null;
    let i = o[0],
        s = i.replace(/(.)\/+$/, "$1"),
        a = o.slice(1);
    return {
        params: r.reduce((u, c, d) => {
            let {
                paramName: h,
                isOptional: f
            } = c;
            if (h === "*") {
                let g = a[d] || "";
                s = i.slice(0, i.length - g.length).replace(/(.)\/+$/, "$1")
            }
            const v = a[d];
            return f && !v ? u[h] = void 0 : u[h] = (v || "").replace(/%2F/g, "/"), u
        }, {}),
        pathname: i,
        pathnameBase: s,
        pattern: e
    }
}

function _k(e, t, n) {
    t === void 0 && (t = !1), n === void 0 && (n = !0), fw(e === "*" || !e.endsWith("*") || e.endsWith("/*"), 'Route path "' + e + '" will be treated as if it were ' + ('"' + e.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + e.replace(/\*$/, "/*") + '".'));
    let r = [],
        o = "^" + e.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(/\/:([\w-]+)(\?)?/g, (s, a, l) => (r.push({
            paramName: a,
            isOptional: l != null
        }), l ? "/?([^\\/]+)?" : "/([^\\/]+)"));
    return e.endsWith("*") ? (r.push({
        paramName: "*"
    }), o += e === "*" || e === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : n ? o += "\\/*$" : e !== "" && e !== "/" && (o += "(?:(?=\\/|$))"), [new RegExp(o, t ? void 0 : "i"), r]
}

function Vk(e) {
    try {
        return e.split("/").map(t => decodeURIComponent(t).replace(/\//g, "%2F")).join("/")
    } catch (t) {
        return fw(!1, 'The URL path "' + e + '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' + ("encoding (" + t + ").")), e
    }
}

function gw(e, t) {
    if (t === "/") return e;
    if (!e.toLowerCase().startsWith(t.toLowerCase())) return null;
    let n = t.endsWith("/") ? t.length - 1 : t.length,
        r = e.charAt(n);
    return r && r !== "/" ? null : e.slice(n) || "/"
}
const wo = e => e.join("/").replace(/\/\/+/g, "/"),
    jk = e => e.replace(/\/+$/, "").replace(/^\/*/, "/");

function Fk(e) {
    return e != null && typeof e.status == "number" && typeof e.statusText == "string" && typeof e.internal == "boolean" && "data" in e
}
const yw = ["post", "put", "patch", "delete"];
new Set(yw);
const zk = ["get", ...yw];
new Set(zk);
/**
 * React Router v6.30.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function Ba() {
    return Ba = Object.assign ? Object.assign.bind() : function(e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
        }
        return e
    }, Ba.apply(this, arguments)
}
const $k = x.createContext(null),
    Bk = x.createContext(null),
    vw = x.createContext(null),
    Pl = x.createContext(null),
    bl = x.createContext({
        outlet: null,
        matches: [],
        isDataRoute: !1
    }),
    ww = x.createContext(null);

function kf() {
    return x.useContext(Pl) != null
}

function xw() {
    return kf() || et(!1), x.useContext(Pl).location
}

function Uk(e, t) {
    return Wk(e, t)
}

function Wk(e, t, n, r) {
    kf() || et(!1);
    let {
        navigator: o
    } = x.useContext(vw), {
        matches: i
    } = x.useContext(bl), s = i[i.length - 1], a = s ? s.params : {};
    s && s.pathname;
    let l = s ? s.pathnameBase : "/";
    s && s.route;
    let u = xw(),
        c;
    if (t) {
        var d;
        let w = typeof t == "string" ? Tl(t) : t;
        l === "/" || (d = w.pathname) != null && d.startsWith(l) || et(!1), c = w
    } else c = u;
    let h = c.pathname || "/",
        f = h;
    if (l !== "/") {
        let w = l.replace(/^\//, "").split("/");
        f = "/" + h.replace(/^\//, "").split("/").slice(w.length).join("/")
    }
    let v = Tk(e, {
            pathname: f
        }),
        g = Yk(v && v.map(w => Object.assign({}, w, {
            params: Object.assign({}, a, w.params),
            pathname: wo([l, o.encodeLocation ? o.encodeLocation(w.pathname).pathname : w.pathname]),
            pathnameBase: w.pathnameBase === "/" ? l : wo([l, o.encodeLocation ? o.encodeLocation(w.pathnameBase).pathname : w.pathnameBase])
        })), i, n, r);
    return t && g ? x.createElement(Pl.Provider, {
        value: {
            location: Ba({
                pathname: "/",
                search: "",
                hash: "",
                state: null,
                key: "default"
            }, c),
            navigationType: Bn.Pop
        }
    }, g) : g
}

function Hk() {
    let e = Jk(),
        t = Fk(e) ? e.status + " " + e.statusText : e instanceof Error ? e.message : JSON.stringify(e),
        n = e instanceof Error ? e.stack : null,
        o = {
            padding: "0.5rem",
            backgroundColor: "rgba(200,200,200, 0.5)"
        };
    return x.createElement(x.Fragment, null, x.createElement("h2", null, "Unexpected Application Error!"), x.createElement("h3", {
        style: {
            fontStyle: "italic"
        }
    }, t), n ? x.createElement("pre", {
        style: o
    }, n) : null, null)
}
const Kk = x.createElement(Hk, null);
class Gk extends x.Component {
    constructor(t) {
        super(t), this.state = {
            location: t.location,
            revalidation: t.revalidation,
            error: t.error
        }
    }
    static getDerivedStateFromError(t) {
        return {
            error: t
        }
    }
    static getDerivedStateFromProps(t, n) {
        return n.location !== t.location || n.revalidation !== "idle" && t.revalidation === "idle" ? {
            error: t.error,
            location: t.location,
            revalidation: t.revalidation
        } : {
            error: t.error !== void 0 ? t.error : n.error,
            location: n.location,
            revalidation: t.revalidation || n.revalidation
        }
    }
    componentDidCatch(t, n) {
        console.error("React Router caught the following error during render", t, n)
    }
    render() {
        return this.state.error !== void 0 ? x.createElement(bl.Provider, {
            value: this.props.routeContext
        }, x.createElement(ww.Provider, {
            value: this.state.error,
            children: this.props.component
        })) : this.props.children
    }
}

function Qk(e) {
    let {
        routeContext: t,
        match: n,
        children: r
    } = e, o = x.useContext($k);
    return o && o.static && o.staticContext && (n.route.errorElement || n.route.ErrorBoundary) && (o.staticContext._deepestRenderedBoundaryId = n.route.id), x.createElement(bl.Provider, {
        value: t
    }, r)
}

function Yk(e, t, n, r) {
    var o;
    if (t === void 0 && (t = []), n === void 0 && (n = null), r === void 0 && (r = null), e == null) {
        var i;
        if (!n) return null;
        if (n.errors) e = n.matches;
        else if ((i = r) != null && i.v7_partialHydration && t.length === 0 && !n.initialized && n.matches.length > 0) e = n.matches;
        else return null
    }
    let s = e,
        a = (o = n) == null ? void 0 : o.errors;
    if (a != null) {
        let c = s.findIndex(d => d.route.id && (a == null ? void 0 : a[d.route.id]) !== void 0);
        c >= 0 || et(!1), s = s.slice(0, Math.min(s.length, c + 1))
    }
    let l = !1,
        u = -1;
    if (n && r && r.v7_partialHydration)
        for (let c = 0; c < s.length; c++) {
            let d = s[c];
            if ((d.route.HydrateFallback || d.route.hydrateFallbackElement) && (u = c), d.route.id) {
                let {
                    loaderData: h,
                    errors: f
                } = n, v = d.route.loader && h[d.route.id] === void 0 && (!f || f[d.route.id] === void 0);
                if (d.route.lazy || v) {
                    l = !0, u >= 0 ? s = s.slice(0, u + 1) : s = [s[0]];
                    break
                }
            }
        }
    return s.reduceRight((c, d, h) => {
        let f, v = !1,
            g = null,
            w = null;
        n && (f = a && d.route.id ? a[d.route.id] : void 0, g = d.route.errorElement || Kk, l && (u < 0 && h === 0 ? (v = !0, w = null) : u === h && (v = !0, w = d.route.hydrateFallbackElement || null)));
        let m = t.concat(s.slice(0, h + 1)),
            p = () => {
                let y;
                return f ? y = g : v ? y = w : d.route.Component ? y = x.createElement(d.route.Component, null) : d.route.element ? y = d.route.element : y = c, x.createElement(Qk, {
                    match: d,
                    routeContext: {
                        outlet: c,
                        matches: m,
                        isDataRoute: n != null
                    },
                    children: y
                })
            };
        return n && (d.route.ErrorBoundary || d.route.errorElement || h === 0) ? x.createElement(Gk, {
            location: n.location,
            revalidation: n.revalidation,
            component: g,
            error: f,
            children: p(),
            routeContext: {
                outlet: null,
                matches: m,
                isDataRoute: !0
            }
        }) : p()
    }, null)
}
var Fc = function(e) {
    return e.UseBlocker = "useBlocker", e.UseLoaderData = "useLoaderData", e.UseActionData = "useActionData", e.UseRouteError = "useRouteError", e.UseNavigation = "useNavigation", e.UseRouteLoaderData = "useRouteLoaderData", e.UseMatches = "useMatches", e.UseRevalidator = "useRevalidator", e.UseNavigateStable = "useNavigate", e.UseRouteId = "useRouteId", e
}(Fc || {});

function Xk(e) {
    let t = x.useContext(Bk);
    return t || et(!1), t
}

function qk(e) {
    let t = x.useContext(bl);
    return t || et(!1), t
}

function Zk(e) {
    let t = qk(),
        n = t.matches[t.matches.length - 1];
    return n.route.id || et(!1), n.route.id
}

function Jk() {
    var e;
    let t = x.useContext(ww),
        n = Xk(Fc.UseRouteError),
        r = Zk(Fc.UseRouteError);
    return t !== void 0 ? t : (e = n.errors) == null ? void 0 : e[r]
}

function eR(e, t) {
    e == null || e.v7_startTransition, e == null || e.v7_relativeSplatPath
}

function zc(e) {
    et(!1)
}

function tR(e) {
    let {
        basename: t = "/",
        children: n = null,
        location: r,
        navigationType: o = Bn.Pop,
        navigator: i,
        static: s = !1,
        future: a
    } = e;
    kf() && et(!1);
    let l = t.replace(/^\/*/, "/"),
        u = x.useMemo(() => ({
            basename: l,
            navigator: i,
            static: s,
            future: Ba({
                v7_relativeSplatPath: !1
            }, a)
        }), [l, a, i, s]);
    typeof r == "string" && (r = Tl(r));
    let {
        pathname: c = "/",
        search: d = "",
        hash: h = "",
        state: f = null,
        key: v = "default"
    } = r, g = x.useMemo(() => {
        let w = gw(c, l);
        return w == null ? null : {
            location: {
                pathname: w,
                search: d,
                hash: h,
                state: f,
                key: v
            },
            navigationType: o
        }
    }, [l, c, d, h, f, v, o]);
    return g == null ? null : x.createElement(vw.Provider, {
        value: u
    }, x.createElement(Pl.Provider, {
        children: n,
        value: g
    }))
}

function nR(e) {
    let {
        children: t,
        location: n
    } = e;
    return Uk($c(t), n)
}
new Promise(() => {});

function $c(e, t) {
    t === void 0 && (t = []);
    let n = [];
    return x.Children.forEach(e, (r, o) => {
        if (!x.isValidElement(r)) return;
        let i = [...t, o];
        if (r.type === x.Fragment) {
            n.push.apply(n, $c(r.props.children, i));
            return
        }
        r.type !== zc && et(!1), !r.props.index || !r.props.children || et(!1);
        let s = {
            id: r.props.id || i.join("-"),
            caseSensitive: r.props.caseSensitive,
            element: r.props.element,
            Component: r.props.Component,
            index: r.props.index,
            path: r.props.path,
            loader: r.props.loader,
            action: r.props.action,
            errorElement: r.props.errorElement,
            ErrorBoundary: r.props.ErrorBoundary,
            hasErrorBoundary: r.props.ErrorBoundary != null || r.props.errorElement != null,
            shouldRevalidate: r.props.shouldRevalidate,
            handle: r.props.handle,
            lazy: r.props.lazy
        };
        r.props.children && (s.children = $c(r.props.children, i)), n.push(s)
    }), n
}
/**
 * React Router DOM v6.30.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
const rR = "6";
try {
    window.__reactRouterVersion = rR
} catch {}
const oR = "startTransition",
    Zp = Fg[oR];

function iR(e) {
    let {
        basename: t,
        children: n,
        future: r,
        window: o
    } = e, i = x.useRef();
    i.current == null && (i.current = Sk({
        window: o,
        v5Compat: !0
    }));
    let s = i.current,
        [a, l] = x.useState({
            action: s.action,
            location: s.location
        }),
        {
            v7_startTransition: u
        } = r || {},
        c = x.useCallback(d => {
            u && Zp ? Zp(() => l(d)) : l(d)
        }, [l, u]);
    return x.useLayoutEffect(() => s.listen(c), [s, c]), x.useEffect(() => eR(r), [r]), x.createElement(tR, {
        basename: t,
        children: n,
        location: a.location,
        navigationType: a.action,
        navigator: s,
        future: r
    })
}
var Jp;
(function(e) {
    e.UseScrollRestoration = "useScrollRestoration", e.UseSubmit = "useSubmit", e.UseSubmitFetcher = "useSubmitFetcher", e.UseFetcher = "useFetcher", e.useViewTransitionState = "useViewTransitionState"
})(Jp || (Jp = {}));
var em;
(function(e) {
    e.UseFetcher = "useFetcher", e.UseFetchers = "useFetchers", e.UseScrollRestoration = "useScrollRestoration"
})(em || (em = {}));
const Bc = "assets/images/cupid-logo-C7hY05CQ.png",
    sR = 1,
    aR = "dce11aa7-67cf-4b4c-9ddf-fc70a319907c",
    lR = "db221931-518d-4d9e-bcf9-1cc46b13be79",
    uR = "assets/l5e-videos/waves-bg.mp4",
    cR = "a/v1/db221931-518d-4d9e-bcf9-1cc46b13be79/dce11aa7-67cf-4b4c-9ddf-fc70a319907c/waves-bg.mp4",
    dR = "waves-bg.mp4",
    fR = 2291148,
    hR = "video/mp4",
    pR = "2026-06-05T11:40:55Z",
    Sw = {
        version: sR,
        asset_id: aR,
        project_id: lR,
        url: uR,
        r2_key: cR,
        original_filename: dR,
        size: fR,
        content_type: hR,
        created_at: pR
    },
    Rf = x.createContext({});

function Af(e) {
    const t = x.useRef(null);
    return t.current === null && (t.current = e()), t.current
}
const mR = typeof window < "u",
    Ew = mR ? x.useLayoutEffect : x.useEffect,
    kl = x.createContext(null);

function Mf(e, t) {
    e.indexOf(t) === -1 && e.push(t)
}

function Ua(e, t) {
    const n = e.indexOf(t);
    n > -1 && e.splice(n, 1)
}
const en = (e, t, n) => n > t ? t : n < e ? e : n;
let Rl = () => {},
    Vo = () => {};
const or = {},
    Cw = e => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(e),
    Tw = e => typeof e == "object" && e !== null,
    Pw = e => /^0[^.\s]+$/u.test(e);

function bw(e) {
    let t;
    return () => (t === void 0 && (t = e()), t)
}
const yt = e => e,
    ls = (...e) => e.reduce((t, n) => r => n(t(r))),
    Qi = (e, t, n) => {
        const r = t - e;
        return r ? (n - e) / r : 1
    };
class Df {
    constructor() {
        this.subscriptions = []
    }
    add(t) {
        return Mf(this.subscriptions, t), () => Ua(this.subscriptions, t)
    }
    notify(t, n, r) {
        const o = this.subscriptions.length;
        if (o)
            if (o === 1) this.subscriptions[0](t, n, r);
            else
                for (let i = 0; i < o; i++) {
                    const s = this.subscriptions[i];
                    s && s(t, n, r)
                }
    }
    getSize() {
        return this.subscriptions.length
    }
    clear() {
        this.subscriptions.length = 0
    }
}
const Je = e => e * 1e3,
    mt = e => e / 1e3,
    kw = (e, t) => t ? e * (1e3 / t) : 0,
    Rw = (e, t, n) => (((1 - 3 * n + 3 * t) * e + (3 * n - 6 * t)) * e + 3 * t) * e,
    gR = 1e-7,
    yR = 12;

function vR(e, t, n, r, o) {
    let i, s, a = 0;
    do s = t + (n - t) / 2, i = Rw(s, r, o) - e, i > 0 ? n = s : t = s; while (Math.abs(i) > gR && ++a < yR);
    return s
}

function us(e, t, n, r) {
    if (e === t && n === r) return yt;
    const o = i => vR(i, 0, 1, e, n);
    return i => i === 0 || i === 1 ? i : Rw(o(i), t, r)
}
const Aw = e => t => t <= .5 ? e(2 * t) / 2 : (2 - e(2 * (1 - t))) / 2,
    Mw = e => t => 1 - e(1 - t),
    Dw = us(.33, 1.53, .69, .99),
    Lf = Mw(Dw),
    Lw = Aw(Lf),
    Nw = e => e >= 1 ? 1 : (e *= 2) < 1 ? .5 * Lf(e) : .5 * (2 - Math.pow(2, -10 * (e - 1))),
    Nf = e => 1 - Math.sin(Math.acos(e)),
    Ow = Mw(Nf),
    Iw = Aw(Nf),
    wR = us(.42, 0, 1, 1),
    xR = us(0, 0, .58, 1),
    _w = us(.42, 0, .58, 1),
    SR = e => Array.isArray(e) && typeof e[0] != "number",
    Vw = e => Array.isArray(e) && typeof e[0] == "number",
    tm = {
        linear: yt,
        easeIn: wR,
        easeInOut: _w,
        easeOut: xR,
        circIn: Nf,
        circInOut: Iw,
        circOut: Ow,
        backIn: Lf,
        backInOut: Lw,
        backOut: Dw,
        anticipate: Nw
    },
    ER = e => typeof e == "string",
    nm = e => {
        if (Vw(e)) {
            Vo(e.length === 4, "Cubic bezier arrays must contain four numerical values.", "cubic-bezier-length");
            const [t, n, r, o] = e;
            return us(t, n, r, o)
        } else if (ER(e)) return Vo(tm[e] !== void 0, `Invalid easing type '${e}'`, "invalid-easing-type"), tm[e];
        return e
    },
    js = ["setup", "read", "resolveKeyframes", "preUpdate", "update", "preRender", "render", "postRender"],
    rm = {
        value: null,
        addProjectionMetrics: null
    };

function CR(e, t) {
    let n = new Set,
        r = new Set,
        o = !1,
        i = !1;
    const s = new WeakSet;
    let a = {
            delta: 0,
            timestamp: 0,
            isProcessing: !1
        },
        l = 0;

    function u(d) {
        s.has(d) && (c.schedule(d), e()), l++, d(a)
    }
    const c = {
        schedule: (d, h = !1, f = !1) => {
            const g = f && o ? n : r;
            return h && s.add(d), g.add(d), d
        },
        cancel: d => {
            r.delete(d), s.delete(d)
        },
        process: d => {
            if (a = d, o) {
                i = !0;
                return
            }
            o = !0;
            const h = n;
            n = r, r = h, n.forEach(u), t && rm.value && rm.value.frameloop[t].push(l), l = 0, n.clear(), o = !1, i && (i = !1, c.process(d))
        }
    };
    return c
}
const TR = 40;

function jw(e, t) {
    let n = !1,
        r = !0;
    const o = {
            delta: 0,
            timestamp: 0,
            isProcessing: !1
        },
        i = () => n = !0,
        s = js.reduce((y, S) => (y[S] = CR(i, t ? S : void 0), y), {}),
        {
            setup: a,
            read: l,
            resolveKeyframes: u,
            preUpdate: c,
            update: d,
            preRender: h,
            render: f,
            postRender: v
        } = s,
        g = () => {
            const y = or.useManualTiming,
                S = y ? o.timestamp : performance.now();
            n = !1, y || (o.delta = r ? 1e3 / 60 : Math.max(Math.min(S - o.timestamp, TR), 1)), o.timestamp = S, o.isProcessing = !0, a.process(o), l.process(o), u.process(o), c.process(o), d.process(o), h.process(o), f.process(o), v.process(o), o.isProcessing = !1, n && t && (r = !1, e(g))
        },
        w = () => {
            n = !0, r = !0, o.isProcessing || e(g)
        };
    return {
        schedule: js.reduce((y, S) => {
            const E = s[S];
            return y[S] = (C, T = !1, b = !1) => (n || w(), E.schedule(C, T, b)), y
        }, {}),
        cancel: y => {
            for (let S = 0; S < js.length; S++) s[js[S]].cancel(y)
        },
        state: o,
        steps: s
    }
}
const {
    schedule: re,
    cancel: ir,
    state: Re,
    steps: yu
} = jw(typeof requestAnimationFrame < "u" ? requestAnimationFrame : yt, !0);
let oa;

function PR() {
    oa = void 0
}
const Be = {
        now: () => (oa === void 0 && Be.set(Re.isProcessing || or.useManualTiming ? Re.timestamp : performance.now()), oa),
        set: e => {
            oa = e, queueMicrotask(PR)
        }
    },
    Fw = e => t => typeof t == "string" && t.startsWith(e),
    zw = Fw("--"),
    bR = Fw("var(--"),
    Of = e => bR(e) ? kR.test(e.split("/*")[0].trim()) : !1,
    kR = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;

function om(e) {
    return typeof e != "string" ? !1 : e.split("/*")[0].includes("var(--")
}
const Ko = {
        test: e => typeof e == "number",
        parse: parseFloat,
        transform: e => e
    },
    Yi = {
        ...Ko,
        transform: e => en(0, 1, e)
    },
    Fs = {
        ...Ko,
        default: 1
    },
    Ci = e => Math.round(e * 1e5) / 1e5,
    If = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;

function RR(e) {
    return e == null
}
const AR = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu,
    _f = (e, t) => n => !!(typeof n == "string" && AR.test(n) && n.startsWith(e) || t && !RR(n) && Object.prototype.hasOwnProperty.call(n, t)),
    $w = (e, t, n) => r => {
        if (typeof r != "string") return r;
        const [o, i, s, a] = r.match(If);
        return {
            [e]: parseFloat(o),
            [t]: parseFloat(i),
            [n]: parseFloat(s),
            alpha: a !== void 0 ? parseFloat(a) : 1
        }
    },
    MR = e => en(0, 255, e),
    vu = {
        ...Ko,
        transform: e => Math.round(MR(e))
    },
    xr = {
        test: _f("rgb", "red"),
        parse: $w("red", "green", "blue"),
        transform: ({
            red: e,
            green: t,
            blue: n,
            alpha: r = 1
        }) => "rgba(" + vu.transform(e) + ", " + vu.transform(t) + ", " + vu.transform(n) + ", " + Ci(Yi.transform(r)) + ")"
    };

function DR(e) {
    let t = "",
        n = "",
        r = "",
        o = "";
    return e.length > 5 ? (t = e.substring(1, 3), n = e.substring(3, 5), r = e.substring(5, 7), o = e.substring(7, 9)) : (t = e.substring(1, 2), n = e.substring(2, 3), r = e.substring(3, 4), o = e.substring(4, 5), t += t, n += n, r += r, o += o), {
        red: parseInt(t, 16),
        green: parseInt(n, 16),
        blue: parseInt(r, 16),
        alpha: o ? parseInt(o, 16) / 255 : 1
    }
}
const Uc = {
        test: _f("#"),
        parse: DR,
        transform: xr.transform
    },
    cs = e => ({
        test: t => typeof t == "string" && t.endsWith(e) && t.split(" ").length === 1,
        parse: parseFloat,
        transform: t => `${t}${e}`
    }),
    An = cs("deg"),
    Zt = cs("%"),
    F = cs("px"),
    LR = cs("vh"),
    NR = cs("vw"),
    im = {
        ...Zt,
        parse: e => Zt.parse(e) / 100,
        transform: e => Zt.transform(e * 100)
    },
    ao = {
        test: _f("hsl", "hue"),
        parse: $w("hue", "saturation", "lightness"),
        transform: ({
            hue: e,
            saturation: t,
            lightness: n,
            alpha: r = 1
        }) => "hsla(" + Math.round(e) + ", " + Zt.transform(Ci(t)) + ", " + Zt.transform(Ci(n)) + ", " + Ci(Yi.transform(r)) + ")"
    },
    we = {
        test: e => xr.test(e) || Uc.test(e) || ao.test(e),
        parse: e => xr.test(e) ? xr.parse(e) : ao.test(e) ? ao.parse(e) : Uc.parse(e),
        transform: e => typeof e == "string" ? e : e.hasOwnProperty("red") ? xr.transform(e) : ao.transform(e),
        getAnimatableNone: e => {
            const t = we.parse(e);
            return t.alpha = 0, we.transform(t)
        }
    },
    OR = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;

function IR(e) {
    var t, n;
    return isNaN(e) && typeof e == "string" && (((t = e.match(If)) == null ? void 0 : t.length) || 0) + (((n = e.match(OR)) == null ? void 0 : n.length) || 0) > 0
}
const Bw = "number",
    Uw = "color",
    _R = "var",
    VR = "var(",
    sm = "${}",
    jR = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;

function jo(e) {
    const t = e.toString(),
        n = [],
        r = {
            color: [],
            number: [],
            var: []
        },
        o = [];
    let i = 0;
    const a = t.replace(jR, l => (we.test(l) ? (r.color.push(i), o.push(Uw), n.push(we.parse(l))) : l.startsWith(VR) ? (r.var.push(i), o.push(_R), n.push(l)) : (r.number.push(i), o.push(Bw), n.push(parseFloat(l))), ++i, sm)).split(sm);
    return {
        values: n,
        split: a,
        indexes: r,
        types: o
    }
}

function FR(e) {
    return jo(e).values
}

function Ww({
    split: e,
    types: t
}) {
    const n = e.length;
    return r => {
        let o = "";
        for (let i = 0; i < n; i++)
            if (o += e[i], r[i] !== void 0) {
                const s = t[i];
                s === Bw ? o += Ci(r[i]) : s === Uw ? o += we.transform(r[i]) : o += r[i]
            } return o
    }
}

function zR(e) {
    return Ww(jo(e))
}
const $R = e => typeof e == "number" ? 0 : we.test(e) ? we.getAnimatableNone(e) : e,
    BR = (e, t) => typeof e == "number" ? t != null && t.trim().endsWith("/") ? e : 0 : $R(e);

function UR(e) {
    const t = jo(e);
    return Ww(t)(t.values.map((r, o) => BR(r, t.split[o])))
}
const It = {
    test: IR,
    parse: FR,
    createTransformer: zR,
    getAnimatableNone: UR
};

function wu(e, t, n) {
    return n < 0 && (n += 1), n > 1 && (n -= 1), n < 1 / 6 ? e + (t - e) * 6 * n : n < 1 / 2 ? t : n < 2 / 3 ? e + (t - e) * (2 / 3 - n) * 6 : e
}

function WR({
    hue: e,
    saturation: t,
    lightness: n,
    alpha: r
}) {
    e /= 360, t /= 100, n /= 100;
    let o = 0,
        i = 0,
        s = 0;
    if (!t) o = i = s = n;
    else {
        const a = n < .5 ? n * (1 + t) : n + t - n * t,
            l = 2 * n - a;
        o = wu(l, a, e + 1 / 3), i = wu(l, a, e), s = wu(l, a, e - 1 / 3)
    }
    return {
        red: Math.round(o * 255),
        green: Math.round(i * 255),
        blue: Math.round(s * 255),
        alpha: r
    }
}

function Wa(e, t) {
    return n => n > 0 ? t : e
}
const ae = (e, t, n) => e + (t - e) * n,
    xu = (e, t, n) => {
        const r = e * e,
            o = n * (t * t - r) + r;
        return o < 0 ? 0 : Math.sqrt(o)
    },
    HR = [Uc, xr, ao],
    KR = e => HR.find(t => t.test(e));

function am(e) {
    const t = KR(e);
    if (Rl(!!t, `'${e}' is not an animatable color. Use the equivalent color code instead.`, "color-not-animatable"), !t) return !1;
    let n = t.parse(e);
    return t === ao && (n = WR(n)), n
}
const lm = (e, t) => {
        const n = am(e),
            r = am(t);
        if (!n || !r) return Wa(e, t);
        const o = {
            ...n
        };
        return i => (o.red = xu(n.red, r.red, i), o.green = xu(n.green, r.green, i), o.blue = xu(n.blue, r.blue, i), o.alpha = ae(n.alpha, r.alpha, i), xr.transform(o))
    },
    Wc = new Set(["none", "hidden"]);

function GR(e, t) {
    return Wc.has(e) ? n => n <= 0 ? e : t : n => n >= 1 ? t : e
}

function QR(e, t) {
    return n => ae(e, t, n)
}

function Vf(e) {
    return typeof e == "number" ? QR : typeof e == "string" ? Of(e) ? Wa : we.test(e) ? lm : qR : Array.isArray(e) ? Hw : typeof e == "object" ? we.test(e) ? lm : YR : Wa
}

function Hw(e, t) {
    const n = [...e],
        r = n.length,
        o = e.map((i, s) => Vf(i)(i, t[s]));
    return i => {
        for (let s = 0; s < r; s++) n[s] = o[s](i);
        return n
    }
}

function YR(e, t) {
    const n = {
            ...e,
            ...t
        },
        r = {};
    for (const o in n) e[o] !== void 0 && t[o] !== void 0 && (r[o] = Vf(e[o])(e[o], t[o]));
    return o => {
        for (const i in r) n[i] = r[i](o);
        return n
    }
}

function XR(e, t) {
    const n = [],
        r = {
            color: 0,
            var: 0,
            number: 0
        };
    for (let o = 0; o < t.values.length; o++) {
        const i = t.types[o],
            s = e.indexes[i][r[i]],
            a = e.values[s] ?? 0;
        n[o] = a, r[i]++
    }
    return n
}
const qR = (e, t) => {
    const n = It.createTransformer(t),
        r = jo(e),
        o = jo(t);
    return r.indexes.var.length === o.indexes.var.length && r.indexes.color.length === o.indexes.color.length && r.indexes.number.length >= o.indexes.number.length ? Wc.has(e) && !o.values.length || Wc.has(t) && !r.values.length ? GR(e, t) : ls(Hw(XR(r, o), o.values), n) : (Rl(!0, `Complex values '${e}' and '${t}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`, "complex-values-different"), Wa(e, t))
};

function Kw(e, t, n) {
    return typeof e == "number" && typeof t == "number" && typeof n == "number" ? ae(e, t, n) : Vf(e)(e, t)
}
const ZR = e => {
        const t = ({
            timestamp: n
        }) => e(n);
        return {
            start: (n = !0) => re.update(t, n),
            stop: () => ir(t),
            now: () => Re.isProcessing ? Re.timestamp : Be.now()
        }
    },
    Gw = (e, t, n = 10) => {
        let r = "";
        const o = Math.max(Math.round(t / n), 2);
        for (let i = 0; i < o; i++) r += Math.round(e(i / (o - 1)) * 1e4) / 1e4 + ", ";
        return `linear(${r.substring(0,r.length-2)})`
    },
    Ha = 2e4;

function jf(e) {
    let t = 0;
    const n = 50;
    let r = e.next(t);
    for (; !r.done && t < Ha;) t += n, r = e.next(t);
    return t >= Ha ? 1 / 0 : t
}

function JR(e, t = 100, n) {
    const r = n({
            ...e,
            keyframes: [0, t]
        }),
        o = Math.min(jf(r), Ha);
    return {
        type: "keyframes",
        ease: i => r.next(o * i).value / t,
        duration: mt(o)
    }
}
const de = {
    stiffness: 100,
    damping: 10,
    mass: 1,
    velocity: 0,
    duration: 800,
    bounce: .3,
    visualDuration: .3,
    restSpeed: {
        granular: .01,
        default: 2
    },
    restDelta: {
        granular: .005,
        default: .5
    },
    minDuration: .01,
    maxDuration: 10,
    minDamping: .05,
    maxDamping: 1
};

function Hc(e, t) {
    return e * Math.sqrt(1 - t * t)
}
const eA = 12;

function tA(e, t, n) {
    let r = n;
    for (let o = 1; o < eA; o++) r = r - e(r) / t(r);
    return r
}
const Su = .001;

function nA({
    duration: e = de.duration,
    bounce: t = de.bounce,
    velocity: n = de.velocity,
    mass: r = de.mass
}) {
    let o, i;
    Rl(e <= Je(de.maxDuration), "Spring duration must be 10 seconds or less", "spring-duration-limit");
    let s = 1 - t;
    s = en(de.minDamping, de.maxDamping, s), e = en(de.minDuration, de.maxDuration, mt(e)), s < 1 ? (o = u => {
        const c = u * s,
            d = c * e,
            h = c - n,
            f = Hc(u, s),
            v = Math.exp(-d);
        return Su - h / f * v
    }, i = u => {
        const d = u * s * e,
            h = d * n + n,
            f = Math.pow(s, 2) * Math.pow(u, 2) * e,
            v = Math.exp(-d),
            g = Hc(Math.pow(u, 2), s);
        return (-o(u) + Su > 0 ? -1 : 1) * ((h - f) * v) / g
    }) : (o = u => {
        const c = Math.exp(-u * e),
            d = (u - n) * e + 1;
        return -Su + c * d
    }, i = u => {
        const c = Math.exp(-u * e),
            d = (n - u) * (e * e);
        return c * d
    });
    const a = 5 / e,
        l = tA(o, i, a);
    if (e = Je(e), isNaN(l)) return {
        stiffness: de.stiffness,
        damping: de.damping,
        duration: e
    };
    {
        const u = Math.pow(l, 2) * r;
        return {
            stiffness: u,
            damping: s * 2 * Math.sqrt(r * u),
            duration: e
        }
    }
}
const rA = ["duration", "bounce"],
    oA = ["stiffness", "damping", "mass"];

function um(e, t) {
    return t.some(n => e[n] !== void 0)
}

function iA(e) {
    let t = {
        velocity: de.velocity,
        stiffness: de.stiffness,
        damping: de.damping,
        mass: de.mass,
        isResolvedFromDuration: !1,
        ...e
    };
    if (!um(e, oA) && um(e, rA))
        if (t.velocity = 0, e.visualDuration) {
            const n = e.visualDuration,
                r = 2 * Math.PI / (n * 1.2),
                o = r * r,
                i = 2 * en(.05, 1, 1 - (e.bounce || 0)) * Math.sqrt(o);
            t = {
                ...t,
                mass: de.mass,
                stiffness: o,
                damping: i
            }
        } else {
            const n = nA({
                ...e,
                velocity: 0
            });
            t = {
                ...t,
                ...n,
                mass: de.mass
            }, t.isResolvedFromDuration = !0
        } return t
}

function Ka(e = de.visualDuration, t = de.bounce) {
    const n = typeof e != "object" ? {
        visualDuration: e,
        keyframes: [0, 1],
        bounce: t
    } : e;
    let {
        restSpeed: r,
        restDelta: o
    } = n;
    const i = n.keyframes[0],
        s = n.keyframes[n.keyframes.length - 1],
        a = {
            done: !1,
            value: i
        },
        {
            stiffness: l,
            damping: u,
            mass: c,
            duration: d,
            velocity: h,
            isResolvedFromDuration: f
        } = iA({
            ...n,
            velocity: -mt(n.velocity || 0)
        }),
        v = h || 0,
        g = u / (2 * Math.sqrt(l * c)),
        w = s - i,
        m = mt(Math.sqrt(l / c)),
        p = Math.abs(w) < 5;
    r || (r = p ? de.restSpeed.granular : de.restSpeed.default), o || (o = p ? de.restDelta.granular : de.restDelta.default);
    let y, S, E, C, T, b;
    if (g < 1) E = Hc(m, g), C = (v + g * m * w) / E, y = R => {
        const V = Math.exp(-g * m * R);
        return s - V * (C * Math.sin(E * R) + w * Math.cos(E * R))
    }, T = g * m * C + w * E, b = g * m * w - C * E, S = R => Math.exp(-g * m * R) * (T * Math.sin(E * R) + b * Math.cos(E * R));
    else if (g === 1) {
        y = V => s - Math.exp(-m * V) * (w + (v + m * w) * V);
        const R = v + m * w;
        S = V => Math.exp(-m * V) * (m * R * V - v)
    } else {
        const R = m * Math.sqrt(g * g - 1);
        y = O => {
            const W = Math.exp(-g * m * O),
                z = Math.min(R * O, 300);
            return s - W * ((v + g * m * w) * Math.sinh(z) + R * w * Math.cosh(z)) / R
        };
        const V = (v + g * m * w) / R,
            I = g * m * V - w * R,
            U = g * m * w - V * R;
        S = O => {
            const W = Math.exp(-g * m * O),
                z = Math.min(R * O, 300);
            return W * (I * Math.sinh(z) + U * Math.cosh(z))
        }
    }
    const D = {
        calculatedDuration: f && d || null,
        velocity: R => Je(S(R)),
        next: R => {
            if (!f && g < 1) {
                const I = Math.exp(-g * m * R),
                    U = Math.sin(E * R),
                    O = Math.cos(E * R),
                    W = s - I * (C * U + w * O),
                    z = Je(I * (T * U + b * O));
                return a.done = Math.abs(z) <= r && Math.abs(s - W) <= o, a.value = a.done ? s : W, a
            }
            const V = y(R);
            if (f) a.done = R >= d;
            else {
                const I = Je(S(R));
                a.done = Math.abs(I) <= r && Math.abs(s - V) <= o
            }
            return a.value = a.done ? s : V, a
        },
        toString: () => {
            const R = Math.min(jf(D), Ha),
                V = Gw(I => D.next(R * I).value, R, 30);
            return R + "ms " + V
        },
        toTransition: () => {}
    };
    return D
}
Ka.applyToOptions = e => {
    const t = JR(e, 100, Ka);
    return e.ease = t.ease, e.duration = Je(t.duration), e.type = "keyframes", e
};
const sA = 5;

function Qw(e, t, n) {
    const r = Math.max(t - sA, 0);
    return kw(n - e(r), t - r)
}

function Kc({
    keyframes: e,
    velocity: t = 0,
    power: n = .8,
    timeConstant: r = 325,
    bounceDamping: o = 10,
    bounceStiffness: i = 500,
    modifyTarget: s,
    min: a,
    max: l,
    restDelta: u = .5,
    restSpeed: c
}) {
    const d = e[0],
        h = {
            done: !1,
            value: d
        },
        f = b => a !== void 0 && b < a || l !== void 0 && b > l,
        v = b => a === void 0 ? l : l === void 0 || Math.abs(a - b) < Math.abs(l - b) ? a : l;
    let g = n * t;
    const w = d + g,
        m = s === void 0 ? w : s(w);
    m !== w && (g = m - d);
    const p = b => -g * Math.exp(-b / r),
        y = b => m + p(b),
        S = b => {
            const D = p(b),
                R = y(b);
            h.done = Math.abs(D) <= u, h.value = h.done ? m : R
        };
    let E, C;
    const T = b => {
        f(h.value) && (E = b, C = Ka({
            keyframes: [h.value, v(h.value)],
            velocity: Qw(y, b, h.value),
            damping: o,
            stiffness: i,
            restDelta: u,
            restSpeed: c
        }))
    };
    return T(0), {
        calculatedDuration: null,
        next: b => {
            let D = !1;
            return !C && E === void 0 && (D = !0, S(b), T(b)), E !== void 0 && b >= E ? C.next(b - E) : (!D && S(b), h)
        }
    }
}

function aA(e, t, n) {
    const r = [],
        o = n || or.mix || Kw,
        i = e.length - 1;
    for (let s = 0; s < i; s++) {
        let a = o(e[s], e[s + 1]);
        if (t) {
            const l = Array.isArray(t) ? t[s] || yt : t;
            a = ls(l, a)
        }
        r.push(a)
    }
    return r
}

function lA(e, t, {
    clamp: n = !0,
    ease: r,
    mixer: o
} = {}) {
    const i = e.length;
    if (Vo(i === t.length, "Both input and output ranges must be the same length", "range-length"), i === 1) return () => t[0];
    if (i === 2 && t[0] === t[1]) return () => t[1];
    const s = e[0] === e[1];
    e[0] > e[i - 1] && (e = [...e].reverse(), t = [...t].reverse());
    const a = aA(t, r, o),
        l = a.length,
        u = c => {
            if (s && c < e[0]) return t[0];
            let d = 0;
            if (l > 1)
                for (; d < e.length - 2 && !(c < e[d + 1]); d++);
            const h = Qi(e[d], e[d + 1], c);
            return a[d](h)
        };
    return n ? c => u(en(e[0], e[i - 1], c)) : u
}

function uA(e, t) {
    const n = e[e.length - 1];
    for (let r = 1; r <= t; r++) {
        const o = Qi(0, t, r);
        e.push(ae(n, 1, o))
    }
}

function cA(e) {
    const t = [0];
    return uA(t, e.length - 1), t
}

function dA(e, t) {
    return e.map(n => n * t)
}

function fA(e, t) {
    return e.map(() => t || _w).splice(0, e.length - 1)
}

function Ti({
    duration: e = 300,
    keyframes: t,
    times: n,
    ease: r = "easeInOut"
}) {
    const o = SR(r) ? r.map(nm) : nm(r),
        i = {
            done: !1,
            value: t[0]
        },
        s = dA(n && n.length === t.length ? n : cA(t), e),
        a = lA(s, t, {
            ease: Array.isArray(o) ? o : fA(t, o)
        });
    return {
        calculatedDuration: e,
        next: l => (i.value = a(l), i.done = l >= e, i)
    }
}
const hA = e => e !== null;

function Al(e, {
    repeat: t,
    repeatType: n = "loop"
}, r, o = 1) {
    const i = e.filter(hA),
        a = o < 0 || t && n !== "loop" && t % 2 === 1 ? 0 : i.length - 1;
    return !a || r === void 0 ? i[a] : r
}
const pA = {
    decay: Kc,
    inertia: Kc,
    tween: Ti,
    keyframes: Ti,
    spring: Ka
};

function Yw(e) {
    typeof e.type == "string" && (e.type = pA[e.type])
}
class Ff {
    constructor() {
        this.updateFinished()
    }
    get finished() {
        return this._finished
    }
    updateFinished() {
        this._finished = new Promise(t => {
            this.resolve = t
        })
    }
    notifyFinished() {
        this.resolve()
    }
    then(t, n) {
        return this.finished.then(t, n)
    }
}
const mA = e => e / 100;
class Ga extends Ff {
    constructor(t) {
        super(), this.state = "idle", this.startTime = null, this.isStopped = !1, this.currentTime = 0, this.holdTime = null, this.playbackSpeed = 1, this.delayState = {
            done: !1,
            value: void 0
        }, this.stop = () => {
            var r, o;
            const {
                motionValue: n
            } = this.options;
            n && n.updatedAt !== Be.now() && this.tick(Be.now()), this.isStopped = !0, this.state !== "idle" && (this.teardown(), (o = (r = this.options).onStop) == null || o.call(r))
        }, this.options = t, this.initAnimation(), this.play(), t.autoplay === !1 && this.pause()
    }
    initAnimation() {
        const {
            options: t
        } = this;
        Yw(t);
        const {
            type: n = Ti,
            repeat: r = 0,
            repeatDelay: o = 0,
            repeatType: i,
            velocity: s = 0
        } = t;
        let {
            keyframes: a
        } = t;
        const l = n || Ti;
        l !== Ti && typeof a[0] != "number" && (this.mixKeyframes = ls(mA, Kw(a[0], a[1])), a = [0, 100]);
        const u = l({
            ...t,
            keyframes: a
        });
        i === "mirror" && (this.mirroredGenerator = l({
            ...t,
            keyframes: [...a].reverse(),
            velocity: -s
        })), u.calculatedDuration === null && (u.calculatedDuration = jf(u));
        const {
            calculatedDuration: c
        } = u;
        this.calculatedDuration = c, this.resolvedDuration = c + o, this.totalDuration = this.resolvedDuration * (r + 1) - o, this.generator = u
    }
    updateTime(t) {
        const n = Math.round(t - this.startTime) * this.playbackSpeed;
        this.holdTime !== null ? this.currentTime = this.holdTime : this.currentTime = n
    }
    tick(t, n = !1) {
        const {
            generator: r,
            totalDuration: o,
            mixKeyframes: i,
            mirroredGenerator: s,
            resolvedDuration: a,
            calculatedDuration: l
        } = this;
        if (this.startTime === null) return r.next(0);
        const {
            delay: u = 0,
            keyframes: c,
            repeat: d,
            repeatType: h,
            repeatDelay: f,
            type: v,
            onUpdate: g,
            finalKeyframe: w
        } = this.options;
        this.speed > 0 ? this.startTime = Math.min(this.startTime, t) : this.speed < 0 && (this.startTime = Math.min(t - o / this.speed, this.startTime)), n ? this.currentTime = t : this.updateTime(t);
        const m = this.currentTime - u * (this.playbackSpeed >= 0 ? 1 : -1),
            p = this.playbackSpeed >= 0 ? m < 0 : m > o;
        this.currentTime = Math.max(m, 0), this.state === "finished" && this.holdTime === null && (this.currentTime = o);
        let y = this.currentTime,
            S = r;
        if (d) {
            const b = Math.min(this.currentTime, o) / a;
            let D = Math.floor(b),
                R = b % 1;
            !R && b >= 1 && (R = 1), R === 1 && D--, D = Math.min(D, d + 1), !!(D % 2) && (h === "reverse" ? (R = 1 - R, f && (R -= f / a)) : h === "mirror" && (S = s)), y = en(0, 1, R) * a
        }
        let E;
        p ? (this.delayState.value = c[0], E = this.delayState) : E = S.next(y), i && !p && (E.value = i(E.value));
        let {
            done: C
        } = E;
        !p && l !== null && (C = this.playbackSpeed >= 0 ? this.currentTime >= o : this.currentTime <= 0);
        const T = this.holdTime === null && (this.state === "finished" || this.state === "running" && C);
        return T && v !== Kc && (E.value = Al(c, this.options, w, this.speed)), g && g(E.value), T && this.finish(), E
    }
    then(t, n) {
        return this.finished.then(t, n)
    }
    get duration() {
        return mt(this.calculatedDuration)
    }
    get iterationDuration() {
        const {
            delay: t = 0
        } = this.options || {};
        return this.duration + mt(t)
    }
    get time() {
        return mt(this.currentTime)
    }
    set time(t) {
        t = Je(t), this.currentTime = t, this.startTime === null || this.holdTime !== null || this.playbackSpeed === 0 ? this.holdTime = t : this.driver && (this.startTime = this.driver.now() - t / this.playbackSpeed), this.driver ? this.driver.start(!1) : (this.startTime = 0, this.state = "paused", this.holdTime = t, this.tick(t))
    }
    getGeneratorVelocity() {
        const t = this.currentTime;
        if (t <= 0) return this.options.velocity || 0;
        if (this.generator.velocity) return this.generator.velocity(t);
        const n = this.generator.next(t).value;
        return Qw(r => this.generator.next(r).value, t, n)
    }
    get speed() {
        return this.playbackSpeed
    }
    set speed(t) {
        const n = this.playbackSpeed !== t;
        n && this.driver && this.updateTime(Be.now()), this.playbackSpeed = t, n && this.driver && (this.time = mt(this.currentTime))
    }
    play() {
        var o, i;
        if (this.isStopped) return;
        const {
            driver: t = ZR,
            startTime: n
        } = this.options;
        this.driver || (this.driver = t(s => this.tick(s))), (i = (o = this.options).onPlay) == null || i.call(o);
        const r = this.driver.now();
        this.state === "finished" ? (this.updateFinished(), this.startTime = r) : this.holdTime !== null ? this.startTime = r - this.holdTime : this.startTime || (this.startTime = n ?? r), this.state === "finished" && this.speed < 0 && (this.startTime += this.calculatedDuration), this.holdTime = null, this.state = "running", this.driver.start()
    }
    pause() {
        this.state = "paused", this.updateTime(Be.now()), this.holdTime = this.currentTime
    }
    complete() {
        this.state !== "running" && this.play(), this.state = "finished", this.holdTime = null
    }
    finish() {
        var t, n;
        this.notifyFinished(), this.teardown(), this.state = "finished", (n = (t = this.options).onComplete) == null || n.call(t)
    }
    cancel() {
        var t, n;
        this.holdTime = null, this.startTime = 0, this.tick(0), this.teardown(), (n = (t = this.options).onCancel) == null || n.call(t)
    }
    teardown() {
        this.state = "idle", this.stopDriver(), this.startTime = this.holdTime = null
    }
    stopDriver() {
        this.driver && (this.driver.stop(), this.driver = void 0)
    }
    sample(t) {
        return this.startTime = 0, this.tick(t, !0)
    }
    attachTimeline(t) {
        var n;
        return this.options.allowFlatten && (this.options.type = "keyframes", this.options.ease = "linear", this.initAnimation()), (n = this.driver) == null || n.stop(), t.observe(this)
    }
}

function gA(e) {
    for (let t = 1; t < e.length; t++) e[t] ?? (e[t] = e[t - 1])
}
const Sr = e => e * 180 / Math.PI,
    Gc = e => {
        const t = Sr(Math.atan2(e[1], e[0]));
        return Qc(t)
    },
    yA = {
        x: 4,
        y: 5,
        translateX: 4,
        translateY: 5,
        scaleX: 0,
        scaleY: 3,
        scale: e => (Math.abs(e[0]) + Math.abs(e[3])) / 2,
        rotate: Gc,
        rotateZ: Gc,
        skewX: e => Sr(Math.atan(e[1])),
        skewY: e => Sr(Math.atan(e[2])),
        skew: e => (Math.abs(e[1]) + Math.abs(e[2])) / 2
    },
    Qc = e => (e = e % 360, e < 0 && (e += 360), e),
    cm = Gc,
    dm = e => Math.sqrt(e[0] * e[0] + e[1] * e[1]),
    fm = e => Math.sqrt(e[4] * e[4] + e[5] * e[5]),
    vA = {
        x: 12,
        y: 13,
        z: 14,
        translateX: 12,
        translateY: 13,
        translateZ: 14,
        scaleX: dm,
        scaleY: fm,
        scale: e => (dm(e) + fm(e)) / 2,
        rotateX: e => Qc(Sr(Math.atan2(e[6], e[5]))),
        rotateY: e => Qc(Sr(Math.atan2(-e[2], e[0]))),
        rotateZ: cm,
        rotate: cm,
        skewX: e => Sr(Math.atan(e[4])),
        skewY: e => Sr(Math.atan(e[1])),
        skew: e => (Math.abs(e[1]) + Math.abs(e[4])) / 2
    };

function Yc(e) {
    return e.includes("scale") ? 1 : 0
}

function Xc(e, t) {
    if (!e || e === "none") return Yc(t);
    const n = e.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
    let r, o;
    if (n) r = vA, o = n;
    else {
        const a = e.match(/^matrix\(([-\d.e\s,]+)\)$/u);
        r = yA, o = a
    }
    if (!o) return Yc(t);
    const i = r[t],
        s = o[1].split(",").map(xA);
    return typeof i == "function" ? i(s) : s[i]
}
const wA = (e, t) => {
    const {
        transform: n = "none"
    } = getComputedStyle(e);
    return Xc(n, t)
};

function xA(e) {
    return parseFloat(e.trim())
}
const Go = ["transformPerspective", "x", "y", "z", "translateX", "translateY", "translateZ", "scale", "scaleX", "scaleY", "rotate", "rotateX", "rotateY", "rotateZ", "skew", "skewX", "skewY"],
    Qo = new Set(Go),
    hm = e => e === Ko || e === F,
    SA = new Set(["x", "y", "z"]),
    EA = Go.filter(e => !SA.has(e));

function CA(e) {
    const t = [];
    return EA.forEach(n => {
        const r = e.getValue(n);
        r !== void 0 && (t.push([n, r.get()]), r.set(n.startsWith("scale") ? 1 : 0))
    }), t
}
const Un = {
    width: ({
        x: e
    }, {
        paddingLeft: t = "0",
        paddingRight: n = "0",
        boxSizing: r
    }) => {
        const o = e.max - e.min;
        return r === "border-box" ? o : o - parseFloat(t) - parseFloat(n)
    },
    height: ({
        y: e
    }, {
        paddingTop: t = "0",
        paddingBottom: n = "0",
        boxSizing: r
    }) => {
        const o = e.max - e.min;
        return r === "border-box" ? o : o - parseFloat(t) - parseFloat(n)
    },
    top: (e, {
        top: t
    }) => parseFloat(t),
    left: (e, {
        left: t
    }) => parseFloat(t),
    bottom: ({
        y: e
    }, {
        top: t
    }) => parseFloat(t) + (e.max - e.min),
    right: ({
        x: e
    }, {
        left: t
    }) => parseFloat(t) + (e.max - e.min),
    x: (e, {
        transform: t
    }) => Xc(t, "x"),
    y: (e, {
        transform: t
    }) => Xc(t, "y")
};
Un.translateX = Un.x;
Un.translateY = Un.y;
const Mr = new Set;
let qc = !1,
    Zc = !1,
    Jc = !1;

function Xw() {
    if (Zc) {
        const e = Array.from(Mr).filter(r => r.needsMeasurement),
            t = new Set(e.map(r => r.element)),
            n = new Map;
        t.forEach(r => {
            const o = CA(r);
            o.length && (n.set(r, o), r.render())
        }), e.forEach(r => r.measureInitialState()), t.forEach(r => {
            r.render();
            const o = n.get(r);
            o && o.forEach(([i, s]) => {
                var a;
                (a = r.getValue(i)) == null || a.set(s)
            })
        }), e.forEach(r => r.measureEndState()), e.forEach(r => {
            r.suspendedScrollY !== void 0 && window.scrollTo(0, r.suspendedScrollY)
        })
    }
    Zc = !1, qc = !1, Mr.forEach(e => e.complete(Jc)), Mr.clear()
}

function qw() {
    Mr.forEach(e => {
        e.readKeyframes(), e.needsMeasurement && (Zc = !0)
    })
}

function TA() {
    Jc = !0, qw(), Xw(), Jc = !1
}
class zf {
    constructor(t, n, r, o, i, s = !1) {
        this.state = "pending", this.isAsync = !1, this.needsMeasurement = !1, this.unresolvedKeyframes = [...t], this.onComplete = n, this.name = r, this.motionValue = o, this.element = i, this.isAsync = s
    }
    scheduleResolve() {
        this.state = "scheduled", this.isAsync ? (Mr.add(this), qc || (qc = !0, re.read(qw), re.resolveKeyframes(Xw))) : (this.readKeyframes(), this.complete())
    }
    readKeyframes() {
        const {
            unresolvedKeyframes: t,
            name: n,
            element: r,
            motionValue: o
        } = this;
        if (t[0] === null) {
            const i = o == null ? void 0 : o.get(),
                s = t[t.length - 1];
            if (i !== void 0) t[0] = i;
            else if (r && n) {
                const a = r.readValue(n, s);
                a != null && (t[0] = a)
            }
            t[0] === void 0 && (t[0] = s), o && i === void 0 && o.set(t[0])
        }
        gA(t)
    }
    setFinalKeyframe() {}
    measureInitialState() {}
    renderEndStyles() {}
    measureEndState() {}
    complete(t = !1) {
        this.state = "complete", this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, t), Mr.delete(this)
    }
    cancel() {
        this.state === "scheduled" && (Mr.delete(this), this.state = "pending")
    }
    resume() {
        this.state === "pending" && this.scheduleResolve()
    }
}
const PA = e => e.startsWith("--");

function Zw(e, t, n) {
    PA(t) ? e.style.setProperty(t, n) : e.style[t] = n
}
const bA = {};

function Jw(e, t) {
    const n = bw(e);
    return () => bA[t] ?? n()
}
const kA = Jw(() => window.ScrollTimeline !== void 0, "scrollTimeline"),
    e1 = Jw(() => {
        try {
            document.createElement("div").animate({
                opacity: 0
            }, {
                easing: "linear(0, 1)"
            })
        } catch {
            return !1
        }
        return !0
    }, "linearEasing"),
    fi = ([e, t, n, r]) => `cubic-bezier(${e}, ${t}, ${n}, ${r})`,
    pm = {
        linear: "linear",
        ease: "ease",
        easeIn: "ease-in",
        easeOut: "ease-out",
        easeInOut: "ease-in-out",
        circIn: fi([0, .65, .55, 1]),
        circOut: fi([.55, 0, 1, .45]),
        backIn: fi([.31, .01, .66, -.59]),
        backOut: fi([.33, 1.53, .69, .99])
    };

function t1(e, t) {
    if (e) return typeof e == "function" ? e1() ? Gw(e, t) : "ease-out" : Vw(e) ? fi(e) : Array.isArray(e) ? e.map(n => t1(n, t) || pm.easeOut) : pm[e]
}

function RA(e, t, n, {
    delay: r = 0,
    duration: o = 300,
    repeat: i = 0,
    repeatType: s = "loop",
    ease: a = "easeOut",
    times: l
} = {}, u = void 0) {
    const c = {
        [t]: n
    };
    l && (c.offset = l);
    const d = t1(a, o);
    Array.isArray(d) && (c.easing = d);
    const h = {
        delay: r,
        duration: o,
        easing: Array.isArray(d) ? "linear" : d,
        fill: "both",
        iterations: i + 1,
        direction: s === "reverse" ? "alternate" : "normal"
    };
    return u && (h.pseudoElement = u), e.animate(c, h)
}

function n1(e) {
    return typeof e == "function" && "applyToOptions" in e
}

function AA({
    type: e,
    ...t
}) {
    return n1(e) && e1() ? e.applyToOptions(t) : (t.duration ?? (t.duration = 300), t.ease ?? (t.ease = "easeOut"), t)
}
class r1 extends Ff {
    constructor(t) {
        if (super(), this.finishedTime = null, this.isStopped = !1, this.manualStartTime = null, !t) return;
        const {
            element: n,
            name: r,
            keyframes: o,
            pseudoElement: i,
            allowFlatten: s = !1,
            finalKeyframe: a,
            onComplete: l
        } = t;
        this.isPseudoElement = !!i, this.allowFlatten = s, this.options = t, Vo(typeof t.type != "string", `Mini animate() doesn't support "type" as a string.`, "mini-spring");
        const u = AA(t);
        this.animation = RA(n, r, o, u, i), u.autoplay === !1 && this.animation.pause(), this.animation.onfinish = () => {
            if (this.finishedTime = this.time, !i) {
                const c = Al(o, this.options, a, this.speed);
                this.updateMotionValue && this.updateMotionValue(c), Zw(n, r, c), this.animation.cancel()
            }
            l == null || l(), this.notifyFinished()
        }
    }
    play() {
        this.isStopped || (this.manualStartTime = null, this.animation.play(), this.state === "finished" && this.updateFinished())
    }
    pause() {
        this.animation.pause()
    }
    complete() {
        var t, n;
        (n = (t = this.animation).finish) == null || n.call(t)
    }
    cancel() {
        try {
            this.animation.cancel()
        } catch {}
    }
    stop() {
        if (this.isStopped) return;
        this.isStopped = !0;
        const {
            state: t
        } = this;
        t === "idle" || t === "finished" || (this.updateMotionValue ? this.updateMotionValue() : this.commitStyles(), this.isPseudoElement || this.cancel())
    }
    commitStyles() {
        var n, r, o;
        const t = (n = this.options) == null ? void 0 : n.element;
        !this.isPseudoElement && (t != null && t.isConnected) && ((o = (r = this.animation).commitStyles) == null || o.call(r))
    }
    get duration() {
        var n, r;
        const t = ((r = (n = this.animation.effect) == null ? void 0 : n.getComputedTiming) == null ? void 0 : r.call(n).duration) || 0;
        return mt(Number(t))
    }
    get iterationDuration() {
        const {
            delay: t = 0
        } = this.options || {};
        return this.duration + mt(t)
    }
    get time() {
        return mt(Number(this.animation.currentTime) || 0)
    }
    set time(t) {
        const n = this.finishedTime !== null;
        this.manualStartTime = null, this.finishedTime = null, this.animation.currentTime = Je(t), n && this.animation.pause()
    }
    get speed() {
        return this.animation.playbackRate
    }
    set speed(t) {
        t < 0 && (this.finishedTime = null), this.animation.playbackRate = t
    }
    get state() {
        return this.finishedTime !== null ? "finished" : this.animation.playState
    }
    get startTime() {
        return this.manualStartTime ?? Number(this.animation.startTime)
    }
    set startTime(t) {
        this.manualStartTime = this.animation.startTime = t
    }
    attachTimeline({
        timeline: t,
        rangeStart: n,
        rangeEnd: r,
        observe: o
    }) {
        var i;
        return this.allowFlatten && ((i = this.animation.effect) == null || i.updateTiming({
            easing: "linear"
        })), this.animation.onfinish = null, t && kA() ? (this.animation.timeline = t, n && (this.animation.rangeStart = n), r && (this.animation.rangeEnd = r), yt) : o(this)
    }
}
const o1 = {
    anticipate: Nw,
    backInOut: Lw,
    circInOut: Iw
};

function MA(e) {
    return e in o1
}

function DA(e) {
    typeof e.ease == "string" && MA(e.ease) && (e.ease = o1[e.ease])
}
const Eu = 10;
class LA extends r1 {
    constructor(t) {
        DA(t), Yw(t), super(t), t.startTime !== void 0 && t.autoplay !== !1 && (this.startTime = t.startTime), this.options = t
    }
    updateMotionValue(t) {
        const {
            motionValue: n,
            onUpdate: r,
            onComplete: o,
            element: i,
            ...s
        } = this.options;
        if (!n) return;
        if (t !== void 0) {
            n.set(t);
            return
        }
        const a = new Ga({
                ...s,
                autoplay: !1
            }),
            l = Math.max(Eu, Be.now() - this.startTime),
            u = en(0, Eu, l - Eu),
            c = a.sample(l).value,
            {
                name: d
            } = this.options;
        i && d && Zw(i, d, c), n.setWithVelocity(a.sample(Math.max(0, l - u)).value, c, u), a.stop()
    }
}
const mm = (e, t) => t === "zIndex" ? !1 : !!(typeof e == "number" || Array.isArray(e) || typeof e == "string" && (It.test(e) || e === "0") && !e.startsWith("url("));

function NA(e) {
    const t = e[0];
    if (e.length === 1) return !0;
    for (let n = 0; n < e.length; n++)
        if (e[n] !== t) return !0
}

function OA(e, t, n, r) {
    const o = e[0];
    if (o === null) return !1;
    if (t === "display" || t === "visibility") return !0;
    const i = e[e.length - 1],
        s = mm(o, t),
        a = mm(i, t);
    return Rl(s === a, `You are trying to animate ${t} from "${o}" to "${i}". "${s?i:o}" is not an animatable value.`, "value-not-animatable"), !s || !a ? !1 : NA(e) || (n === "spring" || n1(n)) && r
}

function ed(e) {
    e.duration = 0, e.type = "keyframes"
}
const i1 = new Set(["opacity", "clipPath", "filter", "transform"]),
    IA = /^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/;

function _A(e) {
    for (let t = 0; t < e.length; t++)
        if (typeof e[t] == "string" && IA.test(e[t])) return !0;
    return !1
}
const VA = new Set(["color", "backgroundColor", "outlineColor", "fill", "stroke", "borderColor", "borderTopColor", "borderRightColor", "borderBottomColor", "borderLeftColor"]),
    jA = bw(() => Object.hasOwnProperty.call(Element.prototype, "animate"));

function FA(e) {
    var d;
    const {
        motionValue: t,
        name: n,
        repeatDelay: r,
        repeatType: o,
        damping: i,
        type: s,
        keyframes: a
    } = e;
    if (!(((d = t == null ? void 0 : t.owner) == null ? void 0 : d.current) instanceof HTMLElement)) return !1;
    const {
        onUpdate: u,
        transformTemplate: c
    } = t.owner.getProps();
    return jA() && n && (i1.has(n) || VA.has(n) && _A(a)) && (n !== "transform" || !c) && !u && !r && o !== "mirror" && i !== 0 && s !== "inertia"
}
const zA = 40;
class $A extends Ff {
    constructor({
        autoplay: t = !0,
        delay: n = 0,
        type: r = "keyframes",
        repeat: o = 0,
        repeatDelay: i = 0,
        repeatType: s = "loop",
        keyframes: a,
        name: l,
        motionValue: u,
        element: c,
        ...d
    }) {
        var v;
        super(), this.stop = () => {
            var g, w;
            this._animation && (this._animation.stop(), (g = this.stopTimeline) == null || g.call(this)), (w = this.keyframeResolver) == null || w.cancel()
        }, this.createdAt = Be.now();
        const h = {
                autoplay: t,
                delay: n,
                type: r,
                repeat: o,
                repeatDelay: i,
                repeatType: s,
                name: l,
                motionValue: u,
                element: c,
                ...d
            },
            f = (c == null ? void 0 : c.KeyframeResolver) || zf;
        this.keyframeResolver = new f(a, (g, w, m) => this.onKeyframesResolved(g, w, h, !m), l, u, c), (v = this.keyframeResolver) == null || v.scheduleResolve()
    }
    onKeyframesResolved(t, n, r, o) {
        var m, p;
        this.keyframeResolver = void 0;
        const {
            name: i,
            type: s,
            velocity: a,
            delay: l,
            isHandoff: u,
            onUpdate: c
        } = r;
        this.resolvedAt = Be.now();
        let d = !0;
        OA(t, i, s, a) || (d = !1, (or.instantAnimations || !l) && (c == null || c(Al(t, r, n))), t[0] = t[t.length - 1], ed(r), r.repeat = 0);
        const f = {
                startTime: o ? this.resolvedAt ? this.resolvedAt - this.createdAt > zA ? this.resolvedAt : this.createdAt : this.createdAt : void 0,
                finalKeyframe: n,
                ...r,
                keyframes: t
            },
            v = d && !u && FA(f),
            g = (p = (m = f.motionValue) == null ? void 0 : m.owner) == null ? void 0 : p.current;
        let w;
        if (v) try {
            w = new LA({
                ...f,
                element: g
            })
        } catch {
            w = new Ga(f)
        } else w = new Ga(f);
        w.finished.then(() => {
            this.notifyFinished()
        }).catch(yt), this.pendingTimeline && (this.stopTimeline = w.attachTimeline(this.pendingTimeline), this.pendingTimeline = void 0), this._animation = w
    }
    get finished() {
        return this._animation ? this.animation.finished : this._finished
    }
    then(t, n) {
        return this.finished.finally(t).then(() => {})
    }
    get animation() {
        var t;
        return this._animation || ((t = this.keyframeResolver) == null || t.resume(), TA()), this._animation
    }
    get duration() {
        return this.animation.duration
    }
    get iterationDuration() {
        return this.animation.iterationDuration
    }
    get time() {
        return this.animation.time
    }
    set time(t) {
        this.animation.time = t
    }
    get speed() {
        return this.animation.speed
    }
    get state() {
        return this.animation.state
    }
    set speed(t) {
        this.animation.speed = t
    }
    get startTime() {
        return this.animation.startTime
    }
    attachTimeline(t) {
        return this._animation ? this.stopTimeline = this.animation.attachTimeline(t) : this.pendingTimeline = t, () => this.stop()
    }
    play() {
        this.animation.play()
    }
    pause() {
        this.animation.pause()
    }
    complete() {
        this.animation.complete()
    }
    cancel() {
        var t;
        this._animation && this.animation.cancel(), (t = this.keyframeResolver) == null || t.cancel()
    }
}

function s1(e, t, n, r = 0, o = 1) {
    const i = Array.from(e).sort((u, c) => u.sortNodePosition(c)).indexOf(t),
        s = e.size,
        a = (s - 1) * r;
    return typeof n == "function" ? n(i, s) : o === 1 ? i * r : a - i * r
}
const BA = /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;

function UA(e) {
    const t = BA.exec(e);
    if (!t) return [, ];
    const [, n, r, o] = t;
    return [`--${n??r}`, o]
}
const WA = 4;

function a1(e, t, n = 1) {
    Vo(n <= WA, `Max CSS variable fallback depth detected in property "${e}". This may indicate a circular fallback dependency.`, "max-css-var-depth");
    const [r, o] = UA(e);
    if (!r) return;
    const i = window.getComputedStyle(t).getPropertyValue(r);
    if (i) {
        const s = i.trim();
        return Cw(s) ? parseFloat(s) : s
    }
    return Of(o) ? a1(o, t, n + 1) : o
}
const HA = {
        type: "spring",
        stiffness: 500,
        damping: 25,
        restSpeed: 10
    },
    KA = e => ({
        type: "spring",
        stiffness: 550,
        damping: e === 0 ? 2 * Math.sqrt(550) : 30,
        restSpeed: 10
    }),
    GA = {
        type: "keyframes",
        duration: .8
    },
    QA = {
        type: "keyframes",
        ease: [.25, .1, .35, 1],
        duration: .3
    },
    YA = (e, {
        keyframes: t
    }) => t.length > 2 ? GA : Qo.has(e) ? e.startsWith("scale") ? KA(t[1]) : HA : QA;

function l1(e, t) {
    if (e != null && e.inherit && t) {
        const {
            inherit: n,
            ...r
        } = e;
        return {
            ...t,
            ...r
        }
    }
    return e
}

function $f(e, t) {
    const n = (e == null ? void 0 : e[t]) ?? (e == null ? void 0 : e.default) ?? e;
    return n !== e ? l1(n, e) : n
}
const XA = new Set(["when", "delay", "delayChildren", "staggerChildren", "staggerDirection", "repeat", "repeatType", "repeatDelay", "from", "elapsed"]);

function qA(e) {
    for (const t in e)
        if (!XA.has(t)) return !0;
    return !1
}
const Bf = (e, t, n, r = {}, o, i) => s => {
    const a = $f(r, e) || {},
        l = a.delay || r.delay || 0;
    let {
        elapsed: u = 0
    } = r;
    u = u - Je(l);
    const c = {
        keyframes: Array.isArray(n) ? n : [null, n],
        ease: "easeOut",
        velocity: t.getVelocity(),
        ...a,
        delay: -u,
        onUpdate: h => {
            t.set(h), a.onUpdate && a.onUpdate(h)
        },
        onComplete: () => {
            s(), a.onComplete && a.onComplete()
        },
        name: e,
        motionValue: t,
        element: i ? void 0 : o
    };
    qA(a) || Object.assign(c, YA(e, c)), c.duration && (c.duration = Je(c.duration)), c.repeatDelay && (c.repeatDelay = Je(c.repeatDelay)), c.from !== void 0 && (c.keyframes[0] = c.from);
    let d = !1;
    if ((c.type === !1 || c.duration === 0 && !c.repeatDelay) && (ed(c), c.delay === 0 && (d = !0)), (or.instantAnimations || or.skipAnimations || o != null && o.shouldSkipAnimations || a.skipAnimations) && (d = !0, ed(c), c.delay = 0), c.allowFlatten = !a.type && !a.ease, d && !i && t.get() !== void 0) {
        const h = Al(c.keyframes, a);
        if (h !== void 0) {
            re.update(() => {
                c.onUpdate(h), c.onComplete()
            });
            return
        }
    }
    return a.isSync ? new Ga(c) : new $A(c)
};

function gm(e) {
    const t = [{}, {}];
    return e == null || e.values.forEach((n, r) => {
        t[0][r] = n.get(), t[1][r] = n.getVelocity()
    }), t
}

function Uf(e, t, n, r) {
    if (typeof t == "function") {
        const [o, i] = gm(r);
        t = t(n !== void 0 ? n : e.custom, o, i)
    }
    if (typeof t == "string" && (t = e.variants && e.variants[t]), typeof t == "function") {
        const [o, i] = gm(r);
        t = t(n !== void 0 ? n : e.custom, o, i)
    }
    return t
}

function Dr(e, t, n) {
    const r = e.getProps();
    return Uf(r, t, n !== void 0 ? n : r.custom, e)
}
const u1 = new Set(["width", "height", "top", "left", "right", "bottom", ...Go]),
    ym = 30,
    ZA = e => !isNaN(parseFloat(e));
class JA {
    constructor(t, n = {}) {
        this.canTrackVelocity = null, this.events = {}, this.updateAndNotify = r => {
            var i;
            const o = Be.now();
            if (this.updatedAt !== o && this.setPrevFrameValue(), this.prev = this.current, this.setCurrent(r), this.current !== this.prev && ((i = this.events.change) == null || i.notify(this.current), this.dependents))
                for (const s of this.dependents) s.dirty()
        }, this.hasAnimated = !1, this.setCurrent(t), this.owner = n.owner
    }
    setCurrent(t) {
        this.current = t, this.updatedAt = Be.now(), this.canTrackVelocity === null && t !== void 0 && (this.canTrackVelocity = ZA(this.current))
    }
    setPrevFrameValue(t = this.current) {
        this.prevFrameValue = t, this.prevUpdatedAt = this.updatedAt
    }
    onChange(t) {
        return this.on("change", t)
    }
    on(t, n) {
        this.events[t] || (this.events[t] = new Df);
        const r = this.events[t].add(n);
        return t === "change" ? () => {
            r(), re.read(() => {
                this.events.change.getSize() || this.stop()
            })
        } : r
    }
    clearListeners() {
        for (const t in this.events) this.events[t].clear()
    }
    attach(t, n) {
        this.passiveEffect = t, this.stopPassiveEffect = n
    }
    set(t) {
        this.passiveEffect ? this.passiveEffect(t, this.updateAndNotify) : this.updateAndNotify(t)
    }
    setWithVelocity(t, n, r) {
        this.set(n), this.prev = void 0, this.prevFrameValue = t, this.prevUpdatedAt = this.updatedAt - r
    }
    jump(t, n = !0) {
        this.updateAndNotify(t), this.prev = t, this.prevUpdatedAt = this.prevFrameValue = void 0, n && this.stop(), this.stopPassiveEffect && this.stopPassiveEffect()
    }
    dirty() {
        var t;
        (t = this.events.change) == null || t.notify(this.current)
    }
    addDependent(t) {
        this.dependents || (this.dependents = new Set), this.dependents.add(t)
    }
    removeDependent(t) {
        this.dependents && this.dependents.delete(t)
    }
    get() {
        return this.current
    }
    getPrevious() {
        return this.prev
    }
    getVelocity() {
        const t = Be.now();
        if (!this.canTrackVelocity || this.prevFrameValue === void 0 || t - this.updatedAt > ym) return 0;
        const n = Math.min(this.updatedAt - this.prevUpdatedAt, ym);
        return kw(parseFloat(this.current) - parseFloat(this.prevFrameValue), n)
    }
    start(t) {
        return this.stop(), new Promise(n => {
            this.hasAnimated = !0, this.animation = t(n), this.events.animationStart && this.events.animationStart.notify()
        }).then(() => {
            this.events.animationComplete && this.events.animationComplete.notify(), this.clearAnimation()
        })
    }
    stop() {
        this.animation && (this.animation.stop(), this.events.animationCancel && this.events.animationCancel.notify()), this.clearAnimation()
    }
    isAnimating() {
        return !!this.animation
    }
    clearAnimation() {
        delete this.animation
    }
    destroy() {
        var t, n;
        (t = this.dependents) == null || t.clear(), (n = this.events.destroy) == null || n.notify(), this.clearListeners(), this.stop(), this.stopPassiveEffect && this.stopPassiveEffect()
    }
}

function Fo(e, t) {
    return new JA(e, t)
}
const td = e => Array.isArray(e);

function e2(e, t, n) {
    e.hasValue(t) ? e.getValue(t).set(n) : e.addValue(t, Fo(n))
}

function t2(e) {
    return td(e) ? e[e.length - 1] || 0 : e
}

function n2(e, t) {
    const n = Dr(e, t);
    let {
        transitionEnd: r = {},
        transition: o = {},
        ...i
    } = n || {};
    i = {
        ...i,
        ...r
    };
    for (const s in i) {
        const a = t2(i[s]);
        e2(e, s, a)
    }
}
const Ae = e => !!(e && e.getVelocity);

function r2(e) {
    return !!(Ae(e) && e.add)
}

function nd(e, t) {
    const n = e.getValue("willChange");
    if (r2(n)) return n.add(t);
    if (!n && or.WillChange) {
        const r = new or.WillChange("auto");
        e.addValue("willChange", r), r.add(t)
    }
}

function Wf(e) {
    return e.replace(/([A-Z])/g, t => `-${t.toLowerCase()}`)
}
const o2 = "framerAppearId",
    c1 = "data-" + Wf(o2);

function d1(e) {
    return e.props[c1]
}

function i2({
    protectedKeys: e,
    needsAnimating: t
}, n) {
    const r = e.hasOwnProperty(n) && t[n] !== !0;
    return t[n] = !1, r
}

function f1(e, t, {
    delay: n = 0,
    transitionOverride: r,
    type: o
} = {}) {
    let {
        transition: i,
        transitionEnd: s,
        ...a
    } = t;
    const l = e.getDefaultTransition();
    i = i ? l1(i, l) : l;
    const u = i == null ? void 0 : i.reduceMotion,
        c = i == null ? void 0 : i.skipAnimations;
    r && (i = r);
    const d = [],
        h = o && e.animationState && e.animationState.getState()[o];
    for (const f in a) {
        const v = e.getValue(f, e.latestValues[f] ?? null),
            g = a[f];
        if (g === void 0 || h && i2(h, f)) continue;
        const w = {
            delay: n,
            ...$f(i || {}, f)
        };
        c && (w.skipAnimations = !0);
        const m = v.get();
        if (m !== void 0 && !v.isAnimating() && !Array.isArray(g) && g === m && !w.velocity) {
            re.update(() => v.set(g));
            continue
        }
        let p = !1;
        if (window.MotionHandoffAnimation) {
            const E = d1(e);
            if (E) {
                const C = window.MotionHandoffAnimation(E, f, re);
                C !== null && (w.startTime = C, p = !0)
            }
        }
        nd(e, f);
        const y = u ?? e.shouldReduceMotion;
        v.start(Bf(f, v, g, y && u1.has(f) ? {
            type: !1
        } : w, e, p));
        const S = v.animation;
        S && d.push(S)
    }
    if (s) {
        const f = () => re.update(() => {
            s && n2(e, s)
        });
        d.length ? Promise.all(d).then(f) : f()
    }
    return d
}

function rd(e, t, n = {}) {
    var l;
    const r = Dr(e, t, n.type === "exit" ? (l = e.presenceContext) == null ? void 0 : l.custom : void 0);
    let {
        transition: o = e.getDefaultTransition() || {}
    } = r || {};
    n.transitionOverride && (o = n.transitionOverride);
    const i = r ? () => Promise.all(f1(e, r, n)) : () => Promise.resolve(),
        s = e.variantChildren && e.variantChildren.size ? (u = 0) => {
            const {
                delayChildren: c = 0,
                staggerChildren: d,
                staggerDirection: h
            } = o;
            return s2(e, t, u, c, d, h, n)
        } : () => Promise.resolve(),
        {
            when: a
        } = o;
    if (a) {
        const [u, c] = a === "beforeChildren" ? [i, s] : [s, i];
        return u().then(() => c())
    } else return Promise.all([i(), s(n.delay)])
}

function s2(e, t, n = 0, r = 0, o = 0, i = 1, s) {
    const a = [];
    for (const l of e.variantChildren) l.notify("AnimationStart", t), a.push(rd(l, t, {
        ...s,
        delay: n + (typeof r == "function" ? 0 : r) + s1(e.variantChildren, l, r, o, i)
    }).then(() => l.notify("AnimationComplete", t)));
    return Promise.all(a)
}

function a2(e, t, n = {}) {
    e.notify("AnimationStart", t);
    let r;
    if (Array.isArray(t)) {
        const o = t.map(i => rd(e, i, n));
        r = Promise.all(o)
    } else if (typeof t == "string") r = rd(e, t, n);
    else {
        const o = typeof t == "function" ? Dr(e, t, n.custom) : t;
        r = Promise.all(f1(e, o, n))
    }
    return r.then(() => {
        e.notify("AnimationComplete", t)
    })
}
const l2 = {
        test: e => e === "auto",
        parse: e => e
    },
    h1 = e => t => t.test(e),
    p1 = [Ko, F, Zt, An, NR, LR, l2],
    vm = e => p1.find(h1(e));

function u2(e) {
    return typeof e == "number" ? e === 0 : e !== null ? e === "none" || e === "0" || Pw(e) : !0
}
const c2 = new Set(["brightness", "contrast", "saturate", "opacity"]);

function d2(e) {
    const [t, n] = e.slice(0, -1).split("(");
    if (t === "drop-shadow") return e;
    const [r] = n.match(If) || [];
    if (!r) return e;
    const o = n.replace(r, "");
    let i = c2.has(t) ? 1 : 0;
    return r !== n && (i *= 100), t + "(" + i + o + ")"
}
const f2 = /\b([a-z-]*)\(.*?\)/gu,
    od = {
        ...It,
        getAnimatableNone: e => {
            const t = e.match(f2);
            return t ? t.map(d2).join(" ") : e
        }
    },
    id = {
        ...It,
        getAnimatableNone: e => {
            const t = It.parse(e);
            return It.createTransformer(e)(t.map(r => typeof r == "number" ? 0 : typeof r == "object" ? {
                ...r,
                alpha: 1
            } : r))
        }
    },
    wm = {
        ...Ko,
        transform: Math.round
    },
    h2 = {
        rotate: An,
        rotateX: An,
        rotateY: An,
        rotateZ: An,
        scale: Fs,
        scaleX: Fs,
        scaleY: Fs,
        scaleZ: Fs,
        skew: An,
        skewX: An,
        skewY: An,
        distance: F,
        translateX: F,
        translateY: F,
        translateZ: F,
        x: F,
        y: F,
        z: F,
        perspective: F,
        transformPerspective: F,
        opacity: Yi,
        originX: im,
        originY: im,
        originZ: F
    },
    Hf = {
        borderWidth: F,
        borderTopWidth: F,
        borderRightWidth: F,
        borderBottomWidth: F,
        borderLeftWidth: F,
        borderRadius: F,
        borderTopLeftRadius: F,
        borderTopRightRadius: F,
        borderBottomRightRadius: F,
        borderBottomLeftRadius: F,
        width: F,
        maxWidth: F,
        height: F,
        maxHeight: F,
        top: F,
        right: F,
        bottom: F,
        left: F,
        inset: F,
        insetBlock: F,
        insetBlockStart: F,
        insetBlockEnd: F,
        insetInline: F,
        insetInlineStart: F,
        insetInlineEnd: F,
        padding: F,
        paddingTop: F,
        paddingRight: F,
        paddingBottom: F,
        paddingLeft: F,
        paddingBlock: F,
        paddingBlockStart: F,
        paddingBlockEnd: F,
        paddingInline: F,
        paddingInlineStart: F,
        paddingInlineEnd: F,
        margin: F,
        marginTop: F,
        marginRight: F,
        marginBottom: F,
        marginLeft: F,
        marginBlock: F,
        marginBlockStart: F,
        marginBlockEnd: F,
        marginInline: F,
        marginInlineStart: F,
        marginInlineEnd: F,
        fontSize: F,
        backgroundPositionX: F,
        backgroundPositionY: F,
        ...h2,
        zIndex: wm,
        fillOpacity: Yi,
        strokeOpacity: Yi,
        numOctaves: wm
    },
    p2 = {
        ...Hf,
        color: we,
        backgroundColor: we,
        outlineColor: we,
        fill: we,
        stroke: we,
        borderColor: we,
        borderTopColor: we,
        borderRightColor: we,
        borderBottomColor: we,
        borderLeftColor: we,
        filter: od,
        WebkitFilter: od,
        mask: id,
        WebkitMask: id
    },
    m1 = e => p2[e],
    m2 = new Set([od, id]);

function g1(e, t) {
    let n = m1(e);
    return m2.has(n) || (n = It), n.getAnimatableNone ? n.getAnimatableNone(t) : void 0
}
const g2 = new Set(["auto", "none", "0"]);

function y2(e, t, n) {
    let r = 0,
        o;
    for (; r < e.length && !o;) {
        const i = e[r];
        typeof i == "string" && !g2.has(i) && jo(i).values.length && (o = e[r]), r++
    }
    if (o && n)
        for (const i of t) e[i] = g1(n, o)
}
class v2 extends zf {
    constructor(t, n, r, o, i) {
        super(t, n, r, o, i, !0)
    }
    readKeyframes() {
        const {
            unresolvedKeyframes: t,
            element: n,
            name: r
        } = this;
        if (!n || !n.current) return;
        super.readKeyframes();
        for (let c = 0; c < t.length; c++) {
            let d = t[c];
            if (typeof d == "string" && (d = d.trim(), Of(d))) {
                const h = a1(d, n.current);
                h !== void 0 && (t[c] = h), c === t.length - 1 && (this.finalKeyframe = d)
            }
        }
        if (this.resolveNoneKeyframes(), !u1.has(r) || t.length !== 2) return;
        const [o, i] = t, s = vm(o), a = vm(i), l = om(o), u = om(i);
        if (l !== u && Un[r]) {
            this.needsMeasurement = !0;
            return
        }
        if (s !== a)
            if (hm(s) && hm(a))
                for (let c = 0; c < t.length; c++) {
                    const d = t[c];
                    typeof d == "string" && (t[c] = parseFloat(d))
                } else Un[r] && (this.needsMeasurement = !0)
    }
    resolveNoneKeyframes() {
        const {
            unresolvedKeyframes: t,
            name: n
        } = this, r = [];
        for (let o = 0; o < t.length; o++)(t[o] === null || u2(t[o])) && r.push(o);
        r.length && y2(t, r, n)
    }
    measureInitialState() {
        const {
            element: t,
            unresolvedKeyframes: n,
            name: r
        } = this;
        if (!t || !t.current) return;
        r === "height" && (this.suspendedScrollY = window.pageYOffset), this.measuredOrigin = Un[r](t.measureViewportBox(), window.getComputedStyle(t.current)), n[0] = this.measuredOrigin;
        const o = n[n.length - 1];
        o !== void 0 && t.getValue(r, o).jump(o, !1)
    }
    measureEndState() {
        var a;
        const {
            element: t,
            name: n,
            unresolvedKeyframes: r
        } = this;
        if (!t || !t.current) return;
        const o = t.getValue(n);
        o && o.jump(this.measuredOrigin, !1);
        const i = r.length - 1,
            s = r[i];
        r[i] = Un[n](t.measureViewportBox(), window.getComputedStyle(t.current)), s !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = s), (a = this.removedTransforms) != null && a.length && this.removedTransforms.forEach(([l, u]) => {
            t.getValue(l).set(u)
        }), this.resolveNoneKeyframes()
    }
}

function y1(e, t, n) {
    if (e == null) return [];
    if (e instanceof EventTarget) return [e];
    if (typeof e == "string") {
        const o = document.querySelectorAll(e);
        return o ? Array.from(o) : []
    }
    return Array.from(e).filter(r => r != null)
}
const v1 = (e, t) => t && typeof e == "number" ? t.transform(e) : e;

function ia(e) {
    return Tw(e) && "offsetHeight" in e && !("ownerSVGElement" in e)
}
const {
    schedule: Kf,
    cancel: sN
} = jw(queueMicrotask, !1), bt = {
    x: !1,
    y: !1
};

function w1() {
    return bt.x || bt.y
}

function w2(e) {
    return e === "x" || e === "y" ? bt[e] ? null : (bt[e] = !0, () => {
        bt[e] = !1
    }) : bt.x || bt.y ? null : (bt.x = bt.y = !0, () => {
        bt.x = bt.y = !1
    })
}

function x1(e, t) {
    const n = y1(e),
        r = new AbortController,
        o = {
            passive: !0,
            ...t,
            signal: r.signal
        };
    return [n, o, () => r.abort()]
}

function x2(e) {
    return !(e.pointerType === "touch" || w1())
}

function S2(e, t, n = {}) {
    const [r, o, i] = x1(e, n);
    return r.forEach(s => {
        let a = !1,
            l = !1,
            u;
        const c = () => {
                s.removeEventListener("pointerleave", v)
            },
            d = w => {
                u && (u(w), u = void 0), c()
            },
            h = w => {
                a = !1, window.removeEventListener("pointerup", h), window.removeEventListener("pointercancel", h), l && (l = !1, d(w))
            },
            f = () => {
                a = !0, window.addEventListener("pointerup", h, o), window.addEventListener("pointercancel", h, o)
            },
            v = w => {
                if (w.pointerType !== "touch") {
                    if (a) {
                        l = !0;
                        return
                    }
                    d(w)
                }
            },
            g = w => {
                if (!x2(w)) return;
                l = !1;
                const m = t(s, w);
                typeof m == "function" && (u = m, s.addEventListener("pointerleave", v, o))
            };
        s.addEventListener("pointerenter", g, o), s.addEventListener("pointerdown", f, o)
    }), i
}
const S1 = (e, t) => t ? e === t ? !0 : S1(e, t.parentElement) : !1,
    Gf = e => e.pointerType === "mouse" ? typeof e.button != "number" || e.button <= 0 : e.isPrimary !== !1,
    E2 = new Set(["BUTTON", "INPUT", "SELECT", "TEXTAREA", "A"]);

function C2(e) {
    return E2.has(e.tagName) || e.isContentEditable === !0
}
const T2 = new Set(["INPUT", "SELECT", "TEXTAREA"]);

function P2(e) {
    return T2.has(e.tagName) || e.isContentEditable === !0
}
const sa = new WeakSet;

function xm(e) {
    return t => {
        t.key === "Enter" && e(t)
    }
}

function Cu(e, t) {
    e.dispatchEvent(new PointerEvent("pointer" + t, {
        isPrimary: !0,
        bubbles: !0
    }))
}
const b2 = (e, t) => {
    const n = e.currentTarget;
    if (!n) return;
    const r = xm(() => {
        if (sa.has(n)) return;
        Cu(n, "down");
        const o = xm(() => {
                Cu(n, "up")
            }),
            i = () => Cu(n, "cancel");
        n.addEventListener("keyup", o, t), n.addEventListener("blur", i, t)
    });
    n.addEventListener("keydown", r, t), n.addEventListener("blur", () => n.removeEventListener("keydown", r), t)
};

function Sm(e) {
    return Gf(e) && !w1()
}
const Em = new WeakSet;

function k2(e, t, n = {}) {
    const [r, o, i] = x1(e, n), s = a => {
        const l = a.currentTarget;
        if (!Sm(a) || Em.has(a)) return;
        sa.add(l), n.stopPropagation && Em.add(a);
        const u = t(l, a),
            c = (f, v) => {
                window.removeEventListener("pointerup", d), window.removeEventListener("pointercancel", h), sa.has(l) && sa.delete(l), Sm(f) && typeof u == "function" && u(f, {
                    success: v
                })
            },
            d = f => {
                c(f, l === window || l === document || n.useGlobalTarget || S1(l, f.target))
            },
            h = f => {
                c(f, !1)
            };
        window.addEventListener("pointerup", d, o), window.addEventListener("pointercancel", h, o)
    };
    return r.forEach(a => {
        (n.useGlobalTarget ? window : a).addEventListener("pointerdown", s, o), ia(a) && (a.addEventListener("focus", u => b2(u, o)), !C2(a) && !a.hasAttribute("tabindex") && (a.tabIndex = 0))
    }), i
}

function Qf(e) {
    return Tw(e) && "ownerSVGElement" in e
}
const aa = new WeakMap;
let Mn;
const E1 = (e, t, n) => (r, o) => o && o[0] ? o[0][e + "Size"] : Qf(r) && "getBBox" in r ? r.getBBox()[t] : r[n],
    R2 = E1("inline", "width", "offsetWidth"),
    A2 = E1("block", "height", "offsetHeight");

function M2({
    target: e,
    borderBoxSize: t
}) {
    var n;
    (n = aa.get(e)) == null || n.forEach(r => {
        r(e, {
            get width() {
                return R2(e, t)
            },
            get height() {
                return A2(e, t)
            }
        })
    })
}

function D2(e) {
    e.forEach(M2)
}

function L2() {
    typeof ResizeObserver > "u" || (Mn = new ResizeObserver(D2))
}

function N2(e, t) {
    Mn || L2();
    const n = y1(e);
    return n.forEach(r => {
        let o = aa.get(r);
        o || (o = new Set, aa.set(r, o)), o.add(t), Mn == null || Mn.observe(r)
    }), () => {
        n.forEach(r => {
            const o = aa.get(r);
            o == null || o.delete(t), o != null && o.size || Mn == null || Mn.unobserve(r)
        })
    }
}
const la = new Set;
let lo;

function O2() {
    lo = () => {
        const e = {
            get width() {
                return window.innerWidth
            },
            get height() {
                return window.innerHeight
            }
        };
        la.forEach(t => t(e))
    }, window.addEventListener("resize", lo)
}

function I2(e) {
    return la.add(e), lo || O2(), () => {
        la.delete(e), !la.size && typeof lo == "function" && (window.removeEventListener("resize", lo), lo = void 0)
    }
}

function Cm(e, t) {
    return typeof e == "function" ? I2(e) : N2(e, t)
}

function _2(e) {
    return Qf(e) && e.tagName === "svg"
}
const V2 = [...p1, we, It],
    j2 = e => V2.find(h1(e)),
    Tm = () => ({
        translate: 0,
        scale: 1,
        origin: 0,
        originPoint: 0
    }),
    uo = () => ({
        x: Tm(),
        y: Tm()
    }),
    Pm = () => ({
        min: 0,
        max: 0
    }),
    Se = () => ({
        x: Pm(),
        y: Pm()
    }),
    F2 = new WeakMap;

function Ml(e) {
    return e !== null && typeof e == "object" && typeof e.start == "function"
}

function Xi(e) {
    return typeof e == "string" || Array.isArray(e)
}
const Yf = ["animate", "whileInView", "whileFocus", "whileHover", "whileTap", "whileDrag", "exit"],
    Xf = ["initial", ...Yf];

function Dl(e) {
    return Ml(e.animate) || Xf.some(t => Xi(e[t]))
}

function C1(e) {
    return !!(Dl(e) || e.variants)
}

function z2(e, t, n) {
    for (const r in t) {
        const o = t[r],
            i = n[r];
        if (Ae(o)) e.addValue(r, o);
        else if (Ae(i)) e.addValue(r, Fo(o, {
            owner: e
        }));
        else if (i !== o)
            if (e.hasValue(r)) {
                const s = e.getValue(r);
                s.liveStyle === !0 ? s.jump(o) : s.hasAnimated || s.set(o)
            } else {
                const s = e.getStaticValue(r);
                e.addValue(r, Fo(s !== void 0 ? s : o, {
                    owner: e
                }))
            }
    }
    for (const r in n) t[r] === void 0 && e.removeValue(r);
    return t
}
const sd = {
        current: null
    },
    T1 = {
        current: !1
    },
    $2 = typeof window < "u";

function B2() {
    if (T1.current = !0, !!$2)
        if (window.matchMedia) {
            const e = window.matchMedia("(prefers-reduced-motion)"),
                t = () => sd.current = e.matches;
            e.addEventListener("change", t), t()
        } else sd.current = !1
}
const bm = ["AnimationStart", "AnimationComplete", "Update", "BeforeLayoutMeasure", "LayoutMeasure", "LayoutAnimationStart", "LayoutAnimationComplete"];
let Qa = {};

function P1(e) {
    Qa = e
}

function U2() {
    return Qa
}
class W2 {
    scrapeMotionValuesFromProps(t, n, r) {
        return {}
    }
    constructor({
        parent: t,
        props: n,
        presenceContext: r,
        reducedMotionConfig: o,
        skipAnimations: i,
        blockInitialAnimation: s,
        visualState: a
    }, l = {}) {
        this.current = null, this.children = new Set, this.isVariantNode = !1, this.isControllingVariants = !1, this.shouldReduceMotion = null, this.shouldSkipAnimations = !1, this.values = new Map, this.KeyframeResolver = zf, this.features = {}, this.valueSubscriptions = new Map, this.prevMotionValues = {}, this.hasBeenMounted = !1, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
            this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection))
        }, this.renderScheduledAt = 0, this.scheduleRender = () => {
            const f = Be.now();
            this.renderScheduledAt < f && (this.renderScheduledAt = f, re.render(this.render, !1, !0))
        };
        const {
            latestValues: u,
            renderState: c
        } = a;
        this.latestValues = u, this.baseTarget = {
            ...u
        }, this.initialValues = n.initial ? {
            ...u
        } : {}, this.renderState = c, this.parent = t, this.props = n, this.presenceContext = r, this.depth = t ? t.depth + 1 : 0, this.reducedMotionConfig = o, this.skipAnimationsConfig = i, this.options = l, this.blockInitialAnimation = !!s, this.isControllingVariants = Dl(n), this.isVariantNode = C1(n), this.isVariantNode && (this.variantChildren = new Set), this.manuallyAnimateOnMount = !!(t && t.current);
        const {
            willChange: d,
            ...h
        } = this.scrapeMotionValuesFromProps(n, {}, this);
        for (const f in h) {
            const v = h[f];
            u[f] !== void 0 && Ae(v) && v.set(u[f])
        }
    }
    mount(t) {
        var n, r;
        if (this.hasBeenMounted)
            for (const o in this.initialValues)(n = this.values.get(o)) == null || n.jump(this.initialValues[o]), this.latestValues[o] = this.initialValues[o];
        this.current = t, F2.set(t, this), this.projection && !this.projection.instance && this.projection.mount(t), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((o, i) => this.bindToMotionValue(i, o)), this.reducedMotionConfig === "never" ? this.shouldReduceMotion = !1 : this.reducedMotionConfig === "always" ? this.shouldReduceMotion = !0 : (T1.current || B2(), this.shouldReduceMotion = sd.current), this.shouldSkipAnimations = this.skipAnimationsConfig ?? !1, (r = this.parent) == null || r.addChild(this), this.update(this.props, this.presenceContext), this.hasBeenMounted = !0
    }
    unmount() {
        var t;
        this.projection && this.projection.unmount(), ir(this.notifyUpdate), ir(this.render), this.valueSubscriptions.forEach(n => n()), this.valueSubscriptions.clear(), this.removeFromVariantTree && this.removeFromVariantTree(), (t = this.parent) == null || t.removeChild(this);
        for (const n in this.events) this.events[n].clear();
        for (const n in this.features) {
            const r = this.features[n];
            r && (r.unmount(), r.isMounted = !1)
        }
        this.current = null
    }
    addChild(t) {
        this.children.add(t), this.enteringChildren ?? (this.enteringChildren = new Set), this.enteringChildren.add(t)
    }
    removeChild(t) {
        this.children.delete(t), this.enteringChildren && this.enteringChildren.delete(t)
    }
    bindToMotionValue(t, n) {
        if (this.valueSubscriptions.has(t) && this.valueSubscriptions.get(t)(), n.accelerate && i1.has(t) && this.current instanceof HTMLElement) {
            const {
                factory: s,
                keyframes: a,
                times: l,
                ease: u,
                duration: c
            } = n.accelerate, d = new r1({
                element: this.current,
                name: t,
                keyframes: a,
                times: l,
                ease: u,
                duration: Je(c)
            }), h = s(d);
            this.valueSubscriptions.set(t, () => {
                h(), d.cancel()
            });
            return
        }
        const r = Qo.has(t);
        r && this.onBindTransform && this.onBindTransform();
        const o = n.on("change", s => {
            this.latestValues[t] = s, this.props.onUpdate && re.preRender(this.notifyUpdate), r && this.projection && (this.projection.isTransformDirty = !0), this.scheduleRender()
        });
        let i;
        typeof window < "u" && window.MotionCheckAppearSync && (i = window.MotionCheckAppearSync(this, t, n)), this.valueSubscriptions.set(t, () => {
            o(), i && i()
        })
    }
    sortNodePosition(t) {
        return !this.current || !this.sortInstanceNodePosition || this.type !== t.type ? 0 : this.sortInstanceNodePosition(this.current, t.current)
    }
    updateFeatures() {
        let t = "animation";
        for (t in Qa) {
            const n = Qa[t];
            if (!n) continue;
            const {
                isEnabled: r,
                Feature: o
            } = n;
            if (!this.features[t] && o && r(this.props) && (this.features[t] = new o(this)), this.features[t]) {
                const i = this.features[t];
                i.isMounted ? i.update() : (i.mount(), i.isMounted = !0)
            }
        }
    }
    triggerBuild() {
        this.build(this.renderState, this.latestValues, this.props)
    }
    measureViewportBox() {
        return this.current ? this.measureInstanceViewportBox(this.current, this.props) : Se()
    }
    getStaticValue(t) {
        return this.latestValues[t]
    }
    setStaticValue(t, n) {
        this.latestValues[t] = n
    }
    update(t, n) {
        (t.transformTemplate || this.props.transformTemplate) && this.scheduleRender(), this.prevProps = this.props, this.props = t, this.prevPresenceContext = this.presenceContext, this.presenceContext = n;
        for (let r = 0; r < bm.length; r++) {
            const o = bm[r];
            this.propEventSubscriptions[o] && (this.propEventSubscriptions[o](), delete this.propEventSubscriptions[o]);
            const i = "on" + o,
                s = t[i];
            s && (this.propEventSubscriptions[o] = this.on(o, s))
        }
        this.prevMotionValues = z2(this, this.scrapeMotionValuesFromProps(t, this.prevProps || {}, this), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue()
    }
    getProps() {
        return this.props
    }
    getVariant(t) {
        return this.props.variants ? this.props.variants[t] : void 0
    }
    getDefaultTransition() {
        return this.props.transition
    }
    getTransformPagePoint() {
        return this.props.transformPagePoint
    }
    getClosestVariantNode() {
        return this.isVariantNode ? this : this.parent ? this.parent.getClosestVariantNode() : void 0
    }
    addVariantChild(t) {
        const n = this.getClosestVariantNode();
        if (n) return n.variantChildren && n.variantChildren.add(t), () => n.variantChildren.delete(t)
    }
    addValue(t, n) {
        const r = this.values.get(t);
        n !== r && (r && this.removeValue(t), this.bindToMotionValue(t, n), this.values.set(t, n), this.latestValues[t] = n.get())
    }
    removeValue(t) {
        this.values.delete(t);
        const n = this.valueSubscriptions.get(t);
        n && (n(), this.valueSubscriptions.delete(t)), delete this.latestValues[t], this.removeValueFromRenderState(t, this.renderState)
    }
    hasValue(t) {
        return this.values.has(t)
    }
    getValue(t, n) {
        if (this.props.values && this.props.values[t]) return this.props.values[t];
        let r = this.values.get(t);
        return r === void 0 && n !== void 0 && (r = Fo(n === null ? void 0 : n, {
            owner: this
        }), this.addValue(t, r)), r
    }
    readValue(t, n) {
        let r = this.latestValues[t] !== void 0 || !this.current ? this.latestValues[t] : this.getBaseTargetFromProps(this.props, t) ?? this.readValueFromInstance(this.current, t, this.options);
        return r != null && (typeof r == "string" && (Cw(r) || Pw(r)) ? r = parseFloat(r) : !j2(r) && It.test(n) && (r = g1(t, n)), this.setBaseTarget(t, Ae(r) ? r.get() : r)), Ae(r) ? r.get() : r
    }
    setBaseTarget(t, n) {
        this.baseTarget[t] = n
    }
    getBaseTarget(t) {
        var i;
        const {
            initial: n
        } = this.props;
        let r;
        if (typeof n == "string" || typeof n == "object") {
            const s = Uf(this.props, n, (i = this.presenceContext) == null ? void 0 : i.custom);
            s && (r = s[t])
        }
        if (n && r !== void 0) return r;
        const o = this.getBaseTargetFromProps(this.props, t);
        return o !== void 0 && !Ae(o) ? o : this.initialValues[t] !== void 0 && r === void 0 ? void 0 : this.baseTarget[t]
    }
    on(t, n) {
        return this.events[t] || (this.events[t] = new Df), this.events[t].add(n)
    }
    notify(t, ...n) {
        this.events[t] && this.events[t].notify(...n)
    }
    scheduleRenderMicrotask() {
        Kf.render(this.render)
    }
}
class b1 extends W2 {
    constructor() {
        super(...arguments), this.KeyframeResolver = v2
    }
    sortInstanceNodePosition(t, n) {
        return t.compareDocumentPosition(n) & 2 ? 1 : -1
    }
    getBaseTargetFromProps(t, n) {
        const r = t.style;
        return r ? r[n] : void 0
    }
    removeValueFromRenderState(t, {
        vars: n,
        style: r
    }) {
        delete n[t], delete r[t]
    }
    handleChildMotionValue() {
        this.childSubscription && (this.childSubscription(), delete this.childSubscription);
        const {
            children: t
        } = this.props;
        Ae(t) && (this.childSubscription = t.on("change", n => {
            this.current && (this.current.textContent = `${n}`)
        }))
    }
}
class ur {
    constructor(t) {
        this.isMounted = !1, this.node = t
    }
    update() {}
}

function k1({
    top: e,
    left: t,
    right: n,
    bottom: r
}) {
    return {
        x: {
            min: t,
            max: n
        },
        y: {
            min: e,
            max: r
        }
    }
}

function H2({
    x: e,
    y: t
}) {
    return {
        top: t.min,
        right: e.max,
        bottom: t.max,
        left: e.min
    }
}

function K2(e, t) {
    if (!t) return e;
    const n = t({
            x: e.left,
            y: e.top
        }),
        r = t({
            x: e.right,
            y: e.bottom
        });
    return {
        top: n.y,
        left: n.x,
        bottom: r.y,
        right: r.x
    }
}

function Tu(e) {
    return e === void 0 || e === 1
}

function ad({
    scale: e,
    scaleX: t,
    scaleY: n
}) {
    return !Tu(e) || !Tu(t) || !Tu(n)
}

function gr(e) {
    return ad(e) || R1(e) || e.z || e.rotate || e.rotateX || e.rotateY || e.skewX || e.skewY
}

function R1(e) {
    return km(e.x) || km(e.y)
}

function km(e) {
    return e && e !== "0%"
}

function Ya(e, t, n) {
    const r = e - n,
        o = t * r;
    return n + o
}

function Rm(e, t, n, r, o) {
    return o !== void 0 && (e = Ya(e, o, r)), Ya(e, n, r) + t
}

function ld(e, t = 0, n = 1, r, o) {
    e.min = Rm(e.min, t, n, r, o), e.max = Rm(e.max, t, n, r, o)
}

function A1(e, {
    x: t,
    y: n
}) {
    ld(e.x, t.translate, t.scale, t.originPoint), ld(e.y, n.translate, n.scale, n.originPoint)
}
const Am = .999999999999,
    Mm = 1.0000000000001;

function G2(e, t, n, r = !1) {
    var a;
    const o = n.length;
    if (!o) return;
    t.x = t.y = 1;
    let i, s;
    for (let l = 0; l < o; l++) {
        i = n[l], s = i.projectionDelta;
        const {
            visualElement: u
        } = i.options;
        u && u.props.style && u.props.style.display === "contents" || (r && i.options.layoutScroll && i.scroll && i !== i.root && (Kt(e.x, -i.scroll.offset.x), Kt(e.y, -i.scroll.offset.y)), s && (t.x *= s.x.scale, t.y *= s.y.scale, A1(e, s)), r && gr(i.latestValues) && ua(e, i.latestValues, (a = i.layout) == null ? void 0 : a.layoutBox))
    }
    t.x < Mm && t.x > Am && (t.x = 1), t.y < Mm && t.y > Am && (t.y = 1)
}

function Kt(e, t) {
    e.min += t, e.max += t
}

function Dm(e, t, n, r, o = .5) {
    const i = ae(e.min, e.max, o);
    ld(e, t, n, i, r)
}

function Lm(e, t) {
    return typeof e == "string" ? parseFloat(e) / 100 * (t.max - t.min) : e
}

function ua(e, t, n) {
    const r = n ?? e;
    Dm(e.x, Lm(t.x, r.x), t.scaleX, t.scale, t.originX), Dm(e.y, Lm(t.y, r.y), t.scaleY, t.scale, t.originY)
}

function M1(e, t) {
    return k1(K2(e.getBoundingClientRect(), t))
}

function Q2(e, t, n) {
    const r = M1(e, n),
        {
            scroll: o
        } = t;
    return o && (Kt(r.x, o.offset.x), Kt(r.y, o.offset.y)), r
}
const Y2 = {
        x: "translateX",
        y: "translateY",
        z: "translateZ",
        transformPerspective: "perspective"
    },
    X2 = Go.length;

function q2(e, t, n) {
    let r = "",
        o = !0;
    for (let i = 0; i < X2; i++) {
        const s = Go[i],
            a = e[s];
        if (a === void 0) continue;
        let l = !0;
        if (typeof a == "number") l = a === (s.startsWith("scale") ? 1 : 0);
        else {
            const u = parseFloat(a);
            l = s.startsWith("scale") ? u === 1 : u === 0
        }
        if (!l || n) {
            const u = v1(a, Hf[s]);
            if (!l) {
                o = !1;
                const c = Y2[s] || s;
                r += `${c}(${u}) `
            }
            n && (t[s] = u)
        }
    }
    return r = r.trim(), n ? r = n(t, o ? "" : r) : o && (r = "none"), r
}

function qf(e, t, n) {
    const {
        style: r,
        vars: o,
        transformOrigin: i
    } = e;
    let s = !1,
        a = !1;
    for (const l in t) {
        const u = t[l];
        if (Qo.has(l)) {
            s = !0;
            continue
        } else if (zw(l)) {
            o[l] = u;
            continue
        } else {
            const c = v1(u, Hf[l]);
            l.startsWith("origin") ? (a = !0, i[l] = c) : r[l] = c
        }
    }
    if (t.transform || (s || n ? r.transform = q2(t, e.transform, n) : r.transform && (r.transform = "none")), a) {
        const {
            originX: l = "50%",
            originY: u = "50%",
            originZ: c = 0
        } = i;
        r.transformOrigin = `${l} ${u} ${c}`
    }
}

function D1(e, {
    style: t,
    vars: n
}, r, o) {
    const i = e.style;
    let s;
    for (s in t) i[s] = t[s];
    o == null || o.applyProjectionStyles(i, r);
    for (s in n) i.setProperty(s, n[s])
}

function Nm(e, t) {
    return t.max === t.min ? 0 : e / (t.max - t.min) * 100
}
const ai = {
        correct: (e, t) => {
            if (!t.target) return e;
            if (typeof e == "string")
                if (F.test(e)) e = parseFloat(e);
                else return e;
            const n = Nm(e, t.target.x),
                r = Nm(e, t.target.y);
            return `${n}% ${r}%`
        }
    },
    Z2 = {
        correct: (e, {
            treeScale: t,
            projectionDelta: n
        }) => {
            const r = e,
                o = It.parse(e);
            if (o.length > 5) return r;
            const i = It.createTransformer(e),
                s = typeof o[0] != "number" ? 1 : 0,
                a = n.x.scale * t.x,
                l = n.y.scale * t.y;
            o[0 + s] /= a, o[1 + s] /= l;
            const u = ae(a, l, .5);
            return typeof o[2 + s] == "number" && (o[2 + s] /= u), typeof o[3 + s] == "number" && (o[3 + s] /= u), i(o)
        }
    },
    ud = {
        borderRadius: {
            ...ai,
            applyTo: ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomLeftRadius", "borderBottomRightRadius"]
        },
        borderTopLeftRadius: ai,
        borderTopRightRadius: ai,
        borderBottomLeftRadius: ai,
        borderBottomRightRadius: ai,
        boxShadow: Z2
    };

function L1(e, {
    layout: t,
    layoutId: n
}) {
    return Qo.has(e) || e.startsWith("origin") || (t || n !== void 0) && (!!ud[e] || e === "opacity")
}

function Zf(e, t, n) {
    var s;
    const r = e.style,
        o = t == null ? void 0 : t.style,
        i = {};
    if (!r) return i;
    for (const a in r)(Ae(r[a]) || o && Ae(o[a]) || L1(a, e) || ((s = n == null ? void 0 : n.getValue(a)) == null ? void 0 : s.liveStyle) !== void 0) && (i[a] = r[a]);
    return i
}

function J2(e) {
    return window.getComputedStyle(e)
}
class eM extends b1 {
    constructor() {
        super(...arguments), this.type = "html", this.renderInstance = D1
    }
    readValueFromInstance(t, n) {
        var r;
        if (Qo.has(n)) return (r = this.projection) != null && r.isProjecting ? Yc(n) : wA(t, n);
        {
            const o = J2(t),
                i = (zw(n) ? o.getPropertyValue(n) : o[n]) || 0;
            return typeof i == "string" ? i.trim() : i
        }
    }
    measureInstanceViewportBox(t, {
        transformPagePoint: n
    }) {
        return M1(t, n)
    }
    build(t, n, r) {
        qf(t, n, r.transformTemplate)
    }
    scrapeMotionValuesFromProps(t, n, r) {
        return Zf(t, n, r)
    }
}
const tM = {
        offset: "stroke-dashoffset",
        array: "stroke-dasharray"
    },
    nM = {
        offset: "strokeDashoffset",
        array: "strokeDasharray"
    };

function rM(e, t, n = 1, r = 0, o = !0) {
    e.pathLength = 1;
    const i = o ? tM : nM;
    e[i.offset] = `${-r}`, e[i.array] = `${t} ${n}`
}
const oM = ["offsetDistance", "offsetPath", "offsetRotate", "offsetAnchor"];

function N1(e, {
    attrX: t,
    attrY: n,
    attrScale: r,
    pathLength: o,
    pathSpacing: i = 1,
    pathOffset: s = 0,
    ...a
}, l, u, c) {
    if (qf(e, a, u), l) {
        e.style.viewBox && (e.attrs.viewBox = e.style.viewBox);
        return
    }
    e.attrs = e.style, e.style = {};
    const {
        attrs: d,
        style: h
    } = e;
    d.transform && (h.transform = d.transform, delete d.transform), (h.transform || d.transformOrigin) && (h.transformOrigin = d.transformOrigin ?? "50% 50%", delete d.transformOrigin), h.transform && (h.transformBox = (c == null ? void 0 : c.transformBox) ?? "fill-box", delete d.transformBox);
    for (const f of oM) d[f] !== void 0 && (h[f] = d[f], delete d[f]);
    t !== void 0 && (d.x = t), n !== void 0 && (d.y = n), r !== void 0 && (d.scale = r), o !== void 0 && rM(d, o, i, s, !1)
}
const O1 = new Set(["baseFrequency", "diffuseConstant", "kernelMatrix", "kernelUnitLength", "keySplines", "keyTimes", "limitingConeAngle", "markerHeight", "markerWidth", "numOctaves", "targetX", "targetY", "surfaceScale", "specularConstant", "specularExponent", "stdDeviation", "tableValues", "viewBox", "gradientTransform", "pathLength", "startOffset", "textLength", "lengthAdjust"]),
    I1 = e => typeof e == "string" && e.toLowerCase() === "svg";

function iM(e, t, n, r) {
    D1(e, t, void 0, r);
    for (const o in t.attrs) e.setAttribute(O1.has(o) ? o : Wf(o), t.attrs[o])
}

function _1(e, t, n) {
    const r = Zf(e, t, n);
    for (const o in e)
        if (Ae(e[o]) || Ae(t[o])) {
            const i = Go.indexOf(o) !== -1 ? "attr" + o.charAt(0).toUpperCase() + o.substring(1) : o;
            r[i] = e[o]
        } return r
}
class sM extends b1 {
    constructor() {
        super(...arguments), this.type = "svg", this.isSVGTag = !1, this.measureInstanceViewportBox = Se
    }
    getBaseTargetFromProps(t, n) {
        return t[n]
    }
    readValueFromInstance(t, n) {
        if (Qo.has(n)) {
            const r = m1(n);
            return r && r.default || 0
        }
        return n = O1.has(n) ? n : Wf(n), t.getAttribute(n)
    }
    scrapeMotionValuesFromProps(t, n, r) {
        return _1(t, n, r)
    }
    build(t, n, r) {
        N1(t, n, this.isSVGTag, r.transformTemplate, r.style)
    }
    renderInstance(t, n, r, o) {
        iM(t, n, r, o)
    }
    mount(t) {
        this.isSVGTag = I1(t.tagName), super.mount(t)
    }
}
const aM = Xf.length;

function V1(e) {
    if (!e) return;
    if (!e.isControllingVariants) {
        const n = e.parent ? V1(e.parent) || {} : {};
        return e.props.initial !== void 0 && (n.initial = e.props.initial), n
    }
    const t = {};
    for (let n = 0; n < aM; n++) {
        const r = Xf[n],
            o = e.props[r];
        (Xi(o) || o === !1) && (t[r] = o)
    }
    return t
}

function j1(e, t) {
    if (!Array.isArray(t)) return !1;
    const n = t.length;
    if (n !== e.length) return !1;
    for (let r = 0; r < n; r++)
        if (t[r] !== e[r]) return !1;
    return !0
}
const lM = [...Yf].reverse(),
    uM = Yf.length;

function cM(e) {
    return t => Promise.all(t.map(({
        animation: n,
        options: r
    }) => a2(e, n, r)))
}

function dM(e) {
    let t = cM(e),
        n = Om(),
        r = !0,
        o = !1;
    const i = u => (c, d) => {
        var f;
        const h = Dr(e, d, u === "exit" ? (f = e.presenceContext) == null ? void 0 : f.custom : void 0);
        if (h) {
            const {
                transition: v,
                transitionEnd: g,
                ...w
            } = h;
            c = {
                ...c,
                ...w,
                ...g
            }
        }
        return c
    };

    function s(u) {
        t = u(e)
    }

    function a(u) {
        const {
            props: c
        } = e, d = V1(e.parent) || {}, h = [], f = new Set;
        let v = {},
            g = 1 / 0;
        for (let m = 0; m < uM; m++) {
            const p = lM[m],
                y = n[p],
                S = c[p] !== void 0 ? c[p] : d[p],
                E = Xi(S),
                C = p === u ? y.isActive : null;
            C === !1 && (g = m);
            let T = S === d[p] && S !== c[p] && E;
            if (T && (r || o) && e.manuallyAnimateOnMount && (T = !1), y.protectedKeys = {
                    ...v
                }, !y.isActive && C === null || !S && !y.prevProp || Ml(S) || typeof S == "boolean") continue;
            if (p === "exit" && y.isActive && C !== !0) {
                y.prevResolvedValues && (v = {
                    ...v,
                    ...y.prevResolvedValues
                });
                continue
            }
            const b = fM(y.prevProp, S);
            let D = b || p === u && y.isActive && !T && E || m > g && E,
                R = !1;
            const V = Array.isArray(S) ? S : [S];
            let I = V.reduce(i(p), {});
            C === !1 && (I = {});
            const {
                prevResolvedValues: U = {}
            } = y, O = {
                ...U,
                ...I
            }, W = k => {
                D = !0, f.has(k) && (R = !0, f.delete(k)), y.needsAnimating[k] = !0;
                const A = e.getValue(k);
                A && (A.liveStyle = !1)
            };
            for (const k in O) {
                const A = I[k],
                    _ = U[k];
                if (v.hasOwnProperty(k)) continue;
                let B = !1;
                td(A) && td(_) ? B = !j1(A, _) || b : B = A !== _, B ? A != null ? W(k) : f.add(k) : A !== void 0 && f.has(k) ? W(k) : y.protectedKeys[k] = !0
            }
            y.prevProp = S, y.prevResolvedValues = I, y.isActive && (v = {
                ...v,
                ...I
            }), (r || o) && e.blockInitialAnimation && (D = !1);
            const z = T && b;
            D && (!z || R) && h.push(...V.map(k => {
                const A = {
                    type: p
                };
                if (typeof k == "string" && (r || o) && !z && e.manuallyAnimateOnMount && e.parent) {
                    const {
                        parent: _
                    } = e, B = Dr(_, k);
                    if (_.enteringChildren && B) {
                        const {
                            delayChildren: $
                        } = B.transition || {};
                        A.delay = s1(_.enteringChildren, e, $)
                    }
                }
                return {
                    animation: k,
                    options: A
                }
            }))
        }
        if (f.size) {
            const m = {};
            if (typeof c.initial != "boolean") {
                const p = Dr(e, Array.isArray(c.initial) ? c.initial[0] : c.initial);
                p && p.transition && (m.transition = p.transition)
            }
            f.forEach(p => {
                const y = e.getBaseTarget(p),
                    S = e.getValue(p);
                S && (S.liveStyle = !0), m[p] = y ?? null
            }), h.push({
                animation: m
            })
        }
        let w = !!h.length;
        return r && (c.initial === !1 || c.initial === c.animate) && !e.manuallyAnimateOnMount && (w = !1), r = !1, o = !1, w ? t(h) : Promise.resolve()
    }

    function l(u, c) {
        var h;
        if (n[u].isActive === c) return Promise.resolve();
        (h = e.variantChildren) == null || h.forEach(f => {
            var v;
            return (v = f.animationState) == null ? void 0 : v.setActive(u, c)
        }), n[u].isActive = c;
        const d = a(u);
        for (const f in n) n[f].protectedKeys = {};
        return d
    }
    return {
        animateChanges: a,
        setActive: l,
        setAnimateFunction: s,
        getState: () => n,
        reset: () => {
            n = Om(), o = !0
        }
    }
}

function fM(e, t) {
    return typeof t == "string" ? t !== e : Array.isArray(t) ? !j1(t, e) : !1
}

function hr(e = !1) {
    return {
        isActive: e,
        protectedKeys: {},
        needsAnimating: {},
        prevResolvedValues: {}
    }
}

function Om() {
    return {
        animate: hr(!0),
        whileInView: hr(),
        whileHover: hr(),
        whileTap: hr(),
        whileDrag: hr(),
        whileFocus: hr(),
        exit: hr()
    }
}

function cd(e, t) {
    e.min = t.min, e.max = t.max
}

function Pt(e, t) {
    cd(e.x, t.x), cd(e.y, t.y)
}

function Im(e, t) {
    e.translate = t.translate, e.scale = t.scale, e.originPoint = t.originPoint, e.origin = t.origin
}
const F1 = 1e-4,
    hM = 1 - F1,
    pM = 1 + F1,
    z1 = .01,
    mM = 0 - z1,
    gM = 0 + z1;

function Ue(e) {
    return e.max - e.min
}

function yM(e, t, n) {
    return Math.abs(e - t) <= n
}

function _m(e, t, n, r = .5) {
    e.origin = r, e.originPoint = ae(t.min, t.max, e.origin), e.scale = Ue(n) / Ue(t), e.translate = ae(n.min, n.max, e.origin) - e.originPoint, (e.scale >= hM && e.scale <= pM || isNaN(e.scale)) && (e.scale = 1), (e.translate >= mM && e.translate <= gM || isNaN(e.translate)) && (e.translate = 0)
}

function Pi(e, t, n, r) {
    _m(e.x, t.x, n.x, r ? r.originX : void 0), _m(e.y, t.y, n.y, r ? r.originY : void 0)
}

function Vm(e, t, n, r = 0) {
    const o = r ? ae(n.min, n.max, r) : n.min;
    e.min = o + t.min, e.max = e.min + Ue(t)
}

function vM(e, t, n, r) {
    Vm(e.x, t.x, n.x, r == null ? void 0 : r.x), Vm(e.y, t.y, n.y, r == null ? void 0 : r.y)
}

function jm(e, t, n, r = 0) {
    const o = r ? ae(n.min, n.max, r) : n.min;
    e.min = t.min - o, e.max = e.min + Ue(t)
}

function Xa(e, t, n, r) {
    jm(e.x, t.x, n.x, r == null ? void 0 : r.x), jm(e.y, t.y, n.y, r == null ? void 0 : r.y)
}

function Fm(e, t, n, r, o) {
    return e -= t, e = Ya(e, 1 / n, r), o !== void 0 && (e = Ya(e, 1 / o, r)), e
}

function wM(e, t = 0, n = 1, r = .5, o, i = e, s = e) {
    if (Zt.test(t) && (t = parseFloat(t), t = ae(s.min, s.max, t / 100) - s.min), typeof t != "number") return;
    let a = ae(i.min, i.max, r);
    e === i && (a -= t), e.min = Fm(e.min, t, n, a, o), e.max = Fm(e.max, t, n, a, o)
}

function zm(e, t, [n, r, o], i, s) {
    wM(e, t[n], t[r], t[o], t.scale, i, s)
}
const xM = ["x", "scaleX", "originX"],
    SM = ["y", "scaleY", "originY"];

function $m(e, t, n, r) {
    zm(e.x, t, xM, n ? n.x : void 0, r ? r.x : void 0), zm(e.y, t, SM, n ? n.y : void 0, r ? r.y : void 0)
}

function Bm(e) {
    return e.translate === 0 && e.scale === 1
}

function $1(e) {
    return Bm(e.x) && Bm(e.y)
}

function Um(e, t) {
    return e.min === t.min && e.max === t.max
}

function EM(e, t) {
    return Um(e.x, t.x) && Um(e.y, t.y)
}

function Wm(e, t) {
    return Math.round(e.min) === Math.round(t.min) && Math.round(e.max) === Math.round(t.max)
}

function B1(e, t) {
    return Wm(e.x, t.x) && Wm(e.y, t.y)
}

function Hm(e) {
    return Ue(e.x) / Ue(e.y)
}

function Km(e, t) {
    return e.translate === t.translate && e.scale === t.scale && e.originPoint === t.originPoint
}

function Bt(e) {
    return [e("x"), e("y")]
}

function CM(e, t, n) {
    let r = "";
    const o = e.x.translate / t.x,
        i = e.y.translate / t.y,
        s = (n == null ? void 0 : n.z) || 0;
    if ((o || i || s) && (r = `translate3d(${o}px, ${i}px, ${s}px) `), (t.x !== 1 || t.y !== 1) && (r += `scale(${1/t.x}, ${1/t.y}) `), n) {
        const {
            transformPerspective: u,
            rotate: c,
            rotateX: d,
            rotateY: h,
            skewX: f,
            skewY: v
        } = n;
        u && (r = `perspective(${u}px) ${r}`), c && (r += `rotate(${c}deg) `), d && (r += `rotateX(${d}deg) `), h && (r += `rotateY(${h}deg) `), f && (r += `skewX(${f}deg) `), v && (r += `skewY(${v}deg) `)
    }
    const a = e.x.scale * t.x,
        l = e.y.scale * t.y;
    return (a !== 1 || l !== 1) && (r += `scale(${a}, ${l})`), r || "none"
}
const U1 = ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomLeftRadius", "borderBottomRightRadius"],
    TM = U1.length,
    Gm = e => typeof e == "string" ? parseFloat(e) : e,
    Qm = e => typeof e == "number" || F.test(e);

function PM(e, t, n, r, o, i) {
    o ? (e.opacity = ae(0, n.opacity ?? 1, bM(r)), e.opacityExit = ae(t.opacity ?? 1, 0, kM(r))) : i && (e.opacity = ae(t.opacity ?? 1, n.opacity ?? 1, r));
    for (let s = 0; s < TM; s++) {
        const a = U1[s];
        let l = Ym(t, a),
            u = Ym(n, a);
        if (l === void 0 && u === void 0) continue;
        l || (l = 0), u || (u = 0), l === 0 || u === 0 || Qm(l) === Qm(u) ? (e[a] = Math.max(ae(Gm(l), Gm(u), r), 0), (Zt.test(u) || Zt.test(l)) && (e[a] += "%")) : e[a] = u
    }(t.rotate || n.rotate) && (e.rotate = ae(t.rotate || 0, n.rotate || 0, r))
}

function Ym(e, t) {
    return e[t] !== void 0 ? e[t] : e.borderRadius
}
const bM = W1(0, .5, Ow),
    kM = W1(.5, .95, yt);

function W1(e, t, n) {
    return r => r < e ? 0 : r > t ? 1 : n(Qi(e, t, r))
}

function RM(e, t, n) {
    const r = Ae(e) ? e : Fo(e);
    return r.start(Bf("", r, t, n)), r.animation
}

function qi(e, t, n, r = {
    passive: !0
}) {
    return e.addEventListener(t, n, r), () => e.removeEventListener(t, n)
}
const AM = (e, t) => e.depth - t.depth;
class MM {
    constructor() {
        this.children = [], this.isDirty = !1
    }
    add(t) {
        Mf(this.children, t), this.isDirty = !0
    }
    remove(t) {
        Ua(this.children, t), this.isDirty = !0
    }
    forEach(t) {
        this.isDirty && this.children.sort(AM), this.isDirty = !1, this.children.forEach(t)
    }
}

function DM(e, t) {
    const n = Be.now(),
        r = ({
            timestamp: o
        }) => {
            const i = o - n;
            i >= t && (ir(r), e(i - t))
        };
    return re.setup(r, !0), () => ir(r)
}

function ca(e) {
    return Ae(e) ? e.get() : e
}
class LM {
    constructor() {
        this.members = []
    }
    add(t) {
        Mf(this.members, t);
        for (let n = this.members.length - 1; n >= 0; n--) {
            const r = this.members[n];
            if (r === t || r === this.lead || r === this.prevLead) continue;
            const o = r.instance;
            (!o || o.isConnected === !1) && !r.snapshot && (Ua(this.members, r), r.unmount())
        }
        t.scheduleRender()
    }
    remove(t) {
        if (Ua(this.members, t), t === this.prevLead && (this.prevLead = void 0), t === this.lead) {
            const n = this.members[this.members.length - 1];
            n && this.promote(n)
        }
    }
    relegate(t) {
        var n;
        for (let r = this.members.indexOf(t) - 1; r >= 0; r--) {
            const o = this.members[r];
            if (o.isPresent !== !1 && ((n = o.instance) == null ? void 0 : n.isConnected) !== !1) return this.promote(o), !0
        }
        return !1
    }
    promote(t, n) {
        var o;
        const r = this.lead;
        if (t !== r && (this.prevLead = r, this.lead = t, t.show(), r)) {
            r.updateSnapshot(), t.scheduleRender();
            const {
                layoutDependency: i
            } = r.options, {
                layoutDependency: s
            } = t.options;
            (i === void 0 || i !== s) && (t.resumeFrom = r, n && (r.preserveOpacity = !0), r.snapshot && (t.snapshot = r.snapshot, t.snapshot.latestValues = r.animationValues || r.latestValues), (o = t.root) != null && o.isUpdating && (t.isLayoutDirty = !0)), t.options.crossfade === !1 && r.hide()
        }
    }
    exitAnimationComplete() {
        this.members.forEach(t => {
            var n, r, o, i, s;
            (r = (n = t.options).onExitComplete) == null || r.call(n), (s = (o = t.resumingFrom) == null ? void 0 : (i = o.options).onExitComplete) == null || s.call(i)
        })
    }
    scheduleRender() {
        this.members.forEach(t => t.instance && t.scheduleRender(!1))
    }
    removeLeadSnapshot() {
        var t;
        (t = this.lead) != null && t.snapshot && (this.lead.snapshot = void 0)
    }
}
const da = {
        hasAnimatedSinceResize: !0,
        hasEverUpdated: !1
    },
    Pu = ["", "X", "Y", "Z"],
    NM = 1e3;
let OM = 0;

function bu(e, t, n, r) {
    const {
        latestValues: o
    } = t;
    o[e] && (n[e] = o[e], t.setStaticValue(e, 0), r && (r[e] = 0))
}

function H1(e) {
    if (e.hasCheckedOptimisedAppear = !0, e.root === e) return;
    const {
        visualElement: t
    } = e.options;
    if (!t) return;
    const n = d1(t);
    if (window.MotionHasOptimisedAnimation(n, "transform")) {
        const {
            layout: o,
            layoutId: i
        } = e.options;
        window.MotionCancelOptimisedAnimation(n, "transform", re, !(o || i))
    }
    const {
        parent: r
    } = e;
    r && !r.hasCheckedOptimisedAppear && H1(r)
}

function K1({
    attachResizeListener: e,
    defaultParent: t,
    measureScroll: n,
    checkIsScrollRoot: r,
    resetTransform: o
}) {
    return class {
        constructor(s = {}, a = t == null ? void 0 : t()) {
            this.id = OM++, this.animationId = 0, this.animationCommitId = 0, this.children = new Set, this.options = {}, this.isTreeAnimating = !1, this.isAnimationBlocked = !1, this.isLayoutDirty = !1, this.isProjectionDirty = !1, this.isSharedProjectionDirty = !1, this.isTransformDirty = !1, this.updateManuallyBlocked = !1, this.updateBlockedByResize = !1, this.isUpdating = !1, this.isSVG = !1, this.needsReset = !1, this.shouldResetTransform = !1, this.hasCheckedOptimisedAppear = !1, this.treeScale = {
                x: 1,
                y: 1
            }, this.eventHandlers = new Map, this.hasTreeAnimated = !1, this.layoutVersion = 0, this.updateScheduled = !1, this.scheduleUpdate = () => this.update(), this.projectionUpdateScheduled = !1, this.checkUpdateFailed = () => {
                this.isUpdating && (this.isUpdating = !1, this.clearAllSnapshots())
            }, this.updateProjection = () => {
                this.projectionUpdateScheduled = !1, this.nodes.forEach(VM), this.nodes.forEach(UM), this.nodes.forEach(WM), this.nodes.forEach(jM)
            }, this.resolvedRelativeTargetAt = 0, this.linkedParentVersion = 0, this.hasProjected = !1, this.isVisible = !0, this.animationProgress = 0, this.sharedNodes = new Map, this.latestValues = s, this.root = a ? a.root || a : this, this.path = a ? [...a.path, a] : [], this.parent = a, this.depth = a ? a.depth + 1 : 0;
            for (let l = 0; l < this.path.length; l++) this.path[l].shouldResetTransform = !0;
            this.root === this && (this.nodes = new MM)
        }
        addEventListener(s, a) {
            return this.eventHandlers.has(s) || this.eventHandlers.set(s, new Df), this.eventHandlers.get(s).add(a)
        }
        notifyListeners(s, ...a) {
            const l = this.eventHandlers.get(s);
            l && l.notify(...a)
        }
        hasListeners(s) {
            return this.eventHandlers.has(s)
        }
        mount(s) {
            if (this.instance) return;
            this.isSVG = Qf(s) && !_2(s), this.instance = s;
            const {
                layoutId: a,
                layout: l,
                visualElement: u
            } = this.options;
            if (u && !u.current && u.mount(s), this.root.nodes.add(this), this.parent && this.parent.children.add(this), this.root.hasTreeAnimated && (l || a) && (this.isLayoutDirty = !0), e) {
                let c, d = 0;
                const h = () => this.root.updateBlockedByResize = !1;
                re.read(() => {
                    d = window.innerWidth
                }), e(s, () => {
                    const f = window.innerWidth;
                    f !== d && (d = f, this.root.updateBlockedByResize = !0, c && c(), c = DM(h, 250), da.hasAnimatedSinceResize && (da.hasAnimatedSinceResize = !1, this.nodes.forEach(Zm)))
                })
            }
            a && this.root.registerSharedNode(a, this), this.options.animate !== !1 && u && (a || l) && this.addEventListener("didUpdate", ({
                delta: c,
                hasLayoutChanged: d,
                hasRelativeLayoutChanged: h,
                layout: f
            }) => {
                if (this.isTreeAnimationBlocked()) {
                    this.target = void 0, this.relativeTarget = void 0;
                    return
                }
                const v = this.options.transition || u.getDefaultTransition() || YM,
                    {
                        onLayoutAnimationStart: g,
                        onLayoutAnimationComplete: w
                    } = u.getProps(),
                    m = !this.targetLayout || !B1(this.targetLayout, f),
                    p = !d && h;
                if (this.options.layoutRoot || this.resumeFrom || p || d && (m || !this.currentAnimation)) {
                    this.resumeFrom && (this.resumingFrom = this.resumeFrom, this.resumingFrom.resumingFrom = void 0);
                    const y = {
                        ...$f(v, "layout"),
                        onPlay: g,
                        onComplete: w
                    };
                    (u.shouldReduceMotion || this.options.layoutRoot) && (y.delay = 0, y.type = !1), this.startAnimation(y), this.setAnimationOrigin(c, p)
                } else d || Zm(this), this.isLead() && this.options.onExitComplete && this.options.onExitComplete();
                this.targetLayout = f
            })
        }
        unmount() {
            this.options.layoutId && this.willUpdate(), this.root.nodes.remove(this);
            const s = this.getStack();
            s && s.remove(this), this.parent && this.parent.children.delete(this), this.instance = void 0, this.eventHandlers.clear(), ir(this.updateProjection)
        }
        blockUpdate() {
            this.updateManuallyBlocked = !0
        }
        unblockUpdate() {
            this.updateManuallyBlocked = !1
        }
        isUpdateBlocked() {
            return this.updateManuallyBlocked || this.updateBlockedByResize
        }
        isTreeAnimationBlocked() {
            return this.isAnimationBlocked || this.parent && this.parent.isTreeAnimationBlocked() || !1
        }
        startUpdate() {
            this.isUpdateBlocked() || (this.isUpdating = !0, this.nodes && this.nodes.forEach(HM), this.animationId++)
        }
        getTransformTemplate() {
            const {
                visualElement: s
            } = this.options;
            return s && s.getProps().transformTemplate
        }
        willUpdate(s = !0) {
            if (this.root.hasTreeAnimated = !0, this.root.isUpdateBlocked()) {
                this.options.onExitComplete && this.options.onExitComplete();
                return
            }
            if (window.MotionCancelOptimisedAnimation && !this.hasCheckedOptimisedAppear && H1(this), !this.root.isUpdating && this.root.startUpdate(), this.isLayoutDirty) return;
            this.isLayoutDirty = !0;
            for (let c = 0; c < this.path.length; c++) {
                const d = this.path[c];
                d.shouldResetTransform = !0, (typeof d.latestValues.x == "string" || typeof d.latestValues.y == "string") && (d.isLayoutDirty = !0), d.updateScroll("snapshot"), d.options.layoutRoot && d.willUpdate(!1)
            }
            const {
                layoutId: a,
                layout: l
            } = this.options;
            if (a === void 0 && !l) return;
            const u = this.getTransformTemplate();
            this.prevTransformTemplateValue = u ? u(this.latestValues, "") : void 0, this.updateSnapshot(), s && this.notifyListeners("willUpdate")
        }
        update() {
            if (this.updateScheduled = !1, this.isUpdateBlocked()) {
                const l = this.updateBlockedByResize;
                this.unblockUpdate(), this.updateBlockedByResize = !1, this.clearAllSnapshots(), l && this.nodes.forEach(zM), this.nodes.forEach(Xm);
                return
            }
            if (this.animationId <= this.animationCommitId) {
                this.nodes.forEach(qm);
                return
            }
            this.animationCommitId = this.animationId, this.isUpdating ? (this.isUpdating = !1, this.nodes.forEach($M), this.nodes.forEach(BM), this.nodes.forEach(IM), this.nodes.forEach(_M)) : this.nodes.forEach(qm), this.clearAllSnapshots();
            const a = Be.now();
            Re.delta = en(0, 1e3 / 60, a - Re.timestamp), Re.timestamp = a, Re.isProcessing = !0, yu.update.process(Re), yu.preRender.process(Re), yu.render.process(Re), Re.isProcessing = !1
        }
        didUpdate() {
            this.updateScheduled || (this.updateScheduled = !0, Kf.read(this.scheduleUpdate))
        }
        clearAllSnapshots() {
            this.nodes.forEach(FM), this.sharedNodes.forEach(KM)
        }
        scheduleUpdateProjection() {
            this.projectionUpdateScheduled || (this.projectionUpdateScheduled = !0, re.preRender(this.updateProjection, !1, !0))
        }
        scheduleCheckAfterUnmount() {
            re.postRender(() => {
                this.isLayoutDirty ? this.root.didUpdate() : this.root.checkUpdateFailed()
            })
        }
        updateSnapshot() {
            this.snapshot || !this.instance || (this.snapshot = this.measure(), this.snapshot && !Ue(this.snapshot.measuredBox.x) && !Ue(this.snapshot.measuredBox.y) && (this.snapshot = void 0))
        }
        updateLayout() {
            if (!this.instance || (this.updateScroll(), !(this.options.alwaysMeasureLayout && this.isLead()) && !this.isLayoutDirty)) return;
            if (this.resumeFrom && !this.resumeFrom.instance)
                for (let l = 0; l < this.path.length; l++) this.path[l].updateScroll();
            const s = this.layout;
            this.layout = this.measure(!1), this.layoutVersion++, this.layoutCorrected || (this.layoutCorrected = Se()), this.isLayoutDirty = !1, this.projectionDelta = void 0, this.notifyListeners("measure", this.layout.layoutBox);
            const {
                visualElement: a
            } = this.options;
            a && a.notify("LayoutMeasure", this.layout.layoutBox, s ? s.layoutBox : void 0)
        }
        updateScroll(s = "measure") {
            let a = !!(this.options.layoutScroll && this.instance);
            if (this.scroll && this.scroll.animationId === this.root.animationId && this.scroll.phase === s && (a = !1), a && this.instance) {
                const l = r(this.instance);
                this.scroll = {
                    animationId: this.root.animationId,
                    phase: s,
                    isRoot: l,
                    offset: n(this.instance),
                    wasRoot: this.scroll ? this.scroll.isRoot : l
                }
            }
        }
        resetTransform() {
            if (!o) return;
            const s = this.isLayoutDirty || this.shouldResetTransform || this.options.alwaysMeasureLayout,
                a = this.projectionDelta && !$1(this.projectionDelta),
                l = this.getTransformTemplate(),
                u = l ? l(this.latestValues, "") : void 0,
                c = u !== this.prevTransformTemplateValue;
            s && this.instance && (a || gr(this.latestValues) || c) && (o(this.instance, u), this.shouldResetTransform = !1, this.scheduleRender())
        }
        measure(s = !0) {
            const a = this.measurePageBox();
            let l = this.removeElementScroll(a);
            return s && (l = this.removeTransform(l)), XM(l), {
                animationId: this.root.animationId,
                measuredBox: a,
                layoutBox: l,
                latestValues: {},
                source: this.id
            }
        }
        measurePageBox() {
            var u;
            const {
                visualElement: s
            } = this.options;
            if (!s) return Se();
            const a = s.measureViewportBox();
            if (!(((u = this.scroll) == null ? void 0 : u.wasRoot) || this.path.some(qM))) {
                const {
                    scroll: c
                } = this.root;
                c && (Kt(a.x, c.offset.x), Kt(a.y, c.offset.y))
            }
            return a
        }
        removeElementScroll(s) {
            var l;
            const a = Se();
            if (Pt(a, s), (l = this.scroll) != null && l.wasRoot) return a;
            for (let u = 0; u < this.path.length; u++) {
                const c = this.path[u],
                    {
                        scroll: d,
                        options: h
                    } = c;
                c !== this.root && d && h.layoutScroll && (d.wasRoot && Pt(a, s), Kt(a.x, d.offset.x), Kt(a.y, d.offset.y))
            }
            return a
        }
        applyTransform(s, a = !1, l) {
            var c, d;
            const u = l || Se();
            Pt(u, s);
            for (let h = 0; h < this.path.length; h++) {
                const f = this.path[h];
                !a && f.options.layoutScroll && f.scroll && f !== f.root && (Kt(u.x, -f.scroll.offset.x), Kt(u.y, -f.scroll.offset.y)), gr(f.latestValues) && ua(u, f.latestValues, (c = f.layout) == null ? void 0 : c.layoutBox)
            }
            return gr(this.latestValues) && ua(u, this.latestValues, (d = this.layout) == null ? void 0 : d.layoutBox), u
        }
        removeTransform(s) {
            var l;
            const a = Se();
            Pt(a, s);
            for (let u = 0; u < this.path.length; u++) {
                const c = this.path[u];
                if (!gr(c.latestValues)) continue;
                let d;
                c.instance && (ad(c.latestValues) && c.updateSnapshot(), d = Se(), Pt(d, c.measurePageBox())), $m(a, c.latestValues, (l = c.snapshot) == null ? void 0 : l.layoutBox, d)
            }
            return gr(this.latestValues) && $m(a, this.latestValues), a
        }
        setTargetDelta(s) {
            this.targetDelta = s, this.root.scheduleUpdateProjection(), this.isProjectionDirty = !0
        }
        setOptions(s) {
            this.options = {
                ...this.options,
                ...s,
                crossfade: s.crossfade !== void 0 ? s.crossfade : !0
            }
        }
        clearMeasurements() {
            this.scroll = void 0, this.layout = void 0, this.snapshot = void 0, this.prevTransformTemplateValue = void 0, this.targetDelta = void 0, this.target = void 0, this.isLayoutDirty = !1
        }
        forceRelativeParentToResolveTarget() {
            this.relativeParent && this.relativeParent.resolvedRelativeTargetAt !== Re.timestamp && this.relativeParent.resolveTargetDelta(!0)
        }
        resolveTargetDelta(s = !1) {
            var f;
            const a = this.getLead();
            this.isProjectionDirty || (this.isProjectionDirty = a.isProjectionDirty), this.isTransformDirty || (this.isTransformDirty = a.isTransformDirty), this.isSharedProjectionDirty || (this.isSharedProjectionDirty = a.isSharedProjectionDirty);
            const l = !!this.resumingFrom || this !== a;
            if (!(s || l && this.isSharedProjectionDirty || this.isProjectionDirty || (f = this.parent) != null && f.isProjectionDirty || this.attemptToResolveRelativeTarget || this.root.updateBlockedByResize)) return;
            const {
                layout: c,
                layoutId: d
            } = this.options;
            if (!this.layout || !(c || d)) return;
            this.resolvedRelativeTargetAt = Re.timestamp;
            const h = this.getClosestProjectingParent();
            h && this.linkedParentVersion !== h.layoutVersion && !h.options.layoutRoot && this.removeRelativeTarget(), !this.targetDelta && !this.relativeTarget && (this.options.layoutAnchor !== !1 && h && h.layout ? this.createRelativeTarget(h, this.layout.layoutBox, h.layout.layoutBox) : this.removeRelativeTarget()), !(!this.relativeTarget && !this.targetDelta) && (this.target || (this.target = Se(), this.targetWithTransforms = Se()), this.relativeTarget && this.relativeTargetOrigin && this.relativeParent && this.relativeParent.target ? (this.forceRelativeParentToResolveTarget(), vM(this.target, this.relativeTarget, this.relativeParent.target, this.options.layoutAnchor || void 0)) : this.targetDelta ? (this.resumingFrom ? this.applyTransform(this.layout.layoutBox, !1, this.target) : Pt(this.target, this.layout.layoutBox), A1(this.target, this.targetDelta)) : Pt(this.target, this.layout.layoutBox), this.attemptToResolveRelativeTarget && (this.attemptToResolveRelativeTarget = !1, this.options.layoutAnchor !== !1 && h && !!h.resumingFrom == !!this.resumingFrom && !h.options.layoutScroll && h.target && this.animationProgress !== 1 ? this.createRelativeTarget(h, this.target, h.target) : this.relativeParent = this.relativeTarget = void 0))
        }
        getClosestProjectingParent() {
            if (!(!this.parent || ad(this.parent.latestValues) || R1(this.parent.latestValues))) return this.parent.isProjecting() ? this.parent : this.parent.getClosestProjectingParent()
        }
        isProjecting() {
            return !!((this.relativeTarget || this.targetDelta || this.options.layoutRoot) && this.layout)
        }
        createRelativeTarget(s, a, l) {
            this.relativeParent = s, this.linkedParentVersion = s.layoutVersion, this.forceRelativeParentToResolveTarget(), this.relativeTarget = Se(), this.relativeTargetOrigin = Se(), Xa(this.relativeTargetOrigin, a, l, this.options.layoutAnchor || void 0), Pt(this.relativeTarget, this.relativeTargetOrigin)
        }
        removeRelativeTarget() {
            this.relativeParent = this.relativeTarget = void 0
        }
        calcProjection() {
            var v;
            const s = this.getLead(),
                a = !!this.resumingFrom || this !== s;
            let l = !0;
            if ((this.isProjectionDirty || (v = this.parent) != null && v.isProjectionDirty) && (l = !1), a && (this.isSharedProjectionDirty || this.isTransformDirty) && (l = !1), this.resolvedRelativeTargetAt === Re.timestamp && (l = !1), l) return;
            const {
                layout: u,
                layoutId: c
            } = this.options;
            if (this.isTreeAnimating = !!(this.parent && this.parent.isTreeAnimating || this.currentAnimation || this.pendingAnimation), this.isTreeAnimating || (this.targetDelta = this.relativeTarget = void 0), !this.layout || !(u || c)) return;
            Pt(this.layoutCorrected, this.layout.layoutBox);
            const d = this.treeScale.x,
                h = this.treeScale.y;
            G2(this.layoutCorrected, this.treeScale, this.path, a), s.layout && !s.target && (this.treeScale.x !== 1 || this.treeScale.y !== 1) && (s.target = s.layout.layoutBox, s.targetWithTransforms = Se());
            const {
                target: f
            } = s;
            if (!f) {
                this.prevProjectionDelta && (this.createProjectionDeltas(), this.scheduleRender());
                return
            }!this.projectionDelta || !this.prevProjectionDelta ? this.createProjectionDeltas() : (Im(this.prevProjectionDelta.x, this.projectionDelta.x), Im(this.prevProjectionDelta.y, this.projectionDelta.y)), Pi(this.projectionDelta, this.layoutCorrected, f, this.latestValues), (this.treeScale.x !== d || this.treeScale.y !== h || !Km(this.projectionDelta.x, this.prevProjectionDelta.x) || !Km(this.projectionDelta.y, this.prevProjectionDelta.y)) && (this.hasProjected = !0, this.scheduleRender(), this.notifyListeners("projectionUpdate", f))
        }
        hide() {
            this.isVisible = !1
        }
        show() {
            this.isVisible = !0
        }
        scheduleRender(s = !0) {
            var a;
            if ((a = this.options.visualElement) == null || a.scheduleRender(), s) {
                const l = this.getStack();
                l && l.scheduleRender()
            }
            this.resumingFrom && !this.resumingFrom.instance && (this.resumingFrom = void 0)
        }
        createProjectionDeltas() {
            this.prevProjectionDelta = uo(), this.projectionDelta = uo(), this.projectionDeltaWithTransform = uo()
        }
        setAnimationOrigin(s, a = !1) {
            const l = this.snapshot,
                u = l ? l.latestValues : {},
                c = {
                    ...this.latestValues
                },
                d = uo();
            (!this.relativeParent || !this.relativeParent.options.layoutRoot) && (this.relativeTarget = this.relativeTargetOrigin = void 0), this.attemptToResolveRelativeTarget = !a;
            const h = Se(),
                f = l ? l.source : void 0,
                v = this.layout ? this.layout.source : void 0,
                g = f !== v,
                w = this.getStack(),
                m = !w || w.members.length <= 1,
                p = !!(g && !m && this.options.crossfade === !0 && !this.path.some(QM));
            this.animationProgress = 0;
            let y;
            this.mixTargetDelta = S => {
                const E = S / 1e3;
                Jm(d.x, s.x, E), Jm(d.y, s.y, E), this.setTargetDelta(d), this.relativeTarget && this.relativeTargetOrigin && this.layout && this.relativeParent && this.relativeParent.layout && (Xa(h, this.layout.layoutBox, this.relativeParent.layout.layoutBox, this.options.layoutAnchor || void 0), GM(this.relativeTarget, this.relativeTargetOrigin, h, E), y && EM(this.relativeTarget, y) && (this.isProjectionDirty = !1), y || (y = Se()), Pt(y, this.relativeTarget)), g && (this.animationValues = c, PM(c, u, this.latestValues, E, p, m)), this.root.scheduleUpdateProjection(), this.scheduleRender(), this.animationProgress = E
            }, this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0)
        }
        startAnimation(s) {
            var a, l, u;
            this.notifyListeners("animationStart"), (a = this.currentAnimation) == null || a.stop(), (u = (l = this.resumingFrom) == null ? void 0 : l.currentAnimation) == null || u.stop(), this.pendingAnimation && (ir(this.pendingAnimation), this.pendingAnimation = void 0), this.pendingAnimation = re.update(() => {
                da.hasAnimatedSinceResize = !0, this.motionValue || (this.motionValue = Fo(0)), this.motionValue.jump(0, !1), this.currentAnimation = RM(this.motionValue, [0, 1e3], {
                    ...s,
                    velocity: 0,
                    isSync: !0,
                    onUpdate: c => {
                        this.mixTargetDelta(c), s.onUpdate && s.onUpdate(c)
                    },
                    onStop: () => {},
                    onComplete: () => {
                        s.onComplete && s.onComplete(), this.completeAnimation()
                    }
                }), this.resumingFrom && (this.resumingFrom.currentAnimation = this.currentAnimation), this.pendingAnimation = void 0
            })
        }
        completeAnimation() {
            this.resumingFrom && (this.resumingFrom.currentAnimation = void 0, this.resumingFrom.preserveOpacity = void 0);
            const s = this.getStack();
            s && s.exitAnimationComplete(), this.resumingFrom = this.currentAnimation = this.animationValues = void 0, this.notifyListeners("animationComplete")
        }
        finishAnimation() {
            this.currentAnimation && (this.mixTargetDelta && this.mixTargetDelta(NM), this.currentAnimation.stop()), this.completeAnimation()
        }
        applyTransformsToTarget() {
            const s = this.getLead();
            let {
                targetWithTransforms: a,
                target: l,
                layout: u,
                latestValues: c
            } = s;
            if (!(!a || !l || !u)) {
                if (this !== s && this.layout && u && G1(this.options.animationType, this.layout.layoutBox, u.layoutBox)) {
                    l = this.target || Se();
                    const d = Ue(this.layout.layoutBox.x);
                    l.x.min = s.target.x.min, l.x.max = l.x.min + d;
                    const h = Ue(this.layout.layoutBox.y);
                    l.y.min = s.target.y.min, l.y.max = l.y.min + h
                }
                Pt(a, l), ua(a, c), Pi(this.projectionDeltaWithTransform, this.layoutCorrected, a, c)
            }
        }
        registerSharedNode(s, a) {
            this.sharedNodes.has(s) || this.sharedNodes.set(s, new LM), this.sharedNodes.get(s).add(a);
            const u = a.options.initialPromotionConfig;
            a.promote({
                transition: u ? u.transition : void 0,
                preserveFollowOpacity: u && u.shouldPreserveFollowOpacity ? u.shouldPreserveFollowOpacity(a) : void 0
            })
        }
        isLead() {
            const s = this.getStack();
            return s ? s.lead === this : !0
        }
        getLead() {
            var a;
            const {
                layoutId: s
            } = this.options;
            return s ? ((a = this.getStack()) == null ? void 0 : a.lead) || this : this
        }
        getPrevLead() {
            var a;
            const {
                layoutId: s
            } = this.options;
            return s ? (a = this.getStack()) == null ? void 0 : a.prevLead : void 0
        }
        getStack() {
            const {
                layoutId: s
            } = this.options;
            if (s) return this.root.sharedNodes.get(s)
        }
        promote({
            needsReset: s,
            transition: a,
            preserveFollowOpacity: l
        } = {}) {
            const u = this.getStack();
            u && u.promote(this, l), s && (this.projectionDelta = void 0, this.needsReset = !0), a && this.setOptions({
                transition: a
            })
        }
        relegate() {
            const s = this.getStack();
            return s ? s.relegate(this) : !1
        }
        resetSkewAndRotation() {
            const {
                visualElement: s
            } = this.options;
            if (!s) return;
            let a = !1;
            const {
                latestValues: l
            } = s;
            if ((l.z || l.rotate || l.rotateX || l.rotateY || l.rotateZ || l.skewX || l.skewY) && (a = !0), !a) return;
            const u = {};
            l.z && bu("z", s, u, this.animationValues);
            for (let c = 0; c < Pu.length; c++) bu(`rotate${Pu[c]}`, s, u, this.animationValues), bu(`skew${Pu[c]}`, s, u, this.animationValues);
            s.render();
            for (const c in u) s.setStaticValue(c, u[c]), this.animationValues && (this.animationValues[c] = u[c]);
            s.scheduleRender()
        }
        applyProjectionStyles(s, a) {
            if (!this.instance || this.isSVG) return;
            if (!this.isVisible) {
                s.visibility = "hidden";
                return
            }
            const l = this.getTransformTemplate();
            if (this.needsReset) {
                this.needsReset = !1, s.visibility = "", s.opacity = "", s.pointerEvents = ca(a == null ? void 0 : a.pointerEvents) || "", s.transform = l ? l(this.latestValues, "") : "none";
                return
            }
            const u = this.getLead();
            if (!this.projectionDelta || !this.layout || !u.target) {
                this.options.layoutId && (s.opacity = this.latestValues.opacity !== void 0 ? this.latestValues.opacity : 1, s.pointerEvents = ca(a == null ? void 0 : a.pointerEvents) || ""), this.hasProjected && !gr(this.latestValues) && (s.transform = l ? l({}, "") : "none", this.hasProjected = !1);
                return
            }
            s.visibility = "";
            const c = u.animationValues || u.latestValues;
            this.applyTransformsToTarget();
            let d = CM(this.projectionDeltaWithTransform, this.treeScale, c);
            l && (d = l(c, d)), s.transform = d;
            const {
                x: h,
                y: f
            } = this.projectionDelta;
            s.transformOrigin = `${h.origin*100}% ${f.origin*100}% 0`, u.animationValues ? s.opacity = u === this ? c.opacity ?? this.latestValues.opacity ?? 1 : this.preserveOpacity ? this.latestValues.opacity : c.opacityExit : s.opacity = u === this ? c.opacity !== void 0 ? c.opacity : "" : c.opacityExit !== void 0 ? c.opacityExit : 0;
            for (const v in ud) {
                if (c[v] === void 0) continue;
                const {
                    correct: g,
                    applyTo: w,
                    isCSSVariable: m
                } = ud[v], p = d === "none" ? c[v] : g(c[v], u);
                if (w) {
                    const y = w.length;
                    for (let S = 0; S < y; S++) s[w[S]] = p
                } else m ? this.options.visualElement.renderState.vars[v] = p : s[v] = p
            }
            this.options.layoutId && (s.pointerEvents = u === this ? ca(a == null ? void 0 : a.pointerEvents) || "" : "none")
        }
        clearSnapshot() {
            this.resumeFrom = this.snapshot = void 0
        }
        resetTree() {
            this.root.nodes.forEach(s => {
                var a;
                return (a = s.currentAnimation) == null ? void 0 : a.stop()
            }), this.root.nodes.forEach(Xm), this.root.sharedNodes.clear()
        }
    }
}

function IM(e) {
    e.updateLayout()
}

function _M(e) {
    var n;
    const t = ((n = e.resumeFrom) == null ? void 0 : n.snapshot) || e.snapshot;
    if (e.isLead() && e.layout && t && e.hasListeners("didUpdate")) {
        const {
            layoutBox: r,
            measuredBox: o
        } = e.layout, {
            animationType: i
        } = e.options, s = t.source !== e.layout.source;
        if (i === "size") Bt(d => {
            const h = s ? t.measuredBox[d] : t.layoutBox[d],
                f = Ue(h);
            h.min = r[d].min, h.max = h.min + f
        });
        else if (i === "x" || i === "y") {
            const d = i === "x" ? "y" : "x";
            cd(s ? t.measuredBox[d] : t.layoutBox[d], r[d])
        } else G1(i, t.layoutBox, r) && Bt(d => {
            const h = s ? t.measuredBox[d] : t.layoutBox[d],
                f = Ue(r[d]);
            h.max = h.min + f, e.relativeTarget && !e.currentAnimation && (e.isProjectionDirty = !0, e.relativeTarget[d].max = e.relativeTarget[d].min + f)
        });
        const a = uo();
        Pi(a, r, t.layoutBox);
        const l = uo();
        s ? Pi(l, e.applyTransform(o, !0), t.measuredBox) : Pi(l, r, t.layoutBox);
        const u = !$1(a);
        let c = !1;
        if (!e.resumeFrom) {
            const d = e.getClosestProjectingParent();
            if (d && !d.resumeFrom) {
                const {
                    snapshot: h,
                    layout: f
                } = d;
                if (h && f) {
                    const v = e.options.layoutAnchor || void 0,
                        g = Se();
                    Xa(g, t.layoutBox, h.layoutBox, v);
                    const w = Se();
                    Xa(w, r, f.layoutBox, v), B1(g, w) || (c = !0), d.options.layoutRoot && (e.relativeTarget = w, e.relativeTargetOrigin = g, e.relativeParent = d)
                }
            }
        }
        e.notifyListeners("didUpdate", {
            layout: r,
            snapshot: t,
            delta: l,
            layoutDelta: a,
            hasLayoutChanged: u,
            hasRelativeLayoutChanged: c
        })
    } else if (e.isLead()) {
        const {
            onExitComplete: r
        } = e.options;
        r && r()
    }
    e.options.transition = void 0
}

function VM(e) {
    e.parent && (e.isProjecting() || (e.isProjectionDirty = e.parent.isProjectionDirty), e.isSharedProjectionDirty || (e.isSharedProjectionDirty = !!(e.isProjectionDirty || e.parent.isProjectionDirty || e.parent.isSharedProjectionDirty)), e.isTransformDirty || (e.isTransformDirty = e.parent.isTransformDirty))
}

function jM(e) {
    e.isProjectionDirty = e.isSharedProjectionDirty = e.isTransformDirty = !1
}

function FM(e) {
    e.clearSnapshot()
}

function Xm(e) {
    e.clearMeasurements()
}

function zM(e) {
    e.isLayoutDirty = !0, e.updateLayout()
}

function qm(e) {
    e.isLayoutDirty = !1
}

function $M(e) {
    e.isAnimationBlocked && e.layout && !e.isLayoutDirty && (e.snapshot = e.layout, e.isLayoutDirty = !0)
}

function BM(e) {
    const {
        visualElement: t
    } = e.options;
    t && t.getProps().onBeforeLayoutMeasure && t.notify("BeforeLayoutMeasure"), e.resetTransform()
}

function Zm(e) {
    e.finishAnimation(), e.targetDelta = e.relativeTarget = e.target = void 0, e.isProjectionDirty = !0
}

function UM(e) {
    e.resolveTargetDelta()
}

function WM(e) {
    e.calcProjection()
}

function HM(e) {
    e.resetSkewAndRotation()
}

function KM(e) {
    e.removeLeadSnapshot()
}

function Jm(e, t, n) {
    e.translate = ae(t.translate, 0, n), e.scale = ae(t.scale, 1, n), e.origin = t.origin, e.originPoint = t.originPoint
}

function eg(e, t, n, r) {
    e.min = ae(t.min, n.min, r), e.max = ae(t.max, n.max, r)
}

function GM(e, t, n, r) {
    eg(e.x, t.x, n.x, r), eg(e.y, t.y, n.y, r)
}

function QM(e) {
    return e.animationValues && e.animationValues.opacityExit !== void 0
}
const YM = {
        duration: .45,
        ease: [.4, 0, .1, 1]
    },
    tg = e => typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().includes(e),
    ng = tg("applewebkit/") && !tg("chrome/") ? Math.round : yt;

function rg(e) {
    e.min = ng(e.min), e.max = ng(e.max)
}

function XM(e) {
    rg(e.x), rg(e.y)
}

function G1(e, t, n) {
    return e === "position" || e === "preserve-aspect" && !yM(Hm(t), Hm(n), .2)
}

function qM(e) {
    var t;
    return e !== e.root && ((t = e.scroll) == null ? void 0 : t.wasRoot)
}
const ZM = K1({
        attachResizeListener: (e, t) => qi(e, "resize", t),
        measureScroll: () => {
            var e, t;
            return {
                x: document.documentElement.scrollLeft || ((e = document.body) == null ? void 0 : e.scrollLeft) || 0,
                y: document.documentElement.scrollTop || ((t = document.body) == null ? void 0 : t.scrollTop) || 0
            }
        },
        checkIsScrollRoot: () => !0
    }),
    ku = {
        current: void 0
    },
    Q1 = K1({
        measureScroll: e => ({
            x: e.scrollLeft,
            y: e.scrollTop
        }),
        defaultParent: () => {
            if (!ku.current) {
                const e = new ZM({});
                e.mount(window), e.setOptions({
                    layoutScroll: !0
                }), ku.current = e
            }
            return ku.current
        },
        resetTransform: (e, t) => {
            e.style.transform = t !== void 0 ? t : "none"
        },
        checkIsScrollRoot: e => window.getComputedStyle(e).position === "fixed"
    }),
    Jf = x.createContext({
        transformPagePoint: e => e,
        isStatic: !1,
        reducedMotion: "never"
    });

function og(e, t) {
    if (typeof e == "function") return e(t);
    e != null && (e.current = t)
}

function JM(...e) {
    return t => {
        let n = !1;
        const r = e.map(o => {
            const i = og(o, t);
            return !n && typeof i == "function" && (n = !0), i
        });
        if (n) return () => {
            for (let o = 0; o < r.length; o++) {
                const i = r[o];
                typeof i == "function" ? i() : og(e[o], null)
            }
        }
    }
}

function eD(...e) {
    return x.useCallback(JM(...e), e)
}
class tD extends x.Component {
    getSnapshotBeforeUpdate(t) {
        const n = this.props.childRef.current;
        if (ia(n) && t.isPresent && !this.props.isPresent && this.props.pop !== !1) {
            const r = n.offsetParent,
                o = ia(r) && r.offsetWidth || 0,
                i = ia(r) && r.offsetHeight || 0,
                s = getComputedStyle(n),
                a = this.props.sizeRef.current;
            a.height = parseFloat(s.height), a.width = parseFloat(s.width), a.top = n.offsetTop, a.left = n.offsetLeft, a.right = o - a.width - a.left, a.bottom = i - a.height - a.top, a.direction = s.direction
        }
        return null
    }
    componentDidUpdate() {}
    render() {
        return this.props.children
    }
}

function nD({
    children: e,
    isPresent: t,
    anchorX: n,
    anchorY: r,
    root: o,
    pop: i
}) {
    var h;
    const s = x.useId(),
        a = x.useRef(null),
        l = x.useRef({
            width: 0,
            height: 0,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            direction: "ltr"
        }),
        {
            nonce: u
        } = x.useContext(Jf),
        c = ((h = e.props) == null ? void 0 : h.ref) ?? (e == null ? void 0 : e.ref),
        d = eD(a, c);
    return x.useInsertionEffect(() => {
        const {
            width: f,
            height: v,
            top: g,
            left: w,
            right: m,
            bottom: p,
            direction: y
        } = l.current;
        if (t || i === !1 || !a.current || !f || !v) return;
        const S = y === "rtl",
            E = n === "left" ? S ? `right: ${m}` : `left: ${w}` : S ? `left: ${w}` : `right: ${m}`,
            C = r === "bottom" ? `bottom: ${p}` : `top: ${g}`;
        a.current.dataset.motionPopId = s;
        const T = document.createElement("style");
        u && (T.nonce = u);
        const b = o ?? document.head;
        return b.appendChild(T), T.sheet && T.sheet.insertRule(`
          [data-motion-pop-id="${s}"] {
            position: absolute !important;
            width: ${f}px !important;
            height: ${v}px !important;
            ${E}px !important;
            ${C}px !important;
          }
        `), () => {
            var D;
            (D = a.current) == null || D.removeAttribute("data-motion-pop-id"), b.contains(T) && b.removeChild(T)
        }
    }, [t]), P.jsx(tD, {
        isPresent: t,
        childRef: a,
        sizeRef: l,
        pop: i,
        children: i === !1 ? e : x.cloneElement(e, {
            ref: d
        })
    })
}
const rD = ({
    children: e,
    initial: t,
    isPresent: n,
    onExitComplete: r,
    custom: o,
    presenceAffectsLayout: i,
    mode: s,
    anchorX: a,
    anchorY: l,
    root: u
}) => {
    const c = Af(oD),
        d = x.useId();
    let h = !0,
        f = x.useMemo(() => (h = !1, {
            id: d,
            initial: t,
            isPresent: n,
            custom: o,
            onExitComplete: v => {
                c.set(v, !0);
                for (const g of c.values())
                    if (!g) return;
                r && r()
            },
            register: v => (c.set(v, !1), () => c.delete(v))
        }), [n, c, r]);
    return i && h && (f = {
        ...f
    }), x.useMemo(() => {
        c.forEach((v, g) => c.set(g, !1))
    }, [n]), x.useEffect(() => {
        !n && !c.size && r && r()
    }, [n]), e = P.jsx(nD, {
        pop: s === "popLayout",
        isPresent: n,
        anchorX: a,
        anchorY: l,
        root: u,
        children: e
    }), P.jsx(kl.Provider, {
        value: f,
        children: e
    })
};

function oD() {
    return new Map
}

function Y1(e = !0) {
    const t = x.useContext(kl);
    if (t === null) return [!0, null];
    const {
        isPresent: n,
        onExitComplete: r,
        register: o
    } = t, i = x.useId();
    x.useEffect(() => {
        if (e) return o(i)
    }, [e]);
    const s = x.useCallback(() => e && r && r(i), [i, r, e]);
    return !n && r ? [!1, s] : [!0]
}
const zs = e => e.key || "";

function ig(e) {
    const t = [];
    return x.Children.forEach(e, n => {
        x.isValidElement(n) && t.push(n)
    }), t
}
const dd = ({
        children: e,
        custom: t,
        initial: n = !0,
        onExitComplete: r,
        presenceAffectsLayout: o = !0,
        mode: i = "sync",
        propagate: s = !1,
        anchorX: a = "left",
        anchorY: l = "top",
        root: u
    }) => {
        const [c, d] = Y1(s), h = x.useMemo(() => ig(e), [e]), f = s && !c ? [] : h.map(zs), v = x.useRef(!0), g = x.useRef(h), w = Af(() => new Map), m = x.useRef(new Set), [p, y] = x.useState(h), [S, E] = x.useState(h);
        Ew(() => {
            v.current = !1, g.current = h;
            for (let b = 0; b < S.length; b++) {
                const D = zs(S[b]);
                f.includes(D) ? (w.delete(D), m.current.delete(D)) : w.get(D) !== !0 && w.set(D, !1)
            }
        }, [S, f.length, f.join("-")]);
        const C = [];
        if (h !== p) {
            let b = [...h];
            for (let D = 0; D < S.length; D++) {
                const R = S[D],
                    V = zs(R);
                f.includes(V) || (b.splice(D, 0, R), C.push(R))
            }
            return i === "wait" && C.length && (b = C), E(ig(b)), y(h), null
        }
        const {
            forceRender: T
        } = x.useContext(Rf);
        return P.jsx(P.Fragment, {
            children: S.map(b => {
                const D = zs(b),
                    R = s && !c ? !1 : h === S || f.includes(D),
                    V = () => {
                        if (m.current.has(D)) return;
                        if (w.has(D)) m.current.add(D), w.set(D, !0);
                        else return;
                        let I = !0;
                        w.forEach(U => {
                            U || (I = !1)
                        }), I && (T == null || T(), E(g.current), s && (d == null || d()), r && r())
                    };
                return P.jsx(rD, {
                    isPresent: R,
                    initial: !v.current || n ? void 0 : !1,
                    custom: t,
                    presenceAffectsLayout: o,
                    mode: i,
                    root: u,
                    onExitComplete: R ? void 0 : V,
                    anchorX: a,
                    anchorY: l,
                    children: b
                }, D)
            })
        })
    },
    X1 = x.createContext({
        strict: !1
    }),
    sg = {
        animation: ["animate", "variants", "whileHover", "whileTap", "exit", "whileInView", "whileFocus", "whileDrag"],
        exit: ["exit"],
        drag: ["drag", "dragControls"],
        focus: ["whileFocus"],
        hover: ["whileHover", "onHoverStart", "onHoverEnd"],
        tap: ["whileTap", "onTap", "onTapStart", "onTapCancel"],
        pan: ["onPan", "onPanStart", "onPanSessionStart", "onPanEnd"],
        inView: ["whileInView", "onViewportEnter", "onViewportLeave"],
        layout: ["layout", "layoutId"]
    };
let ag = !1;

function iD() {
    if (ag) return;
    const e = {};
    for (const t in sg) e[t] = {
        isEnabled: n => sg[t].some(r => !!n[r])
    };
    P1(e), ag = !0
}

function q1() {
    return iD(), U2()
}

function sD(e) {
    const t = q1();
    for (const n in e) t[n] = {
        ...t[n],
        ...e[n]
    };
    P1(t)
}
const aD = new Set(["animate", "exit", "variants", "initial", "style", "values", "variants", "transition", "transformTemplate", "custom", "inherit", "onBeforeLayoutMeasure", "onAnimationStart", "onAnimationComplete", "onUpdate", "onDragStart", "onDrag", "onDragEnd", "onMeasureDragConstraints", "onDirectionLock", "onDragTransitionEnd", "_dragX", "_dragY", "onHoverStart", "onHoverEnd", "onViewportEnter", "onViewportLeave", "globalTapTarget", "propagate", "ignoreStrict", "viewport"]);

function qa(e) {
    return e.startsWith("while") || e.startsWith("drag") && e !== "draggable" || e.startsWith("layout") || e.startsWith("onTap") || e.startsWith("onPan") || e.startsWith("onLayout") || aD.has(e)
}
let Z1 = e => !qa(e);

function lD(e) {
    typeof e == "function" && (Z1 = t => t.startsWith("on") ? !qa(t) : e(t))
}
try {
    lD(require("@emotion/is-prop-valid").default)
} catch {}

function uD(e, t, n) {
    const r = {};
    for (const o in e) o === "values" && typeof e.values == "object" || Ae(e[o]) || (Z1(o) || n === !0 && qa(o) || !t && !qa(o) || e.draggable && o.startsWith("onDrag")) && (r[o] = e[o]);
    return r
}
const Ll = x.createContext({});

function cD(e, t) {
    if (Dl(e)) {
        const {
            initial: n,
            animate: r
        } = e;
        return {
            initial: n === !1 || Xi(n) ? n : void 0,
            animate: Xi(r) ? r : void 0
        }
    }
    return e.inherit !== !1 ? t : {}
}

function dD(e) {
    const {
        initial: t,
        animate: n
    } = cD(e, x.useContext(Ll));
    return x.useMemo(() => ({
        initial: t,
        animate: n
    }), [lg(t), lg(n)])
}

function lg(e) {
    return Array.isArray(e) ? e.join(" ") : e
}
const eh = () => ({
    style: {},
    transform: {},
    transformOrigin: {},
    vars: {}
});

function J1(e, t, n) {
    for (const r in t) !Ae(t[r]) && !L1(r, n) && (e[r] = t[r])
}

function fD({
    transformTemplate: e
}, t) {
    return x.useMemo(() => {
        const n = eh();
        return qf(n, t, e), Object.assign({}, n.vars, n.style)
    }, [t])
}

function hD(e, t) {
    const n = e.style || {},
        r = {};
    return J1(r, n, e), Object.assign(r, fD(e, t)), r
}

function pD(e, t) {
    const n = {},
        r = hD(e, t);
    return e.drag && e.dragListener !== !1 && (n.draggable = !1, r.userSelect = r.WebkitUserSelect = r.WebkitTouchCallout = "none", r.touchAction = e.drag === !0 ? "none" : `pan-${e.drag==="x"?"y":"x"}`), e.tabIndex === void 0 && (e.onTap || e.onTapStart || e.whileTap) && (n.tabIndex = 0), n.style = r, n
}
const ex = () => ({
    ...eh(),
    attrs: {}
});

function mD(e, t, n, r) {
    const o = x.useMemo(() => {
        const i = ex();
        return N1(i, t, I1(r), e.transformTemplate, e.style), {
            ...i.attrs,
            style: {
                ...i.style
            }
        }
    }, [t]);
    if (e.style) {
        const i = {};
        J1(i, e.style, e), o.style = {
            ...i,
            ...o.style
        }
    }
    return o
}
const gD = ["animate", "circle", "defs", "desc", "ellipse", "g", "image", "line", "filter", "marker", "mask", "metadata", "path", "pattern", "polygon", "polyline", "rect", "stop", "switch", "symbol", "svg", "text", "tspan", "use", "view"];

function th(e) {
    return typeof e != "string" || e.includes("-") ? !1 : !!(gD.indexOf(e) > -1 || /[A-Z]/u.test(e))
}

function yD(e, t, n, {
    latestValues: r
}, o, i = !1, s) {
    const l = (s ?? th(e) ? mD : pD)(t, r, o, e),
        u = uD(t, typeof e == "string", i),
        c = e !== x.Fragment ? {
            ...u,
            ...l,
            ref: n
        } : {},
        {
            children: d
        } = t,
        h = x.useMemo(() => Ae(d) ? d.get() : d, [d]);
    return x.createElement(e, {
        ...c,
        children: h
    })
}

function vD({
    scrapeMotionValuesFromProps: e,
    createRenderState: t
}, n, r, o) {
    return {
        latestValues: wD(n, r, o, e),
        renderState: t()
    }
}

function wD(e, t, n, r) {
    const o = {},
        i = r(e, {});
    for (const h in i) o[h] = ca(i[h]);
    let {
        initial: s,
        animate: a
    } = e;
    const l = Dl(e),
        u = C1(e);
    t && u && !l && e.inherit !== !1 && (s === void 0 && (s = t.initial), a === void 0 && (a = t.animate));
    let c = n ? n.initial === !1 : !1;
    c = c || s === !1;
    const d = c ? a : s;
    if (d && typeof d != "boolean" && !Ml(d)) {
        const h = Array.isArray(d) ? d : [d];
        for (let f = 0; f < h.length; f++) {
            const v = Uf(e, h[f]);
            if (v) {
                const {
                    transitionEnd: g,
                    transition: w,
                    ...m
                } = v;
                for (const p in m) {
                    let y = m[p];
                    if (Array.isArray(y)) {
                        const S = c ? y.length - 1 : 0;
                        y = y[S]
                    }
                    y !== null && (o[p] = y)
                }
                for (const p in g) o[p] = g[p]
            }
        }
    }
    return o
}
const tx = e => (t, n) => {
        const r = x.useContext(Ll),
            o = x.useContext(kl),
            i = () => vD(e, t, r, o);
        return n ? i() : Af(i)
    },
    xD = tx({
        scrapeMotionValuesFromProps: Zf,
        createRenderState: eh
    }),
    SD = tx({
        scrapeMotionValuesFromProps: _1,
        createRenderState: ex
    }),
    ED = Symbol.for("motionComponentSymbol");

function CD(e, t, n) {
    const r = x.useRef(n);
    x.useInsertionEffect(() => {
        r.current = n
    });
    const o = x.useRef(null);
    return x.useCallback(i => {
        var a;
        i && ((a = e.onMount) == null || a.call(e, i)), t && (i ? t.mount(i) : t.unmount());
        const s = r.current;
        if (typeof s == "function")
            if (i) {
                const l = s(i);
                typeof l == "function" && (o.current = l)
            } else o.current ? (o.current(), o.current = null) : s(i);
        else s && (s.current = i)
    }, [t])
}
const nx = x.createContext({});

function Qr(e) {
    return e && typeof e == "object" && Object.prototype.hasOwnProperty.call(e, "current")
}

function TD(e, t, n, r, o, i) {
    var y, S;
    const {
        visualElement: s
    } = x.useContext(Ll), a = x.useContext(X1), l = x.useContext(kl), u = x.useContext(Jf), c = u.reducedMotion, d = u.skipAnimations, h = x.useRef(null), f = x.useRef(!1);
    r = r || a.renderer, !h.current && r && (h.current = r(e, {
        visualState: t,
        parent: s,
        props: n,
        presenceContext: l,
        blockInitialAnimation: l ? l.initial === !1 : !1,
        reducedMotionConfig: c,
        skipAnimations: d,
        isSVG: i
    }), f.current && h.current && (h.current.manuallyAnimateOnMount = !0));
    const v = h.current,
        g = x.useContext(nx);
    v && !v.projection && o && (v.type === "html" || v.type === "svg") && PD(h.current, n, o, g);
    const w = x.useRef(!1);
    x.useInsertionEffect(() => {
        v && w.current && v.update(n, l)
    });
    const m = n[c1],
        p = x.useRef(!!m && typeof window < "u" && !((y = window.MotionHandoffIsComplete) != null && y.call(window, m)) && ((S = window.MotionHasOptimisedAnimation) == null ? void 0 : S.call(window, m)));
    return Ew(() => {
        f.current = !0, v && (w.current = !0, window.MotionIsMounted = !0, v.updateFeatures(), v.scheduleRenderMicrotask(), p.current && v.animationState && v.animationState.animateChanges())
    }), x.useEffect(() => {
        v && (!p.current && v.animationState && v.animationState.animateChanges(), p.current && (queueMicrotask(() => {
            var E;
            (E = window.MotionHandoffMarkAsComplete) == null || E.call(window, m)
        }), p.current = !1), v.enteringChildren = void 0)
    }), v
}

function PD(e, t, n, r) {
    const {
        layoutId: o,
        layout: i,
        drag: s,
        dragConstraints: a,
        layoutScroll: l,
        layoutRoot: u,
        layoutAnchor: c,
        layoutCrossfade: d
    } = t;
    e.projection = new n(e.latestValues, t["data-framer-portal-id"] ? void 0 : rx(e.parent)), e.projection.setOptions({
        layoutId: o,
        layout: i,
        alwaysMeasureLayout: !!s || a && Qr(a),
        visualElement: e,
        animationType: typeof i == "string" ? i : "both",
        initialPromotionConfig: r,
        crossfade: d,
        layoutScroll: l,
        layoutRoot: u,
        layoutAnchor: c
    })
}

function rx(e) {
    if (e) return e.options.allowProjection !== !1 ? e.projection : rx(e.parent)
}

function Ru(e, {
    forwardMotionProps: t = !1,
    type: n
} = {}, r, o) {
    r && sD(r);
    const i = n ? n === "svg" : th(e),
        s = i ? SD : xD;

    function a(u, c) {
        let d;
        const h = {
                ...x.useContext(Jf),
                ...u,
                layoutId: bD(u)
            },
            {
                isStatic: f
            } = h,
            v = dD(u),
            g = s(u, f);
        if (!f && typeof window < "u") {
            kD();
            const w = RD(h);
            d = w.MeasureLayout, v.visualElement = TD(e, g, h, o, w.ProjectionNode, i)
        }
        return P.jsxs(Ll.Provider, {
            value: v,
            children: [d && v.visualElement ? P.jsx(d, {
                visualElement: v.visualElement,
                ...h
            }) : null, yD(e, u, CD(g, v.visualElement, c), g, f, t, i)]
        })
    }
    a.displayName = `motion.${typeof e=="string"?e:`create(${e.displayName??e.name??""})`}`;
    const l = x.forwardRef(a);
    return l[ED] = e, l
}

function bD({
    layoutId: e
}) {
    const t = x.useContext(Rf).id;
    return t && e !== void 0 ? t + "-" + e : e
}

function kD(e, t) {
    x.useContext(X1).strict
}

function RD(e) {
    const t = q1(),
        {
            drag: n,
            layout: r
        } = t;
    if (!n && !r) return {};
    const o = {
        ...n,
        ...r
    };
    return {
        MeasureLayout: n != null && n.isEnabled(e) || r != null && r.isEnabled(e) ? o.MeasureLayout : void 0,
        ProjectionNode: o.ProjectionNode
    }
}

function AD(e, t) {
    if (typeof Proxy > "u") return Ru;
    const n = new Map,
        r = (i, s) => Ru(i, s, e, t),
        o = (i, s) => r(i, s);
    return new Proxy(o, {
        get: (i, s) => s === "create" ? r : (n.has(s) || n.set(s, Ru(s, void 0, e, t)), n.get(s))
    })
}
const MD = (e, t) => t.isSVG ?? th(e) ? new sM(t) : new eM(t, {
    allowProjection: e !== x.Fragment
});
class DD extends ur {
    constructor(t) {
        super(t), t.animationState || (t.animationState = dM(t))
    }
    updateAnimationControlsSubscription() {
        const {
            animate: t
        } = this.node.getProps();
        Ml(t) && (this.unmountControls = t.subscribe(this.node))
    }
    mount() {
        this.updateAnimationControlsSubscription()
    }
    update() {
        const {
            animate: t
        } = this.node.getProps(), {
            animate: n
        } = this.node.prevProps || {};
        t !== n && this.updateAnimationControlsSubscription()
    }
    unmount() {
        var t;
        this.node.animationState.reset(), (t = this.unmountControls) == null || t.call(this)
    }
}
let LD = 0;
class ND extends ur {
    constructor() {
        super(...arguments), this.id = LD++, this.isExitComplete = !1
    }
    update() {
        var i;
        if (!this.node.presenceContext) return;
        const {
            isPresent: t,
            onExitComplete: n
        } = this.node.presenceContext, {
            isPresent: r
        } = this.node.prevPresenceContext || {};
        if (!this.node.animationState || t === r) return;
        if (t && r === !1) {
            if (this.isExitComplete) {
                const {
                    initial: s,
                    custom: a
                } = this.node.getProps();
                if (typeof s == "string" || typeof s == "object" && s !== null && !Array.isArray(s)) {
                    const l = Dr(this.node, s, a);
                    if (l) {
                        const {
                            transition: u,
                            transitionEnd: c,
                            ...d
                        } = l;
                        for (const h in d)(i = this.node.getValue(h)) == null || i.jump(d[h])
                    }
                }
                this.node.animationState.reset(), this.node.animationState.animateChanges()
            } else this.node.animationState.setActive("exit", !1);
            this.isExitComplete = !1;
            return
        }
        const o = this.node.animationState.setActive("exit", !t);
        n && !t && o.then(() => {
            this.isExitComplete = !0, n(this.id)
        })
    }
    mount() {
        const {
            register: t,
            onExitComplete: n
        } = this.node.presenceContext || {};
        n && n(this.id), t && (this.unmount = t(this.id))
    }
    unmount() {}
}
const OD = {
    animation: {
        Feature: DD
    },
    exit: {
        Feature: ND
    }
};

function ds(e) {
    return {
        point: {
            x: e.pageX,
            y: e.pageY
        }
    }
}
const ID = e => t => Gf(t) && e(t, ds(t));

function bi(e, t, n, r) {
    return qi(e, t, ID(n), r)
}
const ox = ({
        current: e
    }) => e ? e.ownerDocument.defaultView : null,
    ug = (e, t) => Math.abs(e - t);

function _D(e, t) {
    const n = ug(e.x, t.x),
        r = ug(e.y, t.y);
    return Math.sqrt(n ** 2 + r ** 2)
}
const cg = new Set(["auto", "scroll"]);
class ix {
    constructor(t, n, {
        transformPagePoint: r,
        contextWindow: o = window,
        dragSnapToOrigin: i = !1,
        distanceThreshold: s = 3,
        element: a
    } = {}) {
        if (this.startEvent = null, this.lastMoveEvent = null, this.lastMoveEventInfo = null, this.lastRawMoveEventInfo = null, this.handlers = {}, this.contextWindow = window, this.scrollPositions = new Map, this.removeScrollListeners = null, this.onElementScroll = f => {
                this.handleScroll(f.target)
            }, this.onWindowScroll = () => {
                this.handleScroll(window)
            }, this.updatePoint = () => {
                if (!(this.lastMoveEvent && this.lastMoveEventInfo)) return;
                this.lastRawMoveEventInfo && (this.lastMoveEventInfo = $s(this.lastRawMoveEventInfo, this.transformPagePoint));
                const f = Au(this.lastMoveEventInfo, this.history),
                    v = this.startEvent !== null,
                    g = _D(f.offset, {
                        x: 0,
                        y: 0
                    }) >= this.distanceThreshold;
                if (!v && !g) return;
                const {
                    point: w
                } = f, {
                    timestamp: m
                } = Re;
                this.history.push({
                    ...w,
                    timestamp: m
                });
                const {
                    onStart: p,
                    onMove: y
                } = this.handlers;
                v || (p && p(this.lastMoveEvent, f), this.startEvent = this.lastMoveEvent), y && y(this.lastMoveEvent, f)
            }, this.handlePointerMove = (f, v) => {
                this.lastMoveEvent = f, this.lastRawMoveEventInfo = v, this.lastMoveEventInfo = $s(v, this.transformPagePoint), re.update(this.updatePoint, !0)
            }, this.handlePointerUp = (f, v) => {
                this.end();
                const {
                    onEnd: g,
                    onSessionEnd: w,
                    resumeAnimation: m
                } = this.handlers;
                if ((this.dragSnapToOrigin || !this.startEvent) && m && m(), !(this.lastMoveEvent && this.lastMoveEventInfo)) return;
                const p = Au(f.type === "pointercancel" ? this.lastMoveEventInfo : $s(v, this.transformPagePoint), this.history);
                this.startEvent && g && g(f, p), w && w(f, p)
            }, !Gf(t)) return;
        this.dragSnapToOrigin = i, this.handlers = n, this.transformPagePoint = r, this.distanceThreshold = s, this.contextWindow = o || window;
        const l = ds(t),
            u = $s(l, this.transformPagePoint),
            {
                point: c
            } = u,
            {
                timestamp: d
            } = Re;
        this.history = [{
            ...c,
            timestamp: d
        }];
        const {
            onSessionStart: h
        } = n;
        h && h(t, Au(u, this.history)), this.removeListeners = ls(bi(this.contextWindow, "pointermove", this.handlePointerMove), bi(this.contextWindow, "pointerup", this.handlePointerUp), bi(this.contextWindow, "pointercancel", this.handlePointerUp)), a && this.startScrollTracking(a)
    }
    startScrollTracking(t) {
        let n = t.parentElement;
        for (; n;) {
            const r = getComputedStyle(n);
            (cg.has(r.overflowX) || cg.has(r.overflowY)) && this.scrollPositions.set(n, {
                x: n.scrollLeft,
                y: n.scrollTop
            }), n = n.parentElement
        }
        this.scrollPositions.set(window, {
            x: window.scrollX,
            y: window.scrollY
        }), window.addEventListener("scroll", this.onElementScroll, {
            capture: !0
        }), window.addEventListener("scroll", this.onWindowScroll), this.removeScrollListeners = () => {
            window.removeEventListener("scroll", this.onElementScroll, {
                capture: !0
            }), window.removeEventListener("scroll", this.onWindowScroll)
        }
    }
    handleScroll(t) {
        const n = this.scrollPositions.get(t);
        if (!n) return;
        const r = t === window,
            o = r ? {
                x: window.scrollX,
                y: window.scrollY
            } : {
                x: t.scrollLeft,
                y: t.scrollTop
            },
            i = {
                x: o.x - n.x,
                y: o.y - n.y
            };
        i.x === 0 && i.y === 0 || (r ? this.lastMoveEventInfo && (this.lastMoveEventInfo.point.x += i.x, this.lastMoveEventInfo.point.y += i.y) : this.history.length > 0 && (this.history[0].x -= i.x, this.history[0].y -= i.y), this.scrollPositions.set(t, o), re.update(this.updatePoint, !0))
    }
    updateHandlers(t) {
        this.handlers = t
    }
    end() {
        this.removeListeners && this.removeListeners(), this.removeScrollListeners && this.removeScrollListeners(), this.scrollPositions.clear(), ir(this.updatePoint)
    }
}

function $s(e, t) {
    return t ? {
        point: t(e.point)
    } : e
}

function dg(e, t) {
    return {
        x: e.x - t.x,
        y: e.y - t.y
    }
}

function Au({
    point: e
}, t) {
    return {
        point: e,
        delta: dg(e, sx(t)),
        offset: dg(e, VD(t)),
        velocity: jD(t, .1)
    }
}

function VD(e) {
    return e[0]
}

function sx(e) {
    return e[e.length - 1]
}

function jD(e, t) {
    if (e.length < 2) return {
        x: 0,
        y: 0
    };
    let n = e.length - 1,
        r = null;
    const o = sx(e);
    for (; n >= 0 && (r = e[n], !(o.timestamp - r.timestamp > Je(t)));) n--;
    if (!r) return {
        x: 0,
        y: 0
    };
    r === e[0] && e.length > 2 && o.timestamp - r.timestamp > Je(t) * 2 && (r = e[1]);
    const i = mt(o.timestamp - r.timestamp);
    if (i === 0) return {
        x: 0,
        y: 0
    };
    const s = {
        x: (o.x - r.x) / i,
        y: (o.y - r.y) / i
    };
    return s.x === 1 / 0 && (s.x = 0), s.y === 1 / 0 && (s.y = 0), s
}

function FD(e, {
    min: t,
    max: n
}, r) {
    return t !== void 0 && e < t ? e = r ? ae(t, e, r.min) : Math.max(e, t) : n !== void 0 && e > n && (e = r ? ae(n, e, r.max) : Math.min(e, n)), e
}

function fg(e, t, n) {
    return {
        min: t !== void 0 ? e.min + t : void 0,
        max: n !== void 0 ? e.max + n - (e.max - e.min) : void 0
    }
}

function zD(e, {
    top: t,
    left: n,
    bottom: r,
    right: o
}) {
    return {
        x: fg(e.x, n, o),
        y: fg(e.y, t, r)
    }
}

function hg(e, t) {
    let n = t.min - e.min,
        r = t.max - e.max;
    return t.max - t.min < e.max - e.min && ([n, r] = [r, n]), {
        min: n,
        max: r
    }
}

function $D(e, t) {
    return {
        x: hg(e.x, t.x),
        y: hg(e.y, t.y)
    }
}

function BD(e, t) {
    let n = .5;
    const r = Ue(e),
        o = Ue(t);
    return o > r ? n = Qi(t.min, t.max - r, e.min) : r > o && (n = Qi(e.min, e.max - o, t.min)), en(0, 1, n)
}

function UD(e, t) {
    const n = {};
    return t.min !== void 0 && (n.min = t.min - e.min), t.max !== void 0 && (n.max = t.max - e.min), n
}
const fd = .35;

function WD(e = fd) {
    return e === !1 ? e = 0 : e === !0 && (e = fd), {
        x: pg(e, "left", "right"),
        y: pg(e, "top", "bottom")
    }
}

function pg(e, t, n) {
    return {
        min: mg(e, t),
        max: mg(e, n)
    }
}

function mg(e, t) {
    return typeof e == "number" ? e : e[t] || 0
}
const HD = new WeakMap;
class KD {
    constructor(t) {
        this.openDragLock = null, this.isDragging = !1, this.currentDirection = null, this.originPoint = {
            x: 0,
            y: 0
        }, this.constraints = !1, this.hasMutatedConstraints = !1, this.elastic = Se(), this.latestPointerEvent = null, this.latestPanInfo = null, this.visualElement = t
    }
    start(t, {
        snapToCursor: n = !1,
        distanceThreshold: r
    } = {}) {
        const {
            presenceContext: o
        } = this.visualElement;
        if (o && o.isPresent === !1) return;
        const i = d => {
                n && this.snapToCursor(ds(d).point), this.stopAnimation()
            },
            s = (d, h) => {
                const {
                    drag: f,
                    dragPropagation: v,
                    onDragStart: g
                } = this.getProps();
                if (f && !v && (this.openDragLock && this.openDragLock(), this.openDragLock = w2(f), !this.openDragLock)) return;
                this.latestPointerEvent = d, this.latestPanInfo = h, this.isDragging = !0, this.currentDirection = null, this.resolveConstraints(), this.visualElement.projection && (this.visualElement.projection.isAnimationBlocked = !0, this.visualElement.projection.target = void 0), Bt(m => {
                    let p = this.getAxisMotionValue(m).get() || 0;
                    if (Zt.test(p)) {
                        const {
                            projection: y
                        } = this.visualElement;
                        if (y && y.layout) {
                            const S = y.layout.layoutBox[m];
                            S && (p = Ue(S) * (parseFloat(p) / 100))
                        }
                    }
                    this.originPoint[m] = p
                }), g && re.update(() => g(d, h), !1, !0), nd(this.visualElement, "transform");
                const {
                    animationState: w
                } = this.visualElement;
                w && w.setActive("whileDrag", !0)
            },
            a = (d, h) => {
                this.latestPointerEvent = d, this.latestPanInfo = h;
                const {
                    dragPropagation: f,
                    dragDirectionLock: v,
                    onDirectionLock: g,
                    onDrag: w
                } = this.getProps();
                if (!f && !this.openDragLock) return;
                const {
                    offset: m
                } = h;
                if (v && this.currentDirection === null) {
                    this.currentDirection = QD(m), this.currentDirection !== null && g && g(this.currentDirection);
                    return
                }
                this.updateAxis("x", h.point, m), this.updateAxis("y", h.point, m), this.visualElement.render(), w && re.update(() => w(d, h), !1, !0)
            },
            l = (d, h) => {
                this.latestPointerEvent = d, this.latestPanInfo = h, this.stop(d, h), this.latestPointerEvent = null, this.latestPanInfo = null
            },
            u = () => {
                const {
                    dragSnapToOrigin: d
                } = this.getProps();
                (d || this.constraints) && this.startAnimation({
                    x: 0,
                    y: 0
                })
            },
            {
                dragSnapToOrigin: c
            } = this.getProps();
        this.panSession = new ix(t, {
            onSessionStart: i,
            onStart: s,
            onMove: a,
            onSessionEnd: l,
            resumeAnimation: u
        }, {
            transformPagePoint: this.visualElement.getTransformPagePoint(),
            dragSnapToOrigin: c,
            distanceThreshold: r,
            contextWindow: ox(this.visualElement),
            element: this.visualElement.current
        })
    }
    stop(t, n) {
        const r = t || this.latestPointerEvent,
            o = n || this.latestPanInfo,
            i = this.isDragging;
        if (this.cancel(), !i || !o || !r) return;
        const {
            velocity: s
        } = o;
        this.startAnimation(s);
        const {
            onDragEnd: a
        } = this.getProps();
        a && re.postRender(() => a(r, o))
    }
    cancel() {
        this.isDragging = !1;
        const {
            projection: t,
            animationState: n
        } = this.visualElement;
        t && (t.isAnimationBlocked = !1), this.endPanSession();
        const {
            dragPropagation: r
        } = this.getProps();
        !r && this.openDragLock && (this.openDragLock(), this.openDragLock = null), n && n.setActive("whileDrag", !1)
    }
    endPanSession() {
        this.panSession && this.panSession.end(), this.panSession = void 0
    }
    updateAxis(t, n, r) {
        const {
            drag: o
        } = this.getProps();
        if (!r || !Bs(t, o, this.currentDirection)) return;
        const i = this.getAxisMotionValue(t);
        let s = this.originPoint[t] + r[t];
        this.constraints && this.constraints[t] && (s = FD(s, this.constraints[t], this.elastic[t])), i.set(s)
    }
    resolveConstraints() {
        var i;
        const {
            dragConstraints: t,
            dragElastic: n
        } = this.getProps(), r = this.visualElement.projection && !this.visualElement.projection.layout ? this.visualElement.projection.measure(!1) : (i = this.visualElement.projection) == null ? void 0 : i.layout, o = this.constraints;
        t && Qr(t) ? this.constraints || (this.constraints = this.resolveRefConstraints()) : t && r ? this.constraints = zD(r.layoutBox, t) : this.constraints = !1, this.elastic = WD(n), o !== this.constraints && !Qr(t) && r && this.constraints && !this.hasMutatedConstraints && Bt(s => {
            this.constraints !== !1 && this.getAxisMotionValue(s) && (this.constraints[s] = UD(r.layoutBox[s], this.constraints[s]))
        })
    }
    resolveRefConstraints() {
        const {
            dragConstraints: t,
            onMeasureDragConstraints: n
        } = this.getProps();
        if (!t || !Qr(t)) return !1;
        const r = t.current;
        Vo(r !== null, "If `dragConstraints` is set as a React ref, that ref must be passed to another component's `ref` prop.", "drag-constraints-ref");
        const {
            projection: o
        } = this.visualElement;
        if (!o || !o.layout) return !1;
        o.root && (o.root.scroll = void 0, o.root.updateScroll());
        const i = Q2(r, o.root, this.visualElement.getTransformPagePoint());
        let s = $D(o.layout.layoutBox, i);
        if (n) {
            const a = n(H2(s));
            this.hasMutatedConstraints = !!a, a && (s = k1(a))
        }
        return s
    }
    startAnimation(t) {
        const {
            drag: n,
            dragMomentum: r,
            dragElastic: o,
            dragTransition: i,
            dragSnapToOrigin: s,
            onDragTransitionEnd: a
        } = this.getProps(), l = this.constraints || {}, u = Bt(c => {
            if (!Bs(c, n, this.currentDirection)) return;
            let d = l && l[c] || {};
            (s === !0 || s === c) && (d = {
                min: 0,
                max: 0
            });
            const h = o ? 200 : 1e6,
                f = o ? 40 : 1e7,
                v = {
                    type: "inertia",
                    velocity: r ? t[c] : 0,
                    bounceStiffness: h,
                    bounceDamping: f,
                    timeConstant: 750,
                    restDelta: 1,
                    restSpeed: 10,
                    ...i,
                    ...d
                };
            return this.startAxisValueAnimation(c, v)
        });
        return Promise.all(u).then(a)
    }
    startAxisValueAnimation(t, n) {
        const r = this.getAxisMotionValue(t);
        return nd(this.visualElement, t), r.start(Bf(t, r, 0, n, this.visualElement, !1))
    }
    stopAnimation() {
        Bt(t => this.getAxisMotionValue(t).stop())
    }
    getAxisMotionValue(t) {
        const n = `_drag${t.toUpperCase()}`,
            o = this.visualElement.getProps()[n];
        return o || this.visualElement.getValue(t, this.visualElement.latestValues[t] ?? 0)
    }
    snapToCursor(t) {
        Bt(n => {
            const {
                drag: r
            } = this.getProps();
            if (!Bs(n, r, this.currentDirection)) return;
            const {
                projection: o
            } = this.visualElement, i = this.getAxisMotionValue(n);
            if (o && o.layout) {
                const {
                    min: s,
                    max: a
                } = o.layout.layoutBox[n], l = i.get() || 0;
                i.set(t[n] - ae(s, a, .5) + l)
            }
        })
    }
    scalePositionWithinConstraints() {
        if (!this.visualElement.current) return;
        const {
            drag: t,
            dragConstraints: n
        } = this.getProps(), {
            projection: r
        } = this.visualElement;
        if (!Qr(n) || !r || !this.constraints) return;
        this.stopAnimation();
        const o = {
            x: 0,
            y: 0
        };
        Bt(s => {
            const a = this.getAxisMotionValue(s);
            if (a && this.constraints !== !1) {
                const l = a.get();
                o[s] = BD({
                    min: l,
                    max: l
                }, this.constraints[s])
            }
        });
        const {
            transformTemplate: i
        } = this.visualElement.getProps();
        this.visualElement.current.style.transform = i ? i({}, "") : "none", r.root && r.root.updateScroll(), r.updateLayout(), this.constraints = !1, this.resolveConstraints(), Bt(s => {
            if (!Bs(s, t, null)) return;
            const a = this.getAxisMotionValue(s),
                {
                    min: l,
                    max: u
                } = this.constraints[s];
            a.set(ae(l, u, o[s]))
        }), this.visualElement.render()
    }
    addListeners() {
        if (!this.visualElement.current) return;
        HD.set(this.visualElement, this);
        const t = this.visualElement.current,
            n = bi(t, "pointerdown", u => {
                const {
                    drag: c,
                    dragListener: d = !0
                } = this.getProps(), h = u.target, f = h !== t && P2(h);
                c && d && !f && this.start(u)
            });
        let r;
        const o = () => {
                const {
                    dragConstraints: u
                } = this.getProps();
                Qr(u) && u.current && (this.constraints = this.resolveRefConstraints(), r || (r = GD(t, u.current, () => this.scalePositionWithinConstraints())))
            },
            {
                projection: i
            } = this.visualElement,
            s = i.addEventListener("measure", o);
        i && !i.layout && (i.root && i.root.updateScroll(), i.updateLayout()), re.read(o);
        const a = qi(window, "resize", () => this.scalePositionWithinConstraints()),
            l = i.addEventListener("didUpdate", ({
                delta: u,
                hasLayoutChanged: c
            }) => {
                this.isDragging && c && (Bt(d => {
                    const h = this.getAxisMotionValue(d);
                    h && (this.originPoint[d] += u[d].translate, h.set(h.get() + u[d].translate))
                }), this.visualElement.render())
            });
        return () => {
            a(), n(), s(), l && l(), r && r()
        }
    }
    getProps() {
        const t = this.visualElement.getProps(),
            {
                drag: n = !1,
                dragDirectionLock: r = !1,
                dragPropagation: o = !1,
                dragConstraints: i = !1,
                dragElastic: s = fd,
                dragMomentum: a = !0
            } = t;
        return {
            ...t,
            drag: n,
            dragDirectionLock: r,
            dragPropagation: o,
            dragConstraints: i,
            dragElastic: s,
            dragMomentum: a
        }
    }
}

function gg(e) {
    let t = !0;
    return () => {
        if (t) {
            t = !1;
            return
        }
        e()
    }
}

function GD(e, t, n) {
    const r = Cm(e, gg(n)),
        o = Cm(t, gg(n));
    return () => {
        r(), o()
    }
}

function Bs(e, t, n) {
    return (t === !0 || t === e) && (n === null || n === e)
}

function QD(e, t = 10) {
    let n = null;
    return Math.abs(e.y) > t ? n = "y" : Math.abs(e.x) > t && (n = "x"), n
}
class YD extends ur {
    constructor(t) {
        super(t), this.removeGroupControls = yt, this.removeListeners = yt, this.controls = new KD(t)
    }
    mount() {
        const {
            dragControls: t
        } = this.node.getProps();
        t && (this.removeGroupControls = t.subscribe(this.controls)), this.removeListeners = this.controls.addListeners() || yt
    }
    update() {
        const {
            dragControls: t
        } = this.node.getProps(), {
            dragControls: n
        } = this.node.prevProps || {};
        t !== n && (this.removeGroupControls(), t && (this.removeGroupControls = t.subscribe(this.controls)))
    }
    unmount() {
        this.removeGroupControls(), this.removeListeners(), this.controls.isDragging || this.controls.endPanSession()
    }
}
const Mu = e => (t, n) => {
    e && re.update(() => e(t, n), !1, !0)
};
class XD extends ur {
    constructor() {
        super(...arguments), this.removePointerDownListener = yt
    }
    onPointerDown(t) {
        this.session = new ix(t, this.createPanHandlers(), {
            transformPagePoint: this.node.getTransformPagePoint(),
            contextWindow: ox(this.node)
        })
    }
    createPanHandlers() {
        const {
            onPanSessionStart: t,
            onPanStart: n,
            onPan: r,
            onPanEnd: o
        } = this.node.getProps();
        return {
            onSessionStart: Mu(t),
            onStart: Mu(n),
            onMove: Mu(r),
            onEnd: (i, s) => {
                delete this.session, o && re.postRender(() => o(i, s))
            }
        }
    }
    mount() {
        this.removePointerDownListener = bi(this.node.current, "pointerdown", t => this.onPointerDown(t))
    }
    update() {
        this.session && this.session.updateHandlers(this.createPanHandlers())
    }
    unmount() {
        this.removePointerDownListener(), this.session && this.session.end()
    }
}
let Du = !1;
class qD extends x.Component {
    componentDidMount() {
        const {
            visualElement: t,
            layoutGroup: n,
            switchLayoutGroup: r,
            layoutId: o
        } = this.props, {
            projection: i
        } = t;
        i && (n.group && n.group.add(i), r && r.register && o && r.register(i), Du && i.root.didUpdate(), i.addEventListener("animationComplete", () => {
            this.safeToRemove()
        }), i.setOptions({
            ...i.options,
            layoutDependency: this.props.layoutDependency,
            onExitComplete: () => this.safeToRemove()
        })), da.hasEverUpdated = !0
    }
    getSnapshotBeforeUpdate(t) {
        const {
            layoutDependency: n,
            visualElement: r,
            drag: o,
            isPresent: i
        } = this.props, {
            projection: s
        } = r;
        return s && (s.isPresent = i, t.layoutDependency !== n && s.setOptions({
            ...s.options,
            layoutDependency: n
        }), Du = !0, o || t.layoutDependency !== n || n === void 0 || t.isPresent !== i ? s.willUpdate() : this.safeToRemove(), t.isPresent !== i && (i ? s.promote() : s.relegate() || re.postRender(() => {
            const a = s.getStack();
            (!a || !a.members.length) && this.safeToRemove()
        }))), null
    }
    componentDidUpdate() {
        const {
            visualElement: t,
            layoutAnchor: n
        } = this.props, {
            projection: r
        } = t;
        r && (r.options.layoutAnchor = n, r.root.didUpdate(), Kf.postRender(() => {
            !r.currentAnimation && r.isLead() && this.safeToRemove()
        }))
    }
    componentWillUnmount() {
        const {
            visualElement: t,
            layoutGroup: n,
            switchLayoutGroup: r
        } = this.props, {
            projection: o
        } = t;
        Du = !0, o && (o.scheduleCheckAfterUnmount(), n && n.group && n.group.remove(o), r && r.deregister && r.deregister(o))
    }
    safeToRemove() {
        const {
            safeToRemove: t
        } = this.props;
        t && t()
    }
    render() {
        return null
    }
}

function ax(e) {
    const [t, n] = Y1(), r = x.useContext(Rf);
    return P.jsx(qD, {
        ...e,
        layoutGroup: r,
        switchLayoutGroup: x.useContext(nx),
        isPresent: t,
        safeToRemove: n
    })
}
const ZD = {
    pan: {
        Feature: XD
    },
    drag: {
        Feature: YD,
        ProjectionNode: Q1,
        MeasureLayout: ax
    }
};

function yg(e, t, n) {
    const {
        props: r
    } = e;
    e.animationState && r.whileHover && e.animationState.setActive("whileHover", n === "Start");
    const o = "onHover" + n,
        i = r[o];
    i && re.postRender(() => i(t, ds(t)))
}
class JD extends ur {
    mount() {
        const {
            current: t
        } = this.node;
        t && (this.unmount = S2(t, (n, r) => (yg(this.node, r, "Start"), o => yg(this.node, o, "End"))))
    }
    unmount() {}
}
class eL extends ur {
    constructor() {
        super(...arguments), this.isActive = !1
    }
    onFocus() {
        let t = !1;
        try {
            t = this.node.current.matches(":focus-visible")
        } catch {
            t = !0
        }!t || !this.node.animationState || (this.node.animationState.setActive("whileFocus", !0), this.isActive = !0)
    }
    onBlur() {
        !this.isActive || !this.node.animationState || (this.node.animationState.setActive("whileFocus", !1), this.isActive = !1)
    }
    mount() {
        this.unmount = ls(qi(this.node.current, "focus", () => this.onFocus()), qi(this.node.current, "blur", () => this.onBlur()))
    }
    unmount() {}
}

function vg(e, t, n) {
    const {
        props: r
    } = e;
    if (e.current instanceof HTMLButtonElement && e.current.disabled) return;
    e.animationState && r.whileTap && e.animationState.setActive("whileTap", n === "Start");
    const o = "onTap" + (n === "End" ? "" : n),
        i = r[o];
    i && re.postRender(() => i(t, ds(t)))
}
class tL extends ur {
    mount() {
        const {
            current: t
        } = this.node;
        if (!t) return;
        const {
            globalTapTarget: n,
            propagate: r
        } = this.node.props;
        this.unmount = k2(t, (o, i) => (vg(this.node, i, "Start"), (s, {
            success: a
        }) => vg(this.node, s, a ? "End" : "Cancel")), {
            useGlobalTarget: n,
            stopPropagation: (r == null ? void 0 : r.tap) === !1
        })
    }
    unmount() {}
}
const hd = new WeakMap,
    Lu = new WeakMap,
    nL = e => {
        const t = hd.get(e.target);
        t && t(e)
    },
    rL = e => {
        e.forEach(nL)
    };

function oL({
    root: e,
    ...t
}) {
    const n = e || document;
    Lu.has(n) || Lu.set(n, {});
    const r = Lu.get(n),
        o = JSON.stringify(t);
    return r[o] || (r[o] = new IntersectionObserver(rL, {
        root: e,
        ...t
    })), r[o]
}

function iL(e, t, n) {
    const r = oL(t);
    return hd.set(e, n), r.observe(e), () => {
        hd.delete(e), r.unobserve(e)
    }
}
const sL = {
    some: 0,
    all: 1
};
class aL extends ur {
    constructor() {
        super(...arguments), this.hasEnteredView = !1, this.isInView = !1
    }
    startObserver() {
        var l;
        (l = this.stopObserver) == null || l.call(this);
        const {
            viewport: t = {}
        } = this.node.getProps(), {
            root: n,
            margin: r,
            amount: o = "some",
            once: i
        } = t, s = {
            root: n ? n.current : void 0,
            rootMargin: r,
            threshold: typeof o == "number" ? o : sL[o]
        }, a = u => {
            const {
                isIntersecting: c
            } = u;
            if (this.isInView === c || (this.isInView = c, i && !c && this.hasEnteredView)) return;
            c && (this.hasEnteredView = !0), this.node.animationState && this.node.animationState.setActive("whileInView", c);
            const {
                onViewportEnter: d,
                onViewportLeave: h
            } = this.node.getProps(), f = c ? d : h;
            f && f(u)
        };
        this.stopObserver = iL(this.node.current, s, a)
    }
    mount() {
        this.startObserver()
    }
    update() {
        if (typeof IntersectionObserver > "u") return;
        const {
            props: t,
            prevProps: n
        } = this.node;
        ["amount", "margin", "root"].some(lL(t, n)) && this.startObserver()
    }
    unmount() {
        var t;
        (t = this.stopObserver) == null || t.call(this), this.hasEnteredView = !1, this.isInView = !1
    }
}

function lL({
    viewport: e = {}
}, {
    viewport: t = {}
} = {}) {
    return n => e[n] !== t[n]
}
const uL = {
        inView: {
            Feature: aL
        },
        tap: {
            Feature: tL
        },
        focus: {
            Feature: eL
        },
        hover: {
            Feature: JD
        }
    },
    cL = {
        layout: {
            ProjectionNode: Q1,
            MeasureLayout: ax
        }
    },
    dL = {
        ...OD,
        ...uL,
        ...ZD,
        ...cL
    },
    sn = AD(dL, MD),
    fL = {
        weGettingMarried: {
            en: `WE ARE
GETTING MARRIED`,
            es: `NOS
CASAMOS`
        },
        weddingDate: {
            en: "15 June 2027",
            es: "15 de Junio de 2027"
        },
        addToCalendar: {
            en: "Add to calendar",
            es: "Añadir al calendario"
        },
        madeWithLove: {
            en: "Made with love by",
            es: "Hecho con amor por"
        },
        openEnvelope: {
            en: "OPEN ENVELOPE",
            es: "ABRIR SOBRE"
        },
        envelopeAlt: {
            en: "Envelope with seal",
            es: "Sobre con sello"
        },
        specialShare: {
            en: `We have something very special to share
with you...`,
            es: `Tenemos algo muy especial que compartir
con vosotros...`
        },
        shareTop: {
            en: "We have something",
            es: "Tenemos algo"
        },
        shareMiddle: {
            en: "very special",
            es: "muy especial"
        },
        shareBottom: {
            en: "to share with you...",
            es: "que compartir con vosotros..."
        },
        scratchToReveal: {
            en: "Scratch to reveal",
            es: "Rasca para descubrir"
        },
        days: {
            en: "Days",
            es: "Días"
        },
        hours: {
            en: "Hours",
            es: "Horas"
        },
        mins: {
            en: "Mins",
            es: "Min"
        },
        calGoogle: {
            en: "Google",
            es: "Google"
        },
        calApple: {
            en: "Apple / iOS",
            es: "Apple / iOS"
        },
        calOutlook: {
            en: "Outlook / Other",
            es: "Outlook / Otro"
        },
        eventWhere: {
            en: "WHERE",
            es: "DÓNDE"
        },
        venueName: {
            en: "The Grand Estate",
            es: "La Gran Hacienda"
        },
        venueAddress: {
            en: `Calle de los Olivos, 42
Madrid, Spain`,
            es: `Calle de los Olivos, 42
Madrid, España`
        },
        eventWhen: {
            en: "WHEN",
            es: "CUÁNDO"
        },
        ceremonyTime: {
            en: "5:00 PM",
            es: "17:00 h"
        },
        receptionTime: {
            en: "Cocktail & Reception to follow",
            es: "Cóctel y banquete a continuación"
        },
        dressCode: {
            en: "DRESS CODE",
            es: "CÓDIGO DE VESTIMENTA"
        },
        dressCodeTitle: {
            en: "Black Tie Optional",
            es: "Etiqueta de noche"
        },
        dressCodeDesc: {
            en: "We hope you will join us in elegant attire to celebrate this special day.",
            es: "Esperamos que nos acompañéis con atuendo elegante para celebrar este día tan especial."
        },
        cantWait: {
            en: "We can't wait to celebrate with you",
            es: "¡No vemos el momento de celebrarlo juntos!"
        }
    },
    lx = x.createContext(void 0);

function hL({
    children: e
}) {
    const [t, n] = x.useState("en"), r = o => fL[o][t];
    return P.jsx(lx.Provider, {
        value: {
            lang: t,
            setLang: n,
            t: r
        },
        children: e
    })
}

function ux() {
    const e = x.useContext(lx);
    if (!e) throw new Error("useLanguage must be used within LanguageProvider");
    return e
}
const pL = new Date("2027-06-15T16:00:00Z");

function wg() {
    const e = pL.getTime() - Date.now(),
        t = Math.floor(e / 1e3 % 60),
        n = Math.floor(e / 1e3 / 60 % 60),
        r = Math.floor(e / (1e3 * 60 * 60) % 24),
        o = Math.floor(e / (1e3 * 60 * 60 * 24));
    return {
        total: e,
        days: Math.max(0, o),
        hours: Math.max(0, r),
        minutes: Math.max(0, n),
        seconds: Math.max(0, t)
    }
}

function mL({
    paused: e
}) {
    const {
        t
    } = ux(), [n, r] = x.useState(wg()), [o, i] = x.useState(!1), [s, a] = x.useState(!1), l = "Boda Clara & Hugo", u = "La boda de Clara y Hugo", c = "20270615T160000Z", d = "20270615T230000Z", h = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(l)}&dates=${c}/${d}&details=${encodeURIComponent(u)}`, f = `https://outlook.live.com/calendar/0/deeplink/compose?path=/calendar/action/compose&rru=addevent&subject=${encodeURIComponent(l)}&body=${encodeURIComponent(u)}&startdt=2027-06-15T16:00:00Z&enddt=2027-06-15T23:00:00Z`, v = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//The Digital Yes//Wedding//EN", "CALSCALE:GREGORIAN", "METHOD:PUBLISH", "BEGIN:VEVENT", "UID:clara-hugo-2027-06-15@thedigitalyes.com", "DTSTAMP:20260101T000000Z", `DTSTART:${c}`, `DTEND:${d}`, `SUMMARY:${l}`, `DESCRIPTION:${u}`, "END:VEVENT", "END:VCALENDAR"].join(`\r
`), [g, w] = x.useState("");
    x.useEffect(() => {
        const y = new Blob([v], {
                type: "text/calendar;charset=utf-8"
            }),
            S = URL.createObjectURL(y);
        return w(S), () => URL.revokeObjectURL(S)
    }, []);
    const m = () => {
            if (typeof navigator > "u") return !1;
            const y = navigator.userAgent;
            return /iPad|iPhone|iPod/.test(y) || /Mac/.test(y) && "ontouchend" in document
        },
        p = y => {
            i(!1), m() && (y.preventDefault(), g && window.open(g, "_blank"))
        };
    return x.useEffect(() => {
        const y = setInterval(() => r(wg()), 1e3);
        return () => clearInterval(y)
    }, []), x.useEffect(() => {
        const y = setTimeout(() => a(!0), 100);
        return () => clearTimeout(y)
    }, []), P.jsxs("section", {
        className: "relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden bg-ivory pt-[max(env(safe-area-inset-top),1rem)] pb-[max(env(safe-area-inset-bottom),5rem)]",
        children: [P.jsx("video", {
            src: Sw.url,
            autoPlay: !0,
            loop: !0,
            muted: !0,
            playsInline: !0,
            preload: "auto",
            className: "pointer-events-none absolute inset-0 w-full h-full object-cover z-0 select-none"
        }), P.jsxs("div", {
            className: "flex flex-col items-center text-center px-8 z-10 mt-[8vh] -translate-y-10",
            children: [P.jsx(sn.div, {
                "aria-hidden": "true",
                initial: {
                    opacity: 0,
                    y: 8
                },
                animate: s ? {
                    opacity: 1,
                    y: 0
                } : {
                    opacity: 0,
                    y: 8
                },
                transition: {
                    duration: 1.6,
                    delay: 0,
                    ease: [.22, 1, .36, 1]
                },
                className: "w-16 h-16 mb-4 opacity-90 bg-granate",
                style: {
                    WebkitMaskImage: `url(${Bc})`,
                    maskImage: `url(${Bc})`,
                    WebkitMaskRepeat: "no-repeat",
                    maskRepeat: "no-repeat",
                    WebkitMaskPosition: "center",
                    maskPosition: "center",
                    WebkitMaskSize: "contain",
                    maskSize: "contain"
                }
            }), P.jsx(sn.p, {
                initial: {
                    opacity: 0,
                    y: 8
                },
                animate: s ? {
                    opacity: 1,
                    y: 0
                } : {
                    opacity: 0,
                    y: 8
                },
                transition: {
                    duration: 1.6,
                    delay: s ? 1 : 0,
                    ease: [.22, 1, .36, 1]
                },
                className: "md:text-[13px] tracking-[0.35em] uppercase font-display mb-3 text-granate/90 text-[13px] whitespace-pre-line",
                children: t("weGettingMarried")
            }), P.jsx(sn.h1, {
                initial: {
                    opacity: 0,
                    y: 8
                },
                animate: s ? {
                    opacity: 1,
                    y: 0
                } : {
                    opacity: 0,
                    y: 8
                },
                transition: {
                    duration: 1.8,
                    delay: s ? 2.2 : 0,
                    ease: [.22, 1, .36, 1]
                },
                className: "font-names mb-2 text-granate md:text-[3.3rem] text-[2.05rem]",
                children: "Clara & Hugo"
            }), P.jsx(sn.p, {
                initial: {
                    opacity: 0,
                    y: 8
                },
                animate: s ? {
                    opacity: 1,
                    y: 0
                } : {
                    opacity: 0,
                    y: 8
                },
                transition: {
                    duration: 1.6,
                    delay: s ? 3.4 : 0,
                    ease: [.22, 1, .36, 1]
                },
                className: "tracking-[0.25em] uppercase font-display text-granate/90 md:text-[15px] text-[15px]",
                children: t("weddingDate")
            })]
        }), P.jsx(sn.div, {
            initial: {
                opacity: 0
            },
            animate: s ? {
                opacity: 1
            } : {
                opacity: 0
            },
            transition: {
                duration: 1.6,
                delay: s ? 4.4 : 0,
                ease: "easeInOut"
            },
            className: "mt-12 flex flex-col items-center text-granate relative z-10",
            style: {
                transform: "scale(1.05)"
            },
            children: P.jsxs("div", {
                className: "flex items-center gap-3",
                children: [P.jsxs("div", {
                    className: "flex flex-col items-center",
                    children: [P.jsx("span", {
                        className: "font-names italic md:text-[3.3rem] leading-none text-[2.1rem]",
                        children: n.days
                    }), P.jsx("span", {
                        className: "mt-1 tracking-[0.2em] uppercase font-display text-[11px] md:text-[12px] text-granate/70",
                        children: t("days")
                    })]
                }), P.jsx("div", {
                    className: "h-7 w-px bg-granate/20"
                }), P.jsxs("div", {
                    className: "flex flex-col items-center",
                    children: [P.jsx("span", {
                        className: "font-names italic md:text-[3.3rem] leading-none text-[2.1rem]",
                        children: n.hours
                    }), P.jsx("span", {
                        className: "mt-1 tracking-[0.2em] uppercase font-display text-[11px] md:text-[12px] text-granate/70",
                        children: t("hours")
                    })]
                }), P.jsx("div", {
                    className: "h-7 w-px bg-granate/20"
                }), P.jsxs("div", {
                    className: "flex flex-col items-center",
                    children: [P.jsx("span", {
                        className: "font-names italic md:text-[3.3rem] leading-none text-[2.1rem]",
                        children: n.minutes
                    }), P.jsx("span", {
                        className: "mt-1 tracking-[0.2em] uppercase font-display text-[11px] md:text-[12px] text-granate/70",
                        children: t("mins")
                    })]
                })]
            })
        }), P.jsx(sn.div, {
            initial: {
                opacity: 0,
                y: 8
            },
            animate: {
                opacity: 1,
                y: 0
            },
            transition: {
                duration: .7,
                delay: 5.6,
                ease: "easeOut"
            },
            className: "mt-8 relative flex flex-col items-center z-20",
            children: P.jsxs("div", {
                className: "relative",
                children: [P.jsx(dd, {
                    children: o && P.jsxs(sn.div, {
                        initial: {
                            opacity: 0,
                            y: 6
                        },
                        animate: {
                            opacity: 1,
                            y: 0
                        },
                        exit: {
                            opacity: 0,
                            y: 6
                        },
                        transition: {
                            duration: .2
                        },
                        className: "absolute bottom-full left-1/2 -translate-x-1/2 mb-2 flex flex-col items-stretch min-w-[176px] rounded-xl overflow-hidden bg-ivory shadow-lg border border-granate/20 z-30",
                        children: [P.jsx("a", {
                            href: h,
                            target: "_blank",
                            rel: "noopener noreferrer",
                            onClick: () => i(!1),
                            className: "px-4 py-2 text-[11px] tracking-[0.25em] uppercase font-display text-granate hover:bg-granate/10 text-center",
                            children: "Google"
                        }), P.jsx("a", {
                            href: g || "#",
                            download: "clara-hugo-wedding.ics",
                            target: "_blank",
                            rel: "noopener noreferrer",
                            onClick: p,
                            className: "px-4 py-2 text-[11px] tracking-[0.25em] uppercase font-display text-granate hover:bg-granate/10 text-center border-t border-granate/10",
                            children: "Apple / iOS"
                        }), P.jsx("a", {
                            href: f,
                            target: "_blank",
                            rel: "noopener noreferrer",
                            onClick: () => i(!1),
                            className: "px-4 py-2 text-[11px] tracking-[0.25em] uppercase font-display text-granate hover:bg-granate/10 text-center border-t border-granate/10",
                            children: t("calOutlook")
                        })]
                    })
                }), P.jsx("button", {
                    type: "button",
                    onClick: () => i(y => !y),
                    className: "w-fit inline-flex items-center justify-center px-5 py-2 bg-ivory/75 text-granate text-[10px] md:text-[11px] tracking-[0.35em] uppercase font-display rounded-full hover:bg-ivory/90 transition-colors whitespace-nowrap shadow-md",
                    children: t("addToCalendar")
                })]
            })
        })]
    })
}
const gL = 1,
    yL = "1adf8de4-5543-4146-a8f5-bebe42cfcd95",
    vL = "db221931-518d-4d9e-bcf9-1cc46b13be79",
    wL = "assets/l5e-images/envelope.jpg",
    xL = "a/v1/db221931-518d-4d9e-bcf9-1cc46b13be79/1adf8de4-5543-4146-a8f5-bebe42cfcd95/envelope.jpg",
    SL = "envelope.jpg",
    EL = 824940,
    CL = "image/jpeg",
    TL = "2026-06-05T11:46:41Z",
    PL = {
        version: gL,
        asset_id: yL,
        project_id: vL,
        url: wL,
        r2_key: xL,
        original_filename: SL,
        size: EL,
        content_type: CL,
        created_at: TL
    },
    bL = 1,
    kL = "5bdd5c9c-1c24-48d4-b3a4-5229fe7963cb",
    RL = "db221931-518d-4d9e-bcf9-1cc46b13be79",
    AL = "assets/l5e-videos/envelope-open.mp4",
    ML = "a/v1/db221931-518d-4d9e-bcf9-1cc46b13be79/5bdd5c9c-1c24-48d4-b3a4-5229fe7963cb/envelope-open.mp4",
    DL = "envelope-open.mp4",
    LL = 899433,
    NL = "video/mp4",
    OL = "2026-06-05T11:51:20Z",
    IL = {
        version: bL,
        asset_id: kL,
        project_id: RL,
        url: AL,
        r2_key: ML,
        original_filename: DL,
        size: LL,
        content_type: NL,
        created_at: OL
    },
    _L = "assets/images/hero-frame-76CGo-SF.png",
    VL = "assets/images/hero-scratch-cover-BPeuVyTP.png",
    jL = ({
        onEnter: e,
        onInteraction: t
    }) => {
        const [n, r] = x.useState(!1), [o, i] = x.useState(!1), [s, a] = x.useState(!1), l = x.useRef(null);
        ux(), x.useEffect(() => {
            [_L, VL, Bc].forEach(d => {
                const h = new Image;
                h.src = d
            });
            try {
                fetch(Sw.url, {
                    cache: "force-cache"
                }).catch(() => {})
            } catch {}
        }, []);
        const u = () => {
                if (n) return;
                t == null || t(), r(!0);
                const d = l.current;
                d && (d.currentTime = 0, d.play().catch(() => {}))
            },
            c = () => {
                const d = l.current;
                d && !s && d.duration && d.currentTime >= d.duration - .6 && a(!0)
            };
        return P.jsxs("div", {
            className: "fixed inset-0 z-50 cursor-pointer overflow-hidden",
            style: {
                backgroundColor: "#eae5d9"
            },
            onClick: u,
            children: [P.jsxs("div", {
                className: "absolute inset-0 pointer-events-none",
                children: [!o && P.jsx("img", {
                    src: PL.url,
                    alt: "",
                    className: "absolute inset-0 w-full h-full object-cover"
                }), P.jsx("video", {
                    ref: l,
                    src: IL.url,
                    muted: !0,
                    playsInline: !0,
                    preload: "auto",
                    onPlaying: () => i(!0),
                    onTimeUpdate: c,
                    onEnded: () => a(!0),
                    className: "absolute inset-0 w-full h-full object-cover",
                    style: {
                        opacity: o ? 1 : 0
                    }
                })]
            }), P.jsx(dd, {
                children: !o && P.jsx(sn.span, {
                    initial: {
                        opacity: 0
                    },
                    animate: {
                        opacity: [.5, 1, .5]
                    },
                    exit: {
                        opacity: 0
                    },
                    transition: {
                        duration: 2,
                        repeat: 1 / 0,
                        ease: "easeInOut"
                    },
                    className: "absolute bottom-[max(env(safe-area-inset-bottom),2rem)] left-0 right-0 mx-auto w-fit text-granate text-[10px] tracking-[0.4em] uppercase font-display z-10",
                    children: "Tap to open"
                })
            }), P.jsx(dd, {
                children: s && P.jsx(sn.div, {
                    className: "absolute inset-0 z-10",
                    style: {
                        backgroundColor: "#ffffff"
                    },
                    initial: {
                        opacity: 0
                    },
                    animate: {
                        opacity: 1
                    },
                    transition: {
                        duration: 1.2,
                        ease: "easeInOut"
                    },
                    onAnimationComplete: e
                })
            })]
        })
    },
    FL = ({
        muted: e,
        onToggle: t
    }) => P.jsx("button", {
        type: "button",
        onClick: t,
        "aria-label": e ? "Unmute music" : "Mute music",
        className: "fixed bottom-5 right-5 z-50 w-10 h-10 rounded-full flex items-center justify-center bg-ivory/60 hover:bg-ivory/80 backdrop-blur-sm text-granate transition-colors shadow-md",
        children: e ? P.jsx(QC, {
            className: "w-4 h-4"
        }) : P.jsx(GC, {
            className: "w-4 h-4"
        })
    }),
    zL = "bc583974-cb7a-44a7-b4d8-198f89ce3627",
    $L = "audio/mpeg",
    BL = "2026-06-05T10:33:53Z",
    UL = "the-tides.mp3",
    WL = "db221931-518d-4d9e-bcf9-1cc46b13be79",
    HL = "a/v1/db221931-518d-4d9e-bcf9-1cc46b13be79/bc583974-cb7a-44a7-b4d8-198f89ce3627/the-tides.mp3",
    KL = 8249973,
    GL = "assets/audio/the-tides.mp3",
    QL = 1,
    YL = {
        asset_id: zL,
        content_type: $L,
        created_at: BL,
        original_filename: UL,
        project_id: WL,
        r2_key: HL,
        size: KL,
        url: GL,
        version: QL
    },
    XL = () => {
        const [e, t] = x.useState(!1), [n, r] = x.useState(!1), o = x.useRef(null), i = () => {
            if (o.current) return;
            const a = new Audio(YL.url);
            a.loop = !0, a.volume = 0, o.current = a, a.play().catch(() => {});
            const l = .6,
                u = 120,
                c = 12e3;
            let d = 0;
            const h = setInterval(() => {
                d++;
                const f = d / u,
                    v = f * f * (3 - 2 * f);
                a.volume = Math.min(l, l * v), d >= u && clearInterval(h)
            }, c / u)
        };
        x.useEffect(() => {
            const a = () => {
                const l = o.current;
                l && (document.hidden ? l.pause() : n || l.play().catch(() => {}))
            };
            return document.addEventListener("visibilitychange", a), () => {
                var l;
                document.removeEventListener("visibilitychange", a), (l = o.current) == null || l.pause(), o.current = null
            }
        }, [n]);
        const s = () => {
            r(a => {
                const l = !a,
                    u = o.current;
                return u && (u.muted = l, !l && u.paused && u.play().catch(() => {})), l
            })
        };
        return P.jsxs("main", {
            className: "bg-transparent",
            children: [!e && P.jsx(jL, {
                onEnter: () => t(!0),
                onInteraction: i
            }), e && P.jsxs(P.Fragment, {
                children: [P.jsx(mL, {}), P.jsx(FL, {
                    muted: n,
                    onToggle: s
                })]
            })]
        })
    },
    qL = () => {
        const e = xw();
        return x.useEffect(() => {
            console.error("404 Error: User attempted to access non-existent route:", e.pathname)
        }, [e.pathname]), P.jsx("div", {
            className: "flex min-h-screen items-center justify-center bg-muted",
            children: P.jsxs("div", {
                className: "text-center",
                children: [P.jsx("h1", {
                    className: "mb-4 text-4xl font-bold",
                    children: "404"
                }), P.jsx("p", {
                    className: "mb-4 text-xl text-muted-foreground",
                    children: "Oops! Page not found"
                }), P.jsx("a", {
                    href: "/",
                    className: "text-primary underline hover:text-primary/90",
                    children: "Return to Home"
                })]
            })
        })
    },
    ZL = new vk,
    JL = () => P.jsx(xk, {
        client: ZL,
        children: P.jsx(Qb, {
            children: P.jsxs(hL, {
                children: [P.jsx(DT, {}), P.jsx(uP, {}), P.jsx(iR, { basename: "/cisnes",
                    children: P.jsxs(nR, {
                        children: [P.jsx(zc, {
                            path: "/",
                            element: P.jsx(XL, {})
                        }), P.jsx(zc, {
                            path: "*",
                            element: P.jsx(qL, {})
                        })]
                    })
                })]
            })
        })
    });
Uv(document.getElementById("root")).render(P.jsx(JL, {}));
