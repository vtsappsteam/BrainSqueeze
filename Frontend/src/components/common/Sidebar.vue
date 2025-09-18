<script setup>
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import QuestionIcon from "../../assets/icons/question.svg";
import TagIcon from "../../assets/icons/tag.svg";
import StatsIcon from "../../assets/icons/stats.svg";
import UsersIcon from "../../assets/icons/users.svg";
import CloseIcon from "../../assets/icons/close.svg";

const router = useRouter();
const collapsed = ref(false);
const selectedLink = ref("");

const tempLink = ref("");

const routeMap = {
  "/questions": ["/questions", "/question"],
  "/categories": ["/categories", "/category"],
  "/difficulties": ["/difficulties", "/difficulty"],
  "/users": ["/users", "/user"],
};

const links = [
  { to: "/questions", label: "Pitanja", icon: QuestionIcon },
  { to: "/categories", label: "Kategorije", icon: TagIcon },
  { to: "/difficulties", label: "Težine pitanja", icon: StatsIcon },
  { to: "/users", label: "Nalozi", icon: UsersIcon },
];

const goTo = (to, label) => {
  selectedLink.value = label;
  router.push(to);
};

const goToQuestions = () => {
  router.push("/questions");
};

const toggleSidebar = () => {
  collapsed.value = !collapsed.value;

  tempLink.value = selectedLink.value;
  selectedLink.value = "";
  setTimeout(() => {
    selectedLink.value = tempLink.value;
  }, 300);
};

onMounted(() => {
  const currentPath = router.currentRoute.value.path;

  selectedLink.value =
    links.find((link) => {
      const variations = routeMap[link.to] || [link.to];
      return variations.some((v) => currentPath.startsWith(v));
    })?.label || "";
});

watch(
  () => router.currentRoute.value.path,
  (newPath) => {
    selectedLink.value =
      links.find((link) => {
        const variations = routeMap[link.to] || [link.to];
        return variations.some((v) => newPath.startsWith(v));
      })?.label || "";
  }
);
</script>

<template>
  <aside :class="['sidebar', { collapsed }]">
    <div class="sidebar__close" @click="toggleSidebar">
      <CloseIcon />
    </div>
    <div>
      <img
        v-if="!collapsed"
        class="sidebar__picture"
        src="@/assets/logo/BSQZlogo.png"
        alt="Brainsqeeze Logo"
        @click="goToQuestions"
      />
      <img
        v-else
        class="sidebar__picture--mini"
        src="@/assets/logo/BSQZlogo-mini.png"
        alt="Brainsqeeze Mini Logo"
        @click="goToQuestions"
      />
    </div>
    <div class="sidebar__nav">
      <div
        v-for="link in links"
        :key="link.to"
        :class="[
          'sidebar__link',
          {
            'sidebar__link--pitanja': link.label === 'Pitanja',
            'sidebar__link--kategorije': link.label === 'Kategorije',
            'sidebar__link--tezine': link.label === 'Težine pitanja',
            'sidebar__link--nalozi': link.label === 'Nalozi',
            'sidebar__link--selected': selectedLink === link.label,
          },
        ]"
        @click="goTo(link.to, link.label)"
      >
        <component
          v-if="link.icon"
          :is="link.icon"
          class="sidebar__link-icon"
        />
        <span v-if="!collapsed">{{ link.label }}</span>
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
  position: relative;
  transition: width 0.3s;
  font-size: 14px;

  &__link-icon {
    width: 20px;
    height: 20px;
    margin-top: 4px;
    margin-right: 8px;
    margin-left: 20px;
    fill: white;
  }

  &__close {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 12px;
    left: 240px;
    width: 36px;
    height: 36px;
    fill: #fff;
    border-radius: 100px;
    background-color: #00354b;
    cursor: pointer;
    z-index: 999;
    transition: left 0.3s;
  }

  &.collapsed &__close {
    left: 50px;
  }

  &__picture {
    margin-top: 25px;
    margin-left: 35px;
    width: 190px;
    height: 71px;
    background: transparent 0% 0% no-repeat padding-box;
    opacity: 1;
    display: block;
    cursor: pointer;
  }

  &__picture--mini {
    display: none;
  }

  &__nav {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;
    margin-top: 34px;
  }

  &__link {
    display: flex;
    width: 232px;
    height: 48px;
    align-items: center;
    border-radius: 8px;
    text-align: left;
    letter-spacing: 0px;
    transition: padding 0.3s;
    margin-left: 16px;
    margin-right: 12px;

    &:hover {
      cursor: pointer;
      background: #0e3f54;
    }
  }

  &.collapsed {
    width: 70px;
    .sidebar__link {
      align-items: center;
      justify-content: center;
      width: 48px;
      height: 48px;
      margin: 0 8px;
      span {
        display: none;
      }
    }

    .sidebar__link-icon {
      width: 20px;
      height: 20px;
      margin-left: 10px;
      margin-top: 4px;
      margin-right: 8px;
      fill: fff;
    }
    .sidebar__nav {
      align-items: center;
    }
    .sidebar__picture {
      display: none;
    }
    .sidebar__picture--mini {
      display: block;
      margin: 20px auto;
      width: 36px;
      height: 36px;
      cursor: pointer;
    }
  }
}
.sidebar__link--selected {
  background: #0e3f54;
}
</style>
