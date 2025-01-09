export interface IMeta {
  status: number
  success: boolean
  externalMessage: string
  internalMessage: string
}
export interface IData<T> {
  page: number
  pageSize: number
  total: number
  datas: T[]
}
