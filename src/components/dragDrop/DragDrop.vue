<template>
  <section id="drag-drop" v-if="items">

    <ul class="drop-area" ref="dropzones">
      <li v-for="(item, index) in items.dragdrop.drops" class="drop" :id="item.id" @dragenter.prevent @dragover.prevent @drop.prevent="drop" :value="item.value"></li>
    </ul>

    <div ref="original" class="drag-area" @dragenter.prevent @dragover.prevent @drop.prevent="drop">
      <button v-for="(item, index) in items.dragdrop.drags" :id="item.id" class="drag" draggable="true" @dragstart="drag" :value="item.value">{{item.drag}}</button>
    </div>

    <transition
    name="custom-classes-transition"
    enter-active-class="animated fadeIn"
    leave-active-class="animated bounceOutUp">
      <p v-show="feedback">{{items.dragdrop.feedback}}</p>
    </transition>

  </section>
</template>

<script>
  export default {
    data() {
      return {
        dragItem: null,
        dragValue: null,
        feedback: false,
        top: 0,
        left: 0
      }
    },
    computed: {
      items() {
        return this.$store.state.items
      }
    },
    methods: {
      drag(e) {
        const $this = e.target
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData("text", e.target.id);
        this.dragItem = document.getElementById($this.id)
      },
      drop(e) {
        const src = e.dataTransfer.getData("text");
        const orig = this.$refs.original
        const $this = e.target
        const $target = document.getElementById($this.id)
        const $targetBounds = $target.getBoundingClientRect();
        const $origBounds = this.dragItem.getBoundingClientRect();

        this.top = $targetBounds.top - $origBounds.top
        this.left = $targetBounds.left - $origBounds.left

        if(this.dragItem.value == $target.value) {
          if ($this.hasChildNodes()) {
            if ($this == orig) {
              this.dragItem.style.top = this.top + "px"
              this.dragItem.style.left = this.left + "px"
              // orig.appendChild(this.dragItem)
              // this.dragItem.style.opacity = 0;
              setTimeout(() => {
                // this.dragItem.style.opacity = 1;
                this.dragItem.style.top = 0 + "px"
                this.dragItem.style.left = 0 + "px"
              }, 50)
              setTimeout(() => {
                this.dragItem.removeAttribute("style")
              }, 500)
            }
          } else {
            $this.appendChild(this.dragItem)
          }
        } else {
          this.dragItem.style.top = this.top + "px"
          this.dragItem.style.left = this.left + "px"
          // orig.appendChild(this.dragItem)
          // this.dragItem.style.opacity = 0;
          setTimeout(() => {
            // this.dragItem.style.opacity = 1;
            this.dragItem.style.top = 0 + "px"
            this.dragItem.style.left = 0 + "px"
          }, 50)
          setTimeout(() => {
            this.dragItem.removeAttribute("style")
          }, 500)
        }
        if (orig.childNodes.length == 0) {
          this.feedback = true
        }
        e.stopPropagation();
        return false;
      }
    },
    mounted() {

    },
    beforeDestroy() {

    },
    components: {

    },
    props: []
  }
</script>

<style scoped>
#drag-drop {
  width: 100%;
  text-align: center;
}

.drag-area {
  position: relative;
}
.drag {
  border: 1px solid #fff;
  border-radius: 5px;
  background: black;
  cursor: pointer;
  width: 100%;
  height: 35px;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.16),0px 2px 5px 0px rgba(0, 0, 0, 0.26);
  bottom: auto;
  color: #fff;
  text-transform: uppercase;
  font-size: 1rem;
  padding: 7px;
  position: relative;
  margin: 3px 0;
  vertical-align: top;
  display: inline-block;
  transition: all .5s;
  transition-timing-function: ease-in-out;
}
.drop-area {
  list-style-type: none;
  padding: 0;
}
.drop-area li {
  border: 2px dashed #fff;
  border-radius: 5px;
  background-color: rgba(89, 86, 83, 0.3);
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.26),inset 0px 5px 7px 0px rgba(0, 0, 0, 0.25);
  position: relative;
  margin: 0 auto;
  width: auto;
  height: 35px;
  margin-bottom: 6px;
  padding: 4px;
}
.drop-area li .drag {
  margin: 0;
}

@media all and (min-width: 640px) {
  .drag {
    width: 378px;
    margin: 3px 18px;
  }
  .drop-area li {
    width: 379px;
  }
}

</style>
