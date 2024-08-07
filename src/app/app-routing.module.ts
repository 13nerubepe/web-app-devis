import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { HomeComponent } from './site-pages/home/home.component';

export const Approutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'caisses',
    loadChildren: () => import('./pages/caisses/caisses.module').then(m => m.CaissesModule)
  },
  {
    path: 'admin',
    component: FullComponent,
    children: [
      { path: '', redirectTo: '/categories', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'approvisionnements',
        loadChildren: () => import('./pages/approvisionnements/approvisionnements.module').then(m => m.ApprovisionnementsModule)
      },
      {
        path: 'personnels',
        loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule)
      },
      {
        path: 'clients',
        loadChildren: () => import('./pages/client/client.module').then(m => m.ClientModule)
      },
      {
        path: 'audits',
        loadChildren: () => import('./pages/audits/audits.module').then(m => m.AuditsModule)
      },
      {
        path: 'bilan-finances',
        loadChildren: () => import('./pages/bilan-finances/bilan-finances.module').then(m => m.BilanFinancesModule)
      },
      {
        path: 'bilan-ventes',
        loadChildren: () => import('./pages/bilan-ventes/bilan-ventes.module').then(m => m.BilanVenteModule)
      },
      {
        path: 'caisses',
        loadChildren: () => import('./pages/caisses/caisses.module').then(m => m.CaissesModule)
      },
      {
        path: 'commandes',
        loadChildren: () => import('./pages/commandes/commandes.module').then(m => m.CommandesModule)
      },
      {
        path: 'depenses',
        loadChildren: () => import('./pages/depenses/depenses.module').then(m => m.DepensesModule)
      },
      {
        path: 'destockages',
        loadChildren: () => import('./pages/destockages/destockages.module').then(m => m.DestokagesModule)
      },
      {
        path: 'inventaire',
        loadChildren: () => import('./pages/inventaire/inventaire.module').then(m => m.InventaireModule)
      },
      {
        path: 'presences',
        loadChildren: () => import('./pages/presences/presences.module').then(m => m.PresencesModule)
      },
      {
        path: 'produits',
        loadChildren: () => import('./pages/produits/produits.module').then(m => m.ProduitsModule)
      },
      {
        path: 'categories',
        loadChildren: () => import('./pages/categorie/categorie.module').then(m => m.CategorieModule)
      },
      {
        path: 'proformas',
        loadChildren: () => import('./pages/proformas/proformas.module').then(m => m.ProformasModule)
      },
      {
        path: 'rubriques',
        loadChildren: () => import('./pages/rubriques/rubriques.module').then(m => m.RubriquesModule)
      },
      {
        path: 'ventes',
        loadChildren: () => import('./pages/ventes/ventes.module').then(m => m.VentesModule)
      },
      {
        path: 'point-ventes',
        loadChildren: () => import('./pages/point-ventes/point-ventes.module').then(m => m.PointVentesModule)
      },
      {
        path: 'configuration',
        loadChildren: () => import('./pages/point-ventes/point-ventes.module').then(m => m.PointVentesModule)
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/starter'
  }
];
