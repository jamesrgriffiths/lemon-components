<template>

  <div>
    <div class="ms-menu-open" @click="showMenu();">
      <div class="ms-menu-button-open-line1"><div class="ms-menu-button-open-line2"><div class="ms-menu-button-open-line3"></div></div></div>
    </div>
    <div class="ms-menu" :class="visible ? 'ms-menu-'+side+' ms-menu-'+side+'-visible' : 'ms-menu-'+side">
      <div class="ms-menu-close" @click="hideMenu()">
        <div class="ms-menu-button-close-line1"><div class="ms-menu-button-close-line2"></div></div>
      </div>
      <div class="accent-line"></div>
      <a class="ms-menu-item" v-for="link in links" :key="link" :href="link">{{link}}</a>
    </div>
  </div>

</template>

<script>
  export default {
    props: {
      links: { default: () => [] },
      side: {
        default: "left",
        validator(x) { return ["left", "right"].indexOf(x) !== -1; }
      }
    },

    data() {
      return {
        visible: false,
      }
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
</script>

<style lang="scss">
  @import "../sass/_main.scss";
  @import "../sass/_menu_slide.scss";
</style>
