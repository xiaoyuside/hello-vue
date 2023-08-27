<template>
    <!-- 
        这里可以通过 attrs 取值
        也可以通过 props 取值, 但是如果 props 取值后, 就无法通过attrs来获取指定值了
     -->
    <div :title="$attrs.title">
        <el-button :="$attrs"></el-button>
        
    </div>
</template>

<script setup lang="js">
import { useAttrs } from "vue";

const $attrs = useAttrs();

</script>

<style lang="css" scoped>

</style>