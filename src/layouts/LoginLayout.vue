<template>
<q-layout view="lhh lpr lFf">
    <q-page-container>
        <q-page class="flex flex-center">
            <div class="absolute-top-left q-pa-md q-ma-md">
                <span class="text-h4 text-prmary text-bold text-weight">Eromod</span>
            </div>

            <div class="absolute-top-right q-pa-md q-ma-md">
                <dmLanguage/>
                <dmAppearance/>
            </div>

            <q-card class="row-inline dm-login-panel">
                <q-form @submit.prevent="login">
                    <q-card-section class="q-pa-md q-gutter-md">
                        <p class="text-h5 text-center text-weight">WELCOME</p>
                        <q-input v-bind="password_login_info.account" v-model.trim="password_login_info.account.value">
                            <template #prepend><q-icon name="person"></q-icon></template>
                            <template #label>{{ $t(password_login_info.account.label) }}</template>
                        </q-input>
                        <q-input v-bind="password_login_info.password" v-model.trim="password_login_info.password.value">
                            <template #prepend><q-icon name="password"></q-icon></template>
                            <template #label>{{ $t(password_login_info.password.label) }}</template>
                        </q-input>
                    </q-card-section>
                    <q-card-actions>
                        <q-btn class="full-width" v-bind="password_login_info.login">{{$t("msgLogin")}}</q-btn>                        
                    </q-card-actions>
                </q-form>

                <q-separator class="q-my-md" inset />
                <div class="flex flex-center"><span class="text-grey">其他登陆方式</span></div>
                <div class="q-pa-md q-gutter-xs flex flex-center">
                    <q-btn round dense color="primary"><span class="text-caption">钉钉</span></q-btn>
                    <q-btn round dense color="accent"><span class="text-caption">飞书</span></q-btn>
                    <q-btn round dense color="positive"><span class="text-caption">微信</span></q-btn>
                </div>
            </q-card>
        </q-page>
    </q-page-container>
</q-layout>
</template>

<script setup lang="js">
import { useQuasar } from "quasar";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import {reactive,computed} from "vue";
import { ConfigDict } from "src/base/settings";
import { encrypt_string } from "src/base/security";
import { api_post,api_get } from "src/base/request";
import { msg_ok,msg_ng } from "src/base/util";
import dmAppearance from "src/components/dmAppearance.vue";
import dmLanguage from "src/components/dmLanguage.vue";

const $q = useQuasar();
const {t} = useI18n();
const router= useRouter();

let password_login_info = reactive({
    account:{label:"msgAccount",value:""},
    password:{type:"password", label:"msgPassword",value:""},
    login:{color:"primary", type:"submit", disable:computed(()=>{
        return !(password_login_info.account.value && password_login_info.password.value)
    })},
})


function login_success(rsp){
    if (rsp.data.code == 0){
        localStorage.setItem(ConfigDict.jwt,rsp.data.data);
        router.push("/")
    }else{
        // $q.notify(msg_ng({message:"123"}));
        let msg = reactive({
            text:t("msgPassword"),
        });
        $q.notify(msg_ng({message:t("msgPassword")}));
    }
}

function login(){
    let password_enc = encrypt_string(password_login_info.password.value);
    api_post(
        "/auth/login",
        {
            account:password_login_info.account.value,
            password_enc:password_enc
        },
        login_success,
        null,
        password_login_info.login
    )
}
</script>


<style scoped>
.dm-login-panel{
    border-radius: 0.5rem;
    width: 30rem;
}

.body--light{
    background-color: #f9f9f9;
}
</style>