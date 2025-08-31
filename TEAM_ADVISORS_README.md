# Team and Advisors Management

This document describes the new Team and Advisors management features added to the EarthSaathi Admin Panel.

## New Pages Added

### 1. Team Management (`/team`)
- **Location**: `src/pages/Team.jsx`
- **Purpose**: Manage team members and their information
- **Features**:
  - View all team members in a responsive grid layout
  - Add new team members
  - Edit existing team member information
  - Delete team members
  - Responsive design with mobile support

**Team Member Fields**:
- Name
- Designation/Role
- Quote/Description
- Image URL

### 2. Advisors Management (`/advisors`)
- **Location**: `src/pages/Advisors.jsx`
- **Purpose**: Manage advisors and their information
- **Features**:
  - View all advisors in a responsive grid layout
  - Add new advisors
  - Edit existing advisor information
  - Delete advisors
  - Responsive design with mobile support

**Advisor Fields**:
- Name
- Title/Position
- Description
- Image URL

## Navigation Updates

The sidebar navigation has been updated to include:
- **Team**: Uses `Users2` icon from Lucide React
- **Advisors**: Uses `GraduationCap` icon from Lucide React

## CRUD Operations

Both pages support full CRUD operations:

### Create
- Click "Add Team Member" or "Add Advisor" button
- Fill out the form with required information
- Click "Save" to create new entry

### Read
- All entries are displayed in responsive grid cards
- Information is clearly organized and easy to read

### Update
- Click the edit (pencil) icon on any card
- Modify the information in the form
- Click "Update" to save changes

### Delete
- Click the delete (trash) icon on any card
- Confirm deletion in the popup dialog

## Mock Data

### Team Members
1. **Dr. Shaurya Mohan** - CEO & Co-Founder, EarthSaathi
2. **Dr. Namrata** - CTO, Co-founder

### Advisors
1. **Wahid A. Kamalian** - Co-Founder & Managing Partner, Amaly Legacy
2. **Prof. P.D. Vaidya** - Professor at ICT Mumbai

## Technical Implementation

- **State Management**: Uses React useState hooks for local state
- **UI Framework**: Tailwind CSS with custom color scheme
- **Animations**: Framer Motion for smooth transitions
- **Icons**: Lucide React for consistent iconography
- **Responsive Design**: Mobile-first approach with responsive grid layouts

## CSS Utilities Added

New line-clamp utilities have been added to `src/index.css`:
- `.line-clamp-4`: Limits text to 4 lines with ellipsis
- `.line-clamp-6`: Limits text to 6 lines with ellipsis

## File Structure

```
src/
├── pages/
│   ├── Team.jsx          # Team management page
│   └── Advisors.jsx      # Advisors management page
├── components/
│   └── AdminLayout.jsx   # Updated with new navigation
├── App.jsx               # Updated with new routes
└── index.css             # Updated with new utilities
```

## Usage

1. Navigate to the Team or Advisors page from the sidebar
2. Use the "Add" button to create new entries
3. Use the edit/delete icons on each card for modifications
4. All changes are handled in real-time with the local state

## Future Enhancements

- Data persistence with backend API integration
- Image upload functionality
- Search and filtering capabilities
- Bulk operations (import/export)
- Activity logging and audit trails
