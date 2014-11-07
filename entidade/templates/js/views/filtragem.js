(function() {

    var Model = Backbone.Model.extend({
        defaults: {
            data: moment().format('DD/MM/YYYY'),
        }
    });

    return Backbone.View.extend({
        initialize: function(/* redesenharTabela */) {
            this.model = new Model();
            this._modelBinder = new Backbone.ModelBinder();
        },

        template: obterTemplate('<%= entidadeSingular %>', 'filtragem'),

        close: function() {
            this._modelBinder.unbind();
        },

        render: function(container) {
        	this.setElement(container);

            this.$el.html(this.template());
        	this.$el.find('[rel="tooltip"], abbr').tooltip();
            this.$el.find('.datepicker').datepicker();

            this._modelBinder.bind(this.model, this.el);
        },

        events: {

        },

        onOk: function(e) {
            this.close();

            // router.navigate('', {
            //     trigger: true
            // });
        },
    });
})();