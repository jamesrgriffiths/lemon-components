<script>
import Vue from 'vue';
import { MenuSlide } from '@/entry';

export default Vue.extend({
  name: 'ServeDev',
  components: {
    MenuSlide
  }
});
</script>

<template>
  <div id="app">
    <menu-slide />
  </div>
</template>
