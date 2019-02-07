import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable()
export class LoginService {
  loginEvent = new Subject();
}