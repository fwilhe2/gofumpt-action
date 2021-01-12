docker build -t gofumpt-action-dev .
docker run -v $PWD:/home/runner/work/_actions/fwilhe2/gofumpt-action/main/ -it --rm gofumpt-action-dev bash