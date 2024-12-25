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

            <q-card bordered class="row-inline dm-login-panel">
                <p class="q-pt-md text-h5 text-center text-weight-800">WELCOME</p>
                <q-form @submit.prevent="login">
                    <q-card-section class="q-pa-md q-ma-md q-gutter-md">
                        <q-input v-bind="passwordLogin.account" v-model.trim="passwordLogin.account.value">
                            <template #prepend><q-icon name="person"></q-icon></template>
                            <template #label>{{ $t(passwordLogin.account.label) }}</template>
                        </q-input>
                        <q-input v-bind="passwordLogin.password" v-model.trim="passwordLogin.password.value">
                            <template #prepend><q-icon name="password"></q-icon></template>
                            <template #label>{{ $t(passwordLogin.password.label) }}</template>
                        </q-input>
                    </q-card-section>
                    <q-card-actions class="q-ma-md">
                        <q-btn class="full-width" v-bind="passwordLogin.login">{{$t("msgLogin")}}</q-btn>                        
                    </q-card-actions>
                </q-form>

                <!-- <q-separator class="q-my-md" inset />
                <div class="flex flex-center"><span class="text-grey">其他登陆方式</span></div>
                <div class="q-pa-md q-gutter-xs flex flex-center">
                    <q-btn round dense color="primary"><span class="text-caption">钉钉</span></q-btn>
                    <q-btn round dense color="accent"><span class="text-caption">飞书</span></q-btn>
                    <q-btn round dense color="positive"><span class="text-caption">微信</span></q-btn>
                </div> -->
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
import { ConfigDict,msgNG,msgErrLabel} from "src/base/settings";
import { encryptString } from "src/base/security";
import { apiPost } from "src/base/request";
import dmAppearance from "src/components/dmAppearance.vue";
import dmLanguage from "src/components/dmLanguage.vue";

const q = useQuasar();
const {t} = useI18n();
const router= useRouter();

let passwordLogin = reactive({
    account:{label:"msgAccount",value:""},
    password:{type:"password",label:"msgPassword", value:""},
    login:{type:"submit",color:"primary",disable:computed(()=>{
        return !(passwordLogin.account.value && passwordLogin.password.value)
    })}
})


function login_success(rsp){
    if (rsp.data.code == 0){
        localStorage.setItem(ConfigDict.jwt,rsp.data.data);
        router.push("/")
    }else{
        let errmsg = msgErrLabel(rsp.data.code)
        msgNG(q,{message:t(errmsg)})
    }
}

function login(){
    let password_enc = encryptString(passwordLogin.password.value);
    apiPost(
        "/auth/login",
        {
            account:passwordLogin.account.value,
            password_enc:password_enc
        },
        login_success,
        null,
        passwordLogin.login
    )
}
</script>



<style>
.dm-login-panel{
    border-radius: 0.5rem;
    width: 25rem;
}

.body--light{
    background-color: #F5F7FA;
}
</style>