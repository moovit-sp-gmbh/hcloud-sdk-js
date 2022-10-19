# Identity Provider

The IDP handles everythign when it comes to user accounts, like registration, authentication, authorization, settings etc.\

# Register
You can register a new user using the following method(s).
```ts
import HCloud from "hcloud-sdk"
import { User } from "hcloud-sdk/lib/interfaces/IDP";
import { AxiosError } from "axios";

const h = new HCloud({api: "https://dev.app.helmut.cloud"})

try {
    const newUser: User = await h.IDP.register("fullname", "email", "password")
} catch (thrown: unknown) {
    const err = thrown as AxiosError;
    console.log("err", err)
}
```

# Authenticate
You can authenticate against the IDP using the follow method(s).
```ts
import HCloud from "hcloud-sdk"
import { Token } from "hcloud-sdk/lib/interfaces/IDP";
import { AxiosError } from "axios";

const h = new HCloud({api: "https://dev.app.helmut.cloud"})

try {
    const token: Token = await h.IDP.authenticate("email", "password")
    h.setAuthToken(token.token)
} catch (thrown: unknown) {
    const err = thrown as AxiosError;
    console.log("err", err)
}
```
This sets the token globally to authorize future requests.

# Authorize
To validate your token, you can authorize it.
```ts
import HCloud from "hcloud-sdk"
import { Token } from "hcloud-sdk/lib/interfaces/IDP";
import { AxiosError } from "axios";

const h = new HCloud({api: "https://dev.app.helmut.cloud"})

try {
    const token: Token = await h.IDP.authenticate("email", "password")
    h.setAuthToken(token.token)

    const currentUser: User = await h.IDP.authorize()
} catch (thrown: unknown) {
    const err = thrown as AxiosError;
    console.log("err", err)
}
```
