<template>
    <!-- 普通输入框:text -->
    <q-input v-if="dmType == 'text'" v-bind="qProps" v-model.trim="innerValue" :label="i18nLabel?$t(i18nLabel):dmLabel" >
        <template v-if="dmAppend==ConfigDict.dmInputAppendRequired" #append>
            <q-icon size="0.8rem" name="tag"></q-icon>
            <span style="font-size:0.8rem">{{ $t("msgRequired") }}</span>
        </template>
        <template v-else-if="dmAppend==ConfigDict.dmInputAppendQuery" #append>
            <q-icon size="0.8rem" name="search"></q-icon>
        </template>
        <template v-else #append>
            <!--no -->
        </template>
    </q-input>


<!-- 普通选择框:select -->
<q-select v-if="dmType=='select'" v-bind="qProps" v-model.trim="innerValue" :label="i18nLabel?$t(i18nLabel):dmLabel" emit-value map-options>
    <template #no-option>
        <q-item>
            <q-item-section class="text-grey">{{ $t("msgNoData") }}</q-item-section>
        </q-item>
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

<script setup>
import { useI18n } from 'vue-i18n';
import { computed,ref,watch,watchEffect } from 'vue';
import { ConfigDict } from 'src/base/settings';

const {t} = useI18n();
const emit = defineEmits(["update:modelValue","filter"])
const props = defineProps({
    qProps:{type:Object},
    modelValue:{required:true},
    i18nLabel:{type:String,default:""},
    dmType:{type:String,default:"text"},
    dmAppend:{type:Number,default:null},
});

const dmLabel = props.i18nLabel ? t(props.i18nLabel) : props.qProps.label 
const innerValue = ref(props.modelValue)


watch(innerValue,newValue=>{
    emit("update:modelValue", newValue);
});

watchEffect(()=>{
    innerValue.value = props.modelValue;
});



function optionsi18nLabel(opt){
    if(opt.i18nLabel){
        opt.label = t(opt.i18nLabel)
    }
    return opt.label
}


</script>