import { defineStore } from "pinia";

const useInfoStore = defineStore("info", {
    //是一个函数
    // 返回 state 对象, 通过 store.xxx 取值
    state: () => {
        return {
            count: 99
        }
    },
    // 是一个对象
    //  每次加一个函数，必须重启
    // 通过 store.xxx() 调用
    actions: {
        addCount() {
            this.count++;
        },
        minusCount() {
            this.count--;
        }
    },
    // 是一个对象
    // 每次加一个 getter, 要重启
    // 使用: store.total , 就像获取属性一样
    getters: {
        total() {
            // 复杂计算
            // ...
            return 0;
        }
    }
});

export default useInfoStore;
