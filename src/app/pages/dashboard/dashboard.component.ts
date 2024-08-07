import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataRestService } from 'src/app/service/data-rest.service';

import { Router } from '@angular/router';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexGrid,
  ApexLegend,
  ApexPlotOptions,
  ApexTheme,
  ApexTooltip,
  ApexXAxis,
  ApexYAxis,
  ChartComponent
} from 'ng-apexcharts';
import { AppDataStoreService } from 'src/app/service/app-data-store.service';

export type salesChartOptions = {
  series: ApexAxisChartSeries | any;
  chart: ApexChart | any;
  xaxis: ApexXAxis | any;
  yaxis: ApexYAxis | any;
  stroke: any;
  theme: ApexTheme | any;
  tooltip: ApexTooltip | any;
  dataLabels: ApexDataLabels | any;
  legend: ApexLegend | any;
  colors: string[] | any;
  markers: any;
  grid: ApexGrid | any;
  plotOptions: ApexPlotOptions | any;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  @ViewChild("chart") chart: ChartComponent = Object.create(null);
  public salesChartOptions: Partial<salesChartOptions> = {};

  [x: string]: any;
  isModalOpen: boolean = false;
  loading: boolean = true;
  saving: boolean = false;
  sModelName = 'dashboard';
  @ViewChild('ngModal', { static: false })
  ngModal!: ElementRef;
  mpForm!: FormGroup;
  topcards: any = [];
  anneeFormation: any = {};
  pv: any = {};

  constructor(
    private dataRestService: DataRestService,
    private modalService: NgbModal,
    private appDataStoreService: AppDataStoreService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.appDataStoreService.user.subscribe((user) => {

      if (!user) {
        this.router.navigate(["/login"]);
      }
    });

    this.pv = this.dataRestService.getOneLocalData("pv");
    this.loadData();
  }

  loadData() {
    // combineLatest(
    //   this.dataRestService.getStatistiques(this.pv.id, this.anneeFormation.id, false, 'apprenant/statistiques'),
    // ).pipe(
    //   map(([scheduledCourses, apprenants, prospects, statistique]: any[]) => {
    //     console.log(statistique);


    //     this.salesChartOptions = {
    //       series: [
    //         {
    //           name: "Apprenants Inscrits",
    //           data: statistique.students,
    //         },
    //         {
    //           name: "Classes",
    //           data: statistique.scheduledCourses,
    //         },
    //         {
    //           name: "Destokagess",
    //           data: statistique.prospect,
    //         },
    //       ],
    //       chart: {
    //         fontFamily: 'Rubik,sans-serif',
    //         height: 300,
    //         type: 'bar',
    //         toolbar: {
    //           show: true
    //         },
    //         stacked: false,
    //       },
    //       dataLabels: {
    //         enabled: false
    //       },
    //       legend: {
    //         show: true,
    //       },
    //       plotOptions: {
    //         bar: {
    //           columnWidth: '80%',
    //           barHeight: '70%',
    //           borderRadius: 3,
    //         },
    //       },
    //       colors: ["#0d6efd", "#009efb", "#6771dc"],
    //       stroke: {
    //         show: true,
    //         width: 4,
    //         colors: ["transparent"],
    //       },
    //       grid: {
    //         strokeDashArray: 3,
    //       },
    //       markers: {
    //         size: 3
    //       },
    //       xaxis: {
    //         categories: statistique.mois,
    //       },
    //       tooltip: {
    //         theme: 'dark'
    //       }
    //     };

    //     this.topcards = [
    //       {
    //         bgcolor: 'danger',
    //         icon: 'bi bi-book',
    //         title: scheduledCourses.filter((sc: any) => sc.session.pv.id === this.pv.id && sc.scheduleDate >= this.anneeFormation.dateDebut && sc.scheduleDate <= this.anneeFormation.dateFin).length,
    //         subtitle: 'CLASSES PROGRAMMEES',
    //       },
    //       {
    //         bgcolor: 'warning',
    //         icon: 'bi bi-cash',
    //         title: apprenants.filter((app: any) => app.pv.id === this.pv.id && app.anneeFormation.id === this.anneeFormation.id).length,
    //         subtitle: 'APPRENANTS INSCRITS',
    //       },
    //       {
    //         bgcolor: 'warning',
    //         icon: 'bi bi-cash',
    //         title: prospects.filter((prospect: any) => prospect.pv.id === this.pv.id && prospect.dateCreation >= this.anneeFormation.dateDebut && prospect.dateCreation <= this.anneeFormation.dateFin).length,
    //         subtitle: 'PROSPECTS ENREGISTRES',
    //       },
    //     ];
    //     this.loading = false;
    //   },
    //     (err: any) => {
    //       const message = "Une erreur s'est produite. \n" + (err.message || "");
    //       Swal.fire(message, "", "error").then();
    //     })).subscribe(() => { }, (err) => { });
  }

  showModal(show = true, data: any | null = null) {

    this.openModal();
    this.isModalOpen = show;
  }

  openModal() {
    const modalRef = this.modalService.open(this.ngModal);
  }

  closeModal() {
    this.mpForm.reset();
    const modalRef = this.modalService.dismissAll();
  }

}
