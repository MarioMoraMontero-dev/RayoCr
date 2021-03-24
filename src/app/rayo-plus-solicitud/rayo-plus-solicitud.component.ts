import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rayo-plus-solicitud',
  templateUrl: './rayo-plus-solicitud.component.html',
  styleUrls: ['./rayo-plus-solicitud.component.css']
})
export class RayoPlusSolicitudComponent implements OnInit {

  constructor() { }
 public valorSeleccionado!:String;
 public valorSolicitar!: number;
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
  ngOnInit(): void {
    this.numCuota = '2 cuotas';
  }

  obtenervalor(valor:string){
  this.valorSeleccionado = valor;
  }

  calcularMontos()
	{
    
    if(this.valorSolicitar == 55000){
      this.valorSolicitar = 75000;
    }else{
      if(this.valorSolicitar == 60000){
        this.valorSolicitar = 100000;
      }else{
        if(this.valorSolicitar == 45000){
          this.valorSolicitar = 50000;
        }
      }
    }

    console.log(this.diaSeleccionado);
		this.interes = this.getInteres(this.valorSolicitar,this.diaSeleccionado);
		
		this.tecnologia = this.getTecnologia(this.valorSolicitar,this.diaSeleccionado);
    this.iva = this.getIva(this.tecnologia);
    this.subtotal = this.valorSolicitar+this.interes+this.tecnologia;
    this.aval = this.getAval(this.subtotal);
    this.totalPagar = this.subtotal+this.aval+this.iva;
    this.calculafechas(this.diaSeleccionado,this.totalPagar);
    this.ocultarFechas(this.diaSeleccionado);
  }

  getTecnologia(montoSolicitado:number,plazo:any)
            {
              var tecno = 0;
                if(plazo == 15)
                {
                    switch (montoSolicitado) {
                        case 20000:
                          tecno =7500;
                            return 7500;
                        case 25000:
                            return 7500;
                        case 30000:
                          tecno =7500;
                            return 7500;
                        case 35000:
                          tecno =7500;
                            return 7500;
                        case 40000:
                          tecno =10500;
                            return 10500;
                        case 50000: 
                        tecno =10500;
                            return 10500;
                        case 75000:
                          tecno =13500;
                            return 13500;
                        case 100000:
                          tecno =19500;
                            return 19500;
                    }
                    
                }
                if(plazo == 30)
                {
                    switch (montoSolicitado)
                    {
                        case 20000:
                          tecno = 15000;
                            return 15000;
                        case 25000:
                          tecno = 15000;
                            return 15000;
                        case 30000:
                          tecno = 15000;
                            return 15000;
                        case 35000:
                          tecno = 15000;
                            return 15000;
                        case 40000:
                          tecno = 21000;
                            return 21000;
                        case 50000: 
                        tecno = 21000;
                            return 21000;
                        case 75000:
                          tecno = 27000;
                            return 27000;
                        case 100000:
                          tecno = 39000;
                            return 39000;
                    }
                }
                if(plazo == 45)
                {
                    switch (montoSolicitado)
                    {
                        case 20000:
                          tecno = 22500;
                            return 22500;
                        case 25000:
                          tecno = 22500;
                            return 22500;
                        case 30000:
                          tecno = 22500;
                            return 22500;
                        case 35000:
                          tecno = 22500;
                            return 22500;
                        case 40000:
                          tecno = 31500;
                            return 31500;
                        case 50000: 
                        tecno = 31500;
                            return 31500;
                        case 75000:
                          tecno = 40500;
                            return 40500;
                        case 100000:
                          tecno =58500;
                            return 58500;
                    }    
                }

                return tecno;
            }

	getAval(subTotal: number)
	{
		var pAval = Math.round(subTotal*0.06);
		return pAval;
  }
  getIva(tecnologia: number)
	{
		var pIva = Math.round(tecnologia*0.13);
		return pIva;
  }
  
  getInteres(valorSolicitar: number,diaSeleccionado: number){
    var interes = 0;
                if(diaSeleccionado == 15)
                {
                    switch (valorSolicitar) {
                        case 20000:
                          interes = 250;
                          return 250;
                        case 25000:
                          interes = 312.50;
                            return 312.50;
                        case 30000:
                          interes = 375;
                            return 375;
                        case 35000:
                          interes = 437.50;
                            return 437.50;
                        case 40000:
                          interes = 500;
                            return 500;
                        case 50000: 
                        interes = 625;
                            return 625;
                        case 75000:
                          interes = 937.50;
                            return 937.50;
                        case 100000:
                          interes = 1250;
                            return 1250;
                    }
                    
                }
                if(diaSeleccionado == 30)
                {
                    switch (valorSolicitar)
                    {
                        case 20000:
                          interes = 500;
                            return 500;
                        case 25000:
                          interes = 625;
                            return 625;
                        case 30000:
                          interes = 750;
                            return 750;
                        case 35000:
                          interes = 875;
                            return 875;
                        case 40000:
                          interes = 1000;
                            return 1000;
                        case 50000: 
                        interes = 1250;
                            return 1250;
                        case 75000:
                          interes = 1875;
                            return 1875;
                        case 100000:
                          interes = 2500;
                            return 2500;
                    }
                }
                if(diaSeleccionado == 45)
                {
                    switch (valorSolicitar)
                    {
                        case 20000:
                          interes = 750;
                            return 750;
                        case 25000:
                          interes = 937.50;
                            return 937.50;
                        case 30000:
                          interes = 1125;
                            return 1125;
                        case 35000:
                          interes =1312.50;
                            return 1312.50;
                        case 40000:
                          interes = 1500;
                            return 1500;
                        case 50000: 
                        interes = 1875;
                            return 1875;
                        case 75000:
                          interes = 2812.50
                            return 2812.50;
                        case 100000:
                          interes = 3750;
                            return 3750;
                    }    
                }
                return interes;
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
