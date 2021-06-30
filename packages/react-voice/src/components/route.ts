
import ResponseComponent, { ComponentProps } from "../reconciler/responseComponent";
import ResponseRoot from "./ResponseRoot";
import { router } from "./router";

type RouteProps = ComponentProps<{
  path: string;
}>;

export class route extends ResponseComponent<RouteProps> {
  handledPath?: string;

  constructor(root: ResponseRoot, props: RouteProps) {
    super(root, props);
  }

  render() {
    const parentRouter = this.firstParentOf<router>(router.name);
    const parentRoute = this.firstParentOf<route>(route.name);

    const pathFilter = [parentRoute?.handledPath, this.props.path].join("/").replace("//", "/");

    console.info({ pathFilter, currentPath: parentRouter?.currentPath });

    if (parentRouter?.currentPath.startsWith(pathFilter)) {
      this.handledPath = pathFilter;
      this.renderChildren();
    }

    return {};
  }
}