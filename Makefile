.PHONY: build-lambda-function
build-lambda-function:
	npm install
	rm -rf build
	echo "{\"extends\": \"./tsconfig.sam.json\", \"include\": [\"./src/${LAMBDA_PATH}${LAMBDA_FILE}.ts\"] }" > tsconfig-custom.json
	TSCONFIG_FILE=tsconfig-custom.json LAMBDA_PATH=${LAMBDA_PATH} LAMBDA_FILE=${LAMBDA_FILE} npm run build:sam
	cp -r build "${ARTIFACTS_DIR}/"

# list all lambda functions here
.PHONY: build-SampleFunction
build-SampleFunction:
	$(MAKE) \
		LAMBDA_PATH=handlers/sample/ \
		LAMBDA_FILE=sum \
		build-lambda-function
