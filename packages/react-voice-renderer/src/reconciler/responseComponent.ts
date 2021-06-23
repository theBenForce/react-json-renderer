import ResponseRoot from "../components/ResponseRoot";
import { Platforms } from "../types/platforms";
import { inspect } from "util";

type Child = ResponseComponent | string;
type Children = Array<Child> | Child;

export interface BasicComponentProps {
  children?: Children;
}

export type ComponentProps<T> = T & BasicComponentProps;

export default class ResponseComponent<Props extends BasicComponentProps = BasicComponentProps> {
  children: Array<Child>;
  parent?: ResponseComponent;
  context: any = {};
  state: any = {};
  refs: Array<any> = [];

  constructor(public root: ResponseRoot, public props: Props) {
    if (props.children && !Array.isArray(props.children)) {
      this.children = [props.children];
    } else {
      this.children = (props.children ?? []) as Array<Child>;
    }
  }

  appendChild<T extends ResponseComponent>(child: T) {
    if (!this.children) {
      this.children = [];
    }

    this.children.push(child);
  }

  removeChild<T extends ResponseComponent>(child: T) {
    const idx = this.children.indexOf(child);
    this.children.slice(idx, 1);
  }

  render(platform: Platforms, result: Record<string, any>): Record<string, any> {
    return {};
  }
}

export function isJsonComponent(value: any): value is ResponseComponent {
  return value instanceof ResponseComponent;
}