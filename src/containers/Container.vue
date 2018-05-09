<template>
  <div id="container">
    <ul class="nav" :class="{close: !this.drawer}">
      <li class="close" @click="closeDrawer">
        <div :class="{turn: this.drawer}">+</div>
      </li>
      <li>
        <router-link to="quiz">Quiz Model</router-link>
      </li>
      <li>
        <router-link to="conversation">Conversation Model</router-link>
      </li>
      <li>
        <router-link to="multichoice">Multiple Choice</router-link>
      </li>
      <li>
        <router-link to="dragdrop">Drag and Drop</router-link>
      </li>
    </ul>
    <div style="width:100%;">
      <div class="title">
        <h2>{{$route.name}}</h2>
      </div>
      <transition
      name="custom-classes-transition"
      enter-active-class="animated fadeIn">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      drawer: true,
      path: ""
    }
  },
  computed: {

  },
  methods: {
    closeDrawer() {
      this.drawer = !this.drawer
    },
  },
  mounted() {

  },
  components: {

  }
}
</script>

<style scoped>
#container {
  display: flex;
  flex-direction: column;
}

.nav {
  margin: 0;
  padding: 0;
  height: auto;
  min-width: 28%;
  background: #333;
  position: relative;
  transition: all .3s;
}
.nav.close {
  margin-top: -120px;
}
.nav li {
  list-style-type: none;
  cursor: pointer;
  margin: 0;
  font-size: 0.75rem;
  text-align: left;
}
.nav li a {
  color: #ddd;
  /*color: #fff;*/
  text-decoration: none;
  display: block;
  padding: 8px;
  text-transform: uppercase;
  transition: all .3s;
}
.nav li a:before {
  content: "";
  position: relative;
  display: inline-block;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  border: 1px solid #ffa71c;
  margin-right: 12px;
}
.nav li a.router-link-active {
  background: rgba(255,167,28, 1);
  color: #fff;
  /*border-top: 1px solid rgba(255,255,255,0.4);
  border-bottom: 1px solid rgba(0,0,0,0.6);*/
}
.nav li a.router-link-active:before {
  content: "";
  width: 7px;
  height: 7px;
  border: 1px solid #fff;
  background: #fff
}
.nav .close {
  position: absolute;
  width: 25px;
  height: 25px;
  background: white;
  right: 0;
  bottom: -25px;
  text-align: center;
  font-size: 1.4rem;
}
.nav .close div {
  transition: all .3s;
}
.nav .close div.turn {
  transform: rotate(45deg);
}

.title {
  background: #000;
  padding: 15px;
  color: #fff;
  font-size: 1.5rem;
  text-align: center;
}
.title h2 {
  margin: 0;
}

@media all and (min-width: 640px) {
  #container {
    flex-direction: row;
  }
  .nav {
    height: 100vh;
  }
  .nav.close {
    margin-left: -28%;
    margin-top: 0;
  }
  .nav .close {
    right: -25px;
    bottom: auto;
  }
}
</style>
