declare module '*.scss' {
    interface IClassNames {
        [className: string]: string;
    }
    const classNames: IClassNames;
    export = classNames;
}

declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";

declare module "*.svg" {
    import React from "react";
    const SWG: React.VFC<React.SVGProps<SVGSVGElement>>;
    export default SWG;
}

declare const __IS_DEV__: boolean;
