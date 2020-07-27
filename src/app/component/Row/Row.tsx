// @flow
import * as React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';

export type RowProps = ViewProps

/**
 * use Row or Col to make jsx more readable
 */
function Row(props: ViewProps & { children?: React.ReactNode }) {
  const { style, ...otherProps } = props;
    return (
      <View
        {...otherProps}
        style={[styles.row, style]}
      />
    );
}

export default Row;
Row.displayName = 'Row';
const styles = StyleSheet.create({
  row: { flexDirection: 'row' },
});
