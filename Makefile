CONTAINERIZER ?= podman
SRC ?= ./app
TAG ?= localhost/react-pwa-typescript:latest

ifeq ($(CONTAINERIZER), docker)
        CONTAINERFILE ?= Dockerfile
else 
        CONTAINERFILE ?= Containerfile
endif


build: build.done

Dockerfile: Containerfile
	cp Containerfile Dockerfile

build.done: $(CONTAINERFILE)
	$(CONTAINERIZER) build . -t $(TAG)
	touch $@

run:
	$(CONTAINERIZER) run --volume $(SRC):/usr/src/ \
		--publish=3000:3000 \
		--rm \
		--interactive --tty \
		--env WATCHPACK_POLLING=true \
		$(TAG)

	# --env WATCHPACK_POLLING=true because this version of create-react-app
	#  ships with a version of webpack which requires this environment
	#  variable in order to correctly poll the filesystem for updated
	#  files. This is necessary because the virtual machine volume binding
	#  loses any kind of inotify kernel events that the watch programs
	#  would typically use to determine if recompile is needed.

stop:
	$(CONTAINERIZER) stop $$($(CONTAINERIZER) ps | awk '/http-server/ {print $$NF}');
