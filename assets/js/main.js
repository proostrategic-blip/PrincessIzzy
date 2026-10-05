/**
 * Princess Izzy — Variation 2 Core JavaScript
 * $90,000 Haute Minimalist Luxury Editorial Experience
 */
(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // UTILITIES
  // --------------------------------------------------------------------------
  const getEl = (sel, ctx = document) => ctx.querySelector(sel);
  const getEls = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const on = (el, type, handler, opts) => el && el.addEventListener(type, handler, opts);

  // --------------------------------------------------------------------------
  // 1. AGE GATE (18+ Strict Verification)
  // --------------------------------------------------------------------------
  const initAgeGate = () => {
    const gate = getEl('#age-gate');
    if (!gate) return;

    const TTL_DAYS = 30;
    const enterBtn = getEl('[data-age-enter]', gate);
    const exitBtn = getEl('[data-age-exit]', gate);
    const gatePanel = getEl('.age-gate__panel', gate);
    const gateImages = [
      'princess-izzy-05-face-card-unmatched.webp',
      'princess-izzy-43-paid-princess.webp',
      'princess-izzy-20-please-your-princess.webp',
      'princess-izzy-09-russian-allure.webp',
      'princess-izzy-15-soft-soles.webp'
    ];
    let gateImageIndex = 0;
    const setGateImage = () => {
      if (!gatePanel) return;
      const file = gateImages[gateImageIndex];
      gatePanel.style.setProperty('--age-gate-image', `url("../img/${file}")`);
      gatePanel.style.backgroundImage = `linear-gradient(180deg, rgba(10, 10, 11, 0.12) 0%, rgba(10, 10, 11, 0.48) 40%, rgba(10, 10, 11, 0.92) 70%, rgba(10, 10, 11, 0.98) 100%), url("assets/img/${file}")`;
    };
    setGateImage();
    const gateImageTimer = window.setInterval(() => {
      gateImageIndex = (gateImageIndex + 1) % gateImages.length;
      setGateImage();
    }, 6000);

    const isVerified = () => {
      try {
        const stored = localStorage.getItem('izzy_age_verified_v1') || localStorage.getItem('venia_age_verified_v1') || localStorage.getItem('venia_age_verified_v1_backup');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Date.now() < parsed.expiry) return true;
          localStorage.removeItem('izzy_age_verified_v1');
          localStorage.removeItem('venia_age_verified_v1');
          localStorage.removeItem('venia_age_verified_v1_backup');
        }
      } catch (e) {}
      return document.cookie.indexOf('izzy_age_verified_v1=1') !== -1 || document.cookie.indexOf('venia_age_verified_v1=1') !== -1 || document.cookie.indexOf('venia_age_verified_v1_backup=1') !== -1;
    };

    if (isVerified()) {
      document.documentElement.classList.add('age-verified');
      gate.hidden = true;
      window.clearInterval(gateImageTimer);
      return;
    }

    on(enterBtn, 'click', () => {
      const expiry = Date.now() + TTL_DAYS * 24 * 60 * 60 * 1000;
      try {
        localStorage.setItem('izzy_age_verified_v1', JSON.stringify({ verified: true, expiry }));
      } catch (e) {}
      document.cookie = `izzy_age_verified_v1=1; max-age=${TTL_DAYS * 86400}; path=/; SameSite=Lax`;
      document.documentElement.classList.add('age-verified');
      gate.hidden = true;
      window.clearInterval(gateImageTimer);
    });

    on(exitBtn, 'click', () => {
      window.clearInterval(gateImageTimer);
      window.location.href = 'https://www.google.com';
    });
  };

  // --------------------------------------------------------------------------
  // 2. NAVIGATION & SCROLLSPY
  // --------------------------------------------------------------------------
  const initNav = () => {
    const drawer = getEl('#nav-drawer');
    const openBtn = getEl('[data-nav-open]');
    const closeBtn = getEl('[data-nav-close]');
    const drawerLinks = getEls('.nav-drawer__nav a');
    const navLinks = getEls('.desktop-nav a');

    // Mobile drawer toggle
    const toggleDrawer = (open) => {
      if (open) {
        drawer?.classList.add('is-open');
        document.body.style.overflow = 'hidden';
      } else {
        drawer?.classList.remove('is-open');
        document.body.style.overflow = '';
      }
    };

    on(openBtn, 'click', () => toggleDrawer(true));
    on(closeBtn, 'click', () => toggleDrawer(false));
    drawerLinks.forEach((link) => on(link, 'click', () => toggleDrawer(false)));

    on(document, 'keydown', (e) => {
      if (e.key === 'Escape' && drawer?.classList.contains('is-open')) {
        toggleDrawer(false);
      }
    });

    // Scrollspy
    const sections = getEls('section[id]');
    const handleScrollSpy = () => {
      const scrollY = window.scrollY + 140;
      sections.forEach((sec) => {
        const top = sec.offsetTop;
        const height = sec.offsetHeight;
        const id = sec.getAttribute('id');
        if (scrollY >= top && scrollY < top + height) {
          navLinks.forEach((link) => {
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('is-active');
            } else {
              link.classList.remove('is-active');
            }
          });
        }
      });
    };

    on(window, 'scroll', handleScrollSpy, { passive: true });
  };

  // --------------------------------------------------------------------------
  // 3. TOAST NOTIFICATION & ONE-CLICK CLIPBOARD COPIER
  // --------------------------------------------------------------------------
  let toastTimer;
  const showToast = (text) => {
    let toast = getEl('#toast-msg');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast-msg';
      toast.className = 'toast-msg';
      toast.setAttribute('role', 'status');
      toast.setAttribute('aria-live', 'polite');
      document.body.appendChild(toast);
    }
    toast.textContent = text;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('is-visible');
    }, 2800);
  };

  const initTributeCopier = () => {
    const copyChips = getEls('[data-copy-tag]');
    copyChips.forEach((chip) => {
      on(chip, 'click', () => {
        const text = chip.dataset.copyTag;
        if (!text) return;
        navigator.clipboard.writeText(text).then(() => {
          showToast(`Copied ${text} — now send it`);
        }).catch(() => {
          showToast(`Handle: ${text}`);
        });
      });
    });
  };

  // --------------------------------------------------------------------------
  // 4. BOOKING SYSTEM & X (TWITTER) DM ROUTING
  // --------------------------------------------------------------------------
  // --------------------------------------------------------------------------
  // 4. ADVANCED BOOKING SYSTEM & LIVE DEPOSIT CALCULATOR
  // --------------------------------------------------------------------------
  const initBookingSystem = () => {
    const form = getEl('#booking-form');
    const successBanner = getEl('#booking-success');
    if (!form) return;

    // Interactive Add-on Chips & Live Calculator
    const serviceSelect = getEl('#book-service', form);
    const addonCheckboxes = form.querySelectorAll('.addon-chip input[type="checkbox"]');

    const updateCalculator = () => {
      const selectedOption = serviceSelect ? serviceSelect.options[serviceSelect.selectedIndex] : null;
      const basePrice = parseInt(selectedOption?.getAttribute('data-price') || '450', 10);
      const serviceName = selectedOption ? selectedOption.text.split('(')[0].trim() : 'Standard Domination';

      let addonTotal = 0;
      const selectedAddons = [];
      addonCheckboxes.forEach((checkbox) => {
        const chip = checkbox.closest('.addon-chip');
        if (checkbox.checked) {
          chip?.classList.add('is-active');
          const price = parseInt(checkbox.getAttribute('data-addon-price') || '0', 10);
          addonTotal += price;
          selectedAddons.push(checkbox.value);
        } else {
          chip?.classList.remove('is-active');
        }
      });

      const grandTotal = basePrice + addonTotal;
      const depositDue = Math.round(grandTotal * 0.5);

      const totalDisplay = getEl('#calc-total-display', form);
      const depositDisplay = getEl('#calc-deposit-display', form);
      const summaryText = getEl('#calc-summary-text', form);

      if (totalDisplay) {
        totalDisplay.textContent = `${grandTotal}€`;
        totalDisplay.style.transform = 'scale(1.06)';
        setTimeout(() => { totalDisplay.style.transform = 'scale(1)'; }, 140);
      }
      if (depositDisplay) {
        depositDisplay.textContent = `${depositDue}€`;
        depositDisplay.style.transform = 'scale(1.06)';
        setTimeout(() => { depositDisplay.style.transform = 'scale(1)'; }, 140);
      }
      if (summaryText) {
        summaryText.textContent = selectedAddons.length > 0
          ? `${serviceName} + ${selectedAddons.length} Add-on${selectedAddons.length > 1 ? 's' : ''}`
          : serviceName;
      }

      const hiddenTotal = getEl('#calc-hidden-total', form);
      const hiddenDeposit = getEl('#calc-hidden-deposit', form);
      const hiddenAddons = getEl('#calc-hidden-addons', form);
      if (hiddenTotal) hiddenTotal.value = `${grandTotal}€`;
      if (hiddenDeposit) hiddenDeposit.value = `${depositDue}€`;
      if (hiddenAddons) hiddenAddons.value = selectedAddons.length > 0 ? selectedAddons.join(', ') : 'None';
    };

    if (serviceSelect) {
      on(serviceSelect, 'change', updateCalculator);
    }

    addonCheckboxes.forEach((checkbox) => {
      on(checkbox, 'change', updateCalculator);
    });

    // Run once on load
    updateCalculator();

    // Form Submission & Validation with Emil Kowalski Micro-Animations
    on(form, 'submit', (e) => {
      e.preventDefault();

      const requiredInputs = form.querySelectorAll('[required]');
      let firstInvalid = null;

      requiredInputs.forEach((input) => {
        input.classList.remove('form-field-invalid');
        const isCheckbox = input.type === 'checkbox';
        const isBlank = isCheckbox ? !input.checked : !input.value.trim();

        if (isBlank) {
          input.classList.add('form-field-invalid');
          setTimeout(() => input.classList.remove('form-field-invalid'), 900);
          if (!firstInvalid) firstInvalid = input;
        }
      });

      if (firstInvalid) {
        firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstInvalid.focus();
        showToast('Please complete all required fields and accept boundaries.');
        return;
      }

      const btn = getEl('#btn-submit-booking', form);
      if (btn) btn.classList.add('is-submitting');

      // Construct readable summary for devotion brief & email
      const formData = new FormData(form);
      const email = formData.get('email') || '';
      const telegram = formData.get('telegram') || '';
      const alias = formData.get('alias') || 'Anonymous Devotee';
      const location = formData.get('location') || '';
      const date = formData.get('preferred_date') || '';
      const time = formData.get('preferred_time') || '';
      const altTime = formData.get('alt_date_time') || 'None';
      const sessionType = formData.get('session_type') || '';
      const addons = formData.get('selected_addons') || 'None';
      const total = formData.get('estimated_total') || '';
      const deposit = formData.get('mandatory_deposit') || '';
      const paymentMethod = formData.get('deposit_payment_method') || '';
      const vision = formData.get('session_vision') || '';

      const briefText = `👑 PRINCESS IZZY — OFFICIAL SESSION REQUEST
========================================
• Devotee: ${alias}
• Email: ${email}
• Telegram: ${telegram}
• Location / City: ${location}
• Preferred Date & Time: ${date} at ${time}
• Alternative Time: ${altTime}
----------------------------------------
• Requested Session: ${sessionType}
• Selected Add-ons: ${addons}
• Estimated Total Cost: ${total}
• Mandatory 50% Deposit: ${deposit}
• Deposit Payment Channel: ${paymentMethod}
----------------------------------------
• Desires & Fetishes:
${vision}
----------------------------------------
✓ Boundaries & 50% deposit policy acknowledged.`;

      // Copy brief to devotee's clipboard automatically
      if (navigator.clipboard) {
        navigator.clipboard.writeText(briefText).catch(() => {});
      }

      // Send to FormSubmit AJAX endpoint (Delivers directly to izzyb29092@gmail.com)
      const payload = {
        _subject: `👑 New Session Booking: ${alias} (${location})`,
        Email: email,
        Telegram: telegram,
        Alias: alias,
        Location: location,
        Preferred_Date: date,
        Preferred_Time: time,
        Alternative_Time: altTime,
        Session_Type: sessionType,
        Selected_Addons: addons,
        Estimated_Total: total,
        Mandatory_50pct_Deposit: deposit,
        Payment_Method: paymentMethod,
        Session_Desires: vision,
        Terms_Agreed: "YES - All boundaries & 50% deposit accepted"
      };

      fetch('https://formsubmit.co/ajax/izzyb29092@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      .then((res) => res.json())
      .then(() => {
        showToast('👑 Request submitted to Princess Izzy.');
      })
      .catch(() => {
        showToast('Request recorded & copied to clipboard.');
      })
      .finally(() => {
        if (btn) btn.classList.remove('is-submitting');
        if (successBanner) {
          successBanner.style.display = 'block';
          successBanner.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      });
    });
  };

  // --------------------------------------------------------------------------
  // 5. HERO CURATED IMAGE RANDOM SWITCHER (10s Intervals)
  // --------------------------------------------------------------------------
  const initHeroImageSwitcher = () => {
    const primaryImg = getEl('#heroPrimaryImg');
    const secondaryImg = getEl('#heroSecondaryImg');
    if (!primaryImg || !secondaryImg) return;

    // The curated images specified
    const images = [
      'assets/img/princess-izzy-05-face-card-unmatched.webp',
      'assets/img/princess-izzy-43-paid-princess.webp',
      'assets/img/princess-izzy-20-please-your-princess.webp',
      'assets/img/princess-izzy-09-russian-allure.webp',
      'assets/img/princess-izzy-11-pink-long-toes.webp',
      'assets/img/princess-izzy-15-soft-soles.webp',
      'assets/img/princess-izzy-23-sweet-indulgence.webp',
      'assets/img/princess-izzy-27-sensory-treat.webp',
      'assets/img/princess-izzy-33-arch-perfection.webp',
      'assets/img/princess-izzy-38-human-furniture.webp',
      'assets/img/princess-izzy-46-hotel-retreat.webp',
      'assets/img/princess-izzy-50-luxury-blonde.webp'
    ];

    // Preload all 12 images into memory for instant, zero-flicker transitions
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    let currentIndex = 0; // Starts at princess-izzy-05-face-card-unmatched.webp
    let isShowingPrimary = true;
    let timer = null;

    const getNextRandomIndex = () => {
      let nextIndex = currentIndex;
      while (nextIndex === currentIndex && images.length > 1) {
        nextIndex = Math.floor(Math.random() * images.length);
      }
      return nextIndex;
    };

    const switchImage = () => {
      if (document.hidden) return;

      const nextIndex = getNextRandomIndex();
      currentIndex = nextIndex;
      const nextSrc = images[nextIndex];

      const activeLayer = isShowingPrimary ? primaryImg : secondaryImg;
      const incomingLayer = isShowingPrimary ? secondaryImg : primaryImg;

      // Prepare incoming image
      incomingLayer.src = nextSrc;
      incomingLayer.classList.add('is-incoming');

      // Seamless crossfade transition
      requestAnimationFrame(() => {
        incomingLayer.classList.add('is-active');
        setTimeout(() => {
          activeLayer.classList.remove('is-active', 'is-incoming');
          incomingLayer.classList.remove('is-incoming');
          isShowingPrimary = !isShowingPrimary;
        }, 1400);
      });
    };

    // Run random switch every 10 seconds (10,000ms)
    timer = setInterval(switchImage, 10000);

    // Pause timer when tab is inactive, resume on active
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        clearInterval(timer);
      } else {
        clearInterval(timer);
        timer = setInterval(switchImage, 10000);
      }
    });
  };

  // --------------------------------------------------------------------------
  // 6. GALLERY FRAME ROTATOR (6.5s Interval, Random Fade-In / Fade-Out)
  // --------------------------------------------------------------------------
  const initGalleryFrameRotator = () => {
    const rail = getEl('#galleryRail');
    if (!rail) return;

    const frames = getEls('.photo-tile', rail);
    if (!frames.length) return;

    const galleryPool = [
      { id: '01', title: 'Princess Cat', src: 'assets/img/princess-izzy-01-russian-cat.webp' },
      { id: '02', title: 'Bare Natural Toenails', src: 'assets/img/princess-izzy-02-bare-natural-toenails.webp' },
      { id: '03', title: 'Whatever She Desires', src: 'assets/img/princess-izzy-03-desire-look.webp' },
      { id: '04', title: 'Pure Allure', src: 'assets/img/princess-izzy-04-pure-allure.webp' },
      { id: '05', title: 'Face Card Unmatched', src: 'assets/img/princess-izzy-05-face-card-unmatched.webp' },
      { id: '06', title: 'Front Or Back', src: 'assets/img/princess-izzy-06-front-or-back.webp' },
      { id: '07', title: 'Behind The Scenes', src: 'assets/img/princess-izzy-07-behind-the-scenes.webp' },
      { id: '08', title: 'Give Them A Kiss', src: 'assets/img/princess-izzy-08-kiss-soles.webp' },
      { id: '09', title: 'Russian Allure', src: 'assets/img/princess-izzy-09-russian-allure.webp' },
      { id: '10', title: 'Femdom Gala', src: 'assets/img/princess-izzy-10-femdom-gala.webp' },
      { id: '11', title: 'Pink Long Toes', src: 'assets/img/princess-izzy-11-pink-long-toes.webp' },
      { id: '12', title: 'Mountain Of Devotion', src: 'assets/img/princess-izzy-12-mountain-devotion.webp' },
      { id: '13', title: 'Besties VIP', src: 'assets/img/princess-izzy-13-besties-vip.webp' },
      { id: '14', title: 'Golden Hour', src: 'assets/img/princess-izzy-14-golden-hour.webp' },
      { id: '15', title: 'Soft Soles', src: 'assets/img/princess-izzy-15-soft-soles.webp' },
      { id: '16', title: 'Perfect Head To Toe', src: 'assets/img/princess-izzy-16-perfect-head-to-toe.webp' },
      { id: '17', title: 'Flawless Form', src: 'assets/img/princess-izzy-17-flawless-form.webp' },
      { id: '18', title: 'Perfect Timing', src: 'assets/img/princess-izzy-18-perfect-timing.webp' },
      { id: '19', title: 'Say It Back', src: 'assets/img/princess-izzy-19-say-it-back.webp' },
      { id: '20', title: 'Please Your Princess', src: 'assets/img/princess-izzy-20-please-your-princess.webp' },
      { id: '21', title: 'Daily Reminder', src: 'assets/img/princess-izzy-21-daily-reminder.webp' },
      { id: '22', title: 'Direct Control', src: 'assets/img/princess-izzy-22-direct-control.webp' },
      { id: '23', title: 'Sweet Indulgence', src: 'assets/img/princess-izzy-23-sweet-indulgence.webp' },
      { id: '24', title: 'Submissive View', src: 'assets/img/princess-izzy-24-submissive-view.webp' },
      { id: '25', title: 'White Pedicure', src: 'assets/img/princess-izzy-25-white-pedicure.webp' },
      { id: '26', title: 'Bedroom Queen', src: 'assets/img/princess-izzy-26-bedroom-queen.webp' },
      { id: '27', title: 'Sensory Treat', src: 'assets/img/princess-izzy-27-sensory-treat.webp' },
      { id: '28', title: 'Exclusive Lounge', src: 'assets/img/princess-izzy-28-exclusive-lounge.webp' },
      { id: '29', title: 'Behind The Lens', src: 'assets/img/princess-izzy-29-behind-the-lens.webp' },
      { id: '30', title: 'Pretty Feet', src: 'assets/img/princess-izzy-30-pretty-feet.webp' },
      { id: '31', title: 'Mirror Selfie', src: 'assets/img/princess-izzy-31-mirror-selfie.webp' },
      { id: '32', title: 'Studio Light', src: 'assets/img/princess-izzy-32-studio-light.webp' },
      { id: '33', title: 'Arch Perfection', src: 'assets/img/princess-izzy-33-arch-perfection.webp' },
      { id: '34', title: 'Worship Me', src: 'assets/img/princess-izzy-34-worship-me.webp' },
      { id: '35', title: 'Sensory Overload', src: 'assets/img/princess-izzy-35-sensory-overload.webp' },
      { id: '36', title: 'Hump Day Soles', src: 'assets/img/princess-izzy-36-hump-day-soles.webp' },
      { id: '37', title: 'Private Suite', src: 'assets/img/princess-izzy-37-private-suite.webp' },
      { id: '38', title: 'Human Furniture', src: 'assets/img/princess-izzy-38-human-furniture.webp' },
      { id: '39', title: 'Leather Lace', src: 'assets/img/princess-izzy-39-leather-lace.webp' },
      { id: '40', title: 'Sole Focus', src: 'assets/img/princess-izzy-40-sole-focus.webp' },
      { id: '41', title: 'Pure Confidence', src: 'assets/img/princess-izzy-41-pure-confidence.webp' },
      { id: '42', title: 'Bedside Tease', src: 'assets/img/princess-izzy-42-bedside-tease.webp' },
      { id: '43', title: 'Paid Princess', src: 'assets/img/princess-izzy-43-paid-princess.webp' },
      { id: '44', title: 'Retweet Devotion', src: 'assets/img/princess-izzy-44-retweet-devotion.webp' },
      { id: '45', title: 'Toe Rings Glamour', src: 'assets/img/princess-izzy-45-toe-rings-glamour.webp' },
      { id: '46', title: 'Hotel Retreat', src: 'assets/img/princess-izzy-46-hotel-retreat.webp' },
      { id: '47', title: 'Serve Princess Feet', src: 'assets/img/princess-izzy-47-serve-princess-feet.webp' },
      { id: '48', title: 'Natural Curves', src: 'assets/img/princess-izzy-48-natural-curves.webp' },
      { id: '49', title: 'Your Weakness', src: 'assets/img/princess-izzy-49-your-weakness.webp' },
      { id: '50', title: 'Luxury Blonde', src: 'assets/img/princess-izzy-50-luxury-blonde.webp' },
      { id: '51', title: 'Good Boy', src: 'assets/img/princess-izzy-51-good-boy.webp' },
      { id: '52', title: 'Living Room Takeover', src: 'assets/img/princess-izzy-52-living-room-takeover.webp' },
      { id: '53', title: 'High Arches', src: 'assets/img/princess-izzy-53-high-arches.webp' },
      { id: '54', title: 'Total Surrender', src: 'assets/img/princess-izzy-54-total-surrender.webp' }
    ];

    // Preload all 54 gallery images into memory
    galleryPool.forEach(item => {
      const img = new Image();
      img.src = item.src;
    });

    const activeIndices = [4, 32, 42, 10]; // Frame 0 -> 05, Frame 1 -> 33, Frame 2 -> 43, Frame 3 -> 11
    let deck = [];

    const getNextRandomImage = () => {
      if (deck.length === 0) {
        deck = Array.from({ length: galleryPool.length }, (_, i) => i);
        for (let i = deck.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [deck[i], deck[j]] = [deck[j], deck[i]];
        }
      }
      for (let i = 0; i < deck.length; i++) {
        if (!activeIndices.includes(deck[i])) {
          return deck.splice(i, 1)[0];
        }
      }
      return deck.pop();
    };

    const transitionFrame = (frameIndex) => {
      const frame = frames[frameIndex];
      if (!frame) return;

      const imgs = frame.querySelectorAll('.photo-tile__img');
      if (imgs.length < 2) return;

      const activeImg = frame.querySelector('.photo-tile__img.is-active') || imgs[0];
      const incomingImg = activeImg === imgs[0] ? imgs[1] : imgs[0];
      const idxEl = frame.querySelector('.photo-tile__idx');
      const titleEl = frame.querySelector('.photo-tile__title');
      const figcaption = frame.querySelector('figcaption');

      const nextPoolIdx = getNextRandomImage();
      activeIndices[frameIndex] = nextPoolIdx;
      const nextData = galleryPool[nextPoolIdx];

      const tempImg = new Image();
      tempImg.onload = () => {
        incomingImg.src = nextData.src;
        incomingImg.alt = `Princess Izzy — ${nextData.title}`;

        if (figcaption) figcaption.classList.add('is-updating');

        incomingImg.classList.add('is-incoming');
        requestAnimationFrame(() => {
          incomingImg.classList.add('is-active');

          setTimeout(() => {
            if (idxEl) idxEl.textContent = nextData.id;
            if (titleEl) titleEl.textContent = nextData.title;
            if (figcaption) figcaption.classList.remove('is-updating');
          }, 350);

          setTimeout(() => {
            activeImg.classList.remove('is-active', 'is-incoming');
            incomingImg.classList.remove('is-incoming');
          }, 1100);
        });
      };
      tempImg.src = nextData.src;
    };

    // Cycle every 6.5 seconds (6500ms) with randomized organic stagger
    const cycleGallery = () => {
      if (document.hidden) return;

      frames.forEach((_, fIdx) => {
        const stagger = Math.floor(Math.random() * 800);
        setTimeout(() => {
          if (!document.hidden) {
            transitionFrame(fIdx);
          }
        }, stagger);
      });
    };

    let timer = setInterval(cycleGallery, 6500);

    // Interactive click: instant transition to another photo from the 54
    frames.forEach((frame, fIdx) => {
      on(frame, 'click', () => {
        transitionFrame(fIdx);
        clearInterval(timer);
        timer = setInterval(cycleGallery, 6500);
      });
    });

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        clearInterval(timer);
      } else {
        clearInterval(timer);
        timer = setInterval(cycleGallery, 6500);
      }
    });
  };

  // --------------------------------------------------------------------------
  // 7. SCROLL REVEALS (IntersectionObserver gated behind .js class)
  // --------------------------------------------------------------------------
  const initScrollReveals = () => {
    const reveals = getEls('[data-reveal]');
    if (!reveals.length) return;

    if (!('IntersectionObserver' in window)) {
      reveals.forEach((el) => el.classList.add('is-revealed'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    reveals.forEach((el) => observer.observe(el));
  };

  // --------------------------------------------------------------------------
  // BOOTSTRAP
  // --------------------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', () => {
    initAgeGate();
    initNav();
    initScrollReveals();
    initTributeCopier();
    initBookingSystem();
    initHeroImageSwitcher();
    initGalleryFrameRotator();
  });
})();
