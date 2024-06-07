import { createRouter, createWebHistory } from 'vue-router';
import CountriesList from '../components/CountriesList.vue';

const routes = [
  {
    path: '/list',
    name: 'CountriesList',
    component: CountriesList
  },
  {
    path: '/list/:alpha3Code',
    name: 'CountryDetails',
    component: CountriesList
  },
  {
    path: '/',
    redirect: '/list'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
