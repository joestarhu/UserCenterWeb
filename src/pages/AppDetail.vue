<template>
<q-card  flat style="border-radius: 10px;" v-if="!noDataFlag">
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
                    <q-item-label>{{props.app_uuid || "-"}}</q-item-label>
                </q-item-section>
            </q-item>
            <q-item>
                <q-item-section>
                    <q-item-label class="text-grey">{{$t(ModelApp.app_name.i18nLabel)}}</q-item-label>
                    <q-item-label>{{detail.app_name || "-"}}</q-item-label>
                </q-item-section>
            </q-item>
            <q-item>
                <q-item-section>
                    <q-item-label class="text-grey">{{$t(ModelApp.app_desc.i18nLabel)}}</q-item-label>
                    <q-item-label>{{detail.app_desc || "-"}}</q-item-label>
                </q-item-section>
            </q-item>
            <q-item>
                <q-item-section>
                    <q-item-label class="text-grey">{{$t(ModelBase.created_at.i18nLabel)}}</q-item-label>
                    <q-item-label>{{detail.created_at || "-"}}</q-item-label>
                </q-item-section>
            </q-item>
            <q-item>
                <q-item-section>
                    <q-item-label class="text-grey">{{$t(ModelBase.updated_at.i18nLabel)}}</q-item-label>
                    <q-item-label>{{detail.updated_at || "-"}}</q-item-label>
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

</template>

<script setup lang="js">
import { watchEffect,reactive,ref } from "vue";
import { HiTblObj,HiBtnObj,HiInputObj, msgOK,msgNG,msgErrLabel,showOptLabel,showOptColor,detailHandle,detailShow,detailID } from "src/base/settings";
import { ModelBase,ModelApp } from "src/base/model";
import { apiGet,apiPost} from "src/base/request";


const emit = defineEmits(["close","btnClick"])
const props = defineProps({
    app_uuid:{type:String,Required:true}
})
const noDataFlag=ref(false);

const detail = ref({
    app_name:"",
    app_desc:"",
    created_at:"",
    updated_at:"",    
})


watchEffect(()=>{
    getDetail()
})

function getDetail(){
    let data = {
        app_uuid:props.app_uuid
    }
    apiGet("/app/detail",data,
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
            loading.value=false
        },
        (err)=>{
            // 
        },
        null
    )    
}
</script>