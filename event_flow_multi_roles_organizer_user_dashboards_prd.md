# Product Requirements Document (PRD)
## EventFlow — Multi-Role Dashboards (Organizer, Participant, Volunteer)

---

## 1. Product Overview

**Product Name:** EventFlow  
**Module:** Multi-Role Dashboards (Organizer, Participant, Volunteer)  
**Purpose:**
EventFlow is a campus event execution system that automates event creation, registration, QR-based entry, and attendance tracking. This PRD expands the Organizer Dashboard into a multi-role system where Organizers, Participants (students), and Volunteers have role-specific dashboards, features, and permissions.

---

## 2. Problem Statement

Campus events are managed across fragmented channels; different stakeholders (organizers, students, volunteers) have different needs and responsibilities but use the same tools or ad-hoc processes, causing:
- Repetitive manual work for organizers
- Confusing registration and entry processes for participants
- Inefficient volunteer coordination and on-the-ground management
- No centralized role-based access or clear ownership of tasks

---

## 3. Goals & Objectives

### Primary Goals
- Provide role-based experiences and permissions for Organizers, Participants, and Volunteers
- Maintain the single-form creation + auto-execute promise for organizers
- Simplify registration and entry for participants
- Streamline volunteer tasks and check-ins

### Success Metrics
- Time to create event ≤ 2 minutes for organizer
- Participant registration completion rate ≥ 90% for listed events
- Volunteer check-in reliability ≥ 99% during events
- Attendance data completeness for 95% of events

---

## 4. User Personas & Roles

### Organizer
- Role: Faculty, club head, event manager
- Responsibilities: Create & manage events, control visibility, monitor registrations and attendance
- Expectation: Minimal effort, maximum automation

### Participant (Student)
- Role: Attendee
- Responsibilities: Discover events, register, attend
- Expectation: Fast discovery, one-step registration, easy entry via QR

### Volunteer
- Role: On-ground support (ushers, check-in helpers)
- Responsibilities: Assist check-ins, validate QR codes, help with logistics
- Expectation: Lightweight interface for scanning & reporting

### System Admin (future)
- Role: Platform-level management
- Responsibilities: User management, global settings, audits

---

## 5. Core System Principles

- **Single source of truth:** Event data lives centrally and is reflected across roles in real-time.
- **Least privilege:** Each role only sees/acts on what they are permitted to.
- **Simplicity-first:** Each screen answers one question (create, discover, scan, report).
- **Automation-first:** Create once → automated outputs (links, QR, entry flow).

---

## 6. Functional Requirements (Role-by-role)

### 6.1 Shared Capabilities
- Email-based signup & verification (all roles)
- Role selection during onboarding (or assigned by admin)
- Central event model available to all roles with role-specific views
- Events have lifecycle states: Upcoming, Live, Past

---

### 6.2 Organizer Dashboard (Owner features)
**High-level purpose:** Create and run events with minimal manual effort.

**Core Features:**
- Create Event (single-form) — fields: name, description, date/time, venue, type, capacity
- Auto-generate public event page, registration link, event QR
- Event list with status badges and counts (registered, checked-in)
- Edit / Disable event until start
- Post-creation control panel (copy link, download QR, open check-in)
- Check-in override (manual mark-in for special cases)
- View registration list and attendance summary (read-only during event)

**Permissions & Notes:**
- Organizers see only events they created (MVP)
- Organizer can assign volunteers to an event (future enhancement)

---

### 6.3 Participant Dashboard (Student features)
**High-level purpose:** Discover, register, and enter events quickly.

**Core Features:**
- Event discovery feed (upcoming prioritized)
- Filter & search by category, date
- Event detail page with Register CTA
- Simple registration form (name, email, student ID)
- Registration confirmation with personal QR for entry
- My Registrations page (list of events the participant registered for)
- Easy access to QR and event info prior to event

**Permissions & Notes:**
- Participants cannot view private admin controls
- Option for anonymous RSVP can be considered for specific events (policy decision)

---

### 6.4 Volunteer Dashboard (Field features)
**High-level purpose:** Lightweight, fast interface for validating entry and supporting organizers.

**Core Features:**
- Assigned event list (events where volunteer is assigned)
- Simple QR scanner view (camera-based) with large success/fail feedback
- Quick actions: mark-help-request, mark-late-arrival, call-organizer
- Live counters: registered vs checked-in
- Basic reporting: note issues (e.g., capacity full, fake QR)

**Permissions & Notes:**
- Volunteers have no access to edit event content
- Volunteers should have mobile-first screens and offline resilience (optional)

---

### 6.5 Admin (System-level, future)
**High-level purpose:** Manage users, review event history, audit actions.

**Core Features (future):**
- User management (assign roles)
- Audit logs
- Global settings (policies, capacity limits)

---

## 7. Event Lifecycle & Cross-Role Behavior

- **Create → Upcoming:** Organizer creates; registration opens; participants can sign up.
- **Upcoming → Live:** At start time status changes to Live (system-driven); volunteers start check-in.
- **Live:** QR scans validate and mark attendance in real-time; UI reflects live counts.
- **Live → Past:** After end time, event moves to Past; attendance becomes final and read-only.

**Edge cases:**
- Late edits: Organizer can edit non-critical fields until event starts; edits that affect QR/links require regeneration.
- Capacity overflow: System shows waitlist or closed registration (MVP: disable registration when capacity reached).

---

## 8. Non-Functional Requirements

- **Performance:** Landing and dashboards load < 2s on stable network; scanning latency < 300ms ideally
- **Reliability:** Scanning must be resilient; duplicate scans prevented
- **Security & Privacy:** Role-based access control; minimal PII stored; secure QR tokens
- **Accessibility:** Basic WCAG compliance (contrast, keyboard navigation)
- **Mobile-first UX:** Volunteer and participant flows optimized for phones

---

## 9. Data & Integration Considerations (Conceptual)

**Core entities:** Users (role), Events, Registrations, AttendanceRecords, VolunteersAssignments

**Integration notes:**
- Use centralized DB (Supabase) to store events/registrations
- QR tokens encode event + registration references (signed)
- Plan for future email/SMS notifications (post-hackathon)

---

## 10. MVP Scope & Prioritization

### MVP (hackathon) — must-haves
- Email sign-up + verification
- Role selection and onboarding to Organizer / Participant / Volunteer
- Organizer: Create event (single-form), event list, post-create panel (link + QR)
- Participant: Event discovery, register, personal QR
- Volunteer: QR scanning interface, live counts
- Automated event status transitions (Upcoming → Live → Past)

### Stretch (if time permits)
- Assign volunteers to events from Organizer panel
- Manual check-in override UI for organizer
- Download attendance CSV

### Excluded (post-MVP)
- Payments, calendar sync, analytics dashboards, certificates

---

## 11. Acceptance Criteria

- Organizer can create an event and retrieve public link + QR within one flow
- Participant can register and receive personal QR code
- Volunteer can scan QR and mark attendance; duplicate scan is blocked
- Event status changes automatically based on time
- Dashboard shows registration and attendance counts accurately

---

## 12. Future Enhancements (Roadmap)

- Role-based permissions granular controls (super-admin, event-manager)
- Event waitlist & capacity management
- Calendar integration (Google Calendar export)
- Email/SMS reminders and automated notifications
- Analytics and reports for organizers

---

## 13. Appendix — Example User Flows (Short)

**Organizer:** Sign up → Verify email → Create event → Copy link / Download QR → Open check-in on event day → View attendance summary after event

**Participant:** Sign up → Verify email → Browse events → Register → Save QR → Show QR at event → Attendance marked

**Volunteer:** Sign up → Verify email → View assigned events → Open scanner → Scan QR → Mark attendance / note issues

---

## 14. Summary

This PRD expands EventFlow from a single organizer experience to a multi-role system with dedicated dashboards for Organizers, Participants, and Volunteers. The product preserves the single-form automation promise while offering role-specific simplicity and permissions, making campus events easy to run and attend.

