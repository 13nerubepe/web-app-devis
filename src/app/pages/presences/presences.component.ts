import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { combineLatest, map } from 'rxjs';
import { DataRestService } from 'src/app/service/data-rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-timetable',
  templateUrl: './presences.component.html',
  styleUrls: ['./presences.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PresencesComponent {
  [x: string]: any;
  specialites: any[] = [];
  formateurs: any[] = [];
  salles: any[] = [];
  sallesTab1: any[] = [];
  sallesTab2: any[] = [];
  sallesTab3: any[] = [];
  sallesTab4: any[] = [];
  trancheHoraires: any[] = [];
  cours: any[] = [];
  jours: any[] = [];
  sessions: any[] = [];
  apprenants: any[] = [];
  filieres: any[] = [];
  typesJour: any[] = [];
  scheduledClasses: any = {};
  scheduledClasse: any = {};
  salle: any = {};
  isModalOpen: boolean = false;
  loading: boolean = true;
  saving: boolean = false;
  specialite: any = {};
  trancheH: any = {};
  session: any;
  formateur: any = { id: 1 };
  jour: any = {};
  partie: any;
  sModelName = 'scheduled-courses';
  @ViewChild('ngModal', { static: false })
  ngModal!: ElementRef;
  update: boolean = false;
  pv: any = {}
  public id: any;


  @ViewChild('htmlData') htmlData!: ElementRef;

  constructor(
    private dataRestService: DataRestService,
    private modalService: NgbModal,
    private route: ActivatedRoute
  ) {

  }
  scheduledCoursePart(typeJour: any, trancheHoraire: any, salle: any): string {
    const selector = typeJour.id + '-' + trancheHoraire.id + '-' + salle.id
    const scheduledCoursePart = this.scheduledClasses[selector]?.partie || 0;
    const coursePart = this.scheduledClasses[selector]?.cours.partie || 0;

    return scheduledCoursePart + "//" + coursePart;
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.pv = this.dataRestService.getOneLocalData('pv');
    this.loadData();
  }

  loadData() {
    combineLatest(
      this.dataRestService.getAll('trancheHoraire,cours,salle,typeJour,formateur,session', false, this.sModelName),
      this.dataRestService.getAll('pv', false, 'salle'),
      this.dataRestService.getOne(this.id, '', true, 'session'),
      this.dataRestService.getAll('', false, 'type-jour'),
      this.dataRestService.getAll('', false, 'cours'),
      this.dataRestService.getAll('', false, 'tranche-horaire'),
      this.dataRestService.getAll('', false, 'apprenant'),
      this.dataRestService.getAll('', false, 'formateur'),
      this.dataRestService.getAll('', false, 'filiere')
    ).pipe(map(([scheduledClasses, salles, session, typesJour, cours, trancheHoraires, apprenants, formateurs, filieres]: any[]) => {
      this.trancheHoraires = trancheHoraires;
      this.typesJour = typesJour
      this.cours = cours;
      this.formateurs = formateurs;
      this.salles = salles.filter((s: any) => s.pv.id === this.pv.id);

      this.classementSallesTableau();

      this.session = session;
      this.apprenants = apprenants;
      this.filieres = filieres;

      scheduledClasses.filter((sc: { session: { id: any; }; }) => sc.session.id === session.id).forEach((sc: {
        trancheHoraire: any;
        typeJour: any;
        salle: any;
      }) => {
        if (sc) {
          if (sc?.typeJour) {
            this.scheduledClasses[sc?.typeJour.id + '-' + sc?.trancheHoraire.id + '-' + sc?.salle.id] = sc;
          }
        }
      });

      this.loading = false;
    },
      (err: any) => {
        const message = "Une erreur s'est produite. \n" + (err.message || "");
        Swal.fire(message, "", "error").then();
      })).subscribe(() => { }, (err) => { });
  }

  classementSallesTableau() {
    if (this.salles.length >= 5) {
      const sallesTab1 = this.salles.slice(0, 5);
      this.sallesTab1 = this.repartitionSalle(sallesTab1, this.typesJour);
    } else {
      if (this.salles.length < 5) {
        const sallesTab1 = this.salles.slice(0, this.salles.length);
        this.sallesTab1 = this.repartitionSalle(sallesTab1, this.typesJour);
      }
    }

    if (this.salles.length >= 10) {
      const sallesTab2 = this.salles.slice(5, 10);
      this.sallesTab2 = this.repartitionSalle(sallesTab2, this.typesJour);
    } else {
      if (this.salles.length > 5 && this.salles.length < 10) {
        const sallesTab2 = this.salles.slice(5, this.salles.length);
        this.sallesTab2 = this.repartitionSalle(sallesTab2, this.typesJour);
      }
    }

    if (this.salles.length >= 15) {
      const sallesTab3 = this.salles.slice(10, 15);
      this.sallesTab3 = this.repartitionSalle(sallesTab3, this.typesJour);
    } else {
      if (this.salles.length > 10 && this.salles.length < 15) {
        const sallesTab3 = this.salles.slice(10, this.salles.length);
        this.sallesTab3 = this.repartitionSalle(sallesTab3, this.typesJour);
      }
    }

    if (this.salles.length >= 20) {
      const sallesTab4 = this.salles.slice(15, 20);
      this.sallesTab4 = this.repartitionSalle(sallesTab4, this.typesJour);
    } else {
      if (this.salles.length > 15 && this.salles.length < 20) {
        const sallesTab4 = this.salles.slice(15, this.salles.length);
        this.sallesTab4 = this.repartitionSalle(sallesTab4, this.typesJour);
      }
    }
  }

  repartitionSalle(sallesTab: any, typesJour: any) {
    const sallesTab1TypeJour1 = sallesTab.map((s: any) => { return { ...s, ...{ typeJour: typesJour[0] } }; });
    const sallesTab1TypeJour2 = sallesTab.map((s: any) => { return { ...s, ...{ typeJour: typesJour[1] } }; });
    return [...sallesTab1TypeJour1, ...sallesTab1TypeJour2];
  }

  getFeatures(nbr: number) {
    const start = (nbr - 1) * Math.floor(this.salles.length / 2);
    const end = nbr * Math.floor(this.salles.length / 2);
    return this.salles.slice(start, end);
  }

  async handleSave(event: any, f: NgForm) {
    event?.preventDefault();
    // Vérifications     
    if (!f.valid) {
      Swal.fire("Renseigner tous les champs", "", "warning").then();
      return;
    }

    this.saving = true;
    // Traitement
    let pTraitement: Promise<any>;

    const value = f.value
    if (this.scheduledClasse.id) { // Mode modif  
      pTraitement = this.dataRestService.update(this.scheduledClasse, "", this.sModelName);
    } else { // Mode enregistrement
      this.scheduledClasse = value;
      pTraitement = this.dataRestService.save(this.sModelName, this.scheduledClasse);
    }
    pTraitement.then(response => {

      if (response.error) throw response;
      setTimeout(() => {
        this.loadData();
        // On réinitialise le formulaire
        Swal.fire("L'enregistrement a été effectué avec succès.", "", "success").then();
        this.closeModal();
        this.saving = false;
      }, 2000);
    })
      .catch(error => {
        Swal.fire("L'enregistrement a échoué. \n" + (error.message || ""), "", "error").then();
        this.showModal(true, this.scheduledClasse);
        this.saving = false;
      });
  }

  showModal(show = true, data: any | null = null) {
    this.scheduledClasse = data;

    this.openModal();
    this.isModalOpen = show;
  }

  handleSupprime(data: any) {
    Swal.fire({
      title: 'Êtes vous sûr de vouloir vraiment supprimer?',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off',
        autocomplete: 'no'
      },
      reverseButtons: true,
      showCancelButton: true,
      confirmButtonText: 'Delete',
      confirmButtonColor: 'brown',
      showLoaderOnConfirm: true,
      inputPlaceholder: 'Ecrire: delete',
      preConfirm: (inputValue: any) => {
        if (!(inputValue && inputValue.toLowerCase() === 'delete')) {
          Swal.showValidationMessage(`Vous devez entrer&nbsp;<b>delete</b>&nbsp;pour confirmer!`);
          return false;
        }
        return this.dataRestService.delete(data.id || 0, this.sModelName)
          .then(response => {
            this.loadData();
            this.closeModal();
            Swal.fire("L'enregistrement a été effectué avec succès.", "", "success").then();
          })
          .catch(error => {
            Swal.fire("La suppression a échouée. \n" + (error.message || ""), "", "error").then();
          });
      },
    }).then();
  }

  openModal() {
    const modalRef = this.modalService.open(this.ngModal);
  }

  closeModal() {
    const modalRef = this.modalService.dismissAll();
  }

  onSubmit(f: NgForm) {
    let value = f.value
    this.scheduledClasse = { ...value, ...{ trancheHoraire: this.trancheH.id, jour: this.jour.id, session: this.session.id, formateur: this.formateur.id } };
    this.dataRestService.save(this.sModelName, this.scheduledClasse).then(res => { console.log(res); })
  }

  addScheduledCourse(jour: any, trancheHoraire: any, salle: any, sc = null) {
    this.update = false;
    if (sc) {
      this.update = !this.update;
      this.scheduledClasse = sc;
    }
    this.trancheH = trancheHoraire;
    this.jour = jour;
    this.salle = salle;
    this.openModal();
  }

  public openPDF(): void {
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 297;
      let fileHeight = ((canvas.height * fileWidth) / canvas.width) + 20;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('l', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('timetable-session.pdf');
    });
  }

  showPart(event: any) {
    this.partie = this.cours.find(c => c.id === parseInt(event.target.value, 10)).partie || 0;
  }
}
