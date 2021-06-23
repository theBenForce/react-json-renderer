import JsonComponent from "../reconciler/jsonComponent";


class JsonRoot extends JsonComponent {
  result: Map<string, any>;

  constructor() {
    super();
    this.result = new Map();
  }

  render(): Map<string, any> {
    for(const child of this.children) {
      child.render();
    }

    return this.result;
  }
}

export default JsonRoot;