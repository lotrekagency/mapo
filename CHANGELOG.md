# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.0.0-alpha.24](https://github.com/lotrekagency/mapo/compare/v1.0.0-alpha.23...v1.0.0-alpha.24) (2022-07-22)


### Bug Fixes

* **i18n:** use iso code for vuetify language code ([0683c78](https://github.com/lotrekagency/mapo/commit/0683c78ecf3f3e196b0fb6e7c8d007e20f12bf62))
* fixed login screen ([f925672](https://github.com/lotrekagency/mapo/commit/f92567288c07ae6162bfc14f2ac220aff193ad5f))
* **list:** pass selectionQuery to list actions ([7385daa](https://github.com/lotrekagency/mapo/commit/7385daaf6ef727123c966dec3747c1c18c54f73a))
* **listfilters:** added watch on list filters ([753f40e](https://github.com/lotrekagency/mapo/commit/753f40e7776935bc0f3e499c573868d5e7e0502d))


### Features

* **i18:** handle i18n on images' alt title tags ([3fb3f62](https://github.com/lotrekagency/mapo/commit/3fb3f62ae045b6610c881f90e31f0b5a242ce46b))
* **i18n:** handle translations on meta router ([2e20afe](https://github.com/lotrekagency/mapo/commit/2e20afedd34b42adb7d9cc53235a7e469ae67e9d))
* added language switcher ([6995542](https://github.com/lotrekagency/mapo/commit/6995542228acc8c603d28b29edf1abee02f23404))
* refactored translations, added vuetify translations ([bd37682](https://github.com/lotrekagency/mapo/commit/bd376820ad05a00f49088b9585b7bb26371e09f8))
* **form:** added vShow on tabs and groups ([631e43f](https://github.com/lotrekagency/mapo/commit/631e43f10c7614e87a393a688fa1339092ef0cb7))
* **i18n:** i18n for detail and form fields ([74760b1](https://github.com/lotrekagency/mapo/commit/74760b1c72314df34f3bb7e5dbaf95037d9c40fe))
* **i18n:** i18n on sidebar and list components ([64fb9a1](https://github.com/lotrekagency/mapo/commit/64fb9a152836b5620f52b1a448dc00ecafcd9ea3))
* **i18n:** setup on generic and media components ([f38588f](https://github.com/lotrekagency/mapo/commit/f38588f56aedbf9466af5c40296e35bf2765d036))





# [1.0.0-alpha.23](https://github.com/lotrekagency/mapo/compare/v1.0.0-alpha.22...v1.0.0-alpha.23) (2022-05-04)


### Bug Fixes

* **detail:** prevent rendering of fields until the model is fully loaded ([0421d79](https://github.com/lotrekagency/mapo/commit/0421d79ea1a1e15b37a5addfd7eebd0c83b23a96))
* **repeater:** better borders and padding for repeater lines ([07faf36](https://github.com/lotrekagency/mapo/commit/07faf36ac8d46c290cf12be41948f21a693e3da7))
* **seoPreview:** fix permalink preview to integrate the domain ([8bdd6a3](https://github.com/lotrekagency/mapo/commit/8bdd6a35ce9643206121d531ca07d083fe20c5b5))
* **utils:** better File recognition for deepClone util ([72a1002](https://github.com/lotrekagency/mapo/commit/72a1002144ff0be1c016a39f46f8ea712a950825))
* fix detail component not redirecting on save and continue action ([3ba4bb6](https://github.com/lotrekagency/mapo/commit/3ba4bb6457242e583ca43f42db070bde731b6c26))
* fix readonly fields in forms ([564a853](https://github.com/lotrekagency/mapo/commit/564a853f2c4d572cdb340d52b9801ad6d7f053d0))


### Features

* **forms:** update style of group and tabs ([a8d902b](https://github.com/lotrekagency/mapo/commit/a8d902b2b586563d765316cb5912d26df8144eae))
* added maxHeight prop to repeater ([5adc02e](https://github.com/lotrekagency/mapo/commit/5adc02efb07d2ca61f7265ec1c4d0377cdb76837))


### Performance Improvements

* **forms:** Decrease rendering time of form component, and all Components based on form ([22a191a](https://github.com/lotrekagency/mapo/commit/22a191a2f791a8dfe93336e53aec7cfbe3baa1f5))





# [1.0.0-alpha.22](https://github.com/lotrekagency/mapo/compare/v1.0.0-alpha.21...v1.0.0-alpha.22) (2022-05-01)


### Bug Fixes

* fix detail component slot bindings ([c4367a3](https://github.com/lotrekagency/mapo/commit/c4367a38336570e550024340725bca6da2fd2a06))
* fix form fields components discovery ([3f4fb0b](https://github.com/lotrekagency/mapo/commit/3f4fb0b3a5dc570c125f99f225bd4e2e557c453a))
* fix language switch in repeater ([76d4b80](https://github.com/lotrekagency/mapo/commit/76d4b80ac66fd5344a4b0deb7576dfb1a16b8f89))
* fix missing funtions in confs. this is a bit hacky. better to find a better solution ([e3117cf](https://github.com/lotrekagency/mapo/commit/e3117cf6b25bffcb87aac148d670e676869ddeda))
* fix repeater commands showing only on sidebar hover ([82de95d](https://github.com/lotrekagency/mapo/commit/82de95d66aa2edc85860c856a8288f468d8ee014))


### Features

* added a collapsed Label prop to define it in the repeater ([ec26fcb](https://github.com/lotrekagency/mapo/commit/ec26fcbf69c43e04cc9791ca7e5c88779c70372e))
* added a vShow callback prop to conditionally display a field ([c94a280](https://github.com/lotrekagency/mapo/commit/c94a280d16114a8b7480f5e22a81db46e8cc34d7))
* added collapsed mode to repeaters ([e99e2cd](https://github.com/lotrekagency/mapo/commit/e99e2cdc15c3f24c5b850b3e6ea1fc53685baccb))
* added onChange callback to fields ([f19a994](https://github.com/lotrekagency/mapo/commit/f19a9944aa7f6f5abacb70cdc3936c9db8df4176))
* big code refactor and improovements to fields management ([a818d8b](https://github.com/lotrekagency/mapo/commit/a818d8b891dbb4892f50267d6355c41297e2c6c6))
* Form component has now many more slots ([5db0da8](https://github.com/lotrekagency/mapo/commit/5db0da85d5adc6b19370dc1fdc06542048cc36ac))
* move vShow check in form component and add vVisible check ([c219cec](https://github.com/lotrekagency/mapo/commit/c219cec33b00d1b605522772f7ed57eed7c37fee))
* **form:** added tabs configuration to forms ([387e521](https://github.com/lotrekagency/mapo/commit/387e521422d0e8ac35817abdf36d927011c17798))
* **repeater:** now repeater with templates has more precise slots ([67eb56f](https://github.com/lotrekagency/mapo/commit/67eb56f66bda6f7ba6c85c5017bc4c216263e56a))





# [1.0.0-alpha.21](https://github.com/lotrekagency/mapo/compare/v1.0.0-alpha.20...v1.0.0-alpha.21) (2022-04-25)

**Note:** Version bump only for package mapo-monorepo





# [1.0.0-alpha.20](https://github.com/lotrekagency/mapo/compare/v1.0.0-alpha.19...v1.0.0-alpha.20) (2022-04-25)


### Features

* **repeater:** added multilanguage capabilities to Repeater Field ([4736d52](https://github.com/lotrekagency/mapo/commit/4736d52c0ef78adb0ac856056b950e7cfe7bfac1))
* **repeater:** added templates to repeater to compose rows block by block ([c2546b1](https://github.com/lotrekagency/mapo/commit/c2546b1f04f303ed4728624367de3b05010473e3))





# [1.0.0-alpha.19](https://github.com/lotrekagency/mapo/compare/v1.0.0-alpha.18...v1.0.0-alpha.19) (2022-04-06)


### Bug Fixes

* fix logout loop ([3177cca](https://github.com/lotrekagency/mapo/commit/3177ccaf4be6151feec379c4241f8784b79d4361))
* fix logout redirects ([113dd6b](https://github.com/lotrekagency/mapo/commit/113dd6bb984268c75f9f25f62cca1ed200c947ad))
* fix repeater field in production build ([7c10bcb](https://github.com/lotrekagency/mapo/commit/7c10bcb02aa5332247a6a6652a7aa834935d707e))





# [1.0.0-alpha.18](https://github.com/lotrekagency/mapo/compare/v1.0.0-alpha.17...v1.0.0-alpha.18) (2022-04-04)


### Bug Fixes

* fix core interceptor syntax ([c546a48](https://github.com/lotrekagency/mapo/commit/c546a48f22bf689d4b679aaab82b2b9ed62f26cc))


### Features

* Filefield opens files in popup window ([96be24a](https://github.com/lotrekagency/mapo/commit/96be24ac032005575b01f572d0b3211d03f92229))





# [1.0.0-alpha.17](https://github.com/lotrekagency/mapo/compare/v1.0.0-alpha.16...v1.0.0-alpha.17) (2022-04-03)


### Bug Fixes

* fix default dialogProps in quick edit component ([dd45bbd](https://github.com/lotrekagency/mapo/commit/dd45bbdee0cc68804cc6cad6ff2f672508fba6cd))
* various fixes to auth loops ([58cdb58](https://github.com/lotrekagency/mapo/commit/58cdb586e88df8e595876ba4dd4d4cc11865f7e3))





# [1.0.0-alpha.16](https://github.com/lotrekagency/mapo/compare/v1.0.0-alpha.15...v1.0.0-alpha.16) (2022-04-03)


### Bug Fixes

* **detail:** fix reference errors in detail component ([f5c3fb2](https://github.com/lotrekagency/mapo/commit/f5c3fb2eefb565ad4a0e58b8d899b86f683caa24))
* **list:** fix offlineMode data table reordering ([55eb55f](https://github.com/lotrekagency/mapo/commit/55eb55f9fc6b13c7052f946ead68a860cde89e06))
* **mediamanager:** fix dialog style ([732d748](https://github.com/lotrekagency/mapo/commit/732d74813d81dffc13530aa5a6c8ebf70513a6ef))
* **mediamanager:** fix media folder style ([0ac29c8](https://github.com/lotrekagency/mapo/commit/0ac29c84efbce03f70ae81cf7fb9d264fac40c4c))
* prevent filefield bad mount ([cc84540](https://github.com/lotrekagency/mapo/commit/cc84540bd9b93eba95fb8fb92a0862ddeedb0684))
* **repeater:** fix reordering animation ([fe192fe](https://github.com/lotrekagency/mapo/commit/fe192fe42c44f7f4985d3ba430d5b3dd2d1da692))


### Features

* Added mapo integrations module! 🎉 ([76d2c80](https://github.com/lotrekagency/mapo/commit/76d2c805245b4cf49a33696339da52e4c17f4053))
* **quick-edit:** added possibility to customize dialog props of ListQuickEdit ([f3028c0](https://github.com/lotrekagency/mapo/commit/f3028c0f1d5d5f4a93962158d55bcef3afc46dad))
* added mapo options to mapo helper ([38dcbf2](https://github.com/lotrekagency/mapo/commit/38dcbf28d286eb02c2a6785a883a14edaa0837b1))
* **repeater:** added readonly state to repeater field ([d2aa979](https://github.com/lotrekagency/mapo/commit/d2aa979ffb653e9d53c066fb321b8db679c3b51b))
* **theme:** added dark/light mode switcher ([1c45cb1](https://github.com/lotrekagency/mapo/commit/1c45cb1dd97f72c4fbf5e607c40e31c1ee615efb))


### BREAKING CHANGES

* This change removes all the camomilla cms references moving the compatibility layer in a detached package [mapo-integrations-camomilla](https://github.com/lotrekagency/mapo-integrations-camomilla). The guidelines to make mapo work with camomilla will be provided in the package readme.





# [1.0.0-alpha.15](https://github.com/lotrekagency/mapo/compare/v1.0.0-alpha.14...v1.0.0-alpha.15) (2022-03-11)


### Bug Fixes

* fix detail component for single translatable languages ([cab50e5](https://github.com/lotrekagency/mapo/commit/cab50e5f62ee0a23ae58831b6800d36ca1006377))
* fix detail-field bad mounting if v-model is too quick ([6198a7d](https://github.com/lotrekagency/mapo/commit/6198a7d695b6b5fee1f86030d8ca0c7fcfe232e4))
* fix media-field bad mounting if v-model is too quick ([335a7c2](https://github.com/lotrekagency/mapo/commit/335a7c2b5e1b164f1e741fdae3ecd45dc2bb4e0f))
* removed permanent scrollbar on page body ([2cb3f13](https://github.com/lotrekagency/mapo/commit/2cb3f132f00ee72f14c4327fd595340c9dcdac34))


### Features

* add sortable capabilities to repeater field ([c962f62](https://github.com/lotrekagency/mapo/commit/c962f626aaf84df4d57ede0b60aca34e4cbd10dd))
* add sortCallback also to add and remove items in Repeater field ([1ae82c3](https://github.com/lotrekagency/mapo/commit/1ae82c3f63dd7f7ab28e90b308ccdcdf69219226))
* added  Repeater field 🌶 ([f388094](https://github.com/lotrekagency/mapo/commit/f388094ebf93341f8559f13fd73ee1d2172cd73d))
* added loading status to fksfield while fetching options ([07137ee](https://github.com/lotrekagency/mapo/commit/07137ee5b0fcc2ee23df7687af0066555cf2a53e))
* enhance findPropPaths to deal also with arrays indexes ([158a9aa](https://github.com/lotrekagency/mapo/commit/158a9aa9329defbecbb39e1f19df2855dd3ece01))
* **list:** added filtersChange event ([3d2a560](https://github.com/lotrekagency/mapo/commit/3d2a5607e7ecb368314b192af5b58613c57ff9d0))
* manage backend errors on reordering ([1df55c2](https://github.com/lotrekagency/mapo/commit/1df55c22fe4def3723027a07845d9cd804e6ef3c))
* **ordering:** added sortablejs to drag and reorder list ([eb8bf21](https://github.com/lotrekagency/mapo/commit/eb8bf21c3178c3ad62db5aa7c06c0562e944dea6))





# [1.0.0-alpha.14](https://github.com/lotrekagency/mapo/compare/v1.0.0-alpha.13...v1.0.0-alpha.14) (2022-03-01)


### Features

* added default choice to filtering ([75d4cb6](https://github.com/lotrekagency/mapo/commit/75d4cb6a4dfde8afc26bffe4b9d88ac3929bbdcd))





# [1.0.0-alpha.13](https://github.com/lotrekagency/mapo/compare/v1.0.0-alpha.12...v1.0.0-alpha.13) (2022-03-01)


### Bug Fixes

* added missing error messages to media field ([1489001](https://github.com/lotrekagency/mapo/commit/148900133c1671acc5a47fe994b41db07013ab2a))
* clean default layout ([b32e5db](https://github.com/lotrekagency/mapo/commit/b32e5db6876420a3b53bb9da4cf13c7e53fb279f))
* fix back button in detail page when you came from login or when you have no window history ([7881004](https://github.com/lotrekagency/mapo/commit/78810046d91d02fcfa845bcc7fce95cb011a21ae))
* fix clipped state cookie parsing ([a07251c](https://github.com/lotrekagency/mapo/commit/a07251cf93c7a03937dc57bcf69408dc32310143))
* fix detail language load ([92a2718](https://github.com/lotrekagency/mapo/commit/92a271878b9f1f2585c3dcc18749adc7c7683ae1))
* fix error page style ([d8753a1](https://github.com/lotrekagency/mapo/commit/d8753a1ae0a2c857cd4a5417694c17bcf9a5bb9d))
* fix menu route building for nested folders ([1d15b17](https://github.com/lotrekagency/mapo/commit/1d15b17e3cbb75aa92e301429f667e119ecb9334))
* fix sidebar menu styling for nested long menus ([ba87f59](https://github.com/lotrekagency/mapo/commit/ba87f5912db02f86c857d237b5408094b63ed164))
* handle media manager requests errors. ([809704b](https://github.com/lotrekagency/mapo/commit/809704b7822b7991423e108bf1b8e398c19157e9))
* **detail:** set current lang at mount time ([46c98a7](https://github.com/lotrekagency/mapo/commit/46c98a76a2a787e752b7fea7e2442b719338aa6f))
* remove logout from sidebar if no user logged in ([e9d562b](https://github.com/lotrekagency/mapo/commit/e9d562b9f6f71a01f8235caa26c24a8f6d5c0f5d))
* remove remaining toc plugin configuration from tinymce ([9defb47](https://github.com/lotrekagency/mapo/commit/9defb47c5da6e8b7fa87ee39943f9a66d48ca538))
* remove toc and imagetools plugin from tinymce ([e1d12cf](https://github.com/lotrekagency/mapo/commit/e1d12cf72cf6aa488ed4135788fecd1ffa99da43))


### Features

* accept axios configuration in endpoint prop of FksField ([9dfca0b](https://github.com/lotrekagency/mapo/commit/9dfca0b5d2a488c0fdab5e8411454e7f0efe5904))
* added loading page before content retrieve in detail page ([4f26c03](https://github.com/lotrekagency/mapo/commit/4f26c037ab095f931a3ff430b07451de9bef504f))
* added login button to profile component if no user logged in ([354a25a](https://github.com/lotrekagency/mapo/commit/354a25a32164dc1d284cbe4542c65e04379b1c75))
* added minivariant to app store and save state on cookie ([dbcd60b](https://github.com/lotrekagency/mapo/commit/dbcd60ba59cdcd9abb4a9606904c8af3ea118f84))
* added snack message in the requst interceptor ([acf9cd1](https://github.com/lotrekagency/mapo/commit/acf9cd1efbabc13eb99af7f4bfe0dcf096112ec0))
* detached SidebarProfile from sidebar component ([92c2894](https://github.com/lotrekagency/mapo/commit/92c28941e6069bbc4e15775ea380c453c7267420))
* make all modals draggable 🛸 ([57da10d](https://github.com/lotrekagency/mapo/commit/57da10d17aa31d58e55fda5385d45d43beed8c4f))
* pass errors to slot bindings inDetail component ([9303b39](https://github.com/lotrekagency/mapo/commit/9303b39be40810e526ad5f89428812cd3e7b349d))





# [1.0.0-alpha.12](https://github.com/lotrekagency/mapo/compare/v1.0.0-alpha.11...v1.0.0-alpha.12) (2022-02-16)


### Bug Fixes

* **detail:** load v-model at mount time ([ad37268](https://github.com/lotrekagency/mapo/commit/ad3726832db1c7ae9e32c95fdeaf6d55b95224f0))


### Features

* added mapomedia to context menu and menubar replacing default image tool ([bb899d8](https://github.com/lotrekagency/mapo/commit/bb899d80c2f5835f1fb98fa9a0b3e3092b82951f))
* changed default primary color ([37c3599](https://github.com/lotrekagency/mapo/commit/37c35995cdf033a5bcbf0a0acf71e9efadf69995))





# [1.0.0-alpha.11](https://github.com/lotrekagency/mapo/compare/v1.0.0-alpha.10...v1.0.0-alpha.11) (2022-02-12)


### Bug Fixes

* add lower lever errors for nested fields ([beea774](https://github.com/lotrekagency/mapo/commit/beea774e977020e4728a5c7d06b038684cb89000))
* fix filefield clear button ([297b8de](https://github.com/lotrekagency/mapo/commit/297b8ded8070223ef59263c7fa136843f40442af))
* replace model with response in detail composnent ([77d9565](https://github.com/lotrekagency/mapo/commit/77d95658332acf6f14f33921768d512dc0037c3d))


### Features

* added brand new FileField ([6928b86](https://github.com/lotrekagency/mapo/commit/6928b86aadb24503b39722d17878660b1f053c3d))





# [1.0.0-alpha.10](https://github.com/lotrekagency/mapo/compare/v1.0.0-alpha.9...v1.0.0-alpha.10) (2022-02-11)


### Bug Fixes

* fix crud requests without multipart policy ([5875833](https://github.com/lotrekagency/mapo/commit/5875833209872a2609b653a089fff80c447b14e9))
* fix list table first entry key path (issue [#14](https://github.com/lotrekagency/mapo/issues/14)) ([f29f25a](https://github.com/lotrekagency/mapo/commit/f29f25ae1b593c0ecd83f6ab6ceac5a7eaa74e2d))
* fix objectHelper getPointed returning a keyerror when some point in path are missing ([6f1c2aa](https://github.com/lotrekagency/mapo/commit/6f1c2aa72176c9965e499135042de0646d9a04f8))


### Features

* **core:** Completely rewritten multipart capabilities, now the crud helper autodiscovers whet to use a multipart request. ([0a6546c](https://github.com/lotrekagency/mapo/commit/0a6546c9adeaf1fcf57a88105101e476b8b786dc))





# [1.0.0-alpha.9](https://github.com/lotrekagency/mapo/compare/v1.0.0-alpha.8...v1.0.0-alpha.9) (2022-02-08)


### Bug Fixes

* **core:** fix object setPointed to create missing nesting ([7a26510](https://github.com/lotrekagency/mapo/commit/7a26510d6c1648156bd5a8f18d3851e4fe195d29))
* **datefield:** graphic fix for datefield ([2cf2a8f](https://github.com/lotrekagency/mapo/commit/2cf2a8fe4a18717c6a1b1589e9fbc10273399fb5))
* **fksfield:** added fks alias to field ([d5b5ecf](https://github.com/lotrekagency/mapo/commit/d5b5ecf9f7bc7b270a8a2f22940281ef8453fb78))


### Features

* **detail:** added possibility to remove group icon in detail field configuration ([a8f63e0](https://github.com/lotrekagency/mapo/commit/a8f63e00a03b5467db057f6ab813621e480eaeae))
* **detailfield:** added hidden label to simplify external graphic personalization of fields ([4e1de0d](https://github.com/lotrekagency/mapo/commit/4e1de0d9a256241ce010daaf058b6282c7279808))





# [1.0.0-alpha.8](https://github.com/lotrekagency/mapo/compare/v1.0.0-alpha.7...v1.0.0-alpha.8) (2022-01-23)


### Bug Fixes

* **auth:** logout user only on 401 ([818f3d5](https://github.com/lotrekagency/mapo/commit/818f3d5ff315635438ac9bc9566a1b2fd2c5cf03))
* **detail:** fix lang switch crop in small devices ([fc05f1e](https://github.com/lotrekagency/mapo/commit/fc05f1e437c8c9318354a95c9edd19fb12e0cff9))
* **detailfield:** fix default prop handling ([b3297f1](https://github.com/lotrekagency/mapo/commit/b3297f10a1ca2bf8db1690c6dcf680baaf96f71b))
* **langs:** fixed lang detection from model api ([1653740](https://github.com/lotrekagency/mapo/commit/165374080e91571e89b1fc48f43983b681b1ffc0))
* **list:** remove quickadd if user cannot add ([aef919e](https://github.com/lotrekagency/mapo/commit/aef919ee94c71475b812378126369233df09d055))
* **login:** fix bad handling of login call ([2d73570](https://github.com/lotrekagency/mapo/commit/2d73570720c91cf8922ed750adeb8cf7f89360c7))
* **m2m:** let v-model be an object to let field manage fk ([5500870](https://github.com/lotrekagency/mapo/commit/550087025235adf5016ea9340090b3ce1278e126))
* **mediamanager:** fix linked models ([35611ed](https://github.com/lotrekagency/mapo/commit/35611ed104643c72d5317beef3349928eed09ee8))
* **permission:** fix bad store initialization on ssr ([f075824](https://github.com/lotrekagency/mapo/commit/f075824561d6a71ce07ecbba70e994102abd623b))
* **permissions:** add route permissions with routename instead on path ([16ff6ee](https://github.com/lotrekagency/mapo/commit/16ff6eee5e3a8ddbf9e7aea1ba05e8a88fb43932))
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
* **routeMeta:** added middleware to routemeta ([80bb2cd](https://github.com/lotrekagency/mapo/commit/80bb2cd767f87a0de485c0db7af31f4ad3b39dd3))
* **sidebar:** hide not navigable entries depending on user permissions ([349dd6c](https://github.com/lotrekagency/mapo/commit/349dd6c102cdf80d25de4db988f1ccf29047dfcd))
* **uikit:** more consistent ui style ([54c464f](https://github.com/lotrekagency/mapo/commit/54c464f0c8ea86d87e5ae2004b7744bb4126ebba))
* add error stack trace to node when the ssr session breaks ([8c835d7](https://github.com/lotrekagency/mapo/commit/8c835d73fa10959ed678a55642d30a588482a3d3))





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

* **core:** reject promise for crud methods if no endpoint was passed during configuration ([bb8d447](https://github.com/lotrekagency/mapo/commit/bb8d4474efe41af5d7f38dbcd47731133d6ba154))
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





# [1.0.0-alpha.3](https://github.com/lotrekagency/mapo/compare/v1.0.0-alpha.2...v1.0.0-alpha.3) (2021-10-25)


### Bug Fixes

* Corrected load order of modules to prevent missing mapo components in some circumstances ([4fa16fb](https://github.com/lotrekagency/mapo/commit/4fa16fb549ee0e6368fe724c8305ffc789d5c2fc))
