
const API_BASE_URL = "https://api2.afma.legrandsoft.com/api";

export class Model {
    id?: number | null = null;
    sModelName = "BaseModel";
    relations = "";
    constructor(object: any = null) { // Gardé pour implémentation générique. Mais typescript pose des contraintes
        // /*
        if (object) {
            for (const key in this) {
                if (Object.prototype.hasOwnProperty.call(object, key) && Object.prototype.hasOwnProperty.call(this, key)) {
                    if (typeof this[key] == typeof object[key]) this[key] = object[key];
                }
            }
        }
        // */
    }
    getAll = async (relations = "", strict = true) => {
        const _relations = (relations == "") ? this.relations : relations;
        const httpResponse = await fetch(`${API_BASE_URL}/${this.sModelName.toLowerCase()}/?relations=${_relations}`, {
            headers: {
                "Authorization": "Bearer " + this.getAuthToken()
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) throw data;
                this.setAllLocalData(data);
                return data;
            })
            .catch(error => {
                console.warn("Erreur de collecte de données : ", error);
                if (strict) throw error;
                return this.getOneLocalData();
            });
        return httpResponse;
    }
    getAllOrLocal(relations = "") {
        return this.getAll(relations, false);
    }
    getOne = async (id: number, relations = "", strict = true) => {
        const _relations = (relations == "") ? this.relations : relations;
        const httpResponse = await fetch(`${API_BASE_URL}/${this.sModelName.toLowerCase()}/${id}?relations=${_relations}`, {
            headers: {
                "Authorization": "Bearer " + this.getAuthToken()
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) throw data;
                this.setOneLocalData(data);
                return data;
            })
            .catch(error => {
                console.warn("Erreur de collecte de données : ", error);
                if (strict) throw error;
                return this.getOneLocalData();
            });
        return httpResponse;
    }
    getOneOrLocal(id: number, relations = "") {
        return this.getOne(id, relations, false);
    }
    save = async () => {
        delete this.id;
        const httpResponse = await fetch(`${API_BASE_URL}/${this.sModelName.toLowerCase()}/`, {
            method: "POST",
            body: JSON.stringify(this),
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + this.getAuthToken()
            }
        });
        return httpResponse.json();
    }
    update = async (data: any = null, relations = "") => {
        const httpResponse = await fetch(`${API_BASE_URL}/${this.sModelName.toLowerCase()}/${this.id}?relations=${relations}`, {
            method: "PUT",
            body: JSON.stringify(data == null ? this : data),
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + this.getAuthToken()
            }
        });
        return httpResponse.json();
    }
    delete = async (id: number) => {
        const httpResponse = await fetch(`${API_BASE_URL}/${this.sModelName.toLowerCase()}/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + this.getAuthToken()
            }
        });
        return httpResponse.json();
    }
    find = async (params: any, relations = "", strict = true) => {
        const _relations = (relations == "") ? this.relations : relations;
        const httpResponse = await fetch(`${API_BASE_URL}/${this.sModelName.toLowerCase()}/find?relations=${_relations}`, {
            method: "PATCH",
            body: JSON.stringify(params),
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + this.getAuthToken()
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) throw data;
                this.setFindLocalData(data);
                return data;
            })
            .catch(error => {
                console.warn("Erreur de collecte de données : ", error);
                if (strict) throw error;
                return this.getFindLocalData();
            });
        return httpResponse;
    }
    findOrLocal(params: any, relations = "") {
        return this.find(params, relations, false);
    }

    async uploadFile(file: any, prefix:string) {
        const fd = new FormData();
        fd.append("prefix", prefix);
        fd.append("file", file);
        const httpResponse = await fetch(`${API_BASE_URL}/upload`, {
            method: "POST",
            body: fd,
            headers: {
                "Authorization": "Bearer " + this.getAuthToken()
            }
        });
        return httpResponse.json();
    }


    /**
     * Gestion de l'authentification
     */
    getAuthToken = () => {
        return "AFMA_API_TOKEN";
    }


    /**
     * Gestion du offline
     */
    getOneLocalData() {
        try {
            const strLocalData = localStorage.getItem(this.sModelName.toLowerCase());
            return strLocalData ? JSON.stringify(strLocalData) : null;
        } catch (err) {
            return null;
        }
    }
    setOneLocalData(data: any) {
        localStorage.setItem(this.sModelName.toLowerCase(), JSON.stringify(data));
    }
    getAllLocalData() {
        try {
            const strLocalData = localStorage.getItem(`${this.sModelName.toLowerCase()}s`);
            return strLocalData ? JSON.stringify(strLocalData) : [];
        } catch (err) {
            return [];
        }
    }
    setAllLocalData(data: any) {
        localStorage.setItem(`${this.sModelName.toLowerCase()}s`, JSON.stringify(data));
    }
    getFindLocalData() {
        try {
            const strLocalData = localStorage.getItem(`${this.sModelName.toLowerCase()}s-found`);
            return strLocalData ? JSON.stringify(strLocalData) : [];
        } catch (err) {
            return [];
        }
    }
    setFindLocalData(data: any) {
        localStorage.setItem(`${this.sModelName.toLowerCase()}s-found`, JSON.stringify(data));
    }
}

export {
    API_BASE_URL,
};