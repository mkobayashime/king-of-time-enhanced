wxt = bunx wxt
biome = bunx biome
typecheck = bunx tsc --noEmit

deps: PHONY
	bun install

lint: deps PHONY
	$(biome) check .

lint.fix: deps PHONY
	$(biome) check --fix .

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
