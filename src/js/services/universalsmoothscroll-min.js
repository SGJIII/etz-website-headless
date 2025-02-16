var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.arrayIteratorImpl = function (a) {
  var b = 0;
  return function () {
    return b < a.length ? { done: !1, value: a[b++] } : { done: !0 };
  };
};
$jscomp.arrayIterator = function (a) {
  return { next: $jscomp.arrayIteratorImpl(a) };
};
$jscomp.makeIterator = function (a) {
  var b = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
  return b ? b.call(a) : $jscomp.arrayIterator(a);
};
var INITIAL_WINDOW_WIDTH = window.innerWidth,
  INITIAL_WINDOW_HEIGHT = window.innerHeight,
  DEFAULT_XSTEP_LENGTH = 16 + (7 / 1508) * (INITIAL_WINDOW_WIDTH - 412),
  DEFAULT_YSTEP_LENGTH = Math.max(
    1,
    Math.abs(38 - (20 / 140) * (INITIAL_WINDOW_HEIGHT - 789))
  ),
  DEFAULT_MIN_ANIMATION_FRAMES = INITIAL_WINDOW_HEIGHT / DEFAULT_YSTEP_LENGTH,
  DEFAULT_TEST_CALCULATOR_SCROLL_VALUE = 100,
  DEFAULT_TEST_CALCULATOR_DURATION = 5e3,
  DEFAULT_ERROR_LOGGER = function (a, b, c) {
    if (!/disabled/i.test(uss._debugMode)) {
      var d = "string" === typeof c;
      c =
        null === c
          ? "null"
          : void 0 === c
          ? "undefined"
          : c.name || c.toString().replace(RegExp("\n", "g"), "");
      40 < c.length && (c = c.slice(0, 40) + " ...");
      d && (c = '"' + c + '"');
      /legacy/i.test(uss._debugMode)
        ? (console.log(
            "UniversalSmoothScroll API (documentation at: https://github.com/CristianDavideConte/universalSmoothScroll)\n"
          ),
          console.error(
            "USS ERROR\n",
            a,
            "was expecting",
            b + ", but received",
            c + "."
          ))
        : (console.group(
            "UniversalSmoothScroll API (documentation at: https://github.com/CristianDavideConte/universalSmoothScroll)"
          ),
          console.log(
            "%cUSS ERROR",
            "font-family:system-ui; font-weight:800; font-size:40px; background:#eb445a; color:black; border-radius:5px; padding:0.4vh 0.5vw; margin:1vh 0"
          ),
          console.log(
            "%c" + a + "%cwas expecting " + b,
            "font-style:italic; font-family:system-ui; font-weight:700; font-size:17px; background:#2dd36f; color:black; border-radius:5px 0px 0px 5px; padding:0.4vh 0.5vw; margin-left:13px",
            "font-family:system-ui; font-weight:600; font-size:17px; background:#2dd36f; color:black; border-radius:0px 5px 5px 0px; padding:0.4vh 0.5vw"
          ),
          console.log(
            "%cBut received%c" + c,
            "font-family:system-ui; font-weight:600; font-size:17px; background:#eb445a; color:black; border-radius:5px 0px 0px 5px; padding:0.4vh 0.5vw; margin-left:13px",
            "font-style:italic; font-family:system-ui; font-weight:700; font-size:17px; background:#eb445a; color:black; border-radius:0px 5px 5px 0px; padding:0.4vh 0.5vw"
          ),
          console.groupCollapsed(
            "%cStack Trace",
            "font-family:system-ui; font-weight:500; font-size:17px; background:#3171e0; color:#f5f6f9; border-radius:5px; padding:0.3vh 0.5vw; margin-left:13px"
          ),
          console.trace(""),
          console.groupEnd("Stack Trace"),
          console.groupEnd(
            "UniversalSmoothScroll API (documentation at: https://github.com/CristianDavideConte/universalSmoothScroll)"
          ));
    }
  },
  DEFAULT_WARNING_LOGGER = function (a, b, c) {
    c = void 0 === c ? !0 : c;
    /disabled/i.test(uss._debugMode) ||
      ((a =
        null === a
          ? "null"
          : void 0 === a
          ? "undefined"
          : a.name || a.toString().replace(RegExp("\n", "g"), "")),
      30 < a.length && (a = a.slice(0, 30) + " ..."),
      c && "string" === typeof a && (a = '"' + a + '"'),
      /legacy/i.test(uss._debugMode)
        ? (console.log(
            "UniversalSmoothScroll API (documentation at: https://github.com/CristianDavideConte/universalSmoothScroll)\n"
          ),
          console.warn("USS WARNING\n", a, b + "."))
        : (console.groupCollapsed(
            "UniversalSmoothScroll API (documentation at: https://github.com/CristianDavideConte/universalSmoothScroll)"
          ),
          console.log(
            "%cUSS WARNING",
            "font-family:system-ui; font-weight:800; font-size:40px; background:#fcca03; color:black; border-radius:5px; padding:0.4vh 0.5vw; margin:1vh 0"
          ),
          console.log(
            "%c" + a + "%c" + b,
            "font-style:italic; font-family:system-ui; font-weight:700; font-size:17px; background:#fcca03; color:black; border-radius:5px 0px 0px 5px; padding:0.4vh 0.5vw; margin-left:13px",
            "font-family:system-ui; font-weight:600; font-size:17px; background:#fcca03; color:black; border-radius:0px 5px 5px 0px; padding:0.4vh 0.5vw"
          ),
          console.groupCollapsed(
            "%cStack Trace",
            "font-family:system-ui; font-weight:500; font-size:17px; background:#3171e0; color:#f5f6f9; border-radius:5px; padding:0.3vh 0.5vw; margin-left:13px"
          ),
          console.trace(""),
          console.groupEnd("Stack Trace"),
          console.groupEnd(
            "UniversalSmoothScroll API (documentation at: https://github.com/CristianDavideConte/universalSmoothScroll)"
          )));
  },
  uss = {
    _containersData: new Map(),
    _xStepLength: DEFAULT_XSTEP_LENGTH,
    _yStepLength: DEFAULT_YSTEP_LENGTH,
    _minAnimationFrame: DEFAULT_MIN_ANIMATION_FRAMES,
    _windowHeight: INITIAL_WINDOW_HEIGHT,
    _windowWidth: INITIAL_WINDOW_WIDTH,
    _scrollbarsMaxDimension: 0,
    _pageScroller: document.scrollingElement || window,
    _reducedMotion:
      "matchMedia" in window &&
      window.matchMedia("(prefers-reduced-motion)").matches,
    _debugMode: "",
    isXscrolling: function (a) {
      a = void 0 === a ? uss._pageScroller : a;
      if (a === window || a instanceof HTMLElement)
        return !!(uss._containersData.get(a) || [])[0];
      DEFAULT_ERROR_LOGGER(
        "isXscrolling",
        "the container to be an HTMLElement or the Window",
        a
      );
    },
    isYscrolling: function (a) {
      a = void 0 === a ? uss._pageScroller : a;
      if (a === window || a instanceof HTMLElement)
        return !!(uss._containersData.get(a) || [])[1];
      DEFAULT_ERROR_LOGGER(
        "isYscrolling",
        "the container to be an HTMLElement or the Window",
        a
      );
    },
    isScrolling: function (a) {
      a = void 0 === a ? uss._pageScroller : a;
      if (a === window || a instanceof HTMLElement)
        return (a = uss._containersData.get(a) || []), !!a[0] || !!a[1];
      DEFAULT_ERROR_LOGGER(
        "isScrolling",
        "the container to be an HTMLElement or the Window",
        a
      );
    },
    getFinalXPosition: function (a) {
      a = void 0 === a ? uss._pageScroller : a;
      if (a === window || a instanceof HTMLElement) {
        var b = uss._containersData.get(a) || [];
        return 0 === b[2] ? 0 : b[2] || uss.getScrollXCalculator(a)();
      }
      DEFAULT_ERROR_LOGGER(
        "getFinalXPosition",
        "the container to be an HTMLElement or the Window",
        a
      );
    },
    getFinalYPosition: function (a) {
      a = void 0 === a ? uss._pageScroller : a;
      if (a === window || a instanceof HTMLElement) {
        var b = uss._containersData.get(a) || [];
        return 0 === b[3] ? 0 : b[3] || uss.getScrollYCalculator(a)();
      }
      DEFAULT_ERROR_LOGGER(
        "getFinalYPosition",
        "the container to be an HTMLElement or the Window",
        a
      );
    },
    getScrollXDirection: function (a) {
      a = void 0 === a ? uss._pageScroller : a;
      if (a === window || a instanceof HTMLElement)
        return (uss._containersData.get(a) || [])[4] || 0;
      DEFAULT_ERROR_LOGGER(
        "getScrollXDirection",
        "the container to be an HTMLElement or the Window",
        a
      );
    },
    getScrollYDirection: function (a) {
      a = void 0 === a ? uss._pageScroller : a;
      if (a === window || a instanceof HTMLElement)
        return (uss._containersData.get(a) || [])[5] || 0;
      DEFAULT_ERROR_LOGGER(
        "getScrollYDirection",
        "the container to be an HTMLElement or the Window",
        a
      );
    },
    getXStepLengthCalculator: function (a, b) {
      a = void 0 === a ? uss._pageScroller : a;
      b = void 0 === b ? !1 : b;
      if (a === window || a instanceof HTMLElement) {
        var c = uss._containersData.get(a) || [];
        return b ? c[14] : c[12];
      }
      DEFAULT_ERROR_LOGGER(
        "getXStepLengthCalculator",
        "the container to be an HTMLElement or the Window",
        a
      );
    },
    getYStepLengthCalculator: function (a, b) {
      a = void 0 === a ? uss._pageScroller : a;
      b = void 0 === b ? !1 : b;
      if (a === window || a instanceof HTMLElement) {
        var c = uss._containersData.get(a) || [];
        return b ? c[15] : c[13];
      }
      DEFAULT_ERROR_LOGGER(
        "getYStepLengthCalculator",
        "the container to be an HTMLElement or the Window",
        a
      );
    },
    getXStepLength: function () {
      return uss._xStepLength;
    },
    getYStepLength: function () {
      return uss._yStepLength;
    },
    getMinAnimationFrame: function () {
      return uss._minAnimationFrame;
    },
    getWindowHeight: function () {
      return uss._windowHeight;
    },
    getWindowWidth: function () {
      return uss._windowWidth;
    },
    getScrollbarsMaxDimension: function () {
      return uss._scrollbarsMaxDimension;
    },
    getPageScroller: function () {
      return uss._pageScroller;
    },
    getReducedMotionState: function () {
      return uss._reducedMotion;
    },
    getDebugMode: function () {
      return uss._debugMode;
    },
    setXStepLengthCalculator: function (a, b, c, d) {
      b = void 0 === b ? uss._pageScroller : b;
      c = void 0 === c ? !1 : c;
      d = void 0 === d ? !1 : d;
      if ("function" !== typeof a)
        DEFAULT_ERROR_LOGGER(
          "setXStepLengthCalculator",
          "the newCalculator to be a function",
          a
        );
      else if (b === window || b instanceof HTMLElement) {
        if (d) {
          d = performance.now();
          var f = DEFAULT_TEST_CALCULATOR_SCROLL_VALUE;
          do {
            var e = performance.now();
            var h = a(
              f,
              d,
              e,
              DEFAULT_TEST_CALCULATOR_SCROLL_VALUE,
              DEFAULT_TEST_CALCULATOR_SCROLL_VALUE - f,
              DEFAULT_TEST_CALCULATOR_SCROLL_VALUE,
              b
            );
            if (!Number.isFinite(h)) {
              DEFAULT_ERROR_LOGGER(
                "setXStepLengthCalculator",
                "the newCalculator to return a valid step value",
                h
              );
              return;
            }
            f -= h;
          } while (0 < f && e - d <= DEFAULT_TEST_CALCULATOR_DURATION);
          e - d > DEFAULT_TEST_CALCULATOR_DURATION &&
            DEFAULT_WARNING_LOGGER(
              a.name || "the passed calculator",
              "didn't complete the test scroll-animation within " +
                DEFAULT_TEST_CALCULATOR_DURATION +
                "ms",
              !1
            );
        }
        f = (d = uss._containersData.get(b)) || [];
        c ? (f[14] = a) : ((f[12] = a), f[14] && (f[14] = null));
        d || uss._containersData.set(b, f);
      } else
        DEFAULT_ERROR_LOGGER(
          "setXStepLengthCalculator",
          "the container to be an HTMLElement or the Window",
          b
        );
    },
    setYStepLengthCalculator: function (a, b, c, d) {
      b = void 0 === b ? uss._pageScroller : b;
      c = void 0 === c ? !1 : c;
      d = void 0 === d ? !1 : d;
      if ("function" !== typeof a)
        DEFAULT_ERROR_LOGGER(
          "setYStepLengthCalculator",
          "the newCalculator to be a function",
          a
        );
      else if (b === window || b instanceof HTMLElement) {
        if (d) {
          d = performance.now();
          var f = DEFAULT_TEST_CALCULATOR_SCROLL_VALUE;
          do {
            var e = performance.now();
            var h = a(
              f,
              d,
              e,
              DEFAULT_TEST_CALCULATOR_SCROLL_VALUE,
              DEFAULT_TEST_CALCULATOR_SCROLL_VALUE - f,
              DEFAULT_TEST_CALCULATOR_SCROLL_VALUE,
              b
            );
            if (!Number.isFinite(h)) {
              DEFAULT_ERROR_LOGGER(
                "setYStepLengthCalculator",
                "the newCalculator to return a valid step value",
                h
              );
              return;
            }
            f -= h;
          } while (0 < f && e - d <= DEFAULT_TEST_CALCULATOR_DURATION);
          e - d > DEFAULT_TEST_CALCULATOR_DURATION &&
            DEFAULT_WARNING_LOGGER(
              a.name || "the passed calculator",
              "didn't complete the test scroll-animation within " +
                DEFAULT_TEST_CALCULATOR_DURATION +
                "ms",
              !1
            );
        }
        f = (d = uss._containersData.get(b)) || [];
        c ? (f[15] = a) : ((f[13] = a), f[15] && (f[15] = null));
        d || uss._containersData.set(b, f);
      } else
        DEFAULT_ERROR_LOGGER(
          "setYStepLengthCalculator",
          "the container to be an HTMLElement or the Window",
          b
        );
    },
    setStepLengthCalculator: function (a, b, c, d) {
      b = void 0 === b ? uss._pageScroller : b;
      c = void 0 === c ? !1 : c;
      d = void 0 === d ? !1 : d;
      if ("function" !== typeof a)
        DEFAULT_ERROR_LOGGER(
          "setStepLengthCalculator",
          "the newCalculator to be a function",
          a
        );
      else if (b === window || b instanceof HTMLElement) {
        if (d) {
          d = performance.now();
          var f = DEFAULT_TEST_CALCULATOR_SCROLL_VALUE;
          do {
            var e = performance.now();
            var h = a(
              f,
              d,
              e,
              DEFAULT_TEST_CALCULATOR_SCROLL_VALUE,
              DEFAULT_TEST_CALCULATOR_SCROLL_VALUE - f,
              DEFAULT_TEST_CALCULATOR_SCROLL_VALUE,
              b
            );
            if (!Number.isFinite(h)) {
              DEFAULT_ERROR_LOGGER(
                "setStepLengthCalculator",
                "the newCalculator to return a valid step value",
                h
              );
              return;
            }
            f -= h;
          } while (0 < f && e - d <= DEFAULT_TEST_CALCULATOR_DURATION);
          e - d > DEFAULT_TEST_CALCULATOR_DURATION &&
            DEFAULT_WARNING_LOGGER(
              a.name || "the passed calculator",
              "didn't complete the test scroll-animation within " +
                DEFAULT_TEST_CALCULATOR_DURATION +
                "ms",
              !1
            );
        }
        f = (d = uss._containersData.get(b)) || [];
        c
          ? ((f[14] = a), (f[15] = a))
          : ((f[12] = a),
            (f[13] = a),
            f[14] && (f[14] = null),
            f[15] && (f[15] = null));
        d || uss._containersData.set(b, f);
      } else
        DEFAULT_ERROR_LOGGER(
          "setStepLengthCalculator",
          "the container to be an HTMLElement or the Window",
          b
        );
    },
    setXStepLength: function (a) {
      !Number.isFinite(a) || 0 >= a
        ? DEFAULT_ERROR_LOGGER(
            "setXStepLength",
            "the newXStepLength to be a positive number",
            a
          )
        : (uss._xStepLength = a);
    },
    setYStepLength: function (a) {
      !Number.isFinite(a) || 0 >= a
        ? DEFAULT_ERROR_LOGGER(
            "setYStepLength",
            "the newYStepLength to be a positive number",
            a
          )
        : (uss._yStepLength = a);
    },
    setStepLength: function (a) {
      !Number.isFinite(a) || 0 >= a
        ? DEFAULT_ERROR_LOGGER(
            "setStepLength",
            "the newStepLength to be a positive number",
            a
          )
        : ((uss._xStepLength = a), (uss._yStepLength = a));
    },
    setMinAnimationFrame: function (a) {
      !Number.isFinite(a) || 0 >= a
        ? DEFAULT_ERROR_LOGGER(
            "setMinAnimationFrame",
            "the newMinAnimationFrame to be a positive number",
            a
          )
        : (uss._minAnimationFrame = a);
    },
    setPageScroller: function (a) {
      a === window || a instanceof HTMLElement
        ? (uss._pageScroller = a)
        : DEFAULT_ERROR_LOGGER(
            "setPageScroller",
            "the newPageScroller to be an HTMLElement or the Window",
            a
          );
    },
    setDebugMode: function (a) {
      a = void 0 === a ? "" : a;
      if ("string" !== typeof a) {
        var b = null;
        /disabled/i.test(uss._debugMode) &&
          ((b = uss._debugMode), (uss._debugMode = "legacy"));
        DEFAULT_ERROR_LOGGER(
          "setDebugMode",
          'the newDebugMode to be "disabled", "legacy" or any other string',
          a
        );
        b && (uss._debugMode = b);
      } else uss._debugMode = a;
    },
    calcXStepLength: function (a) {
      if (!Number.isFinite(a) || 0 > a)
        throw (
          (DEFAULT_ERROR_LOGGER(
            "calcXStepLength",
            "the deltaX to be a positive number",
            a
          ),
          "USS fatal error (execution stopped)")
        );
      return a >= uss._minAnimationFrame * uss._xStepLength
        ? uss._xStepLength
        : Math.ceil(a / uss._minAnimationFrame);
    },
    calcYStepLength: function (a) {
      if (!Number.isFinite(a) || 0 > a)
        throw (
          (DEFAULT_ERROR_LOGGER(
            "calcYStepLength",
            "the deltaY to be a positive number",
            a
          ),
          "USS fatal error (execution stopped)")
        );
      return a >= uss._minAnimationFrame * uss._yStepLength
        ? uss._yStepLength
        : Math.ceil(a / uss._minAnimationFrame);
    },
    calcScrollbarsDimensions: function (a) {
      if (a === window) {
        if (
          ((a = document.scrollingElement || uss.getPageScroller()),
          a === window)
        )
          return [0, 0];
      } else if (!(a instanceof HTMLElement))
        throw (
          (DEFAULT_ERROR_LOGGER(
            "calcScrollbarsDimensions",
            "the element to be an HTMLElement or the Window",
            a
          ),
          "USS fatal error (execution stopped)")
        );
      if (0 === uss._scrollbarsMaxDimension) return [0, 0];
      var b = [],
        c = window.getComputedStyle(a),
        d = Number.parseInt(c.width),
        f = Number.parseInt(c.height),
        e = a.clientWidth,
        h = a.clientHeight,
        p = a.style.overflowX,
        t = a.style.overflowY,
        g = a.scrollLeft,
        k = a.scrollTop;
      a.style.overflowX = "hidden";
      a.style.overflowY = "hidden";
      b[0] = Number.parseInt(c.width) - d;
      b[1] = Number.parseInt(c.height) - f;
      0 === b[0] ? (b[0] = a.clientWidth - e) : 0 > b[0] && (b[0] = 0);
      0 === b[1] ? (b[1] = a.clientHeight - h) : 0 > b[1] && (b[1] = 0);
      a.style.overflowX = p;
      a.style.overflowY = t;
      a.scrollLeft = g;
      a.scrollTop = k;
      return b;
    },
    calcBordersDimensions: function (a) {
      if (
        a === window &&
        ((a = document.scrollingElement || uss.getPageScroller()), a === window)
      )
        return [0, 0, 0, 0];
      if (!(a instanceof HTMLElement))
        throw (
          (DEFAULT_ERROR_LOGGER(
            "calcBordersDimensions",
            "the element to be an HTMLElement or the Window",
            a
          ),
          "USS fatal error (execution stopped)")
        );
      a = window.getComputedStyle(a);
      return [
        Number.parseInt(a.borderTopWidth),
        Number.parseInt(a.borderRightWidth),
        Number.parseInt(a.borderBottomWidth),
        Number.parseInt(a.borderLeftWidth),
      ];
    },
    getScrollXCalculator: function (a) {
      a = void 0 === a ? uss._pageScroller : a;
      return a === window
        ? function () {
            return window.scrollX;
          }
        : a instanceof HTMLElement
        ? function () {
            return a.scrollLeft;
          }
        : function () {
            DEFAULT_ERROR_LOGGER(
              "getScrollXCalculator",
              "the container to be an HTMLElement or the Window",
              a
            );
            throw "USS fatal error (execution stopped)";
          };
    },
    getScrollYCalculator: function (a) {
      a = void 0 === a ? uss._pageScroller : a;
      return a === window
        ? function () {
            return window.scrollY;
          }
        : a instanceof HTMLElement
        ? function () {
            return a.scrollTop;
          }
        : function () {
            DEFAULT_ERROR_LOGGER(
              "getScrollYCalculator",
              "the container to be an HTMLElement or the Window",
              a
            );
            throw "USS fatal error (execution stopped)";
          };
    },
    getMaxScrollX: function (a) {
      a = void 0 === a ? uss._pageScroller : a;
      if (a === window) {
        var b = window.scrollX;
        a.scroll(1073741824, window.scrollY);
        var c = window.scrollX;
        a.scroll(b, window.scrollY);
        return c;
      }
      if (a === document.documentElement || a === document.body)
        return (
          (b = a.scrollLeft),
          (a.scrollLeft = 1073741824),
          (c = a.scrollLeft),
          (a.scrollLeft = b),
          c
        );
      if (a instanceof HTMLElement) return a.scrollWidth - a.clientWidth;
      DEFAULT_ERROR_LOGGER(
        "getMaxScrollX",
        "the container to be an HTMLElement or the Window",
        a
      );
    },
    getMaxScrollY: function (a) {
      a = void 0 === a ? uss._pageScroller : a;
      if (a === window) {
        var b = window.scrollY;
        a.scroll(window.scrollX, 1073741824);
        var c = window.scrollY;
        a.scroll(window.scrollX, b);
        return c;
      }
      if (a === document.documentElement || a === document.body)
        return (
          (b = a.scrollTop),
          (a.scrollTop = 1073741824),
          (c = a.scrollTop),
          (a.scrollTop = b),
          c
        );
      if (a instanceof HTMLElement) return a.scrollHeight - a.clientHeight;
      DEFAULT_ERROR_LOGGER(
        "getMaxScrollY",
        "the container to be an HTMLElement or the Window",
        a
      );
    },
    getXScrollableParent: function (a, b) {
      b = void 0 === b ? !1 : b;
      if (a === window) return null;
      if (!(a instanceof HTMLElement))
        return (
          DEFAULT_ERROR_LOGGER(
            "getXScrollableParent",
            "the element to be an HTMLElement or the Window",
            a
          ),
          null
        );
      var c = b ? /(auto|scroll|hidden|visible)/ : /(auto|scroll|visible)/,
        d = document.documentElement,
        f = document.body;
      if (a === f) {
        if (
          c.test(window.getComputedStyle(d).overflowX) &&
          1 <= uss.getMaxScrollX(d)
        )
          return d;
        a = d;
      }
      if (a === d) return 1 <= uss.getMaxScrollX(window) ? window : null;
      var e = window.getComputedStyle(a);
      if ("fixed" === e.position) return null;
      var h = b ? /(auto|scroll|hidden)/ : /(auto|scroll)/,
        p = "absolute" !== e.position;
      do {
        a = a.parentElement;
        e = window.getComputedStyle(a);
        if (a === f) break;
        if (
          (p || "static" !== e.position) &&
          a.scrollWidth > a.clientWidth &&
          h.test(e.overflowX)
        )
          return a;
        if ("fixed" === e.position) return null;
      } while (1);
      return c.test(e.overflowX) && 1 <= uss.getMaxScrollX(f)
        ? f
        : c.test(window.getComputedStyle(d).overflowX) &&
          1 <= uss.getMaxScrollX(d)
        ? d
        : 1 <= uss.getMaxScrollX(window)
        ? window
        : null;
    },
    getYScrollableParent: function (a, b) {
      b = void 0 === b ? !1 : b;
      if (a === window) return null;
      if (!(a instanceof HTMLElement))
        return (
          DEFAULT_ERROR_LOGGER(
            "getYScrollableParent",
            "the element to be an HTMLElement or the Window",
            a
          ),
          null
        );
      var c = b ? /(auto|scroll|hidden|visible)/ : /(auto|scroll|visible)/,
        d = document.documentElement,
        f = document.body;
      if (a === f) {
        if (
          c.test(window.getComputedStyle(d).overflowY) &&
          1 <= uss.getMaxScrollY(d)
        )
          return d;
        a = d;
      }
      if (a === d) return 1 <= uss.getMaxScrollY(window) ? window : null;
      var e = window.getComputedStyle(a);
      if ("fixed" === e.position) return null;
      var h = b ? /(auto|scroll|hidden)/ : /(auto|scroll)/,
        p = "absolute" !== e.position;
      do {
        a = a.parentElement;
        e = window.getComputedStyle(a);
        if (a === f) break;
        if (
          (p || "static" !== e.position) &&
          a.scrollHeight > a.clientHeight &&
          h.test(e.overflowY)
        )
          return a;
        if ("fixed" === e.position) return null;
      } while (1);
      return c.test(e.overflowY) && 1 <= uss.getMaxScrollY(f)
        ? f
        : c.test(window.getComputedStyle(d).overflowY) &&
          1 <= uss.getMaxScrollY(d)
        ? d
        : 1 <= uss.getMaxScrollY(window)
        ? window
        : null;
    },
    getScrollableParent: function (a, b) {
      b = void 0 === b ? !1 : b;
      if (a === window) return null;
      if (!(a instanceof HTMLElement))
        return (
          DEFAULT_ERROR_LOGGER(
            "getScrollableParent",
            "the element to be an HTMLElement or the Window",
            a
          ),
          null
        );
      var c = b ? /(auto|scroll|hidden|visible)/ : /(auto|scroll|visible)/,
        d = document.documentElement,
        f = document.body,
        e = function (g) {
          return 1 <= uss.getMaxScrollX(g) || 1 <= uss.getMaxScrollY(g);
        };
      if (a === f) {
        if (c.test(window.getComputedStyle(d).overflow) && e(d)) return d;
        a = d;
      }
      if (a === d) return e(window) ? window : null;
      var h = window.getComputedStyle(a);
      if ("fixed" === h.position) return null;
      var p = b ? /(auto|scroll|hidden)/ : /(auto|scroll)/,
        t = "absolute" !== h.position;
      do {
        a = a.parentElement;
        h = window.getComputedStyle(a);
        if (a === f) break;
        if (
          (t || "static" !== h.position) &&
          (a.scrollWidth > a.clientWidth || a.scrollHeight > a.clientHeight) &&
          p.test(h.overflow)
        )
          return a;
        if ("fixed" === h.position) return null;
      } while (1);
      return c.test(h.overflow) && e(f)
        ? f
        : c.test(window.getComputedStyle(d).overflow) && e(d)
        ? d
        : e(window)
        ? window
        : null;
    },
    getAllScrollableParents: function (a, b, c) {
      b = void 0 === b ? !1 : b;
      if (a === window) return [];
      if (!(a instanceof HTMLElement))
        return (
          DEFAULT_ERROR_LOGGER(
            "getAllScrollableParents",
            "the element to be an HTMLElement or the Window",
            a
          ),
          []
        );
      var d = b ? /(auto|scroll|hidden|visible)/ : /(auto|scroll|visible)/,
        f = document.documentElement,
        e = document.body,
        h = [],
        p = "function" === typeof c ? c : function () {};
      c = function (l) {
        return 1 <= uss.getMaxScrollX(l) || 1 <= uss.getMaxScrollY(l);
      };
      var t = function (l) {
        h.push(l);
        p(l);
      };
      a === e &&
        (d.test(window.getComputedStyle(f).overflow) && c(f) && t(f), (a = f));
      if (a === f) return c(window) && t(window), h;
      var g = window.getComputedStyle(a);
      if ("fixed" === g.position) return h;
      b = b ? /(auto|scroll|hidden)/ : /(auto|scroll)/;
      var k = "absolute" !== g.position;
      do {
        a = a.parentElement;
        g = window.getComputedStyle(a);
        if (a === e) break;
        (k || "static" !== g.position) &&
          (a.scrollWidth > a.clientWidth || a.scrollHeight > a.clientHeight) &&
          b.test(g.overflow) &&
          t(a);
        if ("fixed" === g.position) return h;
      } while (1);
      d.test(g.overflow) && c(e) && t(e);
      d.test(window.getComputedStyle(f).overflow) && c(f) && t(f);
      c(window) && t(window);
      return h;
    },
    scrollXTo: function (a, b, c) {
      function d(k) {
        var l = g[2],
          r = g[4],
          m = f(),
          n = (l - m) * r;
        if (1 > n) uss.stopScrollingX(b, g[10]);
        else {
          try {
            var u = g[0];
            var q = g[14]
              ? g[14](n, g[8], k, g[6], m, l, b)
              : g[12](n, g[8], k, g[6], m, l, b);
            if (u !== g[0]) return;
            if (l !== g[2]) {
              g[0] = window.requestAnimationFrame(d);
              return;
            }
            Number.isFinite(q) ||
              (DEFAULT_WARNING_LOGGER(q, "is not a valid step length", !0),
              (q = uss.calcXStepLength(e)));
          } catch (v) {
            q = uss.calcXStepLength(e);
          }
          n <= q
            ? (p(l), uss.stopScrollingX(b, g[10]))
            : (p(m + q * r),
              0 !== q && m === f()
                ? uss.stopScrollingX(b, g[10])
                : (g[0] = window.requestAnimationFrame(d)));
        }
      }
      b = void 0 === b ? uss._pageScroller : b;
      if (Number.isFinite(a))
        if (b === window || b instanceof HTMLElement)
          if (1 > uss.getMaxScrollX(b))
            (a =
              b === window
                ? "window"
                : b.tagName.toLowerCase() +
                  (b.id ? "#" + b.id : "") +
                  (b.className ? "." + b.className : "")),
              DEFAULT_WARNING_LOGGER(a, "is not scrollable on the x-axis", !1),
              uss.stopScrollingX(b, c);
          else {
            var f = uss.getScrollXCalculator(b),
              e = a - f(),
              h = 0 < e ? 1 : -1;
            e *= h;
            if (1 > e) uss.stopScrollingX(b, c);
            else {
              var p =
                b !== window
                  ? function (k) {
                      return (b.scrollLeft = k);
                    }
                  : function (k) {
                      return b.scroll(k, window.scrollY);
                    };
              if (uss._reducedMotion) p(a), uss.stopScrollingX(b, c);
              else {
                var t = uss._containersData.get(b),
                  g = t || [];
                g[2] = a;
                g[4] = h;
                g[6] = e;
                g[8] = performance.now();
                g[10] = c;
                g[0] ||
                  ((g[0] = window.requestAnimationFrame(d)),
                  t || uss._containersData.set(b, g));
              }
            }
          }
        else
          DEFAULT_ERROR_LOGGER(
            "scrollXTo",
            "the container to be an HTMLElement or the Window",
            b
          );
      else
        DEFAULT_ERROR_LOGGER(
          "scrollXTo",
          "the finalXPosition to be a number",
          a
        );
    },
    scrollYTo: function (a, b, c) {
      function d(k) {
        var l = g[3],
          r = g[5],
          m = f(),
          n = (l - m) * r;
        if (1 > n) uss.stopScrollingY(b, g[11]);
        else {
          try {
            var u = g[1];
            var q = g[15]
              ? g[15](n, g[9], k, g[7], m, l, b)
              : g[13](n, g[9], k, g[7], m, l, b);
            if (u !== g[1]) return;
            if (l !== g[3]) {
              g[1] = window.requestAnimationFrame(d);
              return;
            }
            Number.isFinite(q) ||
              (DEFAULT_WARNING_LOGGER(q, "is not a valid step length", !0),
              (q = uss.calcYStepLength(e)));
          } catch (v) {
            q = uss.calcYStepLength(e);
          }
          n <= q
            ? (p(l), uss.stopScrollingY(b, g[11]))
            : (p(m + q * r),
              0 !== q && m === f()
                ? uss.stopScrollingY(b, g[11])
                : (g[1] = window.requestAnimationFrame(d)));
        }
      }
      b = void 0 === b ? uss._pageScroller : b;
      if (Number.isFinite(a))
        if (b === window || b instanceof HTMLElement)
          if (1 > uss.getMaxScrollY(b))
            (a =
              b === window
                ? "window"
                : b.tagName.toLowerCase() +
                  (b.id ? "#" + b.id : "") +
                  (b.className ? "." + b.className : "")),
              DEFAULT_WARNING_LOGGER(a, "is not scrollable on the y-axis", !1),
              uss.stopScrollingY(b, c);
          else {
            var f = uss.getScrollYCalculator(b),
              e = a - f(),
              h = 0 < e ? 1 : -1;
            e *= h;
            if (1 > e) uss.stopScrollingY(b, c);
            else {
              var p =
                b !== window
                  ? function (k) {
                      return (b.scrollTop = k);
                    }
                  : function (k) {
                      return b.scroll(window.scrollX, k);
                    };
              if (uss._reducedMotion) p(a), uss.stopScrollingY(b, c);
              else {
                var t = uss._containersData.get(b),
                  g = t || [];
                g[3] = a;
                g[5] = h;
                g[7] = e;
                g[9] = performance.now();
                g[11] = c;
                g[1] ||
                  ((g[1] = window.requestAnimationFrame(d)),
                  t || uss._containersData.set(b, g));
              }
            }
          }
        else
          DEFAULT_ERROR_LOGGER(
            "scrollYTo",
            "the container to be an HTMLElement or the Window",
            b
          );
      else
        DEFAULT_ERROR_LOGGER(
          "scrollYTo",
          "the finalYPosition to be a number",
          a
        );
    },
    scrollXBy: function (a, b, c, d) {
      b = void 0 === b ? uss._pageScroller : b;
      d = void 0 === d ? !0 : d;
      if (Number.isFinite(a))
        if (b === window || b instanceof HTMLElement) {
          if (!d && ((d = uss._containersData.get(b) || []), d[0])) {
            d[8] = performance.now();
            d[10] = c;
            0 !== a &&
              ((d[2] += a),
              (a = d[2] - uss.getScrollXCalculator(b)()),
              (d[4] = 0 < a ? 1 : -1),
              (d[6] = a * d[4]));
            return;
          }
          uss.scrollXTo(uss.getScrollXCalculator(b)() + a, b, c);
        } else
          DEFAULT_ERROR_LOGGER(
            "scrollXBy",
            "the container to be an HTMLElement or the Window",
            b
          );
      else DEFAULT_ERROR_LOGGER("scrollXBy", "the deltaX to be a number", a);
    },
    scrollYBy: function (a, b, c, d) {
      b = void 0 === b ? uss._pageScroller : b;
      d = void 0 === d ? !0 : d;
      if (Number.isFinite(a))
        if (b === window || b instanceof HTMLElement) {
          if (!d && ((d = uss._containersData.get(b) || []), d[1])) {
            d[9] = performance.now();
            d[11] = c;
            0 !== a &&
              ((d[3] += a),
              (a = d[3] - uss.getScrollYCalculator(b)()),
              (d[5] = 0 < a ? 1 : -1),
              (d[7] = a * d[5]));
            return;
          }
          uss.scrollYTo(uss.getScrollYCalculator(b)() + a, b, c);
        } else
          DEFAULT_ERROR_LOGGER(
            "scrollYBy",
            "the container to be an HTMLElement or the Window",
            b
          );
      else DEFAULT_ERROR_LOGGER("scrollYBy", "the deltaY to be a number", a);
    },
    scrollTo: function (a, b, c, d) {
      c = void 0 === c ? uss._pageScroller : c;
      if (Number.isFinite(a))
        if (Number.isFinite(b))
          if (c === window || c instanceof HTMLElement) {
            var f = 0,
              e =
                "function" === typeof d
                  ? function () {
                      1 > f ? f++ : d();
                    }
                  : null;
            uss.scrollXTo(a, c, e);
            uss.scrollYTo(b, c, e);
          } else
            DEFAULT_ERROR_LOGGER(
              "scrollTo",
              "the container to be an HTMLElement or the Window",
              c
            );
        else
          DEFAULT_ERROR_LOGGER(
            "scrollTo",
            "the finalYPosition to be a number",
            b
          );
      else
        DEFAULT_ERROR_LOGGER(
          "scrollTo",
          "the finalXPosition to be a number",
          a
        );
    },
    scrollBy: function (a, b, c, d, f) {
      c = void 0 === c ? uss._pageScroller : c;
      f = void 0 === f ? !0 : f;
      if (Number.isFinite(a))
        if (Number.isFinite(b))
          if (c === window || c instanceof HTMLElement) {
            if (f) {
              f = uss.getScrollXCalculator(c)();
              var e = uss.getScrollYCalculator(c)();
            } else
              (e = uss._containersData.get(c) || []),
                (f = e[0] ? e[2] : uss.getScrollXCalculator(c)()),
                (e = e[1] ? e[3] : uss.getScrollYCalculator(c)());
            uss.scrollTo(f + a, e + b, c, d);
          } else
            DEFAULT_ERROR_LOGGER(
              "scrollBy",
              "the container to be an HTMLElement or the Window",
              c
            );
        else DEFAULT_ERROR_LOGGER("scrollBy", "the deltaY to be a number", b);
      else DEFAULT_ERROR_LOGGER("scrollBy", "the deltaX to be a number", a);
    },
    scrollIntoView: function (a, b, c, d, f) {
      function e() {
        var r = uss.calcScrollbarsDimensions(k),
          m = uss.calcBordersDimensions(k),
          n =
            k !== window
              ? k.getBoundingClientRect()
              : {
                  left: 0,
                  top: 0,
                  width: uss._windowWidth,
                  height: uss._windowHeight,
                },
          u = n.width,
          q = n.height,
          v = l.getBoundingClientRect(),
          z = v.width,
          w = v.height,
          y = v.left - n.left;
        n = v.top - n.top;
        if ("nearest" === b) {
          v = Math.abs(u - y - z);
          var x = Math.abs(0.5 * (u - z) - y);
          g = (0 < y ? y : -y) < x ? !0 : v < x ? !1 : null;
        }
        "nearest" === c &&
          ((v = Math.abs(q - n - w)),
          (x = Math.abs(0.5 * (q - w) - n)),
          (t = (0 < n ? n : -n) < x ? !0 : v < x ? !1 : null));
        u =
          y -
          (!0 === g
            ? m[3]
            : !1 === g
            ? u - z - r[0] - m[1]
            : 0.5 * (u - z - r[0] - m[1] + m[3]));
        r =
          n -
          (!0 === t
            ? m[0]
            : !1 === t
            ? q - w - r[1] - m[2]
            : 0.5 * (q - w - r[1] - m[2] + m[0]));
        m = function () {
          l === a
            ? "function" === typeof d && d()
            : (h--, (k = p[h]), (l = 1 > h ? a : p[h - 1]), e());
        };
        0 !== u && 0 !== r
          ? uss.scrollBy(u, r, k, m)
          : 0 !== u
          ? uss.scrollXBy(u, k, m)
          : 0 !== r
          ? uss.scrollYBy(r, k, m)
          : m();
      }
      b = void 0 === b ? !0 : b;
      c = void 0 === c ? !0 : c;
      f = void 0 === f ? !1 : f;
      if (a === window)
        "function" === typeof d && window.requestAnimationFrame(d);
      else if (a instanceof HTMLElement) {
        var h = -1,
          p = uss.getAllScrollableParents(a, f, function () {
            return h++;
          });
        if (0 > h) "function" === typeof d && window.requestAnimationFrame(d);
        else {
          var t = c,
            g = b,
            k = p[h],
            l = p[h - 1];
          k !== window ||
            (l !== document.body && l !== document.documentElement) ||
            (h--, (p[h] = window));
          l = 1 > h ? a : p[h - 1];
          e();
        }
      } else
        DEFAULT_ERROR_LOGGER(
          "scrollIntoView",
          "the container to be an HTMLElement or the Window",
          a
        );
    },
    scrollIntoViewIfNeeded: function (a, b, c, d) {
      function f() {
        var l = uss.calcScrollbarsDimensions(g),
          r = uss.calcBordersDimensions(g),
          m =
            g !== window
              ? g.getBoundingClientRect()
              : {
                  left: 0,
                  top: 0,
                  width: uss._windowWidth,
                  height: uss._windowHeight,
                },
          n = m.width,
          u = m.height,
          q = k.getBoundingClientRect(),
          v = q.width,
          z = q.height,
          w = q.left - m.left;
        m = q.top - m.top;
        q = 0 >= w && 0 <= w + v - n + l[0];
        var y = 0 >= m && 0 <= m + z - u + l[1],
          x = k === a;
        q = (-1 < w && 1 > w + v - n + l[0]) || (x && q);
        y = (-1 < m && 1 > m + z - u + l[1]) || (x && y);
        if (q && y)
          x
            ? "function" === typeof c && window.requestAnimationFrame(c)
            : (e--, (g = h[e]), (k = 1 > e ? a : h[e - 1]), f());
        else {
          if (x && !0 === b) y = q = !1;
          else {
            if (!q) {
              x = Math.abs(n - w - v);
              var A = Math.abs(0.5 * (n - v) - w);
              t = (0 < w ? w : -w) < A ? !0 : x < A ? !1 : null;
            }
            y ||
              ((x = Math.abs(u - m - z)),
              (A = Math.abs(0.5 * (u - z) - m)),
              (p = (0 < m ? m : -m) < A ? !0 : x < A ? !1 : null));
          }
          n =
            w -
            (q
              ? w
              : !0 === t
              ? r[3]
              : !1 === t
              ? n - v - l[0] - r[1]
              : 0.5 * (n - v - l[0] - r[1] + r[3]));
          l =
            m -
            (y
              ? m
              : !0 === p
              ? r[0]
              : !1 === p
              ? u - z - l[1] - r[2]
              : 0.5 * (u - z - l[1] - r[2] + r[0]));
          r = function () {
            k === a
              ? "function" === typeof c && c()
              : (e--, (g = h[e]), (k = 1 > e ? a : h[e - 1]), f());
          };
          0 !== n && 0 !== l
            ? uss.scrollBy(n, l, g, r)
            : 0 !== n
            ? uss.scrollXBy(n, g, r)
            : 0 !== l
            ? uss.scrollYBy(l, g, r)
            : r();
        }
      }
      b = void 0 === b ? !0 : b;
      d = void 0 === d ? !1 : d;
      if (a === window)
        "function" === typeof c && window.requestAnimationFrame(c);
      else if (a instanceof HTMLElement) {
        var e = -1,
          h = uss.getAllScrollableParents(a, d, function () {
            return e++;
          });
        if (0 > e) "function" === typeof c && window.requestAnimationFrame(c);
        else {
          var p = null,
            t = null,
            g = h[e],
            k = h[e - 1];
          g !== window ||
            (k !== document.body && k !== document.documentElement) ||
            (e--, (h[e] = window));
          k = 1 > e ? a : h[e - 1];
          f();
        }
      } else
        DEFAULT_ERROR_LOGGER(
          "scrollIntoView",
          "the container to be an HTMLElement or the Window",
          a
        );
    },
    stopScrollingX: function (a, b) {
      a = void 0 === a ? uss._pageScroller : a;
      if (a === window || a instanceof HTMLElement) {
        var c = uss._containersData.get(a) || [];
        window.cancelAnimationFrame(c[0]);
        c[0] = null;
        if (!c[1]) {
          var d = [];
          c[12] && (d[12] = c[12]);
          c[13] && (d[13] = c[13]);
          uss._containersData.set(a, d);
        }
        "function" === typeof b && window.requestAnimationFrame(b);
      } else
        DEFAULT_ERROR_LOGGER(
          "stopScrollingX",
          "the container to be an HTMLElement or the Window",
          a
        );
    },
    stopScrollingY: function (a, b) {
      a = void 0 === a ? uss._pageScroller : a;
      if (a === window || a instanceof HTMLElement) {
        var c = uss._containersData.get(a) || [];
        window.cancelAnimationFrame(c[1]);
        c[1] = null;
        if (!c[1]) {
          var d = [];
          c[12] && (d[12] = c[12]);
          c[13] && (d[13] = c[13]);
          uss._containersData.set(a, d);
        }
        "function" === typeof b && window.requestAnimationFrame(b);
      } else
        DEFAULT_ERROR_LOGGER(
          "stopScrollingY",
          "the container to be an HTMLElement or the Window",
          a
        );
    },
    stopScrolling: function (a, b) {
      a = void 0 === a ? uss._pageScroller : a;
      if (a === window || a instanceof HTMLElement) {
        var c = uss._containersData.get(a) || [];
        window.cancelAnimationFrame(c[0]);
        window.cancelAnimationFrame(c[1]);
        c[0] = null;
        c[1] = null;
        var d = [];
        c[12] && (d[12] = c[12]);
        c[13] && (d[13] = c[13]);
        uss._containersData.set(a, d);
        "function" === typeof b && window.requestAnimationFrame(b);
      } else
        DEFAULT_ERROR_LOGGER(
          "stopScrolling",
          "the container to be an HTMLElement or the Window",
          a
        );
    },
    stopScrollingAll: function (a) {
      for (
        var b = $jscomp.makeIterator(uss._containersData.entries()),
          c = b.next();
        !c.done;
        c = b.next()
      ) {
        var d = $jscomp.makeIterator(c.value);
        c = d.next().value;
        d = d.next().value;
        window.cancelAnimationFrame(d[0]);
        window.cancelAnimationFrame(d[1]);
        d[0] = null;
        d[1] = null;
        var f = [];
        d[12] && (f[12] = d[12]);
        d[13] && (f[13] = d[13]);
        uss._containersData.set(c, f);
      }
      "function" === typeof a && window.requestAnimationFrame(a);
    },
    hrefSetup: function (a, b, c, d, f, e) {
      a = void 0 === a ? !0 : a;
      b = void 0 === b ? !0 : b;
      f = void 0 === f ? !1 : f;
      e = void 0 === e ? !1 : e;
      var h = "function" === typeof c ? c : function () {};
      c = document.URL.split("#")[0];
      var p =
        e &&
        !!(
          window.history &&
          window.history.pushState &&
          window.history.scrollRestoration
        );
      p &&
        ((window.history.scrollRestoration = "manual"),
        window.addEventListener(
          "popstate",
          function () {
            var k = document.URL.split("#")[1];
            k
              ? ((k =
                  document.getElementById(k) ||
                  document.querySelector("a[name='" + k + "']")),
                null !== k &&
                  !1 !== h(window, k) &&
                  uss.scrollIntoView(k, a, b, d, f))
              : !1 !== h(window, uss._pageScroller) &&
                uss.scrollTo(0, 0, uss._pageScroller, d);
          },
          { passive: !0 }
        ),
        window.addEventListener(
          "unload",
          function (k) {
            return k.preventDefault();
          },
          { passive: !1, once: !0 }
        ));
      e = {};
      for (
        var t = $jscomp.makeIterator(document.links), g = t.next();
        !g.done;
        e = {
          $jscomp$loop$prop$_pageLink$10: e.$jscomp$loop$prop$_pageLink$10,
          $jscomp$loop$prop$_elementToReach$11:
            e.$jscomp$loop$prop$_elementToReach$11,
          $jscomp$loop$prop$_pageLinkParts$12:
            e.$jscomp$loop$prop$_pageLinkParts$12,
        },
          g = t.next()
      )
        (e.$jscomp$loop$prop$_pageLink$10 = g.value),
          (e.$jscomp$loop$prop$_pageLinkParts$12 =
            e.$jscomp$loop$prop$_pageLink$10.href.split("#")),
          e.$jscomp$loop$prop$_pageLinkParts$12[0] === c &&
            ("" === e.$jscomp$loop$prop$_pageLinkParts$12[1]
              ? e.$jscomp$loop$prop$_pageLink$10.addEventListener(
                  "click",
                  (function (k) {
                    return function (l) {
                      l.preventDefault();
                      l.stopPropagation();
                      !1 !==
                        h(
                          k.$jscomp$loop$prop$_pageLink$10,
                          uss._pageScroller
                        ) &&
                        (p &&
                          "#" !== window.history.state &&
                          window.history.pushState("#", "", "#"),
                        uss.scrollTo(0, 0, uss._pageScroller, d));
                    };
                  })(e),
                  { passive: !1 }
                )
              : ((e.$jscomp$loop$prop$_elementToReach$11 =
                  document.getElementById(
                    e.$jscomp$loop$prop$_pageLinkParts$12[1]
                  ) ||
                  document.querySelector(
                    "a[name='" + e.$jscomp$loop$prop$_pageLinkParts$12[1] + "']"
                  )),
                null === e.$jscomp$loop$prop$_elementToReach$11
                  ? DEFAULT_WARNING_LOGGER(
                      e.$jscomp$loop$prop$_pageLinkParts$12[1],
                      "is not a valid anchor's destination",
                      !0
                    )
                  : e.$jscomp$loop$prop$_pageLink$10.addEventListener(
                      "click",
                      (function (k) {
                        return function (l) {
                          l.preventDefault();
                          l.stopPropagation();
                          !1 !==
                            h(
                              k.$jscomp$loop$prop$_pageLink$10,
                              k.$jscomp$loop$prop$_elementToReach$11
                            ) &&
                            (p &&
                              window.history.state !==
                                k.$jscomp$loop$prop$_pageLinkParts$12[1] &&
                              window.history.pushState(
                                k.$jscomp$loop$prop$_pageLinkParts$12[1],
                                "",
                                "#" + k.$jscomp$loop$prop$_pageLinkParts$12[1]
                              ),
                            uss.scrollIntoView(
                              k.$jscomp$loop$prop$_elementToReach$11,
                              a,
                              b,
                              d,
                              f
                            ));
                        };
                      })(e),
                      { passive: !1 }
                    )));
    },
  };
window.addEventListener(
  "resize",
  function () {
    uss._windowHeight = window.innerHeight;
    uss._windowWidth = window.innerWidth;
  },
  { passive: !0 }
);
window.addEventListener(
  "load",
  function () {
    var a = document.createElement("div");
    a.style.overflowX = "scroll";
    document.body.appendChild(a);
    uss._scrollbarsMaxDimension = a.offsetHeight - a.clientHeight;
    document.body.removeChild(a);
  },
  { passive: !0, once: !0 }
);
try {
  window.matchMedia("(prefers-reduced-motion)").addEventListener(
    "change",
    function () {
      uss._reducedMotion = !uss._reducedMotion;
      uss.stopScrollingAll();
    },
    { passive: !0 }
  );
} catch (a) {
  window.matchMedia("(prefers-reduced-motion)").addListener(
    function () {
      uss._reducedMotion = !uss._reducedMotion;
      uss.stopScrollingAll();
    },
    { passive: !0 }
  );
}
