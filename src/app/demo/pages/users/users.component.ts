import { UsersRepository } from '../../../repositories/users.repository';
import { User } from '../../../model/user.interface';

import { Component, OnInit, inject } from '@angular/core';
import { DataTableComponent } from '../../data-table/data-table.component';

import { ModalComponent } from '../../modal/modal.component';

import { ConfirmModalComponent } from '../../confirm-modal/confirmModal.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [DataTableComponent, ModalComponent, ConfirmModalComponent],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  private usersRepository = inject(UsersRepository);
  users: User[] = [];
  isModalOpen = false;
  isConfirmModalOpen = false;
  selectedEntity: Partial<User> = {};
  entityToDelete: User | null = null;
  entityType: 'user' | 'category' | 'client' = 'user';
  error: string | null = null;

  columns = [
    { key: 'id' as keyof User, label: 'ID', sortable: true },
    { key: 'email' as keyof User, label: 'Email', sortable: true },
    { key: 'firstName' as keyof User, label: 'First Name', sortable: true },
    { key: 'lastName' as keyof User, label: 'Last Name', sortable: true },
    { key: 'createdAt' as keyof User, label: 'Created At', renderer: (user: User) => new Date(user.createdAt).toLocaleString() },
    { key: 'actions' as keyof User, label: 'Actions' }
  ];
  createButton = { label: 'Create User', onClick: () => this.openCreateModal() };

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.usersRepository.getUsers().subscribe({
      next: (users) => {
        console.log('Fetched users:', users);
        this.users = Array.isArray(users) ? users : [];
      },
      error: (error) => {
        console.error('Error fetching users:', error);
        this.users = [];
      }
    });
  }

  openCreateModal() {
    this.selectedEntity = { email: '', firstName: '', lastName: '' };
    this.isModalOpen = true;
  }

  openEditModal(user: User) {
    this.selectedEntity = { ...user };
    this.isModalOpen = true;
  }

  openDeleteModal(user: User) {
    this.entityToDelete = user;
    this.isConfirmModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedEntity = {};
    this.error = null;
  }

  closeConfirmModal() {
    this.isConfirmModalOpen = false;
    this.entityToDelete = null;
  }

  confirmDelete() {
    if (this.entityToDelete && this.entityToDelete.id) {
      this.usersRepository.deleteUser(this.entityToDelete.id).subscribe({
        next: (success) => {
          if (success) {
            this.loadUsers();
            this.closeConfirmModal();
          } else {
            this.error = 'Failed to delete user';
          }
        },
        error: (error) => {
          this.error = error.message || 'Error deleting user';
        }
      });
    }
  }

  saveEntity(entity: Partial<User>) {
    if (entity.id) {
      this.usersRepository.updateUser(entity.id, entity).subscribe({
        next: (success) => {
          if (success) {
            this.loadUsers();
            this.closeModal();
          } else {
            this.error = 'Failed to update user';
          }
        },
        error: (error) => {
          this.error = error.message || 'Error updating user';
        }
      });
    } else {
      this.usersRepository.createUser(entity as any).subscribe({
        next: (success) => {
          if (success) {
            this.loadUsers();
            this.closeModal();
          } else {
            this.error = 'Failed to create user';
          }
        },
        error: (error) => {
          this.error = error.message || 'Error creating user';
        }
      });
    }
  }
}
