<script>
import Vue from 'vue';
import { LemonMenuSlide } from '@/entry';

export default Vue.extend({
  name: 'ServeDev',
  components: {
    LemonMenuSlide
  }
});
</script>

<template>
  <div id="app">
    <lemon-menu-slide side="left" buttonStyleHamburger="light" buttonStyleX="light" :links="[{'display': 'A IS hERe','value': 'a'},'user_access','logout']" />
  </div>
</template>

<style lang="scss">
  @import "../scss/main.scss";

  body {
    background-color: $lemon-bg-primary;
  }
  @media(prefers-color-scheme: dark) {
    body {
      background-color: $lemon-bg-primary-dark;
    }
  }
</style>
