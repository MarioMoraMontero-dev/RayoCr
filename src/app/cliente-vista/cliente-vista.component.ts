import { Component, OnInit, Input } from '@angular/core';
import { JsonLoginDatos, Prestamos } from '../interfaces/json-login-datos';
import { Router, ActivatedRoute } from '@angular/router';
import { RestService } from '../services/rest.service';
import {NgxSpinnerService} from 'ngx-spinner'

@Component({
  selector: 'app-cliente-vista',
  templateUrl: './cliente-vista.component.html',
  styleUrls: ['./cliente-vista.component.css']
})
export class ClienteVistaComponent implements OnInit {
  public respuesta!: String;
  public data!:JsonLoginDatos[];
  public codigoPrestamo!:String;
  public fechadeposito!:String;
  public idContacto!:String;
  public fecha1!:String;
  public fecha2!:String;
  public fecha3!:String;
  public montoBruto!:String;
  public plazo!:String;
  public tecnologia!:String;
  public tipoDescuento!:String;
  public interes!:String;
  public descuento!:String;
  public totalAPagar!:String;
  public datosPago!:any [];
  public idCliente!:String;
  public ErrorAlCrearLaSolicitud!:boolean;
  public ProcesandoSolicitudSucces!:boolean;
  login: any = [];
  token : any;
  
  jsonEntranteJ:String = '';
  idC:any = [];
  @Input() loginValues = {email:'',pass:'',idCliente:''};
  constructor(public rest:RestService,private router: Router,private spinnerService:NgxSpinnerService,private _Activatedroute:ActivatedRoute) { }
  
  ngOnInit(): void {
    this.loginValues.email = '';
    this.loginValues.pass = '';
    const contacto = localStorage.getItem("LoginContactId");
    if(contacto != null){
      this.loginValues.idCliente = contacto;
      this.idCliente = contacto;
      this.getTokenLogin();
    }else{
      this.router.navigate(['login']);
      this.getTokenLogin();
    }

    this.ErrorAlCrearLaSolicitud = true;
    this.ProcesandoSolicitudSucces = true;
  }

  datosPrestamo(
    codigoPrestamox:String,
    fechadepositox:String,
    fecha1x:String,
    fecha2x:String,
    fecha3x:String,
    montoBrutox:String,
    plazox:String,
    tecnologiax:String,
    tipoDescuentox:String,
    interesx:String,
    descuentox:String,
    totalAPagarx:String
    ){
       this.codigoPrestamo = codigoPrestamox;
       this.fechadeposito = fechadepositox;
       this.fecha1 = fecha1x;
       this.fecha2 = fecha2x;
       this.fecha3 = fecha3x;
       this.montoBruto = montoBrutox;
       this.plazo = plazox;
       this.tecnologia = tecnologiax;
       this.tipoDescuento = tipoDescuentox;
       this.interes = interesx;
       this.descuento = descuentox;
       this.totalAPagar = totalAPagarx;
       console.log('Testts: '+this.codigoPrestamo);
  }

  datosDePagos(datos:String []){
    console.log(datos);
    this.datosPago = datos;
  }

renovar(datos:any){
  let jsonEntrante:any = [];
  for(let l of datos) {
    this.token = l.access_token;
    console.log("SalidaToken: "+this.token);
  }
  this.rest.postRenovacion(this.token,this.idCliente,'','','','','').subscribe((data: {})=>{
    console.log(data);
    jsonEntrante.push(data);
    for(let l of jsonEntrante){
      if(l.Estado == 'Moroso'){
        this.router.navigate(['prestamoActivo']);
      }else{
        this.router.navigate(['renovaciones/',this.idCliente,l.Id],{state: {data:{id:l.Id,monto:l.monto ,interes:l.interes ,tecno:l.tecno,descuento:l.descuento,totalPagar:l.totalPagar,plazo:l.plazo,aval:l.aval}}});
      }
     }  
  });

}

getToken(){
  let paisT:String = '';
  let cantonT:String = '';
  let distritoT:String = '';
  let provinciaT:String = '';
  let direccionT:String = '';
  for(let d of this.data){
    console.log('Pais: '+d.pais);
    paisT = d.pais;
    cantonT = d.caton;
    distritoT = d.distrito;
    provinciaT = d.provincia;
    direccionT = d.direccionExacta;
  }
  if((paisT == '' || paisT == null || paisT == undefined )|| (provinciaT == '' || provinciaT == null || provinciaT == undefined ) || (cantonT == '' || cantonT == null || cantonT == undefined ) || (direccionT == '' || direccionT == null || direccionT == undefined ) || (distritoT == '' || distritoT == null || distritoT == undefined )){
    let idConta = this.idCliente;
    this.router.navigate(['direccion/',idConta]);
  }else{
    this.login=[];
    this.rest.getToken().subscribe((data: {})=>{
    console.log(data);
    this.login.push(data);
    console.log(this.login);
    this.ProcesandoSolicitudSucces = false;
    this.renovar(this.login);
  
  })
  }

}


actualizarDireccion(){
  console.log('Click');
  let idConta = this.idCliente;
  this.router.navigate(['direccion/',idConta]);
  
}

getTokenLogin(){
  this.login=[];
  this.rest.getToken().subscribe((data: {})=>{
  console.log(data);
  this.login.push(data);
  this.loginCliente(this.login);
  console.log(this.login);
  
})
}


loginCliente(datos:any []){
 let  jsonEntrante:any = [];
for(let l of datos) {
  this.token = l.access_token;
  console.log("SalidaToken: "+this.token);
}
this.rest.postlogin(this.token,this.loginValues).subscribe((data: {})=>{
  console.log(data);
  this.jsonEntranteJ = String(data);
  jsonEntrante.push(data);
  
  console.log('Json Salida Login: '+ jsonEntrante);
  for(let l of jsonEntrante) {
    if(l.codigoSalida == '002'){
      this.ErrorAlCrearLaSolicitud = false;
    }else{
        this.data = jsonEntrante;
       }
    }
});
}


}
