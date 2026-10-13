#!/usr/bin/env bash
# Quick live checks for redirects, canonical, H1, CSP (run after deploy).
set -euo pipefail
BASE="https://alexandraaleksiuk.com"

check_redirect() {
  local url="$1"
  echo "==> $url"
  curl -sI "$url" | grep -E '^(HTTP|location):' || true
}

check_canonical() {
  local path="$1"
  local expected="$2"
  local got
  got=$(curl -s "${BASE}${path}" | grep -o 'rel="canonical" href="[^"]*"' | head -1)
  echo "${path}: ${got:-MISSING} (expect ${expected})"
}

check_h1() {
  local path="$1"
  local h1
  h1=$(curl -s "${BASE}${path}" | sed -n 's/.*<h1[^>]*>\([^<]*\).*/\1/p' | head -1)
  echo "${path} H1: ${h1:-EMPTY}"
}

echo "--- Redirects ---"
check_redirect "https://www.alexandraaleksiuk.com/"
check_redirect "${BASE}/"
check_redirect "${BASE}/uk/"

echo "--- Canonical ---"
check_canonical "/uk" "${BASE}/uk"
check_canonical "/ru" "${BASE}/ru"
check_canonical "/uk/aboutMe" "${BASE}/uk/aboutMe"
check_canonical "/uk/consultation" "${BASE}/uk/consultation"
check_canonical "/uk/supervision" "${BASE}/uk/supervision"

echo "--- H1 (SSR) ---"
check_h1 "/uk/aboutMe"
check_h1 "/uk/consultation?type=individual"
check_h1 "/uk/supervision?type=individual"

echo "--- CSP ---"
curl -sI "${BASE}/uk" | grep -i content-security-policy || echo "No CSP headers"
