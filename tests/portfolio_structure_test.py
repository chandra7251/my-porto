from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PAGES = [ROOT / name for name in ("index.html", "project.html", "404.html")]

for page in PAGES:
    source = page.read_text(encoding="utf-8")
    assert 'href="assets/app.css"' in source, f"{page.name} must load Tailwind output"
    assert 'style.css' not in source, f"{page.name} must not load legacy CSS"
    assert 'calm-' not in source, f"{page.name} still contains legacy styling classes"

assert not (ROOT / "style.css").exists(), "legacy stylesheet must be removed"
print("portfolio structure: ok")
