import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Booking, BookingService } from './services/Booking/booking.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  customerName: string = '';
  timeSlot: string = '';
  protected readonly title = signal('booking-frontend');
  constructor(private bookingService: BookingService) { }

  async submitBooking() {
    if (!this.customerName || !this.timeSlot) {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน!');
      return;
    }

    try {
      // 1. เรียกใช้ API ผ่าน Service (โค้ดดูสะอาดและอ่านง่ายมาก)
      await this.bookingService.createBooking(this.customerName, this.timeSlot);

      // 2. ถ้าจองสำเร็จ ให้ล้างช่องกรอกข้อมูล
      this.customerName = '';
      this.timeSlot = '';
    } catch (error) {
      // 3. ถ้าฝั่ง Backend เตะกลับมา (เช่น เลือกเวลาในอดีต) จะเข้า catch ตรงนี้
      alert('เกิดข้อผิดพลาดในการจอง (อย่าลืมเลือกเวลาในอนาคตนะ!)');
    }
  }
}
