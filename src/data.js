import {reactive,toRefs,computed} from 'vue'
import {trim} from 'lodash'
// 两个数组数据移动
Array.prototype.move = function (index,targetArray,targetArrayIndex = targetArray.length ) {
  const targetItem = this.splice(index,1)
  targetArray.splice(targetArrayIndex,0,...targetItem)
}
const defaultNoFinishedEventList = [
  {
    name:"master分支修改aaaaaaaaaaaaaa",
    isEdit:false
  },
  {
    name:"逛街",
    isEdit:false
  },
  {
    name:"画画",
    isEdit:false
  }
]
const defaultCompletedEventList= [
  {
    name:"打一局游戏"
  }
]

export const useEventList = ()=>{
  const eventList = reactive({
    notFinishedEventList:defaultNoFinishedEventList,
    completedEventList:defaultCompletedEventList,
    isCompleted:computed(()=>!eventList.completedEventList.length),
    isNotFinished:computed(()=>!eventList.notFinishedEventList.length)
  })
  const operationAggregate = {
    removeEvent(index){
      eventList.completedEventList.splice(index,1)
    },
    addEvent(beforeAddEventName){
      if (trim(beforeAddEventName)==="") {
        return;
      }
      const addedTargetEvent = Object.create({
        name:beforeAddEventName,
        isEdit:true
      });
      eventList.notFinishedEventList.push(addedTargetEvent)
    },
    editEvent(index,newVal){
      if (newVal){
        eventList.notFinishedEventList[index] = newVal
        return;
      }
      // 避免多修改一次变量的性能开销，放置最后
      eventList.notFinishedEventList[index].isEdit = true
    }
  }
  return Object.assign(toRefs(eventList),operationAggregate);
}

export const useInputEventName = ()=>{
  const inputEventName = reactive({
    eventName:""
  })
  const operationAggregate = {
    resetEventName(){
      inputEventName.eventName=""
    }
  }
  return Object.assign(toRefs(inputEventName),operationAggregate);
}
