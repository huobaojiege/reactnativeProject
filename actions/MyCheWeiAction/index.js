/*
 * 我的车位Action
 * @Author: zhx
 * @Date: 2019-06-18
 * @flow
 */
import * as types from '../../constant/actionTypes';
import Network from '../../libs/network';
import NetworkError from '../../config/networkError';
import StorageApi from '../../storage/api';
import _ from 'lodash';

export const setMyCheWeiInput = (type: string, value: any) => {
  return (dispatch) => {
    switch (type) {
      case 'res':
        dispatch({type: types.SET_MYCHEWEI_RES_LIST, list: value});
        break;
      case 'isLoading':
        dispatch({type: types.SET_MYCHEWEI_UI_IS_LOADIN, isShowLoading: value});
        break;
      default:
        console.error('设置我的车位Input失败');
    }
  };
};

export const httpMyCheWei = (url: string, params: Object): any => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      return Network.post(
        url,
        params,
        (res) => {
          if (res.code === 0) {
            dispatch(setMyCheWeiInput('res', res.result.parkingInfo));
            dispatch(setMyCheWeiInput('isLoading', false));
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