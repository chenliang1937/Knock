/**
 * Action 就是 View 发出的通知，表示 State 应该要发生变化了
 * Action 是一个对象。其中的type属性是必须的，表示 Action 的名称
 * 
 * Action Creator
 * View 要发送多少种消息，就会有多少种 Action
 * 定义一个函数来生成 Action，这个函数就叫 Action Creator
 */
import * as types from "../constants/ActionTypes";

export function requestArticleList(
  isRefreshing,
  loading,
  typeId,
  isLoadMore,
  page = 1
) {
  return {
    type: types.REQUEST_ARTICLE_LIST,
    isRefreshing,
    loading,
    isLoadMore,
    typeId,
    page
  };
}

export function fetchArticleList(isRefreshing, loading, isLoadMore = false) {
  return {
    type: types.FETCH_ARTICLE_LIST,
    isRefreshing,
    loading,
    isLoadMore
  };
}

export function receiveArticleList(articleList, typeId) {
  return {
    type: types.RECEIVE_ARTICLE_LIST,
    articleList,
    typeId
  };
}
