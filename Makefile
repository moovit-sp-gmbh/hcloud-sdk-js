.PHONY: test build

prepare:
	curl -f -s -L --header "Authorization: token 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" --header "Accept: application/vnd.github.v3.raw" https://raw.githubusercontent.com/moovit-sp-gmbh/msp-repo-tools/main/githooks/install-githooks.sh | sh -s prettier
	git config core.hooksPath .githooks
	pnpm i

doc:
	pnpm doc:dev

test:
	pnpm test

test+integration:
	pnpm test:integration

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
