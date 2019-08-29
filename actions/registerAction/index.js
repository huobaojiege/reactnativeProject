/*
 * 注册Action
 * @Author: zhx
 * @Date: 2019-06-20
 * @flow
 */
import * as types from '../../constant/actionTypes';
import Network from '../../libs/network';

export const setRegisterInput = (type: string, value: any) => {
  return (dispatch) => {
    switch (type) {
      case 'username':
        dispatch({type: types.SET_REGISTER_INFO_USERNAME, username: value});
        break;
      case 'pwd':
        dispatch({type: types.SET_REGISTER_INFO_PWD, pwd: value});
        break;
      case 'iGender':
        dispatch({type: types.SET_REGISTER_INFO_IGENDER, iGender: value});
        break;
      case 'phone':
        dispatch({type: types.SET_REGISTER_INFO_PHONE, phone: value});
        break;
      case 'code':
        dispatch({type: types.SET_REGISTER_INFO_CODE, code: value});
        break;
      case 'xieYi':
        dispatch({type: types.SET_REGISTER_UI_IS_CHECKBOX_XIE_YI, isCheckBoxXieYi: value});
        break;
      case 'res':
        dispatch({type: types.SET_REGISTER_RES_INFO, info: value});
        break;
      case 'loading':
        dispatch({type: types.SET_UI_IS_SHOW_ACTION_LOADIN, isShowActionLoading: value});
        break;
      default:
        console.log('注册input的失败');
    }
  };
};

export const httpRegister = (url: string, params: Object): any => {
  return (dispatch) => {
    dispatch(setRegisterInput('loading', true));
    return new Promise((resolve, reject) => {
      return Network.post(
        url,
        params,
        (res) => {
          if (res.code === '0') {
            dispatch(setRegisterInput('res', res));
            resolve(res);
          } else {
            reject(res.message);
          }
          dispatch(setRegisterInput('loading', false));
        }, (err) => {
          dispatch(setRegisterInput('loading', false));
          reject(err);
        });
    });
  };
};