# National Digital Document Vault - Frontend Application

A comprehensive, production-ready frontend application for a secure national digital document vault system with blockchain verification capabilities.

## Overview

The Digital Vault platform enables citizens to securely store, manage, and share official documents (birth certificates, degrees, property deeds, etc.) with blockchain-based verification. The system supports multiple user roles with distinct interfaces and capabilities.

## Features

### Multi-Role System
- **Citizens**: Upload, manage, and share personal documents
- **Authorities**: Issue and verify official documents
- **Verifiers**: Validate document authenticity
- **Admins**: Manage system users and authorities

### Core Capabilities
- Blockchain-verified document storage
- Secure document sharing with access control
- Real-time verification system
- Comprehensive audit logging
- Analytics and reporting
- Dark mode support
- Responsive design (mobile, tablet, desktop)

## Tech Stack

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript (strict mode)
- **State Management**: Redux Toolkit with RTK Query
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Forms**: React Hook Form with Zod validation
- **Charts**: Recharts
- **Date Handling**: date-fns

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
\`\`\`bash
git clone <repository-url>
cd national-digital-vault
\`\`\`

2. Install dependencies
\`\`\`bash
npm install
\`\`\`

3. Run the development server
\`\`\`bash
npm run dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Test Credentials

The application comes with pre-configured test users for each role:

### Citizen
- **Email**: john.citizen@email.com
- **Password**: Citizen123!
- **Features**: 5 documents (mix of verified/pending)

### Authority (University)
- **Email**: admin@university.edu
- **Password**: Authority123!
- **Features**: Can issue degrees and transcripts

### Verifier (Bank)
- **Email**: verifier@bank.com
- **Password**: Verifier123!
- **Features**: Can verify all document types

### Admin
- **Email**: admin@vault.gov
- **Password**: Admin123!
- **Features**: Full system access

## Project Structure

\`\`\`
src/
├── app/                      # Next.js App Router pages
│   ├── (auth)/              # Authentication pages
│   ├── (citizen)/           # Citizen portal
│   ├── (authority)/         # Authority dashboard
│   ├── (verifier)/          # Verifier interface
│   └── (admin)/             # Admin panel
├── components/              # React components
│   ├── ui/                  # shadcn/ui components
│   ├── layout/              # Layout components
│   ├── documents/           # Document-related components
│   └── shared/              # Shared components
├── lib/                     # Utilities and logic
│   ├── redux/               # Redux store and slices
│   ├── mock-data/           # Mock data for development
│   └── utils/               # Helper functions
└── types/                   # TypeScript type definitions
\`\`\`

## Key Features by Role

### Citizen Dashboard
- Document upload and management
- Secure document sharing with expiry controls
- Activity audit log
- Document verification status
- Storage usage tracking
- Profile and security settings

### Authority Dashboard
- Document issuance workflow
- Bulk document upload
- Verification request management
- Issuance analytics
- Multi-signature approval system

### Verifier Interface
- Multiple verification methods (ID, QR code, link)
- Instant verification results
- Blockchain verification check
- Verification history and receipts
- Success rate tracking

### Admin Panel
- User management across all roles
- Authority approval and management
- System health monitoring
- Activity logs and analytics
- User growth and document statistics

## Mock Data

The application uses realistic mock data to simulate a fully functional system:
- 10+ sample users across all roles
- 30+ documents with various statuses
- 7 issuing authorities
- 15+ verification requests
- 50+ audit log entries
- Real-time activity simulations

All data is stored in Redux state with simulated API delays for realistic behavior.

## Design System

### Colors
- **Primary**: Blue (#2563EB) - Trust and security
- **Success**: Green (#10B981) - Verified documents
- **Warning**: Amber (#F59E0B) - Pending states
- **Error**: Red (#EF4444) - Invalid/revoked documents
- **Info**: Cyan (#06B6D4) - Information messages

### Typography
- **Headings**: Inter font family, bold weights
- **Body**: Inter font family, regular/medium weights
- **Code/IDs**: Fira Code (monospace)

### Components
All components follow consistent patterns:
- Rounded corners with subtle shadows
- Status-based color coding
- Hover states and transitions
- Accessible keyboard navigation
- Screen reader support

## Future Backend Integration

The application is designed for easy backend integration:

1. **Replace Mock API**: Update `lib/redux/api/mockApi.ts` with actual API endpoints
2. **Authentication**: Implement real JWT token management in `authSlice.ts`
3. **File Upload**: Replace simulated uploads with actual S3/blob storage
4. **Blockchain**: Integrate real blockchain verification service
5. **Real-time Updates**: Add WebSocket support for live notifications

## Development Guidelines

### Adding New Features
1. Create types in `types/` directory
2. Add mock data if needed in `lib/mock-data/`
3. Create Redux slice in `lib/redux/slices/`
4. Build UI components in `components/`
5. Create pages in appropriate `app/` directory

### State Management
- Use Redux Toolkit for global state
- Use `createAsyncThunk` for async operations
- Keep component state local when possible
- Use selectors for derived state

### Styling
- Use Tailwind utility classes
- Follow mobile-first responsive design
- Maintain consistent spacing (4px, 8px, 16px, 24px)
- Use semantic color tokens

## Accessibility

The application follows WCAG AA standards:
- Semantic HTML elements
- ARIA labels and roles
- Keyboard navigation support
- Screen reader friendly
- Sufficient color contrast
- Focus indicators

## Performance

- Route-based code splitting
- Image optimization with Next.js Image
- Lazy loading for heavy components
- Optimistic UI updates
- Debounced search inputs

## Security Features (Frontend)

- Client-side input validation
- XSS protection via React
- Secure token storage patterns
- CSRF token support ready
- Rate limiting UI feedback
- Session timeout handling

## Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

## Deployment

The application is ready for deployment on Vercel or any Next.js-compatible platform:

\`\`\`bash
npm run build
npm start
\`\`\`

## Contributing

1. Follow the existing code structure
2. Maintain TypeScript strict mode
3. Add proper type definitions
4. Write accessible components
5. Test on multiple screen sizes

## License

This project is for demonstration purposes.

## Support

For issues or questions, refer to the project documentation or contact the development team.

---

Built with Next.js, TypeScript, and shadcn/ui
\`\`\`

\`\`\`tsx file="" isHidden
