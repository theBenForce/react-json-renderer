declare namespace JSX {
  interface IntrinsicElements {
    speak: { children: Array<string> | string; replace?: boolean; };
    ask: { children: Array<any> | any; };
    tell: { children: Array<any> | any; };
    router: { children: Array<any> | any; pathAttribute?: string; }
    route: { children: Array<any> | any; path: string; }
  }
}