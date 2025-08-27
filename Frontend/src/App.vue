<script setup>
import { useRoute } from "vue-router";
import LeftSidebarLayout from "@/components/layouts/LeftSidebarLayout.vue";

const route = useRoute();
</script>

<template>
  <LeftSidebarLayout
    v-if="route.path !== '/login' && route.path !== '/register'"
  />
  <router-view v-else />
</template>

<style src="@/styles/styles.scss"></style>
