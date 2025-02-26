<template>
    <q-expansion-item class="overflow-hidden q-mx-xs q-my-xs hi-menu" active-class="hi-menu-active" :icon="icon"
        :label="$t(i18nlabel)" :to="to" :hide-expand-icon="!children">
        <q-list>
            <q-expansion-item class="overflow-hidden hi-menu" active-class="hi-menu-active" v-for="obj of children"
                :key="obj" :label="$t(obj.i18nlabel)" :to="obj.to" hide-expand-icon :header-inset-level="1" />
        </q-list>
    </q-expansion-item>
</template>

<script setup lang="js">
const props = defineProps({
    // 标题
    i18nlabel: { type: String, required: true },
    // 图标
    icon: { type: String, default: "widgets" },
    // 跳转路由链接:未实现
    to: { type: String },
    // 子菜单
    children: { type: Object, default: null },
})
</script>

<style lang="scss">
.hi-menu {
    border-radius: 10px 10px 10px 10px;
}

.hi-menu-active {
    background-color:$primary;
    border-radius: 10px;
    color: #FFF;
    font-weight: 800;
}
</style>