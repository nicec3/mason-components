import Cookies from 'js-cookie'

// 侧边栏状态
const sidebarStatusKey = 'sidebar_status'
export const getSidebarStatus = () => Cookies.get(sidebarStatusKey)
export const setSidebarStatus = (sidebarStatus) => Cookies.set(sidebarStatusKey, sidebarStatus)

// 语言
const languageKey = 'language'
export const getLanguage = () => Cookies.get(languageKey)
export const setLanguage = (language) => Cookies.set(languageKey, language)

// 大小
const sizeKey = 'size'
export const getSize = () => Cookies.get(sizeKey)
export const setSize = (size) => Cookies.set(sizeKey, size)

// token
const tokenKey = 'sys_token'
export const getToken = () => Cookies.get(tokenKey)
export const setToken = (token) => Cookies.set(tokenKey, token)
export const removeToken = () => Cookies.remove(tokenKey)

// 用户
const userKey = 'sys_user'
export const getUser = () => Cookies.getJSON(userKey)
export const setUser = (user) => Cookies.set(userKey, user)
export const removeUser = () => Cookies.remove(userKey)

// 菜单
const menusKey = 'sys_menus'
export const getMenus = () => Cookies.getJSON(menusKey)
export const setMenus = (menus) => Cookies.set(menusKey, menus)
export const removeMenus = () => Cookies.remove(menusKey)
