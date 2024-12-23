<template>
<q-page padding>
    <dmTbl v-bind="tbl" @query="getList">
        <template #body-cell-org_status="props">
        <q-td :props="props">
          <q-badge :color="showOptColor(props.row.org_status,ModelOrg.org_status.options)">
            {{ $t(showOptLabel(props.row.org_status,ModelOrg.org_status.options))}}
          </q-badge>
        </q-td>
      </template>
    </dmTbl>
</q-page>
</template>


<script setup lang="js">
import { useQuasar } from "quasar";
import { reactive } from "vue";
import { DMTBL,DMBTN,DMINPUT, msgOK,msgNG,showOptLabel,showOptColor} from "src/base/settings";
import { getTblList} from "src/base/request";
import { ModelBase,ModelAccount,ModelOrg } from "src/base/model";
import dmTbl from "src/components/dmTbl.vue";

const $q = useQuasar();

const tbl = reactive({
    dmHeaderInput:{
        org_name:DMINPUT.textQuery(null,ModelOrg.org_name.i18nLabel),
        org_status:DMINPUT.selectQuery({...ModelOrg.org_status}, ModelOrg.org_status.i18nLabel),
    },
    dmHeaderBtn:[DMBTN.create],
    dmRowBtn:[DMBTN.detail],
    columns:[
        DMTBL.col("org_name",ModelOrg.org_name.i18nLabel),
        DMTBL.col("nickname",ModelOrg.org_owner.i18nLabel,),
        DMTBL.col("created_at",ModelBase.created_at.i18nLabel),
        DMTBL.col("updated_at",ModelBase.updated_at.i18nLabel),
        DMTBL.col("org_status",ModelOrg.org_status.i18nLabel),
        DMTBL.btn("org_uuid")
    ],
    rows:[],
})



function getList(pagination){
  let tblQuery = tbl.dmHeaderInput;
  let data = {
    org_name:tblQuery.org_name.value,
    org_status:tblQuery.org_status.value,
  }

  getTblList(
    pagination,tbl,"/org/list",data,
    null,
    (err)=>{
      $q.notify(msgNG({message:err.data.detail}))
    }
  )
}
</script>