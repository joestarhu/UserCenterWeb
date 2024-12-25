<template>
  <q-layout view="lHh Lpr lFf">
    <q-header :class="Dark.isActive?'bg-dark':'dm-bg-light'" bordered>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer"/>
        <q-space></q-space>

        <dmLanguage/>
        <dmAppearance/>
        <dmAvatar/>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered :class="Dark.isActive?'bg-dark':'dm-bg-light'">
      <q-list> 
        <q-item>
          <q-item-section side><img src="/icons/favicon-32x32.png"></q-item-section>
          <q-item-section class="text-h5 text-bold">{{$t("msgAppNameUC")}}</q-item-section>
        </q-item>

        <dmMenu v-for="link in menu_list" :key="link.label" v-bind="link" ></dmMenu>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
      <!-- <q-ajax-bar color="primary" size="0.2rem" position="bottom"></q-ajax-bar> -->
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
const menu_list = [
  {label:"msgMenuOrgUser",icon:"groups",to:'/org_user'},
  {label:"msgMenuOrgRole",icon:"badge",to:'/org_role'},
  {label:"msgMenuOrgApp",icon:"apps",to:'/org_app'},
  {label:"msgMenuAccount", icon:"person", to:"/account"},
  {label:"msgMenuOrg", icon:"corporate_fare",to:"/org"},
  {label:"msgMenuRole", icon:"contact_emergency", to:"/role",},
  {label:"msgMenuApp", icon:"widgets",to:"/app"},
  // {label:"msgMenuPlatformManager", icon:"settings", children:[
  //     {label:"msgMenuAccount", icon:"person", to:"/account"},
  //     {label:"msgMenuOrg", icon:"corporate_fare",to:"/org"},
  //     {label:"msgMenuRole", icon:"contact_emergency", to:"/role",},
 //     {label:"msgMenuApp", icon:"widgets",to:"/app"},
  //   ]},
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
