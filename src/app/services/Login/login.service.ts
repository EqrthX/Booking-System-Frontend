import { Injectable } from '@angular/core';
import { AxiosResponse } from 'axios';
import { ApiService } from '../api.service';
import { LoginPayload, LoginResponse } from '../../models/user';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private loginUrl = "/Auth/login";

  constructor(private apiService: ApiService) { }

  async LoginUser(payloadLogin: LoginPayload): Promise<AxiosResponse<LoginResponse>> {
    try {
      const response = await this.apiService.post<LoginResponse>(this.loginUrl, payloadLogin);
      return response;
    } catch (error: any) {
      console.error('Login API Error:', error.response?.data || error.message);
      throw error;
    }
  }
}
