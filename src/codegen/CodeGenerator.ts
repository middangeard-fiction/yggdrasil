import { Map } from "../models/map";
import { Direction, ConnectorType } from "../enums/enums";

export class CodeGenerator {
  protected map: Map;

  constructor(map: Map) {
    this.map = map;
  }

  //
  // Override this in concrete generator implementations.
  //
  public generate() : string {
    return "";
  }

  //
  // Replace diacritics in a string with ordinary letters.
  // 
  protected removeAccents(str: string): string {
    if (typeof str !== "string") return str; 
    const accents = "ÀÁÂÃÄÅĄàáâãäåąßÒÓÔÕÕÖØÓòóôõöøóÈÉÊËĘèéêëęðÇĆçćÐÌÍÎÏìíîïÙÚÛÜùúûüÑŃñńŠŚšśŸÿýŽŻŹžżź";
    const accentsOut = "AAAAAAAaaaaaaaBOOOOOOOOoooooooEEEEEeeeeeeCCccDIIIIiiiiUUUUuuuuNNnnSSssYyyZZZzzz";
    return str
      .split("")
      .map((letter, index) => {
        const accentIndex = accents.indexOf(letter);
        return accentIndex !== -1 ? accentsOut[accentIndex] : letter;
      })
      .join("");
  }

  // 
  // Remove any special (non-word) characters from a string.
  // 
  protected removeSpecialChars(str: string): string {
    if (typeof str !== "string") return str; 
    return str.replace(/[^\w\s]/gi, '');
  }

  //
  // Convert a string to camelCase.
  // "Tree house door" => "treeHouseDoor"
  // 
  protected camelCase(str: string): string {
    if (typeof str !== "string") return str; 
    return str.replace(/^([A-Z])|[\s-_](\w)/g, function (match: string, reg1: string, reg2: string) { 
      if (typeof reg2 !== "undefined" && reg2) {
          return reg2.toUpperCase();
      } else {
          return reg1.toLowerCase();
      }
    });    
  }

  //
  // Capitalize a string:
  // "hello world" => "Hello world"
  // 
  protected capitalize(str: string): string {
    if (typeof str !== "string") return str; 
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  //
  // Convert a string to a class name:
  // "hello world" => "HelloWorld"
  // 
  protected className(str: string) {
    return new Handlebars.SafeString(this.capitalize(this.camelCase(this.removeSpecialChars(this.removeAccents(str)))));
  }  

  protected dirToStr(dir: Direction, type: ConnectorType): string {
    // Special connections:
    switch(type) {
      case ConnectorType.Down: return "down";
      case ConnectorType.Up:   return "up";
      case ConnectorType.In:   return "in";
      case ConnectorType.Out:  return "out";
    }
    // Compass connections:
    switch(dir) {
      case Direction.N:   return "north";
      case Direction.NNE: return "north";
      case Direction.NE:  return "northeast";
      case Direction.ENE: return "east";
      case Direction.E:   return "east";
      case Direction.ESE: return "east";
      case Direction.SE:  return "southeast";
      case Direction.SSE: return "south";
      case Direction.S:   return "south";
      case Direction.SSW: return "south";
      case Direction.SW:  return "southwest";
      case Direction.WSW: return "west";
      case Direction.W:   return "west";
      case Direction.WNW: return "west";
      case Direction.NW:  return "northwest";
      case Direction.NNW: return "north";
      default: return "";
    }
  }}
