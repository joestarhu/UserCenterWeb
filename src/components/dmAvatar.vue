<template>
<q-avatar class="cursor-pointer">
  <img :src="profile.avatar" style="width:2rem; height:2rem" />
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
import { apiGet } from "src/base/request";
import { useRouter } from 'vue-router';
import { onMounted, reactive } from 'vue';


const router=useRouter();
let profile=reactive({
  nickname:"",
  avatar:"/icons/favicon-128x128.png"
})

function logout(){
  localStorage.removeItem(ConfigDict.jwt);
  router.push("/login");
}

function getOrgUserProfile(){
  apiGet("/auth/org_user_profile",null,
    (rsp)=>{
      if(rsp.data){
        profile.nickname = rsp.data.org_user_nickname
        profile.avatar = rsp.data.org_avatar_url || "/icons/favicon-128x128.png"
      }
    },
    (err)=>{

    },
    null
  )
}

onMounted(()=>{
  getOrgUserProfile()
})


</script>
