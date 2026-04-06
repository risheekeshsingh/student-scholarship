<img width="1366" height="2122" alt="image" src="https://github.com/user-attachments/assets/7e2fcfc1-b9c3-499b-872a-987432685215" />﻿🎓 Student Scholarship Portal

An AI-powered full-stack scholarship management platform built with Node.js, Express, MongoDB, and OpenAI — designed to help Indian students discover, apply, and track scholarships effortlessly.


📖 About the Project
The Student Scholarship Portal is a web-based platform that bridges the gap between students and scholarship opportunities in India. Leveraging AI (OpenAI GPT), it intelligently matches students with relevant scholarships based on their academic profile, college ranking (NIRF), and eligibility criteria.
Students can register, upload documents, apply for scholarships, and receive email notifications — all from a single dashboard.

🚀 Live Demo

Coming soon — deploy via Railway / Render / Vercel


🛠 Tech Stack
LayerTechnologyRuntimeNode.js (CommonJS)FrameworkExpress.js v5DatabaseMongoDB (via Mongoose) + In-Memory DB (mongodb-memory-server)AI EngineOpenAI API (GPT models)Schedulernode-cronEmailNodemailerFile UploadMulterAuth/ConfigdotenvCORScorsFrontendHTML5, CSS3, Vanilla JavaScript

✨ Features

🤖 AI-Powered Scholarship Matching — Uses OpenAI to intelligently recommend scholarships based on student profiles
📋 Student Registration & Profiles — Students can create accounts and fill in academic details
📄 Document Upload — Supports uploading academic certificates and ID proofs via Multer
📧 Email Notifications — Automated email alerts for application status updates via Nodemailer
⏰ Scheduled Tasks — Cron jobs to send reminders and update scholarship deadlines automatically
🏫 NIRF College Dataset — Integrated Indian college ranking data (NIRF) for eligibility validation
🗂 RESTful API — Clean, modular backend with MVC architecture
💾 In-Memory DB for Testing — Uses mongodb-memory-server for seamless local testing without a live MongoDB instance






⚙️ How It Works

Student Registration — A student fills in their profile (name, college, marks, income, category).
AI Matching — OpenAI processes the profile and recommends relevant scholarships from the database.
Application Submission — Student submits an application with supporting documents (uploaded via Multer).
Admin Review — Applications are reviewed and status is updated (approved/rejected).
Email Notification — Nodemailer sends an email to the student with the decision.
Cron Jobs — Scheduled tasks run daily to remind students of upcoming deadlines.


🔧 Installation & Setup
Prerequisites

Node.js >= 18.x
npm >= 9.x
MongoDB (optional — in-memory DB is used by default for local dev)


🔐 Environment Variables
Create a .env file in the root directory with the following keys:
envPORT=3000
MONGO_URI=mongodb://localhost:27017/scholarships
OPENAI_API_KEY=your_openai_api_key_here
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password_here

⚠️ Note: Never commit your .env file. It's already in .gitignore (or should be).

🏆 Advantages

✅ No manual shortlisting — AI does the scholarship matching automatically
✅ Scalable architecture — MVC pattern makes it easy to extend
✅ Real India-specific data — NIRF dataset ensures accurate college-based eligibility
✅ Email automation — Students stay informed without admin manual effort
✅ Developer friendly — In-memory MongoDB means zero DB setup for local development
✅ Modular codebase — Separate controllers, models, routes, and utils for clean maintainability


📊 Dataset
The project includes the Indian Colleges & Universities NIRF Dataset (Indian_Colleges_Universities_NIRF_Dataset.xlsx), which contains:

College names and locations
NIRF rankings by year and category
Type of institution (IIT, NIT, Private, Government, etc.)

This data is used to validate student eligibility for rank-based scholarship programs.

🤝 Contributing
Contributions are welcome! Please follow these steps:

Fork the repository
Create a new branch: git checkout -b feature/your-feature-name
Commit your changes: git commit -m 'Add some feature'
Push to the branch: git push origin feature/your-feature-name
Open a Pull Request


📄 License
This project is licensed under the ISC License — see the LICENSE file for details.

👨‍💻 Author
Risheekesh Singh
GitHub: @risheekeshsingh
