declare module '*.scss' {
    interface IClassNames {
        [className: string]: string;
    }
    const classNames: IClassNames;
    export = classNames;
}

declare module "*.svg" {
    import React from "react";
    const SWG: React.VFC<React.SVGProps<SVGSVGElement>>;
    export default SWG;
}

declare module "*.png";
declare module "*.jpg";
