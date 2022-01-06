import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface DeviceParam {
  search?: string;
}

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  private domain: string = 'http://localhost:4500/devices';

  constructor(private http: HttpClient) {}

  getDevices(param?: DeviceParam): Observable<any> {
    const { search } = param || {};
    if (search) return this.http.get(`${this.domain}?name_like=${search}`);

    return this.http.get(this.domain);
  }

  getDeviceById(id: number): Observable<any> {
    return this.http.get(`${this.domain}/${id}`);
  }
}
