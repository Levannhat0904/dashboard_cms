export interface ITag {
  id?: string
  iconUrl?: string
  name?: string
  slug?: string
  group?: 'TAG'
  description?: string
  featureImage?: string
  metaDescription?: string
  metaTitle?: string
  ogDescription?: string
  ogImage?: string
  ogTitle?: string
  twitterDescription?: string
  twitterImage?: string
  twitterTitle?: string
}
export interface IFetchTagsResponse {
  tags: {
    data: {
      data: {
        page: number
        pageSize: number
        total: number
        datas: ITag[]
      }
      meta: {
        status: number
        success?: boolean
        externalMessage: string
        internalMessage: string
      }
    }
  }
}
export interface IFetchTagsParams {
  page?: number
  pageSize?: number
  authors?: string[]
  s?: string
}
