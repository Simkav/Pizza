#!/usr/bin/make

#----------- Make Environment ----------------------
.DEFAULT_GOAL := help

SEQUELIZE = yarn sequelize

help: ## Show this help
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z0-9_-]+:.*?## / {printf "  \033[92m%-15s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

---------------: ## ------[ ACTIONS ]---------
#Actions --------------------------------------------------
start: ## Init db and run server
	make wait_for_db 
	make init_db || true
	make run_dev 

init_db: db_create migrations_run seeds_run ## Create db run migrations and upload seeds

reinit_db: db_drop init_db ## Drop db and init

run_dev: ## Run server in dev
	yarn start:dev
wait_for_db: ## Wait until db will be ready for connection
	bash ./wait_for.bash pizza-postgres-db-service:5432 -- echo "db ready for connections"

---------------: ## ------[ MIGRATIONS ]---------
#Migrations --------------------------------------------------
migrations_run: ## Run migrations
	$(SEQUELIZE) db:migrate
migrations_revert: ## Revert migrations
	$(SEQUELIZE) db:migrate:undo:all

---------------: ## ------[ SEEDS ]---------
#Seeds --------------------------------------------------
seeds_run: ## Run seeds
	$(SEQUELIZE) db:seed:all 
seeds_revert: ## Revert seeds
	$(SEQUELIZE) db:seed:undo:all
	
---------------: ## ------[ DB ]---------
#DB --------------------------------------------------
db_create: ## Create db
	$(SEQUELIZE) db:create 
db_drop: ## Drop db
	$(SEQUELIZE) db:drop