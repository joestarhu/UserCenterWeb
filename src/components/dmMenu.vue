<template>
<q-expansion-item class="overflow-hidden" active-class="dm-menu-active" :icon="icon"  :label="$t(label)" :to="to" :hide-expand-icon="!children">
    <q-list>
        <q-expansion-item class="overflow-hidden dm-menu" active-class="dm-menu-active"
        v-for="obj of children" :key="obj" :label="$t(obj.label)" :to="obj.to" hide-expand-icon :header-inset-level="1"/>
    </q-list>
</q-expansion-item>
</template>

<script setup lang="js">
let props = defineProps({
        // 标题
        label: { type: String, required: true },
        // 图标
        icon: { type: String, default: "widgets" },
        // 跳转路由链接:未实现
        to: { type: String },
        // 子菜单
        children: { type: Object, default: null },    
})
</script>

<style>
.dm-menu{
    border-radius: 0px 0px 0px 0px;
}

.dm-menu:hover{
    background-image:linear-gradient(-90deg,#8D91FF 20%, #666DFF 50%);
    border-radius: 1px;
    color: #FFF;
    font-weight: 800;
}

.dm-menu-active {
    background-image:linear-gradient(-90deg,#8D91FF 20%, #666DFF 100%);
    border-radius: 1px;
    color: #FFF;
    font-weight: 800;
} 

</style>