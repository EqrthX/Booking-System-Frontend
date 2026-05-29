import { Injectable } from '@angular/core';
import axios, { AxiosInstance, AxiosError } from 'axios';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    private axiosInstance: AxiosInstance;

    constructor(private toastr: ToastrService) {
        // สร้าง axios instance ที่เป็น centralized
        this.axiosInstance = axios.create({
            baseURL: 'https://localhost:7214/api',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Request interceptor - เพิ่ม token ในทุกคำขอ
        this.axiosInstance.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem('accessToken');
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        // Response interceptor - จัดการ error อย่างสม่ำเสมอ
        this.axiosInstance.interceptors.response.use(
            (response) => {
                return response;
            },
            (error: AxiosError) => {
                // ถ้า token หมดอายุ (401) ให้ redirect ไปหน้า login
                if (error.response?.status === 401) {
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                    localStorage.removeItem('userId');
                    localStorage.removeItem('userName');
                    window.location.href = '/login';
                    this.toastr.error('Session หมดอายุ กรุณาเข้าสู่ระบบใหม่', 'เซสชั่นหมดอายุ');
                }

                // ถ้า server error (5xx)
                if (error.response?.status && error.response.status >= 500) {
                    this.toastr.error('เกิดข้อผิดพลาดบน Server', 'Server Error');
                }

                // ถ้า bad request (4xx)
                if (error.response?.status && error.response.status >= 400 && error.response.status < 500) {
                    const errorMessage =
                        (error.response.data as any)?.message ||
                        (error.response.data as any)?.Message ||
                        'มีข้อผิดพลาดในการส่งข้อมูล';
                    console.error('API Error:', errorMessage);
                }

                return Promise.reject(error);
            }
        );
    }

    // Generic methods สำหรับใช้ง่าย
    get<T>(url: string) {
        return this.axiosInstance.get<T>(url);
    }

    post<T>(url: string, data?: any) {
        return this.axiosInstance.post<T>(url, data);
    }

    put<T>(url: string, data?: any) {
        return this.axiosInstance.put<T>(url, data);
    }

    delete<T>(url: string) {
        return this.axiosInstance.delete<T>(url);
    }
}
