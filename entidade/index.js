'use strict';
var util = require('util');
var path = require('path');
var fs = require('fs');

var gammautils = require('gammautils');
var capitalize = gammautils.string.capitalize;

var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var _ = require('underscore');

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
      prompts = [{
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
      }, {
        type: 'input',
        name: 'nomeLegivelSingular',
        message: 'Qual o nome da entidade no singular (com acentuação)? (ex.: Boleto Bancário)'
      }, {
        type: 'input',
        name: 'nomeLegivelPlural',
        message: 'Qual o nome da entidade no plural (com acentuação)? (ex.: Boletos Bancários)'
      }, {
        type: 'input',
        name: 'urlRaiz',
        message: 'Qual a url raiz desta entidade? (ex.: boletos-bancarios)'
      }];
    }

    this.prompt(prompts, function (anwsers) {
      _.extend(this, parametrosEmArquivo || anwsers);
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

      this.dest.mkdir(viewsPath);
      this.template('js/views/editar.js', obterView('editar'), this);
      this.template('js/views/listar.js', obterView('listar'), this);
      this.template('js/views/acoes.js', obterView('acoes'), this);
      this.template('js/views/ferramentas.js', obterView('ferramentas'), this);
      this.template('js/views/menuDeContexto.js', obterView('menuDeContexto'), this);
      this.template('js/views/filtragem.js', obterView('filtragem'), this);

      this.dest.mkdir(templatesPath);
      this.dest.mkdir(bindingsPath);
      this.dest.mkdir(modelsPath);
    },

    projectfiles: function () {

    }
  },

  end: function () {
    //this.installDependencies();
  }
});

module.exports = ErpUiEntidadeGenerator;
