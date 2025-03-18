<template>
<q-card flat style="border-radius: 10px;" bordered v-if="!noDataFlag">
    <q-card-section>
        <div class="row items-center">
            <span class="text-bold">{{$t("msgPnlGeneralInfo")}}</span>
            <q-space></q-space>
            <q-btn no-caps :color="HiBtnObj.update.color" @click="btnClick(HiBtnObj.update.id)">{{$t(HiBtnObj.update.i18nLabel)}}</q-btn>
        </div>
        <div>
            <q-list>
                <q-item>
                    <q-item-section>
                        <q-item-label class="text-grey">ID</q-item-label>
                        <q-item-label>{{detail.user_uuid || "-"}}</q-item-label>
                    </q-item-section>
                </q-item>
                <q-item>
                    <q-item-section>
                        <q-item-label class="text-grey">{{$t("msgAvatar")}}</q-item-label>
                        <q-item-label>
                            <img :src="detail.avatar_url || '/icons/favicon-128x128.png'" style="width:32px; height:32px" />
                        </q-item-label>                     
                    </q-item-section>
                </q-item>
                <q-item>
                    <q-item-section>
                        <q-item-label  class="text-grey">{{$t(ModelAccount.account.i18nLabel)}}</q-item-label>
                        <q-item-label>{{detail.account || "-"}}</q-item-label>
                    </q-item-section>
                </q-item>
                <q-item>
                    <q-item-section>
                        <q-item-label class="text-grey">{{$t(ModelAccount.nickname.i18nLabel)}}</q-item-label>
                        <q-item-label>{{detail.nickname || "-"}}</q-item-label>
                    </q-item-section>
                </q-item>
                <q-item>
                    <q-item-section>
                        <q-item-label  class="text-grey">{{$t(ModelAccount.phone.i18nLabel)}}</q-item-label>
                        <q-item-label>{{detail.phone || "-"}}</q-item-label>
                    </q-item-section>
                </q-item>
                <q-item>
                    <q-item-section>
                        <q-item-label  class="text-grey">{{$t(ModelAccount.account_status.i18nLabel)}}</q-item-label>
                        <q-item-label>
                            <q-badge :color="showOptColor(detail.account_status,ModelAccount.account_status.options)">
                              {{ $t(showOptLabel(detail.account_status,ModelAccount.account_status.options))}}
                            </q-badge>
                        </q-item-label>
                    </q-item-section>
                </q-item>
                <q-item>
                    <q-item-section>
                        <q-item-label  class="text-grey">{{$t(ModelBase.created_at.i18nLabel)}}</q-item-label>
                        <q-item-label>{{detail.created_at || "-"}}</q-item-label>
                    </q-item-section>
                </q-item>
                <q-item>
                    <q-item-section>
                        <q-item-label  class="text-grey">{{$t(ModelBase.updated_at.i18nLabel)}}</q-item-label>
                        <q-item-label>{{detail.updated_at || "-"}}</q-item-label>
                    </q-item-section>
                </q-item>
            </q-list>
        </div>
    </q-card-section>
    <q-separator inset></q-separator>
    <q-card-section>
        <div class="row items-center">
            <span class="text-bold text-negative">{{$t("msgPnlDangerZone")}}</span>
        </div>
        <div>
            <q-list class="relative">
                <!-- <q-item clickable v-ripple v-for="obj of dangerZone" :key="obj" @click="btnClick(obj.id)">
                    <q-item-section avatar>
                      <q-icon :name="obj.icon" color="negative" />
                    </q-item-section>
                    <q-item-section>
                        <q-item-label class="text-negative">{{$t(obj.label)}}</q-item-label>
                        <q-item-label class="text-negative" caption lines="2">{{ $t(obj.caption)}}</q-item-label>
                    </q-item-section>
                </q-item> -->
                <q-item v-for="obj of dangerZone" :key="obj">
                    <q-item-section>
                        <q-item-label>{{$t(obj.label)}}</q-item-label>
                        <q-item-label caption lines="2">{{ $t(obj.caption)}}</q-item-label>
                    </q-item-section>
                    <q-item-section top side>
                        <q-btn no-caps color="negative" @click="btnClick(obj.id)">{{ $t(obj.label) }}</q-btn>
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
    <HiDangerDelete v-if="formPnl.title==='msgPnlAccountDelete'" @submit="btnClick" :confirmMessage="detail.account" :title="formPnl.title" :btnLoading="formPnl.loading">
    </HiDangerDelete>
    <HiForm v-if="formPnl.title==='msgPnlAccountUpdate'" @submit="btnClick" :title="formPnl.title" :btnLoading="formPnl.loading" :formData="formData">
    </HiForm>
</q-dialog>

</template>

<script setup lang="js">
import { useI18n } from "vue-i18n";
import { watchEffect,reactive,ref } from "vue";
import { HiBtnObj,HiInputObj, msgOK,msgNG,msgErrLabel,showOptLabel,showOptColor,detailHandle } from "src/base/settings";
import { apiGet,apiPost} from "src/base/request";
import { ModelBase,ModelAccount } from "src/base/model";
import HiForm from "src/components/HiForm.vue";
import HiDangerDelete from "src/components/HiDangerDelete.vue";


const emit = defineEmits(["close","btnClick"])
const props = defineProps({
    user_uuid:{type:String,Required:true}
})

const {t} = useI18n();
const noDataFlag=ref(false);

const loading = ref(true)
const detail = ref({
    user_uuid:props.user_uuid,
    account:"",
    nickname:"",
    phone:"",
    avatar_url:"",
    account_status:0,
    created_at:"",
    updated_at:"",
})
const dangerZone = ref({
    // reset_password:{label:"msgResetPassword",icon:"password", caption:DMBTN.delete.label},
    delete:{label:HiBtnObj.delete.i18nLabel,icon:HiBtnObj.delete.icon, caption:"msgDeleteWarning", id:HiBtnObj.delete.id},
})

const formPnl = reactive({
    show:false,
    loading:false,
    title:"msgPnlAccountUpdate",
})

const formData = reactive({
    nickname:HiInputObj.textRequired({rules: [val => val && val.toString().length > 0 || t("msgRequired")]},ModelAccount.nickname.i18nLabel),
    account_status:HiInputObj.select({...ModelAccount.account_status},ModelAccount.account_status.i18nLabel),
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
                    detail.value.user_uuid = props.user_uuid
                    noDataFlag.value=false
                }else{
                    // 无数据,无数据显示
                    noDataFlag.value=true
                }
            }else{
                // 异常情况
                let errmsg = msgErrLabel(rsp.data.code)
                msgNG({message:t(errmsg)})
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
                        msgOK({message:t("msgSucceed")})
                        emit("btnClick",HiBtnObj.back.id)
                    }else{
                        let errmsg = msgErrLabel(rsp.data.code)
                        msgNG({message:t(errmsg)})
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
        account_status:formData.account_status.value
    }

    apiPost("/account/update",data,
        (rsp)=>{
            if(rsp.data.code == 0){
                formPnl.show=false
                msgOK({message:t("msgSucceed")})
                getDetail()
            }else{
                let errmsg = msgErrLabel(rsp.data.code)
                msgNG({message:t(errmsg)})
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
        case HiBtnObj.delete.id:
            formPnl.show=true
            formPnl.title="msgPnlAccountDelete"
            break;
        case HiBtnObj.update.id:
            formPnl.show=true
            formPnl.title="msgPnlAccountUpdate"
            formData.nickname.value = detail.value.nickname
            formData.account_status.value = detail.value.account_status
            break;
        case HiBtnObj.submit.id:
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