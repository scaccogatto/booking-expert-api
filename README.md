# booking-expert-api

> from id and language to JSON

## Usage

`npm run start`

From cURL

`GET http://127.0.0.1:8080/book/websites/searchbox/:hotel/:lang`

- `:hotel` hotel id (`14577`)
- `:lang` language (`it`)

## Output

`GET http://127.0.0.1:8080/book/websites/searchbox/1/it`

```json
{
    "status": "pass",
    "data": {
        "hotel": "1",
        "layout": {
            "id": 2,
            "nights": 1,
            "checkin": "2019-01-23"
        },
        "guests": [
            {
                "id": 1,
                "favorite": false,
                "description": "1 Adulto",
                "favhtml": ""
            },
            {
                "id": 4,
                "favorite": false,
                "description": "1 Adulto + 1 Bambino",
                "favhtml": ""
            },
            {
                "id": 5,
                "favorite": false,
                "description": "1 Adulto + 2 Bambini",
                "favhtml": ""
            },
            {
                "id": 2,
                "favorite": true,
                "description": "2 Adulti",
                "favhtml": " selected=\"selected\""
            },
            {
                "id": 7,
                "favorite": false,
                "description": "2 Adulti + 1 Bambino",
                "favhtml": ""
            },
            {
                "id": 3,
                "favorite": false,
                "description": "3 Adulti",
                "favhtml": ""
            }
        ],
        "guestTypes": [
            {
                "id": 1,
                "defval": 2,
                "min": 1,
                "max": 3,
                "agefrom": 0,
                "agedefault": 18,
                "ageto": null,
                "ageselect": false,
                "name": "Adulti"
            },
            {
                "id": 2,
                "defval": 0,
                "min": 0,
                "max": 2,
                "agefrom": 2,
                "agedefault": 2,
                "ageto": 5,
                "ageselect": false,
                "name": "Bambini"
            }
        ]
    }
}
```
