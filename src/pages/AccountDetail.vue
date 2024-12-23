<template>
<q-card flat style="border-radius: 10px;" bordered v-if="!noDataFlag">
    <q-card-section>
        <div class="row items-center">
            <span class="text-bold">{{$t("msgPnlGeneralInfo")}}</span>
            <q-space></q-space>
            <q-btn no-caps :icon="DMBTN.update.icon" flat dense :color="DMBTN.update.color" @click="btnClick(DMBTN.update.id)">{{$t(DMBTN.update.label)}}</q-btn>
        </div>
        <div>
            <q-list>
                <q-item>
                    <q-item-section avatar class="text-grey">ID</q-item-section>
                    <q-item-section ><span>{{user_uuid}}</span></q-item-section>
                </q-item>
                <q-item>
                    <q-item-section avatar class="text-grey">{{$t("msgAvatar")}}</q-item-section>
                    <q-item-section avatar>
                        <q-avatar>
                            <img :src="detail.avatar_url || '/icons/favicon-128x128.png'" style="width:3rem; height:3rem" />
                        </q-avatar>
                    </q-item-section>
                </q-item>
                <q-item>
                    <q-item-section avatar  class="text-grey">{{$t("msgAccount")}}</q-item-section>
                    <q-item-section><span>{{detail.account || "-"}} </span></q-item-section>
                </q-item>
                <q-item>
                    <q-item-section avatar  class="text-grey">{{$t("msgNickname")}}</q-item-section>
                    <q-item-section><span>{{detail.nickname || "-"}} </span></q-item-section>
                </q-item>
                <q-item>
                    <q-item-section avatar  class="text-grey">{{$t("msgPhone")}}</q-item-section>
                    <q-item-section>{{detail.phone|| "-"}}</q-item-section>
                </q-item>
                <q-item>
                    <q-item-section avatar  class="text-grey">{{$t("msgStatus")}}</q-item-section>
                    <q-item-section thumbnail>
                        <q-badge :color="showOptColor(detail.user_status,ModelAccount.user_status.options)">
                          {{ $t(showOptLabel(detail.user_status,ModelAccount.user_status.options))}}
                        </q-badge>
                    </q-item-section>
                </q-item>
                <q-item>
                    <q-item-section avatar  class="text-grey">{{$t("msgCreatedAt")}}</q-item-section>
                    <q-item-section>{{detail.created_at|| "-"}}</q-item-section>
                </q-item>
                <q-item>
                    <q-item-section avatar  class="text-grey">{{$t("msgUpdatedAt")}}</q-item-section>
                    <q-item-section>{{detail.updated_at|| "-"}}</q-item-section>
                </q-item>
            </q-list>
        </div>
    </q-card-section>
    <q-separator inset></q-separator>
    <q-card-section>
        <div class="row items-center">
            <span class="text-bold">{{$t("msgPnlDangerZone")}}</span>
        </div>
        <div>
            <q-list class="relative">
                <q-item clickable v-ripple v-for="obj of dangerZone" :key="obj" @click="btnClick(obj.id)">
                    <q-item-section avatar>
                      <q-icon :name="obj.icon" color="negative" />
                    </q-item-section>
                    <q-item-section>
                        <q-item-label class="text-negative">{{$t(obj.label)}}</q-item-label>
                        <q-item-label class="text-negative" caption lines="2">{{ $t(obj.caption)}}</q-item-label>
                    </q-item-section>
                </q-item>
            </q-list>
        </div>
    </q-card-section>
</q-card>

<q-card flat style="border-radius: 10px;" bordered v-if="noDataFlag">
    <q-card-section>
        <q-icon size="2rem" name="info" color="accent"/>
        <span>{{ $t("msgNoData") }}</span>
    </q-card-section>
</q-card>

<q-dialog persistent v-model="formPnl.show">
    <dmDangerDelete v-if="formPnl.title==='msgPnlAccountDelete'" @submit="btnClick" :confirmMessage="detail.account" :title="formPnl.title" :btnLoading="formPnl.loading">
    </dmDangerDelete>
    <dmForm v-if="formPnl.title==='msgPnlAccountUpdate'" @submit="btnClick" :title="formPnl.title" :btnLoading="formPnl.loading" :formData="formData">
    </dmForm>
</q-dialog>

</template>

<script setup lang="js">
import { useQuasar } from "quasar";
import { useI18n } from "vue-i18n";
import { watchEffect,reactive,ref } from "vue";
import { DMTBL,DMBTN,DMINPUT, msgOK,msgNG,msgErrLabel,showOptLabel,showOptColor,detailHandle } from "src/base/settings";
import { apiGet,apiPost} from "src/base/request";
import { ModelBase,ModelAccount } from "src/base/model";
import dmDangerDelete from "src/components/dmDangerDelete.vue";
import dmForm from "src/components/dmForm.vue";


const emit = defineEmits(["close","btnClick"])
const props = defineProps({
    user_uuid:{type:String,Required:true}
})
const q = useQuasar();
const {t} = useI18n();
const noDataFlag=ref(false);

const loading = ref(true)
const detail = ref({
    account:"",
    nickname:"",
    phone:"",
    avatar_url:"",
    user_status:0,
    created_at:"",
    updated_at:"",
})
const dangerZone = ref({
    // reset_password:{label:"msgResetPassword",icon:"password", caption:DMBTN.delete.label},
    delete:{label:DMBTN.delete.label,icon:DMBTN.delete.icon, caption:"msgDeleteWarning", id:DMBTN.delete.id},
})

const formPnl = reactive({
    show:false,
    loading:false,
    title:"msgPnlAccountUpdate",
})

const formData = reactive({
    nickname:DMINPUT.textRequired({rules: [val => val && val.toString().length > 0 || t("msgRequired")]},ModelAccount.nickname.i18nLabel),
    user_status:DMINPUT.select({...ModelAccount.user_status},ModelAccount.user_status.i18nLabel),
})


watchEffect(()=>{
    getDetail()
})

function getDetail(){
    let data = {
        user_uuid:props.user_uuid
    }
    apiGet("/account/detail",data,
        (rsp)=>{
            if(rsp.data.code == 0){
                if(rsp.data.data){
                    // 有数据,数据更新
                    detail.value=rsp.data.data
                    noDataFlag.value=false
                }else{
                    // 无数据,无数据显示
                    noDataFlag.value=true
                }
            }else{
                // 异常情况
                let errmsg = msgErrLabel(rsp.data.code)
                msgNG(q,{message:t(errmsg)})
            }
            loading.value=false
        },
        (err)=>{
            // 
        },
        null
    )
}

function deleteData(){
    let data = {
        user_uuid:props.user_uuid
    }

    apiPost("/account/delete",data,
                (rsp)=>{
                    if(rsp.data.code==0){
                        formPnl.show=false
                        msgOK(q,{message:t("msgSucceed")})
                        emit("btnClick",DMBTN.back.id)
                    }else{
                        let errmsg = msgErrLabel(rsp.data.code)
                        msgNG(q,{message:t(errmsg)})
                    }
                },
                (err)=>{

                },
                formPnl
            )
}

function updateData(){
    let data = {
        user_uuid:props.user_uuid,
        nickname:formData.nickname.value,
        user_status:formData.user_status.value
    }

    apiPost("/account/update",data,
        (rsp)=>{
            if(rsp.data.code == 0){
                formPnl.show=false
                msgOK(q,{message:t("msgSucceed")})
                getDetail()
            }else{
                let errmsg = msgErrLabel(rsp.data.code)
                msgNG(q,{message:t(errmsg)})
            }
        },
        (err)=>{

        },
        formPnl,
    )
}


function btnClick(btnID,data=null){
    let reqData = {}
    switch(btnID){
        case DMBTN.delete.id:
            formPnl.show=true
            formPnl.title="msgPnlAccountDelete"
            break;
        case DMBTN.update.id:
            formPnl.show=true
            formPnl.title="msgPnlAccountUpdate"
            formData.nickname.value = detail.value.nickname
            formData.user_status.value = detail.value.user_status
            break;
        case DMBTN.submit.id:
            switch(formPnl.title){
                case "msgPnlAccountDelete":
                    deleteData()
                    break;
                case "msgPnlAccountUpdate":
                    updateData()
                    break;
                default:
                    break;
            }
            break;
    }
    
}



</script>