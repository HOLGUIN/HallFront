/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function (config) {
  // Define changes to default configuration here. For example:
  // config.language = 'fr';
  // config.uiColor = '#AADC6E';
  var API_URL = 'http://localhost:57378';
  // The toolbar groups arrangement, optimized for two toolbar rows.
  config.language = 'es';
  config.extraPlugins = 'uploadimage,divarea';
  config.uploadUrl = API_URL + '/api/IndiceDetalleImage';
  config.width = 800;
  config.height = 930;
  config.allowedContent = true;
  config.entities = false;
  // config.resize_dir= 'both';
  //config.resize_minWidth: 200;
  config.resize_minHeight = 250;
  //config.resize_maxWidth: 800;
  config.resize_maxHeight = 930;

  config.toolbar = 'full';
  config.allowedContent = true;
  config.entities = false;
  config.toolbar_full = [ //jshint ignore:line
    {
      name: 'basicstyles',
      items: ['Bold', 'Italic', 'Strike', 'Underline']
    },
    {name: 'paragraph', items: ['BulletedList', 'NumberedList', 'Blockquote']},
    {name: 'editing', items: ['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock']},
    {name: 'links', items: ['Link', 'Unlink', 'Anchor']},
    {name: 'tools', items: ['SpellChecker', 'Maximize']},
    '/',
    {
      name: 'styles',
      items: ['Format', 'FontSize', 'TextColor', 'PasteText', 'PasteFromWord', 'RemoveFormat']
    },
    {name: 'insert', items: ['Image', 'Table', 'SpecialChar']},
    {name: 'forms', items: ['Outdent', 'Indent']},
    {name: 'clipboard', items: ['Undo', 'Redo']},
    {name: 'document', items: ['PageBreak', 'Source']}
  ];

  // Remove some buttons provided by the standard plugins, which are
  // not needed in the Standard(s) toolbar.
  config.removeButtons = 'Underline,Subscript,Superscript';
  // Set the most common block elements.
  config.format_tags = 'p;h1;h2;h3;pre';
  // Simplify the dialog windows.
  config.removeDialogTabs = 'image:advanced;link:advanced';
};
