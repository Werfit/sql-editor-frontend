import {
  RiAddLargeLine,
  RiContractRightLine,
  RiDownloadLine,
  RiExpandLeftLine,
  RiEyeLine,
  RiEyeOffLine,
  RiMoreLine,
  RiPlayLine,
  RiUser3Line,
} from "@remixicon/react";

const IconTypes = {
  USER: "user",
  PLAY: "play",
  DOWNLOAD: "download",
  COLLAPSE: "collapse",
  EXPAND: "expand",
  EYE: "eye",
  EYE_CLOSED: "eye-closed",
  ADD: "add",
  MORE: "more",
} as const;

type IconProps = {
  type: (typeof IconTypes)[keyof typeof IconTypes];
  className?: string;
};

const Icon: React.FC<IconProps> = ({ type, className }) => {
  switch (type) {
    case IconTypes.USER: {
      return <RiUser3Line className={className} />;
    }
    case IconTypes.PLAY: {
      return <RiPlayLine />;
    }
    case IconTypes.DOWNLOAD: {
      return <RiDownloadLine />;
    }
    case IconTypes.COLLAPSE: {
      return <RiContractRightLine />;
    }
    case IconTypes.EXPAND: {
      return <RiExpandLeftLine />;
    }
    case IconTypes.EYE: {
      return <RiEyeLine />;
    }
    case IconTypes.EYE_CLOSED: {
      return <RiEyeOffLine />;
    }
    case IconTypes.ADD: {
      return <RiAddLargeLine />;
    }
    case IconTypes.MORE: {
      return <RiMoreLine />;
    }
    default: {
      return null;
    }
  }
};

export { Icon };
