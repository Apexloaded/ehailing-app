import { Component, OnInit } from '@angular/core';
import {PreviousRouteService} from '../../services/previous-route.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {LoadingController} from '@ionic/angular';
import {AuthService} from '../../services';
import {Router} from '@angular/router';
import {UtilitiesService} from '../../services/utilities.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public previousRoute: string;
  loginForm: FormGroup;

  constructor(
      private formBuilder: FormBuilder,
      private authService: AuthService,
      private router: Router,
      private loadingCtrl: LoadingController,
      private prevRoute: PreviousRouteService,
      private utilitiesService: UtilitiesService
  ) { }

  ngOnInit() {
    this.fields();
  }

  ionViewWillEnter() {
    this.previousRoute = this.prevRoute.getPreviousRoute;
    if (this.previousRoute !== null &&
        !this.previousRoute.includes('/login') &&
        !this.previousRoute.includes('/reset-password') &&
        !this.previousRoute.includes('/signup')
    ) {
      return;
    }
    this.previousRoute = '/welcome';
  }

  fields() {
    this.loginForm = this.formBuilder.group({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(8), Validators.maxLength(100)
      ]),
      password: new FormControl('', [Validators.required]),
    });
  }

  validateEmail(email: string) {
    const re = /^[a-z][a-zA-Z0-9_.]*(\.[a-zA-Z][a-zA-Z0-9_.]*)?@[a-z][a-zA-Z-0-9]*\.[a-z]+(\.[a-z]+)?$/;
    return re.test(email);
  }

  phoneValidation(phone: string) {
    const re = /^[0][0-9]/;
    return re.test(phone);
  }

  async login() {
    // this.navCtrl.setRoot('page-home');
    const { username, password } = this.loginForm.value;
    const payload = { email: username, phone: username, password };

    if (this.validateEmail(username)){
      delete payload.phone;
    } else if (this.phoneValidation(username)) {
      delete payload.email;
    } else {
      // invalid input
      this.utilitiesService.presentToast('Enter a correct email or phone number', 3000);
      return;
    }
    if (!this.loginForm.controls.password.valid) {
      this.utilitiesService.presentToast('Enter your password', 3000);
      return;
    }

    this.loadingCtrl.create({
      spinner: 'dots'
    }).then(el => {
      el.present();
      this.authService.postLogin(payload).then((res: any) => {
        if (res.success) {
          el.dismiss();
          this.utilitiesService.presentToast(`Welcome to PMT Mobile`, 3000);
          this.loginForm.reset();
          this.router.navigate(['/home']);
          return;
        }
      }).catch((error) => {
        el.dismiss();
        if (error === 'Unknown Error') {
          this.utilitiesService.presentToast('Something went wrong, please try again', 3000);
          return;
        }
        this.utilitiesService.presentToast(error, 3000);
      });
    });
  }

  returnBack(url) {
    this.router.navigateByUrl(`${url}`);
  }

}
