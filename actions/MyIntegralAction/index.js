/*
 * 我的积分Action
 * @Author: zhx
 * @Date: 2019-06-18
 * @flow
 */
import * as types from '../../constant/actionTypes';
import Network from '../../libs/network';
import NetworkError from '../../config/networkError';
import StorageApi from '../../storage/api';
import _ from 'lodash';

export const setMyIntegralInput = (type: string, value: any) => {
  return (dispatch) => {
    switch (type) {
      case 'res':
        dispatch({type: types.SET_MYINTEGRAL_RES_LIST, list: value});
        break;
      case 'isShowLoading':
        dispatch({type: types.SET_MYINTEGRAL_UI_IS_LOADIN, isShowLoading: value});
        break;
      default:
        console.log('设置我的积分Input失败');
    }
  };
};

export const httpMyIntegral = (url: string, params: Object): any => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      return Network.post(
        url,
        params,
        (res) => {
          if (res.code === 0) {
            // console.log(res);
            dispatch(setMyIntegralInput('res', res.result.integralFlowList));
            dispatch(setMyIntegralInput('isShowLoading', false));
            resolve(res);
          } else {
            dispatch(setMyIntegralInput('isShowLoading', false));
            reject(res.message);
          }
        }, (e) => {
          dispatch(setMyIntegralInput('isShowLoading', false));
          reject(e);
        });
    });
  };
};