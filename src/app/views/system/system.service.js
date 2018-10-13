import api from '../../utils/api.js';
import { apiConfig } from '../../global/api.config';

export const listAllUser = (params) => { return api.get(`system/user/listAll${params}`).then(res => res.data); };

export const listAllInMineUser = (params) => { return api.get(`system/user/listAllInMineUser${params}`).then(res => res.data); };

export const listSelectUser = (params) => { return api.get(`system/user/listSelectUser${params}`).then(res => res.data); };

export const getUserById = (params) => { return api.get(`system/user/getSysUserById${params}`).then(res => res.data); };

export const create = (data) => { return api.post(`system/user/create`, data).then(res => res.data); };

export const update = (data) => { return api.post(`system/user/update`, data).then(res => res.data); };

export const deleteUser = (params) => { return api.post(`system/user/delete${params}`).then(res => res.data); };

export const resetPwd = (params) => { return api.post(`system/user/resetPwd${params}`).then(res => res.data); };

export const createRole = (data) => { return api.post(`system/role/create`, data).then(res => res.data); };

export const updateRole = (data) => { return api.post(`system/role/update`, data).then(res => res.data); };

export const listAllRole = (params) => { return api.get(`system/role/list/page/${params}`).then(res => res.data); };

export const deleteRole = (params) => { return api.get(`system/role/delete${params}`).then(res => res.data); };

export const listUserByRoleId = (params) => { return api.get(`system/user/listUserByRoleId${params}`).then(res => res.data); };

export const createUserRole = (data) => { return api.post(`system/user_role/create`, data).then(res => res.data); };

export const deleteUserRole = (params) => { return api.get(`system/user_role/delete${params}`).then(res => res.data); };

export const updateRolePerm = (data) => { return api.post(`/system/role/updateRolePerm`, data).then(res => res.data); };

export const getRole = (params) => { return api.get(`system/role/getRole${params}`).then(res => res.data); };

export const updatePassword = (data) => { return api.post(`system/user/updatePassword`, data).then(res => res.data); }

export const updatePasswordInAccount = (data) => { return api.post(`login/updatePasswordInAccount`, data).then(res => res.data); }

export const getAllDepartment = () => { return api.post(`depart/getAllDepartment`).then(res => res.data); }

export const getDepartmentMine = () => { return api.post(`depart/getDepartmentMine`).then(res => res.data); };

export const getAllDepartmentNoTree = () => { return api.post(`depart/getAllDepartmentNoTree`).then(res => res.data); }

export const getFirstDepartmentNoTree = () => { return api.post(`depart/getFirstDepartmentNoTree`).then(res => res.data); }

export const addDept = (data) => { return api.post(`depart/addDept`, data).then(res => res.data); }

export const updateDept = (data) => { return api.post(`depart/updateDept`, data).then(res => res.data); }

export const delDept = (data) => { return api.post(`depart/delDept`, data).then(res => res.data); }

//获取登录人所有的目录
export const getRoleList = () => { return api.post(`system/role/getRoleList`).then(res => res.data); };

export const getMenuList = (params) => { return api.post(`system/role/getMenuList${params}`).then(res => res.data); };

//是否拥有某些模块的管理员权限
export const getPower = () => { return api.post(`system/role/getPower`).then(res => res.data); };
//退出登录
export const logOut = () => { return api.post(`system/user/logOut`).then(res => res.data); };

