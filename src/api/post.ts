import client from './client'
import { IFetchPostsParams, IFetchPostsResponse } from '../interfaces'

export const fetchPosts = async (page?: number, pageSize?: number, authors?: string[]) => {
  const postsResponse = await client.get('api/v1/cms/posts', {
    params: { page, pageSize, authors }
  })
  // Trả về dữ liệu gộp
  return {
    posts: postsResponse.data
  }
}
export const fetchPostsV2 = async (params: IFetchPostsParams) => {
  const postsResponse = await client.get<IFetchPostsResponse>('api/v1/cms/posts', {
    params
  })
  return {
    posts: postsResponse.data
  }
}
