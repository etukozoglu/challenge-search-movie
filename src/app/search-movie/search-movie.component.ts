import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-movie',
  templateUrl: './search-movie.component.html',
  styleUrls: ['./search-movie.component.scss']
})
export class SearchMovieComponent implements OnInit {

  submitted: boolean = false;
  // Declare all controls with validation rules

  orderForm = this.fb.group({
    info: this.fb.group({
      titre: [''],
      identifiant: [''],
    }, {
      validators: this.isRequiredValidator('titre', 'identifiant')
    }),
    date: ['', this.rangeDateValidator.bind(this)],
    type: [''],
    fiche: [''],
  })



  currentDate = new Date();
  currentYear = this.currentDate.getFullYear();


  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.f.type.patchValue("film");
    this.f.fiche.patchValue("courte");

    this.orderForm.valueChanges
      // Listens to new values ​​issued when any FormConrol is changed
      .subscribe(value => {
        // Display FormGroup as JSON object
        console.log(value);  // --> {user: 'John Doe', email: 'john@doe.gouv', [...]}
      });
  }

  rangeDateValidator(control: FormControl) {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const minYear = 1900;
    const anneeRenseigne = control.value;
    if (anneeRenseigne < minYear || anneeRenseigne > currentYear) {
      return { invalidDate: true }
    } else {
      return null
    }
  }

  get f() {
    return this.orderForm.controls;
  }

  onSubmit() {
    // Get form value as JSON object
    this.submitted = true;
    if (this.orderForm.valid) {
      console.log('Form submitted:', this.orderForm.value);
      console.log(JSON.stringify(this.orderForm.value));
    }
  }

  onReset(): void {
    this.submitted = false;
    this.f['type'].patchValue("film");
    this.f['fiche'].patchValue("courte");
  }


  isRequiredValidator(controlName1: string, controlName2: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

      const value1 = control.get(controlName1)?.value;
      const value2 = control.get(controlName2)?.value;

      if (value1 === '' && value2 === '') {
        return { 'isRequired': true };
      } else {
        return null;
      }
    };
  }
}