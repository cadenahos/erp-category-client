import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../../model/user.interface';
import { Category } from '../../model/categories.model';
import { Client } from '../../model/client.model';
import { RegisterRequest } from 'src/app/model/auth_response.interface';

type EntityType = 'user' | 'category' | 'client';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input() isOpen = false;
  @Input() entityType: EntityType = 'user';
  @Input() entity: Partial<User | Category | Client> = {};
  @Input() categories: Category[] = [];
  @Output() save = new EventEmitter<Partial<User | Category | Client>>();
  @Output() close = new EventEmitter<void>();

  private getDefaultEntity(): Partial<RegisterRequest | Category | Client> {
    switch (this.entityType) {
      case 'user':
        return { email: '', password: '', firstName: '', lastName: '' };
      case 'category':
        return { name: '', description: '', color: '#000000', sortOrder: 0, isActive: true };
      case 'client':
        return {
          name: '',
          email: '',
          phone: '',
          category: { isActive: true, id: '', name: '', description: '', color: '#000000', sortOrder: 0 }
        };
      default:
        return {};
    }
  }
  d;
  ngOnChanges() {
    if (!this.entity || Object.keys(this.entity).length === 0) {
      this.entity = this.getDefaultEntity();
    }
  }

  submit() {
    this.save.emit(this.entity);
  }

  closeModal() {
    this.close.emit();
  }
}
