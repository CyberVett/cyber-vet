/// <reference types="next" />
/// <reference types="next/types/global" />

/// <reference types="next-images" />


declare module '*.svg' {
  import React = require('react');
  export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

declare module "*.png" {
  const value: any;
  export default value;
}

declare module '@khanacademy/react-multi-select';