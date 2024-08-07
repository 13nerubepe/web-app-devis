import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { NgApexchartsModule } from "ng-apexcharts";
import { ApprovisionnementsComponent } from "./approvisionnements.component";


const routes: Routes = [
  {
    path: "",
    data: {
      title: "Approvisionnement",
      urls: [{ title: "Approvisionnement", url: "/approvisionnement" }, { title: "Approvisionnement" }],
    },
    component: ApprovisionnementsComponent,
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
  declarations: [
  ],
})
export class ApprovisionnementsModule {}
