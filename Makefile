install:
	@echo "Pulling dependecies..."
	@yarn install

up:
	@echo "Running application..."
	@node index.js

lint:
	@echo "Linting Javascript..."
	@./node_modules/.bin/eslint .
