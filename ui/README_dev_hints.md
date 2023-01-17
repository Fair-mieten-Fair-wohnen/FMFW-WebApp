# ADW Documentation System

This project builds web tool to collect incidents of discrimination from allover several institutions 

In this ReadMe the use of several components is described

## Spinner

Package: src/app/services/spinner

Add the directive to the root view `app.component.html`

`<app-spinner></app-spinner>`
 
   Attention!!! Spinner directive is a singleton and isn't allowed to be added more than once

Inject SpinnerService in the constructor from where you need to activate the spinner and call

`this.spinner.open();`
`this.spinner.close();`

### Creation

if you want to create a spinner in another project call from directory `ui`:

`ng generate component services/spinner`
`ng generate service services/spinner/spinner`

and copy source of:
* `spinner.component.html`
* `spinner.component.ts`
* `spinner.service.ts`

Add the following styles to `styles.css` in root directory:

app-spinner {
  /* modals are hidden by default */
  display: none;
}

app-spinner .jw-modal {
  /* modal container fixed across whole screen */
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  /* z-index must be higher than .jw-modal-background */
  z-index: 1000;

  /* enables scrolling for tall modals */
  overflow: auto;
}

app-spinner .jw-modal .jw-modal-body {
  padding: 20px;
  height: 100%;
}

.jw-modal-background {
  /* modal background fixed across whole screen */
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  /* semi-transparent black  */
  background-color: #000;
  opacity: 0.75;

  /* z-index must be below .jw-modal and above everything else  */
  z-index: 900;
}

## Logging

### Use

For logging inject LoggingService and call

* loggingService.log(msg, operation, caller)
* loggingService.warn(msg, operation, caller)
* loggingService.error(msg, operation, caller)
* loggingService.debug(msg, debugLevel, operation, caller)

only msg parameter is required

log, warn and error are always output to console

debug is only output, if debugLevel <= debugLevelThreshold

debugLevel default = 5

### set logging level threshold

Edit parameter `DEBUG_LEVEL_THRESHHOLD` in `src/assets/config.json`

Default: 5

LoggingService.log(msg, logLevel, operation, caller)
