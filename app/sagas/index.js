/**
 * 一个 task 就像是一个在后台运行的进程。
 * 在基于 redux-saga 的应用程序中，可以同时运行多个 task。通过 fork 函数来创建 task
 */
import { all, fork } from "redux-saga/effects";

import { watchRequestTypeList } from "./category";
import { watchRequestArticleList } from "./read";

export default function* rootSaga() {
  yield all([fork(watchRequestTypeList), fork(watchRequestArticleList)]);
}
