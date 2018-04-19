import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import MailParser from '@/components/MailParser';
import Timeline from '@/components/Timeline';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '/',
          name: 'MailParser',
          component: MailParser
        },
        {
          path: '/timeline',
          name: 'Timeline',
          component: Timeline
        }
      ]
    }
  ]
});
