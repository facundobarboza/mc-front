import { Injectable } from "@angular/core";
import { Product } from '../models/product';

@Injectable()
export class ProductsService {

    private products: Product[] = [
        {
            id: '1',
            name: "Producto 1",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas et leo eu sapien finibus egestas.",
            img: "assets/images/product-1.jpg",
            price: "123",
            status: "DC"
        },
        {
            id: '2',
            name: "Producto 2",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas et leo eu sapien finibus egestas.",
            img: "assets/images/product-2.jpg",
            price: "123",
            status: "DC"
        },
        {
            id: '3',
            name: "Producto 3",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas et leo eu sapien finibus egestas.",
            img: "assets/images/product-3.jpg",
            price: "123",
            status: "Marvel"
        },
        {
            id: '4',
            name: "Producto 4",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas et leo eu sapien finibus egestas.",
            img: "assets/images/product-4.jpg",
            price: "123",
            status: "Marvel"
        },
        {
            id: '5',
            name: "Producto 5",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas et leo eu sapien finibus egestas.",
            img: "assets/images/product-5.jpg",
            price: "123",
            status: "DC"
        },
        {
            id: '6',
            name: "Producto 6",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas et leo eu sapien finibus egestas.",
            img: "assets/images/product-6.jpg",
            price: "123",
            status: "Marvel"
        },
        {
            id: '7',
            name: "Producto 7",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas et leo eu sapien finibus egestas.",
            img: "assets/images/product-7.jpg",
            price: "123",
            status: "Marvel"
        },
        {
            id: '8',
            name: "Producto 8",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas et leo eu sapien finibus egestas.",
            img: "assets/images/product-8.jpg",
            price: "123",
            status: "DC"
        },
        {
            id: '9',
            name: "Producto 9",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas et leo eu sapien finibus egestas.",
            img: "assets/images/product-9.jpg",
            price: "123",
            status: "DC"
        },
        {
            id: '10',
            name: "Producto 10",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas et leo eu sapien finibus egestas.",
            img: "assets/images/product-10.jpg",
            price: "123",
            status: "Marvel"
        },
        {
            id: '11',
            name: "Producto 11",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas et leo eu sapien finibus egestas.",
            img: "assets/images/product-11.jpg",
            price: "123",
            status: "Marvel"
        },
        {
            id: '12',
            name: "Producto 12",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas et leo eu sapien finibus egestas.",
            img: "assets/images/product-12.jpg",
            price: "123",
            status: "DC"
        },
        {
            id: '13',
            name: "Producto 3",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas et leo eu sapien finibus egestas.",
            img: "assets/images/product-6.jpg",
            price: "123",
            status: "Marvel"
        },
        {
            id: '14',
            name: "Producto 6",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas et leo eu sapien finibus egestas.",
            img: "assets/images/product-7.jpg",
            price: "123",
            status: "Marvel"
        }
    ];;

    constructor() { }

    getAllProducts() {
        return this.products;
    }

    getProductById(id: any) {
        return this.products.find(product => product.id == id);
    }

    searchProductByName(nameSearch: string): Product[] {
        let productsSearch: Product[] = [];
        nameSearch = nameSearch.toLocaleLowerCase();

        for (let product of this.products) {
            let nameProduct = product.name.toLocaleLowerCase();

            if (nameProduct.indexOf(nameSearch) >= 0) {
                productsSearch.push(product);
            }
        }

        return productsSearch;
    }
}