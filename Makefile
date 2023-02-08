GIT_COMMIT=$(shell git log --format=%H -n 1)
IMAGE_NAME=nextjs-template
IMAGE_TAG=latest
NAMESPACE=nextjs-template

AWS_ECR_PROFILE?=an_aws_profile
AWS_REGION=an_aws_region
AWS_DEV_ACCOUNT=123456

IMAGE=${IMAGE_NAME}:${IMAGE_TAG}
IMAGE_DEV=$(IMAGE_NAME):$(IMAGE_TAG)-dev
IMAGE_SCAN=$(IMAGE_NAME):$(IMAGE_TAG)-scan
DOCKERFILE_PATH=./Dockerfile
CONTEXT_PATH=./

build:
	@echo "[+] Starting Docker build for ${IMAGE_NAME}"
	AWS_PROFILE=${AWS_ECR_PROFILE} docker build --rm -t ${IMAGE} -f ${DOCKERFILE_PATH} ${CONTEXT_PATH}

build-dev:
	@echo "[+] Starting Docker dev build for ${IMAGE_NAME}"
	AWS_PROFILE=${AWS_ECR_PROFILE} docker build --target runner-dev -t ${IMAGE_DEV} -f ${DOCKERFILE_PATH} ${CONTEXT_PATH}

