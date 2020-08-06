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
    <lemon-menu-slide
      :links="[
        {'display':'Home','value':'home','icon':'fa-home'},
        {'display':'Users','value':'users','icon':'fa-users'},
        {'display':'Logout','value':'','icon':'fa-door-open','function':'document.getElementById(\'logout-form\').submit()'}]"
      :show-icons="true"
      :only-icons="true"
       />
    <!-- <lemon-graph-circle
      :data="[{'name': 'United States', 'total':8},{'total':8},{'total':8},{'total':8},{'total':8},{'total':8},{'total':8},{'total':8},{'total':8},{'total':8}]"
      :limit="11"
      :cutout="80" /> -->
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
