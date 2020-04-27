import { Injectable } from "@angular/core";
import { Product } from '../models/product';

@Injectable()
export class ProductsService {

    private products: Product[] = [
        {
            id: '1',
            name: "Aquaman",
            description: "El poder más reconocido de Aquaman es la capacidad telepática para comunicarse con la vida marina, la cual puede convocar a grandes distancias.",
            img: "assets/images/product-1.jpg",
            price: "123",
            status: "DC"
        },
        {
            id: '2',
            name: "Batman",
            description: "Los rasgos principales de Batman se resumen en «destreza física, habilidades deductivas y obsesión». La mayor parte de las características básicas de los cómics han variado por las diferentes interpretaciones que le han dado al personaje.",
            img: "assets/images/product-2.jpg",
            price: "123",
            status: "DC"
        },
        {
            id: '3',
            name: "Daredevil",
            description: "Al haber perdido la vista, los cuatro sentidos restantes de Daredevil fueron aumentados por la radiación a niveles superhumanos, en el accidente que tuvo cuando era niño. A pesar de su ceguera, puede \"ver\" a través de un \"sexto sentido\" que le sirve como un radar similar al de los murciélagos.",
            img: "assets/images/product-3.jpg",
            price: "123",
            status: "Marvel"
        },
        {
            id: '4',
            name: "Hulk",
            description: "Su principal poder es su capacidad de aumentar su fuerza hasta niveles prácticamente ilimitados a la vez que aumenta su furia. Dependiendo de qué personalidad de Hulk esté al mando en ese momento (el Hulk Banner es el más débil, pero lo compensa con su inteligencia).",
            img: "assets/images/product-4.jpg",
            price: "123",
            status: "Marvel"
        },
        {
            id: '5',
            name: "Linterna Verde",
            description: "Poseedor del anillo de poder que posee la capacidad de crear manifestaciones de luz sólida mediante la utilización del pensamiento. Es alimentado por la Llama Verde (revisada por escritores posteriores como un poder místico llamado Starheart), una llama mágica contenida en dentro de un orbe (el orbe era en realidad un meteorito verde de metal que cayó a la Tierra, el cual encontró un fabricante de lámparas llamado Chang)",
            img: "assets/images/product-5.jpg",
            price: "123",
            status: "DC"
        },
        {
            id: '6',
            name: "Spider-Man",
            description: "Tras ser mordido por una araña radiactiva, obtuvo los siguientes poderes sobrehumanos, una gran fuerza, agilidad, poder trepar por paredes. La fuerza de Spider-Man le permite levantar 10 toneladas o más. Gracias a esta gran fuerza Spider-Man puede realizar saltos íncreibles. Un \"sentido arácnido\", que le permite saber si un peligro se cierne sobre él, antes de que suceda. En ocasiones este puede llevar a Spider-Man al origen del peligro.",
            img: "assets/images/product-6.jpg",
            price: "123",
            status: "Marvel"
        },
        {
            id: '7',
            name: "Wolverine",
            description: "En el universo ficticio de Marvel, Wolverine posee poderes regenerativos que pueden curar cualquier herida, por mortal que ésta sea, además ese mismo poder hace que sea inmune a cualquier enfermedad existente en la Tierra y algunas extraterrestres . Posee también una fuerza sobrehumana, que si bien no se compara con la de otros superhéroes como Hulk, sí sobrepasa la de cualquier humano.",
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