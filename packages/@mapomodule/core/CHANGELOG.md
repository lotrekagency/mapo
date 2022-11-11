# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-alpha.34](https://github.com/lotrekagency/mapo/compare/v1.0.0-alpha.33...v1.0.0-alpha.34) (2022-11-11)


### Features

* default upload in multipart autodiscover ([b153307](https://github.com/lotrekagency/mapo/commit/b15330725a64a0931d2de49929a01e3a7319b382))





# [1.0.0-alpha.31](https://github.com/lotrekagency/mapo/compare/v1.0.0-alpha.30...v1.0.0-alpha.31) (2022-09-14)


### Bug Fixes

* **interceptor:** remove token injection for axios requests ([59b2f5c](https://github.com/lotrekagency/mapo/commit/59b2f5cb3dfd0becd78df02f30bc32967643e276))
* **middleware:** fix auth middleware to correclty redirect based on router base ([1d49cd7](https://github.com/lotrekagency/mapo/commit/1d49cd72e141888ef7aae91ac0ddb13f8d0fce7a))





# [1.0.0-alpha.30](https://github.com/lotrekagency/mapo/compare/v1.0.0-alpha.29...v1.0.0-alpha.30) (2022-09-13)

**Note:** Version bump only for package @mapomodule/core





# [1.0.0-alpha.27](https://github.com/lotrekagency/mapo/compare/v1.0.0-alpha.26...v1.0.0-alpha.27) (2022-08-25)


### Bug Fixes

* remove unused options plugin ([45004bb](https://github.com/lotrekagency/mapo/commit/45004bb158267c7e2f7795c1d12cf568f9d7ded2))





# [1.0.0-alpha.23](https://github.com/lotrekagency/mapo/compare/v1.0.0-alpha.22...v1.0.0-alpha.23) (2022-05-04)

**Note:** Version bump only for package @mapomodule/core





# [1.0.0-alpha.22](https://github.com/lotrekagency/mapo/compare/v1.0.0-alpha.21...v1.0.0-alpha.22) (2022-05-01)

**Note:** Version bump only for package @mapomodule/core





# [1.0.0-alpha.19](https://github.com/lotrekagency/mapo/compare/v1.0.0-alpha.18...v1.0.0-alpha.19) (2022-04-06)


### Bug Fixes

* fix logout loop ([3177cca](https://github.com/lotrekagency/mapo/commit/3177ccaf4be6151feec379c4241f8784b79d4361))





# [1.0.0-alpha.18](https://github.com/lotrekagency/mapo/compare/v1.0.0-alpha.17...v1.0.0-alpha.18) (2022-04-04)


### Bug Fixes

* fix core interceptor syntax ([c546a48](https://github.com/lotrekagency/mapo/commit/c546a48f22bf689d4b679aaab82b2b9ed62f26cc))





# [1.0.0-alpha.17](https://github.com/lotrekagency/mapo/compare/v1.0.0-alpha.16...v1.0.0-alpha.17) (2022-04-03)


### Bug Fixes

* various fixes to auth loops ([58cdb58](https://github.com/lotrekagency/mapo/commit/58cdb586e88df8e595876ba4dd4d4cc11865f7e3))





# [1.0.0-alpha.16](https://github.com/lotrekagency/mapo/compare/v1.0.0-alpha.15...v1.0.0-alpha.16) (2022-04-03)


### Features

* Added mapo integrations module! 🎉 ([76d2c80](https://github.com/lotrekagency/mapo/commit/76d2c805245b4cf49a33696339da52e4c17f4053))
* added mapo options to mapo helper ([38dcbf2](https://github.com/lotrekagency/mapo/commit/38dcbf28d286eb02c2a6785a883a14edaa0837b1))


### BREAKING CHANGES

* This change removes all the camomilla cms references moving the compatibility layer in a detached package [mapo-integrations-camomilla](https://github.com/lotrekagency/mapo-integrations-camomilla). The guidelines to make mapo work with camomilla will be provided in the package readme.





# [1.0.0-alpha.15](https://github.com/lotrekagency/mapo/compare/v1.0.0-alpha.14...v1.0.0-alpha.15) (2022-03-11)


### Features

* **ordering:** added sortablejs to drag and reorder list ([eb8bf21](https://github.com/lotrekagency/mapo/commit/eb8bf21c3178c3ad62db5aa7c06c0562e944dea6))





# [1.0.0-alpha.13](https://github.com/lotrekagency/mapo/compare/v1.0.0-alpha.12...v1.0.0-alpha.13) (2022-03-01)


### Features

* added snack message in the requst interceptor ([acf9cd1](https://github.com/lotrekagency/mapo/commit/acf9cd1efbabc13eb99af7f4bfe0dcf096112ec0))





# [1.0.0-alpha.10](https://github.com/lotrekagency/mapo/compare/v1.0.0-alpha.9...v1.0.0-alpha.10) (2022-02-11)


### Bug Fixes

* fix crud requests without multipart policy ([5875833](https://github.com/lotrekagency/mapo/commit/5875833209872a2609b653a089fff80c447b14e9))


### Features

* **core:** Completely rewritten multipart capabilities, now the crud helper autodiscovers whet to use a multipart request. ([0a6546c](https://github.com/lotrekagency/mapo/commit/0a6546c9adeaf1fcf57a88105101e476b8b786dc))





# [1.0.0-alpha.9](https://github.com/lotrekagency/mapo/compare/v1.0.0-alpha.8...v1.0.0-alpha.9) (2022-02-08)

**Note:** Version bump only for package @mapomodule/core





# [1.0.0-alpha.8](https://github.com/lotrekagency/mapo/compare/v1.0.0-alpha.7...v1.0.0-alpha.8) (2022-01-23)


### Bug Fixes

* **auth:** logout user only on 401 ([818f3d5](https://github.com/lotrekagency/mapo/commit/818f3d5ff315635438ac9bc9566a1b2fd2c5cf03))
* **permission:** fix bad store initialization on ssr ([f075824](https://github.com/lotrekagency/mapo/commit/f075824561d6a71ce07ecbba70e994102abd623b))
* **permissions:** add route permissions with routename instead on path ([16ff6ee](https://github.com/lotrekagency/mapo/commit/16ff6eee5e3a8ddbf9e7aea1ba05e8a88fb43932))





# [1.0.0-alpha.6](https://github.com/lotrekagency/mapo/compare/v1.0.0-alpha.5...v1.0.0-alpha.6) (2021-12-26)


### Features

* **core:** reject promise for crud methods if no endpoint was passed during configuration ([bb8d447](https://github.com/lotrekagency/mapo/commit/bb8d4474efe41af5d7f38dbcd47731133d6ba154))
