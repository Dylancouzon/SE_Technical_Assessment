/*
 * Page2 Component
 * For In-app deep link testing
 */

import React from 'react';
import {Text, View, Button, Image, StyleSheet} from 'react-native';

class Page2 extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.flexRow}>
          <Image
            style={styles.logo}
            source={require('./images/branch_logo.png')}
          />
          <Text style={styles.text}>
            Hi there!{'\n'}
            The deep link you followed was pointing to this test page.
          </Text>
        </View>
        <Button
          onPress={() => this.props.navigation.navigate('Branch App')}
          title="Go Back"
          color="#00BD70"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  flexRow: {
    flexDirection: 'row',
  },
  logo: {
    width: 100,
    height: 100,
  },
  text: {
    fontSize: 20,
    padding: 10,
    flex: 1,
    flexWrap: 'wrap',
  },
});

export default Page2;
