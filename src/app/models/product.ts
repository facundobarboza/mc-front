export class Product {
    id?: string;
    name: string;
    description: string;
    imgProduct?: any;
    price: number;
    status: boolean;
    principal: boolean;
    categories: string;
    fileRef?: string;
    quantity: number;
    discount?: number;
    priceDiscount?: number;
    percentage?: number;
    applyDiscount: boolean;

    constructor() {
        this.status = true;
        this.applyDiscount = false;
        this.principal = false;
    }
}