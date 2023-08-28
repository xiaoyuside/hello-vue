import { defineStore } from "pinia";
import { ref, computed } from "vue";

const todoStore = defineStore("todo", () => {
    const todos = ref([{
        id: 0,
        title: 'hello todo'
    }])

    function addId() {
        todos.value[0].id++;
    }

    // 复杂计算
    const total = computed(() => {
        return 111
    })

    return {
        todos,
        total,
        addId
    }
});

export default todoStore
