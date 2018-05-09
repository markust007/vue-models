var QueryString = function() {
    // This function is anonymous, is executed immediately and
    // the return value is assigned to QueryString!
    var query_string = {};
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        // If first entry with this name
        if (typeof query_string[pair[0]] === "undefined") {
            query_string[pair[0]] = decodeURIComponent(pair[1]);
            // If second entry with this name
        } else if (typeof query_string[pair[0]] === "string") {
            var arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
            query_string[pair[0]] = arr;
            // If third or later entry with this name
        } else {
            query_string[pair[0]].push(decodeURIComponent(pair[1]));
        }
    }
    return query_string;
}();

import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    location: 1,
    userLocation: "",
    userName: "",
    progressLocation: 1,
    pageHeader: "",
    menu: true,
    items: null
  },
  actions: {

  },
  mutations: {
    setItems (state, value) {
      state.items = value;
    },
    changeUserLocation (state, value) {
      state.userLocation = value;
    },
    changeUserName (state, value) {
      state.userName = value;
    },
    incrementProgress (state) {
      if (state.progressLocation > state.location) {

      } else {
        state.progressLocation += 1;
      }
    },
    changeProgress (state, value) {
      state.progressLocation = value;
    },
    pageHead (state, value) {
      state.pageHeader = value;
    },
    increment (state, value) {
      state.location = value;
    },
    locationPlus (state) {
      state.location += 1;
    },
    locationMinus (state) {
      state.location -= 1;
    },
    menuToggle (state) {
      state.menu = !state.menu;
    }
  },
  getters: {

  }
})
export default store

if (QueryString.debug === "true") {
  document.addEventListener("keydown", (e) => {
    const actions = {
      ArrowRight: () => { store.commit('incrementProgress'), store.commit('locationPlus') },
      ArrowLeft: () => store.commit('locationMinus'),
    };
    maybe(actions[e.key]);
  })

  function maybe(fn) {
    fn ? fn() : null;
  }
}
