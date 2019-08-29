/*
 * 我的房屋Action
 * @Author: zhx
 * @Date: 2019-06-18
 * @flow
 */
import * as types from '../../constant/actionTypes';
import Network from '../../libs/network';
import NetworkError from '../../config/networkError';
import StorageApi from '../../storage/api';
import _ from 'lodash';

export const setMyHomeInput = (type: string, value: any) => {
  return (dispatch) => {
    switch (type) {
      case 'res':
        dispatch({type: types.SET_MYCHEWEI_RES_INFO, info: value});
        break;
      default:
        console.log('设置我的房屋Input失败');
    }
  };
};

export const httpMyHome = (url: string, params: Object): any => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      return Network.post(
        url,
        params,
        (res) => {
          if (res.code === '0') {
            // console.log(res);
            dispatch(setMyHomeInput('res', res.result));
            resolve(res);
          } else {
            reject(res.message);
          }
        }, (e) => {
          reject(e);
        });
    });
  };
};