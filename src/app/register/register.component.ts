import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth.service';
import RegisterUser from './../RegisterUser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerUser: RegisterUser = {
    userName: '',
    password: '',
    password2: '',
  };

  warning: string = '';
  success: boolean = false;
  loading: boolean = false;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.registerUser.password != "" && this.registerUser.password2 != "" && this.registerUser.userName != "") {
      this.loading = true;

      this.auth.register(this.registerUser).subscribe(() => {
        this.success = true;
        this.warning = "";
        this.loading = false;
      }, (err) => {
        this.success = false;
        this.warning = err.error.message;
        this.loading = false;
      });
    }
  }

}
