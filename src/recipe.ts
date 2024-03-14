export interface Ingredient {
    quantity: number,
    unit: string,
    name: string,
    note? : string
}

export interface IngredientSection {
    section?: string,
    ingredients: Ingredient[]
}

export interface PreparationTime {
    preparation?: number,
    cooking?: number,
    owen?: number,
    total?: number,
    summary?: string //e.g. quick
}

export type Difficulty = 'easy' | 'intermediate' | 'expert';
export type DishType = 
    'cold appetizer' | 
    'warm appetizer' | 
    'amuse-bouche' |
    'dessert' |
    'garnish' |
    'main dish' |
    'soup' |
    'drink' |
    'other course';
export type When =
    'breakfast' |
    'lunch' |
    'dinner' |
    'snack' |
    'always';

export type Label =
    'cheap' |
    'vegan' ;

export type Allergen = 
    'sugar-free' |
    'lactose-free' |
    'dairy-free' |
    'egg-free' |
    'gluten-free';

export interface Recipe {
    _id: string,
    name: string,
    difficulty: Difficulty,
    dishType: DishType[],
    serving: number,
    when: When[],
    preparationTime: PreparationTime,
    ingredients: {section?: string, ingredients: Ingredient[]}[],
    directions: string[],
    images: string[],
    allergens: Allergen[],
    labels: Label[]
}