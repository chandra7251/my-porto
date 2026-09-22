from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PAGES = [ROOT / name for name in ("index.html", "project.html", "404.html")]

for page in PAGES:
    source = page.read_text(encoding="utf-8")
    assert 'href="assets/app.css"' in source, f"{page.name} must load Tailwind output"
    assert 'style.css' not in source, f"{page.name} must not load legacy CSS"
    assert 'calm-' not in source, f"{page.name} still contains legacy styling classes"

assert not (ROOT / "style.css").exists(), "legacy stylesheet must be removed"

script = (ROOT / "script.js").read_text(encoding="utf-8")
assert "scrollIntoView" not in script, "carousel must not scroll the document"
assert "carousel.scrollTo" in script, "carousel must move within its own scroll container"

home = (ROOT / "index.html").read_text(encoding="utf-8")
assert "menu-label" in home and "menu-icon" in home, "mobile menu needs clear state cues"
assert "Download CV" in home and "border-slate-300" in home, "CV download needs button affordance"
project_data = (ROOT / "projects.js").read_text(encoding="utf-8")
build = (ROOT / "scripts" / "build.mjs").read_text(encoding="utf-8")

assert "Open to full-time software engineering opportunities" in home, "contact copy must target full-time work"
assert "internship" not in home.lower(), "home page must not target internships"
assert 'src="projects.js"' in home, "home page must load shared project data"
assert 'id="featured-projects"' in home, "home page needs featured project container"
assert 'id="other-projects"' in home, "home page needs other project container"
assert "zeta-e-procurement" in project_data, "shared project data must include ZETA"
assert "coffee-karawang" in project_data, "shared project data must include Coffee Karawang"
assert '"projects.js"' in build, "build must publish shared project data"
assert '"project-detail.js"' in build, "build must publish project detail renderer"
detail = (ROOT / "project.html").read_text(encoding="utf-8")
detail_script = (ROOT / "project-detail.js").read_text(encoding="utf-8")
assert 'src="projects.js"' in detail, "project page must load shared project data"
assert 'src="project-detail.js"' in detail, "project page must load shared detail renderer"
assert "Technical Highlights" in detail_script, "detail renderer must expose technical highlights"
assert "My Role" in detail_script, "detail renderer must expose project role"
assert 'application/ld+json' in home and '"@type":"Person"' in home, "home page needs Person structured data"
assert "Open GitHub repository" in detail_script, "detail links need descriptive labels"
assert "prefers-reduced-motion" in script, "motion must respect user preference"
assert "cards = [...carousel.querySelectorAll('.project-card')]" in script, "carousel controls must use card order after project reordering"
assert "let carouselIndex = 0" in script, "carousel controls need persistent position for repeated clicks"
assert "carouselIndex = nextIndex" in script, "carousel controls must advance stored position before smooth scroll finishes"
print("portfolio structure: ok")
