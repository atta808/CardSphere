# Changelog

## [1.0.0] - Production Release

### Added
- Fully stabilized and accessible `HomeScreen`, `MyCardScreen`, `TemplatesScreen`, and `EditCardScreen`.
- Robust `try/catch` and fallback generations spanning all `profileService`, `exportService`, and `shareService` implementations.
- Robust, accessible `Premium` level common components (`PremiumBottomSheet`, `PremiumSwitch`, `ActionTile`, etc).
- Offline-first vCard 3.0 string generator tied into high-res QR Component captures.

### Changed
- Replaced multiple duplicated screens, constants, and components to enforce strict Clean Architecture workflows.
- Performance optimization passes on `BusinessCardFront`, `QRCard`, and `ExportPreview` utilizing `React.memo` bindings.

### Fixed
- Fixed unhandled cleanup issues for temporary files persisting locally after PDF / Share executions.
- Fixed layout alignment clipping risks on small devices by refining flex parameters and scroll view contents.
- Strict ESLint zero-warning and zero-error enforcement on production files.
