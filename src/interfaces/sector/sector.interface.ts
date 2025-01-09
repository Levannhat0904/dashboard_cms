export interface ISector {
  name?: string
  slug?: string
  id?: string
  isParent?: boolean
  featureImage?: string
  iconUrl?: string
  parent?: string
}
export interface IApiSectorsResponse {
  meta: {
    status: number
    success?: boolean
    externalMessage: string
    internalMessage: string
  }
  data: ISector[]
}
