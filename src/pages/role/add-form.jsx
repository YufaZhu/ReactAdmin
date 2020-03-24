import React, { Component } from 'react';
import {Form,Select,Input} from 'antd'
import PropsTypes from 'prop-types'

const Item = Form.Item;

class AddForm extends Component {
    
    static PropsTypes={
       
        setForm:PropsTypes.func.isRequired
    }

    componentWillMount(){
        this.props.setForm(this.props.form)
    }
    
    render() { 
        const formItemLaypout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 15 }
        };
        const {getFieldDecorator} = this.props.form
        return ( 
            <Form>
                <Item label='角色名称' {...formItemLaypout}>
                    {
                        getFieldDecorator('roleName',{
                            initialValue:'',
                            rules:[
                                {required:true,message:'角色名称必须输入'}
                            ]
                        })(
                            <Input placeholder="请输入角色名称"/>
                        )
                    }
                    
                </Item>
            </Form>
         );
    }
}
 
export default Form.create()(AddForm);