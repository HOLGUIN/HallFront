(function () {
  'use strict';

  angular
    .module('app.admin.auditoria')
    .controller('AuditoriaController', AuditoriaController);

  AuditoriaController.$inject = ['auditoriaFactory', '$stateParams', '$state'];

  function AuditoriaController(auditoriaFactory, $stateParams, $state ) {

    var self = this,
      idAuditoria = $stateParams.id;

      self.auditoria = {};
      self.users = [];
      self.auditoria = self.items;
      self.users = self.auditoria.usuario;

    self.auditoria = self.items;
    
    self.addCoverPage = addCoverPage;
    self.addPresentation = addPresentation;



    [].forEach.call(self.auditoria, function (data, index) {

      self.auditoria[index].id = data.auditoriaid;

    });

    self.headerTable =
      {
        'auditoriaid': 'Código',
        'empresa': 'Empresa Ejecutante',
        'usuario': 'Usuario Ejecutante',
        'fechaaccion' : 'Fecha De Modificacion',
        'direccionip' : 'Equipo Ejecutante',
        'modulo': 'Modulo Referente',
        'accion': 'Accion Realizada',
        'observacion': 'Observacion'

      }
      ;

    self.columns = Object.keys(self.headerTable);

    self.schema = {
      "type": "object",
      "title": "Comment",
      "required": [
        "comments"
      ],
      "properties": {
        "comments": {
          "type": "array",
          "maxItems": 2,
          "items": {
            "type": "object",
            "properties": {
              "name": {
                "minimum": 1,
                "title": "{{schema.minumum}}",
                "default": '{{self.prueba}}',
                "type": "string"
              },
              "email": {
                "title": "Email",
                "type": "string",
                "pattern": "^\\S+@\\S+$",
                "description": "Email will be used for evil."
              },
              "spam": {
                "title": "Spam",
                "type": "boolean",
                "default": true
              },
              "comment": {
                "title": "Comment",
                "type": "string",
                "maxLength": 20,
                "validationMessage": "Don't be greedy!"
              }
            },
            "required": [
              "name",
              "comment"
            ]
          }
        }
      }
    }


    self.form = [
      {
        "type": "help",
        "helpvalue": "<h4>Array Example</h4><p>Try adding a couple of forms, reorder by drag'n'drop.</p>"
      },
      {
        "key": "comments",
        "add": "New",
        "style": {
          "add": "btn-success"
        },
        "items": [
          "comments[].name",
          "comments[].email",
          {
            "key": "comments[].spam",
            "type": "checkbox",
            "title": "Yes I want spam.",
            "condition": "model.comments[arrayIndex].email"
          },
          {
            "key": "comments[].comment",
            "type": "textarea"
          }
        ]
      },
      {
        "type": "submit",
        "style": "btn-info",
        "title": "OK"
      }
    ]

    self.model = {};

    self.onSubmit = function (form) {
      // First we broadcast an event so all fields validate themselves
      self.$broadcast('schemaFormValidate');

      // Then we check if the form is valid
      if (form.$valid) {
        // ... do whatever you need to do with your data.
      }
    }

  }




  //Otros iconos que muestro en la tabla
  function addCoverPage() {
    $state.go('app.admin.auditoria.coverPage', { idTem: idAuditoria });
  }

  function addPresentation() {
    $state.go('app.admin.auditoria.presentation', { idTem: idAuditoria });
  }



} ());