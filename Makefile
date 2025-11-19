wxt = bunx wxt
biome = bunx biome
eslint = bunx eslint
typecheck = bunx tsc --noEmit

deps: PHONY
ifeq ($(CI), true)
	bun install --frozen-lockfile
else
	bun install
endif

lint: deps PHONY
	$(biome) check .
	$(eslint) .

lint.fix: deps PHONY
	$(biome) check --fix .
	$(eslint) --fix .

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
