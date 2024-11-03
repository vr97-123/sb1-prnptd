import { Observable } from '@nativescript/core';

export interface InventoryItem {
    id: string;
    name: string;
    category: string;
    expiryDate: string;
    quantity: number;
    dateAdded: string;
}

class InventoryStore extends Observable {
    private items: InventoryItem[] = [];

    getItems(): InventoryItem[] {
        return [...this.items];
    }

    addItem(item: Omit<InventoryItem, 'id' | 'dateAdded'>): void {
        const newItem = {
            ...item,
            id: Date.now().toString(),
            dateAdded: new Date().toISOString(),
        };
        this.items.push(newItem);
        this.notifyPropertyChange('items', this.items);
    }

    removeItem(id: string): void {
        this.items = this.items.filter(item => item.id !== id);
        this.notifyPropertyChange('items', this.items);
    }
}

export const inventoryStore = new InventoryStore();