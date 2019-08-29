/*
 * 登录Action
 * @Author: zhx
 * @Date: 2019-06-18
 * @flow
 */
import * as types from '../../constant/actionTypes';
import Network from '../../libs/network';
import NetworkError from '../../config/networkError';
import StorageApi from '../../storage/api';
import _ from 'lodash';

export const setLoginInput = (type: string, value: any) => {
  return (dispatch) => {
    switch (type) {
      case 'phone':
        dispatch({type: types.SET_LOGIN_INFO_PHONE, phone: value});
        break;
      case 'pwd':
        dispatch({type: types.SET_LOGIN_INFO_PWD, pwd: value});
        break;
      case 'loading':
        dispatch({type: types.SET_UI_IS_SHOW_ACTION_LOADIN, isShowActionLoading: value});
        break;
      case 'res':
        dispatch({type: types.SET_LOGIN_RES_INFO, info: value});
        break;
      default:
        console.error('设置登录Input失败');
    }
  };
};

export const httpLogin = (url: string, params: Object): any => {
  return (dispatch) => {
    dispatch(setLoginInput('loading', true));
    return new Promise((resolve, reject) => {
      return Network.post(
        url,
        params,
        (res) => {
          if (res.code === '0') {
            dispatch(setLoginInput('res', res.result.ownerInfo));
            resolve(res);
          } else {
            reject(res.message);
          }
          dispatch(setLoginInput('loading', false));
        }, (e) => {
          dispatch(setLoginInput('loading', false));
          reject(e);
        });
    });
  };
};