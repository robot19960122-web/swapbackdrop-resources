# SwapBackdrop Frame Lab container

A self-hostable static browser tool for composing an **already transparent PNG** onto portrait, square or landscape backgrounds. Change color, zoom and offsets, then export a still PNG. It does not remove backgrounds, process video or run AI. Brand-authored with AI assistance.

## Pull and run

The public image is [wenwell/swapbackdrop-frame-lab](https://hub.docker.com/r/wenwell/swapbackdrop-frame-lab), with `0.1.0` and `latest` tags. Both tags currently resolve to:

```text
sha256:da5845db51e5ad51ab4c25fa49ce693cfc60096dabbe2ec7d657c8f7bb6944fb
```

```sh
docker pull wenwell/swapbackdrop-frame-lab:0.1.0
docker run --rm --name frame-lab -p 127.0.0.1:8080:8080 \
  --read-only --tmpfs /tmp:rw,noexec,nosuid,size=16m \
  --cap-drop ALL --security-opt no-new-privileges:true \
  wenwell/swapbackdrop-frame-lab:0.1.0
```

The index includes Linux ARM64 and AMD64 images, plus provenance attestations (shown by some clients as unknown/unknown; these are not additional runnable platforms). ARM64 has been pulled without registry credentials and run with HTTP smoke checks. AMD64 was tested under emulation on the ARM maintainer machine, not native AMD64 hardware. Image runtime source revision: `6b91e410ff14569681a1dc0c3b79792a85920cf8`.

## Build from source

From the public resource repository root:

```sh
docker build -t swapbackdrop-frame-lab:0.1.0 .
docker run --rm --name frame-lab -p 127.0.0.1:8080:8080 \
  --read-only --tmpfs /tmp:rw,noexec,nosuid,size=16m \
  --cap-drop ALL --security-opt no-new-privileges:true \
  swapbackdrop-frame-lab:0.1.0
```

Open http://localhost:8080. No volumes, login, environment variables or API keys are needed. The image serves static files as UID/GID 101 on port 8080. `/healthz` is the container health endpoint. The root filesystem can be read-only with writable `/tmp` as above. Loopback binding is intentional: do not expose a public port unless you independently configure the hosting, HTTPS and access requirements.

The Docker build context and copied runtime files are explicit allowlists. No production source, credentials, user media, account configuration, `.git`, or npm credentials are included. The upstream Nginx manifest is pinned; rebuild and retest periodically for upstream security updates. This does not imply a vulnerability-free image.

## Privacy and limitations

Selected PNGs are decoded and composed in the browser, with no upload endpoint, analytics, network API or inference call. The static server does not keep access logs; a hosting proxy or platform may independently log requests. An external website link opens only when clicked.

Files are limited to 15 MB and 16 million pixels. The pixel limit is checked **after** browser decoding, so it is not a strict decode-memory guarantee. Export is PNG only. Opaque images keep their backgrounds. Browser/device compatibility and full video quality cannot be inferred from geometry tests.

The public resource and implementation are at [GitHub](https://github.com/robot19960122-web/swapbackdrop-resources). For the separate paid cloud short-video workflow see [SwapBackdrop](https://swapbackdrop.com/?utm_source=dockerhub&utm_medium=referral&utm_campaign=resource_distribution_202610&utm_content=frame_lab). This container is not the production SaaS and does not demonstrate its AI quality. Contact: support@swapbackdrop.com.

Release verification on 2026-10-23 confirmed the public repository/overview, tracked product link, both runnable platform descriptors, the version timestamp from Docker Hub, anonymous ARM64 pull and runtime HTTP behavior. Search indexing, referral traffic and rendered link rel remain unverified.
