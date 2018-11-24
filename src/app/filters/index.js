const moment = require("moment");
const filters = {

  dateFilter: function (value) {
    return value ? moment(value).format('YYYY-MM-DD') : ''
  },
  dateTimeFilter: function (value) {
    return value ? moment(value).format('YYYY-MM-DD HH:mm:ss') : ''
  },
  formatTime: function (time, option) {
    time = +time * 1000
    const d = new Date(time)
    const now = Date.now()
    const diff = (now - d) / 1000
    if (diff < 30) {
      return '刚刚'
    } else if (diff < 3600) { // less 1 hour
      return Math.ceil(diff / 60) + '分钟前'
    } else if (diff < 3600 * 24) {
      return Math.ceil(diff / 3600) + '小时前'
    } else if (diff < 3600 * 24 * 2) {
      return '1天前'
    }
    if (option) {
      return parseTime(time, option)
    } else {
      return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
    }
  }
};
export default filters