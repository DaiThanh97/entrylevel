bootstrap:
	@echo "==============================Bootstrapping Backend===================================" 
	cd backend && yarn && yarn start:dev

	@echo "==============================Waiting for bootstrapping backend...============================="
	sleep 5

	@echo "==============================Bootstrapping Frontend===================================" 
	cd frontend && yarn && yarn start

	@echo "==============================Waiting for bootstrapping frontend...============================="
	sleep 5

	@echo "Application is up and running. Now you can access application UI through http://localhost:3000, api document through http://localhost:4000/docs/application"

cleanup:
	@echo "==============================Killing Backend Process===================================" 
	kill -9 $(lsof -ti:4000)

	@echo "==============================Waiting for killing backend...============================="
	sleep 5

	@echo "==============================Killing Frontend Process===================================" 
	kill -9 $(lsof -ti:3000)

	@echo "==============================Waiting for killing frontend...============================="
	sleep 5