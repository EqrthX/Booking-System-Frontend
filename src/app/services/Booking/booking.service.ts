import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as signalR from '@microsoft/signalr';
import { ApiService } from '../api.service';

export interface Booking {
  id?: string;
  customerName: string;
  timeSlot: string;
  status?: string;
}

@Injectable({
  providedIn: 'root',
})

export class BookingService {
  private hubConnection!: signalR.HubConnection;
  private bookingSource = new BehaviorSubject<Booking[]>([]);
  public bookings$ = this.bookingSource.asObservable();

  private url = "/bookings";

  constructor(private apiService: ApiService) {
    this.startConnection();
    this.addBookingListener();
  }

  private startConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7214/bookingHub')
      .build();

    this.hubConnection.start()
      .then(() => console.log('🟢 SignalR Connected Successfully!'))
      .catch(err => console.error('🔴 Error while starting SignalR connection: ' + err));
  }

  // 4. ฟังก์ชันรอรับฟังข่าวสาร (Broadcast) จาก Backend
  private addBookingListener() {
    // คำว่า 'BookingAdded' ต้องพิมพ์ให้ตรงกับที่เราเขียนไว้ใน C# BookingsController
    this.hubConnection.on('BookingAdded', (newBooking: Booking) => {
      console.log('🎉 New booking received:', newBooking);

      // ดึงข้อมูลคิวเดิมออกมา แล้วเอาคิวใหม่ไปต่อท้าย
      const currentBookings = this.bookingSource.value;
      this.bookingSource.next([...currentBookings, newBooking]);
    });
  }

  public async createBooking(customerName: string, timeSlot: string): Promise<Booking> {
    try {
      const response = await this.apiService.post<Booking>(this.url, {
        customerName: customerName,
        timeSlot: timeSlot
      });
      return response.data as Booking;
    } catch (error) {
      console.error('Create Booking Error:', error);
      throw error;
    }
  }

}
