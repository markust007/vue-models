<template>
  <section id="quiz" v-if="items">
    <div v-show="screen == 1">

      <transition
      name="custom-classes-transition"
      enter-active-class="animated fadeInDown">
      <h2 :key="items.quiz.set[id].question" class="questions" v-show="questions" v-html="items.quiz.set[id].question"></h2>
      </transition>

      <div class="buttons" ref="buttons">
        <button v-for="(item, index) in items.quiz.set[id].alts" class="button" :class="{checked: buttons[index], disabled: disabled, correct: buttons[index] == 'correct'}" @click="select(index)">
          {{item}}
        </button>
      </div>

      <div class="counter">
        <span><i class="fa fa-check" aria-hidden="true"></i> = {{this.correct}}</span>
        <span><i class="fa fa-times" aria-hidden="true"></i> = {{this.incorrect}}</span>
      </div>

      <transition
      name="custom-classes-transition"
      enter-active-class="animated slideInDown"
      leave-active-class="animated fadeOutUp">
        <h4 :key="items.quiz.set[id]" v-show="feedback">{{feedtext}}</h4>
      </transition>

      <button class="small-btn" v-show="nextBtn" @click="next">Next</button>
      <button class="button-two finish" v-show="finish" @click="screen = 2">Finish</button>
    </div>

    <div v-show="screen == 2">
      <div class="" v-if="correct * 10 >= 80">
        <p>You got {{this.correct * 10}}% correct</p>
        <p v-html="items.quiz.finalPassing"></p>
      </div>
      <div class="" v-else>
        <p>You got {{this.correct * 10}}% correct</p>
        <p v-html="items.quiz.finalFailing"></p>
        <button class="button" @click="tryAgain">Try Again</button>
      </div>
    </div>
  </section>
</template>

<script>
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const d = new Date();
const month = monthNames[d.getMonth()];
const day = d.getDate();
const year = d.getFullYear();
const fulldate = month + " " + day + ", " + year
  export default {
    data() {
      return {
        screen: 1,
        id: 0,
        buttons: [],
        questions: true,
        disabled: false,
        feedback: false,
        feedtext: "",
        nextBtn: false,
        correct: 0,
        incorrect: 0,
        finish: false,
        today: fulldate,
      }
    },
    computed: {
      items() {
        return this.$store.state.items
      },
      userName () {
        return this.$store.state.userName
      }
    },
    watch: {
      screen() {
        if(this.screen == 2 && this.correct * 10 >= 80) {
          this.$emit('complete')
        }
      }
    },
    methods: {
      next() {
        this.id += 1
        this.nextBtn = false
        this.questions = true
        this.feedback = false
        this.disabled = false
        this.buttons = []
        this.items.quiz.set[this.id].alts.map((currentValue, index) => {
          this.buttons.push(false);
        });
      },
      tryAgain() {
        this.screen = 1
        this.id = 0
        this.questions = true
        this.disabled = false
        this.feedback = false
        this.feedtext = ""
        this.nextBtn = false
        this.correct = 0
        this.incorrect = 0
        this.finish = false
        this.buttons = []
        this.items.quiz.set[this.id].alts.map((currentValue, index) => {
          this.buttons.push(false);
        });
      },
      select(num) {
        const LENGTH = this.items.quiz.set.length - 1
        const CORRECT = this.items.quiz.set[this.id].correctAnswer

        this.feedback = true
        this.disabled = true
        this.buttons[num] = true
        this.buttons[CORRECT - 1] = "correct"

        if (num + 1 == CORRECT) {
          this.correct += 1
          this.feedtext = this.items.quiz.set[this.id].correct
        } else {
          this.incorrect += 1
          this.feedtext = this.items.quiz.set[this.id].incorrect
        }
        this.id == LENGTH ? this.finish = true : this.nextBtn = true
      }
    },
    mounted() {
      this.items.quiz.set[this.id].alts.map((currentValue, index) => {
        this.buttons.push(false);
      })
    },
    beforeDestroy() {

    },
    components: {

    },
    props: []
  }
</script>

<style scoped>

#quiz {
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
.buttons button.checked {
  background: #ccc;
}
.buttons button.correct {
  background: green;
}

.counter {
  font-size: 1.5rem;
  margin: 15px 0;
}

@media all and (min-width: 640px) {
  .buttons {
    width: 50%;
  }
}


</style>
