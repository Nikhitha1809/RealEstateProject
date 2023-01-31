import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/model/user';
import { UserServiceService } from 'src/app/services/user.service';
import { AlertifyService } from 'src/app/services/alertify.service';
@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  registrationForm: FormGroup;
  user:User;
  userSubmitted:boolean;

  constructor(private fb: FormBuilder,
              private userService:UserServiceService,
              private alertify:AlertifyService) { }

  ngOnInit() {
    
    this.createRegistrationForm();
  }

  createRegistrationForm(){
    this.registrationForm=this.fb.group({
      userName:[null, Validators.required],
      email: [null, [Validators.required,Validators.email]],
      password: [null, [Validators.required,Validators.minLength(8)]],
      confirmPassword: [null, [Validators.required]],
      mobile: [null, [Validators.required, Validators.maxLength(10)]]
    },{validators: this.passwordMatchedValidator})
  }

  passwordMatchedValidator(fg: FormGroup): Validators{
    return fg.get('password').value === fg.get('confirmPassword').value? null:{notmatched:true};
  }


  //Getter methods for all form controls

    get userName(){
      return this.registrationForm.get('userName') as FormControl;
    }
    get email(){
      return this.registrationForm.get('email') as FormControl;
    }
    get password(){
      return this.registrationForm.get('password') as FormControl;
    }
    get confirmPassword(){
      return this.registrationForm.get('confirmPassword') as FormControl;
    }
    get mobile(){
      return this.registrationForm.get('mobile') as FormControl;
    }

  onSubmit(){
    console.log(this.registrationForm.value);
    this.userSubmitted=true;
    if(this.registrationForm.valid){
      // this.user = Object.assign(this.user,this.registrationForm.value);
      this.userService.addUser(this.userData());
      this.registrationForm.reset();
      this.userSubmitted=false;
      this.alertify.success('Congrats, you are successfully registered');
    }
    else{
      this.alertify.error('Kindly please provide required fields');
    }
  }
  userData():User{
    return this.user={
      userName: this.userName.value,
      email: this.email.value,
      password: this.password.value,
      mobile: this.mobile.value
    }
  }

}
