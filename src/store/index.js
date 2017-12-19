import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'

Vue.use(Vuex)

const state = {
	openid: '', //openid
	logState:true,//登录状态
	nickname:'',//昵称
	headimgurl:'',//微信头像
	integral:'',//积分
	isWXuser:true,//是否微信登录登录
	isNpc:true,//是否是NPC
	uid:'', //用户ID
	role:'',//角色
	team:'',//队伍
	code:'',//NPC 身份凭证
	taskname:'',//NPC 所处任务点名称  
	type:2,//礼品抽奖  1:折扣卷 2:礼品卷 3:积分  #不缓存
	level:10,//每次抽奖所需积分  #不缓存
	click:true,//按钮是否可以单击   #不缓存
	container:null,//容器 做分值转换用的  #不缓存
}

export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations,
})