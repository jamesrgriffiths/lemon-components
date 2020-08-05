'use strict';Object.defineProperty(exports,'__esModule',{value:true});function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script = {
  props: {
    data: {
      default: function _default() {
        return [];
      }
    },
    limit: {
      default: 10,
      validator: function validator(x) {
        return x > 0;
      }
    },
    size: {
      default: 200
    },
    padding: {
      default: 10
    },
    cutout: {
      default: 0
    }
  },
  data: function data() {
    return {
      box_size: 0
    };
  },
  created: function created() {
    // Set the box size
    this.box_size = parseInt(this.size) + parseInt(this.padding * 2); // Get the totals;

    var total = 0;
    var other_total = 0;

    for (var i = 0; i < this.data.length; i++) {
      total += this.data[i].total;

      if (i + 1 >= this.limit) {
        other_total += this.data[i].total;
      }
    } // Remove and replace additional items with the other variable


    while (this.data.length >= this.limit) {
      this.data.pop();
    }

    if (other_total > 0) {
      this.data.push({
        'name': 'Other',
        'total': other_total
      });
    } // Set the sizing and color of each item


    var radius = this.size / 2;
    var radian_multiplier = 6.2831853;
    var rotation = 0;

    for (var i = 0; i < this.data.length; i++) {
      var fraction = this.data[i].total / total;
      var x = radius * Math.sin(fraction * radian_multiplier) + radius;
      var y = fraction == 0.25 ? radius : radius - radius * Math.cos(fraction * radian_multiplier);
      var curve = "";

      if (fraction > 0.5) {
        curve += "A " + radius + " " + radius + " 0 0 1 " + radius * 2 + " " + radius + " ";
      }

      if (fraction > 0.75) {
        curve += "A " + radius + " " + radius + " 0 0 1 0 " + radius + " ";
      }

      curve += "A " + radius + " " + radius + " 0 0 1 " + x + " " + y + " ";
      var start = "M " + radius + " 0 ";
      var line = "L " + radius + " " + radius + " ";
      var path = start + curve + line + "Z";
      this.data[i].path = path;
      this.data[i].rotation = rotation;
      rotation += fraction * 360;
      this.data[i].color_class = 'gc-color-' + (i % 30 + 1);
    }
  }
};function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "gc-container",
    style: 'width: ' + _vm.box_size + 'px',
    attrs: {
      "id": "gc-container"
    }
  }, [_vm._ssrNode("<svg" + _vm._ssrAttr("width", _vm.box_size) + _vm._ssrAttr("height", _vm.box_size) + _vm._ssrAttr("viewBox", '0 0 ' + _vm.box_size + ' ' + _vm.box_size) + " class=\"gc-pie\">" + _vm._ssrList(_vm.data, function (item) {
    return "<path" + _vm._ssrAttr("d", item.path) + _vm._ssrAttr("transform", 'translate(' + _vm.padding + ',' + _vm.padding + ') rotate(' + item.rotation + ' ' + _vm.size / 2 + ' ' + _vm.size / 2 + ')') + _vm._ssrClass(null, 'gc-piece ' + item.color_class) + "></path>";
  }) + " <circle" + _vm._ssrAttr("cx", _vm.size / 2 + _vm.padding) + _vm._ssrAttr("cy", _vm.size / 2 + _vm.padding) + _vm._ssrAttr("r", _vm.cutout) + " class=\"gc-pie-inner\"></circle></svg> " + _vm._ssrList(_vm.data, function (item) {
    return "<div" + _vm._ssrClass(null, 'gc-text ' + item.color_class) + ">" + _vm._ssrEscape("\n    " + _vm._s(item.name) + " (" + _vm._s(item.total) + ")\n  ") + "</div>";
  }))]);
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = undefined;
/* scoped */

var __vue_scope_id__ = undefined;
/* module identifier */

var __vue_module_identifier__ = "data-v-59bd32af";
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, undefined, undefined);//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script$1 = {
  props: {
    links: {
      default: function _default() {
        return [];
      }
    },
    side: {
      default: "left",
      validator: function validator(x) {
        return ["left", "right"].indexOf(x) !== -1;
      }
    },
    buttonStyleHamburger: {
      default: "auto",
      validator: function validator(x) {
        return ["auto", "invert", "light", "dark"].indexOf(x) !== -1;
      }
    },
    buttonStyleX: {
      default: "auto",
      validator: function validator(x) {
        return ["auto", "invert", "light", "dark"].indexOf(x) !== -1;
      }
    }
  },
  data: function data() {
    return {
      visible: false
    };
  },
  methods: {
    linkDisplay: function linkDisplay(link) {
      return link.replace("_", " ");
    },
    toggleMenu: function toggleMenu() {
      this.visible = !this.visible;
    }
  }
};/* script */
var __vue_script__$1 = script$1;
/* template */

var __vue_render__$1 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', [_vm._ssrNode("<div class=\"lemon-graphic-button\"><div" + _vm._ssrClass(null, 'lemon-graphic-button-' + _vm.buttonStyleHamburger + ' lemon-graphic-button-hamburger-line1') + "><div class=\"lemon-graphic-button-hamburger-line2\"><div class=\"lemon-graphic-button-hamburger-line3\"></div></div></div></div> <div" + _vm._ssrClass("ms-menu", _vm.visible ? 'ms-menu-' + _vm.side + ' ms-menu-' + _vm.side + '-visible' : 'ms-menu-' + _vm.side) + "><div class=\"ms-menu-header\"><div class=\"lemon-graphic-button\"><div" + _vm._ssrClass(null, 'lemon-graphic-button-' + _vm.buttonStyleX + ' lemon-graphic-button-x-line1') + "><div class=\"lemon-graphic-button-x-line2\"></div></div></div></div> <div class=\"lemon-accent-line\"></div> " + _vm._ssrList(_vm.links, function (link) {
    return "<a" + _vm._ssrAttr("href", link.value ? link.value : link) + _vm._ssrAttr("onclick", link.function ? 'event.preventDefault(); ' + link.function : '') + _vm._ssrClass("ms-menu-item", link.display ? '' : 'capitalize') + ">" + _vm._ssrEscape("\n      " + _vm._s(link.display ? link.display : _vm.linkDisplay(link)) + "\n    ") + "</a>";
  }) + "</div>")]);
};

var __vue_staticRenderFns__$1 = [];
/* style */

var __vue_inject_styles__$1 = undefined;
/* scoped */

var __vue_scope_id__$1 = undefined;
/* module identifier */

var __vue_module_identifier__$1 = "data-v-7027219a";
/* functional template */

var __vue_is_functional_template__$1 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$1 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, undefined, undefined, undefined);var components=/*#__PURE__*/Object.freeze({__proto__:null,LemonGraphCircle: __vue_component__,LemonMenuSlide: __vue_component__$1});var install = function installLemonComponents(Vue) {
  if (install.installed) return;
  install.installed = true;
  Object.entries(components).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        componentName = _ref2[0],
        component = _ref2[1];

    Vue.component(componentName, component);
  });
}; // Create module definition for Vue.use()


var plugin = {
  install: install
}; // To auto-install on non-es builds, when vue is found
// eslint-disable-next-line no-redeclare

/* global window, global */

{
  var GlobalVue = null;

  if (typeof window !== 'undefined') {
    GlobalVue = window.Vue;
  } else if (typeof global !== 'undefined') {
    GlobalVue = global.Vue;
  }

  if (GlobalVue) {
    GlobalVue.use(plugin);
  }
} // Default export is library as a whole, registered via Vue.use()
exports.LemonGraphCircle=__vue_component__;exports.LemonMenuSlide=__vue_component__$1;exports.default=plugin;