<template>

  <div>
    <div class="lemon-graphic-button" @click="toggleMenu();">
      <div :class="'lemon-graphic-button-'+buttonStyleHamburger+' lemon-graphic-button-hamburger-line1'">
        <div class="lemon-graphic-button-hamburger-line2"><div class="lemon-graphic-button-hamburger-line3"></div></div>
      </div>
    </div>
    <div class="ms-menu" :class="visible ? 'ms-menu-'+side+' ms-menu-'+side+'-visible' : 'ms-menu-'+side">
      <div class="ms-menu-header">
        <div class="lemon-graphic-button" @click="toggleMenu()">
          <div :class="'lemon-graphic-button-'+buttonStyleX+' lemon-graphic-button-x-line1'"><div class="lemon-graphic-button-x-line2"></div></div>
        </div>
      </div>
      <div class="lemon-accent-line"></div>
      <a class="ms-menu-item" :class="link.display ? '' : 'capitalize'"
        v-for="link in links"
        :key="link.value ? link.value : link"
        :href="link.value ? link.value : link">
        {{link.display ? link.display : linkDisplay(link)}}
      </a>
    </div>
  </div>

</template>

<script>
  export default {
    props: {
      links: { default: () => [] },
      side: {
        default: "left",
        validator(x) { return ["left","right"].indexOf(x) !== -1; }
      },
      buttonStyleHamburger: {
        default: "auto",
        validator(x) { return ["auto","invert","light","dark"].indexOf(x) !== -1; }
      },
      buttonStyleX: {
        default: "auto",
        validator(x) { return ["auto","invert","light","dark"].indexOf(x) !== -1; }
      }
    },

    data() {
      return {
        visible: false,
      }
    },

    methods: {

      linkDisplay(link) {
        return link.replace("_"," ");
      },

      toggleMenu() {
        this.visible = !this.visible;
      }

    }
  };
</script>
