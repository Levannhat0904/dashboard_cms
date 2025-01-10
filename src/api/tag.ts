import { IFetchTagsParams, IFetchTagsResponse, ITag } from '../interfaces'
import client from './client'

export const fetchTags = async (params: IFetchTagsParams) => {
  const postsResponse = await client.get<IFetchTagsResponse>('api/v1/cms/tags', {
    params
  })
  return {
    tags: postsResponse
  }
}

export const addTag = async (value: ITag) => {
  return await client.post('/api/v1/cms/tags', value)
}

export const editTag = async (id: string, newData?: ITag) => {
  return await client.put(`/api/v1/cms/tags/${id}`, newData)
}

export const fetchTagById = async (id: string) => {
  return await client.get(`/api/v1/cms/tags/${id}`)
}
export const deleteTag = async (id: string) => {
  return await client.delete(`/api/v1/cms/tags/${id}`)
}
