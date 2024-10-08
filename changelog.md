## [14.13.1](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/compare/v14.13.0...v14.13.1) (2024-08-27)

### Bug Fixes

* revert url to _id change when deleting a space catalog ([153d364](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/153d3648285f766983f34d93130d9dcc610e5757))

## [14.13.0](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/compare/v14.12.0...v14.13.0) (2024-08-27)

### Features

* change catalogUrl to query string rather then param ([8171b05](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/8171b05df222f6bc38ec22f79cd5fda43207dc42))

## [14.12.0](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/compare/v14.11.0...v14.12.0) (2024-08-27)

### Features

* delete catalog by url instead of _id ([13f7c5b](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/13f7c5b50c46cbed4a3bdb2f98bfb8103cbf6af2))

### Reverts

* "ci: readd scope" "ci: publish to npm" ([6fa4e74](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/6fa4e74ecc40ef3dcc13f610b318d9261196867c))

## [14.12.0-staging.1](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/compare/v14.11.0...v14.12.0-staging.1) (2024-08-27)

### Features

* delete catalog by url instead of _id ([13f7c5b](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/13f7c5b50c46cbed4a3bdb2f98bfb8103cbf6af2))

## [14.11.0](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/compare/v14.10.0...v14.11.0) (2024-08-27)

### Features

* set action target to ubuntu-latest ([fecb4db](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/fecb4dba360f861021651d04a04ae114c2a68554))

### Bug Fixes

* bump pnpm action to v4 ([7b2d817](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/7b2d817968443bbf7724face47136335ff0082b6))
* rename field signed to verified ([5a5a74e](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/5a5a74e298985704c9ddc3b20f4aeaf77a84f769))
* set ubuntu version for actions to 20.04 ([5e3e11b](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/5e3e11b3dd563183b187c0f24c499f98749f957b))

## [14.10.0](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/compare/v14.9.0...v14.10.0) (2024-08-27)

### Features

* make registry catalogs its own model ([0fe56a6](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/0fe56a6e2c0f97f66b0958a28ab3c133325916f5))

## [14.9.0](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/compare/v14.8.1...v14.9.0) (2024-08-27)

### Features

* add name, description and publisher to registry ([09f89bd](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/09f89bd090c7935b437c11bfe553152ae1c7bc98))

## [14.8.1](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/compare/v14.8.0...v14.8.1) (2024-08-26)

### Bug Fixes

* return type if rename space to be an interface ([6569a9d](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/6569a9dd42b23553b7bc8d8eebcb98daff4167c4))

## [14.8.0](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/compare/v14.7.0...v14.8.0) (2024-08-23)

### Features

* user/oauth/search now shows consented scopes ([e0551e8](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/e0551e8a38591b4e6ef1228726dadf6ebec5c9a2))

## [14.7.0](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/compare/v14.6.0...v14.7.0) (2024-08-22)

### Features

* set design and snapshot build to DesignBuild ([fb82601](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/fb82601a4aa7646e7bbedd89ed4fcb30a654dd68))

## [14.6.0](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/compare/v14.5.0...v14.6.0) (2024-08-22)

### Features

* add nats subject for org invitations ([1a82042](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/1a82042d671206d5731bd985eecbdd7b26e535f2))
* add nats subject for user license ([4789efd](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/4789efdf8c89e8f3231bd1392b9776209d389d2b))

### Bug Fixes

* add optional 'oldName' property to NatsNameObject ([48ba425](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/48ba42526c0ac839a8905e9a2ff5d27151e348c4))

## [14.5.0](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/compare/v14.4.0...v14.5.0) (2024-08-22)

### Features

* add bundleVersion to agent ([c0a916d](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/c0a916d4c3fac8a71e8331c5d6e94df5cfc8aba2))

## [14.4.0](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/compare/v14.3.0...v14.4.0) (2024-08-13)

### Features

* add preflight OAuth method ([033f1ff](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/033f1ffb6f566ff8d1fb749ab1842c189ae9e3e1))

## [14.3.0](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/compare/v14.2.0...v14.3.0) (2024-08-12)

### Features

* add createDate to High5ExecutionLog ([547bfcc](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/547bfcce67c651af9739043f1d286d94f2bab6ce))

## [14.2.0](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/compare/v14.1.0...v14.2.0) (2024-08-09)

### Features

* add additional output types ([e180a72](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/e180a72806ef0eb1261981379d72c5dea8d4ba44))
* add additional type field to inputs and outputs ([12cc803](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/12cc803c2b4ec5eb996ffa217ac56cba9e996341))

## [14.1.0](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/compare/v14.0.0...v14.1.0) (2024-08-06)

### Features

* reflect the allow dev bundle switch of agent ([a20803c](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/a20803caa65317d94eaa9092effcb413e87a7bfd))

## [14.0.0](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/compare/v13.16.0...v14.0.0) (2024-08-06)

### ⚠ BREAKING CHANGES

* remove GlobalConfig endpoint and interfaces

### Features

* remove GlobalConfig endpoint and interfaces ([923db52](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/923db52d5c441303470724ad09d9e97d9b690053))

## [13.16.0](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/compare/v13.15.1...v13.16.0) (2024-08-06)

### Features

* add new AuditLogCreate interface and refactor AuditorInternal class ([aa376c6](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/aa376c60552b87d6f51e06fe2c25136db057aef8))
* base64 encode all replacements that can contain dots in nats subjects ([b82bbfb](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/b82bbfbacd7654fe308d4a1849191f26672063eb))

## [13.15.1](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/compare/v13.15.0...v13.15.1) (2024-08-02)

### Bug Fixes

* return StreamNodeSpecifications in getCatalog method ([6111013](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/61110133dc469cd34968167e0639703c7407f061))

## [13.15.0](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/compare/v13.14.0...v13.15.0) (2024-08-02)

### Features

* add nats subject for auditLogs ([77b25dc](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/77b25dc8f6127c5ae46984951da1b1efaa570799))

## [13.14.0](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/compare/v13.13.0...v13.14.0) (2024-08-02)

### Features

* add secret to the extended exec package ([1e7a35d](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/1e7a35d17bdd2ad4d593cadc609859813b9908a9))

## [13.13.0](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/compare/v13.12.1...v13.13.0) (2024-08-02)

### Features

* add StreamNodeSpecifications (plural) type" ([ae0d915](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/ae0d9154180af6f3fabd61c8e832e16fb0295ce2))

## [13.12.1](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/compare/v13.12.0...v13.12.1) (2024-08-01)

### Bug Fixes

* use name rather than email in registration mail send to user ([e753f4a](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/e753f4a0e6123a2fe176dcba5fce0bef6f579e29))

## [13.12.0](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/compare/v13.11.0...v13.12.0) (2024-08-01)

### Features

* add StreamNodeSpecificationV2 (has no 'documentation' property anymore) ([2e0e1e0](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/2e0e1e0c96aa6bbadce47696a5e81649289ad20f))

## [13.11.0](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/compare/v13.10.0...v13.11.0) (2024-07-31)

### Features

* add HIGH5_STREAMS nats subject without event context ([dda7e59](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/dda7e59b48838a86b14b8187c1dc539ae0a8991c))
* add IDP_USER_PROFILE subject ([caf9dc3](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/caf9dc3bbd010c9aa7ae2ad391265a62a3d744ae))
* update nats messages ([bd4fb53](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/bd4fb536a0120fa3ec462ffa5b4322eac6a474da))

### Bug Fixes

* use plural in nats subjects to match the way we do it in our api ([c9310a3](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/c9310a39484e49d01da183fd5aa00c309ef0322b))

## [13.10.0](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/compare/v13.9.0...v13.10.0) (2024-07-30)

### Features

* remove bouncer frontend config ([840981a](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/840981aadbcbcc9b7ef4184489859b65ed9c4971))

## [13.9.0](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/compare/v13.8.0...v13.9.0) (2024-07-30)

### Features

* add bouncer interface for s3 ([1fdbd5d](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/1fdbd5d6cdaddacbfc562282bc357460013fc7a4))

## [13.8.0](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/compare/v13.7.0...v13.8.0) (2024-07-25)

### Features

* add content color prop to annotation type ([666e832](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/666e8326e99dab5d40dc44355ba50ea19a4f8424))

## [13.7.0](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/compare/v13.6.0...v13.7.0) (2024-07-22)

### Features

* add a new email template for registration ([7c60a8d](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/7c60a8d7050dc1cac3d96c3908df23e502879a8f))

## [13.6.0](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/compare/v13.5.1...v13.6.0) (2024-07-17)

### Features

* add doNotRedirect to oauth authorize ([7c6ff73](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/7c6ff7386c5b9fb799ca994605ff6f7cabb31f4c))

## [13.5.1](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/compare/v13.5.0...v13.5.1) (2024-07-17)

### Bug Fixes

* return redirect location instead of following it ([43e1a92](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/43e1a92af4f4eb92cd23d5d2ff5e5f7ac4755218))

## [13.5.0](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/compare/v13.4.0...v13.5.0) (2024-07-17)

### Features

* change selectedLanguage type to string map instead of string ([e70af3b](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/e70af3b43bc027237905ca8b84280bc3088a4398))

## [13.4.0](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/compare/v13.3.0...v13.4.0) (2024-07-17)

### Features

* add selected lang prop for designer node input ([431a851](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/431a851bc0864ae2cc9edfb5109e399df367c205))

## [13.3.0](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/compare/v13.2.0...v13.3.0) (2024-07-12)

### Features

* removed comment from frontend/config ([5ac3f01](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/5ac3f01e67a23f1d326fe5b2c4988a568dc9ae47))

## [13.2.0](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/compare/v13.1.0...v13.2.0) (2024-07-12)

### Features

* add comment to frontend/config ([5ef9a4c](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/5ef9a4c51bb8aec8d55072882ef7812897fcb7bc))
* add frontend config interfaces ([30c0872](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/30c08724fea68d3555991d05a314a42ade332a30))
* remove _doc and dependencies ([592496d](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/592496d312ca167025a9a161150cec186fec60ec))
* update nats packages ([7bf8a35](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/7bf8a3545ae38819ca5e5fd7cc6b6fd07c3da9b9))

## [13.2.0](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/compare/v13.1.0...v13.2.0) (2024-07-12)

### Features

* add frontend config interfaces ([30c0872](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/30c08724fea68d3555991d05a314a42ade332a30))
* remove _doc and dependencies ([592496d](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/592496d312ca167025a9a161150cec186fec60ec))
* update nats packages ([7bf8a35](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/7bf8a3545ae38819ca5e5fd7cc6b6fd07c3da9b9))

## [13.2.0](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/compare/v13.1.0...v13.2.0) (2024-07-11)

### Features

* add frontend config interfaces ([069610a](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/069610a21cbd9b7e58d7b953c8573def5af8a8ed))

## [13.1.0](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/compare/v13.0.0...v13.1.0) (2024-07-03)

### Features

* add new nats subs for high5 and fuse spaces ([1641c03](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/1641c0392ea610603ebf44226ac7e6ad402c7ff4))

## [13.0.0](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/compare/v12.5.0...v13.0.0) (2024-07-02)

### ⚠ BREAKING CHANGES

* add create/update secret objects

### Features

* add create/update secret objects ([26f1d98](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/26f1d98220ec4370b6df807ef7c0f68b25b83fe2))

## [12.5.0](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/compare/v12.4.0...v12.5.0) (2024-07-02)

### Features

* add description field for secrets ([98fd863](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/98fd8632f8d472b3a3689434bc2a3d6a3197cea3))

## [12.4.0](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/compare/v12.3.0...v12.4.0) (2024-07-02)

### Features

* add originalName to DesignerNode ([4237c0e](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/4237c0ee0c925eb36bb9f824f754f9870757ce14))

## [12.3.0](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/compare/v12.2.0...v12.3.0) (2024-07-02)

### Features

* add node-documentation download method to wave/s3 ([6f1070d](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/6f1070d9a96f7c64efa34b928f840e95262bf565))

## [12.2.0](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/compare/v12.1.0...v12.2.0) (2024-06-19)

### Features

* add HMAC settings to cronjobs ([7cfbfea](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/7cfbfea779362f010de921e9f2901e7f327a2e90))
* add Select utility type ([ba75f13](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/ba75f137ba16b4e2d1963233db6df21cfbcdea38))

## [12.1.0](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/compare/v12.0.1...v12.1.0) (2024-06-18)

### Features

* add dev flag to installer.getLatestVersion ([eefd08d](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/eefd08d7b41fc0ea07437a2e2d523cf12354a14c))

## [12.0.1](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/compare/v12.0.0...v12.0.1) (2024-06-18)

### Bug Fixes

* revert the subject to listen to org id instead of org name for stream exec and cancel requests ([54f2aed](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/54f2aed0ab08a5a4787d1821097fd5d17510e171))

## [12.0.0](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/compare/v11.0.0...v12.0.0) (2024-06-18)

### ⚠ BREAKING CHANGES

* add error to NatsCallback parameters

### Features

* add error to NatsCallback parameters ([479deae](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/479deaee45d770d2b9dacc2c453739e30b4a7324))

## [11.0.0](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/compare/v10.13.0...v11.0.0) (2024-06-18)

### ⚠ BREAKING CHANGES

* rename bundle dev-release to dev

### Features

* add dev flag to installer versions ([691c55c](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/691c55c63229cc72a1497809dab0ee23cadb2d93))
* rename bundle dev-release to dev ([f27274b](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/f27274b805110af0143c5675d8bf8e32206a0bd8))

## [10.13.0](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/compare/v10.12.0...v10.13.0) (2024-06-17)

### Features

* add missing fuse nats subs ([0897910](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/08979106df4e0d1d2e635e78c86318350c044d19))
* add missing idp nats sub ([ac2f095](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/ac2f0950510a28fb3b9d8c2898b0ca1beb365354))
* add types for nats messages for all existing subjects ([4e89f54](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/4e89f54cdeca415b2deb15b645beb6d1a713d642))
* replace ids by names in nats subs ([6d4b782](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/6d4b782e9dd3d4e59245f7185f9f411ae917d639))

## [10.12.0](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/compare/v10.11.0...v10.12.0) (2024-06-17)

### Features

* add specVersion to node specification ([d62bedb](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/d62bedbac0fe54ef3bc822c387648b85c559c64c))

## [10.11.0](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/compare/v10.10.0...v10.11.0) (2024-06-06)

### Features

* set 'user-agent' header in non-browser environment ([cdcc9e6](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/cdcc9e6add09ebc66dfe3f67dc7be4e97ddc5855))

## [10.10.0](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/compare/v10.9.0...v10.10.0) (2024-06-05)

### Features

* add support for StreamNodeSpecificationWrappedWithEngineVersion ([62758f5](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/62758f5b58c67f99dfab276199b60c0572dce1a8))

## [10.9.0](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/compare/v10.8.0...v10.9.0) (2024-06-05)

### Features

* add networkSettings ([29e4ee8](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/29e4ee8b0c52f4addaaa008570904260822fcf9f))

## [10.8.0](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/compare/v10.7.0...v10.8.0) (2024-06-05)

### Features

* add networkSettings for webhooks ([15b1217](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/15b1217a107f5db2e427544086005747ab687e5a))

### Bug Fixes

* add networkSettings ([61314df](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/61314dfe86695c611f7b65f04098cb2227a0ef49))
* add networkSettings to webhookCreate ([33708ae](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/33708aedb354125695cb7e836a6861073745ab1f))
* add networkSettings to WebhookCreation ([07e31fe](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/07e31fee3eeebe6db517c392a9b16dc41b95afa2))

## [10.8.0](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/compare/v10.7.0...v10.8.0) (2024-06-05)

### Features

* add networkSettings for webhooks ([15b1217](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/15b1217a107f5db2e427544086005747ab687e5a))

### Bug Fixes

* add networkSettings to webhookCreate ([33708ae](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/33708aedb354125695cb7e836a6861073745ab1f))
* add networkSettings to WebhookCreation ([07e31fe](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/07e31fee3eeebe6db517c392a9b16dc41b95afa2))

## [10.8.0](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/compare/v10.7.0...v10.8.0) (2024-06-05)

### Features

* add networkSettings for webhooks ([15b1217](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/15b1217a107f5db2e427544086005747ab687e5a))

### Bug Fixes

* add networkSettings to webhookCreate ([33708ae](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/33708aedb354125695cb7e836a6861073745ab1f))

## [10.8.0](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/compare/v10.7.0...v10.8.0) (2024-06-05)

### Features

* add networkSettings for webhooks ([15b1217](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/15b1217a107f5db2e427544086005747ab687e5a))

## [10.7.0](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/compare/v10.6.0...v10.7.0) (2024-06-05)

### Features

* remove version prop of catalog object ([5ac31c6](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/5ac31c68c761b5bd484ab0cd8b8d1de818d377e8))

## [10.6.0](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/compare/v10.5.0...v10.6.0) (2024-06-05)

### Features

* add canvas dimensions to DesignContent interface ([6f11fb7](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/6f11fb7e9b9c8e2898146ee18a7307882dad710d))
* add disconnect methods for mothership ([46e8fd4](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/46e8fd4435ccb9941c22d8923093d5027a91e47d))
* update dependency conventionalcommits ([5206f4d](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/5206f4debe74b7dfb9cbf1909992204803fbfb37))

## [10.4.0](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/compare/v10.3.0...v10.4.0) (2024-05-24)


### Features

* add dev boolean flag to catalog and engine version ([0f70181](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/0f701818c9f9fcfb2f2d2f93ad95775b698f0a56))

## [10.3.0](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/compare/v10.2.1...v10.3.0) (2024-05-22)


### Features

* update eslint configuration to sort imports alphabetically ([eb5306c](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/eb5306cafe18481c51742acc392815da6049a167))
* update prettier configuration to sort imports ([1297db7](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/1297db7f8761c31b339a422655c8d8a3fa20ba3c))

## [10.2.1](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/compare/v10.2.0...v10.2.1) (2024-05-21)


### Reverts

* Revert "feat: add compression support" ([b638cd9](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/b638cd91ab0216a6173625ce507e638d28817aa2))

## [10.1.1](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/compare/v10.1.0...v10.1.1) (2024-05-21)


### Reverts

* Revert "feat: add endpoints for getting and saving design with gzipped payloads" ([64fc0a9](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/64fc0a9cf49036be8a10fe45a56a0aab74a0b192))

## [10.1.0](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/compare/v10.0.0...v10.1.0) (2024-05-21)


### Features

* add endpoints for getting and saving design with gzipped payloads ([1f048a8](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/1f048a8c77b63d0536f0b5a39a3f1143c28b393c))

## [10.0.0](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/compare/v9.1.4...v10.0.0) (2024-05-17)


### ⚠ BREAKING CHANGES

* update eslint rules to fix current errors

### Styles

* update eslint rules to fix current errors ([3afa2c0](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/3afa2c0b497d089087010d31ee2a5c4df9a78149))

## [9.1.4](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/compare/v9.1.3...v9.1.4) (2024-05-14)


### Bug Fixes

* delete the wave node specification category field ([569877b](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/569877b075dced681bfc82ffa9657669553d305d))

## [9.1.3](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/compare/v9.1.2...v9.1.3) (2024-05-13)


### Bug Fixes

* redo previous commit with right commit convention ([ddb1e5c](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/ddb1e5c53ff9c3fbed996dcb66e726d1a56453bf))

## [9.1.2](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/compare/v9.1.1...v9.1.2) (2024-04-19)


### Bug Fixes

* remove method to search execution statuses ([549f62a](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/549f62a6bdf1d06f16cceaeffe8d4180cdf6f9eb))


### Performance Improvements

* fix format and linter issues ([a717140](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/a7171406ed318e8aac32e274f9167a43a7c815e9))

## [9.1.1](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/compare/v9.1.0...v9.1.1) (2024-04-11)


### Bug Fixes

* add Scope.IDP_ORGANIZATION_READ to all high5/fuse scopes as mandatory ([8b86de5](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/8b86de51bc4d1278a6e2e543884539529bbc8f33))

## [9.1.0](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/compare/v9.0.0...v9.1.0) (2024-04-11)


### Features

* **cache:** add option to disable cache globally and force-disable cache for s3 related calls ([c14a984](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/c14a9846f33a347c2088ba7d5435975488972f43))

## [9.0.0](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/compare/v8.6.0...v9.0.0) (2024-04-09)


### ⚠ BREAKING CHANGES

* remove the demo node category

### Code Refactoring

* remove the demo node category ([6007649](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/6007649e674b5ad826ea5dd332ffe002bffb6d54))

## [8.6.0](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/compare/v8.5.0...v8.6.0) (2024-04-05)


### Features

* add orgName and spaceName to the executionPackage ([695650e](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/695650e490612231448861e13cb1b666ce09161e))

## [8.5.0](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/compare/v8.4.0...v8.5.0) (2024-04-05)


### Features

* add method to get secret by key ([cee2305](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/cee23056841ec9bc7ada86eb9543dcec06402c28))

## [8.4.0](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/compare/v8.3.0...v8.4.0) (2024-04-04)


### Features

* add Control Flow node category ([be6434b](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/be6434bde6db1dd4cf95e2823df15c97801a742e))

## [8.3.0](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/compare/v8.2.1...v8.3.0) (2024-04-04)


### Features

* add High5 wave nodes category ([0cc9931](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/0cc9931b32666cd4259ddfe74cee1a5006a2db83))

## [8.2.1](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/compare/v8.2.0...v8.2.1) (2024-04-03)


### Bug Fixes

* executionTarget NatsSubject ([e15cbe2](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/e15cbe2f52374cd954354af84e27574e8a31c800))

## [8.2.0](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/compare/v8.1.0...v8.2.0) (2024-04-03)


### Features

* extend execution package by hcloud client instance ([9ced20a](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/9ced20a6f07a301724829369e6ca45d33f65c6cd))

## [8.1.0](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/compare/v8.0.0...v8.1.0) (2024-04-02)


### Features

* add reducedEvent prop to execution status interface ([c665fd3](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/c665fd36aee41e3a681afb67ccd23c3a18e7dc9f))

## [8.0.0](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/compare/v7.4.0...v8.0.0) (2024-04-02)


### ⚠ BREAKING CHANGES

* rename "permissionOfUser" to "highestPermissionOfUser" and make it mandatory

### Features

* rename "permissionOfUser" to "highestPermissionOfUser" and make it mandatory ([ffe859c](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/ffe859c8a6ca74f8a9d114affdde4deb97004e4a))

## [7.4.0](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/compare/v7.3.0...v7.4.0) (2024-04-02)


### Features

* add original email prop to registration email interface ([3907e3e](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/3907e3e0daf4be02f26907580fea54986eae36a0))

## [7.3.0](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/compare/v7.2.0...v7.3.0) (2024-03-28)


### Features

* add EXECUTION_TARGET NatsSubject ([1d6889b](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/1d6889bf9460691377def5149f45bec8c2e5bafc))

## [7.2.0](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/compare/v7.1.0...v7.2.0) (2024-03-28)


### Features

* add STREAM entry to StreamNodeSpecificationCategory enum ([f2b54d7](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/f2b54d7e096e0b8aaaf76a190fd80d2e0714d52d))

## [7.1.0](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/compare/v7.0.0...v7.1.0) (2024-03-26)


### Features

* add SCRIPTING node category ([89bfb90](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/89bfb90080ab2c0c26550deaa726c7a1dfa9c9b9))

## [7.0.0](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/compare/v6.3.1...v7.0.0) (2024-03-25)


### ⚠ BREAKING CHANGES

* remove default import for hcloud class

### Code Refactoring

* remove default import for hcloud class ([e0917a6](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/e0917a69dd5037b4dfb02f8a41b8a090de621c63))

## [6.3.1](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/compare/v6.3.0...v6.3.1) (2024-03-22)


### Bug Fixes

* add uuid to updateAgentContext method ([a1bd701](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/a1bd701f4728886520e245ae723583dce42d627b))

## [6.3.0](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/compare/v6.2.1...v6.3.0) (2024-03-20)


### Features

* add avatarUrl to SpaceEntityPermission ([d9eb62d](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/d9eb62d1f15f16e9b7dfff1d3b390177466fc48f))


### Bug Fixes

* path for PUT space/permissions ([564a3ba](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/564a3babf45090b5d3093cf6cad9472b283870ef))
* remove duplicate FuseSpaceEntityPermission ([9a0c2e8](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/9a0c2e85e1037159d1275ff7807544c70d09c526))

## [6.2.1](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/compare/v6.2.0...v6.2.1) (2024-03-20)


### Reverts

* update the method to get node content by secret ([970ed13](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/970ed13ae100f69a28960b42cc0e0d25254038f4))

## [6.2.0](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/compare/v6.1.0...v6.2.0) (2024-03-18)


### Features

* add color prop for custom node ([228a808](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/228a808cd4168635d7ae2a0fe85c85476eb4f9d8))

## [6.1.0](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/compare/v6.0.0...v6.1.0) (2024-03-18)


### Features

* extend agent context info ([ff09811](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/ff0981179a520e3c02faa6c615e3e01ba2915821))

## [6.0.0](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/compare/v5.1.0...v6.0.0) (2024-03-18)


### ⚠ BREAKING CHANGES

* add installer support for agent

### Features

* add installer support for agent ([ae29e14](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/ae29e14892ca31b94670f307c3d64e81551baeb1))

## [5.1.0](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/compare/v5.0.0...v5.1.0) (2024-03-18)


### Features

* update s3 bundles path ([a98b771](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/a98b7712c9d5016e74dcb84cc3ccb64c5eb0ee2f))

## [5.0.0](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/compare/v4.1.0...v5.0.0) (2024-03-15)


### ⚠ BREAKING CHANGES

* remove long date formats

### Features

* remove long date formats ([bdc4079](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/bdc4079c12c42785033ffc0cc8f94bd321d36566))

## [4.1.0](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/compare/v4.0.0...v4.1.0) (2024-03-12)


### Features

* add dateformats without time ([4b3292d](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/4b3292df9dac0b26f0c6c276005060cab3fff98c))

## [4.0.0](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/compare/v3.1.0...v4.0.0) (2024-03-12)


### ⚠ BREAKING CHANGES

* remove StreamNodeSpecification.ts

### Features

* add JSON node output type ([c20e0d6](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/c20e0d6c19209bac89e7fd306dbc4fa08334750c))
* add options to STRING_SELECT input type ([097a2b7](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/097a2b7662d2500e00da0729aefd6c3c25f0c786))
* add STRING_PASSWORD input type ([5458bd5](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/5458bd5772f75a154c2bd4cfa0e59f9a16cff86a))
* remove STRING_SELECT node output type ([958f025](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/958f0256cbce65a17e44ab29024a144a3b55359b))


### Reverts

* feat: add more node output types ([ba244a4](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/ba244a45fe82b593d22b3c1195c2724a87d18871))
* feat: add OBJECT and LIST to node spec i/o type ([d2d057c](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/d2d057cfcd8d89ee72b977eb355531a25cfe7417))


### Code Refactoring

* remove StreamNodeSpecification.ts ([287b20d](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/287b20d78588e609249811c6c8ab543e5a1f9db0))

## [3.1.0](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/compare/v3.0.0...v3.1.0) (2024-03-12)


### Features

* add setAxios method ([195f09c](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/195f09c5b8b3f526228f545f6ca2b9d0cabae3d4))
* rename 'user-agent' header to 'x-hcloud-user-agent' ([866ce9b](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/866ce9b4fa30a2ab096f17c169d03bc6cbcaca9b))

## [3.0.0](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/compare/v2.0.0...v3.0.0) (2024-03-11)


### ⚠ BREAKING CHANGES

* replace "permissions" with "permissionOfUser" in returned space objects

### Features

* replace "permissions" with "permissionOfUser" in returned space objects ([4d1354a](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/4d1354a9c8ccdd5701e89f1ec74d7210fdff847c))

## [2.0.0](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/compare/v1.4.1...v2.0.0) (2024-03-11)


### ⚠ BREAKING CHANGES

* replace context join/leave with enabled

### Features

* replace context join/leave with enabled ([619a9b3](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/619a9b36eaa888f2d12af4e24bd18e77ecb4b059))

## [1.4.1](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/compare/v1.4.0...v1.4.1) (2024-03-11)


### Bug Fixes

* add missing type prop to DesignSnapshot ([f18e8ec](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/f18e8ec5f346d96c9688397b3d8af3da07f0a90c))

## [1.4.0](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/compare/v1.3.0...v1.4.0) (2024-03-06)


### Features

* add more node output types ([fb1f44a](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/fb1f44ae03cf582cd0164cf50f779db7b7d999ba))
* add OBJECT and LIST to node spec i/o type ([7b9e3ad](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/7b9e3ad841578804421e24305c8ad808d373f837))

## [1.3.0](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/compare/v1.2.0...v1.3.0) (2024-03-05)


### Features

* add new node spec category ([272293d](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/272293d2dd9d88b401e5cedea718456ff1cc1b0b))

## [1.2.0](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/compare/v1.1.0...v1.2.0) (2024-03-05)


### Features

* **wave:** add optional path & custom nodes to StreamNodeSpecification ([dd07707](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/dd0770768e9d59a8ff5a3805e25c27ce17160bf4))

## [1.1.0](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/compare/v1.0.0...v1.1.0) (2024-03-04)


### Features

* add additional properties to node specification ([ffa08a4](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/ffa08a431b6412e98a9edabe9020d38c2d5d992c))

## 1.0.0 (2024-02-29)


### Features

* add endpoint to resend an organization invitation email ([2e5ae20](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/2e5ae205990159013d831573dd476162e4994567))
* add payload to high5 execution log search response ([3c681a1](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/3c681a101f5271d0ab0f30447ba49417c0aa4f23))
* add support for POC and THIRD_PARTYS licenses ([2667550](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/2667550dd0cd3474a4b601eda44bfc316715bfd8))


### Bug Fixes

* add all necessary scope dependencies ([d4d9b5e](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/d4d9b5e75adc3b8cf0ad8fedc52e5d918867ada1))
* add all necessary scope dependencies ([c6536e4](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/c6536e43e88ab69fab8988db0853a3120a645a97))
* adjust OrgnizationMember object to fit return value ([d5cf76d](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/d5cf76dc0ec50b7d7dc4ea8c4d1e8c302bf4814c))
* getOrganization overload required undefined ([b108abc](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/b108abc561f609a5cd69528802a8ed3e01e0e04f))
* patchSpaceWaveEngine to accept object instead of string ([12bc002](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/12bc0020c9adc2963d221bbd3d15431bad85656b))
* patchTeam sends userIds intead of users ([7df27ec](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/7df27ec2841bf8d774bd51fbf1baff6aeea37732))
* removed tier from updateLicense and renamed uuid to identifier ([198ccb1](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/198ccb1760392307d1d6b5f600a762679f1088aa))
* rename design to content in DesignContent DTO ([df424d0](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/df424d01f327d7d7aef941684c63013d96c92901))
* replace url with relativeUrl ([828babc](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/828babc17336ca18623015ee511a52168822d93f))
* response interceptor will forward errors correctly ([12121d3](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/12121d33d35eeb3a517937769d9584f93fdbde97))
* space wave engine patch URL ([9647f86](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/9647f86bd60c7a955c3216d47445a99c0a20f151))
* this is no longer undefined in high5/secrets ([d1fc987](https://github.com/moovit-sp-gmbh/hcloud-sdk-js/commit/d1fc98765ee2d3b8f30285b4d581d17be4e9c536))
