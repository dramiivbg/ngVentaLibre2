import { Component, OnInit } from '@angular/core';
import { User } from '@app/shared/models/user.interface';
import { AuthCrudService } from '@app/shared/services/authCrud.service';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-anality-precios',
  templateUrl: './anality-precios.component.html',
  styleUrls: ['./anality-precios.component.scss']
})

export class AnalityPreciosComponent implements OnInit {

  user$: Observable<User[]>;
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  public precioTotalPedidos: number = 0;

  public barChartData: ChartDataSets[] = [
   
   {data: [], label: 'pedidos'}
  ];



  constructor(private firestoreSvc: AuthCrudService) {


this.user$ = this.firestoreSvc.getUsers();



 
   }

  ngOnInit(): void {

    this.getAllClient();
    
}

getAllClient(){

  this.user$.subscribe(user => {
    for (let index = 0; index < user.length; index++) {

      this.barChartLabels[index] = user[index].name;
     
    

      const path = `clientes/${user[index].id}/pedidos`

      this.firestoreSvc.getPedidos(path).subscribe(pedido => {

        

      if(pedido.length){

      this.precioTotalPedidos += pedido[index].precioTotal;

      
        this.barChartData[index] = { data: [this.precioTotalPedidos], label: 'precio total de pedidos'}
     
   
      
    
     
    
  }

        
      });
  
    
    
        
        
    
    
    }

  });

    
}


  }

  // events
 