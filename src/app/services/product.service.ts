import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Product } from '../models/product';
import { File } from '../models/file';

import { Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';

@Injectable()
export class ProductService {
    private productsCollection: AngularFirestoreCollection<Product>;
    private filePath: any;
    private downloadURL: Observable<string>;

    constructor(private angularFirestore: AngularFirestore, private storage: AngularFireStorage) {
        this.productsCollection = angularFirestore.collection<Product>('products');
    }

    getAllProducts(): Observable<Product[]> {
        return this.productsCollection
            .snapshotChanges()
            .pipe(
                map(actions =>
                    actions.map(a => {
                        const data = a.payload.doc.data() as Product;
                        const id = a.payload.doc.id;
                        return { id, ...data };
                    })
                )
            );
    }

    getById(id: string): Observable<Product> {
        return this.angularFirestore.doc<Product>(`products/${id}`).valueChanges();
    }

    deleteById(id: string) {
        return this.productsCollection.doc(id).delete();
    }

    editPostById(post: Product, newImage?: File) {
        if (newImage) {
            this.uploadImage(post, newImage);
        } else {
            return this.productsCollection.doc(post.id).update(post);
        }
    }

    preAddAndUpdatePost(post: Product, image: File): void {
        this.uploadImage(post, image);
    }

    private savePost(product: Product) {
        const productObj = {
            name: product.name,
            description: product.description,
            imgProduct: this.downloadURL,
            price: product.price,
            status: product.status,
            categories: product.categories,
            fileRef: this.filePath
        };

        if (product.id) {
            return this.productsCollection.doc(product.id).update(productObj);
        } else {
            return this.productsCollection.add(productObj);
        }

    }

    private uploadImage(post: Product, image: File) {
        this.filePath = `images/${image.name}`;
        const fileRef = this.storage.ref(this.filePath);
        const task = this.storage.upload(this.filePath, image);
        task.snapshotChanges()
            .pipe(
                finalize(() => {
                    fileRef.getDownloadURL().subscribe(urlImage => {
                        this.downloadURL = urlImage;
                        this.savePost(post);
                    });
                })
            ).subscribe();
    }
}