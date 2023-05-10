.PHONY: test build

prepare:
	git config core.hooksPath .hooks
	pnpm i

doc:
	pnpm doc:dev

test:
	pnpm test

format:
	pnpm format

lint:
	pnpm lint

debug_build: 
	rm -rf build/
	pnpm build

build: format lint
	rm -rf build/
	pnpm build

publish: build
	cp package*.json build/
	cp *.md build/
	cp LICENSE build/
	pnpm publish ./build --no-git-checks

scan:
	docker pull opensecurity/njsscan
	docker run -v  $(shell pwd)/src/:/src opensecurity/njsscan /src