import { Component } from '@angular/core';

interface Donor {
  id: number;
  name: string;
  bloodGroup: string;
  contact: string;
  address: string;
}

@Component({
  selector: 'app-donor',
  templateUrl: './donor.component.html',
  styleUrls: ['./donor.component.css']
})
export class DonorComponent {
  donors: Donor[] = [];
  newDonor: Donor = {} as Donor;
  editedDonor: Donor = {} as Donor;
  isEditing = false;
  searchKeyword = '';

  addDonor(): void {
  }

  editDonor(donor: Donor): void {
  }

  saveEditedDonor(): void {
  }

  cancelEdit(): void {
  }

  deleteDonor(donor: Donor): void {
  }

  get filteredDonors(): Donor[] {
    return [];
  }
}
