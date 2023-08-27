<template>
    <div class="grand">
        <h3>grand child</h3>
        inject value: {{ value }}
    </div>
</template>

<script setup>
import { inject } from "vue";

const value  = inject("key1")

</script>

<style lang="css" scoped>
.grand {
    background-color: red;
}
</style>