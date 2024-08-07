import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataRestService } from 'src/app/service/data-rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent implements OnInit {
  @Input() image: any;
  @Input() prefix: any;
  @Output() continueAction: EventEmitter<any> = new EventEmitter();

  constructor(private dataRestService: DataRestService) { }
  ngOnInit(): void {

  }

  handleUploadImage(event: any) {
    const file = event.target.files[0];

    this.dataRestService
      .uploadFile(file, this.prefix)
      .then((response) => {
        if (response.error) throw response;
        const imageUrl = response.url
        this.image = imageUrl
        this.continueAction.emit(imageUrl);
      })
      .catch((error) => {
        Swal.fire(
          'Le téléchargement du fichier vers le serveur à échoué. \n' +
          (error.message || '', '', 'error')
        ).then();
      });
  }

}
