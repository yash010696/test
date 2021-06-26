import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class LoaderService {
    status: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    show(value: boolean) {
        this.status.next(value);
    }
}