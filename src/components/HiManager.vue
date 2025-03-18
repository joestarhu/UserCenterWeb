<template>
    <div v-show="!show">
        <!-- 显示详情的视线,列表内容隐藏 -->
        <slot name="list"></slot>
    </div>
    <div v-if="show">
        <!-- 回退按钮 -->
        <q-btn no-caps dense flat :icon="HiBtnObj.back.icon"  @click="btnClick(HiBtnObj.back.id)">{{ $t(title) }}</q-btn>
        <div class="q-mt-sm">
            <slot name="detail"></slot>
        </div>
    </div>

</template>


<script setup lang="js">
import { computed } from 'vue';
import { HiBtnObj } from 'src/base/settings';

const emit = defineEmits(["click"])
const props = defineProps({
    title:{type:String,Required:true, default:"msgBack"},
    showDetail:{type:Boolean,Required:true,default:false},
})

let show = computed(()=>{
    return props.showDetail
})

function btnClick(btnID){
    emit("click",btnID)
}

</script>
