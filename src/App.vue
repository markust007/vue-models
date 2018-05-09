<template>
  <div id="main">
    <container></container>
  </div>
</template>

<script>
/////////////////////VARIABLES & IMPORTS////////////////////
//////////////////////////////////////////////////////////
import store from './store'
import router from './router'
import container from './containers/Container.vue'

import axios from 'axios';
import {polyfill} from "mobile-drag-drop";
import {scrollBehaviourDragImageTranslateOverride} from "mobile-drag-drop/scroll-behaviour";

polyfill({
    // use this to make use of the scroll behaviour
    dragImageTranslateOverride: scrollBehaviourDragImageTranslateOverride
});

const json = 'data/data.json';


export default {
  name: 'app',
  store,
  router,
  data () {
    return {
    }
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      axios.get(json)
      .then(response => {
        this.$store.commit('setItems', response.data)
      })
      .catch(error => {
        console.log(error);
      })
    }
  },
  mounted() {

  },
  components: {
    container
  }
}
</script>

<style scoped>
#main {
  font-size: 18px;
}
@media only screen and (min-width: 640px) {

}
</style>
