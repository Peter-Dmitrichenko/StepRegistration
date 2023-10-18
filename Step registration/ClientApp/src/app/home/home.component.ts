import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { RegistrationDialog } from '../dialogs/registrationDialog';
import { Country } from '../models/country';
import { Province } from '../models/province';
import { User } from '../models/user';
import { CountryService } from '../services/countryService';
import { UserService } from '../services/userService';
import { createCompareValidator } from '../validators/createCompareValidator';
import { createPasswordStrengthValidator } from '../validators/createPasswordStrengthValidator';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  readonly emailRegex: string = '^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$';

  countries: Country[] = [];
  provinces: Province[] = [];

  isNextClicked: boolean = false;

  loginCtrlName: string = "loginCtrl";
  passwordCtrlName: string = "passwordCtrl";
  confirmPasswordCtrlName: string = "confirmPasswordCtrl";
  agreeCtrlName: string = "agreeCtrl";

  countryCtrlName: string = "countryCtrl";
  provinceCtrlName: string = "provinceCtrl";

  countryServiceSubscription!: Subscription;
  registerUserSubscription!: Subscription;
  dialogSubscription!: Subscription;


  firstFormGroup: FormGroup = new FormGroup([]);
  secondFormGroup: FormGroup = new FormGroup([]);

  loginCtrl: AbstractControl = new FormControl();
  agreeCtrl: AbstractControl = new FormControl();
  passwordCtrl: AbstractControl = new FormControl();
  confirmPasswordCtrl: AbstractControl = new FormControl();

  countryCtrl: AbstractControl = new FormGroup([]);
  provinceCtrl: AbstractControl = new FormGroup([]);


  constructor(private _countryService: CountryService,
    private _userService: UserService,
    private _ref: ChangeDetectorRef,
    public dialog: MatDialog,
    @Inject(DOCUMENT) private _document: Document) { }

  ngOnInit() {
    this.initControls();

    this.countryServiceSubscription = this._countryService.getCountries().subscribe(e => {
      this.countries = e;
    });
  }

  initControls(): void {
    this.firstFormGroup = new FormGroup([]);

    this.loginCtrl = new FormControl("", [Validators.required, Validators.pattern(this.emailRegex)]);
    this.passwordCtrl = new FormControl("", [Validators.required, createPasswordStrengthValidator()]);
    this.confirmPasswordCtrl = new FormControl("", [Validators.required]);

    this.confirmPasswordCtrl.addValidators(createCompareValidator(this.passwordCtrl, this.confirmPasswordCtrl));
    this.agreeCtrl = new FormControl("", Validators.required);

    this.firstFormGroup.addControl(this.loginCtrlName, this.loginCtrl);
    this.firstFormGroup.addControl(this.passwordCtrlName, this.passwordCtrl);
    this.firstFormGroup.addControl(this.confirmPasswordCtrlName, this.confirmPasswordCtrl);
    this.firstFormGroup.addControl(this.agreeCtrlName, this.agreeCtrl);

    this.countryCtrl = new FormControl('', Validators.required);
    this.provinceCtrl = new FormControl('', Validators.required);

    this.secondFormGroup = new FormGroup([]);

    this.secondFormGroup.addControl(this.countryCtrlName, this.countryCtrl);
    this.secondFormGroup.addControl(this.provinceCtrlName, this.provinceCtrl);
  }

  ngOnDestroy() {
    this.countryServiceSubscription?.unsubscribe();
    this.registerUserSubscription?.unsubscribe();
    this.dialogSubscription?.unsubscribe();
  }

  onCountrySelectionChanged(value: string): void {
    if (value) {
      let provinces = this.countries.find(e => e.id === value)?.provinces;

      this.provinces = provinces ? provinces : [];

      if (!this.provinces.some(e => e.id === this.provinceCtrl.value)) {
        this.provinceCtrl.setValue("");
      }
    }
  }

  onPasswordChange(): void {
    if (this.confirmPasswordCtrl.invalid && this.passwordCtrl.valid) {
      this.confirmPasswordCtrl.patchValue(this.confirmPasswordCtrl.value);
    }
  }

  onStepsClick(): void {
    this.firstFormGroup.markAsDirty();
    this.isNextClicked = true;
    this._ref.markForCheck();
  }

  onSaveClick(): void {
    this.secondFormGroup.markAsDirty();
    this._ref.markForCheck();

    if (this.firstFormGroup.valid && this.secondFormGroup.valid) {
      this.registerUserSubscription = this._userService.saveUser(
        new User(
          this.loginCtrl.value,
          this.passwordCtrl.value,
          this.agreeCtrl.value,
          this.countryCtrl.value,
          this.provinceCtrl.value,
        )
      ).subscribe(() => {
        this.openDialog();
      }, e => {
        console.log(e);
      }
      )
    }
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(RegistrationDialog, {
      data: { name: this.loginCtrl.value },
    });

    this.dialogSubscription = dialogRef.afterClosed().subscribe(result => {
      this._document.location.reload();
    });
  }
}
