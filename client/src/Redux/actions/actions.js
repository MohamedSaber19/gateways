import types from "./actionTypes";

export function setIsLoading(flag) {
  return {
    type: types.SET_IS_LOADING,
    payload: flag,
  };
}

export function dismissToast() {
  return {
    type: types.DISMISS_TOAST,
  };
}

export function showToast(data) {
  return {
    type: types.SHOW_TOAST,
    payload: data,
  };
}

export function fetchAllGateways(data) {
  return {
    type: types.SET_GATEWAYS,
    payload: data,
  };
}

export function addGateway(data) {
  return {
    type: types.ADD_NEW_GATEWAY,
    payload: data,
  };
}

export function deleteGateway(gatewayId) {
  return {
    type: types.DELETE_GATEWAY,
    payload: gatewayId,
  };
}

export function addDevice(data, gatewayId) {
  return {
    type: types.ADD_NEW_DEVICE,
    payload: data,
    gatewayId,
  };
}

export function deleteDevice(deviceId, gatewayId) {
  return {
    type: types.DELETE_DEVICE,
    deviceId,
    gatewayId,
  };
}
