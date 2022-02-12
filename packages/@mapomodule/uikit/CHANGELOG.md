# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-alpha.11](https://github.com/lotrekagency/mapo/compare/v1.0.0-alpha.10...v1.0.0-alpha.11) (2022-02-12)


### Bug Fixes

* add lower lever errors for nested fields ([beea774](https://github.com/lotrekagency/mapo/commit/beea774e977020e4728a5c7d06b038684cb89000))
* fix filefield clear button ([297b8de](https://github.com/lotrekagency/mapo/commit/297b8ded8070223ef59263c7fa136843f40442af))
* replace model with response in detail composnent ([77d9565](https://github.com/lotrekagency/mapo/commit/77d95658332acf6f14f33921768d512dc0037c3d))


### Features

* added brand new FileField ([6928b86](https://github.com/lotrekagency/mapo/commit/6928b86aadb24503b39722d17878660b1f053c3d))





# [1.0.0-alpha.10](https://github.com/lotrekagency/mapo/compare/v1.0.0-alpha.9...v1.0.0-alpha.10) (2022-02-11)


### Bug Fixes

* fix list table first entry key path (issue [#14](https://github.com/lotrekagency/mapo/issues/14)) ([f29f25a](https://github.com/lotrekagency/mapo/commit/f29f25ae1b593c0ecd83f6ab6ceac5a7eaa74e2d))


### Features

* **core:** Completely rewritten multipart capabilities, now the crud helper autodiscovers whet to use a multipart request. ([0a6546c](https://github.com/lotrekagency/mapo/commit/0a6546c9adeaf1fcf57a88105101e476b8b786dc))





# [1.0.0-alpha.9](https://github.com/lotrekagency/mapo/compare/v1.0.0-alpha.8...v1.0.0-alpha.9) (2022-02-08)


### Bug Fixes

* **datefield:** graphic fix for datefield ([2cf2a8f](https://github.com/lotrekagency/mapo/commit/2cf2a8fe4a18717c6a1b1589e9fbc10273399fb5))
* **fksfield:** added fks alias to field ([d5b5ecf](https://github.com/lotrekagency/mapo/commit/d5b5ecf9f7bc7b270a8a2f22940281ef8453fb78))


### Features

* **detail:** added possibility to remove group icon in detail field configuration ([a8f63e0](https://github.com/lotrekagency/mapo/commit/a8f63e00a03b5467db057f6ab813621e480eaeae))
* **detailfield:** added hidden label to simplify external graphic personalization of fields ([4e1de0d](https://github.com/lotrekagency/mapo/commit/4e1de0d9a256241ce010daaf058b6282c7279808))





# [1.0.0-alpha.8](https://github.com/lotrekagency/mapo/compare/v1.0.0-alpha.7...v1.0.0-alpha.8) (2022-01-23)


### Bug Fixes

* **detail:** fix lang switch crop in small devices ([fc05f1e](https://github.com/lotrekagency/mapo/commit/fc05f1e437c8c9318354a95c9edd19fb12e0cff9))
* **detailfield:** fix default prop handling ([b3297f1](https://github.com/lotrekagency/mapo/commit/b3297f10a1ca2bf8db1690c6dcf680baaf96f71b))
* **langs:** fixed lang detection from model api ([1653740](https://github.com/lotrekagency/mapo/commit/165374080e91571e89b1fc48f43983b681b1ffc0))
* **list:** remove quickadd if user cannot add ([aef919e](https://github.com/lotrekagency/mapo/commit/aef919ee94c71475b812378126369233df09d055))
* **login:** fix bad handling of login call ([2d73570](https://github.com/lotrekagency/mapo/commit/2d73570720c91cf8922ed750adeb8cf7f89360c7))
* **m2m:** let v-model be an object to let field manage fk ([5500870](https://github.com/lotrekagency/mapo/commit/550087025235adf5016ea9340090b3ce1278e126))
* **mediamanager:** fix linked models ([35611ed](https://github.com/lotrekagency/mapo/commit/35611ed104643c72d5317beef3349928eed09ee8))
* **permissions:** collect route middleware info directly from ([e1937cc](https://github.com/lotrekagency/mapo/commit/e1937cc835cd4d331a43c4bbf9581c16bfc03f41))
* **quickedit:** fix close button position ([8e15d47](https://github.com/lotrekagency/mapo/commit/8e15d47c6dd69dfbb2cbf3f70f2fb342202bf9a2))
* **quickedit:** temporary disable patch diff to fix translation problems ([1ec4b04](https://github.com/lotrekagency/mapo/commit/1ec4b04723d2d25ffdabfb5e5e69dd7c66735fe4))
* **sidebar:** fix footer menu auth ([6a986ba](https://github.com/lotrekagency/mapo/commit/6a986ba6def87a341e2bf670278716811336c725))
* **snackbar:** fix snack color ([9fcc053](https://github.com/lotrekagency/mapo/commit/9fcc053a1a52c3970706dcb4393be3aec0aa8c55))
* fix m2mfield for null values ([fbdf045](https://github.com/lotrekagency/mapo/commit/fbdf0456660b4cc6f46ac7d0ca40278451e87059))
* **uikit:** fix color mismatch in some components ([06cc23c](https://github.com/lotrekagency/mapo/commit/06cc23c8835c891e9ff15d277ba8bc4e54f1b8b8))


### Features

* **detail:** added permission logics to detail component ([475d063](https://github.com/lotrekagency/mapo/commit/475d063ac1979380ec64afc057786a6b2ec142ba))
* **detail:** added permission logics to list actions component ([eebe25a](https://github.com/lotrekagency/mapo/commit/eebe25a8e0ef6f7d89dd7e1eca762d65ecc090a0))
* **detail:** added permission logics to list component ([83343ca](https://github.com/lotrekagency/mapo/commit/83343ca4038002d4528de0ec5d746c4420d5d157))
* **detail:** added permission logics to list head component ([95a37a2](https://github.com/lotrekagency/mapo/commit/95a37a2139726eed85824cf425dd15022d37bf88))
* **detail:** show backend error messages on model update ([a456a81](https://github.com/lotrekagency/mapo/commit/a456a81610b7b95e231f33cc35f2c87fb9a80071))
* **fields:** added readonly prop to date custom field ([682bab5](https://github.com/lotrekagency/mapo/commit/682bab59ce88a0dbfa1be644103ccf8b0cb6bf41))
* **fields:** added readonly prop to various custom fields ([ed45190](https://github.com/lotrekagency/mapo/commit/ed45190cec6250bb26e91b26dc570e07e0fd800c))
* **m2m:** added autocomplete by default ([1956427](https://github.com/lotrekagency/mapo/commit/19564271f71a289d840a3e1200098e911935da4f))
* **m2m:** autodisable chips if multiple = false ([5dcc88d](https://github.com/lotrekagency/mapo/commit/5dcc88d671b4c06bd378573a27c9bc1b44b4b736))
* **m2m:** restyle m2m field ([bb49f3d](https://github.com/lotrekagency/mapo/commit/bb49f3dbf9ba3d6fb2a78e69113645fdde2e1cce))
* **M2m:** added max height ([d32a383](https://github.com/lotrekagency/mapo/commit/d32a3831f903d20924408536b2921fba3f5e683e))
* **quickedit:** add close button on hover ([c365f51](https://github.com/lotrekagency/mapo/commit/c365f515dbb2edbf9d964c63b170bf3247309d70))
* **quickedit:** added non field errors ([4b63e73](https://github.com/lotrekagency/mapo/commit/4b63e734818a0d690831c39ccbe73403400dffd4))
* **quickedit:** merge detail component logics in to quickedit ([691f610](https://github.com/lotrekagency/mapo/commit/691f610b156f58a5d30598d89bf06425d90451d8))
* **sidebar:** hide not navigable entries depending on user permissions ([349dd6c](https://github.com/lotrekagency/mapo/commit/349dd6c102cdf80d25de4db988f1ccf29047dfcd))
* **uikit:** more consistent ui style ([54c464f](https://github.com/lotrekagency/mapo/commit/54c464f0c8ea86d87e5ae2004b7744bb4126ebba))





# [1.0.0-alpha.7](https://github.com/lotrekagency/mapo/compare/v1.0.0-alpha.6...v1.0.0-alpha.7) (2022-01-13)


### Bug Fixes

* **detail:** fix v-card content margin on detail component ([f07d5c1](https://github.com/lotrekagency/mapo/commit/f07d5c1581e71407e79fce95c8dc10109196ed0b))
* **detail:** remove lang swtch if only one lang is selected ([35cf58a](https://github.com/lotrekagency/mapo/commit/35cf58aa17ce4350f983643a8182fdf795dd4abb))
* **detail:** remove v-container from detail component to fix sizing ([2947652](https://github.com/lotrekagency/mapo/commit/29476528a6c13325c4da49a3e2aa842302e6bd04))
* **list:** fix search box for very small displays ([edf7287](https://github.com/lotrekagency/mapo/commit/edf7287c6974b8bb1412d9e0fb8bc4b1f1b48480))
* **media:** fix reset on media dialog ([3727502](https://github.com/lotrekagency/mapo/commit/3727502b59c9fa809b4dbc139b0cd01198008a18))
* **media:** reset media dialog after close ([5aded79](https://github.com/lotrekagency/mapo/commit/5aded794dbfb5482119db45bfb975e7241f86f15))
* **mediamanager:** better display of folder path in media manager ([bdc5692](https://github.com/lotrekagency/mapo/commit/bdc569264164e61af1c210aeb1c5da9d5b21220a))
* **mediamanager:** better ui for selection ([2307d38](https://github.com/lotrekagency/mapo/commit/2307d38a5a4e0fe838b5f9173692e132fe69e3be))
* **mediamanager:** fix backbutton background in media editor ([315d9df](https://github.com/lotrekagency/mapo/commit/315d9df2a9021ee1ea1328b4d959f0fd5f652f47))
* **mediamanager:** fix corb errors loading image preview in mediamanager ([7f34e34](https://github.com/lotrekagency/mapo/commit/7f34e34dfdfe4380d1704c0c8dda0a507676aeae))
* **mediamanager:** fix DOMException: The play() request was interrupted ([89a2a3e](https://github.com/lotrekagency/mapo/commit/89a2a3e1bb47178245ca7d131bdfedbcbcc41c17))
* **mediamanager:** fix editor opening ([3888652](https://github.com/lotrekagency/mapo/commit/3888652b0441cd17f0468db57fd895afd97a3625))
* **mediamanager:** make editing animation smooth ([81bd34b](https://github.com/lotrekagency/mapo/commit/81bd34b04d0d561317a1928dcdc796adc539350b))
* **mediamanager:** minor fixes to mediamanager ui ([a7b6089](https://github.com/lotrekagency/mapo/commit/a7b6089c38af9a6079bd8bebfeddd2dcff0b2c75))
* **mediamanager:** prevent media type check fail if no media type present ([2ee88fe](https://github.com/lotrekagency/mapo/commit/2ee88fed81d527434cf854e68ff8210247b2cf39))
* **mediamanagerdialog:** better positioning on small device of media manager dialog content ([9da147c](https://github.com/lotrekagency/mapo/commit/9da147c7e2d356da7f74e2edcbf05c5dafcbd94d))
* **sidebar:** fix nested SidebarListItems not triggering active class when the list-item is not a link ([9e92971](https://github.com/lotrekagency/mapo/commit/9e929710e74946c1470c29c007d780a1e712170b))
* **tinymce:** added missing al text to image tag ([55a3926](https://github.com/lotrekagency/mapo/commit/55a39261b3e449381d974eaa1b328a46dffb6f51))
* **uikit:** fix some content disposition in main layout ([1e9c79b](https://github.com/lotrekagency/mapo/commit/1e9c79b6b80d781c5aded10800c9df255b6ef8e8))


### Features

* **media:** added mime type filtering ([da01658](https://github.com/lotrekagency/mapo/commit/da016585d450143f6419d98a7f53ee5ec8cf7358))
* **media:** added search input ([a1ac6ae](https://github.com/lotrekagency/mapo/commit/a1ac6aef8d28a248431cd80955c5a1446f41f608))
* **media:** selection prop 2-way binded ([e87f21c](https://github.com/lotrekagency/mapo/commit/e87f21c085e0cf0a61a99025d9f5e7970285ab72))
* **mediafield:** update media field to handle files ([5158108](https://github.com/lotrekagency/mapo/commit/51581086d96e09af31471721f0ea32df3fe58e09))
* **mediamanager:** added audio playback for audio files ([6aec9f7](https://github.com/lotrekagency/mapo/commit/6aec9f7b749c5002832fd194d565742b99a4b700))
* **mediamanager:** added icon for media that are not images ([d77f17b](https://github.com/lotrekagency/mapo/commit/d77f17b2d77db7bf4dc387be0b6d3892a4772b02))
* **mediamanager:** added link to img shortcut button in editor ([1dd446f](https://github.com/lotrekagency/mapo/commit/1dd446f76df1d3a7e71fdefb81ad60de1fdb4e93))
* **mediamanager:** added the possibility to change the media file using same url of the old file ([f21f383](https://github.com/lotrekagency/mapo/commit/f21f383b6f3f0176f806688a50ebff93a53d3203))
* **mediamanager:** added video preview for video mime types ([55fc423](https://github.com/lotrekagency/mapo/commit/55fc423c03265fb2c17bc42f1be0ba511928267c))
* **mediamanager:** many ui enhancements for mediamanager ([30ab3ff](https://github.com/lotrekagency/mapo/commit/30ab3ff89dc0ff3b9a210cfd32e2a874dfc073a6))
* **mediamanager:** media folders manager graphic enhancements ([0e8e7ec](https://github.com/lotrekagency/mapo/commit/0e8e7ec35482d043c42c88c38c9d32c8fa8e54e9))
* **sidebar:** added spidermenu for nested routes ([084029d](https://github.com/lotrekagency/mapo/commit/084029de717f29412b045fe703c4cfbd19353400))
* **tinymce:** added callback to manage video and documents insertions with mapomedia plugin ([b4e6f63](https://github.com/lotrekagency/mapo/commit/b4e6f6362e025010614e7ca8351a9d1e3af08650))





# [1.0.0-alpha.6](https://github.com/lotrekagency/mapo/compare/v1.0.0-alpha.5...v1.0.0-alpha.6) (2021-12-26)


### Bug Fixes

* **uikit:** fix sidebar footer items not collapsing on mini variant ([04c510e](https://github.com/lotrekagency/mapo/commit/04c510ee87bd7b74161725c366e2eac2bd3efe9f))
* **uikit:** fix sidebar items not collapsing on mini variant ([67a9524](https://github.com/lotrekagency/mapo/commit/67a9524b17b6cbdf455b8e6f56f7cc0674b1dbed))
* various css fixes ([658c363](https://github.com/lotrekagency/mapo/commit/658c3636e869f0a2bd53efe41295cf87d6af3962))
* **list:** fix v-menu position on large screens ([41bd08d](https://github.com/lotrekagency/mapo/commit/41bd08d36d85e685a755c7e0de97bbb05a24c03d))
* **list:** fixed v-menu filter positioning ([e99848e](https://github.com/lotrekagency/mapo/commit/e99848e0beb2df124db1ba9968696bbe8ee7b683))
* **list:** fixed v-menu position for filters ([cb95260](https://github.com/lotrekagency/mapo/commit/cb9526085d536ff7b468316b1d2571c7ae9509d8))
* **list:** load page from query params ([88dea98](https://github.com/lotrekagency/mapo/commit/88dea98063cdab79c9c518fe0e3bf8d3c90f0161))
* **list:** refactoring for injected elements and FE pagination ([f9c968e](https://github.com/lotrekagency/mapo/commit/f9c968e0edf87654df60781d7d2d465d15e40ab9))
* **list:** removed lock to BE pagination if items in list are less than itemsPerPage ([3fe34e0](https://github.com/lotrekagency/mapo/commit/3fe34e0d1438a0980e8819070f9b158ad3b6e0b8))
* **uikit:** better handle detail component lang switches ([5297e49](https://github.com/lotrekagency/mapo/commit/5297e4956536b382600c250f5c797c8db5e58f84))
* **uikit:** fix detailfield not reading conf value changes ([5628268](https://github.com/lotrekagency/mapo/commit/5628268e4e78201523eba60adaf17286dfb38c8b))
* **uikit:** fix lang changhe in detail component ([32494f7](https://github.com/lotrekagency/mapo/commit/32494f7d094f7e9cebc14f7524ad716eb89fd6d7))
* **uikit:** fix positioning of element in list component and subcomponents ([887c3b6](https://github.com/lotrekagency/mapo/commit/887c3b6aae52d1a3494ebcc01f0f155f21373f9c))
* **uikit:** set endpoint to default null in detail field ([5c9296c](https://github.com/lotrekagency/mapo/commit/5c9296c81f8667319699e933f528c4c05a1f541d))
* fixed v-model with datepicker filter ([ef4634e](https://github.com/lotrekagency/mapo/commit/ef4634e8ad0719ec2991a8c40a87191c0e32d7ec))
* load saved date range into datepicker ([eb94dd5](https://github.com/lotrekagency/mapo/commit/eb94dd5686b9fed16e0f39bf122c767d8bd1017b))


### Features

* **list:** added support to offline items ([495fd1f](https://github.com/lotrekagency/mapo/commit/495fd1f30cd0adc228b48ca4384b9df572e69216))
* **list:** handle multisort ([41feb88](https://github.com/lotrekagency/mapo/commit/41feb88ec15be5cc9afbcdf3d2dea23142301153))
* **uikit:** add possibility to remove icon from sidebar ([106d85f](https://github.com/lotrekagency/mapo/commit/106d85f576cdc9e6438b48fa8e695315cac2262b))
* **uikit:** added langChange event to detail component ([70d3430](https://github.com/lotrekagency/mapo/commit/70d3430694e67dfcd65539a3d474847123e05db5))
* **uikit:** added possibility to change detail component current lang fromprop ([1993aa7](https://github.com/lotrekagency/mapo/commit/1993aa74a66768eea319f41a41878916544adcbb))
* **uikit:** added possibility to override field container class in detail component with key class in field configuration ([afe1e52](https://github.com/lotrekagency/mapo/commit/afe1e522683d08c5e63650e55dbe2f9a9404e681))
* **uikit:** added seopreview field ([03e52fe](https://github.com/lotrekagency/mapo/commit/03e52fed08e60c8b43226856a8d05d4c724ad9b2))
* **uikit:** added v-model to Detail Component, now you can bind the payload externally from detail field. ([a50b082](https://github.com/lotrekagency/mapo/commit/a50b08261d6b8eba3e5b6f1ea2f1f4bb0d591b8e))
* **uikit:** display errors on tinymce component also with red label shake animation ([2c9e158](https://github.com/lotrekagency/mapo/commit/2c9e158090ee1f770518ad755437171a1b16afbd))
* **uikit:** newsidebar built with vuetify components to better support theming ([9cc237f](https://github.com/lotrekagency/mapo/commit/9cc237fa7dcfe193edc0fd9cb90e3bbbb103931d))





# [1.0.0-alpha.5](https://github.com/lotrekagency/mapo/compare/v1.0.0-alpha.4...v1.0.0-alpha.5) (2021-12-20)


### Bug Fixes

* **uikit:** fix list component http call with no pagination at all ([ebe4b61](https://github.com/lotrekagency/mapo/commit/ebe4b617f3be5ccb70c10c041c81868e9ee6b828))


### Features

* added search field on list component ([0c845e2](https://github.com/lotrekagency/mapo/commit/0c845e26e30afed66b351cc7a0f940f9a20e0943))
* select all option on list component ([588d2c5](https://github.com/lotrekagency/mapo/commit/588d2c57ca5fd36477cf1ee3c33e2289eb979acf))
* slot for selected items' counter ([0551b5e](https://github.com/lotrekagency/mapo/commit/0551b5e916f25fc740a0cae58c5548ab0c6e35ff))





# [1.0.0-alpha.4](https://github.com/lotrekagency/mapo/compare/v1.0.0-alpha.3...v1.0.0-alpha.4) (2021-10-25)


### Bug Fixes

* Display corret version of mapo in index page ([22ae4cf](https://github.com/lotrekagency/mapo/commit/22ae4cf55f1f3c6fcda64b085fe3c13c416bafb8))
