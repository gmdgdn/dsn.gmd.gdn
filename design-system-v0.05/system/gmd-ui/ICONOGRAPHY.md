# GMD functional iconography

Lucide is the functional icon family. Keep Egyptian/Islamic geometry and user-created architecture artwork as visual assets rather than substituting ornamental glyphs for familiar controls.

## Drawing and behavior

24-unit source grid, 2px stroke; 16px compact, 20px standard, 24px standalone. Inherit currentColor and semantic foreground roles. Use one icon per action when it clarifies meaning; use text whenever the action is unfamiliar. Avoid mixing outline families, decorative icon boxes and arbitrary filled symbols.

Use GMDIcon with a directly imported Lucide icon. Its directional flag mirrors navigation arrows in RTL. Do not mirror logos, media-play, checkmarks, search, clocks or buildings. Decorative icons are hidden from accessibility APIs. Standalone informational icons receive label; icon-only buttons also need their own accessible name. Built-in shadcn icons retain their component-controlled sizing.

| Purpose | Suggested Lucide imports |
|---|---|
| Collect | FolderPlus, Upload, ScanLine, FileInput |
| Organize | Tags, ListFilter, Layers, Network |
| Distribute | Share2, Download, Globe, Send |
| Datasets | Database, Table2, FileJson, Braces |
| Provenance | Fingerprint, History, Link, BookOpen |
| Rights and quality | ShieldCheck, BadgeCheck, CircleAlert, LockKeyhole |
| Products | Film, Archive, Gamepad2, LibraryBig |
| Navigation | ArrowRight, ArrowLeft, ChevronDown, Menu, Search, X |

Source/license: https://lucide.dev/guide/react and https://lucide.dev/license . Lucide remains a package dependency; selected icons are imported as SVG React components, not a whole dynamic dictionary.
