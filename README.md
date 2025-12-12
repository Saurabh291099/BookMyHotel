# 🌟 HotelSaaS – Auto-Generated Hotel Website & Booking Engine Platform
A Next-Gen SaaS platform for hotels to instantly create websites, manage bookings, accept test payments & operate via dashboards.

📖 About the Project

HotelSaaS is a full-stack platform that allows hotel owners to instantly create:

✔ Their own hotel website
✔ A live booking engine
✔ A hotel management dashboard
✔ A staff panel
✔ A super admin panel
✔ Test UPI + Test Bank Payments

This project is designed as a complete hotel management SaaS, ready for commercial use or as a production-level showcase.

✨ Key Features
🏨 Auto-Generated Hotel Website

Every signup creates a new hotel website automatically with:

Rooms, images & prices

Booking engine

Dynamic availability

Instant publishing

🔐 Authentication + Auto-Provisioning

JWT & Refresh Tokens

OTP Login Support

Auto-hotel creation after signup

Hotel setup wizard

📅 Booking Engine

Real-time availability

Inventory tracking

Dynamic pricing

Taxes & fees

Booking confirmation email

💳 Payments (Sandbox Mode)

UPI Test Mode

Test Net Banking

Test Cards

Webhook-based confirmation

🖥️ Owner Dashboard

Bookings overview

Revenue charts

Room management

Availability calendar

Guests list

Staff accounts

Settings (Logo, Hotel Info, Policies)

👩‍💼 Staff Panel

Check-in / Check-out

Housekeeping management

Arrivals dashboard

🧑‍💼 Super Admin Panel

Hotels approval

User management

Platform analytics

Billing & subscriptions

🏗 Architecture Overview
                          ┌─────────────────────┐
                          │  Public One-Page UI │
                          └──────────┬──────────┘
                                     │
                             CTA (Sign Up)
                                     │
                    ┌────────────────────────────────┐
                    │      Authentication Service    │
                    └────────────────┬───────────────┘
                                     │
                       Auto-Provisioning Service
                                     │
               ┌─────────────────────┴─────────────────────┐
               │                                           │
     ┌───────────────────┐                      ┌───────────────────┐
     │  Owner Dashboard  │                      │  Hotel Website    │
     └───────────────────┘                      └───────────────────┘
               │                                           │
               │                                           │
        ┌───────────────┐                           ┌───────────────┐
        │ Booking Engine │ ← Payments Service →      │ Guests        │
        └───────────────┘                           └───────────────┘
               │
        ┌───────────────┐
        │ Database (SQL) │
        └───────────────┘

🧩 Core Modules
Authentication

Signup, Login

OTP (optional)

JWT tokens

Role-based access

Auto-Provisioning

Create hotel

Assign subdomain

Install default website template

Booking Engine

Search

Availability

Pricing

Create booking

Payments

Test UPI

Test Bank

Webhook verification

Dashboard

Rooms

Bookings

Guests

Staff

Reports

Super Admin

Hotel approvals

Platform analytics

