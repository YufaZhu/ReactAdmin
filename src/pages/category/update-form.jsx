import React, { Component } from 'react';
import PropsTypes from 'prop-types'
import {Form,Input} from 'antd'

const Item = Form.Item;

class UpdateForm extends Component {
    
    static PropsTypes={
        categoryName:PropsTypes.string.isRequired,
        setForm:PropsTypes.func.isRequired
    }

    componentWillMount(){
        this.props.setForm(this.props.form)
    }

    render() { 
        const {categoryName} = this.props
        const {getFieldDecorator} = this.props.form
        return ( 
            <Form>  
                <Item>
                    {
                        getFieldDecorator('categoryName',{
                            initialValue:categoryName,
                            rules:[
                                {required:true,message:'分类名称必须输入'}
                            ]
                        })(
                            <Input placeholder="请输入分类名称"/>
                        )
                    }
                    
                </Item>
            </Form>
         );
    }
}
 
export default Form.create()(UpdateForm);