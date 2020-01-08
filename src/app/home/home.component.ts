import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatOption } from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  searchUserForm: FormGroup;
  submittedData;
  searchable : boolean = true;
  multiselect : boolean = true;
  displayOutput: boolean = false;

  components = [
    { "title": "Button", "path": "demo-button"},
    { "title": "Selection Control", "path": "demo-selection-control"},
    { "title": "Input", "path": "demo-input"},
    { "title": "Snackbar", "path": "demo-snack-bar"},
    { "title": "Chips", "path": "demo-chips"},
    { "title": "Card", "path": "demo-card"},
  ];

  componentsCopy = this.components;

  @ViewChild('allSelected', {static: false}) private allSelected: MatOption;

  constructor(private fb: FormBuilder){}

  ngOnInit() {
    this.searchUserForm = this.fb.group({
      default: '',
      dropdown: ''
    });
  }
tosslePerOne(all){ 
   if (this.allSelected.selected) {  
    this.allSelected.deselect();
    return false;
}
  if(this.searchUserForm.controls.dropdown.value.length==this.components.length)
    this.allSelected.select();

}
  toggleAllSelection() {
    if (this.allSelected.selected) {
      this.searchUserForm.controls.dropdown
        .patchValue([...this.components.map(item => item.title), 0]);
    } else {
      this.searchUserForm.controls.dropdown.patchValue([]);
    }
  }

  search(value) {
    console.log(value);
    if(value == '') {
      this.componentsCopy = this.components;
    }

    if(value != null && value != '') {
      this.componentsCopy = this.components.filter((data)=> {
        return data.title.search(new RegExp(value, 'i')) > -1;
      });
    }

  }

  onSubmit() {
    this.submittedData = this.searchUserForm.value;
    this.displayOutput = true;
  }

  clearForm() {
    this.displayOutput = false;
    this.searchUserForm.reset();
  }

}
