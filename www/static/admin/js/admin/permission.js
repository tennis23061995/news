/**
 * Created by livi on 16/4/20.
 */
$(function(){
    $("#saveitem").click(function(){
        var newData={
            id:$("#tid").val(),
            permission:$(".permission").val(),
            pername:$(".itemname").val(),
            tag:$("#tagSelect").val(),
            __CSRF__:G_csrf
        }
        $.ajax({
            url:'/admin/permission/save',
            data:newData,
            type:'POST',
            success:function(json){
                if(json.errno===0){
                    alert("Lưu thành công!");
                    window.location.href="/admin/permission/index"
                }else{
                    alert(json.errmsg)
                }
            }
        })
    })

    $('.delete').bind('click', function () {
        var delId = $(this).attr("del-id");
        var delids=[];
        delids.push(delId);
        var r = confirm("Bạn chắc chắn muốn xóa không？");
        if (r) {
            $.ajax({
                url: '/admin/permission/delsome',
                data: {delarr:delids,__CSRF__: G_csrf},
                type: 'POST',
                success: function (json) {
                    if (json.errno === 0) {
                        alert("Xóa thành công!");
                        window.location.href = "/admin/permission/index";
                    }else{
                        alert(json.errmsg)
                    }
                }
            })
        } else {
        }
    })
})

    //批量删除
    var delsome=function(){
        var delids=[];
        $.each($('input[type="checkbox"]','tbody'),function(i,item){
            if($(item).is(':checked')){
                delids.push($(this).val());
            }
        })
        var r = confirm("Bạn chắc chắn muốn xóa không？");
        if (r) {
            $.ajax({
                url: '/admin/permission/delsome',
                data: {delarr:delids,__CSRF__: G_csrf},
                type: 'POST',
                success: function (json) {
                    if (json.errno === 0) {
                        alert("Xóa thành công!");
                        window.location.href = "/admin/permission/index";
                    }else{
                        alert(json.errmsg)
                    }
                }
            })
        } else {
            return false
        }
    }
