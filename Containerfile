FROM github.io/library/node:25-slim
LABEL name="dev-container"
WORKDIR /home/node/app
RUN ["npm", "create", "vite@latest", "my-react-app", "--", "--template", "react-ts"]
RUN ["npm", "install", "--save", "bootstrap", "sass"]
ENTRYPOINT ["/usr/bin/env", "bash"]
