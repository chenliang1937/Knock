import _ from "lodash";

export const getArticleList = list =>
  list === undefined ? [] : removeExpiredItem(list);

export const removeExpiredItem = list => {
  // _.remove(array, [predicate=_.identity], [thisArg])
  // 移除数组 array 中满足 predicate 条件的所有元素 ，返回的是被移除元素数组.
  _.remove(list, item => item.expire);
  return list || [];
};

export const getTypeName = (typeList, typeId) =>
  // _.first(array) 别名_.head
  // 获取数组 array的第一个元素
  _.head(_.filter(typeList, o => o.id === typeId.toString())).name;
