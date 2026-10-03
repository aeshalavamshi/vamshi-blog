# How to write on this blog (for beginners)

You never need to run a server or learn programming. A post is just a text file.

## Easiest way: edit in your browser

1. Open https://github.com/aeshalavamshi/vamshi-blog
2. Press the **.** (full stop) key on your keyboard. A full editor opens in the browser.
3. Open the `_posts` folder, right-click, and choose **New File**.
4. Name it like `2026-11-02-my-post-title.md` (date first, then a short title with dashes).
5. Paste the template below, write, and save.
6. Click the **Source Control** icon (left bar), type a short message such as "New post", and click **Commit & Push**.
7. Wait 1–2 minutes. Your post appears at https://vamshi.actualyz.com

## Template

```
---
layout: post
title: "Your title here"
tags: [discipline, madhyastha-darshan]
categories: [Madhyastha Darshan]
---

Your first paragraph goes here. Leave a blank line between paragraphs.

## A section heading

Use **bold**, *italics*, and [links](https://example.com).

> A quote looks like this.

![Describe the picture](/assets/img/my-picture.jpg)
```

A copy of this template is in `_templates/post-template.md`.

## Tips

- **Madhyastha Darshan page:** posts with `categories: [Madhyastha Darshan]` automatically appear at the bottom of that page.
- **Drafts:** put unfinished posts in the `_drafts` folder. They stay private until you move them to `_posts`.
- **Pictures:** upload to `assets/img/`, then reference them as `/assets/img/filename.jpg`.
- **YouTube video:** paste this, replacing VIDEO_ID with the part after `v=` in the video URL:
  `<div class="video"><iframe src="https://www.youtube-nocookie.com/embed/VIDEO_ID" allowfullscreen></iframe></div>`
- **Site name, tagline, author:** edit `_config.yml`.
- **About page:** edit `about.md`. Look for the `EDIT ME` note to add a personal paragraph.
- **Undo a mistake:** every change is saved in history, so nothing is ever lost. Ask Claude to revert if needed.

## Working from the Desktop folder

The folder `~/Desktop/vamshi-blog` is a full copy. Edit files with any text editor (VS Code recommended), then in Terminal:

```
cd ~/Desktop/vamshi-blog
git add -A && git commit -m "Update" && git push
```
