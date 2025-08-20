<script setup>
import { useRouter } from "vue-router";
import HelpCircleOutline from "vue-material-design-icons/HelpCircleOutline.vue";

const router = useRouter();
const links = [
  { to: "/questions", label: "Pitanja", icon: HelpCircleOutline },
  { to: "/categories", label: "Kategorije" },
  { to: "/question-difficulties", label: "Težine pitanja" },
  { to: "/users", label: "Nalozi" },
];

const goTo = (to) => {
  router.push(to);
};
</script>

<template>
  <aside class="sidebar">
    <div>
      <img
        class="sidebar__picture"
        src="@/assets/BSQZlogo.png"
        alt="Brainsqeeze Logo"
      />
    </div>
    <div class="sidebar__nav">
      <div
        v-for="link in links"
        :key="link.to"
        class="sidebar__link"
        @click="goTo(link.to)"
      >
        <component
          v-if="link.icon"
          :is="link.icon"
          style="
            width: 20px;
            height: 20px;
            vertical-align: middle;
            margin-right: 8px;
          "
        />
        {{ link.label }}
      </div>
    </div>
  </aside>
</template>

<style lang="scss" scoped>
.sidebar {
  width: 260px;
  background-color: #00354b;
  color: #fff;
  display: flex;
  flex-direction: column;
  height: 100vh;

  &__picture {
    margin-top: 25px;
    margin-left: 35px;
    width: 190px;
    height: 71px;
    background: transparent 0% 0% no-repeat padding-box;
    opacity: 1;
  }

  &__nav {
    flex: 1;
    padding: 0 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  &__link {
    display: block;
    border-radius: 0.375rem;
    padding: 0.5rem 0.75rem;
    color: #fff;
    text-align: left;
    font: normal normal normal 14px/18px DM Sans 14pt;
    letter-spacing: 0px;
    opacity: 1;

    &:hover {
      cursor: pointer;
      background: #ffffff 0% 0% no-repeat padding-box;
      border-radius: 8px;
      opacity: 0.05;
    }
  }
}
</style>
