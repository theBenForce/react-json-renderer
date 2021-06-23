declare namespace JSX {
  interface IntrinsicElements {
    speak: { children: Array<string> | string; replace?: boolean; };
    ask: { children: Array<any> | any; };
    tell: { children: Array<any> | any; };
  }
}