# 🅰️ Enterprise Resource Booking System - Frontend Dashboard

ระบบหน้าบ้าน (Frontend UI) สำหรับโครงการ **Enterprise Resource Booking System** พัฒนาด้วย Angular และตกแต่งดีไซน์ด้วย Tailwind CSS ในรูปแบบ **NOC Dashboard (Network Operations Center)** เพื่อให้ผู้ดูแลระบบสามารถมอนิเตอร์และส่งคำขอจองทรัพยากรภายในองค์กรได้แบบ Real-time

> ⚠️ **คำเตือนในการใช้งาน:** Repository นี้เป็นเพียงระบบหน้าบ้าน (UI) เท่านั้น จำเป็นต้องใช้งานร่วมกับระบบหลังบ้าน (Backend API) สามารถเข้าถึงซอร์สโค้ดฝั่งหลังบ้านได้ที่:
> 🔗 **Backend Repository:** [https://github.com/EqrthX/Booking-System-Backend](https://github.com/EqrthX/Booking-System-Backend)

---

## 🚀 คุณสมบัติเด่น (Core Features)
* **Glassmorphism Design Theme:** ดีไซน์หน้าจอทันสมัย ใช้เอฟเฟกต์กระจกใสซ้อนทับแอนิเมชัน SVG พื้นหลังที่นุ่มนวล สบายตา และไม่รบกวนสมาธิผู้ใช้งาน
* **3-Column Command Center Grid:** จัดวางเลย์เอาต์หน้าจออัจฉริยะ แบ่งสัดส่วนข้อมูลชัดเจนในหน้าเดียว:
  1. **Meeting Rooms Status Monitor:** แสดงสถานะว่าง/ไม่ว่าง ของห้องประชุมทั้ง 10 ห้อง
  2. **DB Servers Status Monitor:** แสดงสถานะการทำงานของเซิร์ฟเวอร์ทั้ง 10 เครื่อง
  3. **Live Booking Logs Panel:** แสดงประวัติการทำรายการจองล่าสุดที่ถูกซิงค์ข้อมูลแบบเรียลไทม์
* **Comprehensive Booking Form:** ฟอร์มรับข้อมูลจองทรัพยากรที่ใช้งานง่าย รองรับการกรอกชื่อ วันเวลา ประเภท และหมายเลขทรัพยากร
* **Responsive Layout:** หน้าจอปรับขนาดการแสดงผลโดยอัตโนมัติ รองรับทั้งบนคอมพิวเตอร์ แท็บเล็ต และสมาร์ทโฟน

---

## 🛠️ เทคโนโลยีที่เลือกใช้ (Tech Stack)
* **Frontend Framework:** Angular
* **CSS Framework:** Tailwind CSS
* **State Management/Services:** RxJS Observables (Real-time stream)

---

## ⚙️ ขั้นตอนการติดตั้งและเริ่มใช้งาน (Getting Started)

1. **Clone Repository นี้ลงเครื่อง:**
```bash
   git clone [https://github.com/EqrthX/Booking-System-Frontend.git](https://github.com/EqrthX/Booking-System-Frontend.git)
   cd Booking-System-Frontend
```
2. **ติดตั้ง Dependencies ทั้งหมดผ่าน npm:
```bash
   npm install
```
3. **เริ่มรันเซิร์ฟเวอร์สำหรับพัฒนาหน้าบ้าน:
```bash
   ng serve
```
