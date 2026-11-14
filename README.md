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
