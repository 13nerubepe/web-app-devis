import { CommonModule } from "@angular/common";
import { Component, HostListener, OnInit } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { NgbCollapseModule } from "@ng-bootstrap/ng-bootstrap";
import { AppDataStoreService } from 'src/app/service/app-data-store.service';
import { DataRestService } from 'src/app/service/data-rest.service';
import { NavigationComponent } from "src/app/shared/header/navigation.component";
import { ListPointVenteComponent } from 'src/app/shared/list-point-vente/list-point-vente.component';
import { SidebarComponent } from "src/app/shared/sidebar/sidebar.component";

//declare var $: any;

@Component({
  selector: "app-full-layout",
  standalone: true,
  imports: [RouterModule, SidebarComponent, NavigationComponent, ListPointVenteComponent, CommonModule, NgbCollapseModule],
  templateUrl: "./full.component.html",
  styleUrls: ["./full.component.scss"],
})
export class FullComponent implements OnInit {
  isLogin: boolean | undefined;
  pointVentes: any[] = [];
  user: any = {};
  pv: any = {};

  constructor(public router: Router, private appDataStoreService: AppDataStoreService, private dataRestService: DataRestService) { }
  public isCollapsed = false;
  public innerWidth: number = 0;
  public defaultSidebar: string = "";
  public showMobileMenu = false;
  public expandLogo = false;
  public sidebartype = "full";

  Logo() {
    this.expandLogo = !this.expandLogo;
  }

  redirectTo() {
    this.router.navigate(['/login']);
    window.location.reload();
  }

  ngOnInit() {

    this.user = this.dataRestService.getOneLocalData('user');
    console.log(this.user);

    if (!(this.user && this.user.id)) {
      this.redirectTo();
    } else {
      this.loadData();
    }

    this.defaultSidebar = this.sidebartype;
    this.handleSidebar();
  }

  loadData() {
    this.dataRestService.getAll('pointVente,user', false, 'user-point-vente').then((userPointVentes: any[]) => {
      this.pointVentes = userPointVentes.filter((userPv: any) => userPv.user.id === this.user.id).map((userPv: any) => userPv.pointVente);
    },
      (err: any) => {
        const message = 'Une erreur s\'est produite. \n' + (err.message || '');
      })
  }

  @HostListener("window:resize", ["$event"])
  onResize() {
    this.handleSidebar();
  }

  handleSidebar() {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth < 1170) {
      this.sidebartype = "full";
    } else {
      this.sidebartype = this.defaultSidebar;
    }
  }

  toggleSidebarType() {
    switch (this.sidebartype) {
      case "full":
        this.sidebartype = "mini-sidebar";
        break;

      case "mini-sidebar":
        this.sidebartype = "full";
        break;

      default:
    }
  }
}
