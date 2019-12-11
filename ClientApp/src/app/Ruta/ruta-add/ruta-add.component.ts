import { Component, OnInit } from '@angular/core';
import { RutaViewModel } from '../Models/ruta-add-request';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RutaService } from '../Service/ruta.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertModalComponent } from '../../@base/modals/alert-modal/alert-modal.component';

@Component({
  selector: 'app-ruta-add',
  templateUrl: './ruta-add.component.html',
  styleUrls: ['./ruta-add.component.css']
})
export class RutaAddComponent implements OnInit {

    constructor(
        private formBuilder: FormBuilder,
        private servicoRuta: RutaService,
        private modalService: NgbModal)
        { }
    rutaAddRequest: RutaViewModel;
    formRutaAdd: FormGroup;
    submitted = false;

    ngOnInit() {
        this.rutaAddRequest = new RutaViewModel();

        this.formRutaAdd = this.formBuilder.group({
            codigo: [this.rutaAddRequest.codigo, Validators.required],
            ciudadOrigen: [this.rutaAddRequest.ciudadOrigen, Validators.required],
            ciudadDestino: [this.rutaAddRequest.ciudadDestino, Validators.required],
            costo: [this.rutaAddRequest.costo, Validators.required]
        });
  }

    get f() { return this.formRutaAdd.controls; }

    onSubmit() {
        alert(JSON.stringify(this.formRutaAdd.value));
        this.submitted = true;
        
        // stop here if form is invalid
        if (this.formRutaAdd.invalid) {
            return;
        }
        this.create();
    }
    create() {
        this.rutaAddRequest = this.formRutaAdd.value;

        this.servicoRuta.post(this.rutaAddRequest).subscribe(r => {
            if (r != null) {
                const messageBox = this.modalService.open(AlertModalComponent)
                messageBox.componentInstance.title = 'Resultado Operación';
                messageBox.componentInstance.message = 'La operacion se realizo Satisfactoriamente';
            }
        });
    }

    onReset() {
        this.submitted = false;
        this.formRutaAdd.reset();
    }

}
