import {productApiPath,testApiPath} from '../../config'

export const local = false//本地调试时开启，生产环境关闭
export const rootPath = process.env.NODE_ENV == 'production'?productApiPath:testApiPath
