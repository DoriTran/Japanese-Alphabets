import * as SolidIcons from "@fortawesome/free-solid-svg-icons";
import * as RegularIcons from "@fortawesome/free-regular-svg-icons";
import { IconData } from "@/data/icon";

export default function iconByString(iconData: IconData): any {
  const { type, name } = iconData; // Destructure iconData to get prefix and iconName
  if (type === "solid") return SolidIcons[name as keyof typeof SolidIcons];
  return RegularIcons[name as keyof typeof RegularIcons];
}
