export interface ShoppingListItem {
    name: string,
    quantity?: number,
    unit?: string,
    note?: string
}

export type ShoppingList = ShoppingListItem[];