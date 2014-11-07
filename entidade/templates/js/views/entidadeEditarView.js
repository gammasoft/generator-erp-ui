(function() {
    return Backbone.View.extend({
        initialize: function() {
            this._modelBinder = new Backbone.ModelBinder();
        },

        close: function() {
            this._modelBinder.unbind();
        },

        template: obterTemplate('<%= entidadeSingular %>', 'editar'),

        _render: function(<%= entidadeSingular %>) {
            var layoutInterno = new LayoutInternoView(['<%= nomeLegivelSingular %>', 'Editar']).render();

            if(!layoutInterno) {
                return;
            }

            this.model = <%= entidadeSingular %>;
            this.setElement(layoutInterno.find('#conteudoPrincipal'));
            this.$el.html(this.template());
            this.$el.find('[rel="tooltip"], abbr').tooltip();

            this._modelBinder.bind(this.model, this.el);
        },

        render: function(id) {
            if(id) {
                var _this = this,
                    get = $.getJSON(baseUrl + '/<%= urlRaiz %>/' + id);

                get.done(function(<%= entidadeSingular %>) {
                    _this._render(new <%= classeSingular %>(<%= entidadeSingular %>));
                });

                get.fail(showError);
            } else {
                this._render(new <%= classeSingular %>());
            }
        }
    });
})();