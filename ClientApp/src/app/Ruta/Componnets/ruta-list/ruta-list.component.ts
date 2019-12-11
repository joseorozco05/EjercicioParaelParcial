import { Component, OnInit } from '@angular/core';
import { RutaService } from '../../Service/ruta.service';
import { RutaViewModel } from '../../Models/ruta-add-request';

@Component({
  selector: 'app-ruta-list',
  templateUrl: './ruta-list.component.html',
  styleUrls: ['./ruta-list.component.css']
})
export class RutaListComponent implements OnInit {
    rutas: RutaViewModel[];
    searchText: string;
  constructor(private rutaService:RutaService) { }

    ngOnInit() {
        this.rutaService.get().subscribe(result => {
            this.rutas = result;
            this.searchText = '';
        });

}
}
