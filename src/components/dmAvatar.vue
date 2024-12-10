<template>
<q-avatar color="indigo" class="avatar">
  <q-popup-proxy transition-show="jump-down" transition-hide="jump-up">
      <q-list flat dense bordered>
        <q-item clickable v-ripple @click="logout">
          <q-item-section avatar>
            <q-icon name="logout" />
          </q-item-section>
          <q-item-section>{{$t("msgLogout")}}</q-item-section>
        </q-item>
      </q-list>
  </q-popup-proxy>
</q-avatar>
</template>


<script setup lang="js">
import { ConfigDict } from 'src/base/settings';
import { useRouter } from 'vue-router';

const router=useRouter();

function logout(){
  localStorage.removeItem(ConfigDict.jwt);
  router.push("/login");
}



</script>

<style lang="css" scoped>
.avatar {
  width: 30px;
  height: 30px;
  cursor: pointer;
}
</style>