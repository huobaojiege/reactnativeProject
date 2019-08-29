/*
 * 选择小区Action
 * @Author: zhx
 * @Date: 2019-06-18
 * @flow
 */
import * as types from '../../constant/actionTypes';
import Network from '../../libs/network';
import NetworkError from '../../config/networkError';
import StorageApi from '../../storage/api';
import _ from 'lodash';

export const setSelectXiaoQuInput = (type: string, value: any) => {
  return (dispatch) => {
    switch (type) {
      case 'res':
        dispatch({type: types.SET_SELECTXIAOQU_RES_LIST, list: value});
        break;
      case 'isShowLoading':
        dispatch({type: types.SET_SELECTXIAOQU_UI_IS_LOADIN, isShowLoading: value});
        break;
      case 'curId':
        dispatch({type: types.SET_SELECTXIAOQU_INFO_CURID, curXiaoQuNum: value});
        break;
      default:
        console.log('设置选择当前小区Input失败');
    }
  };
};

export const httpSelectXiaoQu = (url: string, params: Object): any => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      return Network.post(
        url,
        params,
        (res) => {
          if (res.code === 0) {
            // console.log(res);
            dispatch(setSelectXiaoQuInput('res', res.result.communityInfoList));
            dispatch(setSelectXiaoQuInput('isShowLoading', false));
            resolve(res);
          } else {
            dispatch(setSelectXiaoQuInput('isShowLoading', false));
            reject(res.message);
          }
        }, (e) => {
          dispatch(setSelectXiaoQuInput('isShowLoading', false));
          reject(e);
        });
    });
  };
};

export const httpAddOwnerInfo= (url: string, params: Object): any => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      return Network.post(
        url,
        params,
        (res) => {
          if (res.code === 0) {
            // console.log(res);
            // dispatch(setSelectXiaoQuInput('res', res.result.communityInfoList));
            dispatch(setSelectXiaoQuInput('isShowLoading', false));
            resolve(res);
          } else {
            dispatch(setSelectXiaoQuInput('isShowLoading', false));
            reject(res.message);
          }
        }, (e) => {
          dispatch(setSelectXiaoQuInput('isShowLoading', false));
          reject(e);
        });
    });
  };
};