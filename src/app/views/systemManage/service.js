import api from '@/utils/api';
import { accountAction,sysUserAction,sysRoleAction } from '@/global/api.action';
//获取系统用户列表
export const getSystemUserList = (data,pageNum,pageSize) => { return api.get(`${sysUserAction.getList}?pageNum=${pageNum}&pageSize=${pageSize}`,data).then(res => res.data); };
//获取小程序用户列表
export const getMinaAccountList = (data,pageNum,pageSize) => { return api.get(`${accountAction.getList}?pageNum=${pageNum}&pageSize=${pageSize}`,data).then(res => res.data); };
//获取所有角色
export const getAllRoleList = (data) => { return api.get(`${sysRoleAction.allList}`,data).then(res => res.data); };
//新增角色
export const addRole = (data) => { return api.post(`${sysRoleAction.create}`,data).then(res => res.data); };
//删除角色
export const delRole = (data) => { return api.delete(`${sysRoleAction.delRole}`,data).then(res => res.data); };
