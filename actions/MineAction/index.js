/*
 * 我的Action
 * @Author: zhx
 * @Date: 2019-06-18
 * @flow
 */
import * as types from '../../constant/actionTypes';
import Network from '../../libs/network';
import NetworkError from '../../config/networkError';
import StorageApi from '../../storage/api';
import _ from 'lodash';

export const setMineInput = (type: string, value: any) => {
  return (dispatch) => {
    switch (type) {
      case 'res':
        dispatch({type: types.SET_LOGIN_RES_INFO, info: value});
        break;
      default:
        console.log('设置登录Input失败');
    }
  };
};

export const httpMine = (url: string, params: Object): any => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      return Network.post(
        url,
        params,
        (res) => {
          if (res.code === '0') {
            // console.log(res);
            dispatch(setMineInput('res', res.result));
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