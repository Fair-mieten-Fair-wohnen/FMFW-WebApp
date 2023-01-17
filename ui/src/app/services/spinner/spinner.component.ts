import {Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {SpinnerService} from "./spinner.service";

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit, OnDestroy {
  private element: any;

  constructor(private spinnerService: SpinnerService, private el: ElementRef) {
    this.element = el.nativeElement;
  }

  ngOnInit(): void {
    // move element to bottom of page (just before </body>) so it can be displayed above everything else
    document.body.appendChild(this.element);

    // add self (this modal instance) to the modal service so it's accessible from controllers
    this.spinnerService.set(this);
  }

  // remove self from modal service when directive is destroyed
  ngOnDestroy(): void {
    this.spinnerService.remove();
    this.element.remove();
  }

  // open modal
  open(): void {
    this.element.style.display = 'block';
    document.body.classList.add('jw-modal-open');
  }

  // close modal
  close(): void {
    this.element.style.display = 'none';
    document.body.classList.remove('jw-modal-open');
  }
}
