import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  constructor(
    private http: HttpClient
  ) { }

  receivePredefinedRoles() {
    return this.http.get('/role');
  }

  checkEmail(email: string) {
    return this.http.get('/record/exists', { params: {email: encodeURIComponent(email)}});
  }

  receiveStats(search = '', role = '') {
    const queryParams = Object.create({});
    if (search) {
      queryParams.search = encodeURIComponent(search);
    }
    if (role) {
      queryParams.role = encodeURIComponent(role);
    }
    return this.http.get('/record/stats', {
      params: queryParams
    });
  }

  receiveMany(search = '', role = '') {
    const queryParams = Object.create({});
    if (search) {
      queryParams.search = encodeURIComponent(search);
    }
    if (role) {
      queryParams.role = encodeURIComponent(role);
    }
    return this.http.get('/record', {
      params: queryParams
    });
  }

  receive(_id: string) {
    const queryParams = Object.create({});
    queryParams._id = encodeURIComponent(_id);
    return this.http.get('/record', {
      params: queryParams
    });
  }

  create(record: any) {
    return this.http.post('/record', {...record});
  }

  update(_id, payload: any) {
    return this.http.patch(`/record/${_id}`, {...payload});
  }

  remove(record: any) {
    return this.http.delete(`/record/${record._id}`);
  }

}
