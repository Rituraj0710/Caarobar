# Switching Expo Account for APK Builds

## Steps to Switch to a New Expo Account

### 1. Log in to the New Expo Account
```bash
cd frontend
eas login
```
Follow the prompts to log in with your new Expo account credentials.

### 2. Verify You're Logged In
```bash
eas whoami
```
This will show the username of the account you're currently logged into.

### 3. Update app.json
Update the `owner` field in `app.json` to match your new Expo account username.

**Current owner:** `rituraj99`

**Update to:** Your new Expo account username

### 4. Create/Link EAS Project
After updating the owner, you need to either:

**Option A: Create a new EAS project (recommended)**
```bash
eas build:configure
```
This will create a new project ID under your new account.

**Option B: Link to an existing project**
If you already have a project under the new account, the projectId in `app.json` will be updated automatically when you run the build command.

### 5. Build APK
Once configured, you can build your APK:
```bash
eas build --platform android --profile apk
```

## Important Notes

- The `projectId` in `app.json` will be automatically updated when you create/link a new project
- Make sure the new account has the necessary permissions and billing setup (if using EAS Build)
- All builds will now be associated with the new Expo account

