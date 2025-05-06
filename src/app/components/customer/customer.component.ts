import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { Customer } from '../../core/models/customer.model';
import { CustomerService } from '../../core/services/customer.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './customer.component.html',
})
export class CustomerComponent implements OnInit {
  form!: FormGroup;
  customers: Customer[] = [];
  isEdit = false;
  currentId = '';

  constructor(private fb: FormBuilder, private service: CustomerService) {}

  ngOnInit(): void {
    this.initForm();
    this.loadCustomers();
  }

  initForm() {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
    });
  }

  loadCustomers() {
    this.customers = this.service.getCustomers();
  }

  onSubmit() {
    const formData = this.form.value;

    if (this.isEdit) {
      const updated: Customer = {
        ...formData,
        id: this.currentId,
        createdAt: new Date(),
      };
      this.service.updateCustomer(updated);
      this.isEdit = false;
    } else {
      const newCustomer: Customer = {
        ...formData,
        id: uuidv4(),
        createdAt: new Date(),
      };
      this.service.saveCustomer(newCustomer);
    }

    this.form.reset();
    this.loadCustomers();
  }

  editCustomer(cust: Customer) {
    this.form.patchValue(cust);
    this.currentId = cust.id;
    this.isEdit = true;
  }

  deleteCustomer(id: string) {
    if (confirm('Are you sure you want to delete this customer?')) {
      this.service.deleteCustomer(id);
      this.loadCustomers();
    }
  }
}
