import React, { Component } from 'react';
import {Card,Form,Input,Cascader,Upload,Button,Icon} from 'antd'
import LinkButton from './../../components/link-button'
import {reqCategorys} from './../../api'

const {Item} = Form
const {TextArea} = Input

class ProductAddUpdate extends Component {

    state = {
        options :[], // 用来显示级联列表的数组
        }

    initOptions=(categorys)=>{
        //根据categorys数组生成options数组
        const options = categorys.map(c=>({
            value: c._id,
            label: c.name,
            isLeaf: false,
        }))
        //更新options状态
        this.setState({
            options
        })
    }

    //异步获取一级/二级分类列表
    getCategorys= async (parentId)=>{
        const result = await reqCategorys(parentId)
        if(result.status===0){
            const categorys = result.data
            if(parentId==='0'){
                this.initOptions(categorys)
            }else{
                return categorys
            }
        }
    }


    loadData = async selectedOptions => {
        const targetOption = selectedOptions[0];
        targetOption.loading = true;

        //根据选中的分类，请求获取二级分类列表
        const subCategorys = await this.getCategorys(targetOption.value)
        targetOption.loading = false;
        if(subCategorys && subCategorys.length>0){
            //生成一个二级options
            const childOptions = subCategorys.map(c=>({
                value: c._id,
                label: c.name,
                isLeaf: true,
            }))
            //关联到二级option上
            targetOption.children = childOptions
        }else{
            targetOption.isLeaf=true 
        }
    };

    submit=()=>{
        this.props.form.validateFields((err,value)=>{
            if(!err){
                
            }
        })
    }

    

    validatorPrice=(rule, value, callback)=>{
        if(value*1 > 0){
            callback()
        }else{
            callback('价格必须大于0')
        }
    }

    componentDidMount(){
        this.getCategorys('0')
    }

    render() { 

        const formItemLaypout ={
            labelCol: {span:2},
            wrapperCol: {span:8}
        };

        const title = (
            <span>
                <LinkButton>
                    <Icon type="arrow-left" style={{fontSize:20}} />
                    <span>添加商品</span>
                </LinkButton>
            </span>
        )

        const {getFieldDecorator} = this.props.form

        

        return ( 
            <Card title={title}>
                <Form {...formItemLaypout}>
                    <Item label='商品名称'>
                    {
                        getFieldDecorator('name',{
                            initialValue:'',
                            rules:[
                                {required: true, message: '必须输入商品名称'}
                            ]
                        })(<Input placeholder='请输入商品名称'/>)
                    }
                    </Item>

                    <Item label='商品描述'>
                    {
                        getFieldDecorator('desc',{
                            initialValue:'',
                            rules:[
                                {required: true, message: '必须输入商品描述'}
                            ]
                        })(<TextArea placeholder='请输入商品描述' autosize/>)
                    }
                    </Item>
                    <Item label='商品价格'>
                    {
                        getFieldDecorator('price',{
                            initialValue:'',
                            rules:[
                                {required: true, message: '必须输入商品价格'},
                                {validator: this.validatorPrice}
                            ]
                        })(<Input type='number' placeholder='请输入商品价格' addonAfter='元'/>)
                    }
                    </Item>
                    <Item label='商品分类'>
                    <Cascader
                        options={this.state.options}
                        loadData={this.loadData}
                    />
                    </Item>
                    <Item label='商品图片'>
                        <div></div>
                    </Item>
                    <Item label='商品详情'>
                        <div></div>
                    </Item>
                    <Item>
                        <Button type='primary' onClick={this.submit}>提交</Button>
                    </Item>
                </Form>
            </Card>
         );
    }
}
 
export default Form.create()(ProductAddUpdate) ;