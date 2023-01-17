import { Injectable } from '@angular/core';
import {Config} from "../../../assets/config";


@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  constructor() { }

  /**
   * logs message to browser console
   * @param msg - what happened?
   * @param operation - (optional) what was called when it happened?
   * @param caller - (optional) class, service, component that was calling when it happened
   */
  public log(msg: string, operation?: string, caller?: string) {
    const logStr = (caller ? caller : '') + (operation ? (caller ? '.' : '') + operation + ':' : '') + msg;
    console.log(logStr);
  }

  /**
   * debug message to browser console (no output in production mode)
   * @param msg - what happened?
   * @param debugLevel - (optional, default: 5) defines how important this debug statement is;
   * the lower the number the more important the debug message is
   * -> debugLevel can be set in configuration file src/assets/config.json
   * @param operation - (optional) what was called when it happened?
   * @param caller - (optional) class, service, component that was calling when it happened
   */
  public debug(msg: string, debugLevel?: number, operation?: string, caller?: string) {
    if (!debugLevel) debugLevel = 5;
    const debugLevelThreshhold = Config['DEBUG_LEVEL_THRESHHOLD'] ? Config['DEBUG_LEVEL_THRESHHOLD'] : 5;
    if (debugLevel >= debugLevelThreshhold) {
      const logStr = (caller ? caller : '') + (operation ? (caller ? '.' : '') + operation + ':' : '') + msg;
      console.debug(logStr);
    }
  }

  /**
   * error message to browser console
   * @param msg - what happened?
   * @param operation - (optional) what was called when it happened?
   * @param caller - (optional) class, service, component that was calling when it happened
   */
  public error(msg: string, operation?: string, caller?: string) {
    const logStr = (caller ? caller : '') + (operation ? (caller ? '.' : '') + operation + ':' : '') + msg;
    console.error(logStr);
  }

  /**
   * warning to browser console
   * @param msg - what happened?
   * @param operation - (optional) what was called when it happened?
   * @param caller - (optional) class, service, component that was calling when it happened
   */
  public warn(msg: string, operation?: string, caller?: string) {
    const logStr = (caller ? caller : '') + (operation ? (caller ? '.' : '') + operation + ':' : '') + msg;
    console.warn(logStr);
  }
}
