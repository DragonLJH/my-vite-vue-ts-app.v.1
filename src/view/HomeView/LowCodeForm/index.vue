<template>
  <div class="low-code-form">
    <div class="config">
      <div class="item" v-for="([name, item], index) in Object.entries(formConfItems)" :key="index" :data-name="name"
        @dragstart="dragstart" draggable="true">
        {{ kv.get(item.type) }}
      </div>
      <button @click="asd">123</button>
      <div v-for="(item, index) in mould.data" :key="index">
        <div>{{ item.title }}</div>
      </div>
    </div>
    <div class="mian" @click=" setUpClick(-1)">
      <form :action="targetForm.action" @drop="drop" @dragover="dragover">
        <draggable :list="targetForm.data" chosenClass="chosen" handle=".setUp" draggable=".form-item"
          forceFallback="true" group="people" animation="1000" @start="onStart" @end="onEnd" item-key="id">
          <template #item="{ element, index }: { element: formConfVProps, index: number }">
            <div class="form-item" :key=" index ">
              <div>{{ element.label }}</div>
              <div><input :type=" element.type " v-model=" element.value "></div>
              <span class="setUp" @click.stop="setUpClick(index)">设置</span>
            </div>
          </template>
          <!-- <transition-group>
            <div class="form-item" v-for="(item, index) in targetForm.data" :key="index">
              <div>{{ item.label }}</div>
              <div><input :type="item.type" v-model="item.value"></div>
              <span class="setUp" @click.stop="setUpClick(index)">设置</span>
            </div>
          </transition-group> -->
        </draggable>

      </form>
    </div>
    <div class="config" v-if=" activeIndex != -1 ">
      <div>
        label: <input type="text" v-model=" targetForm.data[activeIndex].label ">
      </div>
      <div>
        name: <input type="text" v-model=" targetForm.data[activeIndex].name ">
      </div>
      {{ targetForm.data[activeIndex] }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, computed, ref, onMounted } from "vue";
import draggable from 'vuedraggable'
import { getMergeUrl } from '@/utils/fetchUtils';

type FCVProps = "label" | "type" | "name" | "value" | "id"
type formConfVProps = {
  [k in FCVProps]: string;
}
type mouldDataValueProps = {
  id: number,
  idStr?: string,
  label: string,
  name: string,
  type: string,
  value: string,
}
type mouldDataProps = {
  title: string,
  value: unknown | Array<mouldDataValueProps>
}




let id = 0
const activeIndex = ref(-1)

const targetItem = reactive({} as formConfVProps)
const targetForm = reactive({
  action: "",
  data: [] as unknown as Array<formConfVProps>
})
const drag = ref(false)

const mould = reactive({
  data: [] as Array<mouldDataProps>
})

const kv = new Map()
kv.set("text", "输入框")
kv.set("password", "密码框")

const formConfItems = reactive({
  "text": { label: "label", type: "text", name: "", value: "", id: "" },
  "password": { label: "label", type: "password", name: "", value: "", id: "" },
} as { [K: string]: formConfVProps });

const asd = () => {
  console.log("asd", targetForm);
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
const onStart = function () {
  drag.value = true;
}
//拖拽结束事件
const onEnd = function () {
  drag.value = false;
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
  targetForm.data.push({ ...newObj })

};
const dragover = (e: any) => {
  e.preventDefault();
  e.stopPropagation();
};


onMounted(async () => {
  let data = {
    userPhone: "18022429170",
  }
  const url = getMergeUrl("/formConfig/queryFormConfigByUserPhone", data)
  let response = await fetch(url, {
    mode: "cors",
    credentials: "include"
  });
  response.json().then(res => {
    mould.data = Object.entries(res).map(([k, v]) => {
      return {
        title: k,
        value: v
      }
    })
  })
})
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

    .setUp {
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

      .setUp {
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