export interface StringToStringMap {
  [key: string]: string;
}

export interface Message {
  message: string;
  description: string;
}

export interface Translations {
  [key: string]: Message;
}
