import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore'

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(
    private firebaseService: AngularFirestore,
  ) { }

  //funcion para crear cliente
  createClient(Data){
    return this.firebaseService.collection('cliente').add(Data);
  }
//funcion pára optener la lista de clientes
  getClient(){
    return this.firebaseService.collection('cliente').snapshotChanges();
  }
//funcion para actualizar
  updateClient(id, data)
  {
    this.firebaseService.doc('cliente/' + id).update(data);
  }
//funcion para eliminar
  deleteClient(id)
  {
    this.firebaseService.doc('cliente/' + id).delete();
  }
}
