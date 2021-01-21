VERSION = $(shell jq '.version' manifest.json)

setup:
	yarn

dev:
	npm run dev

build:
	npm run build

release: build
	gh release create $(VERSION) -t $(VERSION) -n 'Release Version $(VERSION)' 'main.js' 'styles.css' 'manifest.json'
