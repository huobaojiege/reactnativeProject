/*
 * 公告Action
 * @Author: zhx
 * @Date: 2019-06-18
 * @flow
 */
import * as types from '../../constant/actionTypes';
import Network from '../../libs/network';
import NetworkError from '../../config/networkError';
import StorageApi from '../../storage/api';
import _ from 'lodash';

export const setNoticeInput = (type: string, value: any) => {
  return (dispatch) => {
    switch (type) {
      case 'res':
        dispatch({type: types.SET_NOTICE_RES_LIST, list: value});
        break;
      case 'detailRes':
        dispatch({type: types.SET_NOTICE_RES_DETAIL, detail: value});
        break;
      case 'isLoading':
        dispatch({type: types.SET_NOTICE_UI_IS_LOADIN, isShowLoading: value});
        break;
      default:
        console.log('设置公告Input失败');
    }
  };
};

export const httpNotice = (url: string, params: Object): any => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      return Network.post(
        url,
        params,
        (res) => {
          if (res.code === 0) {
            dispatch(setNoticeInput('res', res.result.noticeList));
            dispatch(setNoticeInput('isLoading', false));
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

export const httpNoticeDetail = (url: string, params: Object): any => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      return Network.post(
        url,
        params,
        (res) => {
          if (res.code === 0) {
            dispatch(setNoticeInput('detailRes', res.result.detail));
            // dispatch(setNoticeInput('isLoading', false));
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