import { Component, Input, OnInit, Output, EventEmitter, Type } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '../services/rest.service';
import { NewSolicitud } from '../interfaces/new-solicitud';
import { Token } from '../interfaces/token';
import { valoresSeleccionadosCliente } from '../interfaces/valoresSeleccionadosCliente';
import { FormControl, Validator, Validators, FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { encode } from 'base64-arraybuffer';
import { Observable } from 'rxjs';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';



@Component({
    selector: 'ngbd-modal-confirm',
    template: `
    <div class="modal-header">
      <h4 class="modal-title" id="modal-title">Ups!!</h4>
      <button type="button" class="close" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>{{mensaje1}}<span class="text-danger"> {{mensaje2}}.</span></p>
      <p>{{mensaje3}}<span class="text-danger">{{mensaje4}}.</span></p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Cancel</button>
      <button type="button" class="btn btn-danger" (click)="modal.close('Ok click')">Ok</button>
    </div>
    `
  })
  export class NgbdModalConfirm {
    @Input() mensaje1 = '';
    @Input() mensaje2 = '';
    @Input() mensaje3 = '';
    @Input() mensaje4 = '';
    constructor(public modal: NgbActiveModal) {}
  }
  const MODALS: {[name: string]: Type<any>} = {
    focusFirst: NgbdModalConfirm
    
  };

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.css']
})
export class Step2Component implements OnInit {
  
  form!:FormGroup;

  constructor(private _Activatedroute:ActivatedRoute,public rest:RestService,private router: Router,private formBuilder:FormBuilder,config: NgbModalConfig, private modalService: NgbModal) { 
   
  }
  data : valoresSeleccionadosCliente = history.state.data;
  public monto:number|undefined;
   public plazo:number|undefined;
   public estadoCivil:string|undefined;
   public pais:string|undefined;
   public provincia:string|undefined;
   public canton:string|undefined;
   public DeseaMensajeria:string|undefined;
   public DireccionDeEnvioValidator:string|undefined;
   public distrito:string|undefined;
   public sector:string|undefined;
   public tiempoLaoradoMeses:string|undefined;
   public horaContactoInicio:string|undefined;
   public horaContactoFin:string|undefined;
   public requiAyuda:string|undefined;
   public modal : HTMLElement | undefined;
   public ActivarDireccion:boolean|undefined;
   public CamposSinCompletar:boolean|undefined;
   public ErrorAlCrearLaSolicitud:boolean|undefined;
   public ProcesandoSolicitudSucces:boolean|undefined;
   public DesactivarBoton:boolean|undefined;
   public ErrorTamanoArchivos:boolean|undefined;
   public PaisSinSeleccionar:boolean|undefined;

   
   @Input() soliNew = new NewSolicitud();
   tamanoDocOrden:any;
   tamanoDocCedula:any;
   jsonEntrante:any =[];     
   estadoCivilValores:string[]=["Soltero","Casado","Divorciado","Viudo"];
   comoNosConocieron:string[]=["Google","Facebook","Referido"];
    token : any;
    login: any = [];
    solicitudSend: any = [];
    paisValores:string[]=["--Seleccione un valor --","Costa Rica"];
    provinciaValores:string[] =[];
    cantonValores:string[] =[];
    distritoValores:string[]=[];
    sectores:string[]=["P??blico","Privado"];
    tiempoLaborado:string[]=["3 a 6 meses","6 a 12 meses","1 a 2 a??os","m??s de 2 a??os"];
    horasContactoInicio:string[]=["8:00 am",
    "8:30 am",
    "9:00 am",
    "9:30 am",
    "10:00 am",
    "10:30 am",
    "11:00 am",
    "11:30 am",
    "12:00 md",
    "12:30 pm",
    "1:00 pm",
    "1:30 pm",
    "2:00 pm",
    "2:30 pm",
    "3:00 pm",
    "3:30 pm",
    "4:00 pm",
    "4:30 pm",
    "5:00 pm",
    "5:30 pm",
    "6:00 pm",
    "6:30 pm",
    "7:00 pm"];
    horasContactoFin:string[]=["8:00 am",
    "8:30 am",
    "9:00 am",
    "9:30 am",
    "10:00 am",
    "10:30 am",
    "11:00 am",
    "11:30 am",
    "12:00 md",
    "12:30 pm",
    "1:00 pm",
    "1:30 pm",
    "2:00 pm",
    "2:30 pm",
    "3:00 pm",
    "3:30 pm",
    "4:00 pm",
    "4:30 pm",
    "5:00 pm",
    "5:30 pm",
    "6:00 pm",
    "6:30 pm",
    "7:00 pm"];
    requirioAyuda:string[] =["Si","No"];
    deseaRecibirMensajeria:string[] =["Desea recibir un mensajero","Env??o de documentos en forma digital v??a whatsApp","Firma presencial en Oficinas Centrales en San Jose Centro"];
    moneda:string[] =["Colones"," D??lares"];
    orden:any = [];
    orden1!:String;
    bodyFile!:String;
    cedula:any = [];
    cedula1!:String;
    bodyFilecedula!:String;
    levantarModal!:String;

  onFileChanged(event:any) {

      const  fileUploadBodies = this.getBase64EncodedFileData(event.target.files[0].name);
      this.tamanoDocOrden = event.target.files[0].size;
      console.log(event.target.files[0]);
      console.log(this.orden);
      console.log('Cuerpo del archivo: '+fileUploadBodies);
   

      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () => {
          console.log(reader.result);
        this.soliNew.ordenPatronal = reader.result;
        this.orden1 = this.soliNew.ordenPatronal;
        const dataOrden = this.orden1.split('base64,').pop();
        console.log('Salida orden: '+dataOrden);
        this.soliNew.ordenPatronal = dataOrden;

         
      };

      
      this.soliNew.ordenPatronalContentType = event.target.files[0].type;
      this.soliNew.ordenPatronalName = event.target.files[0].name;
      
    }

    onFileChangedCedula(event:any) {
      const  fileUploadBodies = this.getBase64EncodedFileData(event.target.files[0].name);
      this.tamanoDocCedula = event.target.files[0].size;
      console.log(this.cedula);
      console.log('Cuerpo del archivo: '+fileUploadBodies);
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () => {
          console.log(reader.result);
        this.soliNew.cedula = reader.result;
        this.cedula1 = this.soliNew.cedula;
        const dataCedula = this.orden1.split('base64,').pop();
        console.log('Salida orden: '+dataCedula);
        this.soliNew.cedula = dataCedula;
      };
      this.soliNew.cedulaContentType = event.target.files[0].type;
      this.soliNew.cedulaName = event.target.files[0].name;
    }

  ngOnInit(): void {
    this.buildForm();
    this.modal = document.getElementById('preloader')!;
    this.ActivarDireccion = true;
    this.DireccionDeEnvioValidator = '';
    this.soliNew.moneda = 'Colones';
    this.CamposSinCompletar = true;
    this.ErrorAlCrearLaSolicitud = true;
    this.ProcesandoSolicitudSucces = true;
    this.DesactivarBoton = false;
    this.ErrorTamanoArchivos = true;
    this.soliNew.pais = "--Seleccione un valor --";
    this.PaisSinSeleccionar = true;
  }
  

  provincias(){
    if(this.pais == 'Costa Rica'){
      this.canton = '';
      this.distrito = '';

      this.provinciaValores.push(
      "-Seleccione un valor-",
      "Alajuela",
      "Cartago",
      "Guanacaste",
      "Heredia",
      "Lim??n",
      "Puntarenas",
      "San Jos??")
    }
  }

  cantones(){
    this.cantonValores=[];
    this.distritoValores = [];
    this.canton = '';
    this.distrito = '';
      if(this.provincia == 'San Jos??'){
        this.cantonValores.push("-Seleccione un valor-","San Jos??",
          "Escaz??",
          "Desamparados",
          "Puriscal",
          "Tarraz??",
          "Aserr??",
          "Mora",
          "Goicoechea",
          "Alajuelita",
          "V??squez de Coronado",
          "Santa Ana",
          "Acosta",
          "Tib??s",
          "Moravia",
          "Montes de Oca",
          "Turrubares",
          "Dota",
          "Curridabat",
          "P??rez Zeled??n",
          "Le??n Cort??z Castro"
        );
      }else{
        if(this.provincia == 'Alajuela'){
          this.cantonValores.push("-Seleccione un valor-","Alajuela",
          "San Ram??n",
          "Grecia",
          "San Mateo",
          "Atenas",
          "Naranjo",
          "Palmares",
          "Po??s",
          "Orotina",
          "San Carlos",
          "Zarcero",
          "Valverde Vega",
          "Upala",
          "Los Chiles",
          "Guatuso"          
          );
        }else{
          if(this.provincia == 'Cartago'){
            this.cantonValores.push("-Seleccione un valor-","Cartago",
            "Para??so",
            "La Uni??n",
            "Jim??nez",
            "Turrialba",
            "Alvarado",
            "Oreamuno",
            "El Guarco"       
            );
          }else{
            if(this.provincia == 'Guanacaste'){
              this.cantonValores.push("-Seleccione un valor-","Liberia",
              "Nicoya",
              "Santa Cruz",
              "Bagaces",
              "Carrillo",
              "Ca??as",
              "Abang??res",
              "Tilar??n",
              "Nandayure",
              "La Cruz",
              "Hojancha"                     
              );
            }else{
              if(this.provincia == 'Heredia'){
                this.cantonValores.push("-Seleccione un valor-","Heredia",
                "Barva",
                "Santo Domingo",
                "Santa B??rbara",
                "San Rafa??l",
                "San Isidro",
                "Bel??n",
                "Flores",
                "San Pablo",
                "Sarapiqu??"                                     
                );
              }else{
                if(this.provincia == 'Lim??n'){
                  this.cantonValores.push("-Seleccione un valor-","Pococ??",
                  "Siquirres",
                  "Talamanca",
                  "Matina",
                  "Gu??cimo"                                     
                  );
                }else{
                  if(this.provincia == 'Puntarenas'){
                    this.cantonValores.push("-Seleccione un valor-","Puntarenas",
                    "Esparza",
                    "Buenos Aires",
                    "Montes de Oro",
                    "Osa",
                    "Aguirre",
                    "Golfito",
                    "Coto Brus",
                    "Parrita",
                    "Corredores",
                    "Garabito"                               
                    );
                  }
                }
              }
            }
          }
        }
      }
  }

  distritos(){
   this.distrito = '';
    this.distritoValores = [];
   if(this.canton == 'Abang??res'){
    this.distritoValores.push("-Seleccione un valor-",
      "LAS JUNTAS",
      "SIERRA",
      "SAN JUAN",
      "COLORADO",
    );
   }else{
    if(this.canton == 'Acosta'){
      this.distritoValores.push("-Seleccione un valor-",
        "GUAITIL Villa",
"PALMICHAL",
"CANGREJAL",
"SAN IGNACIO",
"SABANILLAS"
      );
     }else{

      if(this.canton == 'Aguirre'){
        this.distritoValores.push("-Seleccione un valor-",
          "QUEPOS",
          "SAVEGRE",
          "NARANJITO"
        );
       }else{
        if(this.canton == 'Alajuela'){
          this.distritoValores.push("-Seleccione un valor-",
            "ALAJUELA",
            "SAN JOS??",
            "CARRIZAL",
            "SAN ANTONIO",
            "GU??CIMA",
            "SAN ISIDRO",
            "SABANILLA",
            "SAN RAFAEL",
            "R??O SEGUNDO",
            "DESAMPARADOS",
            "TAMBOR",
            "GARITA",
            "SARAPIQU??",
            "TURR??CARES"
          );
         }else{
          if(this.canton == 'Alajuelita'){
            this.distritoValores.push("-Seleccione un valor-",
              "ALAJUELITA",
"SAN JOSECITO",
"SAN ANTONIO",
"CONCEPCI??N",
"SAN FELIPE"
            );
           }else{
               if(this.canton == 'Alvarado'){
            this.distritoValores.push("-Seleccione un valor-",
              "PACAYAS",
"CERVANTES",
"CAPELLADES"
            );
           }else{
            if(this.canton == 'Aserr??'){
              this.distritoValores.push("-Seleccione un valor-",
                "ASERRI",
                "TARBACA",
                "VUELTA DE JORCO",
                "SAN GABRIEL",
                "LEGUA",
                "MONTERREY",
                "SALITRILLOS"
              );
             }else{
              if(this.canton == 'Atenas'){
                this.distritoValores.push("-Seleccione un valor-",
                  "ATENAS",
                  "JES??S",
                  "MERCEDES",
                  "SAN ISIDRO",
                  "CONCEPCI??N",
                  "SAN JOSE",
                  "SANTA EULALIA",
                  "ESCOBAL"
                );
               }else{
                if(this.canton == 'Bagaces'){
                  this.distritoValores.push("-Seleccione un valor-",
                    "BAGACES",
                    "LA FORTUNA",
                    "MOGOTE",
                    "R??O NARANJO"
                  );
                 }else{
                  if(this.canton == 'Bagaces'){
                    this.distritoValores.push("-Seleccione un valor-",
                      "BARVA",
                      "SAN PEDRO",
                      "SAN PABLO",
                      "SAN ROQUE",
                      "SANTA LUC??A",
                      "SAN JOS?? DE LA MONTA??A"
                    );
                   }else{
                    if(this.canton == 'Bel??n'){
                      this.distritoValores.push("-Seleccione un valor-",
                        "SAN ANTONIO",
                        "LA RIBERA",
                        "LA ASUNCI??N",
                        
                      );
                     }else{
                      if(this.canton == 'Buenos Aires'){
                        this.distritoValores.push("-Seleccione un valor-",
                          "BUENOS AIRES",
                          "VOLC??N",
                          "POTRERO GRANDE",
                          "BORUCA",
                          "PILAS",
                          "COLINAS",
                          "CH??NGUENA",
                          "BIOLLEY",
                          "BRUNKA"
                          
                        );
                       }else{
                        if(this.canton == 'Ca??as'){
                          this.distritoValores.push("-Seleccione un valor-",
                            "CA??AS",
                            "PALMIRA",
                            "SAN MIGUEL",
                            "BEBEDERO",
                            "POROZAL"
                          );
                         }else{
                          if(this.canton == 'Carrillo'){
                            this.distritoValores.push("-Seleccione un valor-",
                              "FILADELFIA",
"PALMIRA",
"SARDINAL",
"BEL??N"
                            );
                           }else{
                            if(this.canton == 'Cartago'){
                              this.distritoValores.push("-Seleccione un valor-",
                                "ORIENTAL",
                                "OCCIDENTAL",
                                "CARMEN",
                                "SAN NICOL??S",
                                "AGUACALIENTE o SAN FRANCISCO",
                                "GUADALUPE o ARENILLA",
                                "LLANO GRANDE",
                                "QUEBRADILLA",
                                "CORRALILLO",
                                "TIERRA BLANCA",
                                "DULCE NOMBRE"                   );
                             }else{
                              if(this.canton == 'Corredores'){
                                this.distritoValores.push("-Seleccione un valor-",
                                  "CORREDOR",
"LA CUESTA",
"CANOAS",
"LAUREL"                  
                                  );
                               }else{
                                if(this.canton == 'Coto Brus'){
                                  this.distritoValores.push("-Seleccione un valor-",
                                    "SAN VITO",
                                    "SABALITO",
                                    "AGUABUENA",
                                    "LIMONCITO",
                                    "PITTIER",
                                    "GUTIERREZ BRAUN"                  
                                    );
                                 }else{
                                  if(this.canton == 'Curridabat'){
                                    this.distritoValores.push("-Seleccione un valor-",
                                      "CURRIDABAT",
                                      "GRANADILLA",
                                      "S??NCHEZ",
                                      "TIRRASES"              
                                      );
                                   }else{
                                    
                                    if(this.canton == 'Desamparados'){
                                      this.distritoValores.push("-Seleccione un valor-",
                                        "DESAMPARADOS",
                                        "SAN MIGUEL",
                                        "SAN JUAN DE DIOS",
                                        "SAN RAFAEL ARRIBA",
                                        "SAN ANTONIO",
                                        "FRAILES",
                                        "PATARR??",
                                        "SAN CRIST??BAL",
                                        "ROSARIO",
                                        "DAMAS",
                                        "SAN RAFAEL ABAJO",
                                        "GRAVILIAS",
                                        "LOS GUIDO"                
                                        );
                                     }else{
                                      if(this.canton == 'Dota'){
                                        this.distritoValores.push("-Seleccione un valor-",
                                          "SANTA MAR??A",
                                          "JARD??N",
                                          "COPEY"                
                                          );
                                       }else{
                                        if(this.canton == 'El Guarco'){
                                          this.distritoValores.push("-Seleccione un valor-",
                                            "EL TEJAR",
                                            "SAN ISIDRO",
                                            "TOBOSI",
                                            "PATIO DE AGUA"                
                                            );
                                         }else{
                                          if(this.canton == 'Escaz??'){
                                            this.distritoValores.push("-Seleccione un valor-",
                                              "ESCAZ??",
                                              "SAN ANTONIO",
                                              "SAN RAFAEL"                
                                              );
                                           }else{
                                            if(this.canton == 'Esparza'){
                                              this.distritoValores.push("-Seleccione un valor-",
                                                "ESP??RITU SANTO",
                                                "SAN JUAN GRANDE",
                                                "MACACONA",
                                                "SAN RAFAEL",
                                                "SAN JER??NIMO",
                                                "CALDERA"               
                                                );
                                             }else{
                                              if(this.canton == 'Flores'){
                                                this.distritoValores.push("-Seleccione un valor-",
                                                  "SAN JOAQU??N",
                                                  "BARRANTES",
                                                  "LLORENTE"              
                                                  );
                                               }else{
                                                if(this.canton == 'Garabito'){
                                                  this.distritoValores.push("-Seleccione un valor-",
                                                    "JAC??",
                                                    "T??RCOLES"             
                                                    );
                                                 }else{
                                                  if(this.canton == 'Goicoechea'){
                                                    this.distritoValores.push("-Seleccione un valor-",
                                                      "GUADALUPE",
                                                      "SAN FRANCISCO",
                                                      "CALLE BLANCOS",
                                                      "MATA DE PL??TANO",
                                                      "IP??S",
                                                      "RANCHO REDONDO",
                                                      "PURRAL"           
                                                      );
                                                   }else{
                                                    if(this.canton == 'Golfito'){
                                                      this.distritoValores.push("-Seleccione un valor-",
                                                        "GOLFITO",
                                                        "PUERTO JIM??NEZ",
                                                        "GUAYCAR??",
                                                        "PAV??N"          
                                                        );
                                                     }else{
                                                      if(this.canton == 'Grecia'){
                                                        this.distritoValores.push("-Seleccione un valor-",
                                                          "GRECIA",
                                                          "SAN ISIDRO",
                                                          "SAN JOS??",
                                                          "SAN ROQUE",
                                                          "TACARES",
                                                          "R??O CUARTO",
                                                          "PUENTE DE PIEDRA",
                                                          "BOL??VAR"        
                                                          );
                                                       }else{
                                                        if(this.canton == 'Gu??cimo'){
                                                          this.distritoValores.push("-Seleccione un valor-",
                                                            "GU??CIMO",
                                                            "MERCEDES",
                                                            "POCORA",
                                                            "R??O JIM??NEZ",
                                                            "DUACAR??"        
                                                            );
                                                         }else{
                                                          if(this.canton == 'Guatuso'){
                                                            this.distritoValores.push("-Seleccione un valor-",
                                                              "BUENAVISTA",
                                                              "COTE",
                                                              "KATIRA"                                                                  
                                                              );
                                                           }else{
                                                            if(this.canton == 'Heredia'){
                                                              this.distritoValores.push("-Seleccione un valor-",
                                                                "HEREDIA",
                                                                "SAN FRANCISCO",
                                                                "ULLOA",
                                                                "VARABLANCA",
                                                                "MERCEDES"                                                                  
                                                                );
                                                             }else{
                                                              if(this.canton == 'Hojancha'){
                                                                this.distritoValores.push("-Seleccione un valor-",
                                                                  "HOJANCHA",
                                                                  "MONTE ROMO",
                                                                  "PUERTO CARRILLO",
                                                                  "HUACAS"                                                              
                                                                  );
                                                               }else{
                                                                if(this.canton == 'Jim??nez'){
                                                                  this.distritoValores.push("-Seleccione un valor-",
                                                                    "JUAN VI??AS",
                                                                    "TUCURRIQUE",
                                                                    "PEJIBAYE"                                                               
                                                                    );
                                                                 }else{
                                                                  if(this.canton == 'La Cruz'){
                                                                    this.distritoValores.push("-Seleccione un valor-",
                                                                      "LA CRUZ",
                                                                      "SANTA CECILIA",
                                                                      "LA GARITA",
                                                                      "SANTA ELENA"                                                              
                                                                      );
                                                                   }else{
                                                                    if(this.canton == 'La Uni??n'){
                                                                      this.distritoValores.push("-Seleccione un valor-",
                                                                        "TRES R??OS",
                                                                        "SAN DIEGO",
                                                                        "SAN JUAN",
                                                                        "SAN RAFAEL",
                                                                        "CONCEPCI??N",
                                                                        "DULCE NOMBRE",
                                                                        "SAN RAM??N",
                                                                        "R??O AZUL"                                                              
                                                                        );
                                                                     }else{
                                                                      if(this.canton == 'Le??n Cort??z Castro'){
                                                                        this.distritoValores.push("-Seleccione un valor-",
                                                                          "SAN PABLO",
                                                                          "SAN ANDR??S",
                                                                          "LLANO BONITO",
                                                                          "SAN ISIDRO",
                                                                          "SANTA CRUZ",
                                                                          "SAN ANTONIO"                                                             
                                                                          );
                                                                       }else{
                                                                        if(this.canton == 'Liberia'){
                                                                          this.distritoValores.push("-Seleccione un valor-",
                                                                            "LIBERIA",
                                                                            "CA??AS DULCES",
                                                                            "NACASCOLO",
                                                                            "CURUBAND??",
                                                                            "MAYORGA"                                                            
                                                                            );
                                                                         }else{
                                                                          if(this.canton == 'Lim??n'){
                                                                            this.distritoValores.push("-Seleccione un valor-",
                                                                              "LIM??N",
                                                                              "VALLE LA ESTRELLA",
                                                                              "MATAMA"                                                          
                                                                              );
                                                                           }else{
                                                                            if(this.canton == 'Los Chiles'){
                                                                              this.distritoValores.push("-Seleccione un valor-",
                                                                                "LOS CHILES",
                                                                                "CA??O NEGRO",
                                                                                "EL AMPARO",
                                                                                "SAN JORGE"                                                       
                                                                                );
                                                                             }else{
                                                                              if(this.canton == 'Matina'){
                                                                                this.distritoValores.push("-Seleccione un valor-",
                                                                                  "MATINA",
                                                                                  "BAT??N",
                                                                                  "CARRANDI"                                                       
                                                                                  );
                                                                               }else{
                                                                                if(this.canton == 'Montes de Oca'){
                                                                                  this.distritoValores.push("-Seleccione un valor-",
                                                                                    "SAN PEDRO",
                                                                                    "SABANILLA",
                                                                                    "MERCEDES",
                                                                                    "SAN RAFAEL"                                                      
                                                                                    );
                                                                                 }else{
                                                                                   if(this.canton == 'Montes de Oro'){
                                                                                  this.distritoValores.push("-Seleccione un valor-",
                                                                                    "MIRAMAR",
                                                                                    "LA UNI??N",
                                                                                    "SAN ISIDRO"                                                      
                                                                                    );
                                                                                 }else{
                                                                                  if(this.canton == 'Mora'){
                                                                                    this.distritoValores.push("-Seleccione un valor-",
                                                                                      "COL??N",
                                                                                      "GUAYABO",
                                                                                      "TABARCIA",
                                                                                      "PIEDRAS NEGRAS",
                                                                                      "PICAGRES",
                                                                                      "JARIS",
                                                                                      "QUITIRRISI"                                                      
                                                                                      );
                                                                                   }else{
                                                                                    if(this.canton == 'Moravia'){
                                                                                      this.distritoValores.push("-Seleccione un valor-",
                                                                                        "SAN VICENTE",
                                                                                        "SAN JER??NIMO",
                                                                                        "LA TRINIDAD"                                                      
                                                                                        );
                                                                                     }else{
    
                                                                                      if(this.canton == 'Nandayure'){
                                                                                        this.distritoValores.push("-Seleccione un valor-",
                                                                                          "CARMONA",
                                                                                          "SANTA RITA",
                                                                                          "ZAPOTAL",
                                                                                          "PORVENIR",
                                                                                          "BEJUCO",
                                                                                          "SAN PABLO"                                                    
                                                                                          );
                                                                                       }else{
                                                                                        if(this.canton == 'Naranjo'){
                                                                                          this.distritoValores.push("-Seleccione un valor-",
                                                                                            "NARANJO",
                                                                                            "SAN MIGUEL",
                                                                                            "SAN JOS??",
                                                                                            "CIRR?? SUR",
                                                                                            "SAN JER??NIMO",
                                                                                            "SAN JUAN",
                                                                                            "EL ROSARIO",
                                                                                            "PALMITOS"                                                 
                                                                                            );
                                                                                         }else{
                                                                                          if(this.canton == 'Nicoya'){
                                                                                            this.distritoValores.push("-Seleccione un valor-",
                                                                                              "NICOYA",
                                                                                              "MANSI??N",
                                                                                              "SAN ANTONIO",
                                                                                              "QUEBRADA HONDA",
                                                                                              "S??MARA",
                                                                                              "NOSARA",
                                                                                              "BEL??N DE NOSARITA"                                               
                                                                                              );
                                                                                           }else{
                                                                                            if(this.canton == 'Oreamuno'){
                                                                                              this.distritoValores.push("-Seleccione un valor-",
                                                                                                "SAN RAFAEL",
                                                                                                "COT",
                                                                                                "POTRERO CERRADO",
                                                                                                "CIPRESES",
                                                                                                "SANTA ROSA"                                              
                                                                                                );
                                                                                             }else{
                                                                                              
                                                                                              if(this.canton == 'Orotina'){
                                                                                                this.distritoValores.push("-Seleccione un valor-",
                                                                                                  "OROTINA",
                                                                                                  "EL MASTATE",
                                                                                                  "HACIENDA VIEJA",
                                                                                                  "COYOLAR",
                                                                                                  "LA CEIBA"                                             
                                                                                                  );
                                                                                               }else{
                                                                                                if(this.canton == 'Osa'){
                                                                                                  this.distritoValores.push("-Seleccione un valor-",
                                                                                                    "PUERTO CORT??S",
                                                                                                    "PALMAR",
                                                                                                    "SIERPE",
                                                                                                    "BAH??A BALLENA",
                                                                                                    "PIEDRAS BLANCAS",
                                                                                                    "BAH??A DRAKE"                                            
                                                                                                    );
                                                                                                 }else{
                                                                                                  if(this.canton == 'Palmares'){
                                                                                                    this.distritoValores.push("-Seleccione un valor-",
                                                                                                      "ZARAGOZA",
                                                                                                      "BUENOS AIRES",
                                                                                                      "SANTIAGO",
                                                                                                      "CANDELARIA",
                                                                                                      "ESQU??PULAS",
                                                                                                      "LA GRANJA",
                                                                                                      "PALMARES"                                         
                                                                                                      );
                                                                                                   }else{
                                                                                                    if(this.canton == 'Para??so'){
                                                                                                      this.distritoValores.push("-Seleccione un valor-",
                                                                                                        "PARA??SO",
                                                                                                        "SANTIAGO",
                                                                                                        "OROSI",
                                                                                                        "CACH??",
                                                                                                        "LLANOS DE SANTA LUC??A"                                        
                                                                                                        );
                                                                                                     }else{
                                                                                                      if(this.canton == 'Parrita'){
                                                                                                        this.distritoValores.push("-Seleccione un valor-",
                                                                                                          "PARRITA"                                       
                                                                                                          );
                                                                                                       }else{
                                                                                                        if(this.canton == 'P??rez Zeled??n'){
                                                                                                          this.distritoValores.push("-Seleccione un valor-",
                                                                                                            "SAN ISIDRO DE EL GENERAL",
                                                                                                            "EL GENERAL",
                                                                                                            "DANIEL FLORES",
                                                                                                            "RIVAS",
                                                                                                            "SAN PEDRO",
                                                                                                            "PLATANARES",
                                                                                                            "PEJIBAYE",
                                                                                                            "CAJ??N",
                                                                                                            "BAR??",
                                                                                                            "R??O NUEVO",
                                                                                                            "P??RAMO"                                      
                                                                                                            );
                                                                                                         }else{
                                                                                                          if(this.canton == 'Po??s'){
                                                                                                            this.distritoValores.push("-Seleccione un valor-",
                                                                                                              "SAN PEDRO",
                                                                                                              "SAN JUAN",
                                                                                                              "SAN RAFAEL",
                                                                                                              "CARRILLOS",
                                                                                                              "SABANA REDONDA"                                     
                                                                                                              );
                                                                                                           }else{
                                                                                                            if(this.canton == 'Pococ??'){
                                                                                                              this.distritoValores.push("-Seleccione un valor-",
                                                                                                                "GU??PILES",
                                                                                                                "JIM??NEZ",
                                                                                                                "RITA",
                                                                                                                "ROXANA",
                                                                                                                "CARIARI",
                                                                                                                "COLORADO",
                                                                                                                "LA COLONIA"                                   
                                                                                                                );
                                                                                                             }else{
                                                                                                              if(this.canton == 'Puntarenas'){
                                                                                                                this.distritoValores.push("-Seleccione un valor-",
                                                                                                                  "ACAPULCO",
                                                                                                                  "EL ROBLE",
                                                                                                                  "ARANCIBIA",
                                                                                                                  "PUNTARENASx",
                                                                                                                  "PITAHAYA",
                                                                                                                  "CHOMES",
                                                                                                                  "LEPANTO",
                                                                                                                  "PAQUERA",
                                                                                                                  "MANZANILLO",
                                                                                                                  "GUACIMAL",
                                                                                                                  "BARRANCA",
                                                                                                                  "MONTE VERDE",
                                                                                                                  "C??BANO",
                                                                                                                  "CHACARITA",
                                                                                                                  "CHIRA"                                 
                                                                                                                  );
                                                                                                               }else{
                                                                                                                if(this.canton == 'Puriscal'){
                                                                                                                  this.distritoValores.push("-Seleccione un valor-",
                                                                                                                    "SANTIAGO",
                                                                                                                    "MERCEDES SUR",
                                                                                                                    "BARBACOAS",
                                                                                                                    "GRIFO ALTO",
                                                                                                                    "SAN RAFAEL",
                                                                                                                    "CANDELARITA",
                                                                                                                    "DESAMPARADITOS",
                                                                                                                    "SAN ANTONIO",
                                                                                                                    "CHIRES"                                 
                                                                                                                    );
                                                                                                                 }else{
                                                                                                                  if(this.canton == 'San Carlos'){
                                                                                                                    this.distritoValores.push("-Seleccione un valor-",
                                                                                                                      "QUESADA",
                                                                                                                      "FLORENCIA",
                                                                                                                      "BUENAVISTA",
                                                                                                                      "AGUAS ZARCAS",
                                                                                                                      "VENECIA",
                                                                                                                      "PITAL",
                                                                                                                      "LA FORTUNA",
                                                                                                                      "LA TIGRA",
                                                                                                                      "LA PALMERA",
                                                                                                                      "VENADO",
                                                                                                                      "CUTRIS",
                                                                                                                      "MONTERREY",
                                                                                                                      "POCOSOL"                               
                                                                                                                      );
                                                                                                                   }else{
                                                                                                                    if(this.canton == 'San Isidro'){
                                                                                                                      this.distritoValores.push("-Seleccione un valor-",
                                                                                                                        "SAN ISIDRO",
                                                                                                                        "SAN JOS??",
                                                                                                                        "CONCEPCI??N",
                                                                                                                        "SAN FRANCISCO"                             
                                                                                                                        );
                                                                                                                     }else{
                                                                                                                      if(this.canton == 'San Jos??'){
                                                                                                                        this.distritoValores.push("-Seleccione un valor-",
                                                                                                                          "CARMEN",
                                                                                                                          "MERCED",
                                                                                                                          "HOSPITAL",
                                                                                                                          "CATEDRAL",
                                                                                                                          "ZAPOTE",
                                                                                                                          "SAN FRANCISCO DE DOS R??OS",
                                                                                                                          "URUCA",
                                                                                                                          "MATA REDONDA",
                                                                                                                          "PAVAS",
                                                                                                                          "HATILLO",
                                                                                                                          "SAN SEBASTI??N"                            
                                                                                                                          );
                                                                                                                       }else{
                                                                                                                        
                                                                                                                        if(this.canton == 'San Mateo'){
                                                                                                                          this.distritoValores.push("-Seleccione un valor-",
                                                                                                                            "SAN MATEO",
                                                                                                                            "DESMONTE",
                                                                                                                            "JES??S MAR??A",
                                                                                                                            "LABRADOR"                          
                                                                                                                            );
                                                                                                                         }else{
                                                                                                                          
                                                                                                                          if(this.canton == 'San Rafa??l'){
                                                                                                                            this.distritoValores.push("-Seleccione un valor-",
                                                                                                                              "SAN PABLO",
                                                                                                                              "SAN RAFAEL",
                                                                                                                              "SAN JOSECITO",
                                                                                                                              "SANTIAGO",
                                                                                                                              "??NGELES",
                                                                                                                              "CONCEPCI??N"                         
                                                                                                                              );
                                                                                                                           }else{
                                                                                                                            if(this.canton == 'San Ram??n'){
                                                                                                                              this.distritoValores.push("-Seleccione un valor-",
                                                                                                                                "SAN RAM??N",
                                                                                                                                "SANTIAGO",
                                                                                                                                "SAN JUAN",
                                                                                                                                "PIEDADES NORTE",
                                                                                                                                "PIEDADES SUR",
                                                                                                                                "SAN RAFAEL",
                                                                                                                                "SAN RAFAEL",
                                                                                                                                "??NGELES",
                                                                                                                                "ALFARO",
                                                                                                                                "VOLIO",
                                                                                                                                "CONCEPCI??N",
                                                                                                                                "ZAPOTAL",
                                                                                                                                "PE??AS BLANCAS"                        
                                                                                                                                );
                                                                                                                             }else{
                                                                                                                              if(this.canton == 'Santa Ana'){
                                                                                                                                this.distritoValores.push("-Seleccione un valor-",
                                                                                                                                  "SANTA ANA",
                                                                                                                                  "SALITRAL",
                                                                                                                                  "POZOS",
                                                                                                                                  "URUCA",
                                                                                                                                  "PIEDADES",
                                                                                                                                  "BRASIL"                       
                                                                                                                                  );
                                                                                                                               }else{
                                                                                                                                if(this.canton == 'Santa B??rbara'){
                                                                                                                                  this.distritoValores.push("-Seleccione un valor-",
                                                                                                                                    "SANTA B??RBARA",
                                                                                                                                    "SAN PEDRO",
                                                                                                                                    "SAN JUAN",
                                                                                                                                    "JES??S",
                                                                                                                                    "SANTO DOMINGO",
                                                                                                                                    "PURAB??"                     
                                                                                                                                    );
                                                                                                                                 }else{
                                                                                                                                  if(this.canton == 'Santa Cruz'){
                                                                                                                                    this.distritoValores.push("-Seleccione un valor-",
                                                                                                                                      "SANTA CRUZ",
                                                                                                                                      "BOLS??N",
                                                                                                                                      "VEINTISIETE DE ABRIL",
                                                                                                                                      "TEMPATE",
                                                                                                                                      "CARTAGENA",
                                                                                                                                      "CUAJINIQUIL",
                                                                                                                                      "DIRI??",
                                                                                                                                      "CABO VELAS",
                                                                                                                                      "TAMARINDO"
                                                                                                                                    );
                                                                                                                                   }else{
                                                                                                                                    if(this.canton == 'Santo Domingo'){
                                                                                                                                      this.distritoValores.push("-Seleccione un valor-",
                                                                                                                                        "SAN VICENTE",
                                                                                                                                        "SAN MIGUEL",
                                                                                                                                        "PARACITO",
                                                                                                                                        "SANTO TOM??S",
                                                                                                                                        "SANTA ROSA",
                                                                                                                                        "TURES",
                                                                                                                                        "PAR??"
                                                                                                                                      );
                                                                                                                                     }else{
                                                                                                                                      if(this.canton == 'Sarapiqu??'){
                                                                                                                                        this.distritoValores.push("-Seleccione un valor-",
                                                                                                                                          "PUERTO VIEJO",
                                                                                                                                          "LA VIRGEN",
                                                                                                                                          "LAS HORQUETAS",
                                                                                                                                          "LLANURAS DEL GASPAR",
                                                                                                                                          "CURE??A"
                                                                                                                                        );
                                                                                                                                       }else{
                                                                                                                                        if(this.canton == 'Siquirres'){
                                                                                                                                          this.distritoValores.push("-Seleccione un valor-",
                                                                                                                                            "SIQUIRRES",
                                                                                                                                            "PACUARITO",
                                                                                                                                            "FLORIDA",
                                                                                                                                            "GERMANIA",
                                                                                                                                            "EL CAIRO",
                                                                                                                                            "ALEGR??A"
                                                                                                                                          );
                                                                                                                                         }else{
                                                                                                                                          if(this.canton == 'Talamanca'){
                                                                                                                                            this.distritoValores.push("-Seleccione un valor-",
                                                                                                                                              "BRATSI",
                                                                                                                                              "SIXAOLA",
                                                                                                                                              "CAHUITA",
                                                                                                                                              "TELIRE"
                                                                                                                                            );
                                                                                                                                           }else{
                                                                                                                                            if(this.canton == 'Tarraz??'){
                                                                                                                                              this.distritoValores.push("-Seleccione un valor-",
                                                                                                                                                "SAN MARCOS",
                                                                                                                                                "SAN LORENZO",
                                                                                                                                                "SAN CARLOS"
                                                                                                                                              );
                                                                                                                                             }else{
                                                                                                                                              if(this.canton == 'Tib??s'){
                                                                                                                                                this.distritoValores.push("-Seleccione un valor-",
                                                                                                                                                  "SAN JUAN",
                                                                                                                                                  "CINCO ESQUINAS",
                                                                                                                                                  "ANSELMO LLORENTE",
                                                                                                                                                  "LEON XIII",
                                                                                                                                                  "COLIMA"
                                                                                                                                                );
                                                                                                                                               }else{
                                                                                                                                                if(this.canton == 'Tilar??n'){
                                                                                                                                                  this.distritoValores.push("-Seleccione un valor-",
                                                                                                                                                    "TILAR??N",
                                                                                                                                                    "QUEBRADA GRANDE",
                                                                                                                                                    "TRONADORA",
                                                                                                                                                    "SANTA ROSA",
                                                                                                                                                    "L??BANO",
                                                                                                                                                    "TIERRAS MORENAS",
                                                                                                                                                    "ARENAL"
                                                                                                                                                  );
                                                                                                                                                 }else{
                                                                                                                                                  if(this.canton == 'Turrialba'){
                                                                                                                                                    this.distritoValores.push("-Seleccione un valor-",
                                                                                                                                                      "LA SUIZA",
                                                                                                                                                      "PERALTA",
                                                                                                                                                      "SANTA CRUZ",
                                                                                                                                                      "TURRIALBA",
                                                                                                                                                      "SANTA TERESITA",
                                                                                                                                                      "PAVONES",
                                                                                                                                                      "TUIS",
                                                                                                                                                      "TAYUTIC",
                                                                                                                                                      "SANTA ROSA",
                                                                                                                                                      "TRES EQUIS",
                                                                                                                                                      "LA ISABEL",
                                                                                                                                                      "CHIRRIP??"
                                                                                                                                                    );
                                                                                                                                                   }else{
                                                                                                                                                    if(this.canton == 'Turrubares'){
                                                                                                                                                      this.distritoValores.push("-Seleccione un valor-",
                                                                                                                                                        "SAN PABLO",
                                                                                                                                                        "SAN PEDRO",
                                                                                                                                                        "SAN JUAN DE MATA",
                                                                                                                                                        "SAN LUIS",
                                                                                                                                                        "CARARA"
                                                                                                                                                      );
                                                                                                                                                     }else{
                                                                                                                                                      if(this.canton == 'Upala'){
                                                                                                                                                        this.distritoValores.push("-Seleccione un valor-",
                                                                                                                                                          "UPALA",
                                                                                                                                                          "AGUAS CLARAS",
                                                                                                                                                          "SAN JOS?? o PIZOTE",
                                                                                                                                                          "BIJAGUA",
                                                                                                                                                          "DELICIAS",
                                                                                                                                                          "DOS R??OS",
                                                                                                                                                          "YOLILLAL",
                                                                                                                                                          "CANALETE"
                                                                                                                                                        );
                                                                                                                                                       }else{
                                                                                                                                                        if(this.canton == 'Valverde Vega'){
                                                                                                                                                          this.distritoValores.push("-Seleccione un valor-",
                                                                                                                                                            "SARCH?? NORTE",
                                                                                                                                                            "SARCH?? SUR",
                                                                                                                                                            "TORO AMARILLO",
                                                                                                                                                            "SAN PEDRO",
                                                                                                                                                            "RODR??GUEZ"
                                                                                                                                                          );
                                                                                                                                                         }else{
                                                                                                                                                          if(this.canton == 'V??squez de Coronado'){
                                                                                                                                                            this.distritoValores.push("-Seleccione un valor-",
                                                                                                                                                              "SAN ISIDRO",
                                                                                                                                                              "SAN RAFAEL",
                                                                                                                                                              "DULCE NOMBRE DE JES??S",
                                                                                                                                                              "PATALILLO",
                                                                                                                                                              "CASCAJAL"
                                                                                                                                                            );
                                                                                                                                                           }else{
                                                                                                                                                            if(this.canton == 'Zarcero'){
                                                                                                                                                              this.distritoValores.push("-Seleccione un valor-",
                                                                                                                                                                "ZARCERO",
                                                                                                                                                                "LAGUNA",
                                                                                                                                                                "GUADALUPE",
                                                                                                                                                                "PALMIRA",
                                                                                                                                                                "ZAPOTE",
                                                                                                                                                                "BRISAS"
                                                                                                                                                              );
                                                                                                                                                             }else{
                                                                                                                                                              if(this.canton == 'San Pablo'){
                                                                                                                                                                this.distritoValores.push("-Seleccione un valor-",
                                                                                                                                                                  "SAN PABLO"
                                                                                                                                                                  
                                                                                                                                                                );
                                                                                                                                                               }else{
                                                                                                                                                                if(this.canton == 'Barva'){
                                                                                                                                                                  this.distritoValores.push("-Seleccione un valor-",
                                                                                                                                                                    "BARVA",
                                                                                                                                                                    "SAN PEDRO",
                                                                                                                                                                    "SAN PABLO",
                                                                                                                                                                    "SAN ROQUE",
                                                                                                                                                                    "SANTA LUC??A",
                                                                                                                                                                    "SAN JOS?? DE LA MONTA??A"

                                                                                                                                                                    
                                                                                                                                                                  );
                                                                                                                                                                 }
                                                                                                                                                               }
                                                                                                                                                             }
                                                                                                                                                           }
                                                                                                                                                         }
                                                                                                                                                       }
                                                                                                                                                     }
                                                                                                                                                   }
                                                                                                                                                 }
                                                                                                                                               }
                                                                                                                                             }
                                                                                                                                           }
                                                                                                                                         }
                                                                                                                                       }
                                                                                                                                     }
                                                                                                                                   }
                                                                                                                                 }
                                                                                                                               }
                                                                                                                             }
                                                                                                                           }
                                                                                                                         }
                                                                                                                       }
                                                                                                                     }
                                                                                                                   }
                                                                                                                 }
                                                                                                               }
                                                                                                             }
                                                                                                           }
                                                                                                         }
                                                                                                       }
                                                                                                     }
                                                                                                   }
                                                                                                 }
                                                                                               }
                                                                                             }
                                                                                             
                                                                                           }
                                                                                           
                                                                                         }
                                                                                         
                                                                                       }
                                                                                     }
                                                                                     
                                                                                   }
                                                                                   
                                                                                 }
                                                                                 }
                                                                               }
                                                                             }
                                                                           }
                                                                         }
                                                                       }
                                                                     }
                                                                   }
                                                                 }
                                                               }
                                                             }
                                                           }
                                                         } 
                                                       } 
                                                     } 
                                                   } 
                                                 } 
                                               } 
                                             } 
                                           } 
                                         } 
                                       } 
                                     }
                                   }
                                 }
                               }
                             }
                           }
                         }
                       }
                     }
                   }
                 }
               }
             }
           }
           }
         }
       }
       
     }
   }
  }
  getToken(){
    if(this.soliNew.pais != "--Seleccione un valor --"){
      if(this.distrito == '-Seleccione un valor-' || this.provincia == '-Seleccione un valor-'  || this.canton == '-Seleccione un valor-' ){
        this.open('focusFirst');
      }else{
        if(this.soliNew.salarioMensual < 280000){
          this.router.navigate(['requisitos']);
        }else{
        if(this.tamanoDocOrden >= 3676333 || this.tamanoDocCedula >= 3676333){
          this.ErrorTamanoArchivos = false;
        }else{
        this.login=[];
        this.ProcesandoSolicitudSucces = false;
        this.DesactivarBoton = true;
        this.ErrorAlCrearLaSolicitud = true;
        this.ErrorTamanoArchivos = true;
        this.rest.getToken().subscribe((data: {})=>{
        console.log(data);
        this.login.push(data);
        this.sendSolicitudPortal(this.login);
        console.log(this.login);
      })
    }
        }
      }
    }else{
      this.PaisSinSeleccionar = false;
    }


}



sendSolicitudPortal(datos:any){
    let plazox = this._Activatedroute.snapshot.paramMap.get("plazo");
    this.soliNew.plazo = this._Activatedroute.snapshot.paramMap.get("plazo");
    this.soliNew.montoSolicitado = this._Activatedroute.snapshot.paramMap.get("monto");
    for(let l of datos) {
      this.token = l.access_token;
      console.log("SalidaToken: "+this.token);
    }
  
    this.rest.postNesSolicitud(this.token,this.soliNew) .subscribe((data: {})=>{
      console.log(data);
      this.jsonEntrante.push(data);
      for(let j of this.jsonEntrante) {
        if(j.Mensaje == 'Solicitud creada correctamente'){
          
          this.router.navigate(['step3Primerizos',j.Id],{state: {data:{id:j.Id,monto:j.monto ,interes:j.interes ,tecno:j.tecno,descuento:j.descuento,totalPagar:j.totalPagar, aval:j.aval,iva:j.iva, plazo:plazox,servicioFE:j.servicioFE}}});
        }else{
          if(j.Mensaje == 'Cliente Existe'){
            
            this.router.navigate(['clienteExiste']);
            }else{
              if(j.Mensaje == 'Error al crear la solicitud'){
                this.levantarModal ='Error al crear solicitud';
                this.ErrorAlCrearLaSolicitud = false;
                this.ProcesandoSolicitudSucces = true;
                this.DesactivarBoton = false;
              }
            }
        }
        console.log("SalidaToken: "+this.token);
      }
      console.log(this.jsonEntrante);
    })
}


private buildForm(){
  this.form = this.formBuilder.group({
    nombreCompleto: ['',[Validators.required]],
    numeroCedula: ['',[Validators.required,Validators.pattern("^[0-9]*"),Validators.min(100000000)]],
    correoElectronico: ['',[Validators.required,Validators.email]],
    numeroCelular: ['',[Validators.required,Validators.pattern("^[0-9]*"),Validators.min(10000000)]],
    otroTelefono: ['',[Validators.pattern("^[0-9]*"),Validators.min(10000000)]],
    estadoCivil: ['',[Validators.required]],
    pais: ['',[Validators.required]],
    provincia: ['',[Validators.required]],
    canton: ['',[Validators.required]],
    distrito: ['',[Validators.required]],
    direccionExacta: ['',[Validators.required,Validators.maxLength(245)]],
    sector: ['',[Validators.required]],
    profesion: ['',[Validators.required]],
    lugarTrabajo: ['',[Validators.required]],
    salarioMensual: ['',[Validators.required,Validators.pattern("^[0-9]*")]],
    tiempoLaborado: ['',[Validators.required]],
    horaPreferidaContacto: ['',[Validators.required]],
    hasta: ['',[Validators.required]],
    requirioAyuda: ['',[Validators.required]],
    comoNosConocieron: ['',[Validators.required]],
    nombreCompletoDeLaReferencia:['',[Validators.required]],
    parentesco:['',[Validators.required]],
    numeroDeTelefono:['',[Validators.required,Validators.pattern("^[0-9]*"),Validators.min(10000000)]],
    deseaRecibirMensajeria:['',[Validators.required]],
    direccionDeEnvioMensajeria:['',[Validators.maxLength(245)]],
    cuentaIBAN:['',[Validators.required,Validators.pattern("^[0-9]*"),Validators.maxLength(20)]],
    direccionDelTrabajo:['',[Validators.required,Validators.maxLength(245)]],
    telefonoTrabajo:['',[Validators.required,Validators.pattern("^[0-9]*"),Validators.min(10000000)]],
    moneda:['',[Validators.required]],
    nombreCompletoDeLaReferencia2:['',[Validators.required]],
    parentesco2:['',[Validators.required]],
    numeroDeTelefono2:['',[Validators.required,Validators.pattern("^[0-9]*"),Validators.min(20000000)]],
  });
  this.form.controls['moneda'].setValue('Colones', {onlySelf: true});
  this.form.controls['pais'].setValue('--Seleccione un valor --', {onlySelf: true});
  //#region Nombre
    this.form.get('nombreCompleto')?.valueChanges
    .pipe(
      debounceTime(500)
    )
    .subscribe(value =>{
        console.log(value);
      this.soliNew.nombreCompleto = value;

    });

 //#endregion Nombre

  //#region Cedula
  this.form.get('numeroCedula')?.valueChanges
  .pipe(
    debounceTime(500)
  )
  .subscribe(value =>{
      console.log(value);
      this.soliNew.numeroCedula = value;

  });
  //#endregion Cedula

  //#region Correo
  this.form.get('correoElectronico')?.valueChanges
  .pipe(
    debounceTime(500)
  )
  .subscribe(value =>{
      console.log(value);
      this.soliNew.correoElectronico = value;

  });
  //#endregion Correo


  //#region Celular
  this.form.get('numeroCelular')?.valueChanges
  .pipe(
    debounceTime(500)
  )
  .subscribe(value =>{
      console.log(value);
      this.soliNew.numeroCelular = value;

  });
  //#endregion Celular

  //#region telefono
    this.form.get('otroTelefono')?.valueChanges
    .pipe(
      debounceTime(500)
    )
    .subscribe(value =>{
        console.log(value);
        this.soliNew.otroTelefono = value;

    });
  //#endregion telefono


    //#region pais
    this.form.get('pais')?.valueChanges
    .subscribe(value =>{
        console.log(value);
        this.pais = value;
        this.provincias();
        this.soliNew.pais = value;
        this.PaisSinSeleccionar = true;
    });
    //#endregion pais


  //#region Provincia
    this.form.get('provincia')?.valueChanges
    .subscribe(value =>{
        console.log(value);
        this.provincia = value;
        this.cantones();
        this.soliNew.provincia = value;
        this.PaisSinSeleccionar = true;
    });
  //#endregion Provincia

  //#region Canton 
  this.form.get('canton')?.valueChanges
  .subscribe(value =>{
      console.log(value);
      this.canton = value;
      this.distritos();
      this.soliNew.canton = value;
  });
  //#endregion Canton


  //#region Distrito
  this.form.get('distrito')?.valueChanges
  .subscribe(value =>{
      console.log(value);
      this.soliNew.distrito = value;
  });
  //#endregion Distrito

  //#region  DireccionExacta
  this.form.get('direccionExacta')?.valueChanges
  .subscribe(value =>{
      console.log(value);
      this.soliNew.direccionExacta = value;
  });

  //#endregion DireccionExacta

  //#region Sector
      this.form.get('sector')?.valueChanges
      .pipe(
        debounceTime(500)
      )
      .subscribe(value =>{
          console.log(value);
          this.soliNew.sector = value;
      });

  //#endregion Sector



  //#region Profesion

  this.form.get('profesion')?.valueChanges
  .pipe(
    debounceTime(500)
  )
  .subscribe(value =>{
      console.log(value);
      this.soliNew.profesion = value;
  });
  //#endregion Profesion

  //#region Estado

  this.form.get('estadoCivil')?.valueChanges
  .pipe(
    debounceTime(500)
  )
  .subscribe(value =>{
      console.log(value);
      this.soliNew.estadoCivil = value;
  });
  //#endregion Estado


  //#region LugarDeTrabajo
  this.form.get('lugarTrabajo')?.valueChanges
  .pipe(
    debounceTime(500)
  )
  .subscribe(value =>{
      console.log(value);
      this.soliNew.lugarTrabajo = value;
  });

  //#endregion lugarDeTrabajo


  //#region SalarioMensual
  this.form.get('salarioMensual')?.valueChanges
  .pipe(
    debounceTime(500)
  )
  .subscribe(value =>{
      console.log(value);
      this.soliNew.salarioMensual = value;
  });
  //#endregion SalarioMensual


  //#region TiempoLaborado

  this.form.get('tiempoLaborado')?.valueChanges
  .pipe(
    debounceTime(500)
  )
  .subscribe(value =>{
      console.log(value);
      this.soliNew.tiempoLaborado = value;
  });
  //#endregion TiempoLaborado


  //#region HoraInicio
  this.form.get('horaPreferidaContacto')?.valueChanges
  .pipe(
    debounceTime(500)
  )
  .subscribe(value =>{
      console.log(value);
      this.soliNew.horaPreferidaContacto = value;
  });

  //#endregion HoraInicio


  //#region HoraFin
  this.form.get('hasta')?.valueChanges
  .pipe(
    debounceTime(500)
  )
  .subscribe(value =>{
      console.log(value);
      this.soliNew.hasta = value;
  });

  //#endregion HoraFin

  //#region RequirioAyuda
    this.form.get('requirioAyuda')?.valueChanges
    .pipe(
      debounceTime(500)
    )
    .subscribe(value =>{
        console.log(value);
        this.soliNew.requirioAyuda = value;
    });
  //#endregion RequirioAyuda

  //#region comoNosConocieron
    this.form.get('comoNosConocieron')?.valueChanges
      .pipe(
        debounceTime(500)
      )
      .subscribe(value =>{
          console.log(value);
          this.soliNew.comoNosConocieron = value;
      });
  //#endregion comoNosConocieron

    //#region nombreReferencia
    this.form.get('nombreCompletoDeLaReferencia')?.valueChanges
    .pipe(
      debounceTime(500)
    )
    .subscribe(value =>{
        console.log(value);
        this.soliNew.nombreCompletoDeLaReferencia = value;
    });
    //#endregion nombreReferencia

    //#region parentesco
      this.form.get('parentesco')?.valueChanges
      .pipe(
        debounceTime(500)
      )
      .subscribe(value =>{
          console.log(value);
          this.soliNew.parentesco = value;
      });
    //#endregion

    //#region numeroDeTelefono
        this.form.get('numeroDeTelefono')?.valueChanges
        .pipe(
          debounceTime(500)
       )
        .subscribe(value =>{
            console.log(value);
            this.soliNew.numeroDeTelefono = value;
        });
    //#endregion numeroDeTelefono

    //#region deseaRecibirMensajeria
          this.form.get('deseaRecibirMensajeria')?.valueChanges
          .pipe(
            debounceTime(500)
          )
          .subscribe(value =>{
              console.log(value);
              this.DeseaMensajeria = value;
              this.soliNew.deseaRecibirMensajeria = value;
              if(value == 'Desea recibir un mensajero'){
                this.ActivarDireccion = false;
              }else{
                this.ActivarDireccion = true;
              }
          });
    //#endregion deseaRecibirMensajeria

    //#region direccionDeEnvioMensajeria
        this.form.get('direccionDeEnvioMensajeria')?.valueChanges
        .pipe(
          debounceTime(500)
        )
        .subscribe(value =>{
            console.log(value);
            this.DireccionDeEnvioValidator = value;
            this.soliNew.direccionDeEnvioMensajeria = value;
        });
  //#endregion direccionDeEnvioMensajeria
      
      //#region cuentaIBAN
          this.form.get('cuentaIBAN')?.valueChanges
          .pipe(
            debounceTime(500)
          )
          .subscribe(value =>{
              console.log(value);
              this.soliNew.cuentaIBAN ='CR' + value;
          });
      //#endregion cuentaIBAN

      //#region direccionDelTrabajo
          this.form.get('direccionDelTrabajo')?.valueChanges
          .pipe(
            debounceTime(500)
          )
          .subscribe(value =>{
              console.log(value);
              this.soliNew.direccionDelTrabajo = value;
          });
      //#endregion direccionDelTrabajo

      //#region telefonoTrabajo
          this.form.get('telefonoTrabajo')?.valueChanges
          .pipe(
            debounceTime(500)
          )
          .subscribe(value =>{
              console.log(value);
              this.soliNew.telefonoTrabajo = value;
          });
      //#endregion telefonoTrabajo

      //#region moneda
          this.form.get('moneda')?.valueChanges
          .pipe(
            debounceTime(500)
          )
          .subscribe(value =>{
              console.log(value);
              this.soliNew.moneda = value;
          });
      //#endregion moneda

        //#region nombreReferencia2
    this.form.get('nombreCompletoDeLaReferencia2')?.valueChanges
    .pipe(
      debounceTime(500)
    )
    .subscribe(value =>{
        console.log(value);
        this.soliNew.nombreCompletoDeLaReferencia2 = value;
    });
    //#endregion nombreReferencia

    //#region parentesco2
      this.form.get('parentesco2')?.valueChanges
      .pipe(
        debounceTime(500)
      )
      .subscribe(value =>{
          console.log(value);
          this.soliNew.parentesco2 = value;
      });
    //#endregion

    //#region numeroDeTelefono2
    this.form.get('numeroDeTelefono2')?.valueChanges
    .pipe(
      debounceTime(500)
   )
    .subscribe(value =>{
        console.log(value);
        this.soliNew.numeroDeTelefono2 = value;
    });
     //#endregion numeroDeTelefono
}

solicitarPrimerizos(event:Event){
  event.preventDefault();
  if(this.form.valid){
    const values = this.form.value;
    this.PaisSinSeleccionar = true;
    if(this.DeseaMensajeria == 'Si' && this.DireccionDeEnvioValidator == ''){
      this.open('focusFirst');
    }else{
      this.getToken();
    }
    
    
  }else{
    this.form.markAllAsTouched();
    if(this.soliNew.pais == "--Seleccione un valor --"){
      this.PaisSinSeleccionar = false;
    }
    console.log(this.form.getError);
    this.CamposSinCompletar = false;
    this.DesactivarBoton = false;
    console.log('Error al enviar datos');
  }
  
}


getBase64EncodedFileData(file: File): Observable<string> {
  return new Observable(observer => {
    const reader = new FileReader();

    reader.onload = () => {
      const { result } = reader;
      const data = result as ArrayBuffer; // <--- FileReader gives us the ArrayBuffer
      const base64Encoded = encode(data); // <--- convert ArrayBuffer to base64 string

      observer.next(base64Encoded);
      observer.complete();
    };

    reader.onerror = () => {
      observer.error(reader.error);
    };

    reader.readAsArrayBuffer(file);
  });
}


open(name: string) {
  const modalSalida =  this.modalService.open(MODALS[name]);
  if(this.levantarModal == 'Error al crear solicitud'){
    modalSalida.componentInstance.mensaje1 = 'Error al crear la';
    modalSalida.componentInstance.mensaje2 = 'solicitud';
    modalSalida.componentInstance.mensaje3 = '';
    modalSalida.componentInstance.mensaje4 = '';
  }
  if(this.distrito == '-Seleccione un valor-' || this.provincia == '-Seleccione un valor-'  || this.canton == '-Seleccione un valor-'){
    modalSalida.componentInstance.mensaje1 = 'Debes verificar que hayas elegido un valor valido para';
    modalSalida.componentInstance.mensaje2 = 'Pa??s , Provincia , Cant??n y Distrito';
    modalSalida.componentInstance.mensaje3 = '';
    modalSalida.componentInstance.mensaje4 = '';
  }else{
  if(this.tamanoDocOrden >= 3676333){
    modalSalida.componentInstance.mensaje1 = 'El documento de la orden patronal supera el tama??o establecido';
      modalSalida.componentInstance.mensaje2 = 'favor selecionar un archivo menor a 3MB';
      modalSalida.componentInstance.mensaje3 = 'Por favor selecciona un archivo ';
      modalSalida.componentInstance.mensaje4 = 'mas peque??o';
  }else{
    if(this.tamanoDocCedula >= 3676333){
      modalSalida.componentInstance.mensaje1 = 'El documento de la c??dula supera el tama??o establecido';
        modalSalida.componentInstance.mensaje2 = 'favor selecionar un archivo menor a 3MB';
        modalSalida.componentInstance.mensaje3 = 'Por favor selecciona un archivo ';
        modalSalida.componentInstance.mensaje4 = 'mas peque??o';
    }else{
      if(this.DeseaMensajeria == 'Desea recibir un mensajero' && this.DireccionDeEnvioValidator == ''){
        modalSalida.componentInstance.mensaje1 = 'Debe agregar una direcci??n de envi?? de la mensajer??a';
        modalSalida.componentInstance.mensaje2 = '';
        modalSalida.componentInstance.mensaje3 = '';
        modalSalida.componentInstance.mensaje4 = '';
      }
    }
  }
}   
}




}