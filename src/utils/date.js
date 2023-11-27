// 日期格式化函数 传入日期时间或字符串，返回格式化的字符串
// 返回格式如：1分钟前 2小时前 3个月前 6年前
export function formatDate(date) {
  const now = new Date()
  const diff = now - new Date(date)

  const minute = 60 * 1000
  const hour = 60 * minute
  const day = 24 * hour
  const month = 30 * day
  const year = 365 * day

  if (diff < minute) {
    return `${Math.floor(diff / 1000)}秒前`
  } else if (diff < hour) {
    return `${Math.floor(diff / minute)}分钟前`
  } else if (diff < day) {
    return `${Math.floor(diff / hour)}小时前`
  } else if (diff < month) {
    return `${Math.floor(diff / day)}天前`
  } else if (diff < year) {
    return `${Math.floor(diff / month)}个月前`
  } else {
    return `${Math.floor(diff / year)}年前`
  }
}
