# TextInput

This is a component for a text `input` element, wrapped within a label. The following props are used:

| prop | type | description |
| :--- | :--- | :--- |
| `label` | String | what will the label read?|
| `name` | String | `name` attribute for the input|
| `value` | String | `value` attribute for the input|
| `disabled-state` | String (Enum) | setting for disabled state and rendering |

### Disabled Options

There is an attribute called `disabled-state` that can handle two different things: whether or not the input is disabled, and if it is how it will be perceived as disabled.

#### `true` - For Real Disabled

``` html
<id-input label="first name" name="firstName" value="Bana" disabled-state="true"></id-input>

<!-- renders as -->
<label>
  <p>first name</p>
  <input type="text" name="firstName" disabled="disabled" class="">
</label>
```

#### `false` - Not Disabled

``` html
<id-input label="first name" name="firstName" value="Bana" disabled-state="false"></id-input>

<!-- renders as -->
<label><p>first name</p><input type="text" name="firstName" class=""></label>
```

#### `pop` - Disabled But Looks Mostly Normal

``` html
<id-input label="first name" name="firstName" value="Bana" disabled-state="pop"></id-input>

<!-- renders as -->
<label>
  <p>first name</p>
  <input type="text" name="firstName" disabled="disabled" class="disabled-but-bright">
</label>
```
