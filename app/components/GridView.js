import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import PropTypes from "prop-types";

const propTypes = {
  items: PropTypes.array,
  renderItem: PropTypes.func,
  style: View.propTypes.style,
  itemsPerRow: PropTypes.number,
  onEndReached: PropTypes.func,
  scrollEnabled: PropTypes.func,
  pageSize: PropTypes.number
};

const GridView = ({
  items,
  renderItem,
  style,
  itemsPerRow,
  onEndReached,
  keyExtractor,
  scrollEnabled,
  pageSize
}) => {
  const groupItems = (renderItems, renderItemsPerRow) => {
    const itemsGroups = [];
    let group = [];
    renderItems.forEach(item => {
      if (group.length === renderItemsPerRow) {
        itemsGroups.push(group);
        group = [item];
      } else {
        group.push(item);
      }
    });
    if (group.length > 0) {
      itemsGroups.push(group);
    }
    return itemsGroups;
  };

  const renderGroup = group => {
    const itemViews = group.map(item => {
      const i = renderItem(item);
      return i;
    });
    return <View style={styles.group}>{itemViews}</View>;
  };

  const groups = groupItems(items, itemsPerRow);

  return (
    <FlatList
      initialNumToRender={1}
      data={groups}
      keyExtractor={keyExtractor}
      renderItem={renderGroup}
      style={style}
      onEndReached={onEndReached}
      scrollEnabled={scrollEnabled}
      pageSize={pageSize || 1}
    />
  );
};

const styles = StyleSheet.create({
  group: {
    flexDirection: "row",
    alignItems: "center"
  }
});

GridView.propTypes = propTypes;

GridView.defaultProps = {
  items: [],
  renderItem: null,
  style: undefined,
  itemsPerRow: 1,
  onEndReached: undefined
};

export default GridView;
