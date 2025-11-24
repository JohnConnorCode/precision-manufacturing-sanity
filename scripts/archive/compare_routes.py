#!/usr/bin/env python3
"""
Utility script to compare rendered HTML between the reference production site
and the local dev server. It fetches each target route, converts the HTML to a
plain-text representation, and writes both versions plus a unified diff to
docs/ for quick review.
"""

from __future__ import annotations

import difflib
import os
import sys
import urllib.error
import urllib.request
from html.parser import HTMLParser
from typing import Iterable

PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOCS_DIR = os.path.join(PROJECT_ROOT, "docs")

REFERENCE_BASE = "https://precision-manufacturing.vercel.app"
LOCAL_BASE = "http://localhost:8080"

# Routes to compare (add more as needed)
ROUTES = [
    "/",  # Homepage
    "/services",
    "/services/5-axis-machining",
    "/services/adaptive-machining",
    "/services/metrology",
    "/services/engineering",
    "/industries",
    "/industries/aerospace",
    "/industries/defense",
    "/industries/energy",
    "/resources",
    "/resources/quality-compliance",
    "/resources/manufacturing-processes",
    "/resources/industry-applications",
    "/resources/quality-compliance/as9100d-compliance-checklist",
    "/resources/manufacturing-processes/5-axis-cnc-machining-aerospace-guide",
    "/resources/manufacturing-processes/wire-edm-precision-machining",
    "/resources/cmm-inspection/cmm-probe-selection-configuration-guide",
    "/resources/industry-applications/defense-itar-manufacturing-guide",
    "/resources/material-science/titanium-machining-complete-guide",
    "/resources/metbase-integration/metbase-statistical-analysis-spc-reporting",
    "/about",
    "/contact",
    "/careers",
    "/compliance/supplier-requirements",
    "/compliance/terms",
]


class TextExtractor(HTMLParser):
    """Simple HTML → text converter for structural comparison."""

    BLOCK_TAGS = {
        "p",
        "div",
        "section",
        "article",
        "header",
        "footer",
        "main",
        "aside",
        "nav",
        "ul",
        "ol",
        "li",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "table",
        "tr",
        "td",
        "th",
        "figure",
        "figcaption",
        "button",
    }

    LINE_BREAK_TAGS = {"br", "hr"}

    def __init__(self) -> None:
        super().__init__()
        self._parts: list[str] = []
        self._open_blocks: list[str] = []

    def handle_starttag(self, tag: str, attrs) -> None:  # type: ignore[override]
        if tag == "img":
            alt = ""
            src = ""
            for key, value in attrs:
                if key == "alt":
                    alt = value or ""
                if key == "src":
                    src = value or ""
            label = alt or src
            if label:
                self._parts.append(f"[IMG:{label.strip()}]")
                self._parts.append(" ")
        if tag in self.LINE_BREAK_TAGS:
            self._parts.append("\n")
        if tag in self.BLOCK_TAGS:
            self._open_blocks.append(tag)

    def handle_endtag(self, tag: str) -> None:  # type: ignore[override]
        if tag in self.BLOCK_TAGS:
            self._parts.append("\n")
            if self._open_blocks and self._open_blocks[-1] == tag:
                self._open_blocks.pop()

    def handle_data(self, data: str) -> None:  # type: ignore[override]
        text = data.strip()
        if text:
            self._parts.append(text)
            if self._open_blocks:
                self._parts.append(" ")

    def get_text(self) -> str:
        text = "".join(self._parts)
        # Collapse repeated whitespace/newlines for stability
        lines = [line.strip() for line in text.splitlines()]
        cleaned = "\n".join(line for line in lines if line)
        return cleaned.strip()


def fetch_html(url: str) -> str:
    try:
        with urllib.request.urlopen(url) as resp:
            charset = resp.headers.get_content_charset() or "utf-8"
            return resp.read().decode(charset, errors="replace")
    except urllib.error.URLError as exc:  # pragma: no cover - network failure
        raise RuntimeError(f"Failed to fetch {url}: {exc}") from exc


def html_to_text(html: str) -> str:
    parser = TextExtractor()
    parser.feed(html)
    return parser.get_text()


def fetch_text_with_error(base: str, route: str) -> tuple[str, str | None]:
    url = f"{base}{route}"
    try:
        html = fetch_html(url)
        return html_to_text(html), None
    except RuntimeError as exc:
        return f"__ERROR__ {exc}", str(exc)


def slugify_route(route: str) -> str:
    if route == "/":
        return "home"
    return route.strip("/").replace("/", "-") or "root"


def write_file(path: str, content: str) -> None:
    with open(path, "w", encoding="utf-8") as fh:
        fh.write(content)


def unified_diff(a: Iterable[str], b: Iterable[str], route_slug: str) -> str:
    return "\n".join(
        difflib.unified_diff(
            list(a),
            list(b),
            fromfile=f"reference-{route_slug}.txt",
            tofile=f"local-{route_slug}.txt",
            lineterm="",
        )
    )


def ensure_docs_dir() -> None:
    os.makedirs(DOCS_DIR, exist_ok=True)


def main() -> int:
    ensure_docs_dir()
    summary: list[str] = []

    for route in ROUTES:
        route_slug = slugify_route(route)
        print(f"Comparing route: {route} -> slug={route_slug}")

        reference_text, reference_error = fetch_text_with_error(REFERENCE_BASE, route)
        local_text, local_error = fetch_text_with_error(LOCAL_BASE, route)

        ref_path = os.path.join(DOCS_DIR, f"reference-{route_slug}-auto.txt")
        local_path = os.path.join(DOCS_DIR, f"local-{route_slug}-auto.txt")
        diff_path = os.path.join(DOCS_DIR, f"diff-{route_slug}-auto.txt")

        write_file(ref_path, reference_text + "\n")
        write_file(local_path, local_text + "\n")

        diff = unified_diff(reference_text.splitlines(), local_text.splitlines(), route_slug)
        write_file(diff_path, diff)

        diff_lines = diff.count("\n")
        error_note = ""
        if reference_error or local_error:
            error_parts = []
            if reference_error:
                error_parts.append(f"reference error: {reference_error}")
            if local_error:
                error_parts.append(f"local error: {local_error}")
            error_note = " | " + "; ".join(error_parts)
        summary.append(f"{route}: {diff_lines} diff lines (saved to {diff_path}){error_note}")

    print("\nSummary:")
    for line in summary:
        print(f" - {line}")

    return 0


if __name__ == "__main__":
    sys.exit(main())
