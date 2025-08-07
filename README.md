# registration
registration form for alcher

 

## **In users\models.py Key Changes and Additions**

- **Modern Choices & Constants:**  
  All field choices (gender, role, accommodation) are  declared globally as constants for consistency and easier maintenance.
- **OTP Security & Password Reset:**  
  Added `otp_used` for tracking OTP usage (to prevent replay attacks), `password_reset_token` and `password_reset_expiry` fields for secure password recovery, and consolidated OTP logic.
- **Email Verification:**  
  New `verified_email` field to explicitly track email verification status.
- **User Roles:**  
  Added `role` field with preset choices for different portal roles (participant, volunteer, judge, sponsor, organizer).
- **Profile Completion:**  
  Added `percentage_complete` and an auto-calculating helper method in save() to track and encourage full profile completion.
- **String Representation:**  
  All models now have clear `__str__` methods for better admin use and logging.
- **Meta Class & Ordering:**  
  Added `class Meta` with `ordering` for consistent admin panel display.
- **Image Path:**  
  User and team member profile images are now organized by date for easier media management.
- **Field Naming Consistency:**  
  Corrected `accomodation` to `accommodation` everywhere for consistency and clarity.
- **Validation:**  
  Added a recommended `clean()` method stub for future input validation logic.
- **Automatic IDs:**  
  Kept custom ID generation for `alcherid` and `memberid`, but code is now more concise.

---

## **Model-Specific Highlights**

| Model         | Key Changes & Features                                                                                  |
|---------------|-------------------------------------------------------------------------------------------------------|
| **NewUser**   | Email verification (`verified_email`), OTP tracking (`otp_used`), user roles (`role`), password reset, profile completion (`percentage_complete`), tight field declarations, conciseness, improved string representation |
| **TeamMembers** | Image organization, accommodation spelling, auto member_id, clean field declarations, clear string representation |
| **Team**      | Accommodation spelling, field tightening, clear string representation, flexible team naming             |             |
| **Price**     | No structural change, but field declarations tightened                                                 |

---
