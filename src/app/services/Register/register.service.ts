import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import axios from 'axios';
import { RegisterPayload } from '../../models/user';

@Injectable({
  providedIn: 'root',
})

export class RegisterService {
  private apiUrl = `${environment.apiUrl}`;

  async createUsers(payloadRegister: RegisterPayload) {
    const response = await axios.post(`${this.apiUrl}/Auth/register`, payloadRegister)
    return response.data;
  }
}
