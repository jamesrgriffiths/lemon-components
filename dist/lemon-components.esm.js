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
//
var script = {
  props: {
    data: {
      default: () => []
    },
    limit: {
      default: 10,

      validator(x) {
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

  data() {
    return {
      box_size: 0
    };
  },

  created() {
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

/* script */
const __vue_script__ = script;
/* template */

var __vue_render__ = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "gc-container",
    style: 'width: ' + _vm.box_size + 'px',
    attrs: {
      "id": "gc-container"
    }
  }, [_c('svg', {
    staticClass: "gc-pie",
    attrs: {
      "width": _vm.box_size,
      "height": _vm.box_size,
      "viewBox": '0 0 ' + _vm.box_size + ' ' + _vm.box_size
    }
  }, [_vm._l(_vm.data, function (item) {
    return _c('path', {
      class: 'gc-piece ' + item.color_class,
      attrs: {
        "d": item.path,
        "transform": 'translate(' + _vm.padding + ',' + _vm.padding + ') rotate(' + item.rotation + ' ' + _vm.size / 2 + ' ' + _vm.size / 2 + ')'
      }
    });
  }), _vm._v(" "), _c('circle', {
    staticClass: "gc-pie-inner",
    attrs: {
      "cx": _vm.size / 2 + _vm.padding,
      "cy": _vm.size / 2 + _vm.padding,
      "r": _vm.cutout
    }
  })], 2), _vm._v(" "), _vm._l(_vm.data, function (item) {
    return _c('div', {
      class: 'gc-text ' + item.color_class
    }, [_vm._v("\n    " + _vm._s(item.name) + " (" + _vm._s(item.total) + ")\n  ")]);
  })], 2);
};

var __vue_staticRenderFns__ = [];
/* style */

const __vue_inject_styles__ = undefined;
/* scoped */

const __vue_scope_id__ = undefined;
/* module identifier */

const __vue_module_identifier__ = undefined;
/* functional template */

const __vue_is_functional_template__ = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, undefined, undefined);

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
      default: () => []
    },
    side: {
      default: "left",

      validator(x) {
        return ["left", "right"].indexOf(x) !== -1;
      }

    },
    showIcons: {
      default: true,

      validator(x) {
        return [true, false].indexOf(x) !== -1;
      }

    },
    onlyIcons: {
      default: false,

      validator(x) {
        return [true, false].indexOf(x) !== -1;
      }

    },
    buttonStyleHamburger: {
      default: "auto",

      validator(x) {
        return ["auto", "invert", "light", "dark"].indexOf(x) !== -1;
      }

    },
    buttonStyleX: {
      default: "auto",

      validator(x) {
        return ["auto", "invert", "light", "dark"].indexOf(x) !== -1;
      }

    },
    buttonStyleItem: {
      default: "auto",

      validator(x) {
        return ["auto", "invert", "light", "dark"].indexOf(x) !== -1;
      }

    }
  },

  data() {
    return {
      visible: false,
      class_side: 'ms-menu-' + this.side,
      class_icons_only: this.onlyIcons ? 'ms-menu-' + this.side + '-icons-only' : '',
      class_visible: this.visible ? 'ms-menu-' + this.side + '-visible' : ''
    };
  },

  methods: {
    linkDisplay(link) {
      return link.replace("_", " ");
    },

    toggleMenu() {
      this.visible = !this.visible;
      this.class_visible = this.visible ? 'ms-menu-' + this.side + '-visible' : '';
    }

  }
};

/* script */
const __vue_script__$1 = script$1;
/* template */

var __vue_render__$1 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', [_c('span', {
    class: 'lemon-icon-button-' + _vm.buttonStyleHamburger,
    on: {
      "click": function ($event) {
        return _vm.toggleMenu();
      }
    }
  }, [_c('i', {
    staticClass: "fas fa-bars"
  })]), _vm._v(" "), _c('div', {
    staticClass: "ms-menu",
    class: _vm.class_side + ' ' + _vm.class_icons_only + ' ' + _vm.class_visible
  }, [_c('div', [_c('span', {
    class: 'lemon-icon-button-' + _vm.buttonStyleX,
    on: {
      "click": function ($event) {
        return _vm.toggleMenu();
      }
    }
  }, [_c('i', {
    staticClass: "fas fa-times"
  })])]), _vm._v(" "), _c('div', {
    staticClass: "lemon-accent-line"
  }), _vm._v(" "), _vm._l(_vm.links, function (link) {
    return _c('div', {
      class: 'ms-icon-button lemon-icon-button-' + _vm.buttonStyleItem,
      attrs: {
        "onclick": link.function ? link.function : link.value ? 'window.location.href=\'' + link.value + '\'' : 'window.location.href=\'' + link + '\''
      }
    }, [_vm.showIcons ? _c('div', {
      class: 'ms-icon-button-icon'
    }, [link.icon ? _c('i', {
      class: 'fas ' + link.icon
    }) : _vm._e()]) : _vm._e(), _vm._v(" "), !_vm.onlyIcons ? _c('span', {
      class: link.display ? '' : 'capitalize'
    }, [_vm._v("\n        " + _vm._s(link.display ? link.display : _vm.linkDisplay(link)) + "\n      ")]) : _vm._e()]);
  })], 2)]);
};

var __vue_staticRenderFns__$1 = [];
/* style */

const __vue_inject_styles__$1 = undefined;
/* scoped */

const __vue_scope_id__$1 = undefined;
/* module identifier */

const __vue_module_identifier__$1 = undefined;
/* functional template */

const __vue_is_functional_template__$1 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$1 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, undefined, undefined, undefined);

var components = /*#__PURE__*/Object.freeze({
  __proto__: null,
  LemonGraphCircle: __vue_component__,
  LemonMenuSlide: __vue_component__$1
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
export { __vue_component__ as LemonGraphCircle, __vue_component__$1 as LemonMenuSlide };
