export interface IAsset {
  slug?: string
  name?: string
  symbol?: string
  iconUrl?: string
  id?: string
}
export interface IApiAssetsResponse {
  meta: {
    status: number
    success?: boolean
    externalMessage: string
    internalMessage: string
  }
  data: IAsset[]
}
