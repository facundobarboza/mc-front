export class Category {
    id?: string;
    name: string;
    description: string;
    principal: boolean;
    icon: string;

    constructor() {
        this.principal = false;
        this.icon = '';
    }
}