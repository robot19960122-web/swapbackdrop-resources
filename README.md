---
title: SwapBackdrop Frame Lab
emoji: 🖼️
colorFrom: green
colorTo: yellow
sdk: static
app_file: index.html
pinned: false
short_description: Local transparent-PNG composition helper. No AI inference.
---

# SwapBackdrop Frame Lab

A small browser-local composition helper for **existing transparent PNGs**. Preview portrait, square and landscape layouts, change the background color, scale and reposition the image, and download a composed PNG.

This is a brand-authored educational resource, created with AI assistance. It does **not** remove backgrounds, process video, or call an AI inference service. It is not an independent review or a preview of background-removal quality.

## Use

1. Choose a PNG up to 15 MB and 16 million pixels.
2. Select 9:16, 1:1 or 16:9 and a backdrop color.
3. Adjust scale and position. Inspect the edges and crop.
4. Export a still PNG. Review the result before sharing.

Opaque PNGs keep their original background. A still cannot establish temporal quality or audio/video sync. File decoding depends on the browser, and a metadata or layout check cannot guarantee video processing compatibility.

## Privacy and limits

The application code makes no network requests and does not upload selected files. It has no analytics, account system, AI inference or payment flow. The hosting platform independently handles access logs and its own privacy policy. Only click the external product link if you want to visit a separate service.

For the full existing-short-video workflow, see [SwapBackdrop](https://swapbackdrop.com/?utm_source=github&utm_medium=referral&utm_campaign=resource_distribution_202610&utm_content=frame_lab). Consult the current website for supported formats, limits, pricing, rights requirements and retention. Cloud video processing is paid; this helper is free and local.

Support: support@swapbackdrop.com.

## Run and test

Serve this directory with any static web server; JavaScript modules require HTTP(S), not opening `index.html` directly as a file. There are no package dependencies or build steps.

```sh
node --test test.mjs
```

Tests cover placement math only; real-browser PNG decode, visual layout and exported output must also be checked. No claim of mobile-device or broad browser compatibility is made without that verification.

## Short-video review checklist

- Confirm permission to edit and, separately, to use cloud processing.
- Keep the source file and record the intended destination and frame.
- Inspect codec, duration, dimensions, rotation, color mode and audio separately.
- Review hair, shoulders, fingers and held objects through the entire moving clip.
- Compare light and dark backgrounds; scaling cannot repair missing subject detail.
- Check sound, synchronization, ending and final crop in the actual exported video.

Only the new files in this resource directory are intended for public distribution. No production source, media, customer data, credentials or model weights are included.
