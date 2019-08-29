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
import StorageApi from "./app/storage/api";

// YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

export default class App extends Component<{}> {

  constructor() {
    super();
    this.state = {
      showView: 'SelectXiaoQu',
      isYouKe: false
    };
  }

  componentDidMount() {
    // StorageApi.removeData('uniqueID');
    // StorageApi.selectData('uniqueID', data => {
    //   this.setState({showView: 'TabBar'})
    // }, () => {
    //   this.setState({showView: 'SelectXiaoQu'})
    // });
  }

  render() {
    let {showView} = this.state;
    const AppNavigator = configAppNavigator(this.state.showView, this.state.isYouKe);
    return (
      <Provider store={store}>
        {
          showView ?
            <AppNavigator/>
            :
            <View style={{backgroundColor: '#fff'}}/>
        }

      </Provider>
    );
  }
}