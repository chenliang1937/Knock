/**
 * Action 就是 View 发出的通知，表示 State 应该要发生变化了
 * Action 是一个对象。其中的type属性是必须的，表示 Action 的名称
 * 
 * Action Creator
 * View 要发送多少种消息，就会有多少种 Action
 * 定义一个函数来生成 Action，这个函数就叫 Action Creator
 */
import * as types from "../constants/ActionTypes";

export function requestTypeList() {
  return {
    type: types.RECEIVE_TYPE_LIST
  };
}

export function fetchTypeList() {
  return {
    type: types.FETCH_TYPE_LIST
  };
}

export function receiveTypeList(typeList) {
  return {
    type: types.RECEIVE_TYPE_LIST,
    typeList
  };
}
