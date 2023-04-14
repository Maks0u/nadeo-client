# nadeo-client

Install the package with npm

```
npm i Maks0u/nadeo-client
```

Declare environment variables

```sh
UBI_USER_AGENT=""
UBI_APP_ID=""
UBI_CLIENT_ID=""
UBI_CLIENT_SECRET=""
UBI_BASE="https://public-ubiservices.ubi.com/"
NADEO_CORE_BASE="https://prod.trackmania.core.nadeo.online/"
NADEO_LIVE_BASE="https://live-services.trackmania.nadeo.live/"
TMIO_USER_AGENT=""
TMIO_BASE="https://trackmania.io/api/"
```

Write your code

```js
import Client from 'nadeo-client';
const nadeoClient = new Client();

async function main() {
    const club = await nadeoClient.getClub('25');
    console.log(club);
}

main();
```

The code above will print the club object

```json
{
    "id": 25,
    "name": "$s$fffTrackMania $6F9Exchange",
    "tag": "$S$FFFT$6F9MX$Z",
    "description": "..."
}
```
