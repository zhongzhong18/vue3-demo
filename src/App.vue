<template>
<div>
  <h1>事件清单</h1>
  <input type="text" placeholder="你还要干什么？" v-model="eventName">
  <button @click="addEventHandle">提交</button>
  <hr>
  <h2 ref="h3Ref">未完成事件</h2>
  <ul>
    <li v-for="(item,index) in notFinishedEventList">
      <!-- BUG:为什么span标签会一直显示，这里已经绑定了值v-show -->
      <span v-show="!item.isEdit">
        {{item.name}}
      </span>
      <input type="text" v-show="item.isEdit" :value="item.name" :ref="PREEDITINPUTNAME+index">
      <button @click="completedEventHandle(index)" v-show="!item.isEdit">已完成</button>
      <button @click="editEventHandle(index)" v-show="!item.isEdit">修改</button>
      <button @click="resolveeEditHandle(index,PREEDITINPUTNAME+index)" v-show="item.isEdit">确定</button>
      <button @click="rejectEditEventHandle(index)" v-show="item.isEdit">取消</button>
    </li>
  <h3 v-show="isNotFinished">当前暂无未完成事件</h3>
  </ul>
  <hr>
  <h2>已完成事件</h2>
  <ul>
    <li v-for="(item,index) in completedEventList">
      {{item.name}}
      <button @click="noFinishedEventHandle(index)">未完成</button>
      <button @click="removeEventHandle(index)">删除事件</button>
    </li>
    <h3 v-show="isCompleted">当前暂无已完成事件</h3>
  </ul>
</div>
</template>

<script>
import { ref,effect,computed,reactive,$refs } from 'vue'
import {useEventList,useInputEventName} from './data'
export default {
  setup(props,ctx) {
    const {notFinishedEventList,completedEventList,addEvent,removeEvent,editEvent,isCompleted,isNotFinished} = useEventList();
    const {eventName,resetEventName} = useInputEventName();
    //不算是BUG:暂未找到获取动态创建ref的方法，暂时维护一个对象来创建静态refName
    const PREEDITINPUTNAME = "editInput"
    const refNames = Object.create(null);
    notFinishedEventList.value.forEach((eventItem,index)=>{
      refNames[`${PREEDITINPUTNAME}${index}`]=ref(null)
      })


      console.log(ref(null))
    // 添加
    const addEventHandle = ()=>{
      addEvent(eventName.value);
      resetEventName();
    }
    // 删除
    const removeEventHandle = (index)=>{
      removeEvent(index)
    }
    // 已完成
    const completedEventHandle = (index)=>{
      notFinishedEventList.value.move(index,completedEventList.value)
    }
    // 未完成
    const noFinishedEventHandle = (index)=>{
      completedEventList.value.move(index,notFinishedEventList.value)
    }
    // 触发修改
    const editEventHandle = (index)=>{
      editEvent(index)
    }
    // 确定修改
    const resolveeEditHandle = (index,$refName)=>{
      // refNames[$refName].value :input.value
      const newEventName = refNames[$refName].value.value;
      editEvent(index,{
        name:newEventName,
        isEdit:false
      });
    }
    // 取消修改
    const rejectEditEventHandle = (index)=>{
      // BUG：input标签明明已经绑定了item.name,但是在取消修改后却还是上次输入的值
      notFinishedEventList.value[index].isEdit = false
    }
    return {
      eventName,
      notFinishedEventList,
      addEventHandle,
      completedEventHandle,
      noFinishedEventHandle,
      completedEventList,
      isCompleted,
      isNotFinished,
      removeEventHandle,
      editEventHandle,
      resolveeEditHandle,
      rejectEditEventHandle,
      PREEDITINPUTNAME,
      ...refNames
    }
  }
}
</script>

<style scoped>
img {
  width: 200px;
}
h1 {
  font-family: Arial, Helvetica, sans-serif;
}
</style>
