import React, { Component } from 'react';
import { Card, message,Form, Input, Cascader, Upload, Button, Icon } from 'antd'
import LinkButton from './../../components/link-button'
import { reqCategorys,reqAddOrUpdateProduct } from './../../api'
import PicturesWall from './pictures-wall'
import RichTextEditor from './rich-text-editor'

const { Item } = Form
const { TextArea } = Input

class ProductAddUpdate extends Component {

    constructor(props){
        super(props)
        //创建用来保存ref标识的标签对象的容器
        this.pw = React.createRef()
        this.editor = React.createRef()
    }

    state = {
        options: [], // 用来显示级联列表的数组
    }

    initOptions=async(categorys)=>{
        //根据categorys数组生成options数组
        const options = categorys.map(c=>({
            value: c._id,
            label: c.name,
            isLeaf: false,
        }))

        //如果是一个二级分类商品的更新
        const {isUpade,product} = this;
        const {pCategoryId,categoryId} = product;
        if(isUpade && pCategoryId!=='0'){
            //获取对应的二级分类列表
            const subCategorys = await this.getCategorys(pCategoryId)
            //生成二级下拉列表的options
            const cOptions = subCategorys.map(c=>({
                value: c._id,
                label: c.name,
                isLeaf: true,
            }))
            //找到当前商品对应的一级option对象
            const targetOption = options.find(option=>option.value===pCategoryId)

            //关联到对应的一级option上
            targetOption.children = cOptions
        }
        //更新options状态
        this.setState({
            options
        })
    }
    
    //异步获取一级/二级分类列表
    getCategorys = async (parentId) => {
        const result = await reqCategorys(parentId)
        if (result.status === 0) {
            const categorys = result.data
            if (parentId === '0') {
                this.initOptions(categorys)
            } else {
                return categorys
            }
        }
    }


    loadData = async selectedOptions => {
        const targetOption = selectedOptions[selectedOptions.length - 1];
        targetOption.loading = true;

        //根据选中的分类，请求获取二级分类列表
        const subCategorys = await this.getCategorys(targetOption.value)
        targetOption.loading = false;
        if (subCategorys && subCategorys.length > 0) {
            //生成一个二级options
            const childOptions = subCategorys.map(c => ({
                value: c._id,
                label: c.name,
                isLeaf: true,
            }))
            //关联到二级option上
            targetOption.children = childOptions
        } else {
            targetOption.isLeaf = true
        }

        // 更新 options 状态
        this.setState({
            options: [...this.state.options],
        });
    };

    submit = () => {
        this.props.form.validateFields(async(err, values) => {
            if (!err) {
                const imgs = this.pw.current.getImgs()
                const detail = this.editor.current.getDetail()
                const {name,desc,price,categoryIds} = values
                let pCategoryId,categoryId;
                if(categoryIds.length===1){
                    pCategoryId='0'
                    categoryId=categoryIds[0]
                }else{
                    pCategoryId = categoryIds[0]
                    categoryId = categoryIds[1]
                }
                const product = {name,desc,price,pCategoryId,categoryId,detail,imgs}
                if(this.isUpade){
                    product._id = this.product._id
                }

                const result = await reqAddOrUpdateProduct(product)
                if(result.status===0){
                    message.success(`${this.isUpade?'更新':'添加'}商品成功`)
                    this.props.history.goBack()
                }else{
                    message.error(`${this.isUpade?'更新':'添加'}商品失败`)
                }
            }
        })
    }



    validatorPrice = (rule, value, callback) => {
        if (value * 1 > 0) {
            callback()
        } else {
            callback('价格必须大于0')
        }
    }

    componentDidMount() {
        this.getCategorys('0')
    }

    componentWillMount() {
        const product = this.props.location.state;
        this.isUpade = !!product;
        this.product = product || {}
    }

    render() {

        const { isUpade, product } = this

        const formItemLaypout = {
            labelCol: { span: 2 },
            wrapperCol: { span: 8 }
        };

        const title = (
            <span>
                <LinkButton onClick={() => this.props.history.goBack()}>
                    <Icon type="arrow-left" style={{ fontSize: 20 }} />
                    <span>{isUpade ? '修改商品' : '添加商品'}</span>
                </LinkButton>
            </span>
        )

        const { getFieldDecorator } = this.props.form

        const categoryIds = []
        const { pCategoryId, categoryId ,imgs,detail} = product
        if (isUpade) {
            if (pCategoryId === '0') {
                categoryIds.push(categoryId)
            } else {
                categoryIds.push(pCategoryId)
                categoryIds.push(categoryId)
            }
        }


        return (
            <Card title={title}>
                <Form {...formItemLaypout}>
                    <Item label='商品名称'>
                        {
                            getFieldDecorator('name', {
                                initialValue: product.name,
                                rules: [
                                    { required: true, message: '必须输入商品名称' }
                                ]
                            })(<Input placeholder='请输入商品名称' />)
                        }
                    </Item>

                    <Item label='商品描述'>
                        {
                            getFieldDecorator('desc', {
                                initialValue: product.desc,
                                rules: [
                                    { required: true, message: '必须输入商品描述' }
                                ]
                            })(<TextArea placeholder='请输入商品描述' autosize />)
                        }
                    </Item>
                    <Item label='商品价格'>
                        {
                            getFieldDecorator('price', {
                                initialValue: product.price,
                                rules: [
                                    { required: true, message: '必须输入商品价格' },
                                    { validator: this.validatorPrice }
                                ]
                            })(<Input type='number' placeholder='请输入商品价格' addonAfter='元' />)
                        }
                    </Item>
                    <Item label='商品分类'>
                        {
                            getFieldDecorator('categoryIds', {
                                initialValue: categoryIds,
                                rules: [
                                    { required: true, message: '必须输入商品分类' },
                                ]
                            })(<Cascader
                                options={this.state.options}
                                loadData={this.loadData}
                            />
                            )
                        }
                    </Item>
                    <Item label='商品图片'>
                        <PicturesWall ref={this.pw} imgs={imgs}/>
                    </Item>
                    <Item label='商品详情' labelCol={{span: 2}} wrapperCol={{ span: 20 }}>
                        <RichTextEditor ref={this.editor} detail={detail}/>
                    </Item>
                    <Item>
                        <Button type='primary' onClick={this.submit}>提交</Button>
                    </Item>
                </Form>
            </Card>
        );
    }
}

export default Form.create()(ProductAddUpdate);