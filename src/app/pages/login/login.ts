import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../services/Login/login.service';
import { ToastrService } from 'ngx-toastr';
import { LoginPayload, LoginResponse } from '../../models/user';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  Email = '';
  Password = '';

  constructor(private loginService: LoginService, private toastr: ToastrService, private router: Router) {

  }

  async onSubmit() {
    if (!this.Email?.trim() || !this.Password?.trim()) {
      this.toastr.warning('กรุณากรอกข้อมูลให้ครบถ้วน', 'แจ้งเตือน');
      return;
    }

    const payload: LoginPayload = {
      email: this.Email,
      password: this.Password
    }

    try {
      const response = await this.loginService.LoginUser(payload);
      const loginData = response.data as LoginResponse;

      console.log("Login Response:", loginData);

      // เก็บ tokens ลง localStorage
      localStorage.setItem('accessToken', loginData.accessToken);
      localStorage.setItem('refreshToken', loginData.refreshToken);
      localStorage.setItem('userId', loginData.userId);
      localStorage.setItem('userName', encodeURIComponent(loginData.name));

      this.toastr.success('เข้าสู่ระบบสำเร็จ', 'สำเร็จ');
      this.router.navigate(['/booking']); // เปลี่ยนไปหน้า booking

    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'ไม่สามารถเข้าสู่ระบบได้';
      this.toastr.error(errorMessage, 'เกิดข้อผิดพลาด');
      console.error('Login Error:', error);
    }
  }
}
