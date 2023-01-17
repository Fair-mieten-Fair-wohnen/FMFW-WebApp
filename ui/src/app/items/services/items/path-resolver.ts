import {GeneralUtilsService} from "../utils/general-utils.service";

export class PathResolver {

  public resolveParam(path: string): string {
    if (path) {
      const paramPathArr = path.split('.');
      return this.resolveParamPath(paramPathArr);
    }
    return undefined;
  }

  public resolveParamPath(paramPath: string[]): string {
    return GeneralUtilsService.resolveParamPath(this, paramPath);
  }

}
