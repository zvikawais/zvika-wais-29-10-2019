import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    constructor(
        private readonly snackBar: MatSnackBar,
        private readonly zone: NgZone
    ) { }

    default(message: string) {
        this.show(message, {
            panelClass: 'default-notification-overlay'
        });
    }

    info(message: string) {
        this.show(message, {
            panelClass: 'info-notification-overlay'
        });
    }

    success(message: string) {
        this.show(message, {
            panelClass: 'success-notification-overlay'
        });
    }

    warn(message: string) {
        this.show(message, {
            panelClass: 'warning-notification-overlay'
        });
    }

    error(message: string) {
        this.show(message, {
            panelClass: 'default-notification-overlay'
        });
    }

    private show(message: string, configuration: MatSnackBarConfig) {
        // Need to open snackBar from Angular zone to prevent issues with its position per
        this.zone.run(() => this.snackBar.open(message, 'dismiss', configuration));
    }
}
