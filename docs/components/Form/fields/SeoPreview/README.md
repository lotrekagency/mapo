# SeoPreview

This component is used to make a preview of seo data.

## Props

<!-- @vuese:SeoPreview:props:start -->

|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|value|V-model for DetailField (need to be an object `{title, permalink, description}`)|`Object`|`false`|-|
|title|Seo title|`String`|`false`|-|
|permalink|Seo permalink|`String`|`false`|how-to-dive|
|description|Seo description|`String`|`false`|-|
|domain|-|`String`|`false`|process.browser ? `${window.location.origin}/` : ""|

<!-- @vuese:SeoPreview:props:end -->


