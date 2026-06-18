[README.md](https://github.com/user-attachments/files/29115161/README.md)
# ShortManDictionary<div align="center">


LINK WEBSITE : https://mahankenway.github.io/ShortManDictionary/


```

 ____  _  _  ___  ____  ____  __  __    __    _  _
/ ___)/ )( \/ _ \(  _ \(_  _)(  \/  )  /__\  ( \( )
\___ \) __ ( (_) ))   /  )(   )    (  /(__)\  )  (
(____/\_)(_/\___/(__\_) (__) (_/\/\_)(__)(__)(__)(_)
 ____  ____  ___  ____  ____  ___  _  _   __   ____  _  _
(  _ \(_  _)/ __)(_  _)(_  _)/ _ \( \( ) /__\ (  _ \( \/ )
 )(_) )_)(_( (__   )(    )(  ( (_) ))  ( /(__)\  )   / \  /
(____/(____)\___) (__)  (__)  \___/(_)\_)(__)(__)(_)\_)  \/
```

<h1>📖 ShortMan Dictionary</h1>
<h3><em>The internet slang dictionary for the chronically online.</em><br>Longman didn't make it. We did.</h3>

<br/>

[![Deploy](https://img.shields.io/github/actions/workflow/status/MahanKenway/ShortManDictionary/deploy.yml?branch=main&style=for-the-badge&logo=githubactions&logoColor=white&label=Deploy&color=22c55e)](https://mahankenway.github.io/ShortManDictionary/)
[![Live Demo](https://img.shields.io/badge/Live_Demo-Visit_Site-6366f1?style=for-the-badge&logo=vercel&logoColor=white)](https://mahankenway.github.io/ShortManDictionary/)
[![License](https://img.shields.io/badge/License-MIT-f59e0b?style=for-the-badge)](LICENSE)
[![Made with React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

<br/>

[![Entries](https://img.shields.io/badge/Slang_Entries-50%2B-ff69b4?style=flat-square&logo=bookstack&logoColor=white)]()
[![Brainrot Mode](https://img.shields.io/badge/Brainrot_Mode-Enabled_💀-purple?style=flat-square)]()
[![No Cap](https://img.shields.io/badge/No_Cap-Fr_Fr-success?style=flat-square)]()
[![Aura](https://img.shields.io/badge/Aura-Immaculate_✨-gold?style=flat-square)]()

</div>

---

## 🔥 What is ShortMan?

> You're texting someone and they say **"bro is so cooked, canon event tbh"** — and you have absolutely no idea what that means.

**ShortMan Dictionary** is an open-source, community-powered internet slang dictionary built for people who want to understand what the chronically online are saying — or who ARE the chronically online and just want to look cool.

Think **Longman Dictionary**, but instead of formal English and etymology nobody asked for, you get `rizz`, `delulu`, `NPC behavior`, and `skill issue` — with full definitions, example sentences, and **Brainrot Mode™**.

<br/>

## ✨ Features

| Feature | Description |
|---|---|
| 📚 **50+ Slang Entries** | From `LARP` to `Skibidi`, every word you need |
| 🔍 **Real-time Search** | Autocomplete with instant suggestions |
| 🔤 **A–Z Navigation** | Browse like a real dictionary, but cooler |
| 🧠 **Brainrot Mode™** | One toggle to flip every definition into maximum chaos energy |
| ❤️ **Favorites** | Save your most-used terms locally |
| 🌐 **Community Words** | Submit your own slang & upvote others |
| 📤 **Share Cards** | Generate a shareable meme card for any entry |
| 🌙 **Dark Mode** | For when you're reading slang at 3am (we know you are) |
| 📱 **Fully Responsive** | Works on mobile, desktop, and whatever you're using at 2am |
| 🎲 **Random Entry** | Hit shuffle and learn something you didn't know you needed |

<br/>

## 🚀 Demo

<div align="center">

**🔗 [shortman-dictionary → LIVE](https://mahankenway.github.io/ShortManDictionary/)**

</div>

```
Search "rizz"  →  Instant definition + pronunciation + examples + vibe rating
Toggle 🧠      →  Watch every entry transform into certified brainrot
Click ❤️       →  Save to your personal favorites
Hit 🎲         →  Discover a word you definitely shouldn't say to your parents
```

<br/>

## 📦 Tech Stack

<div align="center">

![React](https://img.shields.io/badge/React_18-Framework-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-Build_Tool-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-Styling-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-Components-000000?style=for-the-badge&logo=shadcnui&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-Animations-FF0055?style=for-the-badge&logo=framer&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-Hosting-222222?style=for-the-badge&logo=githubpages&logoColor=white)

</div>

<br/>

## 🛠️ Getting Started

```bash
# Clone the repo
git clone https://github.com/MahanKenway/ShortManDictionary.git

# Go in
cd ShortManDictionary

# Install (this step requires touching your keyboard, unfortunately)
npm install

# Run locally
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) and get rizzed up.

<br/>

## 📁 Project Structure

```
ShortManDictionary/
├── src/
│   ├── components/        # UI components (EntryCard, SearchBar, ShareModal...)
│   ├── data/
│   │   └── slangData.js   # 📚 The dictionary itself — add new words here
│   ├── pages/
│   │   └── Dictionary.jsx # Main page
│   └── index.css          # Global styles + Brainrot Mode animations
├── public/
│   └── 404.html           # GitHub Pages SPA routing fix
└── .github/workflows/
    └── deploy.yml         # Auto-deploy to GitHub Pages on push to main
```

<br/>

## 🤝 Contributing

> **Got a slang word that's missing? Pull request it.**

1. Fork the repo
2. Add your word to `src/data/slangData.js` following the existing schema
3. Make sure it has: `word`, `meaning`, `internetMeaning`, `brainrotMeaning`, `examples`, `category`, `vibeRating`
4. Open a PR — we'll review it faster than you can say "no cap"

New words get reviewed based on **actual internet usage**, not personal opinion. If TikTok uses it, it belongs here.

<br/>

## 🧠 Brainrot Mode™

This is not a gimmick. Well, it is. But it's a good gimmick.

Toggle Brainrot Mode™ to replace every internet-facing definition with its maximum-chaos, Gen-Alpha approved equivalent. Designed for people who have been terminally online for too long and want their dictionary to match their mental state.

```
Normal mode: "NPC — Someone who seems to lack original thought."
Brainrot mode: "THIS PERSON HAS NO INTERNAL MONOLOGUE. Just vibes on autopilot.
                Their dialogue tree has 4 options and they've exhausted all of them."
```

<br/>

## ⚔️ ShortMan vs Longman

| | 📕 Longman | 📗 ShortMan |
|---|---|---|
| Has "rizz" | ❌ | ✅ |
| Has "delulu is the solulu" | ❌ | ✅ |
| Dark Mode | ❌ | ✅ |
| Brainrot Mode | ❌ Would resign before adding it | ✅ Built-in |
| Mobile-first | ❌ It's a physical book | ✅ |
| Community words | ❌ | ✅ |
| Updated in 2024 | ❌ | ✅ |
| Free | Kind of | ✅ Always |

<br/>

## 📜 License

MIT — do whatever you want with it, just don't be mid about it.

<br/>

---

<div align="center">

**Built by [Mahan Tavakoli](https://github.com/MahanKenway)**
<br/>
*Verified by the world's best teacher, **Arina Mahmoudi***

<br/>

*If this project gave you even one W, drop a ⭐ — it costs zero rizz and means the world.*

[![Star History](https://img.shields.io/github/stars/MahanKenway/ShortManDictionary?style=social)](https://github.com/MahanKenway/ShortManDictionary/stargazers)

</div>
