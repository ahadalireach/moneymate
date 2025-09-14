import {
  ShoppingCartIcon,
  HouseIcon,
  LightbulbIcon,
  CarIcon,
  FilmStripIcon,
  ForkKnifeIcon,
  HeartIcon,
  ShieldCheckIcon,
  WalletIcon,
  TShirtIcon,
  UserIcon,
  DotsThreeOutlineIcon,
  CurrencyDollarSimpleIcon,
} from "phosphor-react-native";
import { CategoryType, ExpenseCategoriesType } from "../types";

export const expenseCategories: ExpenseCategoriesType = {
  groceries: {
    label: "Groceries",
    value: "groceries",
    icon: ShoppingCartIcon,
    bgColor: "#4B5563",
  },
  rent: {
    label: "Rent",
    value: "rent",
    icon: HouseIcon,
    bgColor: "#075985",
  },
  utilities: {
    label: "Utilities",
    value: "utilities",
    icon: LightbulbIcon,
    bgColor: "#ca8a04",
  },
  transportation: {
    label: "Transportation",
    value: "transportation",
    icon: CarIcon,
    bgColor: "#b45309",
  },
  entertainment: {
    label: "Entertainment",
    value: "entertainment",
    icon: FilmStripIcon,
    bgColor: "#0f766e",
  },
  dining: {
    label: "Dining",
    value: "dining",
    icon: ForkKnifeIcon,
    bgColor: "#be185d",
  },
  health: {
    label: "Health",
    value: "health",
    icon: HeartIcon,
    bgColor: "#e11d48",
  },
  insurance: {
    label: "Insurance",
    value: "insurance",
    icon: ShieldCheckIcon,
    bgColor: "#404040",
  },
  savings: {
    label: "Savings",
    value: "savings",
    icon: WalletIcon,
    bgColor: "#065F46",
  },
  clothing: {
    label: "Clothing",
    value: "clothing",
    icon: TShirtIcon,
    bgColor: "#7c3aed",
  },
  personal: {
    label: "Personal",
    value: "personal",
    icon: UserIcon,
    bgColor: "#a21caf",
  },
  others: {
    label: "Others",
    value: "others",
    icon: DotsThreeOutlineIcon,
    bgColor: "#525252",
  },
};

export const incomeCategory: CategoryType = {
  label: "Income",
  value: "income",
  icon: CurrencyDollarSimpleIcon,
  bgColor: "#16a34a",
};

export const transactionTypes = [
  { label: "Expense", value: "expense" },
  { label: "Income", value: "income" },
];
