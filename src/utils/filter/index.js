import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.locale('zh-cn')
dayjs.extend(relativeTime)

// 转换time距离当前时间
export function timeToNow (time) {
  return dayjs(time).fromNow()
}
