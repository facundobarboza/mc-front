export class Order {
    id?: string;
    name: string;
    phone: string;
    surname: string;
    observation: string;
    products: string;
    created: Date;

    constructor() {
        this.observation = '';
    }
}