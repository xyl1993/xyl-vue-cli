export const apiConfig = {
  base_api_host: process.env.NODE_ENV === 'development' ? "/api" : '',
  allowUrls: "login", //不需要添加token请求的接口
  noJsonTypeUrls: "\/selDomitoryScoreList|\/test", //不需要json传参的接口
} // conf/db.js