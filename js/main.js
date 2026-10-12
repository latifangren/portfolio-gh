/* ==========================================================================
   RAEVTAR — Portfolio Main Controller
   Interactions, GSAP ScrollTrigger, Lenis, Three.js Embers, Spotlight
   ========================================================================== */

(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      var finePointer = window.matchMedia("(pointer: fine)").matches;
      var hasGsap = typeof window.gsap !== "undefined";
      var hasST = hasGsap && typeof window.ScrollTrigger !== "undefined";
      if (hasST) gsap.registerPlugin(ScrollTrigger);

  /* ================= Render Chronicles (Works) ================= */
  var starSvg = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.6l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.5l-5.9 3.1 1.2-6.5L2.5 9.5l6.6-.9 2.9-6z"/></svg>';
      var arrowSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M8 7h9v9"/></svg>';

      var worksGrid = document.getElementById("worksGrid");
      PROJECTS.forEach(function (p, i) {
        var a = document.createElement("a");
        a.className = "work w" + (i + 1);
        a.href = p.url; a.target = "_blank"; a.rel = "noopener";
        a.setAttribute("data-reveal", "");
        a.setAttribute("data-tilt", "");
        var color = LANG_COLORS[p.lang] || "#b08d57";
        a.innerHTML =
          '<div class="work-art" style="--art:' + p.art + '"></div>' +
          '<div class="work-ghost" aria-hidden="true">' + String(i + 1).padStart(2, "0") + '</div>' +
          '<div class="work-top"><span class="work-cat">Record Nº ' + String(i + 1).padStart(2, "0") + ' · ' + p.cat + '</span>' +
          (p.featured ? '<span class="featured-flag">Most starred</span>' : '') +
          '<span class="work-stars">' + starSvg + p.stars + '<span class="glory">glory</span></span></div>' +
          '<h3>' + p.name + '</h3>' +
          '<p>' + p.desc + '</p>' +
          '<div class="work-meta">' +
          '<span class="lang"><span class="cdot" style="background:' + color + ';color:' + color + '"></span>' + p.lang + '</span>' +
          '<span class="lang mono" style="font-size:12.5px;">forks ' + p.forks + '</span>' +
          '<span class="work-cta">Open the record ' + arrowSvg + '</span>' +
          '</div>';
        worksGrid.appendChild(a);
      });

  /* ================= Render The Dragonpit (Lab) ================= */
  var labGrid = document.getElementById("labGrid");
      LAB.forEach(function (lab, li) {
        var card = document.createElement("div");
        card.className = "lab-card";
        card.setAttribute("data-reveal", "");
        var chipsHtml = lab.chips.map(function (c, ci) {
          return '<span class="float-chip" data-depth="' + (0.4 + (ci % 3) * 0.35) + '" style="left:' + c[1] + ';top:' + c[2] + ';animation-delay:' + (ci * 0.7) + 's;">' + c[0] + '</span>';
        }).join("");
        var linksHtml = lab.links.map(function (l) {
          return '<a href="' + l[2] + '" target="_blank" rel="noopener">' + l[0] + '<span class="lk-lang">' + l[1] + '</span>' + arrowSvg + '</a>';
        }).join("");
        card.innerHTML =
          '<button class="lab-head" type="button" aria-expanded="false">' +
          '<span class="lab-icon">' + lab.icon + '</span>' +
          '<span class="lab-titles"><h3>' + lab.title + '</h3><p class="lab-sub">' + lab.sub + '</p></span>' +
          '<span class="lab-toggle"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg></span>' +
          '</button>' +
          '<div class="lab-body"><div class="lab-body-in"><div class="lab-content">' +
          '<p>' + lab.desc + '</p>' +
          '<div class="lab-stage" aria-hidden="true">' + chipsHtml + '</div>' +
          '<div class="lab-links">' + linksHtml + '</div>' +
          '</div></div></div>';
        labGrid.appendChild(card);
        var head = card.querySelector(".lab-head");
        head.addEventListener("click", function () {
          var open = card.classList.toggle("open");
          head.setAttribute("aria-expanded", open ? "true" : "false");
          if (hasST) setTimeout(function () { ScrollTrigger.refresh(); }, 600);
        });
        card.addEventListener("mousemove", function (e) {
          var r = card.getBoundingClientRect();
          card.style.setProperty("--lx", ((e.clientX - r.left) / r.width * 100) + "%");
          card.style.setProperty("--ly", ((e.clientY - r.top) / r.height * 100) + "%");
          if (!reduceMotion) {
            var dx = (e.clientX - r.left) / r.width - 0.5, dy = (e.clientY - r.top) / r.height - 0.5;
            card.querySelectorAll(".float-chip").forEach(function (chip) {
              var d = parseFloat(chip.getAttribute("data-depth")) || 0.5;
              chip.style.translate = (dx * 16 * d) + "px " + (dy * 12 * d) + "px";
            });
          }
        });
        card.addEventListener("mouseleave", function () {
          card.querySelectorAll(".float-chip").forEach(function (chip) { chip.style.translate = "0px 0px"; });
        });
        if (li === 0) { card.classList.add("open"); head.setAttribute("aria-expanded", "true"); }
      });

      /* ================= marquees: duplicate for seamless loop ================= */
      document.querySelectorAll("[data-marquee]").forEach(function (t) { t.innerHTML += t.innerHTML; });

      /* ================= mobile menu ================= */
      var burger = document.getElementById("burger");
      var mobileMenu = document.getElementById("mobileMenu");
      var lenis = null;
      function closeMenu() {
        mobileMenu.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
        if (lenis) lenis.start();
      }
      burger.addEventListener("click", function () {
        var open = mobileMenu.classList.toggle("open");
        burger.setAttribute("aria-expanded", open ? "true" : "false");
        if (lenis) { open ? lenis.stop() : lenis.start(); }
      });
      mobileMenu.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", closeMenu); });

      /* ================= Lenis smooth scroll ================= */
      if (!reduceMotion && typeof window.Lenis !== "undefined") {
        lenis = new Lenis({ duration: 1.15, smoothWheel: true });
        if (hasST) {
          lenis.on("scroll", ScrollTrigger.update);
          gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
          gsap.ticker.lagSmoothing(0);
        } else {
          (function raf(time) { lenis.raf(time); requestAnimationFrame(raf); })(performance.now());
        }
      }
      function scrollToTarget(sel) {
        var el = document.querySelector(sel);
        if (!el) return;
        if (lenis) lenis.scrollTo(el, { offset: 0, duration: 1.4 });
        else el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
      }
      document.querySelectorAll('a[href^="#"]').forEach(function (a) {
        a.addEventListener("click", function (e) {
          var href = a.getAttribute("href");
          if (href.length > 1) { e.preventDefault(); closeMenu(); scrollToTarget(href); }
        });
      });

      /* ================= header state ================= */
      var siteHead = document.getElementById("siteHead");
      function onScrollPos(y) { siteHead.classList.toggle("scrolled", y > 40); }
      if (lenis) lenis.on("scroll", function (e) { onScrollPos(e.scroll); });
      window.addEventListener("scroll", function () { onScrollPos(window.scrollY); }, { passive: true });

      /* ================= custom cursor + magnetic ================= */
      if (finePointer && !reduceMotion) {
        document.body.classList.add("has-cursor");
        var dot = document.getElementById("cursorDot"), ring = document.getElementById("cursorRing");
        var cx = -100, cy = -100, rx = -100, ry = -100;
        window.addEventListener("mousemove", function (e) {
          cx = e.clientX; cy = e.clientY;
          dot.style.left = cx + "px"; dot.style.top = cy + "px";
        }, { passive: true });
        (function ringLoop() {
          rx += (cx - rx) * 0.16; ry += (cy - ry) * 0.16;
          ring.style.left = rx + "px"; ring.style.top = ry + "px";
          requestAnimationFrame(ringLoop);
        })();
        document.querySelectorAll("a, button, .lab-head").forEach(function (el) {
          el.addEventListener("mouseenter", function () { ring.classList.add("is-hover"); });
          el.addEventListener("mouseleave", function () { ring.classList.remove("is-hover"); });
        });
        document.querySelectorAll(".magnetic").forEach(function (el) {
          el.addEventListener("mousemove", function (e) {
            var r = el.getBoundingClientRect();
            var x = e.clientX - r.left - r.width / 2, y = e.clientY - r.top - r.height / 2;
            el.style.transform = "translate(" + x * 0.28 + "px," + y * 0.28 + "px)";
          });
          el.addEventListener("mouseleave", function () {
            el.style.transition = "transform .5s cubic-bezier(.22,.61,.36,1)";
            el.style.transform = "translate(0,0)";
            setTimeout(function () { el.style.transition = ""; }, 500);
          });
        });
      }

      /* ================= hero: spotlight reveal + mouse parallax ================= */
      var hero = document.getElementById("home");
      var heroMedia = document.getElementById("heroMedia");
      var spot = document.getElementById("heroSpot");
      var spotRing = document.getElementById("heroSpotRing");
      var heroMouse = { x: 0, y: 0 }; // -1..1, shared with the WebGL field
      if (finePointer && !reduceMotion) {
        var tx = 0, ty = 0, sx = 0, sy = 0, spotOn = false, spotInit = false;
        var mTx = 0, mTy = 0, mX = 0, mY = 0;
        hero.addEventListener("mousemove", function (e) {
          var r = hero.getBoundingClientRect();
          tx = e.clientX - r.left; ty = e.clientY - r.top;
          if (!spotInit) { sx = tx; sy = ty; spotInit = true; }
          spotOn = true;
          mTx = (e.clientX - r.left) / r.width - 0.5;
          mTy = (e.clientY - r.top) / r.height - 0.5;
        }, { passive: true });
        hero.addEventListener("mouseleave", function () { spotOn = false; mTx = 0; mTy = 0; });
        (function spotLoop() {
          sx += (tx - sx) * 0.09; sy += (ty - sy) * 0.09;
          spot.style.setProperty("--sx", sx + "px");
          spot.style.setProperty("--sy", sy + "px");
          spotRing.style.setProperty("--sx", sx + "px");
          spotRing.style.setProperty("--sy", sy + "px");
          var target = spotOn ? 1 : 0;
          var cur = parseFloat(spot.style.opacity || "0");
          var next = cur + (target - cur) * 0.12;
          spot.style.opacity = next.toFixed(3);
          spotRing.style.opacity = (next * 0.9).toFixed(3);
          mX += (mTx - mX) * 0.045; mY += (mTy - mY) * 0.045;
          heroMouse.x = mX * 2; heroMouse.y = mY * 2;
          heroMedia.style.transform = "translate(" + (mX * -14) + "px," + (mY * -9) + "px) scale(1.03)";
          requestAnimationFrame(spotLoop);
        })();
      }

      /* ================= Three.js — ember particle field + fog ================= */
      (function initEmberGL() {
        var canvas = document.getElementById("emberGL");
        if (!canvas || reduceMotion || typeof window.THREE === "undefined") return;
        var renderer;
        try {
          renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: false, powerPreference: "high-performance" });
        } catch (e) { return; }
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
        var scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x0a0503, 0.045);
        var camera = new THREE.PerspectiveCamera(58, 1, 0.1, 100);
        camera.position.set(0, 0, 14);

        // soft ember sprite
        var tc = document.createElement("canvas"); tc.width = tc.height = 64;
        var tg = tc.getContext("2d");
        var grad = tg.createRadialGradient(32, 32, 0, 32, 32, 32);
        grad.addColorStop(0, "rgba(255,242,214,1)");
        grad.addColorStop(0.35, "rgba(255,182,92,0.85)");
        grad.addColorStop(0.7, "rgba(255,110,20,0.30)");
        grad.addColorStop(1, "rgba(255,110,20,0)");
        tg.fillStyle = grad; tg.fillRect(0, 0, 64, 64);
        var sprite = new THREE.CanvasTexture(tc);

        var PALETTE = [
          [1.0, 0.62, 0.24], [1.0, 0.47, 0.10], [0.96, 0.76, 0.42],
          [1.0, 0.72, 0.34], [0.78, 0.20, 0.18]
        ];
        var layers = [];
        function makeLayer(count, size, zMin, zMax, opacity) {
          var pos = new Float32Array(count * 3);
          var col = new Float32Array(count * 3);
          var meta = [];
          for (var i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 34;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 19;
            pos[i * 3 + 2] = zMin + Math.random() * (zMax - zMin);
            var c = PALETTE[Math.floor(Math.random() * PALETTE.length)];
            col[i * 3] = c[0]; col[i * 3 + 1] = c[1]; col[i * 3 + 2] = c[2];
            meta.push({
              speed: 0.35 + Math.random() * 0.95,
              swayAmp: 0.25 + Math.random() * 0.8,
              swayFreq: 0.3 + Math.random() * 0.8,
              phase: Math.random() * Math.PI * 2,
              baseX: pos[i * 3]
            });
          }
          var geo = new THREE.BufferGeometry();
          geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
          geo.setAttribute("color", new THREE.BufferAttribute(col, 3));
          var mat = new THREE.PointsMaterial({
            size: size, map: sprite, transparent: true, opacity: opacity,
            depthWrite: false, blending: THREE.AdditiveBlending,
            vertexColors: true, sizeAttenuation: true, fog: true
          });
          var points = new THREE.Points(geo, mat);
          scene.add(points);
          layers.push({ geo: geo, meta: meta, count: count });
        }
        var smallScreen = window.innerWidth < 700;
        makeLayer(smallScreen ? 130 : 240, 0.62, -1, 3.5, 0.95);   // near embers
        makeLayer(smallScreen ? 380 : 720, 0.30, -7, -1, 0.8);     // far embers / fog depth

        var running = true, heroVisible = true;
        function resize() {
          var w = hero.clientWidth || window.innerWidth;
          var h = hero.clientHeight || window.innerHeight;
          renderer.setSize(w, h, false);
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
        }
        resize();
        window.addEventListener("resize", resize);
        new IntersectionObserver(function (entries) { heroVisible = entries[0].isIntersecting; }).observe(hero);
        document.addEventListener("visibilitychange", function () { running = !document.hidden; });

        var clock = new THREE.Clock();
        (function tick() {
          requestAnimationFrame(tick);
          if (!running || !heroVisible) return;
          var t = clock.getElapsedTime();
          for (var li = 0; li < layers.length; li++) {
            var L = layers[li];
            var arr = L.geo.attributes.position.array;
            for (var i = 0; i < L.count; i++) {
              var m = L.meta[i];
              var y = arr[i * 3 + 1] + m.speed * 0.016;
              if (y > 10) { y = -10; m.baseX = (Math.random() - 0.5) * 34; }
              arr[i * 3 + 1] = y;
              arr[i * 3] = m.baseX + Math.sin(t * m.swayFreq + m.phase) * m.swayAmp;
            }
            L.geo.attributes.position.needsUpdate = true;
          }
          camera.position.x += ((heroMouse.x * 1.1) - camera.position.x) * 0.04;
          camera.position.y += ((-heroMouse.y * 0.7) - camera.position.y) * 0.04;
          camera.lookAt(0, 0, 0);
          renderer.render(scene, camera);
        })();
      })();

      /* ================= 3D tilt ================= */
      if (finePointer && !reduceMotion) {
        document.querySelectorAll("[data-tilt]").forEach(function (el) {
          var max = el.classList.contains("work") ? 5 : 7;
          el.addEventListener("mousemove", function (e) {
            var r = el.getBoundingClientRect();
            var px = (e.clientX - r.left) / r.width - 0.5;
            var py = (e.clientY - r.top) / r.height - 0.5;
            el.style.transform = "perspective(1100px) rotateX(" + (-py * max) + "deg) rotateY(" + (px * max) + "deg) translateY(-4px)";
          });
          el.addEventListener("mouseleave", function () {
            el.style.transition = "transform .6s cubic-bezier(.22,.61,.36,1)";
            el.style.transform = "perspective(1100px) rotateX(0deg) rotateY(0deg)";
            setTimeout(function () { el.style.transition = ""; }, 600);
          });
        });
        document.querySelectorAll("[data-tilt-soft]").forEach(function (el) {
          el.addEventListener("mousemove", function (e) {
            var r = el.getBoundingClientRect();
            var px = (e.clientX - r.left) / r.width - 0.5;
            var py = (e.clientY - r.top) / r.height - 0.5;
            el.style.transform = "perspective(1200px) rotateX(" + (-py * 3.5) + "deg) rotateY(" + (px * 3.5) + "deg)";
          });
          el.addEventListener("mouseleave", function () {
            el.style.transition = "transform .7s cubic-bezier(.22,.61,.36,1)";
            el.style.transform = "perspective(1200px) rotateX(0deg) rotateY(0deg)";
            setTimeout(function () { el.style.transition = ""; }, 700);
          });
        });
      }

      /* ================= counters ================= */
      function runCounter(el) {
        var target = parseInt(el.getAttribute("data-count"), 10);
        if (!hasGsap || reduceMotion) { el.textContent = target; return; }
        var obj = { v: 0 };
        gsap.to(obj, {
          v: target, duration: 1.6, ease: "power3.out",
          onUpdate: function () { el.textContent = Math.round(obj.v); }
        });
      }

      /* ================= preloader embers ================= */
      (function seedPreEmbers() {
        var box = document.getElementById("preEmbers");
        if (!box || reduceMotion) return;
        for (var i = 0; i < 18; i++) {
          var s = document.createElement("i");
          var size = 3 + Math.random() * 5;
          s.style.left = (Math.random() * 100) + "%";
          s.style.width = size + "px"; s.style.height = size + "px";
          s.style.animationDuration = (2.6 + Math.random() * 3.4) + "s";
          s.style.animationDelay = (Math.random() * 3) + "s";
          box.appendChild(s);
        }
      })();

      /* ================= preloader + hero entrance ================= */
      var preloader = document.getElementById("preloader");
      var preCount = document.getElementById("preCount");
      var heroPlayed = false;

      function heroIntro() {
        if (heroPlayed) return; heroPlayed = true;
        if (!hasGsap || reduceMotion) return;
        var tl = gsap.timeline({ defaults: { ease: "power4.out" } });
        tl.fromTo("#heroBg", { scale: 1.14 }, { scale: 1, duration: 2.2, ease: "power2.out" }, 0)
          .fromTo(".hero-title .line-in", { yPercent: 115, rotate: 2.5 }, { yPercent: 0, rotate: 0, duration: 1.25, stagger: 0.13 }, 0.1)
          .fromTo("[data-hero-fade]", { y: 34, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.1 }, 0.45)
          .fromTo("#siteHead", { y: -26, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, 0.5);
      }
      function killPreloader() {
        preloader.classList.add("done");
        setTimeout(function () { preloader.style.display = "none"; }, 1300);
      }
      function playPreloader() {
        if (!hasGsap || reduceMotion) {
          preCount.textContent = "100"; killPreloader(); heroIntro(); return;
        }
        var counter = { v: 0 };
        var tl = gsap.timeline();
        tl.to(".pre-name span", { y: 0, duration: 0.9, stagger: 0.055, ease: "power4.out" }, 0)
          .to("#preSigil", { opacity: 1, duration: 0.8 }, 0.3)
          .to("#preSub", { opacity: 1, duration: 0.7 }, 0.5)
          .to(counter, {
            v: 100, duration: 1.7, ease: "power2.inOut",
            onUpdate: function () { preCount.textContent = Math.round(counter.v); }
          }, 0.1)
          .to("#preBar", { scaleX: 1, duration: 1.7, ease: "power2.inOut" }, 0.1)
          .to("#preInner, #preCount", { y: -34, opacity: 0, duration: 0.6, ease: "power3.in" }, "+=0.15")
          .to("#prePanel1", { yPercent: -100, duration: 0.9, ease: "power4.inOut" }, "-=0.15")
          .to("#prePanel2", {
            yPercent: -100, duration: 0.9, ease: "power4.inOut",
            onStart: heroIntro, onComplete: killPreloader
          }, "-=0.72");
      }
      if (document.readyState === "complete" || document.readyState === "interactive") playPreloader();
      else window.addEventListener("DOMContentLoaded", playPreloader);
      // absolute failsafe: never trap the visitor behind the preloader
      setTimeout(function () {
        if (!preloader.classList.contains("done")) { killPreloader(); heroIntro(); }
      }, 5000);

      /* ================= scroll animations ================= */
      if (hasST && !reduceMotion) {
        // hero parallax on scroll-away
        gsap.to("#heroBg", {
          yPercent: 12, ease: "none",
          scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true }
        });
        gsap.to("#emberGL", {
          yPercent: 6, ease: "none",
          scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true }
        });
        gsap.to("#heroSpot", {
          yPercent: 8, ease: "none",
          scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true }
        });
        gsap.to("#heroContent", {
          yPercent: -10, opacity: 0.15, ease: "none",
          scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom 35%", scrub: true }
        });

        // dragon banner slow drift
        gsap.fromTo("#dragonBanner", { yPercent: -7 }, {
          yPercent: 7, ease: "none",
          scrollTrigger: { trigger: ".chron-banner", start: "top bottom", end: "bottom top", scrub: true }
        });

        // section reveals
        gsap.utils.toArray("[data-reveal]").forEach(function (el) {
          gsap.fromTo(el, { y: 46, opacity: 0 }, {
            y: 0, opacity: 1, duration: 1.05, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true }
          });
        });

        // trials: the burning path follows scroll
        var fill = document.getElementById("journeyFill");
        var jdot = document.getElementById("journeyDot");
        ScrollTrigger.create({
          trigger: "#journey", start: "top 72%", end: "bottom 55%", scrub: 0.4,
          onUpdate: function (self) {
            var pct = (self.progress * 100).toFixed(2);
            fill.style.height = pct + "%";
            jdot.style.top = pct + "%";
          }
        });

        // counters
        document.querySelectorAll("[data-count]").forEach(function (el) {
          ScrollTrigger.create({
            trigger: el, start: "top 90%", once: true,
            onEnter: function () { runCounter(el); }
          });
        });
      } else {
        // no animation libs / reduced motion: show everything, set final states
        document.querySelectorAll("[data-count]").forEach(function (el) { el.textContent = el.getAttribute("data-count"); });
        var f2 = document.getElementById("journeyFill"); if (f2) f2.style.height = "100%";
        var d2 = document.getElementById("journeyDot"); if (d2) d2.style.top = "100%";
      }

      /* ================= footer fire particles (2D canvas) ================= */
      var canvas = document.getElementById("footParticles");
      if (canvas && !reduceMotion) {
        var ctx = canvas.getContext("2d");
        var W = 0, H = 0, particles = [], running = true, dpr = Math.min(window.devicePixelRatio || 1, 2);
        function resize() {
          var r = canvas.parentElement.getBoundingClientRect();
          W = r.width; H = r.height;
          canvas.width = W * dpr; canvas.height = H * dpr;
          ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        }
        var FIRE = ["255,170,80", "255,122,26", "233,181,88", "255,210,140"];
        function makeParticle(init) {
          return {
            x: Math.random() * W,
            y: init ? Math.random() * H : H + 6,
            r: 0.8 + Math.random() * 2.2,
            s: 0.25 + Math.random() * 0.65,
            drift: (Math.random() - 0.5) * 0.22,
            hue: FIRE[Math.floor(Math.random() * FIRE.length)],
            a: 0.25 + Math.random() * 0.55,
            ph: Math.random() * Math.PI * 2
          };
        }
        function initParticles() {
          resize(); particles = [];
          var n = Math.min(85, Math.max(30, Math.floor(W / 15)));
          for (var i = 0; i < n; i++) particles.push(makeParticle(true));
        }
        function tick(t) {
          if (running) {
            ctx.clearRect(0, 0, W, H);
            for (var i = 0; i < particles.length; i++) {
              var p = particles[i];
              p.y -= p.s; p.x += p.drift + Math.sin(t / 1500 + p.ph) * 0.14;
              if (p.y < -8 || p.x < -8 || p.x > W + 8) particles[i] = p = makeParticle(false);
              var tw = 0.6 + 0.4 * Math.sin(t / 700 + p.ph);
              ctx.beginPath();
              ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
              ctx.fillStyle = "rgba(" + p.hue + "," + (p.a * tw).toFixed(3) + ")";
              ctx.shadowColor = "rgba(255,140,40,0.85)";
              ctx.shadowBlur = 10;
              ctx.fill();
            }
            ctx.shadowBlur = 0;
          }
          requestAnimationFrame(tick);
        }
        initParticles();
        requestAnimationFrame(tick);
        window.addEventListener("resize", initParticles);
        new IntersectionObserver(function (entries) { running = entries[0].isIntersecting; }).observe(canvas);
      }
})();
