import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AppDataStoreService } from './app-data-store.service';

@Injectable({
  providedIn: 'root',
})
export class DataRestService {
  // API_BASE_URL = "http://localhost:9000/api";
  API_BASE_URL = 'https://api.gestplus.legrandsoft.com/api';

  id?: number | null = null;
  sModelName = 'BaseModel';
  relations = '';
  userSubject: BehaviorSubject<null> | any;
  constructor(
    private router: Router,
    private appDataStoreService: AppDataStoreService
  ) { }

  async login(
    username: string,
    password: string,
    sModelName: any,
    strict = true
  ) {
    const httpResponse = await fetch(
      `${this.API_BASE_URL}/${sModelName}/?username=${username}&password=${password}`,
      {
        headers: {
          Authorization: 'Bearer ' + this.getAuthToken(),
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.error) throw data;
        this.setOneLocalData(data, 'user');
        return data;
      })
      .catch((error) => {
        console.warn('Erreur de collecte de données : ', error);
        if (strict) throw error;
        return this.getOneLocalData(sModelName);
      });
    return httpResponse;
  }

  logout() {
    // remove user from local storage and set current user to null
    this.removeLocalData('user');
    this.appDataStoreService.changeIsLogin(false);
    this.appDataStoreService.user.next(0);
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  getAll = async (relations = '', strict = true, sModelName: any) => {
    const _relations = relations == '' ? this.relations : relations;
    const httpResponse = await fetch(
      `${this.API_BASE_URL}/${sModelName}/?relations=${_relations}`,
      {
        headers: {
          Authorization: 'Bearer ' + this.getAuthToken(),
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.error) throw data;
        this.setAllLocalData(data, sModelName);
        return data;
      })
      .catch((error) => {
        console.warn('Erreur de collecte de données : ', error);
        if (strict) throw error;
        return this.getOneLocalData(sModelName);
      });
    return httpResponse;
  };
  getAllOrLocal(relations = '', sModelName: any) {
    return this.getAll(relations, false, sModelName);
  }
  getBy = async (id = '', relations = '', strict = true, sModelName: any) => {
    const _relations = relations == '' ? this.relations : relations;
    const httpResponse = await fetch(
      `${this.API_BASE_URL}/${sModelName}/?relations=${_relations}&id=${id}`,
      {
        headers: {
          Authorization: 'Bearer ' + this.getAuthToken(),
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.error) throw data;
        return data;
      })
      .catch((error) => {
        console.warn('Erreur de collecte de données : ', error);
        if (strict) throw error;
      });
    return httpResponse;
  };
  getOne = async (
    id: number,
    relations = '',
    strict = true,
    sModelName: any
  ) => {
    const _relations = relations == '' ? this.relations : relations;
    const httpResponse = await fetch(
      `${this.API_BASE_URL}/${sModelName}/${id}?relations=${_relations}`,
      {
        headers: {
          Authorization: 'Bearer ' + this.getAuthToken(),
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.error) throw data;
        this.setOneLocalData(data, sModelName);
        return data;
      })
      .catch((error) => {
        console.warn('Erreur de collecte de données : ', error);
        if (strict) throw error;
        return this.getOneLocalData(sModelName);
      });
    return httpResponse;
  };
  getOneOrLocal(id: number, relations = '', sModelName: any) {
    return this.getOne(id, relations, false, sModelName);
  }
  save = async (sModelName: any, data: any) => {
    delete this.id;
    const httpResponse = await fetch(`${this.API_BASE_URL}/${sModelName}/`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + this.getAuthToken(),
      },
    });
    return httpResponse.json();
  };
  update = async (data: any = null, relations = '', sModelName: any) => {

    const httpResponse = await fetch(
      `${this.API_BASE_URL}/${sModelName}/${data.id}?relations=${relations}`,
      {
        method: 'PUT',
        body: JSON.stringify(data === null ? this : data),
        headers: {
          'Content-type': 'application/json',
          Authorization: 'Bearer ' + this.getAuthToken(),
        },
      }
    );
    return httpResponse.json();
  };
  delete = async (id: number, sModelName: any) => {
    const httpResponse = await fetch(
      `${this.API_BASE_URL}/${sModelName}/${id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer ' + this.getAuthToken(),
        },
      }
    );
    return httpResponse.json();
  };
  deleteScSt = async (id: number, sModelName: any, apprenant_id: any) => {
    const httpResponse = await fetch(
      `${this.API_BASE_URL}/${sModelName}/${id}?apprenant_id=${apprenant_id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer ' + this.getAuthToken(),
        },
      }
    );
    return httpResponse.json();
  };
  find = async (
    params: any,
    relations = '',
    strict = true,
    sModelName: any
  ) => {
    const _relations = relations == '' ? this.relations : relations;
    const httpResponse = await fetch(
      `${this.API_BASE_URL}/${sModelName}/find?relations=${_relations}`,
      {
        method: 'PATCH',
        body: JSON.stringify(params),
        headers: {
          'Content-type': 'application/json',
          Authorization: 'Bearer ' + this.getAuthToken(),
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.error) throw data;
        this.setFindLocalData(data, sModelName);
        return data;
      })
      .catch((error) => {
        console.warn('Erreur de collecte de données : ', error);
        if (strict) throw error;
        return this.getFindLocalData(sModelName);
      });
    return httpResponse;
  };
  findOrLocal(params: any, relations = '', sModelName: any) {
    return this.find(params, relations, false, sModelName);
  }

  async uploadFile(file: any, prefix: string) {
    const fd = new FormData();
    fd.append('prefix', prefix);
    fd.append('file', file);
    const httpResponse = await fetch(`${this.API_BASE_URL}/upload`, {
      method: 'POST',
      body: fd,
      headers: {
        Authorization: 'Bearer ' + this.getAuthToken(),
      },
    });
    return httpResponse.json();
  }

  /**
   * Gestion de l'authentification
   */
  getAuthToken = () => {
    return 'GESTPLUS_API_TOKEN';
  };

  /**
   * Gestion du offline
   */
  getOneLocalData(sModelName: any) {
    try {
      const strLocalData = localStorage.getItem(sModelName);
      return strLocalData ? JSON.parse(`${strLocalData}`) : null;
    } catch (err) {
      return null;
    }
  }
  setOneLocalData(data: any, sModelName: any) {
    localStorage.setItem(sModelName, JSON.stringify(data));
  }
  getAllLocalData(sModelName: any) {
    try {
      const strLocalData = localStorage.getItem(`${sModelName}s`);
      return strLocalData ? JSON.stringify(strLocalData) : [];
    } catch (err) {
      return [];
    }
  }
  setAllLocalData(data: any, sModelName: any) {
    localStorage.setItem(`${sModelName}s`, JSON.stringify(data));
  }
  removeLocalData(sModelName: any) {
    localStorage.removeItem(`${sModelName}`);
  }
  getFindLocalData(sModelName: any) {
    try {
      const strLocalData = localStorage.getItem(`${sModelName}s-found`);
      return strLocalData ? JSON.stringify(strLocalData) : [];
    } catch (err) {
      return [];
    }
  }
  setFindLocalData(data: any, sModelName: any) {
    localStorage.setItem(`${sModelName}s-found`, JSON.stringify(data));
  }

  getStatistiques = async (
    pvId: number,
    date: number,
    strict = true,
    sModelName = 'statistiques'
  ) => {
    const httpResponse = await fetch(
      `${this.API_BASE_URL}/${sModelName}/?pv_id=${pvId}&date=${date}`,
      {
        headers: {
          Authorization: 'Bearer ' + this.getAuthToken(),
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.error) throw data;
        this.setAllLocalData(data, sModelName);
        return data;
      })
      .catch((error) => {
        console.warn('Erreur de collecte de données : ', error);
        if (strict) throw error;
        return this.getOneLocalData(sModelName);
      });
    return httpResponse;
  };
}
