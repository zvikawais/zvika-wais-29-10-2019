import { Injectable, ErrorHandler } from '@angular/core';
import { NotificationService } from '../notifications/notification.service';

/** Application-wide error handler that adds a UI notification to the error handling
 * provided by the default Angular ErrorHandler.
 */
@Injectable()
export class AppErrorHandler extends ErrorHandler {
    constructor(private notificationsService: NotificationService) {
        super();
    }

    handleError(error: Error) {
        let displayMessage = 'An error occurred.';
        displayMessage += ' Error message: ' + error.message;
        this.notificationsService.error(displayMessage);
        super.handleError(error);
    }
}
