wxt = bunx wxt
oxlint = bunx oxlint
oxfmt = bunx oxfmt
typecheck = bunx tsc --noEmit

deps: PHONY
ifeq ($(CI), true)
	bun install --frozen-lockfile
else
	bun install
endif

lint: deps PHONY
	$(oxfmt) --check
	$(oxlint) --type-aware

lint.fix: deps PHONY
	$(oxfmt)
	$(oxlint) --fix --type-aware

dev: deps PHONY
	$(wxt)

build: deps PHONY
	$(wxt) build

zip: deps PHONY
	$(wxt) zip

typecheck: deps PHONY
	$(typecheck)

typecheck.watch: deps PHONY
	$(typecheck) --watch

PHONY:
