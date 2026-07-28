Smart Dev Debugger - Full Project Structure and Analysis (June 3, 2026)

Scope and method
- Scanned all workspace folders and files listed by the workspace index.
- Source and config files were read and analyzed; binary assets are documented as assets.
- Generated code is described as generated output and linked to its generator config.

======================================================================
STEP 2 - FULL PROJECT TREE (Every file with Type, Category, Purpose)
======================================================================

Dev Debugger/
|
|-- .dockerignore
|   -> Type: Docker ignore file
|   -> Category: Container build configuration
|   -> Purpose: Excludes local and build artifacts from Docker context.
|
|-- .env.example
|   -> Type: Environment template
|   -> Category: Configuration
|   -> Purpose: Documents required environment variables for local/prod.
|
|-- .gitattributes
|   -> Type: Git attributes file
|   -> Category: Source control configuration
|   -> Purpose: Sets text normalization rules for git.
|
|-- .gitignore
|   -> Type: Git ignore file
|   -> Category: Source control configuration
|   -> Purpose: Prevents committing build output, env files, caches.
|
|-- .npmrc
|   -> Type: NPM config file
|   -> Category: Package manager configuration
|   -> Purpose: Workspace npm behavior overrides (peer deps, etc).
|
|-- Dockerfile
|   -> Type: Docker build file
|   -> Category: Container build configuration
|   -> Purpose: Builds API server image via multi-stage build.
|
|-- ProjectStruct.md
|   -> Type: Documentation
|   -> Category: Project analysis
|   -> Purpose: Full project structure and architecture documentation.
|
|-- README.md
|   -> Type: Documentation
|   -> Category: Project overview
|   -> Purpose: Describes setup, features, and run instructions.
|
|-- docker-compose.yml
|   -> Type: Docker Compose config
|   -> Category: Container orchestration
|   -> Purpose: Defines local API service container and env wiring.
|
|-- package.json
|   -> Type: JSON config file
|   -> Category: Workspace configuration
|   -> Purpose: Root scripts, devDependencies, pnpm enforcement.
|
|-- pnpm-lock.yaml
|   -> Type: Lockfile
|   -> Category: Dependency management
|   -> Purpose: Pins exact dependency versions for the workspace.
|
|-- pnpm-workspace.yaml
|   -> Type: YAML config file
|   -> Category: Workspace configuration
|   -> Purpose: Defines workspace packages and pnpm rules.
|
|-- tsconfig.base.json
|   -> Type: JSON config file
|   -> Category: TypeScript configuration
|   -> Purpose: Base compiler options shared across packages.
|
|-- tsconfig.json
|   -> Type: JSON config file
|   -> Category: TypeScript configuration
|   -> Purpose: Root project references for TS builds.
|
|-- vercel.json
|   -> Type: JSON config file
|   -> Category: Deployment configuration
|   -> Purpose: Vercel project schema placeholder.
|
|-- attached_assets/
|   |-- Pasted-Add-a-Landing-Page-Full-Authentication-System-to-this-p_1777070056664.txt
|   |   -> Type: Text document
|   |   -> Category: Product requirements
|   |   -> Purpose: Captured task brief for landing page and auth system.
|   |
|   |-- Pasted-You-are-a-Staff-level-Full-Stack-Engineer-and-System-Ar_1777068755033.txt
|   |   -> Type: Text document
|   |   -> Category: Product requirements
|   |   -> Purpose: Captured architecture/vision brief.
|
|-- artifacts/
|   |-- api-server/
|   |   |-- .replit-artifact/artifact.toml
|   |   |   -> Type: TOML config file
|   |   |   -> Category: Replit artifact metadata
|   |   |   -> Purpose: Artifact metadata for Replit builds.
|   |   |
|   |   |-- DEPLOYMENT.md
|   |   |   -> Type: Documentation
|   |   |   -> Category: Deployment guide
|   |   |   -> Purpose: Dual deployment guidance (Railway/Render).
|   |   |
|   |   |-- build.mjs
|   |   |   -> Type: Node.js build script (ESM)
|   |   |   -> Category: Build tooling
|   |   |   -> Purpose: Bundles API server via esbuild.
|   |   |
|   |   |-- package.json
|   |   |   -> Type: JSON config file
|   |   |   -> Category: Package configuration
|   |   |   -> Purpose: API server scripts and dependencies.
|   |   |
|   |   |-- tsconfig.json
|   |   |   -> Type: JSON config file
|   |   |   -> Category: TypeScript configuration
|   |   |   -> Purpose: API server TS build settings.
|   |   |
|   |   |-- src/
|   |   |   |-- app.ts
|   |   |   |   -> Type: TypeScript module
|   |   |   |   -> Category: Express app setup
|   |   |   |   -> Purpose: Configures middleware, routes, and root endpoints.
|   |   |   |
|   |   |   |-- index.ts
|   |   |   |   -> Type: TypeScript module
|   |   |   |   -> Category: Server entry point
|   |   |   |   -> Purpose: Creates HTTP server, starts listeners, registers shutdown.
|   |   |   |
|   |   |   |-- config/
|   |   |   |   |-- env.ts
|   |   |   |   |   -> Type: TypeScript module
|   |   |   |   |   -> Category: Configuration
|   |   |   |   |   -> Purpose: Validates environment variables with Zod.
|   |   |   |   |
|   |   |   |   |-- platform.ts
|   |   |   |   |   -> Type: TypeScript module
|   |   |   |   |   -> Category: Configuration
|   |   |   |   |   -> Purpose: Derives platform flags (production, primary instance).
|   |   |   |
|   |   |   |-- lib/
|   |   |   |   |-- .gitkeep
|   |   |   |   |   -> Type: Git placeholder
|   |   |   |   |   -> Category: Repository hygiene
|   |   |   |   |   -> Purpose: Keeps empty lib folder in git.
|   |   |   |   |
|   |   |   |   |-- ai-engine.ts
|   |   |   |   |   -> Type: TypeScript module
|   |   |   |   |   -> Category: AI integration
|   |   |   |   |   -> Purpose: Builds prompts, calls LLM, validates report JSON.
|   |   |   |   |
|   |   |   |   |-- cache.ts
|   |   |   |   |   -> Type: TypeScript module
|   |   |   |   |   -> Category: Caching
|   |   |   |   |   -> Purpose: In-memory cache for analysis results.
|   |   |   |   |
|   |   |   |   |-- rate-limiter.ts
|   |   |   |   |   -> Type: TypeScript module
|   |   |   |   |   -> Category: Rate limiting
|   |   |   |   |   -> Purpose: Simple per-IP limiter for analysis endpoints.
|   |   |   |
|   |   |   |-- middleware/
|   |   |   |   |-- auth.ts
|   |   |   |   |   -> Type: TypeScript module
|   |   |   |   |   -> Category: Express middleware
|   |   |   |   |   -> Purpose: Verifies session cookie and loads user.
|   |   |   |   |
|   |   |   |   |-- error-handler.ts
|   |   |   |   |   -> Type: TypeScript module
|   |   |   |   |   -> Category: Express middleware
|   |   |   |   |   -> Purpose: Standardized 404 and error responses.
|   |   |   |   |
|   |   |   |   |-- rate-limit.ts
|   |   |   |   |   -> Type: TypeScript module
|   |   |   |   |   -> Category: Express middleware
|   |   |   |   |   -> Purpose: Global API rate limiting using express-rate-limit.
|   |   |   |   |
|   |   |   |   |-- request-sanitizer.ts
|   |   |   |   |   -> Type: TypeScript module
|   |   |   |   |   -> Category: Express middleware
|   |   |   |   |   -> Purpose: Sanitizes request bodies, params, and query.
|   |   |   |
|   |   |   |-- middlewares/
|   |   |   |   |-- .gitkeep
|   |   |   |   |   -> Type: Git placeholder
|   |   |   |   |   -> Category: Repository hygiene
|   |   |   |   |   -> Purpose: Keeps empty middlewares folder in git.
|   |   |   |
|   |   |   |-- routes/
|   |   |   |   |-- auth.ts
|   |   |   |   |   -> Type: TypeScript module
|   |   |   |   |   -> Category: API routes
|   |   |   |   |   -> Purpose: Auth routes for register/login/logout/me and Google OAuth.
|   |   |   |   |
|   |   |   |   |-- debug.ts
|   |   |   |   |   -> Type: TypeScript module
|   |   |   |   |   -> Category: API routes
|   |   |   |   |   -> Purpose: AI analysis and stats endpoints.
|   |   |   |   |
|   |   |   |   |-- health.ts
|   |   |   |   |   -> Type: TypeScript module
|   |   |   |   |   -> Category: API routes
|   |   |   |   |   -> Purpose: Health checks with /health and /healthz.
|   |   |   |   |
|   |   |   |   |-- history.ts
|   |   |   |   |   -> Type: TypeScript module
|   |   |   |   |   -> Category: API routes
|   |   |   |   |   -> Purpose: CRUD for debug session history.
|   |   |   |   |
|   |   |   |   |-- index.ts
|   |   |   |   |   -> Type: TypeScript module
|   |   |   |   |   -> Category: Route aggregator
|   |   |   |   |   -> Purpose: Mounts all API routers on /api.
|   |   |   |   |
|   |   |   |   |-- version.ts
|   |   |   |   |   -> Type: TypeScript module
|   |   |   |   |   -> Category: API routes
|   |   |   |   |   -> Purpose: Provides version and git commit info.
|   |   |   |
|   |   |   |-- services/
|   |   |   |   |-- auth.ts
|   |   |   |   |   -> Type: TypeScript module
|   |   |   |   |   -> Category: Auth service
|   |   |   |   |   -> Purpose: Password hashing, JWT handling, cookie options.
|   |   |   |   |
|   |   |   |   |-- primary-instance.ts
|   |   |   |   |   -> Type: TypeScript module
|   |   |   |   |   -> Category: Runtime service
|   |   |   |   |   -> Purpose: Starts primary-only jobs (cron/workers placeholders).
|   |   |   |   |
|   |   |   |   |-- resources.ts
|   |   |   |   |   -> Type: TypeScript module
|   |   |   |   |   -> Category: Resource management
|   |   |   |   |   -> Purpose: Tracks closable resources for graceful shutdown.
|   |   |   |   |
|   |   |   |   |-- shutdown.ts
|   |   |   |   |   -> Type: TypeScript module
|   |   |   |   |   -> Category: Runtime service
|   |   |   |   |   -> Purpose: Handles SIGINT/SIGTERM and graceful shutdown.
|   |   |   |   |
|   |   |   |   |-- websocket.ts
|   |   |   |   |   -> Type: TypeScript module
|   |   |   |   |   -> Category: Realtime placeholder
|   |   |   |   |   -> Purpose: Initializes optional websocket layer.
|   |   |   |
|   |   |   |-- utils/
|   |   |   |   |-- http.ts
|   |   |   |   |   -> Type: TypeScript module
|   |   |   |   |   -> Category: HTTP utilities
|   |   |   |   |   -> Purpose: Client IP extraction for rate limiting.
|   |   |   |   |
|   |   |   |   |-- logger.ts
|   |   |   |   |   -> Type: TypeScript module
|   |   |   |   |   -> Category: Logging
|   |   |   |   |   -> Purpose: Pino logger configuration and formatting.
|   |
|   |-- mockup-sandbox/
|   |   |-- .replit-artifact/artifact.toml
|   |   |   -> Type: TOML config file
|   |   |   -> Category: Replit artifact metadata
|   |   |   -> Purpose: Artifact metadata for Replit builds.
|   |   |
|   |   |-- components.json
|   |   |   -> Type: JSON config file
|   |   |   -> Category: UI tooling config
|   |   |   -> Purpose: Component registry configuration for UI tooling.
|   |   |
|   |   |-- index.html
|   |   |   -> Type: HTML entry file
|   |   |   -> Category: Frontend bootstrap
|   |   |   -> Purpose: Vite app shell and font loading.
|   |   |
|   |   |-- mockupPreviewPlugin.ts
|   |   |   -> Type: TypeScript module
|   |   |   -> Category: Vite plugin
|   |   |   -> Purpose: Generates preview module for mockup components.
|   |   |
|   |   |-- package.json
|   |   |   -> Type: JSON config file
|   |   |   -> Category: Package configuration
|   |   |   -> Purpose: Mockup sandbox dependencies and scripts.
|   |   |
|   |   |-- tsconfig.json
|   |   |   -> Type: JSON config file
|   |   |   -> Category: TypeScript configuration
|   |   |   -> Purpose: Mockup sandbox TS settings.
|   |   |
|   |   |-- vite.config.ts
|   |   |   -> Type: TypeScript module
|   |   |   -> Category: Build tooling
|   |   |   -> Purpose: Vite config for mockup preview app.
|   |   |
|   |   |-- src/
|   |   |   |-- .generated/mockup-components.ts
|   |   |   |   -> Type: TypeScript module (generated)
|   |   |   |   -> Category: Generated code
|   |   |   |   -> Purpose: Maps mockup component paths to dynamic imports.
|   |   |   |
|   |   |   |-- App.tsx
|   |   |   |   -> Type: React component
|   |   |   |   -> Category: Application root
|   |   |   |   -> Purpose: Renders preview gallery or component previews.
|   |   |   |
|   |   |   |-- index.css
|   |   |   |   -> Type: CSS stylesheet
|   |   |   |   -> Category: Global styles
|   |   |   |   -> Purpose: Tailwind base and theme tokens for sandbox.
|   |   |   |
|   |   |   |-- main.tsx
|   |   |   |   -> Type: React entry file
|   |   |   |   -> Category: Application bootstrap
|   |   |   |   -> Purpose: Mounts App component in DOM.
|   |   |   |
|   |   |   |-- components/
|   |   |   |   |-- ui/
|   |   |   |   |   |-- accordion.tsx
|   |   |   |   |   |   -> Type: React component
|   |   |   |   |   |   -> Category: UI primitive
|   |   |   |   |   |   -> Purpose: Accordion UI wrapper.
|   |   |   |   |   |-- alert-dialog.tsx
|   |   |   |   |   |   -> Type: React component
|   |   |   |   |   |   -> Category: UI primitive
|   |   |   |   |   |   -> Purpose: Modal dialog for alerts and confirmations.
|   |   |   |   |   |-- alert.tsx
|   |   |   |   |   |   -> Type: React component
|   |   |   |   |   |   -> Category: UI primitive
|   |   |   |   |   |   -> Purpose: Alert box styling.
|   |   |   |   |   |-- aspect-ratio.tsx
|   |   |   |   |   |   -> Type: React component
|   |   |   |   |   |   -> Category: UI primitive
|   |   |   |   |   |   -> Purpose: Aspect ratio wrapper for media.
|   |   |   |   |   |-- avatar.tsx
|   |   |   |   |   |   -> Type: React component
|   |   |   |   |   |   -> Category: UI primitive
|   |   |   |   |   |   -> Purpose: Avatar and fallback display.
|   |   |   |   |   |-- badge.tsx
|   |   |   |   |   |   -> Type: React component
|   |   |   |   |   |   -> Category: UI primitive
|   |   |   |   |   |   -> Purpose: Badge label styles.
|   |   |   |   |   |-- breadcrumb.tsx
|   |   |   |   |   |   -> Type: React component
|   |   |   |   |   |   -> Category: UI primitive
|   |   |   |   |   |   -> Purpose: Breadcrumb navigation elements.
|   |   |   |   |   |-- button-group.tsx
|   |   |   |   |   |   -> Type: React component
|   |   |   |   |   |   -> Category: UI primitive
|   |   |   |   |   |   -> Purpose: Grouped button styling.
|   |   |   |   |   |-- button.tsx
|   |   |   |   |   |   -> Type: React component
|   |   |   |   |   |   -> Category: UI primitive
|   |   |   |   |   |   -> Purpose: Button variants and styles.
|   |   |   |   |   |-- calendar.tsx
|   |   |   |   |   |   -> Type: React component
|   |   |   |   |   |   -> Category: UI primitive
|   |   |   |   |   |   -> Purpose: Calendar date picker wrapper.
|   |   |   |   |   |-- card.tsx
|   |   |   |   |   |   -> Type: React component
|   |   |   |   |   |   -> Category: UI primitive
|   |   |   |   |   |   -> Purpose: Card layout elements.
|   |   |   |   |   |-- carousel.tsx
|   |   |   |   |   |   -> Type: React component
|   |   |   |   |   |   -> Category: UI primitive
|   |   |   |   |   |   -> Purpose: Carousel wrapper.
|   |   |   |   |   |-- chart.tsx
|   |   |   |   |   |   -> Type: React component
|   |   |   |   |   |   -> Category: Data visualization
|   |   |   |   |   |   -> Purpose: Chart styling helpers.
|   |   |   |   |   |-- checkbox.tsx
|   |   |   |   |   |   -> Type: React component
|   |   |   |   |   |   -> Category: UI primitive
|   |   |   |   |   |   -> Purpose: Checkbox control wrapper.
|   |   |   |   |   |-- collapsible.tsx
|   |   |   |   |   |   -> Type: React component
|   |   |   |   |   |   -> Category: UI primitive
|   |   |   |   |   |   -> Purpose: Collapsible content wrapper.
|   |   |   |   |   |-- command.tsx
|   |   |   |   |   |   -> Type: React component
|   |   |   |   |   |   -> Category: UI primitive
|   |   |   |   |   |   -> Purpose: Command palette UI.
|   |   |   |   |   |-- context-menu.tsx
|   |   |   |   |   |   -> Type: React component
|   |   |   |   |   |   -> Category: UI primitive
|   |   |   |   |   |   -> Purpose: Context menu wrapper.
|   |   |   |   |   |-- dialog.tsx
|   |   |   |   |   |   -> Type: React component
|   |   |   |   |   |   -> Category: UI primitive
|   |   |   |   |   |   -> Purpose: Dialog modal wrapper.
|   |   |   |   |   |-- drawer.tsx
|   |   |   |   |   |   -> Type: React component
|   |   |   |   |   |   -> Category: UI primitive
|   |   |   |   |   |   -> Purpose: Drawer panel wrapper.
|   |   |   |   |   |-- dropdown-menu.tsx
|   |   |   |   |   |   -> Type: React component
|   |   |   |   |   |   -> Category: UI primitive
|   |   |   |   |   |   -> Purpose: Dropdown menu wrapper.
|   |   |   |   |   |-- empty.tsx
|   |   |   |   |   |   -> Type: React component
|   |   |   |   |   |   -> Category: UI utility
|   |   |   |   |   |   -> Purpose: Empty state layout component.
|   |   |   |   |   |-- field.tsx
|   |   |   |   |   |   -> Type: React component
|   |   |   |   |   |   -> Category: Form helper
|   |   |   |   |   |   -> Purpose: Form field wrapper.
|   |   |   |   |   |-- form.tsx
|   |   |   |   |   |   -> Type: React component
|   |   |   |   |   |   -> Category: Form helper
|   |   |   |   |   |   -> Purpose: Form container helpers.
|   |   |   |   |   |-- hover-card.tsx
|   |   |   |   |   |   -> Type: React component
|   |   |   |   |   |   -> Category: UI primitive
|   |   |   |   |   |   -> Purpose: Hover card wrapper.
|   |   |   |   |   |-- input-group.tsx
|   |   |   |   |   |   -> Type: React component
|   |   |   |   |   |   -> Category: Form helper
|   |   |   |   |   |   -> Purpose: Input group layout.
|   |   |   |   |   |-- input-otp.tsx
|   |   |   |   |   |   -> Type: React component
|   |   |   |   |   |   -> Category: Form input
|   |   |   |   |   |   -> Purpose: One-time-password input UI.
|   |   |   |   |   |-- input.tsx
|   |   |   |   |   |   -> Type: React component
|   |   |   |   |   |   -> Category: Form input
|   |   |   |   |   |   -> Purpose: Text input styling.
|   |   |   |   |   |-- item.tsx
|   |   |   |   |   |   -> Type: React component
|   |   |   |   |   |   -> Category: UI helper
|   |   |   |   |   |   -> Purpose: Generic list/item layout.
|   |   |   |   |   |-- kbd.tsx
|   |   |   |   |   |   -> Type: React component
|   |   |   |   |   |   -> Category: UI primitive
|   |   |   |   |   |   -> Purpose: Keyboard key styling.
|   |   |   |   |   |-- label.tsx
|   |   |   |   |   |   -> Type: React component
|   |   |   |   |   |   -> Category: Form input
|   |   |   |   |   |   -> Purpose: Label styles and accessibility.
|   |   |   |   |   |-- menubar.tsx
|   |   |   |   |   |   -> Type: React component
|   |   |   |   |   |   -> Category: UI primitive
|   |   |   |   |   |   -> Purpose: Menubar wrapper.
|   |   |   |   |   |-- navigation-menu.tsx
|   |   |   |   |   |   -> Type: React component
|   |   |   |   |   |   -> Category: UI primitive
|   |   |   |   |   |   -> Purpose: Navigation menu wrapper.
|   |   |   |   |   |-- pagination.tsx
|   |   |   |   |   |   -> Type: React component
|   |   |   |   |   |   -> Category: UI utility
|   |   |   |   |   |   -> Purpose: Pagination UI helpers.
|   |   |   |   |   |-- popover.tsx
|   |   |   |   |   |   -> Type: React component
|   |   |   |   |   |   -> Category: UI primitive
|   |   |   |   |   |   -> Purpose: Popover wrapper.
|   |   |   |   |   |-- progress.tsx
|   |   |   |   |   |   -> Type: React component
|   |   |   |   |   |   -> Category: UI primitive
|   |   |   |   |   |   -> Purpose: Progress bar UI.
|   |   |   |   |   |-- radio-group.tsx
|   |   |   |   |   |   -> Type: React component
|   |   |   |   |   |   -> Category: Form input
|   |   |   |   |   |   -> Purpose: Radio group UI.
|   |   |   |   |   |-- resizable.tsx
|   |   |   |   |   |   -> Type: React component
|   |   |   |   |   |   -> Category: UI utility
|   |   |   |   |   |   -> Purpose: Resizable panel layout.
|   |   |   |   |   |-- scroll-area.tsx
|   |   |   |   |   |   -> Type: React component
|   |   |   |   |   |   -> Category: UI utility
|   |   |   |   |   |   -> Purpose: Scroll container wrapper.
|   |   |   |   |   |-- select.tsx
|   |   |   |   |   |   -> Type: React component
|   |   |   |   |   |   -> Category: Form input
|   |   |   |   |   |   -> Purpose: Select dropdown UI.
|   |   |   |   |   |-- separator.tsx
|   |   |   |   |   |   -> Type: React component
|   |   |   |   |   |   -> Category: UI utility
|   |   |   |   |   |   -> Purpose: Divider lines and separators.
|   |   |   |   |   |-- sheet.tsx
|   |   |   |   |   |   -> Type: React component
|   |   |   |   |   |   -> Category: UI primitive
|   |   |   |   |   |   -> Purpose: Slide-over sheet panel.
|   |   |   |   |   |-- sidebar.tsx
|   |   |   |   |   |   -> Type: React component
|   |   |   |   |   |   -> Category: UI layout
|   |   |   |   |   |   -> Purpose: Sidebar layout helpers.
|   |   |   |   |   |-- skeleton.tsx
|   |   |   |   |   |   -> Type: React component
|   |   |   |   |   |   -> Category: Loading state
|   |   |   |   |   |   -> Purpose: Skeleton loading placeholders.
|   |   |   |   |   |-- slider.tsx
|   |   |   |   |   |   -> Type: React component
|   |   |   |   |   |   -> Category: Form input
|   |   |   |   |   |   -> Purpose: Slider input control.
|   |   |   |   |   |-- sonner.tsx
|   |   |   |   |   |   -> Type: React component
|   |   |   |   |   |   -> Category: Notifications
|   |   |   |   |   |   -> Purpose: Sonner toast wrapper.
|   |   |   |   |   |-- spinner.tsx
|   |   |   |   |   |   -> Type: React component
|   |   |   |   |   |   -> Category: Loading state
|   |   |   |   |   |   -> Purpose: Spinner/loader UI.
|   |   |   |   |   |-- switch.tsx
|   |   |   |   |   |   -> Type: React component
|   |   |   |   |   |   -> Category: Form input
|   |   |   |   |   |   -> Purpose: Toggle switch UI.
|   |   |   |   |   |-- table.tsx
|   |   |   |   |   |   -> Type: React component
|   |   |   |   |   |   -> Category: Data display
|   |   |   |   |   |   -> Purpose: Table layout and styling.
|   |   |   |   |   |-- tabs.tsx
|   |   |   |   |   |   -> Type: React component
|   |   |   |   |   |   -> Category: UI primitive
|   |   |   |   |   |   -> Purpose: Tabbed interface.
|   |   |   |   |   |-- textarea.tsx
|   |   |   |   |   |   -> Type: React component
|   |   |   |   |   |   -> Category: Form input
|   |   |   |   |   |   -> Purpose: Textarea styles.
|   |   |   |   |   |-- toast.tsx
|   |   |   |   |   |   -> Type: React component
|   |   |   |   |   |   -> Category: Notifications
|   |   |   |   |   |   -> Purpose: Toast primitive styling.
|   |   |   |   |   |-- toaster.tsx
|   |   |   |   |   |   -> Type: React component
|   |   |   |   |   |   -> Category: Notifications
|   |   |   |   |   |   -> Purpose: Toast provider and viewport.
|   |   |   |   |   |-- toggle-group.tsx
|   |   |   |   |   |   -> Type: React component
|   |   |   |   |   |   -> Category: Form input
|   |   |   |   |   |   -> Purpose: Toggle group controls.
|   |   |   |   |   |-- toggle.tsx
|   |   |   |   |   |   -> Type: React component
|   |   |   |   |   |   -> Category: Form input
|   |   |   |   |   |   -> Purpose: Toggle button control.
|   |   |   |   |   |-- tooltip.tsx
|   |   |   |   |   |   -> Type: React component
|   |   |   |   |   |   -> Category: UI primitive
|   |   |   |   |   |   -> Purpose: Tooltip wrapper.
|   |   |   |
|   |   |   |-- hooks/
|   |   |   |   |-- use-mobile.tsx
|   |   |   |   |   -> Type: React hook
|   |   |   |   |   -> Category: UI utility
|   |   |   |   |   -> Purpose: Detects mobile breakpoint.
|   |   |   |   |
|   |   |   |   |-- use-toast.ts
|   |   |   |   |   -> Type: React hook
|   |   |   |   |   -> Category: Notifications
|   |   |   |   |   -> Purpose: Toast state manager.
|   |   |   |
|   |   |   |-- lib/
|   |   |   |   |-- utils.ts
|   |   |   |   |   -> Type: TypeScript module
|   |   |   |   |   -> Category: Utilities
|   |   |   |   |   -> Purpose: Class name merge helper.
|   |
|   |-- smart-dev-debugger/
|   |   |-- .replit-artifact/artifact.toml
|   |   |   -> Type: TOML config file
|   |   |   -> Category: Replit artifact metadata
|   |   |   -> Purpose: Artifact metadata for Replit builds.
|   |   |
|   |   |-- components.json
|   |   |   -> Type: JSON config file
|   |   |   -> Category: UI tooling config
|   |   |   -> Purpose: Component registry configuration for UI tooling.
|   |   |
|   |   |-- index.html
|   |   |   -> Type: HTML entry file
|   |   |   -> Category: Frontend bootstrap
|   |   |   -> Purpose: Vite app shell and font loading.
|   |   |
|   |   |-- package.json
|   |   |   -> Type: JSON config file
|   |   |   -> Category: Package configuration
|   |   |   -> Purpose: Frontend dependencies and scripts.
|   |   |
|   |   |-- tsconfig.json
|   |   |   -> Type: JSON config file
|   |   |   -> Category: TypeScript configuration
|   |   |   -> Purpose: Frontend TS settings.
|   |   |
|   |   |-- vercel.json
|   |   |   -> Type: JSON config file
|   |   |   -> Category: Deployment configuration
|   |   |   -> Purpose: Vercel schema placeholder for frontend.
|   |   |
|   |   |-- vite.config.ts
|   |   |   -> Type: TypeScript module
|   |   |   -> Category: Build tooling
|   |   |   -> Purpose: Vite config with proxy and plugins.
|   |   |
|   |   |-- public/
|   |   |   |-- Dev-Bugger-Prev-2.png
|   |   |   |   -> Type: PNG image
|   |   |   |   -> Category: Asset
|   |   |   |   -> Purpose: Marketing or preview image asset.
|   |   |   |-- favicon.svg
|   |   |   |   -> Type: SVG image
|   |   |   |   -> Category: Asset
|   |   |   |   -> Purpose: Site favicon.
|   |   |   |-- opengraph.jpg
|   |   |   |   -> Type: JPEG image
|   |   |   |   -> Category: Asset
|   |   |   |   -> Purpose: OpenGraph preview image.
|   |   |
|   |   |-- src/
|   |   |   |-- App.tsx
|   |   |   |   -> Type: React component
|   |   |   |   -> Category: Application root
|   |   |   |   -> Purpose: Defines providers and routes.
|   |   |   |
|   |   |   |-- index.css
|   |   |   |   -> Type: CSS stylesheet
|   |   |   |   -> Category: Global styles
|   |   |   |   -> Purpose: Tailwind and design tokens for app UI.
|   |   |   |
|   |   |   |-- main.tsx
|   |   |   |   -> Type: React entry file
|   |   |   |   -> Category: Application bootstrap
|   |   |   |   -> Purpose: Initializes API runtime and mounts App.
|   |   |   |
|   |   |   |-- vite-env.d.ts
|   |   |   |   -> Type: TypeScript declaration file
|   |   |   |   -> Category: Tooling
|   |   |   |   -> Purpose: Vite environment typing.
|   |   |   |
|   |   |   |-- components/
|   |   |   |   |-- backend-banner.tsx
|   |   |   |   |   -> Type: React component
|   |   |   |   |   -> Category: Status UI
|   |   |   |   |   -> Purpose: Displays backend health and failover banner.
|   |   |   |   |-- credits-modal.tsx
|   |   |   |   |   -> Type: React component
|   |   |   |   |   -> Category: Modal
|   |   |   |   |   -> Purpose: Out-of-credits modal dialog.
|   |   |   |   |-- layout.tsx
|   |   |   |   |   -> Type: React component
|   |   |   |   |   -> Category: Layout
|   |   |   |   |   -> Purpose: Top nav, theme toggle, and main layout shell.
|   |   |   |   |-- protected-route.tsx
|   |   |   |   |   -> Type: React component
|   |   |   |   |   -> Category: Routing
|   |   |   |   |   -> Purpose: Guards routes based on auth state.
|   |   |   |   |-- theme-provider.tsx
|   |   |   |   |   -> Type: React context provider
|   |   |   |   |   -> Category: Theming
|   |   |   |   |   -> Purpose: Manages light/dark/system themes.
|   |   |   |   |-- user-panel.tsx
|   |   |   |   |   -> Type: React component
|   |   |   |   |   -> Category: Auth UI
|   |   |   |   |   -> Purpose: Bottom-left user panel with credits and logout.
|   |   |   |   |-- ui/
|   |   |   |   |   (Same UI primitive set as mockup-sandbox; see above)
|   |   |   |
|   |   |   |-- contexts/
|   |   |   |   |-- auth-context.tsx
|   |   |   |   |   -> Type: React context
|   |   |   |   |   -> Category: Authentication
|   |   |   |   |   -> Purpose: Manages current user and auth actions.
|   |   |   |   |-- backend-context.tsx
|   |   |   |   |   -> Type: React context
|   |   |   |   |   -> Category: Backend routing
|   |   |   |   |   -> Purpose: Tracks API runtime, health, and failover status.
|   |   |   |
|   |   |   |-- hooks/
|   |   |   |   |-- use-mobile.tsx
|   |   |   |   |   -> Type: React hook
|   |   |   |   |   -> Category: UI utility
|   |   |   |   |   -> Purpose: Detects mobile breakpoint.
|   |   |   |   |-- use-toast.ts
|   |   |   |   |   -> Type: React hook
|   |   |   |   |   -> Category: Notifications
|   |   |   |   |   -> Purpose: Toast state manager.
|   |   |   |
|   |   |   |-- lib/
|   |   |   |   |-- api.ts
|   |   |   |   |   -> Type: TypeScript module
|   |   |   |   |   -> Category: API client glue
|   |   |   |   |   -> Purpose: Configures API backends and custom fetch.
|   |   |   |   |-- sample-errors.ts
|   |   |   |   |   -> Type: TypeScript module
|   |   |   |   |   -> Category: Sample data
|   |   |   |   |   -> Purpose: Example errors for user demos.
|   |   |   |   |-- utils.ts
|   |   |   |   |   -> Type: TypeScript module
|   |   |   |   |   -> Category: Utilities
|   |   |   |   |   -> Purpose: Class name merge helper.
|   |   |   |
|   |   |   |-- pages/
|   |   |   |   |-- backend.tsx
|   |   |   |   |   -> Type: React page
|   |   |   |   |   -> Category: Status view
|   |   |   |   |   -> Purpose: Backend health dashboard.
|   |   |   |   |-- history.tsx
|   |   |   |   |   -> Type: React page
|   |   |   |   |   -> Category: History view
|   |   |   |   |   -> Purpose: Displays history list and stats.
|   |   |   |   |-- home.tsx
|   |   |   |   |   -> Type: React page
|   |   |   |   |   -> Category: Core workflow
|   |   |   |   |   -> Purpose: Main debug workflow UI and results panel.
|   |   |   |   |-- landing.tsx
|   |   |   |   |   -> Type: React page
|   |   |   |   |   -> Category: Marketing
|   |   |   |   |   -> Purpose: Landing page with CTAs.
|   |   |   |   |-- login.tsx
|   |   |   |   |   -> Type: React page
|   |   |   |   |   -> Category: Authentication
|   |   |   |   |   -> Purpose: Sign in form with Google OAuth link.
|   |   |   |   |-- not-found.tsx
|   |   |   |   |   -> Type: React page
|   |   |   |   |   -> Category: Error page
|   |   |   |   |   -> Purpose: 404 fallback route.
|   |   |   |   |-- register.tsx
|   |   |   |   |   -> Type: React page
|   |   |   |   |   -> Category: Authentication
|   |   |   |   |   -> Purpose: Registration form with validation.
|
|-- lib/
|   |-- api-client-react/
|   |   |-- package.json
|   |   |   -> Type: JSON config file
|   |   |   -> Category: Package configuration
|   |   |   -> Purpose: React API client package definition.
|   |   |-- tsconfig.json
|   |   |   -> Type: JSON config file
|   |   |   -> Category: TypeScript configuration
|   |   |   -> Purpose: Build settings for generated client.
|   |   |-- src/
|   |   |   |-- custom-fetch.ts
|   |   |   |   -> Type: TypeScript module
|   |   |   |   -> Category: API runtime
|   |   |   |   -> Purpose: Fetch wrapper with retries, failover, and errors.
|   |   |   |-- index.ts
|   |   |   |   -> Type: TypeScript module
|   |   |   |   -> Category: Package export
|   |   |   |   -> Purpose: Re-exports generated API and helpers.
|   |   |   |-- generated/
|   |   |   |   |-- api.ts
|   |   |   |   |   -> Type: TypeScript module (generated)
|   |   |   |   |   -> Category: Generated API client
|   |   |   |   |   -> Purpose: React Query hooks and endpoints from OpenAPI.
|   |   |   |   |-- api.schemas.ts
|   |   |   |   |   -> Type: TypeScript module (generated)
|   |   |   |   |   -> Category: Generated schemas
|   |   |   |   |   -> Purpose: Zod schema helpers for API types.
|   |
|   |-- api-spec/
|   |   |-- openapi.yaml
|   |   |   -> Type: OpenAPI spec
|   |   |   -> Category: API contract
|   |   |   -> Purpose: Defines routes, schemas, and responses.
|   |   |-- orval.config.ts
|   |   |   -> Type: TypeScript module
|   |   |   -> Category: Code generation
|   |   |   -> Purpose: Orval config for client and zod output.
|   |   |-- package.json
|   |   |   -> Type: JSON config file
|   |   |   -> Category: Package configuration
|   |   |   -> Purpose: Codegen scripts for API clients.
|   |
|   |-- api-zod/
|   |   |-- package.json
|   |   |   -> Type: JSON config file
|   |   |   -> Category: Package configuration
|   |   |   -> Purpose: Zod schema package definition.
|   |   |-- tsconfig.json
|   |   |   -> Type: JSON config file
|   |   |   -> Category: TypeScript configuration
|   |   |   -> Purpose: Build settings for zod schemas.
|   |   |-- src/
|   |   |   |-- index.ts
|   |   |   |   -> Type: TypeScript module
|   |   |   |   -> Category: Package export
|   |   |   |   -> Purpose: Re-exports generated schemas and types.
|   |   |   |-- generated/
|   |   |   |   |-- api.ts
|   |   |   |   |   -> Type: TypeScript module (generated)
|   |   |   |   |   -> Category: Generated schemas
|   |   |   |   |   -> Purpose: Zod schemas for all API endpoints.
|   |   |   |   |-- types/
|   |   |   |   |   |-- analyzeRequest.ts
|   |   |   |   |   |   -> Type: TypeScript module (generated)
|   |   |   |   |   |   -> Category: Generated types
|   |   |   |   |   |   -> Purpose: Zod-derived AnalyzeRequest type.
|   |   |   |   |   |-- analyzeRequestLanguage.ts
|   |   |   |   |   |   -> Type: TypeScript module (generated)
|   |   |   |   |   |   -> Category: Generated types
|   |   |   |   |   |   -> Purpose: Allowed language enum for AnalyzeRequest.
|   |   |   |   |   |-- analyzeRequestMode.ts
|   |   |   |   |   |   -> Type: TypeScript module (generated)
|   |   |   |   |   |   -> Category: Generated types
|   |   |   |   |   |   -> Purpose: Allowed mode enum for AnalyzeRequest.
|   |   |   |   |   |-- apiError.ts
|   |   |   |   |   |   -> Type: TypeScript module (generated)
|   |   |   |   |   |   -> Category: Generated types
|   |   |   |   |   |   -> Purpose: API error response type.
|   |   |   |   |   |-- apiErrorError.ts
|   |   |   |   |   |   -> Type: TypeScript module (generated)
|   |   |   |   |   |   -> Category: Generated types
|   |   |   |   |   |   -> Purpose: Nested error shape for ApiError.
|   |   |   |   |   |-- clearHistory200.ts
|   |   |   |   |   |   -> Type: TypeScript module (generated)
|   |   |   |   |   |   -> Category: Generated types
|   |   |   |   |   |   -> Purpose: Clear history response type.
|   |   |   |   |   |-- debugSession.ts
|   |   |   |   |   |   -> Type: TypeScript module (generated)
|   |   |   |   |   |   -> Category: Generated types
|   |   |   |   |   |   -> Purpose: Debug session response type.
|   |   |   |   |   |-- debugSessionSeverity.ts
|   |   |   |   |   |   -> Type: TypeScript module (generated)
|   |   |   |   |   |   -> Category: Generated types
|   |   |   |   |   |   -> Purpose: Severity enum for debug sessions.
|   |   |   |   |   |-- healthStatus.ts
|   |   |   |   |   |   -> Type: TypeScript module (generated)
|   |   |   |   |   |   -> Category: Generated types
|   |   |   |   |   |   -> Purpose: Health response type.
|   |   |   |   |   |-- historyResponse.ts
|   |   |   |   |   |   -> Type: TypeScript module (generated)
|   |   |   |   |   |   -> Category: Generated types
|   |   |   |   |   |   -> Purpose: History list response type.
|   |   |   |   |   |-- index.ts
|   |   |   |   |   |   -> Type: TypeScript module (generated)
|   |   |   |   |   |   -> Category: Generated types
|   |   |   |   |   |   -> Purpose: Type barrel for generated types.
|   |   |   |   |   |-- languageStat.ts
|   |   |   |   |   |   -> Type: TypeScript module (generated)
|   |   |   |   |   |   -> Category: Generated types
|   |   |   |   |   |   -> Purpose: Language stats response type.
|   |   |   |   |   |-- listHistoryParams.ts
|   |   |   |   |   |   -> Type: TypeScript module (generated)
|   |   |   |   |   |   -> Category: Generated types
|   |   |   |   |   |   -> Purpose: History query parameter type.
|   |   |   |   |   |-- loginRequest.ts
|   |   |   |   |   |   -> Type: TypeScript module (generated)
|   |   |   |   |   |   -> Category: Generated types
|   |   |   |   |   |   -> Purpose: Login request body type.
|   |   |   |   |   |-- logoutUser200.ts
|   |   |   |   |   |   -> Type: TypeScript module (generated)
|   |   |   |   |   |   -> Category: Generated types
|   |   |   |   |   |   -> Purpose: Logout response type.
|   |   |   |   |   |-- publicUser.ts
|   |   |   |   |   |   -> Type: TypeScript module (generated)
|   |   |   |   |   |   -> Category: Generated types
|   |   |   |   |   |   -> Purpose: Public user response type.
|   |   |   |   |   |-- publicUserAuthMethod.ts
|   |   |   |   |   |   -> Type: TypeScript module (generated)
|   |   |   |   |   |   -> Category: Generated types
|   |   |   |   |   |   -> Purpose: Auth method enum for user.
|   |   |   |   |   |-- registerRequest.ts
|   |   |   |   |   |   -> Type: TypeScript module (generated)
|   |   |   |   |   |   -> Category: Generated types
|   |   |   |   |   |   -> Purpose: Register request body type.
|   |   |   |   |   |-- severityStat.ts
|   |   |   |   |   |   -> Type: TypeScript module (generated)
|   |   |   |   |   |   -> Category: Generated types
|   |   |   |   |   |   -> Purpose: Severity stats response type.
|   |   |   |   |   |-- statsResponse.ts
|   |   |   |   |   |   -> Type: TypeScript module (generated)
|   |   |   |   |   |   -> Category: Generated types
|   |   |   |   |   |   -> Purpose: Stats response type.
|   |
|   |-- db/
|   |   |-- drizzle.config.cjs
|   |   |   -> Type: CommonJS config
|   |   |   -> Category: Database tooling
|   |   |   -> Purpose: Drizzle config for CLI.
|   |   |-- drizzle.config.ts
|   |   |   -> Type: TypeScript config
|   |   |   -> Category: Database tooling
|   |   |   -> Purpose: Drizzle config for ESM tooling.
|   |   |-- package.json
|   |   |   -> Type: JSON config file
|   |   |   -> Category: Package configuration
|   |   |   -> Purpose: DB package and scripts.
|   |   |-- tsconfig.json
|   |   |   -> Type: JSON config file
|   |   |   -> Category: TypeScript configuration
|   |   |   -> Purpose: DB TS settings.
|   |   |-- src/
|   |   |   |-- index.ts
|   |   |   |   -> Type: TypeScript module
|   |   |   |   -> Category: Database access
|   |   |   |   -> Purpose: Drizzle db instance and connection pool.
|   |   |   |-- schema/
|   |   |   |   |-- conversations.ts
|   |   |   |   |   -> Type: TypeScript module
|   |   |   |   |   -> Category: Database schema
|   |   |   |   |   -> Purpose: Conversations table definition.
|   |   |   |   |-- debug-sessions.ts
|   |   |   |   |   -> Type: TypeScript module
|   |   |   |   |   -> Category: Database schema
|   |   |   |   |   -> Purpose: Debug sessions table and request schema.
|   |   |   |   |-- index.ts
|   |   |   |   |   -> Type: TypeScript module
|   |   |   |   |   -> Category: Schema export
|   |   |   |   |   -> Purpose: Re-exports schema modules.
|   |   |   |   |-- messages.ts
|   |   |   |   |   -> Type: TypeScript module
|   |   |   |   |   -> Category: Database schema
|   |   |   |   |   -> Purpose: Messages table definition.
|   |   |   |   |-- users.ts
|   |   |   |   |   -> Type: TypeScript module
|   |   |   |   |   -> Category: Database schema
|   |   |   |   |   -> Purpose: Users table and auth schemas.
|   |
|   |-- integrations/
|   |   |-- openai_ai_integrations/
|   |   |   |-- src/
|   |   |   |   |-- client/audio/audio-playback-worklet.js
|   |   |   |   |   -> Type: JavaScript AudioWorklet
|   |   |   |   |   -> Category: Audio utility
|   |   |   |   |   -> Purpose: PCM16 streaming playback processor.
|   |   |   |   |-- client/audio/audio-utils.ts
|   |   |   |   |   -> Type: TypeScript module
|   |   |   |   |   -> Category: Audio utility
|   |   |   |   |   -> Purpose: PCM16 decoding and audio context creation.
|   |   |   |   |-- client/audio/index.ts
|   |   |   |   |   -> Type: TypeScript module
|   |   |   |   |   -> Category: Package export
|   |   |   |   |   -> Purpose: Exports client audio hooks and helpers.
|   |   |   |   |-- client/audio/useAudioPlayback.ts
|   |   |   |   |   -> Type: React hook
|   |   |   |   |   -> Category: Audio streaming
|   |   |   |   |   -> Purpose: Plays PCM16 audio with buffering.
|   |   |   |   |-- client/audio/useVoiceRecorder.ts
|   |   |   |   |   -> Type: React hook
|   |   |   |   |   -> Category: Audio capture
|   |   |   |   |   -> Purpose: Records mic audio via MediaRecorder.
|   |   |   |   |-- server/audio/client.ts
|   |   |   |   |   -> Type: TypeScript module
|   |   |   |   |   -> Category: AI integration
|   |   |   |   |   -> Purpose: OpenAI audio models helper functions.
|   |   |   |   |-- server/audio/index.ts
|   |   |   |   |   -> Type: TypeScript module
|   |   |   |   |   -> Category: Package export
|   |   |   |   |   -> Purpose: Exports server audio utilities.
|   |   |   |   |-- server/batch/index.ts
|   |   |   |   |   -> Type: TypeScript module
|   |   |   |   |   -> Category: Package export
|   |   |   |   |   -> Purpose: Exports batch helpers.
|   |   |   |   |-- server/batch/utils.ts
|   |   |   |   |   -> Type: TypeScript module
|   |   |   |   |   -> Category: Batch processing
|   |   |   |   |   -> Purpose: Generic rate-limited batch execution helpers.
|   |   |   |   |-- server/image/client.ts
|   |   |   |   |   -> Type: TypeScript module
|   |   |   |   |   -> Category: AI integration
|   |   |   |   |   -> Purpose: OpenAI image generation helpers.
|   |   |   |   |-- server/image/index.ts
|   |   |   |   |   -> Type: TypeScript module
|   |   |   |   |   -> Category: Package export
|   |   |   |   |   -> Purpose: Exports image utilities.
|   |
|   |-- integrations-openai-ai-react/
|   |   |-- package.json
|   |   |   -> Type: JSON config file
|   |   |   -> Category: Package configuration
|   |   |   -> Purpose: React audio integration package.
|   |   |-- tsconfig.json
|   |   |   -> Type: JSON config file
|   |   |   -> Category: TypeScript configuration
|   |   |   -> Purpose: Build settings for integrations package.
|   |   |-- src/
|   |   |   |-- index.ts
|   |   |   |   -> Type: TypeScript module
|   |   |   |   -> Category: Package export
|   |   |   |   -> Purpose: Exports audio hooks and helpers.
|   |   |   |-- audio/
|   |   |   |   |-- audio-playback-worklet.js
|   |   |   |   |   -> Type: JavaScript AudioWorklet
|   |   |   |   |   -> Category: Audio utility
|   |   |   |   |   -> Purpose: PCM16 streaming playback processor.
|   |   |   |   |-- audio-utils.ts
|   |   |   |   |   -> Type: TypeScript module
|   |   |   |   |   -> Category: Audio utility
|   |   |   |   |   -> Purpose: PCM16 decode and audio context creation.
|   |   |   |   |-- index.ts
|   |   |   |   |   -> Type: TypeScript module
|   |   |   |   |   -> Category: Package export
|   |   |   |   |   -> Purpose: Exports audio hooks for client use.
|   |   |   |   |-- useAudioPlayback.ts
|   |   |   |   |   -> Type: React hook
|   |   |   |   |   -> Category: Audio streaming
|   |   |   |   |   -> Purpose: Plays PCM16 audio using AudioWorklet.
|   |   |   |   |-- useVoiceRecorder.ts
|   |   |   |   |   -> Type: React hook
|   |   |   |   |   -> Category: Audio capture
|   |   |   |   |   -> Purpose: Records microphone audio.
|   |   |   |   |-- useVoiceStream.ts
|   |   |   |   |   -> Type: React hook
|   |   |   |   |   -> Category: Audio streaming
|   |   |   |   |   -> Purpose: Streams voice requests via SSE.
|   |
|   |-- integrations-openai-ai-server/
|   |   |-- package.json
|   |   |   -> Type: JSON config file
|   |   |   -> Category: Package configuration
|   |   |   -> Purpose: Server integration package definition.
|   |   |-- tsconfig.json
|   |   |   -> Type: JSON config file
|   |   |   -> Category: TypeScript configuration
|   |   |   -> Purpose: Build settings for server integration.
|   |   |-- src/
|   |   |   |-- index.ts
|   |   |   |   -> Type: TypeScript module
|   |   |   |   -> Category: Package export
|   |   |   |   -> Purpose: Exposes OpenAI client and helpers.
|   |   |   |-- client.ts
|   |   |   |   -> Type: TypeScript module
|   |   |   |   -> Category: AI integration
|   |   |   |   -> Purpose: Configures OpenAI client with env vars.
|   |   |   |-- audio/
|   |   |   |   |-- client.ts
|   |   |   |   |   -> Type: TypeScript module
|   |   |   |   |   -> Category: AI integration
|   |   |   |   |   -> Purpose: Audio transcription, TTS, voice chat helpers.
|   |   |   |   |-- index.ts
|   |   |   |   |   -> Type: TypeScript module
|   |   |   |   |   -> Category: Package export
|   |   |   |   |   -> Purpose: Exports audio helpers.
|   |   |   |-- batch/
|   |   |   |   |-- index.ts
|   |   |   |   |   -> Type: TypeScript module
|   |   |   |   |   -> Category: Package export
|   |   |   |   |   -> Purpose: Exports batch utilities.
|   |   |   |   |-- utils.ts
|   |   |   |   |   -> Type: TypeScript module
|   |   |   |   |   -> Category: Batch processing
|   |   |   |   |   -> Purpose: Concurrency and retry helpers.
|   |   |   |-- image/
|   |   |   |   |-- client.ts
|   |   |   |   |   -> Type: TypeScript module
|   |   |   |   |   -> Category: AI integration
|   |   |   |   |   -> Purpose: Image generation and edit helpers.
|   |   |   |   |-- index.ts
|   |   |   |   |   -> Type: TypeScript module
|   |   |   |   |   -> Category: Package export
|   |   |   |   |   -> Purpose: Exports image helpers.
|
|-- scripts/
|   |-- package.json
|   |   -> Type: JSON config file
|   |   -> Category: Package configuration
|   |   -> Purpose: Utility scripts package definition.
|   |-- post-merge.sh
|   |   -> Type: Shell script
|   |   -> Category: Git hook utility
|   |   -> Purpose: Runs install and DB push after merge.
|   |-- tsconfig.json
|   |   -> Type: JSON config file
|   |   -> Category: TypeScript configuration
|   |   -> Purpose: Scripts TS settings.
|   |-- src/hello.ts
|   |   -> Type: TypeScript module
|   |   -> Category: Utility script
|   |   -> Purpose: Simple hello test script.

======================================================================
STEP 3 - DETAILED FILE ANALYSIS (Important files)
======================================================================

ROOT CONFIGURATION

1) package.json
A. File Type: JSON config file
B. Purpose: Root workspace configuration, scripts, and dependency guardrails.
C. Internal Content:
	- Scripts: pnpm enforcement, build, and typecheck orchestration.
	- Dev dependencies: TypeScript, Prettier, platform-specific tooling.
D. Dependencies:
	- Used by pnpm, tooling, and the workspace root.
	- Invokes scripts that target packages in artifacts and lib.

2) pnpm-workspace.yaml
A. File Type: YAML config
B. Purpose: Defines workspace package locations and security policies.
C. Internal Content:
	- packages include artifacts/*, lib/*, scripts.
	- minimumReleaseAge security policy and allowlist.
	- overrides to restrict platform-specific binaries.
D. Dependencies:
	- Consumed by pnpm to resolve workspace graph.

3) tsconfig.base.json / tsconfig.json
A. File Type: JSON config
B. Purpose: Shared TypeScript compiler settings and project references.
C. Internal Content:
	- base config defines strictness and module settings.
	- root tsconfig references lib packages for build order.
D. Dependencies:
	- Used by TypeScript compiler and package tsconfigs via extends.

4) docker-compose.yml
A. File Type: Docker Compose
B. Purpose: Local containerized API server setup.
C. Internal Content:
	- Single api service, env_file .env, healthcheck, port mapping.
D. Dependencies:
	- Uses Dockerfile and environment variables from .env.

5) Dockerfile
A. File Type: Docker build script
B. Purpose: Builds API server production image.
C. Internal Content:
	- Multi-stage build: deps -> build -> runtime.
	- Installs pnpm, builds api-server, copies dist to runtime.
D. Dependencies:
	- Uses pnpm-lock.yaml, workspace packages, artifacts/api-server.

API SERVER (artifacts/api-server)

1) src/app.ts
A. File Type: TypeScript Express module
B. Purpose: Creates Express app and configures middleware and routes.
C. Internal Content:
	- Pino HTTP logger with request IDs.
	- CORS with allowedOrigins and vercel.app wildcard.
	- Helmet, compression, cookie parsing, JSON parsing, rate limiter.
	- Root /, /ping, /health, /version, /api routes.
D. Dependencies:
	- Imports env, middleware, router, logger.
	- Used by src/index.ts to create HTTP server.

2) src/index.ts
A. File Type: TypeScript entry point
B. Purpose: Starts HTTP server and bootstraps services.
C. Internal Content:
	- Validates PORT and creates http server.
	- Registers shutdown handlers and optional websocket layer.
	- Starts primary-only services based on env flags.
D. Dependencies:
	- Imports app, env, platform, shutdown, websocket, logger.
	- Called by build output dist/index.mjs.

3) src/config/env.ts
A. File Type: TypeScript configuration module
B. Purpose: Validates and normalizes environment variables.
C. Internal Content:
	- Zod schema for server config, rates, OAuth, AI keys.
	- Converts FRONTEND_URL to array and IS_PRIMARY to boolean.
D. Dependencies:
	- Used by app, platform, auth, and server startup.

4) src/config/platform.ts
A. File Type: TypeScript configuration module
B. Purpose: Derived platform flags for logging and routing.
C. Internal Content:
	- platformTag, isProduction, isPrimaryInstance.
D. Dependencies:
	- Used by logger and primary instance services.

5) src/routes/auth.ts
A. File Type: TypeScript route module
B. Purpose: Handles register/login/logout and Google OAuth flow.
C. Internal Content:
	- Validates requests with Zod schemas from db package.
	- Handles password hashing and JWT cookie creation.
	- Implements Google OAuth token exchange and user creation.
D. Dependencies:
	- Imports db, users table, auth service, env.
	- Exposed via routes/index.ts -> app.ts.

6) src/routes/debug.ts
A. File Type: TypeScript route module
B. Purpose: Main AI analyze endpoint and usage stats.
C. Internal Content:
	- Checks credits, rate limit, validates AnalyzeRequest.
	- Uses AI engine to produce report and persists session in DB.
	- Uses cache for repeat responses.
D. Dependencies:
	- Imports db, ai-engine, cache, rate-limiter, auth middleware.
	- Exposed via routes/index.ts -> app.ts.

7) src/routes/history.ts
A. File Type: TypeScript route module
B. Purpose: History list and CRUD for debug sessions.
C. Internal Content:
	- Paginated list with optional language filter.
	- Delete all history or specific session.
D. Dependencies:
	- Imports db, Zod, auth middleware.

8) src/routes/health.ts and src/routes/version.ts
A. File Type: TypeScript route modules
B. Purpose: Health and version endpoints for monitoring.
C. Internal Content:
	- Returns status, uptime, platform, version, commit.
D. Dependencies:
	- Uses env and process metadata.

9) src/middleware/auth.ts
A. File Type: Express middleware
B. Purpose: Auth guard using JWT cookie.
C. Internal Content:
	- Reads cookie, verifies JWT, loads user from DB.
	- Adds req.user to request context.
D. Dependencies:
	- Imports db, users table, auth service.

10) src/middleware/error-handler.ts
A. File Type: Express middleware
B. Purpose: Centralized error handling and 404.
C. Internal Content:
	- Handles Zod errors with 400.
	- Logs unknown errors and returns 500.
D. Dependencies:
	- Imports logger and platform flag.

11) src/services/auth.ts
A. File Type: Auth service module
B. Purpose: Password hashing, JWT creation, cookie options.
C. Internal Content:
	- bcrypt hash/verify
	- jwt sign/verify
	- cookie settings with 15-day expiry
D. Dependencies:
	- Used by auth routes and auth middleware.

12) src/lib/ai-engine.ts
A. File Type: AI integration module
B. Purpose: Core LLM prompt and response validation.
C. Internal Content:
	- Builds system prompt for standard or ELI5.
	- Calls OpenAI-compatible chat completion models.
	- Parses and validates JSON response, normalizes severity.
	- Handles retries and rate limit backoff.
D. Dependencies:
	- Uses openai client from integrations package, logger.

13) src/lib/cache.ts and src/lib/rate-limiter.ts
A. File Type: Utility modules
B. Purpose: In-memory cache and rate limiting for requests.
C. Internal Content:
	- Map-based storage with TTL (cache) and sliding window (rate limiter).
D. Dependencies:
	- Used by debug routes to avoid reprocessing and limit abuse.

14) src/services/shutdown.ts and src/services/resources.ts
A. File Type: Runtime services
B. Purpose: Graceful shutdown and resource cleanup.
C. Internal Content:
	- Tracks closers, closes DB pool on SIGINT/SIGTERM.
D. Dependencies:
	- Used by index.ts and db package.

DATABASE (lib/db)

1) src/index.ts
A. File Type: Database access module
B. Purpose: Creates pg Pool and Drizzle client.
C. Internal Content:
	- Validates DATABASE_URL
	- Creates singleton pool and db instance on globalThis
	- Exports closeDatabaseConnections
D. Dependencies:
	- Used by API server routes and services.

2) src/schema/users.ts
A. File Type: Schema module
B. Purpose: Defines users table and auth schemas.
C. Internal Content:
	- usersTable fields for auth, credits, timestamps.
	- Zod schemas for Register/Login, toPublicUser mapper.
D. Dependencies:
	- Used by auth routes and middleware.

3) src/schema/debug-sessions.ts
A. File Type: Schema module
B. Purpose: Defines debug_sessions table and AnalyzeRequest schema.
C. Internal Content:
	- Enums for severity, mode, language.
	- Table fields for code, error, AI output, metrics.
D. Dependencies:
	- Used by debug and history routes.

API CONTRACT AND CODEGEN (lib/api-spec, lib/api-client-react, lib/api-zod)

1) lib/api-spec/openapi.yaml
A. File Type: OpenAPI 3.1 spec
B. Purpose: Canonical API contract for backend and clients.
C. Internal Content:
	- Auth, debug, history, health, stats endpoints.
	- Schemas: PublicUser, DebugSession, ApiError, etc.
D. Dependencies:
	- Used by orval to generate clients and zod schemas.

2) lib/api-spec/orval.config.ts
A. File Type: Codegen config
B. Purpose: Orval setup for React Query client and Zod schemas.
C. Internal Content:
	- Generates api-client-react and api-zod output from OpenAPI.
	- Custom fetch mutator uses custom-fetch.ts.
D. Dependencies:
	- Invoked by pnpm codegen in api-spec.

3) lib/api-client-react/src/custom-fetch.ts
A. File Type: API runtime module
B. Purpose: Fetch wrapper with retries, failover, and error parsing.
C. Internal Content:
	- Configurable backend list with active backend/fallback.
	- Health probing, request IDs, timeouts, JSON parsing.
	- ApiError and ResponseParseError classes.
D. Dependencies:
	- Used by generated API client hooks and frontend lib/api.ts.

4) lib/api-client-react/src/index.ts
A. File Type: Barrel export
B. Purpose: Exposes generated client and runtime helpers.
C. Internal Content:
	- Re-exports generated hooks and runtime helpers.
D. Dependencies:
	- Imported by frontend app and other packages.

FRONTEND (artifacts/smart-dev-debugger)

1) src/main.tsx
A. File Type: React entry file
B. Purpose: Bootstraps the frontend.
C. Internal Content:
	- Initializes API runtime and mounts App to DOM.
D. Dependencies:
	- Imports App, index.css, initializeApiLayer.

2) src/App.tsx
A. File Type: React component
B. Purpose: Root component wiring providers and routing.
C. Internal Content:
	- ThemeProvider, QueryClientProvider, BackendProvider, AuthProvider.
	- Wouter Router and RouteGuard for public/protected routes.
D. Dependencies:
	- Imports pages, contexts, layout, UI providers.

3) src/contexts/auth-context.tsx
A. File Type: React context
B. Purpose: Authentication state and actions.
C. Internal Content:
	- refresh() calls getCurrentUser
	- login/register/logout methods
	- Normalizes user data and credits.
D. Dependencies:
	- Uses api-client-react hooks and ApiError.

4) src/contexts/backend-context.tsx
A. File Type: React context
B. Purpose: Tracks backend health and failover state.
C. Internal Content:
	- initializeApiLayer, subscribeToApiRuntime.
	- periodic health checks every 30s.
D. Dependencies:
	- Uses lib/api runtime helpers.

5) src/lib/api.ts
A. File Type: API glue module
B. Purpose: Configures API backends for primary/backup.
C. Internal Content:
	- Reads VITE_API_* env vars
	- configureApiRuntime and helper wrappers.
D. Dependencies:
	- Depends on api-client-react custom-fetch.

6) src/pages/home.tsx
A. File Type: React page
B. Purpose: Main debugging workflow UI.
C. Internal Content:
	- Uses api-client-react hooks for analyze and history.
	- Handles optimistic history updates.
	- Renders input panels, output report, copy/download actions.
D. Dependencies:
	- Depends on Auth context, OutOfCreditsModal, sample errors.

7) src/pages/history.tsx
A. File Type: React page
B. Purpose: History and stats UI.
C. Internal Content:
	- Uses getStats, listHistory, delete/clear mutations.
	- Pagination and filters by language.
D. Dependencies:
	- Depends on api-client-react, UI components.

8) src/pages/login.tsx and src/pages/register.tsx
A. File Type: React pages
B. Purpose: Login and registration forms.
C. Internal Content:
	- Local validation, calls auth context methods.
	- Google OAuth button linking to /api/auth/google.
D. Dependencies:
	- Uses api-client-react ApiError for error handling.

9) src/components/layout.tsx
A. File Type: React component
B. Purpose: Shared app layout for authenticated routes.
C. Internal Content:
	- Header with brand, theme toggle, history/status links.
	- Renders UserPanel at bottom.
D. Dependencies:
	- Uses useTheme, useAuth, UserPanel.

10) src/components/user-panel.tsx
A. File Type: React component
B. Purpose: User info and credits panel.
C. Internal Content:
	- Expand/collapse with framer-motion.
	- Displays credits and logout confirmation.
D. Dependencies:
	- Uses Auth context, AlertDialog, Lucide icons.

11) src/components/protected-route.tsx
A. File Type: React component
B. Purpose: Route guard based on auth state.
C. Internal Content:
	- Redirects to login or dashboard based on mode.
	- Loading state while auth refresh is pending.
D. Dependencies:
	- Uses useAuth and wouter navigation.

12) src/components/backend-banner.tsx
A. File Type: React component
B. Purpose: Shows backend failover and health banner.
C. Internal Content:
	- Renders active backend and status.
	- Refresh health button.
D. Dependencies:
	- Uses Backend context and UI components.

13) src/index.css
A. File Type: CSS stylesheet
B. Purpose: Global theme tokens and Tailwind configuration.
C. Internal Content:
	- Defines CSS variables for light/dark mode, shadows, etc.
	- Tailwind layers and utility tweaks.
D. Dependencies:
	- Loaded by main.tsx.

FRONTEND MOCKUP SANDBOX (artifacts/mockup-sandbox)

1) mockupPreviewPlugin.ts
A. File Type: Vite plugin
B. Purpose: Generates mockup import map and watches files.
C. Internal Content:
	- Uses fast-glob and chokidar to build mockup module.
	- Auto-refresh on add/remove.
D. Dependencies:
	- Used by vite.config.ts.

2) src/App.tsx
A. File Type: React component
B. Purpose: Preview loader and gallery.
C. Internal Content:
	- Routes /preview/* to dynamic import from generated map.
D. Dependencies:
	- Depends on .generated/mockup-components.ts.

INTEGRATIONS

1) lib/integrations-openai-ai-server/src/client.ts
A. File Type: TypeScript module
B. Purpose: Configures OpenAI client using env vars.
C. Internal Content:
	- Validates AI base URL and API key.
D. Dependencies:
	- Used by ai-engine and other server helpers.

2) lib/integrations-openai-ai-server/src/audio/client.ts
A. File Type: TypeScript module
B. Purpose: Audio features (TTS, STT, voice chat).
C. Internal Content:
	- Detects audio format, converts with ffmpeg, calls OpenAI audio models.
D. Dependencies:
	- Used by server integrations if audio features are enabled.

3) lib/integrations-openai-ai-server/src/image/client.ts
A. File Type: TypeScript module
B. Purpose: Image generation helpers with gpt-image-1.
C. Internal Content:
	- generateImageBuffer and editImages functions.
D. Dependencies:
	- Available to server consumers.

4) lib/integrations-openai-ai-react/src/audio/useVoiceStream.ts
A. File Type: React hook
B. Purpose: Streams voice responses via SSE.
C. Internal Content:
	- Streams event data, pushes audio to worklet, handles abort.
D. Dependencies:
	- Uses useAudioPlayback and audio worklet.

======================================================================
STEP 4 - ARCHITECTURE AND FLOW
======================================================================

1) Entry points
- API server: artifacts/api-server/src/index.ts -> app.ts -> routes.
- Frontend app: artifacts/smart-dev-debugger/index.html -> src/main.tsx -> App.tsx.
- Mockup sandbox: artifacts/mockup-sandbox/index.html -> src/main.tsx -> App.tsx.

2) File loading order (frontend)
- Vite loads index.html and src/main.tsx.
- main.tsx loads global CSS and initializes API runtime.
- App.tsx sets providers (theme, react-query, backend, auth) then routing.
- Pages render inside Layout for authenticated routes.

3) Execution flow (API)
- index.ts validates env and port, creates server.
- app.ts mounts middleware, root routes, /api router.
- routes/auth/debug/history/health/version handle requests.
- Auth middleware verifies session cookie and loads user from DB.
- debug route calls ai-engine, cache, and DB insert.

4) Component/module hierarchy (frontend)
- App -> Providers (Theme, Query, Backend, Auth) -> Router.
- Router -> RouteGuard -> Layout -> Page components.
- Pages -> UI components and hooks.
- UserPanel and BackendBanner are global UI surfaces.

5) Data flow
- Frontend calls api-client-react hooks (generated from OpenAPI).
- custom-fetch handles base URL, retry, and failover.
- API server validates requests, uses db and AI engine.
- DB stores users and debug sessions; history reads from DB.

6) Folder responsibilities
- artifacts/: deployable apps (api-server, smart-dev-debugger, mockup-sandbox).
- lib/: shared packages (db, API clients, integrations).
- scripts/: workspace utilities and hooks.
- attached_assets/: captured requirements notes.

7) Architecture pattern
- Monorepo with pnpm workspaces.
- API and UI separated into deployable artifacts.
- OpenAPI as source of truth for API contract.
- Generated clients and schemas shared through lib packages.

======================================================================
STEP 5 - IMPORTANT FILES QUICK LIST
======================================================================

- API entry: artifacts/api-server/src/index.ts, artifacts/api-server/src/app.ts
- Frontend entry: artifacts/smart-dev-debugger/src/main.tsx, artifacts/smart-dev-debugger/src/App.tsx
- API contract: lib/api-spec/openapi.yaml
- Client runtime: lib/api-client-react/src/custom-fetch.ts
- DB schema: lib/db/src/schema/*.ts
- Build configs: Dockerfile, docker-compose.yml, vite.config.ts
- Workspace config: package.json, pnpm-workspace.yaml, tsconfig.base.json

End of documentation.
# Dev Debugger Project Structure and Architecture

This document maps the entire workspace structure and explains how the system works end to end. It is written to be beginner friendly while still precise about the architecture.

## 1) Overview

Dev Debugger is a pnpm monorepo with three main layers:
- Backend API: Express service in artifacts/api-server.
- Frontend app: Vite + React SPA in artifacts/smart-dev-debugger.
- Shared libraries: OpenAPI spec, generated clients and schemas, database schema, and AI integration helpers in lib/.

There is also a mockup sandbox app (artifacts/mockup-sandbox) for UI previews, plus scripts and deployment/config files at the root.

## 2) Full Project Tree (every file)

Dev Debugger/
|-- [package.json](package.json)
|   - Type: JSON config file; Category: Workspace configuration; Purpose: Root pnpm scripts and tooling dependencies.
|-- [pnpm-lock.yaml](pnpm-lock.yaml)
|   - Type: YAML lockfile; Category: Dependency lock; Purpose: Frozen dependency graph for reproducible installs.
|-- [pnpm-workspace.yaml](pnpm-workspace.yaml)
|   - Type: YAML workspace config; Category: Monorepo configuration; Purpose: Declares package locations and pnpm security rules.
|-- [tsconfig.base.json](tsconfig.base.json)
|   - Type: JSON config file; Category: TypeScript base config; Purpose: Shared compiler defaults for all packages.
|-- [tsconfig.json](tsconfig.json)
|   - Type: JSON config file; Category: TypeScript solution config; Purpose: References workspace packages for project builds.
|-- [vercel.json](vercel.json)
|   - Type: JSON config file; Category: Deployment config; Purpose: Vercel project metadata (currently schema stub).
|-- [docker-compose.yml](docker-compose.yml)
|   - Type: YAML config file; Category: Container orchestration; Purpose: Local/prod compose for API service.
|-- [Dockerfile](Dockerfile)
|   - Type: Docker build file; Category: Container build; Purpose: Multi-stage build for API server runtime image.
|-- [.env.example](.env.example)
|   - Type: Env template; Category: Configuration; Purpose: Sample environment variables for local setup.
|-- [.npmrc](.npmrc)
|   - Type: NPM config; Category: Package manager config; Purpose: Workspace npm behavior (peer deps).
|-- [.gitignore](.gitignore)
|   - Type: Git ignore rules; Category: VCS config; Purpose: Ignore build outputs, secrets, and local artifacts.
|-- [.gitattributes](.gitattributes)
|   - Type: Git attributes; Category: VCS config; Purpose: Normalize text file line endings.
|-- [.dockerignore](.dockerignore)
|   - Type: Docker ignore rules; Category: Container config; Purpose: Exclude files from Docker build context.
|-- [README.md](README.md)
|   - Type: Markdown doc; Category: Documentation; Purpose: Project overview, setup, and usage.
|-- [ProjectStruct.md](ProjectStruct.md)
|   - Type: Markdown doc; Category: Documentation; Purpose: Full structure and architecture analysis (this file).
|-- attached_assets/
|   |-- [Pasted-Add-a-Landing-Page-Full-Authentication-System-to-this-p_1777070056664.txt](attached_assets/Pasted-Add-a-Landing-Page-Full-Authentication-System-to-this-p_1777070056664.txt)
|   |   - Type: Text file; Category: Product requirements; Purpose: Feature spec for landing page and auth.
|   |-- [Pasted-You-are-a-Staff-level-Full-Stack-Engineer-and-System-Ar_1777068755033.txt](attached_assets/Pasted-You-are-a-Staff-level-Full-Stack-Engineer-and-System-Ar_1777068755033.txt)
|       - Type: Text file; Category: Vision/requirements; Purpose: Project vision and target architecture notes.
|-- artifacts/
|   |-- api-server/
|   |   |-- [package.json](artifacts/api-server/package.json)
|   |   |   - Type: JSON config file; Category: Backend package config; Purpose: API server scripts and dependencies.
|   |   |-- [tsconfig.json](artifacts/api-server/tsconfig.json)
|   |   |   - Type: JSON config file; Category: TypeScript config; Purpose: API server TS build settings.
|   |   |-- [build.mjs](artifacts/api-server/build.mjs)
|   |   |   - Type: Node ESM script; Category: Build tooling; Purpose: esbuild bundle for API server.
|   |   |-- [DEPLOYMENT.md](artifacts/api-server/DEPLOYMENT.md)
|   |   |   - Type: Markdown doc; Category: Deployment guidance; Purpose: Dual deployment instructions and rules.
|   |   |-- .replit-artifact/
|   |   |   |-- [artifact.toml](artifacts/api-server/.replit-artifact/artifact.toml)
|   |   |       - Type: TOML config; Category: Replit artifact metadata; Purpose: Deployment artifact manifest.
|   |   |-- src/
|   |   |   |-- [app.ts](artifacts/api-server/src/app.ts)
|   |   |   |   - Type: TypeScript module; Category: Express app setup; Purpose: Middleware, routes, and top-level handlers.
|   |   |   |-- [index.ts](artifacts/api-server/src/index.ts)
|   |   |   |   - Type: TypeScript entry file; Category: Server bootstrap; Purpose: Create HTTP server and start services.
|   |   |   |-- config/
|   |   |   |   |-- [env.ts](artifacts/api-server/src/config/env.ts)
|   |   |   |   |   - Type: TypeScript module; Category: Configuration; Purpose: Validate and load environment variables.
|   |   |   |   |-- [platform.ts](artifacts/api-server/src/config/platform.ts)
|   |   |   |       - Type: TypeScript module; Category: Configuration helpers; Purpose: Derive platform flags.
|   |   |   |-- lib/
|   |   |   |   |-- [ai-engine.ts](artifacts/api-server/src/lib/ai-engine.ts)
|   |   |   |   |   - Type: TypeScript module; Category: AI service; Purpose: Build prompts and call OpenAI-compatible API.
|   |   |   |   |-- [cache.ts](artifacts/api-server/src/lib/cache.ts)
|   |   |   |   |   - Type: TypeScript module; Category: Caching; Purpose: In-memory cache with TTL for analysis results.
|   |   |   |   |-- [rate-limiter.ts](artifacts/api-server/src/lib/rate-limiter.ts)
|   |   |   |   |   - Type: TypeScript module; Category: Rate limiting; Purpose: In-memory per-IP rate limiter.
|   |   |   |   |-- [.gitkeep](artifacts/api-server/src/lib/.gitkeep)
|   |   |   |       - Type: Placeholder file; Category: Repo hygiene; Purpose: Keep empty lib folder tracked.
|   |   |   |-- middleware/
|   |   |   |   |-- [auth.ts](artifacts/api-server/src/middleware/auth.ts)
|   |   |   |   |   - Type: TypeScript module; Category: Middleware; Purpose: Auth cookie validation and user lookup.
|   |   |   |   |-- [error-handler.ts](artifacts/api-server/src/middleware/error-handler.ts)
|   |   |   |   |   - Type: TypeScript module; Category: Middleware; Purpose: 404 and error response handling.
|   |   |   |   |-- [rate-limit.ts](artifacts/api-server/src/middleware/rate-limit.ts)
|   |   |   |   |   - Type: TypeScript module; Category: Middleware; Purpose: Express-level rate limiting.
|   |   |   |   |-- [request-sanitizer.ts](artifacts/api-server/src/middleware/request-sanitizer.ts)
|   |   |   |       - Type: TypeScript module; Category: Middleware; Purpose: Remove dangerous keys and null bytes.
|   |   |   |-- middlewares/
|   |   |   |   |-- [.gitkeep](artifacts/api-server/src/middlewares/.gitkeep)
|   |   |   |       - Type: Placeholder file; Category: Repo hygiene; Purpose: Keep empty middlewares folder tracked.
|   |   |   |-- routes/
|   |   |   |   |-- [auth.ts](artifacts/api-server/src/routes/auth.ts)
|   |   |   |   |   - Type: TypeScript module; Category: API route; Purpose: Register/login/logout/me and Google OAuth.
|   |   |   |   |-- [debug.ts](artifacts/api-server/src/routes/debug.ts)
|   |   |   |   |   - Type: TypeScript module; Category: API route; Purpose: Analyze code, cache, and persist sessions.
|   |   |   |   |-- [health.ts](artifacts/api-server/src/routes/health.ts)
|   |   |   |   |   - Type: TypeScript module; Category: API route; Purpose: Health endpoints for monitoring.
|   |   |   |   |-- [history.ts](artifacts/api-server/src/routes/history.ts)
|   |   |   |   |   - Type: TypeScript module; Category: API route; Purpose: History list/detail/delete operations.
|   |   |   |   |-- [index.ts](artifacts/api-server/src/routes/index.ts)
|   |   |   |   |   - Type: TypeScript module; Category: Route aggregator; Purpose: Combine all route modules.
|   |   |   |   |-- [version.ts](artifacts/api-server/src/routes/version.ts)
|   |   |   |       - Type: TypeScript module; Category: API route; Purpose: Version/commit metadata endpoint.
|   |   |   |-- services/
|   |   |   |   |-- [auth.ts](artifacts/api-server/src/services/auth.ts)
|   |   |   |   |   - Type: TypeScript module; Category: Auth service; Purpose: JWT, bcrypt, cookie options.
|   |   |   |   |-- [primary-instance.ts](artifacts/api-server/src/services/primary-instance.ts)
|   |   |   |   |   - Type: TypeScript module; Category: Runtime service; Purpose: Primary-only tasks and guards.
|   |   |   |   |-- [resources.ts](artifacts/api-server/src/services/resources.ts)
|   |   |   |   |   - Type: TypeScript module; Category: Resource registry; Purpose: Track closable resources.
|   |   |   |   |-- [shutdown.ts](artifacts/api-server/src/services/shutdown.ts)
|   |   |   |   |   - Type: TypeScript module; Category: Runtime service; Purpose: Graceful shutdown handlers.
|   |   |   |   |-- [websocket.ts](artifacts/api-server/src/services/websocket.ts)
|   |   |   |       - Type: TypeScript module; Category: Runtime service; Purpose: Websocket placeholder and cleanup.
|   |   |   |-- utils/
|   |   |   |   |-- [http.ts](artifacts/api-server/src/utils/http.ts)
|   |   |   |   |   - Type: TypeScript module; Category: HTTP utils; Purpose: Client IP resolution.
|   |   |   |   |-- [logger.ts](artifacts/api-server/src/utils/logger.ts)
|   |   |   |       - Type: TypeScript module; Category: Logging; Purpose: Pino logger configuration.
|   |-- mockup-sandbox/
|   |   |-- [package.json](artifacts/mockup-sandbox/package.json)
|   |   |   - Type: JSON config file; Category: Frontend package config; Purpose: UI sandbox dependencies and scripts.
|   |   |-- [tsconfig.json](artifacts/mockup-sandbox/tsconfig.json)
|   |   |   - Type: JSON config file; Category: TypeScript config; Purpose: TS settings for sandbox app.
|   |   |-- [vite.config.ts](artifacts/mockup-sandbox/vite.config.ts)
|   |   |   - Type: TypeScript config; Category: Vite build config; Purpose: Sandbox dev server and build rules.
|   |   |-- [index.html](artifacts/mockup-sandbox/index.html)
|   |   |   - Type: HTML file; Category: Frontend entry; Purpose: Vite root HTML template.
|   |   |-- [mockupPreviewPlugin.ts](artifacts/mockup-sandbox/mockupPreviewPlugin.ts)
|   |   |   - Type: TypeScript module; Category: Vite plugin; Purpose: Auto-generate mockup module registry.
|   |   |-- [components.json](artifacts/mockup-sandbox/components.json)
|   |   |   - Type: JSON config file; Category: UI config; Purpose: shadcn/ui component metadata.
|   |   |-- .replit-artifact/
|   |   |   |-- [artifact.toml](artifacts/mockup-sandbox/.replit-artifact/artifact.toml)
|   |   |       - Type: TOML config; Category: Replit artifact metadata; Purpose: Deployment artifact manifest.
|   |   |-- src/
|   |   |   |-- [App.tsx](artifacts/mockup-sandbox/src/App.tsx)
|   |   |   |   - Type: TSX React component; Category: App root; Purpose: Preview router for mockup components.
|   |   |   |-- [main.tsx](artifacts/mockup-sandbox/src/main.tsx)
|   |   |   |   - Type: TSX entry file; Category: Frontend bootstrap; Purpose: Mount React app.
|   |   |   |-- [index.css](artifacts/mockup-sandbox/src/index.css)
|   |   |   |   - Type: CSS file; Category: Styling; Purpose: Tailwind layers and base theme tokens.
|   |   |   |-- .generated/
|   |   |   |   |-- [mockup-components.ts](artifacts/mockup-sandbox/src/.generated/mockup-components.ts)
|   |   |   |       - Type: Generated TS module; Category: Build output; Purpose: Dynamic import map for previews.
|   |   |   |-- components/
|   |   |   |   |-- ui/
|   |   |   |   |   |-- [accordion.tsx](artifacts/mockup-sandbox/src/components/ui/accordion.tsx)
|   |   |   |   |   |   - Type: TSX React component; Category: UI primitive; Purpose: Accordion UI control.
|   |   |   |   |   |-- [alert-dialog.tsx](artifacts/mockup-sandbox/src/components/ui/alert-dialog.tsx)
|   |   |   |   |   |   - Type: TSX React component; Category: UI primitive; Purpose: Modal alert dialog.
|   |   |   |   |   |-- [alert.tsx](artifacts/mockup-sandbox/src/components/ui/alert.tsx)
|   |   |   |   |   |   - Type: TSX React component; Category: UI primitive; Purpose: Alert message block.
|   |   |   |   |   |-- [aspect-ratio.tsx](artifacts/mockup-sandbox/src/components/ui/aspect-ratio.tsx)
|   |   |   |   |   |   - Type: TSX React component; Category: UI primitive; Purpose: Aspect ratio container.
|   |   |   |   |   |-- [avatar.tsx](artifacts/mockup-sandbox/src/components/ui/avatar.tsx)
|   |   |   |   |   |   - Type: TSX React component; Category: UI primitive; Purpose: Avatar display.
|   |   |   |   |   |-- [badge.tsx](artifacts/mockup-sandbox/src/components/ui/badge.tsx)
|   |   |   |   |   |   - Type: TSX React component; Category: UI primitive; Purpose: Badge label.
|   |   |   |   |   |-- [breadcrumb.tsx](artifacts/mockup-sandbox/src/components/ui/breadcrumb.tsx)
|   |   |   |   |   |   - Type: TSX React component; Category: UI primitive; Purpose: Breadcrumb navigation.
|   |   |   |   |   |-- [button-group.tsx](artifacts/mockup-sandbox/src/components/ui/button-group.tsx)
|   |   |   |   |   |   - Type: TSX React component; Category: UI primitive; Purpose: Button group wrapper.
|   |   |   |   |   |-- [button.tsx](artifacts/mockup-sandbox/src/components/ui/button.tsx)
|   |   |   |   |   |   - Type: TSX React component; Category: UI primitive; Purpose: Button component.
|   |   |   |   |   |-- [calendar.tsx](artifacts/mockup-sandbox/src/components/ui/calendar.tsx)
|   |   |   |   |   |   - Type: TSX React component; Category: UI primitive; Purpose: Date picker UI.
|   |   |   |   |   |-- [card.tsx](artifacts/mockup-sandbox/src/components/ui/card.tsx)
|   |   |   |   |   |   - Type: TSX React component; Category: UI primitive; Purpose: Card layout container.
|   |   |   |   |   |-- [carousel.tsx](artifacts/mockup-sandbox/src/components/ui/carousel.tsx)
|   |   |   |   |   |   - Type: TSX React component; Category: UI primitive; Purpose: Carousel layout.
|   |   |   |   |   |-- [chart.tsx](artifacts/mockup-sandbox/src/components/ui/chart.tsx)
|   |   |   |   |   |   - Type: TSX React component; Category: UI primitive; Purpose: Chart wrapper helpers.
|   |   |   |   |   |-- [checkbox.tsx](artifacts/mockup-sandbox/src/components/ui/checkbox.tsx)
|   |   |   |   |   |   - Type: TSX React component; Category: UI primitive; Purpose: Checkbox input.
|   |   |   |   |   |-- [collapsible.tsx](artifacts/mockup-sandbox/src/components/ui/collapsible.tsx)
|   |   |   |   |   |   - Type: TSX React component; Category: UI primitive; Purpose: Collapsible section.
|   |   |   |   |   |-- [command.tsx](artifacts/mockup-sandbox/src/components/ui/command.tsx)
|   |   |   |   |   |   - Type: TSX React component; Category: UI primitive; Purpose: Command palette UI.
|   |   |   |   |   |-- [context-menu.tsx](artifacts/mockup-sandbox/src/components/ui/context-menu.tsx)
|   |   |   |   |   |   - Type: TSX React component; Category: UI primitive; Purpose: Context menu UI.
|   |   |   |   |   |-- [dialog.tsx](artifacts/mockup-sandbox/src/components/ui/dialog.tsx)
|   |   |   |   |   |   - Type: TSX React component; Category: UI primitive; Purpose: Dialog modal.
|   |   |   |   |   |-- [drawer.tsx](artifacts/mockup-sandbox/src/components/ui/drawer.tsx)
|   |   |   |   |   |   - Type: TSX React component; Category: UI primitive; Purpose: Bottom sheet/drawer.
|   |   |   |   |   |-- [dropdown-menu.tsx](artifacts/mockup-sandbox/src/components/ui/dropdown-menu.tsx)
|   |   |   |   |   |   - Type: TSX React component; Category: UI primitive; Purpose: Dropdown menu.
|   |   |   |   |   |-- [empty.tsx](artifacts/mockup-sandbox/src/components/ui/empty.tsx)
|   |   |   |   |   |   - Type: TSX React component; Category: UI primitive; Purpose: Empty state layout.
|   |   |   |   |   |-- [field.tsx](artifacts/mockup-sandbox/src/components/ui/field.tsx)
|   |   |   |   |   |   - Type: TSX React component; Category: UI primitive; Purpose: Form field wrapper.
|   |   |   |   |   |-- [form.tsx](artifacts/mockup-sandbox/src/components/ui/form.tsx)
|   |   |   |   |   |   - Type: TSX React component; Category: UI primitive; Purpose: Form utilities.
|   |   |   |   |   |-- [hover-card.tsx](artifacts/mockup-sandbox/src/components/ui/hover-card.tsx)
|   |   |   |   |   |   - Type: TSX React component; Category: UI primitive; Purpose: Hover card UI.
|   |   |   |   |   |-- [input-group.tsx](artifacts/mockup-sandbox/src/components/ui/input-group.tsx)
|   |   |   |   |   |   - Type: TSX React component; Category: UI primitive; Purpose: Input group layout.
|   |   |   |   |   |-- [input-otp.tsx](artifacts/mockup-sandbox/src/components/ui/input-otp.tsx)
|   |   |   |   |   |   - Type: TSX React component; Category: UI primitive; Purpose: OTP input control.
|   |   |   |   |   |-- [input.tsx](artifacts/mockup-sandbox/src/components/ui/input.tsx)
|   |   |   |   |   |   - Type: TSX React component; Category: UI primitive; Purpose: Text input.
|   |   |   |   |   |-- [item.tsx](artifacts/mockup-sandbox/src/components/ui/item.tsx)
|   |   |   |   |   |   - Type: TSX React component; Category: UI primitive; Purpose: Generic item layout.
|   |   |   |   |   |-- [kbd.tsx](artifacts/mockup-sandbox/src/components/ui/kbd.tsx)
|   |   |   |   |   |   - Type: TSX React component; Category: UI primitive; Purpose: Keyboard key styling.
|   |   |   |   |   |-- [label.tsx](artifacts/mockup-sandbox/src/components/ui/label.tsx)
|   |   |   |   |   |   - Type: TSX React component; Category: UI primitive; Purpose: Form label.
|   |   |   |   |   |-- [menubar.tsx](artifacts/mockup-sandbox/src/components/ui/menubar.tsx)
|   |   |   |   |   |   - Type: TSX React component; Category: UI primitive; Purpose: Menubar navigation.
|   |   |   |   |   |-- [navigation-menu.tsx](artifacts/mockup-sandbox/src/components/ui/navigation-menu.tsx)
|   |   |   |   |   |   - Type: TSX React component; Category: UI primitive; Purpose: Navigation menu.
|   |   |   |   |   |-- [pagination.tsx](artifacts/mockup-sandbox/src/components/ui/pagination.tsx)
|   |   |   |   |   |   - Type: TSX React component; Category: UI primitive; Purpose: Pagination control.
|   |   |   |   |   |-- [popover.tsx](artifacts/mockup-sandbox/src/components/ui/popover.tsx)
|   |   |   |   |   |   - Type: TSX React component; Category: UI primitive; Purpose: Popover UI.
|   |   |   |   |   |-- [progress.tsx](artifacts/mockup-sandbox/src/components/ui/progress.tsx)
|   |   |   |   |   |   - Type: TSX React component; Category: UI primitive; Purpose: Progress bar.
|   |   |   |   |   |-- [radio-group.tsx](artifacts/mockup-sandbox/src/components/ui/radio-group.tsx)
|   |   |   |   |   |   - Type: TSX React component; Category: UI primitive; Purpose: Radio group input.
|   |   |   |   |   |-- [resizable.tsx](artifacts/mockup-sandbox/src/components/ui/resizable.tsx)
|   |   |   |   |   |   - Type: TSX React component; Category: UI primitive; Purpose: Resizable panels.
|   |   |   |   |   |-- [scroll-area.tsx](artifacts/mockup-sandbox/src/components/ui/scroll-area.tsx)
|   |   |   |   |   |   - Type: TSX React component; Category: UI primitive; Purpose: Custom scroll area.
|   |   |   |   |   |-- [select.tsx](artifacts/mockup-sandbox/src/components/ui/select.tsx)
|   |   |   |   |   |   - Type: TSX React component; Category: UI primitive; Purpose: Select dropdown.
|   |   |   |   |   |-- [separator.tsx](artifacts/mockup-sandbox/src/components/ui/separator.tsx)
|   |   |   |   |   |   - Type: TSX React component; Category: UI primitive; Purpose: Separator line.
|   |   |   |   |   |-- [sheet.tsx](artifacts/mockup-sandbox/src/components/ui/sheet.tsx)
|   |   |   |   |   |   - Type: TSX React component; Category: UI primitive; Purpose: Sheet modal.
|   |   |   |   |   |-- [sidebar.tsx](artifacts/mockup-sandbox/src/components/ui/sidebar.tsx)
|   |   |   |   |   |   - Type: TSX React component; Category: UI primitive; Purpose: Sidebar layout.
|   |   |   |   |   |-- [skeleton.tsx](artifacts/mockup-sandbox/src/components/ui/skeleton.tsx)
|   |   |   |   |   |   - Type: TSX React component; Category: UI primitive; Purpose: Loading skeleton.
|   |   |   |   |   |-- [slider.tsx](artifacts/mockup-sandbox/src/components/ui/slider.tsx)
|   |   |   |   |   |   - Type: TSX React component; Category: UI primitive; Purpose: Slider input.
|   |   |   |   |   |-- [sonner.tsx](artifacts/mockup-sandbox/src/components/ui/sonner.tsx)
|   |   |   |   |   |   - Type: TSX React component; Category: UI primitive; Purpose: Sonner toast wrapper.
|   |   |   |   |   |-- [spinner.tsx](artifacts/mockup-sandbox/src/components/ui/spinner.tsx)
|   |   |   |   |   |   - Type: TSX React component; Category: UI primitive; Purpose: Loading spinner.
|   |   |   |   |   |-- [switch.tsx](artifacts/mockup-sandbox/src/components/ui/switch.tsx)
|   |   |   |   |   |   - Type: TSX React component; Category: UI primitive; Purpose: Toggle switch.
|   |   |   |   |   |-- [table.tsx](artifacts/mockup-sandbox/src/components/ui/table.tsx)
|   |   |   |   |   |   - Type: TSX React component; Category: UI primitive; Purpose: Table primitives.
|   |   |   |   |   |-- [tabs.tsx](artifacts/mockup-sandbox/src/components/ui/tabs.tsx)
|   |   |   |   |   |   - Type: TSX React component; Category: UI primitive; Purpose: Tabs UI.
|   |   |   |   |   |-- [textarea.tsx](artifacts/mockup-sandbox/src/components/ui/textarea.tsx)
|   |   |   |   |   |   - Type: TSX React component; Category: UI primitive; Purpose: Textarea input.
|   |   |   |   |   |-- [toast.tsx](artifacts/mockup-sandbox/src/components/ui/toast.tsx)
|   |   |   |   |   |   - Type: TSX React component; Category: UI primitive; Purpose: Toast UI.
|   |   |   |   |   |-- [toaster.tsx](artifacts/mockup-sandbox/src/components/ui/toaster.tsx)
|   |   |   |   |   |   - Type: TSX React component; Category: UI primitive; Purpose: Toast container.
|   |   |   |   |   |-- [toggle-group.tsx](artifacts/mockup-sandbox/src/components/ui/toggle-group.tsx)
|   |   |   |   |   |   - Type: TSX React component; Category: UI primitive; Purpose: Toggle group control.
|   |   |   |   |   |-- [toggle.tsx](artifacts/mockup-sandbox/src/components/ui/toggle.tsx)
|   |   |   |   |   |   - Type: TSX React component; Category: UI primitive; Purpose: Toggle button.
|   |   |   |   |   |-- [tooltip.tsx](artifacts/mockup-sandbox/src/components/ui/tooltip.tsx)
|   |   |   |   |       - Type: TSX React component; Category: UI primitive; Purpose: Tooltip UI.
|   |   |   |-- hooks/
|   |   |   |   |-- [use-mobile.tsx](artifacts/mockup-sandbox/src/hooks/use-mobile.tsx)
|   |   |   |   |   - Type: TSX hook; Category: UI utilities; Purpose: Screen size detection hook.
|   |   |   |   |-- [use-toast.ts](artifacts/mockup-sandbox/src/hooks/use-toast.ts)
|   |   |   |       - Type: TypeScript module; Category: UI utilities; Purpose: Toast state management.
|   |   |   |-- lib/
|   |   |       |-- [utils.ts](artifacts/mockup-sandbox/src/lib/utils.ts)
|   |   |           - Type: TypeScript module; Category: UI utilities; Purpose: Tailwind class merge helper.
|   |-- smart-dev-debugger/
|   |   |-- [package.json](artifacts/smart-dev-debugger/package.json)
|   |   |   - Type: JSON config file; Category: Frontend package config; Purpose: Main app dependencies and scripts.
|   |   |-- [tsconfig.json](artifacts/smart-dev-debugger/tsconfig.json)
|   |   |   - Type: JSON config file; Category: TypeScript config; Purpose: TS settings for main frontend app.
|   |   |-- [vite.config.ts](artifacts/smart-dev-debugger/vite.config.ts)
|   |   |   - Type: TypeScript config; Category: Vite build config; Purpose: Vite dev server, proxy, and build.
|   |   |-- [vercel.json](artifacts/smart-dev-debugger/vercel.json)
|   |   |   - Type: JSON config file; Category: Deployment config; Purpose: Vercel metadata for frontend app.
|   |   |-- [index.html](artifacts/smart-dev-debugger/index.html)
|   |   |   - Type: HTML file; Category: Frontend entry; Purpose: Root HTML template for Vite.
|   |   |-- [components.json](artifacts/smart-dev-debugger/components.json)
|   |   |   - Type: JSON config file; Category: UI config; Purpose: shadcn/ui component metadata.
|   |   |-- .replit-artifact/
|   |   |   |-- [artifact.toml](artifacts/smart-dev-debugger/.replit-artifact/artifact.toml)
|   |   |       - Type: TOML config; Category: Replit artifact metadata; Purpose: Deployment artifact manifest.
|   |   |-- public/
|   |   |   |-- [Dev-Bugger-Prev-2.png](artifacts/smart-dev-debugger/public/Dev-Bugger-Prev-2.png)
|   |   |   |   - Type: PNG image; Category: Asset; Purpose: Marketing/preview image.
|   |   |   |-- [favicon.svg](artifacts/smart-dev-debugger/public/favicon.svg)
|   |   |   |   - Type: SVG image; Category: Asset; Purpose: App favicon.
|   |   |   |-- [opengraph.jpg](artifacts/smart-dev-debugger/public/opengraph.jpg)
|   |   |       - Type: JPG image; Category: Asset; Purpose: Social sharing preview image.
|   |   |-- src/
|   |   |   |-- [main.tsx](artifacts/smart-dev-debugger/src/main.tsx)
|   |   |   |   - Type: TSX entry file; Category: Frontend bootstrap; Purpose: Initialize API layer and mount app.
|   |   |   |-- [App.tsx](artifacts/smart-dev-debugger/src/App.tsx)
|   |   |   |   - Type: TSX React component; Category: App root; Purpose: Providers and routing tree.
|   |   |   |-- [index.css](artifacts/smart-dev-debugger/src/index.css)
|   |   |   |   - Type: CSS file; Category: Styling; Purpose: Tailwind base theme tokens and utilities.
|   |   |   |-- [vite-env.d.ts](artifacts/smart-dev-debugger/src/vite-env.d.ts)
|   |   |   |   - Type: TypeScript declarations; Category: Build types; Purpose: Vite env type declarations.
|   |   |   |-- components/
|   |   |   |   |-- [backend-banner.tsx](artifacts/smart-dev-debugger/src/components/backend-banner.tsx)
|   |   |   |   |   - Type: TSX React component; Category: UI component; Purpose: Backend status banner.
|   |   |   |   |-- [credits-modal.tsx](artifacts/smart-dev-debugger/src/components/credits-modal.tsx)
|   |   |   |   |   - Type: TSX React component; Category: UI component; Purpose: Out-of-credits modal.
|   |   |   |   |-- [layout.tsx](artifacts/smart-dev-debugger/src/components/layout.tsx)
|   |   |   |   |   - Type: TSX React component; Category: Layout; Purpose: Shared layout and header.
|   |   |   |   |-- [protected-route.tsx](artifacts/smart-dev-debugger/src/components/protected-route.tsx)
|   |   |   |   |   - Type: TSX React component; Category: Routing guard; Purpose: Auth based route protection.
|   |   |   |   |-- [theme-provider.tsx](artifacts/smart-dev-debugger/src/components/theme-provider.tsx)
|   |   |   |   |   - Type: TSX React component; Category: Theme; Purpose: Theme state and class toggling.
|   |   |   |   |-- [user-panel.tsx](artifacts/smart-dev-debugger/src/components/user-panel.tsx)
|   |   |   |   |   - Type: TSX React component; Category: UI component; Purpose: User account panel and credits.
|   |   |   |   |-- ui/
|   |   |   |   |   |-- [accordion.tsx](artifacts/smart-dev-debugger/src/components/ui/accordion.tsx)
|   |   |   |   |   |   - Type: TSX React component; Category: UI primitive; Purpose: Accordion UI control.
|   |   |   |   |   |-- [alert-dialog.tsx](artifacts/smart-dev-debugger/src/components/ui/alert-dialog.tsx)
|   |   |   |   |   |   - Type: TSX React component; Category: UI primitive; Purpose: Modal alert dialog.
|   |   |   |   |   |-- [alert.tsx](artifacts/smart-dev-debugger/src/components/ui/alert.tsx)
|   |   |   |   |   |   - Type: TSX React component; Category: UI primitive; Purpose: Alert message block.
|   |   |   |   |   |-- [aspect-ratio.tsx](artifacts/smart-dev-debugger/src/components/ui/aspect-ratio.tsx)
|   |   |   |   |   |   - Type: TSX React component; Category: UI primitive; Purpose: Aspect ratio container.
|   |   |   |   |   |-- [avatar.tsx](artifacts/smart-dev-debugger/src/components/ui/avatar.tsx)
|   |   |   |   |   |   - Type: TSX React component; Category: UI primitive; Purpose: Avatar display.
|   |   |   |   |   |-- [badge.tsx](artifacts/smart-dev-debugger/src/components/ui/badge.tsx)
|   |   |   |   |   |   - Type: TSX React component; Category: UI primitive; Purpose: Badge label.
|   |   |   |   |   |-- [breadcrumb.tsx](artifacts/smart-dev-debugger/src/components/ui/breadcrumb.tsx)
|   |   |   |   |   |   - Type: TSX React component; Category: UI primitive; Purpose: Breadcrumb navigation.
|   |   |   |   |   |-- [button-group.tsx](artifacts/smart-dev-debugger/src/components/ui/button-group.tsx)
|   |   |   |   |   |   - Type: TSX React component; Category: UI primitive; Purpose: Button group wrapper.
|   |   |   |   |   |-- [button.tsx](artifacts/smart-dev-debugger/src/components/ui/button.tsx)
|   |   |   |   |   |   - Type: TSX React component; Category: UI primitive; Purpose: Button component.
|   |   |   |   |   |-- [calendar.tsx](artifacts/smart-dev-debugger/src/components/ui/calendar.tsx)
|   |   |   |   |   |   - Type: TSX React component; Category: UI primitive; Purpose: Date picker UI.
|   |   |   |   |   |-- [card.tsx](artifacts/smart-dev-debugger/src/components/ui/card.tsx)
|   |   |   |   |   |   - Type: TSX React component; Category: UI primitive; Purpose: Card layout container.
|   |   |   |   |   |-- [carousel.tsx](artifacts/smart-dev-debugger/src/components/ui/carousel.tsx)
|   |   |   |   |   |   - Type: TSX React component; Category: UI primitive; Purpose: Carousel layout.
|   |   |   |   |   |-- [chart.tsx](artifacts/smart-dev-debugger/src/components/ui/chart.tsx)
|   |   |   |   |   |   - Type: TSX React component; Category: UI primitive; Purpose: Chart wrapper helpers.
|   |   |   |   |   |-- [checkbox.tsx](artifacts/smart-dev-debugger/src/components/ui/checkbox.tsx)
|   |   |   |   |   |   - Type: TSX React component; Category: UI primitive; Purpose: Checkbox input.
|   |   |   |   |   |-- [collapsible.tsx](artifacts/smart-dev-debugger/src/components/ui/collapsible.tsx)
|   |   |   |   |   |   - Type: TSX React component; Category: UI primitive; Purpose: Collapsible section.
|   |   |   |   |   |-- [command.tsx](artifacts/smart-dev-debugger/src/components/ui/command.tsx)
|   |   |   |   |   |   - Type: TSX React component; Category: UI primitive; Purpose: Command palette UI.
|   |   |   |   |   |-- [context-menu.tsx](artifacts/smart-dev-debugger/src/components/ui/context-menu.tsx)
|   |   |   |   |   |   - Type: TSX React component; Category: UI primitive; Purpose: Context menu UI.
|   |   |   |   |   |-- [dialog.tsx](artifacts/smart-dev-debugger/src/components/ui/dialog.tsx)
|   |   |   |   |   |   - Type: TSX React component; Category: UI primitive; Purpose: Dialog modal.
|   |   |   |   |   |-- [drawer.tsx](artifacts/smart-dev-debugger/src/components/ui/drawer.tsx)
|   |   |   |   |   |   - Type: TSX React component; Category: UI primitive; Purpose: Bottom sheet/drawer.
|   |   |   |   |   |-- [dropdown-menu.tsx](artifacts/smart-dev-debugger/src/components/ui/dropdown-menu.tsx)
|   |   |   |   |   |   - Type: TSX React component; Category: UI primitive; Purpose: Dropdown menu.
|   |   |   |   |   |-- [empty.tsx](artifacts/smart-dev-debugger/src/components/ui/empty.tsx)
|   |   |   |   |   |   - Type: TSX React component; Category: UI primitive; Purpose: Empty state layout.
|   |   |   |   |   |-- [field.tsx](artifacts/smart-dev-debugger/src/components/ui/field.tsx)
|   |   |   |   |   |   - Type: TSX React component; Category: UI primitive; Purpose: Form field wrapper.
|   |   |   |   |   |-- [form.tsx](artifacts/smart-dev-debugger/src/components/ui/form.tsx)
|   |   |   |   |   |   - Type: TSX React component; Category: UI primitive; Purpose: Form utilities.
|   |   |   |   |   |-- [hover-card.tsx](artifacts/smart-dev-debugger/src/components/ui/hover-card.tsx)
|   |   |   |   |   |   - Type: TSX React component; Category: UI primitive; Purpose: Hover card UI.
|   |   |   |   |   |-- [input-group.tsx](artifacts/smart-dev-debugger/src/components/ui/input-group.tsx)
|   |   |   |   |   |   - Type: TSX React component; Category: UI primitive; Purpose: Input group layout.
|   |   |   |   |   |-- [input-otp.tsx](artifacts/smart-dev-debugger/src/components/ui/input-otp.tsx)
|   |   |   |   |   |   - Type: TSX React component; Category: UI primitive; Purpose: OTP input control.
|   |   |   |   |   |-- [input.tsx](artifacts/smart-dev-debugger/src/components/ui/input.tsx)
|   |   |   |   |   |   - Type: TSX React component; Category: UI primitive; Purpose: Text input.
|   |   |   |   |   |-- [item.tsx](artifacts/smart-dev-debugger/src/components/ui/item.tsx)
|   |   |   |   |   |   - Type: TSX React component; Category: UI primitive; Purpose: Generic item layout.
|   |   |   |   |   |-- [kbd.tsx](artifacts/smart-dev-debugger/src/components/ui/kbd.tsx)
|   |   |   |   |   |   - Type: TSX React component; Category: UI primitive; Purpose: Keyboard key styling.
|   |   |   |   |   |-- [label.tsx](artifacts/smart-dev-debugger/src/components/ui/label.tsx)
|   |   |   |   |   |   - Type: TSX React component; Category: UI primitive; Purpose: Form label.
|   |   |   |   |   |-- [menubar.tsx](artifacts/smart-dev-debugger/src/components/ui/menubar.tsx)
|   |   |   |   |   |   - Type: TSX React component; Category: UI primitive; Purpose: Menubar navigation.
|   |   |   |   |   |-- [navigation-menu.tsx](artifacts/smart-dev-debugger/src/components/ui/navigation-menu.tsx)
|   |   |   |   |   |   - Type: TSX React component; Category: UI primitive; Purpose: Navigation menu.
|   |   |   |   |   |-- [pagination.tsx](artifacts/smart-dev-debugger/src/components/ui/pagination.tsx)
|   |   |   |   |   |   - Type: TSX React component; Category: UI primitive; Purpose: Pagination control.
|   |   |   |   |   |-- [popover.tsx](artifacts/smart-dev-debugger/src/components/ui/popover.tsx)
|   |   |   |   |   |   - Type: TSX React component; Category: UI primitive; Purpose: Popover UI.
|   |   |   |   |   |-- [progress.tsx](artifacts/smart-dev-debugger/src/components/ui/progress.tsx)
|   |   |   |   |   |   - Type: TSX React component; Category: UI primitive; Purpose: Progress bar.
|   |   |   |   |   |-- [radio-group.tsx](artifacts/smart-dev-debugger/src/components/ui/radio-group.tsx)
|   |   |   |   |   |   - Type: TSX React component; Category: UI primitive; Purpose: Radio group input.
|   |   |   |   |   |-- [resizable.tsx](artifacts/smart-dev-debugger/src/components/ui/resizable.tsx)
|   |   |   |   |   |   - Type: TSX React component; Category: UI primitive; Purpose: Resizable panels.
|   |   |   |   |   |-- [scroll-area.tsx](artifacts/smart-dev-debugger/src/components/ui/scroll-area.tsx)
|   |   |   |   |   |   - Type: TSX React component; Category: UI primitive; Purpose: Custom scroll area.
|   |   |   |   |   |-- [select.tsx](artifacts/smart-dev-debugger/src/components/ui/select.tsx)
|   |   |   |   |   |   - Type: TSX React component; Category: UI primitive; Purpose: Select dropdown.
|   |   |   |   |   |-- [separator.tsx](artifacts/smart-dev-debugger/src/components/ui/separator.tsx)
|   |   |   |   |   |   - Type: TSX React component; Category: UI primitive; Purpose: Separator line.
|   |   |   |   |   |-- [sheet.tsx](artifacts/smart-dev-debugger/src/components/ui/sheet.tsx)
|   |   |   |   |   |   - Type: TSX React component; Category: UI primitive; Purpose: Sheet modal.
|   |   |   |   |   |-- [sidebar.tsx](artifacts/smart-dev-debugger/src/components/ui/sidebar.tsx)
|   |   |   |   |   |   - Type: TSX React component; Category: UI primitive; Purpose: Sidebar layout.
|   |   |   |   |   |-- [skeleton.tsx](artifacts/smart-dev-debugger/src/components/ui/skeleton.tsx)
|   |   |   |   |   |   - Type: TSX React component; Category: UI primitive; Purpose: Loading skeleton.
|   |   |   |   |   |-- [slider.tsx](artifacts/smart-dev-debugger/src/components/ui/slider.tsx)
|   |   |   |   |   |   - Type: TSX React component; Category: UI primitive; Purpose: Slider input.
|   |   |   |   |   |-- [sonner.tsx](artifacts/smart-dev-debugger/src/components/ui/sonner.tsx)
|   |   |   |   |   |   - Type: TSX React component; Category: UI primitive; Purpose: Sonner toast wrapper.
|   |   |   |   |   |-- [spinner.tsx](artifacts/smart-dev-debugger/src/components/ui/spinner.tsx)
|   |   |   |   |   |   - Type: TSX React component; Category: UI primitive; Purpose: Loading spinner.
|   |   |   |   |   |-- [switch.tsx](artifacts/smart-dev-debugger/src/components/ui/switch.tsx)
|   |   |   |   |   |   - Type: TSX React component; Category: UI primitive; Purpose: Toggle switch.
|   |   |   |   |   |-- [table.tsx](artifacts/smart-dev-debugger/src/components/ui/table.tsx)
|   |   |   |   |   |   - Type: TSX React component; Category: UI primitive; Purpose: Table primitives.
|   |   |   |   |   |-- [tabs.tsx](artifacts/smart-dev-debugger/src/components/ui/tabs.tsx)
|   |   |   |   |   |   - Type: TSX React component; Category: UI primitive; Purpose: Tabs UI.
|   |   |   |   |   |-- [textarea.tsx](artifacts/smart-dev-debugger/src/components/ui/textarea.tsx)
|   |   |   |   |   |   - Type: TSX React component; Category: UI primitive; Purpose: Textarea input.
|   |   |   |   |   |-- [toast.tsx](artifacts/smart-dev-debugger/src/components/ui/toast.tsx)
|   |   |   |   |   |   - Type: TSX React component; Category: UI primitive; Purpose: Toast UI.
|   |   |   |   |   |-- [toaster.tsx](artifacts/smart-dev-debugger/src/components/ui/toaster.tsx)
|   |   |   |   |   |   - Type: TSX React component; Category: UI primitive; Purpose: Toast container.
|   |   |   |   |   |-- [toggle-group.tsx](artifacts/smart-dev-debugger/src/components/ui/toggle-group.tsx)
|   |   |   |   |   |   - Type: TSX React component; Category: UI primitive; Purpose: Toggle group control.
|   |   |   |   |   |-- [toggle.tsx](artifacts/smart-dev-debugger/src/components/ui/toggle.tsx)
|   |   |   |   |   |   - Type: TSX React component; Category: UI primitive; Purpose: Toggle button.
|   |   |   |   |   |-- [tooltip.tsx](artifacts/smart-dev-debugger/src/components/ui/tooltip.tsx)
|   |   |   |   |       - Type: TSX React component; Category: UI primitive; Purpose: Tooltip UI.
|   |   |   |-- contexts/
|   |   |   |   |-- [auth-context.tsx](artifacts/smart-dev-debugger/src/contexts/auth-context.tsx)
|   |   |   |   |   - Type: TSX context module; Category: State management; Purpose: Auth state and actions.
|   |   |   |   |-- [backend-context.tsx](artifacts/smart-dev-debugger/src/contexts/backend-context.tsx)
|   |   |   |       - Type: TSX context module; Category: State management; Purpose: Backend health/runtime state.
|   |   |   |-- hooks/
|   |   |   |   |-- [use-mobile.tsx](artifacts/smart-dev-debugger/src/hooks/use-mobile.tsx)
|   |   |   |   |   - Type: TSX hook; Category: UI utilities; Purpose: Screen size detection hook.
|   |   |   |   |-- [use-toast.ts](artifacts/smart-dev-debugger/src/hooks/use-toast.ts)
|   |   |   |       - Type: TypeScript module; Category: UI utilities; Purpose: Toast state management.
|   |   |   |-- lib/
|   |   |   |   |-- [api.ts](artifacts/smart-dev-debugger/src/lib/api.ts)
|   |   |   |   |   - Type: TypeScript module; Category: API client setup; Purpose: Configure backend failover and fetch.
|   |   |   |   |-- [sample-errors.ts](artifacts/smart-dev-debugger/src/lib/sample-errors.ts)
|   |   |   |   |   - Type: TypeScript module; Category: Sample data; Purpose: Sample error payloads for demo.
|   |   |   |   |-- [utils.ts](artifacts/smart-dev-debugger/src/lib/utils.ts)
|   |   |   |       - Type: TypeScript module; Category: UI utilities; Purpose: Tailwind class merge helper.
|   |   |   |-- pages/
|   |   |   |   |-- [backend.tsx](artifacts/smart-dev-debugger/src/pages/backend.tsx)
|   |   |   |   |   - Type: TSX page component; Category: Page; Purpose: Backend health/status screen.
|   |   |   |   |-- [history.tsx](artifacts/smart-dev-debugger/src/pages/history.tsx)
|   |   |   |   |   - Type: TSX page component; Category: Page; Purpose: Debug session history list.
|   |   |   |   |-- [home.tsx](artifacts/smart-dev-debugger/src/pages/home.tsx)
|   |   |   |   |   - Type: TSX page component; Category: Page; Purpose: Core debugger UI and results panel.
|   |   |   |   |-- [landing.tsx](artifacts/smart-dev-debugger/src/pages/landing.tsx)
|   |   |   |   |   - Type: TSX page component; Category: Page; Purpose: Marketing landing page.
|   |   |   |   |-- [login.tsx](artifacts/smart-dev-debugger/src/pages/login.tsx)
|   |   |   |   |   - Type: TSX page component; Category: Page; Purpose: Email and Google sign-in.
|   |   |   |   |-- [not-found.tsx](artifacts/smart-dev-debugger/src/pages/not-found.tsx)
|   |   |   |   |   - Type: TSX page component; Category: Page; Purpose: 404 error page.
|   |   |   |   |-- [register.tsx](artifacts/smart-dev-debugger/src/pages/register.tsx)
|   |   |   |       - Type: TSX page component; Category: Page; Purpose: Email and Google registration.
|-- lib/
|   |-- api-client-react/
|   |   |-- [package.json](lib/api-client-react/package.json)
|   |   |   - Type: JSON config file; Category: Library package config; Purpose: Generated React client package metadata.
|   |   |-- [tsconfig.json](lib/api-client-react/tsconfig.json)
|   |   |   - Type: JSON config file; Category: TypeScript config; Purpose: Build settings for client package.
|   |   |-- src/
|   |   |   |-- [index.ts](lib/api-client-react/src/index.ts)
|   |   |   |   - Type: TypeScript module; Category: Public API; Purpose: Re-export client and helper types.
|   |   |   |-- [custom-fetch.ts](lib/api-client-react/src/custom-fetch.ts)
|   |   |   |   - Type: TypeScript module; Category: HTTP client; Purpose: Custom fetch wrapper with failover.
|   |   |   |-- generated/
|   |   |   |   |-- [api.ts](lib/api-client-react/src/generated/api.ts)
|   |   |   |   |   - Type: Generated TS module; Category: API client; Purpose: React Query hooks and endpoints.
|   |   |   |   |-- [api.schemas.ts](lib/api-client-react/src/generated/api.schemas.ts)
|   |   |   |       - Type: Generated TS module; Category: API schemas; Purpose: Types and schema helpers.
|   |-- api-spec/
|   |   |-- [package.json](lib/api-spec/package.json)
|   |   |   - Type: JSON config file; Category: Tooling package config; Purpose: API spec codegen scripts.
|   |   |-- [orval.config.ts](lib/api-spec/orval.config.ts)
|   |   |   - Type: TypeScript config; Category: Code generation; Purpose: Orval config for client/schema generation.
|   |   |-- [openapi.yaml](lib/api-spec/openapi.yaml)
|   |       - Type: YAML spec file; Category: API contract; Purpose: OpenAPI 3.1 definition for backend API.
|   |-- api-zod/
|   |   |-- [package.json](lib/api-zod/package.json)
|   |   |   - Type: JSON config file; Category: Library package config; Purpose: Generated Zod schemas metadata.
|   |   |-- [tsconfig.json](lib/api-zod/tsconfig.json)
|   |   |   - Type: JSON config file; Category: TypeScript config; Purpose: Build settings for Zod package.
|   |   |-- src/
|   |   |   |-- [index.ts](lib/api-zod/src/index.ts)
|   |   |   |   - Type: TypeScript module; Category: Public API; Purpose: Re-export generated schemas.
|   |   |   |-- generated/
|   |   |   |   |-- [api.ts](lib/api-zod/src/generated/api.ts)
|   |   |   |   |   - Type: Generated TS module; Category: API schemas; Purpose: Zod schemas for API.
|   |   |   |   |-- types/
|   |   |   |   |   |-- [analyzeRequest.ts](lib/api-zod/src/generated/types/analyzeRequest.ts)
|   |   |   |   |   |   - Type: Generated TS type; Category: Schema types; Purpose: Analyze request schema.
|   |   |   |   |   |-- [analyzeRequestLanguage.ts](lib/api-zod/src/generated/types/analyzeRequestLanguage.ts)
|   |   |   |   |   |   - Type: Generated TS type; Category: Schema types; Purpose: Language enum.
|   |   |   |   |   |-- [analyzeRequestMode.ts](lib/api-zod/src/generated/types/analyzeRequestMode.ts)
|   |   |   |   |   |   - Type: Generated TS type; Category: Schema types; Purpose: Mode enum.
|   |   |   |   |   |-- [apiError.ts](lib/api-zod/src/generated/types/apiError.ts)
|   |   |   |   |   |   - Type: Generated TS type; Category: Schema types; Purpose: API error shape.
|   |   |   |   |   |-- [apiErrorError.ts](lib/api-zod/src/generated/types/apiErrorError.ts)
|   |   |   |   |   |   - Type: Generated TS type; Category: Schema types; Purpose: API error payload.
|   |   |   |   |   |-- [clearHistory200.ts](lib/api-zod/src/generated/types/clearHistory200.ts)
|   |   |   |   |   |   - Type: Generated TS type; Category: Schema types; Purpose: Clear history response.
|   |   |   |   |   |-- [debugSession.ts](lib/api-zod/src/generated/types/debugSession.ts)
|   |   |   |   |   |   - Type: Generated TS type; Category: Schema types; Purpose: Debug session schema.
|   |   |   |   |   |-- [debugSessionSeverity.ts](lib/api-zod/src/generated/types/debugSessionSeverity.ts)
|   |   |   |   |   |   - Type: Generated TS type; Category: Schema types; Purpose: Severity enum.
|   |   |   |   |   |-- [healthStatus.ts](lib/api-zod/src/generated/types/healthStatus.ts)
|   |   |   |   |   |   - Type: Generated TS type; Category: Schema types; Purpose: Health response schema.
|   |   |   |   |   |-- [historyResponse.ts](lib/api-zod/src/generated/types/historyResponse.ts)
|   |   |   |   |   |   - Type: Generated TS type; Category: Schema types; Purpose: History list response.
|   |   |   |   |   |-- [index.ts](lib/api-zod/src/generated/types/index.ts)
|   |   |   |   |   |   - Type: Generated TS module; Category: Schema types; Purpose: Types barrel export.
|   |   |   |   |   |-- [languageStat.ts](lib/api-zod/src/generated/types/languageStat.ts)
|   |   |   |   |   |   - Type: Generated TS type; Category: Schema types; Purpose: Language stats schema.
|   |   |   |   |   |-- [listHistoryParams.ts](lib/api-zod/src/generated/types/listHistoryParams.ts)
|   |   |   |   |   |   - Type: Generated TS type; Category: Schema types; Purpose: History query params.
|   |   |   |   |   |-- [loginRequest.ts](lib/api-zod/src/generated/types/loginRequest.ts)
|   |   |   |   |   |   - Type: Generated TS type; Category: Schema types; Purpose: Login request schema.
|   |   |   |   |   |-- [logoutUser200.ts](lib/api-zod/src/generated/types/logoutUser200.ts)
|   |   |   |   |   |   - Type: Generated TS type; Category: Schema types; Purpose: Logout response schema.
|   |   |   |   |   |-- [publicUser.ts](lib/api-zod/src/generated/types/publicUser.ts)
|   |   |   |   |   |   - Type: Generated TS type; Category: Schema types; Purpose: Public user schema.
|   |   |   |   |   |-- [publicUserAuthMethod.ts](lib/api-zod/src/generated/types/publicUserAuthMethod.ts)
|   |   |   |   |   |   - Type: Generated TS type; Category: Schema types; Purpose: Auth method enum.
|   |   |   |   |   |-- [registerRequest.ts](lib/api-zod/src/generated/types/registerRequest.ts)
|   |   |   |   |   |   - Type: Generated TS type; Category: Schema types; Purpose: Register request schema.
|   |   |   |   |   |-- [severityStat.ts](lib/api-zod/src/generated/types/severityStat.ts)
|   |   |   |   |   |   - Type: Generated TS type; Category: Schema types; Purpose: Severity stats schema.
|   |   |   |   |   |-- [statsResponse.ts](lib/api-zod/src/generated/types/statsResponse.ts)
|   |   |   |   |       - Type: Generated TS type; Category: Schema types; Purpose: Stats response schema.
|   |-- db/
|   |   |-- [package.json](lib/db/package.json)
|   |   |   - Type: JSON config file; Category: Library package config; Purpose: DB package metadata and scripts.
|   |   |-- [tsconfig.json](lib/db/tsconfig.json)
|   |   |   - Type: JSON config file; Category: TypeScript config; Purpose: Build settings for DB package.
|   |   |-- [drizzle.config.ts](lib/db/drizzle.config.ts)
|   |   |   - Type: TypeScript config; Category: DB tooling; Purpose: Drizzle config for ESM tooling.
|   |   |-- [drizzle.config.cjs](lib/db/drizzle.config.cjs)
|   |   |   - Type: CommonJS config; Category: DB tooling; Purpose: Drizzle config for CLI usage.
|   |   |-- src/
|   |   |   |-- [index.ts](lib/db/src/index.ts)
|   |   |   |   - Type: TypeScript module; Category: DB client; Purpose: PG pool and Drizzle setup.
|   |   |   |-- schema/
|   |   |   |   |-- [index.ts](lib/db/src/schema/index.ts)
|   |   |   |   |   - Type: TypeScript module; Category: Schema barrel; Purpose: Re-export schema tables.
|   |   |   |   |-- [users.ts](lib/db/src/schema/users.ts)
|   |   |   |   |   - Type: TypeScript module; Category: DB schema; Purpose: Users table and auth schemas.
|   |   |   |   |-- [debug-sessions.ts](lib/db/src/schema/debug-sessions.ts)
|   |   |   |   |   - Type: TypeScript module; Category: DB schema; Purpose: Debug sessions table and validation.
|   |   |   |   |-- [conversations.ts](lib/db/src/schema/conversations.ts)
|   |   |   |   |   - Type: TypeScript module; Category: DB schema; Purpose: Conversations table for chat history.
|   |   |   |   |-- [messages.ts](lib/db/src/schema/messages.ts)
|   |   |   |       - Type: TypeScript module; Category: DB schema; Purpose: Messages table for conversations.
|   |-- integrations/
|   |   |-- openai_ai_integrations/
|   |   |   |-- src/
|   |   |   |   |-- server/
|   |   |   |   |   |-- audio/
|   |   |   |   |   |   |-- [index.ts](lib/integrations/openai_ai_integrations/src/server/audio/index.ts)
|   |   |   |   |   |   |   - Type: TypeScript module; Category: Server integration; Purpose: Audio integration exports.
|   |   |   |   |   |   |-- [client.ts](lib/integrations/openai_ai_integrations/src/server/audio/client.ts)
|   |   |   |   |   |   |   - Type: TypeScript module; Category: Server integration; Purpose: Audio processing via OpenAI.
|   |   |   |   |   |-- image/
|   |   |   |   |   |   |-- [index.ts](lib/integrations/openai_ai_integrations/src/server/image/index.ts)
|   |   |   |   |   |   |   - Type: TypeScript module; Category: Server integration; Purpose: Image integration exports.
|   |   |   |   |   |   |-- [client.ts](lib/integrations/openai_ai_integrations/src/server/image/client.ts)
|   |   |   |   |   |   |   - Type: TypeScript module; Category: Server integration; Purpose: Image generation/edit via OpenAI.
|   |   |   |   |   |-- batch/
|   |   |   |   |   |   |-- [index.ts](lib/integrations/openai_ai_integrations/src/server/batch/index.ts)
|   |   |   |   |   |   |   - Type: TypeScript module; Category: Server integration; Purpose: Batch API exports.
|   |   |   |   |   |   |-- [utils.ts](lib/integrations/openai_ai_integrations/src/server/batch/utils.ts)
|   |   |   |   |   |       - Type: TypeScript module; Category: Server integration; Purpose: Batch processing helpers.
|   |   |   |   |-- client/
|   |   |   |       |-- audio/
|   |   |   |           |-- [index.ts](lib/integrations/openai_ai_integrations/src/client/audio/index.ts)
|   |   |   |           |   - Type: TypeScript module; Category: Client integration; Purpose: React audio helper exports.
|   |   |   |           |-- [audio-utils.ts](lib/integrations/openai_ai_integrations/src/client/audio/audio-utils.ts)
|   |   |   |           |   - Type: TypeScript module; Category: Client integration; Purpose: PCM decode and AudioContext setup.
|   |   |   |           |-- [useAudioPlayback.ts](lib/integrations/openai_ai_integrations/src/client/audio/useAudioPlayback.ts)
|   |   |   |           |   - Type: TSX hook; Category: Client integration; Purpose: Streamed audio playback hook.
|   |   |   |           |-- [useVoiceRecorder.ts](lib/integrations/openai_ai_integrations/src/client/audio/useVoiceRecorder.ts)
|   |   |   |           |   - Type: TSX hook; Category: Client integration; Purpose: Voice recording hook.
|   |   |   |           |-- [audio-playback-worklet.js](lib/integrations/openai_ai_integrations/src/client/audio/audio-playback-worklet.js)
|   |   |   |               - Type: JavaScript worklet; Category: Client integration; Purpose: Audio playback worklet.
|   |-- integrations-openai-ai-react/
|   |   |-- [package.json](lib/integrations-openai-ai-react/package.json)
|   |   |   - Type: JSON config file; Category: Library package config; Purpose: React audio integration package.
|   |   |-- [tsconfig.json](lib/integrations-openai-ai-react/tsconfig.json)
|   |   |   - Type: JSON config file; Category: TypeScript config; Purpose: Build settings for integration package.
|   |   |-- src/
|   |   |   |-- [index.ts](lib/integrations-openai-ai-react/src/index.ts)
|   |   |   |   - Type: TypeScript module; Category: Public API; Purpose: Re-export audio hooks and helpers.
|   |   |   |-- audio/
|   |   |   |   |-- [index.ts](lib/integrations-openai-ai-react/src/audio/index.ts)
|   |   |   |   |   - Type: TypeScript module; Category: Public API; Purpose: Audio module exports and docs.
|   |   |   |   |-- [audio-utils.ts](lib/integrations-openai-ai-react/src/audio/audio-utils.ts)
|   |   |   |   |   - Type: TypeScript module; Category: Audio utilities; Purpose: PCM decode and AudioContext setup.
|   |   |   |   |-- [useAudioPlayback.ts](lib/integrations-openai-ai-react/src/audio/useAudioPlayback.ts)
|   |   |   |   |   - Type: TSX hook; Category: Audio hooks; Purpose: Audio playback hook with sequencing.
|   |   |   |   |-- [useVoiceRecorder.ts](lib/integrations-openai-ai-react/src/audio/useVoiceRecorder.ts)
|   |   |   |   |   - Type: TSX hook; Category: Audio hooks; Purpose: Browser voice recording hook.
|   |   |   |   |-- [useVoiceStream.ts](lib/integrations-openai-ai-react/src/audio/useVoiceStream.ts)
|   |   |   |   |   - Type: TSX hook; Category: Audio hooks; Purpose: SSE voice streaming hook.
|   |   |   |   |-- [audio-playback-worklet.js](lib/integrations-openai-ai-react/src/audio/audio-playback-worklet.js)
|   |   |   |       - Type: JavaScript worklet; Category: Audio runtime; Purpose: Audio playback worklet for web audio.
|   |-- integrations-openai-ai-server/
|   |   |-- [package.json](lib/integrations-openai-ai-server/package.json)
|   |   |   - Type: JSON config file; Category: Library package config; Purpose: Server-side OpenAI integration package.
|   |   |-- [tsconfig.json](lib/integrations-openai-ai-server/tsconfig.json)
|   |   |   - Type: JSON config file; Category: TypeScript config; Purpose: Build settings for integration package.
|   |   |-- src/
|   |   |   |-- [index.ts](lib/integrations-openai-ai-server/src/index.ts)
|   |   |   |   - Type: TypeScript module; Category: Public API; Purpose: Re-export OpenAI helpers.
|   |   |   |-- [client.ts](lib/integrations-openai-ai-server/src/client.ts)
|   |   |   |   - Type: TypeScript module; Category: OpenAI client; Purpose: Create OpenAI client from env vars.
|   |   |   |-- audio/
|   |   |   |   |-- [index.ts](lib/integrations-openai-ai-server/src/audio/index.ts)
|   |   |   |   |   - Type: TypeScript module; Category: Audio integration; Purpose: Re-export audio helpers.
|   |   |   |   |-- [client.ts](lib/integrations-openai-ai-server/src/audio/client.ts)
|   |   |   |   |   - Type: TypeScript module; Category: Audio integration; Purpose: Audio processing via OpenAI.
|   |   |   |-- image/
|   |   |   |   |-- [index.ts](lib/integrations-openai-ai-server/src/image/index.ts)
|   |   |   |   |   - Type: TypeScript module; Category: Image integration; Purpose: Re-export image helpers.
|   |   |   |   |-- [client.ts](lib/integrations-openai-ai-server/src/image/client.ts)
|   |   |   |   |   - Type: TypeScript module; Category: Image integration; Purpose: Image generation/edit via OpenAI.
|   |   |   |-- batch/
|   |   |   |   |-- [index.ts](lib/integrations-openai-ai-server/src/batch/index.ts)
|   |   |   |   |   - Type: TypeScript module; Category: Batch processing; Purpose: Batch utilities exports.
|   |   |   |   |-- [utils.ts](lib/integrations-openai-ai-server/src/batch/utils.ts)
|   |   |   |       - Type: TypeScript module; Category: Batch processing; Purpose: Rate-limited batch helper.
|-- scripts/
|   |-- [package.json](scripts/package.json)
|   |   - Type: JSON config file; Category: Utility package config; Purpose: Script package metadata.
|   |-- [tsconfig.json](scripts/tsconfig.json)
|   |   - Type: JSON config file; Category: TypeScript config; Purpose: TS settings for scripts.
|   |-- [post-merge.sh](scripts/post-merge.sh)
|   |   - Type: Shell script; Category: Dev tooling; Purpose: Run pnpm install and DB push after merges.
|   |-- src/
|       |-- [hello.ts](scripts/src/hello.ts)
|           - Type: TypeScript module; Category: Example script; Purpose: Simple hello output.

## 3) Detailed File Analysis (important files)

### [package.json](package.json)
- File type: JSON config file.
- Purpose: Root workspace scripts and tooling dependencies for monorepo builds.
- Internal content: `scripts` for typecheck/build and a `preinstall` guard enforcing pnpm. `devDependencies` include TypeScript and formatting/build helpers.
- Dependencies: Consumed by pnpm and workspace packages; referenced by [Dockerfile](Dockerfile) during build.

### [pnpm-workspace.yaml](pnpm-workspace.yaml)
- File type: YAML config file.
- Purpose: Defines workspace package globs and security policies (minimum release age).
- Internal content: `packages` list, `catalog` dependency aliases, and `minimumReleaseAge` enforcement.
- Dependencies: Used by pnpm tooling and installs; referenced implicitly by all workspace packages.

### [tsconfig.base.json](tsconfig.base.json)
- File type: JSON config file.
- Purpose: Shared TS compiler settings for consistency.
- Internal content: `compilerOptions` for module resolution, strictness, and target.
- Dependencies: Extended by [tsconfig.json](tsconfig.json) and package-level tsconfig files.

### [tsconfig.json](tsconfig.json)
- File type: JSON config file.
- Purpose: TypeScript solution references for the monorepo.
- Internal content: `references` to shared packages in lib/.
- Dependencies: Used by `tsc --build` and workspace typecheck script.

### [Dockerfile](Dockerfile)
- File type: Docker build file.
- Purpose: Build and package the API server into a production image.
- Internal content: Multi-stage build (deps, build, runtime). Copies workspace packages, runs `pnpm --filter @workspace/api-server build`, and sets runtime CMD.
- Dependencies: Reads [pnpm-lock.yaml](pnpm-lock.yaml), [pnpm-workspace.yaml](pnpm-workspace.yaml), [package.json](package.json), and [artifacts/api-server/package.json](artifacts/api-server/package.json).

### [docker-compose.yml](docker-compose.yml)
- File type: YAML config file.
- Purpose: Compose service for the API server with env injection.
- Internal content: Single `api` service, port mapping, env file loading, and health check.
- Dependencies: Builds using [Dockerfile](Dockerfile) and uses [.env.example](.env.example) schema for local config.

### [README.md](README.md)
- File type: Markdown doc.
- Purpose: Setup, feature overview, and run instructions.
- Internal content: Instructions for pnpm, backend/frontend startup, and API highlights.
- Dependencies: Human documentation only; aligns with scripts in [package.json](package.json).

### [artifacts/api-server/src/index.ts](artifacts/api-server/src/index.ts)
- File type: TypeScript entry file.
- Purpose: Bootstraps the HTTP server and starts primary services.
- Internal content: Creates HTTP server from [artifacts/api-server/src/app.ts](artifacts/api-server/src/app.ts), validates port, logs startup, initializes websockets, and registers shutdown handlers.
- Dependencies: Imports [artifacts/api-server/src/app.ts](artifacts/api-server/src/app.ts), [artifacts/api-server/src/config/env.ts](artifacts/api-server/src/config/env.ts), [artifacts/api-server/src/config/platform.ts](artifacts/api-server/src/config/platform.ts), and runtime services. Built by [artifacts/api-server/build.mjs](artifacts/api-server/build.mjs).

### [artifacts/api-server/src/app.ts](artifacts/api-server/src/app.ts)
- File type: TypeScript module.
- Purpose: Express app wiring and global middleware.
- Internal content: Configures CORS, Helmet, compression, cookie parsing, JSON parsing, request sanitizer, rate limiter, routes, and error handlers. Adds health/version routes.
- Dependencies: Imports route aggregator [artifacts/api-server/src/routes/index.ts](artifacts/api-server/src/routes/index.ts) and middleware modules.

### [artifacts/api-server/src/config/env.ts](artifacts/api-server/src/config/env.ts)
- File type: TypeScript module.
- Purpose: Validate and load environment variables with Zod.
- Internal content: `envSchema` with defaults and coercion; exits on invalid env.
- Dependencies: Imported by most backend modules including [artifacts/api-server/src/app.ts](artifacts/api-server/src/app.ts) and [artifacts/api-server/src/utils/logger.ts](artifacts/api-server/src/utils/logger.ts).

### [artifacts/api-server/src/routes/auth.ts](artifacts/api-server/src/routes/auth.ts)
- File type: TypeScript module.
- Purpose: Authentication endpoints for register, login, logout, current user, and Google OAuth.
- Internal content: Validates request bodies with DB schemas, hashes passwords, sets JWT cookies, and handles OAuth flow via Google endpoints.
- Dependencies: Imports [lib/db/src/index.ts](lib/db/src/index.ts) schema exports and [artifacts/api-server/src/services/auth.ts](artifacts/api-server/src/services/auth.ts). Registered by [artifacts/api-server/src/routes/index.ts](artifacts/api-server/src/routes/index.ts).

### [artifacts/api-server/src/routes/debug.ts](artifacts/api-server/src/routes/debug.ts)
- File type: TypeScript module.
- Purpose: Main AI analysis endpoint and stats endpoint.
- Internal content: Validates input, checks credits, enforces rate limits, calls `analyzeCode`, caches results, stores in DB, and returns session data. Also aggregates stats.
- Dependencies: Imports [artifacts/api-server/src/lib/ai-engine.ts](artifacts/api-server/src/lib/ai-engine.ts), [artifacts/api-server/src/lib/cache.ts](artifacts/api-server/src/lib/cache.ts), [artifacts/api-server/src/lib/rate-limiter.ts](artifacts/api-server/src/lib/rate-limiter.ts), and DB tables from [lib/db/src/index.ts](lib/db/src/index.ts).

### [artifacts/api-server/src/routes/history.ts](artifacts/api-server/src/routes/history.ts)
- File type: TypeScript module.
- Purpose: List, read, and delete debug sessions.
- Internal content: Pagination, optional language filter, and delete endpoints; transforms DB rows to API response shape.
- Dependencies: Uses [lib/db/src/index.ts](lib/db/src/index.ts) and [artifacts/api-server/src/middleware/auth.ts](artifacts/api-server/src/middleware/auth.ts).

### [artifacts/api-server/src/middleware/auth.ts](artifacts/api-server/src/middleware/auth.ts)
- File type: TypeScript module.
- Purpose: Enforce authenticated sessions on protected routes.
- Internal content: Reads cookie, verifies JWT, looks up user in DB, attaches `req.user`.
- Dependencies: Imports [artifacts/api-server/src/services/auth.ts](artifacts/api-server/src/services/auth.ts) and [lib/db/src/index.ts](lib/db/src/index.ts).

### [artifacts/api-server/src/lib/ai-engine.ts](artifacts/api-server/src/lib/ai-engine.ts)
- File type: TypeScript module.
- Purpose: AI prompt construction and response parsing.
- Internal content: System prompt templates, JSON extraction, validation, retry logic across candidate models, and token usage tracking.
- Dependencies: Uses [lib/integrations-openai-ai-server/src/index.ts](lib/integrations-openai-ai-server/src/index.ts) to call OpenAI-compatible API.

### [artifacts/api-server/src/services/auth.ts](artifacts/api-server/src/services/auth.ts)
- File type: TypeScript module.
- Purpose: Password hashing, JWT signing/verifying, and cookie options.
- Internal content: `hashPassword`, `verifyPassword`, `signToken`, `verifyToken`, `getCookieOptions`.
- Dependencies: Used by [artifacts/api-server/src/routes/auth.ts](artifacts/api-server/src/routes/auth.ts) and [artifacts/api-server/src/middleware/auth.ts](artifacts/api-server/src/middleware/auth.ts).

### [artifacts/smart-dev-debugger/src/main.tsx](artifacts/smart-dev-debugger/src/main.tsx)
- File type: TSX entry file.
- Purpose: Client bootstrap and API initialization.
- Internal content: Calls `initializeApiLayer` then mounts React root with `App`.
- Dependencies: Imports [artifacts/smart-dev-debugger/src/App.tsx](artifacts/smart-dev-debugger/src/App.tsx) and [artifacts/smart-dev-debugger/src/lib/api.ts](artifacts/smart-dev-debugger/src/lib/api.ts).

### [artifacts/smart-dev-debugger/src/App.tsx](artifacts/smart-dev-debugger/src/App.tsx)
- File type: TSX React component.
- Purpose: App-wide providers and routing.
- Internal content: Sets up React Query, theme provider, auth/backend contexts, and Wouter routes with route guards.
- Dependencies: Imports layout and page components and wraps [artifacts/smart-dev-debugger/src/components/protected-route.tsx](artifacts/smart-dev-debugger/src/components/protected-route.tsx).

### [artifacts/smart-dev-debugger/src/lib/api.ts](artifacts/smart-dev-debugger/src/lib/api.ts)
- File type: TypeScript module.
- Purpose: Frontend API runtime and failover configuration.
- Internal content: Reads Vite env vars for primary/backup backends, configures runtime, exports `apiFetch` and backend helpers.
- Dependencies: Uses `customFetch` from [lib/api-client-react/src/custom-fetch.ts](lib/api-client-react/src/custom-fetch.ts).

### [artifacts/smart-dev-debugger/src/contexts/auth-context.tsx](artifacts/smart-dev-debugger/src/contexts/auth-context.tsx)
- File type: TSX context module.
- Purpose: Auth state and actions for login/register/logout.
- Internal content: `AuthProvider`, `useAuth`, user normalization, and React Query invalidation.
- Dependencies: Uses generated API client from [lib/api-client-react/src/index.ts](lib/api-client-react/src/index.ts).

### [artifacts/smart-dev-debugger/src/pages/home.tsx](artifacts/smart-dev-debugger/src/pages/home.tsx)
- File type: TSX page component.
- Purpose: Primary debug workflow UI.
- Internal content: Code/error input, language/mode selection, `useAnalyzeCode` mutation, history sidebar, result rendering, and caching logic.
- Dependencies: Uses generated hooks from [lib/api-client-react/src/generated/api.ts](lib/api-client-react/src/generated/api.ts) and UI primitives.

### [lib/api-spec/openapi.yaml](lib/api-spec/openapi.yaml)
- File type: YAML spec file.
- Purpose: Source of truth for API contract.
- Internal content: Routes for auth, analyze, history, and stats; schemas for requests and responses.
- Dependencies: Feeds orval generation in [lib/api-spec/orval.config.ts](lib/api-spec/orval.config.ts).

### [lib/api-client-react/src/custom-fetch.ts](lib/api-client-react/src/custom-fetch.ts)
- File type: TypeScript module.
- Purpose: Custom fetch with retries, backend failover, and error handling.
- Internal content: Runtime state, backend health probing, JSON parsing, `ApiError`, and request timeout logic.
- Dependencies: Used by generated API client in [lib/api-client-react/src/generated/api.ts](lib/api-client-react/src/generated/api.ts) and frontend config in [artifacts/smart-dev-debugger/src/lib/api.ts](artifacts/smart-dev-debugger/src/lib/api.ts).

### [lib/db/src/index.ts](lib/db/src/index.ts)
- File type: TypeScript module.
- Purpose: DB pool and Drizzle ORM initialization.
- Internal content: Global pool caching, environment validation, `closeDatabaseConnections` helper.
- Dependencies: Imported by backend routes and services; uses schema barrel [lib/db/src/schema/index.ts](lib/db/src/schema/index.ts).

### [lib/db/src/schema/users.ts](lib/db/src/schema/users.ts)
- File type: TypeScript module.
- Purpose: Users table and auth input schemas.
- Internal content: Drizzle table definition, Zod schemas for register/login, `toPublicUser` transformer.
- Dependencies: Used by [artifacts/api-server/src/routes/auth.ts](artifacts/api-server/src/routes/auth.ts).

### [lib/db/src/schema/debug-sessions.ts](lib/db/src/schema/debug-sessions.ts)
- File type: TypeScript module.
- Purpose: Debug sessions table and analyze request schema.
- Internal content: Enums for severity/language/mode, table definition, Zod `AnalyzeRequestSchema`.
- Dependencies: Used by [artifacts/api-server/src/routes/debug.ts](artifacts/api-server/src/routes/debug.ts) and [artifacts/api-server/src/routes/history.ts](artifacts/api-server/src/routes/history.ts).

## 4) Architecture and Flow

1. Entry points
	- Backend entry: [artifacts/api-server/src/index.ts](artifacts/api-server/src/index.ts).
	- Frontend entry: [artifacts/smart-dev-debugger/src/main.tsx](artifacts/smart-dev-debugger/src/main.tsx).
	- UI sandbox entry: [artifacts/mockup-sandbox/src/main.tsx](artifacts/mockup-sandbox/src/main.tsx).

2. Backend flow
	- HTTP server starts in [artifacts/api-server/src/index.ts](artifacts/api-server/src/index.ts) and mounts Express app from [artifacts/api-server/src/app.ts](artifacts/api-server/src/app.ts).
	- Middleware stack: CORS, security headers, compression, cookie parsing, JSON parsing, request sanitization, rate limiting, then routes.
	- Routes are aggregated in [artifacts/api-server/src/routes/index.ts](artifacts/api-server/src/routes/index.ts).
	- Auth routes use DB schemas from [lib/db/src/schema/users.ts](lib/db/src/schema/users.ts) and JWT helpers from [artifacts/api-server/src/services/auth.ts](artifacts/api-server/src/services/auth.ts).
	- Debug route uses [artifacts/api-server/src/lib/ai-engine.ts](artifacts/api-server/src/lib/ai-engine.ts), cache, rate limiter, and persists to DB.

3. Frontend flow
	- [artifacts/smart-dev-debugger/src/main.tsx](artifacts/smart-dev-debugger/src/main.tsx) initializes API runtime and renders App.
	- [artifacts/smart-dev-debugger/src/App.tsx](artifacts/smart-dev-debugger/src/App.tsx) wires providers and routing.
	- Auth state is maintained in [artifacts/smart-dev-debugger/src/contexts/auth-context.tsx](artifacts/smart-dev-debugger/src/contexts/auth-context.tsx).
	- API calls use generated React Query hooks from [lib/api-client-react/src/generated/api.ts](lib/api-client-react/src/generated/api.ts).
	- Backend failover and health status is handled via [artifacts/smart-dev-debugger/src/lib/api.ts](artifacts/smart-dev-debugger/src/lib/api.ts) and the backend context.

4. Data flow
	- User submits code + error -> frontend triggers `useAnalyzeCode` -> request to `/api/v1/analyze`.
	- Backend validates, checks credits, rate limits, calls AI, caches, stores in DB, returns report.
	- Frontend renders report, updates history, and displays remaining credits.

5. Architecture patterns
	- Monorepo with shared libs for API contract and DB schema.
	- Generated API clients to keep backend and frontend aligned.
	- Layered backend: routes -> services/lib -> DB + integrations.
	- SPA frontend with client-side routing and React Query for server state.

## 5) Important Files Index

- Backend entry: [artifacts/api-server/src/index.ts](artifacts/api-server/src/index.ts)
- Backend app setup: [artifacts/api-server/src/app.ts](artifacts/api-server/src/app.ts)
- AI analysis engine: [artifacts/api-server/src/lib/ai-engine.ts](artifacts/api-server/src/lib/ai-engine.ts)
- Auth and JWT: [artifacts/api-server/src/services/auth.ts](artifacts/api-server/src/services/auth.ts)
- DB setup and schema: [lib/db/src/index.ts](lib/db/src/index.ts), [lib/db/src/schema/users.ts](lib/db/src/schema/users.ts), [lib/db/src/schema/debug-sessions.ts](lib/db/src/schema/debug-sessions.ts)
- API contract: [lib/api-spec/openapi.yaml](lib/api-spec/openapi.yaml)
- Generated API client: [lib/api-client-react/src/generated/api.ts](lib/api-client-react/src/generated/api.ts)
- Frontend entry: [artifacts/smart-dev-debugger/src/main.tsx](artifacts/smart-dev-debugger/src/main.tsx)
- Frontend root: [artifacts/smart-dev-debugger/src/App.tsx](artifacts/smart-dev-debugger/src/App.tsx)
- Frontend API runtime: [artifacts/smart-dev-debugger/src/lib/api.ts](artifacts/smart-dev-debugger/src/lib/api.ts)
- Main UI page: [artifacts/smart-dev-debugger/src/pages/home.tsx](artifacts/smart-dev-debugger/src/pages/home.tsx)
