export const profile = {
  // Short name for headers, full name for detail spots.
  short: "Arzaka Raffan",
  name: "Arzaka Raffan Mawardi",
  role: "Web & game developer",
  school: "Computer Science · Universitas Indonesia '23",
  city: "Depok, ID",
  tz: "Asia/Jakarta",
  email: "arzakaraffan@gmail.com",
  portrait: "/assets/portrait.jpeg",
  // TODO: swap for the games subdomain once it's live
  gamesUrl: "https://heisenbergers.itch.io/",
  socials: [
    { label: "GitHub", url: "https://github.com/ArzakaRaffan/" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/arzakaraffan/" },
    { label: "itch.io", url: "https://heisenbergers.itch.io/" },
  ],
};

export const statement =
  "I design and build web products people actually use, and games that win jams. Clean systems underneath, careful motion on top.";

export const bio = [
  "Computer Science at Universitas Indonesia. Full-stack web development and game development with Godot.",
  "Currently leading Game Development at RISTEK Fasilkom UI and teaching as a CS teaching assistant.",
];

export const toolkit = [
  ["Frontend", "Next.js, React, TypeScript, Tailwind"],
  ["Backend", "Django, Spring Boot, Node.js, PostgreSQL"],
  ["Infra", "Docker, AWS, Kubernetes, Git"],
  ["Games", "Godot, Aseprite, Figma"],
];

export const projects = [
  {
    title: "Letterboxd Roast", kind: "Web", year: 2026, solo: true,
    desc: "Enter a Letterboxd username and let Claude judge your personality from your watch history.",
    stack: "Next.js · Anthropic API",
    img: "/assets/projects/letterboxd-roast.png",
    video: "/assets/projects/letterboxd-roast.mp4",
    url: "https://letterboxd-roast.vercel.app/",
  },
  {
    title: "Let Meow Out", kind: "Game", year: 2026, solo: false,
    award: "Champion · Garena GJ3 '26",
    desc: "A cat got stuck inside a handheld console. Your job is to get it out. Cozy pixel puzzler.",
    stack: "Godot · Aseprite",
    img: "/assets/projects/let-meow-out.png",
    video: "/assets/projects/let-meow-out.mp4",
    url: "https://viscasa.itch.io/let-meow-out",
  },
  {
    title: "Let Neigh Out", kind: "Game", year: 2026, solo: false,
    award: "Champion · Garena GJ3 '26",
    desc: "A reskin of Let Meow Out, shown at Harmoni Imlek Nusantara in Lapangan Banteng, Jakarta.",
    stack: "Godot · Aseprite",
    img: "/assets/projects/let-neigh-out.png",
    video: "/assets/projects/let-neigh-out.mp4",
    url: "https://samueltaniel.itch.io/let-neigh-out",
  },
  {
    title: "Alien Brawl", kind: "Game", year: 2025, solo: false,
    award: "1st Runner-up · Garena GJ2 '25",
    desc: "Two players, one couch, one purple planet. My first finished game, still my favorite.",
    stack: "Godot · Aseprite",
    img: "/assets/projects/alien-brawl.png",
    video: "/assets/projects/alien-brawl.mp4",
    url: "https://viscasa.itch.io/alien-brawl",
  },
  {
    title: "Gallery Fasilkom", kind: "Web", year: 2024, solo: false,
    desc: "A portfolio platform for Fasilkom UI students. SSO login, uploads, and a full review pipeline.",
    stack: "Next.js · Django · Postgres",
    img: "/assets/projects/gallery-fasilkom.png",
    url: "https://staging-gallery.ppl.cs.ui.ac.id/inventory",
    study: {
      overview: "Built across 14 weeks as Proyek Perangkat Lunak (PPL) with a team of five.",
      points: [
        ["Auth & RBAC", "JWT cookie auth and a three-tier permission system (Mahasiswa, Dosen, Admin), enforced in DRF permission classes and serializers."],
        ["Testing", "Unit and integration tests with pytest and the DRF client. 95% line coverage, reported on every PR."],
        ["Observability", "Prometheus metrics, Grafana dashboards for latency and errors, Sentry on frontend and backend."],
      ],
      outcomes: ["Passed SonarQube quality gate", "Zero auth regressions across sprints", "Full Prometheus → Grafana → Sentry stack live"],
    },
  },
  {
    title: "UI Women in Business", kind: "Web", year: 2024, solo: true,
    desc: "Marketing site for the UIWIB student community. Built to feel like a brand, not a club page.",
    stack: "Next.js · TypeScript",
    img: "/assets/projects/uiwib.png",
    url: "https://uiwomeninbusiness.com",
  },
  {
    title: "Soul Swap", kind: "Game", year: 2025, solo: true,
    desc: "Solo jam submission for my Game Development course. About swapping souls between robots.",
    stack: "Godot · Aseprite",
    img: "/assets/projects/soul-swap.png",
    video: "/assets/projects/soul-swap.mp4",
    url: "https://heisenbergers.itch.io/soulswap",
  },
  {
    title: "MIL Arcade", kind: "Game", year: 2025, solo: false,
    desc: "Built for the UNESCO Youth Hackathon 2025. A small arcade game about media literacy.",
    stack: "Godot · Figma",
    img: "/assets/projects/mil-arcade.png",
    url: "https://heisenbergers.itch.io/mil-unesco",
  },
  {
    title: "CleaNet", kind: "Game", year: 2025, solo: false,
    desc: "A little hero with a megaphone, cleaning up a circuit-board world.",
    stack: "Godot · Aseprite",
    img: "/assets/projects/cleanet.png",
    url: "https://heisenbergers.itch.io/cleanet",
  },
  {
    title: "Adit & The Miraculous Toad", kind: "Game", year: 2025, solo: false,
    desc: "A cozy 2D adventure in Bahasa Indonesia about a boy, a frog, and a journey worth taking.",
    stack: "Godot · Aseprite",
    img: "/assets/projects/adit.png",
    url: "https://heisenbergers.itch.io/adit-and-the-miraculous-toad-the-green-journey",
  },
];

export const highlights = [
  { big: "1st", label: "Garena Game Jam 3", meta: "2026 · Let Meow Out / Let Neigh Out", kind: "Champion" },
  { big: "2nd", label: "Garena Game Jam 2", meta: "2025 · Alien Brawl", kind: "Runner-up" },
  { big: "HAKI", label: "Petualangan Tala", meta: "Mobile game · registered IP", kind: "Patent",
    url: "https://drive.google.com/file/d/1CJa9TDeLwPko_W6lw1vGPO3N-y3sVLle/view?usp=drivesdk" },
  { big: "Mag.", label: "DPR Majalah Parlementaria", meta: "Nov 2022 · Article writer", kind: "Published",
    url: "https://drive.google.com/drive/folders/1JF_YeaTyjocJcUVOSI3sVzgIfYS2Z3IS" },
];

export const experience = [
  {
    date: "2024 — Now", current: true, role: "Game Development", org: "RISTEK Fasilkom UI", kind: "Student org",
    subs: [["Director", "Feb 2026 — Now"], ["Lead", "Mar 2025 — Feb 2026"], ["Member", "Mar 2024 — Mar 2025"]],
  },
  { date: "2025 — Now", current: true, role: "Master Teacher", org: "Ruangguru", kind: "Teaching" },
  {
    date: "2025 — Now", current: true, role: "Teaching Assistant", org: "Fasilkom UI", kind: "Teaching",
    subs: [["Intro to Software Security", "Feb 2026 — Now"], ["Data Structures & Algorithms", "Jul 2025 — Jan 2026"], ["Intro to Computer Organization", "Jul 2025 — Jan 2026"]],
  },
  {
    date: "2024 — 2025", role: "Art & Culture", org: "BEM Fasilkom UI", kind: "Student org",
    subs: [["Head Deputy", "Mar 2025 — Dec 2025"], ["Staff", "Jun 2024 — Dec 2024"]],
  },
  { date: "2023", role: "Project Officer", org: "Gelar Karya Fasilkom UI", kind: "Event" },
  { date: "2022 — 2025", role: "Political Journalist", org: "kataindonesia.com", kind: "Writing" },
];
