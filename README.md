## Description

Reign's Full Stack Developer challenge solution

## Installing the app's docker image

```bash
$ docker-compose up --build
```

After the installation is finished, visit [localhost:3000](https://localhost:3000) to see the app.

## Installing the app without the docker image

```bash
$ npm install
$ cd view
$ npm install
```

After the installation is finished, run:

```bash
$ cd ..
$ npm run start:dev
```

Visit [localhost:3000](https://localhost:3000) to see the app.

## Test

```bash
$ npm run test

$ npm run test:cov
```