import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import OrdersAdd from '@/views/sales/OrdersAdd.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/sales/orders/add',
      name: 'ordersAdd',
      component: OrdersAdd,
      meta: {
        breadcrumbs: ['Verkoop', 'Bestelling aanmaken'],
      },
    },
  ],
});

export default router;
