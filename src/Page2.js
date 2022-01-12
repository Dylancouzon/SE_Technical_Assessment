import React from 'react';
import {Text, View, Button} from 'react-native';

class Page2 extends React.Component {
  render() {
    return (
      <View>
        <Text>Hi !</Text>
        <Text>The link you created linked to this test page.</Text>
        <Button
          onPress={() => this.props.navigation.navigate('Branch App')}
          title="Go Back"
          color="#841584"
        />
      </View>
    );
  }
}

// ...

export default Page2;
