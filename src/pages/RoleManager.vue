<template>
<q-page padding>
  <dmManager @click="btnClick">
    <template #list>
      <dmTbl v-bind="tbl" @query="getList" @btnClick="btnClick">
        <template #body-cell-role_status="props">
        <q-td :props="props">
          <q-badge :color="showOptColor(props.row.role_status,ModelRole.role_status.options)">
            {{ $t(showOptLabel(props.row.role_status,ModelRole.role_status.options))}}
          </q-badge>
        </q-td>
      </template>
    </dmTbl>
    </template>
    <template #detail>

    </template>
  </dmManager>


  

</q-page>
</template>

<script setup lang="js">
import { useQuasar } from "quasar";
import { reactive } from "vue";
import { DMTBL,DMBTN,DMINPUT, msgOK,msgNG,showOptLabel,showOptColor} from "src/base/settings";
import { getTblList} from "src/base/request";
import { ModelBase,ModelRole } from "src/base/model";
import dmTbl from "src/components/dmTbl.vue";
import dmManager from "src/components/dmManager.vue"

const $q = useQuasar();
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
    rows:[]
})


function getList(pagination){
    let tblQuery = tbl.dmHeaderInput;
    let data = {
        role_name:tblQuery.role_name.value,
        role_status:tblQuery.role_status.value,
    }

    getTblList(
    pagination,tbl,"/role/list",data,
    null,
    (err)=>{
      $q.notify(msgNG({message:err.data.detail}))
    }
  )
}


function btnClick(btnID,props=null){
  switch(btnID){
    case DMBTN.back.id:
      const query = {...router.currentRoute.value.query}
      delete query.id
      router.replace({query:query})
      break;
    default:
      break;
  }

}



</script>