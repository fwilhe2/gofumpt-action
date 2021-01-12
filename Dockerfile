FROM node:14-buster

ENV RUNNER_TEMP /home/runner/work/_temp
ENV RUNNER_TOOL_CACHE /opt/hostedtoolcache
ENV GITHUB_WORKSPACE /home/runner/work/cautious-barnacle/cautious-barnacle
ENV GITHUB_ACTION run3
ENV GITHUB_RUN_NUMBER 52
ENV RUNNER_DEBUG 1
ENV DEPLOYMENT_BASEPATH /opt/runner
ENV GITHUB_ACTIONS true
ENV RUNNER_OS Linux
ENV HOME /home/runner
ENV GITHUB_API_URL https://api.github.com
ENV LANG C.UTF-8
ENV CI true
ENV DEBIAN_FRONTEND noninteractive

RUN mkdir -p /home/runner && echo "runner:x:1000:1000:runner:/home/runner:/bin/bash" >> /etc/passwd \
 && chown -R runner /home/runner

RUN mkdir -p /opt/hostedtoolcache; chmod -R 777 /opt

WORKDIR /home/runner/work/_actions/fwilhe2/gofumpt-action/main
RUN chown -R runner /home/runner

USER runner

RUN mkdir -p /home/runner/work/_actions/fwilhe2/gofumpt-action/main
RUN mkdir -p /home/runner/work/_actions/fwilhe2/gofumpt-action/main.completed
RUN mkdir -p /home/runner/work/_temp
RUN mkdir -p /home/runner/work/cautious-barnacle/cautious-barnacle

WORKDIR /home/runner/work/cautious-barnacle/cautious-barnacle
RUN echo "node /home/runner/work/_actions/fwilhe2/gofumpt-action/main/dist/index.js" > run.sh; chmod +x run.sh