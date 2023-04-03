<template>
  <div class="low-code-form">
    <div class="mian">
      <form action="" @drop="drop" @dragover="dragover"></form>
    </div>
    <div class="config">
      <div
        class="item"
        v-for="(item, index) in formConfItems"
        :key="index"
        :data-tag="item.tag"
        @dragstart="dragstart"
        draggable="true"
      >
        {{ item.name }} :
        <div class="item-input"><input type="text" v-model="item.label" /></div>
      </div>
      <button @click="asd">123</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
const formItems = reactive([
  {
    label: "输入框",
    type: "text",
  },
]);

const formConfItems = reactive([
  { tag: "text", name: "输入框", label: "输入框", type: "text" },
  { tag: "password", name: "密码框", label: "密码框", type: "password" },
]);
const asd = () => {
  console.log("asd", formConfItems);
};
const dragstart = (e: any) => {
  e.dataTransfer.setData("tag", e.target.dataset.tag);
  console.log("dragstart", e.target.dataset.tag);
};
const drop = (e: any) => {
  const tag = e.dataTransfer.getData("tag");
  console.log("drop", tag);
};
const dragover = (e: any) => {
  e.preventDefault();
  e.stopPropagation();
};
</script>

<style scoped lang="scss">
$fontSize: 16px;
.low-code-form {
  display: flex;
  height: 100%;
  .item-input {
    width: 100%;
    box-sizing: border-box;
    border: solid 1px #ccc;
    position: relative;
    input {
      position: absolute;
      top: 0;
      left: 0;
      text-align: left;
    }
  }
  input {
    width: 100%;
    height: 100%;
    border: none;
    background: none;
    text-align: center;
    font-size: $fontSize;

    &:focus {
      outline: none;
    }
  }
  .mian {
    flex: 1;
    border: solid 1px #ccc;
    margin-right: 5px;
    box-shadow: 5px 0px 5px 1px #ccc;
    form{
        width: 100%;
        height: 100%;
    }
  }
  .config {
    box-sizing: border-box;
    border: solid 1px #ccc;
    width: 200px;
    margin-right: 5px;
    box-shadow: 5px 0px 5px 1px #ccc;
    .item {
      box-sizing: border-box;
      border: solid 1px #000;
      width: calc(100% - 10px);
      margin: 5px;
      box-shadow: 5px 5px 5px 1px #ccc;
      display: flex;
      > div {
        flex: 1;
      }
    }
  }
}
</style>