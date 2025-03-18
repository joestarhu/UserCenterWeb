<template>
  <q-layout view="lHh Lpr lFf">
    <q-header :class="Dark.isActive?'bg-dark':'dm-bg-light'" bordered>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer"/>
        <!-- <img src="/icons/favicon-32x32.png"> -->
        <!-- <q-toolbar-title>
          {{$t("msgAppNameUC")}}
        </q-toolbar-title> -->

        <q-space></q-space>


        <HiLanguage/>
        <HiAppearance/>
        <dmAvatar/>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered :class="Dark.isActive?'bg-dark':'dm-bg-light'" :width="260">
      <q-list>
        <q-item>
          <q-item-section side>
              <img src="/icons/favicon-32x32.png">
          </q-item-section>
          <q-item-section class="text-h6 text-bold">
              {{$t("msgAppNameUC")}}
          </q-item-section>
        </q-item>
        <HiMenu v-for="link in menu_list" :key="link.label" v-bind="link" ></HiMenu>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
      <!-- <q-ajax-bar color="primary" size="0.3rem" ></q-ajax-bar> -->
    </q-page-container>
  </q-layout>
</template>

<script setup lang="js">
import { Dark} from "quasar";
import { ref } from 'vue'
import HiLanguage from "src/components/HiLanguage.vue";
import HiAppearance from "src/components/HiAppearance.vue";
import HiMenu from "src/components/HiMenu.vue";
import dmAvatar from "src/components/dmAvatar.vue";

const leftDrawerOpen = ref(false)
const menu_list = [
  // {i18nlabel:"msgMenuOrgUser",icon:"groups",to:'/org_user'},
  // {i18nlabel:"msgMenuOrgRole",icon:"badge",to:'/org_role'},
  // {i18nlabel:"msgMenuOrgApp",icon:"apps",to:'/org_app'},
  {i18nlabel:"msgMenuAccount", icon:"person", to:"/account"},
  {i18nlabel:"msgMenuOrg", icon:"corporate_fare",to:"/org"},
  // {i18nlabel:"msgMenuRole", icon:"contact_emergency", to:"/role",},
  {i18nlabel:"msgMenuApp", icon:"widgets",to:"/app"},
  // {i18nlabel:"msgMenuPlatformManager", icon:"settings", children:[
  //     {i18nlabel:"msgMenuAccount", icon:"person", to:"/account"},
  //     {i18nlabel:"msgMenuOrg", icon:"corporate_fare",to:"/org"},
  //     {i18nlabel:"msgMenuRole", icon:"contact_emergency", to:"/role",},
  //    {i18nlabel:"msgMenuApp", icon:"widgets",to:"/app"},
  //  ]},
]

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>

<style>
.dm-bg-light{
  background-color: #FFF;
  color: #34373C;
}

.body--light{
  background-color: #F5F7FA;
}
</style>
