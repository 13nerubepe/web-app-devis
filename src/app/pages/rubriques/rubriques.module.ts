import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgApexchartsModule } from 'ng-apexcharts';
import { RubriquesComponent } from './rubriques.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Dashboard',
      urls: [{ title: 'Dashboard', url: '/dashboard' }, { title: 'Dashboard' }],
    },
    component: RubriquesComponent,
  },
];

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes),
    NgApexchartsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [],
})
export class RubriquesModule {}
