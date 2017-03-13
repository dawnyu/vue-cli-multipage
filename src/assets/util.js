/**获取静态页名称 */
export const getUrlName = () => {
  let url = window.location.href
  if (!url) return
  return url.slice(url.lastIndexOf("/") + 1, url.lastIndexOf(".html"))
}