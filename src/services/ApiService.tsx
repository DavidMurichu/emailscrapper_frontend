import axios, { AxiosResponse } from 'axios';

// export const BASE_URL = "http://127.0.0.1:8000/api";
export const BASE_URL = "https://f0ab13347cd4b7f742b1425d66055a32.serveo.net/api";

// Define an interface for the data structure you expect to receive

interface FetchDataResponse {
  total_emails_count: number;
  valid_emails_count: number;
  invalid_emails_count: number;
  success_rate: number; // New field
  total_url_in_db: number; // New field
  scrapped_urls: number; // New field
  unscrapped_urls: number; // New field
  timestamp: number; // Timestamp for graph
}


// Function to fetch data
export const fetchData = async (endpoint: string): Promise<AxiosResponse<FetchDataResponse> | { data: FetchDataResponse; status: number }> => {
  try {
    const response: AxiosResponse<FetchDataResponse> = await axios.get<FetchDataResponse>(`${BASE_URL}/${endpoint}/`);
    return response;
  } catch (err) {
    console.error(err);
    return {
      data: {
        total_emails_count: 0,
        valid_emails_count: 0,
        invalid_emails_count: 0,
        success_rate: 0, // New field
        total_url_in_db: 0, // New field
        scrapped_urls: 0, // New field
        unscrapped_urls: 0, // New field
        timestamp: 0,
      },
      status: 500,
    };
  }
};


// Define an interface for the expected response
interface PostDataResponse {
  success: boolean;
  message: string;
  data?: any; // You can define a more specific type if you know the structure
}

// Function to post data
export const postData = async (endpoint: string, payload: any): Promise<AxiosResponse<PostDataResponse> | { data: PostDataResponse; status: number }> => {
  try {
    const response: AxiosResponse<PostDataResponse> = await axios.post<PostDataResponse>(`${BASE_URL}/${endpoint}/`, payload);
    return response;
  } catch (err) {
    console.error(err);
    return {
      data: {
        success: false,
        message: 'Failed to post data',
      },
      status: 500,
    };
  }
};