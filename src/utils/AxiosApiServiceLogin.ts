import { AxiosRequestConfig } from "axios";
import axios, { AxiosResponse } from "axios";
import { BASE_URL_USER_LOGIN } from "../constants";
import { getAccessToken } from './helpers';

const accessToken = getAccessToken()// Thay bằng accessToken hợp lệ
const client = axios.create({
  baseURL: BASE_URL_USER_LOGIN, // Thay bằng base URL API của bạn
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});

export interface LoginRequest {
  email: string;
  password: string;
}
export interface Meta {
  status: number;
  success: boolean;
  externalMessage: string;
  internalMessage: string;
}

export interface LoginResponse {
  meta: Meta;
  data: {
    accessToken: string;
  };
}
export interface IAuthor {
  name?: string;
  username?: string;
  avatar?: string;
  id?: string;
}

export interface ITag {
  name?: string;
  slug?: string;
  id?: string;
  iconUrl?: string;
}

export interface ISector {
  name?: string;
  slug?: string;
  id?: string;
  isParent?: boolean;
  iconUrl?: string;
}

export interface IAsset {
  slug?: string;
  name?: string;
  symbol?: string;
  iconUrl?: string;
  id?: string;
}

export interface IPostType {
  name?: string;
  slug?: string;
  id?: string;
  iconUrl?: string
}

export interface IPost {
  id?: string;
  uuid?: string;
  slug?: string;
  title?: string;
  excerpt?: string;
  authors?: IAuthor[];
  tags?: ITag[];
  sectors?: ISector[];
  assets?: IAsset[];
  postType?: IPostType;
  postFormat?: string;
  status?: string;
  visibility?: string;
  totalView?: number;
  totalShare?: number;
  totalWord?: number;
  readingTime?: number;
  publishedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
}
export interface ErrorResponse {
  meta: Meta;
}

// Định nghĩa kiểu lỗi cho các response lỗi
export interface AxiosErrorResponse {
  response: {
    data: ErrorResponse; // Thay đổi để chứa lỗi trả về từ API
  };
}

export interface IApiPostResponse {
  meta: {
    status: number;
    success?: boolean;
    externalMessage: string;
    internalMessage: string;
  }
  data: {
    page: number;
    pageSize: number;
    total: number;
    datas: IPost[];
  };
}
export interface IApiUserResponse {
  meta: {
    status: number;
    success?: boolean;
    externalMessage: string;
    internalMessage: string;
  }
  data: {
    page: number;
    pageSize: number;
    total: number;
    datas: IPost[];
  };
}



// Hàm request login
const requestUserLogin = async <T>(options: AxiosRequestConfig): Promise<T> => {
  const onSuccess = (response: AxiosResponse<T>) => response.data;
  const onError = (error: AxiosErrorResponse) => {
    // Trả về lỗi chi tiết từ API
    return Promise.reject(error.response?.data); // Ném toàn bộ lỗi từ API
  };

  return client(options).then(onSuccess).catch(onError);
};

// Hàm đăng nhập
export const loginWithAxios = async (data: LoginRequest): Promise<LoginResponse> => {
  try {
    const response = await requestUserLogin<LoginResponse>({
      url: "/api/v1/cms/auths/login",
      method: "POST",
      data, // Gửi dữ liệu đăng nhập
    });
    console.log("response: ", response);
    return response;
  } catch (error: any) {
    // Lỗi sẽ chứa toàn bộ dữ liệu lỗi từ API
    console.error("Đăng nhập thất bại:", error);
    throw error; // Ném lỗi ra để React Query xử lý
  }
};
// Hàm lấy thông tin bài viết
// Hàm lấy thông tin các bài viết
// export const getPostInfo = async (page: number, pageSize: number, accessToken: string): Promise<IApiPostResponse> => {
//   try {
//     const response = await requestUserLogin<IApiPostResponse>({
//       url: `/api/v1/cms/posts?page=${page}&pageSize=${pageSize}`,
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });
//     // console.info("Thông tin bài viết:", response.data.datas);
//     // console.log(response.data)
//     return response;
//   } catch (error: any) {
//     console.error("Không thể lấy thông tin bài viết:", error);
//     throw new Error("Không thể lấy thông tin bài viết. Vui lòng thử lại sau.");
//   }
// };
export const getUserInfo = async (): Promise<T> => {
  try {
    const response = await requestUserLogin<T>({
      url: `api/v1/cms/posts/filter/authors`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    // console.info("Thông tin bài viết:", response.data.datas);
    // console.log(response.data)
    return response;
  } catch (error: any) {
    console.error("Không thể lấy thông tin bài viết:", error);
    throw new Error("Không thể lấy thông tin bài viết. Vui lòng thử lại sau.");
  }
};


export const fetchPosts = async (page?: number, pageSize?: number, authors?: string[]) => {
  try {
    // Lấy thông tin tác giả
    const authorsResponse = await client.get('api/v1/cms/posts/filter/authors');

    // Lấy danh sách bài viết
    const postsResponse = await client.get('api/v1/cms/posts', {
      params: { page, pageSize, authors },
    });

    // Trả về dữ liệu gộp
    return {
      authors: authorsResponse.data,
      posts: postsResponse.data,
    };
  } catch (error: any) {
    console.error('Lỗi khi lấy dữ liệu:', error);
    throw new Error('Không thể lấy dữ liệu. Vui lòng thử lại sau.');
  }
};
export const fetchAuthors = async () => {
  try {
    // Lấy thông tin tác giả
    const authorsResponse = await client.get('api/v1/cms/posts/filter/authors');
    // Trả về dữ liệu gộp
    return {
      authors: authorsResponse.data,
    };
  } catch (error: any) {
    console.error('Lỗi khi lấy dữ liệu:', error);
    throw new Error('Không thể lấy dữ liệu. Vui lòng thử lại sau.');
  }
};