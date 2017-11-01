/**
 * Generator 函数
 *    最大特点就是可以交出函数的执行权（即暂停执行）
 *    Generator函数不同于普通函数，是可以暂停执行的，所以函数名之前要加星号，以示区别
 *    异步操作需要暂停的地方，都用 yield 语句注明
 * 
 * redux-saga
 *    1.集中处理 redux 副作用问题
 *    2.被实现为 generator
 *    3.watch/worker（监听->执行） 的工作形式
 * Effects
 *    在 redux-saga 的世界里，Sagas 都用 Generator 函数实现。我们从 Generator 里 yield 纯 JavaScript 对象以表达 Saga 逻辑。 我们称呼那些对象为 Effect
 *    可以把 Effect 看作是发送给 middleware 的指令以执行某些操作（调用某些异步函数，发起一个 action 到 store）
 *    take/put/call/apply/cps/fork/join/cancel/select
 *    call(fn, ...args):
 *        创建一条 Effect 描述信息，指示 middleware 调用 fn 函数并以 args 为参数
 *    put(action):
 *        创建一条 Effect 描述信息，指示 middleware 发起一个 action 到 Store
 *    take(pattern):
 *        创建一条 Effect 描述信息，指示 middleware 等待 Store 上指定的 action。 Generator 会暂停，直到一个与 pattern 匹配的 action 被发起
 *    fork(fn, ...args):
 *        创建一条 Effect 描述信息，指示 middleware 以 无阻塞调用 方式执行 fn
 */
import { put, take, call, fork } from "redux-saga/effects";

import * as types from "../constants/ActionTypes";
import ToastUtil from "../utils/ToastUtil";
import RequestUtil from "../utils/RequestUtil";
import { WEXIN_ARTICLE_LIST } from "../constants/Urls";
import { fetchArticleList, receiveArticleList } from "../actions/read";

export function* requestArticleList(
  isRefreshing,
  loading,
  typeId,
  isLoadMore,
  page
) {
  try {
    yield put(fetchArticleList(isRefreshing, loading, isLoadMore));
    const articleList = yield call(
      RequestUtil.request,
      `${WEXIN_ARTICLE_LIST}?typeId=${typeId}&page=${page}`,
      "get"
    );
    yield put(
      receiveArticleList(
        articleList.showapi_res_body.pagebean.contentlist,
        typeId
      )
    );
    const errorMessage = articleList.showapi_res_error;
    if (errorMessage && errorMessage !== "") {
      yield ToastUtil.showShort(errorMessage);
    }
  } catch (error) {
    yield put(receiveArticleList([], typeId));
    ToastUtil.showShort("网络发生错误，请重试");
  }
}

export function* watchRequestArticleList() {
  while (true) {
    const { isRefreshing, loading, typeId, isLoadMore, page } = yield take(
      types.REQUEST_ARTICLE_LIST
    );
    yield fork(
      requestArticleList,
      isRefreshing,
      loading,
      typeId,
      isLoadMore,
      page
    );
  }
}
