import React from 'react';
import {FlatList, StyleSheet} from 'react-native';

const FlatlistX = ({customData, columns, style, scroll, renderContent}) => {
  return (
    <FlatList
      data={customData}
      key={(item) => item.id}
      numColumns={columns}
      style={style}
      scrollEnabled={scroll}
      renderItem={renderContent}
    />
  );
};

export default FlatlistX;
