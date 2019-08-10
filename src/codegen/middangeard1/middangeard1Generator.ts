import { Map } from "../../models/map";
import { Room } from "../../models/room";
import { Connector } from "../../models/connector";
import { Model } from "../../models/model";
import { Direction, ObjectKind } from "../../enums/enums";
import { CodeGenerator } from "../CodeGenerator";
import { Obj } from "../../models/obj";

export class Middangeard1Generator extends CodeGenerator {
  private rooms: Array<string> = new Array<string>();
  private unique: number = 0;

  constructor(map: Map) {
    super(map);
    Handlebars.registerHelper('className', (name: string) => { return this.className(name); });
    Handlebars.registerHelper('dirToStr', (dir: Direction) => { return this.capitalize(this.dirToStr(dir)); });
  }

  protected className(str: string) {
    let room = this.camelCase(this.removeSpecialChars(this.removeAccents(str)));

    /* TODO: If room id already exists, append unique numerical identifier.
      "className" is also called when building the direction tree, so the code below
      won't work as-is.
    */
    // if (this.rooms.indexOf(room) !== -1) {
    //   this.unique++;
    //   return new Handlebars.SafeString(room + this.unique);
    // } else {
      this.rooms.push(room);
      return new Handlebars.SafeString(room);
    // }
  }

  public generate(): string {
    return Handlebars.templates.middangeard1({ map: this.map });
  }
}