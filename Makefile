#!/usr/bin/make

include .env

#----------- Make Environment ----------------------
.DEFAULT_GOAL := help
SHELL= /bin/sh
docker_bin= $(shell command -v docker 2> /dev/null)
docker_compose_bin= $(shell command -v docker-compose 2> /dev/null)
COMPOSE_CONFIG=--env-file .env -p "$(PROJECT_NAME)" -f docker/docker-compose.yml -f docker/docker-compose.${ENVIRONMENT}.yml

help: ## Show this help
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z0-9_-]+:.*?## / {printf "  \033[92m%-15s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

---------------: ## ------[ ACTIONS ]---------
#Actions --------------------------------------------------
check: ## Check your configuration
	$(docker_compose_bin) $(COMPOSE_CONFIG) config
up: ## Start all containers (in background)
	$(docker_compose_bin) $(COMPOSE_CONFIG) up --no-recreate -d
down: ## Stop all started containers
	$(docker_compose_bin) $(COMPOSE_CONFIG) down
restart:  ## Restart all started containers
	$(docker_compose_bin) $(COMPOSE_CONFIG) restart