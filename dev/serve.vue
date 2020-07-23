<script>
import Vue from 'vue';
import { LemonComponentsSample } from '@/entry';

export default Vue.extend({
  name: 'ServeDev',
  components: {
    LemonComponentsSample,
  }
});
</script>

<template>
  <div id="app">
    <lemon-components-sample />
  </div>
</template>
