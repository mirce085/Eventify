# Edit Event Page

This page allows users to edit an existing event using React Hook Form for form state management.

## Features

- **React Hook Form Integration**: Uses `useForm` hook for efficient form state management
- **Automatic Form Population**: Fetches event data from API and populates form using `reset()`
- **Built-in Validation**: Required fields are validated using react-hook-form's validation rules
- **Type Safety**: Full TypeScript types for form data and API responses
- **Loading States**: Shows spinner while fetching event data
- **Error Handling**: Displays error messages for fetch and submission failures
- **Date Formatting**: Properly formats dates for datetime-local inputs
- **Data Transformation**: Converts form data to API format (dates to ISO, price to float)
- **Navigation**: Back link to event detail page and redirect after successful update

## Form Fields

All fields are registered with react-hook-form's `register()` function:

- **title** (required): Event title
- **description** (required): Event description
- **startAt** (required): Start date and time
- **endAt** (required): End date and time
- **city** (required): City location
- **countryCode** (required): Country code (e.g., US)
- **address** (required): Street address
- **coverImage** (optional): URL to cover image
- **price** (optional): Event price
- **currency** (required): Currency code (e.g., USD)
- **status** (required): Event status (DRAFT, PUBLISHED, CANCELLED)

## Usage

Navigate to `/dashboard/events/[id]/edit` where `[id]` is the event ID.

Example: `/dashboard/events/abc123/edit`

## API Integration

- **GET** `/api/events/[id]` - Fetches event data
- **PUT** `/api/events/[id]` - Updates event data

## Benefits of React Hook Form

1. **Less Boilerplate**: No need for multiple `useState` hooks for each field
2. **Better Performance**: Reduces re-renders compared to controlled components
3. **Built-in Validation**: Simple validation rules without manual checks
4. **Easy Form Reset**: Single `reset()` call to populate form with fetched data
5. **Form State Management**: `formState` provides loading, errors, and validation state
6. **Clean Code**: More readable and maintainable than manual state management
