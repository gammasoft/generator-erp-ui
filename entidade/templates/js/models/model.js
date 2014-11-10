var <%= classeSingular %> = Backbone.DeepModel.extend({
    defaults: {

    },

    initialize: function() {

    },

    validar: validarGenerico,

    validacoes: {

    },

    url: function() {
        return baseUrl + '/<%= urlRaiz %>' + (this.id ? '/' + this.id : '');
    }
});