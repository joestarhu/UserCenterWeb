<template>
<q-page padding>
    <dmTbl v-bind="tbl" @query="getList">
      <template #body-cell-org_user_status="props">
        <q-td :props="props">
          <q-badge :color="showOptColor(props.row.org_user_status,ModelOrgUser.org_user_status.options)">
            {{ $t(showOptLabel(props.row.org_user_status,ModelOrgUser.org_user_status.options))}}
          </q-badge>
        </q-td>
      </template>
    </dmTbl>
</q-page>
</template>

<script setup lang="js">
import { useQuasar } from "quasar";
import { reactive } from "vue";
import { DMTBL,DMBTN,DMINPUT, msgOK,msgNG,showOptLabel,showOptColor } from "src/base/settings";
import { getTblList} from "src/base/request";
import { ModelBase,ModelAccount,ModelOrgUser } from "src/base/model";
import dmTbl from "src/components/dmTbl.vue";

const $q = useQuasar();

const tbl = reactive({
    dmHeaderInput:{
        account:DMINPUT.textQuery(null,ModelAccount.account.i18nLabel),
        user_status:DMINPUT.selectQuery({...ModelAccount.user_status}, ModelAccount.user_status.i18nLabel),
    },
    dmHeaderBtn:[],
    dmRowBtn:[],
    columns:[
        // DMTBL.col("account",ModelAccount.account.i18nLabel,),
        DMTBL.col("org_user_nickname",ModelAccount.nickname.i18nLabel,),
        DMTBL.col("created_at",ModelBase.created_at.i18nLabel),
        DMTBL.col("updated_at",ModelBase.updated_at.i18nLabel),
        DMTBL.col("org_user_status",ModelOrgUser.org_user_status.i18nLabel,),
        // DMTBL.btn("user_uuid"),
    ],
    rows:[],
})


function getList(pagination){
    // let tblQuery = tbl.dmHeaderInput;
    let data = {}

    getTblList(
        pagination,tbl,"/org/user_list",data,
        null,
        (err)=>{
          $q.notify(msgNG({message:err.data.detail}))
        }
    )    
}


</script>