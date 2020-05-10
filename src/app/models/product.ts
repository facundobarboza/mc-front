export class Product {
    id?: string;
    name: string;
    description: string;
    imgProduct?: any;
    price: number;
    status: boolean;
    categories: string;
    fileRef?: string;
    quantity: number;

    constructor() {
        this.status = true;
    }
}