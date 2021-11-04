(function () {
    'use strict';
    var global = tinymce.util.Tools.resolve('tinymce.PluginManager');
    var global$1 = tinymce.util.Tools.resolve('tinymce.dom.DOMUtils');

    var setContent = function (editor, code, codename, title) {
        var language='markup';
        editor.insertContent('<br/><div class="example" title="'+title+'" codename="'+codename+'" ><p class="example_head">实例</p><p class="name">' + title + '</p><div id="__new" class="bgcode-markup">' + code + '</div><a target="_blank" href="/try/try.php?filename=' + codename + '" class="tryitbtn" rel="noopener">尝试一下 »</a><p>(本页底部可以查看更多实例)</p></div><br/>');
        // editor.insertContent('<div class="example"><p class="example_head">实例</p><p class="name">' + title + '</p><div id="__new" mytitle="aaaa" class="language-markup" title="' + title + '" codename="' + codename + '" mytitle="' + 2222222222 + '">' + code + '</div><a target="_blank" href="/try/try.php?filename=' + codename + '" class="tryitbtn" rel="noopener">尝试一下 »</a><p>(本页底部可以查看更多实例)</p></div>');
    };

    var open = function (editor) {
        
        editor.windowManager.open({
          title: 'Insert/title',
          size: 'large',
          body: {
            type: 'panel',
            items: [
              {
                type: 'input',
                label: 'title',
                name: 'title'
              },
              {
                type: 'input',
                label: 'name',
                name: 'codename'
              },
              {
                type: 'textarea',
                name: 'code',
                label: 'Code view'
              }
            ]
          },
          buttons: [
            {
              type: 'cancel',
              name: 'cancel',
              text: 'Cancel'
            },
            {
              type: 'submit',
              name: 'save',
              text: 'Save',
              primary: true
            }
          ],
          initialData: {},
          onSubmit: function (api) {
            var data = api.getData();
            setContent(editor, data.code, data.codename, data.title);
            api.close();
          }
        });
    };

    var register$1 = function (editor) {
        editor.addCommand(commandName, function () {
          open(editor);
        });
    };

    
    var commandName='bgcode'
    var icon='bgcode'
    var tooltip='Blog Code'
    var register = function (editor) {

        
        var onAction = function () {
          return editor.execCommand(commandName);
        };
        editor.ui.registry.addButton(commandName, {
          icon: icon,
          tooltip: tooltip,
          onAction: onAction
        });
        editor.ui.registry.addMenuItem(commandName, {
          icon: icon,
          tooltip: tooltip,
          onAction: onAction
        });
    };

    function Plugin() {
        global.add(commandName, function (editor) {
            editor.ui.registry.getAll().icons.bgcode || editor.ui.registry.addIcon(icon,'<svg t="1636012143090" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2718" width="16" height="16"><path d="M832 1024H192c-106.048 0-192-86.016-192-192V192a192 192 0 0 1 192-192h640c105.984 0 192 85.952 192 192v640c0 105.984-86.016 192-192 192z m64-832a64 64 0 0 0-64-64H192C156.672 128 128 156.672 128 192v640a64 64 0 0 0 64 64h640c35.392 0 64-28.608 64-64V192z m-128 384v64c0 105.984-86.016 192-192 192v-128c35.392 0 64-28.608 64-64v-64a64 64 0 1 0 0-128v-64a64 64 0 0 0-64-64V192c105.984 0 192 85.952 192 192v64a64 64 0 1 1 0 128z m-512 64v-64a64.021333 64.021333 0 0 1 0-128v-64a192 192 0 0 1 192-192v128c-35.328 0-64 28.672-64 64v64a64.021333 64.021333 0 0 0 0 128v64a64 64 0 0 0 64 64v128c-106.048 0-192-86.016-192-192z" fill="" p-id="2719"></path></svg>');
            register$1(editor);
            register(editor);
        });
    }
    
    Plugin();
}());
