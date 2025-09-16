# MoneyMate

**MoneyMate** is a modern, feature-rich personal finance management mobile application built with React Native and Expo. Take complete control of your finances with smart budgeting, transaction tracking, and insightful financial analytics.

## Technologies Used

- **Frontend:** React Native, Expo SDK 53, TypeScript
- **Routing:** Expo Router with file-based navigation
- **Backend & Database:** Firebase (Authentication, Firestore)
- **Image Management:** Expo Image, Cloudinary
- **Charts & Analytics:** React Native Gifted Charts
- **State Management:** React Context API
- **Styling:** StyleSheet with custom design system

---

## Features

### 💰 **Financial Management**

- **Multi-Wallet System**: Create and manage multiple wallets (Cash, Bank, Credit Cards, etc.)
- **Transaction Tracking**: Add, edit, and delete income/expense transactions with categories
- **Real-time Balance**: Live balance calculations across all wallets

### 📊 **Analytics & Insights**

- **Interactive Charts**: Weekly, monthly, and yearly financial statistics
- **Visual Reports**: Bar charts showing spending patterns and trends
- **Financial Overview**: Dashboard with total balance, income, and expenses
- **Transaction History**: Detailed transaction lists with search and filtering

### 👤 **User Experience**

- **Profile Management**: Complete user profile with avatar upload
- **Authentication**: Secure Firebase authentication with email/password
- **Image Upload**: Cloudinary integration for profile and wallet images

---

## Getting Started

### Prerequisites

- Node.js (v16 or higher) and npm/yarn installed
- Expo CLI (`npm install -g @expo/cli`)
- Android Studio (for Android development) or Xcode (for iOS development)
- Git (optional, for cloning the repository)

### Folder Structure

```plaintext
moneymate/
├── app/                              # Main application screens
│   ├── (auth)/                       # Authentication screens
│   │   ├── Login.tsx                 # User login screen
│   │   ├── Register.tsx              # User registration screen
│   │   └── Welcome.tsx               # Welcome/onboarding screen
│   ├── (modals)/                     # Modal screens
│   │   ├── ProfileModal.tsx          # Profile editing modal
│   │   ├── SearchModal.tsx           # Transaction search modal
│   │   ├── TransactionModal.tsx      # Add/edit transaction modal
│   │   └── WalletModal.tsx           # Add/edit wallet modal
│   ├── (tabs)/                       # Main tab screens
│   │   ├── index.tsx                 # Home dashboard
│   │   ├── Profile.tsx               # User profile screen
│   │   ├── Statistics.tsx            # Financial analytics
│   │   ├── Wallet.tsx                # Wallet management
│   │   └── _layout.tsx               # Tab navigation layout
│   ├── _layout.tsx                   # Root layout with navigation
│   └── index.tsx                     # App entry point
├── assets/                           # Static assets
│   ├── fonts/                        # Custom fonts
│   └── images/                       # App images and icons
├── components/                       # Reusable UI components
│   ├── BackButton.tsx                # Navigation back button
│   ├── Button.tsx                    # Custom button component
│   ├── CustomTabs.tsx                # Tab navigation component
│   ├── Header.tsx                    # Screen header component
│   ├── HomeCard.tsx                  # Dashboard balance card
│   ├── ImageUpload.tsx               # Image upload component
│   ├── Input.tsx                     # Form input component
│   ├── Loading.tsx                   # Loading indicator
│   ├── ModalWrapper.tsx              # Modal container
│   ├── ScreenWrapper.tsx             # Screen container
│   ├── TransactionList.tsx           # Transaction list component
│   ├── Typo.tsx                      # Typography component
│   ├── WalletListItem.tsx            # Wallet item component
│   └── index.ts                      # Component exports
├── config/                           # Configuration files
│   └── firebase.ts                   # Firebase configuration
├── constants/                        # App constants
│   ├── data.ts                       # Static data and categories
│   └── theme.ts                      # Design system and colors
├── contexts/                         # React Context providers
│   └── authContext.tsx               # Authentication context
├── hooks/                            # Custom React hooks
│   └── useFetchData.ts               # Data fetching hook
├── services/                         # Business logic services
│   ├── imageService.ts               # Image upload service
│   ├── transactionService.ts         # Transaction CRUD operations
│   ├── userService.ts                # User management service
│   └── walletService.ts              # Wallet CRUD operations
├── utils/                            # Utility functions
│   ├── common.ts                     # Common helper functions
│   └── styling.ts                    # Styling utilities
├── types.ts                          # TypeScript type definitions
├── package.json                      # Dependencies and scripts
└── .env                              # Environment variables
```

## Get started

### 1. Clone the Repository

```bash
git clone https://github.com/ahadalireach/moneymate.git
cd moneymate
```

---

### 2. Install Dependencies

```bash
npm install
```

---

### 3. Environment Setup

Create a `.env` file in the root directory and add your Firebase and Cloudinary credentials:

```env
API_KEY=your_firebase_api_key
APP_ID=your_firebase_app_id
STORAGE_BUCKET=your_firebase_storage_bucket
CLOUD_NAME=your_cloudinary_cloud_name
UPLOAD_PRESET=your_cloudinary_upload_preset
```

---

### 4. Firebase Setup

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com)
2. Enable Authentication (Email/Password)
3. Create a Firestore database
4. Add your Firebase configuration to the `.env` file

---

### 5. Cloudinary Setup

1. Create a Cloudinary account at [Cloudinary](https://cloudinary.com)
2. Get your cloud name and upload preset
3. Add the credentials to the `.env` file

---

### 6. Start the Development Server

```bash
npx expo start
```

---

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## Live Demo

- 📹 **Demo Video**: [Watch Now](#)
- ⭐ **GitHub**: [github.com/ahadalireach/moneymate](https://github.com/ahadalireach/moneymate)

## Contact

For any questions, feedback, or collaboration opportunities, reach out at [ahadali.reach@gmail.com](mailto:ahadali.reach@gmail.com)

> Built with 💻, ☕, and ❤️ by [Ahad Ali](https://ahadali.me)
