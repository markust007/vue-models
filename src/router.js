import Vue from 'vue'
import Router from 'vue-router'

import start from './components/Start.vue'
import quiz from './components/quiz/Quiz.vue'
import conversation from './components/conversation/Conversation.vue'
import multiChoice from './components/multiChoice/MultiChoice.vue'
import dragDrop from './components/dragDrop/DragDrop.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/client_projects/StudioB/models/',
  // base: '/',
  routes: [
    {
      path: '/index.html',
      name: 'Start',
      component: start
    },
    {
      path: '/quiz',
      name: 'Quiz',
      component: quiz,
    },
    {
      path: '/conversation',
      name: 'Conversation',
      component: conversation
    },
    {
      path: '/multichoice',
      name: 'Multiple Choice',
      component: multiChoice
    },
    {
      path: '/dragdrop',
      name: 'Drag and Drop',
      component: dragDrop
    }
  ]
})
