H5PEditor Show When
==========

A widget which makes it possible to make a field show or hide dependent on rules. So far, this widget supports toggling visibility based on the value of list, library and boolean fields.

## Example of usage
### Using library selector as trigger
```json
{
  "label": "Max score",
  "name": "maxScore",
  "type": "number",
  "widget": "showWhen",
  "showWhen": {
    "rules": [
      {
        "field": "action",
        "equals": [
          "H5P.MultiChoice",
          "H5P.TrueFalse",
        ]
      }
    ]
  }
}
```
In the above example, the field will only be shown when *MultiChoice* or *TrueFalse* is selected in another field named *action* (which is a sibling of type *library*)

### Using boolean field as trigger
```json
"fields": [
  {
    "name": "initialFullscreen",
    "type": "boolean",
    "label": "Start in fullscreen mode",
    "default": true
  },
  {
    "name": "realFullscreen",
    "type": "boolean",
    "label": "Use browser's fullscreen mode",
    "default": false,
    "widget": "showWhen",
    "showWhen": {
      "rules": [
        {
          "field": "initialFullscreen",
          "equals": false
        }
      ]
    }
  }
]
```

### Using several fields as triggers
```json
{
  "name": "wearWarmCap",
  "label": "When this is enabled, a warm cap should be worn",
  "type": "boolean",
  "widget": "showWhen",
  "showWhen": {
    "type": "and",
    "detach": true,
    "rules": [
      {
        "field": "timeOfYear",
        "equals": [
          "winter"
        ]
      },
      {
        "field": "temperature",
        "equals": [
          "cold"
        ]
      }
    ]
  }
}
```
In the above example, this field will only be shown when the field *timeOfYear* equals *winter* and the field *temperature* equals *cold*.

### Triggering on a field located in another part of the semantic's tree structure
```json
"fields": [
  {
    "name": "a",
    "type": "group",
    "label": "A group",
    "fields": [
      {
        "name": "initialFullscreen",
        "type": "boolean",
        "label": "Start in fullscreen mode",
        "default": true
      }
    ]
  },
  {
    "name": "realFullscreen",
    "type": "boolean",
    "label": "Use browser's fullscreen mode",
    "default": false,
    "widget": "showWhen",
    "showWhen": {
      "rules": [
        {
          "field": "a/initialFullscreen",
          "equals": false
        }
      ]
    }
  }
]
```

### Triggering on a field located in another part of the semantic's tree structure - part 2
```json
"fields": [
  {
    "name": "a",
    "type": "group",
    "label": "Group A",
    "fields": [
      {
        "name": "initialFullscreen",
        "type": "boolean",
        "label": "Start in fullscreen mode",
        "default": true
      }
    ]
  },
  {
    "name": "b",
    "type": "group",
    "label": "Group B",
    "fields": [
      {
        "name": "realFullscreen",
        "type": "boolean",
        "label": "Use browser's fullscreen mode",
        "default": false,
        "widget": "showWhen",
        "showWhen": {
          "rules": [
            {
              "field": "../a/initialFullscreen",
              "equals": false
            }
          ]
        }
      }
    ]
  }
]
```

## config
When setting the widget to "showWhen", the "showWhen" parameter must be set. This parameter must be an object, and supports the following fields:
- type (optional): *and* or *or*, default is *or*.
- detach (optional): true or false. True means field is removed from DOM when hidden. Default behaviour is hiding it using CSS (display: none).
- rules: An array of rules, where each rule consist of the following parameters:
  - field: the path and name of the field
  - equals:
    - For type list and library: a list of values (strings) making this field being shown
    - For boolean: true or false

## License

(The MIT License)

Copyright (c) 2016 Joubel AS

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
