import { ITag } from '../tag/tag.interface'
import { ISector } from '../sector/sector.interface'
import { IAuthor } from '../author/author.interface'
import { IAsset } from '../asset/asset.interface'
import { IPostType } from '../postType/postType.interface'

export interface IPost {
  id?: string
  uuid?: string
  slug?: string
  title?: string
  excerpt?: string
  authors?: IAuthor[]
  tags?: ITag[]
  sectors?: ISector[]
  assets?: IAsset[]
  postType?: IPostType
  postFormat?: string
  status?: string
  visibility?: string
  totalView?: number
  totalShare?: number
  totalWord?: number
  readingTime?: number
  publishedAt?: string | null
  createdAt?: string
  updatedAt?: string
}
export interface IApiPostResponse {
  meta: {
    status: number
    success?: boolean
    externalMessage: string
    internalMessage: string
  }
  data: {
    page: number
    pageSize: number
    total: number
    datas: IPost[]
  }
}
export interface IFetchPostsResponse {
  posts: {
    data: {
      page: number
      pageSize: number
      total: number
      datas: IPost[]
    }
    meta: {
      status: number
      success?: boolean
      externalMessage: string
      internalMessage: string
    }
  }
}
// ===
export interface IApiUserResponse {
  meta: {
    status: number
    success?: boolean
    externalMessage: string
    internalMessage: string
  }
  data: {
    page: number
    pageSize: number
    total: number
    data: IPost[]
  }
}
export interface IFetchPostsParams {
  page?: number
  pageSize?: number
  authors?: string[]
  s?: string
  assets?: string[]
}
