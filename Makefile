.PHONY: test build

prepare:
	pnpm i

doc:
	pnpm doc:dev

test:
	pnpm run test

format:
	pnpm run format

lint:
	pnpm run lint

build: format lint
	pnpm run build

publish: build
	cp package*.json build/
	cp *.md build/
	pnpm publish ./build
