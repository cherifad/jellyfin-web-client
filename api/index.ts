import axios, { AxiosInstance } from "axios";
import { useAuthStore } from "@/stores/useAuth";
import { useConfigStore } from "@/stores/useConfig";

export default class JellyfinApi {

  static instance: JellyfinApi | null;
  private _api: AxiosInstance;
  private _initialized: boolean = false;
  private _userId: string = "";

  public get api(): AxiosInstance {
    return this._api;
  }

  private set api(api: AxiosInstance) {
    this._api = api;
  }

  // get, private set for _userId
  public get userId(): string {
    return this._userId;
  }

  private set userId(userId: string) {
    this._userId = userId;
  }

  private constructor(serverUrl?: string, apiKey?: string, userIdParam?: string) {

    const jellyfin = axios.create({
      timeout: 5000
    });

    if (serverUrl) {
      jellyfin.defaults.baseURL = serverUrl;
    }

    if (apiKey) {
      jellyfin.defaults.headers.common['X-Emby-Token'] = apiKey;
    }

    if (userIdParam) {
      this._userId = userIdParam;
    }

    // jellyfin.interceptors.request.use(
    //   (config) => {
    //     console.log("JellyfinApi.interceptors.request", config);
    //     return config;
    //   },  
    //   (error) => {
    //     console.log("JellyfinApi.interceptors.request.error", error);
    //     return Promise.reject(error);
    //   }
    // );

    // jellyfin.interceptors.response.use(
    //   (response) => {
    //     console.log("JellyfinApi.interceptors.response", response);
    //     return response;
    //   },
    //   (error) => {
    //     console.log("JellyfinApi.interceptors.response.error", error);
    //     return Promise.reject(error);
    //   }
    // );

    this._api = jellyfin;
  }

  public static getInstance(serverUrl?: string, apiKey?: string, userIdParam?: string): JellyfinApi {
    if (!this.instance) {
      this.instance = new JellyfinApi(serverUrl, apiKey, userIdParam);
    }
    return this.instance;
  }

  public static destroyInstance(): void {
    this.instance ? this.instance._initialized = false : null;
    JellyfinApi.instance = null;
  }

  private static initialize(): void {
    const authStore = useAuthStore();
    const configStore = useConfigStore();

    if (this.instance) {
      if (authStore.authenticated && this.instance.api.defaults.headers.common['X-Emby-Token'] !== authStore.accessTokenValue) {
        this.instance.api.defaults.headers.common['X-Emby-Token'] = authStore.accessTokenValue;
      }
      if (configStore.selectedServerUrlValue && this.instance.api.defaults.baseURL !== configStore.selectedServerUrlValue) {
        this.instance.api.defaults.baseURL = configStore.selectedServerUrlValue;
      }
      this.instance._initialized = true;
    }
  }
}