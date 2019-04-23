import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotForm = this.fb.group({
    email: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder) { }

  get email() {
    return this.forgotForm.get('email');
  }

  ngOnInit() {
  }

}
