<template>
    <div class="box">
        <h2> child
        </h2>

        <div>
            msg = {{ props.msg }} (get value by props.xxx, 插入文本)
        </div>

        <div>
            son money = {{ money }} (get value by xxx directly)
            <!-- 
            the props from parent is read only, 
            which means it is not allowed to be edited
         -->
            <button @click="updateMoney">update money(failed, since the props is readonly)</button>
        </div>



        <div>
            <button @click="triggerCustomizedEvent">trigger customized event</button>

        </div>


        <!-- 
            这种方式只能修改son自身的值, 无法反应到 parent 上
         -->
        <!-- 
            <div @click="modelValue++">
                son count = {{ modelValue }}
            </div>
         -->
        <!-- 应该使用这种 -->
        <div>
            son count = {{ modelValue }}
            <button @click="handleClickAddSonCount">add</button>
        </div>

        <div>
            son money = {{ mm }}
            <button @click="() => {
                mm++;
                // $parent 特殊变量, 表示父组件代理对象
                $parent.mm--;

            }">borrow 1 yuan from parent</button>
        </div>

        <!-- 
            作用域slot 只能单独使用, 同时存在多个 template 会报错
         -->
        <GrandChild :items="items">
            <template v-slot="{ $id, $name, $done }">
                <p :style="{
                    color: $done ? 'green': 'black'
                }">
                    {{ $name }} -- {{ $done }}
                </p>
            </template>
            
        </GrandChild>
        <div>
            inject value: {{ value }}

        </div>

        <div>
            test pinia: {{ infoStore.count }} --- getter: {{ infoStore.total }}
            <button @click="testPiniaAdd">add</button>
            <button @click="testPiniaMinus">minus</button>
        </div>
        <div>
            test pinia (another way): {{ todoStore.todos[0].id }} --- getter: {{ todoStore.total }}
            <button @click="() => todoStore.addId()">add</button>
        </div>


        <div>
            <h2>slot 插槽</h2>
            <slot></slot>
            <hr>
            <slot name="aa"></slot>
            <hr>
            <slot name="bb"></slot>


            <hr>
            

        </div>

    </div>
</template>

<script setup lang="js">
import { ref } from 'vue';
import GrandChild from './GrandChild.vue'

const props = defineProps([
    "msg", "money", "modelValue"
]);

const emit = defineEmits([
    "hello", "update:modelValue"
]);

const updateMoney = () => {
    console.log("updateMoney");
    props.money = 200
}

const triggerCustomizedEvent = () => {
    console.log("triggerCustomizedEvent");

    emit("hello", "hello param");
}

const handleClickAddSonCount = () => {

    emit(
        "update:modelValue",
        props.modelValue + 100 // 这里不是修改 props, 是回传了一个新的值
    );
}

const mm = ref(100);

defineExpose({
    mm
})

import { inject } from "vue";
const value = inject("key1");

import useInfoStore from "../store/modules/info";
const infoStore = useInfoStore();
const testPiniaAdd = () => {
    infoStore.addCount();
}
function testPiniaMinus() {
    infoStore.minusCount();
}


import useTodoStore from "../store/modules/todo";
const todoStore = useTodoStore()


const items = ref([
    {
        id: 1,
        name: 'sleep',
        done: true
    },{
        id: 2,
        name: 'eatl',
        done: false
    }
])


</script>

<style scoped>
.box {

    display: flex;
    flex-direction: column;
    align-items: flex-start;

    background-color: yellowgreen;
}

div {
    border-bottom: 1px solid gray;
}
</style>