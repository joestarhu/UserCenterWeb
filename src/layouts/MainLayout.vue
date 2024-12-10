<template>
  <q-layout view="hHh Lpr lFf">
    <q-header :class="Dark.isActive?'bg-dark':'dm-bg-light'" bordered>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer"/>

        <q-toolbar-title>
          {{$t("msgAppNameUC")}}
        </q-toolbar-title>

        <dmLanguage/>
        <dmAppearance/>
        <dmAvatar/>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered :class="Dark.isActive?'bg-dark':'dm-bg-light'">
      <q-list> 
        <dmMenu v-for="link in essentialLinks" :key="link.label" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
      <q-ajax-bar color="primary" size="0.5rem" position="bottom"></q-ajax-bar>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="js">
import { Dark} from "quasar";
import { ref } from 'vue'
import dmAppearance from "src/components/dmAppearance.vue";
import dmLanguage from "src/components/dmLanguage.vue";
import dmMenu from 'src/components/dmMenu.vue';
import dmAvatar from "src/components/dmAvatar.vue";

const leftDrawerOpen = ref(false)

const essentialLinks = [
  {
    label:"msgLogin",
    to:"/",
  },
  {
    label:"msgAccount",
    icon:"school",
    children:[
      {
        label:"msgLogin",
        to:"/login"
      },
      {
        label:"msgPassword",
        to:"/login"
      },
    ]
  },
]

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>

<style lang="scss" scoped>
.dm-bg-light{
  background-color: #FFF;
  color: #34373C;
}


</style>
