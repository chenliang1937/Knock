/**
 * API
 *  Store:
 *        保存数据的地方，你可以把它看成一个容器。整个应用只能有一个 Store
 *        Redux 提供createStore这个函数，用来生成 Store
 *  State:
 *        Store对象包含所有数据。如果想得到某个时点的数据，就要对 Store 生成快照。这种时点的数据集合，就叫做 State
 *        当前时刻的 State，可以通过store.getState()拿到
 *        Redux 规定， 一个 State 对应一个 View
 *  Action:
 *        Action 就是 View 发出的通知，表示 State 应该要发生变化了
 *  Action Creator:
 *        View 要发送多少种消息，就会有多少种 Action
 *        定义一个函数来生成 Action，这个函数就叫 Action Creator
 *  store.dispatch():
 *        store.dispatch()是 View 发出 Action 的唯一方法
 *  Reducer:
 *        Store 收到 Action 以后，必须给出一个新的 State，这样 View 才会发生变化。这种 State 的计算过程就叫做 Reducer
 *        Reducer 是一个函数，它接受 Action 和当前 State 作为参数，返回一个新的 State。
 *  纯函数:
 *        Reducer 函数最重要的特征是，它是一个纯函数。也就是说，只要是同样的输入，必定得到同样的输出
 *        由于 Reducer 是纯函数，就可以保证同样的State，必定得到同样的 View
 *        但也正因为这一点，Reducer 函数里面不能改变 State，必须返回一个全新的对象
 * store.subscribe():
 *        Store 允许使用store.subscribe方法设置监听函数，一旦 State 发生变化，就自动执行这个函数
 *        显然，只要把 View 的更新函数（对于 React 项目，就是组件的render方法或setState方法）放入listen，就会实现 View 的自动渲染
 * 
 * Redux工作流程
 *    1.首先，用户发出 Action
 *      store.dispatch(action);
 *    2.然后，Store 自动调用 Reducer，并且传入两个参数：当前 State 和收到的 Action。 Reducer 会返回新的 State 。
 *      let nextState = todoApp(previousState, action);
 *    3.State 一旦有变化，Store 就会调用监听函数。
 *      store.subscribe(listener);
 *    4.listener可以通过store.getState()得到当前状态。如果使用的是 React，这时可以触发重新渲染 View。
 *      function listerner() {
 *        let newState = store.getState();
 *        component.setState(newState);   
 *      }
 * 
 * Reducer 的拆分
 *  Redux 提供了一个combineReducers方法，用于 Reducer 的拆分。你只要定义各个子 Reducer 函数，然后用这个方法，将它们合成一个大的 Reducer
 */
import { combineReducers } from "redux";
import read from "./read";
import category from "./category";

const rootReducer = combineReducers({
  read,
  category
});

export default rootReducer;
