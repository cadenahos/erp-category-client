import { Component, OnInit, inject } from '@angular/core';
import { CategoriesRepository } from '../../../repositories/categories.repository';
import { Category } from '../../../model/categories.model';
import { DataTableComponent } from '../../data-table/data-table.component';
import { ModalComponent } from '../../modal/modal.component';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [DataTableComponent, ModalComponent],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  private categoriesRepository = inject(CategoriesRepository);
  categories: Category[] = [];
  isModalOpen = false;
  selectedEntity: Partial<Category> = {};
  entityType: 'user' | 'category' | 'client' = 'category';
  error: string | null = null;

  columns = [
    { key: 'id' as keyof Category, label: 'ID', sortable: true },
    { key: 'name' as keyof Category, label: 'Name', sortable: true },
    { key: 'description' as keyof Category, label: 'Description', sortable: true },
    { key: 'color' as keyof Category, label: 'Color', sortable: true },
    { key: 'sortOrder' as keyof Category, label: 'Sort Order', sortable: true },
    { key: 'isActive' as keyof Category, label: 'Active', renderer: (category: Category) => (category.isActive ? 'Yes' : 'No') },
    {
      key: 'createdAt' as keyof Category,
      label: 'Created At',
      renderer: (category: Category) => new Date(category.createdAt).toLocaleString()
    },
    { key: 'actions' as keyof Category, label: 'Actions' }
  ];
  createButton = { label: 'Create Category', onClick: () => this.openCreateModal() };

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.categoriesRepository.getCategories().subscribe({
      next: (categories) => {
        console.log('Fetched categories:', categories);
        this.categories = Array.isArray(categories) ? categories : [];
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
        this.categories = [];
      }
    });
  }

  openCreateModal() {
    this.selectedEntity = { name: '', description: '', color: '#000000', sortOrder: 0, isActive: true };
    this.isModalOpen = true;
  }

  openEditModal(category: Category) {
    this.selectedEntity = { ...category };
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedEntity = {};
    this.error = null;
  }

  saveEntity(entity: Partial<Category>) {
    if (entity.id) {
      // Update
      this.categoriesRepository.updateCategory(entity.id, entity).subscribe({
        next: (success) => {
          if (success) {
            this.loadCategories();
            this.closeModal();
          } else {
            this.error = 'Failed to update category';
          }
        },
        error: (error) => {
          this.error = error.message || 'Error updating category';
        }
      });
    } else {
      // Create
      this.categoriesRepository.createCategory(entity).subscribe({
        next: (success) => {
          if (success) {
            this.loadCategories();
            this.closeModal();
          } else {
            this.error = 'Failed to create category';
          }
        },
        error: (error) => {
          this.error = error.message || 'Error creating category';
        }
      });
    }
  }
}
