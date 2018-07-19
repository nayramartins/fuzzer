import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

@Injectable()
export class NotificationService {

  constructor(private snackBar: MatSnackBar) { }

  public success(message: string, action?: string, config?: MatSnackBarConfig): void {
    this.openSnackbar(message, action, {
      ...config,
      panelClass: ['success'],
    });
  }

  public error(message: string, action?: string, config?: MatSnackBarConfig): string {
    const error = 'Something went wrong';
    this.openSnackbar(error, action, {
      ...config,
      panelClass: ['error'],
    });
    return error;
  }

  public warning(message: string, action?: string, config?: MatSnackBarConfig): void {
    this.openSnackbar(message, action, {
      ...config,
      panelClass: ['warning'],
    });
  }

  openSnackbar(message: string, action?: string, config?: MatSnackBarConfig) {
    this.snackBar.open(message, action, {
      duration: 5000,
      direction: 'ltr',
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      ...config,
    });
  }
}
