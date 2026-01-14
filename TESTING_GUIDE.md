# Quick Testing Guide - Donation System

## 🎯 What Was Fixed

Your donation page now **dynamically fetches packages from the database** that staff members create in the StaffDonation page. No more hardcoded packages!

---

## 🚀 Testing Steps

### Step 1: Start Your Backend Server
```bash
cd backend/
npm start
# Server should run on http://localhost:5000
```

### Step 2: Login as Staff
1. Open your app
2. Go to **Login** page
3. Select role: **Staff**
4. Enter staff credentials
5. **✅ Token should save** to localStorage (this was the critical fix)

### Step 3: Create a Package
1. Navigate to **Staff Dashboard** → **Donations**
2. Click **"Add Package"**
3. Fill in:
   - Package Name: "RICE BUNDLE"
   - Price: 25 RM
   - Quantity/PAX: 5
   - Items: Select items from dropdown
4. Click **"Add Package"**
5. **✅ Check console** for: `🚀 Add Package Response Status: 201`
6. **✅ Verify** package appears in the list

### Step 4: Logout & Login as Donor
1. Logout from staff account
2. Go to **Login** page
3. Select role: **Donor**
4. Enter donor credentials

### Step 5: View Dynamic Packages
1. Navigate to **Donations** page
2. Click **"Donate Now"** button (or "Food Donations" card)
3. You should see:
   - **Loading spinner** (briefly)
   - **Your newly created package** from Step 3 displayed!
   - Package details: name, price, items list
4. **✅ Check browser console** for: `📦 Fetched packages: [...]`

### Step 6: Test Package Selection
1. Click the **"+"** button to add package to donation
2. Quantity counter should increase
3. Total price should update
4. Click **"Next"** to proceed to donor details

---

## 🔍 Console Debugging

Open **Developer Tools (F12)** and check the **Console** tab:

**Expected logs when opening Donations/DonationApply:**
```
📦 Fetched packages: [Array of packages]
```

**If packages don't appear:**
```
❌ Error fetching packages: Error: Failed to fetch packages: 404
```
→ Check if backend server is running and `/api/packages` endpoint is working

**For staff operations (StaffDonation):**
```
🚀 Add Package Response Status: 201
📦 Add Package Response Data: {id: 1, name: "...", price: 25}
```

---

## ✅ Success Indicators

- [ ] Staff packages appear on Donations page
- [ ] Package details (name, price, items) display correctly
- [ ] Console shows `📦 Fetched packages` message
- [ ] Can select multiple packages
- [ ] Total price calculates correctly
- [ ] No 404 or 401 errors in console

---

## ⚠️ Common Issues & Fixes

| Issue | Cause | Fix |
|-------|-------|-----|
| Packages not showing | Backend not running | Start server: `npm start` |
| 404 error in console | Wrong API endpoint | Check `/api/packages` route exists |
| Empty page | No packages created | Staff must create packages first |
| Loading spinner stuck | Fetch error | Check backend console for errors |
| 401 Unauthorized | Token not saved | **Make sure you LOGIN again** (token fix applied) |

---

## 📝 Files Modified

1. **DonationApply.jsx** - Now fetches packages from API
2. **Donations.jsx** - Added navigation to package selection

## 🔧 API Integration

**Endpoint:** `GET http://localhost:5000/api/packages`

**Response Example:**
```json
[
  {
    "id": 1,
    "name": "RICE BUNDLE",
    "price": 25,
    "pax": "FOR 5 PAX",
    "items": [
      {"id": 1, "name": "RICE"},
      {"id": 2, "name": "OIL"}
    ]
  }
]
```

---

## 🎉 Next Steps

After testing:
1. Create multiple packages as staff
2. Test package selection from multiple options
3. Complete donation flow end-to-end
4. Check database to verify data persistence

**Happy Testing! 🚀**
