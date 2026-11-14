<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

A REST API that calculates cart totals with discount campaigns (coupon, on-top, seasonal), documented with Swagger.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Swagger

```
http://localhost:3000/api
```

## Request body
```
 {
  items[]:{
    "name":string
    "price" number
    "category" : 'electronics' | 'clothing' | 'accessories';
    "quantity":
  },
  discount:[]{
    {
      "type":string
      "subtype": string
      "amount": number
    }
  }
}
```

### Discount Rule
```
Apply only one campaign from the same category, i.e. users have to choose either Fixed amount or
Percentage discount. 

*** if same category has more one  campaign will calcucate only first campaign found
```

### Example Discount Coupon Fixed Amont
```
discount:[{
    {
      "type":"coupon"
      "subtype": "fixed"
      "amount": 120
    }
  }]
```

### Example Coupon Percentage
```
discount:[{
    {
     "type":"coupon"
      "subtype": "percentage"
      "amount": 120
    }
  }]
```

### Example Ontop Percentage Category
```
discount:[{
    {
     "type":"onTop"
      "subtype": "category"
      "category": "electronics" | "clothing" | "accessories";
      "amount": 120
    }
  }]
```

### Example Ontop Discount By point
```
discount:[{
    {
     "type":"onTop"
      "subtype": "points"
      "points":120
    }
  }]
```

### Example Seasonal Special Campiagn
```
discount:[{
    {
     "type":"seasonal"
      "subtype": "special"
      "every":300
      "discount":40
    }
  }]
```


## Example
```
{
  "items": [
      {
        "name": "T-Shirt",
        "price": 350,
        "category": "clothing",
        "quantity": 1
      },
    {
      "name": "Hat",
      "price": 250,
      "category": "clothing",
      "quantity": 1
    },
    {
      "name": "Belt",
      "price": 230,
      "category": "accessories",
      "quantity": 1
    }
  ],
  "discounts": [
    {
      "type": "seasonal",
      "subtype": "special",
      "every": 300,
      "discount": 50
    }
  ]
}
```
