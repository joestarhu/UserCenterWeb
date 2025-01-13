<template>
<q-card  flat style="border-radius: 10px;" bordered v-if="!noDataFlag">
<q-card-section>
    <div class="row items-center">
        <span class="text-bold">{{$t("msgPnlGeneralInfo")}}</span>
        <q-space></q-space>
        <q-btn no-caps :icon="DMBTN.update.icon" flat dense :color="DMBTN.update.color" @click="btnClick(DMBTN.update.id)">{{$t(DMBTN.update.label)}}</q-btn>
    </div>
    <div>
    <q-list>
            <q-item>
                <q-item-section avatar  class="text-grey">{{$t("msgRoleName")}}</q-item-section>
                <q-item-section><span>{{detail.role_name || "-"}} </span></q-item-section>
            </q-item>
            <q-item>
                <q-item-section avatar  class="text-grey">{{$t("msgRoleDesc")}}</q-item-section>
                <q-item-section><span>{{detail.role_desc || "-"}} </span></q-item-section>
            </q-item>
            <q-item>
                <q-item-section avatar  class="text-grey">{{$t("msgStatus")}}</q-item-section>
                <q-item-section thumbnail>
                    <q-badge :color="showOptColor(detail.role_status,ModelRole.role_status.options)">
                        {{ $t(showOptLabel(detail.role_status,ModelRole.role_status.options))}}
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
    <dmDangerDelete v-if="formPnl.title==='msgPnlRoleDelete'" @submit="btnClick" :confirmMessage="detail.role_name" :title="formPnl.title" :btnLoading="formPnl.loading">
    </dmDangerDelete>
    <dmForm v-if="formPnl.title==='msgPnlRoleUpdate'" @submit="btnClick" :title="formPnl.title" :btnLoading="formPnl.loading" :formData="formData">
    </dmForm>
</q-dialog>



</template>

<script setup lang="js">
import { useI18n } from "vue-i18n";
import { watchEffect,ref,reactive } from "vue";
import { DMTBL,DMBTN,DMINPUT, msgOK,msgNG,msgErrLabel,showOptLabel,showOptColor,detailHandle } from "src/base/settings";
import { ModelBase,ModelRole } from "src/base/model";
import { apiGet,apiPost} from "src/base/request";
import dmDangerDelete from "src/components/dmDangerDelete.vue";
import dmForm from "src/components/dmForm.vue";

const emit = defineEmits(["close","btnClick"])
const props = defineProps({
    role_id:{type:String,Required:true}
})


const {t} = useI18n()
const noDataFlag=ref(false)

const detail = ref({
    role_name:"",
    role_desc:"",
    role_status:0,
    created_at:"",
    updated_at:"",
})

const dangerZone = ref({
    delete:{label:DMBTN.delete.label,icon:DMBTN.delete.icon, caption:"msgDeleteWarning", id:DMBTN.delete.id},
})

const formPnl = reactive({
    show:false,
    loading:false,
    title:"msgPnlRoleUpdate",
})

const formData = reactive({
    role_name:  DMINPUT.textRequired({rules: [val => val && val.toString().length > 0 || t("msgRequired")]}, ModelRole.role_name.i18nLabel,""),
    role_desc:  DMINPUT.text({type:"textarea"}, ModelRole.role_desc.i18nLabel,""),
    role_status:DMINPUT.select({...ModelRole.role_status},ModelRole.role_status.i18nLabel),
})


function getDetail(){
    let data = {
        role_id:props.role_id
    }

    apiGet("/role/detail", data,
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
            msgNG({message:t(errmsg)})
        }
    },
    (err)=>{

    },
    null,
    )
}



function updateData(){
    let data = {
        role_id:props.role_id,
        role_name:formData.role_name.value,
        role_desc:formData.role_desc.value,
        role_status:formData.role_status.value
    }

    apiPost("/role/update",data,
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
        (err)=>{},
        formPnl
    )
}

function deleteData(){
    let data = {
        role_id:props.role_id
    }

    apiPost("/role/delete",data,
        (rsp)=>{
            if(rsp.data.code==0){
                formPnl.show=false
                msgOK({message:t("msgSucceed")})
                emit("btnClick",DMBTN.back.id)
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

function btnClick(btnID,data=null){
    let reqData = {}
    switch(btnID){
        case DMBTN.delete.id:
            formPnl.show=true
            formPnl.title = "msgPnlRoleDelete"
            break;
        case DMBTN.update.id:
            formPnl.show=true
            formPnl.title = "msgPnlRoleUpdate"
            formData.role_name.value = detail.value.role_name
            formData.role_desc.value = detail.value.role_desc
            formData.role_status.value = detail.value.role_status
            break;
        case DMBTN.submit.id:
            switch(formPnl.title){
                case "msgPnlRoleDelete":
                    deleteData()
                    break;
                case "msgPnlRoleUpdate":
                    updateData()
                    break;
                default:
                    break;
            }
            break;
        default:
            break;
    }
}

watchEffect(()=>{
    getDetail()
})

</script>