import { Component, OnInit } from '@angular/core';
// import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
// import { first } from 'rxjs/operators';

// import { FormModal } from '../modals/form.modal';
// import { ViewModal } from '../modals/view.modal';
import { FormService } from '../services/form.service';
import { LoaderService } from '../services/loader.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  // formModal: BsModalRef;
  // viewModal: BsModalRef;
  data: any;

  constructor(
    // private bsModalService: BsModalService,
    private formService: FormService,
    private loaderService: LoaderService
  ) { }

  ngOnInit() {
    this.getTransactionData();
  }

  getTransactionData() {
    this.loaderService.show(true);
    this.formService.getTransactionData().subscribe((res: any) => {

      this.data = res.users;
      this.loaderService.show(false);
    }, error => {
      this.loaderService.show(false);
    })
  }

  // openViewModal(index) {
  //   this.viewModal = this.bsModalService.show(ViewModal, {
  //     initialState: {
  //       transactionData: this.transactionData[index]
  //     },
  //     class: 'modal-lg'
  //   });
  // }

  // showFormModal() {
  //   this.formModal = this.bsModalService.show(FormModal, {
  //     class: 'modal-lg'
  //   });
  //   this.bsModalService.onHide.pipe(first()).subscribe(() => {
  //     if ((this.formModal.content as FormModal).refreshList) {
  //       (this.formModal.content as FormModal).refreshList = false;
  //       this.getTransactionData();
  //     }
  //   });
  // }


}
