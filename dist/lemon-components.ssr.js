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
var script = {
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
    }
  },
  data: function data() {
    return {
      visible: false
    };
  },
  methods: {
    showMenu: function showMenu() {
      this.visible = true;
    },
    hideMenu: function hideMenu() {
      this.visible = false;
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
}function createInjectorSSR(context) {
    if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
    }
    if (!context)
        return () => { };
    if (!('styles' in context)) {
        context._styles = context._styles || {};
        Object.defineProperty(context, 'styles', {
            enumerable: true,
            get: () => context._renderStyles(context._styles)
        });
        context._renderStyles = context._renderStyles || renderStyles;
    }
    return (id, style) => addStyle(id, style, context);
}
function addStyle(id, css, context) {
    const group =  css.media || 'default' ;
    const style = context._styles[group] || (context._styles[group] = { ids: [], css: '' });
    if (!style.ids.includes(id)) {
        style.media = css.media;
        style.ids.push(id);
        let code = css.source;
        style.css += code + '\n';
    }
}
function renderStyles(styles) {
    let css = '';
    for (const key in styles) {
        const style = styles[key];
        css +=
            '<style data-vue-ssr-id="' +
                Array.from(style.ids).join(' ') +
                '"' +
                (style.media ? ' media="' + style.media + '"' : '') +
                '>' +
                style.css +
                '</style>';
    }
    return css;
}/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', [_vm._ssrNode("<div class=\"ms-menu-open\"><div class=\"ms-menu-button-open-line1\"><div class=\"ms-menu-button-open-line2\"><div class=\"ms-menu-button-open-line3\"></div></div></div></div> <div" + _vm._ssrClass("ms-menu", _vm.visible ? 'ms-menu-' + _vm.side + ' ms-menu-' + _vm.side + '-visible' : 'ms-menu-' + _vm.side) + "><div class=\"ms-menu-close\"><div class=\"ms-menu-button-close-line1\"><div class=\"ms-menu-button-close-line2\"></div></div></div> <div class=\"accent-line\"></div> " + _vm._ssrList(_vm.links, function (link) {
    return "<a" + _vm._ssrAttr("href", link) + " class=\"ms-menu-item\">" + _vm._ssrEscape(_vm._s(link)) + "</a>";
  }) + "</div>")]);
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-6741bde0_0", {
    source: ".accent-line{display:block;height:0;border-bottom:3px solid rgba(255,163,66,.9)}.ms-menu-open{display:inline-block;height:31px;cursor:pointer}.ms-menu-button-open-line,.ms-menu-button-open-line1,.ms-menu-button-open-line2,.ms-menu-button-open-line3{width:31px;height:5px;border-radius:5px}.ms-menu-button-open-line1{background-color:#1080dd;transform:translateY(4px)}:hover>.ms-menu-button-open-line1{background-color:#0979d6}.ms-menu-button-open-line2{background-color:inherit;transform:translateY(9px)}.ms-menu-button-open-line3{background-color:inherit;transform:translateY(9px)}.ms-menu-close{display:block;height:51px;padding:10px;background-color:#fafdfd;cursor:pointer}.ms-menu-button-close-line,.ms-menu-button-close-line1,.ms-menu-button-close-line2{width:31px;height:5px;border-radius:5px}.ms-menu-button-close-line1{background-color:#1080dd;transform:rotate(45deg);margin:15.5px auto}:hover>.ms-menu-button-close-line1{background-color:#0979d6}.ms-menu-button-close-line2{background-color:inherit;transform:rotate(90deg)}.ms-menu{position:fixed;z-index:100;top:0;height:100vh;width:300px;background-color:#f5f7f9;box-shadow:0 4px 8px 0 rgba(0,0,0,.2)}.ms-menu-right{right:-300px;transition:right .4s linear}.ms-menu-right-visible{right:0}.ms-menu-left{left:-300px;transition:left .4s linear}.ms-menu-left-visible{left:0}.ms-menu-item{display:block;height:50px;padding:5px 15px;text-decoration:none;text-transform:capitalize;line-height:50px;color:#00050a}.ms-menu-item:hover{background-color:#fafdfd;border-radius:5px;box-shadow:0 4px 8px 0 rgba(0,0,0,.3)}@media (prefers-color-scheme:dark){.ms-menu-button-open-line1{background-color:#fafbff}:hover>.ms-menu-button-open-line1{background-color:#e5e6ea}.ms-menu-button-close-line1{background-color:#fafbff}:hover>.ms-menu-button-close-line1{background-color:#e5e6ea}.ms-menu-close{background-color:#292a2d}.ms-menu{background-color:#343a40}.ms-menu-item{color:#fffff5}.ms-menu-item:hover{background-color:#292a2d}}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__ = undefined;
/* module identifier */

var __vue_module_identifier__ = "data-v-6741bde0";
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject shadow dom */

var __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, createInjectorSSR, undefined);var components=/*#__PURE__*/Object.freeze({__proto__:null,MenuSlide: __vue_component__});var install = function installLemonComponents(Vue) {
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
exports.MenuSlide=__vue_component__;exports.default=plugin;