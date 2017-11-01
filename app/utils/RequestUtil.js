/**
 * Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件 (通常是一个异步操作)的结果
 * 从语法上说，Promise是一个对象，从它可以获取异步操作的消息
 * 1.对象的状态不受外界影响。Promise对象代表一个异步操作，有三种状态：Pending(进行中)、Resolved(已完成)和Rejected(已失败)
 * 2.一旦状态改变，就不会再变，任何时候都可以得到这个结果
 * Promise实例生成以后，可以用then方法分别制定Resolved状态和Rejected状态的回调函数
 */
import getUrl from "./UrlUtil";

const request = (url, method, body) => {
  let isOk;
  return new Promise((resolve, reject) => {
    fetch(getUrl(url), {
      method,
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      },
      body
    })
      .then(response => {
        if (response.ok) {
          isOk = true;
        } else {
          isOk = false;
        }
        return response.json();
      })
      .then(responseData => {
        if (isOk) {
          resolve(responseData);
        } else {
          reject(responseData);
        }
      })
      .catch(error => {
        reject(error);
      });
  });
};

export default {
  request
};
