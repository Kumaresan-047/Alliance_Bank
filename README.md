Alliance Bank – Technology & Architecture Overview
1. Project Overview
The Alliance Bank Mobile Application is a cross-platform banking app built using React Native. It provides key features like Digital Currency Investment (DCI) indicative prices, multi-currency support, dual currency investment forms, and secure navigation between banking modules.

The app is designed for scalability, modularity, and a high-quality user experience in line with industry standards for financial applications.

2. Technology Stack
Core Framework & Platform
React Native (v0.80.2): Enables cross-platform development for iOS & Android using JavaScript/TypeScript.

React (v19.1.0): Used for building UI components in a declarative way.

TypeScript (v5.0.4): Ensures type safety and improves code maintainability.

Navigation & Routing
@react-navigation/native (v7.1.16): Core navigation library for handling app routing.

@react-navigation/stack (v7.4.4): For stack-based screen transitions.

@react-navigation/native-stack (v6.9.17): Native navigation for better performance.

UI Components & Design
react-native-elements (v3.4.3): Pre-built components like Card, Icon, and styled inputs for fast UI development.

react-native-vector-icons (v10.3.0): Adds 3000+ icons for intuitive design.

react-native-dropdown-picker (v5.4.6): Used for currency selection dropdowns.

react-native-popover-view (v6.1.0): Adds confirmation dialogs (e.g., exit confirmation).

User Experience & Feedback
react-native-toast-message (v2.3.3): Provides instant feedback (e.g., success/failure messages).

react-native-safe-area-context (v5.5.2): Ensures UI adapts to safe areas (notch, status bar).

react-native-screens (v4.13.1): Improves navigation performance by using native primitives.

Animations & Gestures
react-native-gesture-handler (v2.27.2): Handles complex gestures.

react-native-reanimated (v4.0.1): Used for animations.

react-native-worklets (v0.4.0): Optimizes animations using worklets.

Development Tools
Jest (v29.6.3): Testing framework for unit & integration tests.

ESLint (v8.19.0): Enforces code quality and prevents bugs.

Prettier (v2.8.8): Maintains consistent code formatting.

Babel: Enables support for modern JavaScript syntax.

Platform Configurations
Android: Gradle & Kotlin for native modules.

iOS: Swift-based AppDelegate with CocoaPods for dependencies.

3. Project Architecture
The app uses a component-based modular architecture:

Modules:
Authentication:

Handles login form validation with regex.

Provides secure navigation post-login.

Indicative DCI Prices:

Screen: Displays investment periods, expiry & maturity dates, target conversion rates, and enhanced rates.

Features:

Currency selection via DropDownPicker.

Exit confirmation via Popover.

Touchable rows: Pressing a rate navigates to the Dual Currency Investment form.

Dual Currency Investment Form:

Dynamic field mapping: Uses a JSON-driven approach to render form fields dynamically (reducing repetitive code).

Pre-filled fields: Some values (e.g., target conversion rate, expiry date) are auto-passed via navigation params.

Financial input handling: Handles numeric inputs (auto-stripping % signs and formatting decimals).

Reusable Components:

YieldSummaryBox: Displays calculated yields and net revenue with flags.

Dynamic Form Renderer: Converts a JSON structure into TextInput fields automatically.

4. Key Features Implemented
Multi-currency support: USD, EUR, GBP, AUD, INR, JPY, etc.

Interactive investment data: Users can explore different DCI rates and navigate to investment forms.

Form automation: JSON-driven field generation for flexibility and easier updates.

Data formatting:

Strips % from inputs when needed.

Formats numbers to fixed decimals (e.g., 2.90 → 2.900).

Responsive design: Safe area handling, scrollable layouts, and adaptive UI for all devices.

User confirmation flows: Exit popovers to prevent accidental actions.

5. Development Workflow
Version Control: Git & GitHub for source code management.

Commit Standards: Commit messages follow semantic versioning (feat:, fix:, refactor:).

Continuous Development: Uses Metro bundler for live reload and fast iteration.

---
1.Signin page with validation

<img width="300" height="300" alt="Screenshot_1753843161" src="https://github.com/user-attachments/assets/f0a37b10-14c2-4efc-9c61-949f2113e80f" />




