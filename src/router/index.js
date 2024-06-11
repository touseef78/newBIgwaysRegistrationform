import { createRouter, createWebHistory } from 'vue-router';
import Task from '../components/Task.vue';
import Public from '../components/Public.vue';

const routes = [
  {
    path: '/private',
    name: 'Private',
    component: Task,
  },
  {
    path: '/public',
    name: 'Public',
    component: Public,
  },
  {
    path: '/',
    redirect: '/private',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
