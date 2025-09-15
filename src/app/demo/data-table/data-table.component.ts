import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ColumnDef<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  renderer?: (item: T) => string;
}

interface CreateButtonConfig {
  label: string;
  onClick: () => void;
}

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent<T> implements OnChanges {
  @Input() data: T[] = [];
  @Input() columns: ColumnDef<T>[] = [];
  @Input() pageSize: number = 10;
  @Input() createButton?: CreateButtonConfig;
  @Output() create = new EventEmitter<void>();
  @Output() edit = new EventEmitter<T>();
  @Output() delete = new EventEmitter<T>();

  filteredData: T[] = [];
  currentPage = 1;
  totalPages = 1;
  searchQuery = '';
  sortColumn: keyof T | null = null;
  sortDirection: 'asc' | 'desc' = 'asc';

  get colspan(): number {
    return this.columns.length + (this.hasActionsColumn ? 1 : 0);
  }

  get hasActionsColumn(): boolean {
    return this.columns.some((c) => c.key === 'actions');
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] || changes['columns']) {
      console.log('DataTable received data:', this.data);
      this.applyFilterAndSort();
    }
  }

  applyFilterAndSort() {
    if (!Array.isArray(this.data)) {
      console.error('Data is not an array:', this.data);
      this.filteredData = [];
      this.totalPages = 1;
      return;
    }

    const filtered = this.data.filter((item) =>
      this.columns.some((col) => {
        const value = item[col.key];
        return value && String(value).toLowerCase().includes(this.searchQuery.toLowerCase());
      })
    );

    if (this.sortColumn) {
      filtered.sort((a, b) => {
        const valueA = a[this.sortColumn!] as string;
        const valueB = b[this.sortColumn!] as string;
        return this.sortDirection === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
      });
    }

    this.totalPages = Math.ceil(filtered.length / this.pageSize);
    this.filteredData = filtered.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
  }

  onSearchChange() {
    this.currentPage = 1;
    this.applyFilterAndSort();
  }

  sort(column: keyof T) {
    const colDef = this.columns.find((c) => c.key === column);
    if (!colDef?.sortable) return;
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.applyFilterAndSort();
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.applyFilterAndSort();
    }
  }

  onCreate() {
    this.create.emit();
  }

  onEdit(item: T) {
    this.edit.emit(item);
  }
  onDelete(item: T) {
    this.delete.emit(item);
  }
}
