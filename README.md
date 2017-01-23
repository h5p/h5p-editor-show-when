H5PEditor Show When
==========

A widget which makes it possible to make a field show or hide dependent on rules. So far, this widget supports toggling visibility based on a list or a library selectors selected value.

## Example of usage
From semantics.json:
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

Another example:
```json
{
  "name": "forceFullScreenWidthThreshold",
  "label": "Force fullscreen mode when narrower than (in pixels)",
  "type": "number",
  "min": 0,
  "widget": "showWhen",
  "showWhen": {
    "rules": [
      {
        "field": "fullScreenMode",
        "equals": [
          "dynamic"
        ]
      }
    ]
  }
}
```
In the above example, this field will only be shown when the author has selected *dynamic* in the *fullScreenMode* field.

## License

(The MIT License)

Copyright (c) 2016 Joubel AS

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
