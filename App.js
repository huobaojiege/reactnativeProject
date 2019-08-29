/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {YellowBox, View} from 'react-native';
import {Provider} from 'react-redux';
import store from './app/store/store';
import configAppNavigator from './app/routers';
import StorageApi from './app/storage/api';
import SplashScreen from 'react-native-splash-screen';

// YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

type Props = {

}

export default class App extends Component<Props> {

  constructor() {
    super();
    this.state = {
      showView: '',
      isYouKe: true
    };
  }

  componentDidMount() {
    // StorageApi.removeData('uniqueID');
    // StorageApi.removeData('isYouKe');
    // StorageApi.removeData('userInfo');
    StorageApi.selectData('uniqueID', () => {
      this.setState({showView: 'TabBar'});
      SplashScreen.hide();
    }, () => {
      this.setState({showView: 'SelectXiaoQu'});
      SplashScreen.hide();


    });
    StorageApi.selectData('isYouKe', () => {
      this.setState({isYouKe: false})
    }, () => {
      this.setState({isYouKe: true})
    });

  }

  render() {
    let {showView} = this.state;
    const AppNavigator = configAppNavigator(this.state.showView, this.state.isYouKe);
    return (
      <Provider store={store}>
        {
          showView ?
            <AppNavigator demo='123'/>
            :
            <View style={{backgroundColor: '#fff'}}/>
        }

      </Provider>
    );
  }
}