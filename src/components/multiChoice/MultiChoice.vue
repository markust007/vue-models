<template>
  <section id="multichoice" v-if="items">
    <h2>{{items.multi[0].question}}</h2>

    <div class="selects" ref="checkboxes">
      <label v-for="(item, index) in items.multi" :class="{disabled: disabled, checked: buttons[index], correct: buttons[index] == 'correct', incorrect: buttons[index] == 'incorrect' }">
        <input type="checkbox" @click="change(index)"
        :value="item.value"/>
        {{item.button}}
      </label>
    </div>

    <button class="button choose" @click="submit">Submit</button>
    <p class="animated fadeIn" v-show="feedback">{{feedtext}}</p>
  </section>
</template>

<script>
  export default  {
    data() {
      return {
        feedback: false,
        feedtext: "",
        buttons: [],
        value: [],
        disabled: false
      }
    },
    computed: {
      items() {
        return this.$store.state.items
      }
    },
    methods: {
      change(num) {
        const $this = event.target
        const $value = Number($this.value)
        const $index = this.value.includes($value)
        const $splice = this.value.indexOf($value)
        this.buttons[num] = true
        if($index) {
          this.value.splice($splice, 1)
          this.buttons[num] = false
        } else {
          this.value.push($value)
        }
        this.$forceUpdate()
      },
      submit() {
        const $theValue = this.value.sort().join(", ");
        const $correctAnswers = this.items.multi[0].correctAnswers

        this.disabled = true
        $theValue == $correctAnswers
        ? this.feedtext = this.items.multi[0].correct
        : this.feedtext = this.items.multi[0].incorrect
        this.feedback = true

        const $checks = this.$refs.checkboxes.querySelectorAll('label')
        for(let i = 0; i < $checks.length; i++){
          const $input = this.$refs.checkboxes.querySelectorAll('label')[i].querySelectorAll('input')[0]
          if ($correctAnswers.includes($input.value)) {
            this.buttons[i] = 'correct'
          } else {
            if (this.$refs.checkboxes.querySelectorAll('label')[i].classList.contains('checked')) {
              this.buttons[i] = 'incorrect'
            }
          }
        }
  		}
    },
    mounted() {
      this.items.multi.map((currentValue, index) => {
        this.buttons.push(false);
      })
    },
    beforeDestroy() {

    },
    components: {},
    props: []
  }
</script>

<style scoped>
#multichoice {
  text-align: center;
  width: 100%;
}
.selects {
  padding: 0 10px;
}
label {
  color: black;
  background: white;
  padding: 18px;
  cursor: pointer;
  position: relative;
  border-radius: 5px;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.16), 0px 2px 5px 0px rgba(0, 0, 0, 0.26);
  text-align: left;
  border: 1px solid black;
  transition: all .3s;
  display: block;
  width: auto;
  margin: 0 auto 7px;
  text-align: center;
  font-size: 1rem;
}
label.checked {

}
label.checked:after {
  content: "\2713";
  display: block;
  position: absolute;
  top: calc(50% - 20px);
  right: 5px;
  width: 40px;
  height: 40px;
  color: black;
  font-size: 1.5rem;
  padding: 4px;
  /*text-shadow: 1px 1px 1px #000;*/
}
label.correct {
  background: green;
}
label.correct:after {
  content: "\2713";
  display: block;
  position: absolute;
  top: calc(50% - 20px);
  right: 5px;
  width: 40px;
  height: 40px;
  color: $white;
  font-size: 1.5rem;
  padding: 4px;
  /*text-shadow: 1px 1px 1px #000;*/
}
label.incorrect {
  background: #f10000;
}
label.icorrect:after {
  content: "";
  display: none;
}
label.disabled {
  cursor: default;
  pointer-events: none;
}
label:hover {
  background: yellow;
}
input[type=checkbox] {
  display: none;
}

@media all and (min-width: 640px) {
  .selects {
    padding: 0;
  }
  label {
    width: 50%;
  }
}
</style>
