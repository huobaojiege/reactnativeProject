/*
 * 扫一扫Action
 * @Author: zhx
 * @Date: 2019-07-21
 * @flow
 */
import * as types from '../../constant/actionTypes';
import Network from "../../libs/network";


export const setQRCodeInput = (type: string, value: any) => {
  return (dispatch) => {
    switch (type) {
      case 'res':
        dispatch({type: types.SET_QRCODE_RES, list: value});
        break;
      default:
        console.log('设置扫一扫Input失败');
    }
  };
};

export const httpQRCode = (url: string, params: Object): any => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      return Network.post(
        url,
        params,
        (res) => {
          if (res.code === '0') {
            // console.log(res);
            // dispatch(setQRCodeInput('res', res.result));
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