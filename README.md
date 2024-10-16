# Reminder

Application was tested on Google Chrome Version 127.0.6533.100 (Official Build)

## Getting Started

To run the development app:
```bash
npm i
# then
npm run db:deploy
# then
npm run dev
```

Or run prod version of app in docker
```bash
./start.sh
```

## Functional requirement for this app (my assumptions)
- The application must allow users to create an account using an email address and password.
- Users must be able to create a new reminder by specifying a title, day and time.
- Users should be able to view a list of all their reminders.
- Users should be able to delete a reminder.
- The application must send notifications to users at the specified reminder time.
- If users see reminder, app mark a reminder as completed for this week.
- The application should function correctly on devices with varying screen sizes.

## Nice to haves (if i can spend more time)
- The application should allow users to set a reminder as a one-time event or a recurring event.
- Users should be able to set reminders with different priorities (e.g., high, medium, low)
- Users must be able to log out of their accounts.
- Users should have the option to reset their password through email.
- Add push notifications.
- Add sounds for notifications.
- Add better error handling.
- Test in different Time Zone.
