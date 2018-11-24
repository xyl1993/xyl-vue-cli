import api from '@/utils/api.js';
import { sysUserAction } from '@/global/api.action';

export const webLoigin = (data) => { return api.post(`${sysUserAction.login}`,data).then(res => res.data); };