<template>
<div v-show="!show">
    <slot name="list"></slot>
</div>
<div v-if="show">
    <q-btn no-caps dense flat :icon="DMBTN.back.icon"  @click="btnClick(DMBTN.back.id)">{{ $t(title) }}</q-btn>

    <!-- <q-card flat class="q-mt-sm" style="border-radius: 10px;" bordered>
        <q-card-section>
            <slot name="detail"></slot>
        </q-card-section>
    </q-card> -->
    <div class="q-mt-sm">
        <slot name="detail"></slot>
    </div>
</div>
</template>

<script setup lang="js">
import { DMBTN } from 'src/base/settings';
import { computed } from 'vue';


const emit = defineEmits(["click"])
const props = defineProps({
    title:{type:String, Required:true, default:"msgBack"},
    showDetail:{type:Boolean, Required:true, default:false}
})

let show = computed(()=>{
    return props.showDetail
})

function btnClick(btnID){
    emit("click",btnID)
}
</script>