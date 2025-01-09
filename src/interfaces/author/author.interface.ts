export interface IAuthor {
  name?: string
  username?: string
  avatar?: string
  id?: string
}
export interface IApiAuthorResponseV2 {
  meta: {
    status: number
    success?: boolean
    externalMessage: string
    internalMessage: string
  }
  data: IAuthor[]
}
