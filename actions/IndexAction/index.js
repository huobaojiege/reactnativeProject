/*
 * 首页Action
 * @Author: zhx
 * @Date: 2019-06-18
 * @flow
 */
import * as types from '../../constant/actionTypes';
import Network from '../../libs/network';
import NetworkError from '../../config/networkError';
import StorageApi from '../../storage/api';
import _ from 'lodash';

export const setIndexInput = (type: string, value: any) => {
  return (dispatch) => {
    switch (type) {
      case 'notices':
        dispatch({type: types.SET_NOTICE_RES_LIST, list: value});
        break;
      case 'res':
        dispatch({type: types.SET_INDEX_RES_LIST, list: value});
        break;
      case 'isShowLoading':
        dispatch({type: types.SET_INDEX_UI_IS_LOADIN, isShowLoading: value});
        break;
      default:
        console.log('设置首页Input失败');
    }
  };
};


export const httpIndex = (url: string, params: Object): any => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      return Network.post(
        url,
        params,
        (res) => {
          if (res.code === 0) {
            dispatch(setIndexInput('res', res.result));
            dispatch(setIndexInput('notices', res.result.noticeInfoList));
            dispatch(setIndexInput('isShowLoading', false));
            resolve(res);
          } else {
            dispatch(setIndexInput('isShowLoading', false));
            reject(res.message);
          }
        }, (e) => {
          dispatch(setIndexInput('isShowLoading', false));
          reject(e);
        });
    });
  };
};
