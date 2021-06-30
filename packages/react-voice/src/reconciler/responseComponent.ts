import ResponseRoot from "../components/ResponseRoot";
import React, { ReactInstance, ReactNode } from "react";
import { Platforms } from "../types/platforms";
import { VoiceRequest } from "../parser";

type Child = ResponseComponent | string;
type Children = Array<Child> | Child;

export interface BasicComponentProps {
  children?: Children;
}

export type ComponentProps<T> = T & BasicComponentProps;

export default abstract class ResponseComponent<Props extends BasicComponentProps = BasicComponentProps> extends React.Component {
  children: Array<Child>;
  parent?: ResponseComponent;
  state: any = {};
  platform?: Platforms;
  request?: VoiceRequest;

  constructor(public root: ResponseRoot, public props: Props) {
    super(props);
    if (props.children && !Array.isArray(props.children)) {
      this.children = [props.children];
    } else {
      this.children = (props.children ?? []) as Array<Child>;
    }
  }

  firstParentOf<T extends ResponseComponent>(className: string): T | undefined {
    let p = this.parent;

    while (p && p.constructor.name !== className) {
      p = p.parent;
    }

    return p as T;
  }

  appendChild<T extends ResponseComponent>(child: T) {
    if (!this.children) {
      this.children = [];
    }

    this.children = [
      ...this.children,
      child
    ];
  }

  removeChild<T extends ResponseComponent>(child: T) {
    const idx = this.children.indexOf(child);
    this.children.slice(idx, 1);
  }

  protected renderChildren() {
    for (const child of this.children) {
      if (!(child instanceof ResponseComponent)) continue;

      child.render();
    }
  }

  render(): ReactInstance {
    this.renderChildren();

    return {};
  }
}

export function isJsonComponent(value: any): value is ResponseComponent {
  return value instanceof ResponseComponent;
}