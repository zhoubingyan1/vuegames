/**
 * action.js
 * @Author: lp
 * @Date:2017-09-29 11:30:13
 * @Version:1.0
 * @Last Modified by: lp
 * @Last Modified time: 2017-09-29 11:30:17
 */
 
export default {
	login:({commit},param)=>commit('LOGIN',{data:param}),
	author:({commit},param)=>commit('AUTHOR',{data:param}),
	role:({commit},param)=>commit('ROLE',{data:param}),
	lineup:({commit},param)=>commit('LINEUP',{data:param}),
	update:({commit},param)=>commit('UPDATE',{data:param}),
	upine:({commit},param)=>commit('UPINE',{data:param}),
}