# yt-dlp-ejs-server

A lightweight private API server for resolving YouTube cipher signatures (`n` and `sig`)  
using the [yt-dlp/ejs](https://github.com/yt-dlp/ejs) solver logic.

Built with **Deno** and deployable on **Deno Deploy**, this server is designed for **internal use only** —  
it should not be exposed as a public API.

---

## 🚀 Features

- ⚡ Resolver for YouTube’s `n` and `sig` parameters  
- 🦕 Powered by Deno (no Node.js required)  
- 💾 Embedded copy of `yt-dlp/ejs` (no external network fetch)  
- 🔒 Intended for private or internal use only  
- 🧩 Compatible with Deno Deploy and local execution

---

## 🧩 Project Structure

```
yt-dlp-ejs-server/
├── server.ts          # Entry point
├── vendor/
│   └── ejs/           # Embedded yt-dlp/ejs source
├── deno.json          # Deno config
└── README.md          # This file
```

---

## 🧠 API Overview

> This server provides a private endpoint for resolving YouTube cipher signatures.  
> It is not intended for public use.

### 🔒 Access Policy

This service should be **kept private**.  
Only your own systems or trusted clients should access it.

To protect it:
- Do **not** share your Deno Deploy URL publicly.
- Optionally add:
  - API key authentication
  - IP allowlisting
  - Basic auth

---

### 🔹 Endpoint

```
GET /?pv=<player_version>&n=<cipher_n>&sig=<cipher_sig>
```

| Parameter | Description |
|------------|--------------|
| `pv` | YouTube player version (e.g. `3d3ba064`) |
| `n` | Cipher “n” parameter extracted from YouTube URL |
| `sig` | Cipher “sig” parameter extracted from YouTube URL |

---

### 🧩 Example Request

```
GET https://your-private-server.deno.dev/decrypt?pv=3d3ba064&n=ZdZIqFPQK-Ty8wId&sig=gN7a-hudCuAuPH6fByOk1_GNXN0yNMHShjZXS2VOgsEItAJz0tipeavEOmNdYN-wUtcEqD3bCXjc0iyKfAyZxCBGgIARwsSdQfJ2CJtt
```

### ✅ Example Response

```json
{
  "n": "qmtUsIz04xxiNW",
  "sig": "ttJC2JfQdSswRAIgGBCxZyAfKyi0cjXCb3gqEctUw-NYdNmOEvaepit0zJAtIEsgOV2SXZjhSHMNy0NXNG_1kNyBf6HPuAuCduh-a7O"
}
```

---

### ⚙️ Behavior

- The server loads the correct solver for the given `pv` (player version).  
- Each player version uses a unique decryption function.  
- Computation happens **entirely within Deno** (no external API calls).  
- If the version is unsupported, a JSON error is returned.

---

## 🧰 Local Development

### Run locally

```bash
deno run -A --watch server.ts
```

Access:  
[http://localhost:8000/decrypt?pv=test&n=abcd&sig=efgh](http://localhost:8000/?pv=test&n=abcd&sig=efgh)

### Run with debugging

```bash
deno run -A --inspect-brk --watch server.ts
```

---

## ☁️ Deploy to Deno Deploy

1. Fork this repository.  
2. Go to [https://dash.deno.com](https://dash.deno.com).  
3. Click **New Project → From GitHub Repo**.  
4. Select forked repo.  
5. Set **Entrypoint**: `server.ts`.  
6. Click **Deploy** 🎉

---

## 🔧 Updating ejs Source

If you want to update the embedded ejs solver:

```bash
rm -rf vendor/ejs
git clone https://github.com/yt-dlp/ejs.git vendor/ejs
rm -rf vendor/ejs/.git
git add vendor/ejs
git commit -m "update ejs"
```

---

## ⚡ Example Integration

Example use from another internal script:

```ts
const res = await fetch("https://your-private-server.deno.dev/decrypt?pv=3d3ba064&n=abcd123&sig=xyz");
const data = await res.json();
console.log(data.n, data.sig);
```

---

## 🚫 Public Deployment Warning

This project performs YouTube cipher resolution.  
To comply with YouTube’s Terms of Service, it must **not** be offered as a public or commercial API.

Keep this project:
- Private (internal only)  
- Behind authentication if deployed remotely  

---

## ⚙️ Configuration Example (`deno.json`)

```json
{
  "tasks": {
    "dev": "deno run -A --watch server.ts"
  },
  "compilerOptions": {
    "lib": ["dom", "esnext"],
    "strict": true
  }
}
```

---

## 🧾 License

- **yt-dlp-ejs-server** — MIT License  
- **yt-dlp/ejs** — Unlicense

---

> 🦕 **Note:**  
> This repository is for **educational and personal use only**.  
> Use responsibly and privately.
