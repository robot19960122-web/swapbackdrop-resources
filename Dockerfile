# Pinned multi-platform upstream manifest; update deliberately and retest.
FROM nginx:stable-alpine@sha256:47928bf67eb62a1863cb08d9ecb52d3e704304ba614eaee17884204677702951
LABEL org.opencontainers.image.title="SwapBackdrop Frame Lab" \
      org.opencontainers.image.description="Browser-local transparent PNG composition. No AI inference or uploads." \
      org.opencontainers.image.source="https://github.com/robot19960122-web/swapbackdrop-resources" \
      org.opencontainers.image.url="https://swapbackdrop.com/?utm_source=dockerhub&utm_medium=referral&utm_campaign=resource_distribution_202610&utm_content=frame_lab" \
      org.opencontainers.image.version="0.1.0"
COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY index.html geometry.mjs /srv/frame-lab/
COPY packages/frame-geometry/geometry.mjs /srv/frame-lab/packages/frame-geometry/geometry.mjs
RUN sed -i 's/utm_source=huggingface/utm_source=dockerhub/g' /srv/frame-lab/index.html
USER 101:101
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 CMD wget -q -O /dev/null http://127.0.0.1:8080/healthz || exit 1
ENTRYPOINT ["nginx"]
CMD ["-g", "daemon off;"]
