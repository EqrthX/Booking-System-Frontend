import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { RegisterService } from '../../services/Register/register.service';
import { ToastrService } from 'ngx-toastr';
import { RegisterPayload } from '../../models/user';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [RouterLink, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})

export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  confirmPassword = '';

  constructor(private registerService: RegisterService, private toastr: ToastrService, private router: Router) { }

  async onSubmit() {
    if (!this.name || !this.email || !this.password || !this.confirmPassword) {
      this.toastr.warning('กรุณากรอกข้อมูลให้ครบถ้วน', 'แจ้งเตือน');
      return;
    }
    if (this.password.length < 0 || this.confirmPassword.length < 0) {
      this.toastr.error('รหัสผ่านหรือยืนยันรหัสผ่านต้องมีตัวอักษรมากกว่า 1 ตัวเป็นต้นไป', 'เกิดข้อผิดพลาด')
      return;
    }
    if (this.password !== this.confirmPassword) {
      this.toastr.error('รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน!', 'เกิดข้อผิดพลาด');
      return;
    }

    const payload: RegisterPayload = {
      Name: this.name,
      Email: this.email,
      Password: this.password
    }

    try {
      const response = await this.registerService.createUsers(payload);

      if (response) {
        this.toastr.success('สมัครสมาชิกสำเร็จ! กำลังพาท่านไปหน้าเข้าสู่ระบบ...', 'ยินดีด้วย');
        this.router.navigate(['/login']);
      }
    } catch (error: any) {
      const errorMessage = error.response?.data || 'ไม่สามารถสมัครสมาชิกได้';
      this.toastr.error(errorMessage, 'เกิดข้อผิดพลาด');
    }

  }

}
