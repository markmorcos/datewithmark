# Deploying Datebloom (Kubernetes + Helm)

The static Astro build is containerized (nginx) and shipped with the Helm chart in
`helm/datebloom`. The site is served at **https://datewithmark.com** (and `www.`).

## 1. Build & push the image

```bash
# from the repo root
docker build -t ghcr.io/markmorcos/datebloom:0.1.0 .
docker push ghcr.io/markmorcos/datebloom:0.1.0
```

The image tag should match the chart `appVersion` (or set `image.tag` explicitly).

## 2. Install / upgrade

```bash
helm upgrade --install datebloom ./helm/datebloom \
  --namespace datebloom --create-namespace \
  --set image.tag=0.1.0
```

Override anything from `values.yaml` with `--set` or your own `-f values.prod.yaml`.

## Assumptions (change in `values.yaml` if different)

- **Ingress controller:** `ingressClassName: nginx`.
- **TLS:** cert-manager with a `ClusterIssuer` named `letsencrypt-prod`
  (annotation `cert-manager.io/cluster-issuer`). The cert is stored in the
  `datebloom-tls` secret. If you terminate TLS elsewhere, drop the annotation/`tls` block.
- **Registry:** `ghcr.io/markmorcos/datebloom`. Add `imagePullSecrets` if private.
- **DNS:** `datewithmark.com` and `www.datewithmark.com` must point at the ingress
  controller's external address.

## Validate without a cluster

```bash
helm lint ./helm/datebloom
helm template datebloom ./helm/datebloom        # render manifests
```
