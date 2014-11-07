(function() {
    return Backbone.View.extend({
        initialize: function(<%= entidadeSingular %>, outraEntidade) {
            this.model = <%= entidadeSingular %>;
            this.outraEntidade = outraEntidade;

            this._modelBinder = new Backbone.ModelBinder();
        },

        template: obterTemplate(<%= entidadeSingular %>, 'menuDeContexto'),

        close: function() {
            this._modelBinder.unbind();
            //this.unbind();
            this.$el.off();
            this.$el.empty();
        },

        show: function() {
            this.$el.find('.dropdown-menu').show();
        },

        render: function(container) {
            var _this = this;

        	this.setElement(container);
            this.$el.html(this.template());

            this._modelBinder.bind(this.model, this.el, {

            });
        },

        events: {

        }
    });
})();