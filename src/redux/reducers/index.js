import { combineReducers } from "redux";
import appSettings from "./app_settings";
import notifications from './notifications'
import orders from './orders'
import userData from './user'
import product from './product'
import auth from './auth'

export default combineReducers({
  appSettings,
  orders,
  userData,
  notifications,
  product,
  auth
});