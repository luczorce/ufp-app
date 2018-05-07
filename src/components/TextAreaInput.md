# TextInput

This is a component for a `textarea` element, wrapped within a label. The following props are used:

| prop | type | description |
| :--- | :--- | :--- |
| `label` | String | what will the label read? |
| `name` | String | `name` attribute for the textarea |
| `value` | String | `value` attribute for the textarea |
| `state` | Number | whether or not we are in edit mode(0) or viewing privacy mode, public (1) or private (2) |
| `disabled` | Boolean | `disabled` attribute for the textarea |

``` html
<id-textarea label="hobbies" name="hobbies" />

<!-- renders as -->
<label>
  <p>hobbies</p>
  <textarea name="hobbies">
</label>
```
