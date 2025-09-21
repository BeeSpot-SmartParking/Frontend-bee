# 🅿️ Been spot– Algeria  

## 📖 Overview  
The **Smart Parking System** is a modern solution designed to solve Algeria’s growing parking challenges. It leverages **IoT, Computer Vision, and AI** to automate parking spot detection, vehicle matricule recognition, and enable seamless **online payments**.  

By integrating with **Guidini Pay** and **Google APIs**, the system ensures a smart, secure, and user-friendly experience for both drivers and parking managers.  

---

## 🚗 Problem Statement  
Parking in Algeria suffers from:  
- Lack of real-time availability information.  
- Manual and inefficient management of parking spots.  
- No integration with modern digital payment methods.  
- Limited adoption of IoT and AI in transportation infrastructure.  

Our system addresses these issues by combining **computer vision, IoT devices, and cloud-based services** into a single platform.  

---

## ✨ Key Features  
- 🎥 **Vehicle Plate Recognition** using **OpenCV** and a trained model with **20,000+ images**.  
- 📡 **IoT Integration** for smart sensors to track spot availability.  
- 🖥️ **Web Dashboard** for users, companies, and admins.  
- 💳 **Seamless Payments** with **Guidini Pay** and other online methods.  
- 🌍 **Google Maps API Integration** to guide drivers to the nearest available spot.  
- 📊 **Analytics & Reports** for parking companies and admins.  

---

## 🛠️ Tech Stack  

**Frontend:**  
- [Next.js](https://nextjs.org/) (React-based, modern UI)  
- [TailwindCSS](https://tailwindcss.com/) (styling)  

**Backend:**  
- [Express.js](https://expressjs.com/) (Node.js API)  
- [Flask](https://flask.palletsprojects.com/) (Computer Vision + AI model service)  

**AI & Computer Vision:**  
- [OpenCV](https://opencv.org/)  
- Trained custom model for vehicle matricule detection.  

**Integrations:**  
- Guidini Pay (online payments in Algeria).  
- Google Maps API (smart navigation and location).  

**Database:**  
- MySQL / PostgreSQL (for reservations, payments, and analytics).  

---

## 📐 System Architecture  
```mermaid
flowchart TD
  A[Camera / IoT Device] -->|Matricule Image| B[Flask + OpenCV AI Model]
  B -->|Recognized Plate| C[Express.js API]
  C -->|Data Storage| D[(Database)]
  C -->|Spot Availability & Payment| E[Next.js Frontend]
  E -->|User Interaction| F[Drivers / Companies / Admins]
  C -->|Payments| G[Guidini Pay API]
  E -->|Maps Integration| H[Google Maps API]
