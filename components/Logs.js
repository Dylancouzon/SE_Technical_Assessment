/*
 * Logs Component
 * Takes in a logs prop of type Object[]
 * logs = [{
 * action: String,
 * payLoad: {},
 * }]
 * Syntax: <Logs logs={logs} />
 * Returns an array of <View>
 */

import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';

class Logs extends Component {
  render() {
    return this.props.logs.map((result, i) => {
      return (
        <View key={i} style={styles.logs}>
          <Text style={styles.action}>{result.action}</Text>
          <Text style={styles.payload}>
            {JSON.stringify(result.payload, null, 2)}
          </Text>
        </View>
      );
    });
  }
}

const styles = StyleSheet.create({
  logs: {
    marginTop: 5,
    backgroundColor: 'lightgrey',
  },
  action: {
    color: 'black',
    fontWeight: 'bold',
  },
  payload: {
    color: 'black',
  },
});

export default Logs;
