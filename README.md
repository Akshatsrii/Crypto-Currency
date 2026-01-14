<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=12,14,18&height=200&section=header&text=CryptoVerse&fontSize=80&fontColor=fff&animation=fadeIn&fontAlignY=38&desc=Cryptocurrency%20Exchange%20Platform&descAlignY=55&descAlign=50" width="100%">
</p>

<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&customColorList=12,14,18,20&height=3" width="100%">
</p>

# 🚀 CryptoVerse - Cryptocurrency Exchange Platform

A modern, fully animated cryptocurrency exchange landing page with live price tracking powered by the CoinGecko API.

![CryptoVerse](https://img.shields.io/badge/CryptoVerse-v1.0-orange)
![License](https://img.shields.io/badge/license-MIT-blue)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## ✨ Features

### 💰 Live Cryptocurrency Prices
- Real-time price tracking for **Bitcoin**, **Ethereum**, and **Dogecoin**
- 24-hour price change percentages with color-coded indicators
- Auto-refresh every 30 seconds
- Powered by **CoinGecko API** (free tier)

### 🎨 Modern UI/UX Design
- Sleek gradient animations
- Glass morphism effects
- Smooth scroll navigation
- Responsive design for all devices
- Interactive hover effects
- Floating particle animations

### 📊 Feature Sections
- **Hero Section** - Eye-catching landing with live crypto prices
- **Features Grid** - 6 key features with animated icons
- **Statistics Counter** - Animated numbers showing platform stats
- **About Section** - Company information
- **Newsletter** - Email subscription form
- **Footer** - Comprehensive links and contact information

### 🔥 Advanced Animations
- Gradient background shifts
- Fade-in/slide-in effects
- 3D card transforms
- Glow effects on text
- Rotating elements
- Magnetic hover effects on coins
- Ripple click animations

## 🛠️ Technologies Used

| Technology | Purpose |
|------------|---------|
| **HTML5** | Structure and semantic markup |
| **CSS3** | Styling, animations, and responsive design |
| **JavaScript (ES6+)** | Interactivity and API integration |
| **CoinGecko API** | Live cryptocurrency price data |
| **Google Fonts** | Poppins font family |

## 📡 API Integration

### CoinGecko API
This project uses the **[CoinGecko API](https://www.coingecko.com/en/api)** to fetch live cryptocurrency data.

**API Endpoint Used:**
```javascript
https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,dogecoin&vs_currencies=usd&include_24hr_change=true
```

**Features:**
- ✅ Free to use (no API key required)
- ✅ Real-time price data
- ✅ 24-hour price change percentage
- ✅ Multiple cryptocurrency support
- ✅ Reliable and fast

**Rate Limits:**
- Free tier: 10-50 calls/minute
- Our implementation: Updates every 30 seconds (well within limits)

**Fallback System:**
- If API is unavailable, displays cached/fallback prices
- Automatic reconnection when network is restored
- Error handling to prevent crashes

## 📁 Project Structure

```
cryptoverse/
│
├── index.html              # Main HTML file
├── enhanced-styles.css     # Complete CSS with animations
├── script.js               # JavaScript with API integration
├── README.md               # Project documentation
│
└── images/                 # Image assets folder
    ├── background.png      # Hero background image
    ├── logo.png            # Logo image
    ├── bitcoin.png         # Bitcoin icon
    ├── ethereum.png        # Ethereum icon
    └── dogecoin.png        # Dogecoin icon
```



## 🌟 Features Breakdown

### 1. Live Price Updates
- Fetches data from CoinGecko API
- Updates every 30 seconds
- Shows percentage change with color indicators
- Smooth animation on price updates

### 2. Animated Statistics
- Counter animations on scroll
- Intersection Observer for performance
- Formatted numbers (K, M, B notation)

### 3. Newsletter Subscription
- Form validation
- Success feedback animation
- Email input field

### 4. Smooth Navigation
- Anchor link scrolling
- Sticky navbar
- Dynamic navbar background on scroll

### 5. Interactive Elements
- Magnetic hover effect on coins
- 3D card transforms
- Ripple click effects
- Floating background particles

## 📝 To-Do List

- [ ] Add more cryptocurrencies (Cardano, Solana, etc.)
- [ ] Implement price charts using Chart.js
- [ ] Add dark/light mode toggle
- [ ] Create user authentication system
- [ ] Add trading functionality
- [ ] Implement wallet integration
- [ ] Add more language support
- [ ] Create mobile app version

## 🙏 Acknowledgments

- **CoinGecko** - For providing free cryptocurrency API
- **Google Fonts** - For the Poppins font family
- **Community** - For feedback and suggestions

>

<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=12,14,18&height=120&section=footer" width="100%">
</p>
