import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { DonorComponent } from './components/donor/donor.component';

describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AppComponent, DonorComponent],
            imports: [FormsModule]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    describe('boundary', () => {
        it('should create the app', () => {
            expect(component).toBeTruthy();
        });

        it('should have Blood Bank title initially', () => {
            expect(component.title).toEqual('Blood Bank');
        });

        it('should have Blood Bank h1 heading', () => {
            component.title = 'Blood Bank';
            fixture.detectChanges();
            const compiled = fixture.nativeElement;
            expect(compiled.querySelector('h1').textContent).toContain('Blood Bank');
        });
    });
});
