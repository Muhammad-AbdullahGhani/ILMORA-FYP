# Email Configuration Guide

## Setup Instructions

To enable the contact form to send emails, you need to configure Gmail credentials:

### Step 1: Generate Gmail App Password

1. Go to your Google Account: https://myaccount.google.com/
2. Navigate to **Security** > **2-Step Verification** (enable if not already enabled)
3. Scroll down to **App passwords**
4. Click **Select app** → Choose "Mail"
5. Click **Select device** → Choose "Other (Custom name)"
6. Enter "ILM-ORA Contact Form"
7. Click **Generate**
8. Copy the 16-character password (you won't see it again)

### Step 2: Update .env File

Open `backend/services/gateway/.env` and replace the placeholder values:

```env
# Email Configuration
EMAIL_USER=taimoorrazaasif581@gmail.com
EMAIL_PASS=your-16-character-app-password-here
```

**Important:** 
- Use the Gmail address: `taimoorrazaasif581@gmail.com`
- Use the app-specific password (NOT your regular Gmail password)
- Remove any spaces from the app password

### Step 3: Restart the Gateway Service

After updating the .env file:

```bash
cd backend/services/gateway
npm run dev
```

### Step 4: Test the Contact Form

1. Navigate to the About page in your frontend
2. Fill out the contact form with test data
3. Click "Send Message"
4. Check `taimoorrazaasif581@gmail.com` for the email

## Email Template

When someone submits the contact form, you'll receive an email with:
- Subject: "New Contact Form Submission from [Name]"
- Sender's name
- Sender's email
- Phone number (if provided)
- Subject line
- Message content
- Timestamp

## Troubleshooting

### "Invalid login" error
- Ensure you're using an app-specific password, not your regular Gmail password
- Verify 2-Step Verification is enabled on your Google account

### "Connection timeout" error
- Check your internet connection
- Verify Gmail SMTP is not blocked by your firewall

### Email not received
- Check spam/junk folder
- Verify EMAIL_USER is set to `taimoorrazaasif581@gmail.com`
- Check gateway logs for error messages

## Security Notes

- Never commit the .env file with real credentials to git
- The .env file should already be in .gitignore
- App passwords are safer than using your main Gmail password
- You can revoke app passwords anytime from Google Account settings
