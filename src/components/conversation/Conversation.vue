<template>
  <section id="conversation" v-if="items">
    <div class="customer">
        <h2>{{response}}</h2>
    </div>
    <p class="say">You Say:</p>

    <div class="buttons">
        <button v-for="(item, index) in items.conversation.convo[this.id].choices" @click="select(index)" :class="{selected: alts[index], disabled: disable, correct: correct[index]}" :key="items.conversation.convo[id]">
          {{item}}
        </button>
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
  export default {
    data() {
      return {
        id: 0,
        alts: [],
        disable: false,
        correct: [],
        feedback: false,
        feedtext: "",
        image: "customer-neutral.png",
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
      select(num) {
        this.feedback = true
        this.disable = true
        const CORRECT = this.items.conversation.convo[this.id].correctAnswers
        if (num + 1 == CORRECT) {
          this.gaugeUp();
          this.id == this.items.conversation.convo.length - 1 ? this.nextBtn = false : this.nextBtn = true
          this.correct[num] = true
        } else {
          this.tryAgain = true
        }
        this.feedtext = this.items.conversation.convo[this.id].feedback[num]
        this.response = this.items.conversation.convo[this.id].responses[num]
        this.image = this.items.conversation.convo[this.id].images[num]
        this.alts[num] = true
      },
      reTry () {
        this.feedback = false
        this.feedtext = ""
        this.disable = false
        this.response = this.items.conversation.convo[this.id].startStatement
        this.tryAgain = false
      },
      next () {
        this.id += 1
        this.feedback = false
        this.feedtext = ""
        this.nextBtn = false
        this.disable = false
        this.response = this.items.conversation.convo[this.id].startStatement
        this.alts.forEach((e, index) =>
          this.alts[index] = false
        );
        this.correct.forEach((e, index) =>
          this.correct[index] = false
        );
      },
      gaugeUp() {
        const $length = parseInt(this.items.conversation.convo.length)
        const $value = 100 / $length
        this.gauge += $value
      }
    },
    mounted() {
      this.response = this.items.conversation.convo[this.id].startStatement
      this.items.conversation.convo.map((currentValue, index) => {
        this.alts.push(false);
        this.correct.push(false);
      })
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
