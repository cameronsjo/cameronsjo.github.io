# Retro: homepage as a command-palette launcher — 2026-05-31

Raw material capture. Not an article. The project is `cameronsjo.github.io` — the
root landing page and a *downstream consumer* of the Artificer design system (it
mirrors tokens + the editorial layer, owns no palette values). Author: Cameron Sjo.
Surfaces split into "tool" vs "document"; this session's whole pivot turned on that
distinction.

---

## Decisions Made

**Start from a plan to kill a doubled divider + fit one viewport, then abandon most of it.**
- What: an approved plan (scoped `<style>` to de-double the footer rule, drop `flex-1`, `py-10`→`py-6`, lean the bio + blurbs) was executed first.
- Alternatives: just ship the plan as-is.
- Reasoning: the plan worked, but seeing it rendered, Cameron wanted more — space between bio and first link, and then a full redesign.
- Confidence: superseded. The launcher replaced the plan's `.entries` scoped overrides entirely; only `BaseLayout py-6` and the `consts.ts` blurb trims survived into commit 1.

**Two prototypes (A editorial cards, B launcher), built throwaway, served side-by-side — let the eye decide.**
- What: instead of arguing A vs B in the abstract, built both as real Astro pages (`/proto-a`, `/proto-b`) served on the live preview, with the real `/` for comparison.
- Alternatives: pick one direction up front; ASCII mockups only (offered in AskUserQuestion, Cameron picked "Both — show me a mockup of each").
- Reasoning: the page is "just links/redirection and bio" — small enough that a real render beats a described one.
- Confidence: settled. B won decisively.

**B (the launcher) over A (editorial cards).**
- What: a ⌘K-style command palette as the homepage centerpiece.
- Alternatives: A = three destination cards (lowest risk, warmest, but "the single most common landing-page shape on the web — correct but not distinctive").
- Reasoning (verbatim author): "I fucking love the launcher. that's artificer." The assistant's pre-vote was also B "with a caveat" — that a static palette risks looking interactive-but-isn't.
- Confidence: settled.

**Reframe the page as a TOOL surface, contradicting the repo's own CLAUDE.md.**
- What: treat the landing page as a tool (mono throughout, launcher motif), even though `CLAUDE.md` pre-declares the repo a *document* surface (sans body, mono headlines).
- Alternatives: honor the document-surface decision (what the original editorial list did).
- Reasoning: the page's *job* is wayfinding — "you came to *do* something (jump somewhere)." Whole-page mono stops being an accident and becomes a choice. Also corrected a wrong assumption mid-session: the bio was *already* sans (`.prose` inherits `html { font-family: var(--font-sans) }` — iA Writer Quattro S just *looks* mono-ish), so there was no "mono drift" to fix; the document surface was already correct, which reframed A as "refine" and B as "the real swing."
- Confidence: settled, and explicitly generalized into an opinion (below).

**Build the palette from tokens, not from a utility class.**
- What: hand-built `.palette` / `.row` / prompt / empty-state from Artificer tokens.
- Alternatives: use `.card` / `.grid-auto` (what CLAUDE.md hard-rules tell you to reach for).
- Reasoning: those utilities **don't exist in this consumer** — it ships `global.css` (editorial classes: `.entries/.entry/.hero/.prose/...`) + Tailwind v4 only. "Use existing utility classes" is unfollowable for cards/palettes here; tokens are the real contract.
- Confidence: settled (forced by reality, then validated).

**Progressive enhancement: the three `<a>` links are the no-JS baseline; fuzzy + keyboard layer on top.**
- What: keep real `<a href>` links; the input/filter/keyboard nav is enhancement.
- Alternatives: a JS-only combobox.
- Reasoning: a11y checklist item 12 — "content readable without JS; forms *may* require JS." The links must work without the script; the input is allowed to require it. Chose NOT to add `tabindex="-1"` to the rows so no-JS keyboard users keep Tab access (trading strict combobox purity for robustness).
- Confidence: settled.

**Fuzzy scoring: subsequence match, word-boundary +5, consecutive-streak ×2.**
- What: a small `score()` returning −1 unless every query char appears in order; bonuses for runs and word-start matches.
- Alternatives: substring-only filter; a library.
- Reasoning: with only 3 items the *gesture* matters more than the algorithm, but ranking must put the intended target first. Verified by node: `spec`→spec-compare #1, `harness`→agentic-harnesses only, `xyz`→empty, `""`→all three in order.
- Confidence: "good enough for now" — weights are admittedly tuned for 3 items and flagged as don't-upstream.

**Remove the three header nav links.**
- What: header keeps only wordmark + theme toggle.
- Reasoning (verbatim author): "we can remove the three things from the header. they're already present in the body." Duplicating destinations as chrome is redundant.
- Confidence: settled.

**Footer center fix via true-thirds flex.**
- What: replace `justify-between` with three `sm:flex-1` columns (left default / middle `text-center` / right `justify-end`).
- Reasoning: `justify-between` centers the middle item only *within the gap*, which skews when the © line is wider than the GitHub link. Cameron: "the 'kindness is free.' appears off center."
- Confidence: settled.

**Commit on a feature branch as two commits, then run polish — and the separate a11y commit.**
- What: `feat/homepage-launcher` with (1) layout/copy compression, (2) launcher + chrome; then a third `fix(a11y)` after the review.
- Alternatives: land on `main`; amend the a11y fixes into commit 2.
- Reasoning: branch + reviewable units over a straight-to-main push. Chose a *separate* a11y commit (not `--amend`) to document the review→fix loop in history as a decision log. The order had friction (see below).
- Confidence: settled, with a noted "do it differently" (run polish before committing).

---

## Friction & Dead Ends

**The persistent blank/garbled terminal-render glitch.** For a long stretch, `Bash`/`Read` output rendered empty (or with doubled lines and injected fragments like a phantom "wait") then recovered, dumping the whole buffer at once. This is documented in the user's CLAUDE.md as a background/auto-mode artifact. Workarounds actually used: treat a blank render as **UNKNOWN, never fabricate**; re-run capturing to a fixed temp file and `Read` it; wrap output in `SENT_A`/`SENT_B` sentinels; and finally an `od -c` **byte dump** to get ground truth on the fuzzy output when the rendered text couldn't be trusted. The byte dump is what disproved a scary-looking false reading ("blog(2) for query spec") that was display corruption, not a real bug — reasoned the algorithm correct *by construction* (returns −1 unless all query chars match) before trusting any rendered number.

**The failed `Header.astro` edit — source ≠ rendered output.** First attempt to remove the nav links matched the inline `<a href="/blog">…` tags seen in the *built* `dist/index.html`. The edit failed: the **source** builds its nav by `.map()`-ing a `const nav = [...]` array, which the build *expands* into those inline tags. Lesson the harness enforced for free: edit against a fresh `Read` of source, not a remembered render. (Also surfaced `withBase` / `src/utils`, previously unknown.)

**Clobbered `docs/artificer-adaptations.md` with `cat >`.** The artificer-feedback skill said *append*; used `cat >` (overwrite) instead and destroyed a prior entry — the "v0.6/v0.7.2 → v0.9.0 mirror crossing" log linked to upstream issue #76. Caught it because `git status` showed the file as ` M` (modified/tracked), not `??` (untracked) — meaning it pre-existed. The `git diff` confirmed the removed lines. Recovered with `git checkout HEAD -- <file>`, then appended the new entry beneath the restored one. Not yet committed when caught, so no history damage. This maps exactly to the user's CLAUDE.md guardrail: "Before deleting or overwriting, look at the target — if you didn't create it, surface that."

**The surface pre-classification fought the design.** Following CLAUDE.md's "this is a document surface, sans body, mono headlines" produced a perfectly correct, perfectly *generic* editorial list — visually identical to the blog's post index, with numbered `01/02/03` entries implying a sequence the three links don't have. The page only came alive when the assistant *contradicted the stated surface*. Framed in the upstream feedback as the highest-signal friction.

**Hard rules reference utilities the consumer never received.** CLAUDE.md hard-rule 2 ("use existing utility classes: `.card`, `.grid-auto`, `.btn`, `.stack`, `.cluster`…") points at `artificer.css` — the design-system repo's file. This consumer ships only `global.css` + Tailwind. A builder following the rules verbatim reaches for `.card` and finds nothing. Filed as a `confusion`-type deviation.

**Polish ran *after* commit, so simplify had nothing to chew on.** `/polish`'s Phase 1 (simplify) is working-tree-scoped; the tree was clean (all committed), so simplify would see an empty diff. Only the branch-scoped read-only review arm (`cadence:reviewer`) operated on the committed changes. Also: most polish phases whiff on a static page — logging (no operations), tests (no test infra; the one real unit, `score()`, is embedded in an Astro `<script>`, not exported). Scoped the polish down to the review arm by judgment, against the skill's "full pass" default, and said so.

**Browser navigation declined early.** An attempt to drive Chrome to the preview server was denied by the user. Respected the denial (didn't retry verbatim); verified via build + node + static `dist` greps instead. Net effect: the launcher was never live-tested in a browser this session.

---

## Opinions Formed

- **Tool-vs-document is a per-*page* call, not a per-*repo* constant.** A repo-level `CLAUDE.md` can freeze the surface decision wrong for a single page inside it. The landing page of a document-surface repo can still be a tool. Earned by watching the document-surface framing produce a blog-clone.
- **"The blog's post-list applied to three links" is the anti-pattern.** The numbered editorial entries read as "here are some articles" and imply recency/sequence that wayfinding links don't have. The treatment was correct for posts and wrong for destinations.
- **Artificer has "a named gesture without a body."** The keymap canonizes ⌘K as "the single entry to everything" and `/` as filter, but the system ships *no command-palette component* to bind them to. Every consumer hand-builds the gesture from tokens. This is the same shape of gap as the previously-surfaced "unowned editorial layer." (This became the spine of upstream feedback #98.)
- **Whole-page mono is *correct* on a launcher and *wrong* on a document.** Mono everywhere is the tell of a misclassified document surface — but on a tool surface (a launcher you operate) it's the point, not an accident.
- **A static landing page is a poor fit for most of `/polish`.** Logging, tests, and simplify whiff; firing those agents on a clean pre-PR tree adds noise, which is the opposite of polishing. The read-only review arm is the part that earns its keep here.
- **Redundant focus signals are fine.** After restoring the input ring, both the input outline *and* the palette `:focus-within` border go accent — deliberately kept both; redundancy in focus indication is good a11y, not a smell.

---

## Implementation Notes

Axes that matter for this project: surface decision, token-only constraint, Astro scoped-style overrides, the progressive-enhancement command palette, fuzzy scoring, ARIA combobox/listbox.

**Astro scoped `<style>` as the override mechanism.** The de-double fix lived in a scoped `<style>` in `index.astro`, which Astro rewrites with a per-component `data-astro-cid-*` attribute and **hoists into the external CSS bundle** (`/_astro/index.*.css`) — *not* inlined in the HTML. First HTML grep for the rule came up empty for exactly this reason; the real proof was in the bundle:
```
.entries[data-astro-cid-j7pv25f6]{border-bottom:none}
.hero[data-astro-cid-j7pv25f6]{margin-bottom:var(--s-lg)}
```
The scoping attribute lands *between* class and pseudo-class — `.palette__input[data-astro-cid-…]:focus-visible{…}` — which later caused a false-negative grep for `palette__input:focus-visible`.

**The fuzzy `score()` (subsequence, node-verified).**
```js
function score(query, text) {
  if (!query) return 0;
  let qi = 0, s = 0, streak = 0, prev = -2;
  for (let ti = 0; ti < text.length && qi < query.length; ti++) {
    if (text[ti] === query[qi]) {
      streak = ti === prev + 1 ? streak + 1 : 1;
      s += streak * 2;                                  // consecutive-run bonus
      if (ti === 0 || text[ti-1] === ' ' || text[ti-1] === '-') s += 5; // word-boundary bonus
      prev = ti; qi++;
    }
  }
  return qi === query.length ? s : -1;                  // -1 = not all chars matched in order
}
```
Ranking verified out-of-band with node against the real `data-search` haystacks; the intended target always ranked #1.

**ARIA combobox/listbox/option — and the role-on-`<li>` fix.** Initial markup put `role="option"` on the `<a>` row. The review flagged this as invalid (the `option` role is prohibited on a link's implicit role; AT announces it as both). Fix: `role="option"` + `aria-selected` + `id="opt-N"` moved to the wrapping `<li>`; the visual `.is-active` class stays on the inner `<a class="row">`. The JS now keeps ARIA selection on the `<li>` and the highlight on the `<a>`:
```js
rows.forEach((a) => a.classList.remove('is-active'));
items.forEach((it) => it.li.setAttribute('aria-selected', 'false'));
const el = vis[active];
if (el) {
  const li = el.closest('li');
  el.classList.add('is-active');
  li.setAttribute('aria-selected', 'true');
  input.setAttribute('aria-activedescendant', li.id);
}
```
Other review fixes: restored `.palette__input:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px }` after a bare `outline: none` killed the global ring; hardened the global `/` handler to also skip `<textarea>` and `contenteditable`; set `aria-expanded` via JS on init so no-JS paths don't claim an open popup.

**Footer true-thirds centering.** Three `sm:flex-1` spans (`text-left` default / `text-center` / `justify-end`) replace `justify-between` so the middle line sits at real page center regardless of side-column widths.

**Token-only palette.** Every color/space/radius/duration is a `var(--…)`; reduced-motion handled both globally (2 blocks in `global.css`) and belt-and-suspenders in the scoped block. Known token gaps, all flagged in `docs/artificer-adaptations.md`: `font-size: 12px` (no type-scale token in this consumer), `translateX(3px)` (no 3px spacing token), `--steel` (consumer-local, not in the cheatsheet).

**Would do differently starting over:** run `/polish` *before* committing (so simplify has a working tree to operate on); `cat >>`/check-first instead of `cat >` on any file that might already exist; edit Astro components against source, not the expanded `dist` HTML.

---

## Quotable Moments

Verbatim (Cameron):

- "I fucking love the launcher. that's artificer."
- "and that's feedback back to the system."
- "my only tweak is that the 'kindness is free.' appears off center."
- "and we can remove the three things from the header. they're already present in the body."
- "and if we could make the launcher interactive with fuzzy search"
- "I also wouldn't mind a full redesign to see what we can come up with since this is just links/redirection and bio. But give me your thoughts on ths before we do it." *(sic — "ths")*
- "It's better.. I think we need some more space between the end of the bio and the first link."
- "Then we may need to run /polish, /retro and /outro?"
- "Let's do it."
- "Yes to pushing and opening the pr."

---

## Open Threads

- **Live browser test never happened.** The palette was verified by `npm run build`, `astro check` (0/0/0), node fuzzy ranking, and static `dist` greps — never driven in a real browser (Chrome nav was declined). A manual pass (type `spec`, `⌘K`, `/`, `↑↓`, `↵`, `Esc`) plus reduced-motion + 200%-zoom check is still pending before merge.
- **PR #4** (`feat/homepage-launcher` → `main`) is open, awaiting review/merge.
- **Upstream feedback issue #98** (`cameronsjo/artificer-design-system`) is open — the "command-palette gesture with no component" report.
- **Chrome whimsy budget.** The shared chrome already spends two whimsy moments (header wordmark `whimsy--brand` + footer `whimsy--glacial` "kindness is free"), arguably at/over the "one whimsy moment per view" doctrine before the body adds any. Left as-is, flagged; unresolved whether persistent chrome whimsy counts against the per-view budget.
- **`/outro`** still to run at session end (owns the CLAUDE.md reflection sweep).
- **`writing-field-report`** floated as the narrative companion to this raw capture; not run.

---

## Honesty flags

- **Confidence tags are inferred.** Cameron never labeled decisions "settled" vs "good enough"; I assigned those from tone and whether he revisited them. The fuzzy-weights "good enough for now" tag in particular is my read (it's flagged don't-upstream in the adaptations doc, which I treated as provisional intent).
- **The "redundant focus signals are fine" opinion is sharpened.** It was an assistant design choice in the a11y fix, endorsed implicitly by Cameron greenlighting the PR — not a stated belief of his.
- **Most "Opinions Formed" are assistant-articulated and Cameron-endorsed**, not verbatim author opinions, except where they echo his quotes ("that's artificer"). I phrased them as the project's working stance; treat attribution loosely.
- **Render-glitch details** (the phantom "wait", doubled lines) are reconstructed from corrupted tool output during the session; exact corrupted strings may be imprecise, but the workaround pattern (UNKNOWN-not-fabricate, temp files, `od -c`) is accurate.
- **No verbatim assistant-side reasoning is quoted as Cameron's.** The "with a caveat" pre-vote and surface-analysis prose were the assistant's; attributed as such.
- I did **not** commit anything, per directive.
