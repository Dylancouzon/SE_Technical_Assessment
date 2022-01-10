import React, {Component} from 'react';
import {View, SafeAreaView, ScrollView, Linking, Alert} from 'react-native';
import branch, {BranchEvent} from 'react-native-branch';
import Clipboard from '@react-native-clipboard/clipboard';
// Custom React components
import ButtonGroup from './ButtonGroup';
import Logs from './Logs';
import Header from './Header';

export default class App extends Component {
  constructor(props) {
    super(props);

    // Creates the buo when initializing the class
    this.buo = this.createBranchUniversalObject();

    // Actions log will be stored in a state then displayed in the <Logs> Component
    this.state = {
      logs: [],
    };
  }

  // Creates the subscriber Once the component is rendered.
  componentDidMount() {  
    branch.subscribe(({error, params, _}) => {
      if (error) {
        console.error('Error from Branch: ' + error);
        return;
      }
      this.logAction('Subscriber: ', params);
      console.log(`params: ${JSON.stringify(params)}`);
    });
  }

  // Unmount Branch
  componentWillUnmount() {
    if (!this.buo) {
      return;
    }
    this.buo.release();
  }

  // Creates the universal object.
  // Will be stores in this.buo
  createBranchUniversalObject = async () => {
    let branchUniversalObject = await branch.createBranchUniversalObject(
      'canonicalIdentifier',
      {
        locallyIndex: true,
        title: 'Branch SDK Integration',
        contentDescription: 'Dylan Couzon Take home exercise.',
      },
    );
    this.buo = branchUniversalObject;
    this.logAction('branchUniversalObject: ', branchUniversalObject);
  };

  // Generates a Deeplink URL
  // Will use Default link propreties if null
  // Generated link will be copied to Clipboard
  generateShortUrl = async linkProperties => {
    if (!linkProperties) {
      linkProperties = {
        campaign: 'Testing',
        channel: 'App',
        feature: 'generate link CTA',
        tags: ['android'],
        alias: '',
        data: {},
      };
    }

    let controlParams = {};
    let {url} = await this.buo.generateShortUrl(linkProperties, controlParams);
    this.logAction('generateShortUrl:', url);
    Clipboard.setString(url);
    Alert.alert('Link copied to Clipboard');
    return url;
  };

  // Creates a custom Event on CTA click.
  createCustomEvent = async () => {
    const event = new BranchEvent('Button Click', this.buo, {
      description: 'Track custom Event button has been clicked',
      data: {
        $og_description: 'Track custom Event button has been clicked',
      },
    });
    event.logEvent();
    this.logAction('Custom Event:', event);
  };

  // Log the last Referring parameters
  getLatestParams = async () => {
    const params = await branch.getLatestReferringParams();
    this.logAction('Latest Params', params);
  };

  // Share a Deeplink on Facebook
  postOnFacebook = async () => {
    let linkProperties = {
      campaign: 'Testing',
      channel: 'Facebook',
      feature: 'Facebook Share',
      tags: ['android'],
      alias: '',
      data: {},
    };
    let facebookParameters = [];
    const facebookShareURL = await this.generateShortUrl(linkProperties);
    console.log('facebookShareURL', facebookShareURL);
    facebookParameters.push('u=' + encodeURI(facebookShareURL));
    const postContent = 'Please try out my newly Branch Integrated App!';
    facebookParameters.push('quote=' + encodeURI(postContent));
    const url =
      'https://www.facebook.com/sharer/sharer.php?' +
      facebookParameters.join('&');

    Linking.openURL(url).then(data => {
      console.log('Facebook Opened', url);
    });
  };

  // Add actions to the State
  // Will be displayed in <Logs> Component
  logAction(action, payload) {
    console.log(action, payload);
    let result = {action, payload};
    this.setState({
      logs: [result, ...this.state.logs].slice(0, 10),
    });
  }

  render() {
    return (
      <SafeAreaView>
        <ScrollView>
          <View>
            <Header>Branch App</Header>

            <ButtonGroup
              generateShortUrl={this.generateShortUrl}
              createCustomEvent={this.createCustomEvent}
              getLatestParams={this.getLatestParams}
              postOnFacebook={this.postOnFacebook}
            />
            <Header>Logs</Header>
            <Logs logs={this.state.logs} />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
