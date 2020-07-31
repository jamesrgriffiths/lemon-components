<script>
import Vue from 'vue';
import { LemonGraphCircle, LemonMenuSlide } from '@/entry';

export default Vue.extend({
  name: 'ServeDev',
  components: {
    LemonGraphCircle,
    LemonMenuSlide
  }
});
</script>

<template>
  <div id="app">
    <lemon-menu-slide side="left" buttonStyleHamburger="light" buttonStyleX="light" :links="[{'display': 'A IS hERe','value': 'a'},'user_access','logout']" />
    <lemon-graph-circle
      :data="[{'name': 'United States', 'total':8},{'total':8},{'total':8},{'total':8},{'total':8},{'total':8},{'total':8},{'total':8},{'total':8},{'total':8}]"
      :limit="11"
      :cutout="80" />
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
