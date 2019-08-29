/*
 * 故障报修Action
 * @Author: zhx
 * @Date: 2019-06-18
 * @flow
 */
import * as types from '../../constant/actionTypes';
import Network from '../../libs/network';

export const setBaoXiuInput = (type: string, value: any) => {
  return (dispatch) => {
    switch (type) {
      case 'res':
        dispatch({type: types.SET_BAOXIU_RES_LIST, list: value});
        break;
      case 'addMSG':
        dispatch({type: types.SET_BAOXIU_ADD_INFO_MSG, addMSG: value});
        break;
      case 'addTime':
        dispatch({type: types.SET_BAOXIU_ADD_INFO_TIME, addTime: value});
        break;
      case 'addPics':
        dispatch({type: types.SET_BAOXIU_ADD_INFO_PICS, addPics: value});
        break;
      case 'isShowLoading':
        dispatch({type: types.SET_BAOXIU_UI_IS_LOADIN, isShowLoading: value});
        break;
      default:
        console.log('设置故障报修Input失败');
    }
  };
};

export const httpAddBaoXiu = (url: string, params: Object): any => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      return Network.post(
        url,
        params,
        (res) => {
          if (res.code === 0) {
            // dispatch(setBaoXiuInput('res', res.result.repairInfoList));
            dispatch(setBaoXiuInput('isShowLoading', false));
            resolve(res);
          } else {
            dispatch(setBaoXiuInput('isShowLoading', false));
            reject(res.message);
          }
        }, (e) => {
          dispatch(setBaoXiuInput('isShowLoading', false));
          reject(e);
        });
    });
  };
};

export const httpBaoXiu = (url: string, params: Object): any => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      return Network.post(
        url,
        params,
        (res) => {
          if (res.code === 0) {
            dispatch(setBaoXiuInput('res', res.result.repairInfoList));
            dispatch(setBaoXiuInput('isShowLoading', false));
            resolve(res);
          } else {
            dispatch(setBaoXiuInput('isShowLoading', false));
            reject(res.message);
          }
        }, (e) => {
          dispatch(setBaoXiuInput('isShowLoading', false));
          reject(e);
        });
    });
  };
};