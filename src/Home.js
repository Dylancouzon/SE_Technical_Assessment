import React, {Component} from 'react';
import {View, SafeAreaView, ScrollView, Linking, Alert} from 'react-native';
import branch, {BranchEvent} from 'react-native-branch';
import Clipboard from '@react-native-clipboard/clipboard';

// Custom React components
import ButtonGroup from './components/ButtonGroup';
import Logs from './components/Logs';
import Header from './components/Header';

export default class Home extends Component {
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

      if (params['+clicked_branch_link']) {
        const branchUrl = params['targetPage'] || 'Branch App';
        this.props.navigation.navigate(branchUrl);
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
  // Generated link will be copied to Clipboard
  generateShortUrl = async (linkProperties, controlParams, copy = true) => {
    //Link properties && controlParams default value
    if (!linkProperties) {
      linkProperties = {
        campaign: 'Testing',
        channel: 'App',
        feature: 'generate link CTA',
        tags: ['android'],
        alias: '',
      };
    }
    if (!controlParams) {
      controlParams = {
        $canonical_identifier: 'canonicalIdentifier',
        targetPage: 'In-App routing',
      };
    }

    let {url} = await this.buo.generateShortUrl(linkProperties, controlParams);
    this.logAction('generateShortUrl:', url);

    // Copy the link to Clipboard
    if (copy) {
      Clipboard.setString(url);
      Alert.alert('Link copied to Clipboard');
    }

    return url;
  };

  // Creates a custom Event on CTA click.
  createCustomEvent = async () => {
    const event = new BranchEvent('Button Click', this.buo, {
      description: 'Track custom Event button has been clicked',
      data: {},
    });
    event.logEvent();
    this.logAction('Custom Event:', event);
  };

  // Logs the first Referring parameters
  getFirstParams = async () => {
    const params = await branch.getFirstReferringParams();
    this.logAction('First Params', params);
  };

  // Logs the last Referring parameters
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
      data: {
        $canonical_identifier: 'canonicalIdentifier',
        $og_title: 'SE_DYLAN_COUZON',
        $og_description: 'Please try out my newly Branch Integrated App!',
        $og_image_url: 'http://www.lorempixel.com/400/400/',
        $desktop_url: 'http://www.example.com',
      },
    };

    let controlParams = {
      $canonical_identifier: 'canonicalIdentifier',
      targetPage: 'Branch App',
    };

    let facebookParameters = [];
    const facebookShareURL = await this.generateShortUrl(
      linkProperties,
      controlParams,
    );
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

  // shares a Deeplink
  shareLink = async () => {
    let shareOptions = {
      messageHeader: 'Check this out',
      messageBody: 'A Fully Branch integrated App',
    };
    let linkProperties = {feature: 'share', channel: 'RNApp'};
    let controlParams = {
      $desktop_url: 'http://example.com/home',
      $ios_url: 'http://example.com/ios',
    };
    let {channel, completed, error} = await this.buo.showShareSheet(
      shareOptions,
      linkProperties,
      controlParams,
    );
  };

  // In App deeplink
  goToPage2 = async () => {
    const linkProperties = {
      campaign: 'Testing',
      channel: 'App',
      feature: 'In-App Deeplink',
      tags: ['android'],
      alias: '',
    };
    const deepLink = await this.generateShortUrl(linkProperties, null, false);
    branch.openURL(deepLink);
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
            <ButtonGroup
              generateShortUrl={this.generateShortUrl}
              createCustomEvent={this.createCustomEvent}
              getLatestParams={this.getLatestParams}
              getFirstParams={this.getFirstParams}
              postOnFacebook={this.postOnFacebook}
              page2={this.goToPage2}
            />
            <Header>Logs</Header>
            <Logs logs={this.state.logs} />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
