import { ITag } from "../tag.interface"
import { ISector } from '../sector.interface';
import { IAuthor } from "../author/author.interface";
import { IAsset } from "../asset/asset.interface";
import { IPostType } from "../postType.interface";

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