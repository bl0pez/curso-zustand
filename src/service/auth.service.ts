import { AxiosError } from "axios";
import { tesloApi } from "../api/teslo.api";

interface LoginResponse {
  id: string;
  email: string;
  fullName: string;
  isActive: boolean;
  roles: string[];
  token: string;
}

export class AuthService {
  public static login = async (
    email: string,
    password: string
  ): Promise<LoginResponse> => {
    try {
      const { data } = await tesloApi.post<LoginResponse>("/auth/login", {
        email,
        password,
      });
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data);
      }

      throw new Error("An error occurred while trying to login");
    }
  };

  public static checkStatus = async (): Promise<LoginResponse> => {
    try {
      const { data } = await tesloApi.get<LoginResponse>("/auth/check-status");
      return data;
    } catch (error) {
      throw new Error("Unauthorized user");
    }
  };
}
