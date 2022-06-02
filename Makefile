.PHONY: test build

test:
	npm run test

format:
	npm run format

lint:
	npm run lint

build: format lint
	npm run build

publish: build
	cp package*.json build/
	cp *.md build/
	npm publish ./build
