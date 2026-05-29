import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BookingService } from '../../services/Booking/booking.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-booking',
  imports: [CommonModule, FormsModule],
  templateUrl: './booking.html',
  styleUrl: './booking.css',
})
export class BookingComponent implements OnInit {
  customerName: string = '';
  timeSlot: string = '';
  userName: string = ''; // เก็บชื่อ user
  isSubmitting: boolean = false; // สำหรับแสดงสถานะการส่งข้อมูล

  constructor(public bookingService: BookingService, private toastr: ToastrService) { }

  ngOnInit() {
    // ดึงชื่อ user จาก localStorage
    const storedUserName = localStorage.getItem('userName');
    this.userName = storedUserName ? decodeURIComponent(storedUserName) : 'Guest';
  }

  async submitBooking() {
    if (!this.customerName?.trim() || !this.timeSlot?.trim()) {
      this.toastr.warning('กรุณากรอกข้อมูลให้ครบถ้วน!', 'แจ้งเตือน');
      return;
    }

    const payloadName = this.customerName;
    const payloadTime = this.timeSlot;

    this.isSubmitting = true; // เริ่มแสดง loading state

    try {
      await this.bookingService.createBooking(payloadName, payloadTime);

      this.customerName = '';
      this.timeSlot = '';
      this.toastr.success('เพิ่มคิวใหม่เข้าระบบแล้ว', 'จองคิวสำเร็จ! 🎉');
    } catch (error: any) {
      this.customerName = payloadName;
      this.timeSlot = payloadTime;
      let errorMessage: string = 'เกิดข้อผิดพลาดในการจองคิว';

      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data) {
        errorMessage = error.response.data;
      }
      this.toastr.error(errorMessage, 'จองคิวไม่สำเร็จ ❌');
    } finally {
      this.isSubmitting = false; // หยุด loading state
    }
  }
}
