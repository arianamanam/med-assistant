import { Injectable } from '@angular/core';

@Injectable()
export class UtilsService {
  convertFileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result as string); // Base64 string
      };

      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  }
  async previewImage(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => resolve(reader.result as string); // Base64 string
      reader.onerror = (error) => reject(error);

      reader.readAsDataURL(file);
    });
  }

  async convertBlobToBase64(blob: Blob): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();

      // On successful read
      reader.onloadend = () => resolve(reader.result as string);

      // Handle errors
      reader.onerror = (error) => reject(error);

      // Read the Blob as a Data URL (Base64 string)
      reader.readAsDataURL(blob);
    });
  }
}
