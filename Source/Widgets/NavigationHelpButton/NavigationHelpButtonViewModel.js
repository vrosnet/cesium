/*global define*/
define([
        'Core/defined',
        'Core/defineProperties',
        'ThirdParty/knockout',
        '../createCommand'
    ], function(
        defined,
        defineProperties,
        knockout,
        createCommand) {
    "use strict";

    function addListeners(viewModel) {
        var touchListener = function(){
            viewModel._hasTouchscreen = true;
            viewModel._touch = true;
            viewModel.showInstructions = true;
            document.removeEventListener('touchstart', touchListener, false);
            document.removeEventListener('mousemove', mouseMoveListener, false);
        };

        var mouseMoveListener = function() {
            if (!viewModel._hasTouchscreen) {
                viewModel._touch = false;
            }
            document.removeEventListener('mousemove', mouseMoveListener, false);
        };

        document.addEventListener('touchstart', touchListener, false);
        document.addEventListener('mousemove', mouseMoveListener, false);
    }

    /**
     * The view model for {@link NavigationHelpButton}.
     * @alias NavigationHelpButtonViewModel
     * @constructor
     */
    var NavigationHelpButtonViewModel = function() {
        /**
         * Gets or sets whether the instructions are currently shown.  This property is observable.
         * @type {Boolean}
         * @default false
        */
        this.showInstructions = false;

        var that = this;
        this._command = createCommand(function() {
            that.showInstructions = !that.showInstructions;
        });
        this._touch = true;
        this._hasTouchscreen = false;

        addListeners(that);

        /**
         * Gets or sets the tooltip.  This property is observable.
         *
         * @type {String}
         */
        this.tooltip = 'Navigation Instructions';

        knockout.track(this, ['tooltip', 'showInstructions', '_touch']);
    };

    defineProperties(NavigationHelpButtonViewModel.prototype, {
        /**
         * Gets the Command that is executed when the button is clicked.
         * @memberof NavigationHelpButtonViewModel.prototype
         *
         * @type {Command}
         */
        command : {
            get : function() {
                return this._command;
            }
        }
    });

    return NavigationHelpButtonViewModel;
});
