
import { Message} from "primeng/api";
import { Observable, Subject } from "rxjs";

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', // ou 'any' si vous utilisez des modules spécifiques
})
export class MessagService{

  // Sources des messages pour l'observation
  private messageSource = new Subject<Message | Message[]>();
  private clearSource  = new Subject<string>();

  // Observables permettant d'écouter les messages
  messageObserver: Observable<Message | Message[]> = this.messageSource.asObservable();
  clearObserver: Observable<string> = this.clearSource.asObservable();

  /**
   * Ajoute un message unique.
   * @param {Message} message - Message à ajouter.
   */
  add(message: Message): void {
    this.messageSource.next(message);
  }

  /**
   * Ajoute plusieurs messages.
   * @param {Message[]} messages - Liste des messages à ajouter.
   */
  addAll(messages: Message[]): void {
    this.messageSource.next(messages);
  }

  /**
   * Supprime le message correspondant à la clé spécifiée.
   * @param {string} [key] - Clé du message à supprimer.
   */
  clear(key?: string): void {
    this.clearSource.next(key || '');
  }

}
