
import { FormControl } from '@angular/forms';
import { Views } from '../model-service/payroll-interface';

function isDatasource(object: any): object is Views.Datasource {
    return 'valid' in object;
}
export function LogAccessor(target: Object, propertyKey: string,
    descriptor: PropertyDescriptor) {

console.log(`LogAccessor`, {
target, propertyKey, descriptor
});
}
export function Validator<T>(validator: Function) {
    return function (target: Object, propertyKey: string,
        descriptor: PropertyDescriptor) {

        // if (!isDatasource(target)) {
        //     throw new Error(`Property ${propertyKey} does not belong to a Datasource oject`);
        // }

        const originals = {
            get: descriptor.get,
            set: descriptor.set
        };    

        if (originals.get) {
            descriptor.get = function (): T {
                const ret: T = originals.get?.call(this);
                console.log(`AccessorSpy get ${String(propertyKey)}`, ret);
                return ret;
            };
        }

        if (originals.set) {
            descriptor.set = function (newval: T) {
                console.log(`AccessorSpy set ${String(propertyKey)}`, newval);
                const targetIsValid = validator(newval);
                // (target as Views.Datasource).valid = targetIsValid;
                originals.set?.call(this, newval);
            };
        }
    }
}



export function numberValidator(control: FormControl) {
  const value = control.value;
  if (!value) {
    return null;
  }
  return isNaN(value) ? { 'notNumber': true } : null;
}