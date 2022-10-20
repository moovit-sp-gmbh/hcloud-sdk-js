# Getting started

The first to start with is to create a new instance of hcloud.
```
import HCloud from "hcloud-sdk"

const h = new HCloud({ server: "https://dev.app.helmut.cloud"})
```

from here on, the next step would be to authenticate against the platform by talking to the Identity Provider (refered as IDP in this document) to receive a Bearer [JWT](https://jwt.io/) token.
```
import HCloud from "hcloud-sdk"
import { Token } from "hcloud-sdk/lib/IDP";
import { AxiosError } from "axios";

const h = new HCloud({ server: "https://dev.app.helmut.cloud"})

try {
    const token: Token = await h.IDP.authenticate("email", "password")
    h.setAuthToken(token.token)
} catch (err: AxiosError) {
    console.log("err", err)
}
```

This token does not expire and must be used with every future request in order to authorize it. \
We set this token using HClouds setAuthToken method globally for future requests.
