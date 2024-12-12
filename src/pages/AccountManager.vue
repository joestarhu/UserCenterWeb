<template>
<q-page padding>
    <dmTbl v-bind="tbl" @query="getList">
      <template #body-cell-user_status="props">
        <q-td :props="props">
          <q-badge color="positive">{{ $t(showOptLabel(props.row.user_status,ModelAccount.user_status.options))}}</q-badge>
        </q-td>
      </template>
    </dmTbl>
</q-page>
</template>


<script setup lang="js">
import { useQuasar } from "quasar";
import { reactive } from "vue";
import { DMTBL,DMBTN,DMINPUT, msgOK,msgNG,showOptLabel } from "src/base/settings";
import { getTblList} from "src/base/request";
import { ModelBase,ModelAccount } from "src/base/model";
import dmTbl from "src/components/dmTbl.vue";

const $q = useQuasar();

const tbl = reactive({
    dmHeaderInput:{
        account:DMINPUT.textQuery(null,ModelAccount.account.i18nLabel),
        user_status:DMINPUT.selectQuery({...ModelAccount.user_status}, ModelAccount.user_status.i18nLabel),
    },
    columns:[
        DMTBL.col("account",ModelAccount.account.i18nLabel,),
        DMTBL.col("nickname",ModelAccount.nickname.i18nLabel,),
        DMTBL.col("phone",ModelAccount.phone.i18nLabel,),
        DMTBL.col("created_at",ModelBase.created_at.i18nLabel),
        DMTBL.col("updated_at",ModelBase.updated_at.i18nLabel),
        DMTBL.col("user_status",ModelAccount.user_status.i18nLabel,),
    ],
    rows:[],
})

function getList(pagination){
  let tblQuery = tbl.dmHeaderInput;
  let data = {
    account:tblQuery.account.value,
    user_status:tblQuery.user_status.value,
  }

  getTblList(
    pagination,tbl,"/account/list",data,
    null,
    (err)=>{
      $q.notify(msgNG({message:err.data.detail}))
    }
  )
}
</script>