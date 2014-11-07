(function() {
	var Listar<%= classePlural %>View = ListarView.extend({
	    initialize: function(opcoes, attributes) {
	    	opcoes = $.extend({}, opcoes);

	        this.tipo = '<%= classePlural %>';
	        this.tipoDescricao = '<%= nomeLegivelPlural %>';
	        this.preferenciasPadrao = [
	            { data: 'id', titulo: 'Código', visible: false },
	        ];

	        this.url = '/<%= urlRaiz %>';
	        opcoes.barraDeFerramentas = obterView('<%= entidadePlural %>', 'ferramentas');
	        opcoes.acoes = obterView('<%= entidadePlural %>', 'acoes');
            opcoes.filtragem = obterView('<%= entidadePlural %>', 'filtragem');

	        this.parent('inherit', opcoes, attributes);
	    }
	});

	return Backbone.View.extend({

        initialize: function() {
            this.template = obterTemplate('<%= entidadePlural %>', 'listar');
        },

        render: function(data) {
            var _this = this,
                layoutInterno,
                listar<%= classePlural %>View = new Listar<%= classePlural %>View();

            layoutInterno = new LayoutInternoView(['<%= nomeLegivelPlural %>', 'Listar']).render();

            if(!layoutInterno) {
                return;
            }

            this.setElement(layoutInterno.find('#conteudoPrincipal'));
            this.$el.html(this.template());

            listar<%= classePlural %>View.render(this.$el.find('.<%= entidadePlural %>'));
        }
    });
})();