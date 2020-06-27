import { Component, OnInit } from '@angular/core';
import { CrudService } from '../service/crud.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  clientes =[];
  nombre:string;
  apellido:string;
  edad:string;
  fechaNacimiento:string;
  message:string;
  sumaEdad:number = 0;
  promedioEdad:any;
  //
  arrayEdad=[];
  edadMenosPromedio:number;
  sumaEdadMasF:number=0;
  varianza:number;
  desviacionEstandar:number;
  constructor(public apiService:CrudService,) { }

 async ngOnInit() {
   await this.getClient();
  }
  createClient(){
    console.log("exitoso");

    let Data={};
    Data["nombre"] = this.nombre;
    Data["apellido"] = this.apellido;
    Data["edad"] = this.edad;
    Data["fechaNacimiento"] = this.fechaNacimiento;

    this.apiService.createClient(Data).then(res =>{
      this.nombre="";
      this.apellido ="";
      this.edad= undefined;
      this.fechaNacimiento ="";
      console.log(res);
      this.message="Exitoso";
    }).catch(error=>{
      console.log(error);

    }); 
  }

  async getClient(){
    this.apiService.getClient().subscribe(data => {

        this.clientes = data.map(e =>{
          return{
            id:e.payload.doc.id,
            isedit:false,
            nombre:e.payload.doc.data()['nombre'],
            apellido:e.payload.doc.data()['apellido'],
            edad:e.payload.doc.data()['edad'],
            fechaNacimiento:e.payload.doc.data()['fechaNacimiento'],
          };
        });
        
      });
    
  }

  //
 async EditClient(Data)
  {
    Data.isedit = true;
    Data.editnombre = Data.nombre;
    Data.editapellido = Data.apellido;
    Data.editedad = Data.edad;
    Data.editfechaNacimiento = Data.fechaNacimiento;
  }

  async UpdateClient(data)
  {
    let Data = {};
    Data["nombre"] = data.editnombre;
    Data["apellido"] = data.editapellido;
    Data["edad"] = data.editedad;
    Data["fechaNacimiento"] = data.editfechaNacimiento;
    this.apiService.updateClient(data.id, Data);
    data.isedit = false;
  }

 async deleteClient(id)
  {
   await this.apiService.deleteClient(id);
    await this.getPromedio();
  }

  //calcular el promedio de edades
 async getPromedio(){
  this.sumaEdad =0;
    this.clientes.forEach(item => {     
        this.sumaEdad=this.sumaEdad + parseInt(item['edad']);     
    });
     //console.log(this.sumaEdad);
    ;
    this.promedioEdad= this.sumaEdad / this.clientes.length;  
    //console.log(this.promedioEdad);
    //console.log(this.clientes.length);
    await this.getVarianza(); 
  }

 async getVarianza(){
  this.sumaEdadMasF=0;
    this.clientes.forEach(item => {     
      this.edadMenosPromedio= Math.pow(parseInt(item['edad']) - this.promedioEdad,2); 
       this.arrayEdad.push(this.edadMenosPromedio) ;  
      });

      this.arrayEdad.forEach(item => {     
        this.sumaEdadMasF= this.sumaEdadMasF + item; 
        });
        //console.log(this.arrayEdad);
        //console.log(this.sumaEdadMasF);
        this.varianza=this.sumaEdadMasF/this.clientes.length;
        //console.log(this.varianza);
        //Desviacion estantar
        this.desviacionEstandar=Math.sqrt(this.varianza);
        //console.log(this.desviacionEstandar);
  }
}
