export class NameValuePair {
  public constructor(
    public name: string,
    public value: number
  ) {
  }
}

export type NameValuePairArray = Array<NameValuePair>;
