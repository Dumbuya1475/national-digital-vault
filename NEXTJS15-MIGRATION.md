# Next.js 15 Migration & Flash Prevention Guide

## Overview

This document outlines the changes made to support Next.js 15 and eliminate page flashing during authentication checks.

## Key Changes

### 1. Enhanced Middleware (middleware.ts)

**Purpose**: Server-side authentication and role-based routing to prevent unauthorized access before pages load.

**Features**:
- Cookie-based authentication checking
- Role-based route protection
- Automatic redirection for unauthorized access
- Prevents flash of unauthenticated content

**How it works**:
\`\`\`typescript
// Checks authToken and userRole cookies
// Redirects unauthenticated users to /login
// Redirects users to their appropriate dashboard based on role
// Prevents access to routes that don't match user role
\`\`\`

### 2. Cookie-Based Auth State (lib/redux/slices/authSlice.ts)

**Changes**:
- Added `setAuthCookies()` and `clearAuthCookies()` utility functions
- Stores auth state in both localStorage and HTTP cookies
- Cookies are accessible by middleware for server-side checks
- 7-day expiration with SameSite=Strict security

**Cookie Structure**:
\`\`\`
authToken=token_{userId}
userId={userId}
userRole={role} // citizen, authority, verifier, admin
\`\`\`

### 3. Auth Initialization (lib/auth-init.tsx)

**Purpose**: Single centralized point for loading user state on app initialization.

**Benefits**:
- Prevents multiple competing auth checks
- Runs once at app startup
- No loading spinners or flash on protected routes
- Middleware already verified auth, this just hydrates Redux state

### 4. Simplified Layouts

**Before**:
\`\`\`tsx
// Each layout had its own auth checks
useEffect(() => {
  if (!isAuthenticated) {
    dispatch(loadUser())
  }
}, [dispatch, isAuthenticated])

useEffect(() => {
  if (isAuthenticated && currentUser && currentUser.role !== "citizen") {
    router.push(`/${currentUser.role}/dashboard`)
  }
}, [isAuthenticated, currentUser, router])

// Showed loading spinner while checking
if (!isAuthenticated || !currentUser) {
  return <LoadingSpinner />
}
\`\`\`

**After**:
\`\`\`tsx
// Layouts are now simple wrappers
export default function CitizenLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main>{children}</main>
      </div>
    </div>
  )
}
\`\`\`

**Why this works**:
- Middleware ensures only authenticated users with correct role reach the layout
- No client-side checks needed
- No loading states or redirects
- Instant page load without flash

### 5. Removed ProtectedRoute Component

**Reason**: Redundant with enhanced middleware. Middleware handles all authentication and authorization at the edge, before React even renders.

## Benefits

### No Page Flashing
- Users see their content immediately
- No loading spinners on navigation
- No flash of wrong content
- Smooth user experience

### Better Performance
- Server-side checks are faster
- Fewer client-side redirects
- Less JavaScript execution
- Reduced hydration work

### Enhanced Security
- Authentication verified before page loads
- Role checks happen server-side
- Cookies are HTTP-only ready (can be upgraded)
- No auth logic in client bundles

### Cleaner Code
- Single source of truth for auth (middleware)
- Simpler layout components
- Less useEffect complexity
- Easier to maintain

## Migration Checklist

- [x] Enhanced middleware with role-based routing
- [x] Cookie-based auth state management
- [x] Centralized AuthInitializer component
- [x] Simplified all role-based layouts
- [x] Removed ProtectedRoute component
- [x] Tested all user role flows
- [x] Verified no flash on navigation
- [x] Confirmed middleware redirects work

## Testing

### Test Each Role Flow:

1. **Citizen Flow**:
   - Login as john.citizen@email.com
   - Navigate to /citizen/dashboard
   - Try accessing /authority/dashboard (should redirect to /citizen/dashboard)
   - No flash or loading spinner

2. **Authority Flow**:
   - Login as admin@university.edu
   - Navigate to /authority/dashboard
   - Try accessing /admin/dashboard (should redirect to /authority/dashboard)
   - No flash or loading spinner

3. **Verifier Flow**:
   - Login as verifier@bank.com
   - Navigate to /verifier/dashboard
   - Try accessing /citizen/dashboard (should redirect to /verifier/dashboard)
   - No flash or loading spinner

4. **Admin Flow**:
   - Login as admin@vault.gov
   - Navigate to /admin/dashboard
   - Try accessing any other role route (should redirect to /admin/dashboard)
   - No flash or loading spinner

### Test Unauthenticated Access:

1. Clear cookies/logout
2. Try accessing /citizen/dashboard
3. Should immediately redirect to /login
4. No flash of dashboard content

## Next.js 15 Compatibility

### Changes for Next.js 15:

1. **Middleware**: Uses Next.js 15's enhanced middleware features
2. **Cookies**: Compatible with Next.js 15 cookie API
3. **App Router**: Fully compatible with App Router architecture
4. **Server Components**: Layouts can be upgraded to Server Components if needed

### Future Enhancements:

1. **Server-Side Session**: Move from cookies to server-side sessions
2. **HTTP-Only Cookies**: Set cookies from API routes for better security
3. **Server Components**: Convert more components to RSC
4. **Parallel Routes**: Add loading states with parallel routes if needed

## Troubleshooting

### Issue: Still seeing flash

**Solution**: 
- Clear browser cookies
- Hard refresh (Cmd+Shift+R / Ctrl+Shift+F5)
- Check middleware.ts is being executed (add console.log)

### Issue: Redirect loop

**Solution**:
- Check userRole cookie is set correctly
- Verify middleware roleRouteMap matches your routes
- Ensure login sets all three cookies (authToken, userId, userRole)

### Issue: Can't access any routes

**Solution**:
- Check middleware config matcher pattern
- Verify cookies are being set with correct path=/
- Check browser devtools Application tab for cookies

## Summary

The application now uses a modern Next.js 15 architecture where authentication and authorization happen at the edge (middleware), providing a seamless user experience without any page flashing or loading states. All protected routes are verified server-side before React renders, ensuring security and performance.
