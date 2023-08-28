<script setup lang="js">
import { ref } from "vue";
import Child from "./Child.vue"
import {
    Check,
    Delete,
    Edit,
    Message,
    Search,
    Star,
} from '@element-plus/icons-vue'
import HintButton from "./HintButton.vue";

const rawHtml = "<span style='color: green;'>raw html</span>";

const money = ref(0)

const count = ref(11);

const click = (p1, p2, ee) => {
    console.log("click on child");
    console.log(p1, p2, ee);
}

const helloCallback = p1 => {
    console.log("helloCallback");
    console.log("parent callback:", p1);
}

const handelUpdateModelValue = (num) => {
    console.log("handelUpdateModelValue");
    count.value = num
}

const pageNo = ref(1);
const pageSize = ref(10);


const mm = ref(10);
const child = ref(); // 变量名必须和 child 组件 ref 属性一致

defineExpose({
    mm
});

import { provide } from "vue";
provide("key1", ref("key1-value"));


</script>

<template>
    <div class="box1">
        <h1>parent</h1>

        <p v-html="rawHtml"></p>

        <!-- 
            在标签中, 设置属性 (在子组件中通过 props 获取, 子组件标签中可省略 props 直接通过属性名获取值)
            - xxx="yyy" 普通属性, 只能是固定值
            - :xxx="yyy" 绑定变量 yyy 可以是变量 (是 v-bind:xxx="yyy" 的简写) 
                :="yyyObject" (v-bind="yyyObject" 简写), 一次绑定多个属性
                :[dynamicVariable]="xxx" dynamicVariable 是一个变量, 最终的取值决定绑定的属性名字
                    动态参数可以是 "" 或者 null , null 即取消绑定
                    动态参数不能存在空格 如 :['foo' + bar] 会触发警告

                    当使用 DOM 内嵌模板 (直接写在 HTML 文件里的模板) 时，我们需要避免在名称中使用大写字母，因为浏览器会强制将其转换为小写
                    单文件组件内的模板不受此限制。
            
            布尔型 Attribute:
            如果变量值为 true/"" , 则该布尔属性会保留在标签上, 否则该属性会被忽略

            监听事件:
            原生 dom 事件绑定: @click, v-on:click="" 的简写
                @[dynamicEventName]="" 绑定动态事件监听
                传递 event 必须用 "$event"
            自定义事件 @xxx=""


            v-model 使用在自定义组件:
                - 等价 -> 给son传递 props[modelValue] = count, 同时给子组件爱你绑定了自定义事件 update:modelValue
                (
                    :modelValue="count" @update:modelValue="handelUpdateModelValue"
                    等价
                    v-model="count"
                )

                - 另一种写法 v-model:xxx="xxx" v-model:yyy="yyy" 绑定多个 v-model
                    :xxx 为 model 种属性的名字
                    ="" 为绑定的变量
         -->
        <Child v-model="count" v-model:pageNo="pageNo" v-model:pageSize="pageSize" msg="hello" :money=100
            @click="click(1, 2, $event)" @hello="helloCallback" ref="child"
            :items="items"
        >
            <!-- 
                子组件内的 slot 标签被替换成这里内容
             -->
            hello slot

            <template v-slot:aa>
                named slot aa
            </template>
            <template #bb>
                named slot bb
            </template>
            
        </Child>

        <div>

            parent count = {{ count }}
            <button @click="count++">add</button>

        </div>

        <div>
            <el-button type="primary" size="small" :icon="Edit">hello</el-button>
            <HintButton title="Hello" type="primary" size="small" :icon="Edit">hello</HintButton>
        </div>

        <div>
            parent money = {{ mm }}
            <button @click="() => {
                mm++;
                // 不需要 child.value..., 自动解包了
                child.mm--;
            }">borrow 1 yuan from son</button>
        </div>


    </div>
</template>

<style scoped>
.box1 {

    max-width: 500px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background-color: hotpink;
}
</style>