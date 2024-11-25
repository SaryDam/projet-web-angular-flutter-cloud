import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root',
})
export class FirebaseService {
    constructor(private firestore: Firestore) {}

    async addTestDocument() {
        const colRef = collection(this.firestore, 'test');
        const docRef = await addDoc(colRef, { name: 'Test', timestamp: new Date() });
        console.log('Document ajouté avec ID:', docRef.id);
    }
}
