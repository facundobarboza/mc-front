import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Category } from '../models/category';

import { Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';

@Injectable()
export class CategoryService {
    private categoriesCollection: AngularFirestoreCollection<Category>;

    constructor(private angularFirestore: AngularFirestore) {
        this.categoriesCollection = angularFirestore.collection<Category>('categories');
    }

    getAll(): Observable<Category[]> {
        return this.categoriesCollection
            .snapshotChanges()
            .pipe(
                map(actions =>
                    actions.map(a => {
                        const data = a.payload.doc.data() as Category;
                        const id = a.payload.doc.id;
                        return { id, ...data };
                    })
                )
            );
    }

    getById(id: string): Observable<Category> {
        return this.angularFirestore.doc<Category>(`categories/${id}`).valueChanges();
    }

    deleteById(id: string) {
        return this.categoriesCollection.doc(id).delete();
    }

    editPostById(category: Category) {
        return this.categoriesCollection.doc(category.id).update(category);
    }

    saveCategory(category: Category) {
        const categoryObj = {
            name: category.name,
            description: category.description,
            principal: category.principal,
            icon: category.icon
        };
        if (category.id) {
            return this.categoriesCollection.doc(category.id).update(categoryObj);
        } else {
            return this.categoriesCollection.add(categoryObj);
        }
    }

    getAllPrincipal() {
        return this.angularFirestore
            .collection<Category>('categories',
                ref => ref
                    .where('principal', '==', true)
            )
            .snapshotChanges()
            .pipe(
                map(actions =>
                    actions.map(a => {
                        const data = a.payload.doc.data() as Category;
                        const id = a.payload.doc.id;
                        return { id, ...data };
                    })
                )
            );
    }
}