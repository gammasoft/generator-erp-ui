(function() {
    return Backbone.View.extend({
        initialize: function(<%= entidadeSingular %>) {
        	var _this = this;

            this.<%= entidadeSingular %> = <%= entidadeSingular %>;
        },

        template: obterTemplate('<%= entidadeSingular %>', 'acoes'),

        render: function(container) {
        	this.setElement(container);
            this.$el.html(this.template(this.<%= entidadeSingular %>));

        	this.$el.find('[rel="tooltip"], abbr').tooltip();
        },

        events: {

        }
    });
})();