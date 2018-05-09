<template>
  <section id="conversation" v-if="items">

    <div class="customer">
        <h2>{{response}}</h2>
    </div>


    <p class="say">You Say:</p>

    <div class="buttons">
      <transition
      name="custom-classes-transition"
      enter-active-class="animated fadeIn">
        <button @click="select" value="1" :class="{selected: alt1, disabled: disable, correct: alt1correct}" :key="items.conversation[id]">
          {{items.conversation[id].choice1}}
        </button>
      </transition>
      <transition
      name="custom-classes-transition"
      enter-active-class="animated fadeIn">
        <button @click="select" value="2" :class="{selected: alt2, disabled: disable, correct: alt2correct}" :key="items.conversation[id]">
          {{items.conversation[id].choice2}}
        </button>
      </transition>
      <transition
      name="custom-classes-transition"
      enter-active-class="animated fadeIn">
        <button @click="select" value="3" :class="{selected: alt3, disabled: disable, correct: alt3correct}" :key="items.conversation[id]">
          {{items.conversation[id].choice3}}
        </button>
      </transition>
    </div>

    <div class="gauge">
      <div class="inner" :style="{width: gauge + '%'}">
      </div>
    </div>

    <transition
    name="custom-classes-transition"
    enter-active-class="animated fadeIn">
      <p :key="feedtext" v-show="feedback">{{feedtext}}</p>
    </transition>

    <button class="small-btn" @click="reTry" v-show="tryAgain">Try Again</button>
    <button class="small-btn next" v-show="nextBtn" @click="next">Next</button>

  </section>
</template>

<script>
import axios from 'axios';
var json = 'data/convo.json';
  export default {
    data: function () {
      return {
        id: 0,
        alt1: false,
        alt2: false,
        alt3: false,
        disable: false,
        alt1correct: false,
        alt2correct: false,
        alt3correct: false,
        feedback: false,
        feedtext: "",
        image: "customer-neutral.png",
        checkValue: "",
        response: "",
        nextBtn: false,
        tryAgain: false,
        gauge: 0,
      }
    },

    computed: {
      items() {
        return this.$store.state.items
      }
    },

    methods: {
      select (e) {
        let $this = e.target
        this.feedback = true
        this.disable = true
        let $correctAnswers = this.items.conversation[this.id].correctAnswers
        console.log($this.value)
        console.log($correctAnswers)
        if ($this.value == $correctAnswers) {
          this.gaugeUp();
          if (this.id == this.items.conversation.length - 1) {
            this.$store.commit('navRightOn')
            this.nextBtn = false
          } else {
            this.nextBtn = true
          }
        } else {
          this.tryAgain = true
        }
        if ($this.value == "1") {
          this.feedtext = this.items.conversation[this.id].choice1Feedback
          this.response = this.items.conversation[this.id].choice1Response
          this.image = this.items.conversation[this.id].choice1Image
          this.alt1 = true
          if ($this.value == $correctAnswers) {
            this.alt1correct = true
          }
        }
        if ($this.value == "2") {
          this.feedtext = this.items.conversation[this.id].choice2Feedback
          this.response = this.items.conversation[this.id].choice2Response
          this.image = this.items.conversation[this.id].choice2Image
          this.alt2 = true
          if ($this.value == $correctAnswers) {
            this.alt2correct = true
          }
        }
        if ($this.value == "3") {
          this.feedtext = this.items.conversation[this.id].choice3Feedback
          this.response = this.items.conversation[this.id].choice3Response
          this.image = this.items.conversation[this.id].choice3Image
          this.alt3 = true
          if ($this.value == $correctAnswers) {
            this.alt3correct = true
          }
        }
      },
      reTry () {
        this.feedback = false
        this.feedtext = ""
        this.disable = false
        if (this.id == 0) {
          this.response = this.items.conversation[0].startStatement
        }
        if (this.id == 1) {
          this.response = this.items.conversation[1].startStatement
        }
        if (this.id == 2) {
          this.response = this.items.conversation[2].startStatement
        }
        this.tryAgain = false
      },
      next () {
        this.id += 1
        this.feedback = false
        this.feedtext = ""
        this.nextBtn = false
        this.disable = false
        this.alt1 = false
        this.alt2 = false
        this.alt3 = false
        this.alt1correct = false
        this.alt2correct = false
        this.alt3correct = false
        this.response = this.items.conversation[this.id].startStatement
      },

      gaugeUp() {
        let $length = parseInt(this.items.conversation.length)
        console.log($length)
        let $value = 100 / $length
        this.gauge += $value
      }

    },
    mounted() {

    },
    beforeDestroy() {

    },
    components: {},
    props: []
  }

</script>

<style scoped>
#conversation {
  text-align: center;
  width: 100%;
}
.buttons {
  margin: 0 auto;
  width: 100%;
}
.buttons button {
  background: #fff;
  border: 1px solid #000;
  padding: 18px;
  border-radius: 5px;
  text-align: center;
  margin-bottom: 5px;
  width: 100%;
  cursor: pointer;
  font-size: 1rem;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.16), 0px 2px 5px 0px rgba(0, 0, 0, 0.26);
}
.buttons button.selected {
  background: #ccc;
  cursor: default;
  pointer-events: none;
  opacity: 0.5;
}
.buttons button.disabled {
  cursor: default;
  pointer-events: none;
  opacity: 0.5;
}
.buttons button.correct {
  background: green;
  cursor: default;
  pointer-events: none;
  opacity: 1;
}

.gauge {
  border: 1px solid #000;
  border-radius: 5px;
  height: 10px;
  margin: 25px;
}
.gauge .inner {
  transition: all .3s;
  background: green;
  height: 10px;
}

@media all and (min-width: 640px) {
  .buttons {
    width: 50%;
  }
}

</style>
