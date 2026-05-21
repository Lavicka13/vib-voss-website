import {
  IconDiamond,
  IconAffiliate,
  IconUserCheck,
  IconHeartHandshake,
  IconSchool,
  IconCircleCheck,
  IconHomeHeart,
  IconKey,
  IconClipboardCheck,
  IconBriefcase,
  IconHomeStar,
  IconArmchair,
  type IconProps,
} from "@tabler/icons-react";

const map = {
  diamond: IconDiamond,
  hub: IconAffiliate,
  person: IconUserCheck,
  handshake: IconHeartHandshake,
  school: IconSchool,
  verified: IconCircleCheck,
  home: IconHomeHeart,
  key: IconKey,
  clipboard: IconClipboardCheck,
  briefcase: IconBriefcase,
  staging: IconHomeStar,
  armchair: IconArmchair,
} as const;

export type IconName = keyof typeof map;

type Props = IconProps & { name: IconName };

export function Icon({ name, ...rest }: Props) {
  const C = map[name];
  return <C {...rest} />;
}
