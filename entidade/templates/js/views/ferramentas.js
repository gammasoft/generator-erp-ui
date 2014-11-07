(function() {
    return Backbone.View.extend({
        initialize: function(<%= entidadeSingular %>, superDataTable) {
        	this.<%= entidadeSingular %> = <%= entidadeSingular %>;
            this.superDataTable = superDataTable;
            this.<%= entidadePlural %>Selecionadas = {};
        },

        template: obterTemplate('<%= entidadeSingular %>', 'ferramentas'),

        _modelBinder: new Backbone.ModelBinder(),

        render: function(container) {
        	this.setElement(container);

            this.$el.html(this.template());
        	this.$el.find('[rel="tooltip"], abbr').tooltip();

            this._modelBinder.bind(this.<%= entidadeSingular %>, this.el, {
                //Bindings...
            });
        },

        events: {
            'click a.selecionarTodos': 'selecionarTodos',
            'click a.deselecionarTodos': 'deselecionarTodos',
        },

        selecionarTodos: function(e) {
            e.preventDefault();
            this.superDataTable.selecionarTodos();
        },

        deselecionarTodos: function(e) {
            e.preventDefault();
            this.superDataTable.deselecionarTodos();
        },

        onSelecionar: function(<%= entidadeSingular %>) {
            this.<%= entidadePlural %>Selecionadas[<%= entidadeSingular %>.id] = <%= entidadeSingular %>;
        },

        onRemoverSelecao: function(<%= entidadeSingular %>) {
            delete this.<%= entidadePlural %>Selecionadas[<%= entidadeSingular %>.id];
        }
    });
})();