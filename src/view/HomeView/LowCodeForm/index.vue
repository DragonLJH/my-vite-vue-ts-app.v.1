<template>
  <div class="low-code-form">
    <div class="config">
      <div class="item" v-for="([name, item], index) in Object.entries(formConfItems)" :key="index" :data-name="name"
        @dragstart="dragstart" draggable="true">
        {{ item.mc }}
      </div>
      <button @click="asd">123</button>
    </div>
    <div class="mian" @click="setUpClick(-1)">
      <span class="set-up">设置</span>
      <form :action="targetForm.action" @drop="drop" @dragover="dragover">
        <div class="form-item" v-for="(item, index) in formItems" :key="index">
          <div>{{ item.label }}</div>
          <div><input :type="item.type" v-model="item.value"></div>
          <span class="set-up" @click.stop="setUpClick(index)">设置</span>
        </div>
      </form>
    </div>
    <div class="config" v-if="activeIndex != -1">
      <div>
        label: <input type="text" v-model="formItems[activeIndex].label">
      </div>
      <div>
        name: <input type="text" v-model="formItems[activeIndex].name">
      </div>
      {{ formItems[activeIndex] }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, computed, ref } from "vue";

type FCVProps = "mc" | "label" | "type" | "name" | "value" | "id"
type formConfVProps = {
  [k in FCVProps]: string;
}
let id = 0
const activeIndex = ref(-1)

const formItems = reactive([] as unknown as Array<formConfVProps>);
let targetItem = reactive({} as formConfVProps)
let targetForm = reactive({
  action: "#"
})

const formConfItems = reactive({
  "text": { mc: "输入框", label: "label", type: "text", name: "", value: "", id: "" },
  "password": { mc: "密码框", label: "label", type: "password", name: "", value: "", id: "" },
} as { [K: string]: formConfVProps });

const asd = () => {
  console.log("asd", formItems);
};
const setUpClick = (index: number) => {
  activeIndex.value = index
}
const inputValue = (e: any, name: string) => {
  let i: keyof formConfVProps;
  for (i in targetItem) {
    if (name === i) {
      targetItem[i] = e.target.value
      break
    }
  }
}

const dragstart = (e: any) => {
  const { name } = e.target.dataset
  e.dataTransfer.setData("name", name);
};
const drop = (e: any) => {
  const name = e.dataTransfer.getData("name") as string;
  const newObj = formConfItems[name]
  newObj.id = id + ""
  id++
  formItems.push({ ...newObj })

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
    padding-top: 24px;
    position: relative;

    .set-up {
      position: absolute;
      top: 0;
      right: 0px;
      width: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #eee;
      cursor: pointer;

      &:hover {
        box-shadow: inset 0px 0px 10px 1px #ccc;

      }
    }

    form {
      width: 100%;
      height: 100%;
    }

    .form-item {
      margin: 5px 10px;
      display: flex;
      align-items: center;
      padding-right: 50px;
      position: relative;

      >div {
        flex: 1;
        text-align: right;
        padding: 5px 20px 5px 10px;
        border: solid 1px #eee;

        &:first-child {
          background-color: #eee;
          font-weight: bold;
          color: #000;
        }
      }

      .set-up {
        height: 100%;
      }

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
      width: calc(100% - 10px);
      margin: 5px;
      padding: 5px;
      box-shadow: 0px 0px 1px 2px #ccc;
      display: flex;

      >div {
        flex: 1;
      }
    }
  }
}
</style>