import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProtoModel } from '../models/proto.model';
import { map, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProtosService {
  private url = 'https://zixcontrol-default-rtdb.firebaseio.com';
  constructor( private http: HttpClient ) { }
  crearProto( proto: ProtoModel ) {
    return this.http.post(`${ this.url }/protos.json`, proto)
      .pipe(
        map( (resp: any) => {
          proto.id = resp.name;
          return proto;
        })
      );
  }

  actualizarProto( proto: ProtoModel ) {
    const protoTemp = {
      ...proto
    };
    delete protoTemp.id;
    return this.http.put(`${ this.url }/protos/${ proto.id }.json`, protoTemp);
  }

  borrarProto( id: string ) {
    return this.http.delete(`${ this.url }/protos/${ id }.json`);
  }

  getProto( id: string ) {
    return this.http.get(`${ this.url }/protos/${ id }.json`);
  }

  getProtos() {
    return this.http.get(`${ this.url }/protos.json`).pipe(map( this.crearArreglo ),delay(0));
  }

  private crearArreglo( protosObj: object ) {
    const protos: ProtoModel[] = [];
    if (protosObj === null ) { return []; }
    Object.keys( protosObj ).forEach( key => {
      const proto: ProtoModel = protosObj[key];
      proto.id = key;
      protos.push( proto );
    });
    return protos;
  }

}

