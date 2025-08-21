<script setup>
import Sidebar from "@/components/common/Sidebar.vue";
import MainHeader from "@/components/common/MainHeader.vue";
</script>

<template>
  <div class="layout">
    <div class="layout__sidebar">
      <Sidebar />
    </div>
    <div class="layout__content">
      <MainHeader />
      <main class="layout__main">
        <router-view v-slot="{ Component }">
          <component :is="Component" />
        </router-view>
      </main>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.layout {
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background-color: #8d8d8d;

  &__sidebar {
    flex-shrink: 0;
  }

  &__content {
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: hidden;
    background-color: #edeff7;
  }

  &__main {
    flex: 1;
    margin: 1rem;
    overflow: auto;
    background-color: #fff;
  }
}
</style>
