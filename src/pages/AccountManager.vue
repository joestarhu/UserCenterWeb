<template>
<q-page padding>
  <HiManager title="msgPnlAccountList" :showDetail="detailPnl.show" @click="btnClick">
    <template #list>
      <HiTbl v-bind="tbl" @query="getList" @btnClick="btnClick">
        <template #body-cell-account_status="props">
          <q-td :props="props">
            <q-badge :color="showOptColor(props.row.account_status,ModelAccount.account_status.options)">
              {{ $t(showOptLabel(props.row.account_status,ModelAccount.account_status.options))}}
            </q-badge>
          </q-td>
        </template>
      </HiTbl>
    </template>
    <template #detail>
        <AccountDetail :user_uuid="detailPnl.id" @btnClick="btnClick"></AccountDetail>
    </template>
  </HiManager>

  <q-dialog persistent v-model="formPnl.show">
    <HiForm class="q-pa-md" title="msgPnlAccountCreate" :btnLoading="formPnl.loading" :formData="formData" @submit="btnClick"></HiForm>
  </q-dialog>

</q-page>
</template>


<script setup lang="js">
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { reactive,computed} from "vue";
import { HiTblObj,HiBtnObj,HiInputObj, msgOK,msgNG,msgErrLabel,showOptLabel,showOptColor,detailHandle,detailShow,detailID } from "src/base/settings";
import { apiPost, getTblList} from "src/base/request";
import { ModelBase,ModelAccount } from "src/base/model";
import HiManager from "src/components/HiManager.vue";
import HiTbl from "src/components/HiTbl.vue";
import HiForm from "src/components/HiForm.vue";
import AccountDetail from "./AccountDetail.vue";

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
    account:HiInputObj.textRequired({rules: [val => val && val.toString().length > 0 || t("msgRequired")]}, ModelAccount.account.i18nLabel,""),
    nickname:HiInputObj.textRequired({rules: [val => val && val.toString().length > 0 || t("msgRequired")]},ModelAccount.nickname.i18nLabel,""),
    phone:HiInputObj.text(null,ModelAccount.phone.i18nLabel,""),
    account_status:HiInputObj.select({...ModelAccount.account_status},ModelAccount.account_status.i18nLabel,0),  
})


const tbl = reactive({
    headerInputs:{
      account:HiInputObj.textQuery(null,ModelAccount.account.i18nLabel),
      nickname:HiInputObj.textQuery(null,ModelAccount.nickname.i18nLabel),
      account_status:HiInputObj.selectQuery({...ModelAccount.account_status}, ModelAccount.account_status.i18nLabel),
    },
    headerBtns:[HiBtnObj.create],
    rowBtns:[HiBtnObj.detail],
    columns:[
        HiTblObj.col("account",ModelAccount.account.i18nLabel,),
        HiTblObj.col("nickname",ModelAccount.nickname.i18nLabel,),
        HiTblObj.col("phone",ModelAccount.phone.i18nLabel,),
        HiTblObj.col("created_at",ModelBase.created_at.i18nLabel),
        HiTblObj.col("updated_at",ModelBase.updated_at.i18nLabel),
        HiTblObj.col("account_status",ModelAccount.account_status.i18nLabel,),
        HiTblObj.btn("user_uuid"),
    ],
    rows:[],
})

function getList(pagination){
  let tblQuery = tbl.headerInputs;
  let data = {
    account:tblQuery.account.value,
    nickname:tblQuery.nickname.value,
    account_status:tblQuery.account_status.value,
  }

  getTblList(
    pagination,tbl,"/account/list",data,
    null,
    (err)=>{
      msgNG({message:err.data.detail})
    }
  )
}

function initFormData(){
  // 初始化数据
  formData.account.value=""
  formData.nickname.value =""
  formData.phone.value=""
  formData.account_status.value = 0
}

function createData(formData){
  let data = {
    account:formData.account.value,
    nickname:formData.nickname.value,
    phone:formData.phone.value || "",
    account_status:formData.account_status.value
  }

  apiPost("/account/create",data,
    (rsp)=>{
      if(rsp.data.code == 0){
        msgOK({message:t("msgSucceed")})
        formPnl.show=false;
        getList(tbl.pagination);
      }else{
        let errmsg = msgErrLabel(rsp.data.code)
        msgNG({message:t(errmsg)})
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
    case HiBtnObj.back.id:
      detailHandle(router);
      getList(tbl.pagination);
      break;
    case HiBtnObj.detail.id:
      detailHandle(router,data.row.user_uuid)
      break;
    case HiBtnObj.create.id:
      initFormData()
      formPnl.show=true
      break;
    case HiBtnObj.submit.id:
      createData(data)
      break;
  }
}
</script>