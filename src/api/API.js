import axios from 'axios'
import config from '@/api/config'
import qs from 'qs'
const weburl = 'hls.xuehuiwan.cn';
// const weburl='localhost';
// axios(config);
class API {
  //NPC登录
  login(param) {
    config.data.Method = "get";
    config.data = param;
    return axios.post('http://' + weburl + '/data.php?class=npc&action=log', {}, config);
  }
  //微信授权登录
  author(param) {
    config.data.Method = "get";
    config.data = param;
    return axios.post('http://' + weburl + '/data.php?class=user&action=index', {}, config);
  }
  //选择角色
  role(param) {
    config.data.Method = "get";
    config.data = param;
    return axios.post('http://' + weburl + '/data.php?class=user&action=role', {}, config);
  }
  //选择阵容
  lineup(param) {
    config.data.Method = "get";
    config.data = param;
    return axios.post('http://' + weburl + '/data.php?class=user&action=troop', {}, config);
  }
  //积分记录
  integralLog(param) {
    config.data.Method = "get";
    config.data = param;
    return axios.post('http://' + weburl + '/data.php?class=user&action=inteLog', {}, config);
  }
  //背包
  bag(param) {
    config.data.Method = "get";
    config.data = param;
    return axios.post('http://' + weburl + '/data.php?class=user&action=mypack', {}, config);
  }
  //抽奖
  draw(param) {
    config.data.Method = "get";
    config.data = param;
    return axios.post('http://' + weburl + '/data.php?class=user&action=turnplate', {}, config);
  }
  //更新用户信息
  update(param) {
    config.data.Method = "get";
    config.data = param;
    return axios.post('http://' + weburl + '/data.php?class=user&action=user', {}, config);
  }
  //微信SDK信息
  wxconfig(param) {
    config.data.Method = "get";
    config.data = param;
    return axios.post('http://' + weburl + '/data.php?class=user&action=get_conf', {}, config);
  }
  //获取用户头像(NPC)
  userhead(param) {
    config.data.Method = "get";
    config.data = param;
    return axios.post('http://' + weburl + '/data.php?class=npc&action=user', {}, config);
  }
  //NPC给用户加分
  plus(param) {
    config.data.Method = "get";
    config.data = param;
    return axios.post('http://' + weburl + '/data.php?class=npc&action=give_integral', {}, config);
  }
  //消息推送(触发用户被扫描后返回事件)
  trigger(param) {
    config.data.Method = "get";
    config.data = param;
    return axios.post('http://' + weburl + '/data.php?class=npc&action=give_msg', {}, config);
  }
  //NPC 开启PK
  pk(param) {
    config.data.Method = "get";
    config.data = param;
    return axios.post('http://' + weburl + '/data.php?class=npc&action=pk_integral', {}, config);
  }
  //获取用户排行
  ranking(param) {
    config.data.Method = "get";
    config.data = param;
    return axios.post('http://' + weburl + '/data.php?class=user&action=inte_ranking', {}, config);
  }
  //兑奖
  exchange(param) {
    config.data.Method = "get";
    config.data = param;
    return axios.post('http://' + weburl + '/data.php?class=npc&action=use_card',{}, config);
  }
  //获取兑换奖品列表
  reward(param) {
    config.data.Method = "get";
    config.data = param;
    return axios.post('http://' + weburl + '/data.php?class=user&action=ranking',{}, config);
  }
  //兑换礼品劵
  change(param) {
    config.data.Method = "get";
    config.data = param;
    return axios.post('http://' + weburl + '/data.php?class=user&action=change', {}, config);
  }
}
export default API;
