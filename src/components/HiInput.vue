<template>
<!-- 普通输入框:text -->
<q-input v-if="type==='text'"
     v-bind="qProps" 
     v-model.trim="innerValue" 
     :label="i18nLabel?$t(i18nLabel):qProps.label"
     :placeholder="i18nPlaceholder?$t(i18nPlaceholder):qProps.placeholder">
     <template v-if="hiAppend==ConfigDict.HiInputAppendRequired" #append>
        <q-icon size="0.8rem" name="tag"></q-icon>
        <span style="font-size:0.8rem">{{ $t("msgRequired") }}</span>
     </template>
     <template v-else-if="hiAppend==ConfigDict.HiInputAppendQuery" #append>
        <q-icon size="0.8rem" name="search"></q-icon>
     </template>
     <template v-else #append>
        
     </template>
 </q-input>

<!-- 普通选择框:select -->
 <q-select v-if="type==='select'"
    v-bind="qProps"
    v-model.trim="innerValue"
    :label="i18nLabel?$t(i18nLabel):qProps.label"
    emit-value
    map-options>
     <template #no-option>
        <q-item><q-item-section class="text-grey">{{ $t("msgNoData") }}</q-item-section></q-item>
     </template>
     <template #option="scope">
        <q-item v-bind="scope.itemProps">
            <q-item-section>
                <q-item-label>{{ optionsi18nLabel(scope.opt) }}</q-item-label>
                <q-item-label caption>{{ scope.opt.caption }}</q-item-label>
            </q-item-section>
        </q-item>
     </template>
</q-select>
</template>

<script setup lang="js">
import {ref,watch,watchEffect} from 'vue'
import { useI18n } from 'vue-i18n'
import { ConfigDict } from 'src/base/settings'

defineOptions({
  inheritAttrs: false // 禁用属性继承
})

const props = defineProps({
    modelValue:{required:true},
    type:{type:String,default:"text"},
    i18nLabel:{type:String,default:null},
    i18nPlaceholder:{type:String,default:null},
    hiAppend:{type:Number,default:null},
    // quasar原有的props属性
    qProps:{type:Object,default:()=>({})},
})
const emit = defineEmits(["update:modelValue","filter"])

const {t} = useI18n()
const innerValue = ref(props.modelValue)

function filterFn(val, update, abort){
    emit("filter", val, update, abort);
}

function optionsi18nLabel(option){
    if(option.i18nLabel){
        option.label = t(option.i18nLabel)
    }
    return option.label
}

watch(innerValue, newValue=>{
    emit("update:modelValue", newValue);
})

watchEffect(()=>{
    if(props.qProps.options){
        for(let option of props.qProps.options){
            optionsi18nLabel(option)
        }
    }
    innerValue.value = props.modelValue

})
</script>