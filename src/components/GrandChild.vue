<template>
    <div class="grand">
        <h3>grand child</h3>
        inject value: {{ value }}
    </div>
    <div class="grand">
        <ul>
            <li v-for="item in items" :key="item.id">
                <slot :$name="item.name" :$done="item.done" :$id="item.id"></slot>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { inject } from "vue";

const value = inject("key1")

defineProps(["items"])

</script>

<style lang="css" scoped>
.grand {
    background-color: red;
}
</style>