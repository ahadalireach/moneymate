import {
  GearSixIcon,
  LockIcon,
  PowerIcon,
  UserIcon,
} from "phosphor-react-native";
import { colors } from "../constants/theme";
import { accountOptionType } from "../types";

export const accountOptions: accountOptionType[] = [
  {
    title: "Edit Profile",
    icon: <UserIcon size={26} color={colors.white} weight="fill" />,
    routeName: "/(modals)/ProfileModal",
    bgColor: "#6366f1",
  },
  {
    title: "Settings",
    icon: <GearSixIcon size={26} color={colors.white} weight="fill" />,
    bgColor: "#6366f1",
  },
  {
    title: "Privacy Policy",
    icon: <LockIcon size={26} color={colors.white} weight="fill" />,
    bgColor: colors.neutral600,
  },
  {
    title: "Logout",
    icon: <PowerIcon size={26} color={colors.white} />,
    bgColor: "#e11d48",
  },
];
