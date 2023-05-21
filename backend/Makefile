bootstrap:
	@echo "==============================Preparing database...==============================" 
	docker-compose up -d
	sleep 10

	@echo "==============================Waiting for bootstrapping...=============================="
	yarn && yarn start:dev
	sleep 10

	@echo "Application is up and running. Now you can access application through http://localhost:4000/docs/application"

cleanup:
	docker-compose down -v
