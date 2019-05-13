
import { FormGroup, AbstractControl } from '@angular/forms';

// Generic validator for Reactive forms
// Implemented as a class, not a service, so it can retain state for multiple forms.
export class GenericValidator {

    constructor(private validationMessages: { [key: string]: { [key: string]: string } }) {

    }

    processMessages(container: FormGroup): { [key: string]: string } {
        // console.log("container", container);
        const messages = {};
        for (const controlKey in container.controls) {
            // console.log("controlKey", controlKey);
            if (container.controls.hasOwnProperty(controlKey)) {
                const c: AbstractControl = container.controls[controlKey];
                // console.log("c:abstact", c);
                // If it is a FormGroup, process its child controls.
                if (c instanceof FormGroup) {
                    const childMessages = this.processMessages(c);
                    Object.assign(messages, childMessages);
                } else {
                    // console.log("this.validationMessages", this.validationMessages);
                    // Only validate if there are validation messages for the control
                    if (this.validationMessages[controlKey]) {
                        messages[controlKey] = '';
                        if ((c.dirty || c.touched) && c.errors) {
                            Object.keys(c.errors).map(messageKey => {
                                // console.log("messageKey", messageKey);
                                // console.log("messageKey", controlKey);
                                // console.log("this.validationMessages", this.validationMessages[controlKey][messageKey]);
                                if (this.validationMessages[controlKey][messageKey]) {
                                    messages[controlKey] += this.validationMessages[controlKey][messageKey] + ' ';
                                    // console.log("heree", messages[controlKey]);
                                }
                            });
                        }
                    }
                }
            }
        }
        // console.log("messages", messages);
        return messages;
    }
}