import {Component, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-support-form',
  templateUrl: './support-form.component.html',
  styleUrls: ['./support-form.component.css']
})
export class SupportFormComponent implements OnInit {
  @ViewChild('LiveAgendForm', {static: false}) elementLiveAgendForm: Element;

  constructor() { }

  ngOnInit() {
    liveAgentForm(document,
      'https://fairmieten-fairwohnen.ladesk.com/scripts/track.js',
      function(e){ LiveAgent.createForm('55e412c1', e); });
  }

}
