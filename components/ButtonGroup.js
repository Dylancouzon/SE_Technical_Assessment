/*
 * Logs Component
 * Props: generateShortUrl, getLatestParams, createCustomEvent, postOnFacebook
 * Syntax: <ButtonGroup props={App component methods} />
 * Returns a Fragment containing View[]
 */

import React, {Component} from 'react';
import {Button, StyleSheet, View} from 'react-native';

class ButtonGroup extends Component {
  // Avoid rerendering this component when updating the state
  shouldComponentUpdate() {
    return false;
  }
  render() {
    return (
      <>
        <View style={styles.flexContainer}>
          <View style={styles.buttonStyle}>
            <Button
              onPress={() => this.props.generateShortUrl()}
              title="Create Link"
              color="#00BD70"
            />
          </View>
          <View style={styles.buttonStyle}>
            <Button
              onPress={this.props.createCustomEvent}
              title="Track custom Event"
              color="#00BD70"
            />
          </View>
        </View>
        <View style={styles.flexContainer}>
          <View style={styles.buttonStyle}>
            <Button
              onPress={this.props.getLatestParams}
              title="Get latest Params"
              color="#00BD70"
            />
          </View>
          <View style={styles.buttonStyle}>
            <Button
              onPress={this.props.postOnFacebook}
              title="Share on Facebook"
              color="#3b5998"
            />
          </View>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  buttonStyle: {
    marginHorizontal: 10,
    width: '45%',
    marginTop: 5,
    marginBottom: 5,
  },
  flexContainer: {
    flexDirection: 'row',
  },
});

export default ButtonGroup;
