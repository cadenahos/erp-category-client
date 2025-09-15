import { Component, OnInit, inject } from '@angular/core';
import { ClientsRepository } from '../../../repositories/client.repository';
import { Client } from 'src/app/model/client.model';
import { DataTableComponent } from '../../data-table/data-table.component';
import { Category } from 'src/app/model/categories.model';
import { CategoriesRepository } from '../../../repositories/categories.repository';

import { ModalComponent } from '../../modal/modal.component';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [DataTableComponent, ModalComponent],
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  private clientsRepository = inject(ClientsRepository);
  private categoriesRepository = inject(CategoriesRepository);
  clients: Client[] = [];
  categories: Category[] = [];
  isModalOpen = false;
  selectedEntity: Partial<Client> = {};
  entityType: 'user' | 'category' | 'client' = 'client';
  error: string | null = null;

  columns = [
    { key: 'id' as keyof Client, label: 'ID', sortable: true },
    { key: 'name' as keyof Client, label: 'Name', sortable: true },
    { key: 'email' as keyof Client, label: 'Email', sortable: true },
    { key: 'phone' as keyof Client, label: 'Phone', sortable: true },
    { key: 'category' as keyof Client, label: 'Category', renderer: (client: Client) => client.category.name },
    { key: 'createdAt' as keyof Client, label: 'Created At', renderer: (client: Client) => new Date(client.createdAt).toLocaleString() },
    { key: 'actions' as keyof Client, label: 'Actions' }
  ];
  createButton = { label: 'Create Client', onClick: () => this.openCreateModal() };

  ngOnInit() {
    this.loadClients();
    this.loadCategories();
  }

  loadClients() {
    this.clientsRepository.getClients().subscribe({
      next: (clients) => {
        console.log('Fetched clients:', clients);
        this.clients = Array.isArray(clients) ? clients : [];
      },
      error: (error) => {
        console.error('Error fetching clients:', error);
        this.clients = [];
      }
    });
  }

  loadCategories() {
    this.categoriesRepository.getCategories().subscribe({
      next: (categories) => {
        console.log('Fetched categories for clients:', categories);
        this.categories = categories;
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
        this.categories = [];
      }
    });
  }

  openCreateModal() {
    this.selectedEntity = { name: '', email: '', phone: '', category: { id: '', name: '', isActive: true } };
    this.isModalOpen = true;
  }

  openEditModal(client: Client) {
    this.selectedEntity = {
      ...client,
      category: {
        id: client.category.id,
        name: client.category.name,
        isActive: client.category.isActive,
        description: client.category.description,
        color: client.category.color
      }
    };
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedEntity = {};
    this.error = null;
  }

  saveEntity(entity: Partial<Client>) {
    if (entity.id) {
      // Update
      this.clientsRepository.updateClient(entity.id, entity).subscribe({
        next: (success) => {
          if (success) {
            this.loadClients();
            this.closeModal();
          } else {
            this.error = 'Failed to update client';
          }
        },
        error: (error) => {
          this.error = error.message || 'Error updating client';
        }
      });
    } else {
      // Create
      this.clientsRepository.createClient(entity).subscribe({
        next: (success) => {
          if (success) {
            this.loadClients();
            this.closeModal();
          } else {
            this.error = 'Failed to create client';
          }
        },
        error: (error) => {
          this.error = error.message || 'Error creating client';
        }
      });
    }
  }
}
