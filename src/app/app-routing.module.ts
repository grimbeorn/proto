import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProtosComponent } from './pages/protos/protos.component';
import { ProtoComponent } from './pages/proto/proto.component';

const routes: Routes = [
  { path: 'protos', component: ProtosComponent },
  { path: 'proto/:id', component: ProtoComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'protos' }
];

@NgModule({
  imports: [
    RouterModule.forRoot( routes )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
