H5PEditor.ShowWhen = (function ($) {

  // Handler for the 'select' semantics type
  function SelectHandler(field, equals) {
    this.satisfied = function () {
      return (equals.indexOf(field.value) !== -1);
    };
  }

  // Handler for the 'library' semantics type
  function LibraryHandler(field, equals) {
    this.satisfied = function () {
      var value;
      if (field.currentLibrary !== undefined && field.params.library) {
        value = field.currentLibrary.split(' ')[0];
      }
      return (equals.indexOf(value) !== -1);
    };
  }

  function BooleanHandler(field, equals) {
    this.satisfied = function () {
      return field.value === equals;
    };
  }

  // Factory method for creating handlers
  // "library", "select" and "boolean" semantics types supported so far
  function createFieldHandler(field, equals) {
    if (field.field.type === 'library') {
      return new LibraryHandler(field, equals);
    }
    else if (field.field.type === 'select') {
      return new SelectHandler(field, equals);
    }
    else if (field.field.type === 'boolean') {
      return new BooleanHandler(field, equals);
    }
  }

  // Handling rules
  function RuleHandler(type) {
    var TYPE_AND = 'and';
    var TYPE_OR = 'or';
    var handlers = [];

    type = type || TYPE_OR;

    this.add = function (handler) {
      handlers.push(handler);
    };

    // Check if rules are satisfied
    this.rulesSatisfied = function () {
      for (var i = 0; i < handlers.length; i++) {
        // check if rule was hit
        var ruleHit = handlers[i].satisfied();

        if (ruleHit && type === TYPE_OR) {
          return true;
        }
        else if (type === TYPE_AND && !ruleHit) {
          return false;
        }
      }

      return (type === TYPE_AND);
    };
  }

  // Apply the rules. Yes, many parameters ...
  function applyRuleHandler(parent, rule, targetField, ruleHandler, config, showing, self, $wrapper) {
    var handler = createFieldHandler(targetField, rule.equals);

    if (handler !== undefined) {
      ruleHandler.add(handler);
      H5PEditor.followField(parent, rule.field, config.detach ? function () {
        if (showing != ruleHandler.rulesSatisfied()) {
          showing = !showing;
          if (showing) {
            $wrapper.appendTo(self.$container);
          }
          else {
            $wrapper.detach();
          }
        }
      } : function () {
        showing = ruleHandler.rulesSatisfied();
        $wrapper.toggleClass('hidden', !showing);
      });
    }
  }

  /*
   * The target field has not yet been initializes, so wait for each parent field
   * to be ready and search again. Can't just wait for the tree to be loaded,
   * as some fields (like lists) will hold back ready callbacks.
   */
  function waitForParents(parent, rule, targetField, ruleHandler, config, showing, self, $wrapper) {
    if (!parent || !parent.parent) {
      return; // At form's top level
    }

    parent.ready(function () {
      // Search this parent
      var targetField = H5PEditor.findField(rule.field, parent);

      if (!targetField) {
        throw new Error('The path to the triggering field for showWhen seems to be wrong');
      }

      applyRuleHandler(parent, rule, targetField, ruleHandler, config, showing, self, $wrapper);
    });

    if (parent.parent && typeof parent.parent.ready === 'function') {
      // Adjust target path for next higher level
      const newField = rule.field.split('/');
      if (newField[0] === '..') {
        newField.splice(0, 1);
      }

      // Rule is a reference
      const newRule = {
        field: newField.join('/'),
        equals: rule.equals
      }
      waitForParents(parent.parent, newRule, targetField, ruleHandler, config, showing, self, $wrapper);
    }
  }

  // Main widget class constructor
  function ShowWhen(parent, field, params, setValue) {
    var self = this;

    self.field = field;
    // Outsource readies
    self.passReadies = true;
    self.value = params;

    // Create the wrapper:
    var $wrapper = $('<div>', {
      'class': 'field h5p-editor-widget-show-when'
    });
    var showing = false;
    var config = self.field.showWhen;

    if (config === undefined) {
      throw new Error('You need to set the showWhen property in semantics.json when using the showWhen widget');
    }

    var ruleHandler = new RuleHandler(config.type);

    for (var i = 0; i < config.rules.length; i++) {
      var rule = config.rules[i];
      var targetField = H5PEditor.findField(rule.field, parent);

      if (targetField) {
        // Apply rule
        applyRuleHandler(parent, rule, targetField, ruleHandler, config, showing, self, $wrapper);
      }
      else {
        waitForParents(parent, rule, targetField, ruleHandler, config, showing, self, $wrapper);
      }
    }

    // Create the real field:
    var widgetName = config.widget || field.type;
    var fieldInstance = new H5PEditor.widgets[widgetName](parent, field, params, setValue);
    fieldInstance.appendTo($wrapper);

    /**
     * Add myself to the DOM
     *
     * @public
     * @param {H5P.jQuery} $container
     */
    self.appendTo = function ($container) {
      if (!config.detach) {
        $wrapper.appendTo($container);
      }
      self.$container = $container;
    };

    /**
     * Validate
     *
     * @public
     * @return {boolean}
     */
    self.validate = function () {
      // Only validate if field is shown!
      return showing ? fieldInstance.validate() : true;
    };

    self.remove = function () {};
  }

  return ShowWhen;
})(H5PEditor.$);

// Register widget
H5PEditor.widgets.showWhen = H5PEditor.ShowWhen;
