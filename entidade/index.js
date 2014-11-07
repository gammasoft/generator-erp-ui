'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var _ = require('underscore');

var ErpUiEntidadeGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    var prompts = [{
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

    this.prompt(prompts, function (anwsers) {
      _.extend(this, anwsers);
      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      var viewsPath = 'js/views/' + this.entidadeSingular,
          pathDaViewDeEdicao = viewsPath + '/' + this.entidadeSingular + 'EditarView.js';

      this.dest.mkdir(viewsPath);
      this.template('js/views/entidadeEditarView.js', pathDaViewDeEdicao, this);
    },

    projectfiles: function () {

    }
  },

  end: function () {
    //this.installDependencies();
  }
});

module.exports = ErpUiEntidadeGenerator;
