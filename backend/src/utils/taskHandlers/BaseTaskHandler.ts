import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import {
  TaskHandler,
  TaskConfig,
  TaskType,
  TaskCategory,
  NotificationData,
} from "../types";

export abstract class BaseTaskHandler implements TaskHandler {
  protected axiosInstance: AxiosInstance;
  abstract type: TaskType;
  abstract category: TaskCategory;

  constructor() {
    this.axiosInstance = axios.create({
      timeout: 30000,
      headers: {
        "User-Agent": "ALMAJLIS-Bot/1.0 (Automation Engine)",
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    // Request interceptor
    this.axiosInstance.interceptors.request.use(
      (config) => {
        console.log(`[${this.type}] Making request to: ${config.url}`);
        return config;
      },
      (error) => {
        console.error(`[${this.type}] Request error:`, error);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.axiosInstance.interceptors.response.use(
      (response) => {
        console.log(
          `[${this.type}] Response: ${response.status} ${response.statusText}`
        );
        return response;
      },
      (error) => {
        this.handleHttpError(error);
        return Promise.reject(error);
      }
    );
  }

  abstract execute(config: TaskConfig): Promise<any[]>;

  // Default comparison for polling tasks
  compare(oldData: any[], newData: any[]): any[] {
    if (!oldData.length) return newData;

    const oldIds = new Set(oldData.map((item) => this.getId(item)));
    return newData.filter((item) => !oldIds.has(this.getId(item)));
  }

  abstract formatForNotification(data: any[]): NotificationData[];
  abstract validateConfig(config: TaskConfig): boolean;

  protected abstract getId(item: any): string;

  protected async makeRequest<T = any>(
    url: string,
    config: TaskConfig,
    additionalConfig?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    const requestConfig: AxiosRequestConfig = {
      url,
      method: "GET",
      timeout: config.timeout || 30000,
      headers: {
        ...config.headers,
      },
      params: config.queryParams,
      ...additionalConfig,
    };

    // Add API key authentication
    if (config.apiKey) {
      requestConfig.headers = {
        ...requestConfig.headers,
        Authorization: `Bearer ${config.apiKey}`,
        "X-API-Key": config.apiKey,
      };
    }

    return await this.axiosInstance.request<T>(requestConfig);
  }

  private handleHttpError(error: any): void {
    if (error.response) {
      const status = error.response.status;
      switch (status) {
        case 401:
          throw new Error("Invalid API key or authentication failed");
        case 403:
          throw new Error("API access forbidden. Check your permissions.");
        case 429:
          const retryAfter = error.response.headers["retry-after"];
          throw new Error(
            `Rate limited. Retry after: ${retryAfter || "unknown"} seconds`
          );
        case 500:
        case 502:
        case 503:
        case 504:
          throw new Error(
            `API server error: ${status} ${error.response.statusText}`
          );
        default:
          throw new Error(`HTTP Error: ${status} ${error.response.statusText}`);
      }
    }
  }
}
