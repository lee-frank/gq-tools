import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import MailParser from '@/components/MailParser';

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
        }
      ]
    }
  ]
});
