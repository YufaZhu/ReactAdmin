import React, { Component } from 'react';
import {Card,Icon,List} from 'antd';
import {BASE_IMG_URL} from '../../utils/constants'
import LinkButton from "../../components/link-button";
import {reqCategory} from './../../api'

class ProductDetail extends Component {
    
    state={
        cName1:'',
        cName2:'',
    }

    async componentWillMount(){
        const {pCategoryId,categoryId} = this.props.location.state.product;
        if(pCategoryId==='0'){
            const result = await reqCategory(categoryId)
            const cName1=result.data.name;
            this.setState({cName1})
        }else{
            // 1，这个方式也可以
            // const result1 = await reqCategory(pCategoryId)
            // const result2 = await reqCategory(categoryId)
            // const cName1=result1.data.name;
            // const cName2=result2.data.name;
            // this.setState({cName1,cName2})
            //2，这个方式也可以
            const results = Promise.all([await reqCategory(pCategoryId),await reqCategory(categoryId)]);
            const cName1 = results[0].data.name
            const cName2 = results[1].data.name
            this.setState({
                cName1,
                cName2
            })
        }
    }


    render() {
        
        const {name,desc,price,detail,imgs} = this.props.location.state.product
        const {cName1,cName2} = this.state

        const title = (
            <span>
                <LinkButton>
                    <Icon 
                        type="arrow-left" 
                        style={{fontSize: 20,marginRight:15}}
                        onClick={() => this.props.history.goBack()}
                    />
                </LinkButton>
                &nbsp;&nbsp;商品详情
            </span>
            )

        return ( 
            <Card className='product-detail' title={title}>
                <List>
                    <List.Item>
                        <span className='left'>商品名称:</span>
                        <span>{name}</span>
                    </List.Item>
                    <List.Item>
                        <span className='left'>商品描述:</span>
                        <span>{desc}</span>
                    </List.Item>
                    <List.Item>
                        <span className='left'>商品价格:</span>
                        <span>{price + '元'}</span>
                    </List.Item>
                    <List.Item>
                        <span className='left'>所属分类:</span>
                        <span>{cName1} {cName2 ? '-->'+cName2:''}</span>
                    </List.Item>
                    <List.Item>
                        <span className='left'>商品图片:</span>
                        <span>
                        {
                            imgs.map((img) => (
                                <img src={BASE_IMG_URL + img} alt="img" key={img} className="product-img"/>
                            ))
                        }
                        </span>
                    </List.Item>
                    <List.Item>
                        <span className='left'>商品详情:</span>
                        <div dangerouslySetInnerHTML={{__html: detail}}></div>
                    </List.Item>
                </List>
            </Card>
         );
    }
}
 
export default ProductDetail;