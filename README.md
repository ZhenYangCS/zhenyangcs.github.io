# Zhen Yang · Academic Homepage

Tiny static site built from a single `index.html`, one stylesheet,
and two short scripts. No Jekyll, no build step, no node_modules.

## Structure

```
.
├── index.html          # the page
├── css/style.css       # all styles
├── js/
│   ├── papers.js       # publication list (edit this to add papers)
│   └── main.js         # rendering + visitors globe
└── images/
    ├── avatar.jpg      # profile photo
    ├── avatar-hover.jpg # hover photo
    ├── logos/          # affiliation logos
    └── papers/         # paper teasers
```

## Local preview

The site is fully static — just open `index.html` in a browser, or run:

```bash
python3 -m http.server 8000
```

then visit <http://localhost:8000/>.

## Adding a paper

Open `js/papers.js` and add a new object to the `PAPERS` array.
The newest paper goes first (papers are sorted by year automatically):

```js
{
  title: "Your Awesome Paper",
  authors: [{ name: "Zhen Yang", me: true }, "Co-Author"],
  venue: "ICLR 2027",
  year: 2026,
  links: {
    arxiv: "https://arxiv.org/abs/xxxx.xxxxx",
    code:  "https://github.com/...",
    page:  "https://...",
    hf:    "https://huggingface.co/papers/..."
  },
  thumb: "images/papers/your-paper.jpg",   // optional
  tags: ["Diffusion", "..."],
  description: "One-sentence elevator pitch."
}
```

Mark yourself with `{ name: "Zhen Yang", me: true }` and the renderer
will underline you.

## Adding paper teasers

Drop the image into `images/papers/` and reference it via `thumb` in
`js/papers.js`. If `thumb` is omitted, a tasteful gradient placeholder
is generated automatically.

## Visitors globe

The 3D globe at the bottom uses [globe.gl](https://github.com/vasturiano/globe.gl)
loaded from CDN. The visitor cities are currently a curated seed list in
`js/main.js` (`VISITOR_SEED`). Swap in real analytics data later if you like.

## Deployment

Push to `main`. GitHub Pages serves the static files as-is.

---

Made with curiosity and a tiny bit of laziness 🌱
