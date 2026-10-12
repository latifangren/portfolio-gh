/* ==========================================================================
   RAEVTAR — Portfolio Data
   Chronicles (Repositories) & The Dragonpit (Interactive Showcase)
   Snapshot: GitHub API (@latifangren)
   ========================================================================== */

/* Language color mapping */
var LANG_COLORS = { "Go": "#00add8", "TypeScript": "#3178c6", "PHP": "#a371f7", "Shell": "#89e051", "Svelte": "#ff3e00" };

/* Chronicles — Featured & real repositories */
var PROJECTS = [
        {
          name: "webui_bfm_Extended", cat: "Android · WebUI", lang: "PHP", stars: 20, forks: 7, featured: true, art: "rgba(255,122,26,.32)",
          desc: "WebUI for Box for Magisk — a comprehensive interface for the BFR transparent-proxy module on rooted Android. Manage profiles, rules and traffic straight from the browser.",
          url: "https://github.com/latifangren/webui_bfm_Extended"
        },
        {
          name: "mihombreng", cat: "Network · OpenWrt", lang: "TypeScript", stars: 7, forks: 2, featured: true, art: "rgba(233,181,88,.32)",
          desc: "Lightweight, high-performance controller and dashboard for the Mihomo (Clash Meta) proxy core on OpenWrt and Linux — Go backend API with an embedded React WebUI in a single binary.",
          url: "https://github.com/latifangren/mihombreng"
        },
        {
          name: "QManager-GO", cat: "Network · Modems", lang: "Go", stars: 6, forks: 1, featured: false, art: "rgba(194,47,53,.30)",
          desc: "Quectel modem management dashboard for PRAIRE, LEMUR and similar modules — the backend fully rewritten in Go, tested on the RG501Q-EU. Signal stats, band locking and SMS from one panel.",
          url: "https://github.com/latifangren/QManager-GO"
        },
        {
          name: "droidspaces-webui", cat: "Systems · Android", lang: "Go", stars: 5, forks: 0, featured: false, art: "rgba(255,165,61,.30)",
          desc: "Zero-dependency container orchestration dashboard and daemon for rooted Android (KernelSU / Magisk / APatch), built on the C musl container runtime from Droidspaces-OSS.",
          url: "https://github.com/latifangren/droidspaces-webui"
        },
        {
          name: "raevtar", cat: "Web · CMS", lang: "Go", stars: 4, forks: 2, featured: false, art: "rgba(255,92,0,.28)",
          desc: "A featherweight CMS written in Go — compiled templates, HTMX interactions and SQLite storage, plus Hermes, an autonomous agent that publishes content through its API.",
          url: "https://github.com/latifangren/raevtar"
        },
        {
          name: "BFR-WEBUI-GO", cat: "Android · Systems", lang: "Go", stars: 1, forks: 1, featured: false, art: "rgba(214,144,60,.28)",
          desc: "Ultra-lightweight Android system control panel engineered as a 100% offline-ready Magisk / KernelSU module — modular native Go backend, Svelte 5 + Tailwind frontend.",
          url: "https://github.com/latifangren/BFR-WEBUI-GO-release"
        },
        {
          name: "9router-go", cat: "Network · AI Gateway", lang: "Go", stars: 0, forks: 0, featured: false, art: "rgba(245,212,136,.30)",
          desc: "High-performance Go proxy gateway for 9Router LLM routing — 32K RPS at 42 MB RAM, fully CGO-free. Includes fixes for Muse OAuth device flow and Codex provider probing.",
          url: "https://github.com/latifangren/9router-go"
        },
        {
          name: "SimpleCommand", cat: "Systems · Shell", lang: "Shell", stars: 0, forks: 0, featured: false, art: "rgba(160,60,30,.28)",
          desc: "Zero-dependency, pure-shell toolkit for modem, cellular and serial work on embedded Linux, OpenWrt, Raspberry Pi and Android ADB. No Python, no Perl, no minicom — just shell.",
          url: "https://github.com/latifangren/SimpleCommand"
        }
      ];

/* The Dragonpit — Deep lab showcase categories */
var LAB = [
        {
          key: "systems", title: "SYSTEMS", sub: "Daemons · Runtimes · Kernels",
          icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="7" rx="2"/><rect x="3" y="13" width="18" height="7" rx="2"/><path d="M7 7.5h.01M7 16.5h.01"/></svg>',
          desc: "Low-level machinery raised in the deepest pit: container runtimes on rooted phones, management daemons that never sleep, and single binaries that replace whole stacks of services.",
          chips: [["Go", "6%", "14px"], ["musl libc", "34%", "52px"], ["LXC", "62%", "10px"], ["CGO-free", "22%", "76px"], ["systemd-free", "66%", "64px"]],
          links: [["droidspaces-webui", "Go", "https://github.com/latifangren/droidspaces-webui"], ["andromodem", "Go", "https://github.com/latifangren/andromodem"], ["9router-go", "Go", "https://github.com/latifangren/9router-go"]]
        },
        {
          key: "android", title: "ANDROID", sub: "WebUIs · Modules · Root",
          icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="7" y="2.5" width="10" height="19" rx="2.5"/><path d="M11 18.5h2"/></svg>',
          desc: "Rooted Android as a real platform: full web control panels shipped as Magisk / KernelSU modules, running 100% offline on the device itself.",
          chips: [["Magisk", "8%", "16px"], ["KernelSU", "36%", "54px"], ["APatch", "64%", "12px"], ["Svelte 5", "24%", "78px"], ["WebUI", "68%", "66px"]],
          links: [["webui_bfm_Extended", "PHP", "https://github.com/latifangren/webui_bfm_Extended"], ["BFR-WEBUI-GO", "Go", "https://github.com/latifangren/BFR-WEBUI-GO-release"], ["Droidspaces-OSS", "Kotlin", "https://github.com/latifangren/Droidspaces-OSS"]]
        },
        {
          key: "network", title: "NETWORK", sub: "Proxies · Modems · Routing",
          icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="19" r="2.5"/><circle cx="18" cy="5" r="2.5"/><path d="M8.5 19H15a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h1"/></svg>',
          desc: "Traffic engineering for the real world: Mihomo controllers on OpenWrt, Quectel 5G modem dashboards, and shell tooling for cellular debugging anywhere.",
          chips: [["Mihomo", "7%", "14px"], ["OpenWrt", "35%", "52px"], ["Quectel", "63%", "10px"], ["AT commands", "20%", "76px"], ["32K RPS", "67%", "64px"]],
          links: [["mihombreng", "TypeScript", "https://github.com/latifangren/mihombreng"], ["QManager-GO", "Go", "https://github.com/latifangren/QManager-GO"], ["SimpleCommand", "Shell", "https://github.com/latifangren/SimpleCommand"]]
        },
        {
          key: "web", title: "WEB", sub: "CMS · Dashboards · Interfaces",
          icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2.5"/><path d="M3 9h18M6.5 6.5h.01M9.5 6.5h.01"/></svg>',
          desc: "Interfaces embedded directly into the binary — no Node server, no build pipeline at runtime. Compiled templates, HTMX, and dashboards that load instantly on a LAN.",
          chips: [["HTMX", "8%", "16px"], ["SQLite", "36%", "54px"], ["React", "63%", "12px"], ["Tailwind", "24%", "78px"], ["REST APIs", "66%", "66px"]],
          links: [["raevtar — CMS", "Go", "https://github.com/latifangren/raevtar"], ["mihombreng WebUI", "TypeScript", "https://github.com/latifangren/mihombreng"], ["raevtar.tech", "Website", "https://raevtar.tech/"]]
        }
      ];
