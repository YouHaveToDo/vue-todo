<template>
  <div>
    <ul>
      <!-- 반복문 -->
      <li
        class="shadow"
        v-for="(todoItem, index) in this.$store.state.todoItems"
        v-bind:key="todoItem.item"
      >
        <i
          class="checkBtn"
          v-on:click="toggleComplete(todoItem, index)"
          v-bind:class="{ checkBtnCompleted: todoItem.completed }"
          >체크버튼</i
        >
        <span v-bind:class="{ textCompleted: todoItem.completed }">
          {{ todoItem.item }}
        </span>

        <span class="removeBtn" v-on:click="removeTodo(todoItem, index)">
          <i> -- </i>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  methods: {
    removeTodo(todoItem, index) {
      this.$store.commit("removeOneItem", { todoItem, index });
    },
    toggleComplete(todoItem, index) {
      this.$store.commit("toggleOneItem", { todoItem, index });
    },
  },
};
</script>

<style scoped>
ul {
  list-style-type: none;
  padding-left: 0px;
  margin-top: 0;
  text-align: left;
}
li {
  display: flex;
  min-height: 50px;
  height: 50px;
  line-height: 50px;
  margin: 0.5rem 0;
  padding: 0 0.9rem;
  background: white;
  border-radius: 5px;
}
.checkBtn {
  line-height: 45px;
  color: #62acde;
  margin-right: 5px;
}
.checkBtnCompleted {
  color: #b3adad;
}
.textCompleted {
  text-decoration: line-through;
  color: #b3adad;
}
.removeBtn {
  margin-left: auto;
  color: #de4343;
}
</style>
