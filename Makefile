docker:
	rm -rf dist
	yarn build
	docker-compose down
	docker-compose up -d --build