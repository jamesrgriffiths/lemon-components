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
    links: {
      default: () => ['a', 'test', 'is', 'this']
    },
    side: {
      default: "left",

      validator(x) {
        return ["left", "right"].indexOf(x) !== -1;
      }

    }
  },

  data() {
    return {
      visible: false
    };
  },

  methods: {
    showMenu() {
      this.visible = true;
    },

    hideMenu() {
      this.visible = false;
    }

  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
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
}

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
const __vue_script__ = script;
/* template */

var __vue_render__ = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', [_c('div', {
    staticClass: "ms-menu-open",
    on: {
      "click": function ($event) {
        return _vm.showMenu();
      }
    }
  }, [_vm._m(0)]), _vm._v(" "), _c('div', {
    staticClass: "ms-menu",
    class: _vm.visible ? 'ms-menu-' + _vm.side + ' ms-menu-' + _vm.side + '-visible' : 'ms-menu-' + _vm.side
  }, [_c('div', {
    staticClass: "ms-menu-close",
    on: {
      "click": function ($event) {
        return _vm.hideMenu();
      }
    }
  }, [_vm._m(1)]), _vm._v(" "), _c('div', {
    staticClass: "accent-line"
  }), _vm._v(" "), _vm._l(_vm.links, function (link) {
    return _c('a', {
      key: link,
      staticClass: "ms-menu-item",
      attrs: {
        "href": link
      }
    }, [_vm._v(_vm._s(link))]);
  })], 2)]);
};

var __vue_staticRenderFns__ = [function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "ms-menu-button-open-line1"
  }, [_c('div', {
    staticClass: "ms-menu-button-open-line2"
  }, [_c('div', {
    staticClass: "ms-menu-button-open-line3"
  })])]);
}, function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "ms-menu-button-close-line1"
  }, [_c('div', {
    staticClass: "ms-menu-button-close-line2"
  })]);
}];
/* style */

const __vue_inject_styles__ = function (inject) {
  if (!inject) return;
  inject("data-v-3c1b4367_0", {
    source: ".accent-line{display:block;height:0;border-bottom:3px solid rgba(255,163,66,.9)}.ms-menu-open{display:inline-block;height:31px;cursor:pointer}.ms-menu-button-open-line,.ms-menu-button-open-line1,.ms-menu-button-open-line2,.ms-menu-button-open-line3{width:31px;height:5px;border-radius:5px}.ms-menu-button-open-line1{background-color:#1080dd;transform:translateY(4px)}:hover>.ms-menu-button-open-line1{background-color:#0979d6}.ms-menu-button-open-line2{background-color:inherit;transform:translateY(9px)}.ms-menu-button-open-line3{background-color:inherit;transform:translateY(9px)}.ms-menu-close{display:block;height:51px;padding:10px;background-color:#fafdfd;cursor:pointer}.ms-menu-button-close-line,.ms-menu-button-close-line1,.ms-menu-button-close-line2{width:31px;height:5px;border-radius:5px}.ms-menu-button-close-line1{background-color:#1080dd;transform:rotate(45deg);margin:15.5px auto}:hover>.ms-menu-button-close-line1{background-color:#0979d6}.ms-menu-button-close-line2{background-color:inherit;transform:rotate(90deg)}.ms-menu{position:fixed;z-index:100;top:0;height:100vh;width:300px;background-color:#f5f7f9;box-shadow:0 4px 8px 0 rgba(0,0,0,.2)}.ms-menu-right{right:-300px;transition:right .4s linear}.ms-menu-right-visible{right:0}.ms-menu-left{left:-300px;transition:left .4s linear}.ms-menu-left-visible{left:0}.ms-menu-item{display:block;height:50px;padding:5px 15px;text-decoration:none;text-transform:capitalize;line-height:50px;color:#00050a}.ms-menu-item:hover{background-color:#fafdfd;border-radius:5px;box-shadow:0 4px 8px 0 rgba(0,0,0,.3)}@media (prefers-color-scheme:dark){.ms-menu-button-open-line1{background-color:#fafbff}:hover>.ms-menu-button-open-line1{background-color:#e5e6ea}.ms-menu-button-close-line1{background-color:#fafbff}:hover>.ms-menu-button-close-line1{background-color:#e5e6ea}.ms-menu-close{background-color:#292a2d}.ms-menu{background-color:#343a40}.ms-menu-item{color:#fffff5}.ms-menu-item:hover{background-color:#292a2d}}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__ = undefined;
/* module identifier */

const __vue_module_identifier__ = undefined;
/* functional template */

const __vue_is_functional_template__ = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, createInjector, undefined, undefined);

var components = /*#__PURE__*/Object.freeze({
  __proto__: null,
  MenuSlide: __vue_component__
});

// Import vue components

const install = function installLemonComponents(Vue) {
  if (install.installed) return;
  install.installed = true;
  Object.entries(components).forEach(([componentName, component]) => {
    Vue.component(componentName, component);
  });
}; // Create module definition for Vue.use()


const plugin = {
  install
}; // To auto-install on non-es builds, when vue is found

export default plugin;
export { __vue_component__ as MenuSlide };
