

        $('body').on('click','.btn-video-detail',function (e) {
            e.preventDefault();
            window.location.href="/video?category="+$(this).attr("data-id");
        });

    var stopajax = true;
    var track_page = 1; //track user scroll as page number, right now page number is 1
    var loading = false;
    function load_contents(track_page) {
        stopajax=false;
        var data = {};
        data['page'] = track_page;
        data['keyword'] = $("#search-video input[name=keyword]").val();
        data['category'] = $("#search-video input[name=category]").val();
          data['__CSRF__']=G_csrf;
        console.log(data);
        //  alert(language);
        //alert(effectStatus);
        if (loading == false) {
            loading = true;  //set loading flag on
            $('.loading-info').show(); //show loading animation
            $.post('/home/video/getdatavideo', data, function (data) {
                console.log(data);
                //window.scrollTo(0, $("#search-listitem").offset().top);
                loading = false; //set loading flag off once the content is loaded
                $("#item-count").html("(" + data.total + " kết quả)");

                    if (data.data.total == 0) {
                        //notify user if nothing to load
                        $('.loading-info').html("Không còn video nữa!");
                        stopajax = false;
                        return;
                    }
                    else {
                        var content = "";
                        for(var i=0;i<data.data.content.length;i++)
                        {
                          if(data.data.content[i].picurl=="")
                          {
                              content += '<li class="col-lg-3 col-sm-4 col-xs-6"><a data-id="'+data.data.content[i].id+'" class="btn-video" href="#" title="'+data.data.content[i].title+'"><img src="http://i.ytimg.com/vi/ZKOtE9DOwGE/mqdefault.jpg" alt="'+data.data.content[i].title+'" class="img-responsive" height="130px" /><h2>'+data.data.content[i].title+'</h2><span class="glyphicon glyphicon-play-circle"></span> <span class="duration">'+data.data.content[i].itemname+'</span></a></li>';
                          }
                          else {
                            content += '<li class="col-lg-3 col-sm-4 col-xs-6"><a data-id="'+data.data.content[i].id+'" class="btn-video" href="#" title="'+data.data.content[i].title+'"><img src="/'+data.data.content[i].picurl+'" alt="'+data.data.content[i].title+'" class="img-responsive" height="130px" /><h2>'+data.data.content[i].title+'</h2><span class="glyphicon glyphicon-play-circle"></span> <span class="duration">'+data.data.content[i].itemname+'</span></a></li>';
                          }
                        }
                        $('.loading-info').hide(); //hide loading animation once data is received
                        $("#search-listitem").append(content); //append data into #results element
                    }
                    stopajax = true;


            }).fail(function (xhr, ajaxOptions, thrownError) { //any errors?
                alert(thrownError); //alert with HTTP error
            })
        }
    }
    load_contents(track_page)
    $(window).scroll(function () { //detect page scroll
        if ($(window).scrollTop() + $(window).height() > $(document).height() - 100 && stopajax == true) { //if user scrolled to bottom of the page
            track_page++; //page number increment
            load_contents(track_page); //load content
        }
    });
    $("body").on("click",".btn-video", function (e) {
      $("#myVideo .modal-header .category").html("");
      $("#myVideo .modal-body").html("");
      $("#myVideo .modal-header .from").html("");
      $("#myVideo .modal-title").html("");
      e.preventDefault();
      var newData={
          id:$(this).attr("data-id"),
          __CSRF__:G_csrf
      }
           $.post("/home/index/getvideo",newData, function (data) {
             var height="";
             if(window.innerWidth <=1024)height=($(window).height()/2).toString()+"px";
             else height=($(window).height()-150).toString()+"px";
             var content='';
              if(data.data.content.linkvideo.indexOf("youtube.com")!= -1) content='<iframe width="100%" height="'+height+'" src="' + data.data.content.linkvideo + '"></iframe>';
              else content = '<video width="100%"  controls><source src="' + data.data.content.linkvideo + '" type="video/mp4"><source src="mov_bbb.ogg" type="video/ogg">Your browser does not support HTML5 video.</video>';
               $("#myVideo .modal-body").html(content);
               if(data.data.content.from!="")$("#myVideo .modal-header .from").html(" | Nguồn: "+data.data.content.from);
               $("#myVideo .modal-header .category").html('<a class="btn-video-detail" data-id="'+data.data.content.item+'">'+data.data.content.itemname+'</a>');
               $("#myVideo .modal-title").html(data.data.content.title);
               $('#myVideo').modal('show');
           })
       })
       $('#myVideo').on('shown.bs.modal', function () {
         $("#myVideo .modal-dialog").css("margin-top","0");
               var top = ($(window).height() / 2) - ($("#myVideo .modal-content").height() / 2);
               if (top >= 0) $("#myVideo .modal-content").css("top", top + "px");
           });
           $(".search-panel").on("click",".btn",function(){
             $(".search-panel .dropdown-menu").toggle();
           });
