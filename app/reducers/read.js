/**
 * Reducer
 *    Store 收到 Action 以后，必须给出一个新的 State，这样 View 才会发生变化。这种 State 的计算过程就叫做 Reducer
 *    Reducer 是一个函数，它接受 Action 和当前 State 作为参数，返回一个新的 State
 *    整个应用的初始状态，可以作为 State 的默认值
 *    实际应用中，store.dispatch方法会触发 Reducer 的自动执行。为此，Store 需要知道 Reducer 函数，做法就是在生成 Store 的时候，将 Reducer 传入createStore方法
 *    由于 Reducer 是纯函数，就可以保证同样的State，必定得到同样的 View。但也正因为这一点，Reducer 函数里面不能改变 State，必须返回一个全新的对象
 */
import * as types from "../constants/ActionTypes";

const initialState = {
  isRefreshing: false,
  loading: false,
  isLoadMore: false,
  noMore: false,
  articleList: {}
};

export default function read(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_ARTICLE_LIST:
      return Object.assign({}, state, {
        isRefreshing: action.isRefreshing,
        loading: action.loading,
        isLoadMore: action.isLoadMore
      });
    case types.RECEIVE_ARTICLE_LIST:
      return Object.assign({}, state, {
        isRefreshing: false,
        isLoadMore: false,
        noMore: action.articleList.length === 0,
        articleList: state.isLoadMore
          ? loadMore(state, action)
          : combine(state, action),
        loading: state.articleList[action.typeId] === undefined
      });
    default:
      return state;
  }
}

function combine(state, action) {
  state.articleList[action.typeId] = action.articleList;
  return state.articleList;
}

function loadMore(state, action) {
  state.articleList[action.typeId] = concatFilterDuplicate(
    state.articleList[action.typeId],
    action.articleList
  );
  return state.articleList;
}

/**
 * filter duplicate data when loading more.
*/
function concatFilterDuplicate(list1, list2) {
  const set = new Set(list1.map(item => item.id));
  const filterList2 = [];
  const length = list2.length;
  for (let i = 0; i < length; i++) {
    if (!set.has(list2[i].id)) {
      filterList2.push(list2[i]);
    }
  }
  return list1.concat(filterList2);
}
