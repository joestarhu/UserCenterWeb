<template>
    <dmTbl v-bind="tbl" @query="getList">
        <template #body-cell-role_status="props">
            <q-td :props="props">
                <q-badge :color="showOptColor(props.row.role_status,ModelRole.role_status.options)">
                    {{ $t(showOptLabel(props.row.role_status,ModelRole.role_status.options))}}
                </q-badge>
            </q-td>
      </template>        
    </dmTbl>
</template>


<script setup lang="js">
import { reactive,computed } from "vue";
import { DMTBL,DMBTN,DMINPUT, msgOK,msgNG,msgErrLabel,showOptLabel,showOptColor,detailHandle,detailShow,detailID } from "src/base/settings";
import { apiPost, getTblList} from "src/base/request";
import { ModelBase,ModelRole } from "src/base/model";
import dmTbl from "src/components/dmTbl.vue";
const props = defineProps({
    app_id:{type:String,Required:true}
})


const tbl = reactive({
    dmHeaderInput:{
        role_name:DMINPUT.textQuery(null,ModelRole.role_name.i18nLabel),
        role_status:DMINPUT.selectQuery({...ModelRole.role_status}, ModelRole.role_status.i18nLabel),
    },
    dmHeaderBtn:[DMBTN.create],
    dmRowBtn:[DMBTN.detail],
    columns:[
        DMTBL.col("role_name",ModelRole.role_name.i18nLabel),
        DMTBL.col("role_desc",ModelRole.role_desc.i18nLabel),
        DMTBL.col("created_at",ModelBase.created_at.i18nLabel),
        DMTBL.col("updated_at",ModelBase.updated_at.i18nLabel),
        DMTBL.col("role_status",ModelRole.role_status.i18nLabel),
        DMTBL.btn()
    ],
    rows:[],
    bordered:false,
    // separator:"vertical",
})



function getList(pagination){
    let tblQuery = tbl.dmHeaderInput;
    let data = {
        app_id:props.app_id,
        role_name:tblQuery.role_name.value,
        role_status:tblQuery.role_status.value,
    }

    getTblList(
    pagination,tbl,"/role/list",data,
    null,
    (err)=>{
      msgNG({message:err.data.detail})
    }
  )
}


</script>