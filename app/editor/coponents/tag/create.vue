<template>
    <!-- BEGIN CONTENT BODY -->
    <div>
        <!-- BEGIN PAGE HEADER-->
        <div class="portlet light portlet-fit portlet-form ">
            <div class="portlet-body">
                <!-- BEGIN FORM-->
                <form action="#" class="form-horizontal" id="tag_add">
                    <div class="form-body">
                        <div class="alert alert-danger display-hide">
                            <button class="close" data-close="alert"></button>
                            表单尚未填写完整。
                        </div>
                        <div class="form-group">
                            <label class="col-md-2 control-label" for="title">名称
                                <span class="required">*</span>
                            </label>
                            <div class="col-md-8">
                                <input type="text" class="form-control" id="title" v-model="name" placeholder=""
                                       name="name">
                                <div class="form-control-focus"></div>
                            </div>
                        </div>
                    </div>
                    <div class="form-actions">
                        <div class="row">
                            <div class="col-md-offset-5 col-md-9">
                                <button type="button" class="btn green" @click="createCategory">保 存</button>
                                <button type="reset" class="btn default">重 置</button>
                            </div>
                        </div>
                    </div>
                </form>
                <!-- END FORM-->
            </div>
        </div>
    </div>
    <!-- END CONTENT BODY -->
</template>
<script>
    const _handleValidation = () => {
        var form1 = $('#tag_add');
        var error1 = $('.alert-danger', form1);
        //var success1 = $('.alert-success', form1);
        form1.validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block help-block-error', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            ignore: "", // validate all fields including form hidden input
            messages: {
                name: {
                    required: "标签名称不能为空"
                }
            },
            rules: {
                name: {
                    required: true
                }
            },
            invalidHandler: function (event, validator) { //display error alert on form submit
                //success1.hide();
                error1.show();
                App.scrollTo(error1, -200);
            },
            errorPlacement: function (error, element) {
                if (element.is(':checkbox')) {
                    error.insertAfter(element.closest(".md-checkbox-list, .md-checkbox-inline, .checkbox-list, .checkbox-inline"));
                } else if (element.is(':radio')) {
                    error.insertAfter(element.closest(".md-radio-list, .md-radio-inline, .radio-list,.radio-inline"));
                } else {
                    error.insertAfter(element); // for other inputs, just perform default behavior
                }
            },
            highlight: function (element) { // hightlight error inputs
                $(element)
                    .closest('.form-group').addClass('has-error'); // set error class to the control group
            },
            unhighlight: function (element) { // revert the change done by hightlight
                $(element)
                    .closest('.form-group').removeClass('has-error'); // set error class to the control group
            },
            success: function (label) {
                label
                    .closest('.form-group').removeClass('has-error'); // set success class to the control group
            },
            submitHandler: function (form) {
                error1.hide();
            }
        });
    };
    module.exports = {
        data() {
            return {
                name: ""
            }
        },
        mounted () {
            _handleValidation();
        },
        methods: {
            createCategory(){
                const me = this;
                const result = jQuery("#tag_add").valid();
                if (result) {
                    me.$http.post("/api/tag/create", {
                        name: me.name
                    }).then(response => {
                        const data = response.data;
                        codeState(data.code, {
                            200: () => {
                                alert("标签创建成功！");
                                me.name = "";
                            }
                        })
                    }, response => {
                        serverErrorInfo();
                    });
                }
            }
        }
    };
</script>