/*
 * Header Component
 * Takes in children prop as Header Title
 * Syntax: <Header> {Title} </Header>
 * Returns a styled <View> component.
 */

import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';

class Header extends Component {
  render() {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>{this.props.children}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerText: {
    fontSize: 23,
    color: '#fff',
    textAlign: 'left',
    paddingLeft: 20,
  },
  header: {
    height: 50,
    padding: 5,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: '#0075C9',
  },
});

export default Header;
