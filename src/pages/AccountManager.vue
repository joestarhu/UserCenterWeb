<template>
<q-page padding>
  <dmManager title="msgPnlAccountList" :showDetail="detailPnl.show" @click="btnClick">
    <template #list>
      <dmTbl v-bind="tbl" @query="getList" @btnClick="btnClick">
        <template #body-cell-user_status="props">
          <q-td :props="props">
            <q-badge :color="showOptColor(props.row.user_status,ModelAccount.user_status.options)">
              {{ $t(showOptLabel(props.row.user_status,ModelAccount.user_status.options))}}
            </q-badge>
          </q-td>
        </template>
      </dmTbl>
    </template>
    <template #detail>
        <AccountDetail :user_uuid="detailPnl.id" @btnClick="btnClick"></AccountDetail>
    </template>
  </dmManager>

  <q-dialog persistent v-model="formPnl.show">
    <dmForm class="q-pa-md" title="msgPnlAccountCreate" :btnLoading="formPnl.loading" :formData="formData" @submit="btnClick"></dmForm>
  </q-dialog>

</q-page>
</template>


<script setup lang="js">
import { useQuasar } from "quasar";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { reactive,computed} from "vue";
import { DMTBL,DMBTN,DMINPUT, msgOK,msgNG,msgErrLabel,showOptLabel,showOptColor,detailHandle,detailShow,detailID } from "src/base/settings";
import { apiPost, getTblList} from "src/base/request";
import { ModelBase,ModelAccount } from "src/base/model";
import dmForm from "src/components/dmForm.vue";
import dmTbl from "src/components/dmTbl.vue";
import dmManager from "src/components/dmManager.vue"
import AccountDetail from "./AccountDetail.vue";


const q = useQuasar();
const {t} = useI18n();
const router = useRouter();

const detailPnl = reactive({
  show:computed(()=>{return detailShow(router)}),
  id:computed(()=>{return detailID(router)}),
})

const formPnl = reactive({
  show:false,
  loading:false,
})

const formData = reactive({
    account:DMINPUT.textRequired({rules: [val => val && val.toString().length > 0 || t("msgRequired")]}, ModelAccount.account.i18nLabel,""),
    nickname:DMINPUT.textRequired({rules: [val => val && val.toString().length > 0 || t("msgRequired")]},ModelAccount.nickname.i18nLabel,""),
    phone:DMINPUT.text(null,ModelAccount.phone.i18nLabel,""),
    user_status:DMINPUT.select({...ModelAccount.user_status},ModelAccount.user_status.i18nLabel,0),  
})


const tbl = reactive({
    dmHeaderInput:{
        account:DMINPUT.textQuery(null,ModelAccount.account.i18nLabel),
        nickname:DMINPUT.textQuery(null,ModelAccount.nickname.i18nLabel),
        user_status:DMINPUT.selectQuery({...ModelAccount.user_status}, ModelAccount.user_status.i18nLabel),
    },
    dmHeaderBtn:[DMBTN.create],
    dmRowBtn:[DMBTN.detail],
    columns:[
        DMTBL.col("account",ModelAccount.account.i18nLabel,),
        DMTBL.col("nickname",ModelAccount.nickname.i18nLabel,),
        DMTBL.col("phone",ModelAccount.phone.i18nLabel,),
        DMTBL.col("created_at",ModelBase.created_at.i18nLabel),
        DMTBL.col("updated_at",ModelBase.updated_at.i18nLabel),
        DMTBL.col("user_status",ModelAccount.user_status.i18nLabel,),
        DMTBL.btn("user_uuid"),
    ],
    rows:[],
})

function getList(pagination){
  let tblQuery = tbl.dmHeaderInput;
  let data = {
    account:tblQuery.account.value,
    nickname:tblQuery.nickname.value,
    user_status:tblQuery.user_status.value,
  }

  getTblList(
    pagination,tbl,"/account/list",data,
    null,
    (err)=>{
      msgNG(q, {message:err.data.detail})
    }
  )
}

function initFormData(){
  // 初始化数据
  formData.account.value=""
  formData.nickname.value =""
  formData.phone.value=""
  formData.user_status.value = 0
}

function createData(formData){
  let data = {
    account:formData.account.value,
    nickname:formData.nickname.value,
    phone:formData.phone.value || "",
    user_status:formData.user_status.value
  }

  apiPost("/account/create",data,
    (rsp)=>{
      if(rsp.data.code == 0){
        msgOK(q,{message:t("msgSucceed")})
        formPnl.show=false;
        getList(tbl.pagination);
      }else{
        let errmsg = msgErrLabel(rsp.data.code)
        msgNG(q,{message:t(errmsg)})
      }
    },
    (err)=>{
      // 异常处理
    },
    formPnl,
  )
}


function btnClick(btnID,data=null){
  switch(btnID){
    case DMBTN.back.id:
      detailHandle(router);
      getList(tbl.pagination);
      break;
    case DMBTN.detail.id:
      detailHandle(router,data.row.user_uuid)
      break;
    case DMBTN.create.id:
      initFormData()
      formPnl.show=true
      break;
    case DMBTN.submit.id:
      createData(data)
      break;
  }
}
</script>