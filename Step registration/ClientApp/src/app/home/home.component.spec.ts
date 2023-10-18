import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ChangeDetectorRef } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RegistrationDialog } from '../dialogs/registrationDialog';
import { CountryService } from '../services/countryService';
import { UserService } from '../services/userService';
import { HomeComponent } from './home.component';


describe('HomeComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatDialogModule
      ],
      declarations: [
        HomeComponent,
      ],
      providers: [
        RegistrationDialog,

        FormBuilder,
        CountryService,
        UserService,
        ChangeDetectorRef,
        MatDialog,
        Document,
        HttpClient ,
      ],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  it('should create the component', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should init`, () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const app = fixture.debugElement.componentInstance as HomeComponent;
    expect(() => app.ngOnInit()).not.toThrow();
  });

  it(`should open dialog`, () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const app = fixture.debugElement.componentInstance as HomeComponent;
    expect(() => app.openDialog()).not.toThrow();
  });

  it(`should save`, () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const app = fixture.debugElement.componentInstance as HomeComponent;
    expect(() => app.onSaveClick()).not.toThrow();
  });

  it(`should validate login`, () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const app = fixture.debugElement.componentInstance as HomeComponent;

    app.loginCtrl.setValue("");
    fixture.detectChanges();
    expect(app.loginCtrl.valid).toBeFalsy();

    app.loginCtrl.setValue("asd");
    fixture.detectChanges();
    expect(app.loginCtrl.valid).toBeFalsy();

    app.loginCtrl.setValue("asd@asd.asd");
    fixture.detectChanges();
    expect(app.loginCtrl.valid).toBeTruthy();
  });

  it(`should validate password`, () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const app = fixture.debugElement.componentInstance as HomeComponent;

    app.passwordCtrl.setValue("");
    fixture.detectChanges();
    expect(app.passwordCtrl.valid).toBeFalsy();

    app.passwordCtrl.setValue("asd1");
    fixture.detectChanges();
    expect(app.passwordCtrl.valid).toBeFalsy();

    app.passwordCtrl.setValue("1111");
    fixture.detectChanges();
    expect(app.passwordCtrl.valid).toBeFalsy();

    app.passwordCtrl.setValue("ASD1!");
    fixture.detectChanges();
    expect(app.passwordCtrl.valid).toBeTruthy();
  });

  it(`should validate confirm password`, () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const app = fixture.debugElement.componentInstance as HomeComponent;

    app.confirmPasswordCtrl.setValue("");
    fixture.detectChanges();
    expect(app.confirmPasswordCtrl.valid).toBeFalsy();

    app.passwordCtrl.setValue("ASD2!");
    app.confirmPasswordCtrl.setValue("ASD1!");
    fixture.detectChanges();
    expect(app.confirmPasswordCtrl.valid).toBeFalsy();

    app.passwordCtrl.setValue("ASD1!");
    app.confirmPasswordCtrl.setValue("ASD1!");
    fixture.detectChanges();

    expect(app.confirmPasswordCtrl.valid).toBeTruthy();
  });

  it(`should validate agree`, () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const app = fixture.debugElement.componentInstance as HomeComponent;

    app.agreeCtrl.setValue(false);
    fixture.detectChanges();
    expect(app.agreeCtrl.valid).toBeFalsy();

    app.agreeCtrl.setValue(true);
    fixture.detectChanges();
    expect(app.agreeCtrl.valid).toBeTruthy();
  });

  it(`should validate countries`, () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const app = fixture.debugElement.componentInstance as HomeComponent;

    fixture.detectChanges();
    expect(app.countryCtrl.valid).toBeFalsy();

    app.countryCtrl.setValue("Guid");
    fixture.detectChanges();
    expect(app.countryCtrl.valid).toBeTruthy();
  });

  it(`should validate provinces`, () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const app = fixture.debugElement.componentInstance as HomeComponent;

    fixture.detectChanges();
    expect(app.provinceCtrl.valid).toBeFalsy();

    app.provinceCtrl.setValue("Guid");
    fixture.detectChanges();
    expect(app.provinceCtrl.valid).toBeTruthy();
  });
});
