# Copyright (c) 2021-2026 Datalayer, Inc.
# Distributed under the terms of the Modified BSD License.

SHELL=/bin/bash

ENV_NAME=datalayer

.PHONY: help

help: ## display this help
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)

default: help ## default target is help

all: clean install build publish

build: ## build all modules
	npm run build

# The gallery is a member of the workspace above (`npm i` in datalayer-osp/src
# installs it); an install of its own would put a second React and a second
# set of React types beside the package's source and break both.
start: ## run the Vite primer-addons gallery example
	npm run gallery

gallery: ## run the Vite primer-addons gallery example
	npm run gallery

clean: ## deletes node_modules, lib, build... folders and other generated info, lock, log... files
	find . -name node_modules | xargs rm -fr {} || true
	find . -name dist | xargs rm -fr {} || true
	find . -name lib | xargs rm -fr {} || true
	find . -name build | xargs rm -fr {} || true
	find . -name yarn.lock | xargs rm {} || true
	find . -name yarn-error.log | xargs rm {} || true
	find . -name tsconfig.tsbuildinfo | xargs rm {} || true

install: ## install npm dependencies
	npm install

publish-npm: # publish the npm packages
	npm run build && \
		npm publish --access public
	echo https://www.npmjs.com/package/@datalayer/primer-addons?activeTab=versions

# https://primer-addons.datalayer.tech serves the gallery at its root and
# Storybook under /storybook/. The CloudFront origin is the bucket's S3
# website endpoint, whose error document is index.html, so a gallery address
# such as /card is answered by the gallery's page (with a 404 status).
SITE_BUCKET=s3://datalayer-primer-addons
SITE_DISTRIBUTION=E31G4MWCFRSED1
AWS_PROFILE_SITE=datalayer

deploy-gallery: ## build the gallery and deploy it to the site's root on s3, then invalidate cloudfront
	rm -fr examples/gallery/dist && \
	npm run gallery:build && \
	aws s3 sync \
		./examples/gallery/dist \
		$(SITE_BUCKET)/ \
		--delete \
		--exclude "storybook/*" \
		--exclude "index.html" \
		--cache-control "public, max-age=31536000, immutable" \
		--profile $(AWS_PROFILE_SITE) && \
	aws s3 cp \
		./examples/gallery/dist/index.html \
		$(SITE_BUCKET)/index.html \
		--content-type "text/html; charset=utf-8" \
		--cache-control "no-cache" \
		--profile $(AWS_PROFILE_SITE) && \
	aws cloudfront create-invalidation \
		--distribution-id $(SITE_DISTRIBUTION) \
		--paths "/*" \
		--profile $(AWS_PROFILE_SITE) && \
	echo open ✨  https://primer-addons.datalayer.tech

deploy-storybook: ## build storybook and deploy it under /storybook/ on s3, then invalidate cloudfront
	rm -fr storybook-static/* && \
	npm run build-storybook && \
	aws s3 sync \
		./storybook-static \
		$(SITE_BUCKET)/storybook/ \
		--delete \
		--profile $(AWS_PROFILE_SITE) && \
	aws cloudfront create-invalidation \
		--distribution-id $(SITE_DISTRIBUTION) \
		--paths "/storybook/*" \
		--profile $(AWS_PROFILE_SITE) && \
	echo open ✨  https://primer-addons.datalayer.tech/storybook/
