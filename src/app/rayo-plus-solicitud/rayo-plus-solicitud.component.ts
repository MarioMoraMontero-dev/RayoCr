import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rayo-plus-solicitud',
  templateUrl: './rayo-plus-solicitud.component.html',
  styleUrls: ['./rayo-plus-solicitud.component.css']
})
export class RayoPlusSolicitudComponent implements OnInit {

  constructor() { }
 public valorSeleccionado!:number;
 public valorSolicitar!: number;
 public descuento!: number;
 public diaSeleccionado!: number;
 public numCuota!: string| undefined;
 public interes: number | undefined;
 public subtotal: number | undefined;
 public tecnologia: number | undefined;
 public aval: number | undefined;
 public iva: number | undefined;
 public totalPagar: number | undefined;
 public fecha1: string | undefined;
 public fecha2: string | undefined;
 public fecha3: string | undefined;
 public Abono1: number | undefined;
 public Abono2: number | undefined;
 public Abono3: number | undefined;
 public cc1 : HTMLElement | undefined;
 public cc2 : HTMLElement | undefined;
 public cc3 : HTMLElement | undefined;
 public Abono2Texto: String | undefined;
 public Abono1Texto: String | undefined;
 public cantidadPrestamosRPL!:number;
  ngOnInit(): void {

    this.numCuota = '2 cuotas';
    this.diaSeleccionado = 30;
    this.cantidadPrestamosRPL = 1;

    this.cc1 = document.getElementById('fecha1')!;
    this.cc2 = document.getElementById('fecha2')!;
    this.cc3 = document.getElementById('fecha3')!;
  }

  obtenervalor(valor:number){
  this.valorSeleccionado = valor;
  
  this.calcularMontos();
  }

  calcularMontos()
	{
    console.log(this.diaSeleccionado);
		this.interes = this.getInteres(this.valorSeleccionado,this.diaSeleccionado);
		this.tecnologia = this.getTecnologia(this.valorSeleccionado,this.diaSeleccionado);
    this.descuento = this.getDescuento(this.valorSeleccionado,this.diaSeleccionado,1);
    this.aval = this.getAval(this.valorSeleccionado,this.cantidadPrestamosRPL);
    this.iva = this.getIva(this.tecnologia,this.aval,this.descuento);

    this.subtotal = this.getSubTotal(this.valorSeleccionado,this.interes,this.tecnologia);
    
    this.totalPagar = (this.subtotal+this.aval+this.iva)- this.descuento;
    this.calculafechas(this.diaSeleccionado,this.totalPagar);
    this.ocultarFechas(this.diaSeleccionado);
    //
  }

  getTecnologia(montoSolicitado:number,plazo:any)
            {
              var tecno = 0;
              if(montoSolicitado == 30000 || montoSolicitado ==  35000){
                tecno = (plazo * 700);
                
              }else{
                if(montoSolicitado >= 40000 || montoSolicitado <= 55000){
                  tecno = (plazo * 900);
                  
                }else{
                  if(montoSolicitado >= 60000 || montoSolicitado <= 150000){
                    tecno = (plazo * 1100);
                    
                  }
                  }

                }
                return tecno;
              }
              
  getSubTotal(valorseleccionado: number, interes: number,tecnologia: number){
    return valorseleccionado+ interes + tecnologia;
  }      

	getAval(cantidadsolicitada: number, cantidadPrestamos: number)
	{
    var pAval = 0;
    if(cantidadPrestamos <= 1){
      pAval	 = Math.round(cantidadsolicitada*0.10);
    }else{
      pAval	 = Math.round(cantidadsolicitada*0.12);
    }
  
		return pAval;
  }
  getIva(tecnologia: number, aval: number,descuento :number)
	{
		var pIva = Math.round(((tecnologia - descuento) + aval)*0.13);
		return pIva;
  }
  
  getInteres(valorSolicitar: number,diaSeleccionado: number){
    var interes = 0;
                if(diaSeleccionado == 15)
                {
                    
                    interes = ((((valorSolicitar*0.30)/12)/30)*diaSeleccionado);
                }
                if(diaSeleccionado == 30)
                {
                  interes = ((((valorSolicitar*0.30)/12)/30)*diaSeleccionado);
                }
                if(diaSeleccionado == 45)
                {
                  interes = ((((valorSolicitar*0.30)/12)/30)*diaSeleccionado);
                }
                return interes;
  }


  getDescuento(valorSolicitar: number,diaSeleccionado: number,cantidadPrestamosRayoPlus: number){
    var desc = 0;
      if(diaSeleccionado == 15){
        if(valorSolicitar == 30000){
          if(cantidadPrestamosRayoPlus >= 12){
            return 4800;
        }else{
           if(cantidadPrestamosRayoPlus >= 3){
              return 4200;
        }
        }
      }else{
        if(valorSolicitar ==35000){
          if(cantidadPrestamosRayoPlus >= 12){
            return 5100;
        }else{
           if(cantidadPrestamosRayoPlus >= 3){
              return 3700;
        }
             
        }
        }else{
          if(valorSolicitar == 40000){
            if(cantidadPrestamosRayoPlus >= 12){
              return 5800;
          }else{
             if(cantidadPrestamosRayoPlus >= 3){
                return 4200;
            }  
          }
          }else{
            if(valorSolicitar == 45000 ){
              if(cantidadPrestamosRayoPlus >= 12){
                return 3500;
            }else{
               if(cantidadPrestamosRayoPlus >= 3){
                  return 1700;
              }  
            }
            }else{
              if(valorSolicitar == 50000){
                if(cantidadPrestamosRayoPlus >= 12){
                  return 6500;
              }else{
                 if(cantidadPrestamosRayoPlus >= 3){
                    return 4500;
                }  
              }
              }else{
                if(valorSolicitar == 55000){
                  if(cantidadPrestamosRayoPlus >= 12){
                    return 4200;
                }else{
                   if(cantidadPrestamosRayoPlus >= 3){
                      return 2000;
                  }  
                }
                }else{
                  if(valorSolicitar == 60000){
                    if(cantidadPrestamosRayoPlus >= 12){
                      return 4900;
                  }else{
                     if(cantidadPrestamosRayoPlus >= 3){
                        return 2500;
                    }  
                  }
                  }else{
                    if(valorSolicitar == 80000){
                      if(cantidadPrestamosRayoPlus >= 12){
                        return 16087.5;
                    }else{
                       if(cantidadPrestamosRayoPlus >= 3){
                          return 12687.5;
                      }  
                    } 
                    }else{
                      if(valorSolicitar == 120000){
                        if(cantidadPrestamosRayoPlus >= 12){
                          return 14050;
                      }else{
                         if(cantidadPrestamosRayoPlus >= 3){
                            return 9250;
                        }  
                      }
                      }else{
                        if(valorSolicitar == 130000){
                          if(cantidadPrestamosRayoPlus >= 12){
                            return 14575;
                        }else{
                           if(cantidadPrestamosRayoPlus >= 3){
                            	return 9375;
                       	 }  
                        }
                        }else{
                          if(valorSolicitar == 140000){
                            if(cantidadPrestamosRayoPlus >= 12){
                              return 15100;
                          }else{
                             if(cantidadPrestamosRayoPlus >= 3){
                                return 9500;
                            }  
                          }
                          }else{
                            if(valorSolicitar == 150000){
                              if(cantidadPrestamosRayoPlus >= 12){
                                return 15625;
                            }else{
                               if(cantidadPrestamosRayoPlus >= 3){
                                  return 9625;
                              }  
                            }
                            }else{
                              if(valorSolicitar == 85000){
                                if(cantidadPrestamosRayoPlus >= 12){
                                  return 16087.5;
                              }else{
                                 if(cantidadPrestamosRayoPlus >= 3){
                                    return 12687.5;
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
    }else{
      if(diaSeleccionado == 30){
        if(valorSolicitar == 30000){
          if(cantidadPrestamosRayoPlus >= 12){
            return 9600;
        }else{
           if(cantidadPrestamosRayoPlus >= 3){
              return 8400;
          }  
        }
      }else{
        if(valorSolicitar ==35000){
          if(cantidadPrestamosRayoPlus >= 12){
            return 9150;
        }else{
           if(cantidadPrestamosRayoPlus >= 3){
              return 7750;
          }  
        }
        }else{
          if(valorSolicitar == 40000){
            if(cantidadPrestamosRayoPlus >= 12){
              return 9600;
          }else{
             if(cantidadPrestamosRayoPlus >= 3){
                return 8000;
            }  
          }
          }else{
            if(valorSolicitar == 45000 ){
              if(cantidadPrestamosRayoPlus >= 12){
                return 4050;
            }else{
               if(cantidadPrestamosRayoPlus >= 3){
                  return 2250;
              }  
            }
            }else{
              if(valorSolicitar == 50000){
                if(cantidadPrestamosRayoPlus >= 12){
                  return 10500;
              }else{
                 if(cantidadPrestamosRayoPlus >= 3){
                    return 8500;
                }  
              }
              }else{
                if(valorSolicitar == 55000){
                  if(cantidadPrestamosRayoPlus >= 12){
                    return 4950;
                }else{
                   if(cantidadPrestamosRayoPlus >= 3){
                      return 2750;
                  }  
                }
                }else{
                  if(valorSolicitar == 60000){
                    if(cantidadPrestamosRayoPlus >= 12){
                      return 5400;
                  }else{
                     if(cantidadPrestamosRayoPlus >= 3){
                        return 3000;
                    }  
                  }
                  }else{
                    if(valorSolicitar == 80000){
                      if(cantidadPrestamosRayoPlus >= 12){
                        return 15825;
                    }else{
                       if(cantidadPrestamosRayoPlus >= 3){
                          return 12625;
                      }  
                    } 
                    }else{
                      if(valorSolicitar == 120000){
                        if(cantidadPrestamosRayoPlus >= 12){
                          return 23300;
                      }else{
                         if(cantidadPrestamosRayoPlus >= 3){
                            return 18500;
                        }  
                      } 
                      }else{
                        if(valorSolicitar == 130000){
                          if(cantidadPrestamosRayoPlus >= 12){
                            return 23950;
                        }else{
                           if(cantidadPrestamosRayoPlus >= 3){
                            	return 18750;
                       	 }  
                        } 
                        }else{
                          if(valorSolicitar == 140000){
                            if(cantidadPrestamosRayoPlus >= 12){
                              return 24600;
                          }else{
                             if(cantidadPrestamosRayoPlus >= 3){
                                return 19000;
                            }  
                          }
                          }else{
                            if(valorSolicitar == 150000){
                              if(cantidadPrestamosRayoPlus >= 12){
                                return 25250;
                            }else{
                               if(cantidadPrestamosRayoPlus >= 3){
                                  return 19250;
                              }  
                            } 
                            }else{
                              if(valorSolicitar == 85000){
                                
                              if(cantidadPrestamosRayoPlus >= 12){
                                return 10275;
                            }else{
                              if(cantidadPrestamosRayoPlus >= 3){
                                  return 6875;
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
    }else{
      if(diaSeleccionado == 45){
        if(valorSolicitar == 30000){
          if(cantidadPrestamosRayoPlus >= 12){
            return 17700;
        }else{
           if(cantidadPrestamosRayoPlus >= 3){
              return 16500;
          }  
        }
      }else{
        if(valorSolicitar ==35000){
          if(cantidadPrestamosRayoPlus >= 12){
            return 12150;
        }else{
           if(cantidadPrestamosRayoPlus >= 3){
              return 10750;
          }  
        } 
        }else{
          if(valorSolicitar == 40000){
            if(cantidadPrestamosRayoPlus >= 12){
              return 20600;
          }else{
             if(cantidadPrestamosRayoPlus >= 3){
                return 19000;
            }  
          }
          }else{
            if(valorSolicitar == 45000 ){
              if(cantidadPrestamosRayoPlus >= 12){
                return 20050;
            }else{
               if(cantidadPrestamosRayoPlus >= 3){
                  return 18250;
              }  
            } 
            }else{
              if(valorSolicitar == 50000){
                if(cantidadPrestamosRayoPlus >= 12){
                  return 21000;
              }else{
                 if(cantidadPrestamosRayoPlus >= 3){
                    return 19000;
                }  
              } 
              }else{
                if(valorSolicitar == 55000){
                  if(cantidadPrestamosRayoPlus >= 12){
                    return 20450;
                }else{
                    if(cantidadPrestamosRayoPlus >= 12){
                   return 18250;
                }  
                } 
                }else{
                  if(valorSolicitar == 60000){
                    if(cantidadPrestamosRayoPlus >= 12){
                      return 28900;
                  }else{
                     if(cantidadPrestamosRayoPlus >= 3){
                        return 26500;
                    }  
                  }
                  }else{
                    if(valorSolicitar == 80000){
                      if(cantidadPrestamosRayoPlus >= 12){
                        return 44512.5;
                    }else{
                       if(cantidadPrestamosRayoPlus >= 3){
                          return 41312.5;
                      }  
                    } 
                    }else{
                      if(valorSolicitar == 120000){
                        if(cantidadPrestamosRayoPlus >= 12){
                          return 32550;
                      }else{
                         if(cantidadPrestamosRayoPlus >= 3){
                            return 27750;
                        }  
                      }
                      }else{
                        if(valorSolicitar == 130000){
                          if(cantidadPrestamosRayoPlus >= 12){
                            return 33325;
                        }else{
                           if(cantidadPrestamosRayoPlus >= 3){
                            	return 28125;
                       	 }  
                        }
                        }else{
                          if(valorSolicitar == 140000){
                            if(cantidadPrestamosRayoPlus >= 12){
                              return 34100;
                          }else{
                             if(cantidadPrestamosRayoPlus >= 3){
                                return 28500;
                            }  
                          }
                          }else{
                            if(valorSolicitar == 150000){
                              if(cantidadPrestamosRayoPlus >= 12){
                                return 34875;
                            }else{
                               if(cantidadPrestamosRayoPlus >= 3){
                                  return 28875;
                              }  
                            } 
                            }else{
                              if(valorSolicitar == 85000){
                                if(cantidadPrestamosRayoPlus >= 12){
                                  return 43962.5;
                              }else{
                                 if(cantidadPrestamosRayoPlus >= 3){
                                    return 40562.5;
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
         
return 0;
  }

  calculafechas(diaSeleccionado: number,total:number){
    let today: Date = new Date();
     if(diaSeleccionado == 15){
       this.numCuota = '1 cuota';
       this.fecha1 = this.firstDate(today);
       this.fecha2 = '';
       this.fecha3 = '';
       this.Abono1 = total;
       this.Abono1Texto = 'Abono Unico';
     }else{
      if(this.diaSeleccionado == 30){
        this.numCuota = '2 cuotas';
        this.fecha1 = this.firstDate(today);
        this.fecha2 = this.secondDate(today);
        this.fecha3 = '';
        this.Abono1 = total/2;
        this.Abono2 = total/2;
        this.Abono2Texto = 'Abono'
        this.Abono1Texto = 'Primer Abono';
     }else{
      if(this.diaSeleccionado == 45){
        this.numCuota = '3 cuotas';
        this.fecha1 = this.firstDate(today);
        this.fecha2 = this.secondDate(today);
        this.fecha3 = this.thirdDate(today);
        this.Abono1 = total/3;
        this.Abono2 = total/3;
        this.Abono3 = total/3;
        this.Abono1Texto = 'Primer Abono';
     }
     }
   }
   }

   firstDate(tdate : Date){
                  var day:number = tdate.getDate();
                  var month:number = tdate.getMonth() + 1;
                  var year:number = tdate.getFullYear();
                  var newDate;
                  if(day >= 1 && day <= 6){
                      newDate = "15" + "/" +month+ "/" +year;
                  }else if(day >= 7 && day <= 21){
                      if(month == 2){
                          newDate = "28" + "/" + 2 + "/" +year;
                      }else{
                          newDate = "30" + "/" + month + "/" +year;
                      }
                  }else if(day >= 22 && day <= 31){
                      month = month + 1;
                      if(month == 13){
                          month = 1;
                          year = year + 1;
                          newDate = "15" + "/" + month + "/" +year;
                      }else{
                          newDate = "15" + "/" +month + "/" +year;
                      }
                  }
                  return newDate;
              }
  
   secondDate(tdate:Date){
                  var day = tdate.getDate();
                  var month = tdate.getMonth() + 1;
                  var year = tdate.getFullYear();
                  var newDate2;
  
                  if(day >= 1 && day <= 6){
                      newDate2 = "30" + "/" +month+ "/" + year ;
                  }
                  else if(day >= 7 && day <= 21){
                      if(month == 2){
                          newDate2 = 15 + "/"+3+"/"+year;
                      }else{
                          month = month +1;
                          if(month == 13){
                              month = 1;
                              year = year + 1;
                              newDate2 = 15+"/"+month+"/"+year;
                          }else{
                              newDate2 = 15+"/"+month+"/"+year;
                          }
                      }
                  }else if(day >= 22 && day <= 31){
                      month = month + 1;
                      if(month == 13){
                          month = 1;
                          year = year + 1;
                          newDate2 = 30+"/"+month+"/"+year;
                      }else{
                          newDate2 = 30+"/"+month+"/"+year;
                      }
                  }
                  return newDate2;
              }
   thirdDate(tdate:Date){
                  var day = tdate.getDate();
                  var month = tdate.getMonth() + 1;
                  var year = tdate.getFullYear();
                  var newDate3;
                  if(day >= 1 && day <= 6){
                      month = month + 1;
                      if(month == 13){
                          month = 1;
                          year = year + 1;
                          newDate3 = "15"+"/"+month+"/"+year;
                      }else{
                          newDate3 = "15"+"/"+month+"/"+year;
                      }
                  }else if(day >= 7 && day <= 21){
                      if(month == 2){
                          newDate3 = 30+"/"+3+"/"+year;
                      }else{
                          month = month + 1;
                          if(month == 13){
                              month = 1;
                              year = year + 1;
                              newDate3 = 30+"/"+month+"/"+year;
                          }else if(month == 1){
                              newDate3 = 28+"/"+2+"/"+year;
                          }else{
                              newDate3 = 30+"/"+month+"/"+year;
                          }
                          newDate3 = 30+"/"+month+"/"+year;
                      }
                  }else if(day >= 22 && day <= 31){
                      month = month + 2;
                      if(month == 13){
                          month = 1;
                          year = year + 1;
                          newDate3 = 15+"/"+month+"/"+year;
                      }else{
                          newDate3 = 15+"/"+month+"/"+year;
                      }
                  }
                  return newDate3;
              }
  

              ocultarFechas(diaSeleccionado:number){
                if(diaSeleccionado == 15){
                  if(this.cc2 != undefined && this.cc3 != undefined){
                   this.cc2.setAttribute("style", "display:none!important;");
                   this.cc3.setAttribute("style", "display:none!important;");
                  }
                  
              
                }else{
                 if(this.diaSeleccionado == 30){
                   this.Abono2Texto = 'Abono final'
                   if(this.cc2 != undefined && this.cc3 != undefined){
                     this.cc2.setAttribute("style", "display;font-size:14px;");
                     this.cc3.setAttribute("style", "display:none!important;");
                    }
                   
                }else{
                 if(this.diaSeleccionado == 45){
              
                   this.Abono2Texto = "Segundo Abono";
                   if(this.cc2 != undefined && this.cc3 != undefined){
                     this.cc2.setAttribute("style", "display;font-size:14px;");
                     this.cc3.setAttribute("style", "display;font-size:14px;");
                    }
                 
                }
                }
              }
              }
}
