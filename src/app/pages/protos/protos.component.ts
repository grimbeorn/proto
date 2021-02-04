import { Component, OnInit } from '@angular/core';
import { ProtosService } from '../../services/protos.service';
import { ProtoModel } from '../../models/proto.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-protos',
  templateUrl: './protos.component.html'
})
export class ProtosComponent implements OnInit {

  protos: ProtoModel[] = [];
  cargando = false;


  constructor( private protosService: ProtosService ) { }

  ngOnInit() {

    this.cargando = true;
    this.protosService.getProtos()
      .subscribe( resp => {
        this.protos = resp;
        this.cargando = false;
      });

  }

  borrarProto( proto: ProtoModel, i: number ) {

    Swal.fire({
      title: '¿Está seguro?',
      text: `Está seguro que desea borrar a ${ proto.nombre }`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then( resp => {

      if ( resp.value ) {
        this.protos.splice(i, 1);
        this.protosService.borrarProto( proto.id ).subscribe();
      }

    });



  }


}

