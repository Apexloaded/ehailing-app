import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap, switchMap, map } from 'rxjs/operators';
import { StorageService } from './storage.services';
import {LoginResponse, Customer, ApiResponse} from '../models';
import { cleanObject } from '../helpers';
import {Observable, Subject, throwError} from 'rxjs';
import {ApiService} from './api.service';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  user: Customer;
  isLoggedIn = false;
  isLoggedInChanged: Subject<boolean> = new Subject<boolean>();
  token = null;

  constructor(
    private router: Router,
    private apiService: ApiService,
  ) {
    this.isLoggedInChanged.subscribe(val => {
      this.isLoggedIn = val;
    });
  }

  get isUserLoggedIn(): boolean {
    return this.isLoggedIn;
  }

  async postLogin(data): Promise<LoginResponse> {
    const payload = cleanObject(data);
    const url = `erp/customers/login`;
    const response = this.apiService.postApi(url, payload)
    .pipe(tap((res: LoginResponse) => {
      if (res.success) {
        const { user, token } = res.payload;
        const authData = {
          userId: user.id,
          userToken: token,
          expirationTime: new Date()
        };
        this.storeAuthData(authData, 'authData');
        this.storeAuthData(user, 'user');
        this.storeHasLaunchedApp(true);
        this.isLoggedInChanged.next(true);
      } else {
        this.isLoggedIn = false;
      }
    }));
    return await response.toPromise();
  }

  creatCustomer(data): Observable<any> {
    const payload = cleanObject(data);
    const url = `erp/+customers`;
    return this.apiService.postApi(url, payload)
    .pipe(
      switchMap((res: any) => {
        if (res.success) {
          const user = {
            phone: res.payload.phone,
            password: data.password
          };
          const loginUrl = `customers/login`;
          const login = this.apiService.postApi(loginUrl, user);
          return login;
        }
        return res;
      }),
      map((res: any) => {
        if (res.success) {
          const { user, token } = res.payload;
          this.storeAuthData(token, 'token');
          this.storeAuthData(user, 'user');
          this.storeHasLaunchedApp(true);
          this.isLoggedIn = true;
          return res;
        }
        return res;
      })
    );
  }

  getOtp(data): Observable<ApiResponse> {
    const payload = cleanObject(data);
    const url = `erp/customers/otp`;
    return this.apiService.postApi(url, payload).pipe(
        map((res: ApiResponse) => {
          if (res.success) {
            return res;
          }
          return  res;
        })
    );
  }

  updateUser(data, id): Promise<ApiResponse> {
    const cData = cleanObject(data);
    const url = `erp/customers/${id}`;
    return this.apiService.updateApi(url, cData).pipe(
        map((res: ApiResponse) => {
          if (res.success) {
            this.storeAuthData(res.payload, 'user');
            return res;
          }
          return  res;
        })
    ).toPromise();
  }

  resetPassword(obj): Promise<ApiResponse> {
    const data = {password: obj.password};
    const payload = cleanObject(data);
    const url = `erp/customers/${obj.id}`;
    return this.apiService.updateApi(url, payload).pipe(
        map((res: ApiResponse) => {
          if (res.success) {
            return res;
          }
          return  res;
        })
    ).toPromise();
  }

  private storeAuthData(data, name) {
    StorageService.setItem(name, data);
  }

  private storeHasLaunchedApp(value) {
    const hasLaunched = {
      hasLaunched: value
    };
    this.storeAuthData(hasLaunched, 'hasLaunched');
  }

  async getUser() {
    this.user = StorageService.getItem('user');
    return this.user;
  }

  async retrieveCustomer(id) {
    const url = `erp/customers?_id${id}`;
    const user = this.apiService.getApi(url).pipe(
        map((res: ApiResponse) => {
          if (res.success) {
            return res.payload;
          }
          throwError(res.message);
        })
    );
    return await user.toPromise();
  }

  public async getToken(): Promise<any> {
    try {
      const token = StorageService.getItem('token');
      if (token != null) {
        this.token = token;
        this.isLoggedIn = true;
      } else {
        this.token = null;
        this.isLoggedIn = false;
      }
      return token;
    } catch (e) {
      return e;
    }
  }

  userLogOut() {
    StorageService.removeItem('authData');
    this.router.navigate(['/login']);
  }

  public hasLaunchedApp() {
    const parsedData = StorageService.getItem('hasLaunched');
    if (!parsedData) {
      return false;
    }
    return !!parsedData.hasLaunched;
  }

  isAuthenticated() {
    const parsedData = StorageService.getItem('authData');
    if (!parsedData) {
      return false;
    }
    this.isLoggedInChanged.next(true);
    return !!parsedData.userToken;
  }
}
