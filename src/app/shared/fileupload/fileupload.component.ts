import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import {
  FileSystemFileEntry,
  FileSystemEntryMetadata,
  UploadFile,
  UploadEvent
} from 'ngx-file-drop';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.scss']
})

export class FileuploadComponent implements OnInit {

  public files: UploadFile[] = [];
  public previewUrl: string;
  public fileSize: string;
  public fileName: string;
  public file: any;
  public hidden = true;
  public hiddenLoading = true;
  public textAlloweFormats: string;
  public resultUrl: string;

  // THIS IS A SERVICE
  private imageUploaderService: any;

  @Input() fileInput: any;
  @Input() fileURL: any;
  @Output() ResultUrl = new EventEmitter<any>();
  @Output() OnClear = new EventEmitter<any>();
  @Output() ResultMessage = new EventEmitter<any>();
  @Output() UploadInProcess = new EventEmitter<any>();

  @ViewChild ('tooltipClipboard') tooltipClipboard: NgbTooltip;

  constructor(
    private http: HttpClient
  ) {}

  async ngOnInit() {
    if (this.fileURL && this.fileURL !== '') {
      this.previewUrl = this.fileURL;
      this.resultUrl = this.fileURL;
      this.http.get(this.fileURL, { responseType: 'blob' }).subscribe(res => {
        this.fileSize = this.toKbNotation(res.size);
      });

      const url = this.fileURL.split('?');
      const nameFile = url[0].split('/');
      this.fileName = nameFile[nameFile.length - 1];
      this.hidden = false;
    }
  }

  public clear() {
    this.files.pop();
    this.fileName = '';
    this.previewUrl = '';
    this.fileSize = '';
    this.hidden = true;
    (<any>$('#upload')).val('').clone(true);
  }

  public uploadButton(event: any) {
    const file = event.target.files[0];
    if (
      event.target.files &&
      event.target.files[0] &&
      this.isFileAllowed(file.name)
    ) {
      this.emitMessageValidation(true, '');
      this.hiddenLoading = false;
      this.hidden = false;
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () => {
        this.previewUrl = reader.result as string;
      };
      this.fileName = new Date().getTime() + '_' + file.name; // check with aws
      const blob = file.slice(0, file.size, file.type);
      const newFile = new File([blob], this.fileName, { type: file.type });
      this.fileSize = this.toKbNotation(file.size);
      this.files.push(file);
      this.uploaderFile(this.fileInput, this.fileName, newFile);
      event.target.value = '';
    } else {
      this.emitMessageValidation(false, this.textAlloweFormats);
    }

    if (this.files.length === 0) {
      this.clear();
    }
  }

  public dropped(event: UploadEvent) {
    if (this.files.length !== 0) {
      this.clear();
    }
    if (event.files.length > 1) {
      this.emitMessageValidation(
        false,
        'You can not add one more image at a time.'
      );
    } else {
      if (this.verifierEnvoyerDocument(event.files[0])) {
        this.emitMessageValidation(true, '');
        this.hiddenLoading = false;
        this.hidden = false;
        this.files = event.files;
        for (const f of event.files) {
          if (f.fileEntry.isFile) {
            // check this method in future
            const fse = f.fileEntry as any;
            fse.getMetadata((metadata: FileSystemEntryMetadata) => {
              this.fileSize = this.toKbNotation(metadata.size);
            });

            const file = f.fileEntry as FileSystemFileEntry;
            this.fileName = new Date().getTime() + '_' + file.name; // check with aws
            file.file((ff: File) => {
              const reader = new FileReader();
              reader.readAsDataURL(ff);
              reader.onload = () => {
                this.previewUrl = reader.result as string;
              };
              const blob = ff.slice(0, ff.size, ff.type);
              const newFile = new File([blob], this.fileName, {
                type: ff.type
              });
              this.uploaderFile(this.fileInput, this.fileName, newFile);
            });
          }
        }
      } else {
        this.emitMessageValidation(false, this.textAlloweFormats);
      }
    }
  }

  private verifierEnvoyerDocument(droppedFile: UploadFile) {
    // Is it a file and is it allowed?
    if (
      droppedFile.fileEntry.isFile &&
      this.isFileAllowed(droppedFile.fileEntry.name)
    ) {
      return true;
    } else {
      return false;
    }
  }

  private isFileAllowed(fileName: string) {
    let isFileAllowed = false;
    let allowedFiles = [];
    if (this.fileInput !== undefined) {
      this.textAlloweFormats = `The allowed formats are ${
        this.fileInput.fileExtensions
      }`;
      allowedFiles = this.fileInput.fileExtensions.split(';');
      allowedFiles.forEach((x, i) => {
        allowedFiles[i] = x.replace('*', '').trim();
      });
    }
    const regex = /(?:\.([^.]+))?$/;
    const extension = regex.exec(fileName);

    if (undefined !== extension && null !== extension) {
      for (const ext of allowedFiles) {
        if (ext === extension[0]) {
          isFileAllowed = true;
        }
      }
    }
    return isFileAllowed;
  }

  private toKbNotation(value: number) {
    return Math.round((value / 1024) * 100) / 100 + ' Kb';
  }

  private emitUrl(value: any) {
    this.ResultUrl.emit(value);
  }

  private emitMessageValidation(isValid: any, text: string) {
    const value = { isValid: isValid, text: text };
    this.ResultMessage.emit(value);
  }

  public onClear() {
    this.clear();
    this.OnClear.emit();
  }

  private uploaderFile(
    fileInput: any,
    fileName: string,
    file: any
  ) {
    if (fileInput) {
      this.UploadInProcess.emit(true);
      const location = fileInput.pattern.split(';');
      const params = {
        id: fileInput.idFileRepository,
        type: fileInput.typeFileRepository,
        internalFolder: location[2],
        fileName: fileName,
        file: file
      };

      this.imageUploaderService.checkFiles(params).subscribe(result => {
        if (!result.exists) {
          this.imageUploaderService.uploader(params).subscribe(
            resUploader => {
              if (resUploader) {
                const paramsGetUrl = {
                  subFolder: location[2],
                  locationCode: location[1],
                  path: location[0],
                  action: 'getFileWebPath',
                  fileName: fileName
                };
                this.imageUploaderService
                  .getFileUrl(paramsGetUrl)
                  .subscribe(resultUrl => {
                    this.emitUrl(resultUrl);
                    this.hiddenLoading = true;
                    this.resultUrl = resultUrl.url;
                    this.UploadInProcess.emit(false);
                  });
              }
            },
            (error: any) => {
              this.clear();
              this.emitMessageValidation(
                false,
                'There was an error uploading the image. try again.'
              );
            }
          );
        } else {
          this.emitMessageValidation(false, 'Existing file.');
        }
      });
    }
  }

  public onTooltipShown() {
    setTimeout(() => {
      this.tooltipClipboard.close();
    }, 2000);
  }

}
