<template>
  <HiManager title="msgPnlAppList" :showDetail="detailPnl.show" @click="btnClick">
    <template #list>
      <HiTbl v-bind="tbl" @query="getList" @btnClick="btnClick">
        <template #body-cell-app_status="props">
          <q-td :props="props">
            <q-badge :color="showOptColor(props.row.app_status,ModelApp.app_status.options)">
              {{ $t(showOptLabel(props.row.app_status,ModelApp.app_status.options))}}
            </q-badge>
          </q-td>
        </template>
      </HiTbl>
    </template>
    <template #detail>
      <q-card flat style="border-radius: 10px; overflow:auto;" bordered>
        <q-tabs active-color="primary" class="text-grey" align="left" v-model="tabs.value"  narrow-indicator dense>
            <q-tab no-caps v-for="obj in tabs.lists" :key="obj" :name="obj.name" :label="$t(obj.name)"  />
        </q-tabs>

        <q-tab-panels v-model="tabs.value">
          <q-tab-panel name="msgPnlAppBasicInfo">
            <AppDetail :app_uuid="detailPnl.id"></AppDetail>
          </q-tab-panel>
        <q-tab-panel name="msgPnlAppPermission">
          <AppPermission :app_uuid="detailPnl.id"></AppPermission>
        </q-tab-panel>
        <q-tab-panel name="msgPnlAppRole">
          <!-- <AppRole :app_id="detailPnl.id"></AppRole> -->
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
    </template>
  </HiManager> 
</template>


<script setup lang="js">
import { useRouter } from "vue-router";
import { reactive, computed} from "vue";
import { HiTblObj,HiBtnObj,HiInputObj, msgOK,msgNG,msgErrLabel,showOptLabel,showOptColor,detailHandle,detailShow,detailID } from "src/base/settings";
import { getTblList} from "src/base/request";
import { ModelBase,ModelApp } from "src/base/model";
import HiTbl from "src/components/HiTbl.vue";
import HiManager from "src/components/HiManager.vue";
import AppDetail from "./AppDetail.vue";
import AppPermission from "./AppPermission.vue";
// import AppRole from "./AppRole.vue";

const router = useRouter()

const detailPnl = reactive({
  show:computed(()=>{return detailShow(router)}),
  id:computed(()=>{return detailID(router)}),
})

const tbl = reactive({
    headerInputs:{
        app_name:HiInputObj.textQuery(null,ModelApp.app_name.i18nLabel),
    },
    headerBtns:[],
    rowBtns:[HiBtnObj.detail],
    columns:[
      HiTblObj.col("app_name",ModelApp.app_name.i18nLabel),
      HiTblObj.col("app_desc",ModelApp.app_desc.i18nLabel,),
      HiTblObj.col("created_at",ModelBase.created_at.i18nLabel),
      HiTblObj.col("updated_at",ModelBase.updated_at.i18nLabel),
      HiTblObj.btn("app_uuid"),
    ],
    rows:[],
})


const tabs = reactive({
  value:"msgPnlAppBasicInfo",
  lists:[
    {name:"msgPnlAppBasicInfo"},
    {name:"msgPnlAppPermission"},
    {name:"msgPnlAppRole"},
  ]
})

function getList(pagination){
  let tblQuery = tbl.headerInputs;
  let data = {
    app_name:tblQuery.app_name.value,
  }

  getTblList(
    pagination,tbl,"/app/list",data,
    null,
    (err)=>{
      msgNG({message:err.data.detail})
    }
  )
}

function btnClick(btnID, data=null){
  switch(btnID){
    case HiBtnObj.back.id:
      const query = {...router.currentRoute.value.query}
      delete query.id
      router.replace({
        query:query
     })
      break;
    case HiBtnObj.detail.id:
      tabs.value = "msgPnlAppBasicInfo"
      detailHandle(router,data.row.app_uuid)
    //   router.replace({
    //     query:{
    //         ...router.currentRoute.value.query,
    //         "id":props.row.app_uuid
    //     }
    //  })
      break;
    default:
      break;
  }
}
</script>