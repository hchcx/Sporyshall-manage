layui.use('table', function () {
    var table = layui.table,
        form = layui.form,
        $ = layui.jquery;

    objectTable = table.render({
        elem: '#objectTable'
        , url: '/shopObject/shopObjectList'
        , page: true
        , cols: [[
            {field: 'id', title: 'ID', fixed: 'left'}
            , {field: 'name', title: '商品名'}
            , {field: 'price', title: '价格'}
            , {field: 'desc', title: '描述'}
            , {field: 'num', title: '库存'}
            , {fixed: 'right', title: '操作', toolbar: '#barDemo'}
        ]]

    });

    $.ajax({
        url:'/place/getPlaceByState?state=1',
        async : false,
        success : function(d) {
            $.each(d, function (index, item) {
                $('#place').append(new Option(item.name, item.id));
            });
        }
    })
    form.render();
    // 添加按钮
    $("#addObject").click(function () {
        layer.open({
            title: '添加',
            type: 2,
            area: ['30%', '70%'],
            content: '/shopObject/shopObjectAddPage'
        })
    })

    table.on('tool(objectTable)', function (obj) {
        var data = obj.data;
        if (obj.event === 'del'){
            // 删除按钮
            layer.confirm('确定要删除该商品吗', function (index) {
                $.ajax({
                    type: "POST",
                    data: {id: data.id},
                    url: "/shopObject/shopObjectDel",
                    success: function (d) {
                        if (d.success) {
                            layer.msg("删除成功", {time: 1000}, function () {
                                layer.closeAll();//关闭弹窗
                                objectTable.reload()//保存成功刷新
                            });
                        } else {
                            layer.alert(d.msg)
                        }
                    }
                });
                layer.close(index);
            })
        }else if (obj.event === 'edit'){
            //编辑按钮
            layer.open({
                title: '编辑',
                type: 2,
                area: ['30%', '70%'],
                content: '/shopObject/shopObjectUpdatePage?id='+data.id
            })
        }else if (obj.event === 'buy'){
            $("#id").val(data.id);
            //购买商品按钮
            layer.open({
                title: '购买商品',
                type: 1,
                area: ['30%', '70%'],
                content: $("#buyObj")
            })
        }
    })

    form.on('submit(formDemo)', function(data) {
        layer.load();
        $.post('/shopObject/buyObj', data.field, function(d) {
            if (d.success) {
                layer.msg(d.msg, {
                    icon : 6,
                    time : 2000
                }, function() {
                    layer.closeAll();
                    objectTable.reload()
                })
            } else {
                layer.alert(d.msg)
                layer.closeAll('loading');
            }
        });
        return false;
    });

    $('.close').click(function() {
        layer.closeAll()
    })
});
