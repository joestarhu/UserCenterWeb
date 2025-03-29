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
                    <q-item-label>{{props.org_uuid || "-"}}</q-item-label>
                </q-item-section>
            </q-item>
            <q-item>
                <q-item-section>
                    <q-item-label class="text-grey">{{ $t(ModelOrg.org_name.i18nLabel) }}</q-item-label>
                    <q-item-label>{{detail.org_name || "-"}}</q-item-label>
                </q-item-section>
            </q-item>
            <q-item>
                <q-item-section>
                    <q-item-label class="text-grey">{{ $t(ModelOrg.org_owner.i18nLabel) }}</q-item-label>
                    <q-item-label>{{detail.nickname || "-"}}</q-item-label>
                </q-item-section>
            </q-item>
            <q-item>
                <q-item-section>
                    <q-item-label class="text-grey">{{ $t(ModelOrg.org_status.i18nLabel) }}</q-item-label>
                    <q-item-label>
                        <q-badge :color="showOptColor(detail.org_status,ModelOrg.org_status.options)">
                            {{ $t(showOptLabel(detail.org_status,ModelOrg.org_status.options))}}
                        </q-badge>
                    </q-item-label>
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


    <!-- 无数据 -->
    <q-card  flat style="border-radius: 10px;" v-if="noDataFlag">
        <q-card-section>
            <q-icon size="2rem" name="info" color="accent"/>
            <span>{{ $t("msgNoData") }}</span>
        </q-card-section>
    </q-card>
</template> 

<script setup lang="js">
import { ref,watchEffect } from 'vue';
import { ModelBase,ModelOrg } from 'src/base/model';
import { apiGet } from 'src/base/request';
import { HiTblObj,HiBtnObj,HiInputObj, msgOK,msgNG,msgErrLabel,showOptLabel,showOptColor,detailHandle,detailShow,detailID } from "src/base/settings";


const props = defineProps({
    org_uuid:{type:String,Required:true}
})
const noDataFlag=ref(false);

const detail = ref({
    org_name:"",
    nickname:"",
    org_status:0,
    created_at:"",
    updated_at:"",
})

watchEffect(()=>{
    getDetail()
})


function btnClick(btnID){

}

function getDetail(){
    let reqData = {
        org_uuid:props.org_uuid
    }

    apiGet("/org/detail",reqData,
        (rsp)=>{
            if(rsp.data.code == 0){
                if(rsp.data.data){
                    noDataFlag.value =false
                    detail.value = rsp.data.data
                }else{
                    noDataFlag.value =true
                }
            }else{
                // 异常情况
                let errmsg = msgErrLabel(rsp.data.code)
                msgNG({message:t(errmsg)})
            }
        },
        (err)=>{
            // 暂无
        },
        null
    )
}
</script>