<template>
    <q-table 
    v-bind="props"
    v-model:pagination="pagination"
    style="border-radius: 10px;"
    :pagination="pagination"
    :rows-per-page-label="$t('msgRecordPerPage')"
    :rows-per-page-options="ConfigDict.rowsPerPageOptions"
    flat
    bordered
    @request="onRequest">
        <!-- 读取数据状态 -->
        <template #loading>
            <q-inner-loading showing color="primary" />
        </template>
        <!-- 无数据 -->
        <template #no-data>
            <div class="full-width row flex-center q-gutter-sm text-bold">
                <q-icon size="2rem" name="info" color="accent"/>
                <span>{{ $t(noDatai18nLabel) }}</span>
            </div>
        </template>
        <!-- 头部搜索和按钮栏位 -->
        <template v-if="showHeader" #top>
            <div class="col row q-col-gutter-xs">
                <HiInput v-for="obj in headerInputs" :key="obj"
                v-model="obj.value"
                v-bind="obj"
                @update:model-value="onRequest(null)">
                </HiInput>
            </div>
            <div class="col-inline reverse q-gutter-xs">
                <q-btn v-for="obj in headerBtns" :key="obj.id" :label="$t(obj.i18nLabel)" :color="obj.color" @click="btnClick(obj.id, props)"></q-btn>
            </div>
        </template>
        <!-- header的中英文处理 -->
        <template #header="props">
            <q-tr :props="props">
                <q-th v-for="col in props.cols" :key="col.name" :props="props">
                    <span v-if="col.i18nLabel">{{ $t(col.i18nLabel) }}</span>
                    <span v-else>{{ col.label }}</span>
                </q-th>
            </q-tr>
        </template>
        <!--特殊行操作栏:button -->
        <template #body-cell-btns="props">
            <q-td :props="props" class="q-gutter-xs">
                <q-btn v-for="obj in rowBtns" :key="obj.id" :icon="obj.icon" :color="obj.color" @click="btnClick(obj.id, props)" dense flat>
                    <q-tooltip>
                        {{ $t(obj.i18nLabel) }}
                    </q-tooltip>
                </q-btn>
            </q-td>
        </template>
        <!-- q-table控件的slot body-cell -->
         <template #body-cell="props">
            <slot :name="`body-cell-${props.col.name}`" v-bind="props">
                <q-td :props="props">
                    <span>{{ props.value }}</span>
                </q-td>
            </slot>
         </template>
    </q-table>
</template>

<script setup lang="js">
import { computed, onMounted, reactive } from 'vue';
import { ConfigDict } from 'src/base/settings';
import HiInput from './HiInput.vue';

const emit = defineEmits(["btnClick","query"])
const props = defineProps({
    rowBtns:{default:[]},
    headerBtns:{default:[]},
    headerInputs:{default:[]},
    noDatai18nLabel:{default:"msgNoData"},
})

const pagination = reactive({page:1,rowsNumner:0,rowsPerPage:10})

// 是否显示table的header,根据是否有输入框和按钮来判断
const showHeader = computed(()=>{
    return Object.keys(props.headerBtns).length + Object.keys(props.headerInputs).length
})


// 按钮函数
function btnClick(btnId,data){
    emit("btnClick",btnId,data)
}

function onRequest(data){
    if(data){
        pagination.page = data.pagination.page
        if(pagination.rowsPerPage != data.pagination.rowsPerPage){
            // localStorage.setItem(DMSETTINGS.pageSize, data.pagination.rowsPerPage)
            pagination.rowsPerPage = data.pagination.rowsPerPage
        }
    }
    emit("query",pagination)
}

onMounted(()=>{
    emit("query",pagination)
})
</script>