import axios from 'axios';
import { ADMIN_URL } from '../constants/index';

var Settings = {};

Settings.data = null;

Settings.get = ()=>{
    return axios.get(`${ADMIN_URL}/api/settings`);
}

export default Settings;