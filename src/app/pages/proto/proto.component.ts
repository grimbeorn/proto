import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

import { ProtoModel } from '../../models/proto.model';
import { ProtosService } from '../../services/protos.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-proto',
  templateUrl: './proto.component.html'
})
export class ProtoComponent implements OnInit {

  proto: ProtoModel = new ProtoModel();

  constructor( private protosService: ProtosService, private route: ActivatedRoute ) { }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');

    if ( id !== 'nuevo' ) {
      this.protosService.getProto( id )
        .subscribe( (resp: ProtoModel) => {
          this.proto = resp;
          this.proto.id = id;
        });
    }
  }

  guardar( form: NgForm ) {
    if ( form.invalid ) {
      console.log('invalid form');
      return;
    }

    Swal.fire({
      title: 'wait',
      text: 'saving',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    let peticion: Observable<any>;

    if ( this.proto.id ) {
      peticion = this.protosService.actualizarProto( this.proto );
    } else {
      peticion = this.protosService.crearProto( this.proto );
    }

    peticion.subscribe( resp => {
      Swal.fire({
        title: this.proto.nombre,
        text: 'updated successfully',
        icon: 'success'
      });
    });

  }

}

