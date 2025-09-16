import { scale, verticalScale } from "../utils/styling";

export const colors = {
  primary: "#667eea",
  primaryLight: "#8b9cf7",
  primaryDark: "#4c63d2",

  background: "#ffffff",
  surface: "#f8fafc",
  card: "#ffffff",

  text: "#1e293b",
  textLight: "#64748b",
  textLighter: "#94a3b8",
  textSecondary: "#475569",

  white: "#ffffff",
  black: "#000000",

  success: "#10b981",
  successLight: "#34d399",
  error: "#ef4444",
  errorLight: "#f87171",
  warning: "#f59e0b",
  info: "#3b82f6",

  income: "#10b981",
  incomeLight: "#34d399",
  expense: "#ef4444",
  expenseLight: "#f87171",

  neutral50: "#f8fafc",
  neutral100: "#f1f5f9",
  neutral200: "#e2e8f0",
  neutral300: "#cbd5e1",
  neutral400: "#94a3b8",
  neutral500: "#64748b",
  neutral600: "#475569",
  neutral700: "#334155",
  neutral800: "#1e293b",
  neutral900: "#0f172a",

  border: "#e2e8f0",
  borderLight: "#f1f5f9",
  shadow: "#0f172a",
};

export const spacingX = {
  _3: scale(3),
  _5: scale(5),
  _7: scale(7),
  _10: scale(10),
  _12: scale(12),
  _15: scale(15),
  _20: scale(20),
  _25: scale(25),
  _30: scale(30),
  _35: scale(35),
  _40: scale(40),
};

export const spacingY = {
  _5: verticalScale(5),
  _7: verticalScale(7),
  _10: verticalScale(10),
  _12: verticalScale(12),
  _15: verticalScale(15),
  _17: verticalScale(17),
  _20: verticalScale(20),
  _25: verticalScale(25),
  _30: verticalScale(30),
  _35: verticalScale(35),
  _40: verticalScale(40),
  _50: verticalScale(50),
  _60: verticalScale(60),
};

export const radius = {
  _3: verticalScale(3),
  _6: verticalScale(6),
  _8: verticalScale(8),
  _10: verticalScale(10),
  _12: verticalScale(12),
  _15: verticalScale(15),
  _16: verticalScale(16),
  _20: verticalScale(20),
  _24: verticalScale(24),
  _30: verticalScale(30),
};

export const shadows = {
  small: {
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  medium: {
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 4,
  },
  large: {
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 8,
  },
  xlarge: {
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 12,
  },
};
