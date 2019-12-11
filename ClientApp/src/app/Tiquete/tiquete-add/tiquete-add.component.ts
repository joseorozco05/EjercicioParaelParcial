import { Component, OnInit } from '@angular/core';
import { Tiquete } from '../models/tiquete';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TiqueteService } from '../Service/tiquete.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertModalComponent } from '../../@base/modals/alert-modal/alert-modal.component';

@Component({
  selector: 'app-tiquete-add',
  templateUrl: './tiquete-add.component.html',
  styleUrls: ['./tiquete-add.component.css']
})
export class TiqueteAddComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private servicoRuta: TiqueteService,
    private modalService: NgbModal)
    { }
tiqueteAdd: Tiquete;
formTiqueteAdd: FormGroup;
submitted = false;

  ngOnInit() {
    this.tiqueteAdd = new Tiquete();

        this.formTiqueteAdd = this.formBuilder.group({
            Id: [this.tiqueteAdd.Id, Validators.required],
            RutaId: [this.tiqueteAdd.RutaId, Validators.required],
            Pasajero: [this.tiqueteAdd.Pasajero, Validators.required],
            Cantidad: [this.tiqueteAdd.Cantidad, Validators.required]
        });
  }
   
  get f() { return this.formTiqueteAdd.controls; }

  onSubmit() {
    alert(JSON.stringify(this.formTiqueteAdd.value));
    this.submitted = true;
    
    // stop here if form is invalid
    if (this.formTiqueteAdd.invalid) {
        return;
    }
    this.create();
}

create() {
  this.tiqueteAdd = this.formTiqueteAdd.value;

  this.servicoRuta.post(this.tiqueteAdd).subscribe(r => {
      if (r != null) {
          const messageBox = this.modalService.open(AlertModalComponent)
          messageBox.componentInstance.title = 'Resultado Operación';
          messageBox.componentInstance.message = 'La operacion se realizo Satisfactoriamente';
      }
  });
}


onReset() {
  this.submitted = false;
  this.formTiqueteAdd.reset();
}

}
