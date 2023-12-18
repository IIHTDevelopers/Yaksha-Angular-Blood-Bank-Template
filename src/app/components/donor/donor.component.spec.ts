import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { DonorComponent } from './donor.component';

describe('DonorComponent', () => {
  let component: DonorComponent;
  let fixture: ComponentFixture<DonorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DonorComponent],
      imports: [FormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DonorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('boundary', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should have form fields for adding a donor', () => {
      const compiled = fixture.nativeElement;
      const formFields = compiled.querySelectorAll('form input');
      expect(formFields.length).toBe(4); // Check for the number of input fields
    });

    it('should have a button for adding a donor', () => {
      const addButton = fixture.nativeElement.querySelector('form button[type="submit"]');
      expect(addButton.textContent).toContain('Add Donor');
    });

    it('should display search input for filtering donors', () => {
      const searchInput = fixture.nativeElement.querySelector('div:nth-child(3) input[type="text"]');
      expect(searchInput).toBeTruthy();
    });

    it('should display edit donor form when editing a donor', () => {
      component.isEditing = true;
      fixture.detectChanges();
      const editForm = fixture.nativeElement.querySelector('div:nth-child(5) form');
      expect(editForm).toBeTruthy();
      const saveButton = editForm.querySelector('button[type="submit"]');
      const cancelButton = editForm.querySelector('button[type="button"]');
      expect(saveButton.textContent).toContain('Save');
      expect(cancelButton.textContent).toContain('Cancel');
    });

    it('should add a donor when submitting the add donor form', () => {
      const addButton = fixture.nativeElement.querySelector('form button[type="submit"]');
      const inputFields = fixture.nativeElement.querySelectorAll('form input');
      const sampleDonor = {
        name: 'John Doe',
        bloodGroup: 'AB+',
        contact: '1234567890',
        address: '123 Main St',
      };

      inputFields[0].value = sampleDonor.name;
      inputFields[0].dispatchEvent(new Event('input'));
      inputFields[1].value = sampleDonor.bloodGroup;
      inputFields[1].dispatchEvent(new Event('input'));
      inputFields[2].value = sampleDonor.contact;
      inputFields[2].dispatchEvent(new Event('input'));
      inputFields[3].value = sampleDonor.address;
      inputFields[3].dispatchEvent(new Event('input'));

      addButton.click();
      fixture.detectChanges();

      expect(component.donors.length).toBe(1);
      expect(component.donors[0]).toEqual({
        ...sampleDonor,
        id: 1,
      });
    });

    it('should have initial donors array empty', () => {
      expect(component.donors).not.toBeNull();
      expect(component.donors).toEqual([]);
    });

    it('should add a new donor', () => {
      component.newDonor = {
        id: 1,
        name: 'Jane Doe',
        bloodGroup: 'O-',
        contact: '9876543210',
        address: '456 Elm St',
      };
      component.addDonor();
      expect(component.donors).not.toBeNull();
      expect(component.donors.length).toBe(1);
    });

    it('should not add a donor with empty fields', () => {
      component.newDonor = {
        id: 0,
        name: '',
        bloodGroup: '',
        contact: '',
        address: '',
      };
      component.addDonor();
      expect(component.donors).not.toBeNull();
      expect(component.donors.length).toBe(1);
    });

    it('should edit a donor and update it', () => {
      component.newDonor = {
        id: 1,
        name: 'Jane Doe',
        bloodGroup: 'O-',
        contact: '9876543210',
        address: '456 Elm St',
      };
      component.addDonor();

      component.editDonor(component.donors[0]);
      const updatedDonor = {
        id: component.donors[0].id,
        name: 'Updated Name',
        bloodGroup: 'AB-',
        contact: '9999999999',
        address: '789 Oak St',
      };
      component.editedDonor = { ...updatedDonor };
      component.saveEditedDonor();
      expect(component.donors).not.toBeNull();
      expect(component.donors[0]).not.toBeNull();
      expect(component.donors[0]).toEqual(updatedDonor);
    });

    it('should not edit a donor with empty fields', () => {
      component.newDonor = {
        id: 1,
        name: 'Jane Doe',
        bloodGroup: 'O-',
        contact: '9876543210',
        address: '456 Elm St',
      };
      component.addDonor();

      component.editDonor(component.donors[0]);
      const originalDonor = { ...component.donors[0] };
      component.newDonor = {
        id: originalDonor.id,
        name: '',
        bloodGroup: '',
        contact: '',
        address: '',
      };
      component.saveEditedDonor();
      expect(component.donors).not.toBeNull();
      expect(component.donors[0]).not.toBeNull();
      expect(component.donors[0]).toEqual(originalDonor);
    });

    it('should delete a donor', () => {
      component.newDonor = {
        id: 1,
        name: 'Jane Doe',
        bloodGroup: 'O-',
        contact: '9876543210',
        address: '456 Elm St',
      };
      component.addDonor();

      expect(component.donors).not.toBeNull();
      expect(component.donors.length).toBe(1);
      component.deleteDonor(component.donors[0]);
      expect(component.donors.length).toBe(0);
    });

    it('should cancel editing', () => {
      component.editDonor({
        id: 1,
        name: 'Jane Doe',
        bloodGroup: 'O-',
        contact: '9876543210',
        address: '456 Elm St',
      });
      component.cancelEdit();
      expect(component.isEditing).toBe(false);
      expect(component.editedDonor).toEqual({});
    });

    it('should filter donors based on search keyword', () => {
      component.newDonor = {
        id: 1,
        name: 'Jane Doe',
        bloodGroup: 'O-',
        contact: '9876543210',
        address: '456 Elm St',
      };
      component.addDonor();

      component.searchKeyword = 'Jane';
      expect(component.filteredDonors.length).toBe(1);

      component.searchKeyword = 'John';
      expect(component.filteredDonors.length).toBe(0);
    });
  });
});
