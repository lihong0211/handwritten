function noop () {}
class Route {
    // hash 路由
    constructor () {
        // 路由存储对象
        this.routes = {}
        // 当前路由
        this.currentRoute = ''
        this.refreshRoute = this.refreshRoute.bind(this)
        // 监听路由变化
        window.addEventListener('load', refreshRoute, false)
        window.addEventListener('hashchange', refreshRoute, false)
    }

    // 存储路由
    storeRoute (path, cb) {
        this.routes[path] = cb || noop
    }

    // 刷新路由
    refreshRoute () {
        this.currentRoute = location.hash.slice(1) || '/'
        this.routes[this.currentRoute]()
    }
}