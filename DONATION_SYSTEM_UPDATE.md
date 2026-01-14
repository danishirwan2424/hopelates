# Donation System Update - Database Integration

## ✅ Completed Changes

### 1. **DonationApply.jsx** - Now Fetches Packages from Database
**File:** `src/pages/forms/DonationApply.jsx`

**Changes Made:**
- Added `packages` state to hold packages fetched from API
- Added `loading` state to manage fetch loading indicator
- Replaced hardcoded package array with API fetch from `http://localhost:5000/api/packages`
- Initialized `packageQuantities` state dynamically based on fetched packages
- Added error handling with fallback to empty array if fetch fails
- Added loading spinner display while packages are being fetched
- Updated image handling with `getPackageImage()` function to use placeholder images for dynamic packages
- Added console logging for debugging: `"📦 Fetched packages"`

**Key Features:**
```javascript
// Fetch packages from database
useEffect(() => {
  const fetchPackages = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/packages");
      if (!response.ok) {
        throw new Error(`Failed to fetch packages: ${response.status}`);
      }
      const data = await response.json();
      console.log("📦 Fetched packages:", data);
      
      // Transform packages to include items
      const transformedPackages = data.map((pkg) => ({
        id: pkg.id,
        name: pkg.name,
        price: pkg.price,
        pax: pkg.pax || `FOR ${pkg.quantity || '1-3'} PAX`,
        items: pkg.items && Array.isArray(pkg.items) ? pkg.items.map(item => item.name) : []
      }));
      
      setPackages(transformedPackages);
      
      // Initialize packageQuantities for all packages
      const quantitiesObj = {};
      transformedPackages.forEach(pkg => {
        quantitiesObj[pkg.id] = 0;
      });
      setPackageQuantities(quantitiesObj);
    } catch (error) {
      console.error("❌ Error fetching packages:", error);
      setPackages([]);
      setPackageQuantities({});
    } finally {
      setLoading(false);
    }
  };

  fetchPackages();
}, []);
```

---

### 2. **Donations.jsx** - Navigation to Dynamic Packages
**File:** `src/pages/Donations.jsx`

**Changes Made:**
- Added `useNavigate` hook from React Router
- Updated "Donate Now" button to navigate to `/donation-apply` route
- Updated "Food Donations" card to be clickable and navigate to `/donation-apply` route
- Changed card styling to indicate it's interactive (cursor-pointer, hover effects)

**Key Features:**
```javascript
// Donate Now button - now navigates to package selection
onClick={() => navigate("/donation-apply")}

// Food Donations card - now interactive
onClick={() => navigate("/donation-apply")}
className="... cursor-pointer hover:bg-[#EFEFEF]"
```

---

## 🔄 Data Flow

1. **Staff Creates Packages**
   - Staff logs in → StaffDonation page
   - Creates packages with items and prices
   - Data saved to `/api/packages` endpoint (database: donation_package table)

2. **Donor Views & Selects Packages**
   - Donor navigates to Donations page
   - Clicks "Donate Now" or "Food Donations"
   - Routes to DonationApply page
   - DonationApply fetches packages from `/api/packages`
   - Displays all packages created by staff
   - Donor selects packages and enters donation details

---

## 🔧 API Endpoints Used

| Method | Endpoint | Purpose | Auth Required |
|--------|----------|---------|---------------|
| GET | `/api/packages` | Fetch all packages | No |
| POST | `/api/packages` | Create new package (Staff) | Yes (Bearer Token) |
| PUT | `/api/packages/:id` | Update package (Staff) | Yes (Bearer Token) |
| DELETE | `/api/packages/:id` | Delete package (Staff) | Yes (Bearer Token) |

---

## 📋 Package Structure from API

```javascript
{
  id: 1,
  name: "PACKAGE A",
  price: 20,
  pax: "FOR 1-3 PAX",
  quantity: 3,
  items: [
    { id: 1, name: "RICE" },
    { id: 2, name: "BREAD" },
    { id: 3, name: "BISCUITS" }
  ]
}
```

---

## ✨ Features

✅ Dynamic package loading from database
✅ Real-time display of staff-created packages
✅ Loading indicator while fetching packages
✅ Error handling with user-friendly fallback
✅ Console logging for debugging
✅ Responsive design maintained
✅ Navigation integration between pages

---

## 🧪 Testing Steps

1. **Login as Staff**
   - Go to login page
   - Select "Staff" role
   - Enter credentials
   - Token should save to localStorage

2. **Create Packages**
   - Navigate to Staff Donation dashboard
   - Create packages with items and prices
   - Click "Add Package"
   - Verify data saved in database

3. **View as Donor**
   - Log out from staff account
   - Go to Donations page
   - Click "Donate Now" or "Food Donations"
   - Verify packages created by staff are displayed
   - Test package selection and donation flow

---

## 🐛 Error Handling

- If packages fail to fetch: Shows "No packages available at the moment"
- If API is down: Shows loading spinner then empty state
- Console logs errors with ❌ prefix for debugging

---

## 📝 Notes

- Package images use placeholder (all default to PackageA image)
- For production: Consider uploading package images to database
- Token must be saved in Login.jsx for staff API calls to work (already fixed)
- Ensure backend server is running on `http://localhost:5000`
