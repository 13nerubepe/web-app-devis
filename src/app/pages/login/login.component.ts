import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppDataStoreService } from 'src/app/service/app-data-store.service';
import { DataRestService } from 'src/app/service/data-rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent {
  mpForm!: FormGroup;
  loading = false;
  submitted = false;
  saving = false;
  sModelName = 'user';
  password: any;
  username: any;
  type = 'connexion'
  passwordType = 'password';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private dataRestService: DataRestService,
    private appDataStoreService: AppDataStoreService
  ) { }

  ngOnInit() {
    this.appDataStoreService.user.subscribe((user) => {
      if (user && user.id) {
        this.router.navigate(['/caisses']);
      }
    });

    this.mpForm = new FormGroup({
      telephone: new FormControl('', Validators.required),
      nom: new FormControl('', Validators.required),
      ville: new FormControl('', Validators.required),
      adresse: new FormControl('', Validators.required),
      email: new FormControl(''),
      nomU: new FormControl('', Validators.required),
      prenom: new FormControl('', Validators.required),
      cni: new FormControl(''),
      adresseU: new FormControl(''),
      telephoneU: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      pays: new FormControl('', Validators.required),
      devise: new FormControl('', Validators.required),
      taxe: new FormControl(''),
      // admin: new FormControl('', Validators.required),
    });

    const user = this.dataRestService.getOneLocalData('user');
    const isLogin = this.appDataStoreService.isLogin;
    if (user && isLogin) {
      this.appDataStoreService.user.next(user);
    }
  }

  get f() { return this.mpForm.controls; }

  onSubmit() {
    event?.preventDefault();
    // Vérifications     
    if (!this.mpForm.valid) {
      Swal.fire('Renseigner tous les champs', '', 'warning').then();
      return;
    }

    this.saving = true;
    // Traitement
    this.dataRestService.save('create-pv', this.mpForm.value).then(response => {
      if (response.error) throw response;
      setTimeout(() => {
        // On réinitialise le formulaire
        Swal.fire('L\'enregistrement a été effectué avec succès.', '', 'success').then();
        this.redirection(response, 'register');
        this.saving = false;
      }, 2000);
    })
      .catch(error => {
        Swal.fire('L\'enregistrement a échoué. \n' + (error.message || ''), '', 'error').then();
        this.saving = false;
      });
  }

  changeViewPassword() {
    if (this.passwordType === 'password') {
      return this.passwordType = 'text';
    }
    return this.passwordType = 'password';
  }

  signUp() {
    if (!this.username || !this.password) {
      Swal.fire('Renseigner tous les champs', '', 'warning').then();
      return;
    }

    this.saving = true;

    this.dataRestService.save('login', { username: this.username, password: this.password }).then(response => {
      if (response.error) throw response;
      setTimeout(() => {
        this.redirection(response);

        this.saving = false;
      }, 2000);
    })
      .catch(error => {
        Swal.fire('L\'enregistrement a échoué. \n' + (error.message || ''), '', 'error').then();
        this.saving = false;
      });
  }

  redirection(response: any, type = 'login') {
    this.dataRestService.setOneLocalData(response, this.sModelName);
    this.appDataStoreService.changeIsLogin(true);
    this.appDataStoreService.user.next(response);
    Swal.fire('Connexion effectuée avec succès.', '', 'success').then();

    if (type === 'login') this.router.navigate(['/caisses']);
    else this.router.navigate(['/admin/categories']);
    // window.location.reload();
  }
}
