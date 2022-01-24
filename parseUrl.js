/* eslint-disable */
function parseUrl (url) {
  // hash 路由
  // let queryStr = /(.+)#\/.+/.exec(url)[1]
  // queryStr = /.+\?(.+)$/.exec(queryStr)[1]

  const queryStr = (new URL(url)).search
  const queryArr = queryStr.split('&')
  const queryObj = {}
  queryArr.forEach(item => {
    if (/=/.test(item)) {
      let [k, val] = item.split('=')
      val = decodeURIComponent(val)
      // 数字
      val = /^\d+$/.test(val) ? parseFloat(val) : val
      if (queryObj.hasOwnProperty(k)) {
        queryObj[k] = [].concat(queryObj[k], val)
      } else {
        queryObj[k] = val
      }
    } else {
      queryObj[item] = true
    }
  })
  return queryObj
}

const url = `https://live.bilibili.com/activity/live-activity-battle/index.html?is_live_half_webview=1&hybrid_rotate_d=1&is_cling_player=1&hybrid_half_ui=1,3,100p,70p,a27af6,0,30,100;2,2,375,100p,a27af6,0,30,100;3,3,100p,70p,a27af6,0,30,100;4,2,375,100p,a27af6,0,30,100;5,3,100p,70p,a27af6,0,30,100;6,3,100p,70p,a27af6,0,30,100;7,3,100p,70p,a27af6,0,30,100;8,3,100p,70p,a27af6,0,30,100&room_id=460802&uid=12512151234#/valentine_day_2021`
console.log(parseUrl(url))

function test (url) {
  const URL = new URL(url)
  for (const [k, v] of URL.searchParams) {
    console.log(k, v)
  }
}