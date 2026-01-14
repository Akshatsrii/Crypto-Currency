document.addEventListener('DOMContentLoaded', function() {
  
  const formatNumber = (num) => {
    if (num >= 1000000000) {
      return '$' + (num / 1000000000).toFixed(1) + 'B';
    } else if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(0) + 'K';
    }
    return num.toString();
  };

  const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        element.textContent = formatNumber(target);
        clearInterval(timer);
      } else {
        element.textContent = formatNumber(Math.floor(start));
      }
    }, 16);
  };

  const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -100px 0px'
  };

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counters = document.querySelectorAll('.stat-number');
        counters.forEach(counter => {
          const target = parseInt(counter.getAttribute('data-target'));
          animateCounter(counter, target);
        });
        statsObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const statsSection = document.querySelector('.stats');
  if (statsSection) {
    statsObserver.observe(statsSection);
  }

  const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-visible');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.feature-card, .about-content, .about-image').forEach(el => {
    fadeInObserver.observe(el);
  });

  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = this.querySelector('input[type="email"]').value;
      
      const submitButton = this.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;
      submitButton.textContent = 'Subscribing...';
      submitButton.style.opacity = '0.7';
      
      setTimeout(() => {
        submitButton.textContent = '✓ Subscribed!';
        submitButton.style.background = 'linear-gradient(90deg, #4CAF50, #45a049)';
        
        setTimeout(() => {
          submitButton.textContent = originalText;
          submitButton.style.background = '';
          submitButton.style.opacity = '1';
          this.reset();
        }, 2000);
      }, 1000);
    });
  }

  const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
  smoothScrollLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const offsetTop = targetElement.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  const fetchCryptoPrices = async () => {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,dogecoin&vs_currencies=usd&include_24hr_change=true');
      
      if (!response.ok) {
        throw new Error('API request failed');
      }
      
      const data = await response.json();
      
      updateCryptoPrice('btc-price', data.bitcoin, 'Bitcoin');
      updateCryptoPrice('eth-price', data.ethereum, 'Ethereum');
      updateCryptoPrice('doge-price', data.dogecoin, 'Dogecoin');
      
      console.log('✅ Live crypto prices updated successfully');
    } catch (error) {
      console.warn(' Could not fetch live prices, using fallback data');
      
      updateCryptoPrice('btc-price', { usd: 95432, usd_24h_change: 2.5 }, 'Bitcoin');
      updateCryptoPrice('eth-price', { usd: 3245, usd_24h_change: 1.8 }, 'Ethereum');
      updateCryptoPrice('doge-price', { usd: 0.0842, usd_24h_change: -0.5 }, 'Dogecoin');
    }
  };

  const updateCryptoPrice = (elementId, cryptoData, name) => {
    const priceElement = document.getElementById(elementId);
    if (!priceElement || !cryptoData) return;
    
    const price = cryptoData.usd;
    const change = cryptoData.usd_24h_change || 0;
    
    let formattedPrice;
    if (price < 1) {
      formattedPrice = '$' + price.toFixed(4);
    } else if (price < 100) {
      formattedPrice = '$' + price.toFixed(2);
    } else {
      formattedPrice = '$' + price.toLocaleString('en-US', { 
        minimumFractionDigits: 0,
        maximumFractionDigits: 0 
      });
    }
    
    const changeColor = change >= 0 ? '#4CAF50' : '#f44336';
    const changeSymbol = change >= 0 ? '▲' : '▼';
    const changeText = `<span style="color: ${changeColor}; font-size: 12px; margin-left: 5px;">${changeSymbol} ${Math.abs(change).toFixed(2)}%</span>`;
    
    priceElement.innerHTML = formattedPrice + changeText;
    priceElement.setAttribute('data-crypto', name);
    priceElement.setAttribute('data-price', price);
    
    priceElement.style.animation = 'priceUpdate 0.5s ease';
    setTimeout(() => {
      priceElement.style.animation = '';
    }, 500);
  };

  const style = document.createElement('style');
  style.textContent = `
    @keyframes priceUpdate {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); color: #ffb400; }
      100% { transform: scale(1); }
    }
    
    @keyframes float {
      0%, 100% {
        transform: translate(0, 0) scale(1);
        opacity: 0.3;
      }
      50% {
        transform: translate(50px, -50px) scale(1.2);
        opacity: 0.6;
      }
    }
    
    .fade-in-visible {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(style);

  fetchCryptoPrices();
  
  setInterval(fetchCryptoPrices, 30000);

  window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 100) {
      nav.style.background = 'rgba(0, 0, 0, 0.9)';
      nav.style.backdropFilter = 'blur(10px)';
      nav.style.padding = '15px 0';
      nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
    } else {
      nav.style.background = 'transparent';
      nav.style.backdropFilter = 'none';
      nav.style.padding = '20px 0';
      nav.style.boxShadow = 'none';
    }
  });

  const createFloatingElements = () => {
    const container = document.querySelector('.container');
    if (!container) return;

    for (let i = 0; i < 5; i++) {
      const floater = document.createElement('div');
      floater.className = 'floating-element';
      floater.style.cssText = `
        position: absolute;
        width: ${Math.random() * 100 + 50}px;
        height: ${Math.random() * 100 + 50}px;
        background: radial-gradient(circle, rgba(255, 180, 0, 0.1), transparent);
        border-radius: 50%;
        top: ${Math.random() * 100}%;
        left: ${Math.random() * 100}%;
        animation: float ${Math.random() * 10 + 10}s ease-in-out infinite;
        pointer-events: none;
        z-index: 0;
      `;
      container.appendChild(floater);
    }
  };

  createFloatingElements();

  const coins = document.querySelectorAll('.coin');
  coins.forEach((coin, index) => {
    coin.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px) scale(1.05) rotate(' + (Math.random() * 4 - 2) + 'deg)';
    });
    
    coin.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1) rotate(0deg)';
    });
  });

  const featureCards = document.querySelectorAll('.feature-card');
  featureCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      const icon = this.querySelector('.feature-icon');
      if (icon) {
        icon.style.transform = 'scale(1.15) rotate(10deg)';
      }
    });
    
    card.addEventListener('mouseleave', function() {
      const icon = this.querySelector('.feature-icon');
      if (icon) {
        icon.style.transform = 'scale(1) rotate(0deg)';
      }
    });
  });

  let lastMouseX = 0;
  let lastMouseY = 0;
  let mouseTimeout;

  document.addEventListener('mousemove', (e) => {
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
    
    clearTimeout(mouseTimeout);
    mouseTimeout = setTimeout(() => {
      const coins = document.querySelectorAll('.coin img');
      coins.forEach(coin => {
        const rect = coin.getBoundingClientRect();
        const x = lastMouseX - rect.left - rect.width / 2;
        const y = lastMouseY - rect.top - rect.height / 2;
        const distance = Math.sqrt(x * x + y * y);
        
        if (distance < 200) {
          const angle = Math.atan2(y, x);
          const offsetX = Math.cos(angle) * (200 - distance) * 0.1;
          const offsetY = Math.sin(angle) * (200 - distance) * 0.1;
          coin.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        } else {
          coin.style.transform = 'translate(0, 0)';
        }
      });
    }, 10);
  });

  const addClickAnimation = () => {
    const btns = document.querySelectorAll('.btn');
    btns.forEach(btn => {
      btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.style.cssText = `
          position: absolute;
          width: 20px;
          height: 20px;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 50%;
          transform: translate(-50%, -50%) scale(0);
          animation: ripple 0.6s ease-out;
          pointer-events: none;
        `;
        
        const rect = this.getBoundingClientRect();
        ripple.style.left = (e.clientX - rect.left) + 'px';
        ripple.style.top = (e.clientY - rect.top) + 'px';
        
        this.style.position = 'relative';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
      });
    });
    
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
      @keyframes ripple {
        to {
          transform: translate(-50%, -50%) scale(20);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(rippleStyle);
  };

  addClickAnimation();

  const addCryptoTooltips = () => {
    const coinElements = document.querySelectorAll('.coin');
    
    coinElements.forEach(coin => {
      coin.addEventListener('mouseenter', function() {
        const priceElement = this.querySelector('h3');
        const cryptoName = priceElement.getAttribute('data-crypto');
        const price = priceElement.getAttribute('data-price');
        
        if (cryptoName && price) {
          this.setAttribute('title', `${cryptoName}: $${parseFloat(price).toLocaleString()}`);
        }
      });
    });
  };

  setTimeout(addCryptoTooltips, 1000);

  const logWelcomeMessage = () => {
    console.log('%c CryptoVerse Platform Loaded', 'color: #ffb400; font-size: 20px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);');
    console.log('%c Live Crypto Prices Enabled', 'color: #4CAF50; font-size: 14px;');
    console.log('%c Data updates every 30 seconds', 'color: #2196F3; font-size: 12px;');
    console.log('% Powered by CoinGecko API', 'color: #FF9800; font-size: 12px;');
  };

  logWelcomeMessage();

  window.addEventListener('online', () => {
    console.log('Connection restored - fetching latest prices...');
    fetchCryptoPrices();
  });

  window.addEventListener('offline', () => {
    console.log('Connection lost - using cached prices');
  });
});