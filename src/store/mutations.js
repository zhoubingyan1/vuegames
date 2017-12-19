import * as event from './mutation-types.js'
import * as func from './function';

export default {
  [event.LOGIN](states, obj) {
    states.logState = true;
    states.isNpc = true;//属于NPC登录
    states.code=obj.data.code;//保存NPC身份凭证
    states.taskname=obj.data.taskname;//保存NPC所处任务点名称
    func.local.set(states);
  },
  [event.AUTHOR](states, obj) {
    func.local.clear();//清空原来用户信息缓存
    states.logState = true;//状态修改为登录状态
    states.isWXuser = true;//属于微信登录
    states.uid = obj.data.uid; //保存UID
    states.nickname = obj.data.nickname; //保存昵称
    states.headimgurl = obj.data.headimgurl; //保存头像
    states.openid = obj.data.openid; //保存openID
    states.integral = obj.data.integral; //保存积分
    states.qrcode = obj.data.qrcode; //保存二维码
    states.role = obj.data.role; //保存角色
    states.team = obj.data.team; //保存队伍
    func.local.set(states);
  },
  [event.ROLE](states, obj) {
    states.role = obj.data.id;
    func.local.set(states);
  },
  [event.LINEUP](states, obj) {
    states.team = obj.data.id;
    func.local.set(states);
  },
  [event.UPDATE](states, obj) {
    obj.data=obj.data.data
    states.nickname = obj.data.nickname; //保存昵称
    states.headimgurl = obj.data.headimgurl; //保存头像
    states.integral = obj.data.integral; //保存积分
    states.qrcode = obj.data.qrcode; //保存二维码
    states.role = obj.data.role; //保存角色
    states.team = obj.data.team; //保存队伍
    func.local.set(states);
  },
  [event.UPINE](states, obj) {
    states.integral = obj.data.integral; //保存积分
    func.local.set(states);
  },
}
