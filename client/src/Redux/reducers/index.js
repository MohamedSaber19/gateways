import update from "immutability-helper";
import types from "../actions/actionTypes";
const initialState = {
  data: [],
  isLoading: true,
  toast: null,
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_IS_LOADING:
      return { ...state, isLoading: action.payload };
    case types.SET_GATEWAYS:
      return { ...state, data: action.payload };
    case types.DISMISS_TOAST:
      return { ...state, toast: null };
    case types.SHOW_TOAST:
      return { ...state, toast: action.payload };
    case types.ADD_NEW_GATEWAY:
      return update(state, {
        data: {
          $push: [action.payload],
        },
      });
    case types.DELETE_GATEWAY: {
      const gatewayIndex = state.data.findIndex(
        (gateway) => gateway._id === action.payload
      );
      return update(state, {
        data: {
          $splice: [[gatewayIndex, 1]],
        },
      });
    }
    case types.ADD_NEW_DEVICE: {
      const gatewayIndex = state.data.findIndex(
        (gateway) => gateway._id === action.gatewayId
      );
      return update(state, {
        data: {
          [gatewayIndex]: {
            devices: {
              $push: [action.payload],
            },
          },
        },
      });
    }
    case types.DELETE_DEVICE: {
      const gatewayIndex = state.data.findIndex(
        (gateway) => gateway._id === action.gatewayId
      );
      const deviceIndex = state.data[gatewayIndex].devices.findIndex(
        (gateway) => gateway._id === action.deviceId
      );
      return update(state, {
        data: {
          [gatewayIndex]: {
            devices: {
              $splice: [[deviceIndex, 1]],
            },
          },
        },
      });
    }
    default:
      return state;
  }
}
