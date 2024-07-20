import { Component } from '@angular/core';
import * as ExifReader from 'exifreader';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-detection-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './detection-page.component.html',
  styleUrls: ['./detection-page.component.scss']
})
export class DetectionPageComponent {
  suggestedLocation: string | null = null;
  latitude: string = '';
  longitude: string = '';

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        try {
          const tags = ExifReader.load(e.target.result);
          if (tags['GPSLatitude'] && tags['GPSLongitude'] && tags['GPSLatitude'].description && tags['GPSLongitude'].description) {
            const lat = this.convertDMSToDD(tags['GPSLatitude'].description as unknown as number[], tags['GPSLatitudeRef']?.description as string);
            const lon = this.convertDMSToDD(tags['GPSLongitude'].description as unknown as number[], tags['GPSLongitudeRef']?.description as string);
            this.suggestedLocation = `${lat}, ${lon}`;
          } else {
            alert('No se encontraron coordenadas GPS en la imagen.');
          }
        } catch (error) {
          console.error('Error al leer los metadatos EXIF', error);
        }
      };
      reader.readAsArrayBuffer(file);
    }
  }

  convertDMSToDD(dmsArray: number[], hem: string): number {
    const degrees = dmsArray[0];
    const minutes = dmsArray[1];
    const seconds = dmsArray[2];
    let dd = degrees + minutes / 60 + seconds / 3600;
    if (hem === 'S' || hem === 'W') {
      dd = dd * -1;
    }
    return dd;
  }

  acceptSuggestion(): void {
    if (this.suggestedLocation) {
      const [lat, lon] = this.suggestedLocation.split(', ');
      this.latitude = lat;
      this.longitude = lon;
      this.suggestedLocation = null;
    }
  }

  rejectSuggestion(): void {
    this.suggestedLocation = null;
  }
}
