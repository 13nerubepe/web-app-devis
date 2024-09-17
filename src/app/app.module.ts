import {
  CommonModule, LocationStrategy,
  NgFor,
  NgIf,
  PathLocationStrategy,
  registerLocaleData
} from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localeFr from '@angular/common/locales/fr';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { DataTablesModule } from 'angular-datatables';
import { NgApexchartsModule } from 'ng-apexcharts';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { Approutes } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddUserComponent } from './component/add-user/add-user.component';
import { BlogCardsComponent } from './component/blog-cards/blog-cards.component';
import { CommandeComponent } from './component/commande/commande.component';
import { FeedsComponent } from './component/feeds/feeds.component';
import { ListUserComponent } from './component/list-user/list-user.component';
import { SalesRatioComponent } from './component/sales-ratio/sales-ratio.component';
import { TopCardsComponent } from './component/top-cards/top-cards.component';
import { TopSellingComponent } from './component/top-selling/top-selling.component';
import { UploadImageComponent } from './component/upload-image/upload-image.component';
import { FullComponent } from './layouts/full/full.component';
import { ApprovisionnementsComponent } from './pages/approvisionnements/approvisionnements.component';
import { AuditsComponent } from './pages/audits/audits.component';
import { BilanFinancesComponent } from './pages/bilan-finances/bilan-finances.component';
import { BilanVenteComponent } from './pages/bilan-ventes/bilan-ventes.component';
import { CaissesComponent } from './pages/caisses/caisses.component';
import { CategorieComponent } from './pages/categorie/categorie.component';
import { ClientComponent } from './pages/client/client.component';
import { CommandesComponent } from './pages/commandes/commandes.component';
import { ConfigurationComponent } from './pages/configuration/configuration.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DepensesComponent } from './pages/depenses/depenses.component';
import { DestokagesComponent } from './pages/destockages/destockages.component';
import { InventaireComponent } from './pages/inventaire/inventaire.component';
import { LoginComponent } from './pages/login/login.component';
import { PointVentesComponent } from './pages/point-ventes/point-ventes.component';
import { PresencesComponent } from './pages/presences/presences.component';
import { ProduitsComponent } from './pages/produits/produits.component';
import { ProformasComponent } from './pages/proformas/proformas.component';
import { RubriquesComponent } from './pages/rubriques/rubriques.component';
import { UserComponent } from './pages/user/user.component';
import { VentesComponent } from './pages/ventes/ventes.component';
import { NavigationComponent } from './shared/header/navigation.component';
import { ListPointVenteComponent } from './shared/list-point-vente/list-point-vente.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { SpinnerComponent } from './shared/spinner.component';
import { CSiteFooterComponent } from './component/c-site-footer/c-site-footer.component';
import { CSiteTopMenuComponent } from './component/c-site-top-menu/c-site-top-menu.component';
import { CSiteSliderComponent } from './component/c-site-slider/c-site-slider.component';
import { HomeComponent } from './site-pages/home/home.component';
import { SiteBaseTemplateComponent } from './site-pages/site-base-template/site-base-template.component';
import { SigninComponent } from './site-pages/signin/signin.component';
import { SignupComponent } from './site-pages/signup/signup.component';
import { TableComponent } from "./component/table/table.component";
import { FooterDevisComponent } from "./component/footer-devis/footer-devis.component";
import { HeaderDevisComponent } from "./component/header-devis/header-devis.component";
import { TableModule } from "primeng/table";
import { ScrollPanelModule } from "primeng/scrollpanel";
import { Button } from "primeng/button";
import { DialogModule } from "primeng/dialog";
import { DropdownModule } from "primeng/dropdown";

// the second parameter 'fr' is optional
registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    BlogCardsComponent,
    SalesRatioComponent,
    FeedsComponent,
    TopCardsComponent,
    TopSellingComponent,
    ConfigurationComponent,
    UserComponent,
    LoginComponent,
    DashboardComponent,
    ApprovisionnementsComponent,
    AuditsComponent,
    BilanFinancesComponent,
    BilanVenteComponent,
    CaissesComponent,
    CommandesComponent,
    DepensesComponent,
    DestokagesComponent,
    InventaireComponent,
    PointVentesComponent,
    PresencesComponent,
    ProformasComponent,
    RubriquesComponent,
    VentesComponent,
    ProduitsComponent,
    CategorieComponent,
    UploadImageComponent,
    CommandeComponent,
    ListUserComponent,
    AddUserComponent,
    ClientComponent
  ],
  imports: [
    CommonModule,
    NgIf,
    NgFor,
    DataTablesModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgSelectModule,
    InfiniteScrollModule,
    NgApexchartsModule,
    NgbModule,
    RouterModule.forRoot(Approutes, { useHash: false }),
    FullComponent,
    NavigationComponent,
    SidebarComponent,
    ListPointVenteComponent,
    CSiteTopMenuComponent,
    CSiteSliderComponent,
    CSiteFooterComponent,
    SiteBaseTemplateComponent,
    HomeComponent,
    SigninComponent,
    SignupComponent,
    TableComponent,
    FooterDevisComponent,
    HeaderDevisComponent,
    TableModule,
    ScrollPanelModule,
    Button,
    DialogModule,
    DropdownModule
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    },
    { provide: LOCALE_ID, useValue: "fr" }
  ],
  exports: [
    SpinnerComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
