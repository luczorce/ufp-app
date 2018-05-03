# TextInput

This is a component for a text `input` element, wrapped within a label. The following props are used:

| prop | type | description |
| :--- | :--- | :--- |
| `label` | String | what will the label read?|
| `name` | String | `name` attribute for the input|
| `value` | String | `value` attribute for the input|
| `disabled` | Boolean | setting for disabled state |
| `bright-disabled` | Boolean | rendering for disabled state |

### Disabled Options

There is an attribute called `bright-disabled` that will alter the rendering for a disabled input. If the input shoul dbe disabled but still appear a bit brighter, more "readable", set this attribute to true.

#### `true` - For Real Disabled

``` html
<id-input label="first name" name="firstName" value="Bana" disabled="true"></id-input>

<!-- renders as -->
<label>
  <p>first name</p>
  <input type="text" name="firstName" disabled="disabled" class="">
</label>
```

#### `false` - Not Disabled

``` html
<id-input label="first name" name="firstName" value="Bana" disabled="false"></id-input>

<!-- renders as -->
<label><p>first name</p><input type="text" name="firstName" class=""></label>
```

#### `pop` - Disabled But Looks Mostly Normal

You can simply pass in the `bright-disabled` attribute for it to register as true. This styling has no effect on input elements that are not disabled.

``` html
<id-input label="first name" name="firstName" value="Bana" disabled="true" bright-disabled></id-input>

<!-- renders as -->
<label>
  <p>first name</p>
  <input type="text" name="firstName" disabled="disabled" class="disabled-but-bright">
</label>
```
