import { Component, OnInit } from '@angular/core';
import { User } from '@app/shared/models/user.interface';
import { AuthCrudService } from '@app/shared/services/authCrud.service';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-anality-precios',
  templateUrl: './anality-precios.component.html',
  styleUrls: ['./anality-precios.component.scss']
})

export class AnalityPreciosComponent implements OnInit {

  user$: Observable<User[]>;
  public doughnutChartLabels: Label[] = [];
  public doughnutChartData: MultiDataSet = [
 
  ];
  public doughnutChartType: ChartType = 'doughnut';

  public precioTotalPedidos: number = 0;
  

  constructor(private firestoreSvc: AuthCrudService) {


this.user$ = this.firestoreSvc.getUsers();



 
   }

  ngOnInit(): void {

    this.getAllClient();
    
}

getAllClient(){

  this.user$.subscribe(user => {
    for (let index = 0; index < user.length; index++) {

      this.precioTotalPedidos = 0;

      this.doughnutChartLabels[index] = user[index].name;
     
    

      const path = `clientes/${user[index].id}/pedidos`

      this.firestoreSvc.getPedidos(path).subscribe(pedido => {

        

      if(pedido.length){

        for (let index1 = 0; index1 < pedido.length; index1++) {
          
          
        

      this.precioTotalPedidos = this.precioTotalPedidos + pedido[index1].precioTotal;

      this.doughnutChartData[index] = [this.precioTotalPedidos/2];
        }
      
     
   
        
     
    
  }

        
      });
  
    
 
        
        
    
    
    }

  });

  this.doughnutChartData = [];
  this.doughnutChartLabels = [];

    
}



  }

  // events
 