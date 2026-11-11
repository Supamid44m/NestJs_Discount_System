export interface Product {
    name: string;
    price: number;
    category: string;
}

export interface CartItem extends Product {
    quantity: number;
}
