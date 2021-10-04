$(function(){

var id = {};
var div = {};

  const appendTask = function(data){
          var taskCode = '<a href="#" class="task-link" data-id="' +
              data.id + '">' + data.name + '</a><br>';
          $('#task-list')
              .append('<div id = "' + data.id + '">' + taskCode + '</div>');  //<a href="#" class="task-link" data-id="1">высокий</a>
      };

   // Loading task on load page
    $.get('/tasks/', function(response)
    {
        for(i in response) {
            appendTask(response[i]);
        }
    });

    //Show adding task form
    $('#show-add-task-form').click(function(){

     $('#task-form').css('display', 'flex');


   });



    //Closing adding task form
    $('#task-form').click(function(event){
        if(event.target === this) {
            $(this).css('display', 'none');
        }
    });


    //Getting task
    $(document).on('click', '.task-link', function(){
        var link = $(this);
        var taskId = link.data('id');
        $.ajax({
            method: "GET",
            url: '/tasks/' + taskId,
            success: function(response)
            {
                var date = '<span>Дата:' + response.date + '</span><br>';
                link.parent().append(date);
                var priority = '<span>Приоритет:' + response.priority + '</span><br>';
                link.parent().append(priority);

          var buttonDelete = document.createElement('button');//создать  кнопку
          var textDelete = document.createTextNode('удалить');//создать текст для кнопки
          buttonDelete.appendChild(textDelete);//добавить текст в кнопку
          buttonDelete.setAttribute("id", "delete");
          document.body.appendChild(buttonDelete);//добавить кнопку в документ
          link.parent().append(buttonDelete); // пернести кнопку в див с ссылкой


         // Deleting task
           buttonDelete.onclick = function () {

                                                  var taskId = $(this).parent().attr("id");
                                                  var div = $(this).parent();

                                                  $.ajax({
                                                  method: "DELETE" ,
                                                  url: '/tasks/'+ taskId,

                                                  success: function(response)
                                                  {
                                                   div.remove();

                                                  },

                                                  error: function(response)

                                                  {
                                                      if(response.status == 404) {
                                                       alert('Задание не найдено!');
                                                              }

                                                  }  });
                                                 return false;
                                                        };  // привязать событие удалить

           var buttonEdit = document.createElement('button');
           var textEdit = document.createTextNode('редактировать');
           buttonEdit.appendChild(textEdit);
           buttonEdit.setAttribute("id", "edit");
           document.body.appendChild(buttonEdit);
           link.parent().append(buttonEdit);

          // Showing update form
           buttonEdit.onclick = function(){

           $('#update-form').css('display', 'flex');

           var taskId = $(this).parent().attr("id");
           var currentDiv = $(this).parent();
           id = taskId; // записать текущий айди и див для изменения дела
           div = currentDiv;

           } // привязать событие открыть форму


            },
            error: function(response)
            {
                if(response.status == 404) {
                    alert('Задание не найдено!');
                }
            }
        });
        return false;
    });


    //Adding task
    $('#save-task').click(function()
    {
        var data = $('#task-form form').serialize();
        $.ajax({
            method: "POST",
            url: '/tasks/',
            data: data,
            success: function(response)
            {
                $('#task-form').css('display', 'none');
                var task = {};
                task.id = response;
                var dataArray = $('#task-form form').serializeArray();
                for(i in dataArray) {
                    task[dataArray[i]['name']] = dataArray[i]['value'];
                }
                appendTask(task);
            }
        });
        return false;
    });

       // Updating task
       $('#update-task').click(function(){

        var taskId = id;  // id записывается при клике на кнопку edit
        var dataUpd = $('#update-form form').serialize();

       $.ajax({
       method: "PUT" ,
       url: '/tasks/'+ taskId,
       data: dataUpd,
       success: function(response)
       {
        $('#update-form').css('display', 'none');

        var currentDiv = div; // div записывается при клике на кнопку edit
        currentDiv.children().get(0).innerHTML = response.name;
        currentDiv.children().get(2).innerHTML = "Дата: " + response.date;
        currentDiv.children().get(4).innerHTML = "Приоритет: " + response.priority;
       },
       error: function(response)
       {
           if(response.status == 404) {
            alert('Задание не найдено!');
                   }
       }
        });
      return false;
             });

          //Closing update task form
          $('#update-form').click(function(event){
              if(event.target === this) {
                  $(this).css('display', 'none');
              }
          });

});