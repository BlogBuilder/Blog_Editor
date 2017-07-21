<template>
    <div class="row">
        <div class="col-md-12">
            <!-- BEGIN BORDERED TABLE PORTLET-->
            <div class="portlet light portlet-fit bordered">
                <div class="portlet-title">
                    <div class="caption">
                        <div class="clearfix">
                            <a href="javascript:;" @click="create" class="btn btn-sm green"> 创 建
                                <i class="fa fa-plus"></i>
                            </a>
                            <a href="javascript:;" class="btn btn-sm btn-info" id="selectChange"> 选 择
                                <i class="fa fa-check-square-o"></i>
                            </a>
                            <a href="javascript:;" @click="removeAll" class="btn btn-sm red"> 删 除
                                <i class="fa fa-trash-o"></i>
                            </a>
                        </div>
                    </div>
                    <div class="actions">
                        <div class="input-icon right">
                            <i class="fa fa-search"></i>
                            <input type="text" class="form-control" placeholder="搜索..."
                                   @keyup.enter="search($event)">
                        </div>
                    </div>
                </div>
                <div>
                    <div class="table-scrollable table-scrollable-borderless">
                        <table class="table table-hover table-light">
                            <thead>
                            <tr class="uppercase">
                                <th> 选择</th>
                                <th> 标签名称</th>
                                <th> 操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            <template v-for="(item,index) in tagList">
                                <tr>
                                    <td class="text-center">
                                        <label class="mt-checkbox mt-checkbox-outline">
                                            <input type="checkbox" :value="item.id" name="select"
                                                   v-model="selected">
                                            <span></span>
                                        </label>
                                    </td>
                                    <td class="text-center"> {{index + 1}}</td>
                                    <td class="text-center"> {{item.name}}</td>
                                    <td class="text-center">
                                        <button type="button" class="btn btn-sm blue btn-outline"
                                                @click="edit(item)">修 改
                                        </button>
                                        <button type="button" class="btn btn-sm red btn-outline"
                                                @click="remove(item.id)">删 除
                                        </button>
                                    </td>
                                </tr>
                            </template>
                            </tbody>
                        </table>
                        <!-- Pagination -->
                        <div class="pagination pull-right">
                            <div class="M-box front pull-right" style="margin-top:10px; "></div>
                        </div>
                        <!-- End Pagination -->
                        <div class="clearfix"></div>
                    </div>
                </div>
            </div>
            <!-- END BORDERED TABLE PORTLET-->
        </div>

    </div>
</template>

<script type="es6">
    const rowCount = localStorage.getItem("rowCount") || 10;
    import {changeURLPara, removeURLPara, redictURL} from '../../../global/js/js-utils'

    module.exports = {
        data(){
            return {
                tagList: [],
                currentPage: 1,
                condition: "",
                selected: []
            }
        },
        watch: {
            '$route': 'getData'
        },
        mounted(){
            const me = this;
            me.getData();
            BlogUtils.selectAll("select", jQuery("#selectChange"));
        },
        methods: {
            _updateCondition(){
                const me = this;
                const query = me.$route.query;
                me.condition = jQuery.param(query);
                if (!me.condition) {
                    me.condition = "";
                }
            },
            fetchData (pageNum) {
                const me = this;
                me.$http.get('/api/tag/adminList', {
                    params: {
                        rowCount: rowCount,
                        currentPage: pageNum,
                        condition: me.condition
                    }
                }).then((response) => {
                    const data = response.data;
                    me.tagList = data.results;
                }, (response) => {
                    serverErrorInfo();
                });
            },
            //渲染页码
            fetchPages () {
                const me = this;
                me.$http.get('/api/tag/adminList', {
                    params: {
                        rowCount: rowCount,
                        currentPage: 1,
                        condition: me.condition
                    }
                }).then((response) => {
                    const data = response.data;
                    jQuery(".M-box").pagination({
                        pageCount: data.totalPage || 1,
                        coping: true,
                        homePage: '首页',
                        endPage: '末页',
                        prevContent: '上页',
                        nextContent: '下页',
                        callback: function (data) {
                            me.fetchData(data.getCurrent());
                            me.currentPage = data.getCurrent();
                        }
                    });
                }, (response) => {
                    serverErrorInfo();
                });
            },
            getData(){
                const me = this;
                me._updateCondition();
                me.fetchData(me.currentPage);
                me.fetchPages();
            },

            search(event){
                const me = this;

                if (event.target.value) {
                    me.$router.push(redictURL(me.$route.fullPath, "/tag/list", "add", "key", event.target.value));
                } else {
                    me.$router.push(redictURL(me.$route.fullPath, "/tag/list", "remove", "key"));
                }
            },
            create(){
                const me = this;
                me.$router.push("/tag/create");
            },
            edit(item){
                const me = this;
                me.$router.push("/tag/change?id=" + item.id);
            },
            remove(id){
                var me = this;
                confirm({
                    content: "是否删除当前标签信息？",
                    success: function () {
                        me.$http.get("/api/tag/delete", {
                            params: {
                                id: id
                            }
                        }).then(response => {
                            var data = response.data;
                            codeState(data.code, {
                                200: function () {
                                    alert("标签删除成功！");
                                    me.getData();
                                }
                            })
                        }, response => {
                            serverErrorInfo(response);
                        });
                    }
                })
            },
            removeAll(){
                var me = this;
                if (BlogUtils.getSelect("select").length == 0) {
                    error("至少需要选择一个标签");
                    return;
                }
                confirm({
                    content: "是否删除当前选中文章标签？",
                    success: function () {
                        me.$http.get("/api/tag/deleteAll", {
                            params: {
                                selected: me.selected
                            }
                        }).then(response => {
                                var data = response.data;
                                codeState(data.code, {
                                    200: function () {
                                        alert("文章标签删除成功！");
                                        me.getData();
                                        closeConfirm();
                                    }
                                });
                            },
                            response => {
                                serverErrorInfo(response);
                            }
                        );
                    }
                });
            }
        }
    }
</script>