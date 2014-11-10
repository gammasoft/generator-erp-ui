'use strict';
var util = require('util'),
    path = require('path'),
    fs = require('fs'),

    gammautils = require('gammautils'),
    removeDiacritics = gammautils.string.removeDiacritics,
    slugify = gammautils.string.slugify,
    camelCaseJoin = gammautils.string.camelCaseJoin,
    capitalize = gammautils.string.capitalize,

    yeoman = require('yeoman-generator'),
    _ = require('underscore');

var ErpUiEntidadeGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async(),
        parametrosEmArquivo,
        prompts;

    if(fs.existsSync('./yo.json')) {
      parametrosEmArquivo = this.dest.readJSON('yo.json');

      console.log(JSON.stringify(parametrosEmArquivo, null, 4));
      console.log();

      prompts = [{
        type: 'confirm',
        name: 'confirmaParametrosDeArquivo',
        message: 'Confirma os parâmetros?'
      }];
    } else {
      prompts = [/*{
        type: 'input',
        name: 'entidadeSingular',
        message: 'Qual o nome da entidade no singular? (camelCase, ex.: boletoBancario)'
      }, {
        type: 'input',
        name: 'entidadePlural',
        message: 'Qual o nome da entidade no plural? (camelCase, ex.: boletosBancarios)'
      }, {
        type: 'input',
        name: 'classeSingular',
        message: 'Qual o nome da classe no singular? (PascalCase, ex.: BoletoBancario)'
      }, {
        type: 'input',
        name: 'classePlural',
        message: 'Qual o nome da classe no plural? (PascalCase, ex.: BoletosBancarios)'
      }, */{
        type: 'input',
        name: 'nomeLegivelSingular',
        message: 'Qual o nome da entidade no singular (com acentuação)? (ex.: Boleto Bancário)'
      }, {
        type: 'input',
        name: 'nomeLegivelPlural',
        message: 'Qual o nome da entidade no plural (com acentuação)? (ex.: Boletos Bancários)'
      }/*, {
        type: 'input',
        name: 'slugSingular',
        message: 'Qual o slug da entidade no singular? (ex.: boleto-bancario)'
      }, {
        type: 'input',
        name: 'slugPlural',
        message: 'Qual o slug da entidade no plural? (ex.: boletos-bancarios)'
      }*/, {
        type: 'input',
        name: 'urlRaiz',
        message: 'Qual a url raiz desta entidade? (ex.: boletos-bancarios)'
      }];
    }

    this.prompt(prompts, function(respostas) {

      var nomeLegivelSingular = respostas.nomeLegivelSingular,
          nomeLegivelPlural = respostas.nomeLegivelPlural;

      respostas.entidadeSingular = removeDiacritics(nomeLegivelSingular)
                                      .split(' ')
                                      .reduce(camelCaseJoin);

      respostas.entidadePlural = removeDiacritics(nomeLegivelPlural)
                                      .split(' ')
                                      .reduce(camelCaseJoin);

      respostas.classeSingular = capitalize(respostas.entidadeSingular);
      respostas.classePlural = capitalize(respostas.entidadePlural);

      respostas.slugSingular = slugify(removeDiacritics(nomeLegivelSingular));
      respostas.slugPlural = slugify(removeDiacritics(nomeLegivelPlural));

      _.extend(this, parametrosEmArquivo || respostas);
      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      var _this = this,
          viewsPath = 'js/views/' + this.entidadeSingular,
          modelsPath = 'js/models/',
          bindingsPath = 'js/bindings/' + this.entidadeSingular,
          templatesPath = 'templates/'+ this.entidadeSingular;

      function obterView(nome) {
        return viewsPath + '/' + _this.entidadeSingular + capitalize(nome) + 'View.js';
      }

      function obterTemplate(nome) {
        return templatesPath + '/' + _this.entidadeSingular + capitalize(nome) + 'Template.html';
      }

      function obterBinding(nome) {
        return bindingsPath + '/' + _this.entidadeSingular + capitalize(nome) + 'Bindings.js';
      }

      function obterModel() {
        return modelsPath + '/' + _this.entidadeSingular + '.js';
      }

      this.dest.mkdir(viewsPath);
      this.template('js/views/editar.js', obterView('editar'), this);
      this.template('js/views/listar.js', obterView('listar'), this);
      this.template('js/views/acoes.js', obterView('acoes'), this);
      this.template('js/views/ferramentas.js', obterView('ferramentas'), this);
      this.template('js/views/menuDeContexto.js', obterView('menuDeContexto'), this);
      this.template('js/views/filtragem.js', obterView('filtragem'), this);

      this.dest.mkdir(templatesPath);
      this.template('templates/acoes.html', obterTemplate('acoes'), this);
      this.template('templates/editar.html', obterTemplate('editar'), this);
      this.template('templates/ferramentas.html', obterTemplate('ferramentas'), this);
      this.template('templates/filtragem.html', obterTemplate('filtragem'), this);
      this.template('templates/listar.html', obterTemplate('listar'), this);
      this.template('templates/menuDeContexto.html', obterTemplate('menuDeContexto'), this);

      this.dest.mkdir(bindingsPath);
      this.template('js/bindings/bindings.js', obterBinding(''), this);

      this.dest.mkdir(modelsPath);
      this.template('js/models/model.js', obterModel(), this);
    },

    projectfiles: function () {

    }
  },

  end: function () {
    //this.installDependencies();
  }
});

module.exports = ErpUiEntidadeGenerator;
