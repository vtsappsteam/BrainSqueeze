<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import QuestionIcon from "../../assets/icons/question.svg";
import TagIcon from "../../assets/icons/tag.svg";
import StatsIcon from "../../assets/icons/stats.svg";
import UsersIcon from "../../assets/icons/users.svg";
import CloseIcon from "../../assets/icons/close.svg";

const router = useRouter();
const collapsed = ref(false);
const selectedLink = ref("");

const links = [
  { to: "/questions", label: "Pitanja", icon: QuestionIcon },
  { to: "/categories", label: "Kategorije", icon: TagIcon },
  { to: "/question-difficulties", label: "Težine pitanja", icon: StatsIcon },
  { to: "/users", label: "Nalozi", icon: UsersIcon },
];

const goTo = (to, label) => {
  selectedLink.value = label;
  router.push(to);
};

const toggleSidebar = () => {
  collapsed.value = !collapsed.value;
};
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
      />
      <img
        v-else
        class="sidebar__picture--mini"
        src="@/assets/logo/BSQZlogo-mini.png"
        alt="Brainsqeeze Mini Logo"
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
          style="
            width: 20px;
            height: 20px;
            vertical-align: middle;
            margin-right: 8px;
            fill: white;
          "
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
  }

  &__picture--mini {
    display: none;
  }

  &__nav {
    flex: 1;
    padding: 0 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;
  }

  &__link {
    display: flex;
    width: 100%;
    align-items: center;
    border-radius: 0.375rem;
    padding: 0.5rem 0.75rem;
    text-align: left;
    letter-spacing: 0px;
    transition: padding 0.3s;

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
      span {
        display: none;
      }
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
    }
  }
}
</style>
