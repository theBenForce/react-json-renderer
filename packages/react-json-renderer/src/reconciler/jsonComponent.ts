

export default class JsonComponent {
  children: Array<JsonComponent>;

  constructor() {
    this.children = [];
  }

  appendChild<T extends JsonComponent>(child: T) {
    this.children.push(child);
  }

  removeChild<T extends JsonComponent>(child: T) {
    const idx = this.children.indexOf(child);
    this.children.slice(idx, 1);
  }

  render() {}
}