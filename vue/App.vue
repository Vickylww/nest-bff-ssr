

<template>
  <div>
    <h1>欢迎，{{ user?.name || '游客' }}</h1>
    <p>购物车数量444：{{ cart?.items?.length || 0 }}</p>
    <ul>
      <li v-for="item in recommends" :key="item.id">{{ item.title }}</li>
    </ul>
  </div>
</template>

<script setup>
import { inject } from 'vue';
const preData = inject('preFetchData');
const { user, cart, recommends } = preData || {};
</script>